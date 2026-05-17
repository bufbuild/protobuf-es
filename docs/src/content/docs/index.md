---
title: Introduction
---

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

## How it compares

The [protobuf-conformance](https://github.com/bufbuild/protobuf-conformance) runner tests proto2, proto3, and the highest Edition each implementation advertises.

| Implementation | JavaScript and TypeScript | Standard Plugin | Supported Edition | Required tests | Recommended tests |
|---|:---:|:---:|:---:|:---:|:---:|
| [`protobuf-es`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf-es) | :heavy_check_mark: | :heavy_check_mark: | 2024 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/Protobuf-ES-required.svg" height="25" width="125" /></sub><br><sup>(0 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/Protobuf-ES-recommended.svg" height="25" width="125" /></sub><br><sup>(12 failures)</sup> |
| [`google-protobuf`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/google-protobuf) | :x: | :heavy_check_mark: | 2023 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/google-protobuf-required.svg" height="25" width="125" /></sub><br><sup>(1169 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/google-protobuf-recommended.svg" height="25" width="125" /></sub><br><sup>(389 failures)</sup> |
| [`protobuf.js`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf.js) | :heavy_check_mark: | :x: | 2023 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/protobuf.js-required.svg" height="25" width="125" /></sub><br><sup>(1847 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/protobuf.js-recommended.svg" height="25" width="125" /></sub><br><sup>(579 failures)</sup> |

`google-protobuf` implements the core surface, but its JavaScript API still reads like an older generation of generated code: `setName()`, `getNamesList()`, `getProjectsMap()`, `serializeBinary()`, no ES6 imports in the README, and a TypeScript story that comes from outside the project.

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

For code comparisons and bundle size numbers, see [the full comparison](/how-it-compares/).

## Packages

Protobuf-ES consists of three npm packages:

- [`@bufbuild/protobuf`](https://www.npmjs.com/package/@bufbuild/protobuf): The runtime library with message APIs, JSON, reflection, registries, extensions, and well-known types.
- [`@bufbuild/protoc-gen-es`](https://www.npmjs.com/package/@bufbuild/protoc-gen-es): The standard Protobuf plugin that generates JavaScript and TypeScript.
- [`@bufbuild/protoplugin`](https://www.npmjs.com/package/@bufbuild/protoplugin): A framework for writing your own Protobuf plugins in TypeScript.

## Where to go next

- [How it compares](/how-it-compares/): Conformance numbers, capability tables, and code comparisons against the other main JavaScript runtimes.
- [Getting started](/getting-started/): Generate your first files with `buf generate`.
- [Generated code](/generated-code/): See how messages, enums, oneofs, extensions, and services are represented.
- [Working with messages](/working-with-messages/): Create, inspect, compare, and clone messages.
- [Serialization](/serialization/): Binary, JSON, unknown fields, Base64, and size-delimited streams.
- [Reflection](/reflection/): Walk schemas, use registries, inspect custom options, and manipulate data dynamically.
- [Writing plugins](/writing-plugins/): Build custom code generators on top of `@bufbuild/protoplugin`.
