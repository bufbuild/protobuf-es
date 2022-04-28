# @bufbuild/protoc-gen-es

[![npm](https://img.shields.io/npm/v/@bufbuild/protoc-gen-es?style=flat-square)](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)

A complete implementation of protocol buffers in TypeScript, 
suitable for web browsers and Node.js.  
Learn more at [github.com/bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es).

This is a code generator plugin for `protoc` and [`buf`](https://github.com/bufbuild/buf).


## Installation

```shell
npm install @bufbuild/protoc-gen-es
```

This will install the code generator plugin in `node_modules/.bin/protoc-gen-es`. It is
actually just a simple node script that selects the correct precompiled binary for your
platform.

Note that npm does not add the executable to your `$PATH`. You can do so with:

```shell
PATH=$PATH:$(pwd)/node_modules/.bin
```


Alternatively, you can install the plugin with ``go``:

```shell
go install github.com/bufbuild/protobuf-es/cmd/protoc-gen-es@latest
```

If your go environment is set up correctly, the executable is now available on 
your `$PATH`.

You can always confirm successful installation with:
```shell
protoc-gen-es --version
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


### `ts_nocheck`

This option prints `/* @ts-nocheck */` at the top of each generated TypeScript
file, which disables type checking through the TypeScript compiler. The 
purpose is to improve backwards and forwards compatibility with different 
versions of TypeScript.

Possible values:
- `ts_nocheck=true` - print the annotation to disable - this is the default.
- `ts_nocheck=false` - do not print the annotation.


### `eslint_disable`

This option prints `/* eslint-disable */` at the top of each generated file.
Since eslint is highly configurable, it is impossible for the code generator
to comply with all rules for all users. The annotation makes sure users do not 
need to exclude files from their eslint configuration explicitly.

Possible values:
- `eslint_disable=true` - print the annotation to disable - this is the default.
- `eslint_disable=false` - do not print the annotation.
