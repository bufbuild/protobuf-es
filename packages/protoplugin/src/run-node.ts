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

import type { Plugin } from "./plugin.js";
import type { ReadStream, WriteStream } from "tty";
import { CodeGeneratorRequest } from "@bufbuild/protobuf";
import { PluginOptionError, reasonToString } from "./error.js";

/**
 * Run a plugin with Node.js.
 *
 * ```
 * #!/usr/bin/env node
 * const {runNodeJs} = require("@bufbuild/protoplugin");
 * const {myPlugin} = require("./protoc-gen-x-plugin.js");
 * runNodeJs(myPlugin);
 * ```
 */
export function runNodeJs(plugin: Plugin): void {
  const args = process.argv.slice(2);
  if ((args.length === 1 && args[0] === "-v") || args[0] === "--version") {
    process.stdout.write(`${plugin.name} ${plugin.version}\n`);
    process.exit(0);
    return;
  }
  if (args.length !== 0) {
    process.stderr.write(
      `${plugin.name} accepts a google.protobuf.compiler.CodeGeneratorRequest on stdin and writes a CodeGeneratorResponse to stdout\n`
    );
    process.exit(1);
    return;
  }
  readBytes(process.stdin)
    .then((data) => {
      const req = CodeGeneratorRequest.fromBinary(data);
      const res = plugin.run(req);
      return writeBytes(process.stdout, res.toBinary());
    })
    .then(() => process.exit(0))
    .catch((reason) => {
      const message =
        reason instanceof PluginOptionError
          ? reason.message
          : reasonToString(reason);
      process.stderr.write(`${plugin.name}: ${message}\n`);
      process.exit(1);
      return;
    });
}

/**
 * Read a stream to the end.
 */
function readBytes(stream: ReadStream): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    stream.on("error", (err) => {
      reject(err);
    });
  });
}

/**
 * Write a chunk of bytes to a stream.
 */
function writeBytes(stream: WriteStream, data: Uint8Array): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    stream.write(data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
