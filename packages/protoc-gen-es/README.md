# @bufbuild/protoc-gen-es

The code generator plugin for Protocol Buffers for ECMAScript.  Learn more about the project at [github.com/bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es).

## Installation

`protoc-gen-es` generates base types - messages and enumerations - from your Protocol Buffer 
schema. The generated code requires the runtime library [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf).  It is compatible with Protocol Buffer compilers  like [buf](https://github.com/bufbuild/buf) and [protoc](https://github.com/protocolbuffers/protobuf/releases).

To install the plugin and the runtime library, run:

```shell
npm install --save-dev @bufbuild/protoc-gen-es
npm install @bufbuild/protobuf
```

We use peer dependencies to ensure that code generator and runtime library are
compatible with each other. Note that npm installs them automatically, but yarn 
and pnpm do not.


## Generating code

### With buf

```bash
npm install --save-dev @bufbuild/buf
```

Add a new configuration file `buf.gen.yaml`:

```yaml
# buf.gen.yaml defines a local generation template.
# For details, see https://docs.buf.build/configuration/v1/buf-gen-yaml
version: v1
plugins:
  # This will invoke protoc-gen-es and write output to src/gen
  - plugin: es
    out: src/gen
    opt: 
      # Add more plugin options here
      - target=ts
```

To generate code for all protobuf files within your project, simply run:

```bash
npx buf generate
```

Note that `buf` can generate from various [inputs](https://docs.buf.build/reference/inputs),
not just local protobuf files. 


### With protoc

```bash
PATH=$PATH:$(pwd)/node_modules/.bin \
  protoc -I . \
  --es_out src/gen \
  --es_opt target=ts \
  a.proto b.proto c.proto
```

Note that we are adding `node_modules/.bin` to the `$PATH`, so that the protocol
buffer compiler can find them. This happens automatically with npm scripts.

Since yarn v2 and above does not use a `node_modules` directory, you need to 
change the variable a bit:

```bash
PATH=$(dirname $(yarn bin protoc-gen-es)):$PATH
```

## Plugin options

### `target`

This option controls whether the plugin generates JavaScript, TypeScript,
or TypeScript declaration files.

Possible values:
- `target=js` - generates a `_pb.js` file for every `.proto` input file.
- `target=ts` - generates a `_pb.ts` file for every `.proto` input file.
- `target=dts` - generates a `_pb.d.ts` file for every `.proto` input file.

Multiple values can be given by separating them with `+`, for example
`target=js+dts`.

By default, we generate JavaScript and TypeScript declaration files, which
produces the smallest code size and is the most compatible with various 
bundler configurations. If you prefer to generate TypeScript, use `target=ts`.

### `import_extension=.js`

By default, [protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)
(and all other plugins based on [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin))
uses a `.js` file extensions in import paths, even in TypeScript files.

This is unintuitive, but necessary for [ECMAScript modules in Node.js](https://www.typescriptlang.org/docs/handbook/esm-node.html).
Unfortunately, not all bundlers and tools have caught up yet, and Deno
requires `.ts`. With this plugin option, you can replace `.js` extensions
in import paths with the given value. For example, set

- `import_extension=none` to remove the `.js` extension.
- `import_extension=.ts` to replace the `.js` extension with `.ts`.

### `js_import_style`

By default, [protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)
(and all other plugins based on [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin))
generate ECMAScript `import` and `export` statements. For use cases where 
CommonJS is difficult to avoid, this option can be used to generate CommonJS 
`require()` calls.

Possible values:
- `js_import_style=module` generate ECMAScript `import` / `export` statements - 
  the default behavior.
- `js_import_style=legacy_commonjs` generate CommonJS `require()` calls.

### `keep_empty_files=true`

By default, [protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)
(and all other plugins based on [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin))
omit empty files from the plugin output. This option disables pruning of
empty files, to allow for smooth interoperation with Bazel and similar
tooling that requires all output files to be declared ahead of time.
Unless you use Bazel, it is very unlikely that you need this option.

### `ts_nocheck=false`

By default, [protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)
(and all other plugins based on [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin))
generate an annotation at the top of each file: `// @ts-nocheck`.

We generate the annotation to support a wide range of compiler configurations and
future changes to the language. But there can be situations where the annotation
shadows an underlying problem, for example an unresolvable import. To remove 
the annotation and to enable type checks, set the plugin option `ts_nocheck=false`.
