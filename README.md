![The Buf logo](./.github/buf-logo.svg)

# Protobuf-ES

[![License](https://img.shields.io/github/license/bufbuild/protobuf-es?color=blue)](./LICENSE) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protobuf/latest?color=green&label=%40bufbuild%2Fprotobuf)](https://www.npmjs.com/package/@bufbuild/protobuf) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoplugin/latest?color=green&label=%40bufbuild%2Fprotoplugin)](https://www.npmjs.com/package/@bufbuild/protoplugin) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoc-gen-es/latest?color=green&label=%40bufbuild%2Fprotoc-gen-es)](https://www.npmjs.com/package/@bufbuild/protoc-gen-es) 

A complete implementation of [Protocol Buffers](https://developers.google.com/protocol-buffers) in TypeScript,
suitable for web browsers and Node.js, created by [Buf](https://buf.build).

## What are Protocol Buffers?

In a nutshell, Protocol Buffers have two main functions:

- They are a language for writing schemas for your data.
- They define a binary format for serializing your data.

These two independent traits functions work together to allow your project and everyone who interacts with it to define messages, fields, and service APIs in the exact same way.   In a practical sense as it relates to **Protobuf-ES**, this means no more disparate JSON types all over the place.  Instead, you define a common schema in a Protobuf file, such as:

```proto
message User {
  string first_name = 1;
  string last_name = 2;
  bool active = 3;
  User manager = 4;
  repeated string locations = 5;
  map<string, string> projects = 6;
}
```

And it is compiled to an ECMAScript class that can be used like this:

```typescript
let user = new User({
  firstName: "Homer",
  lastName: "Simpson",
  active: true,
  locations: ["Springfield"],
  projects: { SPP: "Springfield Power Plant" },
  manager: {
    firstName: "Montgomery",
    lastName: "Burns",
  },
});

const bytes = user.toBinary();
user = User.fromBinary(bytes);
user = User.fromJsonString('{"firstName": "Homer", "lastName": "Simpson"}');
```

The benefits can extend to any application that interacts with yours as well.  This is because the Protobuf file above can be used to generate types in many languages.  The added bonus is that no one has to write any boilerplate code to make this happen.  [Code generators](https://www.npmjs.com/package/@bufbuild/protoc-gen-es) handle all of this for you.

Protocol Buffers also allow you to serialize this structured data.  So, your application running in the browser can send a `User` object to a backend running an entirely different language, but using the exact same definition.  Using an RPC framework like [Connect-ES](https://github.com/bufbuild/connect-es), your data is serialized into bytes on the wire and then deserialized at its destination using the defined schema.

## Quickstart

1. Install the code generator, the runtime library, and the [Buf CLI](https://docs.buf.build/build/usage):

   ```bash
   npm install @bufbuild/protobuf @bufbuild/protoc-gen-es @bufbuild/buf
   ```

2. Create a `buf.gen.yaml` file that looks like this:

   ```yaml
   # Learn more: https://docs.buf.build/configuration/v1/buf-gen-yaml
   version: v1
   plugins:
      - plugin: es
        opt: target=ts
        out: src/gen
   ```

3. Download the [example.proto](https://github.com/bufbuild/protobuf-es/blob/main/packages/protobuf-test/extra/example.proto) into a `/proto` directory:

   ```bash
   mkdir proto
   curl https://raw.githubusercontent.com/bufbuild/protobuf-es/main/packages/protobuf-test/extra/example.proto > proto/example.proto
   ```

4. Generate your code:

   ```bash
   npx buf generate proto
   ```

   ** Note you can also use `protoc` if desired.

You should now see a generated file at `src/gen/example_pb.ts` that contains a class named `User`.  From here, you can begin to work with your schema.

## Packages

- [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf):
  Provides the runtime library, containing base types, generated well-known types, and core functionality. ([source code](packages/protobuf)).
- [@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es):
  Provides the code generator plugin `protoc-gen-es`.  The code it generates depends on `@bufbuild/protobuf`. ([source code](packages/protoc-gen-es)).
- [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin):
  Helps to create your own code generator plugin.  The code it generates depends on `@bufbuild/protobuf`. ([source code](packages/protoplugin)).

## Documentation

* [Code example](packages/protobuf-example) - Example code that uses protocol buffers to manage an address book.
* [Generated Code](docs/generated_code.md) - How to generate, and what code precisely is generated for any given protobuf definition.
* [Runtime API](docs/runtime_api.md) - A detailed overview of the features provided by the library `@bufbuild/protobuf`.
* [FAQ](docs/faq.md) - Frequently asked Questions.
* [Migrating to Protobuf-ES](docs/migrating.md) - Shows the changes you'll need to switch your existing code base.
* [Writing Plugins](docs/writing_plugins.md) - An overview of the process of writing a plugin using `@bufbuild/protoplugin`.

## Ecosystem

* [connect-es](https://github.com/bufbuild/connect-es):
  Type-safe APIs with Protobuf and TypeScript.
* [connect-es-integration](https://github.com/bufbuild/connect-es-integration):
  Examples for using Connect with various TypeScript web frameworks and tooling
* [protobuf-conformance](https://github.com/bufbuild/protobuf-conformance):
  A repository running the Protobuf conformance tests against various libraries.
* [Buf Studio](https://studio.buf.build/): Web UI for ad-hoc RPCs


## TypeScript

The generated code is compatible with TypeScript **v4.1.2** or later, with the default compiler settings.


## Copyright

The [code to encode and decode varint](packages/protobuf/src/google/varint.ts) is Copyright 2008 Google Inc., licensed 
under BSD-3-Clause.  
All other files are licensed under Apache-2.0, see [LICENSE](LICENSE).
