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

import type { DescField, DescOneof } from "../descriptors.js";

const errorNames = [
  "FieldValueInvalidError",
  "FieldListRangeError",
  "ForeignFieldError",
];

export class FieldError extends Error {
  constructor(
    fieldOrOneof: DescField | DescOneof,
    message: string,
    override readonly name: (typeof errorNames)[number] = "FieldValueInvalidError",
  ) {
    super(message);
    this.field = () => fieldOrOneof;
  }
  readonly field: () => DescField | DescOneof;
}

export function isFieldError(arg: unknown): arg is FieldError {
  return (
    arg instanceof Error &&
    errorNames.includes(arg.name) &&
    "field" in arg &&
    typeof arg.field == "function"
  );
}
