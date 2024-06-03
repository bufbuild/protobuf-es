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

// @generated by protoc-gen-es v2.0.0-alpha.3 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file google/protobuf/unittest_features.proto (package pb, syntax proto2)
/* eslint-disable */

import type { GenDescEnum, GenDescExtension, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { FeatureSet } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file google/protobuf/unittest_features.proto.
 */
export declare const fileDesc_google_protobuf_unittest_features: GenDescFile;

/**
 * @generated from message pb.TestMessage
 */
export declare type TestMessage = Message<"pb.TestMessage"> & {
};

/**
 * Describes the message pb.TestMessage.
 * Use `create(TestMessageDesc)` to create a new message.
 */
export declare const TestMessageDesc: GenDescMessage<TestMessage>;

/**
 * @generated from message pb.TestMessage.Nested
 */
export declare type TestMessage_Nested = Message<"pb.TestMessage.Nested"> & {
};

/**
 * Describes the message pb.TestMessage.Nested.
 * Use `create(TestMessage_NestedDesc)` to create a new message.
 */
export declare const TestMessage_NestedDesc: GenDescMessage<TestMessage_Nested>;

/**
 * @generated from extension: optional pb.TestFeatures test_nested = 9997;
 */
export declare const TestMessage_Nested_test_nested: GenDescExtension<FeatureSet, TestFeatures>;

/**
 * @generated from extension: optional pb.TestFeatures test_message = 9998;
 */
export declare const TestMessage_test_message: GenDescExtension<FeatureSet, TestFeatures>;

/**
 * @generated from message pb.TestFeatures
 */
export declare type TestFeatures = Message<"pb.TestFeatures"> & {
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
 * Use `create(TestFeaturesDesc)` to create a new message.
 */
export declare const TestFeaturesDesc: GenDescMessage<TestFeatures>;

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
export declare const EnumFeatureDesc: GenDescEnum<EnumFeature>;

/**
 * @generated from extension: optional pb.TestFeatures test = 9999;
 */
export declare const test: GenDescExtension<FeatureSet, TestFeatures>;

