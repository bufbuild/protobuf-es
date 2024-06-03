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

// Author: kenton@google.com (Kenton Varda)

// @generated by protoc-gen-es v2.0.0-alpha.2 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file google/protobuf/unittest_no_generic_services.proto (package protobuf_unittest.no_generic_services_test, syntax proto2)
/* eslint-disable */

import type { GenDescEnum, GenDescExtension, GenDescFile, GenDescMessage, GenDescService } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/unittest_no_generic_services.proto.
 */
export declare const fileDesc_google_protobuf_unittest_no_generic_services: GenDescFile;

/**
 * @generated from message protobuf_unittest.no_generic_services_test.TestMessage
 */
export declare type TestMessage = Message<"protobuf_unittest.no_generic_services_test.TestMessage"> & {
  /**
   * @generated from field: optional int32 a = 1;
   */
  a: number;
};

/**
 * Describes the message protobuf_unittest.no_generic_services_test.TestMessage.
 * Use `create(TestMessageDesc)` to create a new message.
 */
export declare const TestMessageDesc: GenDescMessage<TestMessage>;

/**
 * @generated from enum protobuf_unittest.no_generic_services_test.TestEnum
 */
export enum TestEnum {
  /**
   * @generated from enum value: FOO = 1;
   */
  FOO = 1,
}

/**
 * Describes the enum protobuf_unittest.no_generic_services_test.TestEnum.
 */
export declare const TestEnumDesc: GenDescEnum<TestEnum>;

/**
 * @generated from service protobuf_unittest.no_generic_services_test.TestService
 */
export declare const TestService: GenDescService<{
  /**
   * @generated from rpc protobuf_unittest.no_generic_services_test.TestService.Foo
   */
  foo: {
    methodKind: "unary";
    input: typeof TestMessageDesc;
    output: typeof TestMessageDesc;
  },
}
>;

/**
 * @generated from extension: optional int32 test_extension = 1000;
 */
export declare const test_extension: GenDescExtension<TestMessage, number>;

