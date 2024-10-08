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

// @generated by protoc-gen-es v2.2.0 with parameter "target=js+dts,import_extension=js"
// @generated from file extra/ts-types-proto2.proto (package spec, syntax proto2)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/ts-types-proto2.proto.
 */
export declare const file_extra_ts_types_proto2: GenFile;

/**
 * @generated from message spec.TsTypeA
 */
export declare type TsTypeA = Message<"spec.TsTypeA"> & {
  /**
   * @generated from field: optional string str = 1;
   */
  str: string;

  /**
   * @generated from field: optional spec.TsTypeA child = 2;
   */
  child?: TsTypeA;
};

/**
 * Describes the message spec.TsTypeA.
 * Use `create(TsTypeASchema)` to create a new message.
 */
export declare const TsTypeASchema: GenMessage<TsTypeA>;

/**
 * @generated from message spec.TsTypeB
 */
export declare type TsTypeB = Message<"spec.TsTypeB"> & {
  /**
   * @generated from field: optional string str = 1;
   */
  str: string;

  /**
   * @generated from field: optional spec.TsTypeB child = 2;
   */
  child?: TsTypeB;
};

/**
 * Describes the message spec.TsTypeB.
 * Use `create(TsTypeBSchema)` to create a new message.
 */
export declare const TsTypeBSchema: GenMessage<TsTypeB>;

