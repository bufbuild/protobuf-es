# AGENTS.md

## Repository rules

- Discuss new exported APIs and generator options in an issue before implementation; explain the use case, compatibility, and maintenance cost. Follow [CONTRIBUTING](.github/CONTRIBUTING.md) and satisfy the CLA requirement. [API scope][api-cost]
- Keep each change focused; separate unrelated optimizations, formatting, and runtime-baseline changes. [Optimization scope][writer-scope] [Baseline scope][baseline-scope]
- Before changing tooling, inspect [.nvmrc](.nvmrc), [package.json](package.json), [tsconfig.base.json](tsconfig.base.json), [biome.base.json](biome.base.json), [turbo.json](turbo.json), and [.github/workflows](.github/workflows); use their versions and settings rather than generic ecosystem defaults.
- For new private test/benchmark workspaces, follow `packages/protobuf-test` and `packages/protobuf-bench`: omit unnecessary package versions, use the root compiler, and override Turbo outputs when tasks emit different artifacts. Preserve the compiler exceptions in deviation 5. [Package configuration][workspace-version] [Task configuration][workspace-tasks]
- Keep package-specific scripts/tasks local so Turbo can cache them independently. [Task placement][package-tasks]

## Intentional Deviations from Conventional Practice

### 1. Structural identity across ESM and CJS

- **Tempting change:** Replace structural generated types with nominal brands, symbols, or classes.
- **Keep:** Structural `$codegenv1` / `$codegenv2` markers, shape parameters, and message `$typeName` identity. [Module identity][dual-identity]
- **Breaks:** Nominal identities make otherwise identical ESM and CJS declarations incompatible.
- **Check:** Test cross-module assignability without erasing distinctions between codegen versions or between `GenMessage` and `DescMessage`; preserve contracts consumed by existing generated code, including `@private` exports. [Contract tests][codegen-contract]

### 2. Field presence and initializer ownership

- **Tempting change:** Flatten defaults, replace creation with object spread, share containers, or reorder properties.
- **Keep:** Own-property versus inherited-default presence, oneof discriminants, fresh list/map containers, and initializer copying, including containers of `Struct` values. Keep declaration order consistent between `create(schema)` and `create(schema, {})`. [Copying][create-copy] [Ordering][create-order]
- **Breaks:** Flattening changes explicit presence, shared containers introduce aliasing, and reordering changes object shape/performance.
- **Check:** Test omitted versus explicitly `undefined` values, proto2/editions presence, oneofs, container identity, and property order against [create.ts](packages/protobuf/src/create.ts), not only deep equality.

### 3. Allocation and downstream wire use

- **Tempting change:** Extract shared buffers/constants, return tuples, use generic reflection per operation, or return zero-copy views.
- **Keep:** Measured descriptor-specific closure caches, allocation-free hot paths, and a self-contained `BinaryReader` usable by ts-proto. Keep implementation members private and `BinaryWriter.finish()` returning a copy before resetting. [Closure design][compiled-codecs] [Reader boundary][reader-self-contained] [Visibility][wire-private] [Copy contract][writer-copy]
- **Breaks:** Extra dispatch/allocations regress throughput, shared dependencies complicate downstream reuse, and returned views can be corrupted by writer reuse. [Abstraction cost][bytebuffer] [Allocation cost][varint-allocation]
- **Check:** Benchmark the changed path with small messages, long strings/bytes, repeated fields, maps, and ASCII/non-ASCII inputs; investigate per-workload regressions. Test bounds, offsets, errors, and fork/join behavior. [Workload checks][writer-perf]

### 4. Tree shaking and truthful bundle measurements

- **Tempting change:** Import convenient high-level helpers/barrels or apply uniform module settings.
- **Keep:** A dependency-free runtime, ESM/CJS exports, meaningful `sideEffects: false` and pure annotations, and narrow imports such as `varint32write` instead of writer machinery in read-only paths. Leave `type` absent in `packages/bundle-size/package.json` without removing it from other packages. [Selective imports][reader-bundle] [Pure initialization][pure-init] [Harness settings][bundle-module] [Example settings][example-module]
- **Breaks:** Broad imports inflate selective bundles; forcing ESM in the harness breaks its CJS comparison input and invalidates measurements.
- **Check:** Regenerate the bundle report and inspect import/export effects; preserve direct `tsc` CJS/ESM builds unless a replacement preserves these guarantees. [Build contract][build-reversal] [Report task][bundle-report]

### 5. Compiler/configuration compatibility

- **Tempting change:** Unify tsconfigs, upgrade every compiler, or replace all suppressions with `@ts-expect-error`.
- **Keep:** The root build, [compatibility workspaces](packages/typescript-compat/README.md), and [plugin transpiler](packages/protoplugin/src/transpile.ts) have separate compiler/settings requirements; retain declaration checks and workspace-specific `skipLibCheck` exceptions for compilers unable to parse `Uint8Array<ArrayBuffer>`. Preserve explicit `| undefined` on optional message properties, but not JSON types, and the configuration-dependent fallthrough `@ts-ignore` in [binary-encoding.ts](packages/protobuf/src/wire/binary-encoding.ts). [Typed arrays][typed-arrays] [Optional properties][exact-optional]
- **Breaks:** Erasing typed-array generics breaks modern Web API assignability; globally changing compiler flags or suppressions breaks other supported configurations.
- **Check:** Run the existing compiler matrix and follow its README when adding versions; preserve its defaults and documented exclusions. Add explicit return types where version-dependent inference changes public signatures, and retain cross-compiler language-behavior tests. [Inference][return-inference] [Type tests][type-tests]

### 6. Platform baselines and fallbacks

- **Tempting change:** Require new built-ins or bigint because the development Node supports them.
- **Keep:** The target in `tsconfig.base.json`, browser guarantees in [README.md](README.md), feature-detected native optimizations, and `protoInt64`'s string fallback. Seek an explicit compatibility decision before raising the baseline; applications own polyfills for unsupported environments. [Target constraint][target-decision] [Native fallback][base64-fallback] [Browser fallback][string-fallback] [Polyfill boundary][globalthis-policy]
- **Breaks:** Consumers fail at runtime despite passing tests on the development environment.
- **Check:** Exercise native/fallback paths and Node tests with `BUF_BIGINT_DISABLE=0` and `1`; preserve that variable in Turbo's environment inputs. Bun/Deno retain bigint support independently of that flag. [Matrix propagation][bigint-matrix]

### 7. Package-local text encoding

- **Tempting change:** Deduplicate codecs through a `globalThis[Symbol.for(...)]` singleton.
- **Keep:** Encoding implementations local to each runtime copy; deprecated `configureTextEncoding` affects only its copy. Preserve strict schema-aware UTF-8 validation, lenient low-level defaults, optional `encodeInto` fallback, and leading U+FEFF with `ignoreBOM: true`. [Copy isolation][local-encoding] [UTF-8 boundary][utf8-change] [String preservation][bom-fix]
- **Breaks:** Shared state creates an undeclared cross-version ABI and import-order dependence; stripping leading U+FEFF loses string data.
- **Check:** Test multiple-copy behavior and decoding boundaries; use an application-installed `TextEncoder`/`TextDecoder` polyfill when necessary, not shared private codec state. [Cross-copy failure][encoding-backfill]

### 8. JSON output types versus accepted input

- **Tempting change:** Widen generated JSON unions to every parser input or add a generator switch for each serializer option.
- **Keep:** Generated JSON types and `isEnumJson` model default serializer output; custom enum JSON names replace proto names, excluding numeric/old-name/undefined alternatives from that guard. Keep `enumAsInteger`'s broader `JsonValue` result and treat Valid types as type-level contracts, not runtime validation. [JSON options][numeric-json] [Guard contract][json-guard] [Valid types][valid-types]
- **Breaks:** Widening loses output guarantees, while generator modes can promise shapes that imported WKTs cannot provide.
- **Check:** Cover descriptor metadata, runtime parsing/output, generated TS/JS declarations, and guards separately; inspect WKT aliases and transitive message annotations. [Test layers][json-review] [WKT types][valid-wkt] [Transitive types][valid-transitive]

### 9. Wire and JSON edge semantics

- **Tempting change:** Use bare `JSON.parse`, overwrite duplicate message values, or apply one unknown-field policy everywhere.
- **Keep:** `fromJsonString` rejects duplicate keys; `fromJson` rejects proto/JSON-name conflicts but cannot recover identical keys collapsed by a caller's parser. Binary duplicate message values merge, including repeated value tags within one map entry; retain ordinary/extension unknown fields but skip map-entry unknowns. [JSON duplicates][json-duplicates] [Map merge][map-merge] [Map unknowns][map-unknowns] [Extension retention][extension-unknowns]
- **Breaks:** Conflating formats loses values, accepts conflicts, or leaks map-entry unknowns into outer messages.
- **Check:** Use explicit fixtures rather than only same-library round trips; read map-entry length varints before computing end positions and test lengths at/above 128 bytes with adjacent fields. [Length boundary][map-length]

### 10. Custom-option presence and descriptor semantics

- **Tempting change:** Treat a present option's default scalar as explicit configuration or copy one upstream implementation blindly.
- **Keep:** A custom JSON name requires both the extension and its `string` field to be present: `{}` differs from an explicit empty string. Normalize `DescEnumValue.jsonName` to a string with proto-name fallback, without making unrelated optional descriptor members mandatory. [Option presence][option-presence] [Descriptor contract][enum-jsonname]
- **Breaks:** Adding an unrelated option field can unexpectedly rename enum values; blanket descriptor rules erase meaningful absence.
- **Check:** Test absent extension, empty option, explicit empty string, and custom name; inspect [descriptors.ts](packages/protobuf/src/descriptors.ts) for each property's semantics. For required additions, check generated construction sites, released edition support, and consumer compatibility. [Compatibility analysis][descriptor-exception]

### 11. Generated artifacts and consumer tooling

- **Tempting change:** Remove ESLint directives, rely on numeric enum reverse maps, or allow TS and JS declarations to diverge.
- **Keep:** Generated `/* eslint-disable */`, TS/JS+`.d.ts` parity, and experimental `erasable_syntax=true` without reverse-map assumptions. Preserve legacy WKT barrel exports alongside full-name subpaths. [Consumer linting][eslint-preamble] [Output parity][output-parity] [Erasable syntax][erasable] [Enum mapping][enum-reverse] [WKT exports][wkt-exports]
- **Breaks:** Local cleanup breaks consumer lint/build systems or changes generated type behavior.
- **Check:** Regenerate/test affected option combinations; `import_extension` applies only to relative generated imports, and `map_imports` must compose with that boundary. [Import extension][import-extension] [Import mapping][map-imports]

### 12. Dependency isolation

- **Tempting change:** Hoist everything, upgrade ambient typings together, or loosen exact dependencies.
- **Keep:** The generator's exact runtime dependency and `scripts/nohoist.js` placement of `@typescript/vfs` under `packages/protoplugin` and `@types/bun` under `bun/conformance`. Keep compatible `@types/node` versions in compiler workspaces. [Version matching][exact-runtime] [Hoisting][nohoist] [Node typings][node-types]
- **Breaks:** Hoisting binds the virtual compiler host to the wrong API, leaks ambient types, or pairs generator output with a mismatched runtime.
- **Check:** Run `node scripts/nohoist.js --check`; repair with `node scripts/nohoist.js` and inspect the lockfile rather than disabling postinstall.

## Implementation and tests

- Use `.js` import paths, type-only imports, package-local Biome settings, and discriminated descriptor unions; narrow `fieldKind`/`listKind` before casting. Remove branches impossible for compiled descriptors, while validating untrusted reflected values and wire input at their boundaries. [Narrowing][descriptor-narrowing] [Descriptor invariants][descriptor-invariant] [Reflection validation][reflection-validation]
- Preserve numeric semantics: unknown closed-enum values become unknown fields; open enums require int32 range; implicit-presence float `-0` is serialized; float32 checks account for rounding. Do not impose ProtoJSON-only WKT limits on binary/runtime paths. [Closed enums][closed-enums] [Open enums][open-enums] [Signed zero][signed-zero] [Float32][float32] [WKT scope][pure-init]
- Keep protoc's field-name transformation, emit the first declared enum alias while accepting other aliases on input, and recognize custom WKT JSON representations explicitly rather than by package prefix. [Field names][field-names] [Aliases][enum-alias] [WKT JSON][any-json]
- For parser/security changes, test malformed/truncated input, overlong tags, nesting at/past limits, unknown groups, and stream-size bounds. Exercise lazy extensions in conformance instead of hiding unexercised failures. [Recursion][recursion] [Tags][tag-change] [Stream limits][stream-limit] [Extensions][extension-conformance]
- Preserve descriptor construction with frozen built-in prototypes by defining an own `toString` with the established attributes; restore modified globals using test lifecycle hooks. [Frozen prototypes][frozen-prototype] [Cleanup][global-cleanup]
- Use `node:test` and `node:assert` through `tsx`; place runtime regressions in `packages/protobuf-test/src`, generator cases in `generate-code.test.ts` and associated proto/generated fixtures, and framework cases in `packages/protoplugin-test`. Follow existing helpers and contract-oriented test names. [Test runner][node-test] [Test organization][test-contract]
- Demonstrate each bug fix with regression coverage at the appropriate layer; use existing conformance coverage when it exercises the exact case instead of adding redundant unit tests. Add focused cases for gaps and boundaries. [Conformance coverage][conformance-overlap]
- Preserve/update JSDoc during refactors and explain surprising invariants where code relies on them, such as map-key coercion or lookup precedence. [API documentation][writer-docs] [Coercion][explain-coercion] [Precedence][explain-precedence]

## Generation, documentation, and delivery

- Inspect affected manifests' generation/bootstrap tasks and edit their inputs, not only generated output; commit affected tracked artifacts, not `dist/` or `node_modules/`. Generated WKT files live under `packages/protobuf/src/wkt/google`; sibling helpers such as `wkt/timestamp.ts` are handwritten, and bootstrap also injects enum constants into runtime sources. [Runtime tasks](packages/protobuf/package.json)
- Review generated diffs for semantic changes and preserve meaningful repeated-option ordering in proto files. [Proto ordering][proto-order]
- Document new options in `docs/src/content/docs/reference/plugin-options.md`, its enumeration in `reference/index.md`, and the relevant guide, with a concrete `buf.gen.yaml` example. Keep quickstarts short and distinguish runtime dependencies from development tools. [Option docs][option-docs] [Examples][option-example] [Quickstarts][quickstart]
- Compile/check documentation examples where practical, use Starlight `:::note`/`:::caution` instead of GitHub alerts, and identify configuration values users must adapt. [Docs checks][docs-fixes] [Configuration guidance][docs-config]
- Explain user-visible effects in PR descriptions: affected inputs/APIs, changed errors, compatibility, and supported migration/escape hatches; include checks actually run and unavailable checks. Consult the [PR-title workflow](.github/workflows/pr-title.yaml). [UTF-8 impact][utf8-review] [Wire consumers][tag-review]
- Use existing version/tag/trusted-publishing tooling only for an authorized release; preserve matching non-private package versions and version tags. [Publishing workflow][trusted-publish]

## Validation commands

Start with the affected package, then expand according to the changed guarantees; inspect the diff after tasks that write files.

| Change | Validation |
| --- | --- |
| Setup | Match `.nvmrc` and `packageManager`, then `npm ci`; retain postinstall checks. |
| Runtime/generator | `npx turbo run test -F @bufbuild/protobuf-test`; add `-F @bufbuild/protoplugin-test` for framework changes. Turbo builds/generates prerequisites. |
| One runtime test | After prerequisites: `cd packages/protobuf-test && npx tsx --test src/create.test.ts` (substitute the affected test). |
| Numeric/codec changes | Repeat runtime tests in both modes from deviation 6. |
| Parsing/wire/JSON/text | `npx turbo run test -F './packages/protobuf-conformance'`; apply deviation 6 and relevant Bun/Deno CI jobs/tasks. |
| Types/generated declarations | `npx turbo run test -F './packages/typescript-compat/*'` and `npx turbo run attw`. |
| Style | `npx turbo run lint`; its prerequisites include generation and **format with writes**. |
| Hot paths | `npx turbo run build -F @bufbuild/protobuf`, then `cd packages/protobuf-bench && npm run bench`; see its README for filters/profiling and deviation 3 for coverage. |
| Runtime footprint | `npx turbo run bundle-size`; apply deviation 4. |
| Docs site | `cd docs && npm ci && npm run build` (separate lockfile/workspace). |
| Broad integration/release | `npm run all`; builds, generates, tests, lints, checks packages, measures bundles, formats, and bootstraps with writes. |
| Prose only | Validate references/local links and run `git diff --check`; report runtime tests as not run. |

- Do not use `npm run clean` as a harmless reset: it runs `git clean -Xdf` and deletes ignored files. Check runtime-task output for unavailable-runtime skips; preserve Turbo cache dependencies. [Deno task](deno/conformance/package.json) [Cache inputs][cache-inputs]
- For benchmark comparisons, keep runtime/environment consistent, make fixtures stable when cases are added/reordered, and ensure the benchmark exercises the edit. Report regressions as well as gains. [Fixture stability][bench-fixtures] [Benchmark relevance][regex-review]

## Automated-review heuristics

- For branding, presence, allocation, bundle, compiler, builtin, encoding, JSON-type, map, option, generated-tooling, or dependency changes, use the matching deviation's **Check** rather than a generic cleanup rule.
- Missing generated/report diffs do not prove skipped validation: request the command/result, not artificial changes. Trace proto/upstream/option/bootstrap inputs before alleging hand-edited generated output.
- Weakening compiler flags, removing fixtures, or adding conformance failures requires a specific supported-configuration or upstream explanation, not just a green build; apply deviation 5 and the implementation/test requirements.
- For a new generator mode, check interactions from deviations 8 and 11 and the option-documentation requirements.
- Before expanding public APIs, raising baselines, or changing uncertain invariants, inspect nearby implementations/tests and request clarification when the contract remains unclear. Do not infer a rule from a closed PR without substantive reasoning or assume an unimplemented proposal is an available API.

## Pre-submission checklist

- [ ] Scope is focused; no unrelated generated, lockfile, formatting, or tooling churn.
- [ ] Each affected deviation's **Check** is satisfied.
- [ ] Regression coverage and tracked generated outputs follow the implementation/generation requirements.
- [ ] Documentation and PR description explain consumer effects and relevant tradeoffs.
- [ ] Applicable validation commands passed, or unrun/blocked checks are reported; inspect task-generated diffs.
- [ ] References/local links resolve and `git diff --check` passes.

[api-cost]: https://github.com/bufbuild/protobuf-es/pull/1060#issuecomment-2772522395
[codegen-contract]: https://github.com/bufbuild/protobuf-es/pull/1129
[bytebuffer]: https://github.com/bufbuild/protobuf-es/pull/1482#issuecomment-5129896124
[regex-review]: https://github.com/bufbuild/protobuf-es/pull/1324#pullrequestreview-3623339109
[eslint-preamble]: https://github.com/bufbuild/protobuf-es/pull/1580
[writer-docs]: https://github.com/bufbuild/protobuf-es/pull/1108#discussion_r2060235418
[writer-scope]: https://github.com/bufbuild/protobuf-es/pull/1108#discussion_r2060272881
[utf8-review]: https://github.com/bufbuild/protobuf-es/pull/1386#pullrequestreview-4153889484
[tag-review]: https://github.com/bufbuild/protobuf-es/pull/1387#pullrequestreview-4153984867
[compiled-codecs]: https://github.com/bufbuild/protobuf-es/pull/1491
[dual-identity]: https://github.com/bufbuild/protobuf-es/pull/1421
[nohoist]: https://github.com/bufbuild/protobuf-es/pull/1340
[node-test]: https://github.com/bufbuild/protobuf-es/pull/1205
[create-copy]: https://github.com/bufbuild/protobuf-es/pull/1499#discussion_r3749395165
[create-order]: https://github.com/bufbuild/protobuf-es/pull/1499#discussion_r3749563688
[reader-self-contained]: https://github.com/bufbuild/protobuf-es/pull/1441#discussion_r3452097563
[varint-allocation]: https://github.com/bufbuild/protobuf-es/pull/1498
[writer-copy]: https://github.com/bufbuild/protobuf-es/pull/1108#discussion_r2060308177
[writer-perf]: https://github.com/bufbuild/protobuf-es/pull/1108#issuecomment-2814938710
[reader-bundle]: https://github.com/bufbuild/protobuf-es/pull/1197
[pure-init]: https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3702827395
[bundle-module]: https://github.com/bufbuild/protobuf-es/pull/1541#discussion_r4205950250
[example-module]: https://github.com/bufbuild/protobuf-es/pull/1541#discussion_r4205643505
[build-reversal]: https://github.com/bufbuild/protobuf-es/pull/1541#pullrequestreview-5440794001
[typed-arrays]: https://github.com/bufbuild/protobuf-es/pull/1200
[exact-optional]: https://github.com/bufbuild/protobuf-es/pull/1371
[node-types]: https://github.com/bufbuild/protobuf-es/pull/1193
[type-tests]: https://github.com/bufbuild/protobuf-es/pull/1462#issuecomment-5399652584
[target-decision]: https://github.com/bufbuild/protobuf-es/pull/1502#issuecomment-5399624777
[base64-fallback]: https://github.com/bufbuild/protobuf-es/pull/1477#pullrequestreview-4797447876
[string-fallback]: https://github.com/bufbuild/protobuf-es/pull/1479#issuecomment-5116313114
[bigint-matrix]: https://github.com/bufbuild/protobuf-es/pull/1444
[globalthis-policy]: https://github.com/bufbuild/protobuf-es/pull/1322#issuecomment-3705107658
[local-encoding]: https://github.com/bufbuild/protobuf-es/pull/1517
[encoding-backfill]: https://github.com/bufbuild/protobuf-es/pull/1516#issuecomment-5482254308
[utf8-change]: https://github.com/bufbuild/protobuf-es/pull/1386
[bom-fix]: https://github.com/bufbuild/protobuf-es/pull/1572
[numeric-json]: https://github.com/bufbuild/protobuf-es/pull/1337#issuecomment-3738264647
[json-guard]: https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4103121045
[json-review]: https://github.com/bufbuild/protobuf-es/pull/1546#pullrequestreview-5315548894
[valid-types]: https://github.com/bufbuild/protobuf-es/pull/1130
[valid-wkt]: https://github.com/bufbuild/protobuf-es/pull/1147
[valid-transitive]: https://github.com/bufbuild/protobuf-es/pull/1230
[json-duplicates]: https://github.com/bufbuild/protobuf-es/pull/1446
[map-merge]: https://github.com/bufbuild/protobuf-es/pull/1543
[map-unknowns]: https://github.com/bufbuild/protobuf-es/pull/1544
[extension-unknowns]: https://github.com/bufbuild/protobuf-es/pull/1087
[map-length]: https://github.com/bufbuild/protobuf-es/pull/1195#discussion_r2251169750
[option-presence]: https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4121983222
[enum-jsonname]: https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4103377097
[output-parity]: https://github.com/bufbuild/protobuf-es/pull/1151#discussion_r2162531456
[erasable]: https://github.com/bufbuild/protobuf-es/pull/1464
[enum-reverse]: https://github.com/bufbuild/protobuf-es/pull/1460
[import-extension]: https://github.com/bufbuild/protobuf-es/pull/1515
[map-imports]: https://github.com/bufbuild/protobuf-es/pull/1528
[wkt-exports]: https://github.com/bufbuild/protobuf-es/pull/1538
[exact-runtime]: https://github.com/bufbuild/protobuf-es/pull/1179
[descriptor-narrowing]: https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3721173901
[descriptor-invariant]: https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3721923420
[reflection-validation]: https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3727995991
[closed-enums]: https://github.com/bufbuild/protobuf-es/pull/1170
[open-enums]: https://github.com/bufbuild/protobuf-es/pull/1442
[signed-zero]: https://github.com/bufbuild/protobuf-es/pull/1443
[float32]: https://github.com/bufbuild/protobuf-es/pull/1536
[field-names]: https://github.com/bufbuild/protobuf-es/pull/1332
[enum-alias]: https://github.com/bufbuild/protobuf-es/pull/1570#pullrequestreview-5740896825
[any-json]: https://github.com/bufbuild/protobuf-es/pull/1388
[recursion]: https://github.com/bufbuild/protobuf-es/pull/1436
[tag-change]: https://github.com/bufbuild/protobuf-es/pull/1387
[extension-conformance]: https://github.com/bufbuild/protobuf-es/pull/1391#issuecomment-4303644698
[stream-limit]: https://github.com/bufbuild/protobuf-es/pull/1468
[frozen-prototype]: https://github.com/bufbuild/protobuf-es/pull/1507
[global-cleanup]: https://github.com/bufbuild/protobuf-es/pull/1507#discussion_r3748458631
[bundle-report]: https://github.com/bufbuild/protobuf-es/pull/1240#issuecomment-3329716296
[proto-order]: https://github.com/bufbuild/protobuf-es/pull/1473#discussion_r3621346903
[quickstart]: https://github.com/bufbuild/protobuf-es/pull/1022#pullrequestreview-2470217307
[option-docs]: https://github.com/bufbuild/protobuf-es/pull/1528#discussion_r3956873368
[docs-fixes]: https://github.com/bufbuild/protobuf-es/pull/1581
[docs-config]: https://github.com/bufbuild/protobuf-es/pull/1581#discussion_r4444230203
[trusted-publish]: https://github.com/bufbuild/protobuf-es/pull/1406
[cache-inputs]: https://github.com/bufbuild/protobuf-es/pull/1484
[bench-fixtures]: https://github.com/bufbuild/protobuf-es/pull/1474#discussion_r3639372243
[option-example]: https://github.com/bufbuild/protobuf-es/pull/1528#pullrequestreview-5152742682
[descriptor-exception]: https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4103986818
[wire-private]: https://github.com/bufbuild/protobuf-es/pull/1498#discussion_r3702444376
[return-inference]: https://github.com/bufbuild/protobuf-es/pull/1013#discussion_r1829084315
[conformance-overlap]: https://github.com/bufbuild/protobuf-es/pull/1132#discussion_r2097640137
[test-contract]: https://github.com/bufbuild/protobuf-es/pull/1504#discussion_r3735482392
[baseline-scope]: https://github.com/bufbuild/protobuf-es/pull/1477#issuecomment-5129352471
[explain-coercion]: https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3727631794
[explain-precedence]: https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4103848043
[workspace-version]: https://github.com/bufbuild/protobuf-es/pull/1474#discussion_r3639114987
[workspace-tasks]: https://github.com/bufbuild/protobuf-es/pull/1474#discussion_r3639189356
[package-tasks]: https://github.com/bufbuild/protobuf-es/pull/1104#discussion_r2049294583
