---
title: Reflection
---

Reflection is one of Protobuf-ES's most powerful features. It gives you typed access to descriptors, registries, custom options, and dynamic message manipulation.

## Descriptors

Descriptors are Protobuf's schema model. The Protobuf compiler parses `.proto` files into descriptor messages, and Protobuf-ES wraps those messages in easier-to-use descriptor types.

Their names start with `Desc`:

| Type | Wraps | Purpose |
|---|---|---|
| `DescFile` | `google.protobuf.FileDescriptorProto` | Root of a source file. |
| `DescMessage` | `google.protobuf.DescriptorProto` | Message descriptor. |
| `DescField` | `google.protobuf.FieldDescriptorProto` | Field descriptor. |
| `DescOneof` | `google.protobuf.OneofDescriptorProto` | Oneof descriptor. |
| `DescEnum` | `google.protobuf.EnumDescriptorProto` | Enum descriptor. |
| `DescEnumValue` | `google.protobuf.EnumValueDescriptorProto` | Enum value descriptor. |
| `DescService` | `google.protobuf.ServiceDescriptorProto` | Service descriptor. |
| `DescMethod` | `google.protobuf.MethodDescriptorProto` | Method descriptor. |
| `DescExtension` | `google.protobuf.FieldDescriptorProto` | Extension descriptor. |

Generated schemas are descriptors with additional type information attached.

## Walking through a schema

Every generated file exports a file descriptor such as `file_example`.

```typescript
import { file_example as file } from "./gen/example_pb";

for (const message of file.messages) {
  message.typeName;
  for (const field of message.fields) {
    field.name;
  }
}

for (const enumeration of file.enums) {
  enumeration.typeName;
  for (const value of enumeration.values) {
    value.name;
  }
}

for (const service of file.services) {
  service.typeName;
  for (const method of service.methods) {
    method.name;
  }
}

for (const extension of file.extensions) {
  extension.typeName;
}
```

If you want to walk nested types recursively, use `nestedTypes()` from `@bufbuild/protobuf/reflect`:

```typescript
import { nestedTypes } from "@bufbuild/protobuf/reflect";
import { file_example as file } from "./gen/example_pb";

for (const type of nestedTypes(file)) {
  type.kind; // "message" | "enum" | "extension" | "service"
}
```

Generated schemas also provide typed lookups:

```typescript
import { PhoneType, PhoneTypeSchema, UserSchema, UserService } from "./gen/example_pb";

UserSchema.field.firstName.name; // "first_name"
PhoneTypeSchema.value[PhoneType.MOBILE].name; // "PHONE_TYPE_MOBILE"
UserService.method.createUser.name; // "CreateUser"
```

## Walking through message fields

There are several ways to inspect a message, depending on how you want to handle oneofs.

Use `message.fields` to see every field individually, including fields inside oneofs:

```typescript
function walkFields(message: DescMessage) {
  for (const field of message.fields) {
    console.log(field.name);
  }
}
```

Use `message.oneofs` if you want to preserve oneof grouping:

```typescript
function walkOneofs(message: DescMessage) {
  for (const oneof of message.oneofs) {
    console.log(oneof.name);
    for (const field of oneof.fields) {
      console.log(field.name);
    }
  }
}
```

Use `message.members` if you want both regular fields and oneof groups in a single traversal.

## Field descriptors

All fields are represented by `DescField`. Each field exposes:

- `name`: Source name, such as `first_name`
- `number`: Field number
- `localName`: Safe JavaScript or TypeScript name, such as `firstName`

To tell field shapes apart, use `fieldKind`, which can be `"scalar"`, `"enum"`, `"message"`, `"list"`, or `"map"`.

```typescript
function handleField(field: DescField) {
  switch (field.fieldKind) {
    case "scalar":
      field.scalar;
      break;
    case "enum":
      field.enum;
      break;
    case "message":
      field.message;
      break;
    case "list":
      field.listKind;
      break;
    case "map":
      field.mapKey;
      field.mapKind;
      break;
  }
}
```

The same properties exist on `DescExtension` for extension fields.

## Registries

Registries are collections of descriptors keyed by fully qualified name. They are used when parsing or serializing `google.protobuf.Any` and extensions from JSON.

```typescript
import type { Registry } from "@bufbuild/protobuf";

declare const registry: Registry;

registry.getMessage("example.User");
registry.getEnum("example.PhoneType");
registry.getService("example.MyService");
registry.getExtension("example.sensitive");

for (const type of registry) {
  type.kind;
}
```

Create a registry from descriptors with `createRegistry()`:

```typescript
import { createRegistry } from "@bufbuild/protobuf";
import { UserSchema, file_example } from "./gen/example_pb";

const registry = createRegistry(UserSchema, file_example, otherRegistry);
```

Use `createMutableRegistry()` if you need to add and remove descriptors over time.

If you have a `google.protobuf.FileDescriptorSet`, create a file registry with `createFileRegistry()`.

```typescript
import { readFileSync } from "node:fs";
import { createFileRegistry, fromBinary } from "@bufbuild/protobuf";
import { FileDescriptorSetSchema } from "@bufbuild/protobuf/wkt";

const fileDescriptorSet = fromBinary(FileDescriptorSetSchema, readFileSync("set.binpb"));
const registry = createFileRegistry(fileDescriptorSet);
```

## Custom options

Custom options annotate schema elements with additional metadata.

For example, define a custom field option named `sensitive`:

```protobuf
syntax = "proto3";
package example.options;
import "google/protobuf/descriptor.proto";

extend google.protobuf.FieldOptions {
  bool sensitive = 8765;
}
```

Then use it in a schema:

```protobuf
message User {
  string first_name = 1;
  string last_name = 2 [(example.options.sensitive) = true];
}
```

Read the option value with `getOption()`:

```typescript
import { getOption } from "@bufbuild/protobuf";
import { UserSchema } from "./gen/example_pb";
import { sensitive } from "./gen/example-option_pb";

getOption(UserSchema.field.lastName, sensitive); // true
```

`hasOption()` behaves the same way, but checks whether an option is present.

## Reflection API

The reflection API lets you inspect and manipulate message data dynamically.

Here is a small redaction example built on a custom option:

```typescript
import { getOption, type DescMessage, type Message } from "@bufbuild/protobuf";
import { reflect } from "@bufbuild/protobuf/reflect";
import { sensitive } from "./gen/example-option_pb";

export function redact(schema: DescMessage, message: Message) {
  const r = reflect(schema, message);
  for (const field of r.fields) {
    if (getOption(field, sensitive)) {
      r.clear(field);
    }
  }
}
```

To keep schema and message aligned at the type level, use `MessageShape<Desc>`.

## `ReflectMessage`

`reflect()` returns a `ReflectMessage`.

Its most important methods are:

- `isSet(field)`: Check whether a field is set.
- `clear(field)`: Reset a field.
- `get(field)`: Read a field in the form most useful for reflection.
- `set(field, value)`: Set a field with reflected values.

`get()` never returns `undefined`. For unset fields, it returns default values, empty reflection wrappers, or fresh message wrappers depending on the field kind.

## `ReflectList`

Repeated fields use `ReflectList`.

```typescript
if (field.fieldKind == "list") {
  const list: ReflectList = message.get(field);
  for (const item of list) {
  }
  list.get(123);
  list.add(123);
}
```

64-bit `jstype=JS_STRING` scalars are exposed as `bigint`, and message values are exposed as `ReflectMessage`.

## `ReflectMap`

Map fields use `ReflectMap`.

```typescript
if (field.fieldKind == "map") {
  const map: ReflectMap = message.get(field);
  for (const [key, value] of map) {
  }
  map.has(123);
  map.get(123);
  map.set(123, "abc");
}
```

Map keys are converted from string storage to the closest useful JavaScript type for reflection. Message values are wrapped as `ReflectMessage`.
