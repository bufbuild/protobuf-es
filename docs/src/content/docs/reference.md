---
title: Reference
---

Reference pages cover exact generated shapes, plugin options, runtime types, and edge cases. Use them when you need a specific behavior. For end-to-end workflows, see [Getting started](/getting-started/) and the guide pages in the sidebar.

## Code generation

- [Generated code](/generated-code/): file names, message shapes, enum generation, extension descriptors, and service schemas.
- [Field types](/generated-code/field-types/): scalar mappings, message fields, enum fields, repeated fields, map fields, and well-known type field shapes.
- [Generated features](/generated-code/features/): oneofs, proto2 groups, required fields, optional fields, services, reserved names, nested types, comments, and packages.
- [Plugin options](/plugin-options/): `target`, import extensions, CommonJS output, empty files, `ts_nocheck`, plugin version elision, JSON types, and Valid types.

## Runtime

- [Working with messages](/working-with-messages/): `create()`, initializer objects, `isMessage()`, `$typeName`, field presence, `equals()`, and `clone()`.
- [Serialization](/serialization/): binary and JSON helpers, options, unknown fields, low-level wire APIs, text encoding, Base64, and size-delimited streams.
- [Extensions](/extensions/): defining, setting, reading, mutating, clearing, and serializing extensions.
- [Reflection](/reflection/): overview and typed dynamic message patterns.
- [Descriptors](/reflection/descriptors/): descriptor hierarchy, schema traversal, field descriptors, and traversal helpers.
- [Registries](/reflection/registries/): descriptor lookup, mutable registries, and file registries from descriptor sets.
- [Custom options](/reflection/custom-options/): defining, using, and reading schema annotations.
- [Dynamic messages](/reflection/dynamic-messages/): `ReflectMessage`, `ReflectList`, and `ReflectMap`.
- [Well-known types](/well-known-types/): precompiled `google.protobuf` exports and convenience helpers for `Timestamp`, `Duration`, `Any`, `Struct`, wrappers, descriptors, and compiler types.

## Plugin authors

- [Writing plugins](/writing-plugins/): plugin structure and a minimal runnable plugin.
- [Generating files](/writing-plugins/generating-files/): output files, preambles, printing, imports, exports, name collisions, and CommonJS adaptation.
- [Plugin options and release](/writing-plugins/options/): custom option parsing, transpilation, publishing, and testing.

## Type helpers

- [JSON types](/json-types/): generated JSON types, enum JSON types, `MessageJsonType`, `EnumJsonType`, and plugin imports.
- [Valid types](/valid-types/): experimental generated Valid types for required message-field guarantees.

## Migration and troubleshooting

- [Migrating from v1](/migrating-from-v1/): package updates, changed plugin defaults, schema-based runtime calls, and notable v2 behavior changes.
- [FAQ](/faq/): enum design, 64-bit integers, plugin-option philosophy, resolver issues, generated imports, and determinism.
