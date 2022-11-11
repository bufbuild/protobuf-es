![The Buf logo](./.github/buf-logo.svg)

# Protobuf-ES

[![License](https://img.shields.io/github/license/bufbuild/protobuf-es?color=blue)](./LICENSE) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protobuf/latest?color=green&label=%40bufbuild%2Fprotobuf)](https://www.npmjs.com/package/@bufbuild/protobuf) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoplugin/latest?color=green&label=%40bufbuild%2Fprotoplugin)](https://www.npmjs.com/package/@bufbuild/protoplugin) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoc-gen-es/latest?color=green&label=%40bufbuild%2Fprotoc-gen-es)](https://www.npmjs.com/package/@bufbuild/protoc-gen-es) 

A complete implementation of [Protocol Buffers](https://developers.google.com/protocol-buffers) in TypeScript,
suitable for web browsers and Node.js.

## What are Protocol Buffers?
The official description of Protocol Buffers states that they are: 

> a language-neutral, platform-neutral extensible mechanism for serializing structured data.

But, in a nutshell, why should you use Protocol Buffers in your JavaScript or TypeScript application?  What benefits does this library provide over simple JSON?

Lorem ipsum dolor sit amet


## Features

Protobuf-ES is intended to be a solid, modern alternative to existing Protobuf implementations for the JavaScript ecosystem.  Some features that set it apart from the others:

- we use plain properties for fields, where protoc uses getter and setter methods
- we implement the canonical JSON format
- we generate [much smaller bundles](packages/protobuf-bench)
- we rely on standard APIs instead of the [Closure Library](http://googlecode.blogspot.com/2009/11/introducing-closure-tools.html)

For example, the following definition:

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

In addition, **Protobuf-ES** implements all proto3 features, including the canonical JSON format.  It also implements all proto2 features, except for extensions and the text format.  
The implementation is covered by the protocol buffers [conformance tests](packages/protobuf-conformance).

To learn more, have a look at a complete [code example](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example), 
the documentation for the [generated code](https://github.com/bufbuild/protobuf-es/blob/main/docs/generated_code.md), 
and the documentation for the [runtime API](https://github.com/bufbuild/protobuf-es/blob/main/docs/runtime_api.md).

| Feature / Generator                                                                                                                       | [protobuf.js](https://github.com/protobufjs/protobuf.js) | [ts-proto](https://github.com/stephenh/ts-proto) | [protobuf-ts](https://github.com/timostamm/protobuf-ts) | [protoc-gen-ts](https://github.com/thesayyn/protoc-gen-ts) | [Protobuf-ES](https://github.com/bufbuild/protobuf-es) |
|-------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|--------------------------------------------------|---------------------------------------------------------|------------------------------------------------------------|------------------------------------------------------------|
| [Standard plugin](https://docs.buf.build/reference/images#plugins)                                                                        | ❌                                                       | ✅                                           | ✅                                                      | ✅                                                      | ✅                                                         |
| [Conformance tests](https://github.com/protocolbuffers/protobuf/tree/main/conformance#protocol-buffers---googles-data-interchange-format) | ❌                                                       | ❌                                               | ✅                                                      | ❌                                                         |                                                     ✅ |
| Fully tree-shakeable                                                                                                                      | ❌                                                       | ✅                                               | ✅                                                      | ❌                                                         |                                                     ✅ |
| Actively maintained                                                                                                                                | ❌                                                       | ✅                                               | ✅                                                      | ✅                                                         |                                              ✅ |
| Vanilla JavaScript support                                                                                                                | ✅                                                       | ❌                                               | ✅                                                      | ❌                                                         |                                                     ✅ |
| Fast code generation                                                                                                                      | ✅                                                       | ✅                                               | ❌                                                      | ❌                                                         |                                                     ✅ |

## Installation

**Protobuf-ES** contains three packages.  Installation instructions vary depending on your purpose.

### [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf) ([source](packages/protobuf))

Provides the runtime library, containing base types, generated well-known types, and core functionality.  This installation is required.

### [@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es) ([source](packages/protoc-gen-es))

Provides the code generator plugin `protoc-gen-es` .  The code it generates depends on `@bufbuild/protobuf`.  This installation is only required if you plan to generate code from your Protobuf files.
  
### [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin) ([source](packages/protoplugin))

Helps to create your own code generator plugin.  The code it generates depends on `@bufbuild/protobuf`.  This installation is only required if you plan to write your own code generator plugin.  See [docs](packages/protoplugin) for instructions.

You will most likely want to install the runtime and the code generator plugin:

Using your package manager of choice:
  
**npm**
```bash
npm install @bufbuild/protobuf @bufbuild/protoc-gen-es
```

**pnpm**
```bash
pnpm install @bufbuild/protobuf @bufbuild/protoc-gen-es
```

**Yarn**
```bash
yarn add @bufbuild/protobuf @bufbuild/protoc-gen-es
```

As mentioned, if you would like to write your own plugin, you can install `@bufbuild/protoplugin`.


### Usage

To begin using the library, visit the docs for each individual package:

protobuf
protoplugin
protoc-gen-es

Another library created by Buf uses Protobuf-ES extensively.  To see a real-world application of this library, take a look at [Connect-Web](https://github.com/bufbuild/connect-web).  Additionally, check out the official [Connect-Web](https://connect.build/docs/web/getting-started) documentation!


### Migrating from other implementations

If you are currently using another implementation and would like to migrate to Protobuf-ES to see what it's all about, check out our [migration guides](docs/migrating.md) for details.


### TypeScript

The minimum version of TypeScript supported by Protobuf-ES is **4.1.2**.


### Copyright

The [code to encode and decode varint](packages/protobuf/src/google/varint.ts) is Copyright 2008 Google Inc., licensed 
under BSD-3-Clause.  
All other files are licensed under Apache-2.0, see [LICENSE](LICENSE).
