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

// @generated by protoc-gen-es v1.8.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/service-example.proto (package spec, syntax proto3)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, serviceDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";

export const fileDesc_extra_service_example = /*@__PURE__*/
  fileDesc("ChtleHRyYS9zZXJ2aWNlLWV4YW1wbGUucHJvdG8SBHNwZWMingEKDkV4YW1wbGVSZXF1ZXN0EhAKCHF1ZXN0aW9uGAEgASgJEiYKC3BsZWFzZV9mYWlsGAIgASgOMhEuc3BlYy5GYWlsUmVxdWVzdBIgChhwbGVhc2VfZGVsYXlfcmVzcG9uc2VfbXMYAyABKAUSMAooZGlzYWJsZV9zZW5kaW5nX2V4YW1wbGVfcmVzcG9uc2VfaGVhZGVycxgEIAEoCCLuAQoPRXhhbXBsZVJlc3BvbnNlEg4KBmFuc3dlchgBIAEoCRJLChR5b3VyX3JlcXVlc3RfaGVhZGVycxgCIAMoCzItLnNwZWMuRXhhbXBsZVJlc3BvbnNlLllvdXJSZXF1ZXN0SGVhZGVyc0VudHJ5EhUKDXlvdXJfZGVhZGxpbmUYAyABKAkSLAoReW91cl9mYWlsX3JlcXVlc3QYBCABKA4yES5zcGVjLkZhaWxSZXF1ZXN0GjkKF1lvdXJSZXF1ZXN0SGVhZGVyc0VudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEqWgoLRmFpbFJlcXVlc3QSFQoRRkFJTF9SRVFVRVNUX05PTkUQABIdChlNRVNTQUdFX1RIRU5fRVJST1JfU1RBVFVTEAESFQoRRVJST1JfU1RBVFVTX09OTFkQAjL9AQoORXhhbXBsZVNlcnZpY2USNAoFVW5hcnkSFC5zcGVjLkV4YW1wbGVSZXF1ZXN0GhUuc3BlYy5FeGFtcGxlUmVzcG9uc2USPQoMU2VydmVyU3RyZWFtEhQuc3BlYy5FeGFtcGxlUmVxdWVzdBoVLnNwZWMuRXhhbXBsZVJlc3BvbnNlMAESPQoMQ2xpZW50U3RyZWFtEhQuc3BlYy5FeGFtcGxlUmVxdWVzdBoVLnNwZWMuRXhhbXBsZVJlc3BvbnNlKAESNwoEQmlkaRIULnNwZWMuRXhhbXBsZVJlcXVlc3QaFS5zcGVjLkV4YW1wbGVSZXNwb25zZSgBMAFCA7gBAWIGcHJvdG8z");

// Describes the message spec.ExampleRequest. Use `create(ExampleRequestDesc)` to create a new ExampleRequest.
export const ExampleRequestDesc = /*@__PURE__*/
  messageDesc(fileDesc_extra_service_example, 0);

// Describes the message spec.ExampleResponse. Use `create(ExampleResponseDesc)` to create a new ExampleResponse.
export const ExampleResponseDesc = /*@__PURE__*/
  messageDesc(fileDesc_extra_service_example, 1);

// Describes the enum spec.FailRequest.
export const FailRequestDesc = /*@__PURE__*/
  enumDesc(fileDesc_extra_service_example, 0);

/**
 * @generated from enum spec.FailRequest
 * @deprecated
 */
export const FailRequest = /*@__PURE__*/
  tsEnum(FailRequestDesc);

/**
 * @generated from service spec.ExampleService
 * @deprecated
 */
export const ExampleService = /*@__PURE__*/
  serviceDesc(fileDesc_extra_service_example, 0);

