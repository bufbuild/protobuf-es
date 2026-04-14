---
title: FAQ
---

## What features are implemented?

Protobuf-ES is a modern Protobuf implementation for the JavaScript ecosystem.

Highlights include:

- ECMAScript module support
- first-class TypeScript support
- idiomatic generated JavaScript and TypeScript
- smaller bundles than the legacy generator
- all proto3 features, including ProtoJSON
- all proto2 features except the text format
- Editions support
- standard JavaScript APIs instead of the Closure Library
- conformance coverage
- descriptors and reflection

## Why not use string unions for Protobuf enums instead of TypeScript `enum`?

String unions look attractive, but they lose important Protobuf behavior.

Enum numbers can be semantically meaningful. Some schemas use them as bit flags. Older generated code also needs to tolerate newer enum values it has never seen before.

TypeScript enums are not perfect, especially after TypeScript 5.0 tightened enum typing, but they still model Protobuf's behavior better than string unions for the supported TypeScript range.

## Why are enum values not generated in PascalCase?

Generated enum value names follow the Protobuf source.

That keeps generated code aligned with the Protobuf JSON format, which uses the source enum names. It also matches the Buf style guide, which recommends `UPPER_SNAKE_CASE` enum values.

## Why use `bigint` for 64-bit integers?

`bigint` is the best fit for 64-bit Protobuf integer types.

JavaScript numbers are only safe up to `Number.MAX_SAFE_INTEGER`, which is smaller than the full 64-bit range. `bigint` avoids silent precision loss. In environments without `bigint`, Protobuf-ES falls back to strings so values still round-trip safely.

## How does Protobuf-ES compare to `protoc`'s JavaScript generator?

The legacy generator has fallen behind modern JavaScript and TypeScript.

Some of the key differences are:

- Protobuf-ES supports ECMAScript modules.
- Protobuf-ES can generate TypeScript directly.
- Protobuf-ES implements ProtoJSON.
- Protobuf-ES carries comments into generated output.
- Protobuf-ES uses plain properties instead of getter and setter methods.
- Protobuf-ES produces much smaller bundles.
- Protobuf-ES relies on standard JavaScript APIs instead of the Closure Library.

## What is your stance on plugin options?

Protobuf-ES is intentionally opinionated.

Too many options make code generation harder to learn, harder to debug, and harder for downstream tools to support consistently. We add options when there is a real interoperability or compatibility need, not for stylistic preferences.

## Parcel or Metro fails to resolve imports

Protobuf-ES uses [package exports](https://nodejs.org/docs/latest-v12.x/api/packages.html#packages_exports).

If Parcel reports a failure to resolve `@bufbuild/protobuf/codegenv1`, enable package exports in Parcel.

If Metro or Expo reports the same kind of failure, enable package exports in Metro.

- Parcel docs: https://parceljs.org/features/dependency-resolution/#package-exports
- Metro docs: https://metrobundler.dev/docs/package-exports

## The plugin generates missing imports

The Buf CLI does not generate dependencies by default.

If your schema imports something like `buf/validate/validate.proto`, generated code will import the corresponding generated module too. To generate those imported files, set `include_imports: true` in `buf.gen.yaml`:

```yaml
version: v2
plugins:
  - local: protoc-gen-es
    out: src/gen
    include_imports: true
```

## Is serialization deterministic?

Binary and JSON serialization are deterministic within a version of Protobuf-ES.

Regular fields are ordered by field number. Map entries, repeated fields, and extensions are ordered by insertion.
