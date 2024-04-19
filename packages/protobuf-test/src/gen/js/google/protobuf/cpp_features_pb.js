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

// @generated by protoc-gen-es v1.8.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/cpp_features.proto (package pb, syntax proto2)
/* eslint-disable */

import { proto2 } from "@bufbuild/protobuf";
import { FeatureSet } from "./descriptor_pb.js";

/**
 * @generated from message pb.CppFeatures
 */
export const CppFeatures = /*@__PURE__*/ proto2.makeMessageType(
  "pb.CppFeatures",
  () => [
    { no: 1, name: "legacy_closed_enum", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
  ],
);

/**
 * @generated from extension: optional pb.CppFeatures cpp = 1000;
 */
export const cpp = proto2.makeExtension(
  "pb.cpp", 
  FeatureSet, 
  () => ({ no: 1000, kind: "message", T: CppFeatures, opt: true }),
);

