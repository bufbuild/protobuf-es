// Copyright 2021-2026 Buf Technologies, Inc.
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

import type { DescField, DescMessage } from "../descriptors.js";

/**
 * Returns true if the field is structured like a proto2 group: a delimited
 * message field whose name is the lowercase of its message type name, declared
 * in the same scope as that message.
 *
 * The text format addresses such fields by their message type name (e.g.
 * `MyGroup`) rather than their field name. This is a faithful port of
 * protobuf-go's isGroupLike (internal/filedesc/desc.go), so editions delimited
 * fields are treated exactly like proto2 groups.
 *
 * Testing `field.message` first narrows the DescField union to its three
 * message-bearing variants (singular, list, and map value) — all of which carry
 * `delimitedEncoding` — so it is in scope below without a cast. Maps are
 * excluded automatically, because their `delimitedEncoding` is always false.
 */
export function isGroupLike(
  field: DescField,
): field is DescField & { message: DescMessage } {
  // Groups are always delimited-encoded message fields.
  if (field.message === undefined || !field.delimitedEncoding) {
    return false;
  }
  // Group fields are always named after the lowercase message type name.
  if (field.message.name.toLowerCase() !== field.name) {
    return false;
  }
  // Groups can only be defined in the file they are used in.
  if (field.message.file !== field.parent.file) {
    return false;
  }
  // Group messages are always defined in the same scope as the field.
  return field.message.parent === field.parent;
}
