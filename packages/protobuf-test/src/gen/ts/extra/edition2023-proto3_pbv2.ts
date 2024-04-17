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

// @generated by protoc-gen-es-next v1.8.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/edition2023-proto3.proto (package spec, syntax proto3)
/* eslint-disable */

import type { DescFile } from "@bufbuild/protobuf";
import type { GenDescEnum, GenDescMessage } from "@bufbuild/protobuf/next/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/next/codegenv1";
import type { Message } from "@bufbuild/protobuf/next";

export const fileDesc_extra_edition2023_proto3: DescFile = /*@__PURE__*/
  fileDesc("Ch5leHRyYS9lZGl0aW9uMjAyMy1wcm90bzMucHJvdG8SBHNwZWMi3gIKG1Byb3RvM01lc3NhZ2VGb3JFZGl0aW9uMjAyMxIbChNpbXBsaWNpdF9ib29sX2ZpZWxkGAEgASgIEkAKGGltcGxpY2l0X29wZW5fZW51bV9maWVsZBgCIAEoDjIeLnNwZWMuUHJvdG8zRW51bUZvckVkaXRpb24yMDIzEiAKE2V4cGxpY2l0X2Jvb2xfZmllbGQYBSABKAhIAIgBARJFChhleHBsaWNpdF9vcGVuX2VudW1fZmllbGQYBiABKA4yHi5zcGVjLlByb3RvM0VudW1Gb3JFZGl0aW9uMjAyM0gBiAEBEh8KE3BhY2tlZF9kb3VibGVfZmllbGQYCSADKAFCAhABEiEKFXVucGFja2VkX2RvdWJsZV9maWVsZBgKIAMoAUICEABCFgoUX2V4cGxpY2l0X2Jvb2xfZmllbGRCGwoZX2V4cGxpY2l0X29wZW5fZW51bV9maWVsZCpqChhQcm90bzNFbnVtRm9yRWRpdGlvbjIwMjMSKwonUFJPVE8zX0VOVU1fRk9SX0VESVRJT04yMDIzX1VOU1BFQ0lGSUVEEAASIQodUFJPVE8zX0VOVU1fRk9SX0VESVRJT04yMDIzX0EQAWIGcHJvdG8z");

/**
 * see edition2023.proto
 *
 * @generated from message spec.Proto3MessageForEdition2023
 */
export type Proto3MessageForEdition2023 = Message<"spec.Proto3MessageForEdition2023"> & {
  /**
   * @generated from field: bool implicit_bool_field = 1;
   */
  implicitBoolField: boolean;

  /**
   * @generated from field: spec.Proto3EnumForEdition2023 implicit_open_enum_field = 2;
   */
  implicitOpenEnumField: Proto3EnumForEdition2023;

  /**
   * @generated from field: optional bool explicit_bool_field = 5;
   */
  explicitBoolField?: boolean;

  /**
   * @generated from field: optional spec.Proto3EnumForEdition2023 explicit_open_enum_field = 6;
   */
  explicitOpenEnumField?: Proto3EnumForEdition2023;

  /**
   * @generated from field: repeated double packed_double_field = 9 [packed = true];
   */
  packedDoubleField: number[];

  /**
   * @generated from field: repeated double unpacked_double_field = 10 [packed = false];
   */
  unpackedDoubleField: number[];
};

// Describes the message spec.Proto3MessageForEdition2023.
// Use `create(Proto3MessageForEdition2023Desc)` to create a new Proto3MessageForEdition2023.
export const Proto3MessageForEdition2023Desc: GenDescMessage<Proto3MessageForEdition2023> = /*@__PURE__*/
  messageDesc(fileDesc_extra_edition2023_proto3, 0);

/**
 * @generated from enum spec.Proto3EnumForEdition2023
 */
export enum Proto3EnumForEdition2023 {
  /**
   * @generated from enum value: PROTO3_ENUM_FOR_EDITION2023_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: PROTO3_ENUM_FOR_EDITION2023_A = 1;
   */
  A = 1,
}

// Describes the enum spec.Proto3EnumForEdition2023.
export const Proto3EnumForEdition2023Desc: GenDescEnum<Proto3EnumForEdition2023> = /*@__PURE__*/
  enumDesc(fileDesc_extra_edition2023_proto3, 0);
