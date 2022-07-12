// Copyright 2021-2022 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v0.0.8 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/enum-annotated.proto (package spec, syntax proto3)
/* eslint-disable */

import {proto3} from "@bufbuild/protobuf";

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
// Retrieve enum metadata with: proto3.getEnumType(AnnotatedEnum)
proto3.util.setEnumType(AnnotatedEnum, "spec.AnnotatedEnum", [
  { no: 0, name: "UNSPECIFIED" },
  { no: 1, name: "FOO" },
]);

