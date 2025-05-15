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

import { type DescField, getOption, hasOption } from "@bufbuild/protobuf";
import { FeatureSet_FieldPresence } from "@bufbuild/protobuf/wkt";
import {
  field as ext_field,
  type FieldRules,
  Ignore,
  message as ext_message,
} from "./gen/minimal-validate_pb.js";

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
  const messageRules = getOption(descField.parent, ext_message);
  if (messageRules.disabled) {
    return true;
  }
  const fieldRules = getOption(descField, ext_field);
  if (
    fieldRules.ignore == Ignore.ALWAYS ||
    (descField.fieldKind == "message" &&
      fieldRules.ignore == Ignore.IF_DEFAULT_VALUE)
  ) {
    return true;
  }
  const childRules: FieldRules | undefined =
    descField.fieldKind == "list" && fieldRules.type.case == "repeated"
      ? fieldRules.type.value.items
      : descField.fieldKind == "map" && fieldRules.type.case == "map"
        ? fieldRules.type.value.values
        : undefined;
  if (childRules) {
    return (
      childRules.ignore == Ignore.ALWAYS ||
      childRules.ignore == Ignore.IF_DEFAULT_VALUE
    );
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
  const messageRules = getOption(descField.parent, ext_message);
  if (messageRules.disabled) {
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
