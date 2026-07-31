// Copyright 2021-2026 Buf Technologies, Inc.
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
 * Minimum google.protobuf.Timestamp in JSON, in milliseconds (inclusive).
 */
export const timestampMsMin = /*@__PURE__*/ Date.parse("0001-01-01T00:00:00Z");

/**
 * Maximum google.protobuf.Timestamp in JSON, in milliseconds (inclusive).
 */
export const timestampMsMax = /*@__PURE__*/ Date.parse("9999-12-31T23:59:59Z");

/**
 * Minimum google.protobuf.Duration in JSON, in seconds.
 */
export const durationSecondsMin = -315576000000;

/**
 * Maximum google.protobuf.Duration in JSON, in seconds.
 */
export const durationSecondsMax = 315576000000;
