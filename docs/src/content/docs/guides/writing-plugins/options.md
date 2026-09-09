---
title: Plugin options and release
---

## Built-in options

Every plugin built with `@bufbuild/protoplugin` supports a common set of options, without any work on your part: `target`, `import_extension`, `map_imports`, `js_import_style`, `keep_empty_files`, `ts_nocheck`, and `elide_plugin_version`. See [Plugin options](/reference/plugin-options/) for what each one does. The remaining options on that page are specific to `protoc-gen-es`.

### `map_imports` and your own output

`map_imports` applies to the base types you import with `importShape()`, `importSchema()`, `importJson()`, and `importValid()` — the code `protoc-gen-es` generates for a Protobuf file. If a user points those at a package, your generated code imports them from there, and you don't have to do anything.

It does not apply to imports of the files your plugin generates itself. A path you pass to `import()` is used as written, so a file of yours importing another file of yours always resolves to the local output:

```typescript
const shape = f.importShape(message);               // subject to map_imports
const helper = f.import("helper", "./util_foo.js"); // never mapped
```

## Custom options

If your plugin needs options of its own, provide `parseOptions()` to `createEcmaScriptPlugin()`.

```typescript
parseOptions(rawOptions: { key: string; value: string }[]): T;
```

The framework parses the built-in options first, then passes any unrecognized key-value pairs to `parseOptions()`. Its return value is merged with the built-in options and available as `schema.options` in `generateTs`, `generateJs`, and `generateDts`.

Use this for plugin-specific switches only, and don't reuse the name of a built-in option.

## Transpilation

If your plugin only implements `generateTs`, `@bufbuild/protoplugin` can still produce `.js` and `.d.ts` output when the user asks for `target=js+dts`.

That convenience has a cost. For large schemas, on-the-fly transpilation can slow generation noticeably. For the best experience, implement `generateJs` and `generateDts` directly.

## Release

To publish on npm, expose the executable through the `bin` field in `package.json`. Users who install your package can then invoke it from npm scripts and `npx`.

## Testing

Test generated code the same way you test handwritten code.

Pick representative `.proto` inputs, generate files, and run your normal tests against the output. If your plugin supports multiple targets, run the same tests against each target.
