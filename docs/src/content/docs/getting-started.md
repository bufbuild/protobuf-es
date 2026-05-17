---
title: Getting started
---

JavaScript Protobuf should not force you to choose between correct Protobuf semantics and idiomatic TypeScript. Protobuf-ES gives you both: plain message objects, generated schema exports, ESM by default, typed fields, discriminated oneofs, binary and JSON serialization, reflection, extensions, and custom options.

This guide takes the fastest path from `.proto` to working code. You will generate TypeScript with the Buf CLI, create a typed message object, and serialize it with the same schema. Using the Buf CLI is the easiest way to run local code generation from npm, but Protobuf-ES is not tied to it: `protoc-gen-es` is a standard `protoc` plugin and fits existing Protobuf toolchains too.

## Prerequisites

- [Node.js](https://nodejs.org/) and `npm`
- The [Buf CLI](https://buf.build/docs/cli/)

## Create a project

Start with a new directory:

```shellsession
mkdir example
cd example
npm init -y
npm install typescript
npx tsc --init
```

Install the runtime library, the code generator, and the Buf CLI package:

```shellsession
npm install @bufbuild/protobuf
npm install --save-dev @bufbuild/buf @bufbuild/protoc-gen-es
```

## Add a schema

Create `proto/example.proto`:

```protobuf
syntax = "proto3";
package example;

message User {
  string first_name = 1;
  string last_name = 2;
  bool active = 3;
}
```

## Configure the Buf module

For this example, create `buf.yaml`:

```yaml
version: v2
modules:
  - path: proto
```

This declares `proto` as a Buf module, so generation can run from the project root.

## Configure code generation

Create `buf.gen.yaml`:

```yaml
version: v2
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt: target=ts
```

Run the generator:

```shellsession
npx buf generate
```

`target=ts` generates TypeScript source. See [Plugin options](/reference/plugin-options/) for JavaScript output, import extensions, JSON types, and other generator settings.

If you already use `protoc`, use the same plugin directly: `mkdir -p src/gen && PATH=${PATH}:$(pwd)/node_modules/.bin protoc -I proto --es_out=src/gen --es_opt=target=ts example.proto`.

Your project now looks like this:

```text
.
├── buf.yaml
├── buf.gen.yaml
├── package.json
├── proto
│   └── example.proto
└── src
    └── gen
        └── example_pb.ts
```

## Use the generated code

Import the generated schema and the runtime helpers:

```typescript
import { create, toBinary, fromBinary } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/example_pb";

const user: User = create(UserSchema, {
  firstName: "Homer",
  lastName: "Simpson",
  active: true,
});

const bytes = toBinary(UserSchema, user);
const roundTrip = fromBinary(UserSchema, bytes);

roundTrip.firstName; // "Homer"
```

`create()` constructs a message value. `toBinary()` serializes it. `fromBinary()` parses it back. Generated messages are ordinary objects, not class instances.

## Next steps

- [Working with messages](/guides/messages/): the main runtime APIs.
- [Serialization](/guides/serialization/): binary, JSON, and lower-level wire helpers.
- [Generated code](/reference/generated-code/): how messages, enums, services, maps, oneofs, and extensions are represented.
- [Plugin options](/reference/plugin-options/): change the generated target, import style, JSON typing, and more.
- [Examples](/examples/): copyable patterns built on the generated code.
