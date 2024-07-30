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

// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file google/geo/type/viewport.proto (package google.geo.type, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { LatLng } from "../../type/latlng_pb";
import { file_google_type_latlng } from "../../type/latlng_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/geo/type/viewport.proto.
 */
export const file_google_geo_type_viewport: GenFile = /*@__PURE__*/
  fileDesc("Ch5nb29nbGUvZ2VvL3R5cGUvdmlld3BvcnQucHJvdG8SD2dvb2dsZS5nZW8udHlwZSJPCghWaWV3cG9ydBIgCgNsb3cYASABKAsyEy5nb29nbGUudHlwZS5MYXRMbmcSIQoEaGlnaBgCIAEoCzITLmdvb2dsZS50eXBlLkxhdExuZ0JvChNjb20uZ29vZ2xlLmdlby50eXBlQg1WaWV3cG9ydFByb3RvUAFaQGdvb2dsZS5nb2xhbmcub3JnL2dlbnByb3RvL2dvb2dsZWFwaXMvZ2VvL3R5cGUvdmlld3BvcnQ7dmlld3BvcnSiAgRHR1RQYgZwcm90bzM", [file_google_type_latlng]);

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
export type Viewport = Message<"google.geo.type.Viewport"> & {
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
};

/**
 * Describes the message google.geo.type.Viewport.
 * Use `create(ViewportSchema)` to create a new message.
 */
export const ViewportSchema: GenMessage<Viewport> = /*@__PURE__*/
  messageDesc(file_google_geo_type_viewport, 0);

