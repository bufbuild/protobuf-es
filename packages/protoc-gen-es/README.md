# @bufbuild/protoc-gen-es

The code generator for Protocol Buffers for ECMAScript. For example, the 
following definition:

```protobuf
message Person {
  string name = 1;
  int32 id = 2;  // Unique ID number for this person.
  string email = 3;
}
```

Is compiled to an ECMAScript class that can be used like this:

```typescript
let pete = new Person({
  name: "pete",
  id: 123
});

let bytes = pete.toBinary();
pete = Person.fromBinary(bytes);
pete = Person.fromJsonString('{"name": "pete", "id": 123}');
```

Learn more about the project at [github.com/bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es).


## Installation

`protoc-gen-es` is a code generator plugin for Protocol Buffer compilers,
like [buf](https://github.com/bufbuild/buf) and [protoc](https://github.com/protocolbuffers/protobuf/releases).
It generates base types - messages and enumerations - from your Protocol Buffer 
schema. The generated code requires the runtime library [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf).

To install the plugin and the runtime library, run:

```shell
npm install --save-dev @bufbuild/protoc-gen-es
npm install @bufbuild/protobuf
```

We use peer dependencies to ensure that code generator and runtime library are
compatible with each other. Note that yarn and pnpm only emit a warning in this case.


## Generating code

### With buf

Add a new configuration file `buf.gen.yaml`:

```yaml
# buf.gen.yaml defines a local generation template.
# For details, see https://docs.buf.build/configuration/v1/buf-gen-yaml
version: v1
plugins:
  # This will invoke protoc-gen-es and write output to src/gen
  - name: es
    out: src/gen
    opt: target=ts
```

Add the following script to your `package.json`:

```json
{
  "name": "your-package",
  "version": "1.0.0",
  "scripts": {
    "generate": "buf generate"
  },
  // ...
}
```

To generate code for all protobuf files within your project, simply run:

```bash
npm run generate
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
produces the smallest code size. If you prefer to generate TypeScript, use
`target=ts`.

