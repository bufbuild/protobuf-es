# @bufbuild/protobuf

This package provides the runtime library for the code generator plugin
[protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es).

## Protocol Buffers for ECMAScript

A complete implementation of [Protocol Buffers](https://developers.google.com/protocol-buffers)
in TypeScript, suitable for web browsers and Node.js.  
Learn more at [github.com/bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es).


It is a complete implementation of [Protocol Buffers](https://developers.google.com/protocol-buffers) 
in TypeScript, suitable for web browsers and Node.js.

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

Learn more at [github.com/bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es).
