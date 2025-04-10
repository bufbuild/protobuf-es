#!/usr/bin/env node

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

import { argv, exit, stderr, stdout } from "node:process";
import { UpstreamProtobuf } from "../index.mjs";

void main(argv.slice(2));

async function main(args) {
  /**
   * @typedef ProtoInclude
   * @property {string} dir
   * @property {string[]} files
   */

  const upstream = new UpstreamProtobuf();
  /** @type ProtoInclude */
  let protoInclude;
  switch (args[0]) {
    case "wkt":
      protoInclude = await upstream.getWktProtoInclude();
      break;
    case "conformance":
      protoInclude = await upstream.getConformanceProtoInclude();
      break;
    case "test":
      protoInclude = await upstream.getTestProtoInclude();
      break;
    default:
      return exitUsage();
  }
  stdout.write(protoInclude.files.join(" "));
}

/**
 * @return void
 */
function exitUsage() {
  stderr.write(`USAGE: upstream-files wkt|conformance|test\n`, () => exit(1));
}
