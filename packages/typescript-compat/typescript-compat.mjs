#!/usr/bin/env node

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

import { readdirSync } from "node:fs";
import { join as joinPath, basename } from "node:path";
import { execSync } from "node:child_process";
import { stdout, stderr, exit } from "node:process";

const typescriptCompatDir = new URL(".", import.meta.url).pathname;

const packages = readdirSync(typescriptCompatDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => joinPath(dirent.path, dirent.name));

for (const path of packages) {
  const name = basename(path);
  stdout.write(`${name} ... `);
  try {
    execSync("npm test", {
      cwd: path,
      maxBuffer: 1024 * 1024 * 10,
      encoding: "utf-8",
    });
    stdout.write(`OK\n`);
  } catch (e) {
    stdout.write(`FAILED\n`);
    if (typeof e.stderr === "string") {
      stderr.write(e.stderr);
    }
    if (typeof e.stdout === "string") {
      stdout.write(e.stdout);
    }
    exit(1);
  }
}
