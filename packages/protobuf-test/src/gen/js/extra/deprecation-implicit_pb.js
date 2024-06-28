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

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "target=js+dts,import_extension=js"
// @generated from file extra/deprecation-implicit.proto (package spec, syntax proto3)
/* eslint-disable */

import { enumDesc, extDesc, fileDesc, messageDesc, serviceDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_descriptor, file_google_protobuf_empty } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/deprecation-implicit.proto.
 * @deprecated
 */
export const file_extra_deprecation_implicit = /*@__PURE__*/
  fileDesc("CiBleHRyYS9kZXByZWNhdGlvbi1pbXBsaWNpdC5wcm90bxIEc3BlYyJCChtJbXBsaWNpdGx5RGVwcmVjYXRlZE1lc3NhZ2USIwobaW1wbGljaXRseV9kZXByZWNhdGVkX2ZpZWxkGAEgASgJKkYKGEltcGxpY2l0bHlEZXByZWNhdGVkRW51bRIqCiZJTVBMSUNJVExZX0RFUFJFQ0FURURfRU5VTV9VTlNQRUNJRklFRBAAMmgKG0ltcGxpY2l0bHlEZXByZWNhdGVkU2VydmljZRJJChdJbXBsaWNpdGx5RGVwcmVjYXRlZFJwYxIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eRoWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eTpgChxpbXBsaWNpdGx5X2RlcHJlY2F0ZWRfb3B0aW9uEh0uZ29vZ2xlLnByb3RvYnVmLkZpZWxkT3B0aW9ucxjSDyABKAVSGmltcGxpY2l0bHlEZXByZWNhdGVkT3B0aW9uQgO4AQFiBnByb3RvMw", [file_google_protobuf_empty, file_google_protobuf_descriptor]);

/**
 * Describes the message spec.ImplicitlyDeprecatedMessage.
 * Use `create(ImplicitlyDeprecatedMessageSchema)` to create a new message.
 * @deprecated
 */
export const ImplicitlyDeprecatedMessageSchema = /*@__PURE__*/
  messageDesc(file_extra_deprecation_implicit, 0);

/**
 * Describes the enum spec.ImplicitlyDeprecatedEnum.
 * @deprecated
 */
export const ImplicitlyDeprecatedEnumSchema = /*@__PURE__*/
  enumDesc(file_extra_deprecation_implicit, 0);

/**
 * @generated from enum spec.ImplicitlyDeprecatedEnum
 * @deprecated
 */
export const ImplicitlyDeprecatedEnum = /*@__PURE__*/
  tsEnum(ImplicitlyDeprecatedEnumSchema);

/**
 * @generated from service spec.ImplicitlyDeprecatedService
 * @deprecated
 */
export const ImplicitlyDeprecatedService = /*@__PURE__*/
  serviceDesc(file_extra_deprecation_implicit, 0);

/**
 * @generated from extension: int32 implicitly_deprecated_option = 2002;
 * @deprecated
 */
export const implicitly_deprecated_option = /*@__PURE__*/
  extDesc(file_extra_deprecation_implicit, 0);

