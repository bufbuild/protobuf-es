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
// @generated from file google/api/httpbody.proto (package google.api, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Any } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_any } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/api/httpbody.proto.
 */
export const file_google_api_httpbody: GenFile = /*@__PURE__*/
  fileDesc("Chlnb29nbGUvYXBpL2h0dHBib2R5LnByb3RvEgpnb29nbGUuYXBpIlgKCEh0dHBCb2R5EhQKDGNvbnRlbnRfdHlwZRgBIAEoCRIMCgRkYXRhGAIgASgMEigKCmV4dGVuc2lvbnMYAyADKAsyFC5nb29nbGUucHJvdG9idWYuQW55QmgKDmNvbS5nb29nbGUuYXBpQg1IdHRwQm9keVByb3RvUAFaO2dvb2dsZS5nb2xhbmcub3JnL2dlbnByb3RvL2dvb2dsZWFwaXMvYXBpL2h0dHBib2R5O2h0dHBib2R5+AEBogIER0FQSWIGcHJvdG8z", [file_google_protobuf_any]);

/**
 * Message that represents an arbitrary HTTP body. It should only be used for
 * payload formats that can't be represented as JSON, such as raw binary or
 * an HTML page.
 *
 *
 * This message can be used both in streaming and non-streaming API methods in
 * the request as well as the response.
 *
 * It can be used as a top-level request field, which is convenient if one
 * wants to extract parameters from either the URL or HTTP template into the
 * request fields and also want access to the raw HTTP body.
 *
 * Example:
 *
 *     message GetResourceRequest {
 *       // A unique request id.
 *       string request_id = 1;
 *
 *       // The raw HTTP body is bound to this field.
 *       google.api.HttpBody http_body = 2;
 *
 *     }
 *
 *     service ResourceService {
 *       rpc GetResource(GetResourceRequest)
 *         returns (google.api.HttpBody);
 *       rpc UpdateResource(google.api.HttpBody)
 *         returns (google.protobuf.Empty);
 *
 *     }
 *
 * Example with streaming methods:
 *
 *     service CaldavService {
 *       rpc GetCalendar(stream google.api.HttpBody)
 *         returns (stream google.api.HttpBody);
 *       rpc UpdateCalendar(stream google.api.HttpBody)
 *         returns (stream google.api.HttpBody);
 *
 *     }
 *
 * Use of this type only changes how the request and response bodies are
 * handled, all other features will continue to work unchanged.
 *
 * @generated from message google.api.HttpBody
 */
export type HttpBody = Message<"google.api.HttpBody"> & {
  /**
   * The HTTP Content-Type header value specifying the content type of the body.
   *
   * @generated from field: string content_type = 1;
   */
  contentType: string;

  /**
   * The HTTP request/response body as raw binary.
   *
   * @generated from field: bytes data = 2;
   */
  data: Uint8Array;

  /**
   * Application specific response metadata. Must be set in the first response
   * for streaming APIs.
   *
   * @generated from field: repeated google.protobuf.Any extensions = 3;
   */
  extensions: Any[];
};

/**
 * Describes the message google.api.HttpBody.
 * Use `create(HttpBodySchema)` to create a new message.
 */
export const HttpBodySchema: GenMessage<HttpBody> = /*@__PURE__*/
  messageDesc(file_google_api_httpbody, 0);

