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

import type { Message } from "../types.js";
import type {
  BoolValue,
  BytesValue,
  DoubleValue,
  FloatValue,
  Int32Value,
  Int64Value,
  StringValue,
  UInt32Value,
  UInt64Value,
} from "../wkt/gen/google/protobuf/wrappers_pbv2.js";
import type { DescField, DescMessage } from "../../descriptor-set.js";

export function isWktWrapper(
  arg: Message,
): arg is
  | DoubleValue
  | FloatValue
  | Int64Value
  | UInt64Value
  | Int32Value
  | UInt32Value
  | BoolValue
  | StringValue
  | BytesValue {
  return isWrapperTypeName(arg.$typeName);
}

export type WktWrapperDesc = DescMessage & {
  fields: [
    DescField & {
      fieldKind: "scalar";
      number: 1;
      name: "value";
      oneof: undefined;
    },
  ];
};

export function isWktWrapperDesc(
  messageDesc: DescMessage,
): messageDesc is WktWrapperDesc {
  const f = messageDesc.fields[0] as DescField | undefined;
  return (
    isWrapperTypeName(messageDesc.typeName) &&
    f !== undefined &&
    f.fieldKind == "scalar" &&
    f.name == "value" &&
    f.number == 1
  );
}

function isWrapperTypeName(name: string): boolean {
  return (
    name.startsWith("google.protobuf.") &&
    [
      "DoubleValue",
      "FloatValue",
      "Int64Value",
      "UInt64Value",
      "Int32Value",
      "UInt32Value",
      "BoolValue",
      "StringValue",
      "BytesValue",
    ].includes(name.substring(16))
  );
}
