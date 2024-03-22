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

import type { MessageShape } from "./types.js";
import { reflect } from "./reflect/reflect.js";
import { BinaryWriter, WireType } from "./wire/binary-encoding.js";
import {
  FeatureSet_FieldPresence,
  FeatureSet_MessageEncoding,
  FieldDescriptorProto_Label,
  FieldDescriptorProto_Type,
} from "../google/protobuf/descriptor_pb.js";
import { ScalarType } from "./reflect/scalar.js";
import type { ScalarValue } from "./reflect/scalar.js";
import type { DescField, DescMessage } from "../descriptor-set.js";
import type { ReflectList, ReflectMessage } from "./reflect/index.js";

/**
 * Options for serializing to binary data.
 *
 * V1 also had the option `readerFactory` for using a custom implementation to
 * encode to binary.
 */
export interface BinaryWriteOptions {
  /**
   * Include unknown fields in the serialized output? The default behavior
   * is to retain unknown fields and include them in the serialized output.
   *
   * For more details see https://developers.google.com/protocol-buffers/docs/proto3#unknowns
   */
  writeUnknownFields: boolean;
}

// Default options for serializing binary data.
const writeDefaults: Readonly<BinaryWriteOptions> = {
  writeUnknownFields: true,
};

function makeWriteOptions(
  options?: Partial<BinaryWriteOptions>,
): Readonly<BinaryWriteOptions> {
  return options ? { ...writeDefaults, ...options } : writeDefaults;
}

export function toBinary<Desc extends DescMessage>(
  messageDesc: Desc,
  message: MessageShape<Desc>,
  options?: Partial<BinaryWriteOptions>,
): Uint8Array {
  return reflectToBinary(
    reflect(messageDesc, message),
    makeWriteOptions(options),
  );
}

function reflectToBinary(
  msg: ReflectMessage,
  opts: BinaryWriteOptions,
): Uint8Array {
  const w = new BinaryWriter();
  for (const f of msg.sortedFields) {
    if (!msg.isSet(f)) {
      if (
        f.proto.label === FieldDescriptorProto_Label.REQUIRED ||
        f.getFeatures().fieldPresence ==
          FeatureSet_FieldPresence.LEGACY_REQUIRED
      ) {
        throw new Error(
          `cannot encode field ${msg.desc.typeName}.${f.name} to binary: required field not set`,
        );
      }
      continue;
    }
    writeField(w, opts, msg, f);
  }
  if (opts.writeUnknownFields) {
    for (const { no, wireType, data } of msg.getUnknown() ?? []) {
      w.tag(no, wireType).raw(data);
    }
  }
  return w.finish();
}

/**
 * @private
 */
export function writeField(
  writer: BinaryWriter,
  opts: BinaryWriteOptions,
  msg: ReflectMessage,
  field: DescField,
) {
  switch (field.fieldKind) {
    case "scalar":
    case "enum":
      writeScalar(
        writer,
        field.scalar ?? ScalarType.INT32,
        field.number,
        msg.get(field),
      );
      break;
    case "list":
      writeListField(writer, opts, field, msg.get(field));
      break;
    case "message":
      writeMessageField(writer, opts, field, msg.get(field));
      break;
    case "map":
      for (const [key, val] of msg.get(field)) {
        writeMapEntry(writer, opts, field, key, val);
      }
      break;
  }
}

function writeScalar(
  writer: BinaryWriter,
  scalarType: ScalarType,
  fieldNo: number,
  value: unknown,
) {
  writeScalarValue(
    writer.tag(fieldNo, writeTypeOfScalar(scalarType)),
    scalarType,
    value as ScalarValue,
  );
}

function writeMessageField(
  writer: BinaryWriter,
  opts: BinaryWriteOptions,
  field: DescField &
    ({ fieldKind: "message" } | { fieldKind: "list"; listKind: "message" }),
  message: ReflectMessage,
) {
  const rm = reflectToBinary(message, opts);
  if (
    field.proto.type === FieldDescriptorProto_Type.GROUP ||
    field.getFeatures().messageEncoding === FeatureSet_MessageEncoding.DELIMITED
  ) {
    writer
      .tag(field.number, WireType.StartGroup)
      .raw(rm) // TODO: Optimise this to not create a new writer.
      .tag(field.number, WireType.EndGroup);
  } else {
    writer.tag(field.number, WireType.LengthDelimited).bytes(rm);
  }
}

function writeListField(
  writer: BinaryWriter,
  opts: BinaryWriteOptions,
  field: DescField & { fieldKind: "list" },
  list: ReflectList,
) {
  if (field.listKind == "message") {
    for (const item of list) {
      writeMessageField(writer, opts, field, item as ReflectMessage);
    }
    return;
  }
  const scalarType = field.scalar ?? ScalarType.INT32;
  if (field.packed) {
    if (!list.size) {
      return;
    }
    writer.tag(field.number, WireType.LengthDelimited).fork();
    for (const item of list) {
      writeScalarValue(writer, scalarType, item as ScalarValue);
    }
    writer.join();
    return;
  }
  for (const item of list) {
    writeScalar(writer, scalarType, field.number, item);
  }
}

function writeMapEntry(
  writer: BinaryWriter,
  opts: BinaryWriteOptions,
  field: DescField & { fieldKind: "map" },
  key: unknown,
  value: unknown,
) {
  writer.tag(field.number, WireType.LengthDelimited);
  writer.fork();
  // write key, expecting key field number = 1
  writeScalar(writer, field.mapKey, 1, key);

  // write value, expecting value field number = 2
  switch (field.mapKind) {
    case "scalar":
    case "enum":
      writeScalar(writer, field.scalar ?? ScalarType.INT32, 2, value);
      break;
    case "message":
      writer
        .tag(2, WireType.LengthDelimited)
        .bytes(reflectToBinary(value as ReflectMessage, opts));
      break;
  }

  writer.join();
}

function writeScalarValue(
  writer: BinaryWriter,
  type: ScalarType,
  value: ScalarValue,
) {
  switch (type) {
    case ScalarType.STRING:
      writer.string(value as string);
      break;
    case ScalarType.BOOL:
      writer.bool(value as boolean);
      break;
    case ScalarType.DOUBLE:
      writer.double(value as number);
      break;
    case ScalarType.FLOAT:
      writer.float(value as number);
      break;
    case ScalarType.INT32:
      writer.int32(value as number);
      break;
    case ScalarType.INT64:
      writer.int64(value as number);
      break;
    case ScalarType.UINT64:
      writer.uint64(value as number);
      break;
    case ScalarType.FIXED64:
      writer.fixed64(value as number);
      break;
    case ScalarType.BYTES:
      writer.bytes(value as Uint8Array);
      break;
    case ScalarType.FIXED32:
      writer.fixed32(value as number);
      break;
    case ScalarType.SFIXED32:
      writer.sfixed32(value as number);
      break;
    case ScalarType.SFIXED64:
      writer.sfixed64(value as number);
      break;
    case ScalarType.SINT64:
      writer.sint64(value as number);
      break;
    case ScalarType.UINT32:
      writer.uint32(value as number);
      break;
    case ScalarType.SINT32:
      writer.sint32(value as number);
      break;
  }
}

function writeTypeOfScalar(type: ScalarType): WireType {
  switch (type) {
    case ScalarType.BYTES:
    case ScalarType.STRING:
      return WireType.LengthDelimited;
    case ScalarType.DOUBLE:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
      return WireType.Bit64;
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.FLOAT:
      return WireType.Bit32;
    default:
      return WireType.Varint;
  }
}
