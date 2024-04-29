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

import type { DescExtension } from "./desc-types.js";
import { assert } from "./reflect/assert.js";
import { readExtension } from "./from-binary.js";
import { writeExtension } from "./to-binary.js";
import type { Extendee, ExtensionValueShape, Message } from "./types.js";
import { BinaryReader, BinaryWriter } from "./wire/binary-encoding.js";

/**
 * Retrieve an extension value from a message.
 *
 * The function never returns undefined. Use hasExtension() to check whether an
 * extension is set. If the extension is not set, this function returns the
 * default value (if one was specified in the protobuf source), or the zero value
 * (for example `0` for numeric types, `[]` for repeated extension fields, and
 * an empty message instance for message fields).
 *
 * Extensions are stored as unknown fields on a message. To mutate an extension
 * value, make sure to store the new value with setExtension() after mutating.
 *
 * If the extension does not extend the given message, an error is raised.
 */
export function getExtension<Desc extends DescExtension>(
  message: Extendee<Desc>,
  extension: Desc,
): ExtensionValueShape<Desc> {
  assertExtendee(extension, message);
  return readExtension(
    extension,
    message.$unknown,
  ) as ExtensionValueShape<Desc>;
}

/**
 * Set an extension value on a message. If the message already has a value for
 * this extension, the value is replaced.
 *
 * If the extension does not extend the given message, an error is raised.
 */
export function setExtension<Desc extends DescExtension>(
  message: Extendee<Desc>,
  extension: Desc,
  value: ExtensionValueShape<Desc>,
) {
  assertExtendee(extension, message);
  const ufs = (message.$unknown ?? []).filter(
    (uf) => uf.no !== extension.number,
  );
  const writer = new BinaryWriter();
  writeExtension(writer, extension, value);
  const reader = new BinaryReader(writer.finish());
  while (reader.pos < reader.len) {
    const [no, wireType] = reader.tag();
    const data = reader.skip(wireType, no);
    ufs.push({ no, wireType, data });
  }
  message.$unknown = ufs;
}

/**
 * Remove an extension value from a message.
 *
 * If the extension does not extend the given message, an error is raised.
 */
export function clearExtension<Desc extends DescExtension>(
  message: Extendee<Desc>,
  extension: Desc,
): void {
  assertExtendee(extension, message);
  if (message.$unknown === undefined) {
    return;
  }
  message.$unknown = message.$unknown.filter(
    (uf) => uf.no !== extension.number,
  );
}

/**
 * Check whether an extension is set on a message.
 */
export function hasExtension<Desc extends DescExtension>(
  message: Extendee<Desc>,
  extension: Desc,
): boolean {
  return (
    extension.extendee.typeName === message.$typeName &&
    !!message.$unknown?.find((uf) => uf.no === extension.number)
  );
}

function assertExtendee(extension: DescExtension, message: Message) {
  assert(
    extension.extendee.typeName == message.$typeName,
    `extension ${extension.typeName} can only be applied to message ${extension.extendee.typeName}`,
  );
}
