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
// @generated from file google/type/date.proto (package google.type, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/type/date.proto.
 */
export const file_google_type_date: GenFile = /*@__PURE__*/
  fileDesc("ChZnb29nbGUvdHlwZS9kYXRlLnByb3RvEgtnb29nbGUudHlwZSIwCgREYXRlEgwKBHllYXIYASABKAUSDQoFbW9udGgYAiABKAUSCwoDZGF5GAMgASgFQl0KD2NvbS5nb29nbGUudHlwZUIJRGF0ZVByb3RvUAFaNGdvb2dsZS5nb2xhbmcub3JnL2dlbnByb3RvL2dvb2dsZWFwaXMvdHlwZS9kYXRlO2RhdGX4AQGiAgNHVFBiBnByb3RvMw");

/**
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following:
 *
 * * A full date, with non-zero year, month, and day values
 * * A month and day value, with a zero year, such as an anniversary
 * * A year on its own, with zero month and day values
 * * A year and month value, with a zero day, such as a credit card expiration
 * date
 *
 * Related types are [google.type.TimeOfDay][google.type.TimeOfDay] and
 * `google.protobuf.Timestamp`.
 *
 * @generated from message google.type.Date
 */
export type Date = Message<"google.type.Date"> & {
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without
   * a year.
   *
   * @generated from field: int32 year = 1;
   */
  year: number;

  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   *
   * @generated from field: int32 month = 2;
   */
  month: number;

  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or 0
   * to specify a year by itself or a year and month where the day isn't
   * significant.
   *
   * @generated from field: int32 day = 3;
   */
  day: number;
};

/**
 * Describes the message google.type.Date.
 * Use `create(DateSchema)` to create a new message.
 */
export const DateSchema: GenMessage<Date> = /*@__PURE__*/
  messageDesc(file_google_type_date, 0);

