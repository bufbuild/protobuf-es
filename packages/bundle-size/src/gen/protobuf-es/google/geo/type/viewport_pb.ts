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

// @generated by protoc-gen-es v1.9.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/geo/type/viewport.proto (package google.geo.type, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { LatLng } from "../../type/latlng_pb.js";

/**
 * A latitude-longitude viewport, represented as two diagonally opposite `low`
 * and `high` points. A viewport is considered a closed region, i.e. it includes
 * its boundary. The latitude bounds must range between -90 to 90 degrees
 * inclusive, and the longitude bounds must range between -180 to 180 degrees
 * inclusive. Various cases include:
 *
 *  - If `low` = `high`, the viewport consists of that single point.
 *
 *  - If `low.longitude` > `high.longitude`, the longitude range is inverted
 *    (the viewport crosses the 180 degree longitude line).
 *
 *  - If `low.longitude` = -180 degrees and `high.longitude` = 180 degrees,
 *    the viewport includes all longitudes.
 *
 *  - If `low.longitude` = 180 degrees and `high.longitude` = -180 degrees,
 *    the longitude range is empty.
 *
 *  - If `low.latitude` > `high.latitude`, the latitude range is empty.
 *
 * Both `low` and `high` must be populated, and the represented box cannot be
 * empty (as specified by the definitions above). An empty viewport will result
 * in an error.
 *
 * For example, this viewport fully encloses New York City:
 *
 * {
 *     "low": {
 *         "latitude": 40.477398,
 *         "longitude": -74.259087
 *     },
 *     "high": {
 *         "latitude": 40.91618,
 *         "longitude": -73.70018
 *     }
 * }
 *
 * @generated from message google.geo.type.Viewport
 */
export class Viewport extends Message<Viewport> {
  /**
   * Required. The low point of the viewport.
   *
   * @generated from field: google.type.LatLng low = 1;
   */
  low?: LatLng;

  /**
   * Required. The high point of the viewport.
   *
   * @generated from field: google.type.LatLng high = 2;
   */
  high?: LatLng;

  constructor(data?: PartialMessage<Viewport>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "google.geo.type.Viewport";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "low", kind: "message", T: LatLng },
    { no: 2, name: "high", kind: "message", T: LatLng },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Viewport {
    return new Viewport().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Viewport {
    return new Viewport().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Viewport {
    return new Viewport().fromJsonString(jsonString, options);
  }

  static equals(a: Viewport | PlainMessage<Viewport> | undefined, b: Viewport | PlainMessage<Viewport> | undefined): boolean {
    return proto3.util.equals(Viewport, a, b);
  }
}

