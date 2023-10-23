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

// @generated by protoc-gen-es v1.3.3 with parameter "bootstrap_wkt=true,ts_nocheck=false,target=ts"
// @generated from file google/protobuf/duration.proto (package google.protobuf, syntax proto3)
/* eslint-disable */

import type { PartialMessage, PlainMessage } from "../../message.js";
import { Message } from "../../message.js";
import { protoInt64 } from "../../proto-int64.js";
import { proto3 } from "../../proto3.js";
import type { JsonReadOptions, JsonValue, JsonWriteOptions } from "../../json-format.js";
import type { FieldList } from "../../field-list.js";
import type { BinaryReadOptions } from "../../binary-format.js";

/**
 * A Duration represents a signed, fixed-length span of time represented
 * as a count of seconds and fractions of seconds at nanosecond
 * resolution. It is independent of any calendar and concepts like "day"
 * or "month". It is related to Timestamp in that the difference between
 * two Timestamp values is a Duration and it can be added or subtracted
 * from a Timestamp. Range is approximately +-10,000 years.
 *
 * # Examples
 *
 * Example 1: Compute Duration from two Timestamps in pseudo code.
 *
 *     Timestamp start = ...;
 *     Timestamp end = ...;
 *     Duration duration = ...;
 *
 *     duration.seconds = end.seconds - start.seconds;
 *     duration.nanos = end.nanos - start.nanos;
 *
 *     if (duration.seconds < 0 && duration.nanos > 0) {
 *       duration.seconds += 1;
 *       duration.nanos -= 1000000000;
 *     } else if (duration.seconds > 0 && duration.nanos < 0) {
 *       duration.seconds -= 1;
 *       duration.nanos += 1000000000;
 *     }
 *
 * Example 2: Compute Timestamp from Timestamp + Duration in pseudo code.
 *
 *     Timestamp start = ...;
 *     Duration duration = ...;
 *     Timestamp end = ...;
 *
 *     end.seconds = start.seconds + duration.seconds;
 *     end.nanos = start.nanos + duration.nanos;
 *
 *     if (end.nanos < 0) {
 *       end.seconds -= 1;
 *       end.nanos += 1000000000;
 *     } else if (end.nanos >= 1000000000) {
 *       end.seconds += 1;
 *       end.nanos -= 1000000000;
 *     }
 *
 * Example 3: Compute Duration from datetime.timedelta in Python.
 *
 *     td = datetime.timedelta(days=3, minutes=10)
 *     duration = Duration()
 *     duration.FromTimedelta(td)
 *
 * # JSON Mapping
 *
 * In JSON format, the Duration type is encoded as a string rather than an
 * object, where the string ends in the suffix "s" (indicating seconds) and
 * is preceded by the number of seconds, with nanoseconds expressed as
 * fractional seconds. For example, 3 seconds with 0 nanoseconds should be
 * encoded in JSON format as "3s", while 3 seconds and 1 nanosecond should
 * be expressed in JSON format as "3.000000001s", and 3 seconds and 1
 * microsecond should be expressed in JSON format as "3.000001s".
 *
 *
 * @generated from message google.protobuf.Duration
 */
export class Duration extends Message<Duration> {
  /**
   * Signed seconds of the span of time. Must be from -315,576,000,000
   * to +315,576,000,000 inclusive. Note: these bounds are computed from:
   * 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years
   *
   * @generated from field: int64 seconds = 1;
   */
  seconds = protoInt64.zero;

  /**
   * Signed fractions of a second at nanosecond resolution of the span
   * of time. Durations less than one second are represented with a 0
   * `seconds` field and a positive or negative `nanos` field. For durations
   * of one second or more, a non-zero value for the `nanos` field must be
   * of the same sign as the `seconds` field. Must be from -999,999,999
   * to +999,999,999 inclusive.
   *
   * @generated from field: int32 nanos = 2;
   */
  nanos = 0;

  constructor(data?: PartialMessage<Duration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  override fromJson(json: JsonValue, options?: Partial<JsonReadOptions>): this {
    if (typeof json !== "string") {
      throw new Error(`cannot decode google.protobuf.Duration from JSON: ${proto3.json.debug(json)}`);
    }
    const match = json.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
    if (match === null) {
      throw new Error(`cannot decode google.protobuf.Duration from JSON: ${proto3.json.debug(json)}`);
    }
    const longSeconds = Number(match[1]);
    if (longSeconds > 315576000000 || longSeconds < -315576000000) {
      throw new Error(`cannot decode google.protobuf.Duration from JSON: ${proto3.json.debug(json)}`);
    }
    this.seconds = protoInt64.parse(longSeconds);
    if (typeof match[2] == "string") {
      const nanosStr = match[2] + "0".repeat(9 - match[2].length);
      this.nanos = parseInt(nanosStr);
      if (longSeconds < 0 || Object.is(longSeconds, -0)) {
        this.nanos = -this.nanos;
      }
    }
    return this;
  }

  override toJson(options?: Partial<JsonWriteOptions>): JsonValue {
    if (Number(this.seconds) > 315576000000 || Number(this.seconds) < -315576000000) {
      throw new Error(`cannot encode google.protobuf.Duration to JSON: value out of range`);
    }
    let text = this.seconds.toString();
    if (this.nanos !== 0) {
      let nanosStr = Math.abs(this.nanos).toString();
      nanosStr = "0".repeat(9 - nanosStr.length) + nanosStr;
      if (nanosStr.substring(3) === "000000") {
        nanosStr = nanosStr.substring(0, 3);
      } else if (nanosStr.substring(6) === "000") {
        nanosStr = nanosStr.substring(0, 6);
      }
      text += "." + nanosStr;
      if (this.nanos < 0 && Number(this.seconds) == 0) {
          text = "-" + text;
      }
    }
    return text + "s";
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "google.protobuf.Duration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "seconds", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "nanos", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Duration {
    return new Duration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Duration {
    return new Duration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Duration {
    return new Duration().fromJsonString(jsonString, options);
  }

  static equals(a: Duration | PlainMessage<Duration> | undefined, b: Duration | PlainMessage<Duration> | undefined): boolean {
    return proto3.util.equals(Duration, a, b);
  }
}

