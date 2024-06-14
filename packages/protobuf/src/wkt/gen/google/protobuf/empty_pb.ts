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

// @generated by protoc-gen-es v2.0.0-alpha.4 with parameter "bootstrap_wkt=true,target=ts,import_extension=.js"
// @generated from file google/protobuf/empty.proto (package google.protobuf, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage } from "../../../../codegenv1/types.js";
import { fileDesc } from "../../../../codegenv1/file.js";
import type { Message } from "../../../../types.js";
import { messageDesc } from "../../../../codegenv1/message.js";

/**
 * Describes the file google/protobuf/empty.proto.
 */
export const file_google_protobuf_empty: GenDescFile = /*@__PURE__*/
  fileDesc("Chtnb29nbGUvcHJvdG9idWYvZW1wdHkucHJvdG8SD2dvb2dsZS5wcm90b2J1ZiIHCgVFbXB0eUJ9ChNjb20uZ29vZ2xlLnByb3RvYnVmQgpFbXB0eVByb3RvUAFaLmdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2VtcHR5cGL4AQGiAgNHUEKqAh5Hb29nbGUuUHJvdG9idWYuV2VsbEtub3duVHlwZXNiBnByb3RvMw");

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request
 * or the response type of an API method. For instance:
 *
 *     service Foo {
 *       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);
 *     }
 *
 *
 * @generated from message google.protobuf.Empty
 */
export type Empty = Message<"google.protobuf.Empty"> & {
};

/**
 * JSON type for the message google.protobuf.Empty.
 */
export type EmptyJson = Record<string, never>;

/**
 * Describes the message google.protobuf.Empty.
 * Use `create(EmptySchema)` to create a new message.
 */
export const EmptySchema: GenDescMessage<Empty, EmptyJson> = /*@__PURE__*/
  messageDesc(file_google_protobuf_empty, 0);

