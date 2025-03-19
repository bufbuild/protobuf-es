// Copyright 2021-2025 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v2.2.5 with parameter "target=ts"
// @generated from file google/type/expr.proto (package google.type, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/type/expr.proto.
 */
export const file_google_type_expr: GenFile = /*@__PURE__*/
  fileDesc("ChZnb29nbGUvdHlwZS9leHByLnByb3RvEgtnb29nbGUudHlwZSJQCgRFeHByEhIKCmV4cHJlc3Npb24YASABKAkSDQoFdGl0bGUYAiABKAkSEwoLZGVzY3JpcHRpb24YAyABKAkSEAoIbG9jYXRpb24YBCABKAlCWgoPY29tLmdvb2dsZS50eXBlQglFeHByUHJvdG9QAVo0Z29vZ2xlLmdvbGFuZy5vcmcvZ2VucHJvdG8vZ29vZ2xlYXBpcy90eXBlL2V4cHI7ZXhwcqICA0dUUGIGcHJvdG8z");

/**
 * Represents a textual expression in the Common Expression Language (CEL)
 * syntax. CEL is a C-like expression language. The syntax and semantics of CEL
 * are documented at https://github.com/google/cel-spec.
 *
 * Example (Comparison):
 *
 *     title: "Summary size limit"
 *     description: "Determines if a summary is less than 100 chars"
 *     expression: "document.summary.size() < 100"
 *
 * Example (Equality):
 *
 *     title: "Requestor is owner"
 *     description: "Determines if requestor is the document owner"
 *     expression: "document.owner == request.auth.claims.email"
 *
 * Example (Logic):
 *
 *     title: "Public documents"
 *     description: "Determine whether the document should be publicly visible"
 *     expression: "document.type != 'private' && document.type != 'internal'"
 *
 * Example (Data Manipulation):
 *
 *     title: "Notification string"
 *     description: "Create a notification string with a timestamp."
 *     expression: "'New message received at ' + string(document.create_time)"
 *
 * The exact variables and functions that may be referenced within an expression
 * are determined by the service that evaluates it. See the service
 * documentation for additional information.
 *
 * @generated from message google.type.Expr
 */
export type Expr = Message<"google.type.Expr"> & {
  /**
   * Textual representation of an expression in Common Expression Language
   * syntax.
   *
   * @generated from field: string expression = 1;
   */
  expression: string;

  /**
   * Optional. Title for the expression, i.e. a short string describing
   * its purpose. This can be used e.g. in UIs which allow to enter the
   * expression.
   *
   * @generated from field: string title = 2;
   */
  title: string;

  /**
   * Optional. Description of the expression. This is a longer text which
   * describes the expression, e.g. when hovered over it in a UI.
   *
   * @generated from field: string description = 3;
   */
  description: string;

  /**
   * Optional. String indicating the location of the expression for error
   * reporting, e.g. a file name and a position in the file.
   *
   * @generated from field: string location = 4;
   */
  location: string;
};

/**
 * Describes the message google.type.Expr.
 * Use `create(ExprSchema)` to create a new message.
 */
export const ExprSchema: GenMessage<Expr> = /*@__PURE__*/
  messageDesc(file_google_type_expr, 0);

