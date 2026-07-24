---
title: Any with registries
---

`google.protobuf.Any` stores an arbitrary message together with a type URL. If you know the expected schema, unpack directly. If you only learn the type URL at runtime, use a registry.

See [Well-known types](/reference/well-known-types/#googleprotobufany) and [Registries](/reference/reflection/registries/) for the underlying APIs.

## Schema

```protobuf
syntax = "proto3";
package example;

import "google/protobuf/any.proto";

message User {
  string first_name = 1;
  string last_name = 2;
}

message Event {
  google.protobuf.Any payload = 1;
}
```

## Pack the payload

```typescript
import { create } from "@bufbuild/protobuf";
import { anyPack } from "@bufbuild/protobuf/wkt";
import { EventSchema, UserSchema } from "./gen/example_pb";

const user = create(UserSchema, {
  firstName: "Marge",
  lastName: "Simpson",
});

const event = create(EventSchema, {
  payload: anyPack(UserSchema, user),
});
```

## Unpack with a known schema

```typescript
import { anyIs, anyUnpack } from "@bufbuild/protobuf/wkt";
import { UserSchema } from "./gen/example_pb";

if (event.payload && anyIs(event.payload, UserSchema)) {
  const user = anyUnpack(event.payload, UserSchema);
  user?.firstName;
}
```

## Unpack with a registry

```typescript
import { createRegistry } from "@bufbuild/protobuf";
import { anyUnpack } from "@bufbuild/protobuf/wkt";
import { UserSchema } from "./gen/example_pb";

const registry = createRegistry(UserSchema);

if (event.payload) {
  const message = anyUnpack(event.payload, registry);
  message?.$typeName;
}
```

Use the same registry when converting `Any` values to and from JSON. See [Well-known types](/reference/well-known-types/#googleprotobufany), [Registries](/reference/reflection/registries/), and [Serialization](/guides/serialization/#json-serialization-options).
