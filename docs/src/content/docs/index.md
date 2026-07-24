---
title: Protobuf-ES
---

The Protobuf runtime JavaScript and TypeScript should have had from the start.

Protobuf-ES supports proto2, proto3, and Editions 2024, including extensions and custom options, with `0` required conformance failures in [Buf's public Protobuf conformance runner](https://github.com/bufbuild/protobuf-conformance). It generates plain TypeScript that looks like normal TypeScript, uses ECMAScript modules by default, and works in browsers, Node.js, Deno, and Bun.

If you want full Protobuf semantics with an API that feels at home in modern JavaScript, start here.

```typescript
import { create, fromBinary, toBinary, toJson } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/example_pb";

const user: User = create(UserSchema, {
  firstName: "Alice",
  lastName: "Smith",
  active: true,
  locations: ["NYC", "LDN"],
  projects: { atlas: "infra" },
});

const wire: Uint8Array = toBinary(UserSchema, user);
const roundTrip: User = fromBinary(UserSchema, wire);
const json = toJson(UserSchema, roundTrip);

roundTrip.firstName;
roundTrip.projects.atlas;
json;
```

Define a schema in `.proto`, generate code with `protoc-gen-es`, then use plain message objects in your application. Generated files give you schema exports, typed fields, discriminated oneofs, and regular arrays and objects. Runtime helpers handle binary, JSON, reflection, extensions, and custom options.

## Generated code you can read

`protoc-gen-es` emits a real TypeScript type and a schema export for every message:

```typescript
export type User = Message<"example.User"> & {
  firstName: string;
  lastName: string;
  active: boolean;
  locations: string[];
  projects: { [key: string]: string };
};

export const UserSchema: GenMessage<User> = messageDesc(file_example, 0);
```

That is a better starting point than APIs like `getLocationsList()`, `setLocationsList()`, `getProjectsMap()`, or `serializeBinary()`. It is also cleaner than generating JavaScript first and running another tool to recover type information.

## What you get

- Plain object messages with typed properties, not classes wrapped around your data.
- A standard Protobuf plugin, so `protoc-gen-es` works with the Buf CLI and `protoc`.
- ESM by default, with CommonJS output when you need it.
- Direct TypeScript generation with `target=ts`, or JavaScript plus declarations with the default `js+dts` target.
- Discriminated oneofs that TypeScript can narrow with `switch`.
- Full Protobuf coverage: proto2, proto3, Editions 2024, extensions, custom options, canonical JSON, well-known types, unknown fields, reflection, and registries.
- Public reflection APIs for descriptors, registries, dynamic message access, `Any`, and schema-driven tools.
- A plugin framework, `@bufbuild/protoplugin`, for writing your own Protobuf plugins in TypeScript.

## Why Protobuf-ES {#comparison}

Public conformance is the starting point. The [protobuf-conformance](https://github.com/bufbuild/protobuf-conformance) runner tests proto2, proto3, and the highest Edition each implementation advertises.

`google-protobuf` implements the core surface, but its JavaScript API still reads like an older generation of generated code: `setName()`, `getNamesList()`, `getProjectsMap()`, and `serializeBinary()`. `protobuf.js` moved JavaScript Protobuf in a friendlier direction, but its workflow still centers on `pbjs`, `pbts`, and its own plugin system.

Protobuf-ES keeps the usable API and adds the pieces teams eventually need: standard plugin flow, stronger conformance, Editions 2024, typed extensions, public descriptors, and registries.

## Start here

- [Getting started](/getting-started/): generate code and write your first message.
- [Examples](/examples/): copyable patterns and runnable example packages.
- [Reference](/reference/): generated shapes, plugin options, and runtime types.
- [Migrating from v1](/reference/migrating-from-v1/): for existing Protobuf-ES users.

## Packages

- [`@bufbuild/protobuf`](https://www.npmjs.com/package/@bufbuild/protobuf): runtime library with message APIs, well-known types, JSON, reflection, registries, and extensions.
- [`@bufbuild/protoc-gen-es`](https://www.npmjs.com/package/@bufbuild/protoc-gen-es): Protobuf plugin for TypeScript and JavaScript generation.
- [`@bufbuild/protoplugin`](https://www.npmjs.com/package/@bufbuild/protoplugin): framework for writing your own Protobuf plugins in TypeScript.

## Compatibility

- [Node.js](https://nodejs.org/): all maintained releases.
- Browsers: modern browsers with ECMAScript module support.
- [Deno](https://deno.com/): latest LTS release.
- [Bun](https://bun.com/): latest v1 release.
- [TypeScript](https://www.typescriptlang.org/): versions less than 2 years old with default compiler settings.

## More resources

- [`packages/protobuf-example`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example): a runnable Node application using generated Protobuf types.
- [`packages/protoplugin-example`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoplugin-example): a custom plugin that generates Twirp clients.
- [Conformance results](https://github.com/bufbuild/protobuf-conformance): public runner and comparison table.
- [Bundle size comparison](https://github.com/bufbuild/protobuf-es/tree/main/packages/bundle-size): side-by-side numbers against Google's generator.
- [connect-es](https://github.com/connectrpc/connect-es): RPC library for ConnectRPC, gRPC, and gRPC-Web.
- [protovalidate-es](https://github.com/bufbuild/protovalidate-es): validation for Protobuf messages.
