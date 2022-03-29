Protobuf-ES
===========

A complete implementation of protocol buffers in TypeScript,
suitable for web browsers and Node.js.


## Features

- small code size
- no dependencies
- implements all proto3 features, including the canonical JSON format
- implements all proto2 features, except for extensions and the text format
- passes the protocol buffers conformance tests
- provides all well-known types with their specialized JSON representation
- uses and algebraic data type to represent `oneof` groups
- unboxes fields using google/protobuf/wrappers.proto to optional primitives
- represents 64-bit integers with BigInt, and falls back to `string` if unavailable
- uses standard TypeScript enums for protocol buffer `enum`
- provides `equals()` and `clone()` on each message for convenience
- fields are plain properties, and support the object spread operator
- messages can be constructed from partial plain objects
- can dynamically create types at run time, for example from a set of `google.protobuf.FileDescriptorProto`
- provides field information to traverse types programmatically


## Code Generator

[![npm](https://img.shields.io/npm/v/@bufbuild/protoc-gen-es?style=flat-square)](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)

The code generator `protoc-gen-es` implements the protoc plugin contract, defined by [plugin.proto](https://github.com/protocolbuffers/protobuf/blob/43bb1bfe4224e31f2251da70aabcffeba0f3a2e6/src/google/protobuf/compiler/plugin.proto#L57).

### Plugin options:

#### `target=ts|js|dts`

This option controls whether the plugin generates JavaScript or TypeScript. 
Multiple values can be given by separating them with `+`, for example 
`target=js+dts`.

By default, JavaScript and TypeScript declaration files are generated.


#### `ts_nocheck`

This option prints `/* @ts-nocheck */` at the top of each generated TypeScript 
file.
It can be given as `ts_nocheck=true`, or `ts_nocheck=false`. By default, this 
option is enabled.


#### `eslint_disable`

This option prints `/* eslint-disable */` at the top of each generated file.
It can be given as `eslint_disable=true`, or `eslint_disable=false`. By default, 
this option is enabled.



## Runtime library

[![npm](https://img.shields.io/npm/v/@bufbuild/protobuf?style=flat-square)](https://www.npmjs.com/package/@bufbuild/protobuf)

The runtime library @bufbuild/protobuf is used by the generated code. Its
source code is located at [packages/protobuf/src](packages/protobuf/src).



## Copyright

The [code to encode and decode varint](./packages/protobuf/src/google/varint.ts) is Copyright 2008 Google Inc., licensed under BSD-3-Clause.
