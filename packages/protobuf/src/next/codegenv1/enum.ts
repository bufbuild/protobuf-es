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

import type { DescEnum } from "../../descriptor-set.js";
import { localName } from "../reflect/names.js";

export function tsEnum(desc: DescEnum) {
  const enumObject = Object.create(null) as enumObject;
  for (const value of desc.values) {
    const name = localName(value);
    enumObject[name] = value.number;
    enumObject[value.number] = name;
  }
  return desc;
}

type enumObject = {
  [key: number]: string;
  [k: string]: number | string;
};
