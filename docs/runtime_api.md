Protobuf-ES: Runtime API
========================

The runtime library for the generated code is provided by the npm package 
[@bufbuild/protobuf][pkg-protobuf]. This is a detailed overview of the features 
provided by the library.

- [Message class](#message-class)
  - [Constructing messages](#constructing-messages)
  - [Default field values](#default-field-values)
  - [Accessing fields](#accessing-fields)
  - [Accessing oneof groups](#accessing-oneof-groups)
  - [Cloning messages](#cloning-messages)
  - [Comparing messages](#comparing-messages)
  - [Serializing messages](#serializing-messages)
- [Using enumerations](#using-enumerations)
- [Well-known types](#well-known-types)
- [Message types](#message-types)
- [64-bit-integral-types](#64-bit-integral-types)
- [Reflection](#reflection)
  - [Iterating over message fields](#iterating-over-message-fields)
  - [Registries](#registries)
- [Advanced TypeScript types](#advanced-typescript-types)


## Message class

All generated messages extends the base class [Message][src-message].
It provides a few helpful methods to compare, clone, and serialize, and a convenient constructor. 
All message classes also come with some static properties with metadata, and static convenience methods.

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

### Constructing messages

You can create an instance with the `new` keyword:

```typescript
const message = new Example();
```


For convenience, constructors accept an initializer object:

```typescript
new Example({
  foo: "hello",
  bar: true,
  baz: {  // you can simply pass an initializer object for this message field
    foo: "world",
  },
});
```

Note that all fields in the initializer object are optional, and if not
provided, the default value for the field is used.

### Default field values

Fields are automatically set to their default value if you create a message with 
the `new` keyword. You can see that in the TypeScript generated code, where fields
with a default value are class properties with a default value:

```typescript
/**
 * @generated from field: string foo = 1;
 */
foo = "";
```

Protobuf fields map to default values as follows:

| Protobuf field     | Class property default value                                         |
|--------------------|----------------------------------------------------------------------|
| bool               | `false`                                                              |
| string             | `""`                                                                 |
| other scalar types | see [scalar field default values](./generated_code.md#scalar-fields) |
| optional scalar    | `undefined`                                                          |
| message            | `undefined`                                                          |
| map                | `{}`                                                                 |
| repeated           | `[]`                                                                 |
| oneof              | `{ case: undefined }`                                                |


### Accessing fields

Fields translate to plain properties. You can set and get field values with simple property 
access:

```javascript
message.foo = "hello";
message.baz = new Example();

message.foo; // "hello" 
message.baz?.bar; // false 
```

You can also use a destructuring assignment:

````javascript
let {foo, bar} = message;
````


The same is true for `repeated` and `map` fields, but fields in a oneof group are 
grouped into an object property.


### Accessing oneof groups

With the following oneof group: 

```diff
message Example {
  string foo = 1;
  bool bar = 2;
  Example baz = 3;
+ oneof result {
+   int32 number = 4;
+   string error = 5;
+ }
}
```

A property named `result` (the name of the oneof group) is added to the message. 
It is an object with two properties:
- `case` - the name of the selected field
- `value` - the value of the selected field

This property is always defined on the message - similar how map or repeated 
fields are always defined. By default, it is `{case: undefined}`.

In our example, `result.case` can be either `"number"`, `"error"`, or `undefined`. 
If a field is selected, the property `result.value` contains the value of the 
selected field.

In TypeScript, these rules are actually enforced by the declaration:

```typescript
result:
  | { case: "number";  value: number }
  | { case: "error";   value: string }
  | { case: undefined; value?: undefined } = { case: undefined };
```

To select a field, simply replace the `result` object:

```typescript
message.result = {case: "number", value: 123};
message.result = {case: undefined};
```

To query a oneof group, you can use if-blocks:

```typescript
if (message.result.case === "number") {
  message.result.value; // a number
}
```

Or a switch statement:

```typescript
switch (message.result.case) {
  case "number":
    message.result.value; // a number
    break;
  case "error":
    message.result.value; // a string
    break;
}
```

This representation is particularly useful in TypeScript, because the compiler
narrows down the type. That means the if blocks and switch statements above tell
the compiler the type of the `value` property. Note that type narrowing requires
the TypeScript compiler option [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks).
This option is automatically enabled with the option `strict`, which is recommended.


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

But the result will be a [JSON value][src-json-value] – a primitive JavaScript that can 
be converted to a JSON string with the built-in function `JSON.stringify()`. For 
convenience, we also provide methods that include the stringify step:


```typescript
const json = example.toJsonString();
Example.fromJsonString(json);
```

Note that the JSON format is great for debugging, but the binary format is more resilient
to changes. For example, you can rename a field, and still parse binary data serialized
with the previous version. In general, the binary format is also more performant than
JSON.

Conformance with the binary and the JSON format is ensured by the
[conformance tests](../packages/protobuf-conformance). We do not implement the text format.



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

However, similar to MessageType, there is also [`EnumType`][src-enum-type].
It provides the fully qualified protobuf type name, as well as the original values and 
their names. Use  [`proto3.getEnumType()`][src-proto3-getEnumType] to retrieve the 
EnumType for a given enum.

Similar to messages, enums can also be created at run time, via [`proto3.makeEnum()`][src-proto3-makeEnum].


## Well-known types

Protocol buffers have a small standard library of well-known types. 
[@bufbuild/protobuf][pkg-protobuf] provides all of them as pre-compiled exports.

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

Some of the well-known types provide additional methods for convenience:


### Timestamp

````typescript
import { Timestamp } from "@bufbuild/protobuf";

// Create an instance from a built-in Date object
let ts = Timestamp.fromDate(new Date(1938, 0, 10));

// Create an instance with the current time
ts = Timestamp.now()

// Convert to a built-in Date object
ts.toDate();
````

### Any

```typescript
import { Any } from "@bufbuild/protobuf";
import { Timestamp } from "@bufbuild/protobuf";

// Pack a message:
let any = Any.pack(message);
any.typeUrl; // type.googleapis.com/docs.Example

// Check what an Any contains:
any.is(Example); // true
any.is(Timestamp); // false

// Unpack an Any by providing a blank instance:
message = new Example();
any.unpackTo(message); // true

let ts = new Timestamp();
any.unpackTo(ts); // false, you provided an instance of the wrong type

```


### Struct

`google.protobuf.Struct` can represent anything JSON can represent. But it is a bit
cumbersome to construct a `Struct`:

```typescript
let struct = new Struct({
  fields: {
    a: {
      kind: { case: "numberValue", value: 123 },
    },
    b: {
      kind: { case: "stringValue", value: "abc" },
    },
  },
});

struct.toJsonString(); // "{a: 123, b: \"abc\"}"
```

We recommend to use `fromJson()` to construct `Struct` literals:

```typescript
let struct = Struct.fromJson({
  a: 123,
  b: "abc",
});
```


## 64-bit integral types

We use the `bigint` primitive to represent 64-bit integral types, because JavaScript
`Number` cannot represent the full range of 64-bit numbers.

For the following field definitions:

```diff
message Example {
  string foo = 1;
  bool bar = 2;
  Example baz = 3;
+ uint64 ulong = 4;
+ int64 long = 5;
}
```

You can use `bigint` as expected:

```typescript
example.ulong = 123n;
example.long = -123n;

example.ulong + 1n; // 124n
example.long + 1n; // -122n
```

### `bigint` in unsupported environments

However, `bigint` may not be available in your environment yet. In that case, you can
still serialize and deserialize messages with 64-bit integral fields without losing
any data. But Protobuf-ES will convert those numbers into `string`. That means you
can always call `toString()` on a `bigint` field, and will always receive a string
representation that is suitable to display in a GUI, as a map key, or for similar
purposes.

In case you simply want to set a field value, for example from an HTML form input,
use the provided conversion utility [`protoInt64`][src-proto-int64]:

```typescript
import { protoInt64 } from "@bufbuild/protobuf";

let input: string | number | bigint = "123";

example.long  = protoInt64.parse(input);
example.ulong = protoInt64.uParse(input);
```

If you want to perform arithmetic on `bigint` fields, you will need to use a
third party library like [Long.js](https://www.npmjs.com/package/long).



## Message types

In the previous section we went through the methods every message class provides,
including static methods. But we actually generate a few more static properties
with metadata. The static shape of the generated class is a [`MessageType`][src-message-type],
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



## Reflection


### Registries

As you may know, a `.proto` file can also be represented by a [FileDescriptor](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto).
Protobuf compilers such as [`buf`](https://github.com/bufbuild/buf) or `protoc` actually compile
`.proto` files to a set of descriptors, and code generator plugins receive them when code is generated.

```sh
# generate an image (compatible to a `google.protobuf.FileDescriptorSet`)
buf generate --output image.bin
```

Using [`createRegistryFromDescriptors()`][src-create-registry-from-desc], you
can create types at run time from a set of descriptors created by a protocol buffers
compiler:

```typescript
const registry = createRegistryFromDescriptors(
  readFileSync("image.bin")
);
const Example = registry.findMessage("doc.Example");
```

### Iterating over message fields

The following example shows how to iterate over the fields of an arbitrary message.

```typescript
function walkFields(message: AnyMessage) {
  for (const fieldInfo of message.getType().fields.byNumber()) {
    const value = message[fieldInfo.localName];
    console.log(`field ${fieldInfo.localName}: ${value}`);
  }
}

walkFields(message);
// field foo: abc
// field bar: true
// field baz: undefined
```

Note that the example does not handle oneof groups. Please consult the sources code 
for examples how to include them. The JSON and binary serialization mechanisms use this 
technique. 


## Advanced TypeScript types

### PartialMessage

The object initializers accepted by message constructors are defined by the type 
[`PartialMessage<T>`][src-partial-message]. It is similar to the TypeScript built-in type 
`Partial`, but works recursively. 

This type is well suited in case you know the type of a message, but want to allow 
an instance to be given in the most flexible way. If you want to offer an API that lets 
users provide message data, consider accepting `PartialMessage<T>`, so that users can 
simply give an object literal with only the non-default values they want. Note that any
`T` is assignable to `PartialMessage<T>`.

For example, let's say you have a protobuf `message Foo`, and you want to provide a 
function to your users that processes this message:

```ts
export function sendExample(example: PartialMessage<Example>) {
  // convert partial messages into their full representation if necessary
  const e = example instanceof Example ? example : new Example(example);
  // process further...
  const bytes = e.toBinary();
}
```

All three examples below are valid input for your function:

```ts
sendExample({foo: "abc"});

const e = new Example();
e.foo = "abc";
sendExample(e);

sendExample(new Example());
```


### PlainMessage

[`PlainMessage<T>`][src-plain-message] represents _just_ the fields of a message, without 
their methods. 

In contrast to `PartialMessage`, `PlainMessage` requires all properties to be
provided. And since it is not recursive, message fields must provide the exact type.
For example:

```typescript
let plain: PlainMessage<Example> = {
  foo: "abc",
  bar: false,
  baz: undefined,
};
```

`PlainMessage` is an exact representation of a message cloned with the spread operator:

```typescript
let plain: PlainMessage<Example> = {...example};
```

As such, `PlainMessage<T>` can be a great fit to use in throughout your business logic,
if that business logic is never concerned with serialization, and does not need 
`instanceof`.

Note that any `T` (assuming `T` extends `Message`) is assignable to a variable of type `PlainMessage<T>`.

### AnyMessage

If you want to handle messages of unknown type, the type [`AnyMessage`][src-any-message] 
provides a convenient index signature to access fields:

```typescript
const anyMessage: AnyMessage = example;
example["foo"];
```

Note that any message is assignable to `AnyMessage`.


[src-proto-int64]: https://github.com/bufbuild/protobuf-es/blob/5609f7aab3dcfbb468871774c70d2343ac0f265e/packages/protobuf/src/proto-int64.ts#L65
[src-message]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/message.ts#L40
[src-message-type]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/message-type.ts#L27
[src-enum-type]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/enum.ts#L15
[src-json-value]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/json-format.ts#L139-L154
[src-proto3-getEnumType]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/private/proto-runtime.ts#L81-L86
[src-proto3-makeEnum]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/private/proto-runtime.ts#L58
[src-create-registry-from-desc]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/create-registry-from-desc.ts#L81
[src-partial-message]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/message.ts#L143
[src-plain-message]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/message.ts#L137
[src-any-message]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/message.ts#L25
[pkg-protobuf]: https://www.npmjs.com/package/@bufbuild/protobuf
