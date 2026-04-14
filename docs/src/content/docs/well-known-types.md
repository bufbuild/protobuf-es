---
title: Well-known types
---

Protobuf ships with a standard library of well-known types. Protobuf-ES provides them as precompiled exports from `@bufbuild/protobuf/wkt`, along with convenience APIs where JavaScript and TypeScript benefit from them most.

If your schema imports a well-known type, generated code imports it from that subpath automatically.

## Available files

The well-known type package includes generated output for:

- `google/protobuf/any.proto`
- `google/protobuf/duration.proto`
- `google/protobuf/timestamp.proto`
- `google/protobuf/wrappers.proto`
- `google/protobuf/struct.proto`
- `google/protobuf/field_mask.proto`
- `google/protobuf/empty.proto`
- `google/protobuf/api.proto`
- `google/protobuf/type.proto`
- `google/protobuf/source_context.proto`
- `google/protobuf/descriptor.proto`
- `google/protobuf/compiler/plugin.proto`

Some of them also get convenience APIs.

## `google.protobuf.Timestamp`

`Timestamp` represents a point in time with nanosecond precision.

```typescript
import {
  type Timestamp,
  timestampNow,
  timestampFromDate,
  timestampFromMs,
  timestampDate,
  timestampMs,
} from "@bufbuild/protobuf/wkt";

let ts: Timestamp = timestampNow();
ts = timestampFromDate(new Date(1938, 0, 10));
ts = timestampFromMs(818035920123);

const date: Date = timestampDate(ts);
const ms: number = timestampMs(ts);
```

## `google.protobuf.Duration`

`Duration` represents a fixed span of time with nanosecond precision.

```typescript
import { type Duration, durationFromMs, durationMs } from "@bufbuild/protobuf/wkt";

let duration: Duration = durationFromMs(1012);
const ms: number = durationMs(duration);
```

## `google.protobuf.Any`

`Any` stores an arbitrary message as binary data together with its type URL.

```typescript
import { create, createRegistry } from "@bufbuild/protobuf";
import { type Any, anyPack, anyIs, anyUnpack } from "@bufbuild/protobuf/wkt";
import { type User, UserSchema } from "./gen/example_pb";

let user: User = create(UserSchema);

let any: Any = anyPack(UserSchema, user);

anyIs(any, UserSchema); // true
anyIs(any, "example.User"); // true

anyUnpack(any, UserSchema); // User | undefined

const registry = createRegistry(UserSchema);
anyUnpack(any, registry); // Message | undefined
```

Registries are especially useful when you do not know the target type up front. See [Reflection](/reflection/).

## `google.protobuf.Struct`

`Struct` represents dynamic JSON-like objects. When a field uses `google.protobuf.Struct`, Protobuf-ES generates it as `JsonObject`.

```typescript
/**
 * @generated from field: google.protobuf.Struct struct = 1;
 */
struct?: JsonObject;
```

That makes it easy to assign plain values directly:

```typescript
myMessage.struct = {
  text: "abc",
  number: 123,
};
```

## Wrapper messages

The wrappers in `google/protobuf/wrappers.proto` become unboxed optional primitives when used in fields.

```typescript
/**
 * @generated from field: google.protobuf.BoolValue bool_value_field = 1;
 */
boolValueField?: boolean;
```

Wrappers are useful when you need to distinguish absence from a primitive's default value, or when you want to pack primitives into `Any`.

## Descriptor and compiler types

`descriptor.proto` and `compiler/plugin.proto` are also included. Those types are the foundation for reflection, custom options, and plugin development.

See [Reflection](/reflection/) and [Writing plugins](/writing-plugins/).
