Protobuf-ES: Runtime API
========================

The runtime library for the generated code is provided by the npm package 
[@bufbuild/protobuf](../packages/protobuf). This is a detailed overview of the features 
provided by the library.

- [Message class](#message-class)
  - [Constructing messages and accessing fields](#constructing-messages-and-accessing-fields)
  - [Cloning messages](#cloning-messages)
  - [Comparing messages](#comparing-messages)
  - [Serializing messages](#serializing-messages)
- [Message types](#message-types)
- [Using enumerations](#using-enumerations)
- [Well-known types](#well-known-types)
- [DescriptorRegistry](#descriptorregistry)

## Message class

All generated messages extends the base class [Message](../packages/protobuf/src/message.ts#L40).
It provides a few methods to every message, to compare, clone, and serialize, as well as a
convenient constructor. All message classes also come with some static properties with
metadata, and static convenience methods.

For the following examples, we will use the following message definition [example.proto](../packages/protobuf-test/extra/example.proto):

```protobuf
syntax="proto3";
package docs;

message Example {
  string foo = 1;
  bool bar = 2;
  Example baz = 3;
}
```

### Constructing messages and accessing fields

You can create an instance with the `new` keyword:

```typescript
const message = new Example();
```

and set field values with simple property access:

```typescript
message.foo = "hello";
message.bar = true;
```

As a convenient alternative, constructors also take object literals:

```typescript
new Example({
  foo: "hello",
  bar: true,
  baz: {
    foo: "world",
  },
});
```

The accepted input is defined by the type [`PartialMessage<T>`](../packages/protobuf/src/message.ts#L145-L153).
It is similar to the TypeScript built-in type `Partial`, but works recursively. That means
you can create a shallow copy of a message with the help of the object spread operator:

```typescript
const shallowCopy = new Example({...example});
```

Note that the spread operator will dispose of all class methods. The type [`PlainMessage<T>`](../packages/protobuf/src/message.ts#L136-L140)
can be used in TypeScript to represent the result:

```typescript
const plainMessage: PlainMessage<Example> = {...example};
```

If you want to handle messages of unknown type, the type `AnyMessage` provides a convenient
index signature to access fields:

```typescript
const anyMessage: AnyMessage = example;
example["foo"];
```

### Cloning messages

While a shallow copy of a message can be created by using the spread operator with the
message constructor, it is also possible to create a _deep_ clone of a message:

```typescript
example.clone();
```

### Comparing messages

We provide instance methods as well as static methods to test if two messages of the same type
are equal:

```typescript
example.equals(example); // true
example.equals(null); // false
Example.equals(example, example); // true 
Example.equals(example, null); // false 
```

```typescript
Example.typeName; // docs.Example
```

### Serializing messages

Serializing to the binary format is very straight-forward:

```typescript
const bytes: Uint8Array = example.toBinary();
Example.fromBinary(bytes);
```

Serializing to the JSON format is equally simple:

```typescript
const json = example.toJson();
Example.fromJson(json);
```

But the result will be a [JSON value](../packages/protobuf/src/json-format.ts#L139-L154) –
a primitive JavaScript that can be converted to a JSON string with the built-in function
`JSON.stringify()`. For convenience, we also provide methods that include the stringify
step:


```typescript
const json = example.toJsonString();
Example.fromJsonString(json);
```

Note that the JSON format is great for debugging, but the binary format is more resilient
to changes. For example, you can rename a field, and still parse binary data serialized
with the previous version. In general, the binary format is also more performant than
JSON.

Conformance with the binary and the JSON format is ensured by the
[conformance tests](../packages/conformance-test). We do not implement the text format.


## Message types

In the previous section we went through the methods every message class provides,
including static methods. But we actually generate a few more static properties
with metadata. The static shape of the generated class is a [`MessageType`](../packages/protobuf/src/message-type.ts#L27),
a representation of the _type_ of a message.

Such a type can actually be created at run time. We can take a peek at the [generated
code](../packages/protobuf-test/src/gen/ts/extra/example_pb.ts) to get some insights:

```typescript
class Example extends Message<Example> {
  //...
  static readonly runtime = proto3;
  static readonly typeName = "docs.Example"; 
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "foo", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "bar", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "baz", kind: "message", T: Example },
  ]);
```

We can observe three properties here:
1. `runtime` – will be either `proto2` or `proto3`, depending on the syntax of the source file.
2. `typeName` – the fully qualified name of the message, constructed from the package name, a dot, and the original name of the message.
3. `fields` – all fields of the message are listed here, together with their field number, name and type.

This is actually all the information we need to re-create this message type at run time:

```typescript
const Example = proto3.makeMessageType(
  "docs.Example",
  () => [
    { no: 1, name: "foo", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "bar", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "baz", kind: "message", T: Example },
  ],
);
```

The resulting `Example` is completely equivalent to the generated TypeScript class. In fact,
this exact piece of code is generated with the plugin option `target=js`, because if saves us
quite a bit of code size.


## Using enumerations

For enumerations, we lean on TypeScript enums. A quick refresher about them:

- It is possible to look up the name for an enum value:
  ```typescript
  let val: MyEnum = MyEnum.FOO;
  let name = MyEnum[val]; // => "FOO"
  ``` 
- and to look up an enum value by name:
  ```typescript
  let val: MyEnum = MyEnum["FOO"];
  ``` 
- TypeScript enums are just plain objects in JavaScript.
- TypeScript enums support aliases - as does protobuf with the `allow_alias` option.

However, similar to MessageType, there is also [`EnumType`](../packages/protobuf/src/enum.ts#L15).
It provides the fully qualified protobuf type name, as well as the original values and their
names. Use  [`proto3.getEnumType()`](../packages/protobuf/src/private/proto-runtime.ts#L81-L86)
to retrieve the EnumType for a given enum.

Similar to messages, enums can also be created at run time, via
[`proto3.makeEnum()`](../packages/protobuf/src/private/proto-runtime.ts#L58).


## Well-known types

Protocol buffers have a small standard library of well-known types.
[@bufbuild/protobuf](../packages/protobuf) provides all of them as pre-compiled
exports.

<details><summary>Expand the list of Well-known types</summary>

| Name                                                                            | Type    | Source                                                                                                                                 |
|---------------------------------------------------------------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------|
| [`Any`](../packages/protobuf/src/google/protobuf/any_pb.ts)                      | message | [google/protobuf/any.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/any.proto)                       |
| [`Api`](../packages/protobuf/src/google/protobuf/api_pb.ts)                      | message | [google/protobuf/api.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/api.proto)                       |
| [`BoolValue`](../packages/protobuf/src/google/protobuf/wrappers_pb.ts)           | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`BytesValue`](../packages/protobuf/src/google/protobuf/wrappers_pb.ts)          | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`DoubleValue`](../packages/protobuf/src/google/protobuf/wrappers_pb.ts)         | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`Duration`](../packages/protobuf/src/google/protobuf/duration_pb.ts)            | message | [google/protobuf/duration.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/duration.proto)             |
| [`Empty`](../packages/protobuf/src/google/protobuf/empty_pb.ts)                  | message | [google/protobuf/empty.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/empty.proto)                   |
| [`Enum`](../packages/protobuf/src/google/protobuf/type_pb.ts)                    | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`EnumValue`](../packages/protobuf/src/google/protobuf/type_pb.ts)               | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`Field`](../packages/protobuf/src/google/protobuf/type_pb.ts)                   | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`Field_Cardinality`](../packages/protobuf/src/google/protobuf/type_pb.ts)       | enum    | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`Field_Kind`](../packages/protobuf/src/google/protobuf/type_pb.ts)              | enum    | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`FieldMask`](../packages/protobuf/src/google/protobuf/field_mask_pb.ts)         | message | [google/protobuf/field_mask.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/field_mask.proto)         |
| [`FloatValue`](../packages/protobuf/src/google/protobuf/wrappers_pb.ts)          | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`Int32Value`](../packages/protobuf/src/google/protobuf/wrappers_pb.ts)          | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`Int64Value`](../packages/protobuf/src/google/protobuf/wrappers_pb.ts)          | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`ListValue`](../packages/protobuf/src/google/protobuf/struct_pb.ts)             | message | [google/protobuf/struct.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/struct.proto)                 |
| [`Method`](../packages/protobuf/src/google/protobuf/type_pb.ts)                  | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`Mixin`](../packages/protobuf/src/google/protobuf/type_pb.ts)                   | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`NullValue`](../packages/protobuf/src/google/protobuf/struct_pb.ts)             | enum    | [google/protobuf/struct.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/struct.proto)                 |
| [`Option`](../packages/protobuf/src/google/protobuf/type_pb.ts)                  | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`SourceContext`](../packages/protobuf/src/google/protobuf/source_context_pb.ts) | message | [google/protobuf/source_context.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/source_context.proto) |
| [`StringValue`](../packages/protobuf/src/google/protobuf/wrappers_pb.ts)         | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`Struct`](../packages/protobuf/src/google/protobuf/struct_pb.ts)                | message | [google/protobuf/struct.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/struct.proto)                 |
| [`Syntax`](../packages/protobuf/src/google/protobuf/type_pb.ts)                  | enum    | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`Timestamp`](../packages/protobuf/src/google/protobuf/timestamp_pb.ts)          | message | [google/protobuf/timestamp.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/timestamp.proto)           |
| [`Type`](../packages/protobuf/src/google/protobuf/type_pb.ts)                    | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`UInt32Value`](../packages/protobuf/src/google/protobuf/wrappers_pb.ts)         | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`UInt64Value`](../packages/protobuf/src/google/protobuf/wrappers_pb.ts)         | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`Value`](../packages/protobuf/src/google/protobuf/struct_pb.ts)                 | message | [google/protobuf/struct.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/struct.proto)                 |
</details>


## DescriptorRegistry

As you may know, a `.proto` file can also be represented by a [FileDescriptor](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto).
Protobuf compilers such as [`buf`](https://github.com/bufbuild/buf) or `protoc` actually compile
`.proto` files to a set of descriptors, and code generator plugins receive them when code is generated.

Using a [`DescriptorRegistry`](../packages/protobuf/src/descriptor-registry.ts#L88), you
can create types at run time from a set of descriptors created by a protocol buffers
compiler:

```sh
# generate an image (compatible to a `google.protobuf.FileDescriptorSet`)
buf generate --output image.bin
```

```typescript
const fds = FileDescriptorSet.fromBinary(readFileSync("image.bin"));
const dr = new DescriptorRegistry();
for (const fd of fds.file) {
  dr.add(fd);
}
const Example = dr.findMessage("doc.Example");
```
