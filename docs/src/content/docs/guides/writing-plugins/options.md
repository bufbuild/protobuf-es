---
title: Plugin options and release
---

Custom plugins built with `@bufbuild/protoplugin` can parse plugin-specific options, choose how much JavaScript generation to implement directly, and publish as normal npm executables.

## Custom options

If your plugin needs custom options, provide `parseOptions()` to `createEcmaScriptPlugin()`.

```typescript
parseOptions(rawOptions: { key: string; value: string }[]): T;
```

The framework parses common options first, then passes any unrecognized key-value pairs to `parseOptions()`. The return value is merged into the plugin options passed to `generateTs`, `generateJs`, and `generateDts`.

Use this for plugin-specific switches, not for options already handled by `@bufbuild/protoplugin`.

## Transpilation

If your plugin only implements `generateTs`, `@bufbuild/protoplugin` can still produce `.js` and `.d.ts` output when the user asks for `target=js+dts`.

That convenience has a cost. For large schemas, on-the-fly transpilation can slow generation noticeably. For the best experience, implement `generateJs` and `generateDts` directly.

## Release

To publish on npm, expose the executable through the `bin` field in `package.json`. Users who install your package can then invoke it from npm scripts and `npx`.

## Testing

Test generated code the same way you test handwritten code.

Pick representative `.proto` inputs, generate files, and run your normal tests against the output. If your plugin supports multiple targets, run the same tests against each target.
