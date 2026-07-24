---
title: Extensions
---

An extension is a field defined outside of its container message. Extensions are a core part of proto2 and are used in proto3 for [custom options](/reference/reflection/custom-options/).

## Defining extensions

In a `.proto` file, declare an extension range on the message and then define extension fields:

```protobuf
syntax = "proto2";

message User {
  extensions 100 to 200;
}

extend User {
  optional uint32 age = 100;
}
```

Protobuf-ES generates a typed extension descriptor:

```typescript
export declare const age: GenExtension<User, number>;
```

## Setting and reading extensions

Use the runtime helpers to work with extension values:

```typescript
import { create, setExtension, getExtension, hasExtension, clearExtension } from "@bufbuild/protobuf";
import { UserSchema, age } from "./gen/example_pb";

const user = create(UserSchema);

setExtension(user, age, 77);
hasExtension(user, age); // true
getExtension(user, age); // 77

clearExtension(user, age);
hasExtension(user, age); // false
```

`getExtension` never returns `undefined`. If the extension is not set, it returns the default value for the field type (e.g., `0` for numeric types, `[]` for repeated fields, an empty message for message fields).

Because extension values are decoded from binary on read, `getExtension` accepts an optional third argument with [binary serialization options](/guides/serialization/#binary-serialization-options), such as `recursionLimit`.

## Mutating repeated extension values

Extensions are stored as [unknown fields](/guides/serialization/#unknown-fields) on the message. Reading an extension value deserializes it from binary data each time. To mutate a repeated extension, read the value, modify it, then store it back:

```typescript
import { getExtension, setExtension } from "@bufbuild/protobuf";
import { hobbies } from "./gen/example_pb";

const h = getExtension(user, hobbies);
h.push("Baking");
h.push("Pottery");
setExtension(user, hobbies, h);
```

## Extensions and JSON

To serialize or parse extensions with JSON, you need to provide them in the [JSON serialization options](/guides/serialization/#json-serialization-options) via a registry:

```typescript
import { toJson, fromJson, createRegistry } from "@bufbuild/protobuf";
import { UserSchema, age } from "./gen/example_pb";

const registry = createRegistry(age);

const json = toJson(UserSchema, user, { registry });
const parsed = fromJson(UserSchema, json, { registry });
```

## Extensions in proto3

In proto3, extensions can only be used for [custom options](/reference/reflection/custom-options/). Custom options are extensions to the `google.protobuf.*Options` messages defined in `google/protobuf/descriptor.proto`.

See [Custom options](/reference/reflection/custom-options/) for a full walkthrough of defining and reading custom options.
