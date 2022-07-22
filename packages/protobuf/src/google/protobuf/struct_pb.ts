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

// @generated by protoc-gen-es v0.0.9 with parameter "bootstrap_wkt=true,ts_nocheck=false,target=ts"
// @generated from file google/protobuf/struct.proto (package google.protobuf, syntax proto3)
/* eslint-disable */

import {proto3} from "../../proto3.js";
import type {PartialMessage, PlainMessage} from "../../message.js";
import {Message} from "../../message.js";
import type {JsonObject, JsonReadOptions, JsonValue, JsonWriteOptions} from "../../json-format.js";
import type {FieldList} from "../../field-list.js";
import type {BinaryReadOptions} from "../../binary-format.js";

/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 *  The JSON representation for `NullValue` is JSON `null`.
 *
 * @generated from enum google.protobuf.NullValue
 */
export enum NullValue {
  /**
   * Null value.
   *
   * @generated from enum value: NULL_VALUE = 0;
   */
  NULL_VALUE = 0,
}
// Retrieve enum metadata with: proto3.getEnumType(NullValue)
proto3.util.setEnumType(NullValue, "google.protobuf.NullValue", [
  { no: 0, name: "NULL_VALUE" },
]);

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
export class Struct extends Message<Struct> {
  /**
   * Unordered map of dynamically typed values.
   *
   * @generated from field: map<string, google.protobuf.Value> fields = 1;
   */
  fields: { [key: string]: Value } = {};

  constructor(data?: PartialMessage<Struct>) {
    super();
    proto3.util.initPartial(data, this);
  }

  override toJson(options?: Partial<JsonWriteOptions>): JsonValue {
    const json: JsonObject = {}
    for (const [k, v] of Object.entries(this.fields)) {
      json[k] = v.toJson(options);
    }
    return json;
  }

  override fromJson(json: JsonValue, options?: Partial<JsonReadOptions>): this {
    if (typeof json != "object" || json == null || Array.isArray(json)) {
      throw new Error("cannot decode google.protobuf.Struct from JSON " + proto3.json.debug(json));
    }
    for (const [k, v] of Object.entries(json)) {
      this.fields[k] = Value.fromJson(v);
    }
    return this;
  }

  static readonly runtime = proto3;
  static readonly typeName = "google.protobuf.Struct";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "fields", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "message", T: Value} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Struct {
    return new Struct().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Struct {
    return new Struct().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Struct {
    return new Struct().fromJsonString(jsonString, options);
  }

  static equals(a: Struct | PlainMessage<Struct> | undefined, b: Struct | PlainMessage<Struct> | undefined): boolean {
    return proto3.util.equals(Struct, a, b);
  }
}

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
export class Value extends Message<Value> {
  /**
   * The kind of value.
   *
   * @generated from oneof google.protobuf.Value.kind
   */
  kind: {
    /**
     * Represents a null value.
     *
     * @generated from field: google.protobuf.NullValue null_value = 1;
     */
    value: NullValue;
    case: "nullValue";
  } | {
    /**
     * Represents a double value.
     *
     * @generated from field: double number_value = 2;
     */
    value: number;
    case: "numberValue";
  } | {
    /**
     * Represents a string value.
     *
     * @generated from field: string string_value = 3;
     */
    value: string;
    case: "stringValue";
  } | {
    /**
     * Represents a boolean value.
     *
     * @generated from field: bool bool_value = 4;
     */
    value: boolean;
    case: "boolValue";
  } | {
    /**
     * Represents a structured value.
     *
     * @generated from field: google.protobuf.Struct struct_value = 5;
     */
    value: Struct;
    case: "structValue";
  } | {
    /**
     * Represents a repeated `Value`.
     *
     * @generated from field: google.protobuf.ListValue list_value = 6;
     */
    value: ListValue;
    case: "listValue";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<Value>) {
    super();
    proto3.util.initPartial(data, this);
  }

  override toJson(options?: Partial<JsonWriteOptions>): JsonValue {
    switch (this.kind.case) {
      case "nullValue":
        return null;
      case "boolValue":
      case "numberValue":
      case "stringValue":
        return this.kind.value;
      case "structValue":
      case "listValue":
        return this.kind.value.toJson({...options, emitDefaultValues: true});
    }
    throw new Error("google.protobuf.Value must have a value");
  }

  override fromJson(json: JsonValue, options?: Partial<JsonReadOptions>): this {
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
  }

  static readonly runtime = proto3;
  static readonly typeName = "google.protobuf.Value";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "null_value", kind: "enum", T: proto3.getEnumType(NullValue), oneof: "kind" },
    { no: 2, name: "number_value", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, oneof: "kind" },
    { no: 3, name: "string_value", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "kind" },
    { no: 4, name: "bool_value", kind: "scalar", T: 8 /* ScalarType.BOOL */, oneof: "kind" },
    { no: 5, name: "struct_value", kind: "message", T: Struct, oneof: "kind" },
    { no: 6, name: "list_value", kind: "message", T: ListValue, oneof: "kind" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Value {
    return new Value().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Value {
    return new Value().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Value {
    return new Value().fromJsonString(jsonString, options);
  }

  static equals(a: Value | PlainMessage<Value> | undefined, b: Value | PlainMessage<Value> | undefined): boolean {
    return proto3.util.equals(Value, a, b);
  }
}

/**
 * `ListValue` is a wrapper around a repeated field of values.
 *
 * The JSON representation for `ListValue` is JSON array.
 *
 * @generated from message google.protobuf.ListValue
 */
export class ListValue extends Message<ListValue> {
  /**
   * Repeated field of dynamically typed values.
   *
   * @generated from field: repeated google.protobuf.Value values = 1;
   */
  values: Value[] = [];

  constructor(data?: PartialMessage<ListValue>) {
    super();
    proto3.util.initPartial(data, this);
  }

  override toJson(options?: Partial<JsonWriteOptions>): JsonValue {
    return this.values.map(v => v.toJson());
  }

  override fromJson(json: JsonValue, options?: Partial<JsonReadOptions>): this {
    if (!Array.isArray(json)) {
      throw new Error("cannot decode google.protobuf.ListValue from JSON " + proto3.json.debug(json));
    }
    for (let e of json) {
      this.values.push(Value.fromJson(e));
    }
    return this;
  }

  static readonly runtime = proto3;
  static readonly typeName = "google.protobuf.ListValue";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "values", kind: "message", T: Value, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListValue {
    return new ListValue().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListValue {
    return new ListValue().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListValue {
    return new ListValue().fromJsonString(jsonString, options);
  }

  static equals(a: ListValue | PlainMessage<ListValue> | undefined, b: ListValue | PlainMessage<ListValue> | undefined): boolean {
    return proto3.util.equals(ListValue, a, b);
  }
}

