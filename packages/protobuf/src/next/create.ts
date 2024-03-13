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
import type { DescMessage } from "../descriptor-set.js";
import { Edition } from "../google/protobuf/descriptor_pb.js";
import type { Message, MessageInitShape, MessageShape } from "./types.js";
import { localName } from "./reflect/names.js";
import { LongType, scalarZeroValue } from "./reflect/scalar.js";

/**
 * Create a new message instance.
 */
export function create<Desc extends DescMessage>(
  desc: Desc,
  init?: MessageInitShape<Desc>,
): MessageShape<Desc> {
  if (isMessage(init, desc)) {
    // TODO consider returning a clone instead
    return init;
  }

  const message = createZeroMessage(desc);
  if (init !== undefined) {
    // const r = reflect(message);
    // TODO populate fields from init
    if (isMessage(init)) {
      // TODO if source is message, honor field presence?
    } else {
      // TODO populate fields
    }
  }
  return message as MessageShape<Desc>;
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
          t[name] = {}; // TODO switch to Object.create(null)?
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
          t[name] = {}; // TODO switch to Object.create(null)?
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
