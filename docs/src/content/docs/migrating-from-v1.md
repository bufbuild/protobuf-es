---
title: Migrating from version 1
---

Version 2 adds reflection, Editions support, new presence behavior, and a new generated API based on schemas instead of classes.

To migrate, update dependencies, regenerate code, and then adjust call sites in your application.

## Update packages

Install the v2 packages you use:

```shellsession
npm install @bufbuild/protobuf@^2.0.0 @bufbuild/protoc-gen-es@^2.0.0
```

The main packages are:

- [`@bufbuild/protobuf`](https://www.npmjs.com/package/@bufbuild/protobuf)
- [`@bufbuild/protoc-gen-es`](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)
- [`@bufbuild/protoplugin`](https://www.npmjs.com/package/@bufbuild/protoplugin)

Then regenerate all code with the updated plugin.

## Review option defaults

Some plugin defaults changed in v2:

- `import_extension` now defaults to `none`. If your config still says `import_extension=none`, you can remove it.
- `ts_nocheck` is now off by default. If you still need `// @ts-nocheck`, set `ts_nocheck=true` explicitly.

## Remote plugin users

If you use the remote plugin instead of a locally installed binary, update the version in `buf.gen.yaml`:

```yaml
version: v2
plugins:
  - remote: buf.build/bufbuild/es:v2.0.0
    out: gen
```

If you use generated SDKs from the BSR, update those packages to versions built with the v2 plugin.

## Update your code

The biggest change is that generated messages are no longer classes.

Create messages with `create()` and a schema instead of `new`:

```diff
- import { User } from "./gen/example_pb";
+ import { create } from "@bufbuild/protobuf";
+ import { UserSchema } from "./gen/example_pb";

- let user = new User({
+ let user = create(UserSchema, {
  firstName: "Homer",
});
```

Serialization helpers are now standalone functions that take both schema and message:

```diff
import type { User } from "./gen/example_pb";
+ import { UserSchema } from "./gen/example_pb";
+ import { toJsonString } from "@bufbuild/protobuf";

function show(user: User) {
-  alert(user.toJsonString());
+  alert(toJsonString(UserSchema, user));
}
```

Messages no longer implement `toJSON`. Convert them with `toJson()` before passing them to `JSON.stringify()`.

## Other notable changes

- `google.protobuf.Struct` fields are now generated as `JsonObject`.
- Proto2 fields support default values and are no longer generated as optional in the same way as v1.
- `toPlainMessage()` and `PlainMessage<T>` are no longer needed. For proto3, `create(UserSchema)` already returns a plain object. Replace `PlainMessage<User>` with `User`.
- Well-known types moved to the `@bufbuild/protobuf/wkt` subpath export.

For large applications, you can migrate incrementally. If necessary, run both versions side by side while you update call sites.
