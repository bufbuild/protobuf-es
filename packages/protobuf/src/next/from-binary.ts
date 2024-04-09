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

import type { DescField, DescMessage } from "../descriptor-set.js";
import type { MessageShape } from "./types.js";
import type { MapEntryKey, ReflectMessage } from "./reflect/index.js";
import {
  LongType,
  scalarZeroValue,
  type ScalarValue,
} from "./reflect/scalar.js";
import { reflect } from "./reflect/reflect.js";
import { BinaryReader, WireType } from "./wire/binary-encoding.js";
import { ScalarType } from "./reflect/scalar.js";

// TODO avoid copy by not exposing these enums in Desc*
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
enum FeatureSet_MessageEncoding {
  DELIMITED = 2,
}
enum FieldDescriptorProto_Type {
  GROUP = 10,
}

/**
 * Options for parsing binary data.
 */
export interface BinaryReadOptions {
  /**
   * Retain unknown fields during parsing? The default behavior is to retain
   * unknown fields and include them in the serialized output.
   *
   * For more details see https://developers.google.com/protocol-buffers/docs/proto3#unknowns
   */
  readUnknownFields: boolean;
}

// Default options for parsing binary data.
const readDefaults: Readonly<BinaryReadOptions> = {
  readUnknownFields: true,
};

function makeReadOptions(
  options?: Partial<BinaryReadOptions>,
): Readonly<BinaryReadOptions> {
  return options ? { ...readDefaults, ...options } : readDefaults;
}

/**
 * Parse serialized binary data.
 */
export function fromBinary<Desc extends DescMessage>(
  messageDesc: Desc,
  bytes: Uint8Array,
  options?: Partial<BinaryReadOptions>,
): MessageShape<Desc> {
  const msg = reflect(messageDesc);
  readMessage(
    msg,
    new BinaryReader(bytes),
    bytes.byteLength,
    makeReadOptions(options),
  );
  return msg.message as MessageShape<Desc>;
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
export function mergeFromBinary<Desc extends DescMessage>(
  messageDesc: Desc,
  target: MessageShape<Desc>,
  bytes: Uint8Array,
  options?: Partial<BinaryReadOptions>,
): MessageShape<Desc> {
  readMessage(
    reflect(messageDesc, target),
    new BinaryReader(bytes),
    bytes.byteLength,
    makeReadOptions(options),
  );
  return target;
}

// TODO: Improve the function signature, we got most it from v1.
function readMessage(
  message: ReflectMessage,
  reader: BinaryReader,
  lengthOrEndTagFieldNo: number,
  options: BinaryReadOptions,
  delimitedMessageEncoding?: boolean,
): void {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const end = delimitedMessageEncoding
    ? reader.len
    : reader.pos + lengthOrEndTagFieldNo;
  let fieldNo: number | undefined, wireType: WireType | undefined;
  const unknownFields = message.getUnknown() ?? [];
  while (reader.pos < end) {
    [fieldNo, wireType] = reader.tag();
    if (wireType == WireType.EndGroup) {
      break;
    }
    const field = message.findNumber(fieldNo);
    if (!field) {
      const data = reader.skip(wireType);
      if (options.readUnknownFields) {
        unknownFields.push({ no: fieldNo, wireType, data });
      }
      continue;
    }
    readField(message, reader, field, wireType, options);
  }
  if (
    delimitedMessageEncoding && // eslint-disable-line @typescript-eslint/strict-boolean-expressions
    (wireType != WireType.EndGroup || fieldNo !== lengthOrEndTagFieldNo)
  ) {
    throw new Error(`invalid end group tag`);
  }
  if (unknownFields.length > 0) {
    message.setUnknown(unknownFields);
  }
}

/**
 * @private
 */
export function readField(
  message: ReflectMessage,
  reader: BinaryReader,
  field: DescField,
  wireType: WireType,
  options: BinaryReadOptions,
) {
  switch (field.fieldKind) {
    case "scalar":
      message.set(field, readScalar(reader, field.scalar, field.longType));
      break;
    case "enum":
      message.set(field, readScalar(reader, ScalarType.INT32));
      break;
    case "message":
      message.set(
        field,
        readMessageField(reader, options, field, message.get(field)),
      );
      break;
    case "list":
      readListField(message, reader, options, field, wireType);
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
  reader: BinaryReader,
  options: BinaryReadOptions,
): [MapEntryKey, ScalarValue | ReflectMessage] {
  const length = reader.uint32(),
    end = reader.pos + length;
  let key: MapEntryKey | undefined,
    val: ScalarValue | ReflectMessage | undefined;
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
  if (val === undefined) {
    switch (field.mapKind) {
      case "scalar":
        val = scalarZeroValue(field.scalar, LongType.BIGINT);
        break;
      case "enum":
        val = field.enum.values[0].number;
        break;
      case "message":
        val = reflect(field.message);
        break;
    }
  }
  return [key, val];
}

function readListField(
  message: ReflectMessage,
  reader: BinaryReader,
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
  const e = reader.uint32() + reader.pos;
  while (reader.pos < e) {
    message.addListItem(field, readScalar(reader, scalarType, longType));
  }
}

function readMessageField<Desc extends DescMessage>(
  reader: BinaryReader,
  options: BinaryReadOptions,
  field: Pick<DescField, "number" | "proto" | "getFeatures"> & {
    message: Desc;
  },
  mergeMessage?: ReflectMessage,
): ReflectMessage {
  const delimited =
    field.proto.type === FieldDescriptorProto_Type.GROUP ||
    field.getFeatures().messageEncoding ===
      FeatureSet_MessageEncoding.DELIMITED;
  const message = mergeMessage ?? reflect(field.message);
  readMessage(
    message,
    reader,
    delimited ? field.number : reader.uint32(), // eslint-disable-line @typescript-eslint/strict-boolean-expressions
    options,
    delimited,
  );
  return message;
}

function readScalar<Scalar extends ScalarType, L extends LongType>(
  reader: BinaryReader,
  type: Scalar,
  longType?: L,
): ScalarValue<Scalar, L> {
  let v = readScalarValue(reader, type);
  if (longType === LongType.STRING) {
    v = typeof v == "bigint" ? v.toString() : v;
  }
  return v as ScalarValue<Scalar, L>;
}

function readScalarValue(reader: BinaryReader, type: ScalarType): ScalarValue {
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
