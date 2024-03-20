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

import type { Target } from "./target.js";
import type { RewriteImports } from "./import-path.js";
import { PluginOptionError } from "../error.js";

export interface ParsedParameter {
  targets: Target[];
  tsNocheck: boolean;
  bootstrapWkt: boolean;
  keepEmptyFiles: boolean;
  rewriteImports: RewriteImports;
  importExtension: string;
  jsImportStyle: "module" | "legacy_commonjs";
  sanitizedParameter: string;
}

export function parseParameter(
  parameter: string | undefined,
  parseExtraOption: ((key: string, value: string) => void) | undefined,
): ParsedParameter {
  let targets: Target[] = ["js", "dts"];
  let tsNocheck = true;
  let bootstrapWkt = false;
  let keepEmptyFiles = false;
  const rewriteImports: RewriteImports = [];
  let importExtension = ".js";
  let jsImportStyle: "module" | "legacy_commonjs" = "module";
  const rawParameters: string[] = [];
  for (const { key, value, raw } of splitParameter(parameter)) {
    // Whether this key/value plugin parameter pair should be
    // printed to the generated file preamble
    let sanitize = false;
    switch (key) {
      case "target":
        targets = [];
        for (const rawTarget of value.split("+")) {
          switch (rawTarget) {
            case "js":
            case "ts":
            case "dts":
              if (targets.indexOf(rawTarget) < 0) {
                targets.push(rawTarget);
              }
              break;
            default:
              throw new PluginOptionError(raw);
          }
        }
        value.split("+");
        break;
      case "ts_nocheck":
        switch (value) {
          case "true":
          case "1":
            tsNocheck = true;
            break;
          case "false":
          case "0":
            tsNocheck = false;
            break;
          default:
            throw new PluginOptionError(raw);
        }
        break;
      case "bootstrap_wkt":
        switch (value) {
          case "true":
          case "1":
            bootstrapWkt = true;
            break;
          case "false":
          case "0":
            bootstrapWkt = false;
            break;
          default:
            throw new PluginOptionError(raw);
        }
        break;
      case "rewrite_imports": {
        const parts = value.split(":");
        if (parts.length !== 2) {
          throw new PluginOptionError(
            raw,
            "must be in the form of <pattern>:<target>",
          );
        }
        const [pattern, target] = parts;
        rewriteImports.push({ pattern, target });
        // rewrite_imports can be noisy and is more of an implementation detail
        // so we strip it out of the preamble
        sanitize = true;
        break;
      }
      case "import_extension": {
        importExtension = value === "none" ? "" : value;
        break;
      }
      case "js_import_style":
        switch (value) {
          case "module":
            jsImportStyle = value;
            break;
          case "legacy_commonjs":
            jsImportStyle = value;
            break;
          default:
            throw new PluginOptionError(raw);
        }
        break;
      case "keep_empty_files": {
        switch (value) {
          case "true":
          case "1":
            keepEmptyFiles = true;
            break;
          case "false":
          case "0":
            keepEmptyFiles = false;
            break;
          default:
            throw new PluginOptionError(raw);
        }
        break;
      }
      default:
        if (parseExtraOption === undefined) {
          throw new PluginOptionError(raw);
        }
        try {
          parseExtraOption(key, value);
        } catch (e) {
          throw new PluginOptionError(raw, e);
        }
        break;
    }
    if (!sanitize) {
      rawParameters.push(raw);
    }
  }

  const sanitizedParameter = rawParameters.join(",");

  return {
    targets,
    tsNocheck,
    bootstrapWkt,
    rewriteImports,
    importExtension,
    jsImportStyle,
    keepEmptyFiles,
    sanitizedParameter,
  };
}

function splitParameter(
  parameter: string | undefined,
): { key: string; value: string; raw: string }[] {
  if (parameter == undefined) {
    return [];
  }
  return parameter.split(",").map((raw) => {
    const i = raw.indexOf("=");
    return {
      key: i === -1 ? raw : raw.substring(0, i),
      value: i === -1 ? "" : raw.substring(i + 1),
      raw,
    };
  });
}
