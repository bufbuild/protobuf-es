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

// @generated by protoc-gen-es v2.0.0-beta.3 with parameter "target=ts,import_extension=js"
// @generated from file google/protobuf/unittest_features.proto (package pb, syntax proto2)
/* eslint-disable */

import type { GenEnum, GenExtension, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { FeatureSet } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_descriptor } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/unittest_features.proto.
 */
export const file_google_protobuf_unittest_features: GenFile = /*@__PURE__*/
  fileDesc("Cidnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfZmVhdHVyZXMucHJvdG8SAnBiIrsBCgtUZXN0TWVzc2FnZRpZCgZOZXN0ZWQyTwoLdGVzdF9uZXN0ZWQSGy5nb29nbGUucHJvdG9idWYuRmVhdHVyZVNldBiNTiABKAsyEC5wYi5UZXN0RmVhdHVyZXNSCnRlc3ROZXN0ZWQyUQoMdGVzdF9tZXNzYWdlEhsuZ29vZ2xlLnByb3RvYnVmLkZlYXR1cmVTZXQYjk4gASgLMhAucGIuVGVzdEZlYXR1cmVzUgt0ZXN0TWVzc2FnZSLbCgoMVGVzdEZlYXR1cmVzEnsKDGZpbGVfZmVhdHVyZRgBIAEoDjIPLnBiLkVudW1GZWF0dXJlQlSIAQGYAQGiAQsSBlZBTFVFMRiEB6IBCxIGVkFMVUUyGOcHogELEgZWQUxVRTMY6AeiAQwSBlZBTFVFNBidjQaiAQwSBlZBTFVFNRiejQayAQMI6AcSTAoXZXh0ZW5zaW9uX3JhbmdlX2ZlYXR1cmUYAiABKA4yDy5wYi5FbnVtRmVhdHVyZUIaiAEBmAECogELEgZWQUxVRTEYhAeyAQMI6AcSRAoPbWVzc2FnZV9mZWF0dXJlGAMgASgOMg8ucGIuRW51bUZlYXR1cmVCGogBAZgBA6IBCxIGVkFMVUUxGIQHsgEDCOgHEkIKDWZpZWxkX2ZlYXR1cmUYBCABKA4yDy5wYi5FbnVtRmVhdHVyZUIaiAEBmAEEogELEgZWQUxVRTEYhAeyAQMI6AcSQgoNb25lb2ZfZmVhdHVyZRgFIAEoDjIPLnBiLkVudW1GZWF0dXJlQhqIAQGYAQWiAQsSBlZBTFVFMRiEB7IBAwjoBxJBCgxlbnVtX2ZlYXR1cmUYBiABKA4yDy5wYi5FbnVtRmVhdHVyZUIaiAEBmAEGogELEgZWQUxVRTEYhAeyAQMI6AcSRwoSZW51bV9lbnRyeV9mZWF0dXJlGAcgASgOMg8ucGIuRW51bUZlYXR1cmVCGogBAZgBB6IBCxIGVkFMVUUxGIQHsgEDCOgHEkQKD3NlcnZpY2VfZmVhdHVyZRgIIAEoDjIPLnBiLkVudW1GZWF0dXJlQhqIAQGYAQiiAQsSBlZBTFVFMRiEB7IBAwjoBxJDCg5tZXRob2RfZmVhdHVyZRgJIAEoDjIPLnBiLkVudW1GZWF0dXJlQhqIAQGYAQmiAQsSBlZBTFVFMRiEB7IBAwjoBxJdChBtdWx0aXBsZV9mZWF0dXJlGAogASgOMg8ucGIuRW51bUZlYXR1cmVCMogBAZgBAZgBBJgBA5gBBpgBB5gBCJgBCZgBBZgBAqIBCxIGVkFMVUUxGIQHsgEDCOgHEkIKEmJvb2xfZmllbGRfZmVhdHVyZRgLIAEoCEImiAEBmAEEogEKEgVmYWxzZRiEB6IBChIEdHJ1ZRidjQayAQMI6AcSWwoOc291cmNlX2ZlYXR1cmUYDyABKA4yDy5wYi5FbnVtRmVhdHVyZUIyiAECmAEBmAEEmAEDmAEGmAEHmAEImAEJmAEFmAECogELEgZWQUxVRTEYhAeyAQMI6AcSXAoPc291cmNlX2ZlYXR1cmUyGBAgASgOMg8ucGIuRW51bUZlYXR1cmVCMogBApgBAZgBBJgBA5gBBpgBB5gBCJgBCZgBBZgBAqIBCxIGVkFMVUUxGIQHsgEDCOgHEo0BCg9yZW1vdmVkX2ZlYXR1cmUYESABKA4yDy5wYi5FbnVtRmVhdHVyZUJjiAEBmAEBmAEEogELEgZWQUxVRTEYhAeiAQsSBlZBTFVFMhjoB6IBCxIGVkFMVUUzGOkHsgEtCOgHEOgHGiJDdXN0b20gZmVhdHVyZSBkZXByZWNhdGlvbiB3YXJuaW5nIOkHElQKDmZ1dHVyZV9mZWF0dXJlGBIgASgOMg8ucGIuRW51bUZlYXR1cmVCK4gBAZgBAZgBBKIBCxIGVkFMVUUxGIQHogELEgZWQUxVRTIY6QeyAQMI6QcSVwoObGVnYWN5X2ZlYXR1cmUYEyABKA4yDy5wYi5FbnVtRmVhdHVyZUIuiAEBmAEBmAEEogELEgZWQUxVRTEYhAeiAQsSBlZBTFVFMhjoB7IBBgjnByDoByrJAgoLRW51bUZlYXR1cmUSHQoZVEVTVF9FTlVNX0ZFQVRVUkVfVU5LTk9XThAAEgoKBlZBTFVFMRABEgoKBlZBTFVFMhACEgoKBlZBTFVFMxADEgoKBlZBTFVFNBAEEgoKBlZBTFVFNRAFEgoKBlZBTFVFNhAGEgoKBlZBTFVFNxAHEgoKBlZBTFVFOBAIEgoKBlZBTFVFORAJEgsKB1ZBTFVFMTAQChILCgdWQUxVRTExEAsSCwoHVkFMVUUxMhAMEgsKB1ZBTFVFMTMQDRILCgdWQUxVRTE0EA4SCwoHVkFMVUUxNRAPEhsKE1ZBTFVFX0VNUFRZX1NVUFBPUlQQYhoCIgASRAoMVkFMVUVfRlVUVVJFEGMaMiIwCJ2NBhCejQYaIkN1c3RvbSBmZWF0dXJlIGRlcHJlY2F0aW9uIHdhcm5pbmcgn40GOkIKBHRlc3QSGy5nb29nbGUucHJvdG9idWYuRmVhdHVyZVNldBiPTiABKAsyEC5wYi5UZXN0RmVhdHVyZXNSBHRlc3Q", [file_google_protobuf_descriptor]);

/**
 * @generated from message pb.TestMessage
 */
export type TestMessage = Message<"pb.TestMessage"> & {
};

/**
 * Describes the message pb.TestMessage.
 * Use `create(TestMessageSchema)` to create a new message.
 */
export const TestMessageSchema: GenMessage<TestMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_features, 0);

/**
 * @generated from message pb.TestMessage.Nested
 */
export type TestMessage_Nested = Message<"pb.TestMessage.Nested"> & {
};

/**
 * Describes the message pb.TestMessage.Nested.
 * Use `create(TestMessage_NestedSchema)` to create a new message.
 */
export const TestMessage_NestedSchema: GenMessage<TestMessage_Nested> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_features, 0, 0);

/**
 * @generated from extension: optional pb.TestFeatures test_nested = 9997;
 */
export const TestMessage_Nested_test_nested: GenExtension<FeatureSet, TestFeatures> = /*@__PURE__*/
  extDesc(file_google_protobuf_unittest_features, 0, 0, 0);

/**
 * @generated from extension: optional pb.TestFeatures test_message = 9998;
 */
export const TestMessage_test_message: GenExtension<FeatureSet, TestFeatures> = /*@__PURE__*/
  extDesc(file_google_protobuf_unittest_features, 0, 0);

/**
 * @generated from message pb.TestFeatures
 */
export type TestFeatures = Message<"pb.TestFeatures"> & {
  /**
   * @generated from field: optional pb.EnumFeature file_feature = 1;
   */
  fileFeature: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature extension_range_feature = 2;
   */
  extensionRangeFeature: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature message_feature = 3;
   */
  messageFeature: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature field_feature = 4;
   */
  fieldFeature: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature oneof_feature = 5;
   */
  oneofFeature: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature enum_feature = 6;
   */
  enumFeature: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature enum_entry_feature = 7;
   */
  enumEntryFeature: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature service_feature = 8;
   */
  serviceFeature: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature method_feature = 9;
   */
  methodFeature: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature multiple_feature = 10;
   */
  multipleFeature: EnumFeature;

  /**
   * @generated from field: optional bool bool_field_feature = 11;
   */
  boolFieldFeature: boolean;

  /**
   * @generated from field: optional pb.EnumFeature source_feature = 15;
   */
  sourceFeature: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature source_feature2 = 16;
   */
  sourceFeature2: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature removed_feature = 17;
   */
  removedFeature: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature future_feature = 18;
   */
  futureFeature: EnumFeature;

  /**
   * @generated from field: optional pb.EnumFeature legacy_feature = 19;
   */
  legacyFeature: EnumFeature;
};

/**
 * Describes the message pb.TestFeatures.
 * Use `create(TestFeaturesSchema)` to create a new message.
 */
export const TestFeaturesSchema: GenMessage<TestFeatures> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_features, 1);

/**
 * @generated from enum pb.EnumFeature
 */
export enum EnumFeature {
  /**
   * @generated from enum value: TEST_ENUM_FEATURE_UNKNOWN = 0;
   */
  TEST_ENUM_FEATURE_UNKNOWN = 0,

  /**
   * @generated from enum value: VALUE1 = 1;
   */
  VALUE1 = 1,

  /**
   * @generated from enum value: VALUE2 = 2;
   */
  VALUE2 = 2,

  /**
   * @generated from enum value: VALUE3 = 3;
   */
  VALUE3 = 3,

  /**
   * @generated from enum value: VALUE4 = 4;
   */
  VALUE4 = 4,

  /**
   * @generated from enum value: VALUE5 = 5;
   */
  VALUE5 = 5,

  /**
   * @generated from enum value: VALUE6 = 6;
   */
  VALUE6 = 6,

  /**
   * @generated from enum value: VALUE7 = 7;
   */
  VALUE7 = 7,

  /**
   * @generated from enum value: VALUE8 = 8;
   */
  VALUE8 = 8,

  /**
   * @generated from enum value: VALUE9 = 9;
   */
  VALUE9 = 9,

  /**
   * @generated from enum value: VALUE10 = 10;
   */
  VALUE10 = 10,

  /**
   * @generated from enum value: VALUE11 = 11;
   */
  VALUE11 = 11,

  /**
   * @generated from enum value: VALUE12 = 12;
   */
  VALUE12 = 12,

  /**
   * @generated from enum value: VALUE13 = 13;
   */
  VALUE13 = 13,

  /**
   * @generated from enum value: VALUE14 = 14;
   */
  VALUE14 = 14,

  /**
   * @generated from enum value: VALUE15 = 15;
   */
  VALUE15 = 15,

  /**
   * @generated from enum value: VALUE_EMPTY_SUPPORT = 98;
   */
  VALUE_EMPTY_SUPPORT = 98,

  /**
   * @generated from enum value: VALUE_FUTURE = 99;
   */
  VALUE_FUTURE = 99,
}

/**
 * Describes the enum pb.EnumFeature.
 */
export const EnumFeatureSchema: GenEnum<EnumFeature> = /*@__PURE__*/
  enumDesc(file_google_protobuf_unittest_features, 0);

/**
 * @generated from extension: optional pb.TestFeatures test = 9999;
 */
export const test: GenExtension<FeatureSet, TestFeatures> = /*@__PURE__*/
  extDesc(file_google_protobuf_unittest_features, 0);

