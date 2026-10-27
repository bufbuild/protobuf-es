# AGENTS.md

Instructions for AI coding agents working in this repository. Humans should read
[CONTRIBUTING.md](.github/CONTRIBUTING.md) first; everything here applies to you too.

Before opening a pull request, read [REVIEW.md](REVIEW.md). It lists the
invariants reviewers check, and your PR will be held to them.

## Ground rules

- A human is accountable for every change. The person submitting the PR must
  understand it, have run the checks below, and have signed the
  [CLA](https://cla-assistant.io/bufbuild/protobuf-es).
- New exported APIs need prior discussion in a relevant GitHub or internal
  Linear issue. Link the issue in the PR description. For internal issues,
  include a public summary of the API change, rationale, and compatibility
  impact so reviewers do not need internal access. Do not disclose confidential
  details.
- Keep PRs small and focused. Do not mix refactors, formatting, or dependency
  bumps into a functional change.
- Do not "clean up" code you were not asked to change.

## Environment

- Node.js version from `.nvmrc`, npm version from `package.json`
  (`packageManager`). Use `npm ci`, never `npm install` without a reason.
- Tasks run through turborepo. Scope to a package with `-F`, for example
  `npx turbo run test -F ./packages/protobuf-test`.

## Commands

| Task | Command |
|---|---|
| Install | `npm ci` |
| Test and lint (run before every PR) | `npx turbo run test lint` |
| Format | `npx turbo run format` |
| Regenerate generated code | `npx turbo run generate` |
| Regenerate bootstrap code (WKTs, injected constants) | `npx turbo run bootstrap` |
| License headers | `npx turbo run license-header` |
| Conformance | `npx turbo run test -F ./packages/protobuf-conformance` |
| Type exports check | `npx turbo run attw` |
| Bundle size | `npx turbo run bundle-size` |

CI fails if regenerated, reformatted, or re-headered output differs from what
is committed. Run the relevant command and commit the result.

## Files you must not hand-edit

- `*_pb.ts`, `*_pb.js`, `*_pb.d.ts`: generated. Change the generator or the
  `.proto` input, then regenerate.
- The constant after any `// bootstrap-inject` comment: rewritten by
  `npx turbo run bootstrap`.
- `packages/protobuf-conformance/failing_tests*.txt`: adding a line hides a
  conformance regression. Fix the bug instead.
- Protos in `packages/protobuf-test/extra`: many are deliberately unusual
  (name clashes, reserved words, odd casing) to exercise edge cases. Do not
  rename or "fix" their style. Add new files instead of changing existing ones.

## Code standards

Biome enforces formatting and lint. Do not argue with it or disable rules
inline. Beyond that:

- **Zero runtime dependencies.** `@bufbuild/protobuf` has no dependencies. Do not
  add any. Do not add dependencies to other published packages without
  maintainer agreement.
- **Pinned toolchain.** `typescript` and `@typescript/vfs` are pinned on purpose
  for plugin transpilation. Do not bump them.
- **Imports.** Relative imports use the `.js` extension, even in `.ts` files.
  No default exports.
- **Dual ESM and CommonJS.** Published packages ship both. Do not use
  `import.meta`, top-level `await`, or anything else that breaks the CJS build.
  `attw` must pass.
- **No side effects.** Published packages declare `"sideEffects": false`.
  Module top level must not mutate globals, register anything, or do work
  beyond defining constants, functions, and classes.
- **Portability.** The runtime must work in baseline browsers, all maintained
  Node.js releases, Deno, and Bun. Do not introduce Node-only runtime dependencies
  (`node:*` imports, `Buffer`, or unguarded `process` access) in
  `packages/protobuf/src`. Preserve the guarded environment detection in
  `proto-int64.ts` used for BigInt fallback testing.
- **BigInt is optional.** 64-bit values go through `protoInt64`. Code must work
  when BigInt is unavailable (`BUF_BIGINT_DISABLE=1`).
- **API shape.** Messages are plain objects. Public operations are functions
  that take a schema (`create(Schema, init)`, `toBinary(Schema, msg)`), not
  methods on messages. Follow that pattern for new API.
- **License header.** Every new source file needs the Apache 2.0 header.
  `npx turbo run license-header` adds it.
- **TSDoc.** Exported symbols get TSDoc comments in the style of their
  neighbors.

## Protobuf correctness

protobuf-es is 100% conformant with the official Protobuf conformance suite.
Every change must keep it that way.

- **Sources of truth, in order:**
  1. The upstream conformance suite and the behavior of `protoc` at the version
     pinned by `packages/upstream-protobuf`.
  2. The specifications at [protobuf.dev](https://protobuf.dev): the
     [encoding guide](https://protobuf.dev/programming-guides/encoding/),
     [ProtoJSON](https://protobuf.dev/programming-guides/json/), and
     [editions and features](https://protobuf.dev/editions/overview/).
  3. Behavior of the official C++ and Java implementations.

  Never resolve an ambiguity by intuition or by copying another JavaScript
  library. If the spec and upstream behavior disagree, upstream behavior wins;
  say so in the PR.
- **Use resolved features, not syntax.** Descriptors expose resolved edition
  features (`presence`, `packed`, `delimitedEncoding`, enum `open`). Branch on
  those. Do not branch on `syntax === "proto2"` or similar.
- **Cover every syntax.** Changes to serialization, defaults, presence, or
  enums need tests for proto2, proto3, and editions where semantics differ.
- **Do not bump upstream Protobuf casually.** Updating the upstream version
  requires a new `protoc`, a bootstrap run, and review of every changed WKT.
  That is a maintainer task.
- **Generated code is a public contract.** Changes to `protoc-gen-es` output
  (file names, export names, import paths, shapes) are breaking for users.
  Treat them like public API changes.

## Tests

See the Tests section of [REVIEW.md](REVIEW.md). In short: `node:test` and
`node:assert`, tests live in `packages/protobuf-test` or
`packages/protoplugin-test`, import through public entry points, and use
generated fixtures or the `compile*` helpers. Bug fixes need a test that fails
without the fix.

## Pull requests

- **Title:** start with a capitalized verb in the imperative ("Add", "Fix",
  "Remove"), first word not ending in "s" or "ing", no trailing punctuation, no
  contractions. Conventional-commit prefixes like `feat:` or `fix:` fail CI.
- **Description:** what changed, why, and how it was tested. Link the issue.
  Call out any public API change, generated output change, or new conformance
  entry explicitly.
- Do not add the `Emergency Bypass Review` label. It is for maintainers only.
