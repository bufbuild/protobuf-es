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

import type { EnumType, EnumValueInfo } from "../enum.js";
import { assert } from "./assert.js";

/**
 * Represents a generated enum.
 */
export interface EnumObject {
  [key: number]: string;

  [k: string]: number | string;
}

const enumTypeSymbol = Symbol("@bufbuild/protobuf/enum-type");

/**
 * Get reflection information from a generated enum.
 * If this function is called on something other than a generated
 * enum, it raises an error.
 */
export function getEnumType(enumObject: EnumObject): EnumType {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
  const t = (enumObject as any)[enumTypeSymbol];
  assert(t, "missing enum type on enum object");
  return t; // eslint-disable-line @typescript-eslint/no-unsafe-return
}

/**
 * Sets reflection information on a generated enum.
 */
export function setEnumType(
  enumObject: EnumObject,
  typeName: string,
  values: Omit<EnumValueInfo, "localName">[],
  opt?: {
    // We do not surface options at this time
    // options?: { readonly [extensionName: string]: JsonValue };
  }
): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  (enumObject as any)[enumTypeSymbol] = makeEnumType(
    typeName,
    values.map((v) => ({
      no: v.no,
      name: v.name,
      localName: enumObject[v.no],
    })),
    opt
  );
}

/**
 * Create a new EnumType with the given values.
 */
export function makeEnumType(
  typeName: string,
  values: (EnumValueInfo | Omit<EnumValueInfo, "localName">)[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _opt?: {
    // We do not surface options at this time
    // options?: { readonly [extensionName: string]: JsonValue };
  }
): EnumType {
  const names = Object.create(null) as Record<string, EnumValueInfo>;
  const numbers = Object.create(null) as Record<number, EnumValueInfo>;
  const normalValues: EnumValueInfo[] = [];
  for (const value of values) {
    // We do not surface options at this time
    // const value: EnumValueInfo = {...v, options: v.options ?? emptyReadonlyObject};
    const n = normalizeEnumValue(value);
    normalValues.push(n);
    names[value.name] = n;
    numbers[value.no] = n;
  }
  return {
    typeName,
    values: normalValues,
    // We do not surface options at this time
    // options: opt?.options ?? Object.create(null),
    findName(name: string): EnumValueInfo | undefined {
      return names[name];
    },
    findNumber(no: number): EnumValueInfo | undefined {
      return numbers[no];
    },
  };
}

/**
 * Create a new enum object with the given values.
 * Sets reflection information.
 */
export function makeEnum(
  typeName: string,
  values: (EnumValueInfo | Omit<EnumValueInfo, "localName">)[],
  opt?: {
    // We do not surface options at this time
    // options?: { readonly [extensionName: string]: JsonValue };
  }
): EnumObject {
  const enumObject: EnumObject = {};
  for (const value of values) {
    const n = normalizeEnumValue(value);
    enumObject[n.localName] = n.no;
    enumObject[n.no] = n.localName;
  }
  setEnumType(enumObject, typeName, values, opt);
  return enumObject;
}

function normalizeEnumValue(
  value: EnumValueInfo | Omit<EnumValueInfo, "localName">
): EnumValueInfo {
  if ("localName" in value) {
    return value;
  }
  return { ...value, localName: value.name };
}
