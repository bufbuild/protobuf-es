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
// @generated from file google/type/calendar_period.proto (package google.type, syntax proto3)
/* eslint-disable */

import type { GenDescEnum, GenDescFile } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc } from "@bufbuild/protobuf/codegenv1";

/**
 * Describes the file google/type/calendar_period.proto.
 */
export const file_google_type_calendar_period: GenDescFile = /*@__PURE__*/
  fileDesc("CiFnb29nbGUvdHlwZS9jYWxlbmRhcl9wZXJpb2QucHJvdG8SC2dvb2dsZS50eXBlKn8KDkNhbGVuZGFyUGVyaW9kEh8KG0NBTEVOREFSX1BFUklPRF9VTlNQRUNJRklFRBAAEgcKA0RBWRABEggKBFdFRUsQAhINCglGT1JUTklHSFQQAxIJCgVNT05USBAEEgsKB1FVQVJURVIQBRIICgRIQUxGEAYSCAoEWUVBUhAHQngKD2NvbS5nb29nbGUudHlwZUITQ2FsZW5kYXJQZXJpb2RQcm90b1ABWkhnb29nbGUuZ29sYW5nLm9yZy9nZW5wcm90by9nb29nbGVhcGlzL3R5cGUvY2FsZW5kYXJwZXJpb2Q7Y2FsZW5kYXJwZXJpb2SiAgNHVFBiBnByb3RvMw");

/**
 * A `CalendarPeriod` represents the abstract concept of a time period that has
 * a canonical start. Grammatically, "the start of the current
 * `CalendarPeriod`." All calendar times begin at midnight UTC.
 *
 * @generated from enum google.type.CalendarPeriod
 */
export enum CalendarPeriod {
  /**
   * Undefined period, raises an error.
   *
   * @generated from enum value: CALENDAR_PERIOD_UNSPECIFIED = 0;
   */
  CALENDAR_PERIOD_UNSPECIFIED = 0,

  /**
   * A day.
   *
   * @generated from enum value: DAY = 1;
   */
  DAY = 1,

  /**
   * A week. Weeks begin on Monday, following
   * [ISO 8601](https://en.wikipedia.org/wiki/ISO_week_date).
   *
   * @generated from enum value: WEEK = 2;
   */
  WEEK = 2,

  /**
   * A fortnight. The first calendar fortnight of the year begins at the start
   * of week 1 according to
   * [ISO 8601](https://en.wikipedia.org/wiki/ISO_week_date).
   *
   * @generated from enum value: FORTNIGHT = 3;
   */
  FORTNIGHT = 3,

  /**
   * A month.
   *
   * @generated from enum value: MONTH = 4;
   */
  MONTH = 4,

  /**
   * A quarter. Quarters start on dates 1-Jan, 1-Apr, 1-Jul, and 1-Oct of each
   * year.
   *
   * @generated from enum value: QUARTER = 5;
   */
  QUARTER = 5,

  /**
   * A half-year. Half-years start on dates 1-Jan and 1-Jul.
   *
   * @generated from enum value: HALF = 6;
   */
  HALF = 6,

  /**
   * A year.
   *
   * @generated from enum value: YEAR = 7;
   */
  YEAR = 7,
}

/**
 * JSON type for the enum google.type.CalendarPeriod.
 */
export type CalendarPeriodJson = "CALENDAR_PERIOD_UNSPECIFIED" | "DAY" | "WEEK" | "FORTNIGHT" | "MONTH" | "QUARTER" | "HALF" | "YEAR";

/**
 * Describes the enum google.type.CalendarPeriod.
 */
export const CalendarPeriodSchema: GenDescEnum<CalendarPeriod, CalendarPeriodJson> = /*@__PURE__*/
  enumDesc(file_google_type_calendar_period, 0);

