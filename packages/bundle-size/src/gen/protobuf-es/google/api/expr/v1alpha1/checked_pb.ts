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

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "target=ts"
// @generated from file google/api/expr/v1alpha1/checked.proto (package google.api.expr.v1alpha1, syntax proto3)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Constant, Expr, SourceInfo } from "./syntax_pb";
import { file_google_api_expr_v1alpha1_syntax } from "./syntax_pb";
import type { Empty, NullValue } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_empty, file_google_protobuf_struct } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/api/expr/v1alpha1/checked.proto.
 */
export const file_google_api_expr_v1alpha1_checked: GenDescFile = /*@__PURE__*/
  fileDesc("CiZnb29nbGUvYXBpL2V4cHIvdjFhbHBoYTEvY2hlY2tlZC5wcm90bxIYZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExIswDCgtDaGVja2VkRXhwchJOCg1yZWZlcmVuY2VfbWFwGAIgAygLMjcuZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkNoZWNrZWRFeHByLlJlZmVyZW5jZU1hcEVudHJ5EkQKCHR5cGVfbWFwGAMgAygLMjIuZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkNoZWNrZWRFeHByLlR5cGVNYXBFbnRyeRI5Cgtzb3VyY2VfaW5mbxgFIAEoCzIkLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5Tb3VyY2VJbmZvEhQKDGV4cHJfdmVyc2lvbhgGIAEoCRIsCgRleHByGAQgASgLMh4uZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkV4cHIaWAoRUmVmZXJlbmNlTWFwRW50cnkSCwoDa2V5GAEgASgDEjIKBXZhbHVlGAIgASgLMiMuZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLlJlZmVyZW5jZToCOAEaTgoMVHlwZU1hcEVudHJ5EgsKA2tleRgBIAEoAxItCgV2YWx1ZRgCIAEoCzIeLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5UeXBlOgI4ASKCCgoEVHlwZRIlCgNkeW4YASABKAsyFi5nb29nbGUucHJvdG9idWYuRW1wdHlIABIqCgRudWxsGAIgASgOMhouZ29vZ2xlLnByb3RvYnVmLk51bGxWYWx1ZUgAEkEKCXByaW1pdGl2ZRgDIAEoDjIsLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5UeXBlLlByaW1pdGl2ZVR5cGVIABI/Cgd3cmFwcGVyGAQgASgOMiwuZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLlR5cGUuUHJpbWl0aXZlVHlwZUgAEkIKCndlbGxfa25vd24YBSABKA4yLC5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuVHlwZS5XZWxsS25vd25UeXBlSAASPAoJbGlzdF90eXBlGAYgASgLMicuZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLlR5cGUuTGlzdFR5cGVIABI6CghtYXBfdHlwZRgHIAEoCzImLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5UeXBlLk1hcFR5cGVIABI/CghmdW5jdGlvbhgIIAEoCzIrLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5UeXBlLkZ1bmN0aW9uVHlwZUgAEhYKDG1lc3NhZ2VfdHlwZRgJIAEoCUgAEhQKCnR5cGVfcGFyYW0YCiABKAlIABIuCgR0eXBlGAsgASgLMh4uZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLlR5cGVIABInCgVlcnJvchgMIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eUgAEkQKDWFic3RyYWN0X3R5cGUYDiABKAsyKy5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuVHlwZS5BYnN0cmFjdFR5cGVIABo9CghMaXN0VHlwZRIxCgllbGVtX3R5cGUYASABKAsyHi5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuVHlwZRpvCgdNYXBUeXBlEjAKCGtleV90eXBlGAEgASgLMh4uZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLlR5cGUSMgoKdmFsdWVfdHlwZRgCIAEoCzIeLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5UeXBlGnYKDEZ1bmN0aW9uVHlwZRIzCgtyZXN1bHRfdHlwZRgBIAEoCzIeLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5UeXBlEjEKCWFyZ190eXBlcxgCIAMoCzIeLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5UeXBlGlUKDEFic3RyYWN0VHlwZRIMCgRuYW1lGAEgASgJEjcKD3BhcmFtZXRlcl90eXBlcxgCIAMoCzIeLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5UeXBlInMKDVByaW1pdGl2ZVR5cGUSHgoaUFJJTUlUSVZFX1RZUEVfVU5TUEVDSUZJRUQQABIICgRCT09MEAESCQoFSU5UNjQQAhIKCgZVSU5UNjQQAxIKCgZET1VCTEUQBBIKCgZTVFJJTkcQBRIJCgVCWVRFUxAGIlYKDVdlbGxLbm93blR5cGUSHwobV0VMTF9LTk9XTl9UWVBFX1VOU1BFQ0lGSUVEEAASBwoDQU5ZEAESDQoJVElNRVNUQU1QEAISDAoIRFVSQVRJT04QA0ILCgl0eXBlX2tpbmQiuQQKBERlY2wSDAoEbmFtZRgBIAEoCRI5CgVpZGVudBgCIAEoCzIoLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5EZWNsLklkZW50RGVjbEgAEj8KCGZ1bmN0aW9uGAMgASgLMisuZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkRlY2wuRnVuY3Rpb25EZWNsSAAaeQoJSWRlbnREZWNsEiwKBHR5cGUYASABKAsyHi5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuVHlwZRIxCgV2YWx1ZRgCIAEoCzIiLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5Db25zdGFudBILCgNkb2MYAyABKAkangIKDEZ1bmN0aW9uRGVjbBJHCglvdmVybG9hZHMYASADKAsyNC5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuRGVjbC5GdW5jdGlvbkRlY2wuT3ZlcmxvYWQaxAEKCE92ZXJsb2FkEhMKC292ZXJsb2FkX2lkGAEgASgJEi4KBnBhcmFtcxgCIAMoCzIeLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5UeXBlEhMKC3R5cGVfcGFyYW1zGAMgAygJEjMKC3Jlc3VsdF90eXBlGAQgASgLMh4uZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLlR5cGUSHAoUaXNfaW5zdGFuY2VfZnVuY3Rpb24YBSABKAgSCwoDZG9jGAYgASgJQgsKCWRlY2xfa2luZCJhCglSZWZlcmVuY2USDAoEbmFtZRgBIAEoCRITCgtvdmVybG9hZF9pZBgDIAMoCRIxCgV2YWx1ZRgEIAEoCzIiLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5Db25zdGFudEJsChxjb20uZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExQglEZWNsUHJvdG9QAVo8Z29vZ2xlLmdvbGFuZy5vcmcvZ2VucHJvdG8vZ29vZ2xlYXBpcy9hcGkvZXhwci92MWFscGhhMTtleHBy+AEBYgZwcm90bzM", [file_google_api_expr_v1alpha1_syntax, file_google_protobuf_empty, file_google_protobuf_struct]);

/**
 * A CEL expression which has been successfully type checked.
 *
 * @generated from message google.api.expr.v1alpha1.CheckedExpr
 */
export type CheckedExpr = Message<"google.api.expr.v1alpha1.CheckedExpr"> & {
  /**
   * A map from expression ids to resolved references.
   *
   * The following entries are in this table:
   *
   * - An Ident or Select expression is represented here if it resolves to a
   *   declaration. For instance, if `a.b.c` is represented by
   *   `select(select(id(a), b), c)`, and `a.b` resolves to a declaration,
   *   while `c` is a field selection, then the reference is attached to the
   *   nested select expression (but not to the id or or the outer select).
   *   In turn, if `a` resolves to a declaration and `b.c` are field selections,
   *   the reference is attached to the ident expression.
   * - Every Call expression has an entry here, identifying the function being
   *   called.
   * - Every CreateStruct expression for a message has an entry, identifying
   *   the message.
   *
   * @generated from field: map<int64, google.api.expr.v1alpha1.Reference> reference_map = 2;
   */
  referenceMap: { [key: string]: Reference };

  /**
   * A map from expression ids to types.
   *
   * Every expression node which has a type different than DYN has a mapping
   * here. If an expression has type DYN, it is omitted from this map to save
   * space.
   *
   * @generated from field: map<int64, google.api.expr.v1alpha1.Type> type_map = 3;
   */
  typeMap: { [key: string]: Type };

  /**
   * The source info derived from input that generated the parsed `expr` and
   * any optimizations made during the type-checking pass.
   *
   * @generated from field: google.api.expr.v1alpha1.SourceInfo source_info = 5;
   */
  sourceInfo?: SourceInfo;

  /**
   * The expr version indicates the major / minor version number of the `expr`
   * representation.
   *
   * The most common reason for a version change will be to indicate to the CEL
   * runtimes that transformations have been performed on the expr during static
   * analysis. In some cases, this will save the runtime the work of applying
   * the same or similar transformations prior to evaluation.
   *
   * @generated from field: string expr_version = 6;
   */
  exprVersion: string;

  /**
   * The checked expression. Semantically equivalent to the parsed `expr`, but
   * may have structural differences.
   *
   * @generated from field: google.api.expr.v1alpha1.Expr expr = 4;
   */
  expr?: Expr;
};

/**
 * Describes the message google.api.expr.v1alpha1.CheckedExpr.
 * Use `create(CheckedExprSchema)` to create a new message.
 */
export const CheckedExprSchema: GenDescMessage<CheckedExpr> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_checked, 0);

/**
 * Represents a CEL type.
 *
 * @generated from message google.api.expr.v1alpha1.Type
 */
export type Type = Message<"google.api.expr.v1alpha1.Type"> & {
  /**
   * The kind of type.
   *
   * @generated from oneof google.api.expr.v1alpha1.Type.type_kind
   */
  typeKind: {
    /**
     * Dynamic type.
     *
     * @generated from field: google.protobuf.Empty dyn = 1;
     */
    value: Empty;
    case: "dyn";
  } | {
    /**
     * Null value.
     *
     * @generated from field: google.protobuf.NullValue null = 2;
     */
    value: NullValue;
    case: "null";
  } | {
    /**
     * Primitive types: `true`, `1u`, `-2.0`, `'string'`, `b'bytes'`.
     *
     * @generated from field: google.api.expr.v1alpha1.Type.PrimitiveType primitive = 3;
     */
    value: Type_PrimitiveType;
    case: "primitive";
  } | {
    /**
     * Wrapper of a primitive type, e.g. `google.protobuf.Int64Value`.
     *
     * @generated from field: google.api.expr.v1alpha1.Type.PrimitiveType wrapper = 4;
     */
    value: Type_PrimitiveType;
    case: "wrapper";
  } | {
    /**
     * Well-known protobuf type such as `google.protobuf.Timestamp`.
     *
     * @generated from field: google.api.expr.v1alpha1.Type.WellKnownType well_known = 5;
     */
    value: Type_WellKnownType;
    case: "wellKnown";
  } | {
    /**
     * Parameterized list with elements of `list_type`, e.g. `list<timestamp>`.
     *
     * @generated from field: google.api.expr.v1alpha1.Type.ListType list_type = 6;
     */
    value: Type_ListType;
    case: "listType";
  } | {
    /**
     * Parameterized map with typed keys and values.
     *
     * @generated from field: google.api.expr.v1alpha1.Type.MapType map_type = 7;
     */
    value: Type_MapType;
    case: "mapType";
  } | {
    /**
     * Function type.
     *
     * @generated from field: google.api.expr.v1alpha1.Type.FunctionType function = 8;
     */
    value: Type_FunctionType;
    case: "function";
  } | {
    /**
     * Protocol buffer message type.
     *
     * The `message_type` string specifies the qualified message type name. For
     * example, `google.plus.Profile`.
     *
     * @generated from field: string message_type = 9;
     */
    value: string;
    case: "messageType";
  } | {
    /**
     * Type param type.
     *
     * The `type_param` string specifies the type parameter name, e.g. `list<E>`
     * would be a `list_type` whose element type was a `type_param` type
     * named `E`.
     *
     * @generated from field: string type_param = 10;
     */
    value: string;
    case: "typeParam";
  } | {
    /**
     * Type type.
     *
     * The `type` value specifies the target type. e.g. int is type with a
     * target type of `Primitive.INT`.
     *
     * @generated from field: google.api.expr.v1alpha1.Type type = 11;
     */
    value: Type;
    case: "type";
  } | {
    /**
     * Error type.
     *
     * During type-checking if an expression is an error, its type is propagated
     * as the `ERROR` type. This permits the type-checker to discover other
     * errors present in the expression.
     *
     * @generated from field: google.protobuf.Empty error = 12;
     */
    value: Empty;
    case: "error";
  } | {
    /**
     * Abstract, application defined type.
     *
     * @generated from field: google.api.expr.v1alpha1.Type.AbstractType abstract_type = 14;
     */
    value: Type_AbstractType;
    case: "abstractType";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message google.api.expr.v1alpha1.Type.
 * Use `create(TypeSchema)` to create a new message.
 */
export const TypeSchema: GenDescMessage<Type> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_checked, 1);

/**
 * List type with typed elements, e.g. `list<example.proto.MyMessage>`.
 *
 * @generated from message google.api.expr.v1alpha1.Type.ListType
 */
export type Type_ListType = Message<"google.api.expr.v1alpha1.Type.ListType"> & {
  /**
   * The element type.
   *
   * @generated from field: google.api.expr.v1alpha1.Type elem_type = 1;
   */
  elemType?: Type;
};

/**
 * Describes the message google.api.expr.v1alpha1.Type.ListType.
 * Use `create(Type_ListTypeSchema)` to create a new message.
 */
export const Type_ListTypeSchema: GenDescMessage<Type_ListType> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_checked, 1, 0);

/**
 * Map type with parameterized key and value types, e.g. `map<string, int>`.
 *
 * @generated from message google.api.expr.v1alpha1.Type.MapType
 */
export type Type_MapType = Message<"google.api.expr.v1alpha1.Type.MapType"> & {
  /**
   * The type of the key.
   *
   * @generated from field: google.api.expr.v1alpha1.Type key_type = 1;
   */
  keyType?: Type;

  /**
   * The type of the value.
   *
   * @generated from field: google.api.expr.v1alpha1.Type value_type = 2;
   */
  valueType?: Type;
};

/**
 * Describes the message google.api.expr.v1alpha1.Type.MapType.
 * Use `create(Type_MapTypeSchema)` to create a new message.
 */
export const Type_MapTypeSchema: GenDescMessage<Type_MapType> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_checked, 1, 1);

/**
 * Function type with result and arg types.
 *
 * @generated from message google.api.expr.v1alpha1.Type.FunctionType
 */
export type Type_FunctionType = Message<"google.api.expr.v1alpha1.Type.FunctionType"> & {
  /**
   * Result type of the function.
   *
   * @generated from field: google.api.expr.v1alpha1.Type result_type = 1;
   */
  resultType?: Type;

  /**
   * Argument types of the function.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.Type arg_types = 2;
   */
  argTypes: Type[];
};

/**
 * Describes the message google.api.expr.v1alpha1.Type.FunctionType.
 * Use `create(Type_FunctionTypeSchema)` to create a new message.
 */
export const Type_FunctionTypeSchema: GenDescMessage<Type_FunctionType> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_checked, 1, 2);

/**
 * Application defined abstract type.
 *
 * @generated from message google.api.expr.v1alpha1.Type.AbstractType
 */
export type Type_AbstractType = Message<"google.api.expr.v1alpha1.Type.AbstractType"> & {
  /**
   * The fully qualified name of this abstract type.
   *
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * Parameter types for this abstract type.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.Type parameter_types = 2;
   */
  parameterTypes: Type[];
};

/**
 * Describes the message google.api.expr.v1alpha1.Type.AbstractType.
 * Use `create(Type_AbstractTypeSchema)` to create a new message.
 */
export const Type_AbstractTypeSchema: GenDescMessage<Type_AbstractType> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_checked, 1, 3);

/**
 * CEL primitive types.
 *
 * @generated from enum google.api.expr.v1alpha1.Type.PrimitiveType
 */
export enum Type_PrimitiveType {
  /**
   * Unspecified type.
   *
   * @generated from enum value: PRIMITIVE_TYPE_UNSPECIFIED = 0;
   */
  PRIMITIVE_TYPE_UNSPECIFIED = 0,

  /**
   * Boolean type.
   *
   * @generated from enum value: BOOL = 1;
   */
  BOOL = 1,

  /**
   * Int64 type.
   *
   * Proto-based integer values are widened to int64.
   *
   * @generated from enum value: INT64 = 2;
   */
  INT64 = 2,

  /**
   * Uint64 type.
   *
   * Proto-based unsigned integer values are widened to uint64.
   *
   * @generated from enum value: UINT64 = 3;
   */
  UINT64 = 3,

  /**
   * Double type.
   *
   * Proto-based float values are widened to double values.
   *
   * @generated from enum value: DOUBLE = 4;
   */
  DOUBLE = 4,

  /**
   * String type.
   *
   * @generated from enum value: STRING = 5;
   */
  STRING = 5,

  /**
   * Bytes type.
   *
   * @generated from enum value: BYTES = 6;
   */
  BYTES = 6,
}

/**
 * Describes the enum google.api.expr.v1alpha1.Type.PrimitiveType.
 */
export const Type_PrimitiveTypeSchema: GenDescEnum<Type_PrimitiveType> = /*@__PURE__*/
  enumDesc(file_google_api_expr_v1alpha1_checked, 1, 0);

/**
 * Well-known protobuf types treated with first-class support in CEL.
 *
 * @generated from enum google.api.expr.v1alpha1.Type.WellKnownType
 */
export enum Type_WellKnownType {
  /**
   * Unspecified type.
   *
   * @generated from enum value: WELL_KNOWN_TYPE_UNSPECIFIED = 0;
   */
  WELL_KNOWN_TYPE_UNSPECIFIED = 0,

  /**
   * Well-known protobuf.Any type.
   *
   * Any types are a polymorphic message type. During type-checking they are
   * treated like `DYN` types, but at runtime they are resolved to a specific
   * message type specified at evaluation time.
   *
   * @generated from enum value: ANY = 1;
   */
  ANY = 1,

  /**
   * Well-known protobuf.Timestamp type, internally referenced as `timestamp`.
   *
   * @generated from enum value: TIMESTAMP = 2;
   */
  TIMESTAMP = 2,

  /**
   * Well-known protobuf.Duration type, internally referenced as `duration`.
   *
   * @generated from enum value: DURATION = 3;
   */
  DURATION = 3,
}

/**
 * Describes the enum google.api.expr.v1alpha1.Type.WellKnownType.
 */
export const Type_WellKnownTypeSchema: GenDescEnum<Type_WellKnownType> = /*@__PURE__*/
  enumDesc(file_google_api_expr_v1alpha1_checked, 1, 1);

/**
 * Represents a declaration of a named value or function.
 *
 * A declaration is part of the contract between the expression, the agent
 * evaluating that expression, and the caller requesting evaluation.
 *
 * @generated from message google.api.expr.v1alpha1.Decl
 */
export type Decl = Message<"google.api.expr.v1alpha1.Decl"> & {
  /**
   * The fully qualified name of the declaration.
   *
   * Declarations are organized in containers and this represents the full path
   * to the declaration in its container, as in `google.api.expr.Decl`.
   *
   * Declarations used as
   * [FunctionDecl.Overload][google.api.expr.v1alpha1.Decl.FunctionDecl.Overload]
   * parameters may or may not have a name depending on whether the overload is
   * function declaration or a function definition containing a result
   * [Expr][google.api.expr.v1alpha1.Expr].
   *
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * Required. The declaration kind.
   *
   * @generated from oneof google.api.expr.v1alpha1.Decl.decl_kind
   */
  declKind: {
    /**
     * Identifier declaration.
     *
     * @generated from field: google.api.expr.v1alpha1.Decl.IdentDecl ident = 2;
     */
    value: Decl_IdentDecl;
    case: "ident";
  } | {
    /**
     * Function declaration.
     *
     * @generated from field: google.api.expr.v1alpha1.Decl.FunctionDecl function = 3;
     */
    value: Decl_FunctionDecl;
    case: "function";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message google.api.expr.v1alpha1.Decl.
 * Use `create(DeclSchema)` to create a new message.
 */
export const DeclSchema: GenDescMessage<Decl> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_checked, 2);

/**
 * Identifier declaration which specifies its type and optional `Expr` value.
 *
 * An identifier without a value is a declaration that must be provided at
 * evaluation time. An identifier with a value should resolve to a constant,
 * but may be used in conjunction with other identifiers bound at evaluation
 * time.
 *
 * @generated from message google.api.expr.v1alpha1.Decl.IdentDecl
 */
export type Decl_IdentDecl = Message<"google.api.expr.v1alpha1.Decl.IdentDecl"> & {
  /**
   * Required. The type of the identifier.
   *
   * @generated from field: google.api.expr.v1alpha1.Type type = 1;
   */
  type?: Type;

  /**
   * The constant value of the identifier. If not specified, the identifier
   * must be supplied at evaluation time.
   *
   * @generated from field: google.api.expr.v1alpha1.Constant value = 2;
   */
  value?: Constant;

  /**
   * Documentation string for the identifier.
   *
   * @generated from field: string doc = 3;
   */
  doc: string;
};

/**
 * Describes the message google.api.expr.v1alpha1.Decl.IdentDecl.
 * Use `create(Decl_IdentDeclSchema)` to create a new message.
 */
export const Decl_IdentDeclSchema: GenDescMessage<Decl_IdentDecl> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_checked, 2, 0);

/**
 * Function declaration specifies one or more overloads which indicate the
 * function's parameter types and return type.
 *
 * Functions have no observable side-effects (there may be side-effects like
 * logging which are not observable from CEL).
 *
 * @generated from message google.api.expr.v1alpha1.Decl.FunctionDecl
 */
export type Decl_FunctionDecl = Message<"google.api.expr.v1alpha1.Decl.FunctionDecl"> & {
  /**
   * Required. List of function overloads, must contain at least one overload.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.Decl.FunctionDecl.Overload overloads = 1;
   */
  overloads: Decl_FunctionDecl_Overload[];
};

/**
 * Describes the message google.api.expr.v1alpha1.Decl.FunctionDecl.
 * Use `create(Decl_FunctionDeclSchema)` to create a new message.
 */
export const Decl_FunctionDeclSchema: GenDescMessage<Decl_FunctionDecl> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_checked, 2, 1);

/**
 * An overload indicates a function's parameter types and return type, and
 * may optionally include a function body described in terms of
 * [Expr][google.api.expr.v1alpha1.Expr] values.
 *
 * Functions overloads are declared in either a function or method
 * call-style. For methods, the `params[0]` is the expected type of the
 * target receiver.
 *
 * Overloads must have non-overlapping argument types after erasure of all
 * parameterized type variables (similar as type erasure in Java).
 *
 * @generated from message google.api.expr.v1alpha1.Decl.FunctionDecl.Overload
 */
export type Decl_FunctionDecl_Overload = Message<"google.api.expr.v1alpha1.Decl.FunctionDecl.Overload"> & {
  /**
   * Required. Globally unique overload name of the function which reflects
   * the function name and argument types.
   *
   * This will be used by a [Reference][google.api.expr.v1alpha1.Reference]
   * to indicate the `overload_id` that was resolved for the function
   * `name`.
   *
   * @generated from field: string overload_id = 1;
   */
  overloadId: string;

  /**
   * List of function parameter [Type][google.api.expr.v1alpha1.Type]
   * values.
   *
   * Param types are disjoint after generic type parameters have been
   * replaced with the type `DYN`. Since the `DYN` type is compatible with
   * any other type, this means that if `A` is a type parameter, the
   * function types `int<A>` and `int<int>` are not disjoint. Likewise,
   * `map<string, string>` is not disjoint from `map<K, V>`.
   *
   * When the `result_type` of a function is a generic type param, the
   * type param name also appears as the `type` of on at least one params.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.Type params = 2;
   */
  params: Type[];

  /**
   * The type param names associated with the function declaration.
   *
   * For example, `function ex<K,V>(K key, map<K, V> map) : V` would yield
   * the type params of `K, V`.
   *
   * @generated from field: repeated string type_params = 3;
   */
  typeParams: string[];

  /**
   * Required. The result type of the function. For example, the operator
   * `string.isEmpty()` would have `result_type` of `kind: BOOL`.
   *
   * @generated from field: google.api.expr.v1alpha1.Type result_type = 4;
   */
  resultType?: Type;

  /**
   * Whether the function is to be used in a method call-style `x.f(...)`
   * or a function call-style `f(x, ...)`.
   *
   * For methods, the first parameter declaration, `params[0]` is the
   * expected type of the target receiver.
   *
   * @generated from field: bool is_instance_function = 5;
   */
  isInstanceFunction: boolean;

  /**
   * Documentation string for the overload.
   *
   * @generated from field: string doc = 6;
   */
  doc: string;
};

/**
 * Describes the message google.api.expr.v1alpha1.Decl.FunctionDecl.Overload.
 * Use `create(Decl_FunctionDecl_OverloadSchema)` to create a new message.
 */
export const Decl_FunctionDecl_OverloadSchema: GenDescMessage<Decl_FunctionDecl_Overload> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_checked, 2, 1, 0);

/**
 * Describes a resolved reference to a declaration.
 *
 * @generated from message google.api.expr.v1alpha1.Reference
 */
export type Reference = Message<"google.api.expr.v1alpha1.Reference"> & {
  /**
   * The fully qualified name of the declaration.
   *
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * For references to functions, this is a list of `Overload.overload_id`
   * values which match according to typing rules.
   *
   * If the list has more than one element, overload resolution among the
   * presented candidates must happen at runtime because of dynamic types. The
   * type checker attempts to narrow down this list as much as possible.
   *
   * Empty if this is not a reference to a
   * [Decl.FunctionDecl][google.api.expr.v1alpha1.Decl.FunctionDecl].
   *
   * @generated from field: repeated string overload_id = 3;
   */
  overloadId: string[];

  /**
   * For references to constants, this may contain the value of the
   * constant if known at compile time.
   *
   * @generated from field: google.api.expr.v1alpha1.Constant value = 4;
   */
  value?: Constant;
};

/**
 * Describes the message google.api.expr.v1alpha1.Reference.
 * Use `create(ReferenceSchema)` to create a new message.
 */
export const ReferenceSchema: GenDescMessage<Reference> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_checked, 3);

