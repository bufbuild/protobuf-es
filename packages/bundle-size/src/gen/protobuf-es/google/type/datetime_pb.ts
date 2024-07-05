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

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "target=ts"
// @generated from file google/type/datetime.proto (package google.type, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Duration } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_duration } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/type/datetime.proto.
 */
export const file_google_type_datetime: GenFile = /*@__PURE__*/
  fileDesc("Chpnb29nbGUvdHlwZS9kYXRldGltZS5wcm90bxILZ29vZ2xlLnR5cGUi4AEKCERhdGVUaW1lEgwKBHllYXIYASABKAUSDQoFbW9udGgYAiABKAUSCwoDZGF5GAMgASgFEg0KBWhvdXJzGAQgASgFEg8KB21pbnV0ZXMYBSABKAUSDwoHc2Vjb25kcxgGIAEoBRINCgVuYW5vcxgHIAEoBRIvCgp1dGNfb2Zmc2V0GAggASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uSAASKgoJdGltZV96b25lGAkgASgLMhUuZ29vZ2xlLnR5cGUuVGltZVpvbmVIAEINCgt0aW1lX29mZnNldCInCghUaW1lWm9uZRIKCgJpZBgBIAEoCRIPCgd2ZXJzaW9uGAIgASgJQmkKD2NvbS5nb29nbGUudHlwZUINRGF0ZVRpbWVQcm90b1ABWjxnb29nbGUuZ29sYW5nLm9yZy9nZW5wcm90by9nb29nbGVhcGlzL3R5cGUvZGF0ZXRpbWU7ZGF0ZXRpbWX4AQGiAgNHVFBiBnByb3RvMw", [file_google_protobuf_duration]);

/**
 * Represents civil time (or occasionally physical time).
 *
 * This type can represent a civil time in one of a few possible ways:
 *
 *  * When utc_offset is set and time_zone is unset: a civil time on a calendar
 *    day with a particular offset from UTC.
 *  * When time_zone is set and utc_offset is unset: a civil time on a calendar
 *    day in a particular time zone.
 *  * When neither time_zone nor utc_offset is set: a civil time on a calendar
 *    day in local time.
 *
 * The date is relative to the Proleptic Gregorian Calendar.
 *
 * If year is 0, the DateTime is considered not to have a specific year. month
 * and day must have valid, non-zero values.
 *
 * This type may also be used to represent a physical time if all the date and
 * time fields are set and either case of the `time_offset` oneof is set.
 * Consider using `Timestamp` message for physical time instead. If your use
 * case also would like to store the user's timezone, that can be done in
 * another field.
 *
 * This type is more flexible than some applications may want. Make sure to
 * document and validate your application's limitations.
 *
 * @generated from message google.type.DateTime
 */
export type DateTime = Message<"google.type.DateTime"> & {
  /**
   * Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a
   * datetime without a year.
   *
   * @generated from field: int32 year = 1;
   */
  year: number;

  /**
   * Required. Month of year. Must be from 1 to 12.
   *
   * @generated from field: int32 month = 2;
   */
  month: number;

  /**
   * Required. Day of month. Must be from 1 to 31 and valid for the year and
   * month.
   *
   * @generated from field: int32 day = 3;
   */
  day: number;

  /**
   * Required. Hours of day in 24 hour format. Should be from 0 to 23. An API
   * may choose to allow the value "24:00:00" for scenarios like business
   * closing time.
   *
   * @generated from field: int32 hours = 4;
   */
  hours: number;

  /**
   * Required. Minutes of hour of day. Must be from 0 to 59.
   *
   * @generated from field: int32 minutes = 5;
   */
  minutes: number;

  /**
   * Required. Seconds of minutes of the time. Must normally be from 0 to 59. An
   * API may allow the value 60 if it allows leap-seconds.
   *
   * @generated from field: int32 seconds = 6;
   */
  seconds: number;

  /**
   * Required. Fractions of seconds in nanoseconds. Must be from 0 to
   * 999,999,999.
   *
   * @generated from field: int32 nanos = 7;
   */
  nanos: number;

  /**
   * Optional. Specifies either the UTC offset or the time zone of the DateTime.
   * Choose carefully between them, considering that time zone data may change
   * in the future (for example, a country modifies their DST start/end dates,
   * and future DateTimes in the affected range had already been stored).
   * If omitted, the DateTime is considered to be in local time.
   *
   * @generated from oneof google.type.DateTime.time_offset
   */
  timeOffset: {
    /**
     * UTC offset. Must be whole seconds, between -18 hours and +18 hours.
     * For example, a UTC offset of -4:00 would be represented as
     * { seconds: -14400 }.
     *
     * @generated from field: google.protobuf.Duration utc_offset = 8;
     */
    value: Duration;
    case: "utcOffset";
  } | {
    /**
     * Time zone.
     *
     * @generated from field: google.type.TimeZone time_zone = 9;
     */
    value: TimeZone;
    case: "timeZone";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message google.type.DateTime.
 * Use `create(DateTimeSchema)` to create a new message.
 */
export const DateTimeSchema: GenMessage<DateTime> = /*@__PURE__*/
  messageDesc(file_google_type_datetime, 0);

/**
 * Represents a time zone from the
 * [IANA Time Zone Database](https://www.iana.org/time-zones).
 *
 * @generated from message google.type.TimeZone
 */
export type TimeZone = Message<"google.type.TimeZone"> & {
  /**
   * IANA Time Zone Database time zone, e.g. "America/New_York".
   *
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * Optional. IANA Time Zone Database version number, e.g. "2019a".
   *
   * @generated from field: string version = 2;
   */
  version: string;
};

/**
 * Describes the message google.type.TimeZone.
 * Use `create(TimeZoneSchema)` to create a new message.
 */
export const TimeZoneSchema: GenMessage<TimeZone> = /*@__PURE__*/
  messageDesc(file_google_type_datetime, 1);

