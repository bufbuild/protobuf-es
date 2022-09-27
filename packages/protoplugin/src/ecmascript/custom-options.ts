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
  WireType,
  MessageType,
  AnyMessage,
  ScalarType,
} from "@bufbuild/protobuf";

/**
 * Returns a binary reader for the given descriptor and field ID.
 */
function getBinaryReader(
  desc: AnyDesc,
  id: number,
  expectedWireType: WireType
): BinaryReader | undefined {
  const opt = desc.proto.options;
  let reader: BinaryReader | undefined = undefined;
  if (opt !== undefined) {
    const unknownFields = proto3.bin.listUnknownFields(opt);
    const field = unknownFields.find((f) => f.no === id);
    if (field) {
      if (field.wireType !== expectedWireType) {
        throw new Error(
          `expected wire type ${expectedWireType}, but got ${field.wireType}`
        );
      }
      reader = new BinaryReader(field.data);
    }
  }
  return reader;
}

type ScalarValue = number | bigint | string | undefined;

export function getCustomScalarOption(
  desc: AnyDesc,
  id: number,
  scalarType: ScalarType
): ScalarValue {
  let optValue: ScalarValue;
  const reader = getBinaryReader(desc, id, WireType.Varint);
  if (reader) {
    switch (scalarType) {
      case ScalarType.INT32:
        optValue = reader.int32();
        break;
      case ScalarType.INT64:
        optValue = reader.uint64();
        break;
      // and so on.....
      default: {
        break;
      }
    }
  }
  return optValue;
}

/**
 * Returns the value of a custom uint32 option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionUint32(
  desc: AnyDesc,
  id: number
): number | undefined {
  let optValue: number | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Varint);
  if (reader) {
    optValue = reader.uint32();
  }
  return optValue;
}

/**
 * Returns the value of a custom int32 option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionInt32(
  desc: AnyDesc,
  id: number
): number | undefined {
  let optValue: number | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Varint);
  if (reader) {
    optValue = reader.int32();
  }
  return optValue;
}

/**
 * Returns the value of a custom sint32 option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionSint32(
  desc: AnyDesc,
  id: number
): number | undefined {
  let optValue: number | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Varint);
  if (reader) {
    optValue = reader.sint32();
  }
  return optValue;
}

/**
 * Returns the value of a custom int64 option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionInt64(
  desc: AnyDesc,
  id: number
): bigint | string | undefined {
  let optValue: bigint | string | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Varint);
  if (reader) {
    optValue = reader.int64();
  }
  return optValue;
}

/**
 * Returns the value of a custom sint64 option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionSint64(
  desc: AnyDesc,
  id: number
): bigint | string | undefined {
  let optValue: bigint | string | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Varint);
  if (reader) {
    optValue = reader.sint64();
  }
  return optValue;
}

/**
 * Returns the value of a custom sfixed64 option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionSfixed64(
  desc: AnyDesc,
  id: number
): bigint | string | undefined {
  let optValue: bigint | string | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Bit64);
  if (reader) {
    optValue = reader.sfixed64();
  }
  return optValue;
}

/**
 * Returns the value of a custom uint64 option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionUint64(
  desc: AnyDesc,
  id: number
): bigint | string | undefined {
  let optValue: bigint | string | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Varint);
  if (reader) {
    optValue = reader.uint64();
  }
  return optValue;
}

/**
 * Returns the value of a custom fixed64 option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionFixed64(
  desc: AnyDesc,
  id: number
): bigint | string | undefined {
  let optValue: bigint | string | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Bit64);
  if (reader) {
    optValue = reader.fixed64();
  }
  return optValue;
}

/**
 * Returns the value of a custom boolean option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionBoolean(
  desc: AnyDesc,
  id: number
): boolean | undefined {
  let optValue: boolean | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Varint);
  if (reader) {
    optValue = reader.bool();
  }
  return optValue;
}

/**
 * Returns the value of a custom fixed32 option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionFixed32(
  desc: AnyDesc,
  id: number
): number | undefined {
  let optValue: number | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Bit32);
  if (reader) {
    optValue = reader.fixed32();
  }
  return optValue;
}

/**
 * Returns the value of a custom sfixed32 option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionSfixed32(
  desc: AnyDesc,
  id: number
): number | undefined {
  let optValue: number | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Bit32);
  if (reader) {
    optValue = reader.sfixed32();
  }
  return optValue;
}

/**
 * Returns the value of a custom float option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionFloat(
  desc: AnyDesc,
  id: number
): number | undefined {
  let optValue: number | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Bit32);
  if (reader) {
    optValue = reader.float();
  }
  return optValue;
}

/**
 * Returns the value of a custom double option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionDouble(
  desc: AnyDesc,
  id: number
): number | undefined {
  let optValue: number | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.Bit64);
  if (reader) {
    optValue = reader.double();
  }
  return optValue;
}

/**
 * Returns the value of a custom bytes option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionBytes(
  desc: AnyDesc,
  id: number
): Uint8Array | undefined {
  let optValue: Uint8Array | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.LengthDelimited);
  if (reader) {
    optValue = reader.bytes();
  }
  return optValue;
}

/**
 * Returns the value of a custom string option for the given descriptor and ID.
 *
 * If no options are found, returns undefined.
 */
export function getCustomOptionString(
  desc: AnyDesc,
  id: number
): string | undefined {
  let optValue: string | undefined = undefined;
  const reader = getBinaryReader(desc, id, WireType.LengthDelimited);
  if (reader) {
    optValue = reader.string();
  }
  return optValue;
}

/**
 * Returns the value of a custom message option for the given descriptor and ID.
 * The msgType param is then used to deserialize the message for returning to the caller.
 *
 * If no options are found, returns undefined.
 *
 * If the message option is unable to be read or deserialized, an error will be thrown.
 */
export function getCustomOptionMessage(
  desc: AnyDesc,
  id: number,
  msgType: MessageType<AnyMessage>
): AnyMessage | undefined {
  const reader = getBinaryReader(desc, id, WireType.LengthDelimited);
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
export function getCustomOptionEnum(
  desc: AnyDesc,
  id: number
): number | undefined {
  return getCustomOptionInt32(desc, id);
}
