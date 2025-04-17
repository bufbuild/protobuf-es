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

// @generated by protoc-gen-es v1.10.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/api/expr/v1alpha1/explain.proto (package google.api.expr.v1alpha1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";
import { Value } from "./value_pb.js";

/**
 * Values of intermediate expressions produced when evaluating expression.
 * Deprecated, use `EvalState` instead.
 *
 * @generated from message google.api.expr.v1alpha1.Explain
 * @deprecated
 */
export class Explain extends Message<Explain> {
  /**
   * All of the observed values.
   *
   * The field value_index is an index in the values list.
   * Separating values from steps is needed to remove redundant values.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.Value values = 1;
   */
  values: Value[] = [];

  /**
   * List of steps.
   *
   * Repeated evaluations of the same expression generate new ExprStep
   * instances. The order of such ExprStep instances matches the order of
   * elements returned by Comprehension.iter_range.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.Explain.ExprStep expr_steps = 2;
   */
  exprSteps: Explain_ExprStep[] = [];

  constructor(data?: PartialMessage<Explain>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "google.api.expr.v1alpha1.Explain";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "values", kind: "message", T: Value, repeated: true },
    { no: 2, name: "expr_steps", kind: "message", T: Explain_ExprStep, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Explain {
    return new Explain().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Explain {
    return new Explain().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Explain {
    return new Explain().fromJsonString(jsonString, options);
  }

  static equals(a: Explain | PlainMessage<Explain> | undefined, b: Explain | PlainMessage<Explain> | undefined): boolean {
    return proto3.util.equals(Explain, a, b);
  }
}

/**
 * ID and value index of one step.
 *
 * @generated from message google.api.expr.v1alpha1.Explain.ExprStep
 */
export class Explain_ExprStep extends Message<Explain_ExprStep> {
  /**
   * ID of corresponding Expr node.
   *
   * @generated from field: int64 id = 1;
   */
  id = protoInt64.zero;

  /**
   * Index of the value in the values list.
   *
   * @generated from field: int32 value_index = 2;
   */
  valueIndex = 0;

  constructor(data?: PartialMessage<Explain_ExprStep>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "google.api.expr.v1alpha1.Explain.ExprStep";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "value_index", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Explain_ExprStep {
    return new Explain_ExprStep().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Explain_ExprStep {
    return new Explain_ExprStep().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Explain_ExprStep {
    return new Explain_ExprStep().fromJsonString(jsonString, options);
  }

  static equals(a: Explain_ExprStep | PlainMessage<Explain_ExprStep> | undefined, b: Explain_ExprStep | PlainMessage<Explain_ExprStep> | undefined): boolean {
    return proto3.util.equals(Explain_ExprStep, a, b);
  }
}

