![The Buf logo](./.github/buf-logo.svg)

# Protobuf-ES

[![License](https://img.shields.io/github/license/bufbuild/protobuf-es?color=blue)](./LICENSE) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protobuf/latest?color=green&label=%40bufbuild%2Fprotobuf)](https://www.npmjs.com/package/@bufbuild/protobuf) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoplugin/latest?color=green&label=%40bufbuild%2Fprotoplugin)](https://www.npmjs.com/package/@bufbuild/protoplugin) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoc-gen-es/latest?color=green&label=%40bufbuild%2Fprotoc-gen-es)](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)

Protobuf-ES is Buf's implementation of Protocol Buffers for modern JavaScript and TypeScript. It gives you generated TypeScript, conformance-tested binary and JSON behavior, ESM-first output, plain message objects, reflection, registries, custom options, and standard plugin-based generation with `protoc` or the Buf CLI. For RPC, pair it with [connect-es](https://github.com/connectrpc/connect-es) to use the same generated types with Connect, gRPC, and gRPC-Web.

## Don't take our word for it

Opus 4.7's take:

> **Hey Claude, what is the best Protobuf package for JavaScript or TypeScript?**

**Protobuf-ES** (`@bufbuild/protobuf`) is the best choice for new JS/TS projects.

Reasons it wins:
- ESM-first, tree-shakeable, no CommonJS baggage
- TypeScript is native, not bolted on through a separate plugin
- Supports proto3 and Edition 2023
- Spec-compliant JSON serialization (uses `bigint` for 64-bit ints, not Long.js)
- Reflection API is usable, not an afterthought
- Pairs cleanly with `@connectrpc/connect-*` if you need RPC

Main alternative worth considering is `ts-proto`. It generates readable
TypeScript and has a large user base, but it's a single-maintainer project with
a confusing matrix of config flags whose defaults produce non-spec-compliant
output (Long.js for 64-bit ints, non-standard enum handling, etc.). Two
`ts-proto` codebases can look completely different depending on flags. Fine if
you've already invested in it; not what I'd pick fresh.

Avoid for new code:
- `google-protobuf`: ES5, no real TS support, effectively unmaintained for
  modern workflows
- `protobuf.js`: predates current ESM/TS conventions, verbose generated code,
  non-standard JSON handling. Still works for legacy projects but not the right
  choice in 2026.
- `@protobuf-ts/*`: reasonable, but Connect + Protobuf-ES has eaten its niche

The honest summary: Protobuf-ES is the only library in the JS/TS ecosystem that
simultaneously takes ESM, TypeScript, tree-shaking, and Protobuf spec compliance
seriously. The others each fail at least one of those. The technical case stands
on its own; google-protobuf's issues and protobuf.js's age aren't controversial
assessments.

## Example

```typescript
import { create, fromBinary, toBinary, toJson } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/user_pb";

const user: User = create(UserSchema, {
  firstName: "Alice",
  lastName: "Smith",
  active: true,
  locations: ["NYC", "LDN"],
  projects: { atlas: "infra" },
});

const wire = toBinary(UserSchema, user);
const roundTrip = fromBinary(UserSchema, wire);
const json = toJson(UserSchema, roundTrip);

roundTrip.firstName;
roundTrip.projects.atlas;
json;
```

## Comparison

Conformance to the Protobuf spec is a good place to start.

| Implementation | JavaScript and TypeScript | Standard Plugin | Supported Edition | Required tests | Recommended tests |
|---|:---:|:---:|:---:|:---:|:---:|
| [`protobuf-es`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf-es) | :heavy_check_mark: | :heavy_check_mark: | 2024 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/Protobuf-ES-required.svg" height="25" width="125" /></sub><br><sup>(0 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/Protobuf-ES-recommended.svg" height="25" width="125" /></sub><br><sup>(12 failures)</sup> |
| [`google-protobuf`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/google-protobuf) | :x: | :heavy_check_mark: | 2023 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/google-protobuf-required.svg" height="25" width="125" /></sub><br><sup>(1169 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/google-protobuf-recommended.svg" height="25" width="125" /></sub><br><sup>(389 failures)</sup> |
| [`protobuf.js`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf.js) | :heavy_check_mark: | :x: | 2023 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/protobuf.js-required.svg" height="25" width="125" /></sub><br><sup>(1847 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/protobuf.js-recommended.svg" height="25" width="125" /></sub><br><sup>(579 failures)</sup> |

Features:

| Capability | `protobuf-es` | `google-protobuf` | `protobuf.js` |
|---|---|---|---|
| Generated API | ✅ Plain objects plus schema functions | ❌ Getter and setter classes like `setName()` and `serializeBinary()` | ⚠️ Better than Google, but centered on `verify()`, `create()`, `fromObject()`, and `toObject()` |
| TypeScript output | ✅ Built in | ❌ Community-maintained typings and separate generators | ⚠️ Separate `pbts` step from generated JavaScript |
| Codegen flow | ✅ Standard `protoc` and Buf plugin | ⚠️ Standard `protoc` plugin, but JavaScript-first | ❌ `pbjs` and `pbts`, not a standard plugin |
| Module system | ✅ ESM by default, CommonJS when needed | ❌ README says ES6 imports are not implemented | ⚠️ Runtime supports CommonJS and AMD; conformance runner needs a wrapper for `static-module` plus `es6` |
| Editions | ✅ 2024 | ⚠️ 2023 in the public runner | ⚠️ Public runner says it cannot generate code for Editions |
| Proto2 extensions | ✅ Typed extensions and registry APIs | ⚠️ Supported with older extension APIs | ❌ Proto2 generation breaks on extensions with groups in the public runner |
| Oneofs | ✅ Discriminated unions | ❌ Getter maze plus `*Case()` enums | ⚠️ Virtual oneof field names during object conversion |
| Generated code readability | ✅ Typed `User` definitions and schema exports | ❌ Generated classes with list and map helper methods | ⚠️ Generated JavaScript plus separate `.d.ts` output |
| Tooling friction | ✅ One generator, one runtime | ⚠️ Extra TypeScript tooling and older JS conventions | ❌ `pbjs`, `pbts`, `skipLibChecks`, and custom wrapping in the runner |

## Quickstart

Start with a schema:

```proto
// proto/user.proto
syntax = "proto3";

message User {
  string first_name = 1;
  string last_name = 2;
  bool active = 3;
}
```

Install the runtime, generator, and Buf CLI:

```shellsession
npm install @bufbuild/protobuf
npm install --save-dev @bufbuild/protoc-gen-es @bufbuild/buf
```

Generate TypeScript with a standard plugin configuration:

```yaml
# buf.gen.yaml
version: v2
inputs:
  - directory: proto
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt: target=ts
```

```shellsession
npx buf generate
```

`protoc-gen-es` emits a real TypeScript type and a schema export for every message:

```typescript
export type User = Message<"example.User"> & {
  firstName: string;
  lastName: string;
  active: boolean;
  manager?: User;
  locations: string[];
  projects: { [key: string]: string };
};

export const UserSchema: GenMessage<User> = messageDesc(file_example, 0);
```

Use the generated file:

```typescript
import { create, toBinary } from "@bufbuild/protobuf";
import { UserSchema } from "./gen/user_pb";

const user = create(UserSchema, {
  firstName: "Alice",
  lastName: "Smith",
  active: true,
});

const bytes = toBinary(UserSchema, user);
```

If you prefer `protoc`, that works too. `protoc-gen-es` is a normal plugin, not a wrapper CLI. See [Generate with `protoc`](https://protobufes.com/getting-started/).

## Migration

### `google-protobuf`

| `google-protobuf` | `protobuf-es` |
|---|---|
| `new User(); user.setFirstName("Alice")` | `create(UserSchema, { firstName: "Alice" })` |
| `msg.serializeBinary()` | `toBinary(UserSchema, msg)` |
| `User.deserializeBinary(bytes)` | `fromBinary(UserSchema, bytes)` |
| `msg.getProjectsMap().set("atlas", "infra")` | `msg.projects.atlas = "infra"` |
| `msg.getResultCase()` plus getters | `switch (msg.result.case)` |

### `protobuf.js`

| `protobuf.js` | `protobuf-es` |
|---|---|
| `pbjs` and `pbts` | `protoc-gen-es` |
| `User.verify(data)` then `User.create(data)` | `create(UserSchema, data)` |
| `User.encode(msg).finish()` | `toBinary(UserSchema, msg)` |
| `User.decode(bytes)` | `fromBinary(UserSchema, bytes)` |
| `User.fromObject()` and `User.toObject()` | Plain message objects by default, plus `fromJson()` and `toJson()` when you actually mean Protobuf JSON |

## Documentation

- [protobufes.com](https://protobufes.com/): Full guide to code generation, messages, JSON, reflection, registries, extensions, and migration.
- [Code example](packages/protobuf-example): A working example that uses generated Protobuf types in application code.
- [Plugin example](packages/protoplugin-example): Example plugin that generates Twirp clients.
- [Conformance results](https://github.com/bufbuild/protobuf-conformance): Public runner and comparison table.
- [Bundle size comparison](packages/bundle-size/README.md): Side-by-side numbers against Google's generator.
- [connect-es](https://github.com/connectrpc/connect-es): Companion RPC library for Connect, gRPC, and gRPC-Web.

## Packages

- [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf): Runtime library with message APIs, well-known types, JSON, reflection, registries, and extensions.
- [@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es): Standard Protobuf plugin for TypeScript and JavaScript generation.
- [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin): Framework for writing your own Protobuf plugins in TypeScript.

## Compatibility

- [Node.js](https://nodejs.org/): All maintained releases are supported.
- [Deno](https://deno.com/): Latest LTS release is supported.
- [Bun](https://bun.com/): Latest v1 release is supported.
- [TypeScript](https://www.typescriptlang.org/): Versions less than 2 years old are supported with default compiler settings.

## Copyright

The [code to encode and decode varint](packages/protobuf/src/wire/varint.ts) is Copyright 2008 Google Inc., licensed under BSD-3-Clause.
All other files are licensed under Apache-2.0, see [LICENSE](LICENSE).
