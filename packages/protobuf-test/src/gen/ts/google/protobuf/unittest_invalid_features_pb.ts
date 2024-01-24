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

// @generated by protoc-gen-es v1.7.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_invalid_features.proto (package pb, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { FeatureSet, Message, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from message pb.TestInvalidFeatures
 */
export class TestInvalidFeatures extends Message<TestInvalidFeatures> {
  /**
   * @generated from field: repeated int32 repeated_feature = 1;
   */
  repeatedFeature: number[] = [];

  constructor(data?: PartialMessage<TestInvalidFeatures>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "pb.TestInvalidFeatures";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "repeated_feature", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestInvalidFeatures {
    return new TestInvalidFeatures().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestInvalidFeatures {
    return new TestInvalidFeatures().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestInvalidFeatures {
    return new TestInvalidFeatures().fromJsonString(jsonString, options);
  }

  static equals(a: TestInvalidFeatures | PlainMessage<TestInvalidFeatures> | undefined, b: TestInvalidFeatures | PlainMessage<TestInvalidFeatures> | undefined): boolean {
    return proto2.util.equals(TestInvalidFeatures, a, b);
  }
}

/**
 * @generated from extension: optional pb.TestInvalidFeatures test_invalid = 9996;
 */
export const test_invalid = proto2.makeExtension<FeatureSet, TestInvalidFeatures>(
  "pb.test_invalid", 
  FeatureSet, 
  () => ({ no: 9996, kind: "message", T: TestInvalidFeatures, opt: true }),
);

