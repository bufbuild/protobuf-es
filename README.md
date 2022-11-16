![The Buf logo](./.github/buf-logo.svg)

# Protobuf-ES

[![License](https://img.shields.io/github/license/bufbuild/protobuf-es?color=blue)](./LICENSE) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protobuf/latest?color=green&label=%40bufbuild%2Fprotobuf)](https://www.npmjs.com/package/@bufbuild/protobuf) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoplugin/latest?color=green&label=%40bufbuild%2Fprotoplugin)](https://www.npmjs.com/package/@bufbuild/protoplugin) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoc-gen-es/latest?color=green&label=%40bufbuild%2Fprotoc-gen-es)](https://www.npmjs.com/package/@bufbuild/protoc-gen-es) 

A complete implementation of [Protocol Buffers](https://developers.google.com/protocol-buffers) in TypeScript,
suitable for web browsers and Node.js.

## What are Protocol Buffers?

The official description of Protocol Buffers states that they are: 

> a language-neutral, platform-neutral extensible mechanism for serializing structured data.

While accurate, this definition doesn't fully explain their benefits.  In a nutshell, Protocol Buffers have two main functions:

- They are a language for writing schemas for your data.
- They define a binary format for serializing your data.

These two functions are independent, but also work together to provide common definitions for all aspects of your data.  This allows your project and everyone who interacts with it to all define messages, fields, and service APIs in the exact same way.   In a practical sense as it relates to **Protobuf-ES**, this means no more disparate JSON types all over the place.  Instead, you define a common schema in a Protobuf file, such as:

```proto
message Foo {
   string bar = 1;
   boolean baz = 2;
   int32 bing = 3;
}
```

And voila, your schema comes to life.  It is used with a consistent approach throughout your code.  But, the benefits aren't just limited to *your* application.  They can extend to all others that interact with it as well.  This is because, as mentioned above, the Protobuf file can be used to generate types in many languages.  So, now all applications can use the same definition of `Foo` as defined above.  And when everyone agrees on what a `Foo` is, communication occurs much more easily.  The added bonus is that no one has to write any boilerplate code to create these types in their application.  [Code generators](https://www.npmjs.com/package/@bufbuild/protoc-gen-es) handle all of this for you.

Finally as the official description states, Protocol Buffers allow you to serialize this structured data.  So, your application running in the browser can send a `Foo` object to a backend running an entirely different language, but using the exact same definition.  Using an RPC framework like [Connect-Web](https://github.com/bufbuild/connect-web), your data is serialized into bytes on the wire and then deserialized at its destination using the defined schema.

## Features

**Protobuf-ES** is intended to be a solid, modern alternative to existing Protobuf implementations for the JavaScript ecosystem.  It is the first project in this space to provide a comprehensive plugin framework and decouple the base types from RPC functionality.

Some additional features that set it apart from the others:

- ECMAScript module support
- First-class TypeScript support
- Generation of idiomatic JavaScript and TypeScript code.
- Generation of [much smaller bundles](packages/protobuf-bench)
- Implementation of all proto3 features, including the [canonical JSON format](https://developers.google.com/protocol-buffers/docs/proto3#json).
- Implementation of all proto2 features, except for extensions and the text format.  
- Usage of standard JavaScript APIs instead of the [Closure Library](http://googlecode.blogspot.com/2009/11/introducing-closure-tools.html)
- Compatibility is covered by the protocol buffers [conformance tests](packages/protobuf-conformance).
- Descriptor and reflection support

To learn more, have a look at a complete [code example](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example), 
the documentation for the [generated code](https://github.com/bufbuild/protobuf-es/blob/main/docs/generated_code.md), 
and the documentation for the [runtime API](https://github.com/bufbuild/protobuf-es/blob/main/docs/runtime_api.md).


## Quickstart

To get started generating code right away, first make sure you have [Buf](https://docs.buf.build/installation) installed.  If desired, you can also use `protoc`.  For full instructions on generating code, visit the [docs](docs/generating_code.md) for the `protoc-gen-es` plugin.

### Installation

Install the necessary packages.  For details on each package, see [below](#packages).  The statement listed below is the most likely one you will need.

```bash
npm install @bufbuild/protobuf
npm install --save-dev @bufbuild/protoc-gen-es
```

### Code Generation

Once installed, download the example file [example.proto](https://raw.githubusercontent.com/bufbuild/protobuf-es/main/packages/protobuf-test/extra/example.proto) and place it into a `protos/` directory.

Next, create a `buf.gen.yaml` file in your project root that looks like this:

```yaml
# Learn more: https://docs.buf.build/configuration/v1/buf-gen-yaml
version: v1
plugins:
  - name: es
    path: ./node_modules/.bin/protoc-gen-es
    opt: target=ts
    out: src/gen
```

Finally, run `buf generate`.  You should now see a generated file at `src/gen/example_pb.ts` that contains a class named `User`.  From here, you can begin to work with your schema.

### Usage

You can initialize your objects conveniently using an empty `new` operator and then using direct property access:

```typescript
const user = new User();
user.firstName = "Homer";
user.lastName = "Simpson";
user.active = true;
user.locations = ["Springfield"];
user.projects = {
  SPP: "Springfield Power Plant",
};

const mgr = new User();
mgr.firstName = "Montgomery";
mgr.lastName = "Burns";

user.manager = mgr;
```

or by passing an initializer object to constructors (note that all fields are optional).

```typescript
const user = new User({
  firstName: "Homer",
  lastName: "Simpson",
  active: true,
  locations: ["Springfield"],
  projects: { SPP: "Springfield Power Plant" },
  manager: {
    // you can simply pass an initializer object for this nested message field
    firstName: "Montgomery",
    lastName: "Burns",
  },
});
```

The generated code also contains functions for serializing and deserializing your data using various formats.  You can serialize your data to and from bytes:

```typescript
const bytes = user.toBinary()
// ...
const deserialized = User.fromBinary(bytes);    // deserialized is equal to the original user
```

You can also serialize and deserialize with JSON:

```typescript
const json = user.toJson();
// ...
const deserialized = User.fromJson(json);    // deserialized is equal to the original user
```

Each generated message can also be stringified using `JSON.stringify` and recreated with that JSON string:

```typescript
const str = JSON.stringify(user);
// ...
const deserialized = User.fromJsonString(str);    // deserialized is equal to the original user
```

## Packages

There are three main packages comprising the **Protobuf-ES** library:

[**@bufbuild/protobuf**](https://www.npmjs.com/package/@bufbuild/protobuf)  ([Docs](packages/protobuf))

Provides the runtime library, containing base types, generated well-known types, and core functionality.

[**@bufbuild/protoc-gen-es**](https://www.npmjs.com/package/@bufbuild/protoc-gen-es)  ([Docs](packages/protoc-gen-es))

Provides the code generator plugin `protoc-gen-es` .  The code it generates depends on `@bufbuild/protobuf`.
  
[**@bufbuild/protoplugin**](https://www.npmjs.com/package/@bufbuild/protoplugin)  ([Docs](packages/protoplugin))

Helps to create your own code generator plugin.  The code it generates depends on `@bufbuild/protobuf`.


## Examples

To see a real-world application of **Protobuf-ES**, take a look at [Connect-Web](https://github.com/bufbuild/connect-web), which is foundationally based on **Protobuf-ES**.  Additionally, check out the [Connect-Web](https://connect.build/docs/web/getting-started) documentation if you're interested in generating RPC artifacts from your Protobuf files.

For more information on Buf, visit the official [Buf documentation](https://docs.buf.build/introduction).

## Migrating from other implementations

If you are currently using another implementation and would like to migrate to **Protobuf-ES** to see what it's all about, check out our [migration guides](docs/migrating.md) for details.


## TypeScript

The minimum version of TypeScript supported by **Protobuf-ES** is **4.1.2**.


## Copyright

The [code to encode and decode varint](packages/protobuf/src/google/varint.ts) is Copyright 2008 Google Inc., licensed 
under BSD-3-Clause.  
All other files are licensed under Apache-2.0, see [LICENSE](LICENSE).
