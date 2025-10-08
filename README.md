![The Buf logo](./.github/buf-logo.svg)

# Protobuf-ES

[![License](https://img.shields.io/github/license/bufbuild/protobuf-es?color=blue)](./LICENSE) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protobuf/latest?color=green&label=%40bufbuild%2Fprotobuf)](https://www.npmjs.com/package/@bufbuild/protobuf) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoplugin/latest?color=green&label=%40bufbuild%2Fprotoplugin)](https://www.npmjs.com/package/@bufbuild/protoplugin) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoc-gen-es/latest?color=green&label=%40bufbuild%2Fprotoc-gen-es)](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)

A complete implementation of [Protocol Buffers](https://protobuf.dev/) in TypeScript,
suitable for web browsers, Node.js, and Deno, created by [Buf](https://buf.build).

Protobuf-ES is the only fully-compliant JavaScript Protobuf library that passes the
Protobuf conformance tests—[read more on our blog][blog-post].

Protobuf-ES's companion RPC library is [Connect-ES](https://github.com/connectrpc/connect-es),
which supports the Connect, gRPC, and gRPC-Web protocols.

## What is Protocol Buffers?

In a nutshell, Protocol Buffers (aka Protobuf) has two main functions:

- It's a language for writing schemas for your data.
- It defines a binary format for serializing your data.

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

You can then compile it to ECMAScript with `buf` or `protoc`, and use it like this:

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

The benefits of using Protobuf extend to any application that interacts with yours, because the Protobuf file above
can be used to generate types in many languages. The added bonus is that no one has to write any boilerplate code to
make this happen. [Code generators](https://www.npmjs.com/package/@bufbuild/protoc-gen-es) handle all of this for you.

Protobuf also allows you to serialize this structured data. Your application running in the browser can send
a `User` object to a backend running an entirely different language, but using the exact same definition. Using an RPC
framework like [Connect-ES](https://github.com/connectrpc/connect-es), your data is serialized into bytes on the wire
and then deserialized at its destination using the defined schema.

## Quickstart

1. Install the runtime library, code generator, and the [Buf CLI](https://buf.build/docs/ecosystem/cli-overview):

   ```shellsession
   npm install @bufbuild/protobuf
   npm install --save-dev @bufbuild/protoc-gen-es @bufbuild/buf
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

3. Download the [example.proto](packages/protobuf-example/proto/example.proto) into a `proto` directory:

   ```shellsession
   mkdir proto
   curl https://raw.githubusercontent.com/bufbuild/protobuf-es/main/packages/protobuf-example/proto/example.proto > proto/example.proto
   ```

4. Generate your code with `buf` or [`protoc`]:

   ```shellsession
   npx buf generate
   ```

You should now see a generated file at `src/gen/example_pb.ts` that contains a type `User`, and a schema `UserSchema`.
From here, you can begin to work with your schema.

## Documentation

- [Manual](MANUAL.md) - Explains all aspects of using Protobuf with ECMAScript.
- [Code example](packages/protobuf-example) - Example code that uses Protobuf to manage a persistent list of users.
- [Plugin example](packages/protoplugin-example) - Shows how to write a custom plugin to generate Twirp clients from
  Protobuf service definitions.

## Packages

- [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf):
  Provides the runtime library, containing base types, generated well-known types, and core functionality.
- [@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es):
  Provides the code generator plugin `protoc-gen-es`. The code it generates depends on `@bufbuild/protobuf`.
- [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin):
  Helps to create your own code generator plugin. The code it generates depends on `@bufbuild/protobuf`.

## Ecosystem

- [Connect-ES](https://github.com/connectrpc/connect-es):
  Type-safe APIs with Protobuf and TypeScript
- [Connect-ES examples](https://github.com/connectrpc/examples-es):
  Examples for using Connect with various TypeScript web frameworks and tooling
- [protobuf-conformance](https://github.com/bufbuild/protobuf-conformance):
  A repository running the Protobuf conformance tests against various libraries.
- [Buf Studio](https://buf.build/studio): Web UI for ad-hoc RPCs

## Compatibility

All maintained releases of Node.js ([Current, Active LTS, and the Maintenance LTS release](https://nodejs.org/en/about/previous-releases))
are supported.

The latest [Deno LTS version](https://docs.deno.com/runtime/fundamentals/stability_and_releases/) is supported.

[Same as Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped#support-window),
we support versions of TypeScript that are less than 2 years old, with default compiler
settings. Note that for some changes in TypeScript, it is impossible to support both
new and old versions in the support window. We break the tie by supporting the newer
version.

## Copyright

The [code to encode and decode varint](packages/protobuf/src/wire/varint.ts) is Copyright 2008 Google Inc., licensed
under BSD-3-Clause.
All other files are licensed under Apache-2.0, see [LICENSE](LICENSE).

[blog-post]: https://buf.build/blog/protobuf-conformance
[`protoc`]: MANUAL.md#generate-with-protoc
