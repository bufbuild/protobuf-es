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

// @generated by protoc-gen-es v2.0.0-alpha.4 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/api/expr/v1beta1/expr.proto (package google.api.expr.v1beta1, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { SourceInfo, SourceInfoJson } from "./source_pb";
import { fileDesc_google_api_expr_v1beta1_source } from "./source_pb";
import type { NullValue, NullValueJson } from "@bufbuild/protobuf/wkt";
import { fileDesc_google_protobuf_struct } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/api/expr/v1beta1/expr.proto.
 */
export const fileDesc_google_api_expr_v1beta1_expr: GenDescFile = /*@__PURE__*/
  fileDesc("CiJnb29nbGUvYXBpL2V4cHIvdjFiZXRhMS9leHByLnByb3RvEhdnb29nbGUuYXBpLmV4cHIudjFiZXRhMSKLAQoKUGFyc2VkRXhwchIrCgRleHByGAIgASgLMh0uZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEuRXhwchI4Cgtzb3VyY2VfaW5mbxgDIAEoCzIjLmdvb2dsZS5hcGkuZXhwci52MWJldGExLlNvdXJjZUluZm8SFgoOc3ludGF4X3ZlcnNpb24YBCABKAkiqwoKBEV4cHISCgoCaWQYAiABKAUSOAoMbGl0ZXJhbF9leHByGAMgASgLMiAuZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEuTGl0ZXJhbEgAEjkKCmlkZW50X2V4cHIYBCABKAsyIy5nb29nbGUuYXBpLmV4cHIudjFiZXRhMS5FeHByLklkZW50SAASOwoLc2VsZWN0X2V4cHIYBSABKAsyJC5nb29nbGUuYXBpLmV4cHIudjFiZXRhMS5FeHByLlNlbGVjdEgAEjcKCWNhbGxfZXhwchgGIAEoCzIiLmdvb2dsZS5hcGkuZXhwci52MWJldGExLkV4cHIuQ2FsbEgAEj0KCWxpc3RfZXhwchgHIAEoCzIoLmdvb2dsZS5hcGkuZXhwci52MWJldGExLkV4cHIuQ3JlYXRlTGlzdEgAEkEKC3N0cnVjdF9leHByGAggASgLMiouZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEuRXhwci5DcmVhdGVTdHJ1Y3RIABJJChJjb21wcmVoZW5zaW9uX2V4cHIYCSABKAsyKy5nb29nbGUuYXBpLmV4cHIudjFiZXRhMS5FeHByLkNvbXByZWhlbnNpb25IABoVCgVJZGVudBIMCgRuYW1lGAEgASgJGloKBlNlbGVjdBIuCgdvcGVyYW5kGAEgASgLMh0uZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEuRXhwchINCgVmaWVsZBgCIAEoCRIRCgl0ZXN0X29ubHkYAyABKAgadAoEQ2FsbBItCgZ0YXJnZXQYASABKAsyHS5nb29nbGUuYXBpLmV4cHIudjFiZXRhMS5FeHByEhAKCGZ1bmN0aW9uGAIgASgJEisKBGFyZ3MYAyADKAsyHS5nb29nbGUuYXBpLmV4cHIudjFiZXRhMS5FeHByGj0KCkNyZWF0ZUxpc3QSLwoIZWxlbWVudHMYASADKAsyHS5nb29nbGUuYXBpLmV4cHIudjFiZXRhMS5FeHByGvYBCgxDcmVhdGVTdHJ1Y3QSDAoEdHlwZRgBIAEoCRJBCgdlbnRyaWVzGAIgAygLMjAuZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEuRXhwci5DcmVhdGVTdHJ1Y3QuRW50cnkalAEKBUVudHJ5EgoKAmlkGAEgASgFEhMKCWZpZWxkX2tleRgCIAEoCUgAEjAKB21hcF9rZXkYAyABKAsyHS5nb29nbGUuYXBpLmV4cHIudjFiZXRhMS5FeHBySAASLAoFdmFsdWUYBCABKAsyHS5nb29nbGUuYXBpLmV4cHIudjFiZXRhMS5FeHByQgoKCGtleV9raW5kGrACCg1Db21wcmVoZW5zaW9uEhAKCGl0ZXJfdmFyGAEgASgJEjEKCml0ZXJfcmFuZ2UYAiABKAsyHS5nb29nbGUuYXBpLmV4cHIudjFiZXRhMS5FeHByEhAKCGFjY3VfdmFyGAMgASgJEjAKCWFjY3VfaW5pdBgEIAEoCzIdLmdvb2dsZS5hcGkuZXhwci52MWJldGExLkV4cHISNQoObG9vcF9jb25kaXRpb24YBSABKAsyHS5nb29nbGUuYXBpLmV4cHIudjFiZXRhMS5FeHByEjAKCWxvb3Bfc3RlcBgGIAEoCzIdLmdvb2dsZS5hcGkuZXhwci52MWJldGExLkV4cHISLQoGcmVzdWx0GAcgASgLMh0uZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEuRXhwckILCglleHByX2tpbmQi2AEKB0xpdGVyYWwSMAoKbnVsbF92YWx1ZRgBIAEoDjIaLmdvb2dsZS5wcm90b2J1Zi5OdWxsVmFsdWVIABIUCgpib29sX3ZhbHVlGAIgASgISAASFQoLaW50NjRfdmFsdWUYAyABKANIABIWCgx1aW50NjRfdmFsdWUYBCABKARIABIWCgxkb3VibGVfdmFsdWUYBSABKAFIABIWCgxzdHJpbmdfdmFsdWUYBiABKAlIABIVCgtieXRlc192YWx1ZRgHIAEoDEgAQg8KDWNvbnN0YW50X2tpbmRCagobY29tLmdvb2dsZS5hcGkuZXhwci52MWJldGExQglFeHByUHJvdG9QAVo7Z29vZ2xlLmdvbGFuZy5vcmcvZ2VucHJvdG8vZ29vZ2xlYXBpcy9hcGkvZXhwci92MWJldGExO2V4cHL4AQFiBnByb3RvMw", [fileDesc_google_api_expr_v1beta1_source, fileDesc_google_protobuf_struct]);

/**
 * An expression together with source information as returned by the parser.
 *
 * @generated from message google.api.expr.v1beta1.ParsedExpr
 */
export type ParsedExpr = Message<"google.api.expr.v1beta1.ParsedExpr"> & {
  /**
   * The parsed expression.
   *
   * @generated from field: google.api.expr.v1beta1.Expr expr = 2;
   */
  expr?: Expr;

  /**
   * The source info derived from input that generated the parsed `expr`.
   *
   * @generated from field: google.api.expr.v1beta1.SourceInfo source_info = 3;
   */
  sourceInfo?: SourceInfo;

  /**
   * The syntax version of the source, e.g. `cel1`.
   *
   * @generated from field: string syntax_version = 4;
   */
  syntaxVersion: string;
};

/**
 * JSON type for the message google.api.expr.v1beta1.ParsedExpr.
 */
export type ParsedExprJson = {
  /**
   * @generated from field: google.api.expr.v1beta1.Expr expr = 2;
   */
  expr?: ExprJson;

  /**
   * @generated from field: google.api.expr.v1beta1.SourceInfo source_info = 3;
   */
  sourceInfo?: SourceInfoJson;

  /**
   * @generated from field: string syntax_version = 4;
   */
  syntaxVersion?: string;
};

/**
 * Describes the message google.api.expr.v1beta1.ParsedExpr.
 * Use `create(ParsedExprDesc)` to create a new message.
 */
export const ParsedExprDesc: GenDescMessage<ParsedExpr, ParsedExprJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1beta1_expr, 0);

/**
 * An abstract representation of a common expression.
 *
 * Expressions are abstractly represented as a collection of identifiers,
 * select statements, function calls, literals, and comprehensions. All
 * operators with the exception of the '.' operator are modelled as function
 * calls. This makes it easy to represent new operators into the existing AST.
 *
 * All references within expressions must resolve to a [Decl][google.api.expr.v1beta1.Decl] provided at
 * type-check for an expression to be valid. A reference may either be a bare
 * identifier `name` or a qualified identifier `google.api.name`. References
 * may either refer to a value or a function declaration.
 *
 * For example, the expression `google.api.name.startsWith('expr')` references
 * the declaration `google.api.name` within a [Expr.Select][google.api.expr.v1beta1.Expr.Select] expression, and
 * the function declaration `startsWith`.
 *
 * @generated from message google.api.expr.v1beta1.Expr
 */
export type Expr = Message<"google.api.expr.v1beta1.Expr"> & {
  /**
   * Required. An id assigned to this node by the parser which is unique in a
   * given expression tree. This is used to associate type information and other
   * attributes to a node in the parse tree.
   *
   * @generated from field: int32 id = 2;
   */
  id: number;

  /**
   * Required. Variants of expressions.
   *
   * @generated from oneof google.api.expr.v1beta1.Expr.expr_kind
   */
  exprKind: {
    /**
     * A literal expression.
     *
     * @generated from field: google.api.expr.v1beta1.Literal literal_expr = 3;
     */
    value: Literal;
    case: "literalExpr";
  } | {
    /**
     * An identifier expression.
     *
     * @generated from field: google.api.expr.v1beta1.Expr.Ident ident_expr = 4;
     */
    value: Expr_Ident;
    case: "identExpr";
  } | {
    /**
     * A field selection expression, e.g. `request.auth`.
     *
     * @generated from field: google.api.expr.v1beta1.Expr.Select select_expr = 5;
     */
    value: Expr_Select;
    case: "selectExpr";
  } | {
    /**
     * A call expression, including calls to predefined functions and operators.
     *
     * @generated from field: google.api.expr.v1beta1.Expr.Call call_expr = 6;
     */
    value: Expr_Call;
    case: "callExpr";
  } | {
    /**
     * A list creation expression.
     *
     * @generated from field: google.api.expr.v1beta1.Expr.CreateList list_expr = 7;
     */
    value: Expr_CreateList;
    case: "listExpr";
  } | {
    /**
     * A map or object creation expression.
     *
     * @generated from field: google.api.expr.v1beta1.Expr.CreateStruct struct_expr = 8;
     */
    value: Expr_CreateStruct;
    case: "structExpr";
  } | {
    /**
     * A comprehension expression.
     *
     * @generated from field: google.api.expr.v1beta1.Expr.Comprehension comprehension_expr = 9;
     */
    value: Expr_Comprehension;
    case: "comprehensionExpr";
  } | { case: undefined; value?: undefined };
};

/**
 * JSON type for the message google.api.expr.v1beta1.Expr.
 */
export type ExprJson = {
  /**
   * @generated from field: int32 id = 2;
   */
  id?: number;

  /**
   * @generated from field: google.api.expr.v1beta1.Literal literal_expr = 3;
   */
  literalExpr?: LiteralJson;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr.Ident ident_expr = 4;
   */
  identExpr?: Expr_IdentJson;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr.Select select_expr = 5;
   */
  selectExpr?: Expr_SelectJson;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr.Call call_expr = 6;
   */
  callExpr?: Expr_CallJson;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr.CreateList list_expr = 7;
   */
  listExpr?: Expr_CreateListJson;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr.CreateStruct struct_expr = 8;
   */
  structExpr?: Expr_CreateStructJson;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr.Comprehension comprehension_expr = 9;
   */
  comprehensionExpr?: Expr_ComprehensionJson;
};

/**
 * Describes the message google.api.expr.v1beta1.Expr.
 * Use `create(ExprDesc)` to create a new message.
 */
export const ExprDesc: GenDescMessage<Expr, ExprJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1beta1_expr, 1);

/**
 * An identifier expression. e.g. `request`.
 *
 * @generated from message google.api.expr.v1beta1.Expr.Ident
 */
export type Expr_Ident = Message<"google.api.expr.v1beta1.Expr.Ident"> & {
  /**
   * Required. Holds a single, unqualified identifier, possibly preceded by a
   * '.'.
   *
   * Qualified names are represented by the [Expr.Select][google.api.expr.v1beta1.Expr.Select] expression.
   *
   * @generated from field: string name = 1;
   */
  name: string;
};

/**
 * JSON type for the message google.api.expr.v1beta1.Expr.Ident.
 */
export type Expr_IdentJson = {
  /**
   * @generated from field: string name = 1;
   */
  name?: string;
};

/**
 * Describes the message google.api.expr.v1beta1.Expr.Ident.
 * Use `create(Expr_IdentDesc)` to create a new message.
 */
export const Expr_IdentDesc: GenDescMessage<Expr_Ident, Expr_IdentJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1beta1_expr, 1, 0);

/**
 * A field selection expression. e.g. `request.auth`.
 *
 * @generated from message google.api.expr.v1beta1.Expr.Select
 */
export type Expr_Select = Message<"google.api.expr.v1beta1.Expr.Select"> & {
  /**
   * Required. The target of the selection expression.
   *
   * For example, in the select expression `request.auth`, the `request`
   * portion of the expression is the `operand`.
   *
   * @generated from field: google.api.expr.v1beta1.Expr operand = 1;
   */
  operand?: Expr;

  /**
   * Required. The name of the field to select.
   *
   * For example, in the select expression `request.auth`, the `auth` portion
   * of the expression would be the `field`.
   *
   * @generated from field: string field = 2;
   */
  field: string;

  /**
   * Whether the select is to be interpreted as a field presence test.
   *
   * This results from the macro `has(request.auth)`.
   *
   * @generated from field: bool test_only = 3;
   */
  testOnly: boolean;
};

/**
 * JSON type for the message google.api.expr.v1beta1.Expr.Select.
 */
export type Expr_SelectJson = {
  /**
   * @generated from field: google.api.expr.v1beta1.Expr operand = 1;
   */
  operand?: ExprJson;

  /**
   * @generated from field: string field = 2;
   */
  field?: string;

  /**
   * @generated from field: bool test_only = 3;
   */
  testOnly?: boolean;
};

/**
 * Describes the message google.api.expr.v1beta1.Expr.Select.
 * Use `create(Expr_SelectDesc)` to create a new message.
 */
export const Expr_SelectDesc: GenDescMessage<Expr_Select, Expr_SelectJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1beta1_expr, 1, 1);

/**
 * A call expression, including calls to predefined functions and operators.
 *
 * For example, `value == 10`, `size(map_value)`.
 *
 * @generated from message google.api.expr.v1beta1.Expr.Call
 */
export type Expr_Call = Message<"google.api.expr.v1beta1.Expr.Call"> & {
  /**
   * The target of an method call-style expression. For example, `x` in
   * `x.f()`.
   *
   * @generated from field: google.api.expr.v1beta1.Expr target = 1;
   */
  target?: Expr;

  /**
   * Required. The name of the function or method being called.
   *
   * @generated from field: string function = 2;
   */
  function: string;

  /**
   * The arguments.
   *
   * @generated from field: repeated google.api.expr.v1beta1.Expr args = 3;
   */
  args: Expr[];
};

/**
 * JSON type for the message google.api.expr.v1beta1.Expr.Call.
 */
export type Expr_CallJson = {
  /**
   * @generated from field: google.api.expr.v1beta1.Expr target = 1;
   */
  target?: ExprJson;

  /**
   * @generated from field: string function = 2;
   */
  function?: string;

  /**
   * @generated from field: repeated google.api.expr.v1beta1.Expr args = 3;
   */
  args?: ExprJson[];
};

/**
 * Describes the message google.api.expr.v1beta1.Expr.Call.
 * Use `create(Expr_CallDesc)` to create a new message.
 */
export const Expr_CallDesc: GenDescMessage<Expr_Call, Expr_CallJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1beta1_expr, 1, 2);

/**
 * A list creation expression.
 *
 * Lists may either be homogenous, e.g. `[1, 2, 3]`, or heterogenous, e.g.
 * `dyn([1, 'hello', 2.0])`
 *
 * @generated from message google.api.expr.v1beta1.Expr.CreateList
 */
export type Expr_CreateList = Message<"google.api.expr.v1beta1.Expr.CreateList"> & {
  /**
   * The elements part of the list.
   *
   * @generated from field: repeated google.api.expr.v1beta1.Expr elements = 1;
   */
  elements: Expr[];
};

/**
 * JSON type for the message google.api.expr.v1beta1.Expr.CreateList.
 */
export type Expr_CreateListJson = {
  /**
   * @generated from field: repeated google.api.expr.v1beta1.Expr elements = 1;
   */
  elements?: ExprJson[];
};

/**
 * Describes the message google.api.expr.v1beta1.Expr.CreateList.
 * Use `create(Expr_CreateListDesc)` to create a new message.
 */
export const Expr_CreateListDesc: GenDescMessage<Expr_CreateList, Expr_CreateListJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1beta1_expr, 1, 3);

/**
 * A map or message creation expression.
 *
 * Maps are constructed as `{'key_name': 'value'}`. Message construction is
 * similar, but prefixed with a type name and composed of field ids:
 * `types.MyType{field_id: 'value'}`.
 *
 * @generated from message google.api.expr.v1beta1.Expr.CreateStruct
 */
export type Expr_CreateStruct = Message<"google.api.expr.v1beta1.Expr.CreateStruct"> & {
  /**
   * The type name of the message to be created, empty when creating map
   * literals.
   *
   * @generated from field: string type = 1;
   */
  type: string;

  /**
   * The entries in the creation expression.
   *
   * @generated from field: repeated google.api.expr.v1beta1.Expr.CreateStruct.Entry entries = 2;
   */
  entries: Expr_CreateStruct_Entry[];
};

/**
 * JSON type for the message google.api.expr.v1beta1.Expr.CreateStruct.
 */
export type Expr_CreateStructJson = {
  /**
   * @generated from field: string type = 1;
   */
  type?: string;

  /**
   * @generated from field: repeated google.api.expr.v1beta1.Expr.CreateStruct.Entry entries = 2;
   */
  entries?: Expr_CreateStruct_EntryJson[];
};

/**
 * Describes the message google.api.expr.v1beta1.Expr.CreateStruct.
 * Use `create(Expr_CreateStructDesc)` to create a new message.
 */
export const Expr_CreateStructDesc: GenDescMessage<Expr_CreateStruct, Expr_CreateStructJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1beta1_expr, 1, 4);

/**
 * Represents an entry.
 *
 * @generated from message google.api.expr.v1beta1.Expr.CreateStruct.Entry
 */
export type Expr_CreateStruct_Entry = Message<"google.api.expr.v1beta1.Expr.CreateStruct.Entry"> & {
  /**
   * Required. An id assigned to this node by the parser which is unique
   * in a given expression tree. This is used to associate type
   * information and other attributes to the node.
   *
   * @generated from field: int32 id = 1;
   */
  id: number;

  /**
   * The `Entry` key kinds.
   *
   * @generated from oneof google.api.expr.v1beta1.Expr.CreateStruct.Entry.key_kind
   */
  keyKind: {
    /**
     * The field key for a message creator statement.
     *
     * @generated from field: string field_key = 2;
     */
    value: string;
    case: "fieldKey";
  } | {
    /**
     * The key expression for a map creation statement.
     *
     * @generated from field: google.api.expr.v1beta1.Expr map_key = 3;
     */
    value: Expr;
    case: "mapKey";
  } | { case: undefined; value?: undefined };

  /**
   * Required. The value assigned to the key.
   *
   * @generated from field: google.api.expr.v1beta1.Expr value = 4;
   */
  value?: Expr;
};

/**
 * JSON type for the message google.api.expr.v1beta1.Expr.CreateStruct.Entry.
 */
export type Expr_CreateStruct_EntryJson = {
  /**
   * @generated from field: int32 id = 1;
   */
  id?: number;

  /**
   * @generated from field: string field_key = 2;
   */
  fieldKey?: string;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr map_key = 3;
   */
  mapKey?: ExprJson;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr value = 4;
   */
  value?: ExprJson;
};

/**
 * Describes the message google.api.expr.v1beta1.Expr.CreateStruct.Entry.
 * Use `create(Expr_CreateStruct_EntryDesc)` to create a new message.
 */
export const Expr_CreateStruct_EntryDesc: GenDescMessage<Expr_CreateStruct_Entry, Expr_CreateStruct_EntryJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1beta1_expr, 1, 4, 0);

/**
 * A comprehension expression applied to a list or map.
 *
 * Comprehensions are not part of the core syntax, but enabled with macros.
 * A macro matches a specific call signature within a parsed AST and replaces
 * the call with an alternate AST block. Macro expansion happens at parse
 * time.
 *
 * The following macros are supported within CEL:
 *
 * Aggregate type macros may be applied to all elements in a list or all keys
 * in a map:
 *
 * *  `all`, `exists`, `exists_one` -  test a predicate expression against
 *    the inputs and return `true` if the predicate is satisfied for all,
 *    any, or only one value `list.all(x, x < 10)`.
 * *  `filter` - test a predicate expression against the inputs and return
 *    the subset of elements which satisfy the predicate:
 *    `payments.filter(p, p > 1000)`.
 * *  `map` - apply an expression to all elements in the input and return the
 *    output aggregate type: `[1, 2, 3].map(i, i * i)`.
 *
 * The `has(m.x)` macro tests whether the property `x` is present in struct
 * `m`. The semantics of this macro depend on the type of `m`. For proto2
 * messages `has(m.x)` is defined as 'defined, but not set`. For proto3, the
 * macro tests whether the property is set to its default. For map and struct
 * types, the macro tests whether the property `x` is defined on `m`.
 *
 * @generated from message google.api.expr.v1beta1.Expr.Comprehension
 */
export type Expr_Comprehension = Message<"google.api.expr.v1beta1.Expr.Comprehension"> & {
  /**
   * The name of the iteration variable.
   *
   * @generated from field: string iter_var = 1;
   */
  iterVar: string;

  /**
   * The range over which var iterates.
   *
   * @generated from field: google.api.expr.v1beta1.Expr iter_range = 2;
   */
  iterRange?: Expr;

  /**
   * The name of the variable used for accumulation of the result.
   *
   * @generated from field: string accu_var = 3;
   */
  accuVar: string;

  /**
   * The initial value of the accumulator.
   *
   * @generated from field: google.api.expr.v1beta1.Expr accu_init = 4;
   */
  accuInit?: Expr;

  /**
   * An expression which can contain iter_var and accu_var.
   *
   * Returns false when the result has been computed and may be used as
   * a hint to short-circuit the remainder of the comprehension.
   *
   * @generated from field: google.api.expr.v1beta1.Expr loop_condition = 5;
   */
  loopCondition?: Expr;

  /**
   * An expression which can contain iter_var and accu_var.
   *
   * Computes the next value of accu_var.
   *
   * @generated from field: google.api.expr.v1beta1.Expr loop_step = 6;
   */
  loopStep?: Expr;

  /**
   * An expression which can contain accu_var.
   *
   * Computes the result.
   *
   * @generated from field: google.api.expr.v1beta1.Expr result = 7;
   */
  result?: Expr;
};

/**
 * JSON type for the message google.api.expr.v1beta1.Expr.Comprehension.
 */
export type Expr_ComprehensionJson = {
  /**
   * @generated from field: string iter_var = 1;
   */
  iterVar?: string;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr iter_range = 2;
   */
  iterRange?: ExprJson;

  /**
   * @generated from field: string accu_var = 3;
   */
  accuVar?: string;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr accu_init = 4;
   */
  accuInit?: ExprJson;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr loop_condition = 5;
   */
  loopCondition?: ExprJson;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr loop_step = 6;
   */
  loopStep?: ExprJson;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr result = 7;
   */
  result?: ExprJson;
};

/**
 * Describes the message google.api.expr.v1beta1.Expr.Comprehension.
 * Use `create(Expr_ComprehensionDesc)` to create a new message.
 */
export const Expr_ComprehensionDesc: GenDescMessage<Expr_Comprehension, Expr_ComprehensionJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1beta1_expr, 1, 5);

/**
 * Represents a primitive literal.
 *
 * This is similar to the primitives supported in the well-known type
 * `google.protobuf.Value`, but richer so it can represent CEL's full range of
 * primitives.
 *
 * Lists and structs are not included as constants as these aggregate types may
 * contain [Expr][google.api.expr.v1beta1.Expr] elements which require evaluation and are thus not constant.
 *
 * Examples of literals include: `"hello"`, `b'bytes'`, `1u`, `4.2`, `-2`,
 * `true`, `null`.
 *
 * @generated from message google.api.expr.v1beta1.Literal
 */
export type Literal = Message<"google.api.expr.v1beta1.Literal"> & {
  /**
   * Required. The valid constant kinds.
   *
   * @generated from oneof google.api.expr.v1beta1.Literal.constant_kind
   */
  constantKind: {
    /**
     * null value.
     *
     * @generated from field: google.protobuf.NullValue null_value = 1;
     */
    value: NullValue;
    case: "nullValue";
  } | {
    /**
     * boolean value.
     *
     * @generated from field: bool bool_value = 2;
     */
    value: boolean;
    case: "boolValue";
  } | {
    /**
     * int64 value.
     *
     * @generated from field: int64 int64_value = 3;
     */
    value: bigint;
    case: "int64Value";
  } | {
    /**
     * uint64 value.
     *
     * @generated from field: uint64 uint64_value = 4;
     */
    value: bigint;
    case: "uint64Value";
  } | {
    /**
     * double value.
     *
     * @generated from field: double double_value = 5;
     */
    value: number;
    case: "doubleValue";
  } | {
    /**
     * string value.
     *
     * @generated from field: string string_value = 6;
     */
    value: string;
    case: "stringValue";
  } | {
    /**
     * bytes value.
     *
     * @generated from field: bytes bytes_value = 7;
     */
    value: Uint8Array;
    case: "bytesValue";
  } | { case: undefined; value?: undefined };
};

/**
 * JSON type for the message google.api.expr.v1beta1.Literal.
 */
export type LiteralJson = {
  /**
   * @generated from field: google.protobuf.NullValue null_value = 1;
   */
  nullValue?: NullValueJson;

  /**
   * @generated from field: bool bool_value = 2;
   */
  boolValue?: boolean;

  /**
   * @generated from field: int64 int64_value = 3;
   */
  int64Value?: string;

  /**
   * @generated from field: uint64 uint64_value = 4;
   */
  uint64Value?: string;

  /**
   * @generated from field: double double_value = 5;
   */
  doubleValue?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: string string_value = 6;
   */
  stringValue?: string;

  /**
   * @generated from field: bytes bytes_value = 7;
   */
  bytesValue?: string;
};

/**
 * Describes the message google.api.expr.v1beta1.Literal.
 * Use `create(LiteralDesc)` to create a new message.
 */
export const LiteralDesc: GenDescMessage<Literal, LiteralJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1beta1_expr, 2);

