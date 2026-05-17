---
title: Generating files
---

Plugins usually loop through `schema.files` and generate one output file per Protobuf input file.

```typescript
for (const file of schema.files) {
  schema.generateFile(file.name + "_hello.ts");
}
```

`file.name` is the Protobuf file name without the `.proto` extension. Use a suffix tied to your plugin name so generated files are easy to identify.

## Preamble

Use `preamble()` to add a standard generated-file header:

```typescript
const f = schema.generateFile(file.name + "_hello.ts");
f.preamble(file);
```

If you never print to a file, it is not emitted.

## Printing

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

Template literal syntax also works:

```typescript
const world = "world";
f.print`// hello ${world}`;
```

## Imports

`GeneratedFile.import()` returns an `ImportSymbol` that only becomes an import statement if you print it.

```typescript
const useEffect = f.import("useEffect", "react");
f.print(useEffect, "(() => {");
f.print("  document.title = `You clicked ${count} times`;");
f.print("}, [count]);");
```

Use `toTypeOnly()` on an `ImportSymbol` for type-only imports.

When working with Protobuf-ES generated output, use helper methods:

```typescript
for (const message of file.messages) {
  const { create } = f.runtime;
  const schema = f.importSchema(message);
  const shape = f.importShape(message);
  f.print("const msg: ", shape, " = ", create, "(", schema, ");");
}
```

Generated imports are lazy. If an `ImportSymbol` is never printed, no import appears in the output. If two imports would use the same local name, `GeneratedFile` renames one of them to avoid collisions. If the user asks for `js_import_style=legacy_commonjs`, the same calls generate `require()` statements instead of ESM imports.

## Exports

Use `export()` to build exported declarations safely:

```typescript
f.print(f.export("const", "foo"), " = 123;");
```

If your plugin generates names from Protobuf input, use `safeIdentifier()` from `@bufbuild/protoplugin` to escape reserved words.

`export()` also adapts to CommonJS output when `js_import_style=legacy_commonjs` is set.
