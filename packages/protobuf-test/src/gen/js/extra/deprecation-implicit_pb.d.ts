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

// @generated by protoc-gen-es v2.0.0-alpha.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/deprecation-implicit.proto (package spec, syntax proto3)
/* eslint-disable */

import type { GenDescEnum, GenDescExtension, GenDescFile, GenDescMessage, GenDescService } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { Empty, FieldOptions } from "@bufbuild/protobuf/wkt";

export declare const fileDesc_extra_deprecation_implicit: GenDescFile;

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

// Describes the message spec.ImplicitlyDeprecatedMessage. Use `create(ImplicitlyDeprecatedMessageDesc)` to create a new ImplicitlyDeprecatedMessage.
export declare const ImplicitlyDeprecatedMessageDesc: GenDescMessage<ImplicitlyDeprecatedMessage>;

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

// Describes the enum spec.ImplicitlyDeprecatedEnum.
export declare const ImplicitlyDeprecatedEnumDesc: GenDescEnum<ImplicitlyDeprecatedEnum>;

/**
 * @generated from service spec.ImplicitlyDeprecatedService
 * @deprecated
 */
export declare const ImplicitlyDeprecatedService: GenDescService<{
  /**
   * @generated from rpc spec.ImplicitlyDeprecatedService.ImplicitlyDeprecatedRpc
   */
  implicitlyDeprecatedRpc: {
    kind: "unary";
    I: Empty;
    O: Empty;
  },
}
>;

/**
 * @generated from extension: int32 implicitly_deprecated_option = 2001;
 */
export declare const implicitly_deprecated_option: GenDescExtension<FieldOptions, number>;

