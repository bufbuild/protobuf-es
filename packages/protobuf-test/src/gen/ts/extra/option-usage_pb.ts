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

// @generated by protoc-gen-es v2.0.0-alpha.2 with parameter "ts_nocheck=false,target=ts,import_extension=.js"
// @generated from file extra/option-usage.proto (package spec, syntax proto3)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage, GenDescService } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import { fileDesc_extra_options } from "./options_pb.js";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/option-usage.proto.
 */
export const fileDesc_extra_option_usage: GenDescFile = /*@__PURE__*/
  fileDesc("ChhleHRyYS9vcHRpb24tdXNhZ2UucHJvdG8SBHNwZWMimAIKEk1lc3NhZ2VXaXRoT3B0aW9ucxJTCgVmaWVsZBgBIAEoBUJE6qkiHmZpZWxkIG9wdGlvbiByZXRlbnRpb24gdW5rbm93bvKpIh5maWVsZCBvcHRpb24gcmV0ZW50aW9uIHJ1bnRpbWUSFQoLb25lb2ZfZmllbGQYAiABKAVIADpIyqMiIG1lc3NhZ2Ugb3B0aW9uIHJldGVudGlvbiB1bmtub3du0qMiIG1lc3NhZ2Ugb3B0aW9uIHJldGVudGlvbiBydW50aW1lQkwKBGtpbmQSRIqwIh5vbmVvZiBvcHRpb24gcmV0ZW50aW9uIHVua25vd26SsCIeb25lb2Ygb3B0aW9uIHJldGVudGlvbiBydW50aW1lKsgBCg9FbnVtV2l0aE9wdGlvbnMScQodRU5VTV9XSVRIX09QVElPTlNfVU5TUEVDSUZJRUQQABpOyrwiI2VudW0gdmFsdWUgb3B0aW9uIHJldGVudGlvbiB1bmtub3du0rwiI2VudW0gdmFsdWUgb3B0aW9uIHJldGVudGlvbiBydW50aW1lGkKqtiIdZW51bSBvcHRpb24gcmV0ZW50aW9uIHVua25vd26ytiIdZW51bSBvcHRpb24gcmV0ZW50aW9uIHJ1bnRpbWUy4gEKElNlcnZpY2VXaXRoT3B0aW9ucxKBAQoDRm9vEhguc3BlYy5NZXNzYWdlV2l0aE9wdGlvbnMaGC5zcGVjLk1lc3NhZ2VXaXRoT3B0aW9ucyJGiskiH21ldGhvZCBvcHRpb24gcmV0ZW50aW9uIHVua25vd26SySIfbWV0aG9kIG9wdGlvbiByZXRlbnRpb24gcnVudGltZRpI6sIiIHNlcnZpY2Ugb3B0aW9uIHJldGVudGlvbiB1bmtub3du8sIiIHNlcnZpY2Ugb3B0aW9uIHJldGVudGlvbiBydW50aW1lQkKqnSIdZmlsZSBvcHRpb24gcmV0ZW50aW9uIHVua25vd26ynSIdZmlsZSBvcHRpb24gcmV0ZW50aW9uIHJ1bnRpbWViBnByb3RvMw", [fileDesc_extra_options]);

/**
 * @generated from message spec.MessageWithOptions
 */
export type MessageWithOptions = Message<"spec.MessageWithOptions"> & {
  /**
   * @generated from field: int32 field = 1;
   */
  field: number;

  /**
   * @generated from oneof spec.MessageWithOptions.kind
   */
  kind: {
    /**
     * @generated from field: int32 oneof_field = 2;
     */
    value: number;
    case: "oneofField";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message spec.MessageWithOptions.
 * Use `create(MessageWithOptionsDesc)` to create a new message.
 */
export const MessageWithOptionsDesc: GenDescMessage<MessageWithOptions> = /*@__PURE__*/
  messageDesc(fileDesc_extra_option_usage, 0);

/**
 * @generated from enum spec.EnumWithOptions
 */
export enum EnumWithOptions {
  /**
   * @generated from enum value: ENUM_WITH_OPTIONS_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,
}

/**
 * Describes the enum spec.EnumWithOptions.
 */
export const EnumWithOptionsDesc: GenDescEnum<EnumWithOptions> = /*@__PURE__*/
  enumDesc(fileDesc_extra_option_usage, 0);

/**
 * @generated from service spec.ServiceWithOptions
 */
export const ServiceWithOptions: GenDescService<{
  /**
   * @generated from rpc spec.ServiceWithOptions.Foo
   */
  foo: {
    methodKind: "unary";
    input: typeof MessageWithOptionsDesc;
    output: typeof MessageWithOptionsDesc;
  },
}
> = /*@__PURE__*/
  serviceDesc(fileDesc_extra_option_usage, 0);

