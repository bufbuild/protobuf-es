---
title: Custom option redaction
---

Mark fields as sensitive in `.proto`, then clear them with reflection before logging or exporting a message. The same pattern works for any custom field option.

See [Custom options](/reference/reflection/custom-options/) and [Dynamic messages](/reference/reflection/dynamic-messages/) for the underlying APIs.

## Define the option

Create `proto/options.proto`:

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
syntax = "proto3";
package example;

import "options.proto";

message User {
  string first_name = 1;
  string last_name = 2;
  string email = 3 [(example.options.sensitive) = true];
}
```

## Redact annotated fields

`getOption()` reads the generated extension descriptor. `reflect()` lets the code clear fields without hardcoding `email`.

```typescript
import { getOption, type DescMessage, type Message } from "@bufbuild/protobuf";
import { reflect } from "@bufbuild/protobuf/reflect";
import { sensitive } from "./gen/options_pb";

export function redact(schema: DescMessage, message: Message): void {
  const reflected = reflect(schema, message);

  for (const field of reflected.fields) {
    if (getOption(field, sensitive)) {
      reflected.clear(field);
    }
  }
}
```

Call it with a generated schema:

```typescript
import { create } from "@bufbuild/protobuf";
import { UserSchema } from "./gen/example_pb";

const user = create(UserSchema, {
  firstName: "Lisa",
  lastName: "Simpson",
  email: "lisa@example.com",
});

redact(UserSchema, user);
user.email; // ""
```

For the reference material behind this pattern, see [Custom options](/reference/reflection/custom-options/), [Descriptors](/reference/reflection/descriptors/), and [Dynamic messages](/reference/reflection/dynamic-messages/).
