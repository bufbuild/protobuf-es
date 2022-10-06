// Copyright 2021-2022 Buf Technologies, Inc.
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

import type { AnyDesc } from "@bufbuild/protobuf";
import {
  proto3,
  BinaryReader,
  Message,
  MessageType,
  ScalarType,
} from "@bufbuild/protobuf";

/**
 * Returns the value of a custom option with a scalar type.
 *
 * If no option is found, returns undefined.
 */
export function findCustomScalarOption<T extends ScalarType>(
  desc: AnyDesc,
  id: number,
  scalarType: T
): ScalarValue<T> | undefined {
  const reader = createBinaryReader(desc, id);
  if (reader) {
    switch (scalarType) {
      case ScalarType.INT32:
        return reader.int32() as ScalarValue<T>;
      case ScalarType.UINT32:
        return reader.uint32() as ScalarValue<T>;
      case ScalarType.SINT32:
        return reader.sint32() as ScalarValue<T>;
      case ScalarType.FIXED32:
        return reader.fixed32() as ScalarValue<T>;
      case ScalarType.SFIXED32:
        return reader.sfixed32() as ScalarValue<T>;
      case ScalarType.FLOAT:
        return reader.float() as ScalarValue<T>;
      case ScalarType.DOUBLE:
        return reader.double() as ScalarValue<T>;
      case ScalarType.INT64:
        return reader.int64() as ScalarValue<T>;
      case ScalarType.SINT64:
        return reader.sint64() as ScalarValue<T>;
      case ScalarType.SFIXED64:
        return reader.sfixed64() as ScalarValue<T>;
      case ScalarType.UINT64:
        return reader.uint64() as ScalarValue<T>;
      case ScalarType.FIXED64:
        return reader.fixed64() as ScalarValue<T>;
      case ScalarType.BOOL:
        return reader.bool() as ScalarValue<T>;
      case ScalarType.BYTES:
        return reader.bytes() as ScalarValue<T>;
      case ScalarType.STRING:
        return reader.string() as ScalarValue<T>;
      default: {
        break;
      }
    }
  }
  return undefined;
}

/**
 * Returns the value of a custom message option for the given descriptor and ID.
 * The msgType param is then used to deserialize the message for returning to the caller.
 *
 * If no options are found, returns undefined.
 *
 * If the message option is unable to be read or deserialized, an error will be thrown.
 */
export function findCustomMessageOption<T extends Message<T>>(
  desc: AnyDesc,
  id: number,
  msgType: MessageType<T>
): T | undefined {
  const reader = createBinaryReader(desc, id);
  if (reader) {
    try {
      const data = reader.bytes();
      return msgType.fromBinary(data);
    } catch (e) {
      const innerMessage = e instanceof Error ? e.message : String(e);
      throw new Error(`failed to access message option: ${innerMessage}`);
    }
  }
  return undefined;
}

/**
 * Returns the value of a custom enum option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function findCustomEnumOption(
  desc: AnyDesc,
  id: number
): number | undefined {
  return findCustomScalarOption(desc, id, ScalarType.INT32);
}

/**
 * ScalarValue is a conditional type that pairs a ScalarType value with its concrete type.
 */
type ScalarValue<T> = T extends ScalarType.STRING
  ? string
  : T extends ScalarType.INT32
  ? number
  : T extends ScalarType.UINT32
  ? number
  : T extends ScalarType.UINT32
  ? number
  : T extends ScalarType.SINT32
  ? number
  : T extends ScalarType.FIXED32
  ? number
  : T extends ScalarType.SFIXED32
  ? number
  : T extends ScalarType.FLOAT
  ? number
  : T extends ScalarType.DOUBLE
  ? number
  : T extends ScalarType.INT64
  ? bigint | string
  : T extends ScalarType.SINT64
  ? bigint | string
  : T extends ScalarType.SFIXED64
  ? bigint | string
  : T extends ScalarType.UINT64
  ? bigint | string
  : T extends ScalarType.FIXED64
  ? bigint | string
  : T extends ScalarType.BOOL
  ? boolean
  : T extends ScalarType.BYTES
  ? Uint8Array
  : never;

/**
 * Returns a binary reader for the given descriptor and field ID.
 */
function createBinaryReader(
  desc: AnyDesc,
  id: number
): BinaryReader | undefined {
  const opt = desc.proto.options;
  let reader: BinaryReader | undefined = undefined;
  if (opt !== undefined) {
    const unknownFields = proto3.bin.listUnknownFields(opt);
    const field = unknownFields.find((f) => f.no === id);
    if (field) {
      reader = new BinaryReader(field.data);
    }
  }
  return reader;
}
