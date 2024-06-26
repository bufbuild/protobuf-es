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

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "ts_nocheck=false,target=ts,import_extension=.js"
// @generated from file extra/edition2023-proto2.proto (package spec, syntax proto2)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/edition2023-proto2.proto.
 */
export const file_extra_edition2023_proto2: GenDescFile = /*@__PURE__*/
  fileDesc("Ch5leHRyYS9lZGl0aW9uMjAyMy1wcm90bzIucHJvdG8SBHNwZWMi5gQKG1Byb3RvMk1lc3NhZ2VGb3JFZGl0aW9uMjAyMxIbChNvcHRpb25hbF9ib29sX2ZpZWxkGAEgASgIEkIKGm9wdGlvbmFsX2Nsb3NlZF9lbnVtX2ZpZWxkGAIgASgOMh4uc3BlYy5Qcm90bzJFbnVtRm9yRWRpdGlvbjIwMjMSLAoib3B0aW9uYWxfc3RyaW5nX2ZpZWxkX3dpdGhfZGVmYXVsdBgDIAEoCToAEkYKDW9wdGlvbmFsZ3JvdXAYBCABKAoyLy5zcGVjLlByb3RvMk1lc3NhZ2VGb3JFZGl0aW9uMjAyMy5PcHRpb25hbEdyb3VwEhsKE3JlcXVpcmVkX2Jvb2xfZmllbGQYBSACKAgSQgoacmVxdWlyZWRfY2xvc2VkX2VudW1fZmllbGQYBiACKA4yHi5zcGVjLlByb3RvMkVudW1Gb3JFZGl0aW9uMjAyMxI3CiJyZXF1aXJlZF9zdHJpbmdfZmllbGRfd2l0aF9kZWZhdWx0GAcgAigJOgtoZWxsbyAiICovIBJGCg1yZXF1aXJlZGdyb3VwGAggAigKMi8uc3BlYy5Qcm90bzJNZXNzYWdlRm9yRWRpdGlvbjIwMjMuUmVxdWlyZWRHcm91cBIfChNwYWNrZWRfZG91YmxlX2ZpZWxkGAkgAygBQgIQARIhChV1bnBhY2tlZF9kb3VibGVfZmllbGQYCiADKAFCAhAAGiQKDU9wdGlvbmFsR3JvdXASEwoLaW50MzJfZmllbGQYASABKAUaJAoNUmVxdWlyZWRHcm91cBITCgtpbnQzMl9maWVsZBgBIAEoBSo9ChhQcm90bzJFbnVtRm9yRWRpdGlvbjIwMjMSIQodUFJPVE8yX0VOVU1fRk9SX0VESVRJT04yMDIzX0EQAQ");

/**
 * see edition2023.proto
 *
 * @generated from message spec.Proto2MessageForEdition2023
 */
export type Proto2MessageForEdition2023 = Message<"spec.Proto2MessageForEdition2023"> & {
  /**
   * @generated from field: optional bool optional_bool_field = 1;
   */
  optionalBoolField: boolean;

  /**
   * @generated from field: optional spec.Proto2EnumForEdition2023 optional_closed_enum_field = 2;
   */
  optionalClosedEnumField: Proto2EnumForEdition2023;

  /**
   * @generated from field: optional string optional_string_field_with_default = 3 [default = ""];
   */
  optionalStringFieldWithDefault: string;

  /**
   * @generated from field: optional spec.Proto2MessageForEdition2023.OptionalGroup optionalgroup = 4;
   */
  optionalgroup?: Proto2MessageForEdition2023_OptionalGroup;

  /**
   * @generated from field: required bool required_bool_field = 5;
   */
  requiredBoolField: boolean;

  /**
   * @generated from field: required spec.Proto2EnumForEdition2023 required_closed_enum_field = 6;
   */
  requiredClosedEnumField: Proto2EnumForEdition2023;

  /**
   * @generated from field: required string required_string_field_with_default = 7 [default = "hello \" *\/ "];
   */
  requiredStringFieldWithDefault: string;

  /**
   * @generated from field: required spec.Proto2MessageForEdition2023.RequiredGroup requiredgroup = 8;
   */
  requiredgroup?: Proto2MessageForEdition2023_RequiredGroup;

  /**
   * @generated from field: repeated double packed_double_field = 9 [packed = true];
   */
  packedDoubleField: number[];

  /**
   * @generated from field: repeated double unpacked_double_field = 10 [packed = false];
   */
  unpackedDoubleField: number[];
};

/**
 * Describes the message spec.Proto2MessageForEdition2023.
 * Use `create(Proto2MessageForEdition2023Schema)` to create a new message.
 */
export const Proto2MessageForEdition2023Schema: GenDescMessage<Proto2MessageForEdition2023> = /*@__PURE__*/
  messageDesc(file_extra_edition2023_proto2, 0);

/**
 * @generated from message spec.Proto2MessageForEdition2023.OptionalGroup
 */
export type Proto2MessageForEdition2023_OptionalGroup = Message<"spec.Proto2MessageForEdition2023.OptionalGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * Describes the message spec.Proto2MessageForEdition2023.OptionalGroup.
 * Use `create(Proto2MessageForEdition2023_OptionalGroupSchema)` to create a new message.
 */
export const Proto2MessageForEdition2023_OptionalGroupSchema: GenDescMessage<Proto2MessageForEdition2023_OptionalGroup> = /*@__PURE__*/
  messageDesc(file_extra_edition2023_proto2, 0, 0);

/**
 * @generated from message spec.Proto2MessageForEdition2023.RequiredGroup
 */
export type Proto2MessageForEdition2023_RequiredGroup = Message<"spec.Proto2MessageForEdition2023.RequiredGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * Describes the message spec.Proto2MessageForEdition2023.RequiredGroup.
 * Use `create(Proto2MessageForEdition2023_RequiredGroupSchema)` to create a new message.
 */
export const Proto2MessageForEdition2023_RequiredGroupSchema: GenDescMessage<Proto2MessageForEdition2023_RequiredGroup> = /*@__PURE__*/
  messageDesc(file_extra_edition2023_proto2, 0, 1);

/**
 * @generated from enum spec.Proto2EnumForEdition2023
 */
export enum Proto2EnumForEdition2023 {
  /**
   * @generated from enum value: PROTO2_ENUM_FOR_EDITION2023_A = 1;
   */
  A = 1,
}

/**
 * Describes the enum spec.Proto2EnumForEdition2023.
 */
export const Proto2EnumForEdition2023Schema: GenDescEnum<Proto2EnumForEdition2023> = /*@__PURE__*/
  enumDesc(file_extra_edition2023_proto2, 0);

