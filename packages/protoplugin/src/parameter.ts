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

import type { RewriteImports } from "./import-path.js";
import { PluginOptionError } from "./error.js";

/**
 * Represents possible values of the plugin option `target`.
 */
export type Target = "js" | "ts" | "dts";

/**
 * Possible values of the plugin option `import_extension`.
 */
export type ImportExtension = "none" | "js" | "ts";

/**
 * Standard plugin options that every ECMAScript plugin supports.
 */
export interface EcmaScriptPluginOptions {
  /**
   * Controls whether the plugin generates JavaScript, TypeScript,
   * or TypeScript declaration files.
   *
   * The default is ["js", "dts].
   */
  targets: Target[];
  /**
   * Add an extension to every import: "js" or "ts".
   *
   * The default is "none".
   */
  importExtension: ImportExtension;
  /**
   * Generate `import` statements or `require()` calls.
   *
   * The default is "module".
   */
  jsImportStyle: "module" | "legacy_commonjs";
  /**
   * Generate an annotation at the top of each file to skip type checks:
   * `// @ts-nocheck`.
   *
   * The default is false.
   */
  tsNocheck: boolean;
  /**
   * Prune empty files from the output.
   *
   * The default is false.
   */
  keepEmptyFiles: boolean;
  /**
   * @private
   */
  bootstrapWkt: boolean;
  /**
   * @private
   */
  rewriteImports: RewriteImports;
}

export interface ParsedParameter<T> {
  parsed: T & EcmaScriptPluginOptions;
  sanitized: string;
}

export function parseParameter<T extends object>(
  parameter: string,
  parseExtraOptions:
    | ((
        rawOptions: {
          key: string;
          value: string;
        }[],
      ) => T)
    | undefined,
): ParsedParameter<T> {
  let targets: Target[] = ["js", "dts"];
  let tsNocheck = false;
  let bootstrapWkt = false;
  let keepEmptyFiles = false;
  const rewriteImports: RewriteImports = [];
  let importExtension: ImportExtension = "none";
  let jsImportStyle: "module" | "legacy_commonjs" = "module";
  const extraParameters: {
    key: string;
    value: string;
  }[] = [];
  const extraParametersRaw: string[] = [];
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
        const i = value.indexOf(":");
        if (i < 0) {
          throw new PluginOptionError(
            raw,
            "must be in the form of <pattern>:<target>",
          );
        }
        rewriteImports.push({
          pattern: value.substring(0, i),
          target: value.substring(i + 1),
        });
        // rewrite_imports can be noisy and is more of an implementation detail
        // so we strip it out of the preamble
        sanitize = true;
        break;
      }
      case "import_extension": {
        switch (value) {
          case "none":
          case "":
            importExtension = "none";
            break;
          case "js":
          case ".js":
            importExtension = "js";
            break;
          case "ts":
          case ".ts":
            importExtension = "ts";
            break;
          default:
            throw new PluginOptionError(raw);
        }
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
        if (parseExtraOptions === undefined) {
          throw new PluginOptionError(raw);
        }
        extraParameters.push({ key, value });
        extraParametersRaw.push(raw);
        break;
    }
    if (!sanitize) {
      rawParameters.push(raw);
    }
  }
  const sanitizedParameters = rawParameters.join(",");
  const ecmaScriptPluginOptions = {
    targets,
    tsNocheck,
    bootstrapWkt,
    rewriteImports,
    importExtension,
    jsImportStyle,
    keepEmptyFiles,
  };
  if (parseExtraOptions === undefined || extraParameters.length === 0) {
    return {
      parsed: ecmaScriptPluginOptions as T & EcmaScriptPluginOptions,
      sanitized: sanitizedParameters,
    };
  }
  try {
    return {
      parsed: Object.assign(
        ecmaScriptPluginOptions,
        parseExtraOptions(extraParameters),
      ),
      sanitized: sanitizedParameters,
    };
  } catch (err) {
    throw new PluginOptionError(extraParametersRaw.join(","), err);
  }
}

function splitParameter(
  parameter: string,
): { key: string; value: string; raw: string }[] {
  if (parameter.length == 0) {
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
