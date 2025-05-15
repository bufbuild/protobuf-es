# @bufbuild/protoc-gen-es

The code generator plugin for Protocol Buffers for ECMAScript. Learn more about the project at
[github.com/bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es).

## Installation

`protoc-gen-es` generates base types—messages and enumerations—from your Protocol Buffer
schema. The generated code requires the runtime library [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf).
It's compatible with Protocol Buffer compilers like [buf](https://github.com/bufbuild/buf) and [protoc](https://github.com/protocolbuffers/protobuf/releases).

To install the runtime library and the plugin, run:

```shell
npm install @bufbuild/protobuf
npm install --save-dev @bufbuild/protoc-gen-es
```

## Generating code

### With buf

```bash
npm install --save-dev @bufbuild/buf
```

Add a new `buf.gen.yaml` configuration file:

```yaml
# Learn more: https://buf.build/docs/configuration/v2/buf-gen-yaml
version: v2
plugins:
  # This will invoke protoc-gen-es and write output to src/gen
  - local: protoc-gen-es
    out: src/gen
    opt:
      # Add more plugin options here
      - target=ts
```

To generate code for all Protobuf files within your project, run:

```bash
npx buf generate
```

Note that `buf` can generate from various [inputs](https://buf.build/docs/reference/inputs),
not just local Protobuf files.

### With `protoc`

```bash
PATH=$PATH:$(pwd)/node_modules/.bin \
  protoc -I . \
  --es_out src/gen \
  --es_opt target=ts \
  a.proto b.proto c.proto
```

Note that `node_modules/.bin` needs to be added to the `$PATH` so that the Protobuf compiler can find the plugin. This
happens automatically with npm scripts.

If you use Yarn, versions v2 and above don't use a `node_modules` directory, so you need to change the variable a
bit:

```shellsession
PATH=$(dirname $(yarn bin protoc-gen-es)):$PATH
```

## Plugin options

### `target`

This option controls whether the plugin generates JavaScript, TypeScript, or TypeScript declaration files. Possible
values:

- `target=js`: Generates a `_pb.js` file for every `.proto` input file.
- `target=ts`: Generates a `_pb.ts` file for every `.proto` input file.
- `target=dts`: Generates a `_pb.d.ts` file for every `.proto` input file.

You can pass multiple values by separating them with `+`—for example, `target=js+dts`.

By default, it generates JavaScript and TypeScript declaration files, which produces the smallest code size and is the
most compatible with various bundler configurations. If you prefer to generate TypeScript, use `target=ts`.

### `import_extension`

By default, `protoc-gen-es` doesn't add file extensions to import paths. However, some
environments require an import extension. For example, using ECMAScript modules in Node.js
requires the `.js` extension, and Deno requires `.ts`. With this plugin option, you can add `.js`/`.ts` extensions in
import paths with the given value. Possible values:

- `import_extension=none`: Doesn't add an extension. (Default)
- `import_extension=js`: Adds the `.js` extension.
- `import_extension=ts`. Adds the `.ts` extension.

### `js_import_style`

By default, `protoc-gen-es` generates ECMAScript `import` and `export` statements. For use cases where CommonJS is
difficult to avoid, this option can be used to generate CommonJS `require()` calls. Possible values:

- `js_import_style=module`: Generates ECMAScript `import`/`export` statements. (Default)
- `js_import_style=legacy_commonjs`: Generates CommonJS `require()` calls.

### `keep_empty_files=true`

By default, `protoc-gen-es` omits empty files from the plugin output. This option disables pruning of empty files to
allow for smooth interoperation with Bazel and similar tooling that requires all output files to be declared ahead of
time. Unless you use Bazel, you probably don't need this option.

### `ts_nocheck=true`

`protoc-gen-es` generates valid TypeScript for current versions of the TypeScript compiler with standard settings.
If you use compiler settings that yield an error for generated code, setting this option generates an annotation at
the top of each file to skip type checks: `// @ts-nocheck`.

### `json_types=true`

Generates JSON types for every Protobuf message and enumeration. Calling `toJson()` automatically returns the JSON type
if available. Learn more about [JSON types](https://github.com/bufbuild/protobuf-es/blob/main/MANUAL.md#json-types).

### `valid_types` (experimental)

Generates a Valid type for every Protobuf message. Possible values:

- `valid_types=legacy_required`: Message fields with the `required` label, or the Edition feature 
  `features.field_presence=LEGACY_REQUIRED`, are generated as non-optional properties. 
- `valid_types=protovalidate_required`: Message fields with protovalidate's [`required` rule](https://buf.build/docs/reference/protovalidate/rules/field_rules/#required) 
  rule are generated as non-optional properties.

You can combine both options with `+`—for example, `valid_types=legacy_required+protovalidate_required`.

Learn more about [Valid types](https://github.com/bufbuild/protobuf-es/blob/main/MANUAL.md#valid-types).
