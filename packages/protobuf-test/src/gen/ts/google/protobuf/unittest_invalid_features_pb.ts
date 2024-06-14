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

// @generated by protoc-gen-es v2.0.0-alpha.4 with parameter "ts_nocheck=false,target=ts,import_extension=.js"
// @generated from file google/protobuf/unittest_invalid_features.proto (package pb, syntax proto2)
/* eslint-disable */

import type { GenDescExtension, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { FeatureSet } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_descriptor } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/unittest_invalid_features.proto.
 */
export const file_google_protobuf_unittest_invalid_features: GenDescFile = /*@__PURE__*/
  fileDesc("Ci9nb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfaW52YWxpZF9mZWF0dXJlcy5wcm90bxICcGIiQAoTVGVzdEludmFsaWRGZWF0dXJlcxIpChByZXBlYXRlZF9mZWF0dXJlGAEgAygFQg+IAQGYAQSiAQYSATMY6Ac6WAoMdGVzdF9pbnZhbGlkEhsuZ29vZ2xlLnByb3RvYnVmLkZlYXR1cmVTZXQYjE4gASgLMhcucGIuVGVzdEludmFsaWRGZWF0dXJlc1ILdGVzdEludmFsaWQ", [file_google_protobuf_descriptor]);

/**
 * @generated from message pb.TestInvalidFeatures
 */
export type TestInvalidFeatures = Message<"pb.TestInvalidFeatures"> & {
  /**
   * @generated from field: repeated int32 repeated_feature = 1;
   */
  repeatedFeature: number[];
};

/**
 * JSON type for the message pb.TestInvalidFeatures.
 */
export type TestInvalidFeaturesJson = {
  /**
   * @generated from field: repeated int32 repeated_feature = 1;
   */
  repeatedFeature?: number[];
};

/**
 * Describes the message pb.TestInvalidFeatures.
 * Use `create(TestInvalidFeaturesSchema)` to create a new message.
 */
export const TestInvalidFeaturesSchema: GenDescMessage<TestInvalidFeatures, TestInvalidFeaturesJson> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_invalid_features, 0);

/**
 * @generated from extension: optional pb.TestInvalidFeatures test_invalid = 9996;
 */
export const test_invalid: GenDescExtension<FeatureSet, TestInvalidFeatures> = /*@__PURE__*/
  extDesc(file_google_protobuf_unittest_invalid_features, 0);

