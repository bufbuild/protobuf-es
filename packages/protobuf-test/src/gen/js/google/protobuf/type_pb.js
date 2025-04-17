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

// @generated by protoc-gen-es v1.10.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/type.proto (package google.protobuf, syntax proto3)
/* eslint-disable */

import { proto3 } from "@bufbuild/protobuf";
import { SourceContext } from "./source_context_pb.js";
import { Any } from "./any_pb.js";

/**
 * The syntax in which a protocol buffer element is defined.
 *
 * @generated from enum google.protobuf.Syntax
 */
export const Syntax = /*@__PURE__*/ proto3.makeEnum(
  "google.protobuf.Syntax",
  [
    {no: 0, name: "SYNTAX_PROTO2", localName: "PROTO2"},
    {no: 1, name: "SYNTAX_PROTO3", localName: "PROTO3"},
    {no: 2, name: "SYNTAX_EDITIONS", localName: "EDITIONS"},
  ],
);

/**
 * A protocol buffer message type.
 *
 * @generated from message google.protobuf.Type
 */
export const Type = /*@__PURE__*/ proto3.makeMessageType(
  "google.protobuf.Type",
  () => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "fields", kind: "message", T: Field, repeated: true },
    { no: 3, name: "oneofs", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 4, name: "options", kind: "message", T: Option, repeated: true },
    { no: 5, name: "source_context", kind: "message", T: SourceContext },
    { no: 6, name: "syntax", kind: "enum", T: proto3.getEnumType(Syntax) },
    { no: 7, name: "edition", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * A single field of a message type.
 *
 * @generated from message google.protobuf.Field
 */
export const Field = /*@__PURE__*/ proto3.makeMessageType(
  "google.protobuf.Field",
  () => [
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
  ],
);

/**
 * Basic field types.
 *
 * @generated from enum google.protobuf.Field.Kind
 */
export const Field_Kind = /*@__PURE__*/ proto3.makeEnum(
  "google.protobuf.Field.Kind",
  [
    {no: 0, name: "TYPE_UNKNOWN"},
    {no: 1, name: "TYPE_DOUBLE"},
    {no: 2, name: "TYPE_FLOAT"},
    {no: 3, name: "TYPE_INT64"},
    {no: 4, name: "TYPE_UINT64"},
    {no: 5, name: "TYPE_INT32"},
    {no: 6, name: "TYPE_FIXED64"},
    {no: 7, name: "TYPE_FIXED32"},
    {no: 8, name: "TYPE_BOOL"},
    {no: 9, name: "TYPE_STRING"},
    {no: 10, name: "TYPE_GROUP"},
    {no: 11, name: "TYPE_MESSAGE"},
    {no: 12, name: "TYPE_BYTES"},
    {no: 13, name: "TYPE_UINT32"},
    {no: 14, name: "TYPE_ENUM"},
    {no: 15, name: "TYPE_SFIXED32"},
    {no: 16, name: "TYPE_SFIXED64"},
    {no: 17, name: "TYPE_SINT32"},
    {no: 18, name: "TYPE_SINT64"},
  ],
);

/**
 * Whether a field is optional, required, or repeated.
 *
 * @generated from enum google.protobuf.Field.Cardinality
 */
export const Field_Cardinality = /*@__PURE__*/ proto3.makeEnum(
  "google.protobuf.Field.Cardinality",
  [
    {no: 0, name: "CARDINALITY_UNKNOWN", localName: "UNKNOWN"},
    {no: 1, name: "CARDINALITY_OPTIONAL", localName: "OPTIONAL"},
    {no: 2, name: "CARDINALITY_REQUIRED", localName: "REQUIRED"},
    {no: 3, name: "CARDINALITY_REPEATED", localName: "REPEATED"},
  ],
);

/**
 * Enum type definition.
 *
 * @generated from message google.protobuf.Enum
 */
export const Enum = /*@__PURE__*/ proto3.makeMessageType(
  "google.protobuf.Enum",
  () => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "enumvalue", kind: "message", T: EnumValue, repeated: true },
    { no: 3, name: "options", kind: "message", T: Option, repeated: true },
    { no: 4, name: "source_context", kind: "message", T: SourceContext },
    { no: 5, name: "syntax", kind: "enum", T: proto3.getEnumType(Syntax) },
    { no: 6, name: "edition", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * Enum value definition.
 *
 * @generated from message google.protobuf.EnumValue
 */
export const EnumValue = /*@__PURE__*/ proto3.makeMessageType(
  "google.protobuf.EnumValue",
  () => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "number", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "options", kind: "message", T: Option, repeated: true },
  ],
);

/**
 * A protocol buffer option, which can be attached to a message, field,
 * enumeration, etc.
 *
 * @generated from message google.protobuf.Option
 */
export const Option = /*@__PURE__*/ proto3.makeMessageType(
  "google.protobuf.Option",
  () => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "message", T: Any },
  ],
);

