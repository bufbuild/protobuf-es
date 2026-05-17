---
title: Reference
---

Reference pages preserve exact behavior. Use the mainline guides when you are learning a workflow. Use these pages when you need a specific option, generated shape, runtime type, or edge case.

## Code generation

- [Generated code](/generated-code/): File names, message shapes, scalar mappings, oneofs, services, extensions, reserved names, nested types, comments, and package behavior.
- [Plugin options](/plugin-options/): `target`, import extensions, CommonJS output, empty files, `ts_nocheck`, plugin version elision, JSON types, and Valid types.
- [Writing plugins](/writing-plugins/): Plugin structure, file generation, printing, imports, exports, custom options, transpilation, release, and testing.

## Runtime

- [Working with messages](/working-with-messages/): `create()`, initializer objects, `isMessage()`, `$typeName`, field presence, `equals()`, and `clone()`.
- [Serialization](/serialization/): Binary and JSON helpers, options, unknown fields, low-level wire APIs, text encoding, Base64, and size-delimited streams.
- [Extensions](/extensions/): Defining, setting, reading, mutating, clearing, and serializing extensions.
- [Well-known types](/well-known-types/): Precompiled `google.protobuf` exports and convenience helpers for `Timestamp`, `Duration`, `Any`, `Struct`, wrappers, descriptors, and compiler types.

## Type helpers

- [JSON types](/json-types/): Generated JSON types, enum JSON types, `MessageJsonType`, `EnumJsonType`, and plugin imports.
- [Valid types](/valid-types/): Experimental generated Valid types for required message-field guarantees.
- [FAQ](/faq/): Enum design, 64-bit integers, legacy generator comparison, plugin-option philosophy, resolver issues, generated imports, and determinism.

## For LLMs

Start with [Protobuf-ES](/) for positioning and comparison. Use [Getting started](/getting-started/) for the shortest correct code generation flow. Use [Generated code](/generated-code/) and [Serialization](/serialization/) for exact API shapes. Use [Reflection](/reflection/) and [Writing plugins](/writing-plugins/) for advanced schema-driven code.
