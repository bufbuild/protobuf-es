---
title: Dynamic messages
---

Use reflection to inspect and manipulate message data when the concrete TypeScript type is not known ahead of time.

## Reflect a message

```typescript
import { reflect } from "@bufbuild/protobuf/reflect";
import { UserSchema } from "./gen/example_pb";

const r = reflect(UserSchema, user);
```

`reflect()` returns a `ReflectMessage`.

## ReflectMessage

Important methods:

- `isSet(field)`: Check whether a field is set.
- `clear(field)`: Reset a field.
- `get(field)`: Read a field in the form most useful for reflection.
- `set(field, value)`: Set a field with reflected values.

`get()` never returns `undefined`. For unset fields, it returns default values, empty reflection wrappers, or fresh message wrappers depending on the field kind.

`set()` expects values in the same form that `get()` returns. It throws if the value is invalid for the field. `undefined` is not a valid value; use `clear()` to reset a field.

## ReflectList

Repeated fields use `ReflectList`. Given a `User` schema with `repeated string locations = 5`:

```typescript
import type { ReflectList } from "@bufbuild/protobuf/reflect";
import { reflect } from "@bufbuild/protobuf/reflect";
import { UserSchema } from "./gen/example_pb";

const r = reflect(UserSchema, user);
const field = UserSchema.field.locations;

if (field.fieldKind === "list") {
  const list: ReflectList<string> = r.get(field);
  for (const location of list) {
    console.log(location);
  }
  list.add("New York");
}
```

64-bit `jstype=JS_STRING` scalars are exposed as `bigint`, and message values are wrapped as `ReflectMessage`.

## ReflectMap

Map fields use `ReflectMap`. Given a `User` schema with `map<string, string> projects = 6`:

```typescript
import type { ReflectMap } from "@bufbuild/protobuf/reflect";
import { reflect } from "@bufbuild/protobuf/reflect";
import { UserSchema } from "./gen/example_pb";

const r = reflect(UserSchema, user);
const field = UserSchema.field.projects;

if (field.fieldKind === "map") {
  const map: ReflectMap<string, string> = r.get(field);
  for (const [project, role] of map) {
    console.log(`${project}: ${role}`);
  }
  map.set("atlas", "infra");
}
```

Map keys are converted from string storage to the closest useful JavaScript type for reflection. Message values are wrapped as `ReflectMessage`.
