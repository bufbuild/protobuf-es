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
import { Schema, createSchema } from "./ecmascript/schema.js";
import { CodeGeneratorResponse } from "@bufbuild/protobuf";
import type { Plugin } from "./plugin.js";
import { PluginOptionError } from "./error.js";
import type { RewriteImports } from "./ecmascript/import-path.js";

export type TranspileFn = (
  schema: Schema,
  transpileJs: boolean,
  transpileDts: boolean
) => void;

interface PluginInit {
  /**
   * Name of this code generator plugin.
   */
  name: string;

  /**
   * Version of this code generator plugin.
   */
  version: string;

  parseOption?: PluginOptionParseFn;

  // A TypeScript generator is required
  generateTs: (schema: Schema, target: "ts") => void;
  generateJs?: (schema: Schema, target: "js") => void;
  generateDts?: (schema: Schema, target: "dts") => void;

  transpile?: TranspileFn;
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
      const { targets, tsNocheck, bootstrapWkt, rewriteImports } =
        parseParameter(req.parameter, init.parseOption);
      const { schema, toResponse } = createSchema(
        req,
        targets,
        init.name,
        init.version,
        tsNocheck,
        bootstrapWkt,
        rewriteImports
      );

      if (schema.targets.includes("ts")) {
        init.generateTs(schema, "ts");
      }

      if (schema.targets.includes("js")) {
        if (init.generateJs) {
          init.generateJs(schema, "js");
        } else {
          transpileJs = true;
        }
      }

      if (schema.targets.includes("dts")) {
        if (init.generateDts) {
          init.generateDts(schema, "dts");
        } else {
          transpileDts = true;
        }
      }

      if ((transpileJs || transpileDts) && init.transpile) {
        init.transpile(schema, transpileJs, transpileDts);
      } else {
        // This should be an error
      }

      const res = new CodeGeneratorResponse();
      toResponse(res);
      return res;
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
  const rewriteImports: RewriteImports = [];
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
  return { targets, tsNocheck, bootstrapWkt, rewriteImports };
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
