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

// @generated by protoc-gen-es v1.9.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/struct.proto (package google.protobuf, syntax proto3)
/* eslint-disable */

import { proto3 } from "@bufbuild/protobuf";

/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 * The JSON representation for `NullValue` is JSON `null`.
 *
 * @generated from enum google.protobuf.NullValue
 */
export const NullValue = /*@__PURE__*/ proto3.makeEnum(
  "google.protobuf.NullValue",
  [
    {no: 0, name: "NULL_VALUE"},
  ],
);

/**
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 *
 * The JSON representation for `Struct` is JSON object.
 *
 * @generated from message google.protobuf.Struct
 */
export const Struct = /*@__PURE__*/ proto3.makeMessageType(
  "google.protobuf.Struct",
  () => [
    { no: 1, name: "fields", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "message", T: Value} },
  ],
);

Struct.prototype.toJson = function toJson(options) {
  const json = {}
  for (const [k, v] of Object.entries(this.fields)) {
    json[k] = v.toJson(options);
  }
  return json;
};

Struct.prototype.fromJson = function fromJson(json, options) {
  if (typeof json != "object" || json == null || Array.isArray(json)) {
    throw new Error("cannot decode google.protobuf.Struct from JSON " + proto3.json.debug(json));
  }
  for (const [k, v] of Object.entries(json)) {
    this.fields[k] = Value.fromJson(v);
  }
  return this;
};

/**
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of these
 * variants. Absence of any variant indicates an error.
 *
 * The JSON representation for `Value` is JSON value.
 *
 * @generated from message google.protobuf.Value
 */
export const Value = /*@__PURE__*/ proto3.makeMessageType(
  "google.protobuf.Value",
  () => [
    { no: 1, name: "null_value", kind: "enum", T: proto3.getEnumType(NullValue), oneof: "kind" },
    { no: 2, name: "number_value", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, oneof: "kind" },
    { no: 3, name: "string_value", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "kind" },
    { no: 4, name: "bool_value", kind: "scalar", T: 8 /* ScalarType.BOOL */, oneof: "kind" },
    { no: 5, name: "struct_value", kind: "message", T: Struct, oneof: "kind" },
    { no: 6, name: "list_value", kind: "message", T: ListValue, oneof: "kind" },
  ],
);

Value.prototype.toJson = function toJson(options) {
  switch (this.kind.case) {
    case "nullValue":
      return null;
    case "numberValue":
      if (!Number.isFinite(this.kind.value)) {
          throw new Error("google.protobuf.Value cannot be NaN or Infinity");
      }
    case "boolValue":
    case "stringValue":
      return this.kind.value;
    case "structValue":
    case "listValue":
      return this.kind.value.toJson({...options, emitDefaultValues: true});
  }
  throw new Error("google.protobuf.Value must have a value");
};

Value.prototype.fromJson = function fromJson(json, options) {
  switch (typeof json) {
    case "number":
      this.kind = { case: "numberValue", value: json };
      break;
    case "string":
      this.kind = { case: "stringValue", value: json };
      break;
    case "boolean":
      this.kind = { case: "boolValue", value: json };
      break;
    case "object":
      if (json === null) {
        this.kind = { case: "nullValue", value: NullValue.NULL_VALUE };
      } else if (Array.isArray(json)) {
        this.kind = { case: "listValue", value: ListValue.fromJson(json) };
      } else {
        this.kind = { case: "structValue", value: Struct.fromJson(json) };
      }
      break;
    default:
      throw new Error("cannot decode google.protobuf.Value from JSON " + proto3.json.debug(json));
  }
  return this;
};

/**
 * `ListValue` is a wrapper around a repeated field of values.
 *
 * The JSON representation for `ListValue` is JSON array.
 *
 * @generated from message google.protobuf.ListValue
 */
export const ListValue = /*@__PURE__*/ proto3.makeMessageType(
  "google.protobuf.ListValue",
  () => [
    { no: 1, name: "values", kind: "message", T: Value, repeated: true },
  ],
);

ListValue.prototype.toJson = function toJson(options) {
  return this.values.map(v => v.toJson());
}

ListValue.prototype.fromJson = function fromJson(json, options) {
  if (!Array.isArray(json)) {
    throw new Error("cannot decode google.protobuf.ListValue from JSON " + proto3.json.debug(json));
  }
  for (let e of json) {
    this.values.push(Value.fromJson(e));
  }
  return this;
};

