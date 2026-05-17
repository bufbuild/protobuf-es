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

Repeated fields use `ReflectList`.

```typescript
import type { DescField } from "@bufbuild/protobuf";
import type { ReflectList, ReflectMessage } from "@bufbuild/protobuf/reflect";

function inspectList(message: ReflectMessage, field: DescField) {
  if (field.fieldKind !== "list") {
    return;
  }
  const list: ReflectList = message.get(field);
  for (const item of list) {
    item;
  }
  list.get(123);
  list.add(123);
}
```

64-bit `jstype=JS_STRING` scalars are exposed as `bigint`, and message values are exposed as `ReflectMessage`.

## ReflectMap

Map fields use `ReflectMap`.

```typescript
import type { DescField } from "@bufbuild/protobuf";
import type { ReflectMap, ReflectMessage } from "@bufbuild/protobuf/reflect";

function inspectMap(message: ReflectMessage, field: DescField) {
  if (field.fieldKind !== "map") {
    return;
  }
  const map: ReflectMap = message.get(field);
  for (const [key, value] of map) {
    key;
    value;
  }
  map.has(123);
  map.get(123);
  map.set(123, "abc");
}
```

Map keys are converted from string storage to the closest useful JavaScript type for reflection. Message values are wrapped as `ReflectMessage`.
