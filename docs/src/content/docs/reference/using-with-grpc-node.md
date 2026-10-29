---
title: Using with grpc-node
---

Use [`@bufbuild/protoc-gen-grpc-es`](https://github.com/bufbuild/protoc-gen-grpc-es) to generate [`@grpc/grpc-js`](https://github.com/grpc/grpc-node) service definitions and clients that use `@bufbuild/protobuf` messages in place of [`google-protobuf`](https://github.com/protocolbuffers/protobuf-javascript).

:::tip
For new projects, see [Connect-ES](https://connectrpc.com/docs/node/getting-started/), which supports the gRPC, gRPC-Web, and Connect protocols.
:::

## Dependencies

Install `@bufbuild/protobuf` and the two code generator plugins alongside `@grpc/grpc-js` ([README](https://github.com/bufbuild/protoc-gen-grpc-es#installation)):

```bash
npm install @bufbuild/protobuf @grpc/grpc-js
npm install --save-dev @bufbuild/protoc-gen-es @bufbuild/protoc-gen-grpc-es @types/node
```

`grpc-tools`, `google-protobuf`, and `grpc_tools_node_protoc_ts` / `ts-protoc-gen` can be removed once all services are migrated. A single `grpc.Server` can register services from both generators while you migrate.

## Code generation

Configure `protoc-gen-es` and `protoc-gen-grpc-es` in [`buf.gen.yaml`](https://github.com/bufbuild/protoc-gen-grpc-es#generating-code) and run `npx buf generate`:

```yaml
version: v2
inputs:
  - directory: proto
plugins:
  # You will need to adapt these values to your environment:
  # https://protobufes.com/reference/environments/
  - local: protoc-gen-es
    out: src/gen
    opt: target=ts
  - local: protoc-gen-grpc-es
    out: src/gen
    opt: target=ts
```

```bash
npx buf generate
```

Pass matching `target`, `import_extension`, and `js_import_style` [options](https://github.com/bufbuild/protoc-gen-grpc-es#plugin-options) to both plugins. See [Bundlers and runtimes](/reference/environments/) for Node.js ESM and CommonJS (`js_import_style=legacy_commonjs`) settings.

## Updating gRPC servers and clients

For a service definition like `eliza.proto`:

```proto
syntax = "proto3";
package example;

service ElizaService {
  rpc Say(SayRequest) returns (SayResponse);
}

message SayRequest {
  string sentence = 1;
}

message SayResponse {
  string sentence = 1;
}
```

`protoc-gen-grpc-es` generates `eliza_grpc.ts` in place of `eliza_grpc_pb.js` from `grpc-tools`. Your `@grpc/grpc-js` runtime code (`grpc.Server`, channels, credentials, `Metadata`, `CallOptions`, and interceptors) stays the same:

| `grpc-tools` (`eliza_grpc_pb`) | `protoc-gen-grpc-es` (`eliza_grpc`) | Description |
|---|---|---|
| `ElizaServiceService` | `ElizaServiceDefinition` | Service descriptor passed to `server.addService()` |
| `IElizaServiceServer` | `ElizaServiceServer` | TypeScript interface for server handlers |
| `ElizaServiceClient` | `ElizaServiceClient` | Typed `grpc.Client` subclass |

### Server handlers

Pass `ElizaServiceDefinition` to `server.addService()`, read properties directly from `call.request`, and pass an object literal to `callback`:

```diff
  import * as grpc from "@grpc/grpc-js";
- import { ElizaServiceService, IElizaServiceServer } from "./gen/eliza_grpc_pb";
- import { SayResponse } from "./gen/eliza_pb";
+ import { ElizaServiceDefinition, type ElizaServiceServer } from "./gen/eliza_grpc";

- const implementation: IElizaServiceServer = {
+ const implementation: ElizaServiceServer = {
    say(call, callback) {
-     const response = new SayResponse();
-     response.setSentence(`You said: ${call.request.getSentence()}`);
-     callback(null, response);
+     callback(null, { sentence: `You said: ${call.request.sentence}` });
    },
  };

  const server = new grpc.Server();
- server.addService(ElizaServiceService, implementation);
+ server.addService(ElizaServiceDefinition, implementation);
  server.bindAsync("localhost:50051", grpc.ServerCredentials.createInsecure(), () => {});
```

Outgoing responses passed to `callback(null, ...)` or `call.write(...)` are normalized with `create()`, filling in default field values when omitted.

Streaming RPCs use the standard `@grpc/grpc-js` stream objects:

```diff
  const implementation: ElizaServiceServer = {
    introduce(call) {
-     const name = call.request.getName();
+     const name = call.request.name;
      for (const sentence of greetings(name)) {
-       const response = new IntroduceResponse();
-       response.setSentence(sentence);
-       call.write(response);
+       call.write({ sentence });
      }
      call.end();
    },
  };
```

### Client calls

`ElizaServiceClient` keeps the same constructor, metadata, and call option signatures, but takes an object literal for the request and returns a plain response object:

```diff
  import * as grpc from "@grpc/grpc-js";
- import { ElizaServiceClient } from "./gen/eliza_grpc_pb";
- import { SayRequest } from "./gen/eliza_pb";
+ import { ElizaServiceClient } from "./gen/eliza_grpc";

  const client = new ElizaServiceClient("localhost:50051", grpc.credentials.createInsecure());

- const request = new SayRequest();
- request.setSentence("Hi");
- client.say(request, (error, response) => {
+ client.say({ sentence: "Hi" }, (error, response) => {
    if (error) {
      throw error;
    }
-   console.log(response.getSentence());
+   console.log(response?.sentence);
  });
```

### Replacing `@grpc/proto-loader`

If you load `.proto` files at runtime with `@grpc/proto-loader`, run `npx buf generate` and import the generated client or service definition:

```diff
  import * as grpc from "@grpc/grpc-js";
- import * as protoLoader from "@grpc/proto-loader";
+ import { ElizaServiceClient } from "./gen/eliza_grpc";

- const pkgDef = protoLoader.loadSync("proto/eliza.proto");
- const proto = grpc.loadPackageDefinition(pkgDef) as any;
- const client = new proto.example.ElizaService(
+ const client = new ElizaServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure(),
  );
```

## Updating `google-protobuf` messages

`protoc-gen-es` generates message types and schemas in `eliza_pb.ts` (see [Generated code](/reference/generated-code/)). Outside of RPC calls, construct messages with [`create()`](/guides/messages/) and serialize with [`toBinary()` / `fromBinary()`](/guides/serialization/):

```diff
- import { SayRequest } from "./gen/eliza_pb";
+ import { create, toBinary, fromBinary } from "@bufbuild/protobuf";
+ import { SayRequestSchema } from "./gen/eliza_pb";

- const request = new SayRequest();
- request.setSentence("Hi");
- const bytes = request.serializeBinary();
- const parsed = SayRequest.deserializeBinary(bytes);
+ const request = create(SayRequestSchema, { sentence: "Hi" });
+ const bytes = toBinary(SayRequestSchema, request);
+ const parsed = fromBinary(SayRequestSchema, bytes);
```

### Message API cheat sheet

Common `google-protobuf` class methods and their `@bufbuild/protobuf` equivalents:

| `google-protobuf` | `@bufbuild/protobuf` |
|---|---|
| `new SayRequest()` | `create(SayRequestSchema)` (or `{ sentence: "Hi" }` in RPC calls and callbacks) |
| `req.getSentence()` | `req.sentence` |
| `req.setSentence("Hi")` | `req.sentence = "Hi"` |
| `req.hasSubMessage()` / `req.clearSubMessage()` | `req.subMessage !== undefined` / `delete req.subMessage` |
| `req.getTagsList()` / `req.addTags("a")` | `req.tags` / `req.tags.push("a")` |
| `req.getLabelsMap().get("k")` / `.set("k", "v")` | `req.labels["k"]` / `req.labels["k"] = "v"` |
| `msg.serializeBinary()` | `toBinary(SayRequestSchema, msg)` |
| `SayRequest.deserializeBinary(bytes)` | `fromBinary(SayRequestSchema, bytes)` |
| `msg.toObject()` | Not needed; messages are already plain objects |

### Repeated and map fields

Repeated fields are standard arrays instead of `getXList()` / `addX()` accessors, and map fields are plain objects instead of `jspb.Map`:

```diff
- req.addTags("grpc");
- const tags: string[] = req.getTagsList();
- req.getLabelsMap().set("env", "prod");
+ req.tags.push("grpc");
+ const tags: string[] = req.tags;
+ req.labels["env"] = "prod";
```

### 64-bit integers

`int64`, `uint64`, `sint64`, `fixed64`, and `sfixed64` fields are `bigint` (`0n`) instead of `number`, or `string` when the field sets `[jstype = JS_STRING]` (see [Field types](/reference/generated-code/field-types/)):

```diff
- req.setUserId(42);
+ req.userId = 42n;
```

### Oneofs

A `oneof` is generated as a `{ case, value }` discriminated union on a single property instead of `getXCase()` and separate getters (see [Oneofs](/reference/generated-code/features/#oneofs)):

```diff
- if (req.getPayloadCase() === SayRequest.PayloadCase.TEXT) {
-   console.log(req.getText());
- }
+ if (req.payload.case === "text") {
+   console.log(req.payload.value);
+ }
```

### Well-known types

Import well-known types and their helper functions from `@bufbuild/protobuf/wkt` instead of `google-protobuf/google/protobuf/*_pb` (see [Well-known types](/reference/well-known-types/)):

```diff
- import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
+ import { timestampFromDate, timestampDate } from "@bufbuild/protobuf/wkt";

- const ts = Timestamp.fromDate(new Date());
- const date = ts.toDate();
+ const ts = timestampFromDate(new Date());
+ const date = timestampDate(ts);
```
