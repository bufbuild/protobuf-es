# AGENTS.md

Guidance for coding agents and automated reviewers (Codex CLI, Claude Code, CodeRabbit, and similar) working in `bufbuild/protobuf-es`.

This file was derived from the repository's pull-request review history from November 2024 through November 2026 (450 PRs, 241 non-Dependabot, 363 merged). Feedback from the primary maintainer, Timo Stamm (`timostamm`), is treated as the authoritative source of review standards. Every material rule links to the PR or comment that established it. Where evidence is thin, the rule says so.

Read this file before proposing changes. It takes precedence over generic TypeScript, Node.js, or "clean code" advice when the two conflict.

---

## 1. What this repository is

Protobuf-ES is the Protocol Buffers implementation for ECMAScript, published as:

| Package | Path | Role |
|---|---|---|
| `@bufbuild/protobuf` | `packages/protobuf` | Runtime: `create`, `toBinary`/`fromBinary`, `toJson`/`fromJson`, reflection, well-known types, text format. Shipped to browsers and servers. |
| `@bufbuild/protoc-gen-es` | `packages/protoc-gen-es` | The code generator plugin. |
| `@bufbuild/protoplugin` | `packages/protoplugin` | Framework for writing protoc plugins in TypeScript. |

Supporting workspaces: `protobuf-test` (unit tests), `protobuf-conformance` (upstream conformance runner), `protobuf-bench` (benchmarks), `bundle-size` (bundle-size report checked in CI), `typescript-compat/*` (compiles tests with each supported TypeScript version), `upstream-protobuf` (fetches upstream `.proto` files), `protobuf-example`, `protoplugin-example`, `protoplugin-test`, and `deno/`, `bun/` (conformance and examples for those runtimes).

Key properties that drive review:

- **The runtime is a library that ends up in browser bundles.** Bundle size is measured in CI and reviewed on every PR.
- **Serialization correctness is defined by the upstream Protobuf conformance suite**, not by local opinion. Where the spec is silent, behavior is matched against `protobuf-go` and the C++ implementation.
- **Generated code is a public contract** between `protoc-gen-es` and the runtime (`@bufbuild/protobuf/codegenv1` and `codegenv2`). Changing its shape is a compatibility event.
- **`BinaryReader` and `BinaryWriter` are consumed by third parties** such as `ts-proto`, so they are held to a stricter stability and self-containment bar than the rest of the runtime.
- **Compatibility targets are explicit** (`README.md` → Compatibility): baseline browsers from the last 2.5 years, all maintained Node.js releases, latest Deno LTS, latest Bun v1, and TypeScript versions less than 2 years old **with default compiler settings**.

---

## 2. Non-negotiable rules

1. **Never hand-edit generated code.** Anything under `src/gen/**`, `packages/protobuf/src/wkt/**` (bootstrapped), the `bundle-size` report table, and `package-lock.json` hoisting are produced by turbo tasks. Regenerate and commit the output. CI runs `scripts/gh-diffcheck.js` after `format`, `license-header`, `bundle-size`, and `bootstrap` and fails on any uncommitted diff.
2. **Do not add plugin options** without an issue and maintainer agreement. See §6.4.
3. **Only default TypeScript compiler settings are supported.** Do not change generated code or runtime types to accommodate non-default `tsconfig` flags. See §6.3.
4. **Do not increase bundle size without justification.** Run `npx turbo run bundle-size`, commit the result, and explain any increase in the PR. See §6.1.
5. **Do not change serialization behavior without conformance evidence.** Cite the spec, the conformance suite, or the behavior of `protobuf-go`/C++. See §6.5.
6. **Do not keep state on `globalThis`.** See §6.6.
7. **Do not DRY, abstract, or "clean up" hot paths** (`packages/protobuf/src/wire/binary-encoding.ts`, `from-binary.ts`, `to-binary.ts`, `from-json.ts`, `to-json.ts`, `create.ts`) without a benchmark showing no regression. See §6.2.
8. **PR title and description are the changelog.** Behavior changes must be called out, with an escape hatch when one exists. See §4.2.
9. **Add tests for every behavior change**, including the fallback branch of any feature detection. See §5.
10. **Contributors must sign the CLA** before a PR can merge ([#1240](https://github.com/bufbuild/protobuf-es/pull/1240#issuecomment-3332528243), [#1369](https://github.com/bufbuild/protobuf-es/pull/1369#issuecomment-4075978041)).

---

## 3. Build, test, and validate

Requirements: Node.js ≥ 22, npm ≥ 10 (`package.json` → `engines`). Tasks run through turborepo.

```bash
npm ci
npx turbo run build            # builds all packages (also runs generate)
npx turbo run test             # unit, conformance, typescript-compat, examples
npx turbo run lint             # biome lint, --error-on-warnings
npx turbo run format           # biome format --write (CI fails on resulting diff)
npx turbo run license-header   # adds Apache headers (CI fails on resulting diff)
npx turbo run bundle-size      # regenerates packages/bundle-size/README.md table
npx turbo run attw             # "are the types wrong" check on published packages
npx turbo run bootstrap        # regenerates wkt and injected descriptors
npm run all                    # everything above
```

CI (`.github/workflows/ci.yaml`) runs tests on Node.js 22, 24, and 26, each twice: once with BigInt and once with `BUF_BIGINT_DISABLE=1` to exercise the string fallback for 64-bit integers. Run the suite both ways when touching anything near `protoInt64`, varints, or 64-bit scalars ([#1444](https://github.com/bufbuild/protobuf-es/pull/1444)).

Targeted runs:

```bash
npx turbo run test -F @bufbuild/protobuf-test
npx turbo run test -F './packages/protobuf-conformance'
npx turbo run test -F './packages/typescript-compat/*'
cd packages/protobuf-bench && npm run bench -- '^toBinary/'   # see its README
```

Tests use the Node.js built-in runner (`node:test`, `node:assert`), not Jest ([#1205](https://github.com/bufbuild/protobuf-es/pull/1205)). Test files use `void suite(...)` / `void test(...)` and restore global state with `after()` rather than wrapper helpers ([#1507](https://github.com/bufbuild/protobuf-es/pull/1507#discussion_r3748458631)).

Linting is biome ([#1104](https://github.com/bufbuild/protobuf-es/pull/1104)). `biome.base.json` deliberately turns off `noDoubleEquals`, `useTemplate`, `useConst`, `noParameterAssign`, `useNumberNamespace`, and `noFallthroughSwitchClause`. Do not "fix" `==` to `===` or rewrite string concatenation to templates in existing code; it is not a lint error here and churn is unwelcome.

---

## 4. Recurring maintainer expectations (timostamm)

The primary maintainer authored 126 of the 199 non-Dependabot commits in the review window and reviewed nearly every external PR. The expectations below recur across many reviews.

### 4.1 Scope and process

- **Open an issue before adding exported API or features.** `CONTRIBUTING.md` says so, and the maintainer closes PRs that skip it: new exported type ([#1115](https://github.com/bufbuild/protobuf-es/pull/1115#issuecomment-2834634400)), raw/plain message types ([#1060](https://github.com/bufbuild/protobuf-es/pull/1060#issuecomment-2772522395)), binary compilation scripts ([#1225](https://github.com/bufbuild/protobuf-es/pull/1225#issuecomment-3302627365)), and "file an issue with details" when a premise is contested ([#1357](https://github.com/bufbuild/protobuf-es/pull/1357#issuecomment-3859338986)).
- **One concern per PR.** A Node.js CI-matrix bump had to be split from a feature PR ([#1477](https://github.com/bufbuild/protobuf-es/pull/1477#issuecomment-5129352471)); performance follow-ups were requested as separate PRs ([#1108](https://github.com/bufbuild/protobuf-es/pull/1108#issuecomment-4315712570)); a fix was asked to be refactored into a free function so it could land independently of a larger design decision ([#1369](https://github.com/bufbuild/protobuf-es/pull/1369#issuecomment-4305608052)).
- **Keep the repository focused.** Tests that duplicate what the conformance suite already covers are removed ([#1132](https://github.com/bufbuild/protobuf-es/pull/1132#discussion_r2097640137)). Features without a clear use case are cut even when they work ([#1528](https://github.com/bufbuild/protobuf-es/pull/1528#discussion_r3956733751)).
- **Minimal configuration.** Prefer no override over a config override for one file ([#1104](https://github.com/bufbuild/protobuf-es/pull/1104#discussion_r2049256908)); "keep it simple and not add the option" ([#1541](https://github.com/bufbuild/protobuf-es/pull/1541#discussion_r4205966222)).
- **Follow existing package conventions exactly** when adding a workspace: omit `version` for private packages, use the root `tsc`, don't add a local `typescript` dev dependency, add turbo task overrides when `outputs` don't apply, move `.gitignore` entries to the root ([#1474](https://github.com/bufbuild/protobuf-es/pull/1474#discussion_r3639114987), [r3639189356](https://github.com/bufbuild/protobuf-es/pull/1474#discussion_r3639189356), [r3639265198](https://github.com/bufbuild/protobuf-es/pull/1474#discussion_r3639265198), [r3639106457](https://github.com/bufbuild/protobuf-es/pull/1474#discussion_r3639106457)).

### 4.2 PR title and description

The PR title and description are copied into release notes. The maintainer repeatedly asks for them to be rewritten:

- State what changes for users, not just what the code does. For UTF-8 validation: "We're fixing a bug here ... With this change, `fromBinary` validates strings. This fix impacts users: instead of silent replacement, invalid UTF-8 now causes `fromBinary` to throw. ... Can we add a code snippet with an escape hatch?" ([#1386](https://github.com/bufbuild/protobuf-es/pull/1386#pullrequestreview-4153889484)).
- Clarify impact on downstream consumers of `BinaryReader` such as `ts-proto` ([#1387](https://github.com/bufbuild/protobuf-es/pull/1387#pullrequestreview-4153984867)).
- Include a usage example for a new option "so that users clicking through from the release notes see what this is right away" ([#1528](https://github.com/bufbuild/protobuf-es/pull/1528#pullrequestreview-5152742682)).
- A PR with no description or a wrong title is not ready for review ([#1483](https://github.com/bufbuild/protobuf-es/pull/1483#pullrequestreview-4800509960), [#1499](https://github.com/bufbuild/protobuf-es/pull/1499#issuecomment-5195018992)).
- The maintainer's own PRs model the format: problem statement with a proto/TS snippet, the fix, a "Note that this is a behavior change" paragraph, and `Fixes #NNN` ([#1436](https://github.com/bufbuild/protobuf-es/pull/1436), [#1443](https://github.com/bufbuild/protobuf-es/pull/1443), [#1446](https://github.com/bufbuild/protobuf-es/pull/1446), [#1517](https://github.com/bufbuild/protobuf-es/pull/1517)).

PR titles are linted by `.github/workflows/pr-title.yaml`. Use imperative mood, sentence case, no trailing period, e.g. `Fix nanos sign in durationFromMs()`.

### 4.3 Code review substance

- **Restore or update doc comments.** Three separate "Please restore the doc comment" requests in one PR ([#1108](https://github.com/bufbuild/protobuf-es/pull/1108#discussion_r2060235418)); stale JSDoc after a refactor must be fixed ([#1491](https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3727995991), [#1315](https://github.com/bufbuild/protobuf-es/pull/1315#discussion_r2657928462)).
- **Explain surprising code inline.** Map keys coerced to string "readers will wonder about what's going on, and whether this is a bug. Please add an explanatory comment" ([#1491](https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3727631794)); why `uint32()` doesn't reject overlong tags ([#1387](https://github.com/bufbuild/protobuf-es/pull/1387#discussion_r3123348884)); why Protobuf names are added last in a lookup map ([#1546](https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4103848043)); why extensions are parsed explicitly in conformance ([#1391](https://github.com/bufbuild/protobuf-es/pull/1391#discussion_r3130102375)).
- **Mark internal exports with `@private`** so they are visibly not public API ([#1491](https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3702827395)). There are ~70 such tags in `packages/protobuf/src`.
- **Avoid casts.** Three "Avoid the cast" suggestions with concrete rewrites in one review ([#1491](https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3721173901), [r3721615661](https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3721615661)).
- **Remove unreachable branches.** "The branch below is also unreachable for any real descriptor, and we only support compiled descriptors" ([#1491](https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3721923420)); dead `null` branches were removed and the symbol `tokenNull` eliminated as a result ([#1315](https://github.com/bufbuild/protobuf-es/pull/1315), [#1316](https://github.com/bufbuild/protobuf-es/pull/1316)).
- **Preserve field order.** "Usually, field order in Protobuf is meaningful, we're careful to preserve it in generated code, and it would be great if we could also preserve it in memory" ([#1499](https://github.com/bufbuild/protobuf-es/pull/1499#discussion_r3749563688)); inconsistent ordering in test protos was flagged ([#1473](https://github.com/bufbuild/protobuf-es/pull/1473#discussion_r3621346903)).
- **No incidental behavior changes.** Storing a container by reference where it used to be cloned "adds another split. I think it would be better to keep the existing behavior" ([#1499](https://github.com/bufbuild/protobuf-es/pull/1499#discussion_r3749395165)).
- **Don't let the formatter dictate structure.** Reformat only lines you change; reviewers ask to drop blank-line churn ([#1108](https://github.com/bufbuild/protobuf-es/pull/1108#discussion_r3139516059)). Prefer function-level `biome-ignore` over file-level ignores ([#1464](https://github.com/bufbuild/protobuf-es/pull/1464#discussion_r3580144505)).
- **Use the scoped package name** `@bufbuild/protobuf`, never bare `protobuf`, when referring to packages ([#1435](https://github.com/bufbuild/protobuf-es/pull/1435#pullrequestreview-4416936961)).

### 4.4 Documentation

- Docs live in `docs/src/content/docs` (Astro site). The old `MANUAL.md` was replaced; link to the docs site, not the manual.
- A new plugin option must be documented in `reference/plugin-options.md` **and** added to the enumeration in `reference/index.md`, with a `buf.gen.yaml` example ([#1528](https://github.com/bufbuild/protobuf-es/pull/1528#discussion_r3956873368), [r3956733751](https://github.com/bufbuild/protobuf-es/pull/1528#discussion_r3956733751)).
- Write for a new user: "As a new user, I don't understand which values I need to adapt to my environment" ([#1581](https://github.com/bufbuild/protobuf-es/pull/1581#discussion_r4444230203)).
- Quickstarts stay minimal and use `npm` only; no collapsed sections per package manager ([#1022](https://github.com/bufbuild/protobuf-es/pull/1022#pullrequestreview-2470217307)).
- Use established terminology. "lowerCamelCase" means protoc's conversion even when it yields UpperCamelCase in edge cases; do not reword error messages to be "more accurate" at the cost of matching the spec's vocabulary ([#1323](https://github.com/bufbuild/protobuf-es/pull/1323#discussion_r2657819372)).

---

## 5. Testing requirements

- **Every bug fix includes a regression test** that fails without the fix. The maintainer's own fixes demonstrate this, often with the failing diff pasted in the review ([#1195](https://github.com/bufbuild/protobuf-es/pull/1195#discussion_r2251169750), [#1121](https://github.com/bufbuild/protobuf-es/pull/1121#discussion_r2073433126)).
- **Layer tests by concern.** For the enum JSON-name feature the requested layering was: (1) descriptor behavior in `registry.test.ts` with ad-hoc protos covering edge cases, (2) runtime `toJson`/`fromJson`/`isEnumJson` behavior in a feature test file, (3) generated-type assertions in `json_types.test.ts` ([#1546](https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4103121045)). Follow the same split for new features that span descriptors, runtime, and generated code.
- **Cover both branches of any feature detection.** Native `toBase64`/`isWellFormed` fallbacks needed tests for the fallback, which drove adding Node 26 to the CI matrix ([#1477](https://github.com/bufbuild/protobuf-es/pull/1477#pullrequestreview-4797447876), [#1477](https://github.com/bufbuild/protobuf-es/pull/1477#issuecomment-5117759906)).
- **Add boundary tests** for limits ("a test on the boundary of the recursion limit to check for off-by-one errors", [#1436](https://github.com/bufbuild/protobuf-es/pull/1436#discussion_r3380076270)).
- **Test names mirror the documented contract.** Tests in `base64-encoding.test.ts` correspond to the JSDoc bullets of the function; new cases go in a matching loop, not an unrelated test ([#1504](https://github.com/bufbuild/protobuf-es/pull/1504#discussion_r3735482392)).
- **New wire-level helpers need unit tests before merge** (`encodeIntoUtf8` was blocked on missing tests, [#1490](https://github.com/bufbuild/protobuf-es/pull/1490#issuecomment-5205467072)).
- **Generated code is tested three ways** (generated TS, generated JS+d.ts, and runtime descriptors from a file descriptor set), per `packages/protobuf-test/README.md`. Changes to `protoc-gen-es` must regenerate all variants under `packages/protobuf-test/src/gen` and keep them consistent.
- **Prefer the conformance suite as the oracle** for serialization. Don't add unit tests that re-test what conformance covers ([#1132](https://github.com/bufbuild/protobuf-es/pull/1132#discussion_r2097640137)); do add unit tests when conformance has a gap ([#1061](https://github.com/bufbuild/protobuf-es/pull/1061#pullrequestreview-2580780178), [#1342](https://github.com/bufbuild/protobuf-es/pull/1342)).
- **Tests that document language behavior across TypeScript versions are kept**, even though they "just test the language", because they underpin compatibility decisions ([#1462](https://github.com/bufbuild/protobuf-es/pull/1462#issuecomment-5399652584)).

---

## 6. Intentional deviations from conventional practice

Organized by the guarantee each one protects. For each: the usual convention, what this repository does instead, why, what breaks if you revert, and the evidence.

### 6.1 Bundle size over abstraction and reuse

**Convention:** Extract shared helpers, import the richest utility, DRY duplicated logic.

**Here:** Import the narrowest symbol that does the job, and accept duplication in the runtime when sharing would pull more code into a consumer's bundle.

**Why:** `@bufbuild/protobuf` is tree-shaken into browser bundles. `packages/bundle-size` measures the result in CI and the table is reviewed on every PR.

**Failure mode if reverted:** A fix to closed-enum parsing pulled `BinaryWriter` into `fromBinary`, growing bundles for read-only consumers; it was reworked to import only `varint32write` ([#1197](https://github.com/bufbuild/protobuf-es/pull/1197)). A proposal to extract a shared `ByteBuffer` for `BinaryWriter` was closed: "I don't believe it's worth DRYing this up" ([#1482](https://github.com/bufbuild/protobuf-es/pull/1482#issuecomment-5129896124)). A descriptor-normalization fix was redirected because "the change affects bundle size ... there are similar cases ... and then it becomes a problem" ([#1369](https://github.com/bufbuild/protobuf-es/pull/1369#issuecomment-4305429003)). The maintainer pushed an optimization onto a contributor PR specifically to "reduce bundle size compared to main" ([#1536](https://github.com/bufbuild/protobuf-es/pull/1536#pullrequestreview-5267251840)).

**Rules:**
- Run `npx turbo run bundle-size` and commit `packages/bundle-size/README.md` ([#1240](https://github.com/bufbuild/protobuf-es/pull/1240#issuecomment-3329716296)).
- In `packages/protobuf/src`, import from the most specific module (`./wire/varint.js`, not `./wire/binary-encoding.js`) when only a primitive is needed.
- Do not add a new shared abstraction to the runtime unless the bundle-size report is flat or smaller.
- `packages/protobuf/package.json` sets `"sideEffects": false`; keep it, and don't introduce module-level side effects. A build-tool migration was partially reverted when it stopped propagating this flag ([#1435](https://github.com/bufbuild/protobuf-es/pull/1435#issuecomment-4607779249)).

### 6.2 Hot-path performance over idiomatic cleanliness

**Convention:** Share constants, hoist helpers, prefer readable allocation-heavy code, keep modules small.

**Here:** `BinaryReader`/`BinaryWriter` and the compiled `from-*`/`to-*` paths are optimized for V8, kept self-contained, and changed only with benchmark evidence.

**Why:** Serialization throughput is a focus area ([issue #333 comment](https://github.com/bufbuild/protobuf-es/issues/333#issuecomment-4305232949)), and `BinaryReader` is reused by `ts-proto`.

**Failure mode if reverted:** Sharing a `100` recursion-limit constant between modules was rejected: "it's more important that the reader stays self-contained, because it's used by ts-proto" ([#1441](https://github.com/bufbuild/protobuf-es/pull/1441#discussion_r3452097563)). A regex refactor "for performance" showed only noise and was closed ([#1324](https://github.com/bufbuild/protobuf-es/pull/1324#pullrequestreview-3623339109)). A dead-branch cleanup in `fromJson` was approved only after a benchmark ([#1315](https://github.com/bufbuild/protobuf-es/pull/1315#pullrequestreview-3623368193)).

**Rules:**
- Benchmark any change to `packages/protobuf/src/wire/*`, `from-binary.ts`, `to-binary.ts`, `from-json.ts`, `to-json.ts`, `create.ts`, or `equals.ts` with `packages/protobuf-bench` and paste before/after numbers in the PR. Fixtures use a seeded PRNG so runs are comparable across commits; do not reorder or reseed fixtures ([#1474](https://github.com/bufbuild/protobuf-es/pull/1474#discussion_r3639372243)).
- Encode directly into the buffer; avoid intermediate `number[]`/`Uint8Array` allocations ([#1108](https://github.com/bufbuild/protobuf-es/pull/1108#discussion_r2060272881), [#1498](https://github.com/bufbuild/protobuf-es/pull/1498), [#1509](https://github.com/bufbuild/protobuf-es/pull/1509), [#1566](https://github.com/bufbuild/protobuf-es/pull/1566)).
- Keep `BinaryReader`/`BinaryWriter` members `private`, not `protected` ([#1498](https://github.com/bufbuild/protobuf-es/pull/1498#discussion_r3702444376)).
- Hot-path code may use `==`, `!!x`, `arr.indexOf(e) === i` dedupe, and similar idioms; a comment is preferred over a rewrite ([#1029](https://github.com/bufbuild/protobuf-es/pull/1029#discussion_r1867845212)).
- Behavior in `create()` must be optimal per presence kind ("`H+M` for fields that use the prototype chain, and `M` for fields that don't", [#1506](https://github.com/bufbuild/protobuf-es/pull/1506#issuecomment-5238339250)).

### 6.3 Default TypeScript compiler settings only

**Convention:** Make generated types correct under every strict flag (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, etc.), target the latest ECMAScript, drop old TypeScript versions eagerly.

**Here:** Generated code and runtime types are supported for TypeScript versions < 2 years old **with the settings `tsc --init` emits for that version**. The runtime targets ES2017 (`tsconfig.base.json`) plus explicit `globalThis` and optional BigInt. `packages/typescript-compat/v*` compiles the test sources with each supported version.

**Why:** Supporting the matrix of non-default flags is "a can of worms" ([#374](https://github.com/bufbuild/protobuf-es/pull/374#issuecomment-1421329319)). The compat packages exist to guarantee the out-of-the-box experience ([issue #581 comment](https://github.com/bufbuild/protobuf-es/issues/581#issuecomment-4497182480)).

**Failure mode if reverted:** `| undefined` on optional fields for non-default settings was closed ([#1347](https://github.com/bufbuild/protobuf-es/pull/1347#issuecomment-3852550441)); a PR removing "non-default" support introduced a breaking change and was rejected ([#1357](https://github.com/bufbuild/protobuf-es/pull/1357#issuecomment-3858995271)). Conversely, `exactOptionalPropertyTypes` **was** adopted once TypeScript 5.9 made it a default ([#1371](https://github.com/bufbuild/protobuf-es/pull/1371)). Bumping the compile target to ES2022 was deferred: "more comfortable bumping the target in a major version, along with dropping old TS versions" ([#1502](https://github.com/bufbuild/protobuf-es/pull/1502#issuecomment-5399624777)). Jest 30 was rejected twice because it requires TS 5.4 and the repo tests down to 4.9 ([#1163](https://github.com/bufbuild/protobuf-es/pull/1163), [#1186](https://github.com/bufbuild/protobuf-es/pull/1186)); the fix was to leave Jest entirely ([#1205](https://github.com/bufbuild/protobuf-es/pull/1205)).

**Rules:**
- Do not use `skipLibCheck` to paper over compat failures; it hides defects in the runtime packages for old compilers ([#1186](https://github.com/bufbuild/protobuf-es/pull/1186)).
- Add explicit return types where inference differs across TS versions ([#1013](https://github.com/bufbuild/protobuf-es/pull/1013#discussion_r1829084315)).
- Old compat packages pin `@types/node` via its `tsN.M` dist-tags; do not bump them to latest ([#1193](https://github.com/bufbuild/protobuf-es/pull/1193)).
- Adding a TypeScript version: follow `packages/typescript-compat/README.md` exactly (include test sources, check libs, emit declarations, bare `tsc` only for the hoisted root version) ([#1397](https://github.com/bufbuild/protobuf-es/pull/1397#discussion_r3272670451), [#1398](https://github.com/bufbuild/protobuf-es/pull/1398#discussion_r3273199867)).
- `tsconfig.base.json` must note any ES feature above ES2017 that the runtime depends on ([#1331](https://github.com/bufbuild/protobuf-es/pull/1331)). Do not polyfill `globalThis` or older browsers in the library ([#1322](https://github.com/bufbuild/protobuf-es/pull/1322#issuecomment-3705107658)).
- `Uint8Array<ArrayBuffer>` is the deliberate return type for `toBinary()` and friends since TS 5.9 ([#1200](https://github.com/bufbuild/protobuf-es/pull/1200)); don't widen it back to `Uint8Array`.

### 6.4 Plugin options are a maintenance liability, not a feature

**Convention:** Expose a flag for each user preference.

**Here:** New `protoc-gen-es` options require "a real interoperability or compatibility need, not stylistic preferences" (`docs/src/content/docs/reference/faq.md`). Flexibility is meant to come from `@bufbuild/protoplugin`, not from options.

**Why:** "If we aren't very conservative with adding new options, we end up in a state where it's prohibitively complex to add new options for important features" ([#1151](https://github.com/bufbuild/protobuf-es/pull/1151#issuecomment-2997947442)). Each option multiplies generated variants that must stay consistent and tested.

**Failure mode if reverted:** `enum_as_const`/`erasable_syntax_only` were closed while the Node.js feature was experimental ([#1140](https://github.com/bufbuild/protobuf-es/pull/1140), [#1151](https://github.com/bufbuild/protobuf-es/pull/1151)), then implemented by the maintainer as experimental `erasable_syntax=true` once the ecosystem settled ([#1464](https://github.com/bufbuild/protobuf-es/pull/1464)). `json_types_numeric_enums` was closed because WKT imports can't honor it and `toJson` would fall back to `JsonValue` ([#1337](https://github.com/bufbuild/protobuf-es/pull/1337#issuecomment-3738264647)). `elide_plugin_version` was accepted only after weighing drawbacks explicitly ([#1336](https://github.com/bufbuild/protobuf-es/pull/1336#issuecomment-3738291381)).

**Rules:**
- Any option must produce identical types for `target=ts` and `target=js+dts`; add a generated variant under `packages/protobuf-test/src/gen` and assert identity ([#1151](https://github.com/bufbuild/protobuf-es/pull/1151#discussion_r2162531456)).
- New options start as `(experimental)` in docs ([#1464](https://github.com/bufbuild/protobuf-es/pull/1464)).
- Options that affect imports must only touch generated-relative imports, never npm package imports ([#1515](https://github.com/bufbuild/protobuf-es/pull/1515)).

### 6.5 Spec and conformance define behavior, including breaking behavior fixes

**Convention:** Preserve observed behavior; treat stricter validation as a breaking change to avoid.

**Here:** When the Protobuf spec or conformance suite requires stricter behavior, the fix ships in a minor release with a clear changelog entry and an escape hatch where feasible. Where the spec is open, match `protobuf-go` and the C++ implementation, and upstream a conformance test when implementations disagree.

**Evidence:** UTF-8 validation now throws instead of silently replacing ([#1386](https://github.com/bufbuild/protobuf-es/pull/1386), with the explicit position that failing the spec check "should not be allowed to be overridden", [comment](https://github.com/bufbuild/protobuf-es/pull/1386#issuecomment-4290744249)); overlong tags rejected ([#1387](https://github.com/bufbuild/protobuf-es/pull/1387)); duplicate JSON keys rejected ([#1446](https://github.com/bufbuild/protobuf-es/pull/1446)); `-0.0` serialized ([#1443](https://github.com/bufbuild/protobuf-es/pull/1443)); recursion limit default 100 "matches C++, Java, and Python" ([#1436](https://github.com/bufbuild/protobuf-es/pull/1436)); text format matches `txtpbfmt` and `prototext` ([#1450](https://github.com/bufbuild/protobuf-es/pull/1450)); map-entry output "identical to the output of protobuf-go" ([#1342](https://github.com/bufbuild/protobuf-es/pull/1342#discussion_r2705858706)); an ambiguous `(pb.enumvalue.json) = {}` case was decided by reasoning about future option fields and flagged for an upstream conformance test ([#1546](https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4121983222)).

**Rules:**
- Cite the spec section or conformance test in the PR for any serialization change.
- Update `failing_tests.txt` / `failing_tests_text_format.txt` only with an inline reason (e.g. unimplemented feature, [#1039](https://github.com/bufbuild/protobuf-es/pull/1039#discussion_r1890574676)). Prefer making the conformance harness exercise the feature (e.g. calling `getExtension` on `$unknown` to surface lazy-extension errors) over skipping a test ([#1391](https://github.com/bufbuild/protobuf-es/pull/1391#issuecomment-4303644698)).
- Don't follow one implementation's error taxonomy blindly; when a Go-style regex pair was proposed, the maintainer preferred reusing the existing `protoCamelCase` reverse function and ultimately dropped the validation pending an issue ([#1323](https://github.com/bufbuild/protobuf-es/pull/1323#discussion_r2657878409), [r2668773283](https://github.com/bufbuild/protobuf-es/pull/1323#discussion_r2668773283)).
- Upstream `protobuf` updates and conformance-runner updates are separate PRs; call out whether conformance was updated ([#1385](https://github.com/bufbuild/protobuf-es/pull/1385#pullrequestreview-4155045924)).

### 6.6 No shared state on `globalThis`; feature-detect per copy

**Convention:** Install a singleton on `globalThis` so multiple copies of a library share configuration.

**Here:** Each copy of `@bufbuild/protobuf` owns its implementation. `configureTextEncoding()` is deprecated. Native APIs (`Uint8Array.prototype.toBase64`, `String.prototype.isWellFormed`, `BigInt`) are feature-detected with fallbacks, and CI covers both paths.

**Why:** The shared text-encoding singleton made the implementation shape "an undeclared contract between versions, and we have accidentally broken it twice" ([#1517](https://github.com/bufbuild/protobuf-es/pull/1517)), surfacing in micro-frontends and auto-instrumentation that load two versions ([#1516](https://github.com/bufbuild/protobuf-es/pull/1516#issuecomment-5482254308)).

**Rules:**
- Never read or write library state on `globalThis`. Reading platform APIs (`TextEncoder`, `Bun`, `Deno`) is fine.
- Keep fallbacks until the API is widely available in baseline browsers for 2.5 years; "The API is widely supported in web browsers. But only since a couple of months. Let's keep the fallback" ([#1479](https://github.com/bufbuild/protobuf-es/pull/1479#issuecomment-5116313114), [#1489](https://github.com/bufbuild/protobuf-es/pull/1489)).
- Removing a fallback is its own PR, tied to the compatibility statement.

### 6.7 Generated-code and descriptor API stability

**Convention:** Use branded/nominal types for safety; make new descriptor properties optional to avoid breaking consumers; expose a "raw" message type for convenience.

**Here:**
- Type identity is **structural**, keyed on `$typeName` / `$codegenv1` / `$codegenv2`, because brands break across CJS/ESM dual-package imports ([#1421](https://github.com/bufbuild/protobuf-es/pull/1421)).
- `Desc*` properties are **always populated** rather than optional, because "it's the purpose of the descriptor types: remove the complications of working with proto descriptors, and give a simple API." Adding a non-optional property is not a breaking change here because generated code never constructs descriptors ([#1546](https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4103377097), [r4103986818](https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4103986818)).
- Plain/raw message types are **not exported**: without `create()` the prototype chain for proto2 defaults and presence isn't set up, so the type "incentivizes usage that we cannot support" ([issue #1058 comment](https://github.com/bufbuild/protobuf-es/issues/1058#issuecomment-2772497493), [#1060](https://github.com/bufbuild/protobuf-es/pull/1060#issuecomment-2772522395)).
- JSON types describe **exactly** what `toJson()` emits with default options; a custom enum JSON name replaces the proto name in the type, and `isEnumJson` narrows only to that output ([#1546](https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4102773726), [r4103121045](https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4103121045)).
- Valid types alias the regular type when no annotations apply, but must become full types when a referenced message has annotations ([#1230](https://github.com/bufbuild/protobuf-es/pull/1230)). WKTs always use their regular type ([#1147](https://github.com/bufbuild/protobuf-es/pull/1147)).
- `protoc-gen-es` depends on `@bufbuild/protobuf` with an **exact** version, not a caret ([#1179](https://github.com/bufbuild/protobuf-es/pull/1179)).
- Experimental runtime API ships with `@private Experimental API, does not follow semantic versioning` JSDoc ([#1029](https://github.com/bufbuild/protobuf-es/pull/1029)).
- Well-known files are exported under their full path (`@bufbuild/protobuf/wkt/google/protobuf/..._pb.js`) to survive upstream symbol collisions; the barrel keeps common types ([#1538](https://github.com/bufbuild/protobuf-es/pull/1538)).
- Atypical descriptors (e.g. unset `FieldDescriptorProto.type`) should be handled by a normalization free function, not by patching `registry.ts` ([issue #1368 comment](https://github.com/bufbuild/protobuf-es/issues/1368#issuecomment-4305542339)).

### 6.8 Tooling choices that look non-standard

| Looks like | Actual rule | Why / evidence |
|---|---|---|
| Missing `"type": "module"` in `packages/bundle-size/package.json` | Must stay absent | esbuild must infer module format per file to bundle both ESM protobuf-es and CJS google-protobuf ([#1541](https://github.com/bufbuild/protobuf-es/pull/1541#discussion_r4205950250)) |
| `packages/protoplugin-example` could drop `type: module` to import `package.json` | Keep `type: module`; hard-code the version string | ([#1541](https://github.com/bufbuild/protobuf-es/pull/1541#discussion_r4205643505)) |
| `@typescript/vfs` could be hoisted | `scripts/nohoist.js` enforces placement; run it rather than editing the lockfile | ([#1340](https://github.com/bufbuild/protobuf-es/pull/1340)) |
| Root `license-header` could cover everything | Root task ignores `packages/**`, `bun/conformance/**`, `deno/conformance/**`; those have their own tasks, but `bun/example` and `deno/example` rely on the root task | ([#1392](https://github.com/bufbuild/protobuf-es/pull/1392#issuecomment-4299181032), [r3126513259](https://github.com/bufbuild/protobuf-es/pull/1392#discussion_r3126513259)) |
| `tshy` would simplify dual builds | Dropped after it broke `sideEffects` propagation; don't reintroduce without resolving that | ([#1435](https://github.com/bufbuild/protobuf-es/pull/1435#issuecomment-4607779249), [#1541](https://github.com/bufbuild/protobuf-es/pull/1541#pullrequestreview-5440794001)) |
| `moduleResolution: bundler` is modern | Stay on `Node16` in the runtime; examples were reverted from `bundler` | ([#1398](https://github.com/bufbuild/protobuf-es/pull/1398#discussion_r3273417221)) |
| Deno example could use workspace packages | It can't (`deno check` issue); it pins released versions and trails `main` | ([#1234](https://github.com/bufbuild/protobuf-es/pull/1234#discussion_r2355567052)) |
| Jest is the standard runner | Node.js built-in runner only | ([#1205](https://github.com/bufbuild/protobuf-es/pull/1205)) |
| ESLint + Prettier | biome only, one config per package run via turbo | ([#1104](https://github.com/bufbuild/protobuf-es/pull/1104#discussion_r2049294583)) |
| A `.coderabbit.yaml` would help review | Not adopted here yet; the maintainers chose to pilot in `protovalidate-es` first | ([#1579](https://github.com/bufbuild/protobuf-es/pull/1579#issuecomment-6523187987)) |

---

## 7. Generated code and bootstrap boundaries

- `packages/protobuf/src/wkt/**` is generated by `protoc-gen-es` from upstream protos with `bootstrap_wkt=true` (`packages/protobuf/package.json` → `bootstrap:wkt`). Injected descriptors come from `scripts/bootstrap-inject.mjs`, which uses reflection and must be updated when new editions/features appear ([#1085](https://github.com/bufbuild/protobuf-es/pull/1085#discussion_r1995433547)).
- `packages/*/src/gen/**` is generated by `buf generate` per package. Changing `protoc-gen-es` means regenerating every consumer and committing the diff; reviewers read the generated diff as part of the review ([#1230](https://github.com/bufbuild/protobuf-es/pull/1230#discussion_r2340439595)).
- Generated files are excluded from biome (`biome.base.json` → `files.ignore`), so formatting changes to them come only from the generator.
- Mark generated files as generated; a missing marker is a review nit ([#1394](https://github.com/bufbuild/protobuf-es/pull/1394#discussion_r3132154177)).
- Upstream version is derived from `protoc --version` since [#1217](https://github.com/bufbuild/protobuf-es/pull/1217); do not add a `version.txt` back ([#1226](https://github.com/bufbuild/protobuf-es/pull/1226#discussion_r2321460657)).
- Editions: declare support for a new edition only when upstream has released it, even if features are already parsed ([#1085](https://github.com/bufbuild/protobuf-es/pull/1085#discussion_r1995436376), [#1228](https://github.com/bufbuild/protobuf-es/pull/1228)).

---

## 8. Compatibility and release

- Semantic versioning on all published packages; releases are a single "Release X.Y.Z" PR produced by `npm run setversion` (see `scripts/set-workspace-version.js`), with notes generated per `.github/release.yaml`.
- Dropping a Node.js version happens when it reaches end of life, in its own PR, with the statement that failures on it are no longer considered bugs ([#1201](https://github.com/bufbuild/protobuf-es/pull/1201), [#1488](https://github.com/bufbuild/protobuf-es/pull/1488)).
- Runtime support (Deno, Bun) is defined by running the conformance suite on it ([#1233](https://github.com/bufbuild/protobuf-es/pull/1233), [#1343](https://github.com/bufbuild/protobuf-es/pull/1343)).
- Behavior changes that tighten validation ship in minor releases with changelog callouts (see §6.5). API removals, compile-target bumps, and dropping TypeScript versions wait for a major ([#1502](https://github.com/bufbuild/protobuf-es/pull/1502#issuecomment-5399624777)).
- Deprecate rather than remove: `configureTextEncoding()` was deprecated with migration guidance in the release notes ([#1518](https://github.com/bufbuild/protobuf-es/pull/1518)).
- Dependabot majors are evaluated, not auto-merged; the maintainer closes ones that conflict with compatibility goals and explains why ([#1163](https://github.com/bufbuild/protobuf-es/pull/1163), [#1186](https://github.com/bufbuild/protobuf-es/pull/1186), [#1080](https://github.com/bufbuild/protobuf-es/pull/1080)).

---

## 9. Security

- Decoding is hardened against hostile input: recursion limits in `fromBinary`, `fromJson`, and `BinaryReader.skip` ([#1436](https://github.com/bufbuild/protobuf-es/pull/1436), [#1441](https://github.com/bufbuild/protobuf-es/pull/1441)); `readMaxBytes` on size-delimited decoding ([#1468](https://github.com/bufbuild/protobuf-es/pull/1468)); strict UTF-8 ([#1386](https://github.com/bufbuild/protobuf-es/pull/1386)); overlong tag rejection ([#1387](https://github.com/bufbuild/protobuf-es/pull/1387)).
- Prototype-pollution defenses are welcome when they don't special-case unrealistic inputs: `defineProperty` for `toString` was accepted ([#1507](https://github.com/bufbuild/protobuf-es/pull/1507#pullrequestreview-4895558593)); special-casing prototype keys in maps was dropped as "unlikely to affect real users" ([#1451](https://github.com/bufbuild/protobuf-es/pull/1451#issuecomment-5397853514)).
- Never commit tokens. Publishing uses trusted publishing via GitHub workflow ([#1406](https://github.com/bufbuild/protobuf-es/pull/1406)).

---

## 10. Pre-submission checklist

- [ ] An issue exists for any new exported API, plugin option, or feature, and a maintainer has agreed to the approach.
- [ ] `npm run all` passes locally (build, generate, test, lint, attw, bundle-size, format, license-header, bootstrap).
- [ ] Tests pass with `BUF_BIGINT_DISABLE=1` if the change touches 64-bit integers, varints, or wire code.
- [ ] Generated code under `src/gen/**` and `wkt/**` was regenerated, not edited, and all three test variants (ts, js+dts, descriptor set) are consistent.
- [ ] `packages/bundle-size/README.md` is regenerated and committed; any increase is explained in the PR.
- [ ] Hot-path changes include before/after `protobuf-bench` numbers.
- [ ] Serialization changes cite the spec or conformance test and pass `npx turbo run test -F './packages/protobuf-conformance'`.
- [ ] Every bug fix has a regression test; every feature detection has a fallback test.
- [ ] Doc comments exist on every public export and are accurate after the change; internal exports carry `@private`.
- [ ] Surprising logic has an inline comment explaining why.
- [ ] No new casts, dead branches, or unreachable code.
- [ ] No state on `globalThis`; no new runtime dependency.
- [ ] Docs updated: `docs/src/content/docs/reference/*` and the option index for plugin options; examples for new options.
- [ ] PR title is imperative sentence case; description states user-visible impact, behavior changes, and escape hatches.
- [ ] The PR does one thing. Unrelated CI, dependency, or formatting changes are split out.
- [ ] CLA signed under the commit author's GitHub account.

---

## 11. Automated-review heuristics

Flag the following patterns. Each maps to a documented objection.

| Pattern | Likely objection | Reference |
|---|---|---|
| Diff touches `packages/protobuf/src/**` but not `packages/bundle-size/README.md` | Bundle-size report not regenerated | §6.1 |
| Diff touches `wire/`, `from-*.ts`, `to-*.ts`, `create.ts` with no benchmark numbers in the PR body | Perf change unmeasured | §6.2 |
| New `import { BinaryWriter }` or other wide import in `from-binary.ts` / `from-json.ts` | Bundle growth for read-only consumers | [#1197](https://github.com/bufbuild/protobuf-es/pull/1197) |
| New exported `const` shared between `binary-encoding.ts` and another module | Reader/Writer must stay self-contained | [#1441](https://github.com/bufbuild/protobuf-es/pull/1441#discussion_r3452097563) |
| `globalThis.<anything> =` or reading library config from `globalThis` | Cross-copy contract hazard | §6.6 |
| New key in `parseOptions` of `protoc-gen-es` or new `## option` heading in `plugin-options.md` | Needs issue + maintainer sign-off; needs ts/js+dts identity test | §6.4 |
| Changes to `tsconfig.base.json` `target`/`lib`, or removal of a `typescript-compat/v*` package | Major-version only | §6.3 |
| `skipLibCheck: true` in any `typescript-compat/*/tsconfig.json` | Hides runtime type defects | [#1186](https://github.com/bufbuild/protobuf-es/pull/1186) |
| Generated type differs between `src/gen/ts/**` and `src/gen/js/**/*.d.ts` | Generated-code identity broken | [#1151](https://github.com/bufbuild/protobuf-es/pull/1151#discussion_r2162531456) |
| Edits inside `src/gen/**` or `src/wkt/google/**` without a generator change | Hand-edited generated code | §2 |
| `as <Type>` added in `from-binary.ts`, `from-json.ts`, `registry.ts` | Avoid the cast | [#1491](https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3721173901) |
| Deleted or shortened JSDoc on an exported symbol | Restore the doc comment | [#1108](https://github.com/bufbuild/protobuf-es/pull/1108#discussion_r2060235418) |
| New export in `packages/protobuf/src` without JSDoc, or internal export without `@private` | API surface unclear | [#1491](https://github.com/bufbuild/protobuf-es/pull/1491#discussion_r3702827395) |
| Optional (`?:`) property added to a `Desc*` interface in `descriptors.ts` | Descriptor properties should always be populated | [#1546](https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4103377097) |
| Branded/nominal type introduced in `codegenv1`/`codegenv2` types | Dual-package hazard | [#1421](https://github.com/bufbuild/protobuf-es/pull/1421) |
| Lines added to `failing_tests*.txt` without an adjacent explanation | Conformance regression | §6.5 |
| `==` changed to `===`, string concat changed to template, `let` changed to `const` in untouched logic | Lint-rule churn, rules are off | §3 |
| Jest imports, `expect(...)`, or `@jest/*` dependencies | Node test runner only | [#1205](https://github.com/bufbuild/protobuf-es/pull/1205) |
| `"type": "module"` added to `packages/bundle-size/package.json` | Breaks esbuild format inference | [#1541](https://github.com/bufbuild/protobuf-es/pull/1541#discussion_r4205950250) |
| Caret (`^`) on the `@bufbuild/protobuf` dependency in `packages/protoc-gen-es/package.json` | Must be exact | [#1179](https://github.com/bufbuild/protobuf-es/pull/1179) |
| `package-lock.json` edited by hand or `@typescript/vfs` moved | Run `node scripts/nohoist.js` | [#1340](https://github.com/bufbuild/protobuf-es/pull/1340) |
| PR body empty, or title not imperative sentence case | Release-notes quality | §4.2 |
| PR body describes a stricter check with no "behavior change" paragraph and no escape hatch | Changelog clarity | [#1386](https://github.com/bufbuild/protobuf-es/pull/1386#pullrequestreview-4153889484) |
| Node CI matrix or dependency bump bundled into a feature PR | Split it | [#1477](https://github.com/bufbuild/protobuf-es/pull/1477#issuecomment-5129352471) |
| New limit/threshold without a boundary test | Off-by-one risk | [#1436](https://github.com/bufbuild/protobuf-es/pull/1436#discussion_r3380076270) |
| `new RegExp`/complex regex added to validate names when a reverse-mapping function exists | Prefer reuse over regex | [#1323](https://github.com/bufbuild/protobuf-es/pull/1323#discussion_r2657878409) |

---

## 12. When to inspect existing patterns or ask instead of assuming

Inspect first:

- **Adding a workspace package:** copy `packages/protobuf-test` or `packages/protobuf-bench` conventions (scripts, `tsconfig.json`, `biome.json`, `turbo.json`) rather than inventing new ones ([#1474](https://github.com/bufbuild/protobuf-es/pull/1474)).
- **Touching text encoding, base64, varint, or int64:** read `packages/protobuf/src/wire/*.ts` and the matching tests in `packages/protobuf-test/src/wire/`; the facades have been reshaped several times and reviewers expect the newest shape ([#1490](https://github.com/bufbuild/protobuf-es/pull/1490#discussion_r3684151666)).
- **Writing tests:** find the existing test file for the module; match the `suite`/`test` naming and the ad-hoc-proto helpers (`helpers-proto2.ts`, `helpers-proto3.ts`, `helpers-edition2023.ts`).
- **Changing docs:** check `docs/src/content/docs/reference/index.md` for the enumeration of options and features.

Ask (open an issue or leave a question in the PR) when:

- The change adds an export, type, or plugin option (always).
- The spec is silent and `protobuf-go` and C++ disagree ([#1546](https://github.com/bufbuild/protobuf-es/pull/1546#discussion_r4121983222)).
- The change alters behavior users may depend on, even if the old behavior was wrong (strictness fixes, defaults, ordering).
- A fix requires choosing between patching `registry.ts` and a broader normalization design ([#1368](https://github.com/bufbuild/protobuf-es/issues/1368#issuecomment-4305542339)).
- The maintainer has said "let's discuss in person" on a thread; the outcome may not be recorded on GitHub, so do not infer a decision from silence ([#1323](https://github.com/bufbuild/protobuf-es/pull/1323#discussion_r2657880320), [#1398](https://github.com/bufbuild/protobuf-es/pull/1398#discussion_r3273417221)).
- A "cleanup" would change bundle size, benchmark results, generated output, or `Desc*` shapes.

---

## 13. Evidence, confidence, and limitations

**Sources.** All PRs created 2024-11-04 through 2026-11-04 (`gh pr list --search "created:>=2024-11-04"`, 450 PRs), with full review bodies, review-thread comments, and issue comments fetched via the GitHub GraphQL API for the 241 non-Dependabot PRs. No PR hit the pagination cap. Closed Dependabot PRs were checked for maintainer comments explaining rejection. Referenced issue comments and the pre-window [#374](https://github.com/bufbuild/protobuf-es/pull/374#issuecomment-1421329319) were fetched individually. Every URL in this file was verified to resolve.

**Confidence labels.**
- **Strong** (multiple PRs, explicit maintainer statements): §6.1, §6.2, §6.3, §6.4, §6.5, §6.6, §4.2, §4.3 doc-comment and cast rules, Node test runner, biome.
- **Moderate** (one or two explicit statements, consistent with code): `Desc*` always-populated rule, structural-over-branded types, bundle-size `type: module` rule, license-header scoping, Deno example pinning.
- **Weak / context-specific** (single remark, may not generalize): the `H+M` vs `M` hasOwnProperty guidance ([#1506](https://github.com/bufbuild/protobuf-es/pull/1506#issuecomment-5238339250)), preference for a renamed `protoCamelCase` term ([#1323](https://github.com/bufbuild/protobuf-es/pull/1323#discussion_r2657819372)), and the `isUnknownEnum` helper direction ([#1463](https://github.com/bufbuild/protobuf-es/pull/1463) was closed without a recorded reason).

**Limitations.**
- Several threads end with "let's discuss in person" ([#1323](https://github.com/bufbuild/protobuf-es/pull/1323#discussion_r2657878409), [#1398](https://github.com/bufbuild/protobuf-es/pull/1398#discussion_r3273417221)); the resulting decisions are inferred from subsequent commits, not from recorded text.
- Review threads on force-pushed commits are retained by GitHub but may reference code that no longer exists.
- Several PRs (notably [#1130](https://github.com/bufbuild/protobuf-es/pull/1130) Valid types, [#1450](https://github.com/bufbuild/protobuf-es/pull/1450) text format) were large maintainer-authored changes with little recorded review; their conventions are taken from the PR descriptions and resulting code.
- Spam comments on some PRs were ignored.
- This file reflects the state as of November 2026 (`@bufbuild/protobuf` v2.16.0, release 2.17.0 in progress). Re-derive when a major version changes compile targets or TypeScript support.
