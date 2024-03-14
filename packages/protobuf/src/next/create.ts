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
import { Edition } from "../google/protobuf/descriptor_pb.js";
import type { Message, MessageInitShape, MessageShape } from "./types.js";
import { localName } from "./reflect/names.js";
import { LongType, scalarZeroValue } from "./reflect/scalar.js";
import { reflect } from "./reflect/reflect.js";
import { FieldError, isFieldError } from "./reflect/error.js";
import { isObject, isOneofADT } from "./reflect/guard.js";

/**
 * Create a new message instance.
 */
export function create<Desc extends DescMessage>(
  desc: Desc,
  init?: MessageInitShape<Desc>,
): MessageShape<Desc> {
  if (init === undefined) {
    return createZeroMessage(desc) as MessageShape<Desc>;
  }
  const msgOrErr = tryCreate(desc, init);
  if (msgOrErr instanceof Error) {
    throw new Error(`${String(msgOrErr.field())}: ${msgOrErr.message}`);
  }
  return msgOrErr as MessageShape<Desc>;
}

function tryCreate<Desc extends DescMessage>(
  desc: Desc,
  init: MessageInitShape<Desc>,
): MessageShape<Desc> | FieldError {
  if (isMessage(init, desc)) {
    // TODO consider returning a clone instead
    return init;
  }
  const msg = createZeroMessage(desc);
  const r = reflect(msg);
  for (const member of r.members) {
    let value = (init as Record<string, unknown>)[localName(member)];
    if (value == null) {
      // intentionally ignore undefined and null
      continue;
    }
    let field: DescField;
    if (member.kind == "oneof") {
      if (!isOneofADT(value)) {
        return new FieldError(member, "invalid oneof ADT");
      }
      const oneofCase = value.case;
      if (oneofCase == undefined) {
        continue;
      }
      const oneofField = member.fields.find((f) => localName(f) == oneofCase);
      if (!oneofField) {
        return new FieldError(
          member,
          `invalid oneof ADT: field ${oneofCase} not found`,
        );
      }
      field = oneofField;
      value = value.value;
    } else {
      field = member;
    }
    let err: FieldError | undefined;
    if (field.fieldKind == "map") {
      // TODO implement
      throw new Error("TODO");
    } else if (field.fieldKind == "message") {
      if (!isMessage(value) && isObject(value)) {
        value = tryCreate(field.message, value);
        if (isFieldError(value)) {
          return new FieldError(
            field,
            `${value.field().name}: ${value.message}`,
          );
        }
      }
      err = r.set(field, value as Message);
    } else if (
      field.fieldKind == "list" &&
      field.listKind == "message" &&
      Array.isArray(value)
    ) {
      for (let i = 0; i < value.length; i++) {
        let item = value[i] as unknown;
        if (!isMessage(item) && isObject(item)) {
          item = tryCreate(field.message, item);
          if (isFieldError(item)) {
            return new FieldError(
              field,
              `list item #${i + 1}: ${item.field().name}: ${item.message}`,
            );
          }
        }
        // TODO fix type errors
        // @ts-expect-error TODO
        err = r.addListItem(field, item);
      }
    } else {
      // TODO fix type errors
      // @ts-expect-error TODO
      err = r.set(field, value);
    }
    if (err) {
      return err;
    }
  }
  return msg as MessageShape<Desc>;
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
  t.$desc = desc;
  t.$typeName = desc.typeName;
  return t as Message;
}
