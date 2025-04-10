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

import { execFileSync } from "node:child_process";
import { argv, exit, stderr } from "node:process";
import { UpstreamProtobuf } from "../index.mjs";

const upstream = new UpstreamProtobuf();

upstream
  .getConformanceTestRunnerPath()
  .then((path) => {
    execFileSync(path, argv.slice(2), {
      shell: false,
      stdio: "inherit",
      maxBuffer: 1024 * 1024 * 100,
    });
  })
  .catch((reason) => {
    stderr.write(String(reason) + "\n", () => exit(1));
  });
