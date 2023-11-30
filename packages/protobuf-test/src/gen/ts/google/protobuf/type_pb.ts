// Copyright 2021-2023 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v1.5.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/type.proto (package google.protobuf, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { SourceContext } from "./source_context_pb.js";
import { Any } from "./any_pb.js";

/**
 * The syntax in which a protocol buffer element is defined.
 *
 * @generated from enum google.protobuf.Syntax
 */
export enum Syntax {
  /**
   * Syntax `proto2`.
   *
   * @generated from enum value: SYNTAX_PROTO2 = 0;
   */
  PROTO2 = 0,

  /**
   * Syntax `proto3`.
   *
   * @generated from enum value: SYNTAX_PROTO3 = 1;
   */
  PROTO3 = 1,

  /**
   * Syntax `editions`.
   *
   * @generated from enum value: SYNTAX_EDITIONS = 2;
   */
  EDITIONS = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(Syntax)
proto3.util.setEnumType(Syntax, "google.protobuf.Syntax", [
  { no: 0, name: "SYNTAX_PROTO2" },
  { no: 1, name: "SYNTAX_PROTO3" },
  { no: 2, name: "SYNTAX_EDITIONS" },
]);

/**
 * A protocol buffer message type.
 *
 * @generated from message google.protobuf.Type
 */
export class Type extends Message<Type> {
  /**
   * The fully qualified message name.
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * The list of fields.
   *
   * @generated from field: repeated google.protobuf.Field fields = 2;
   */
  fields: Field[] = [];

  /**
   * The list of types appearing in `oneof` definitions in this type.
   *
   * @generated from field: repeated string oneofs = 3;
   */
  oneofs: string[] = [];

  /**
   * The protocol buffer options.
   *
   * @generated from field: repeated google.protobuf.Option options = 4;
   */
  options: Option[] = [];

  /**
   * The source context.
   *
   * @generated from field: google.protobuf.SourceContext source_context = 5;
   */
  sourceContext?: SourceContext;

  /**
   * The source syntax.
   *
   * @generated from field: google.protobuf.Syntax syntax = 6;
   */
  syntax = Syntax.PROTO2;

  /**
   * The source edition string, only valid when syntax is SYNTAX_EDITIONS.
   *
   * @generated from field: string edition = 7;
   */
  edition = "";

  constructor(data?: PartialMessage<Type>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "google.protobuf.Type";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "fields", kind: "message", T: Field, repeated: true },
    { no: 3, name: "oneofs", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 4, name: "options", kind: "message", T: Option, repeated: true },
    { no: 5, name: "source_context", kind: "message", T: SourceContext },
    { no: 6, name: "syntax", kind: "enum", T: proto3.getEnumType(Syntax) },
    { no: 7, name: "edition", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Type {
    return new Type().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Type {
    return new Type().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Type {
    return new Type().fromJsonString(jsonString, options);
  }

  static equals(a: Type | PlainMessage<Type> | undefined, b: Type | PlainMessage<Type> | undefined): boolean {
    return proto3.util.equals(Type, a, b);
  }
}

/**
 * A single field of a message type.
 *
 * @generated from message google.protobuf.Field
 */
export class Field extends Message<Field> {
  /**
   * The field type.
   *
   * @generated from field: google.protobuf.Field.Kind kind = 1;
   */
  kind = Field_Kind.TYPE_UNKNOWN;

  /**
   * The field cardinality.
   *
   * @generated from field: google.protobuf.Field.Cardinality cardinality = 2;
   */
  cardinality = Field_Cardinality.UNKNOWN;

  /**
   * The field number.
   *
   * @generated from field: int32 number = 3;
   */
  number = 0;

  /**
   * The field name.
   *
   * @generated from field: string name = 4;
   */
  name = "";

  /**
   * The field type URL, without the scheme, for message or enumeration
   * types. Example: `"type.googleapis.com/google.protobuf.Timestamp"`.
   *
   * @generated from field: string type_url = 6;
   */
  typeUrl = "";

  /**
   * The index of the field type in `Type.oneofs`, for message or enumeration
   * types. The first type has index 1; zero means the type is not in the list.
   *
   * @generated from field: int32 oneof_index = 7;
   */
  oneofIndex = 0;

  /**
   * Whether to use alternative packed wire representation.
   *
   * @generated from field: bool packed = 8;
   */
  packed = false;

  /**
   * The protocol buffer options.
   *
   * @generated from field: repeated google.protobuf.Option options = 9;
   */
  options: Option[] = [];

  /**
   * The field JSON name.
   *
   * @generated from field: string json_name = 10;
   */
  jsonName = "";

  /**
   * The string value of the default value of this field. Proto2 syntax only.
   *
   * @generated from field: string default_value = 11;
   */
  defaultValue = "";

  constructor(data?: PartialMessage<Field>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "google.protobuf.Field";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "kind", kind: "enum", T: proto3.getEnumType(Field_Kind) },
    { no: 2, name: "cardinality", kind: "enum", T: proto3.getEnumType(Field_Cardinality) },
    { no: 3, name: "number", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "type_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "oneof_index", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 8, name: "packed", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 9, name: "options", kind: "message", T: Option, repeated: true },
    { no: 10, name: "json_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 11, name: "default_value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Field {
    return new Field().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Field {
    return new Field().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Field {
    return new Field().fromJsonString(jsonString, options);
  }

  static equals(a: Field | PlainMessage<Field> | undefined, b: Field | PlainMessage<Field> | undefined): boolean {
    return proto3.util.equals(Field, a, b);
  }
}

/**
 * Basic field types.
 *
 * @generated from enum google.protobuf.Field.Kind
 */
export enum Field_Kind {
  /**
   * Field type unknown.
   *
   * @generated from enum value: TYPE_UNKNOWN = 0;
   */
  TYPE_UNKNOWN = 0,

  /**
   * Field type double.
   *
   * @generated from enum value: TYPE_DOUBLE = 1;
   */
  TYPE_DOUBLE = 1,

  /**
   * Field type float.
   *
   * @generated from enum value: TYPE_FLOAT = 2;
   */
  TYPE_FLOAT = 2,

  /**
   * Field type int64.
   *
   * @generated from enum value: TYPE_INT64 = 3;
   */
  TYPE_INT64 = 3,

  /**
   * Field type uint64.
   *
   * @generated from enum value: TYPE_UINT64 = 4;
   */
  TYPE_UINT64 = 4,

  /**
   * Field type int32.
   *
   * @generated from enum value: TYPE_INT32 = 5;
   */
  TYPE_INT32 = 5,

  /**
   * Field type fixed64.
   *
   * @generated from enum value: TYPE_FIXED64 = 6;
   */
  TYPE_FIXED64 = 6,

  /**
   * Field type fixed32.
   *
   * @generated from enum value: TYPE_FIXED32 = 7;
   */
  TYPE_FIXED32 = 7,

  /**
   * Field type bool.
   *
   * @generated from enum value: TYPE_BOOL = 8;
   */
  TYPE_BOOL = 8,

  /**
   * Field type string.
   *
   * @generated from enum value: TYPE_STRING = 9;
   */
  TYPE_STRING = 9,

  /**
   * Field type group. Proto2 syntax only, and deprecated.
   *
   * @generated from enum value: TYPE_GROUP = 10;
   */
  TYPE_GROUP = 10,

  /**
   * Field type message.
   *
   * @generated from enum value: TYPE_MESSAGE = 11;
   */
  TYPE_MESSAGE = 11,

  /**
   * Field type bytes.
   *
   * @generated from enum value: TYPE_BYTES = 12;
   */
  TYPE_BYTES = 12,

  /**
   * Field type uint32.
   *
   * @generated from enum value: TYPE_UINT32 = 13;
   */
  TYPE_UINT32 = 13,

  /**
   * Field type enum.
   *
   * @generated from enum value: TYPE_ENUM = 14;
   */
  TYPE_ENUM = 14,

  /**
   * Field type sfixed32.
   *
   * @generated from enum value: TYPE_SFIXED32 = 15;
   */
  TYPE_SFIXED32 = 15,

  /**
   * Field type sfixed64.
   *
   * @generated from enum value: TYPE_SFIXED64 = 16;
   */
  TYPE_SFIXED64 = 16,

  /**
   * Field type sint32.
   *
   * @generated from enum value: TYPE_SINT32 = 17;
   */
  TYPE_SINT32 = 17,

  /**
   * Field type sint64.
   *
   * @generated from enum value: TYPE_SINT64 = 18;
   */
  TYPE_SINT64 = 18,
}
// Retrieve enum metadata with: proto3.getEnumType(Field_Kind)
proto3.util.setEnumType(Field_Kind, "google.protobuf.Field.Kind", [
  { no: 0, name: "TYPE_UNKNOWN" },
  { no: 1, name: "TYPE_DOUBLE" },
  { no: 2, name: "TYPE_FLOAT" },
  { no: 3, name: "TYPE_INT64" },
  { no: 4, name: "TYPE_UINT64" },
  { no: 5, name: "TYPE_INT32" },
  { no: 6, name: "TYPE_FIXED64" },
  { no: 7, name: "TYPE_FIXED32" },
  { no: 8, name: "TYPE_BOOL" },
  { no: 9, name: "TYPE_STRING" },
  { no: 10, name: "TYPE_GROUP" },
  { no: 11, name: "TYPE_MESSAGE" },
  { no: 12, name: "TYPE_BYTES" },
  { no: 13, name: "TYPE_UINT32" },
  { no: 14, name: "TYPE_ENUM" },
  { no: 15, name: "TYPE_SFIXED32" },
  { no: 16, name: "TYPE_SFIXED64" },
  { no: 17, name: "TYPE_SINT32" },
  { no: 18, name: "TYPE_SINT64" },
]);

/**
 * Whether a field is optional, required, or repeated.
 *
 * @generated from enum google.protobuf.Field.Cardinality
 */
export enum Field_Cardinality {
  /**
   * For fields with unknown cardinality.
   *
   * @generated from enum value: CARDINALITY_UNKNOWN = 0;
   */
  UNKNOWN = 0,

  /**
   * For optional fields.
   *
   * @generated from enum value: CARDINALITY_OPTIONAL = 1;
   */
  OPTIONAL = 1,

  /**
   * For required fields. Proto2 syntax only.
   *
   * @generated from enum value: CARDINALITY_REQUIRED = 2;
   */
  REQUIRED = 2,

  /**
   * For repeated fields.
   *
   * @generated from enum value: CARDINALITY_REPEATED = 3;
   */
  REPEATED = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(Field_Cardinality)
proto3.util.setEnumType(Field_Cardinality, "google.protobuf.Field.Cardinality", [
  { no: 0, name: "CARDINALITY_UNKNOWN" },
  { no: 1, name: "CARDINALITY_OPTIONAL" },
  { no: 2, name: "CARDINALITY_REQUIRED" },
  { no: 3, name: "CARDINALITY_REPEATED" },
]);

/**
 * Enum type definition.
 *
 * @generated from message google.protobuf.Enum
 */
export class Enum extends Message<Enum> {
  /**
   * Enum type name.
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * Enum value definitions.
   *
   * @generated from field: repeated google.protobuf.EnumValue enumvalue = 2;
   */
  enumvalue: EnumValue[] = [];

  /**
   * Protocol buffer options.
   *
   * @generated from field: repeated google.protobuf.Option options = 3;
   */
  options: Option[] = [];

  /**
   * The source context.
   *
   * @generated from field: google.protobuf.SourceContext source_context = 4;
   */
  sourceContext?: SourceContext;

  /**
   * The source syntax.
   *
   * @generated from field: google.protobuf.Syntax syntax = 5;
   */
  syntax = Syntax.PROTO2;

  /**
   * The source edition string, only valid when syntax is SYNTAX_EDITIONS.
   *
   * @generated from field: string edition = 6;
   */
  edition = "";

  constructor(data?: PartialMessage<Enum>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "google.protobuf.Enum";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "enumvalue", kind: "message", T: EnumValue, repeated: true },
    { no: 3, name: "options", kind: "message", T: Option, repeated: true },
    { no: 4, name: "source_context", kind: "message", T: SourceContext },
    { no: 5, name: "syntax", kind: "enum", T: proto3.getEnumType(Syntax) },
    { no: 6, name: "edition", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Enum {
    return new Enum().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Enum {
    return new Enum().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Enum {
    return new Enum().fromJsonString(jsonString, options);
  }

  static equals(a: Enum | PlainMessage<Enum> | undefined, b: Enum | PlainMessage<Enum> | undefined): boolean {
    return proto3.util.equals(Enum, a, b);
  }
}

/**
 * Enum value definition.
 *
 * @generated from message google.protobuf.EnumValue
 */
export class EnumValue extends Message<EnumValue> {
  /**
   * Enum value name.
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * Enum value number.
   *
   * @generated from field: int32 number = 2;
   */
  number = 0;

  /**
   * Protocol buffer options.
   *
   * @generated from field: repeated google.protobuf.Option options = 3;
   */
  options: Option[] = [];

  constructor(data?: PartialMessage<EnumValue>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "google.protobuf.EnumValue";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "number", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "options", kind: "message", T: Option, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EnumValue {
    return new EnumValue().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EnumValue {
    return new EnumValue().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EnumValue {
    return new EnumValue().fromJsonString(jsonString, options);
  }

  static equals(a: EnumValue | PlainMessage<EnumValue> | undefined, b: EnumValue | PlainMessage<EnumValue> | undefined): boolean {
    return proto3.util.equals(EnumValue, a, b);
  }
}

/**
 * A protocol buffer option, which can be attached to a message, field,
 * enumeration, etc.
 *
 * @generated from message google.protobuf.Option
 */
export class Option extends Message<Option> {
  /**
   * The option's name. For protobuf built-in options (options defined in
   * descriptor.proto), this is the short name. For example, `"map_entry"`.
   * For custom options, it should be the fully-qualified name. For example,
   * `"google.api.http"`.
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * The option's value packed in an Any message. If the value is a primitive,
   * the corresponding wrapper type defined in google/protobuf/wrappers.proto
   * should be used. If the value is an enum, it should be stored as an int32
   * value using the google.protobuf.Int32Value type.
   *
   * @generated from field: google.protobuf.Any value = 2;
   */
  value?: Any;

  constructor(data?: PartialMessage<Option>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "google.protobuf.Option";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "message", T: Any },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Option {
    return new Option().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Option {
    return new Option().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Option {
    return new Option().fromJsonString(jsonString, options);
  }

  static equals(a: Option | PlainMessage<Option> | undefined, b: Option | PlainMessage<Option> | undefined): boolean {
    return proto3.util.equals(Option, a, b);
  }
}

