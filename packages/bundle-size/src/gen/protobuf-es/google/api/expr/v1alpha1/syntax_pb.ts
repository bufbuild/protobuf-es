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

// @generated by protoc-gen-es v2.0.0-alpha.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/api/expr/v1alpha1/syntax.proto (package google.api.expr.v1alpha1, syntax proto3)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Duration, NullValue, Timestamp } from "@bufbuild/protobuf/wkt";
import { fileDesc_google_protobuf_duration, fileDesc_google_protobuf_struct, fileDesc_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/api/expr/v1alpha1/syntax.proto.
 */
export const fileDesc_google_api_expr_v1alpha1_syntax: GenDescFile = /*@__PURE__*/
  fileDesc("CiVnb29nbGUvYXBpL2V4cHIvdjFhbHBoYTEvc3ludGF4LnByb3RvEhhnb29nbGUuYXBpLmV4cHIudjFhbHBoYTEidQoKUGFyc2VkRXhwchIsCgRleHByGAIgASgLMh4uZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkV4cHISOQoLc291cmNlX2luZm8YAyABKAsyJC5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuU291cmNlSW5mbyL3CgoERXhwchIKCgJpZBgCIAEoAxI4Cgpjb25zdF9leHByGAMgASgLMiIuZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkNvbnN0YW50SAASOgoKaWRlbnRfZXhwchgEIAEoCzIkLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5FeHByLklkZW50SAASPAoLc2VsZWN0X2V4cHIYBSABKAsyJS5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuRXhwci5TZWxlY3RIABI4CgljYWxsX2V4cHIYBiABKAsyIy5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuRXhwci5DYWxsSAASPgoJbGlzdF9leHByGAcgASgLMikuZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkV4cHIuQ3JlYXRlTGlzdEgAEkIKC3N0cnVjdF9leHByGAggASgLMisuZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkV4cHIuQ3JlYXRlU3RydWN0SAASSgoSY29tcHJlaGVuc2lvbl9leHByGAkgASgLMiwuZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkV4cHIuQ29tcHJlaGVuc2lvbkgAGhUKBUlkZW50EgwKBG5hbWUYASABKAkaWwoGU2VsZWN0Ei8KB29wZXJhbmQYASABKAsyHi5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuRXhwchINCgVmaWVsZBgCIAEoCRIRCgl0ZXN0X29ubHkYAyABKAgadgoEQ2FsbBIuCgZ0YXJnZXQYASABKAsyHi5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuRXhwchIQCghmdW5jdGlvbhgCIAEoCRIsCgRhcmdzGAMgAygLMh4uZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkV4cHIaWAoKQ3JlYXRlTGlzdBIwCghlbGVtZW50cxgBIAMoCzIeLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5FeHByEhgKEG9wdGlvbmFsX2luZGljZXMYAiADKAUamQIKDENyZWF0ZVN0cnVjdBIUCgxtZXNzYWdlX25hbWUYASABKAkSQgoHZW50cmllcxgCIAMoCzIxLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5FeHByLkNyZWF0ZVN0cnVjdC5FbnRyeRquAQoFRW50cnkSCgoCaWQYASABKAMSEwoJZmllbGRfa2V5GAIgASgJSAASMQoHbWFwX2tleRgDIAEoCzIeLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5FeHBySAASLQoFdmFsdWUYBCABKAsyHi5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuRXhwchIWCg5vcHRpb25hbF9lbnRyeRgFIAEoCEIKCghrZXlfa2luZBq1AgoNQ29tcHJlaGVuc2lvbhIQCghpdGVyX3ZhchgBIAEoCRIyCgppdGVyX3JhbmdlGAIgASgLMh4uZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkV4cHISEAoIYWNjdV92YXIYAyABKAkSMQoJYWNjdV9pbml0GAQgASgLMh4uZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkV4cHISNgoObG9vcF9jb25kaXRpb24YBSABKAsyHi5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuRXhwchIxCglsb29wX3N0ZXAYBiABKAsyHi5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuRXhwchIuCgZyZXN1bHQYByABKAsyHi5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuRXhwckILCglleHByX2tpbmQizQIKCENvbnN0YW50EjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFAoKYm9vbF92YWx1ZRgCIAEoCEgAEhUKC2ludDY0X3ZhbHVlGAMgASgDSAASFgoMdWludDY0X3ZhbHVlGAQgASgESAASFgoMZG91YmxlX3ZhbHVlGAUgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAYgASgJSAASFQoLYnl0ZXNfdmFsdWUYByABKAxIABI3Cg5kdXJhdGlvbl92YWx1ZRgIIAEoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbkICGAFIABI5Cg90aW1lc3RhbXBfdmFsdWUYCSABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQgIYAUgAQg8KDWNvbnN0YW50X2tpbmQi/AUKClNvdXJjZUluZm8SFgoOc3ludGF4X3ZlcnNpb24YASABKAkSEAoIbG9jYXRpb24YAiABKAkSFAoMbGluZV9vZmZzZXRzGAMgAygFEkYKCXBvc2l0aW9ucxgEIAMoCzIzLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5Tb3VyY2VJbmZvLlBvc2l0aW9uc0VudHJ5EkkKC21hY3JvX2NhbGxzGAUgAygLMjQuZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLlNvdXJjZUluZm8uTWFjcm9DYWxsc0VudHJ5EkIKCmV4dGVuc2lvbnMYBiADKAsyLi5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuU291cmNlSW5mby5FeHRlbnNpb24a0QIKCUV4dGVuc2lvbhIKCgJpZBgBIAEoCRJVChNhZmZlY3RlZF9jb21wb25lbnRzGAIgAygOMjguZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLlNvdXJjZUluZm8uRXh0ZW5zaW9uLkNvbXBvbmVudBJHCgd2ZXJzaW9uGAMgASgLMjYuZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLlNvdXJjZUluZm8uRXh0ZW5zaW9uLlZlcnNpb24aJwoHVmVyc2lvbhINCgVtYWpvchgBIAEoAxINCgVtaW5vchgCIAEoAyJvCglDb21wb25lbnQSGQoVQ09NUE9ORU5UX1VOU1BFQ0lGSUVEEAASFAoQQ09NUE9ORU5UX1BBUlNFUhABEhoKFkNPTVBPTkVOVF9UWVBFX0NIRUNLRVIQAhIVChFDT01QT05FTlRfUlVOVElNRRADGjAKDlBvc2l0aW9uc0VudHJ5EgsKA2tleRgBIAEoAxINCgV2YWx1ZRgCIAEoBToCOAEaUQoPTWFjcm9DYWxsc0VudHJ5EgsKA2tleRgBIAEoAxItCgV2YWx1ZRgCIAEoCzIeLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5FeHByOgI4ASJQCg5Tb3VyY2VQb3NpdGlvbhIQCghsb2NhdGlvbhgBIAEoCRIOCgZvZmZzZXQYAiABKAUSDAoEbGluZRgDIAEoBRIOCgZjb2x1bW4YBCABKAVCbgocY29tLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMUILU3ludGF4UHJvdG9QAVo8Z29vZ2xlLmdvbGFuZy5vcmcvZ2VucHJvdG8vZ29vZ2xlYXBpcy9hcGkvZXhwci92MWFscGhhMTtleHBy+AEBYgZwcm90bzM", [fileDesc_google_protobuf_duration, fileDesc_google_protobuf_struct, fileDesc_google_protobuf_timestamp]);

/**
 * An expression together with source information as returned by the parser.
 *
 * @generated from message google.api.expr.v1alpha1.ParsedExpr
 */
export type ParsedExpr = Message<"google.api.expr.v1alpha1.ParsedExpr"> & {
  /**
   * The parsed expression.
   *
   * @generated from field: google.api.expr.v1alpha1.Expr expr = 2;
   */
  expr?: Expr;

  /**
   * The source info derived from input that generated the parsed `expr`.
   *
   * @generated from field: google.api.expr.v1alpha1.SourceInfo source_info = 3;
   */
  sourceInfo?: SourceInfo;
};

/**
 * Describes the message google.api.expr.v1alpha1.ParsedExpr.
 * Use `create(ParsedExprDesc)` to create a new message.
 */
export const ParsedExprDesc: GenDescMessage<ParsedExpr> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 0);

/**
 * An abstract representation of a common expression.
 *
 * Expressions are abstractly represented as a collection of identifiers,
 * select statements, function calls, literals, and comprehensions. All
 * operators with the exception of the '.' operator are modelled as function
 * calls. This makes it easy to represent new operators into the existing AST.
 *
 * All references within expressions must resolve to a
 * [Decl][google.api.expr.v1alpha1.Decl] provided at type-check for an
 * expression to be valid. A reference may either be a bare identifier `name` or
 * a qualified identifier `google.api.name`. References may either refer to a
 * value or a function declaration.
 *
 * For example, the expression `google.api.name.startsWith('expr')` references
 * the declaration `google.api.name` within a
 * [Expr.Select][google.api.expr.v1alpha1.Expr.Select] expression, and the
 * function declaration `startsWith`.
 *
 * @generated from message google.api.expr.v1alpha1.Expr
 */
export type Expr = Message<"google.api.expr.v1alpha1.Expr"> & {
  /**
   * Required. An id assigned to this node by the parser which is unique in a
   * given expression tree. This is used to associate type information and other
   * attributes to a node in the parse tree.
   *
   * @generated from field: int64 id = 2;
   */
  id: bigint;

  /**
   * Required. Variants of expressions.
   *
   * @generated from oneof google.api.expr.v1alpha1.Expr.expr_kind
   */
  exprKind: {
    /**
     * A literal expression.
     *
     * @generated from field: google.api.expr.v1alpha1.Constant const_expr = 3;
     */
    value: Constant;
    case: "constExpr";
  } | {
    /**
     * An identifier expression.
     *
     * @generated from field: google.api.expr.v1alpha1.Expr.Ident ident_expr = 4;
     */
    value: Expr_Ident;
    case: "identExpr";
  } | {
    /**
     * A field selection expression, e.g. `request.auth`.
     *
     * @generated from field: google.api.expr.v1alpha1.Expr.Select select_expr = 5;
     */
    value: Expr_Select;
    case: "selectExpr";
  } | {
    /**
     * A call expression, including calls to predefined functions and operators.
     *
     * @generated from field: google.api.expr.v1alpha1.Expr.Call call_expr = 6;
     */
    value: Expr_Call;
    case: "callExpr";
  } | {
    /**
     * A list creation expression.
     *
     * @generated from field: google.api.expr.v1alpha1.Expr.CreateList list_expr = 7;
     */
    value: Expr_CreateList;
    case: "listExpr";
  } | {
    /**
     * A map or message creation expression.
     *
     * @generated from field: google.api.expr.v1alpha1.Expr.CreateStruct struct_expr = 8;
     */
    value: Expr_CreateStruct;
    case: "structExpr";
  } | {
    /**
     * A comprehension expression.
     *
     * @generated from field: google.api.expr.v1alpha1.Expr.Comprehension comprehension_expr = 9;
     */
    value: Expr_Comprehension;
    case: "comprehensionExpr";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message google.api.expr.v1alpha1.Expr.
 * Use `create(ExprDesc)` to create a new message.
 */
export const ExprDesc: GenDescMessage<Expr> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 1);

/**
 * An identifier expression. e.g. `request`.
 *
 * @generated from message google.api.expr.v1alpha1.Expr.Ident
 */
export type Expr_Ident = Message<"google.api.expr.v1alpha1.Expr.Ident"> & {
  /**
   * Required. Holds a single, unqualified identifier, possibly preceded by a
   * '.'.
   *
   * Qualified names are represented by the
   * [Expr.Select][google.api.expr.v1alpha1.Expr.Select] expression.
   *
   * @generated from field: string name = 1;
   */
  name: string;
};

/**
 * Describes the message google.api.expr.v1alpha1.Expr.Ident.
 * Use `create(Expr_IdentDesc)` to create a new message.
 */
export const Expr_IdentDesc: GenDescMessage<Expr_Ident> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 1, 0);

/**
 * A field selection expression. e.g. `request.auth`.
 *
 * @generated from message google.api.expr.v1alpha1.Expr.Select
 */
export type Expr_Select = Message<"google.api.expr.v1alpha1.Expr.Select"> & {
  /**
   * Required. The target of the selection expression.
   *
   * For example, in the select expression `request.auth`, the `request`
   * portion of the expression is the `operand`.
   *
   * @generated from field: google.api.expr.v1alpha1.Expr operand = 1;
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
 * Describes the message google.api.expr.v1alpha1.Expr.Select.
 * Use `create(Expr_SelectDesc)` to create a new message.
 */
export const Expr_SelectDesc: GenDescMessage<Expr_Select> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 1, 1);

/**
 * A call expression, including calls to predefined functions and operators.
 *
 * For example, `value == 10`, `size(map_value)`.
 *
 * @generated from message google.api.expr.v1alpha1.Expr.Call
 */
export type Expr_Call = Message<"google.api.expr.v1alpha1.Expr.Call"> & {
  /**
   * The target of an method call-style expression. For example, `x` in
   * `x.f()`.
   *
   * @generated from field: google.api.expr.v1alpha1.Expr target = 1;
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
   * @generated from field: repeated google.api.expr.v1alpha1.Expr args = 3;
   */
  args: Expr[];
};

/**
 * Describes the message google.api.expr.v1alpha1.Expr.Call.
 * Use `create(Expr_CallDesc)` to create a new message.
 */
export const Expr_CallDesc: GenDescMessage<Expr_Call> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 1, 2);

/**
 * A list creation expression.
 *
 * Lists may either be homogenous, e.g. `[1, 2, 3]`, or heterogeneous, e.g.
 * `dyn([1, 'hello', 2.0])`
 *
 * @generated from message google.api.expr.v1alpha1.Expr.CreateList
 */
export type Expr_CreateList = Message<"google.api.expr.v1alpha1.Expr.CreateList"> & {
  /**
   * The elements part of the list.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.Expr elements = 1;
   */
  elements: Expr[];

  /**
   * The indices within the elements list which are marked as optional
   * elements.
   *
   * When an optional-typed value is present, the value it contains
   * is included in the list. If the optional-typed value is absent, the list
   * element is omitted from the CreateList result.
   *
   * @generated from field: repeated int32 optional_indices = 2;
   */
  optionalIndices: number[];
};

/**
 * Describes the message google.api.expr.v1alpha1.Expr.CreateList.
 * Use `create(Expr_CreateListDesc)` to create a new message.
 */
export const Expr_CreateListDesc: GenDescMessage<Expr_CreateList> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 1, 3);

/**
 * A map or message creation expression.
 *
 * Maps are constructed as `{'key_name': 'value'}`. Message construction is
 * similar, but prefixed with a type name and composed of field ids:
 * `types.MyType{field_id: 'value'}`.
 *
 * @generated from message google.api.expr.v1alpha1.Expr.CreateStruct
 */
export type Expr_CreateStruct = Message<"google.api.expr.v1alpha1.Expr.CreateStruct"> & {
  /**
   * The type name of the message to be created, empty when creating map
   * literals.
   *
   * @generated from field: string message_name = 1;
   */
  messageName: string;

  /**
   * The entries in the creation expression.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.Expr.CreateStruct.Entry entries = 2;
   */
  entries: Expr_CreateStruct_Entry[];
};

/**
 * Describes the message google.api.expr.v1alpha1.Expr.CreateStruct.
 * Use `create(Expr_CreateStructDesc)` to create a new message.
 */
export const Expr_CreateStructDesc: GenDescMessage<Expr_CreateStruct> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 1, 4);

/**
 * Represents an entry.
 *
 * @generated from message google.api.expr.v1alpha1.Expr.CreateStruct.Entry
 */
export type Expr_CreateStruct_Entry = Message<"google.api.expr.v1alpha1.Expr.CreateStruct.Entry"> & {
  /**
   * Required. An id assigned to this node by the parser which is unique
   * in a given expression tree. This is used to associate type
   * information and other attributes to the node.
   *
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * The `Entry` key kinds.
   *
   * @generated from oneof google.api.expr.v1alpha1.Expr.CreateStruct.Entry.key_kind
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
     * @generated from field: google.api.expr.v1alpha1.Expr map_key = 3;
     */
    value: Expr;
    case: "mapKey";
  } | { case: undefined; value?: undefined };

  /**
   * Required. The value assigned to the key.
   *
   * If the optional_entry field is true, the expression must resolve to an
   * optional-typed value. If the optional value is present, the key will be
   * set; however, if the optional value is absent, the key will be unset.
   *
   * @generated from field: google.api.expr.v1alpha1.Expr value = 4;
   */
  value?: Expr;

  /**
   * Whether the key-value pair is optional.
   *
   * @generated from field: bool optional_entry = 5;
   */
  optionalEntry: boolean;
};

/**
 * Describes the message google.api.expr.v1alpha1.Expr.CreateStruct.Entry.
 * Use `create(Expr_CreateStruct_EntryDesc)` to create a new message.
 */
export const Expr_CreateStruct_EntryDesc: GenDescMessage<Expr_CreateStruct_Entry> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 1, 4, 0);

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
 * @generated from message google.api.expr.v1alpha1.Expr.Comprehension
 */
export type Expr_Comprehension = Message<"google.api.expr.v1alpha1.Expr.Comprehension"> & {
  /**
   * The name of the iteration variable.
   *
   * @generated from field: string iter_var = 1;
   */
  iterVar: string;

  /**
   * The range over which var iterates.
   *
   * @generated from field: google.api.expr.v1alpha1.Expr iter_range = 2;
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
   * @generated from field: google.api.expr.v1alpha1.Expr accu_init = 4;
   */
  accuInit?: Expr;

  /**
   * An expression which can contain iter_var and accu_var.
   *
   * Returns false when the result has been computed and may be used as
   * a hint to short-circuit the remainder of the comprehension.
   *
   * @generated from field: google.api.expr.v1alpha1.Expr loop_condition = 5;
   */
  loopCondition?: Expr;

  /**
   * An expression which can contain iter_var and accu_var.
   *
   * Computes the next value of accu_var.
   *
   * @generated from field: google.api.expr.v1alpha1.Expr loop_step = 6;
   */
  loopStep?: Expr;

  /**
   * An expression which can contain accu_var.
   *
   * Computes the result.
   *
   * @generated from field: google.api.expr.v1alpha1.Expr result = 7;
   */
  result?: Expr;
};

/**
 * Describes the message google.api.expr.v1alpha1.Expr.Comprehension.
 * Use `create(Expr_ComprehensionDesc)` to create a new message.
 */
export const Expr_ComprehensionDesc: GenDescMessage<Expr_Comprehension> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 1, 5);

/**
 * Represents a primitive literal.
 *
 * Named 'Constant' here for backwards compatibility.
 *
 * This is similar as the primitives supported in the well-known type
 * `google.protobuf.Value`, but richer so it can represent CEL's full range of
 * primitives.
 *
 * Lists and structs are not included as constants as these aggregate types may
 * contain [Expr][google.api.expr.v1alpha1.Expr] elements which require
 * evaluation and are thus not constant.
 *
 * Examples of literals include: `"hello"`, `b'bytes'`, `1u`, `4.2`, `-2`,
 * `true`, `null`.
 *
 * @generated from message google.api.expr.v1alpha1.Constant
 */
export type Constant = Message<"google.api.expr.v1alpha1.Constant"> & {
  /**
   * Required. The valid constant kinds.
   *
   * @generated from oneof google.api.expr.v1alpha1.Constant.constant_kind
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
  } | {
    /**
     * protobuf.Duration value.
     *
     * Deprecated: duration is no longer considered a builtin cel type.
     *
     * @generated from field: google.protobuf.Duration duration_value = 8 [deprecated = true];
     * @deprecated
     */
    value: Duration;
    case: "durationValue";
  } | {
    /**
     * protobuf.Timestamp value.
     *
     * Deprecated: timestamp is no longer considered a builtin cel type.
     *
     * @generated from field: google.protobuf.Timestamp timestamp_value = 9 [deprecated = true];
     * @deprecated
     */
    value: Timestamp;
    case: "timestampValue";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message google.api.expr.v1alpha1.Constant.
 * Use `create(ConstantDesc)` to create a new message.
 */
export const ConstantDesc: GenDescMessage<Constant> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 2);

/**
 * Source information collected at parse time.
 *
 * @generated from message google.api.expr.v1alpha1.SourceInfo
 */
export type SourceInfo = Message<"google.api.expr.v1alpha1.SourceInfo"> & {
  /**
   * The syntax version of the source, e.g. `cel1`.
   *
   * @generated from field: string syntax_version = 1;
   */
  syntaxVersion: string;

  /**
   * The location name. All position information attached to an expression is
   * relative to this location.
   *
   * The location could be a file, UI element, or similar. For example,
   * `acme/app/AnvilPolicy.cel`.
   *
   * @generated from field: string location = 2;
   */
  location: string;

  /**
   * Monotonically increasing list of code point offsets where newlines
   * `\n` appear.
   *
   * The line number of a given position is the index `i` where for a given
   * `id` the `line_offsets[i] < id_positions[id] < line_offsets[i+1]`. The
   * column may be derivd from `id_positions[id] - line_offsets[i]`.
   *
   * @generated from field: repeated int32 line_offsets = 3;
   */
  lineOffsets: number[];

  /**
   * A map from the parse node id (e.g. `Expr.id`) to the code point offset
   * within the source.
   *
   * @generated from field: map<int64, int32> positions = 4;
   */
  positions: { [key: string]: number };

  /**
   * A map from the parse node id where a macro replacement was made to the
   * call `Expr` that resulted in a macro expansion.
   *
   * For example, `has(value.field)` is a function call that is replaced by a
   * `test_only` field selection in the AST. Likewise, the call
   * `list.exists(e, e > 10)` translates to a comprehension expression. The key
   * in the map corresponds to the expression id of the expanded macro, and the
   * value is the call `Expr` that was replaced.
   *
   * @generated from field: map<int64, google.api.expr.v1alpha1.Expr> macro_calls = 5;
   */
  macroCalls: { [key: string]: Expr };

  /**
   * A list of tags for extensions that were used while parsing or type checking
   * the source expression. For example, optimizations that require special
   * runtime support may be specified.
   *
   * These are used to check feature support between components in separate
   * implementations. This can be used to either skip redundant work or
   * report an error if the extension is unsupported.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.SourceInfo.Extension extensions = 6;
   */
  extensions: SourceInfo_Extension[];
};

/**
 * Describes the message google.api.expr.v1alpha1.SourceInfo.
 * Use `create(SourceInfoDesc)` to create a new message.
 */
export const SourceInfoDesc: GenDescMessage<SourceInfo> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 3);

/**
 * An extension that was requested for the source expression.
 *
 * @generated from message google.api.expr.v1alpha1.SourceInfo.Extension
 */
export type SourceInfo_Extension = Message<"google.api.expr.v1alpha1.SourceInfo.Extension"> & {
  /**
   * Identifier for the extension. Example: constant_folding
   *
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * If set, the listed components must understand the extension for the
   * expression to evaluate correctly.
   *
   * This field has set semantics, repeated values should be deduplicated.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.SourceInfo.Extension.Component affected_components = 2;
   */
  affectedComponents: SourceInfo_Extension_Component[];

  /**
   * Version info. May be skipped if it isn't meaningful for the extension.
   * (for example constant_folding might always be v0.0).
   *
   * @generated from field: google.api.expr.v1alpha1.SourceInfo.Extension.Version version = 3;
   */
  version?: SourceInfo_Extension_Version;
};

/**
 * Describes the message google.api.expr.v1alpha1.SourceInfo.Extension.
 * Use `create(SourceInfo_ExtensionDesc)` to create a new message.
 */
export const SourceInfo_ExtensionDesc: GenDescMessage<SourceInfo_Extension> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 3, 0);

/**
 * Version
 *
 * @generated from message google.api.expr.v1alpha1.SourceInfo.Extension.Version
 */
export type SourceInfo_Extension_Version = Message<"google.api.expr.v1alpha1.SourceInfo.Extension.Version"> & {
  /**
   * Major version changes indicate different required support level from
   * the required components.
   *
   * @generated from field: int64 major = 1;
   */
  major: bigint;

  /**
   * Minor version changes must not change the observed behavior from
   * existing implementations, but may be provided informationally.
   *
   * @generated from field: int64 minor = 2;
   */
  minor: bigint;
};

/**
 * Describes the message google.api.expr.v1alpha1.SourceInfo.Extension.Version.
 * Use `create(SourceInfo_Extension_VersionDesc)` to create a new message.
 */
export const SourceInfo_Extension_VersionDesc: GenDescMessage<SourceInfo_Extension_Version> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 3, 0, 0);

/**
 * CEL component specifier.
 *
 * @generated from enum google.api.expr.v1alpha1.SourceInfo.Extension.Component
 */
export enum SourceInfo_Extension_Component {
  /**
   * Unspecified, default.
   *
   * @generated from enum value: COMPONENT_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Parser. Converts a CEL string to an AST.
   *
   * @generated from enum value: COMPONENT_PARSER = 1;
   */
  PARSER = 1,

  /**
   * Type checker. Checks that references in an AST are defined and types
   * agree.
   *
   * @generated from enum value: COMPONENT_TYPE_CHECKER = 2;
   */
  TYPE_CHECKER = 2,

  /**
   * Runtime. Evaluates a parsed and optionally checked CEL AST against a
   * context.
   *
   * @generated from enum value: COMPONENT_RUNTIME = 3;
   */
  RUNTIME = 3,
}

/**
 * Describes the enum google.api.expr.v1alpha1.SourceInfo.Extension.Component.
 */
export const SourceInfo_Extension_ComponentDesc: GenDescEnum<SourceInfo_Extension_Component> = /*@__PURE__*/
  enumDesc(fileDesc_google_api_expr_v1alpha1_syntax, 3, 0, 0);

/**
 * A specific position in source.
 *
 * @generated from message google.api.expr.v1alpha1.SourcePosition
 */
export type SourcePosition = Message<"google.api.expr.v1alpha1.SourcePosition"> & {
  /**
   * The soucre location name (e.g. file name).
   *
   * @generated from field: string location = 1;
   */
  location: string;

  /**
   * The UTF-8 code unit offset.
   *
   * @generated from field: int32 offset = 2;
   */
  offset: number;

  /**
   * The 1-based index of the starting line in the source text
   * where the issue occurs, or 0 if unknown.
   *
   * @generated from field: int32 line = 3;
   */
  line: number;

  /**
   * The 0-based index of the starting position within the line of source text
   * where the issue occurs.  Only meaningful if line is nonzero.
   *
   * @generated from field: int32 column = 4;
   */
  column: number;
};

/**
 * Describes the message google.api.expr.v1alpha1.SourcePosition.
 * Use `create(SourcePositionDesc)` to create a new message.
 */
export const SourcePositionDesc: GenDescMessage<SourcePosition> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_syntax, 4);

