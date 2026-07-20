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

// Runs the corpus under tinybench and prints a per-operation table.
//
//   npm run bench                      # the whole corpus
//   npm run bench -- '^BinaryWriter/'  # only the BinaryWriter cases
//   npm run bench -- int32             # every case whose name contains "int32"
//
// Any arguments are treated as regular expressions, OR'd together. No
// arguments runs everything.
//
// Each case's run() does `ops` operations (OPS_PER_RUN for the batched wire
// primitives, one for the message cases); we divide the per-run latency by `ops`
// to report per-operation numbers.

import { Bench } from "tinybench";
import { cases, select } from "./corpus.js";

const patterns = process.argv.slice(2);
const selected = select(patterns);
if (selected.length === 0) {
  const quoted = patterns.map((pattern) => JSON.stringify(pattern)).join(", ");
  console.error(`no cases match: ${quoted}`);
  process.exit(1);
}

const bench = new Bench({ name: "protobuf-es", time: 1000 });
for (const [name, { run }] of selected) {
  bench.add(name, run);
}

bench.runSync();

console.log(`@bufbuild/protobuf, ${process.version}`);
console.table(
  bench.table((task) => {
    const latency = task.result?.latency;
    const ops = cases[task.name].ops;
    return {
      Task: task.name,
      "ns/op": latency && Number(((latency.mean * 1e6) / ops).toFixed(2)),
      "ops/s": latency && Math.round((ops * 1000) / latency.mean),
      "rme %": latency && Number(latency.rme.toFixed(2)),
      samples: latency?.samples.length,
    };
  }),
);
