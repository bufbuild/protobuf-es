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

// @generated by protoc-gen-es v2.2.1 with parameter "target=js+dts,import_extension=js"
// @generated from file extra/deprecation-implicit.proto (package spec, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenExtension, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { EmptySchema, FieldOptions } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/deprecation-implicit.proto.
 * @deprecated
 */
export declare const file_extra_deprecation_implicit: GenFile;

/**
 * @generated from message spec.ImplicitlyDeprecatedMessage
 * @deprecated
 */
export declare type ImplicitlyDeprecatedMessage = Message<"spec.ImplicitlyDeprecatedMessage"> & {
  /**
   * @generated from field: string implicitly_deprecated_field = 1;
   */
  implicitlyDeprecatedField: string;
};

/**
 * Describes the message spec.ImplicitlyDeprecatedMessage.
 * Use `create(ImplicitlyDeprecatedMessageSchema)` to create a new message.
 * @deprecated
 */
export declare const ImplicitlyDeprecatedMessageSchema: GenMessage<ImplicitlyDeprecatedMessage>;

/**
 * @generated from enum spec.ImplicitlyDeprecatedEnum
 * @deprecated
 */
export enum ImplicitlyDeprecatedEnum {
  /**
   * @generated from enum value: IMPLICITLY_DEPRECATED_ENUM_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,
}

/**
 * Describes the enum spec.ImplicitlyDeprecatedEnum.
 * @deprecated
 */
export declare const ImplicitlyDeprecatedEnumSchema: GenEnum<ImplicitlyDeprecatedEnum>;

/**
 * @generated from service spec.ImplicitlyDeprecatedService
 * @deprecated
 */
export declare const ImplicitlyDeprecatedService: GenService<{
  /**
   * @generated from rpc spec.ImplicitlyDeprecatedService.ImplicitlyDeprecatedRpc
   */
  implicitlyDeprecatedRpc: {
    methodKind: "unary";
    input: typeof EmptySchema;
    output: typeof EmptySchema;
  },
}>;

/**
 * @generated from extension: int32 implicitly_deprecated_option = 2002;
 * @deprecated
 */
export declare const implicitly_deprecated_option: GenExtension<FieldOptions, number>;

