# @bufbuild/protobuf-bench

Benchmarks for `@bufbuild/protobuf`, in two layers:

- **`BinaryWriter/*`, `BinaryReader/*`** — wire primitives, the ns-scale
  encode/decode hot paths every message operation is built on. Each runs many
  operations against a reused writer/reader so the per-sample overhead is
  batched away.
- **`toBinary/*`, `fromBinary/*`, `toJson/*`, `fromJson/*`** — whole-message
  operations over a fixture (`general`, `scalar`, `repeated-*`, `map-*`, …), one
  operation per sample.

## Run it

The benchmarks import `@bufbuild/protobuf`, which resolves to its built output,
so build the runtime once from the repo root:

```sh
npm ci
npx turbo build -F @bufbuild/protobuf
```

Then, from this package:

```sh
npm run bench                      # the whole corpus
npm run bench -- '^BinaryWriter/'  # only the BinaryWriter primitives
npm run bench -- '^toBinary/'      # only toBinary, across all fixtures
npm run bench -- '/general$'       # all four ops on the general fixture
npm run bench -- int32             # every case whose name contains "int32"
```

Arguments are regular expressions matched against case names (unanchored, OR'd
together; anchor with `^…$` for an exact match). It prints a per-operation
latency/throughput table via [tinybench](https://github.com/tinylibs/tinybench).
(The `BinaryWriter/*` / `BinaryReader/*` cases batch many ops per run to measure
nanosecond ops accurately; the table divides that back down to per-op.)

## Profiling

To find the hot frames in a single case, profile it in its own process (one case
per process, so the JIT isn't warmed by other cases' shared code paths):

```sh
npm run profile -- toBinary/general       # default duration
npm run profile -- toBinary/general 10000 # run for 10s
```

This runs the case in a tight loop under Node's built-in CPU profiler
(`--cpu-prof`) and writes a `.cpuprofile` to `.cpuprof/`. Open the newest file in
[speedscope](https://www.speedscope.app) — a client-side viewer, no install
needed — for an interactive flamegraph.

The iterate loop for a perf change is: `profile` the case to find the hot frame,
change the library, `bench` the case to confirm the improvement.

## Fixtures

Message fixtures are populated deterministically from their schema by
`src/fixtures.ts` (a seeded PRNG walks the descriptor and fills every field), so
adding a fixture is just adding a message to the proto and one `messageCases(…)`
line in `corpus.ts`. To change the schema, edit `proto/bench/v1/bench.proto` and
regenerate:

```sh
npm run generate
```

## Resources

- [Profiling Node.js Applications](https://nodejs.org/learn/getting-started/profiling)
- [Flame Graphs](https://nodejs.org/learn/diagnostics/flame-graphs)
- [Node.js Performance Measurement APIs](https://nodejs.org/docs/latest/api/perf_hooks.html)
- [JavaScript Engine Fundamentals: Shapes and Inline Caches](https://mathiasbynens.be/notes/shapes-ics)
- [Fast Properties in V8](https://v8.dev/blog/fast-properties)
- [Elements Kinds in V8](https://v8.dev/blog/elements-kinds)
- [Maglev: V8's Fastest Optimizing JIT](https://v8.dev/blog/maglev)
- [V8 Function Optimization](https://erdem.pl/2019/08/v-8-function-optimization)
- [`deoptimize-reason.h`](https://github.com/v8/v8/blob/f12fe3b141d3b7a5c96793a820cdc578a63e0c01/src/deoptimizer/deoptimize-reason.h)
- [Overhead of Deoptimization Checks in the V8 JavaScript Engine](https://masc.soe.ucsc.edu/docs/iiswc16.pdf)
