---
title: Valid types
---

Valid types are an advanced feature enabled with the plugin option `valid_types`.

When enabled, `@bufbuild/protoc-gen-es` generates an extra type for each message. That type adjusts optionality based on selected Protobuf features.

> [!NOTE]
>
> Valid types are experimental. Today they primarily affect message field optionality.

## `valid_types=legacy_required`

With `legacy_required`, proto2 `required` fields and Edition `LEGACY_REQUIRED` fields become non-optional in the generated Valid type.

```protobuf
syntax = "proto2";

message Example {
  required User user = 2;
}

message User {
  optional string first_name = 1;
}
```

```typescript
export type ExampleValid = Message<"Example"> & {
  user: UserValid;
};
```

## `valid_types=protovalidate_required`

With `protovalidate_required`, fields marked with Protovalidate's `required` rule become non-optional in the generated Valid type.

```protobuf
syntax = "proto3";

import "buf/validate/validate.proto";

message Example {
  User user = 2 [(buf.validate.field).required = true];
}
```

This is useful when you want the type system to reflect runtime validation rules more closely.

## Combining modes

You can combine both behaviors:

```text
valid_types=legacy_required+protovalidate_required
```

## Utility types

Protobuf-ES also provides:

- `MessageValidType`: Extract the Valid type from a message descriptor.

When writing plugins, `GeneratedFile.importValid()` imports a generated Valid type.

For a concrete integration example, see the [Protovalidate-ES example](https://github.com/bufbuild/protovalidate-es/tree/main/packages/example#valid-types).
