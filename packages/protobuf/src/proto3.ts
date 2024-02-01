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

import { makeProtoRuntime } from "./private/proto-runtime.js";
import { makeBinaryFormatProto3 } from "./private/binary-format-proto3.js";
import { makeJsonFormatProto3 } from "./private/json-format-proto3.js";
import { makeUtilCommon } from "./private/util-common.js";
import type { FieldListSource } from "./private/field-list.js";
import { InternalFieldList } from "./private/field-list.js";
import type { FieldList } from "./field-list.js";
import type { AnyMessage, Message } from "./message.js";
import { scalarDefaultValue } from "./private/scalars.js";
import { normalizeFieldInfos } from "./private/field-normalize.js";

/**
 * Provides functionality for messages defined with the proto3 syntax.
 */
export const proto3 = makeProtoRuntime(
  "proto3",
  makeJsonFormatProto3(),
  makeBinaryFormatProto3(),
  {
    ...makeUtilCommon(),
    newFieldList(fields: FieldListSource): FieldList {
      return new InternalFieldList(fields, (source) =>
        normalizeFieldInfos(source, true),
      );
    },
    initFields(target: Message): void {
      for (const member of target.getType().fields.byMember()) {
        if (member.opt) {
          continue;
        }
        const name = member.localName,
          t = target as AnyMessage;
        if (member.repeated) {
          t[name] = [];
          continue;
        }
        switch (member.kind) {
          case "oneof":
            t[name] = { case: undefined };
            break;
          case "enum":
            t[name] = 0;
            break;
          case "map":
            t[name] = {};
            break;
          case "scalar":
            t[name] = scalarDefaultValue(member.T, member.L); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
            break;
          case "message":
            // message fields are always optional in proto3
            break;
        }
      }
    },
  },
);
