---
title: Reflection
---

Reflection is a first-class Protobuf-ES API, not hidden runtime internals. Use it when you need to inspect generated schemas, build registries, read custom options, or manipulate messages without hardcoding their concrete type.

```typescript
import { getOption, type DescMessage, type Message } from "@bufbuild/protobuf";
import { reflect } from "@bufbuild/protobuf/reflect";
import { sensitive } from "./gen/example_options_pb";

export function redact(schema: DescMessage, message: Message) {
  const r = reflect(schema, message);
  for (const field of r.fields) {
    if (getOption(field, sensitive)) {
      r.clear(field);
    }
  }
}
```

Generated schemas are descriptors with extra type information. That means the same schema object can drive serialization, field lookup, registries, custom option access, and dynamic message manipulation.

## Core pieces

- [Descriptors](/reference/reflection/descriptors/): Schema objects such as `DescFile`, `DescMessage`, `DescField`, `DescEnum`, and `DescService`.
- [Registries](/reference/reflection/registries/): Collections of descriptors keyed by fully qualified name.
- [Custom options](/reference/reflection/custom-options/): Extension-backed annotations on schema elements.
- [Dynamic messages](/reference/reflection/dynamic-messages/): `reflect()`, `ReflectMessage`, `ReflectList`, and `ReflectMap`.

## Typed lookup

Generated schemas expose common lookups directly:

```typescript
import { PhoneType, PhoneTypeSchema, UserSchema, UserService } from "./gen/example_pb";

UserSchema.field.firstName.name; // "first_name"
PhoneTypeSchema.value[PhoneType.MOBILE].name; // "PHONE_TYPE_MOBILE"
UserService.method.createUser.name; // "CreateUser"
```

## Keeping schema and message aligned

When a function accepts both a schema and a message, use `MessageShape<Desc>` to keep them paired at the type level.

```typescript
import type { DescMessage, MessageShape } from "@bufbuild/protobuf";

export function redactTyped<Desc extends DescMessage>(schema: Desc, message: MessageShape<Desc>) {
  const r = reflect(schema, message);
  for (const field of r.fields) {
    if (getOption(field, sensitive)) {
      r.clear(field);
    }
  }
}
```
