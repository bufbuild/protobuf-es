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

import {
  AnyDesc,
  codegenInfo,
  DescExtension,
  DescFile,
} from "@bufbuild/protobuf";
import { Printable } from "./generated-file.js";
import { createJsDocBlock as createJsDocBlockV2 } from "./jsdoc.js";
import { literalString as literalStringInternal } from "./gencommon.js";

export { reifyWkt } from "./reify-wkt.js";
export type { Target } from "./target.js";
export type { Schema } from "./schema.js";
export type { RuntimeImports } from "./runtime-imports.js";
export type { GeneratedFile, FileInfo, Printable } from "./generated-file.js";
export type { ImportSymbol } from "./import-symbol.js";

export const { localName } = codegenInfo;

export {
  getFieldExplicitDefaultValue,
  getFieldIntrinsicDefaultValue,
  getFieldTyping,
} from "./gencommon.js";

export {
  findCustomScalarOption,
  findCustomMessageOption,
  findCustomEnumOption,
} from "./custom-options.js";

/**
 * @deprecated Please use GeneratedFile.string() instead
 */
export function literalString(value: string): string {
  return literalStringInternal(value);
}

/**
 * @deprecated Please use GeneratedFile.jsDoc() instead
 */
export function makeJsDoc(
  desc: Exclude<AnyDesc, DescFile | DescExtension>,
  indentation = "",
): Printable {
  return createJsDocBlockV2(desc, indentation).toString();
}

/**
 * @deprecated Please use GeneratedFile.jsDoc() instead
 */
export function createJsDocBlock(text: string, indentation = ""): Printable {
  return createJsDocBlockV2(text, indentation).toString();
}
