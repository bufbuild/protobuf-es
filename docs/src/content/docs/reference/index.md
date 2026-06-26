---
title: Reference
---

Reference pages cover exact generated shapes, plugin options, runtime types, and edge cases. Use them when you need a specific behavior. For end-to-end workflows, see [Getting started](/getting-started/) and the guide pages in the sidebar.

## Code generation

- [Generated code](/reference/generated-code/): file names, message shapes, enum generation, extension descriptors, and service schemas.
- [Field types](/reference/generated-code/field-types/): scalar mappings, message fields, enum fields, repeated fields, map fields, and well-known type field shapes.
- [Generated features](/reference/generated-code/features/): oneofs, proto2 groups, required fields, optional fields, services, reserved names, nested types, comments, and packages.
- [Plugin options](/reference/plugin-options/): `target`, import extensions, CommonJS output, empty files, `ts_nocheck`, plugin version elision, JSON types, and Valid types.

## Runtime

- [Working with messages](/guides/messages/): `create()`, initializer objects, `isMessage()`, `$typeName`, field presence, `equals()`, and `clone()`.
- [Serialization](/guides/serialization/): binary and JSON helpers, options, unknown fields, low-level wire APIs, the text format, text encoding, Base64, and size-delimited streams.
- [Extensions](/guides/extensions/): defining, setting, reading, mutating, clearing, and serializing extensions.
- [Reflection](/guides/reflection/): overview and typed dynamic message patterns.
- [Descriptors](/reference/reflection/descriptors/): descriptor hierarchy, schema traversal, field descriptors, and traversal helpers.
- [Registries](/reference/reflection/registries/): descriptor lookup, mutable registries, and file registries from descriptor sets.
- [Custom options](/reference/reflection/custom-options/): defining, using, and reading schema annotations.
- [Dynamic messages](/reference/reflection/dynamic-messages/): `ReflectMessage`, `ReflectList`, and `ReflectMap`.
- [Well-known types](/reference/well-known-types/): precompiled `google.protobuf` exports and convenience helpers for `Timestamp`, `Duration`, `Any`, `Struct`, wrappers, descriptors, and compiler types.

## Plugin authors

- [Writing plugins](/guides/writing-plugins/): plugin structure and a minimal runnable plugin.
- [Generating files](/guides/writing-plugins/generating-files/): output files, preambles, printing, imports, exports, name collisions, and CommonJS adaptation.
- [Plugin options and release](/guides/writing-plugins/options/): custom option parsing, transpilation, publishing, and testing.

## Type helpers

- [JSON types](/reference/json-types/): generated JSON types, enum JSON types, `MessageJsonType`, `EnumJsonType`, and plugin imports.
- [Valid types](/reference/valid-types/): experimental generated Valid types for required message-field guarantees.

## Migration and troubleshooting

- [Migrating from v1](/reference/migrating-from-v1/): package updates, changed plugin defaults, schema-based runtime calls, and notable v2 behavior changes.
- [FAQ](/reference/faq/): enum design, 64-bit integers, plugin-option philosophy, resolver issues, generated imports, and determinism.
