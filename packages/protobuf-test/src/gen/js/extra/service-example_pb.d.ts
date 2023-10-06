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

// @generated by protoc-gen-es v1.3.3 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/service-example.proto (package spec, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum spec.FailRequest
 */
export declare enum FailRequest {
  /**
   * don't fail
   *
   * @generated from enum value: FAIL_REQUEST_NONE = 0;
   */
  FAIL_REQUEST_NONE = 0,

  /**
   * send an error status trailer after sending a message
   *
   * @generated from enum value: MESSAGE_THEN_ERROR_STATUS = 1;
   */
  MESSAGE_THEN_ERROR_STATUS = 1,

  /**
   * send an error status, don't send any message
   *
   * @generated from enum value: ERROR_STATUS_ONLY = 2;
   */
  ERROR_STATUS_ONLY = 2,
}

/**
 * @generated from message spec.ExampleRequest
 */
export declare class ExampleRequest extends Message<ExampleRequest> {
  /**
   * any text
   *
   * @generated from field: string question = 1;
   */
  question: string;

  /**
   * the server should simulate an error in the requested way 
   *
   * @generated from field: spec.FailRequest please_fail = 2;
   */
  pleaseFail: FailRequest;

  /**
   * the server should delay it's response for this amount of milliseconds
   *
   * @generated from field: int32 please_delay_response_ms = 3;
   */
  pleaseDelayResponseMs: number;

  /**
   * by default, the server always writes some custom response headers
   *
   * @generated from field: bool disable_sending_example_response_headers = 4;
   */
  disableSendingExampleResponseHeaders: boolean;

  constructor(data?: PartialMessage<ExampleRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.ExampleRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExampleRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExampleRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExampleRequest;

  static equals(a: ExampleRequest | PlainMessage<ExampleRequest> | undefined, b: ExampleRequest | PlainMessage<ExampleRequest> | undefined): boolean;
}

/**
 * @generated from message spec.ExampleResponse
 */
export declare class ExampleResponse extends Message<ExampleResponse> {
  /**
   * any text
   *
   * @generated from field: string answer = 1;
   */
  answer: string;

  /**
   * contains the request headers that the server received
   *
   * @generated from field: map<string, string> your_request_headers = 2;
   */
  yourRequestHeaders: { [key: string]: string };

  /**
   * contains the deadline that the server received 
   *
   * @generated from field: string your_deadline = 3;
   */
  yourDeadline: string;

  /**
   * the failure requested 
   *
   * @generated from field: spec.FailRequest your_fail_request = 4;
   */
  yourFailRequest: FailRequest;

  constructor(data?: PartialMessage<ExampleResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.ExampleResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExampleResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExampleResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExampleResponse;

  static equals(a: ExampleResponse | PlainMessage<ExampleResponse> | undefined, b: ExampleResponse | PlainMessage<ExampleResponse> | undefined): boolean;
}

