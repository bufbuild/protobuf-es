![The Buf logo](./.github/buf-logo.svg)

# Protobuf-ES

[![License](https://img.shields.io/github/license/bufbuild/protobuf-es?color=blue)](./LICENSE) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protobuf/latest?color=green&label=%40bufbuild%2Fprotobuf)](https://www.npmjs.com/package/@bufbuild/protobuf) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoplugin/latest?color=green&label=%40bufbuild%2Fprotoplugin)](https://www.npmjs.com/package/@bufbuild/protoplugin) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoc-gen-es/latest?color=green&label=%40bufbuild%2Fprotoc-gen-es)](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)

The Protobuf runtime JavaScript and TypeScript should have had from the start.

`protobuf-es` supports proto2, proto3, and Editions 2024, including extensions and custom options, with `0` required conformance failures in the public [protobuf-conformance](https://github.com/bufbuild/protobuf-conformance) runner. It generates plain TypeScript that looks like normal TypeScript, uses ECMAScript modules by default, and works in browsers, Node.js, Deno, and Bun.

If you want full Protobuf semantics with an API that feels at home in modern JavaScript, start here.

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

Generated messages are plain objects with real TypeScript types. `protoc-gen-es` is a standard plugin, so `buf generate` and `protoc` both work.

## How It Compares

Public conformance is a good place to start. The [protobuf-conformance](https://github.com/bufbuild/protobuf-conformance) runner tests proto2, proto3, and the highest Edition each implementation advertises.

| Implementation | JavaScript and TypeScript | Standard Plugin | Supported Edition | Required tests | Recommended tests |
|---|:---:|:---:|:---:|:---:|:---:|
| [`protobuf-es`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf-es) | :heavy_check_mark: | :heavy_check_mark: | 2024 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/Protobuf-ES-required.svg" height="25" width="125" /></sub><br><sup>(0 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/Protobuf-ES-recommended.svg" height="25" width="125" /></sub><br><sup>(12 failures)</sup> |
| [`google-protobuf`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/google-protobuf) | :x: | :heavy_check_mark: | 2023 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/google-protobuf-required.svg" height="25" width="125" /></sub><br><sup>(1169 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/google-protobuf-recommended.svg" height="25" width="125" /></sub><br><sup>(389 failures)</sup> |
| [`protobuf.js`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf.js) | :heavy_check_mark: | :x: | 2023 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/protobuf.js-required.svg" height="25" width="125" /></sub><br><sup>(1847 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/protobuf.js-recommended.svg" height="25" width="125" /></sub><br><sup>(579 failures)</sup> |

`google-protobuf` implements the core surface, but its JavaScript API still reads like an older generation of generated code: `setName()`, `getNamesList()`, `getProjectsMap()`, `serializeBinary()`, no ES6 imports in the README, and a TypeScript story that comes from outside the project. Its own README also notes that there is staffing for only minimal support.

`protobuf.js` deserves credit for pushing JavaScript Protobuf in a friendlier direction. `protobuf-es` keeps that emphasis on usability and adds the pieces teams eventually need: standard plugin flow, much stronger conformance, Editions 2024, and typed extensions.

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

## Generated Code You Can Read

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

That is a much better starting point than APIs like `getLocationsList()`, `setLocationsList()`, `getProjectsMap()`, or `serializeBinary()`. It is also a cleaner TypeScript story than generating JavaScript first and then running a second tool to recover type information.

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

If you prefer `protoc`, that works too. `protoc-gen-es` is a normal plugin, not a wrapper CLI. See [Generate with `protoc`](MANUAL.md#generate-with-protoc).

## Feature Highlights

### Oneofs That Type-Check

`protobuf-es` represents oneofs as discriminated unions:

```typescript
switch (msg.result.case) {
  case "number":
    msg.result.value; // number
    break;
  case "error":
    msg.result.value; // string
    break;
}
```

`google-protobuf` gives you families of getters plus `*Case()` enums. `protobuf.js` can surface oneof state during object conversion, but it does not generate this kind of TypeScript narrowing.

### Full Protobuf Surface

Proto2 still matters. Extensions still matter. Editions matter now.

`protobuf-es` handles proto2, proto3, Editions, extensions, custom options, canonical JSON, well-known types, unknown fields, reflection, and registries in one coherent runtime.

```typescript
import { create, getExtension, hasExtension, setExtension } from "@bufbuild/protobuf";
import { UserSchema, sensitive } from "./gen/user_pb";

const user = create(UserSchema);
setExtension(user, sensitive, true);

if (hasExtension(user, sensitive)) {
  console.log(getExtension(user, sensitive));
}
```

Google's runtime exposes extensions through much older APIs. `protobuf.js` fails proto2 extension code generation in the public conformance runner.

### JSON Types That Match Real JSON

With the plugin option `json_types=true`, generated types can describe the exact JSON shape that `toJson()` emits:

```typescript
import { create, toJson } from "@bufbuild/protobuf";
import { type ExampleJson, ExampleSchema } from "./gen/example_pb";

const example = create(ExampleSchema, { amount: 123 });
const json: ExampleJson = toJson(ExampleSchema, example);

json.amount; // number | undefined
json.data; // string | undefined
```

That is a small feature until you need it. Then it becomes hard to give up.

### Reflection, Registries, and Custom Options

Dynamic tooling is part of serious Protobuf work. `protobuf-es` ships a full reflection API, descriptor wrappers, registry APIs, and access to custom options.

```typescript
import { getOption, type Registry } from "@bufbuild/protobuf";
import { UserSchema } from "./gen/user_pb";
import { sensitive } from "./gen/options_pb";

declare const registry: Registry;

registry.getMessage("example.User");
registry.getExtension("example.sensitive");
getOption(UserSchema.field.lastName, sensitive); // true
```

This is the infrastructure you need for schema-driven tools, plugin development, `Any`, and descriptor-based workflows.

### ESM and Smaller Bundles

`google-protobuf` still does not support ES6 imports. `protobuf-es` generates ESM by default, which gives modern bundlers a much better shot at removing dead code.

The [bundle size comparison](packages/bundle-size) in this repo shows the payoff: `protobuf-es` compresses to less than half the size of Google's output, and tree-shaking keeps the gap growing as you import more files.

## Switching From Existing Code

Most migrations from `google-protobuf` are straightforward:

| `google-protobuf` | `protobuf-es` |
|---|---|
| `new User(); user.setFirstName("Alice")` | `create(UserSchema, { firstName: "Alice" })` |
| `msg.serializeBinary()` | `toBinary(UserSchema, msg)` |
| `User.deserializeBinary(bytes)` | `fromBinary(UserSchema, bytes)` |
| `msg.getProjectsMap().set("atlas", "infra")` | `msg.projects.atlas = "infra"` |
| `msg.getResultCase()` plus getters | `switch (msg.result.case)` |

For `protobuf.js`, the mapping usually looks like this:

| `protobuf.js` | `protobuf-es` |
|---|---|
| `pbjs` and `pbts` | `protoc-gen-es` |
| `User.verify(data)` then `User.create(data)` | `create(UserSchema, data)` |
| `User.encode(msg).finish()` | `toBinary(UserSchema, msg)` |
| `User.decode(bytes)` | `fromBinary(UserSchema, bytes)` |
| `User.fromObject()` and `User.toObject()` | Plain message objects by default, plus `fromJson()` and `toJson()` when you actually mean Protobuf JSON |

## Documentation

- [Manual](MANUAL.md): Full guide to code generation, messages, JSON, reflection, registries, extensions, and migration.
- [Code example](packages/protobuf-example): A working example that uses generated Protobuf types in application code.
- [Plugin example](packages/protoplugin-example): Example plugin that generates Twirp clients.
- [Conformance results](https://github.com/bufbuild/protobuf-conformance): Public runner and comparison table.
- [Bundle size comparison](packages/bundle-size/README.md): Side-by-side numbers against Google's generator.
- [Connect-ES](https://github.com/connectrpc/connect-es): Companion RPC library for Connect, gRPC, and gRPC-Web.

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
