# @bufbuild/protobuf

This package provides the runtime library for the [protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)
code generator plugin.

## Protocol Buffers for ECMAScript

A complete implementation of [Protocol Buffers](https://protobuf.dev/) in TypeScript,
suitable for web browsers, Node.js, Deno, and Bun, created by [Buf](https://buf.build).

**Protobuf-ES** is a solid, modern alternative to existing Protobuf implementations for the JavaScript ecosystem. It
provides a comprehensive plugin framework and decouples the base types from RPC functionality.

Some additional features:

- Generates pure TypeScript
- Plain message objects, no getters/setters
- Reflection, registries, and custom options
- 100% conformant against the official Protobuf test suite
- Standard plugin-based generation, works with the Buf CLI as well as `protoc`
- Write your own code generators with [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin)
- Pairs with [@connectrpc/connect](https://www.npmjs.com/package/@connectrpc/connect) for RPC and [@bufbuild/protovalidate](https://www.npmjs.com/package/@bufbuild/protovalidate) for validation

## Installation

```bash
npm install @bufbuild/protobuf
```

## Documentation

To learn how to work with `@bufbuild/protobuf`, check out the docs for the [Runtime API](https://protobufes.com/guides/messages/)
and the [generated code](https://protobufes.com/reference/generated-code/).

Official documentation for the Protobuf-ES project can be found at [protobufes.com](https://protobufes.com/).

For more information on Buf, check out the official [Buf documentation](https://buf.build/docs/).

## Examples

A complete code example can be found in the **Protobuf-ES** repo [here](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example).
