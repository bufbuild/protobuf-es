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

// @generated by protoc-gen-es v1.7.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/name-clash.proto (package spec, syntax proto3)
/* eslint-disable */

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message spec.ReservedPropertyNames
 */
export const ReservedPropertyNames = proto3.makeMessageType(
  "spec.ReservedPropertyNames",
  [],
);

/**
 * @generated from enum spec.ReservedPropertyNames.EnumBuiltIn
 */
export const ReservedPropertyNames_EnumBuiltIn = proto3.makeEnum(
  "spec.ReservedPropertyNames.EnumBuiltIn",
  [
    {no: 0, name: "constructor"},
    {no: 1, name: "toString"},
    {no: 2, name: "to_JSON"},
    {no: 3, name: "value_of"},
  ],
);

/**
 * @generated from enum spec.ReservedPropertyNames.EnumRuntime
 */
export const ReservedPropertyNames_EnumRuntime = proto3.makeEnum(
  "spec.ReservedPropertyNames.EnumRuntime",
  [
    {no: 0, name: "to_json"},
    {no: 6, name: "type"},
    {no: 7, name: "clone"},
    {no: 8, name: "equals"},
    {no: 9, name: "from_binary"},
    {no: 10, name: "from_json"},
    {no: 11, name: "from_json_string"},
    {no: 12, name: "to_binary"},
    {no: 14, name: "to_json_string"},
  ],
);

/**
 * @generated from message spec.ReservedPropertyNames.BuiltIn
 */
export const ReservedPropertyNames_BuiltIn = proto3.makeMessageType(
  "spec.ReservedPropertyNames.BuiltIn",
  () => [
    { no: 2, name: "constructor", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "to_string", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "to_JSON", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "value_of", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
  {localName: "ReservedPropertyNames_BuiltIn"},
);

/**
 * @generated from message spec.ReservedPropertyNames.Runtime
 */
export const ReservedPropertyNames_Runtime = proto3.makeMessageType(
  "spec.ReservedPropertyNames.Runtime",
  () => [
    { no: 4, name: "to_json", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "clone", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "equals", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "from_binary", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "from_json", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 11, name: "from_json_string", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 12, name: "to_binary", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 14, name: "to_json_string", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
  {localName: "ReservedPropertyNames_Runtime"},
);

/**
 * @generated from message spec.ReservedPropertyNames.OneofBultIn
 */
export const ReservedPropertyNames_OneofBultIn = proto3.makeMessageType(
  "spec.ReservedPropertyNames.OneofBultIn",
  () => [
    { no: 1, name: "constructor", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "built_in" },
    { no: 2, name: "to_string", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "built_in" },
    { no: 3, name: "to_JSON", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "built_in" },
    { no: 4, name: "value_of", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "built_in" },
  ],
  {localName: "ReservedPropertyNames_OneofBultIn"},
);

/**
 * @generated from message spec.ReservedPropertyNames.OneofRuntime
 */
export const ReservedPropertyNames_OneofRuntime = proto3.makeMessageType(
  "spec.ReservedPropertyNames.OneofRuntime",
  () => [
    { no: 5, name: "to_json", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "runtime" },
    { no: 6, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "runtime" },
    { no: 7, name: "clone", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "runtime" },
    { no: 8, name: "equals", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "runtime" },
    { no: 9, name: "from_binary", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "runtime" },
    { no: 10, name: "from_json", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "runtime" },
    { no: 11, name: "from_json_string", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "runtime" },
    { no: 12, name: "to_binary", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "runtime" },
    { no: 14, name: "to_json_string", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "runtime" },
  ],
  {localName: "ReservedPropertyNames_OneofRuntime"},
);

/**
 * reserved identifier
 *
 * @generated from message spec.interface
 */
export const interface$ = proto3.makeMessageType(
  "spec.interface",
  [],
  {localName: "interface$"},
);

/**
 * reserved identifier
 *
 * @generated from message spec.function
 */
export const function$ = proto3.makeMessageType(
  "spec.function",
  [],
  {localName: "function$"},
);

/**
 * reserved identifier
 *
 * @generated from message spec.instanceof
 */
export const instanceof$ = proto3.makeMessageType(
  "spec.instanceof",
  [],
  {localName: "instanceof$"},
);

/**
 * reserved identifier
 *
 * @generated from message spec.switch
 */
export const switch$ = proto3.makeMessageType(
  "spec.switch",
  [],
  {localName: "switch$"},
);

/**
 * reserved identifier
 *
 * @generated from message spec.case
 */
export const case$ = proto3.makeMessageType(
  "spec.case",
  [],
  {localName: "case$"},
);

/**
 * reserved identifier
 *
 * @generated from message spec.return
 */
export const return$ = proto3.makeMessageType(
  "spec.return",
  [],
  {localName: "return$"},
);

/**
 * used by runtime
 *
 * @generated from message spec.Message
 */
export const Message = proto3.makeMessageType(
  "spec.Message",
  [],
);

/**
 * used by runtime
 *
 * @generated from message spec.PartialMessage
 */
export const PartialMessage = proto3.makeMessageType(
  "spec.PartialMessage",
  [],
);

/**
 * used by runtime
 *
 * @generated from message spec.PlainMessage
 */
export const PlainMessage = proto3.makeMessageType(
  "spec.PlainMessage",
  [],
);

/**
 * clash with global type "Error"
 * either this message name is escaped in generated code, or the generated
 * code must escape its calls to the global error object (i.e. `new Error`)
 *
 * @generated from message spec.Error
 */
export const Error = proto3.makeMessageType(
  "spec.Error",
  () => [
    { no: 1, name: "field_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * clash with global type
 *
 * @generated from message spec.Object
 */
export const Object$ = proto3.makeMessageType(
  "spec.Object",
  [],
  {localName: "Object$"},
);

/**
 * @generated from message spec.object
 */
export const object$ = proto3.makeMessageType(
  "spec.object",
  [],
  {localName: "object$"},
);

/**
 * clash with global type
 *
 * @generated from message spec.array
 */
export const array = proto3.makeMessageType(
  "spec.array",
  [],
);

/**
 * clash with global type
 *
 * @generated from message spec.string
 */
export const string$ = proto3.makeMessageType(
  "spec.string",
  [],
  {localName: "string$"},
);

/**
 * clash with global type
 *
 * @generated from message spec.number
 */
export const number$ = proto3.makeMessageType(
  "spec.number",
  [],
  {localName: "number$"},
);

/**
 * clash with global type
 *
 * @generated from message spec.boolean
 */
export const boolean$ = proto3.makeMessageType(
  "spec.boolean",
  [],
  {localName: "boolean$"},
);

/**
 * clash with global type
 *
 * @generated from message spec.bigint
 */
export const bigint$ = proto3.makeMessageType(
  "spec.bigint",
  [],
  {localName: "bigint$"},
);

/**
 * clash with global type
 *
 * @generated from message spec.Uint8Array
 */
export const Uint8Array$ = proto3.makeMessageType(
  "spec.Uint8Array",
  [],
  {localName: "Uint8Array$"},
);

/**
 * clash with global type
 *
 * @generated from message spec.Array
 */
export const Array = proto3.makeMessageType(
  "spec.Array",
  [],
);

/**
 * clash with global type
 *
 * @generated from message spec.String
 */
export const String = proto3.makeMessageType(
  "spec.String",
  [],
);

/**
 * clash with global type
 *
 * @generated from message spec.Number
 */
export const Number = proto3.makeMessageType(
  "spec.Number",
  [],
);

/**
 * clash with global type
 *
 * @generated from message spec.Boolean
 */
export const Boolean = proto3.makeMessageType(
  "spec.Boolean",
  [],
);

/**
 * clash with global type
 *
 * @generated from message spec.BigInt
 */
export const BigInt = proto3.makeMessageType(
  "spec.BigInt",
  [],
);

/**
 * @generated from message spec.ClashParent
 */
export const ClashParent = proto3.makeMessageType(
  "spec.ClashParent",
  [],
);

/**
 * should clash with message ClashParent_ClashChild
 *
 * @generated from message spec.ClashParent.ClashChild
 */
export const ClashParent_ClashChild = proto3.makeMessageType(
  "spec.ClashParent.ClashChild",
  [],
  {localName: "ClashParent_ClashChild"},
);

/**
 * @generated from message spec.NoClashFields
 */
export const NoClashFields = proto3.makeMessageType(
  "spec.NoClashFields",
  () => [
    { no: 1, name: "const", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "switch", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "case", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "function", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "interface", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "return", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message spec.NoClashOneof
 */
export const NoClashOneof = proto3.makeMessageType(
  "spec.NoClashOneof",
  () => [
    { no: 1, name: "const", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "kind" },
    { no: 2, name: "switch", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "kind" },
    { no: 3, name: "case", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "kind" },
    { no: 4, name: "function", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "kind" },
    { no: 5, name: "interface", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "kind" },
    { no: 6, name: "return", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "kind" },
  ],
);

/**
 * @generated from message spec.NoClashOneofADT
 */
export const NoClashOneofADT = proto3.makeMessageType(
  "spec.NoClashOneofADT",
  () => [
    { no: 1, name: "m", kind: "message", T: NoClashOneofADT_M },
  ],
);

/**
 * @generated from message spec.NoClashOneofADT.M
 */
export const NoClashOneofADT_M = proto3.makeMessageType(
  "spec.NoClashOneofADT.M",
  () => [
    { no: 1, name: "case", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ],
  {localName: "NoClashOneofADT_M"},
);

/**
 * just here as a "namespace" for the enum
 *
 * @generated from message spec.NoClashEnumWrap
 */
export const NoClashEnumWrap = proto3.makeMessageType(
  "spec.NoClashEnumWrap",
  [],
);

/**
 * @generated from enum spec.NoClashEnumWrap.X
 */
export const NoClashEnumWrap_X = proto3.makeEnum(
  "spec.NoClashEnumWrap.X",
  [
    {no: 0, name: "instanceof"},
    {no: 1, name: "switch"},
    {no: 3, name: "case"},
    {no: 4, name: "function"},
    {no: 5, name: "interface"},
    {no: 6, name: "return"},
  ],
);

