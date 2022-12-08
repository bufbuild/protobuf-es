Protobuf-ES
===========

A complete implementation of [Protocol Buffers](https://developers.google.com/protocol-buffers) in TypeScript,
suitable for web browsers and Node.js.

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

To learn more, have a look at a complete [code example](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example), 
the documentation for the [generated code](https://github.com/bufbuild/protobuf-es/blob/main/docs/generated_code.md), 
and the documentation for the [runtime API](https://github.com/bufbuild/protobuf-es/blob/main/docs/runtime_api.md).


### TypeScript

The generated code is compatible with TypeScript **v4.1.2** or later, with the default compiler settings.


### Packages

- [@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es):
  Provides the code generator plugin `protoc-gen-es` ([source](packages/protoc-gen-es)).   
  The code it generates depends on `@bufbuild/protobuf`.
- [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf):
  The runtime library for the code generator plugin `protoc-gen-es` ([source](packages/protobuf)).
- [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin):
  Helps to create your own code generator plugin ([source](packages/protoplugin)).

### FAQ

For a list of frequently asked questions, see our [FAQ documentation](docs/faq.md).


### Copyright

The [code to encode and decode varint](packages/protobuf/src/google/varint.ts) is Copyright 2008 Google Inc., licensed 
under BSD-3-Clause.  
All other files are licensed under Apache-2.0, see [LICENSE](LICENSE).
