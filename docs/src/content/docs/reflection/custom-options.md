---
title: Custom options
---

Custom options annotate schema elements with extra metadata. They are extensions to the `google.protobuf.*Options` messages defined in `google/protobuf/descriptor.proto`.

## Define an option

Create an option to mark sensitive fields:

```protobuf
syntax = "proto3";
package example.options;

import "google/protobuf/descriptor.proto";

extend google.protobuf.FieldOptions {
  bool sensitive = 8765;
}
```

## Use the option

```protobuf
message User {
  string first_name = 1;
  string last_name = 2 [(example.options.sensitive) = true];
}
```

## Read the option

Regenerate code, then read the option with `getOption()` or `hasOption()`.

```typescript
import { getOption, hasOption } from "@bufbuild/protobuf";
import { sensitive } from "./gen/example_options_pb";
import { UserSchema } from "./gen/example_pb";

hasOption(UserSchema.field.lastName, sensitive); // true
getOption(UserSchema.field.lastName, sensitive); // true
```

Custom options can be read from generated schemas, from schemas passed to a plugin, or from descriptors loaded into a registry.
