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

## Conformance first

Public conformance is the fastest way to understand the gap. The [protobuf-conformance](https://github.com/bufbuild/protobuf-conformance) runner tests proto2, proto3, and the highest Edition each implementation advertises.

| Implementation | JavaScript and TypeScript | Standard Plugin | Supported Edition | Required tests | Recommended tests |
|---|:---:|:---:|:---:|:---:|:---:|
| [`protobuf-es`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf-es) | :heavy_check_mark: | :heavy_check_mark: | 2024 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/Protobuf-ES-required.svg" height="25" width="125" /></sub><br><sup>(0 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/Protobuf-ES-recommended.svg" height="25" width="125" /></sub><br><sup>(12 failures)</sup> |
| [`google-protobuf`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/google-protobuf) | :x: | :heavy_check_mark: | 2023 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/google-protobuf-required.svg" height="25" width="125" /></sub><br><sup>(1169 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/google-protobuf-recommended.svg" height="25" width="125" /></sub><br><sup>(389 failures)</sup> |
| [`protobuf.js`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf.js) | :heavy_check_mark: | :x: | 2023 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/protobuf.js-required.svg" height="25" width="125" /></sub><br><sup>(1847 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/protobuf.js-recommended.svg" height="25" width="125" /></sub><br><sup>(579 failures)</sup> |

Protobuf-ES is not a nice API wrapped around a partial implementation. It is the modern JavaScript and TypeScript API backed by the strongest conformance story in the ecosystem.

## What feels different

- Plain message objects and schema exports instead of generated getter and setter classes.
- Standard plugin flow with the Buf CLI and `protoc`, not a separate wrapper toolchain.
- First-class TypeScript output instead of recovering types after generating JavaScript.
- Typed oneofs, reflection, registries, custom options, and well-known types in one ecosystem.
- Smaller bundles and ECMAScript modules by default.

For the detailed side-by-side, including capability differences against `google-protobuf` and `protobuf.js`, see [How it compares](/how-it-compares/).

## Packages

Protobuf-ES consists of three npm packages:

- [`@bufbuild/protobuf`](https://www.npmjs.com/package/@bufbuild/protobuf): The runtime library with message APIs, JSON, reflection, registries, extensions, and well-known types.
- [`@bufbuild/protoc-gen-es`](https://www.npmjs.com/package/@bufbuild/protoc-gen-es): The standard Protobuf plugin that generates JavaScript and TypeScript.
- [`@bufbuild/protoplugin`](https://www.npmjs.com/package/@bufbuild/protoplugin): A framework for writing your own Protobuf plugins in TypeScript.

## Why teams use Protobuf-ES

- It passes the public [protobuf-conformance](https://github.com/bufbuild/protobuf-conformance) suite with `0` required failures.
- It uses a standard plugin flow with both the [Buf CLI](https://buf.build/docs/cli/) and `protoc`.
- It generates ECMAScript modules by default and produces small bundles.
- It models messages as plain objects with schemas instead of generated classes with getter and setter APIs.
- It includes reflection, registries, custom options, and a plugin framework in the same ecosystem.

## Where to go next

- [How it compares](/how-it-compares/): See the conformance and capability gap against the other main JavaScript runtimes.
- [Getting started](/getting-started/): Generate your first files with `buf generate`.
- [Plugin options](/plugin-options/): Control code generation for TypeScript, imports, JSON types, and more.
- [Working with messages](/working-with-messages/): Create, inspect, compare, and clone messages.
- [Serialization](/serialization/): Use binary, JSON, unknown fields, Base64, and size-delimited streams.
- [Reflection](/reflection/): Walk schemas, use registries, inspect custom options, and manipulate data dynamically.
- [Writing plugins](/writing-plugins/): Build custom code generators on top of `@bufbuild/protoplugin`.

## Protocol Buffers in brief

Protocol Buffers, or Protobuf, is an interface definition language and binary serialization format. Schemas are defined in `.proto` files and used to generate code in many languages.

```protobuf
syntax = "proto3";
package example;

message User {
  string first_name = 1;
  string last_name = 2;
  bool active = 3;
  User manager = 4;
  repeated string locations = 5;
  map<string, string> projects = 6;
}
```

To use a schema like this in JavaScript or TypeScript, generate code with `@bufbuild/protoc-gen-es`, then work with the generated types and schema exports directly in your application.
