---
title: JSON types
---

JSON types are an advanced feature enabled with the plugin option `json_types=true`.

When enabled, `@bufbuild/protoc-gen-es` generates a JSON type for every Protobuf message and enumeration. That type matches the exact JSON shape emitted by `toJson()` with standard options.

## Message JSON types

Given this schema:

```protobuf
syntax = "proto3";

message Example {
  int32 amount = 1;
  oneof either {
    bytes data = 2;
    string error_message = 3;
  }
}
```

Protobuf-ES generates an additional type:

```typescript
export type ExampleJson = {
  amount?: number;
  data?: string;
  errorMessage?: string;
};
```

`toJson()` returns that type when it is available:

```typescript
import { create, toJson } from "@bufbuild/protobuf";
import { type ExampleJson, ExampleSchema } from "./gen/example_pb";

const example = create(ExampleSchema, { amount: 123 });
const json: ExampleJson = toJson(ExampleSchema, example);

json.amount; // number | undefined
json.data; // string | undefined
```

Without `json_types=true`, those property accesses would not type-check as precisely.

## Enum JSON types

For enums, Protobuf-ES generates a string union of the JSON names.

```protobuf
syntax = "proto3";

enum Format {
  FORMAT_UNSPECIFIED = 0;
  FORMAT_BINARY = 1;
  FORMAT_JSON = 2;
}
```

```typescript
export type FormatJson = "FORMAT_UNSPECIFIED" | "FORMAT_BINARY" | "FORMAT_JSON";
```

Use the enum JSON helpers to move between wire enum values and JSON names:

```typescript
const strVal: FormatJson = enumToJson(FormatSchema, Format.BINARY);
const enumVal: Format = enumFromJson(FormatSchema, strVal);

const someString: string = "FORMAT_BINARY";
if (isEnumJson(FormatSchema, someString)) {
  someString; // FormatJson
}
```

## When to use JSON types

JSON cannot represent every Protobuf value as richly as the generated message type. A 64-bit integer, for example, becomes a string in JSON, while the message type can use `bigint`.

Prefer generated message types when you control the code. Reach for JSON types when you need exact JSON shapes for libraries, API layers, or other systems that only deal with JSON values.

## Utility types

Protobuf-ES also provides helper types:

- `MessageJsonType`: Extract the JSON type from a message descriptor.
- `EnumJsonType`: Extract the JSON type from an enum descriptor.

When writing plugins, `GeneratedFile.importJson()` imports a generated JSON type for you.
