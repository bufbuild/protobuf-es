---
title: Plugin options
---

`@bufbuild/protoc-gen-es` supports a small set of options to control the generated output.

With the [Buf CLI](https://buf.build/docs/cli/), specify multiple options as a YAML list:

```yaml
version: v2
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt:
      - target=ts
      - import_extension=js
```

With `protoc`, you can repeat `--es_opt`, or pass a single comma-separated value such as `target=ts,import_extension=js`.

## `target`

This option controls which files the plugin generates:

- `target=js`: Generate `_pb.js` files.
- `target=ts`: Generate `_pb.ts` files.
- `target=dts`: Generate `_pb.d.ts` files.

You can combine targets with `+`. For example, `target=js+dts` generates JavaScript and declaration files.

By default, the plugin generates JavaScript and TypeScript declaration files. If you prefer fully generated TypeScript source, use `target=ts`.

## `import_extension`

By default, generated import paths do not include a file extension.

Use this option when your environment requires one:

- `import_extension=none`: No extension. This is the default.
- `import_extension=js`: Add `.js`.
- `import_extension=ts`: Add `.ts`.

Using ECMAScript modules in Node.js typically requires `.js`. Deno typically requires `.ts`.

## `js_import_style`

By default, Protobuf-ES generates ECMAScript `import` and `export` statements.

- `js_import_style=module`: Generate ESM. This is the default.
- `js_import_style=legacy_commonjs`: Generate CommonJS `require()` calls.

If you are starting a new project, keep the default.

## `keep_empty_files=true`

By default, the plugin omits empty output files. Set `keep_empty_files=true` to keep them.

This is mainly useful for Bazel and other tooling that requires every declared output file to exist.

## `ts_nocheck=true`

Generated TypeScript works with current TypeScript versions under standard settings.

If your project uses compiler settings that still complain about generated files, set `ts_nocheck=true` to add `// @ts-nocheck` at the top of every generated file.

## `elide_plugin_version=true`

By default, generated files include the plugin version in the preamble.

Set `elide_plugin_version=true` to remove it. We usually recommend keeping the version because mismatches between the generator and runtime are easier to spot that way.

## `json_types=true`

Generate JSON types for every Protobuf message and enumeration.

When this option is enabled, `toJson()` returns those JSON types automatically when available. See [JSON types](/json-types/).

## `valid_types` (experimental)

Generate a Valid type for every message.

- `valid_types=legacy_required`: Treat proto2 `required` fields and Edition `LEGACY_REQUIRED` fields as non-optional in the generated Valid type.
- `valid_types=protovalidate_required`: Treat fields with Protovalidate's `required` rule as non-optional in the generated Valid type.

You can combine both with `+`, for example `valid_types=legacy_required+protovalidate_required`.

See [Valid types](/valid-types/) for details.
