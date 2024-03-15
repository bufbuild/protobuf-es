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
// @generated from file extra/enum.proto (package spec, syntax proto3)
/* eslint-disable */

import type { DescFile } from "@bufbuild/protobuf";
import type { TypedDescEnum, TypedDescExtension, TypedDescMessage } from "@bufbuild/protobuf/next/codegenv1";
import { enumDesc, extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/next/codegenv1";
import type { EnumOptions, EnumValueOptions } from "@bufbuild/protobuf/next/wkt";
import { fileDesc_google_protobuf_descriptor } from "@bufbuild/protobuf/next/wkt";
import type { Message } from "@bufbuild/protobuf/next";

export const fileDesc_extra_enum: DescFile = fileDesc("ChBleHRyYS9lbnVtLnByb3RvEgRzcGVjIm4KC0VudW1NZXNzYWdlEjAKCmVudW1fZmllbGQYASABKA4yHC5zcGVjLkVudW1NZXNzYWdlLk5lc3RlZEVudW0iLQoKTmVzdGVkRW51bRIPCgtORVNURURfWkVSTxAAEg4KCk5FU1RFRF9PTkUQASo0Cg1Bbm5vdGF0ZWRFbnVtEg8KC1VOU1BFQ0lGSUVEEAASDQoDRk9PEAEaBMi7AQEaA4h9ASotCgpTaW1wbGVFbnVtEg8KC1NJTVBMRV9aRVJPEAASDgoKU0lNUExFX09ORRABKkUKCUFsaWFzRW51bRIOCgpBTElBU19aRVJPEAASDQoJQUxJQVNfT05FEAESFQoRQUxJQVNfT05FX0FMSUFTRUQQARoCEAEqNwoKUHJlZml4RW51bRIUChBQUkVGSVhfRU5VTV9aRVJPEAASEwoPUFJFRklYX0VOVU1fT05FEAE6QQoNZW51bV9vcHRfYm9vbBIcLmdvb2dsZS5wcm90b2J1Zi5FbnVtT3B0aW9ucxjRDyABKAhSC2VudW1PcHRCb29sOlEKE2VudW1fdmFsdWVfb3B0X2Jvb2wSIS5nb29nbGUucHJvdG9idWYuRW51bVZhbHVlT3B0aW9ucxi5FyABKAhSEGVudW1WYWx1ZU9wdEJvb2xiBnByb3RvMw", [fileDesc_google_protobuf_descriptor]);

/**
 * @generated from message spec.EnumMessage
 */
export type EnumMessage = Message<"spec.EnumMessage"> & {
  /**
   * @generated from field: spec.EnumMessage.NestedEnum enum_field = 1;
   */
  enumField: EnumMessage_NestedEnum;
};

// Describes the message spec.EnumMessage.
// Use `create(EnumMessageDesc)` to create a new EnumMessage.
export const EnumMessageDesc: TypedDescMessage<EnumMessage> = messageDesc(fileDesc_extra_enum, 0);

/**
 * @generated from enum spec.EnumMessage.NestedEnum
 */
export enum EnumMessage_NestedEnum {
  /**
   * @generated from enum value: NESTED_ZERO = 0;
   */
  NESTED_ZERO = 0,

  /**
   * @generated from enum value: NESTED_ONE = 1;
   */
  NESTED_ONE = 1,
}

// Describes the enum spec.EnumMessage.NestedEnum.
export const EnumMessage_NestedEnumDesc: TypedDescEnum<EnumMessage_NestedEnum> = enumDesc(fileDesc_extra_enum, 0, 0);

/**
 * @generated from enum spec.AnnotatedEnum
 */
export enum AnnotatedEnum {
  /**
   * @generated from enum value: UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: FOO = 1;
   */
  FOO = 1,
}

// Describes the enum spec.AnnotatedEnum.
export const AnnotatedEnumDesc: TypedDescEnum<AnnotatedEnum> = enumDesc(fileDesc_extra_enum, 0);

/**
 * @generated from enum spec.SimpleEnum
 */
export enum SimpleEnum {
  /**
   * @generated from enum value: SIMPLE_ZERO = 0;
   */
  SIMPLE_ZERO = 0,

  /**
   * @generated from enum value: SIMPLE_ONE = 1;
   */
  SIMPLE_ONE = 1,
}

// Describes the enum spec.SimpleEnum.
export const SimpleEnumDesc: TypedDescEnum<SimpleEnum> = enumDesc(fileDesc_extra_enum, 1);

/**
 * @generated from enum spec.AliasEnum
 */
export enum AliasEnum {
  /**
   * @generated from enum value: ALIAS_ZERO = 0;
   */
  ALIAS_ZERO = 0,

  /**
   * @generated from enum value: ALIAS_ONE = 1;
   */
  ALIAS_ONE = 1,

  /**
   * @generated from enum value: ALIAS_ONE_ALIASED = 1;
   */
  ALIAS_ONE_ALIASED = 1,
}

// Describes the enum spec.AliasEnum.
export const AliasEnumDesc: TypedDescEnum<AliasEnum> = enumDesc(fileDesc_extra_enum, 2);

/**
 * The generated enum values should drop the "PREFIX_"
 * part at the top if the target language allows
 * (basically every language except C++).
 *
 * @generated from enum spec.PrefixEnum
 */
export enum PrefixEnum {
  /**
   * @generated from enum value: PREFIX_ENUM_ZERO = 0;
   */
  ZERO = 0,

  /**
   * @generated from enum value: PREFIX_ENUM_ONE = 1;
   */
  ONE = 1,
}

// Describes the enum spec.PrefixEnum.
export const PrefixEnumDesc: TypedDescEnum<PrefixEnum> = enumDesc(fileDesc_extra_enum, 3);

/**
 * @generated from extension: bool enum_opt_bool = 2001;
 */
export const enum_opt_bool: TypedDescExtension<EnumOptions, boolean> = extDesc(fileDesc_extra_enum, 0);

/**
 * @generated from extension: bool enum_value_opt_bool = 3001;
 */
export const enum_value_opt_bool: TypedDescExtension<EnumValueOptions, boolean> = extDesc(fileDesc_extra_enum, 1);

