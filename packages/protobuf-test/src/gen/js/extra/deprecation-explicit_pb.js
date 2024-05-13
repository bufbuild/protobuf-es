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

// @generated by protoc-gen-es v2.0.0-alpha.2 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file extra/deprecation-explicit.proto (package spec, syntax proto3)
/* eslint-disable */

import { enumDesc, extDesc, fileDesc, messageDesc, serviceDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { fileDesc_google_protobuf_descriptor, fileDesc_google_protobuf_empty } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/deprecation-explicit.proto.
 */
export const fileDesc_extra_deprecation_explicit = /*@__PURE__*/
  fileDesc("CiBleHRyYS9kZXByZWNhdGlvbi1leHBsaWNpdC5wcm90bxIEc3BlYyImChFEZXByZWNhdGVkTWVzc2FnZRINCgVmaWVsZBgBIAEoCToCGAEiTQoWRGVwcmVjYXRlZEZpZWxkTWVzc2FnZRIcChBkZXByZWNhdGVkX2ZpZWxkGAEgASgJQgIYARIVCg1jdXJyZW50X2ZpZWxkGAIgASgJKkIKDkRlcHJlY2F0ZWRFbnVtEhUKEURFUFJFQ0FURURfRU5VTV9BEAASFQoRREVQUkVDQVRFRF9FTlVNX0IQARoCGAEqbAoTRGVwcmVjYXRlZFZhbHVlRW51bRIlCiFERVBSRUNBVEVEX1ZBTFVFX0VOVU1fVU5TUEVDSUZJRUQQABIuCiZERVBSRUNBVEVEX1ZBTFVFX0VOVU1fREVQUkVDQVRFRF9WQUxVRRABGgIIATJWChFEZXByZWNhdGVkU2VydmljZRI8CgpEZXByZWNhdGVkEhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5GhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5GgOIAgEymgEKFERlcHJlY2F0ZWRScGNTZXJ2aWNlEkEKCkRlcHJlY2F0ZWQSFi5nb29nbGUucHJvdG9idWYuRW1wdHkaFi5nb29nbGUucHJvdG9idWYuRW1wdHkiA4gCARI/Cg1Ob3REZXByZWNhdGVkEhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5GhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5OmQKHGV4cGxpY2l0bHlfZGVwcmVjYXRlZF9vcHRpb24SHS5nb29nbGUucHJvdG9idWYuRmllbGRPcHRpb25zGNEPIAEoBUICGAFSGmV4cGxpY2l0bHlEZXByZWNhdGVkT3B0aW9uYgZwcm90bzM", [fileDesc_google_protobuf_empty, fileDesc_google_protobuf_descriptor]);

/**
 * Describes the message spec.DeprecatedMessage.
 * Use `create(DeprecatedMessageDesc)` to create a new message.
 * @deprecated
 */
export const DeprecatedMessageDesc = /*@__PURE__*/
  messageDesc(fileDesc_extra_deprecation_explicit, 0);

/**
 * Describes the message spec.DeprecatedFieldMessage.
 * Use `create(DeprecatedFieldMessageDesc)` to create a new message.
 */
export const DeprecatedFieldMessageDesc = /*@__PURE__*/
  messageDesc(fileDesc_extra_deprecation_explicit, 1);

/**
 * Describes the enum spec.DeprecatedEnum.
 * @deprecated
 */
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

/**
 * Describes the enum spec.DeprecatedValueEnum.
 */
export const DeprecatedValueEnumDesc = /*@__PURE__*/
  enumDesc(fileDesc_extra_deprecation_explicit, 1);

/**
 * Only a single enum value is deprecated
 *
 * @generated from enum spec.DeprecatedValueEnum
 */
export const DeprecatedValueEnum = /*@__PURE__*/
  tsEnum(DeprecatedValueEnumDesc);

/**
 * The entire service is deprecated
 *
 * @generated from service spec.DeprecatedService
 * @deprecated
 */
export const DeprecatedService = /*@__PURE__*/
  serviceDesc(fileDesc_extra_deprecation_explicit, 0);

/**
 * A single RPC of this service is deprecated
 *
 * @generated from service spec.DeprecatedRpcService
 */
export const DeprecatedRpcService = /*@__PURE__*/
  serviceDesc(fileDesc_extra_deprecation_explicit, 1);

/**
 * This extension is deprecated
 *
 * @generated from extension: int32 explicitly_deprecated_option = 2001 [deprecated = true];
 * @deprecated
 */
export const explicitly_deprecated_option = /*@__PURE__*/
  extDesc(fileDesc_extra_deprecation_explicit, 0);

