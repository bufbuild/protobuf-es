// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type { ReflectMessage } from "./reflect/reflect.js";
import type { Message } from "./types.js";
import type { BinaryWriteOptions } from "../binary-format.js";
import { reflect } from "./reflect/reflect.js";
import {
  BinaryWriter,
  WireType,
  type IBinaryWriter,
} from "../binary-encoding.js";
import {
  FeatureSet_FieldPresence,
  FeatureSet_MessageEncoding,
  FieldDescriptorProto_Type,
} from "../google/protobuf/descriptor_pb.js";
import { ScalarType, type ScalarValue } from "./reflect/scalar.js";
import type { DescField } from "../descriptor-set.js";

export function toBinary<T extends Message>(
  message: T,
  options?: Partial<BinaryWriteOptions>,
): Uint8Array {
  return reflectToBinary(reflect(message), {
    writerFactory: options?.writerFactory ?? (() => new BinaryWriter()),
    writeUnknownFields: options?.writeUnknownFields ?? false,
  });
}



function reflectToBinary(
  msg: ReflectMessage,
  opts: BinaryWriteOptions,
): Uint8Array {
  const w = opts.writerFactory();
  for (const f of msg.fields) {
    if (!msg.isSet(f)) {
      if (
        // f.proto.label === FieldDescriptorProto_Label.REQUIRED || TODO: Is this needed here?
        f.getFeatures().fieldPresence ==
        FeatureSet_FieldPresence.LEGACY_REQUIRED
      ) {
        throw new Error(
          `cannot encode field ${msg.desc.typeName}.${f.name} to binary: required field not set`,
        );
      }
      continue;
    }
    switch (f.fieldKind) {
      case "scalar":
      case "enum":
        writeScalar(w, f.scalar ?? ScalarType.INT32, f.number, msg.get(f));
        break;
      case "list":
        writeListField(w, opts, f, msg.get(f));
        break;
      case "message":
        writeMessageField(w, opts, f, msg.get(f) as Message);
        break;
      case "map":
        for (const [key, val] of Object.entries(msg.get(f))) {
          writeMapEntry(w, opts, f, key, val);
        }
        break;
    }
  }
  return w.finish();
}

function writeScalar(
  writer: IBinaryWriter,
  scalarType: ScalarType,
  fieldNo: number,
  value: unknown,
) {
  const [wireType, method] = scalarTypeInfo(scalarType);
  (writer.tag(fieldNo, wireType)[method] as (v: unknown) => void)(value);
}

function writeMessageField(
  writer: IBinaryWriter,
  opts: BinaryWriteOptions,
  field: DescField &
    ({ fieldKind: "message" } | { fieldKind: "list"; listKind: "message" }),
  message: Message,
) {
  const rm = reflectToBinary(reflect(message), opts);
  if (
    field.proto.type === FieldDescriptorProto_Type.GROUP ||
    field.getFeatures().messageEncoding === FeatureSet_MessageEncoding.DELIMITED
  ) {
    writer
      .tag(field.number, WireType.StartGroup)
      .raw(rm)
      .tag(field.number, WireType.EndGroup);
  } else {
    writer.tag(field.number, WireType.LengthDelimited).bytes(rm);
  }
}

function writeListField(
  writer: IBinaryWriter,
  opts: BinaryWriteOptions,
  field: DescField & { fieldKind: "list" },
  value: readonly unknown[],
) {
  if (field.listKind == "message") {
    for (const item of value) {
      writeMessageField(writer, opts, field, item as Message);
    }
    return;
  }
  if (field.packed) {
    if (!value.length) {
      return;
    }
    writer.tag(field.number, WireType.LengthDelimited).fork();
    const [, method] = scalarTypeInfo(field.scalar ?? ScalarType.INT32);
    for (let i = 0; i < value.length; i++) {
      (writer[method] as (v: unknown) => void)(value[i]);
    }
    writer.join();
    return;
  }
  for (const item of value) {
    writeScalar(writer, field.scalar ?? ScalarType.INT32, field.number, item);
  }
}

function writeMapEntry(
  writer: IBinaryWriter,
  opts: BinaryWriteOptions,
  field: DescField & { fieldKind: "map" },
  key: string,
  value: unknown,
) {
  writer.tag(field.number, WireType.LengthDelimited);
  writer.fork();
  // javascript only allows number or string for object properties
  // we convert from our representation to the protobuf type
  let keyValue: ScalarValue;
  switch (field.mapKey) {
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      keyValue = Number.parseInt(key);
      break;
    case ScalarType.BOOL:
      keyValue = key == "true";
      break;
    default:
      keyValue = key;
      break;
  }

  // write key, expecting key field number = 1
  writeScalar(writer, field.mapKey, 1, keyValue);

  // write value, expecting value field number = 2
  switch (field.mapKind) {
    case "scalar":
    case "enum":
      writeScalar(writer, field.scalar ?? ScalarType.INT32, 2, value);
      break;
    case "message":
      writer
        .tag(2, WireType.LengthDelimited)
        .bytes(reflectToBinary(reflect(value as Message), opts));
      break;
  }

  writer.join();
}



/**
 * Get information for writing a scalar value.
 *
 * Returns tuple:
 * [0]: appropriate WireType
 * [1]: name of the appropriate method of IBinaryWriter
 */
function scalarTypeInfo(
  type: ScalarType,
): [
    WireType,
    Exclude<keyof IBinaryWriter, "tag" | "raw" | "fork" | "join" | "finish">,
  ] {
  let wireType: WireType;
  switch (type) {
    case ScalarType.BYTES:
    case ScalarType.STRING:
      wireType = WireType.LengthDelimited;
      break;
    case ScalarType.DOUBLE:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
      wireType = WireType.Bit64;
      break;
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.FLOAT:
      wireType = WireType.Bit32;
      break;
    default:
      wireType = WireType.Varint;
      break;
  }
  const method = ScalarType[type].toLowerCase() as Exclude<
    keyof IBinaryWriter,
    "tag" | "raw" | "fork" | "join" | "finish"
  >;
  return [wireType, method];
}
