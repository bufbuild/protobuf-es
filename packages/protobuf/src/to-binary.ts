// Copyright 2021-2025 Buf Technologies, Inc.
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
import type { FeatureSet_FieldPresence } from "./wkt/gen/google/protobuf/descriptor_pb.js";
import type { ScalarValue } from "./reflect/scalar.js";
import { type DescField, type DescMessage, ScalarType } from "./descriptors.js";
import type { ReflectList, ReflectMessage } from "./reflect/index.js";

// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.LEGACY_REQUIRED: const $name: FeatureSet_FieldPresence.$localName = $number;
const LEGACY_REQUIRED: FeatureSet_FieldPresence.LEGACY_REQUIRED = 3;

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
  schema: Desc,
  message: MessageShape<Desc>,
  options?: Partial<BinaryWriteOptions>,
): Uint8Array {
  return writeFields(
    new BinaryWriter(),
    makeWriteOptions(options),
    reflect(schema, message),
  ).finish();
}

function writeFields(
  writer: BinaryWriter,
  opts: BinaryWriteOptions,
  msg: ReflectMessage,
): BinaryWriter {
  for (const f of msg.sortedFields) {
    if (!msg.isSet(f)) {
      if (f.presence == LEGACY_REQUIRED) {
        throw new Error(`cannot encode ${f} to binary: required field not set`);
      }
      continue;
    }
    writeField(writer, opts, msg, f);
  }
  if (opts.writeUnknownFields) {
    for (const { no, wireType, data } of msg.getUnknown() ?? []) {
      writer.tag(no, wireType).raw(data);
    }
  }
  return writer;
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
        msg.desc.typeName,
        field.name,
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
  msgName: string,
  fieldName: string,
  scalarType: ScalarType,
  fieldNo: number,
  value: unknown,
) {
  writeScalarValue(
    writer.tag(fieldNo, writeTypeOfScalar(scalarType)),
    msgName,
    fieldName,
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
  if (field.delimitedEncoding) {
    writeFields(
      writer.tag(field.number, WireType.StartGroup),
      opts,
      message,
    ).tag(field.number, WireType.EndGroup);
  } else {
    writeFields(
      writer.tag(field.number, WireType.LengthDelimited).fork(),
      opts,
      message,
    ).join();
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
      writeScalarValue(
        writer,
        field.parent.typeName,
        field.name,
        scalarType,
        item as ScalarValue,
      );
    }
    writer.join();
    return;
  }
  for (const item of list) {
    writeScalar(
      writer,
      field.parent.typeName,
      field.name,
      scalarType,
      field.number,
      item,
    );
  }
}

function writeMapEntry(
  writer: BinaryWriter,
  opts: BinaryWriteOptions,
  field: DescField & { fieldKind: "map" },
  key: unknown,
  value: unknown,
) {
  writer.tag(field.number, WireType.LengthDelimited).fork();

  // write key, expecting key field number = 1
  writeScalar(writer, field.parent.typeName, field.name, field.mapKey, 1, key);

  // write value, expecting value field number = 2
  switch (field.mapKind) {
    case "scalar":
    case "enum":
      writeScalar(
        writer,
        field.parent.typeName,
        field.name,
        field.scalar ?? ScalarType.INT32,
        2,
        value,
      );
      break;
    case "message":
      writeFields(
        writer.tag(2, WireType.LengthDelimited).fork(),
        opts,
        value as ReflectMessage,
      ).join();
      break;
  }
  writer.join();
}

function writeScalarValue(
  writer: BinaryWriter,
  msgName: string,
  fieldName: string,
  type: ScalarType,
  value: ScalarValue,
) {
  try {
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
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(
        `cannot encode field ${msgName}.${fieldName} to binary: ${e.message}`,
      );
    }
    throw e;
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
