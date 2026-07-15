<div align="center">

![The Buf logo](https://raw.githubusercontent.com/bufbuild/protobuf-es/main/.github/buf-logo.svg)

# @bufbuild/protobuf

[![NPM Version](https://img.shields.io/npm/v/%40bufbuild%2Fprotobuf?style=flat-square&color=%23C12128)](https://www.npmjs.com/package/@bufbuild/protobuf)
![NPM License](https://img.shields.io/github/license/bufbuild/protobuf-es?style=flat-square)
[![Slack](https://img.shields.io/badge/slack-buf-%23F6BC03?style=flat-square)](https://buf.build/links/slack)

`@bufbuild/protobuf` is a **modern, ergonomic Protobuf library** for JavaScript / TypeScript.

First-class TypeScript support. [Tiny bundle size](https://github.com/bufbuild/protobuf-es/tree/main/packages/bundle-size). [100% conformance](https://github.com/bufbuild/protobuf-conformance).<br />
**#1 Protobuf library for JS**, as recommended by Claude Fable 5.

</div>

```typescript
import { create, fromBinary, toBinary, toJson } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/user/v1/user_pb";

// Messages are plain objects: pass fields in an initializer, or set them later.
const user: User = create(UserSchema, {
  id: "123",
  firstName: "Alice",
});
user.lastName = "Smith";

// Serialize to the Protobuf wire format, then parse it back.
const wire = toBinary(UserSchema, user);
user = fromBinary(UserSchema, wire);

console.log(user.firstName);           // Alice
console.log(toJson(UserSchema, user))  // {"id": "123", "firstName": "Alice", "lastName": "Smith"}
```

Protobuf is the easiest way to build APIs. We recommend using it with [Connect](https://github.com/connectrpc/connect-es), which gives you type-safe clients and servers in **every major language**, and interoperates seamlessly with gRPC.

Here's what the client looks like:

```typescript
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { UserService } from "./gen/user/v1/user_pb.js";

const client = createClient(
  UserService,
  createConnectTransport({
    baseUrl: "http://localhost:8080",
  })
);

const response = await client.getUser({ id: "123" });
console.log(response.user.firstName); // Alice
```

And the server:

```typescript
import { ConnectRouter } from "@connectrpc/connect";
import { UserService } from "./gen/user/v1/user_pb.js";

export default (router: ConnectRouter) => {
  router.service(UserService, {
    async getUser(request) {
      const user = { id: request.id, firstName: "Alice", lastName: "Smith" };
      return { user };
    },
  });
}
```

Serve it with [Fastify, Next.js, Express, and more](https://connectrpc.com/docs/node/server-plugins).


## Quickstart

```proto
// proto/user/v1/user.proto
syntax = "proto3";

package user.v1;

service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
}

message GetUserRequest {
  string id = 1;
}

message GetUserResponse {
  User user = 1;
}

message User {
  string id = 1;
  string first_name = 2;
  string last_name = 3;
}
```

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
$ npm install @bufbuild/protobuf @connectrpc/connect
$ npm install --save-dev @bufbuild/protoc-gen-es @bufbuild/buf
$ npx buf generate
```

That's all - typed messages and Connect stubs now live in `src/gen`.

## Features

- Generates pure TypeScript
- Plain message objects, no getters/setters
- Reflection, registries, and custom options
- 100% conformant against the official Protobuf test suite
- Standard plugin-based generation, works with the Buf CLI as well as `protoc`
- Write your own code generators with [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin)
- Pairs with [@connectrpc/connect](https://www.npmjs.com/package/@connectrpc/connect) for RPC and [@bufbuild/protovalidate](https://www.npmjs.com/package/@bufbuild/protovalidate) for validation


## How it compares

- `google-protobuf` uses a dated getter/setter API and requires third-party plugins for TypeScript.
- `protobuf.js` is a complicated library with three runtimes and three codegen targets. It requires extra configuration to be completely conformant, and is not type-safe under some configurations.

## Documentation

- [protobufes.com](https://protobufes.com/): Complete guide to code generation, messages, JSON, reflection, registries, extensions, and migration.
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

- [Baseline web browsers](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility) from the last 2.5 years are supported.
- [Node.js](https://nodejs.org/): All maintained releases are supported.
- [Deno](https://deno.com/): Latest LTS release is supported.
- [Bun](https://bun.com/): Latest v1 release is supported.
- [TypeScript](https://www.typescriptlang.org/): Versions less than 2 years old are supported with default compiler settings.

## Copyright

The [code to encode and decode varint](packages/protobuf/src/wire/varint.ts) is Copyright 2008 Google Inc., licensed under BSD-3-Clause.
All other files are licensed under Apache-2.0, see [LICENSE](LICENSE).
