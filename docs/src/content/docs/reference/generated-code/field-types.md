---
title: Field types
---

Generated field types follow the Protobuf field kind. `create()` supplies runtime defaults; TypeScript types describe the shape stored on the message.

## Scalars

| Protobuf type | ECMAScript type | Notes | Runtime default |
|---|---|---|---|
| `string` | `string` | UTF-8 | `""` |
| `bool` | `boolean` |  | `false` |
| `bytes` | `Uint8Array` |  | `new Uint8Array(0)` |
| `double` | `number` | 64-bit float | `0` |
| `float` | `number` | 32-bit float | `0` |
| `int32` | `number` | 32-bit signed varint | `0` |
| `uint32` | `number` | 32-bit unsigned varint | `0` |
| `int64` | `bigint` | 64-bit signed varint | `0n` |
| `uint64` | `bigint` | 64-bit unsigned varint | `0n` |
| `fixed32` | `number` | 32-bit unsigned fixed | `0` |
| `fixed64` | `bigint` | 64-bit unsigned fixed | `0n` |
| `sfixed32` | `number` | 32-bit signed fixed | `0` |
| `sfixed64` | `bigint` | 64-bit signed fixed | `0n` |
| `sint32` | `number` | 32-bit signed varint | `0` |
| `sint64` | `bigint` | 64-bit signed varint | `0n` |

If `bigint` is unavailable in your environment, 64-bit integer fields still round-trip safely, but use `string` values at runtime instead.

Use `jstype = JS_STRING` when you want `string` output for a 64-bit field:

```protobuf
int64 field = 1 [jstype = JS_STRING];
```

With Buf managed mode, apply that option automatically:

```yaml
managed:
  enabled: true
  override:
    - field_option: jstype
      value: JS_STRING
```

## Message fields

Message fields become optional properties. With `exactOptionalPropertyTypes`, the generated type includes `undefined` explicitly.

```protobuf
User manager = 4;
```

```typescript
manager?: User | undefined;
```

Message fields do not have default values in Protobuf.

## Enum fields

Enum fields use the generated TypeScript enum and default to the first declared value.

```typescript
phoneType: PhoneType;
```

TypeScript enums can convert between numeric values and string names:

```typescript
const val: PhoneType = PhoneType.MOBILE;
const name = PhoneType[val]; // "MOBILE"
```

Protobuf has open and closed enums. Open enums can contain numeric values that are not declared in the generated TypeScript enum, so code that receives data from newer schemas should handle unknown enum numbers (see `isUnknownEnum` from `@bufbuild/protobuf`).

## Repeated fields

Repeated fields become arrays.

```protobuf
repeated string locations = 5;
```

```typescript
locations: string[];
```

New messages created with `create()` initialize repeated fields to empty arrays.

## Map fields

Map fields become record-like objects.

```protobuf
map<string, string> projects = 6;
```

```typescript
projects: { [key: string]: string };
```

New messages created with `create()` initialize map fields to empty objects. Protobuf-ES uses objects instead of ECMAScript `Map` because objects fit better with current JavaScript and TypeScript tooling.

## Well-known type fields

Some well-known types use JavaScript-friendly representations. `google.protobuf.Struct` fields become `JsonObject`:

```typescript
struct?: JsonObject | undefined;
```

Wrapper messages become unboxed optional primitives:

```typescript
boolValueField?: boolean | undefined;
```

See [Well-known types](/reference/well-known-types/) for the full list of precompiled exports and helper functions.
