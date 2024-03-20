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

import type { BinaryReadOptions } from "../binary-format.js";
import type { DescField, DescMessage } from "../descriptor-set.js";
import type { MessageShape, Message } from "./types.js";
import type { ReflectMessage } from "./reflect/reflect.js";
import type { IBinaryReader } from "../binary-encoding.js";
import {
  LongType,
  scalarZeroValue,
  type ScalarValue,
} from "./reflect/scalar.js";
import { reflect } from "./reflect/reflect.js";
import { create } from "./create.js";
import { BinaryReader, WireType } from "../binary-encoding.js";
import { ScalarType } from "./reflect/scalar.js";
import {
  FeatureSet_MessageEncoding,
  FieldDescriptorProto_Type,
} from "../google/protobuf/descriptor_pb.js";

// Default options for parsing binary data.
const readDefaults: Readonly<BinaryReadOptions> = {
  readUnknownFields: true,
  readerFactory: (bytes) => new BinaryReader(bytes),
};

function makeReadOptions(
  options?: Partial<BinaryReadOptions>,
): Readonly<BinaryReadOptions> {
  return options ? { ...readDefaults, ...options } : readDefaults;
}

/**
 * Parse from binary data, merging fields.
 *
 * Repeated fields are appended. Map entries are added, overwriting
 * existing keys.
 *
 * If a message field is already present, it will be merged with the
 * new data.
 */
export function fromBinary<Desc extends DescMessage>(
  msg: MessageShape<Desc>,
  bytes: Uint8Array,
  options?: Partial<BinaryReadOptions>,
): MessageShape<Desc>;
/**
 * Parse serialized binary data.
 */
export function fromBinary<Desc extends DescMessage>(
  desc: Desc,
  bytes: Uint8Array,
  options?: Partial<BinaryReadOptions>,
): MessageShape<Desc>;
export function fromBinary<Desc extends DescMessage>(
  descOrMsg: Desc | MessageShape<Desc>,
  bytes: Uint8Array,
  options?: Partial<BinaryReadOptions>,
): MessageShape<Desc> {
  options = makeReadOptions(options);
  const message = "$desc" in descOrMsg ? descOrMsg : create(descOrMsg);
  readMessage(
    reflect(message),
    options.readerFactory!(bytes),
    bytes.byteLength,
    options as BinaryReadOptions,
  );
  return message;
}

// TODO: Improve the function signature, we got most it from v1.
function readMessage(
  rMessage: ReflectMessage,
  reader: IBinaryReader,
  lengthOrEndTagFieldNo: number,
  options: BinaryReadOptions,
  delimitedMessageEncoding?: boolean,
) {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const end = delimitedMessageEncoding
    ? reader.len
    : reader.pos + lengthOrEndTagFieldNo;
  let fieldNo: number | undefined, wireType: WireType | undefined;
  const unknownFields: Message["$unknown"] = [];
  while (reader.pos < end) {
    [fieldNo, wireType] = reader.tag();
    if (wireType == WireType.EndGroup) {
      break;
    }
    const field = rMessage.findNumber(fieldNo);
    if (!field) {
      const data = reader.skip(wireType);
      if (options.readUnknownFields) {
        unknownFields.push({ no: fieldNo, wireType, data });
      }
      continue;
    }
    readField(rMessage, reader, field, wireType, options);
  }
  if (
    delimitedMessageEncoding && // eslint-disable-line @typescript-eslint/strict-boolean-expressions
    (wireType != WireType.EndGroup || fieldNo !== lengthOrEndTagFieldNo)
  ) {
    throw new Error(`invalid end group tag`);
  }
  if (unknownFields.length > 0) {
    rMessage.setUnknown(unknownFields);
  }
}

function readField(
  message: ReflectMessage,
  reader: IBinaryReader,
  field: DescField,
  wireType: WireType,
  options: BinaryReadOptions,
) {
  switch (field.fieldKind) {
    case "scalar":
      message.set(field, readScalar(reader, field.scalar, field.longType));
      break;
    case "enum":
      message.set(field, readScalar(reader, ScalarType.INT32) as number);
      break;
    case "message":
      message.set(field, readMessageField(reader, options, field));
      break;
    case "list":
      readRepeatedField(message, reader, options, field, wireType);
      break;
    case "map":
      // eslint-disable-next-line no-case-declarations
      const [key, val] = readMapEntry(field, reader, options);
      message.setMapEntry(field, key, val);
      break;
  }
}

// Read a map field, expecting key field = 1, value field = 2
//
// TODO: Support edition features
function readMapEntry(
  field: DescField & { fieldKind: "map" },
  reader: IBinaryReader,
  options: BinaryReadOptions,
): [string | number, ScalarValue | MessageShape<DescMessage>] {
  const length = reader.uint32(),
    end = reader.pos + length;
  let key: ScalarValue | undefined,
    val: ScalarValue | MessageShape<DescMessage> | undefined;
  while (reader.pos < end) {
    const [fieldNo] = reader.tag();
    switch (fieldNo) {
      case 1:
        key = readScalar(reader, field.mapKey);
        break;
      case 2:
        switch (field.mapKind) {
          case "scalar":
            val = readScalar(reader, field.scalar);
            break;
          case "enum":
            val = reader.int32();
            break;
          case "message":
            val = readMessageField(reader, options, field);
            break;
        }
        break;
    }
  }
  if (key === undefined) {
    key = scalarZeroValue(field.mapKey, LongType.BIGINT);
  }
  if (typeof key != "string" && typeof key != "number") {
    key = key.toString();
  }
  if (val === undefined) {
    switch (field.mapKind) {
      case "scalar":
        val = scalarZeroValue(field.scalar, LongType.BIGINT);
        break;
      case "enum":
        val = field.enum.values[0].number;
        break;
      case "message":
        val = create(field.message);
        break;
    }
  }
  return [key, val];
}

function readRepeatedField(
  message: ReflectMessage,
  reader: IBinaryReader,
  options: BinaryReadOptions,
  field: DescField & { fieldKind: "list" },
  wireType: WireType,
) {
  if (field.listKind === "message") {
    message.addListItem(
      field,
      readMessageField(reader, options, field) as never, // TODO: Investigate the type issue.
    );
    return;
  }
  const scalarType = field.scalar ?? ScalarType.INT32;
  const longType = field.listKind == "scalar" ? field.longType : undefined;
  const packed =
    wireType == WireType.LengthDelimited &&
    scalarType != ScalarType.STRING &&
    scalarType != ScalarType.BYTES;
  if (!packed) {
    message.addListItem(field, readScalar(reader, scalarType, longType));
    return;
  }
  const arr = [] as ScalarValue[];
  const e = reader.uint32() + reader.pos;
  while (reader.pos < e) {
    arr.push(readScalar(reader, scalarType, longType));
  }
  message.set(field, arr as number[]); // TODO: Investigate the type
}

function readMessageField<Desc extends DescMessage>(
  reader: IBinaryReader,
  options: BinaryReadOptions,
  field: Pick<DescField, "number" | "proto" | "getFeatures"> & {
    message: Desc;
  },
): MessageShape<Desc> {
  const delimited =
    field.proto.type === FieldDescriptorProto_Type.GROUP ||
    field.getFeatures().messageEncoding ===
      FeatureSet_MessageEncoding.DELIMITED;
  const message = create(field.message);
  readMessage(
    reflect(message),
    reader,
    delimited ? field.number : reader.uint32(), // eslint-disable-line @typescript-eslint/strict-boolean-expressions
    options,
    delimited,
  );
  return message;
}

function readScalar(
  reader: IBinaryReader,
  type: ScalarType,
  longType?: LongType,
): ScalarValue {
  let v = readScalarValue(reader, type);
  if (longType === LongType.STRING) {
    v = typeof v == "bigint" ? v.toString() : v;
  }
  return v;
}

function readScalarValue(reader: IBinaryReader, type: ScalarType): ScalarValue {
  switch (type) {
    case ScalarType.STRING:
      return reader.string();
    case ScalarType.BOOL:
      return reader.bool();
    case ScalarType.DOUBLE:
      return reader.double();
    case ScalarType.FLOAT:
      return reader.float();
    case ScalarType.INT32:
      return reader.int32();
    case ScalarType.INT64:
      return reader.int64();
    case ScalarType.UINT64:
      return reader.uint64();
    case ScalarType.FIXED64:
      return reader.fixed64();
    case ScalarType.BYTES:
      return reader.bytes();
    case ScalarType.FIXED32:
      return reader.fixed32();
    case ScalarType.SFIXED32:
      return reader.sfixed32();
    case ScalarType.SFIXED64:
      return reader.sfixed64();
    case ScalarType.SINT64:
      return reader.sint64();
    case ScalarType.UINT32:
      return reader.uint32();
    case ScalarType.SINT32:
      return reader.sint32();
  }
}
