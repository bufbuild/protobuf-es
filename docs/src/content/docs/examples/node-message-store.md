---
title: Node message store
---

This walkthrough is a shortened version of [`packages/protobuf-example`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example). A size-delimited binary file can store a sequence of `User` messages. Each message is prefixed with its encoded length, so a stream can contain more than one message.

## Schema

Create `proto/example.proto`:

```protobuf
syntax = "proto3";
package example;

message User {
  string first_name = 1;
  string last_name = 2;
  bool active = 3;
  repeated string locations = 4;
}
```

Generate TypeScript with the same setup from [Getting started](/getting-started/). For import path and target settings, see [Plugin options](/plugin-options/).

## Add a user

`sizeDelimitedEncode()` returns bytes you can append to a file.

```typescript
import { appendFileSync } from "node:fs";
import { create } from "@bufbuild/protobuf";
import { sizeDelimitedEncode } from "@bufbuild/protobuf/wire";
import { UserSchema } from "./gen/example_pb";

const user = create(UserSchema, {
  firstName: "Homer",
  lastName: "Simpson",
  active: true,
  locations: ["Springfield"],
});

appendFileSync("users.binpb", sizeDelimitedEncode(UserSchema, user));
```

## List users

`sizeDelimitedDecodeStream()` parses one message at a time from a Node stream.

```typescript
import { createReadStream } from "node:fs";
import { sizeDelimitedDecodeStream } from "@bufbuild/protobuf/wire";
import { UserSchema } from "./gen/example_pb";

const stream = createReadStream("users.binpb");

for await (const user of sizeDelimitedDecodeStream(UserSchema, stream)) {
  console.log(`${user.firstName} ${user.lastName}`);
}
```

For single-message binary serialization, use `toBinary()` and `fromBinary()` instead. See [Serialization](/serialization/) for both formats.

## Runnable version

The repository has a complete version with prompts and npm scripts in [`packages/protobuf-example`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example).
