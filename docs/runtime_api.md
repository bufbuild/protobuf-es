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
- [Size-delimited messages](#size-delimited-messages)
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

message User {
  string first_name = 1;
  string last_name = 2;
  bool active = 3;
  User manager = 4;
  repeated string locations = 5;
  map<string, string> projects = 6;
}
```

### Constructing messages

You can create an instance with the `new` keyword:

```typescript
const user = new User();
```


For convenience, constructors accept an initializer object. All fields in the 
initializer object are optional, and if not provided, the default value for the 
field is used.

```typescript
const user = new User({
  firstName: "Homer",
  active: true,
  manager: {  // you can simply pass an initializer object for this message field
    lastName: "Burns",
  },
});
```

The initializer object accepted by all message constructors is of type 
[`PartialMessage<T>`](src-partial-message) where `T` is your message type. So 
in the above example, the initializer object is of type `PartialMessage<User>`. 
`PartialMessage` is similar to the TypeScript built-in type `Partial`, but works 
recursively. For more details, see the below section on [Advanced TypeScript types](#advanced-typescript-types).

If you need to define the initializer object independent of the constructor,
then be sure to use a type assertion, otherwise you may see unexpected compile
errors with `oneof` fields. In TypeScript 4.9 and above, it is recommended to 
use `satisfies`.

```typescript
const obj = {
  firstName: "Homer",
  active: true,
  manager: {  
    lastName: "Burns",
  },
} satisfies PartialMessage<User>;

const user = new User(obj);
```

Otherwise, use the `as` keyword:

```typescript
const obj = {
  firstName: "Homer",
  active: true,
  manager: {  
    lastName: "Burns",
  },
} as PartialMessage<User>;

const user = new User(obj);
```

### Default field values

Fields are automatically set to their default value if you create a message with 
the `new` keyword. You can see that in the TypeScript generated code, where fields
with a default value are class properties with a default value:

```typescript
/**
 * @generated from field: string firstName = 1;
 */
firstName = "";
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
user.firstName = "Homer";
user.manager = new User();

user.firstName; // "Homer" 
user.manager?.active; // false 
```

You can also use a destructuring assignment:

````javascript
let {firstName, lastName} = user;
````


The same is true for `repeated` and `map` fields, but fields in a oneof group are 
grouped into an object property.


### Accessing oneof groups

With the following oneof group: 

```diff
message User {
  string first_name = 1;
  string last_name = 2;
  bool active = 3;
  User manager = 4;
  repeated string locations = 5;
  map<string, string> projects = 6;
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
user.result = {case: "number", value: 123};
user.result = {case: undefined};
```

To query a oneof group, you can use if-blocks:

```typescript
if (user.result.case === "number") {
  user.result.value; // a number
}
```

Or a switch statement:

```typescript
switch (user.result.case) {
  case "number":
    user.result.value; // a number
    break;
  case "error":
    user.result.value; // a string
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
user.clone();
```

### Comparing messages

We provide instance methods as well as static methods to test if two messages of the same type
are equal:

```typescript
user.equals(user); // true
user.equals(null); // false
User.equals(user, user); // true 
User.equals(user, null); // false 
```

```typescript
User.typeName; // docs.User
```

### Serializing messages

Serializing to the binary format is very straight-forward:

```typescript
const bytes: Uint8Array = user.toBinary();
User.fromBinary(bytes);
```

Serializing to the base64 format is one step further, using the exposed methods from `protoBase64`:

```typescript
import { protoBase64 } from '@bufbuild/protobuf';

const bytes: Uint8Array = user.toBinary();
const base64: string = protoBase64.enc(bytes)
User.fromBinary(protoBase64.dec(base64));
```

Serializing to the JSON format is equally simple:

```typescript
const json = user.toJson();
User.fromJson(json);
```

But the result will be a [JSON value][src-json-value] – a primitive JavaScript that can 
be converted to a JSON string with the built-in function `JSON.stringify()`. For 
convenience, we also provide methods that include the stringify step:


```typescript
const json = user.toJsonString();
User.fromJsonString(json);
```

Note that the JSON format is great for debugging, but the binary format is more resilient
to changes. For example, you can rename a field, and still parse binary data serialized
with the previous version. In general, the binary format is also more performant than
JSON.

Conformance with the binary and the JSON format is ensured by the
[conformance tests](../packages/protobuf-conformance). We do not implement the text format.

For serializing multiple messages of the same type, also see [size-delimited messages](#size-delimited-messages).



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
let any = Any.pack(user);
any.typeUrl; // type.googleapis.com/docs.User

// Check what an Any contains:
any.is(User); // true
any.is(Timestamp); // false

// Unpack an Any by providing a blank instance:
let user = new User();
any.unpackTo(user); // true

// Alternative: Unpack an Any using a type registry:
const typeRegistry = createRegistry(User, Timestamp);
any.unpack(typeRegistry); // Message of type User

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
message User {
  string first_name = 1;
  string last_name = 2;
  bool active = 3;
  User manager = 4;
  repeated string locations = 5;
  map<string, string> projects = 6;
+ uint64 ulong = 4;
+ int64 long = 5;
}
```

You can use `bigint` as expected:

```typescript
user.ulong = 123n;
user.long = -123n;

user.ulong + 1n; // 124n
user.long + 1n; // -122n
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

user.long  = protoInt64.parse(input);
user.ulong = protoInt64.uParse(input);
```

If you want to perform arithmetic on `bigint` fields, you will need to use a
third party library like [Long.js](https://www.npmjs.com/package/long).


## Size-delimited messages

Protobuf-ES supports the size-delimited format for messages. It lets you serialize
multiple messages to a stream, and parse multiple messages from a stream.

A size-delimited message is a varint size in bytes, followed by exactly
that many bytes of a message serialized with the binary format. This implementation 
is compatible with the counterparts in [C++](https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/util/delimited_message_util.h),
[Java](https://developers.google.com/protocol-buffers/docs/reference/java/com/google/protobuf/AbstractParser.html#parseDelimitedFrom-java.io.InputStream-), 
[Go](https://github.com/golang/protobuf/issues/1382), and others.


You create such a message with `protoDelimited.enc`:

```typescript
import { protoDelimited } from "@bufbuild/protobuf";

const bytes = protoDelimited.enc(new User({ firstName: "John" }));
const user = protoDelimited.dec(User, bytes);
```

With `protoDelimited.decStream`, you can parse messages from a stream. The 
method expects an `AsyncIterable<Uint8Array>` as a stream input, so it works
with Node.js streams out of the box, and can be easily adapted to other 
stream APIs:

```typescript
import { protoDelimited } from "@bufbuild/protobuf";
import { createReadStream, createWriteStream } from "fs";
import { tmpdir } from "os";
import { join } from "path";

// Let's write a couple of messages to a file
const ws = createWriteStream("protoDelimited.bin", {encoding: "binary"});
ws.write(protoDelimited.enc(new User({ firstName: "John" })));
ws.write(protoDelimited.enc(new User({ firstName: "Max" })));
ws.write(protoDelimited.enc(new User({ firstName: "Max" })));
ws.end();
ws.close();

// Now we can parse them from the stream
const readStream = createReadStream("protoDelimited.bin");
for await (const user of protoDelimited.decStream(User, readStream)) {
  console.log(user);
}
```




## Message types

In the previous section we went through the methods every message class provides,
including static methods. But we actually generate a few more static properties
with metadata. The static shape of the generated class is a [`MessageType`][src-message-type],
a representation of the _type_ of a message.

Such a type can actually be created at run time. We can take a peek at the [generated
code](../packages/protobuf-test/src/gen/ts/extra/example_pb.ts) to get some insights:

```typescript
class User extends Message<User> {
  //...
  static readonly runtime = proto3;
  static readonly typeName = "docs.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "first_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "last_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "active", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "manager", kind: "message", T: User },
    { no: 5, name: "locations", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 6, name: "projects", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
  ]);
```

We can observe three properties here:
1. `runtime` – will be either `proto2` or `proto3`, depending on the syntax of the source file.
2. `typeName` – the fully qualified name of the message, constructed from the package name, a dot, and the original name of the message.
3. `fields` – all fields of the message are listed here, together with their field number, name and type.

This is actually all the information we need to re-create this message type at run time:

```typescript
const User = proto3.makeMessageType(
  "docs.User",
  () => [
    { no: 1, name: "first_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "last_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "active", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "manager", kind: "message", T: User },
    { no: 5, name: "locations", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 6, name: "projects", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
  ],
);
```

The resulting `User` is completely equivalent to the generated TypeScript class. In fact,
this exact piece of code is generated with the plugin option `target=js`, because if saves us
quite a bit of code size.



## Reflection


### Registries

**Protobuf-ES** does not provide a global registry of types because it can lead to runtime errors and also hampers tree-shaking.  However, it is possible to create your own registry using [`createRegistry()`](https://github.com/bufbuild/protobuf-es/blob/31ab04b1109520096a57f3c9b696c5d78b7b6caf/packages/protobuf/src/create-registry.ts).  For example:

```typescript
import { createRegistry } from "@bufbuild/protobuf";
import { MessageA, MessageB } from "./generated"

const registry = createRegistry(
  MessageA, 
  MessageB,
);
```

In addition, you can also create a registry without any generated code.  As you may know, a `.proto` file can also be represented by a [FileDescriptor](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto).
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
const User = registry.findMessage("doc.User");
```

### Descriptor Interfaces

**Protobuf-ES** uses its own interfaces that mostly correspond to the FileDescriptor objects representing the various elements of Protobuf grammar (messages, enums, services, methods, etc.). Each of the framework interfaces is prefixed with `Desc`, i.e. `DescMessage`, `DescEnum`, `DescService`, `DescMethod`.

The hierarchy starts with `DescFile`, which represents the contents of a Protobuf file.  This object then contains all the nested `Desc` types corresponding to the above.  For example:

```
-- DescFile
   |--- DescEnum
   |--- DescMessage
      |--- DescField
      |--- DescOneof
   |--- DescService
      |--- DescMethod
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

walkFields(user);
// field firstName: Homer
// field lastName: Simpson
// field active: true
// field manager: undefined
// field locations: SPRINGFIELD
// field projects: {"SPP":"Springfield Power Plant"}
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

For example, let's say you have a protobuf `message User`, and you want to provide a 
function to your users that processes this message:

```ts
export function sendUser(user: PartialMessage<User>) {
  // convert partial messages into their full representation if necessary
  const u = user instanceof User ? user : new User(user);
  // process further...
  const bytes = u.toBinary();
}
```

All three examples below are valid input for your function:

```ts
sendUser({firstName: "Homer"});

const u = new User();
u.firstName = "Homer";
sendUser(u);

sendUser(new User());
```


### PlainMessage

[`PlainMessage<T>`][src-plain-message] represents _just_ the fields of a message, without 
their methods. 

In contrast to `PartialMessage`, `PlainMessage` requires all properties to be
provided. For example:

```typescript
let plain: PlainMessage<User> = {
  firstName: "Homer",
  lastName: "Simpson",
  active: true,
  manager: undefined,
  locations: [],
  projects: {}
};
```

As such, `PlainMessage<T>` can be a great fit to use throughout your business logic,
if that business logic is never concerned with serialization, and does not need 
`instanceof`.

Note that any `T` (assuming `T` extends `Message`) is assignable to a variable of type `PlainMessage<T>`.


### AnyMessage

If you want to handle messages of unknown type, the type [`AnyMessage`][src-any-message] 
provides a convenient index signature to access fields:

```typescript
const anyMessage: AnyMessage = user;
user["firstName"];
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
