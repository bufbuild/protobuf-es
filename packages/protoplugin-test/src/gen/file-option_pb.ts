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

// @generated by protoc-gen-es v1.6.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file file-option.proto (package testcustomoptions, syntax proto3)
/* eslint-disable */

import { FileOptions, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from extension: optional uint32 uint32_option = 60123;
 */
export const uint32_option = proto3.makeExtension<FileOptions, number>(
  "testcustomoptions.uint32_option", 
  FileOptions, 
  { no: 60123, kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
);

