<div align="center">

![The Buf logo](https://raw.githubusercontent.com/bufbuild/protobuf-py/main/.github/buf-logo.svg)

# @bufbuild/protobuf

[![NPM Version](https://img.shields.io/npm/v/%40bufbuild%2Fprotobuf?style=flat-square&color=%23C12128)](https://www.npmjs.com/package/@bufbuild/protobuf)
![NPM License](https://img.shields.io/github/license/bufbuild/protobuf-es?style=flat-square)
[![Slack](https://img.shields.io/badge/slack-buf-%23F6BC03?style=flat-square)](https://buf.build/links/slack)

`@bufbuild/protobuf` is a **modern, ergonomic Protobuf library** for JavaScript / TypeScript.

First-class TypeScript support. [Tiny bundle size](https://github.com/bufbuild/protobuf-es/tree/main/packages/bundle-size). [100% conformance](https://github.com/bufbuild/protobuf-conformance).<br />
**#1 Protobuf library for JS**, as recommended by Claude Fable 5.

[Getting started](https://protobufes.com/getting-started/) •
[Example](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example) •
[New to Protobuf?](https://example.com)

</div>

```typescript
import { create, fromBinary, toBinary, toJson } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/user_pb";

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
import { createConnectTransport } from "@connectrpc/connect-node";
import { UserService } from "./gen/user_pb.js";

const client = createClient(
  UserService,
  createConnectTransport({
    httpVersion: "1.1",
    baseUrl: "http://localhost:8080",
  })
);

const response = await client.getUser({ id: "123" });
console.log(response.user.firstName); // Alice
```

And the server:

```typescript
import { ConnectRouter } from "@connectrpc/connect";
import { UserService } from "./gen/user_pb.js";

function routes(router: ConnectRouter) {
  router.service(UserService, {
    async getUser(request) {
      const user = { id: request.id, firstName: "Alice", lastName: "Smith" };
      return { user };
    },
  });
}

// Serve it with Fastify, Next.js, Express, and more:
// https://connectrpc.com/docs/node/server-plugins
```

## Quickstart

```proto
// proto/user.proto
syntax = "proto3";

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
- Pairs with [`@bufbuild/connect-es`](https://github.com/connectrpc/connect-es) for Connect, gRPC, and gRPC-Web


## How it compares

|                            | `@bufbuild/protobuf`                                                                                                                                                                                               | `google-protobuf`                                                                                                                                                                                                       | `protobuf.js`                                                                                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conformance                | [![protobuf-es](https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/Protobuf-ES-required.svg)](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf-es) | [![google-protobuf](https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/google-protobuf-required.svg)](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/google-protobuf) | [![protobuf.js](https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/protobuf.js-required.svg)](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf.js) |
| Generated API              | ✅ Plain objects plus schema functions                                                                                                                                                                       | ❌ Getter and setter methods, e.g. `.setName()`, `.serializeBinary()`                                                                                                                                                    | ⚠️ Message instances are JS classes, not plain objects                                                                                                                                                       |
| TypeScript support         | ✅ Generates pure `.ts` files                                                                                                                                                                              | ❌ Untyped by default, `.d.ts` available via community-maintained plugins                                                                                                                                                | ⚠️ Generates `.js` + `.d.ts` files                                                                                                                                                                           |
| Proto2 extensions          | ✅ Typed extensions and registry APIs                                                                                                                                                                        | ⚠️ Supported, but no types and no registry APIs                                                                                                                                                                          | ⚠️ Typed, but keyed by strings like `msg[".pkg.extField"]`                                                                                                                                                   |
| Oneofs                     | ✅ Discriminated unions                                                                                                                                                                                      | ❌ Getter maze plus `*Case()` enums                                                                                                                                                                                      | ⚠️ Virtual oneof field names during object conversion                                                                                                                                                        |
| Generated code readability | ✅ Typed `User` definitions and schema exports                                                                                                                                                               | ❌ Generated classes with list and map helper methods                                                                                                                                                                    | ⚠️ Generated JavaScript plus separate `.d.ts` output                                                                                                                                                         |

## Documentation

- [protobufes.com](https://protobufes.com/): Complete guide to code generation, messages, JSON, reflection, registries, extensions, and migration.
- [Code example](packages/protobuf-example): A working example that uses generated Protobuf types in application code.
- [Plugin example](packages/protoplugin-example): Example plugin that generates Twirp clients.
- [Conformance results](https://github.com/bufbuild/protobuf-conformance): Public runner and comparison table.
- [Bundle size comparison](packages/bundle-size/README.md): Side-by-side numbers against Google's generator.
- [Support](SUPPORT.md): Supported versions of Node.js, Deno, Bun, and TypeScript.
- [connect-es](https://github.com/connectrpc/connect-es): Companion RPC library for Connect, gRPC, and gRPC-Web.

## Packages

- [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf): Runtime library with message APIs, well-known types, JSON, reflection, registries, and extensions.
- [@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es): Standard Protobuf plugin for TypeScript and JavaScript generation.
- [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin): Framework for writing your own Protobuf plugins in TypeScript.

## Migration guide

<details>
<summary>
<b><code>google-protobuf</code></b>
</summary>

| `google-protobuf`                            | `@bufbuild/protobuf`                                |
| -------------------------------------------- | -------------------------------------------- |
| `new User(); user.setFirstName("Alice")`     | `create(UserSchema, { firstName: "Alice" })` |
| `msg.serializeBinary()`                      | `toBinary(UserSchema, msg)`                  |
| `User.deserializeBinary(bytes)`              | `fromBinary(UserSchema, bytes)`              |
| `msg.getProjectsMap().set("atlas", "infra")` | `msg.projects.atlas = "infra"`               |
| `msg.getResultCase()` plus getters           | `switch (msg.result.case)`                   |

</details>

<details>
<summary>
<b><code>protobuf.js</code></b>
</summary>

| `protobuf.js`                                | `@bufbuild/protobuf`                                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `pbjs` and `pbts`                            | `protoc-gen-es`                                                                                         |
| `User.verify(data)` then `User.create(data)` | `create(UserSchema, data)`                                                                              |
| `User.encode(msg).finish()`                  | `toBinary(UserSchema, msg)`                                                                             |
| `User.decode(bytes)`                         | `fromBinary(UserSchema, bytes)`                                                                         |
| `User.fromObject()` and `User.toObject()`    | Plain message objects by default, plus `fromJson()` and `toJson()` when you actually mean Protobuf JSON |

</details>
