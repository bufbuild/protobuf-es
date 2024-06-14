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

import * as proto3_ts from "./gen/ts/extra/proto3_pb.js";
import { create } from "@bufbuild/protobuf";
import { protoInt64 } from "@bufbuild/protobuf";

export function fillProto3MessageNames() {
  return [
    // singular
    "singularStringField",
    "singularBytesField",
    "singularInt64Field",
    "singularInt64JsNumberField",
    "singularInt64JsStringField",
    "singularEnumField",
    "singularMessageField",
    "singularWrappedUint32Field",
    // optional
    "optionalStringField",
    "optionalInt64Field",
    "optionalInt64JsNumberField",
    "optionalInt64JsStringField",
    "optionalEnumField",
    "optionalMessageField",
    "optionalWrappedUint32Field",
    // repeated
    "repeatedStringField",
    "repeatedMessageField",
    // map
    "mapStringStringField",
    "mapInt32MessageField",
    // oneof
    "oneofBoolField",
  ] as const;
}

export function fillProto3Message(msg: proto3_ts.Proto3Message) {
  const desc = proto3_ts.Proto3MessageSchema;
  // singular
  msg.singularStringField = "non-zero";
  msg.singularBytesField = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
  msg.singularInt64Field = protoInt64.parse(123);
  msg.singularInt64JsNumberField = protoInt64.parse(123);
  msg.singularInt64JsStringField = "456";
  msg.singularEnumField = proto3_ts.Proto3Enum.YES;
  msg.singularMessageField = create(desc);
  msg.singularMessageField.either = {
    case: "oneofBoolField",
    value: false,
  };
  msg.singularWrappedUint32Field = 456;
  // optional
  msg.optionalStringField = "";
  msg.optionalInt64Field = protoInt64.zero;
  msg.optionalInt64JsNumberField = protoInt64.zero;
  msg.optionalInt64JsStringField = "0";
  msg.optionalEnumField = proto3_ts.Proto3Enum.UNSPECIFIED;
  msg.optionalMessageField = create(desc);
  msg.optionalWrappedUint32Field = 0;
  // repeated
  msg.repeatedStringField = ["abc"];
  msg.repeatedMessageField = [
    create(proto3_ts.Proto3MessageSchema),
    create(proto3_ts.Proto3MessageSchema),
  ];
  // map
  msg.mapStringStringField = { foo: "bar" };
  msg.mapInt32MessageField = { 123: create(proto3_ts.Proto3MessageSchema) };
  // oneof
  msg.either = { case: "oneofBoolField", value: false };
  return msg;
}
