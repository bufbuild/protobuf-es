---
title: Reference
---

Reference pages preserve exact behavior. Use the mainline guides when you are learning a workflow. Use these pages when you need a specific option, generated shape, runtime type, or edge case.

## Code generation

- [Generated code](/generated-code/): File names, message shapes, enum generation, extension descriptors, and service schemas.
- [Field types](/generated-code/field-types/): Scalar mappings, message fields, enum fields, repeated fields, map fields, and well-known type field shapes.
- [Generated features](/generated-code/features/): Oneofs, proto2 groups, required fields, optional fields, services, reserved names, nested types, comments, and packages.
- [Plugin options](/plugin-options/): `target`, import extensions, CommonJS output, empty files, `ts_nocheck`, plugin version elision, JSON types, and Valid types.
- [Migrating from v1](/migrating-from-v1/): Package updates, changed plugin defaults, schema-based runtime calls, and notable v2 behavior changes.
- [Writing plugins](/writing-plugins/): Plugin structure and a minimal runnable plugin.
- [Generating files](/writing-plugins/generating-files/): Output files, preambles, printing, imports, exports, name collisions, and CommonJS adaptation.
- [Plugin options and release](/writing-plugins/options/): Custom option parsing, transpilation, publishing, and testing.

## Runtime

- [Working with messages](/working-with-messages/): `create()`, initializer objects, `isMessage()`, `$typeName`, field presence, `equals()`, and `clone()`.
- [Serialization](/serialization/): Binary and JSON helpers, options, unknown fields, low-level wire APIs, text encoding, Base64, and size-delimited streams.
- [Extensions](/extensions/): Defining, setting, reading, mutating, clearing, and serializing extensions.
- [Reflection](/reflection/): Overview and typed dynamic message patterns.
- [Descriptors](/reflection/descriptors/): Descriptor hierarchy, schema traversal, field descriptors, and traversal helpers.
- [Registries](/reflection/registries/): Descriptor lookup, mutable registries, and file registries from descriptor sets.
- [Custom options](/reflection/custom-options/): Defining, using, and reading schema annotations.
- [Dynamic messages](/reflection/dynamic-messages/): `ReflectMessage`, `ReflectList`, and `ReflectMap`.
- [Well-known types](/well-known-types/): Precompiled `google.protobuf` exports and convenience helpers for `Timestamp`, `Duration`, `Any`, `Struct`, wrappers, descriptors, and compiler types.

## Type helpers

- [JSON types](/json-types/): Generated JSON types, enum JSON types, `MessageJsonType`, `EnumJsonType`, and plugin imports.
- [Valid types](/valid-types/): Experimental generated Valid types for required message-field guarantees.
- [FAQ](/faq/): Enum design, 64-bit integers, legacy generator comparison, plugin-option philosophy, resolver issues, generated imports, and determinism.

## For LLMs

Start with [Protobuf-ES](/) for positioning and comparison. Use [Getting started](/getting-started/) for the shortest correct code generation flow. Use [Generated code](/generated-code/) and [Serialization](/serialization/) for exact API shapes. Use [Descriptors](/reflection/descriptors/), [Registries](/reflection/registries/), and [Writing plugins](/writing-plugins/) for advanced schema-driven code.
