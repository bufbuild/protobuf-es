// Copyright 2021-2025 Buf Technologies, Inc.
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
  type DescField,
  type DescMessage,
  getOption,
  hasOption,
} from "@bufbuild/protobuf";
import { FeatureSet_FieldPresence } from "@bufbuild/protobuf/wkt";
import {
  field as ext_field,
  type FieldRules,
  Ignore,
} from "./gen/minimal-validate_pb.js";

/**
 * Returns true if the given message needs a ValidType. A message needs a ValidType
 * if one or more of the following conditions are true:
 * - A proto2 field has the `required` label
 * - A edition field has the feature `field_presence = LEGACY_REQUIRED`
 * - A field has the protovalidate `required` rule and not `ignore = IGNORE_ALWAYS`
 * - A message field (repeated, singular, or map value) needs a ValidType
 */
export function messageNeedsCustomValidType(
  message: DescMessage,
  options: {
    legacyRequired: boolean;
    protovalidateRequired: boolean;
  },
): boolean {
  function usesProtovalidateRequired(
    message: DescMessage,
    seen = new Set<string>(),
  ): boolean {
    seen.add(message.typeName);
    for (const field of message.fields) {
      if (isProtovalidateDisabled(field)) {
        continue;
      }
      if (isProtovalidateRequired(field)) {
        return true;
      }
      if (field.message && !seen.has(field.message.typeName)) {
        if (usesProtovalidateRequired(field.message, seen)) {
          return true;
        }
      }
    }
    return false;
  }
  function usesLegacyRequired(
    message: DescMessage,
    seen = new Set<string>(),
  ): boolean {
    seen.add(message.typeName);
    for (const field of message.fields) {
      if (isLegacyRequired(field)) {
        return true;
      }
      if (field.message && !seen.has(field.message.typeName)) {
        if (usesLegacyRequired(field.message, seen)) {
          return true;
        }
      }
    }
    return false;
  }
  return (
    (options.protovalidateRequired && usesProtovalidateRequired(message)) ||
    (options.legacyRequired && usesLegacyRequired(message))
  );
}

/**
 * Returns true if the field's protovalidate rules are (conditionally) disabled.
 *
 * Note that this function only applies to message fields (singular, repeated, map),
 * and always returns false for other field types.
 */
export function isProtovalidateDisabled(descField: DescField): boolean {
  if (descField.message === undefined) {
    return false;
  }
  const fieldRules = getOption(descField, ext_field);
  if (fieldRules.ignore == Ignore.ALWAYS) {
    return true;
  }
  const childRules: FieldRules | undefined =
    descField.fieldKind == "list" && fieldRules.type.case == "repeated"
      ? fieldRules.type.value.items
      : descField.fieldKind == "map" && fieldRules.type.case == "map"
        ? fieldRules.type.value.values
        : undefined;
  if (childRules) {
    return childRules.ignore == Ignore.ALWAYS;
  }
  return false;
}

/**
 * Returns true if the field is required by protovalidate.
 *
 * Note that this function only applies to message fields (singular, repeated, map),
 * and always returns false for other field types.
 */
export function isProtovalidateRequired(descField: DescField): boolean {
  if (!hasOption(descField, ext_field)) {
    return false;
  }
  const fieldRules = getOption(descField, ext_field);
  if (fieldRules.ignore === Ignore.ALWAYS) {
    return false;
  }
  return fieldRules.required;
}

/**
 * Returns true if the field has the proto2 `required` label, or the Edition
 * feature field_presence = LEGACY_REQUIRED.
 *
 * Note that this function only applies to singular message fields, and always
 * returns false for other fields.
 */
export function isLegacyRequired(descField: DescField): boolean {
  return (
    descField.fieldKind == "message" &&
    descField.presence == FeatureSet_FieldPresence.LEGACY_REQUIRED
  );
}
