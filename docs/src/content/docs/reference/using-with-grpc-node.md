---
title: Using with grpc-node
---

Use [`@bufbuild/protoc-gen-grpc-es`](https://github.com/bufbuild/protoc-gen-grpc-es) to generate [`@grpc/grpc-js`](https://github.com/grpc/grpc-node) service definitions and clients that use `@bufbuild/protobuf` messages in place of [`google-protobuf`](https://github.com/protocolbuffers/protobuf-javascript).

:::tip
For new projects, see [Connect-ES](https://connectrpc.com/docs/node/getting-started/), which supports the gRPC, gRPC-Web, and Connect protocols.
:::

## Dependencies

Install `@bufbuild/protobuf` and the two code generator plugins alongside `@grpc/grpc-js` ([README](https://github.com/bufbuild/protoc-gen-grpc-es#installation)):

```shellsession
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
  - local: protoc-gen-es
    out: src/gen
    opt: target=ts
  - local: protoc-gen-grpc-es
    out: src/gen
    opt: target=ts
```

```shellsession
npx buf generate
```

Pass matching `target`, `import_extension`, and `js_import_style` [options](https://github.com/bufbuild/protoc-gen-grpc-es#plugin-options) to both plugins. See [Bundlers and runtimes](/reference/environments/) for Node.js ESM and CommonJS (`js_import_style=legacy_commonjs`) settings.

## Generated exports

For `eliza.proto`:

```protobuf
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

`protoc-gen-es` writes message types and schemas to `eliza_pb.ts` ([Generated code](/reference/generated-code/)). `protoc-gen-grpc-es` writes `eliza_grpc.ts` (replacing `eliza_grpc_pb.js`):

- `ElizaServiceDefinition` — descriptor for `server.addService()` (was `ElizaServiceService`)
- `ElizaServiceServer` — handler interface (was `IElizaServiceServer`)
- `ElizaServiceClient` — typed `grpc.Client` subclass

## Server handlers

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

## Client calls

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

## Standalone messages and serialization

Outside of RPC calls, construct messages with [`create()`](/guides/messages/) and serialize with [`toBinary()` / `fromBinary()`](/guides/serialization/):

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

## Replacing `@grpc/proto-loader`

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

## Cheat sheet

| `grpc-tools` / `google-protobuf` | `protoc-gen-grpc-es` / `@bufbuild/protobuf` |
|---|---|
| `./gen/eliza_grpc_pb` | `./gen/eliza_grpc` |
| `ElizaServiceService` | `ElizaServiceDefinition` |
| `IElizaServiceServer` | `ElizaServiceServer` |
| `new SayRequest()` | `create(SayRequestSchema, { sentence: "Hi" })` |
| `req.getSentence()` / `req.setSentence("Hi")` | `req.sentence` / `req.sentence = "Hi"` |
| `req.getTagsList()` / `req.getLabelsMap()` | `req.tags` (`string[]`) / `req.labels` (`{ [key: string]: string }`) |
| 64-bit `number` / `string` | `bigint` ([Field types](/reference/generated-code/field-types/)) |
| `req.getPayloadCase()` | `req.payload.case` ([Oneofs](/reference/generated-code/features/#oneof)) |
| `google-protobuf/google/protobuf/timestamp_pb` | `@bufbuild/protobuf/wkt` ([Well-known types](/reference/well-known-types/)) |
| `msg.serializeBinary()` | `toBinary(SayRequestSchema, msg)` |
| `SayRequest.deserializeBinary(bytes)` | `fromBinary(SayRequestSchema, bytes)` |

