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

import type { ImportSymbol } from "./import-symbol.js";
import { createImportSymbol } from "./import-symbol.js";
import { symbols } from "@bufbuild/protobuf/next/codegenv1";

export type RuntimeImports = mapRecord<typeof symbols>;

export function createRuntimeImports(bootstrapWkt: boolean): RuntimeImports {
  return mapRecord(symbols, bootstrapWkt);
}

type mapRecord<T extends Record<string, unknown>> = {
  [P in keyof T]: T[P] extends symbolInfo
    ? ImportSymbol
    : T[P] extends Record<string, unknown>
      ? mapRecord<T[P]>
      : never;
};

function mapRecord<T extends Record<string, unknown>>(
  record: T,
  bootstrapWkt: boolean,
): mapRecord<T> {
  const result = Object.create(null) as Record<string, unknown>;
  for (const [key, value] of Object.entries(record)) {
    if (isSymbolInfo(value)) {
      result[key] = createImportSymbol(
        key,
        bootstrapWkt ? value.bootstrapWktFrom : value.from,
        value.typeOnly,
      );
    } else {
      result[key] = mapRecord(
        record[key] as Record<string, unknown>,
        bootstrapWkt,
      );
    }
  }
  return result as mapRecord<T>;
}

type symbolInfo = {
  readonly typeOnly: boolean;
  readonly from: string;
  readonly bootstrapWktFrom: string;
};

function isSymbolInfo(arg: unknown): arg is symbolInfo {
  if (typeof arg != "object" || arg === null) {
    return false;
  }
  const wantNames: (keyof symbolInfo)[] = [
    "typeOnly",
    "from",
    "bootstrapWktFrom",
  ];
  const gotNames = Object.getOwnPropertyNames(arg);
  if (gotNames.length !== wantNames.length) {
    return false;
  }
  return wantNames.every((w) => gotNames.includes(w));
}
