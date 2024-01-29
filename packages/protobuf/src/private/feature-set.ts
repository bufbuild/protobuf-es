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

import {
  Edition,
  FeatureSet,
  FeatureSetDefaults,
} from "../google/protobuf/descriptor_pb.js";

/**
 * Static edition feature defaults supported by @bufbuild/protobuf.
 */
export const featureSetDefaults = FeatureSetDefaults.fromJsonString(
  /*upstream-inject-feature-defaults-start*/ '{"defaults":[{"edition":"EDITION_PROTO2","features":{"fieldPresence":"EXPLICIT","enumType":"CLOSED","repeatedFieldEncoding":"EXPANDED","utf8Validation":"NONE","messageEncoding":"LENGTH_PREFIXED","jsonFormat":"LEGACY_BEST_EFFORT"}},{"edition":"EDITION_PROTO3","features":{"fieldPresence":"IMPLICIT","enumType":"OPEN","repeatedFieldEncoding":"PACKED","utf8Validation":"VERIFY","messageEncoding":"LENGTH_PREFIXED","jsonFormat":"ALLOW"}},{"edition":"EDITION_2023","features":{"fieldPresence":"EXPLICIT","enumType":"OPEN","repeatedFieldEncoding":"PACKED","utf8Validation":"VERIFY","messageEncoding":"LENGTH_PREFIXED","jsonFormat":"ALLOW"}}],"minimumEdition":"EDITION_PROTO2","maximumEdition":"EDITION_2023"}' /*upstream-inject-feature-defaults-end*/
);

/**
 * A merged google.protobuf.FeaturesSet, with all fields guaranteed to be set.
 */
export type MergedFeatureSet = FeatureSet & Required<FeatureSet>;

/**
 * A function that resolves features.
 *
 * If no feature set is provided, the default feature set for the edition is
 * returned. If features are provided, they are merged into the edition default
 * features.
 */
export type FeatureResolverFn = (
  a?: FeatureSet,
  b?: FeatureSet
) => MergedFeatureSet;

/**
 * Create an edition feature resolver with the given feature set defaults.
 */
export function createFeatureResolver(
  compiledFeatureSetDefaults: FeatureSetDefaults,
  edition: Edition
): FeatureResolverFn {
  const min = compiledFeatureSetDefaults.minimumEdition;
  const max = compiledFeatureSetDefaults.maximumEdition;
  if (
    min === undefined ||
    max === undefined ||
    compiledFeatureSetDefaults.defaults.some((d) => d.edition === undefined)
  ) {
    throw new Error("Invalid FeatureSetDefaults");
  }
  if (edition < min) {
    throw new Error(
      `Edition ${Edition[edition]} is earlier than the minimum supported edition ${Edition[min]}`
    );
  }
  if (max < edition) {
    throw new Error(
      `Edition ${Edition[edition]} is later than the maximum supported edition ${Edition[max]}`
    );
  }
  let highestMatch: { e: Edition; f: FeatureSet } | undefined = undefined;
  for (const c of compiledFeatureSetDefaults.defaults) {
    const e = c.edition ?? 0;
    if (e > edition) {
      continue;
    }
    if (highestMatch !== undefined && highestMatch.e > e) {
      continue;
    }
    highestMatch = {
      e,
      f: c.features ?? new FeatureSet(),
    };
  }
  if (highestMatch === undefined) {
    throw new Error(`No valid default found for edition ${Edition[edition]}`);
  }
  const defaultsBin = highestMatch.f.toBinary();
  return (...rest): MergedFeatureSet => {
    const f = FeatureSet.fromBinary(defaultsBin);
    for (const c of rest) {
      if (c !== undefined) {
        f.fromBinary(c.toBinary());
      }
    }
    if (!validateMergedFeatures(f)) {
      throw new Error(`Invalid FeatureSet for edition ${Edition[edition]}`);
    }
    return f;
  };
}

// When protoc generates google.protobuf.FeatureSetDefaults, it ensures that
// fields are not repeated or required, do not use oneof, and have a default
// value.
//
// When features for an element are resolved, features of the element and its
// parents are merged into the default FeatureSet for the edition. Because unset
// fields in the FeatureSet of an element do not unset the default FeatureSet
// values, a resolved FeatureSet is guaranteed to have all fields set. This is
// also the case for extensions to FeatureSet that a user might provide, and for
// features from the future.
//
// We cannot exhaustively validate correctness of FeatureSetDefaults at runtime
// without knowing the schema: If no value for a feature is provided, we do not
// know that it exists at all.
//
// As a sanity check, we validate that all fields known to our version of
// FeatureSet are set.
function validateMergedFeatures(
  featureSet: FeatureSet
): featureSet is MergedFeatureSet {
  for (const fi of FeatureSet.fields.list()) {
    const v = featureSet[fi.localName as keyof FeatureSet] as unknown;
    if (v === undefined) {
      return false;
    }
    if (fi.kind == "enum" && v === 0) {
      return false;
    }
  }
  return true;
}
