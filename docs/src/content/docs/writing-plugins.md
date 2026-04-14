---
title: Writing plugins
---

Protobuf compilers can run plugins that generate files from schemas. Protobuf-ES includes `@bufbuild/protoplugin`, a framework for building those plugins in TypeScript.

Plugins are executables named `protoc-gen-x`. They read schema data from standard input and write generated files to standard output.

## Hello world plugin

Start from the [Getting started](/getting-started/) setup, then install two more packages:

```shellsession
npm install @bufbuild/protoplugin tsx
```

Create `src/protoc-gen-hello.ts`:

```typescript
import {
  createEcmaScriptPlugin,
  runNodeJs,
  type Schema,
} from "@bufbuild/protoplugin";

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

Run it directly to confirm it is wired correctly:

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

Run `npx buf generate` again and the plugin emits `example_hello.ts`.

## Generating files

Plugins usually loop through `schema.files` and generate one output file per Protobuf input file.

```typescript
for (const file of schema.files) {
  schema.generateFile(file.name + "_hello.ts");
}
```

We recommend giving generated files a suffix tied to your plugin name.

Use `preamble()` to add a standard generated-file header:

```typescript
const f = schema.generateFile(file.name + "_hello.ts");
f.preamble(file);
```

If you never print to a file, it is not emitted.

## Printing to a file

Use `GeneratedFile.print()` to append source lines:

```typescript
f.print("// hello world");
f.print("const num = ", 123, ";");
f.print("const bool = ", true, ";");
f.print("const bytes = ", new Uint8Array([0xde, 0xad, 0xbe, 0xef]), ";");
```

For string and array literals, wrap values with helpers:

```typescript
f.print("const str = ", f.string("hello"), ";");
f.print("const arr = ", f.array([1, 2, 3]), ";");
```

You can also use template literal syntax:

```typescript
const world = "world";
f.print`// hello ${world}`;
```

## Importing

`GeneratedFile.import()` returns an `ImportSymbol` that only becomes an import statement if you print it.

```typescript
const useEffect = f.import("useEffect", "react");
f.print(useEffect, "(() => {");
f.print("  document.title = `You clicked ${count} times`;");
f.print("}, [count]);");
```

Use `toTypeOnly()` on an `ImportSymbol` for type-only imports.

When working with Protobuf-ES generated output, helper methods make imports easier:

```typescript
for (const message of file.messages) {
  const { create } = f.runtime;
  const schema = f.importSchema(message);
  const shape = f.importShape(message);
  f.print("const msg: ", shape, " = ", create, "(", schema, ");");
}
```

## Exporting

Use `export()` to build exported declarations safely:

```typescript
f.print(f.export("const", "foo"), " = 123;");
```

If your plugin generates names from Protobuf input, use `safeIdentifier()` from `@bufbuild/protoplugin` to escape reserved words.

## Parsing plugin options

If your plugin needs custom options, provide `parseOptions()` to `createEcmaScriptPlugin()`.

```typescript
parseOptions(rawOptions: { key: string; value: string }[]): T;
```

The framework parses common options first, then passes any unrecognized key-value pairs to `parseOptions()`.

## Automatic transpilation

If your plugin only implements `generateTs`, `@bufbuild/protoplugin` can still produce `.js` and `.d.ts` output when the user asks for `target=js+dts`.

That convenience comes with a cost. For large schemas, on-the-fly transpilation can slow generation noticeably. For the best experience, implement `generateJs` and `generateDts` directly.

## Releasing your plugin

To publish on npm, expose the executable through the `bin` field in `package.json`. Users who install your package can then invoke it from npm scripts and `npx`.

## Testing plugins

Test generated code the same way you test handwritten code.

Pick representative `.proto` inputs, generate files, and run your normal tests against the output. If your plugin supports multiple targets, run the same tests against each target.

For a complete runnable example, see [`packages/protoplugin-example`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoplugin-example).
