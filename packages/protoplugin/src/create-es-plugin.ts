// Copyright 2021-2026 Buf Technologies, Inc.
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

import { create, protoInt64 } from "@bufbuild/protobuf";
import {
  type SupportedEdition,
  minimumEdition as minimumEditionUpstream,
  maximumEdition as maximumEditionUpstream,
} from "@bufbuild/protobuf";
import type { CodeGeneratorResponse } from "@bufbuild/protobuf/wkt";
import {
  CodeGeneratorResponse_Feature,
  CodeGeneratorResponseSchema,
} from "@bufbuild/protobuf/wkt";
import { createSchema } from "./schema.js";
import type { Schema } from "./schema.js";
import type { FileInfo } from "./generated-file.js";
import type { Plugin } from "./plugin.js";
import { transpile } from "./transpile.js";
import { parseParameter } from "./parameter.js";

interface PluginInit<Options extends object> {
  /**
   * Name of this code generator plugin.
   */
  name: string;

  /**
   * Version of this code generator plugin.
   */
  version: string;

  /**
   * An optional parsing function which can be used to parse your own plugin
   * options.
   *
   * For example, if a plugin is run with the options foo=123,bar,baz=a,baz=b
   * the raw options are:
   *
   * ```ts
   * [
   *   { key: "foo", value: "123" },
   *   { key: "bar", value: "" },
   *   { key: "baz", value: "a" },
   *   { key: "baz", value: "b" },
   * ]
   * ```
   *
   * If your plugin does not recognize an option, it must throw an Error in
   * parseOptions.
   */
  parseOptions?: (
    rawOptions: {
      key: string;
      value: string;
    }[],
  ) => Options;

  /**
   * The earliest edition supported by this plugin. Defaults to the minimum
   * edition supported by @bufbuild/protobuf.
   */
  minimumEdition?: SupportedEdition;

  /**
   * The latest edition supported by this plugin. Defaults to the maximum
   * edition supported by @bufbuild/protobuf.
   */
  maximumEdition?: SupportedEdition;

  /**
   * A function which will generate TypeScript files based on proto input.
   * This function will be invoked by the plugin framework when the plugin runs.
   *
   * Note that this is required to be provided for plugin initialization.
   */
  generateTs: (schema: Schema<Options>, target: "ts") => void;

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
  generateJs?: (schema: Schema<Options>, target: "js") => void;

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
  generateDts?: (schema: Schema<Options>, target: "dts") => void;

  /**
   * An optional function which will transpile a given set of files.
   *
   * This function is meant to be used in place of either generateJs,
   * generateDts, or both.  However, those functions will take precedence.
   * This means that if generateJs, generateDts, and this transpile function
   * are all provided, this transpile function will be ignored.
   *
   * If jsImportStyle is "module" (the standard behavior), the function is
   * expected to use ECMAScript module import and export statements when
   * transpiling to JS. If jsImportStyle is "legacy_commonjs", the function is
   * expected to use CommonJs require() and exports when transpiling to JS.
   */
  transpile?: (
    files: FileInfo[],
    transpileJs: boolean,
    transpileDts: boolean,
    jsImportStyle: "module" | "legacy_commonjs",
  ) => FileInfo[];
}

/**
 * Create a new code generator plugin for ECMAScript.
 * The plugin can generate JavaScript, TypeScript, or TypeScript declaration
 * files.
 */
export function createEcmaScriptPlugin<Options extends object = object>(
  init: PluginInit<Options>,
): Plugin {
  let transpileJs = false;
  let transpileDts = false;
  return {
    name: init.name,
    version: init.version,
    run(req) {
      const minimumEdition = init.minimumEdition ?? minimumEditionUpstream;
      const maximumEdition = init.maximumEdition ?? maximumEditionUpstream;
      const parameter = parseParameter(req.parameter, init.parseOptions);
      const schema = createSchema(
        req,
        parameter,
        init.name,
        parameter.parsed.elidePluginVersion ? undefined : init.version,
        minimumEdition,
        maximumEdition,
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
        schema.prepareGenerate("ts");
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
        tsFiles = schema.getFileInfo();
      }

      if (targetJs) {
        if (init.generateJs) {
          schema.prepareGenerate("js");
          init.generateJs(schema, "js");
        } else {
          transpileJs = true;
        }
      }

      if (targetDts) {
        if (init.generateDts) {
          schema.prepareGenerate("dts");
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
      let files = schema.getFileInfo();
      if (!targetTs && tsFiles.length > 0) {
        files = files.filter(
          (file) => !tsFiles.some((tsFile) => tsFile.name === file.name),
        );
      }

      // If either boolean is true, it means it was specified in the target out
      // but no generate function was provided.  This also means that we will
      // have generated .ts files above.
      if (transpileJs || transpileDts) {
        const transpileFn = init.transpile ?? transpile;
        // Transpile the TypeScript files and add to the master list of files
        const transpiledFiles = transpileFn(
          tsFiles,
          transpileJs,
          transpileDts,
          parameter.parsed.jsImportStyle,
        );
        files.push(...transpiledFiles);
      }

      return toResponse(files, minimumEdition, maximumEdition);
    },
  };
}

function toResponse(
  files: FileInfo[],
  minimumEdition: SupportedEdition,
  maximumEdition: SupportedEdition,
): CodeGeneratorResponse {
  return create(CodeGeneratorResponseSchema, {
    supportedFeatures: protoInt64.parse(
      CodeGeneratorResponse_Feature.PROTO3_OPTIONAL |
        CodeGeneratorResponse_Feature.SUPPORTS_EDITIONS,
    ),
    minimumEdition,
    maximumEdition,
    file: files.map((f) => {
      if (f.preamble !== undefined) {
        f.content = f.preamble + "\n" + f.content;
      }
      return f;
    }),
  });
}
