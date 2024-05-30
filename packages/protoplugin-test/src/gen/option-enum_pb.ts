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

// @generated by protoc-gen-es v1.10.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file option-enum.proto (package test, syntax proto3)
/* eslint-disable */

import { proto3 } from "@bufbuild/protobuf";

/**
 * Used in custom-options.test.ts
 *
 * @generated from enum test.OptionEnum
 */
export enum OptionEnum {
  /**
   * @generated from enum value: OPTION_ENUM_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: OPTION_ENUM_A = 1;
   */
  A = 1,
}
// Retrieve enum metadata with: proto3.getEnumType(OptionEnum)
proto3.util.setEnumType(OptionEnum, "test.OptionEnum", [
  { no: 0, name: "OPTION_ENUM_UNSPECIFIED" },
  { no: 1, name: "OPTION_ENUM_A" },
]);

