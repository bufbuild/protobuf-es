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

import type { MessageShape } from "./types";
import type { DescMessage } from "../descriptor-set.js";

/**
 * Determine whether the given `arg` is a message.
 * If `desc` is set, determine whether `arg` is this specific message.
 */
export function isMessage<Desc extends DescMessage>(
  arg: unknown,
  desc?: Desc,
): arg is MessageShape<Desc> {
  const isMessage =
    arg !== null &&
    typeof arg == "object" &&
    "$typeName" in arg &&
    typeof arg.$typeName == "string" &&
    "$desc" in arg &&
    arg.$desc !== null &&
    typeof arg.$desc == "object";
  if (!isMessage) {
    return false;
  }
  if (desc === undefined) {
    return true;
  }
  return desc.typeName === arg.$typeName;
}
