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

// @generated by protoc-gen-es v1.9.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_features.proto (package pb, syntax proto2)
/* eslint-disable */

import { FeatureSet, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from enum pb.EnumFeature
 */
export const EnumFeature = /*@__PURE__*/ proto2.makeEnum(
  "pb.EnumFeature",
  [
    {no: 0, name: "TEST_ENUM_FEATURE_UNKNOWN"},
    {no: 1, name: "VALUE1"},
    {no: 2, name: "VALUE2"},
    {no: 3, name: "VALUE3"},
    {no: 4, name: "VALUE4"},
    {no: 5, name: "VALUE5"},
    {no: 6, name: "VALUE6"},
    {no: 7, name: "VALUE7"},
    {no: 8, name: "VALUE8"},
    {no: 9, name: "VALUE9"},
    {no: 10, name: "VALUE10"},
    {no: 11, name: "VALUE11"},
    {no: 12, name: "VALUE12"},
    {no: 13, name: "VALUE13"},
    {no: 14, name: "VALUE14"},
    {no: 15, name: "VALUE15"},
    {no: 98, name: "VALUE_EMPTY_SUPPORT"},
    {no: 99, name: "VALUE_FUTURE"},
  ],
);

/**
 * @generated from message pb.TestMessage
 */
export const TestMessage = /*@__PURE__*/ proto2.makeMessageType(
  "pb.TestMessage",
  [],
);

/**
 * @generated from message pb.TestMessage.Nested
 */
export const TestMessage_Nested = /*@__PURE__*/ proto2.makeMessageType(
  "pb.TestMessage.Nested",
  [],
  {localName: "TestMessage_Nested"},
);

/**
 * @generated from extension: optional pb.TestFeatures test_nested = 9997;
 */
export const TestMessage_Nested_test_nested = proto2.makeExtension(
  "pb.TestMessage.Nested.test_nested", 
  FeatureSet, 
  () => ({ no: 9997, kind: "message", T: TestFeatures, opt: true }),
);

/**
 * @generated from extension: optional pb.TestFeatures test_message = 9998;
 */
export const TestMessage_test_message = proto2.makeExtension(
  "pb.TestMessage.test_message", 
  FeatureSet, 
  () => ({ no: 9998, kind: "message", T: TestFeatures, opt: true }),
);

/**
 * @generated from message pb.TestFeatures
 */
export const TestFeatures = /*@__PURE__*/ proto2.makeMessageType(
  "pb.TestFeatures",
  () => [
    { no: 1, name: "file_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 2, name: "extension_range_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 3, name: "message_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 4, name: "field_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 5, name: "oneof_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 6, name: "enum_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 7, name: "enum_entry_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 8, name: "service_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 9, name: "method_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 10, name: "multiple_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 11, name: "bool_field_feature", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 15, name: "source_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 16, name: "source_feature2", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 17, name: "removed_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 18, name: "future_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
    { no: 19, name: "legacy_feature", kind: "enum", T: proto2.getEnumType(EnumFeature), opt: true },
  ],
);

/**
 * @generated from extension: optional pb.TestFeatures test = 9999;
 */
export const test = proto2.makeExtension(
  "pb.test", 
  FeatureSet, 
  () => ({ no: 9999, kind: "message", T: TestFeatures, opt: true }),
);

