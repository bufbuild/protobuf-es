---
title: Getting started
---

This is the fast path into the runtime JavaScript and TypeScript should have had from the start. In a few minutes, you will generate plain TypeScript, create a real typed message object, and serialize it with a standard Protobuf plugin.

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

## Configure code generation

Create `buf.gen.yaml`:

```yaml
version: v2
inputs:
  - directory: proto
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt: target=ts
```

Run the generator:

```shellsession
npx buf generate
```

Your project now looks like this:

```text
.
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

`create()` constructs a message value. `toBinary()` serializes it. `fromBinary()` parses it back. There is no generated class boilerplate, no getter and setter layer, and no second step to recover TypeScript types.

## Generate with `protoc`

`protoc-gen-es` is a standard Protobuf plugin, so it also works with `protoc`:

```shellsession
PATH=${PATH}:$(pwd)/node_modules/.bin \
  protoc -I . \
  --es_out src/gen \
  --es_opt target=ts \
  proto/example.proto
```

`protoc` must be able to find `protoc-gen-es` on `PATH`. npm scripts take care of this automatically.

If you use Yarn v2 or later, there is no `node_modules/.bin` directory. Use the path returned by `yarn bin protoc-gen-es` instead:

```shellsession
PATH=$(dirname $(yarn bin protoc-gen-es)):${PATH}
```

## Next steps

- [Plugin options](/plugin-options/): Change the generated target, import style, JSON typing, and more.
- [Generated code](/generated-code/): See how messages, enums, services, maps, oneofs, and extensions are represented.
- [Working with messages](/working-with-messages/): Learn the main runtime APIs.
