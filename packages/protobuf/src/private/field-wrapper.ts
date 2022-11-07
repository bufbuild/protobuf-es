// Copyright 2021-2022 Buf Technologies, Inc.
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

import { Message } from "../message.js";
import type { MessageType } from "../message-type.js";
import type { DescField } from "../descriptor-set.js";
import { ScalarType } from "../field.js";

/* eslint-disable @typescript-eslint/no-explicit-any -- unknown fields are represented with any */

/**
 * A field wrapper unwraps a message to a primitive value that is more
 * ergonomic for use as a message field.
 *
 * Note that this feature exists for google/protobuf/wrappers.proto
 * and cannot be used to arbitrarily modify types in generated code.
 */
export interface FieldWrapper<T extends Message<T> = any, U = any> {
  wrapField(value: U): T;

  unwrapField(value: T): U;
}

/**
 * Wrap a primitive message field value in its corresponding wrapper
 * message. This function is idempotent.
 */
export function wrapField<T extends Message<T>>(
  type: MessageType<T>,
  value: any
): T {
  if (value instanceof Message || !type.fieldWrapper) {
    return value as T;
  }
  return type.fieldWrapper.wrapField(value);
}

/**
 * If the given field uses one of the well-known wrapper types, return
 * the primitive type it wraps.
 */
export function getUnwrappedFieldType(
  field: DescField
): ScalarType | undefined {
  if (field.fieldKind !== "message") {
    return undefined;
  }
  if (field.repeated) {
    return undefined;
  }
  if (field.oneof != undefined) {
    return undefined;
  }
  return wktWrapperToScalarType[field.message.typeName];
}

const wktWrapperToScalarType: Record<string, ScalarType> = {
  "google.protobuf.DoubleValue": ScalarType.DOUBLE,
  "google.protobuf.FloatValue": ScalarType.FLOAT,
  "google.protobuf.Int64Value": ScalarType.INT64,
  "google.protobuf.UInt64Value": ScalarType.UINT64,
  "google.protobuf.Int32Value": ScalarType.INT32,
  "google.protobuf.UInt32Value": ScalarType.UINT32,
  "google.protobuf.BoolValue": ScalarType.BOOL,
  "google.protobuf.StringValue": ScalarType.STRING,
  "google.protobuf.BytesValue": ScalarType.BYTES,
};
