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
// Note:  All fields in the constructor object are optional.
let user = new User({
  firstName: "Homer",
  lastName: "Simpson",
  active: true,
  locations: ["Springfield"],
  projects: { SPP: "Springfield Power Plant" },
  manager: {
    // You can simply pass an initializer object for this nested message field
    firstName: "Montgomery",
    lastName: "Burns",
  },
});

const bytes = user.toBinary();
user = User.fromBinary(bytes);
user = User.fromJsonString('{"firstName": "Homer", "lastName": "Simpson"}');
```

The benefits can extend to any application that interacts with yours as well.  This is because the Protobuf file above can be used to generate types in many languages.  The added bonus is that no one has to write any boilerplate code to make this happen.  [Code generators](https://www.npmjs.com/package/@bufbuild/protoc-gen-es) handle all of this for you.

Protocol Buffers also allow you to serialize this structured data.  So, your application running in the browser can send a `User` object to a backend running an entirely different language, but using the exact same definition.  Using an RPC framework like [Connect-Web](https://github.com/bufbuild/connect-web), your data is serialized into bytes on the wire and then deserialized at its destination using the defined schema.

## Quickstart

To get started generating code right away, first make sure you have [Buf](https://docs.buf.build/installation) installed.  If desired, you can also use `protoc`.  For full instructions on generating code, visit the [docs](https://github.com/bufbuild/protobuf-es/blob/main/docs/generated_code.md) for the `protoc-gen-es` plugin.

1. Install the code generator and the runtime library:

   ```bash
   npm install @bufbuild/protobuf @bufbuild/protoc-gen-es
   ```

2. Create a `buf.gen.yaml` file that looks like this:

   ```yaml
   # Learn more: https://docs.buf.build/configuration/v1/buf-gen-yaml
   version: v1
   plugins:
      - name: es
        path: ./node_modules/.bin/protoc-gen-es
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
   buf generate proto
   ```

You should now see a generated file at `src/gen/example_pb.ts` that contains a class named `User`.  From here, you can begin to work with your schema.

## Packages

- [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf):
  Provides the runtime library, containing base types, generated well-known types, and core functionality. ([source code](packages/protobuf)).
- [@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es):
  Provides the code generator plugin `protoc-gen-es`.  The code it generates depends on `@bufbuild/protobuf`. ([source code](packages/protoc-gen-es)).
- [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin):
  Helps to create your own code generator plugin.  The code it generates depends on `@bufbuild/protobuf`. ([source code](packages/protoplugin)).


## Ecosystem

* [connect-web](https://github.com/bufbuild/connect-web):
  TypeScript clients for web browsers
* [connect-web-integration](https://github.com/bufbuild/connect-web-integration):
  Example projects using Connect-Web with various JS frameworks and tooling
* [connect-go](https://github.com/bufbuild/connect-go):
  Go implementation of gRPC, gRPC-Web, and Connect
* [connect-demo](https://github.com/bufbuild/connect-demo):
  Demonstration service powering demo.connect.build
* [Buf Studio](https://studio.buf.build/): Web UI for ad-hoc RPCs
* [connect-crosstest](https://github.com/bufbuild/connect-crosstest):
  gRPC-Web and Connect interoperability tests
  

## Migrating from other implementations

If you are currently using another implementation and would like to migrate to **Protobuf-ES** to see what it's all about, check out our [migration guides](docs/migrating.md) for details.


## TypeScript

The generated code is compatible with TypeScript **v4.1.2** or later, with the default compiler settings.


## FAQ

For a list of frequently asked questions, see our [FAQ documentation](docs/faq.md).

## Copyright

The [code to encode and decode varint](packages/protobuf/src/google/varint.ts) is Copyright 2008 Google Inc., licensed 
under BSD-3-Clause.  
All other files are licensed under Apache-2.0, see [LICENSE](LICENSE).
