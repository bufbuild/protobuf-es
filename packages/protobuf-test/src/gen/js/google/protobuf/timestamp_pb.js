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

// @generated by protoc-gen-es v1.6.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/timestamp.proto (package google.protobuf, syntax proto3)
/* eslint-disable */

import { proto3, protoInt64 } from "@bufbuild/protobuf";

/**
 * A Timestamp represents a point in time independent of any time zone or local
 * calendar, encoded as a count of seconds and fractions of seconds at
 * nanosecond resolution. The count is relative to an epoch at UTC midnight on
 * January 1, 1970, in the proleptic Gregorian calendar which extends the
 * Gregorian calendar backwards to year one.
 *
 * All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap
 * second table is needed for interpretation, using a [24-hour linear
 * smear](https://developers.google.com/time/smear).
 *
 * The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By
 * restricting to that range, we ensure that we can convert to and from [RFC
 * 3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.
 *
 * # Examples
 *
 * Example 1: Compute Timestamp from POSIX `time()`.
 *
 *     Timestamp timestamp;
 *     timestamp.set_seconds(time(NULL));
 *     timestamp.set_nanos(0);
 *
 * Example 2: Compute Timestamp from POSIX `gettimeofday()`.
 *
 *     struct timeval tv;
 *     gettimeofday(&tv, NULL);
 *
 *     Timestamp timestamp;
 *     timestamp.set_seconds(tv.tv_sec);
 *     timestamp.set_nanos(tv.tv_usec * 1000);
 *
 * Example 3: Compute Timestamp from Win32 `GetSystemTimeAsFileTime()`.
 *
 *     FILETIME ft;
 *     GetSystemTimeAsFileTime(&ft);
 *     UINT64 ticks = (((UINT64)ft.dwHighDateTime) << 32) | ft.dwLowDateTime;
 *
 *     // A Windows tick is 100 nanoseconds. Windows epoch 1601-01-01T00:00:00Z
 *     // is 11644473600 seconds before Unix epoch 1970-01-01T00:00:00Z.
 *     Timestamp timestamp;
 *     timestamp.set_seconds((INT64) ((ticks / 10000000) - 11644473600LL));
 *     timestamp.set_nanos((INT32) ((ticks % 10000000) * 100));
 *
 * Example 4: Compute Timestamp from Java `System.currentTimeMillis()`.
 *
 *     long millis = System.currentTimeMillis();
 *
 *     Timestamp timestamp = Timestamp.newBuilder().setSeconds(millis / 1000)
 *         .setNanos((int) ((millis % 1000) * 1000000)).build();
 *
 * Example 5: Compute Timestamp from Java `Instant.now()`.
 *
 *     Instant now = Instant.now();
 *
 *     Timestamp timestamp =
 *         Timestamp.newBuilder().setSeconds(now.getEpochSecond())
 *             .setNanos(now.getNano()).build();
 *
 * Example 6: Compute Timestamp from current time in Python.
 *
 *     timestamp = Timestamp()
 *     timestamp.GetCurrentTime()
 *
 * # JSON Mapping
 *
 * In JSON format, the Timestamp type is encoded as a string in the
 * [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. That is, the
 * format is "{year}-{month}-{day}T{hour}:{min}:{sec}[.{frac_sec}]Z"
 * where {year} is always expressed using four digits while {month}, {day},
 * {hour}, {min}, and {sec} are zero-padded to two digits each. The fractional
 * seconds, which can go up to 9 digits (i.e. up to 1 nanosecond resolution),
 * are optional. The "Z" suffix indicates the timezone ("UTC"); the timezone
 * is required. A proto3 JSON serializer should always use UTC (as indicated by
 * "Z") when printing the Timestamp type and a proto3 JSON parser should be
 * able to accept both UTC and other timezones (as indicated by an offset).
 *
 * For example, "2017-01-15T01:30:15.01Z" encodes 15.01 seconds past
 * 01:30 UTC on January 15, 2017.
 *
 * In JavaScript, one can convert a Date object to this format using the
 * standard
 * [toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
 * method. In Python, a standard `datetime.datetime` object can be converted
 * to this format using
 * [`strftime`](https://docs.python.org/2/library/time.html#time.strftime) with
 * the time format spec '%Y-%m-%dT%H:%M:%S.%fZ'. Likewise, in Java, one can use
 * the Joda Time's [`ISODateTimeFormat.dateTime()`](
 * http://joda-time.sourceforge.net/apidocs/org/joda/time/format/ISODateTimeFormat.html#dateTime()
 * ) to obtain a formatter capable of generating timestamps in this format.
 *
 *
 * @generated from message google.protobuf.Timestamp
 */
export const Timestamp = proto3.makeMessageType(
  "google.protobuf.Timestamp",
  () => [
    { no: 1, name: "seconds", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "nanos", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

Timestamp.prototype.fromJson = function fromJson(json, options) {
  if (typeof json !== "string") {
    throw new Error(`cannot decode google.protobuf.Timestamp from JSON: ${proto3.json.debug(json)}`);
  }
  const matches = json.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
  if (!matches) {
    throw new Error(`cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string`);
  }
  const ms = Date.parse(matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"));
  if (Number.isNaN(ms)) {
    throw new Error(`cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string`);
  }
  if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {
    throw new Error(`cannot decode message google.protobuf.Timestamp from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  }
  this.seconds = protoInt64.parse(ms / 1000);
  this.nanos = 0;
  if (matches[7]) {
    this.nanos = (parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) - 1000000000);
  }
  return this;
};

Timestamp.prototype.toJson = function toJson(options) {
  const ms = Number(this.seconds) * 1000;
  if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {
    throw new Error(`cannot encode google.protobuf.Timestamp to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  }
  if (this.nanos < 0) {
    throw new Error(`cannot encode google.protobuf.Timestamp to JSON: nanos must not be negative`);
  }
  let z = "Z";
  if (this.nanos > 0) {
    const nanosStr = (this.nanos + 1000000000).toString().substring(1);
    if (nanosStr.substring(3) === "000000") {
      z = "." + nanosStr.substring(0, 3) + "Z";
    } else if (nanosStr.substring(6) === "000") {
      z = "." + nanosStr.substring(0, 6) + "Z";
    } else {
      z = "." + nanosStr + "Z";
    }
  }
  return new Date(ms).toISOString().replace(".000Z", z);
};

Timestamp.prototype.toDate = function toDate() {
  return new Date(Number(this.seconds) * 1000 + Math.ceil(this.nanos / 1000000));
};

Timestamp.now = function now() {
  return Timestamp.fromDate(new Date())
};

Timestamp.fromDate = function fromDate(date) {
  const ms = date.getTime();
  return new Timestamp({
    seconds: protoInt64.parse(Math.floor(ms / 1000)),
    nanos: (ms % 1000) * 1000000,
  });
};

