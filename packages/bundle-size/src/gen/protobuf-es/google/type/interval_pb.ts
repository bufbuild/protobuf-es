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

// @generated by protoc-gen-es v2.0.0-alpha.3 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/type/interval.proto (package google.type, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { fileDesc_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/type/interval.proto.
 */
export const fileDesc_google_type_interval: GenDescFile = /*@__PURE__*/
  fileDesc("Chpnb29nbGUvdHlwZS9pbnRlcnZhbC5wcm90bxILZ29vZ2xlLnR5cGUiaAoISW50ZXJ2YWwSLgoKc3RhcnRfdGltZRgBIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLAoIZW5kX3RpbWUYAiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQmkKD2NvbS5nb29nbGUudHlwZUINSW50ZXJ2YWxQcm90b1ABWjxnb29nbGUuZ29sYW5nLm9yZy9nZW5wcm90by9nb29nbGVhcGlzL3R5cGUvaW50ZXJ2YWw7aW50ZXJ2YWz4AQGiAgNHVFBiBnByb3RvMw", [fileDesc_google_protobuf_timestamp]);

/**
 * Represents a time interval, encoded as a Timestamp start (inclusive) and a
 * Timestamp end (exclusive).
 *
 * The start must be less than or equal to the end.
 * When the start equals the end, the interval is empty (matches no time).
 * When both start and end are unspecified, the interval matches any time.
 *
 * @generated from message google.type.Interval
 */
export type Interval = Message<"google.type.Interval"> & {
  /**
   * Optional. Inclusive start of the interval.
   *
   * If specified, a Timestamp matching this interval will have to be the same
   * or after the start.
   *
   * @generated from field: google.protobuf.Timestamp start_time = 1;
   */
  startTime?: Timestamp;

  /**
   * Optional. Exclusive end of the interval.
   *
   * If specified, a Timestamp matching this interval will have to be before the
   * end.
   *
   * @generated from field: google.protobuf.Timestamp end_time = 2;
   */
  endTime?: Timestamp;
};

/**
 * Describes the message google.type.Interval.
 * Use `create(IntervalDesc)` to create a new message.
 */
export const IntervalDesc: GenDescMessage<Interval> = /*@__PURE__*/
  messageDesc(fileDesc_google_type_interval, 0);

