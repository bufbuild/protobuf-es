---
title: Writing plugins
---

Protobuf-ES lets you write standard Protobuf plugins in TypeScript. `@bufbuild/protoplugin` handles the plugin protocol and gives you helpers for generating JavaScript and TypeScript from schemas.

Plugins are executables named `protoc-gen-x`. They read schema data from standard input and write generated files to standard output.

## Hello world plugin

Install the plugin framework and `tsx`:

```shellsession
npm install @bufbuild/protoplugin tsx
```

Create `src/protoc-gen-hello.ts`:

```typescript
import { createEcmaScriptPlugin, runNodeJs, type Schema } from "@bufbuild/protoplugin";

const plugin = createEcmaScriptPlugin({
  name: "protoc-gen-hello",
  version: "v1",
  generateTs(schema: Schema) {
    for (const file of schema.files) {
      const f = schema.generateFile(file.name + "_hello.ts");
      f.print("// hello world");
    }
  },
});

runNodeJs(plugin);
```

Run it directly:

```shellsession
npx tsx src/protoc-gen-hello.ts --version
```

Add it to `buf.gen.yaml`:

```yaml
version: v2
inputs:
  - directory: proto
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt: target=ts
  - local: ["tsx", "./src/protoc-gen-hello.ts"]
    out: src/gen
    opt: target=ts
```

Run `npx buf generate` again. The plugin emits `example_hello.ts`.

For the options accepted by `protoc-gen-es`, see [Plugin options](/plugin-options/).

## Next steps

- [Generating files](/writing-plugins/generating-files/): create output files, print code, imports, and exports.
- [Plugin options and release](/writing-plugins/options/): parse custom options, handle transpilation, release, and test plugins.
- [Reflection](/reflection/): inspect the schema passed to your plugin.

For a complete runnable example, see the [Twirp plugin](/examples/twirp-plugin/) walkthrough or [`packages/protoplugin-example`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoplugin-example) directly.
