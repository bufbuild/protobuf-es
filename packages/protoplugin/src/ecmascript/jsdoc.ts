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

import type { AnyDesc, DescFile } from "@bufbuild/protobuf";
import { getComments, getDeclarationString } from "../source-code-info.js";

export function createJsDocTextFromDesc(desc: Exclude<AnyDesc, DescFile>) {
  const comments = getComments(desc);
  let text = "";
  if (comments.leading !== undefined) {
    text += comments.leading;
    if (text.endsWith("\n")) {
      text = text.substring(0, text.length - 1);
    }
  }
  if (comments.trailing !== undefined) {
    if (text.length > 0) {
      text += "\n\n";
    }
    text += comments.trailing;
    if (text.endsWith("\n")) {
      text = text.substring(0, text.length - 1);
    }
  }
  if (text.length > 0) {
    text += "\n\n";
  }
  text = text
    .split("\n")
    .map((line) => (line.startsWith(" ") ? line.substring(1) : line))
    .join("\n");
  switch (desc.kind) {
    case "enum_value":
      text += `@generated from enum value: ${getDeclarationString(desc)};`;
      break;
    case "field":
      text += `@generated from field: ${getDeclarationString(desc)};`;
      break;
    case "extension":
      text += `@generated from extension: ${getDeclarationString(desc)};`;
      break;
    default:
      text += `@generated from ${desc.toString()}`;
      break;
  }
  let deprecated = desc.deprecated;
  switch (desc.kind) {
    case "enum":
    case "message":
    case "service":
      deprecated = deprecated || desc.file.deprecated;
      break;
    default:
      break;
  }
  if (deprecated) {
    text += "\n@deprecated";
  }
  return text;
}

export function formatJsDocBlock(
  text: string,
  indentation: string | undefined,
): string {
  if (text.trim().length == 0) {
    return "";
  }
  let lines = text.split("\n");
  if (lines.length === 0) {
    return "";
  }
  lines = lines.map((l) => l.split("*/").join("*\\/"));
  lines = lines.map((l) => (l.length > 0 ? " " + l : l));
  const i = indentation ?? "";
  return [`${i}/**\n`, ...lines.map((l) => `${i} *${l}\n`), `${i} */`].join("");
}
