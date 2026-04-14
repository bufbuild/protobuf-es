---
title: Introduction
---

Protobuf-ES is a fully conformant implementation of Protocol Buffers for JavaScript and TypeScript. It works in browsers, Node.js, Deno, and Bun, generates plain TypeScript that looks like normal application code, and supports proto2, proto3, and Editions 2024.

If you are already familiar with Protocol Buffers, this site shows how to generate code, work with messages, use reflection, and build your own plugins. If you are new to Protobuf, start with [Getting started](/getting-started/).

## Packages

Protobuf-ES consists of three npm packages:

- [`@bufbuild/protobuf`](https://www.npmjs.com/package/@bufbuild/protobuf): The runtime library with message APIs, JSON, reflection, registries, extensions, and well-known types.
- [`@bufbuild/protoc-gen-es`](https://www.npmjs.com/package/@bufbuild/protoc-gen-es): The standard Protobuf plugin that generates JavaScript and TypeScript.
- [`@bufbuild/protoplugin`](https://www.npmjs.com/package/@bufbuild/protoplugin): A framework for writing your own Protobuf plugins in TypeScript.

## Why teams use Protobuf-ES

- It passes the public [protobuf-conformance](https://github.com/bufbuild/protobuf-conformance) suite with `0` required failures.
- It uses a standard plugin flow with both the [Buf CLI](https://buf.build/docs/cli/) and `protoc`.
- It generates ECMAScript modules by default and produces small bundles.
- It models messages as plain objects with schemas instead of generated classes with getter and setter APIs.
- It includes reflection, registries, custom options, and a plugin framework in the same ecosystem.

## Where to go next

- [Getting started](/getting-started/): Generate your first files with `buf generate`.
- [Plugin options](/plugin-options/): Control code generation for TypeScript, imports, JSON types, and more.
- [Working with messages](/working-with-messages/): Create, inspect, compare, and clone messages.
- [Serialization](/serialization/): Use binary, JSON, unknown fields, Base64, and size-delimited streams.
- [Reflection](/reflection/): Walk schemas, use registries, inspect custom options, and manipulate data dynamically.
- [Writing plugins](/writing-plugins/): Build custom code generators on top of `@bufbuild/protoplugin`.

## Protocol Buffers in brief

Protocol Buffers, or Protobuf, is an interface definition language and binary serialization format. Schemas are defined in `.proto` files and used to generate code in many languages.

```protobuf
syntax = "proto3";
package example;

message User {
  string first_name = 1;
  string last_name = 2;
  bool active = 3;
  User manager = 4;
  repeated string locations = 5;
  map<string, string> projects = 6;
}
```

To use a schema like this in JavaScript or TypeScript, generate code with `@bufbuild/protoc-gen-es`, then work with the generated types and schema exports in your application.
