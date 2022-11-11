![The Buf logo](./.github/buf-logo.svg)

# Protobuf-ES

[![License](https://img.shields.io/github/license/bufbuild/protobuf-es?color=blue)](./LICENSE) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protobuf/latest?color=green&label=%40bufbuild%2Fprotobuf)](https://www.npmjs.com/package/@bufbuild/protobuf) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoplugin/latest?color=green&label=%40bufbuild%2Fprotoplugin)](https://www.npmjs.com/package/@bufbuild/protoplugin) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoc-gen-es/latest?color=green&label=%40bufbuild%2Fprotoc-gen-es)](https://www.npmjs.com/package/@bufbuild/protoc-gen-es) 

A complete implementation of [Protocol Buffers](https://developers.google.com/protocol-buffers) in TypeScript,
suitable for web browsers and Node.js.

## What are Protocol Buffers?
The official description of Protocol Buffers states that they are: 

> a language-neutral, platform-neutral extensible mechanism for serializing structured data.

But, in a nutshell, why should you use Protocol Buffers in your JavaScript or TypeScript application?  What benefits does this library provide over simple JSON?

TODO - Describe what you could do with this library in a web application.


## Features

**Protobuf-ES** is intended to be a solid, modern alternative to existing Protobuf implementations for the JavaScript ecosystem.  Some features that set it apart from the others:

- Descriptor and reflection support
- ECMAScript module support
- First-class TypeScript support
- Generation of idiomatic JavaScript and TypeScript code.
- Generation of [much smaller bundles](packages/protobuf-bench)
- Implementation of all proto3 features, including the canonical JSON format.
- Implementation of all proto2 features, except for extensions and the text format.  
- Usage of standard JavaScript APIs instead of the [Closure Library](http://googlecode.blogspot.com/2009/11/introducing-closure-tools.html)
- Compatibility is covered by the protocol buffers [conformance tests](packages/protobuf-conformance).

For an overall comparison with other tools in the Protobuf space:

| Feature / Generator                                                                                                                       | [protobuf.js](https://github.com/protobufjs/protobuf.js) | [ts-proto](https://github.com/stephenh/ts-proto) | [protobuf-ts](https://github.com/timostamm/protobuf-ts) | [protoc-gen-ts](https://github.com/thesayyn/protoc-gen-ts) | [Protobuf-ES](https://github.com/bufbuild/protobuf-es) |
|-------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|--------------------------------------------------|---------------------------------------------------------|------------------------------------------------------------|------------------------------------------------------------|
| [Standard plugin](https://docs.buf.build/reference/images#plugins)                                                                        | ❌                                                       | ✅                                           | ✅                                                      | ✅                                                      | ✅                                                         |
| [Conformance tests](https://github.com/protocolbuffers/protobuf/tree/main/conformance#protocol-buffers---googles-data-interchange-format) | ❌                                                       | ❌                                               | ✅                                                      | ❌                                                         |                                                     ✅ |
| Fully tree-shakeable                                                                                                                      | ❌                                                       | ✅                                               | ✅                                                      | ❌                                                         |                                                     ✅ |
| Actively maintained                                                                                                                                | ❌                                                       | ✅                                               | ✅                                                      | ✅                                                         |                                              ✅ |
| Vanilla JavaScript support                                                                                                                | ✅                                                       | ❌                                               | ✅                                                      | ❌                                                         |                                                     ✅ |
| Fast code generation                                                                                                                      | ✅                                                       | ✅                                               | ❌                                                      | ❌                                                         |                                                     ✅ |

Perhaps the strongest argument for **Protobuf-ES** is its generation of idiomatic JavaScript and TypeScript code.  It adopts the best features from the community generators. This means no more clunky getters and setters. You can now use things like the spread operator and make use of the same JavaScript semantics you've grown used to.

For example, given a Protobuf file such as:

```protobuf
syntax="proto3";
package docs;

message Example {
  string foo = 1;
  bool bar = 2;
  Example baz = 3;
  repeated string names = 4;
  map<string, string> statuses = 5;
}
```

TODO - Make this example more realistic  and ironed out with the fromBinary and fromJson stuff below

you can use direct property access:

```typescript
msg.foo = "Hello";
msg.bar = true;
msg.baz.foo = "World";

let bytes = msg.toBinary();
example = Example.fromBinary(bytes);
example = Example.fromJsonString('{"foo": "pete", "bar": true}');
```

and you won't get confusing methods like `getNamesList`, `setNamesList`, `getStatusMap`, and `clearStatusMap`.  You won't have to access nested messages by doing things like `msg.getBaz().getNamesList()`.  You will work with the same familiar syntax:

```typescript
msg.names = [];

const names = foo.names;

msg.statuses = {
   "bar": "created"
};
```

and you can initialize your objects conveniently using the `new` operator or passing an initializer object to constructors:

```typescript
// Using new
const message = new Example();

// Using an object in the constructor
new Example({
  foo: "Hello",
  bar: true,
  baz: {  // you can simply pass an initializer object for this message field
      foo: "world",
  },
});
```

To learn more, have a look at a complete [code example](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example), 
the documentation for the [generated code](https://github.com/bufbuild/protobuf-es/blob/main/docs/generated_code.md), 
and the documentation for the [runtime API](https://github.com/bufbuild/protobuf-es/blob/main/docs/runtime_api.md).

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

TODO - Make this better worded and link to docs.  Also make sure each individual doc page is good.
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
