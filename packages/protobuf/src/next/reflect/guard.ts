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

import type { Message } from "../types.js";
import type { ScalarValue } from "./scalar.js";

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
