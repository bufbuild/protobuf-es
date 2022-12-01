// Copyright 2021-2022 Buf Technologies, Inc.
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

import type { Target } from "./ecmascript";
import { createSchema, Schema, toResponse } from "./ecmascript/schema.js";
import type { FileInfo } from "./ecmascript/generated-file.js";
import type { Plugin } from "./plugin.js";
import { transpile } from "./ecmascript/transpile.js";
import { PluginOptionError } from "./error.js";
import type { RewriteImports } from "./ecmascript/import-path.js";

interface PluginInit {
  /**
   * Name of this code generator plugin.
   */
  name: string;

  /**
   * Version of this code generator plugin.
   */
  version: string;

  /**
   * A optional parsing function which can be used to customize parameter
   * parsing of the plugin.
   */
  parseOption?: PluginOptionParseFn;

  /**
   * A function which will generate TypeScript files based on proto input.
   * This function will be invoked by the plugin framework when the plugin runs.
   *
   * Note that this is required to be provided for plugin initialization.
   */
  generateTs: (schema: Schema, target: "ts") => void;

  /**
   * A optional function which will generate JavaScript files based on proto
   * input.  This function will be invoked by the  plugin framework when the
   * plugin runs.
   *
   * If this function is not provided, the plugin framework will then check if
   * a transpile function is provided.  If so, it will be invoked to transpile
   * JavaScript files.  If not, the plugin framework will transpile the files
   * itself.
   */
  generateJs?: (schema: Schema, target: "js") => void;

  /**
   * A optional function which will generate TypeScript declaration files
   * based on proto input.  This function will be invoked by the plugin
   * framework when the plugin runs.
   *
   * If this function is not provided, the plugin framework will then check if
   * a transpile function is provided.  If so, it will be invoked to transpile
   * declaration files.  If not, the plugin framework will transpile the files
   * itself.
   */
  generateDts?: (schema: Schema, target: "dts") => void;

  /**
   * A optional function which will transpile a given set of files.
   *
   * This funcion is meant to be used in place of either generateJs,
   * generateDts, or both.  However, those functions will take precedence.
   * This means that if generateJs, generateDts, and this transpile function
   * are all provided, this transpile function will be ignored.
   */
  transpile?: (
    files: FileInfo[],
    transpileJs: boolean,
    transpileDts: boolean
  ) => FileInfo[];
}

type PluginOptionParseFn = (key: string, value: string | undefined) => void;

/**
 * Create a new code generator plugin for ECMAScript.
 * The plugin can generate JavaScript, TypeScript, or TypeScript declaration
 * files.
 */
export function createEcmaScriptPlugin(init: PluginInit): Plugin {
  let transpileJs = false;
  let transpileDts = false;
  return {
    name: init.name,
    version: init.version,
    run(req) {
      const {
        targets,
        tsNocheck,
        bootstrapWkt,
        rewriteImports,
        importExtension,
        keepEmptyFiles,
      } = parseParameter(req.parameter, init.parseOption);
      const { schema, getFileInfo } = createSchema(
        req,
        targets,
        init.name,
        init.version,
        tsNocheck,
        bootstrapWkt,
        rewriteImports,
        importExtension,
        keepEmptyFiles
      );

      const targetTs = schema.targets.includes("ts");
      const targetJs = schema.targets.includes("js");
      const targetDts = schema.targets.includes("dts");

      // Generate TS files under the following conditions:
      // - if they are explicitly specified as a target.
      // - if js is specified as a target but no js generator is provided.
      // - if dts is specified as a target, but no dts generator is provided.
      // In the latter two cases, it is because we need the generated TS files
      // to use for transpiling js and/or dts.
      let tsFiles: FileInfo[] = [];
      if (
        targetTs ||
        (targetJs && !init.generateJs) ||
        (targetDts && !init.generateDts)
      ) {
        init.generateTs(schema, "ts");

        // Save off the generated TypeScript files so that we can pass these
        // to the transpilation process if necessary.  We do not want to pass
        // JavaScript files for a few reasons:
        // 1.  Our usage of allowJs in the compiler options will cause issues
        // with attempting to transpile .ts and .js files to the same location.
        // 2.  There should be no reason to transpile JS because generateTs
        // functions are required, so users would never be able to only specify
        // a generateJs function and expect to transpile declarations.
        // 3.  Transpiling is somewhat expensive and situations with an
        // extremely large amount of files could have performance impacts.
        tsFiles = getFileInfo();
      }

      if (targetJs) {
        if (init.generateJs) {
          init.generateJs(schema, "js");
        } else {
          transpileJs = true;
        }
      }

      if (targetDts) {
        if (init.generateDts) {
          init.generateDts(schema, "dts");
        } else {
          transpileDts = true;
        }
      }

      // Get generated files.  If ts was specified as a target, then we want
      // all generated files.  If ts was not specified, we still may have
      // generated TypeScript files to assist in transpilation.  If they were
      // generated but not specified in the target out, we shouldn't produce
      // these files in the CodeGeneratorResponse.
      let files = getFileInfo();
      if (!targetTs && tsFiles.length > 0) {
        files = files.filter(
          (file) => !tsFiles.some((tsFile) => tsFile.name === file.name)
        );
      }

      // If either boolean is true, it means it was specified in the target out
      // but no generate function was provided.  This also means that we will
      // have generated .ts files above.
      if (transpileJs || transpileDts) {
        const transpileFn = init.transpile ?? transpile;
        // Transpile the TypeScript files and add to the master list of files
        const transpiledFiles = transpileFn(tsFiles, transpileJs, transpileDts);
        files.push(...transpiledFiles);
      }

      return toResponse(files);
    },
  };
}

function parseParameter(
  parameter: string | undefined,
  parseOption: PluginOptionParseFn | undefined
) {
  let targets: Target[] = ["js", "dts"];
  let tsNocheck = true;
  let bootstrapWkt = false;
  let keepEmptyFiles = false;
  const rewriteImports: RewriteImports = [];
  let importExtension = ".js";
  for (const { key, value } of splitParameter(parameter)) {
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
              throw new PluginOptionError(`${key}=${value}`);
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
            throw new PluginOptionError(`${key}=${value}`);
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
            throw new PluginOptionError(`${key}=${value}`);
        }
        break;
      case "rewrite_imports": {
        const parts = value.split(":");
        if (parts.length !== 2) {
          throw new PluginOptionError(
            `${key}=${value}`,
            "must be in the form of <pattern>:<target>"
          );
        }
        const [pattern, target] = parts;
        rewriteImports.push({ pattern, target });
        break;
      }
      case "import_extension": {
        importExtension = value === "none" ? "" : value;
        break;
      }
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
            throw new PluginOptionError(`${key}=${value}`);
        }
        break;
      }
      default:
        if (parseOption === undefined) {
          throw new PluginOptionError(`${key}=${value}`);
        }
        try {
          parseOption(key, value);
        } catch (e) {
          throw new PluginOptionError(`${key}=${value}`, e);
        }
        break;
    }
  }
  return {
    targets,
    tsNocheck,
    bootstrapWkt,
    rewriteImports,
    importExtension,
    keepEmptyFiles,
  };
}

function splitParameter(
  parameter: string | undefined
): { key: string; value: string }[] {
  if (parameter == undefined) {
    return [];
  }
  return parameter.split(",").map((pair) => {
    const i = pair.indexOf("=");
    return {
      key: i === -1 ? pair : pair.substring(0, i),
      value: i === -1 ? "" : pair.substring(i + 1),
    };
  });
}
