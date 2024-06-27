![The Buf logo](./.github/buf-logo.svg)

# Protobuf-ES

[![License](https://img.shields.io/github/license/bufbuild/protobuf-es?color=blue)](./LICENSE) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protobuf/latest?color=green&label=%40bufbuild%2Fprotobuf)](https://www.npmjs.com/package/@bufbuild/protobuf) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoplugin/latest?color=green&label=%40bufbuild%2Fprotoplugin)](https://www.npmjs.com/package/@bufbuild/protoplugin) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoc-gen-es/latest?color=green&label=%40bufbuild%2Fprotoc-gen-es)](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)

A complete implementation of [Protocol Buffers](https://developers.google.com/protocol-buffers) in TypeScript,
suitable for web browsers and Node.js, created by [Buf](https://buf.build).

Protobuf-ES is the only fully-compliant JavaScript Protobuf library that passes the
Protobuf conformance tests. [Read more on our blog.](https://buf.build/blog/protobuf-conformance)

Protobuf-ES's companion RPC library is [Connect-ES](https://github.com/connectrpc/connect-es),
which supports the Connect, gRPC, and gRPC-Web protocols.

## What are Protocol Buffers?

In a nutshell, Protocol Buffers have two main functions:

- They are a language for writing schemas for your data.
- They define a binary format for serializing your data.

These two independent traits work together to allow your project and everyone who interacts with it to define messages,
fields, and service APIs in the exact same way. In a practical sense as it relates to **Protobuf-ES**, this means no
more disparate JSON types all over the place. Instead, you define a common schema in a Protobuf file, such as:

```proto
syntax = "proto3";

message User {
  string first_name = 1;
  string last_name = 2;
  bool active = 3;
  User manager = 4;
  repeated string locations = 5;
  map<string, string> projects = 6;
}
```

This schema is compiled to ECMAScript with `buf` or `protoc`, and can be used like this:

```typescript
import { UserSchema } from "./gen/user_pb.js";
import { create, toBinary, toJson } from "@bufbuild/protobuf";

let user = create(UserSchema, {
  firstName: "Homer",
  lastName: "Simpson",
  active: true,
  locations: ["Springfield"],
  projects: { SPP: "Springfield Power Plant" },
  manager: {
    firstName: "Montgomery",
    lastName: "Burns",
  },
});

const bytes = toBinary(UserSchema, user);
const json = toJson(UserSchema, user);
```

The benefits can extend to any application that interacts with yours as well. This is because the Protobuf file above
can be used to generate types in many languages. The added bonus is that no one has to write any boilerplate code to
make this happen. [Code generators](https://www.npmjs.com/package/@bufbuild/protoc-gen-es) handle all of this for you.

Protocol Buffers also allow you to serialize this structured data. So, your application running in the browser can send
a `User` object to a backend running an entirely different language, but using the exact same definition. Using an RPC
framework like [Connect-ES](https://github.com/connectrpc/connect-es), your data is serialized into bytes on the wire
and then deserialized at its destination using the defined schema.

## Quickstart

1. Install the code generator, the runtime library, and the [Buf CLI](https://docs.buf.build/build/usage):

   ```bash
   npm install @bufbuild/protobuf @bufbuild/protoc-gen-es @bufbuild/buf
   ```

2. Create a `buf.gen.yaml` file that looks like this:

   ```yaml
   # Learn more: https://buf.build/docs/configuration/v2/buf-gen-yaml
   version: v2
   inputs:
     - directory: proto
   plugins:
     - local: protoc-gen-es
       opt: target=ts
       out: src/gen
   ```

3. Download the [example.proto](https://github.com/bufbuild/protobuf-es/blob/main/packages/protobuf-test/extra/example.proto) into a `/proto` directory:

   ```bash
   mkdir proto
   curl https://raw.githubusercontent.com/bufbuild/protobuf-es/main/packages/protobuf-test/extra/example.proto > proto/example.proto
   ```

4. Generate your code with `buf` or `protoc`:

   ```bash
   npx buf generate
   ```

You should now see a generated file at `src/gen/example_pb.ts` that contains a type `User`, and a schema `UserSchema`.
From here, you can begin to work with your schema.

## Packages

- [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf):
  Provides the runtime library, containing base types, generated well-known types, and core functionality. ([source code](packages/protobuf)).
- [@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es):
  Provides the code generator plugin `protoc-gen-es`. The code it generates depends on `@bufbuild/protobuf`. ([source code](packages/protoc-gen-es)).
- [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin):
  Helps to create your own code generator plugin. The code it generates depends on `@bufbuild/protobuf`. ([source code](packages/protoplugin)).

## Documentation

- [Code example](packages/protobuf-example) - Example code that uses protocol buffers to manage an address book.
- [Generated Code](docs/generated_code.md) - How to generate, and what code precisely is generated for any given protobuf definition.
- [Runtime API](docs/runtime_api.md) - A detailed overview of the features provided by the library `@bufbuild/protobuf`.
- [FAQ](docs/faq.md) - Frequently asked Questions.
- [Migrating to Protobuf-ES](docs/migrating.md) - Shows the changes you'll need to switch your existing code base.
- [Writing Plugins](docs/writing_plugins.md) - An overview of the process of writing a plugin using `@bufbuild/protoplugin`.

## Ecosystem

- [connect-es](https://github.com/connectrpc/connect-es):
  Type-safe APIs with Protobuf and TypeScript.
- [connect-es Examples](https://github.com/connectrpc/examples-es):
  Examples for using Connect with various TypeScript web frameworks and tooling
- [protobuf-conformance](https://github.com/bufbuild/protobuf-conformance):
  A repository running the Protobuf conformance tests against various libraries.
- [Buf Studio](https://buf.build/studio): Web UI for ad-hoc RPCs

## TypeScript

The generated code is compatible with TypeScript **v4.9.5** or later, with the default compiler settings.

## Copyright

The [code to encode and decode varint](packages/protobuf/src/wire/varint.ts) is Copyright 2008 Google Inc., licensed
under BSD-3-Clause.
All other files are licensed under Apache-2.0, see [LICENSE](LICENSE).
