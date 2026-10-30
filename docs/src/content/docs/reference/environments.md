---
title: Configure for your environment
sidebar:
  label: Bundlers and runtimes
---

Generated code has to match how your project resolves imports. Find your environment below and copy the configuration.

The options involved are:

- [`target`](/reference/plugin-options/#target): generate TypeScript (`ts`), or JavaScript with declarations (`js+dts`).
- [`import_extension`](/reference/plugin-options/#import_extension): the file extension of relative imports between generated files.
- [`erasable_syntax`](/reference/plugin-options/#erasable_syntaxtrue-experimental): generate enums as `as const` objects instead of TypeScript `enum`.
- [`js_import_style`](/reference/plugin-options/#js_import_style): ESM or CommonJS, for JavaScript output only.

Your own imports of generated files follow the same rule as the generated code: if generated files import `./foo_pb.ts`, import them the same way.

## Vite

```yaml
version: v2
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt:
      - target=ts
      - erasable_syntax=true
```

Projects created with `create-vite` enable [`erasableSyntaxOnly`](https://www.typescriptlang.org/tsconfig/#erasableSyntaxOnly), which rejects TypeScript enums. `erasable_syntax=true` generates enums that pass.

This also applies to other bundlers: esbuild, Rollup, Parcel, and webpack.

## Next.js

```yaml
version: v2
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt:
      - target=ts
      - erasable_syntax=true
```

Do not use `import_extension=js`. Neither Turbopack nor webpack in Next.js resolves a `.js` import to a `.ts` file.

## Node.js, running TypeScript directly

Node.js runs `.ts` files [natively](https://nodejs.org/learn/typescript/run-natively) since v22.18.

```yaml
version: v2
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt:
      - target=ts
      - import_extension=ts
      - erasable_syntax=true
```

Node.js strips types but does not transform other TypeScript syntax, so enums must be erasable. It also does not map `.js` imports to `.ts` files, so imports need the `.ts` extension.

To type-check with `tsc`, use:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true
  }
}
```

## Node.js, compiling with `tsc`

```yaml
version: v2
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt:
      - target=ts
      - import_extension=js
```

With `"module": "nodenext"`, TypeScript requires explicit extensions in ECMAScript modules, and resolves `./foo_pb.js` to `foo_pb.ts` at compile time. The emitted JavaScript works in Node.js as is. This also works with `tsx`.

## Node.js, JavaScript only

```yaml
version: v2
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt:
      - target=js+dts
      - import_extension=js
```

For CommonJS, add `js_import_style=legacy_commonjs`.

## Bun

```yaml
version: v2
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt:
      - target=ts
```

Bun resolves imports with or without extensions and supports all TypeScript syntax, so any option works.

## Deno

```yaml
version: v2
plugins:
  - local: protoc-gen-es
    out: src/gen
    opt:
      - target=ts
      - import_extension=ts
```

Deno requires the real file extension in imports.
