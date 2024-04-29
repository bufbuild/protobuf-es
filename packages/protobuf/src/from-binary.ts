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

import type { DescExtension, DescField, DescMessage } from "./desc-types.js";
import type { MessageShape, UnknownField } from "./types.js";
import type { MapEntryKey, ReflectMessage } from "./reflect/index.js";
import { LongType, ScalarType, scalarZeroValue } from "./reflect/scalar.js";
import type { ScalarValue } from "./reflect/scalar.js";
import { reflect } from "./reflect/reflect.js";
import { BinaryReader, WireType } from "./wire/binary-encoding.js";
import { isWrapper } from "./wkt/wrappers.js";

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
    makeReadOptions(options),
    false,
    bytes.byteLength,
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
    makeReadOptions(options),
    false,
    bytes.byteLength,
  );
  return target;
}

/**
 * If `delimited` is false, read the length given in `lengthOrDelimitedFieldNo`.
 *
 * If `delimited` is true, read until an EndGroup tag. `lengthOrDelimitedFieldNo`
 * is the expected field number.
 *
 * @private
 */
function readMessage(
  message: ReflectMessage,
  reader: BinaryReader,
  options: BinaryReadOptions,
  delimited: boolean,
  lengthOrDelimitedFieldNo: number,
): void {
  const end = delimited ? reader.len : reader.pos + lengthOrDelimitedFieldNo;
  let fieldNo: number | undefined, wireType: WireType | undefined;
  const unknownFields = message.getUnknown() ?? [];
  while (reader.pos < end) {
    [fieldNo, wireType] = reader.tag();
    if (delimited && wireType == WireType.EndGroup) {
      break;
    }
    const field = message.findNumber(fieldNo);
    if (!field) {
      const data = reader.skip(wireType, fieldNo);
      if (options.readUnknownFields) {
        unknownFields.push({ no: fieldNo, wireType, data });
      }
      continue;
    }
    readField(message, reader, field, wireType, options);
  }
  if (delimited) {
    if (wireType != WireType.EndGroup || fieldNo !== lengthOrDelimitedFieldNo) {
      throw new Error(`invalid end group tag`);
    }
  }
  if (unknownFields.length > 0) {
    message.setUnknown(unknownFields);
  }
}

function readField(
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

/**
 * @private
 */
export function readExtension(
  field: DescExtension,
  ufs: UnknownField[] | undefined,
) {
  ufs = ufs?.filter((uf) => uf.no === field.number) ?? [];
  const options = { readUnknownFields: false };
  switch (field.fieldKind) {
    case "scalar":
      return ufs.length > 0
        ? readScalar(
            new BinaryReader(ufs[ufs.length - 1].data),
            field.scalar,
            field.longType,
          )
        : field.getDefaultValue() ??
            scalarZeroValue(field.scalar, field.longType);
    case "enum":
      return ufs.length > 0
        ? readScalar(
            new BinaryReader(ufs[ufs.length - 1].data),
            ScalarType.INT32,
          )
        : field.getDefaultValue() ?? field.enum.values[0].number;
    case "message":
      // eslint-disable-next-line no-case-declarations
      const rMsg = reflect(field.message);
      for (const uf of ufs) {
        readMessageField(new BinaryReader(uf.data), options, field, rMsg);
      }
      if (isWrapper(rMsg.message)) {
        return rMsg.message.value;
      }
      return rMsg.message;
    case "list":
      // eslint-disable-next-line no-case-declarations
      const value: unknown[] = [];
      for (const uf of ufs) {
        const reader = new BinaryReader(uf.data);
        if (field.listKind === "message") {
          value.push(readMessageField(reader, options, field).message);
          continue;
        }
        const scalarType = field.scalar ?? ScalarType.INT32;
        const longType =
          field.listKind == "scalar" ? field.longType : undefined;
        const packed =
          uf.wireType == WireType.LengthDelimited &&
          scalarType != ScalarType.STRING &&
          scalarType != ScalarType.BYTES;
        if (!packed) {
          value.push(readScalar(reader, scalarType, longType));
          continue;
        }
        const e = reader.uint32() + reader.pos;
        while (reader.pos < e) {
          value.push(readScalar(reader, scalarType, longType));
        }
      }
      return value;
  }
}

// Read a map field, expecting key field = 1, value field = 2
function readMapEntry(
  field: DescField & { fieldKind: "map" },
  reader: BinaryReader,
  options: BinaryReadOptions,
): [MapEntryKey, ScalarValue | ReflectMessage] {
  let key: MapEntryKey | undefined,
    val: ScalarValue | ReflectMessage | undefined;
  const end = reader.pos + reader.uint32();
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

function readMessageField(
  reader: BinaryReader,
  options: BinaryReadOptions,
  field: (DescField | DescExtension) & { message: DescMessage },
  mergeMessage?: ReflectMessage,
): ReflectMessage {
  const delimited = field.delimitedEncoding;
  const message = mergeMessage ?? reflect(field.message);
  readMessage(
    message,
    reader,
    options,
    delimited,
    delimited ? field.number : reader.uint32(),
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
