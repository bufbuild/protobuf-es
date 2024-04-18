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
// @generated from file google/protobuf/java_features.proto (package pb, syntax proto2)
/* eslint-disable */

import { enumDesc, extDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { fileDesc_google_protobuf_descriptor } from "./descriptor_pb.js";

export const fileDesc_google_protobuf_java_features = /*@__PURE__*/
  fileDesc("CiNnb29nbGUvcHJvdG9idWYvamF2YV9mZWF0dXJlcy5wcm90bxICcGIi6gEKDEphdmFGZWF0dXJlcxI+ChJsZWdhY3lfY2xvc2VkX2VudW0YASABKAhCIogBAZgBBJgBAaIBCRIEdHJ1ZRjmB6IBChIFZmFsc2UY5wcSUgoPdXRmOF92YWxpZGF0aW9uGAIgASgOMh8ucGIuSmF2YUZlYXR1cmVzLlV0ZjhWYWxpZGF0aW9uQhiIAQGYAQSYAQGiAQwSB0RFRkFVTFQY5gciRgoOVXRmOFZhbGlkYXRpb24SGwoXVVRGOF9WQUxJREFUSU9OX1VOS05PV04QABILCgdERUZBVUxUEAESCgoGVkVSSUZZEAI6QgoEamF2YRIbLmdvb2dsZS5wcm90b2J1Zi5GZWF0dXJlU2V0GOkHIAEoCzIQLnBiLkphdmFGZWF0dXJlc1IEamF2YUIoChNjb20uZ29vZ2xlLnByb3RvYnVmQhFKYXZhRmVhdHVyZXNQcm90bw", [fileDesc_google_protobuf_descriptor]);

// Describes the message pb.JavaFeatures. Use `create(JavaFeaturesDesc)` to create a new JavaFeatures.
export const JavaFeaturesDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_java_features, 0);

// Describes the enum pb.JavaFeatures.Utf8Validation.
export const JavaFeatures_Utf8ValidationDesc = /*@__PURE__*/
  enumDesc(fileDesc_google_protobuf_java_features, 0, 0);

/**
 * The UTF8 validation strategy to use.  See go/editions-utf8-validation for
 * more information on this feature.
 *
 * @generated from enum pb.JavaFeatures.Utf8Validation
 */
export const JavaFeatures_Utf8Validation = /*@__PURE__*/
  tsEnum(JavaFeatures_Utf8ValidationDesc);

/**
 * @generated from extension: optional pb.JavaFeatures java = 1001;
 */
export const java = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_java_features, 0);

