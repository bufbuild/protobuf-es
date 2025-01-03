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

import type { Message } from "../types.js";
import type { ScalarValue } from "./scalar.js";
import type {
  ReflectList,
  ReflectMap,
  ReflectMessage,
} from "./reflect-types.js";
import { unsafeLocal } from "./unsafe.js";
import type { DescField, DescMessage } from "../descriptors.js";

export function isObject(arg: unknown): arg is Record<string, unknown> {
  return arg !== null && typeof arg == "object" && !Array.isArray(arg);
}

export function isOneofADT(arg: unknown): arg is OneofADT {
  return (
    arg !== null &&
    typeof arg == "object" &&
    "case" in arg &&
    ((typeof arg.case == "string" && "value" in arg && arg.value != null) ||
      (arg.case === undefined &&
        (!("value" in arg) || arg.value === undefined)))
  );
}

export type OneofADT =
  | { case: undefined; value?: undefined }
  | { case: string; value: Message | ScalarValue };

export function isReflectList(
  arg: unknown,
  field?: DescField & { fieldKind: "list" },
): arg is ReflectList {
  if (
    isObject(arg) &&
    unsafeLocal in arg &&
    "add" in arg &&
    "field" in arg &&
    typeof arg.field == "function"
  ) {
    if (field !== undefined) {
      const a = field,
        b = arg.field() as DescField & { fieldKind: "list" };
      return (
        a.listKind == b.listKind &&
        a.scalar === b.scalar &&
        a.message?.typeName === b.message?.typeName &&
        a.enum?.typeName === b.enum?.typeName
      );
    }
    return true;
  }
  return false;
}

export function isReflectMap(
  arg: unknown,
  field?: DescField & { fieldKind: "map" },
): arg is ReflectMap {
  if (
    isObject(arg) &&
    unsafeLocal in arg &&
    "has" in arg &&
    "field" in arg &&
    typeof arg.field == "function"
  ) {
    if (field !== undefined) {
      const a = field,
        b = arg.field() as DescField & { fieldKind: "map" };
      return (
        a.mapKey === b.mapKey &&
        a.mapKind == b.mapKind &&
        a.scalar === b.scalar &&
        a.message?.typeName === b.message?.typeName &&
        a.enum?.typeName === b.enum?.typeName
      );
    }
    return true;
  }
  return false;
}

export function isReflectMessage(
  arg: unknown,
  messageDesc?: DescMessage,
): arg is ReflectMessage {
  return (
    isObject(arg) &&
    unsafeLocal in arg &&
    "desc" in arg &&
    isObject(arg.desc) &&
    arg.desc.kind === "message" &&
    (messageDesc === undefined || arg.desc.typeName == messageDesc.typeName)
  );
}
