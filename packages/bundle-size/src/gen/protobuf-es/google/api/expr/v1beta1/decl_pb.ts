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
// @generated from file google/api/expr/v1beta1/decl.proto (package google.api.expr.v1beta1, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Expr, ExprJson } from "./expr_pb";
import { file_google_api_expr_v1beta1_expr } from "./expr_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/api/expr/v1beta1/decl.proto.
 */
export const file_google_api_expr_v1beta1_decl: GenDescFile = /*@__PURE__*/
  fileDesc("CiJnb29nbGUvYXBpL2V4cHIvdjFiZXRhMS9kZWNsLnByb3RvEhdnb29nbGUuYXBpLmV4cHIudjFiZXRhMSKlAQoERGVjbBIKCgJpZBgBIAEoBRIMCgRuYW1lGAIgASgJEgsKA2RvYxgDIAEoCRIzCgVpZGVudBgEIAEoCzIiLmdvb2dsZS5hcGkuZXhwci52MWJldGExLklkZW50RGVjbEgAEjkKCGZ1bmN0aW9uGAUgASgLMiUuZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEuRnVuY3Rpb25EZWNsSABCBgoEa2luZCJcCghEZWNsVHlwZRIKCgJpZBgBIAEoBRIMCgR0eXBlGAIgASgJEjYKC3R5cGVfcGFyYW1zGAQgAygLMiEuZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEuRGVjbFR5cGUiagoJSWRlbnREZWNsEi8KBHR5cGUYAyABKAsyIS5nb29nbGUuYXBpLmV4cHIudjFiZXRhMS5EZWNsVHlwZRIsCgV2YWx1ZRgEIAEoCzIdLmdvb2dsZS5hcGkuZXhwci52MWJldGExLkV4cHIikwEKDEZ1bmN0aW9uRGVjbBIwCgRhcmdzGAEgAygLMiIuZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEuSWRlbnREZWNsEjYKC3JldHVybl90eXBlGAIgASgLMiEuZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEuRGVjbFR5cGUSGQoRcmVjZWl2ZXJfZnVuY3Rpb24YAyABKAhCagobY29tLmdvb2dsZS5hcGkuZXhwci52MWJldGExQglEZWNsUHJvdG9QAVo7Z29vZ2xlLmdvbGFuZy5vcmcvZ2VucHJvdG8vZ29vZ2xlYXBpcy9hcGkvZXhwci92MWJldGExO2V4cHL4AQFiBnByb3RvMw", [file_google_api_expr_v1beta1_expr]);

/**
 * A declaration.
 *
 * @generated from message google.api.expr.v1beta1.Decl
 */
export type Decl = Message<"google.api.expr.v1beta1.Decl"> & {
  /**
   * The id of the declaration.
   *
   * @generated from field: int32 id = 1;
   */
  id: number;

  /**
   * The name of the declaration.
   *
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * The documentation string for the declaration.
   *
   * @generated from field: string doc = 3;
   */
  doc: string;

  /**
   * The kind of declaration.
   *
   * @generated from oneof google.api.expr.v1beta1.Decl.kind
   */
  kind: {
    /**
     * An identifier declaration.
     *
     * @generated from field: google.api.expr.v1beta1.IdentDecl ident = 4;
     */
    value: IdentDecl;
    case: "ident";
  } | {
    /**
     * A function declaration.
     *
     * @generated from field: google.api.expr.v1beta1.FunctionDecl function = 5;
     */
    value: FunctionDecl;
    case: "function";
  } | { case: undefined; value?: undefined };
};

/**
 * JSON type for the message google.api.expr.v1beta1.Decl.
 */
export type DeclJson = {
  /**
   * @generated from field: int32 id = 1;
   */
  id?: number;

  /**
   * @generated from field: string name = 2;
   */
  name?: string;

  /**
   * @generated from field: string doc = 3;
   */
  doc?: string;

  /**
   * @generated from field: google.api.expr.v1beta1.IdentDecl ident = 4;
   */
  ident?: IdentDeclJson;

  /**
   * @generated from field: google.api.expr.v1beta1.FunctionDecl function = 5;
   */
  function?: FunctionDeclJson;
};

/**
 * Describes the message google.api.expr.v1beta1.Decl.
 * Use `create(DeclSchema)` to create a new message.
 */
export const DeclSchema: GenDescMessage<Decl, DeclJson> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1beta1_decl, 0);

/**
 * The declared type of a variable.
 *
 * Extends runtime type values with extra information used for type checking
 * and dispatching.
 *
 * @generated from message google.api.expr.v1beta1.DeclType
 */
export type DeclType = Message<"google.api.expr.v1beta1.DeclType"> & {
  /**
   * The expression id of the declared type, if applicable.
   *
   * @generated from field: int32 id = 1;
   */
  id: number;

  /**
   * The type name, e.g. 'int', 'my.type.Type' or 'T'
   *
   * @generated from field: string type = 2;
   */
  type: string;

  /**
   * An ordered list of type parameters, e.g. `<string, int>`.
   * Only applies to a subset of types, e.g. `map`, `list`.
   *
   * @generated from field: repeated google.api.expr.v1beta1.DeclType type_params = 4;
   */
  typeParams: DeclType[];
};

/**
 * JSON type for the message google.api.expr.v1beta1.DeclType.
 */
export type DeclTypeJson = {
  /**
   * @generated from field: int32 id = 1;
   */
  id?: number;

  /**
   * @generated from field: string type = 2;
   */
  type?: string;

  /**
   * @generated from field: repeated google.api.expr.v1beta1.DeclType type_params = 4;
   */
  typeParams?: DeclTypeJson[];
};

/**
 * Describes the message google.api.expr.v1beta1.DeclType.
 * Use `create(DeclTypeSchema)` to create a new message.
 */
export const DeclTypeSchema: GenDescMessage<DeclType, DeclTypeJson> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1beta1_decl, 1);

/**
 * An identifier declaration.
 *
 * @generated from message google.api.expr.v1beta1.IdentDecl
 */
export type IdentDecl = Message<"google.api.expr.v1beta1.IdentDecl"> & {
  /**
   * Optional type of the identifier.
   *
   * @generated from field: google.api.expr.v1beta1.DeclType type = 3;
   */
  type?: DeclType;

  /**
   * Optional value of the identifier.
   *
   * @generated from field: google.api.expr.v1beta1.Expr value = 4;
   */
  value?: Expr;
};

/**
 * JSON type for the message google.api.expr.v1beta1.IdentDecl.
 */
export type IdentDeclJson = {
  /**
   * @generated from field: google.api.expr.v1beta1.DeclType type = 3;
   */
  type?: DeclTypeJson;

  /**
   * @generated from field: google.api.expr.v1beta1.Expr value = 4;
   */
  value?: ExprJson;
};

/**
 * Describes the message google.api.expr.v1beta1.IdentDecl.
 * Use `create(IdentDeclSchema)` to create a new message.
 */
export const IdentDeclSchema: GenDescMessage<IdentDecl, IdentDeclJson> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1beta1_decl, 2);

/**
 * A function declaration.
 *
 * @generated from message google.api.expr.v1beta1.FunctionDecl
 */
export type FunctionDecl = Message<"google.api.expr.v1beta1.FunctionDecl"> & {
  /**
   * The function arguments.
   *
   * @generated from field: repeated google.api.expr.v1beta1.IdentDecl args = 1;
   */
  args: IdentDecl[];

  /**
   * Optional declared return type.
   *
   * @generated from field: google.api.expr.v1beta1.DeclType return_type = 2;
   */
  returnType?: DeclType;

  /**
   * If the first argument of the function is the receiver.
   *
   * @generated from field: bool receiver_function = 3;
   */
  receiverFunction: boolean;
};

/**
 * JSON type for the message google.api.expr.v1beta1.FunctionDecl.
 */
export type FunctionDeclJson = {
  /**
   * @generated from field: repeated google.api.expr.v1beta1.IdentDecl args = 1;
   */
  args?: IdentDeclJson[];

  /**
   * @generated from field: google.api.expr.v1beta1.DeclType return_type = 2;
   */
  returnType?: DeclTypeJson;

  /**
   * @generated from field: bool receiver_function = 3;
   */
  receiverFunction?: boolean;
};

/**
 * Describes the message google.api.expr.v1beta1.FunctionDecl.
 * Use `create(FunctionDeclSchema)` to create a new message.
 */
export const FunctionDeclSchema: GenDescMessage<FunctionDecl, FunctionDeclJson> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1beta1_decl, 3);

