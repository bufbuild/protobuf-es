// Copyright 2021-2023 Buf Technologies, Inc.
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

/**
 * Assert that condition is truthy or throw error (with message)
 */
export function assert(condition: unknown, msg?: string): asserts condition {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- we want the implicit conversion to boolean
  if (!condition) {
    throw new Error(msg);
  }
}

const FLOAT32_MAX = 3.4028234663852886e38,
  FLOAT32_MIN = -3.4028234663852886e38,
  UINT32_MAX = 0xffffffff,
  INT32_MAX = 0x7fffffff,
  INT32_MIN = -0x80000000;

/**
 * Assert a valid signed protobuf 32-bit integer.
 */
export function assertInt32(arg: unknown): asserts arg is number {
  if (typeof arg !== "number") throw new Error("invalid int 32: " + typeof arg);
  if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
    throw new Error("invalid int 32: " + arg); // eslint-disable-line @typescript-eslint/restrict-plus-operands -- we want the implicit conversion to string
}

/**
 * Assert a valid unsigned protobuf 32-bit integer.
 */
export function assertUInt32(arg: unknown): asserts arg is number {
  if (typeof arg !== "number")
    throw new Error("invalid uint 32: " + typeof arg);
  if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
    throw new Error("invalid uint 32: " + arg); // eslint-disable-line @typescript-eslint/restrict-plus-operands -- we want the implicit conversion to string
}

/**
 * Assert a valid protobuf float value.
 */
export function assertFloat32(arg: unknown): asserts arg is number {
  if (typeof arg !== "number")
    throw new Error("invalid float 32: " + typeof arg);
  if (!Number.isFinite(arg)) return;
  if (arg > FLOAT32_MAX || arg < FLOAT32_MIN)
    throw new Error("invalid float 32: " + arg); // eslint-disable-line @typescript-eslint/restrict-plus-operands -- we want the implicit conversion to string
}
