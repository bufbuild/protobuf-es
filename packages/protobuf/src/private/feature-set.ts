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
 * TODO remove getFeatures() from the Desc* types, along with this
 *
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
 * Temporary plain object representing FeatureSet.
 *
 * TODO remove getFeatures() from the Desc* types, along with this
 */
export type ResolvedFeatureSet = Pick<FeatureSet, FeatureNames>;

const featureNames = [
  "fieldPresence",
  "enumType",
  "repeatedFieldEncoding",
  "utf8Validation",
  "messageEncoding",
  "jsonFormat",
] as const;
type FeatureNames = (typeof featureNames)[number];

/**
 * A function that resolves features.
 *
 * If no feature set is provided, the default feature set for the edition is
 * returned. If features are provided, they are merged into the edition default
 * features.
 */
export type FeatureResolverFn = (
  a?: ResolvedFeatureSet,
  b?: ResolvedFeatureSet,
) => ResolvedFeatureSet;

/**
 * TODO remove getFeatures() from the Desc* types, along with this
 *
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
    fds.defaults.some((d) => d.edition == Edition.EDITION_UNKNOWN) ||
    fds.defaults.some(
      (d) =>
        !d.features ||
        (d.features.fieldPresence as number) == 0 ||
        (d.features.enumType as number) == 0 ||
        (d.features.repeatedFieldEncoding as number) == 0 ||
        (d.features.utf8Validation as number) == 0 ||
        (d.features.messageEncoding as number) == 0 ||
        (d.features.jsonFormat as number) == 0,
    )
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
      f: c.features!, // we verified above that all defaults have features
    };
  }
  if (highestMatch === undefined) {
    throw new Error(`No valid default found for edition ${Edition[edition]}`);
  }
  return (...rest): ResolvedFeatureSet => {
    const r: ResolvedFeatureSet = { ...highestMatch.f };
    for (const i of rest) {
      if (!i) {
        continue;
      }
      for (const name of featureNames) {
        if ((i[name] as number) == 0) {
          continue;
        }
        (r as Record<FeatureNames, ResolvedFeatureSet[FeatureNames]>)[name] =
          i[name];
      }
    }
    return r;
  };
}
