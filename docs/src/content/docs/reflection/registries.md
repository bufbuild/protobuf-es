---
title: Registries
---

Registries are collections of descriptors keyed by fully qualified name. Use them when you need to resolve types dynamically, parse or serialize `google.protobuf.Any`, or work with extensions in JSON.

## Lookup

```typescript
import type { Registry } from "@bufbuild/protobuf";

declare const registry: Registry;

registry.getMessage("example.User");
registry.getEnum("example.PhoneType");
registry.getService("example.UserService");
registry.getExtension("example.sensitive");

for (const type of registry) {
  type.kind;
}
```

## Create a registry

Create a registry from descriptors with `createRegistry()`:

```typescript
import { createRegistry } from "@bufbuild/protobuf";
import { UserSchema, file_example } from "./gen/example_pb";

const registry = createRegistry(UserSchema, file_example, otherRegistry);
```

## Mutable registries

Use `createMutableRegistry()` if descriptors need to be added or removed over time.

```typescript
import { createMutableRegistry } from "@bufbuild/protobuf";
import { UserSchema } from "./gen/example_pb";

const mutable = createMutableRegistry();
mutable.add(UserSchema);
mutable.remove(UserSchema);
```

## File registries

If you have a `google.protobuf.FileDescriptorSet`, create a file registry with `createFileRegistry()`.

Compile a descriptor set with the Buf CLI:

```shellsession
buf build proto --output set.binpb
```

Read it in JavaScript:

```typescript
import { readFileSync } from "node:fs";
import { createFileRegistry, fromBinary } from "@bufbuild/protobuf";
import { FileDescriptorSetSchema } from "@bufbuild/protobuf/wkt";

const fileDescriptorSet = fromBinary(FileDescriptorSetSchema, readFileSync("set.binpb"));
const registry = createFileRegistry(fileDescriptorSet);

for (const file of registry.files) {
  file.name;
}
```
