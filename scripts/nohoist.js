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

import {
  readFileSync,
  renameSync,
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  rmSync,
} from "node:fs";
import path from "node:path";

const check = process.argv.length === 3 && process.argv[2] === "--check";
if (process.argv.length !== 2 && !check) {
  process.stderr.write(
    [
      `USAGE: ${process.argv[1]} [--check]`,
      "",
      "Checks package-lock.json for hoisted packages that must not be hoisted,",
      "and moves them to their expected location.",
      "",
      "With the --check flag, this script prints an error message and returns" +
        "with a non-zero exit code, but does not move packages.",
    ].join("\n"),
  );
  process.exit(1);
}

const doNotHoist = {
  // see packages/protoplugin/src/transpile.ts
  "node_modules/@typescript/vfs":
    "packages/protoplugin/node_modules/@typescript/vfs",
  // Isolate @types/bun
  "node_modules/@types/bun": "bun/conformance/node_modules/@types/bun",
};
const lockFilePath = "package-lock.json";
const lockFile = readLockfile(lockFilePath);
const updates = [];
for (const [from, to] of Object.entries(doNotHoist)) {
  if (typeof lockFile.packages[from] == "object") {
    updates.push(from);
    lockFile.packages[to] = lockFile.packages[from];
    delete lockFile.packages[from];
    if (!check && existsSync(from)) {
      moveFiles(from, to);
    }
  }
}
if (updates.length > 0) {
  if (check) {
    console.error(`Detected hoisted packages:`);
    for (const k of updates) {
      console.error(`- ${k}`);
    }
    console.error(`Run node src/nohoist.js to fix`);
    process.exit(1);
  } else {
    console.error(`Moved hoisted packages:`);
    for (const k of updates) {
      console.error(`- ${k}`);
    }
    writeJson(lockFilePath, lockFile);
  }
}

/**
 * @param {string} path
 * @return {{packages: Record<string, object>}}
 */
function readLockfile(path) {
  const lock = JSON.parse(readFileSync(path, "utf-8"));
  if (typeof lock !== "object" || lock === null) {
    throw new Error(`Failed to parse ${path}`);
  }
  if (!("lockfileVersion" in lock) || lock.lockfileVersion !== 3) {
    throw new Error(`Unsupported lock file version in ${path}`);
  }
  if (typeof lock.packages != "object" || lock.packages == null) {
    throw new Error(`Missing "packages" in ${path}`);
  }
  return lock;
}

/**
 * @param {string} path
 * @param {any} json
 */
function writeJson(path, json) {
  writeFileSync(path, JSON.stringify(json, null, 2) + "\n");
}

/**
 * @param {string} sourceDir
 * @param {string} targetDir
 */
function moveFiles(sourceDir, targetDir) {
  for (const ent of readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, ent.name);
    const targetPath = path.join(targetDir, ent.name);
    if (ent.isDirectory()) {
      moveFiles(sourcePath, targetPath);
      rmSync(sourcePath, { recursive: true });
    } else {
      if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
      }
      renameSync(sourcePath, targetPath);
    }
  }
}
