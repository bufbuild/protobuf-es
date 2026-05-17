---
title: Protobuf-ES
---

Idiomatic Protocol Buffers for JavaScript and TypeScript.

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

const bytes = toBinary(UserSchema, user);
const copy = fromBinary(UserSchema, bytes);
const json = toJson(UserSchema, copy);

copy.projects.atlas;
json;
```

Define your schema once in `.proto`, generate TypeScript or JavaScript with `protoc-gen-es`, then use plain message objects in your application. Generated code has a normal TypeScript surface: schema exports, typed fields, discriminated oneofs, regular arrays and objects, and runtime helpers for binary, JSON, reflection, registries, extensions, and custom options.

## Where to start

- [Getting started](/getting-started/): Generate and use your first TypeScript files.
- [Working with messages](/working-with-messages/): Construct messages, use defaults, check presence, compare, and clone.
- [Serialization](/serialization/): Encode and decode binary, ProtoJSON, unknown fields, Base64, and size-delimited streams.
- [Generated code](/generated-code/): See the exact TypeScript shapes emitted by the plugin.
- [Reflection](/reflection/): Inspect schemas, build registries, read custom options, and manipulate messages dynamically.
- [Writing plugins](/writing-plugins/): Generate your own JavaScript and TypeScript from Protobuf schemas.
- [Examples](/examples/): Copy practical patterns for Node.js, `Any`, registries, and custom options.

## What you get

- Generated messages are ordinary objects with typed properties, not generated getter and setter classes.
- `protoc-gen-es` is a normal Protobuf plugin, so it works with the Buf CLI and `protoc`.
- Proto2, proto3, Editions 2024, extensions, custom options, binary, JSON, and well-known types are covered.
- Generate TypeScript directly with `target=ts`, or JavaScript plus declarations with the default `js+dts` target.
- Descriptors, registries, and reflection wrappers are public APIs, not hidden implementation details.
- `@bufbuild/protoplugin` lets you write custom Protobuf plugins in TypeScript.

## Why Protobuf-ES {#comparison}

Protobuf-ES is a standard `protoc` plugin with direct TypeScript output, ESM by default, plain object messages, schema exports, discriminated oneofs, typed extensions, and public reflection APIs. Buf's public Protobuf conformance runner reports 0 required-test failures for Protobuf-ES on Edition 2024.

For details, see the [conformance results](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf-es), [bundle size comparison](https://github.com/bufbuild/protobuf-es/tree/main/packages/bundle-size), and [Migrating from v1](/migrating-from-v1/) if you are upgrading existing code.

## Packages

- [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf): Runtime library with message APIs, well-known types, JSON, reflection, registries, and extensions.
- [@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es): Standard Protobuf plugin for TypeScript and JavaScript generation.
- [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin): Framework for writing your own Protobuf plugins in TypeScript.

## Compatibility

- [Node.js](https://nodejs.org/): All maintained releases are supported.
- [Deno](https://deno.com/): Latest LTS release is supported.
- [Bun](https://bun.com/): Latest v1 release is supported.
- [TypeScript](https://www.typescriptlang.org/): Versions less than 2 years old are supported with default compiler settings.

## More resources

- [Code example](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example): Working application code using generated Protobuf types.
- [Plugin example](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoplugin-example): A custom plugin that generates Twirp clients.
- [Conformance results](https://github.com/bufbuild/protobuf-conformance): Public runner and comparison table.
- [Bundle size comparison](https://github.com/bufbuild/protobuf-es/tree/main/packages/bundle-size): Side-by-side numbers against Google's generator.
- [connect-es](https://github.com/connectrpc/connect-es): Companion RPC library for Connect, gRPC, and gRPC-Web.
- [Migrating from v1](/migrating-from-v1/): Package updates and generated API changes for existing Protobuf-ES users.
