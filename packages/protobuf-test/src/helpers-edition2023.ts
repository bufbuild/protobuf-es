// Copyright 2021-2026 Buf Technologies, Inc.
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

import { create, protoInt64 } from "@bufbuild/protobuf";
import * as edition2023_ts from "./gen/ts/extra/edition2023_pb.js";

export function fillEdition2023MessageNames() {
  return [
    // explicit
    "explicitStringField",
    "explicitInt64Field",
    "explicitInt64JsNumberField",
    "explicitInt64JsStringField",
    "explicitEnumOpenField",
    "explicitEnumClosedField",
    "explicitMessageField",
    "explicitMessageDelimitedField",
    "explicitWrappedUint32Field",
    // implicit
    "implicitStringField",
    "implicitInt64Field",
    "implicitInt64JsNumberField",
    "implicitInt64JsStringField",
    "implicitEnumOpenField",
    // required
    "requiredStringField",
    "requiredBytesField",
    "requiredInt32Field",
    "requiredInt64Field",
    "requiredInt64JsNumberField",
    "requiredInt64JsStringField",
    "requiredFloatField",
    "requiredBoolField",
    "requiredEnumOpenField",
    "requiredEnumClosedField",
    "requiredMessageField",
    "requiredMessageDelimitedField",
    "requiredWrappedUint32Field",
    // required with default
    "requiredDefaultStringField",
    "requiredDefaultBytesField",
    "requiredDefaultInt32Field",
    "requiredDefaultInt64Field",
    "requiredDefaultInt64JsNumberField",
    "requiredDefaultInt64JsStringField",
    "requiredDefaultFloatField",
    "requiredDefaultBoolField",
    "requiredDefaultEnumOpenField",
    "requiredDefaultEnumClosedField",
    // repeated
    "repeatedStringField",
    // map
    "mapStringStringField",
    // oneof
    "oneofBoolField",
  ] as const;
}

export function fillEdition2023Message(msg: edition2023_ts.Edition2023Message) {
  const desc = edition2023_ts.Edition2023MessageSchema;

  // explicit
  msg.explicitStringField = "";
  msg.explicitInt64Field = protoInt64.zero;
  msg.explicitInt64JsNumberField = protoInt64.zero;
  msg.explicitInt64JsStringField = "0";
  msg.explicitEnumOpenField = edition2023_ts.Edition2023EnumOpen.A;
  msg.explicitEnumClosedField = edition2023_ts.Edition2023EnumClosed.A;
  msg.explicitMessageField = fillEdition2023Required(create(desc));
  msg.explicitMessageDelimitedField = fillEdition2023Required(create(desc));
  msg.explicitWrappedUint32Field = 66;

  // implicit
  msg.implicitStringField = "non-zero";
  msg.implicitInt64Field = protoInt64.parse(123);
  msg.implicitInt64JsNumberField = protoInt64.parse(123);
  msg.implicitInt64JsStringField = "456";
  msg.implicitEnumOpenField = edition2023_ts.Edition2023EnumOpen.A;

  // required
  msg.requiredStringField = "non-zero";
  msg.requiredBytesField = new Uint8Array();
  msg.requiredInt32Field = 0;
  msg.requiredInt64Field = protoInt64.parse(123);
  msg.requiredInt64JsNumberField = protoInt64.parse(123);
  msg.requiredInt64JsStringField = "456";
  msg.requiredFloatField = 0;
  msg.requiredBoolField = false;
  msg.requiredEnumOpenField = edition2023_ts.Edition2023EnumOpen.A;
  msg.requiredEnumClosedField = edition2023_ts.Edition2023EnumClosed.A;
  msg.requiredMessageField = create(
    edition2023_ts.Edition2023Message_ChildSchema,
  );
  msg.requiredMessageDelimitedField = create(
    edition2023_ts.Edition2023Message_ChildSchema,
  );
  msg.requiredWrappedUint32Field = 66;

  // required with default
  msg.requiredDefaultStringField = "non-zero";
  msg.requiredDefaultBytesField = new Uint8Array();
  msg.requiredDefaultInt32Field = 0;
  msg.requiredDefaultInt64Field = protoInt64.parse(123);
  msg.requiredDefaultInt64JsNumberField = protoInt64.parse(123);
  msg.requiredDefaultInt64JsStringField = "456";
  msg.requiredDefaultFloatField = 0;
  msg.requiredDefaultBoolField = false;
  msg.requiredDefaultEnumOpenField = edition2023_ts.Edition2023EnumOpen.A;
  msg.requiredDefaultEnumClosedField = edition2023_ts.Edition2023EnumClosed.A;

  // repeated
  msg.repeatedStringField = ["abc"];
  // map
  msg.mapStringStringField = { foo: "bar" };
  // oneof
  msg.either = { case: "oneofBoolField", value: false };

  return msg;
}

function fillEdition2023Required(msg: edition2023_ts.Edition2023Message) {
  // required
  msg.requiredStringField = "non-zero";
  msg.requiredBytesField = new Uint8Array();
  msg.requiredInt32Field = 0;
  msg.requiredInt64Field = protoInt64.parse(123);
  msg.requiredInt64JsNumberField = protoInt64.parse(123);
  msg.requiredInt64JsStringField = "456";
  msg.requiredFloatField = 0;
  msg.requiredBoolField = false;
  msg.requiredEnumOpenField = edition2023_ts.Edition2023EnumOpen.A;
  msg.requiredEnumClosedField = edition2023_ts.Edition2023EnumClosed.A;
  msg.requiredMessageField = create(
    edition2023_ts.Edition2023Message_ChildSchema,
  );
  msg.requiredMessageDelimitedField = create(
    edition2023_ts.Edition2023Message_ChildSchema,
  );
  msg.requiredWrappedUint32Field = 66;

  // required with default
  msg.requiredDefaultStringField = "non-zero";
  msg.requiredDefaultBytesField = new Uint8Array();
  msg.requiredDefaultInt32Field = 0;
  msg.requiredDefaultInt64Field = protoInt64.parse(123);
  msg.requiredDefaultInt64JsNumberField = protoInt64.parse(123);
  msg.requiredDefaultInt64JsStringField = "456";
  msg.requiredDefaultFloatField = 0;
  msg.requiredDefaultBoolField = false;
  msg.requiredDefaultEnumOpenField = edition2023_ts.Edition2023EnumOpen.A;
  msg.requiredDefaultEnumClosedField = edition2023_ts.Edition2023EnumClosed.A;
  return msg;
}
