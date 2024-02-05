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
import type { FieldListSource } from "./private/field-list.js";
import { InternalFieldList } from "./private/field-list.js";
import type { FieldList } from "./field-list.js";
import type { AnyMessage, Message } from "./message.js";
import { normalizeFieldInfos } from "./private/field-normalize.js";

/**
 * Provides functionality for messages defined with the proto2 syntax.
 */
export const proto2 = makeProtoRuntime(
  "proto2",
  (fields: FieldListSource): FieldList => {
    return new InternalFieldList(fields, (source) =>
      normalizeFieldInfos(source, false),
    );
  },
  // TODO merge with proto3 and initExtensionField
  (target: Message): void => {
    for (const member of target.getType().fields.byMember()) {
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
        case "map":
          t[name] = {};
          break;
        case "scalar":
        case "enum":
        case "message":
          // In contrast to proto3, enum and scalar fields have no intrinsic default value,
          // only an optional explicit default value.
          // Unlike proto3 intrinsic default values, proto2 explicit default values are not
          // set on construction, because they are not omitted on the wire. If we did set
          // default values on construction, a deserialize-serialize round-trip would add
          // fields to a message.
          break;
      }
    }
  },
);
