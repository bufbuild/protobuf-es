// Copyright 2021-2023 Buf Technologies, Inc.
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

import type { FieldInfo, OneofInfo } from "../field.js";
import { localOneofName } from "./names.js";
import { assert } from "./assert.js";

export class InternalOneofInfo implements OneofInfo {
  readonly kind = "oneof";
  readonly name: string;
  readonly localName: string;
  readonly repeated = false;
  readonly packed = false;
  readonly opt = false;
  readonly default = undefined;
  readonly fields: FieldInfo[] = [];
  private _lookup?: { [localName: string]: FieldInfo | undefined };

  constructor(name: string) {
    this.name = name;
    this.localName = localOneofName(name);
  }

  addField(field: FieldInfo) {
    assert(field.oneof === this, `field ${field.name} not one of ${this.name}`);
    this.fields.push(field);
  }

  findField(localName: string): FieldInfo | undefined {
    if (!this._lookup) {
      this._lookup = Object.create(null) as {
        [localName: string]: FieldInfo | undefined;
      };
      for (let i = 0; i < this.fields.length; i++) {
        this._lookup[this.fields[i].localName] = this.fields[i];
      }
    }
    return this._lookup[localName];
  }
}
