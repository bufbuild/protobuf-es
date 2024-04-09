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

import { isMessage } from "./is-message.js";
import type { DescField, DescMessage } from "../descriptor-set.js";
import type { Message, MessageInitShape, MessageShape } from "./types.js";
import { localName } from "./reflect/names.js";
import { LongType, ScalarType, scalarZeroValue } from "./reflect/scalar.js";
import { FieldError } from "./reflect/error.js";
import { isObject } from "./reflect/guard.js";
import { unsafeGet, unsafeOneofCase, unsafeSet } from "./reflect/unsafe.js";

// TODO avoid copy by not exposing these enums in Desc*
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
enum Edition {
  EDITION_UNKNOWN = 0,
  EDITION_PROTO2 = 998,
  EDITION_PROTO3 = 999,
  EDITION_2023 = 1000,
  EDITION_2024 = 1001,
  EDITION_1_TEST_ONLY = 1,
  EDITION_2_TEST_ONLY = 2,
  EDITION_99997_TEST_ONLY = 99997,
  EDITION_99998_TEST_ONLY = 99998,
  EDITION_99999_TEST_ONLY = 99999,
  EDITION_MAX = 2147483647,
}

/**
 * Create a new message instance.
 *
 * The second argument is an optional initializer object, where all fields are
 * optional.
 */
export function create<Desc extends DescMessage>(
  messageDesc: Desc,
  init?: MessageInitShape<Desc>,
): MessageShape<Desc> {
  if (isMessage(init, messageDesc)) {
    return init;
  }
  const message = createZeroMessage(messageDesc) as MessageShape<Desc>;
  if (init !== undefined) {
    initMessage(messageDesc, message, init);
  }
  return message;
}

function initMessage<Desc extends DescMessage>(
  messageDesc: Desc,
  message: MessageShape<Desc>,
  init: MessageInitShape<Desc>,
): MessageShape<Desc> | FieldError {
  for (const member of messageDesc.members) {
    let value = (init as Record<string, unknown>)[localName(member)];
    if (value == null) {
      // intentionally ignore undefined and null
      continue;
    }
    let field: DescField;
    if (member.kind == "oneof") {
      const oneofField = unsafeOneofCase(init, member);
      if (!oneofField) {
        continue;
      }
      field = oneofField;
      value = unsafeGet(init, oneofField);
    } else {
      field = member;
    }
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (field.fieldKind) {
      case "message":
        value = toMessage(value, field.message);
        // value = initMessage(field, value);
        break;
      case "scalar":
        value = initScalar(field, value);
        break;
      case "list":
        value = initList(field, value);
        break;
      case "map":
        value = initMap(field, value);
        break;
    }
    unsafeSet(message, field, value);
  }
  return message;
}

function initScalar(
  field: DescField & { fieldKind: "scalar" },
  value: unknown,
): unknown {
  if (field.scalar == ScalarType.BYTES) {
    return toU8Arr(value);
  }
  return value;
}

function initMap(
  field: DescField & { fieldKind: "map" },
  value: unknown,
): unknown {
  if (isObject(value)) {
    if (field.scalar == ScalarType.BYTES) {
      return convertObjectValues(value, toU8Arr);
    }
    if (field.mapKind == "message") {
      return convertObjectValues(value, (val) => toMessage(val, field.message));
    }
  }
  return value;
}

function initList(
  field: DescField & { fieldKind: "list" },
  value: unknown,
): unknown {
  if (Array.isArray(value)) {
    if (field.scalar == ScalarType.BYTES) {
      return value.map(toU8Arr);
    }
    if (field.listKind == "message") {
      return value.map((item: unknown) => toMessage(item, field.message));
    }
  }
  return value;
}

function toMessage(value: unknown, message: DescMessage): unknown {
  if (!isMessage(value, message) && isObject(value)) {
    return create(message, value);
  }
  return value;
}

// converts any ArrayLike<number> to Uint8Array if necessary.
function toU8Arr(value: unknown) {
  return Array.isArray(value) ? new Uint8Array(value) : value;
}

function convertObjectValues(
  obj: Record<string, unknown>,
  fn: (val: unknown) => unknown,
): Record<string, unknown> {
  const ret: Record<string, unknown> = {};
  for (const entry of Object.entries(obj)) {
    ret[entry[0]] = fn(entry[1]);
  }
  return ret;
}

const messagePrototypes = new WeakMap<DescMessage, object>();

function createZeroMessage(desc: DescMessage): Message {
  let t: Record<string, unknown>;
  switch (desc.file.edition) {
    case Edition.EDITION_PROTO2: {
      let prototype = messagePrototypes.get(desc);
      if (!prototype) {
        const pt: Record<string, unknown> = {};
        for (const field of desc.fields) {
          // only proto2 singular scalar and enum fields use an initial value on the prototype chain
          // Behavior must match with the counterpart in @bufbuild/protoc-gen-es
          if (field.oneof) {
            continue;
          }
          if (field.fieldKind != "scalar" && field.fieldKind != "enum") {
            continue;
          }
          let value = field.getDefaultValue();
          if (value === undefined) {
            if (field.fieldKind == "scalar") {
              value = scalarZeroValue(field.scalar, field.longType);
            } else {
              value = field.enum.values[0].number;
            }
          } else if (
            field.fieldKind == "scalar" &&
            field.longType == LongType.STRING
          ) {
            value = value.toString();
          }
          const name = localName(field);
          pt[name] = value;
        }
        messagePrototypes.set(desc, (prototype = pt));
      }
      t = Object.create(prototype) as Record<string, unknown>;
      for (const member of desc.members) {
        const name = localName(member);
        if (member.kind == "oneof") {
          t[name] = { case: undefined };
        } else if (member.fieldKind == "list") {
          t[name] = [];
        } else if (member.fieldKind == "map") {
          t[name] = {}; // Object.create(null) would be desirable here, but is unsupported by react https://react.dev/reference/react/use-server#serializable-parameters-and-return-values
        }
      }
      break;
    }
    case Edition.EDITION_PROTO3:
      t = {};
      for (const member of desc.members) {
        const name = localName(member);
        if (member.kind == "oneof") {
          t[name] = { case: undefined };
        } else if (member.fieldKind == "list") {
          t[name] = [];
        } else if (member.fieldKind == "map") {
          t[name] = {}; // Object.create(null) would be desirable here, but is unsupported by react https://react.dev/reference/react/use-server#serializable-parameters-and-return-values
        } else if (!member.optional) {
          switch (member.fieldKind) {
            case "scalar":
              t[name] = scalarZeroValue(member.scalar, member.longType);
              break;
            case "enum":
              t[name] = 0;
              break;
            case "message":
              break;
          }
        }
      }
      break;
    default:
      throw new Error();
  }
  t.$typeName = desc.typeName;
  return t as Message;
}
