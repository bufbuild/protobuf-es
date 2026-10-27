# Review guidelines

These are the invariants reviewers (human and automated) should check on every
pull request to protobuf-es. Formatting and lint are enforced by Biome in CI, so
reviews should not comment on style.

## Generated code

- Files matching `*_pb.ts`, `*_pb.js`, and `*_pb.d.ts` are generated. Do not
  review their contents line by line, and never accept hand edits to them.
- If generated output changes, the PR must also include the change that caused
  it (usually in `packages/protoc-gen-es` or a `.proto` input). Regenerate with
  `npx turbo run generate`.
- Lines marked `// bootstrap-inject` in `packages/protobuf/src` are rewritten by
  `scripts/bootstrap-inject.mjs`. The constant following the marker must not be
  edited by hand. Regenerate with `npx turbo run bootstrap`.

## Runtime: `packages/protobuf`

This is `@bufbuild/protobuf`, published to npm and used in browsers, Node.js,
Deno, and Bun.

- **Public API.** Flag any change to exported API surface. Removals, signature
  changes, and behavior changes are breaking and need explicit justification.
  New exports must link a relevant GitHub or internal Linear issue where the
  API was discussed before implementation. For internal issues, require a public
  summary of the API change, rationale, and compatibility impact so reviewers
  do not need internal access. Do not request confidential details.
- **Portability.** Flag Node-only runtime dependencies (`node:*` imports,
  `Buffer`, or unguarded `process` access) and anything not available in baseline
  browsers from the last 2.5 years. Preserve the guarded environment detection
  in `src/proto-int64.ts` used for BigInt fallback testing.
- **BigInt.** 64-bit integer handling must work when BigInt is unavailable.
  Do not assume BigInt exists.
- **Bundle size.** Flag top-level side effects and patterns that defeat
  tree-shaking. Small bundle size is a core feature.
- **Spec correctness.** Correctness against the Protobuf spec beats convenience.
  Question any change to wire format, JSON mapping, default values, field
  presence, or editions feature resolution.
- `src/wire/varint.ts` contains Google code under BSD-3-Clause. The original
  copyright notice must be preserved.

## Code generator: `packages/protoc-gen-es`

- Changes here alter generated code for every user. The PR must include
  regenerated fixtures (for example `packages/protobuf-test/src/gen`).
- Flag changes to generated output shape, import paths, or exported names as
  potentially breaking.

## Plugin framework: `packages/protoplugin`

- `@bufbuild/protoplugin` is public API for people writing their own plugins.
  Treat exported API changes as breaking.

## Conformance: `packages/protobuf-conformance`

- Any entry added to a `failing_tests*.txt` file is a conformance regression.
  Flag it and require a justification in the PR description.

## TypeScript compatibility: `packages/typescript-compat`

- We support TypeScript versions less than 2 years old with default compiler
  settings. Flag changes that drop support for a version early.

## Tests

These conventions apply to tests written by contributors and to generated tests.

- **Location.** Runtime and code generator tests live in
  `packages/protobuf-test/src`. Plugin framework tests live in
  `packages/protoplugin-test/src`. Do not add tests inside published packages.
- **Framework.** Use `node:test` (`suite`, `test`) and `node:assert`. Tests run
  via `tsx --test`. Do not introduce Jest, Vitest, or other test dependencies.
- **Imports.** Import the runtime through its public entry points
  (`@bufbuild/protobuf`, `@bufbuild/protobuf/wkt`, `@bufbuild/protobuf/reflect`),
  not relative paths into `packages/protobuf/src`. Tests should exercise what
  users actually import.
- **Message fixtures.** Use generated messages from `src/gen/ts/...`. If no
  existing `.proto` covers the case, either:
  - compile an inline proto string with the helpers in `src/helpers.ts`
    (`compileMessage`, `compileFile`, `compileField`, and so on), or
  - add a `.proto` file under `packages/protobuf-test/extra` and run
    `npm run generate` in that package, committing the generated output.

  Never hand-construct descriptor objects.
- **Serialization.** Changes to binary or JSON handling need round-trip tests
  (`toBinary`/`fromBinary`, `toJson`/`fromJson`) and should cover proto2, proto3,
  and editions where semantics differ (field presence, defaults, closed enums).
- **64-bit integers.** Use `protoInt64` rather than BigInt literals so tests
  remain meaningful when BigInt is unavailable.
- **Regressions.** Bug fixes need a test that fails without the fix. If the bug
  has an issue, reference it in the test name.
- **License header.** Every new test file needs the Apache 2.0 header. CI
  enforces this.
- **Do not test generated code directly.** Test `protoc-gen-es` behavior through
  its output used by the runtime, or through the existing codegen tests in
  `packages/protobuf-test/src/codegenv1` and `codegenv2`.
