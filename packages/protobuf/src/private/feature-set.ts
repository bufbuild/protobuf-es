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
import { base64Decode } from "../next/wire/index.js";
import type { BinaryReadOptions } from "../binary-format.js";

/**
 * Return the edition feature defaults supported by @bufbuild/protobuf.
 */
function getFeatureSetDefaults(
  options?: Partial<BinaryReadOptions>,
): FeatureSetDefaults {
  return FeatureSetDefaults.fromBinary(
    base64Decode(
      /*upstream-inject-feature-defaults-start*/ "ChESDAgBEAIYAiADKAEwAhjmBwoREgwIAhABGAEgAigBMAEY5wcKERIMCAEQARgBIAIoATABGOgHIOYHKOgH" /*upstream-inject-feature-defaults-end*/,
    ),
    options,
  );
}

/**
 * A function that resolves features.
 *
 * If no feature set is provided, the default feature set for the edition is
 * returned. If features are provided, they are merged into the edition default
 * features.
 */
export type FeatureResolverFn = (a?: FeatureSet, b?: FeatureSet) => FeatureSet;

/**
 * Create an edition feature resolver with the given feature set defaults, or
 * the feature set defaults supported by @bufbuild/protobuf.
 */
export function createFeatureResolver(edition: Edition): FeatureResolverFn {
  const fds = getFeatureSetDefaults();
  const min = fds.minimumEdition;
  const max = fds.maximumEdition;
  if (
    min == Edition.EDITION_UNKNOWN ||
    max == Edition.EDITION_UNKNOWN ||
    fds.defaults.some((d) => d.edition == Edition.EDITION_UNKNOWN)
  ) {
    throw new Error("Invalid FeatureSetDefaults");
  }
  if (edition < min) {
    throw new Error(
      `Edition ${Edition[edition]} is earlier than the minimum supported edition ${Edition[min]}`,
    );
  }
  if (max < edition) {
    throw new Error(
      `Edition ${Edition[edition]} is later than the maximum supported edition ${Edition[max]}`,
    );
  }
  let highestMatch: { e: Edition; f: FeatureSet } | undefined = undefined;
  for (const c of fds.defaults) {
    const e = c.edition;
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
  const featureSetBin = highestMatch.f.toBinary();
  return (...rest): FeatureSet => {
    const f = FeatureSet.fromBinary(featureSetBin);
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
  featureSet: FeatureSet,
): featureSet is FeatureSet {
  for (const fi of FeatureSet.fields.list()) {
    const v = featureSet[fi.localName as keyof FeatureSet] as unknown;
    if (fi.kind == "enum" && v === 0) {
      return false;
    }
  }
  return true;
}
