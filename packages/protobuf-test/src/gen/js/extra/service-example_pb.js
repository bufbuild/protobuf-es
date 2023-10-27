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

// @generated by protoc-gen-es v1.4.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/service-example.proto (package spec, syntax proto3)
/* eslint-disable */

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum spec.FailRequest
 */
export const FailRequest = proto3.makeEnum(
  "spec.FailRequest",
  [
    {no: 0, name: "FAIL_REQUEST_NONE"},
    {no: 1, name: "MESSAGE_THEN_ERROR_STATUS"},
    {no: 2, name: "ERROR_STATUS_ONLY"},
  ],
);

/**
 * @generated from message spec.ExampleRequest
 */
export const ExampleRequest = proto3.makeMessageType(
  "spec.ExampleRequest",
  () => [
    { no: 1, name: "question", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "please_fail", kind: "enum", T: proto3.getEnumType(FailRequest) },
    { no: 3, name: "please_delay_response_ms", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "disable_sending_example_response_headers", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * @generated from message spec.ExampleResponse
 */
export const ExampleResponse = proto3.makeMessageType(
  "spec.ExampleResponse",
  () => [
    { no: 1, name: "answer", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "your_request_headers", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
    { no: 3, name: "your_deadline", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "your_fail_request", kind: "enum", T: proto3.getEnumType(FailRequest) },
  ],
);

