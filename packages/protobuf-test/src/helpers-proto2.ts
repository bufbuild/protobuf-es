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

import * as proto2_ts from "./gen/ts/extra/proto2_pbv2.js";
import { create } from "@bufbuild/protobuf";
import { protoInt64 } from "@bufbuild/protobuf";

export function fillProto2MessageNames() {
  return [
    // required
    "requiredStringField",
    "requiredInt64Field",
    "requiredInt64JsNumberField",
    "requiredInt64JsStringField",
    "requiredEnumField",
    "requiredMessageField",
    "requiredgroup",
    "requiredWrappedUint32Field",
    // required with default
    "requiredDefaultStringField",
    "requiredDefaultInt64Field",
    "requiredDefaultInt64JsNumberField",
    "requiredDefaultInt64JsStringField",
    "requiredDefaultEnumField",
    "requiredDefaultMessageField",
    "requireddefaultgroup",
    "requiredDefaultWrappedUint32Field",
    // optional
    "optionalStringField",
    "optionalInt64Field",
    "optionalInt64JsNumberField",
    "optionalInt64JsStringField",
    "optionalEnumField",
    "optionalMessageField",
    "optionalgroup",
    "optionalWrappedUint32Field",
    // optional with default
    "optionalDefaultStringField",
    "optionalDefaultInt64Field",
    "optionalDefaultInt64JsNumberField",
    "optionalDefaultInt64JsStringField",
    "optionalDefaultEnumField",
    "optionalDefaultMessageField",
    "optionaldefaultgroup",
    "optionalDefaultWrappedUint32Field",
    // repeated
    "repeatedStringField",
    // map
    "mapStringStringField",
    // oneof
    "oneofBoolField",
  ] as const;
}

export function fillProto2Message(msg: proto2_ts.Proto2Message) {
  const desc = proto2_ts.Proto2MessageDesc;
  // required
  msg.requiredStringField = "non-zero";
  msg.requiredInt64Field = protoInt64.parse(123);
  msg.requiredInt64JsNumberField = protoInt64.parse(123);
  msg.requiredInt64JsStringField = "456";
  msg.requiredEnumField = proto2_ts.Proto2Enum.YES;
  msg.requiredMessageField = create(desc);
  msg.requiredgroup = create(proto2_ts.Proto2Message_RequiredGroupDesc);
  msg.requiredWrappedUint32Field = 66;
  // required with default
  msg.requiredDefaultStringField = "non-zero";
  msg.requiredDefaultInt64Field = protoInt64.parse(123);
  msg.requiredDefaultInt64JsNumberField = protoInt64.parse(123);
  msg.requiredDefaultInt64JsStringField = "456";
  msg.requiredDefaultEnumField = proto2_ts.Proto2Enum.YES;
  msg.requiredDefaultMessageField = create(desc);
  msg.requireddefaultgroup = create(
    proto2_ts.Proto2Message_RequiredDefaultGroupDesc,
  );
  msg.requiredDefaultWrappedUint32Field = 66;
  // optional
  msg.optionalStringField = "";
  msg.optionalInt64Field = protoInt64.zero;
  msg.optionalInt64JsNumberField = protoInt64.zero;
  msg.optionalInt64JsStringField = "0";
  msg.optionalEnumField = proto2_ts.Proto2Enum.YES;
  msg.optionalMessageField = create(desc);
  msg.optionalgroup = create(proto2_ts.Proto2Message_OptionalGroupDesc);
  msg.optionalWrappedUint32Field = 66;
  // optional with default
  msg.optionalDefaultStringField = "";
  msg.optionalDefaultInt64Field = protoInt64.zero;
  msg.optionalDefaultInt64JsNumberField = protoInt64.zero;
  msg.optionalDefaultInt64JsStringField = "0";
  msg.optionalDefaultEnumField = proto2_ts.Proto2Enum.YES;
  msg.optionalDefaultMessageField = create(desc);
  msg.optionaldefaultgroup = create(
    proto2_ts.Proto2Message_OptionalDefaultGroupDesc,
  );
  msg.optionalDefaultWrappedUint32Field = 66;
  // repeated
  msg.repeatedStringField = ["abc"];
  // map
  msg.mapStringStringField = { foo: "bar" };
  // oneof
  msg.either = { case: "oneofBoolField", value: false };
  return msg;
}
