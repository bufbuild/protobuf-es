---
title: Working with messages
---

This page covers the core runtime APIs for constructing, identifying, comparing, and cloning messages.

## Constructing a message

Create a message with `create()` and the generated schema:

```typescript
import { create } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/example_pb";

const user: User = create(UserSchema);
```

You can also pass an initializer object. Every field in the initializer is optional.

```typescript
import { create } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/example_pb";

const user = create(UserSchema, {
  firstName: "Homer",
  active: true,
  manager: {
    lastName: "Burns",
  },
});
```

Nested message fields accept initializer objects too. You do not need to call `create()` for every nested value.

## Serialize and parse

Use binary helpers for wire format:

```typescript
import { toBinary, fromBinary } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/example_pb";

declare let user: User;

const bytes: Uint8Array = toBinary(UserSchema, user);
user = fromBinary(UserSchema, bytes);
```

Use JSON helpers for [ProtoJSON](https://protobuf.dev/programming-guides/json/):

```typescript
import { toJson, fromJson, type JsonValue } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/example_pb";

declare let user: User;

const json: JsonValue = toJson(UserSchema, user);
user = fromJson(UserSchema, json);
```

For JSON strings, use `toJsonString()` and `fromJsonString()`.

For serialization options, lower-level APIs, and unknown fields, see [Serialization](/serialization/).

## Identifying messages

`isMessage()` is a type guard for message values:

```typescript
import { create, isMessage } from "@bufbuild/protobuf";
import { UserSchema } from "./gen/example_pb";

const msg: unknown = create(UserSchema);

if (isMessage(msg, UserSchema)) {
  msg.firstName; // string
}
```

Messages also expose their fully qualified name in `$typeName`:

```typescript
msg.$typeName; // "example.User"
```

If you only have a type name and not a schema, use a [registry](/reflection/).

## Field presence and default values

Fields in Protobuf are conceptually optional, and most implementations provide default values to reduce boilerplate.

Proto3 fields with implicit presence do not serialize zero values such as `false`, `0`, or `""`. Adding `optional` switches a field to explicit presence.

```protobuf
syntax = "proto3";

message Presence {
  bool a = 1;
  optional bool b = 2;
}
```

Use `isFieldSet()` to check whether a field is present:

```typescript
import { create, isFieldSet } from "@bufbuild/protobuf";
import { PresenceSchema } from "./gen/example_pb";

const msg = create(PresenceSchema);
isFieldSet(msg, PresenceSchema.field.a); // false
isFieldSet(msg, PresenceSchema.field.b); // false

msg.a = false;
msg.b = false;
isFieldSet(msg, PresenceSchema.field.a); // false
isFieldSet(msg, PresenceSchema.field.b); // true
```

For repeated fields, `isFieldSet()` returns true when the array has at least one element. For map fields, it returns true when the object has at least one entry. Use `clearField()` to reset a field.

> [!IMPORTANT]
>
> Protobuf-ES uses the prototype chain to track explicit presence for fields with default values.
>
> - With proto3, messages are always plain objects without a custom prototype.
> - With proto2, messages always use a custom prototype for default values.
> - With Editions, messages use a custom prototype unless every scalar and enum field is configured for implicit presence.

## Comparing messages

Use `equals()` to compare two messages of the same schema:

```typescript
import { equals } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/example_pb";

declare const a: User;
declare const b: User;

equals(UserSchema, a, b); // boolean
```

`equals()` ignores extensions and unknown fields.

> [!NOTE]
>
> `NaN` does not equal `NaN`.

## Cloning messages

Use `clone()` for a deep copy:

```typescript
import { clone } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/example_pb";

declare const user: User;

const copy = clone(UserSchema, user);
```

Unlike `equals()`, `clone()` preserves extensions and unknown fields.
