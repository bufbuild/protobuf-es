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
// @generated from file google/api/expr/v1alpha1/explain.proto (package google.api.expr.v1alpha1, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Value, ValueJson } from "./value_pb";
import { fileDesc_google_api_expr_v1alpha1_value } from "./value_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/api/expr/v1alpha1/explain.proto.
 */
export const fileDesc_google_api_expr_v1alpha1_explain: GenDescFile = /*@__PURE__*/
  fileDesc("CiZnb29nbGUvYXBpL2V4cHIvdjFhbHBoYTEvZXhwbGFpbi5wcm90bxIYZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExIqsBCgdFeHBsYWluEi8KBnZhbHVlcxgBIAMoCzIfLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5WYWx1ZRI+CgpleHByX3N0ZXBzGAIgAygLMiouZ29vZ2xlLmFwaS5leHByLnYxYWxwaGExLkV4cGxhaW4uRXhwclN0ZXAaKwoIRXhwclN0ZXASCgoCaWQYASABKAMSEwoLdmFsdWVfaW5kZXgYAiABKAU6AhgBQm8KHGNvbS5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTFCDEV4cGxhaW5Qcm90b1ABWjxnb29nbGUuZ29sYW5nLm9yZy9nZW5wcm90by9nb29nbGVhcGlzL2FwaS9leHByL3YxYWxwaGExO2V4cHL4AQFiBnByb3RvMw", [fileDesc_google_api_expr_v1alpha1_value]);

/**
 * Values of intermediate expressions produced when evaluating expression.
 * Deprecated, use `EvalState` instead.
 *
 * @generated from message google.api.expr.v1alpha1.Explain
 * @deprecated
 */
export type Explain = Message<"google.api.expr.v1alpha1.Explain"> & {
  /**
   * All of the observed values.
   *
   * The field value_index is an index in the values list.
   * Separating values from steps is needed to remove redundant values.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.Value values = 1;
   */
  values: Value[];

  /**
   * List of steps.
   *
   * Repeated evaluations of the same expression generate new ExprStep
   * instances. The order of such ExprStep instances matches the order of
   * elements returned by Comprehension.iter_range.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.Explain.ExprStep expr_steps = 2;
   */
  exprSteps: Explain_ExprStep[];
};

/**
 * JSON type for the message google.api.expr.v1alpha1.Explain.
 */
export type ExplainJson = {
  /**
   * @generated from field: repeated google.api.expr.v1alpha1.Value values = 1;
   */
  values?: ValueJson[];

  /**
   * @generated from field: repeated google.api.expr.v1alpha1.Explain.ExprStep expr_steps = 2;
   */
  exprSteps?: Explain_ExprStepJson[];
};

/**
 * Describes the message google.api.expr.v1alpha1.Explain.
 * Use `create(ExplainDesc)` to create a new message.
 * @deprecated
 */
export const ExplainDesc: GenDescMessage<Explain, ExplainJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_explain, 0);

/**
 * ID and value index of one step.
 *
 * @generated from message google.api.expr.v1alpha1.Explain.ExprStep
 * @deprecated
 */
export type Explain_ExprStep = Message<"google.api.expr.v1alpha1.Explain.ExprStep"> & {
  /**
   * ID of corresponding Expr node.
   *
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * Index of the value in the values list.
   *
   * @generated from field: int32 value_index = 2;
   */
  valueIndex: number;
};

/**
 * JSON type for the message google.api.expr.v1alpha1.Explain.ExprStep.
 */
export type Explain_ExprStepJson = {
  /**
   * @generated from field: int64 id = 1;
   */
  id?: string;

  /**
   * @generated from field: int32 value_index = 2;
   */
  valueIndex?: number;
};

/**
 * Describes the message google.api.expr.v1alpha1.Explain.ExprStep.
 * Use `create(Explain_ExprStepDesc)` to create a new message.
 * @deprecated
 */
export const Explain_ExprStepDesc: GenDescMessage<Explain_ExprStep, Explain_ExprStepJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_expr_v1alpha1_explain, 0, 0);

