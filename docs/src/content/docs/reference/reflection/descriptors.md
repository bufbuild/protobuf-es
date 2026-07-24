---
title: Descriptors
---

Descriptors are Protobuf's schema model. The Protobuf compiler parses `.proto` files into descriptor messages, and Protobuf-ES wraps those messages in easier-to-use descriptor types.

## Types

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

Descriptors form a hierarchy rooted at a file:

```text
DescFile
├─ messages: DescMessage[]
│  ├─ fields: DescField[]
│  ├─ oneofs: DescOneof[]
│  ├─ nestedMessages: DescMessage[]
│  ├─ nestedExtensions: DescExtension[]
│  └─ nestedEnums: DescEnum[]
├─ enums: DescEnum[]
├─ extensions: DescExtension[]
└─ services: DescService[]
```

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
```

Use `nestedTypes()` to walk nested messages, enums, extensions, and services recursively:

```typescript
import { nestedTypes } from "@bufbuild/protobuf/reflect";
import { file_example as file } from "./gen/example_pb";

for (const type of nestedTypes(file)) {
  type.kind; // "message" | "enum" | "extension" | "service"
}
```

## Field descriptors

All fields are represented by `DescField`. Each field exposes:

- `name`: Source name, such as `first_name`
- `number`: Field number
- `localName`: Safe JavaScript or TypeScript name, such as `firstName`

Use `fieldKind` to distinguish scalar, enum, message, list, and map fields.

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

The same shape properties exist on `DescExtension` for extension fields.

## Traversal helpers

`@bufbuild/protobuf/reflect` includes helpers for common schema graph tasks.

```typescript
import { buildPath, parentTypes, pathToString, usedTypes } from "@bufbuild/protobuf/reflect";
import { UserSchema } from "./gen/example_pb";

usedTypes(UserSchema); // messages and enums referenced by User fields
parentTypes(UserSchema.field.firstName); // ancestors up to the file

const path = buildPath(UserSchema).field(UserSchema.field.firstName).toPath();
pathToString(path); // "first_name"
```
