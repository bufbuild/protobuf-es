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

// Runs ONE case in a tight loop, in its own process. The `profile` script runs
// this under Node's CPU profiler, writing a .cpuprofile to open in speedscope.
// See --help for usage.

import { parseArgs } from "node:util";
import { cases } from "./corpus.js";

const usage = `USAGE: npm run profile -- <case-name> [durationMs]

Run a case in a tight loop under Node's CPU profiler (the npm script adds
--cpu-prof), writing a .cpuprofile to .cpuprof/ to open in speedscope.

  npm run profile -- BinaryWriter/int32          # default duration (5s)
  npm run profile -- BinaryWriter/int32 10000    # run for 10s

Options:
  -h, --help   Print this help (with the list of case names) and exit.
`;

const { values, positionals } = parseArgs({
  options: { help: { type: "boolean", short: "h" } },
  allowPositionals: true,
});
if (values.help) {
  console.log(usage);
  console.log("cases:");
  for (const caseName of Object.keys(cases)) {
    console.log(`  ${caseName}`);
  }
  process.exit(0);
}

const [name, countArg] = positionals;
if (name === undefined) {
  console.error(usage);
  process.exit(2);
}

const testCase = cases[name];
if (testCase === undefined) {
  console.error(`unknown case: ${name}`);
  process.exit(1);
}
const { ops: opsPerRun, run } = testCase;

// Time-bounded, not count-bounded: cases span ~100x in speed, so run for a fixed
// wall time to give the profiler a consistent sample regardless of which case it is.
const durationMs = countArg === undefined ? 5000 : Number(countArg);
if (!Number.isFinite(durationMs) || durationMs <= 0) {
  console.error(`invalid duration (ms): ${countArg}`);
  process.exit(1);
}

let calls = 0;
const start = process.hrtime.bigint();
const deadline = start + BigInt(Math.round(durationMs)) * BigInt(1_000_000);
while (process.hrtime.bigint() < deadline) {
  run();
  calls++;
}
const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
const ops = calls * opsPerRun;

console.log(
  `${name}: ${ops} ops in ${elapsedMs.toFixed(1)}ms ` +
    `(${((ops / elapsedMs) * 1000).toFixed(0)} ops/s)`,
);
