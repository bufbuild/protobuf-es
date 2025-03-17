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

// Author: kenton@google.com (Kenton Varda)

// @generated by protoc-gen-es v2.2.4 with parameter "target=ts,import_extension=js"
// @generated from file google/protobuf/unittest_no_generic_services.proto (package proto2_unittest.no_generic_services_test, syntax proto2)
/* eslint-disable */

import type { GenEnum, GenExtension, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, extDesc, fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/unittest_no_generic_services.proto.
 */
export const file_google_protobuf_unittest_no_generic_services: GenFile = /*@__PURE__*/
  fileDesc("CjJnb29nbGUvcHJvdG9idWYvdW5pdHRlc3Rfbm9fZ2VuZXJpY19zZXJ2aWNlcy5wcm90bxIocHJvdG8yX3VuaXR0ZXN0Lm5vX2dlbmVyaWNfc2VydmljZXNfdGVzdCIjCgtUZXN0TWVzc2FnZRIJCgFhGAEgASgFKgkI6AcQgICAgAIqEwoIVGVzdEVudW0SBwoDRk9PEAEyggEKC1Rlc3RTZXJ2aWNlEnMKA0ZvbxI1LnByb3RvMl91bml0dGVzdC5ub19nZW5lcmljX3NlcnZpY2VzX3Rlc3QuVGVzdE1lc3NhZ2UaNS5wcm90bzJfdW5pdHRlc3Qubm9fZ2VuZXJpY19zZXJ2aWNlc190ZXN0LlRlc3RNZXNzYWdlOl0KDnRlc3RfZXh0ZW5zaW9uEjUucHJvdG8yX3VuaXR0ZXN0Lm5vX2dlbmVyaWNfc2VydmljZXNfdGVzdC5UZXN0TWVzc2FnZRjoByABKAVSDXRlc3RFeHRlbnNpb24");

/**
 * @generated from message proto2_unittest.no_generic_services_test.TestMessage
 */
export type TestMessage = Message<"proto2_unittest.no_generic_services_test.TestMessage"> & {
  /**
   * @generated from field: optional int32 a = 1;
   */
  a: number;
};

/**
 * Describes the message proto2_unittest.no_generic_services_test.TestMessage.
 * Use `create(TestMessageSchema)` to create a new message.
 */
export const TestMessageSchema: GenMessage<TestMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_no_generic_services, 0);

/**
 * @generated from enum proto2_unittest.no_generic_services_test.TestEnum
 */
export enum TestEnum {
  /**
   * @generated from enum value: FOO = 1;
   */
  FOO = 1,
}

/**
 * Describes the enum proto2_unittest.no_generic_services_test.TestEnum.
 */
export const TestEnumSchema: GenEnum<TestEnum> = /*@__PURE__*/
  enumDesc(file_google_protobuf_unittest_no_generic_services, 0);

/**
 * @generated from service proto2_unittest.no_generic_services_test.TestService
 */
export const TestService: GenService<{
  /**
   * @generated from rpc proto2_unittest.no_generic_services_test.TestService.Foo
   */
  foo: {
    methodKind: "unary";
    input: typeof TestMessageSchema;
    output: typeof TestMessageSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_google_protobuf_unittest_no_generic_services, 0);

/**
 * @generated from extension: optional int32 test_extension = 1000;
 */
export const test_extension: GenExtension<TestMessage, number> = /*@__PURE__*/
  extDesc(file_google_protobuf_unittest_no_generic_services, 0);

