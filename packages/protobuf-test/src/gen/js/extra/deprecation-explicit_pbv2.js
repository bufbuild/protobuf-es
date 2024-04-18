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
// @generated from file extra/deprecation-explicit.proto (package spec, syntax proto3)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";

export const fileDesc_extra_deprecation_explicit = /*@__PURE__*/
  fileDesc("CiBleHRyYS9kZXByZWNhdGlvbi1leHBsaWNpdC5wcm90bxIEc3BlYyImChFEZXByZWNhdGVkTWVzc2FnZRINCgVmaWVsZBgBIAEoCToCGAEiTQoWRGVwcmVjYXRlZEZpZWxkTWVzc2FnZRIcChBkZXByZWNhdGVkX2ZpZWxkGAEgASgJQgIYARIVCg1jdXJyZW50X2ZpZWxkGAIgASgJKkIKDkRlcHJlY2F0ZWRFbnVtEhUKEURFUFJFQ0FURURfRU5VTV9BEAASFQoRREVQUkVDQVRFRF9FTlVNX0IQARoCGAEqbAoTRGVwcmVjYXRlZFZhbHVlRW51bRIlCiFERVBSRUNBVEVEX1ZBTFVFX0VOVU1fVU5TUEVDSUZJRUQQABIuCiZERVBSRUNBVEVEX1ZBTFVFX0VOVU1fREVQUkVDQVRFRF9WQUxVRRABGgIIAWIGcHJvdG8z");

// Describes the message spec.DeprecatedMessage. Use `create(DeprecatedMessageDesc)` to create a new DeprecatedMessage.
export const DeprecatedMessageDesc = /*@__PURE__*/
  messageDesc(fileDesc_extra_deprecation_explicit, 0);

// Describes the message spec.DeprecatedFieldMessage. Use `create(DeprecatedFieldMessageDesc)` to create a new DeprecatedFieldMessage.
export const DeprecatedFieldMessageDesc = /*@__PURE__*/
  messageDesc(fileDesc_extra_deprecation_explicit, 1);

// Describes the enum spec.DeprecatedEnum.
export const DeprecatedEnumDesc = /*@__PURE__*/
  enumDesc(fileDesc_extra_deprecation_explicit, 0);

/**
 * The entire enum is deprecated
 *
 * @generated from enum spec.DeprecatedEnum
 * @deprecated
 */
export const DeprecatedEnum = /*@__PURE__*/
  tsEnum(DeprecatedEnumDesc);

// Describes the enum spec.DeprecatedValueEnum.
export const DeprecatedValueEnumDesc = /*@__PURE__*/
  enumDesc(fileDesc_extra_deprecation_explicit, 1);

/**
 * Only a single enum value is deprecated
 *
 * @generated from enum spec.DeprecatedValueEnum
 */
export const DeprecatedValueEnum = /*@__PURE__*/
  tsEnum(DeprecatedValueEnumDesc);

