Protobuf-ES: Runtime API
========================

The runtime library for the generated code is provided by the npm package 
[@bufbuild/protobuf]. This is a detailed overview of the features 
provided by the library.

- [Message class](#message-class)
  - [Constructing messages](#constructing-messages)
  - [Default field values](#default-field-values)
  - [Accessing fields](#accessing-fields)
  - [Accessing oneof groups](#accessing-oneof-groups)
  - [Cloning messages](#cloning-messages)
  - [Comparing messages](#comparing-messages)
  - [Serializing messages](#serializing-messages)
- [Enumerations](#enumerations)
- [Extensions](#extensions)
  - [Extensions and JSON](#extensions-and-json)
  - [Extensions and custom options](#extensions-and-custom-options)
- [Well-known types](#well-known-types)
- [64-bit-integral-types](#64-bit-integral-types)
- [Reflection](#reflection)
  - [Descriptors](#descriptors)
  - [Reflection at runtime](#reflection-at-runtime)
  - [Message types](#message-types)
  - [Enum types](#enum-types)
  - [Registries](#registries)
  - [Dynamic messages](#dynamic-messages)
- [Advanced serialization](#advanced-serialization)
  - [Binary serialization options](#binary-serialization-options)
  - [JSON serialization options](#json-serialization-options)
  - [JSON.stringify](#jsonstringify)
  - [Unknown fields](#unknown-fields)
  - [Size-delimited message streams](#size-delimited-message-streams)
  - [Binary encoding](#binary-encoding)
  - [Base64 encoding](#base64-encoding)
- [Advanced TypeScript types](#advanced-typescript-types)


## Message class

All generated messages extend the base class [`Message`][src-Message].
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
[`PartialMessage<T>`](src-PartialMessage) where `T` is your message type. So 
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

If you are not using TypeScript 4.9 yet, use `as const` instead of `satisfies PartialMessage<User>`.

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

All messages provide methods for serializing and parsing data between the 
binary and JSON formats. Conformance is ensured by the [conformance test suite](../packages/protobuf-conformance).
Protobuf-ES does not implement the text format.

Here is an example that serializes a message to the binary format, and parses it 
again:

```typescript
const user = new User({
    firstName: "Homer",
    active: true,
});

const bytes: Uint8Array = user.toBinary();
User.fromBinary(bytes);
```

The `toBinary` and `fromBinary` methods each take an optional argument with 
[serialization options](#binary-serialization-options).

Serializing to JSON can be done in a similar fashion:

```typescript
import type { JsonValue } from "@bufbuild/protobuf";

const json: JsonValue = user.toJson();
User.fromJson(json);
```

[`JsonValue`][src-JsonValue] is a type that accurately represents any possible 
value in JSON. It can safely be serialized to a `string` with `JSON.stringify`.
For convenience, we also provide methods that include the stringify step:

```typescript
// Same as JSON.stringify(user.toJson());
const json: string = user.toJsonString();

// Same as User.fromJson(JSON.parse(json));
User.fromJsonString(json);
```

The JSON format comes with [several options](#json-serialization-options). Note 
that if you are using [`google.protobuf.Any`](#any) or [extensions](#extensions-and-json),
you have to provide a [registry](#registries) with the option `typeRegistry`. 

As a general guide to decide between the binary format and JSON:
The JSON format is great for debugging, but the binary format is more resilient
to changes. For example, you can rename a field, and still parse binary data serialized
with the previous version. In general, the binary format is also more performant than
JSON.

To learn about serialization options and other details related to serialization, 
see the section about [advanced serialization](#advanced-serialization).


## Enumerations

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

Note that in Protobuf-ES, all enums are ["open"][protobuf-dev-enum], meaning that old 
generated code can contain a value in an enum field that was added in a new version of 
the schema. With TypeScript v5 and later, enums are closed in the type system. With 
earlier versions of TypeScript, they are open.


## Extensions

Extensions can be set on a message using the `setExtension` function. Provided
we have the following message and extension:

```protobuf
syntax = "proto2";

message User {
  extensions 100 to 200;
}

extend User {
  optional uint32 age = 100;
}
```

You can set the extension field `age` like this:

```ts
import { setExtension } from "@bufbuild/protobuf";
import { User, age } from "./example_pb.js";

const user = new User();
setExtension(user, age, 77);
```

If the message already has a value for the `age` extension, the value is replaced.
You can remove an extension from a message with the function `clearExtension`.
To retrieve an extension value, use `getExtension`. To check whether an extension
is set, use `hasExtension`.

```ts
import { setExtension, getExtension, hasExtension, clearExtension } from "@bufbuild/protobuf";

setExtension(user, age, 77);
hasExtension(user, age); // true
getExtension(user, age); // 77
clearExtension(user, age);
hasExtension(user, age); // false
```

Note that `getExtension` never returns `undefined`. If the extension is not set,
`hasExtension` returns `false`, but `getExtension` returns the default value,
for example `0` for numeric types, `[]` for repeated fields, and an empty message
instance for message fields.

Extensions are stored as [unknown fields](#unknown-fields) on a message . If you 
retrieve an extension value, it is deserialized from the binary unknown field 
data. To mutate a value, make sure to store the new value with `setExtension` 
after mutating. For example, let's say we have the extension field 
`repeated string hobbies = 101`, and want to add values:

```ts
import { setExtension, getExtension, hasExtension, clearExtension } from "@bufbuild/protobuf";
import { hobbies } from "./example_pb.js";

const h = getExtension(user, hobbies);
h.push("Baking");
h.push("Pottery");

setExtension(user, hobbies, h);
```

### Extensions and JSON

If you parse or serialize a message to binary, extensions are automatically 
included, since they are stored as unknown fields. If you parse or serialize
a message to JSON, you have to provide a registry with the extensions you want 
to include, similar to the well-known type [Any](#any). 

In the following example, we use the [serialization option](#json-serialization-options)
`typeRegistry` to provide extensions:

```ts
import { createRegistry } from "@bufbuild/protobuf";
import { age, hobbies } from "./example_pb.js";

const typeRegistry = createRegistry(age, hobbies);

user.toJsonString({ typeRegistry }); // {"[age]":77,"[hobbies]":["Baking","Pottery"]}
```

### Extensions and custom options

Extension are commonly used for custom options, which allow to annotate elements 
in a Protobuf file with arbitrary information. 

Custom options are extensions to the `google.protobuf.*Options` messages defined 
in [google/protobuf/descriptor.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto).
When a Protobuf compiler parses a file, it converts all elements into descriptors, 
and sets custom option values on the option message field of the corresponding 
descriptor.

When a plugin is invoked to generate code, it receives the parsed descriptors, 
and the plugin can read the custom option value using the extension. To see how
this works in practice, take a look at the example in our [guide for writing plugins](./writing_plugins.md#using-custom-protobuf-options).

At this point in time, it is not possible to retrieve custom options from 
generated code, since Protobuf-ES does not embed the full descriptors in the 
generated code.


## Well-known types

Protocol buffers have a small standard library of well-known types. 
[@bufbuild/protobuf] provides all of them as pre-compiled exports.

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

Note that this list does not include [google/protobuf/descriptors.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptors.proto), 
but [@bufbuild/protobuf] exports all types defined in this file
as well.

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

`Any` stores the message as binary data. To parse or serialize `Any` to JSON, 
you need to provide a registry, similar to [extensions](#extensions-and-json).

```ts
import { Any, createRegistry, Timestamp } from "@bufbuild/protobuf";

// Pack a Timestamp message in an Any:
const timestamp = Timestamp.now();
const any = Any.pack(timestamp);

// Create a registry so that the Timestamp type can be looked up and converted
// to JSON during serialization:
const typeRegistry = createRegistry(Timestamp);
any.toJsonString({ typeRegistry });
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

With the built-in field option `jstype = JS_STRING`, 64-bit integral fields will
use `string` instead of `bigint`:

```protobuf
  int64 long = 5 [jstype = JS_STRING]; // will generate `long: number`
```

### `bigint` in unsupported environments

If `bigint` is not available in your environment, you can still serialize and 
deserialize messages with 64-bit integral fields without losing any data. But 
Protobuf-ES will convert those numbers into `string`. That means you can always 
call `toString()` on a `bigint` field, and will always receive a string 
representation that is suitable to display in a GUI, as a map key, or for similar
purposes.

In case you simply want to set a field value, for example from an HTML form input,
use the provided conversion utility [`protoInt64`][src-protoInt64]:

```typescript
import { protoInt64 } from "@bufbuild/protobuf";

let input: string | number | bigint = "123";

user.long  = protoInt64.parse(input);
user.ulong = protoInt64.uParse(input);
```

If you want to perform arithmetic on `bigint` fields, you will need to use a
third party library like [Long.js](https://www.npmjs.com/package/long).


## Reflection

One of the strong points of Protobuf are its reflection capabilities. In the 
following sections, we will take a look at the concepts, and how they are 
implemented in Protobuf-ES.

### Descriptors

Descriptors describe Protobuf definitions. Every Protobuf compiler parses source 
files into descriptors, which are protobuf messages themselves. 

For example, the command `buf build proto --output set.binpb` compiles all Protobuf
files in the directory `proto`, and writes the message `google.protobuf.FileDescriptorSet`
to the file `set.binpb`.

The message `google.protobuf.FileDescriptorSet` is defined in [google/protobuf/descriptor.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto),
along with other messages and ancillary types describing every element of Protobuf
source. Protobuf-ES provides all descriptor messages as exports from [@bufbuild/protobuf], 
along with all other [well-known types](#well-known-types). 

For a simple example, the following script will read and parse the file created
by the compiler command from above, and print the name of each Protobuf file:

```ts
import { FileDescriptorSet } from "@bufbuild/protobuf";
import { readFileSync } from "node:fs";

const set = FileDescriptorSet.fromBinary(
  readFileSync("./set.binpb"),
);

for (const file of set.file) {
  console.log(file.name);
}
```

You can find a deeper dive into the model in [Buf's reference about descriptors](https://buf.build/docs/reference/descriptors#deep-dive-into-the-model). 

Similar to several other Protobuf implementations, Protobuf-ES provides wrapper 
types for the Protobuf descriptor messages that avoid many of their quirks:
The function [`createDescriptorSet`][src-createDescriptorSet] from [@bufbuild/protobuf] 
takes a `google.protobuf.FileDescriptorSet` as an input, and returns a 
[`DescriptorSet`][src-DescriptorSet] object. This object contains an array 
of all files, and map collections for all top-level types in a convenient 
wrapped form.

The following table shows how Protobuf descriptor messages map to their wrapped 
counterparts:

| Protobuf message `google.protobuf.` | Interface from `@bufbuild/protobuf` |
|-------------------------------------|-------------------------------------|
| `FileDescriptorProto`               | `DescFile`                          |
| `DescriptorProto`                   | `DescMessage`                       |
| `FieldDescriptorProto`              | `DescField`, `DescExtension`        |
| `OneofDescriptorProto`              | `DescOneof`                         |
| `EnumDescriptorProto`               | `DescEnum`                          |
| `EnumValueDescriptorProto`          | `DescEnumValue`                     |
| `ServiceDescriptorProto`            | `DescService`                       |
| `MethodDescriptorProto`             | `DescMethod`                        |

If you write a Protobuf plugin with our framework [@bufbuild/protoplugin], 
you'll see that it provides the wrapped types for the schema to generate. You can 
find concrete examples in our guide for [writing plugins](./writing_plugins.md).


### Reflection at runtime

Many Protobuf implementations embed descriptors in the generated code so that 
they are available for reflection. For example, custom options can typically be
retrieved from the descriptor at runtime. 

Protobuf-ES does not embed full descriptors in the generated code, but a very 
minimal set of information. The information is sufficient to walk over all fields 
of a message and access values. Serialization and many other operations in 
Protobuf-ES are implemented using this information, and you can use it for 
your own purposes. The entry points are [Message types](#message-types) and 
[Enum types](#enum-types).

The following example shows how to iterate over the fields of an arbitrary message:

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

Note that the example does not handle [`oneof` groups](#accessing-oneof-groups). 
Please consult the source code for examples how to include them.


### Message types

We gave an overview of the [message class](#message-class) earlier. Besides the
attributes listed there, message classes actually come with a few more static 
properties. The static shape of the generated class is a [`MessageType`][src-MessageType],
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


### Enum types

Similar to messages, enumerations also include Protobuf metadata. Since TypeScript
enumerations cannot be extended with methods, [`EnumType`][src-EnumType] is stored
as a symbol property on the enum object. It can be retrieved with the utility
`proto3.getEnumType()`.

[`EnumType`][src-EnumType] provides the fully qualified name in Protobuf, and
methods to find values by name or integer value.

Here is an example program that prints metadata for a generated enumeration:

```ts
import { proto3 } from "@bufbuild/protobuf";
import { MyEnum } from "./generated";

const enumType = proto3.getEnumType(MyEnum);

console.log(enumType.typeName);
for (const value of enumType.values) {
  console.log("integer value:", value.no);
  console.log("protobuf name:", value.name);
  console.log("name in generated code:", value.localName);
}
```

Similar to messages, enumerations can also be created at runtime, via
[`proto3.makeEnum()`][src-proto3-makeEnum].


### Registries

There are some situations where you may want the ability to look up a message 
class or other type by type name. For example, [`google.protobuf.Any`](#any) stores 
an arbitrary message as a type name and binary data.

For this purpose, Protobuf-ES has registries: A simple interface that lets you
find a type by name. You use the convenient function `createRegistry` to create 
one. It takes any of the generated types in the arguments. For example:

```typescript
import { createRegistry } from "@bufbuild/protobuf";
import { MessageA, MessageB } from "./generated"

const registry = createRegistry(
  MessageA, 
  MessageB,
);

const messageType = registry.findMessage("foo.MessageA");
if (messageType) {
  const instance = new messageType();
}
```

Registries are also used during JSON serialization: To convert [google.protobuf.Any](#any)
and [extensions](#extensions-and-json) to their JSON representation and back, the 
registry is necessary to look up types by name. You can provide a registry in the 
[serialization option](#json-serialization-options) `typeRegistry`.


### Dynamic messages

Protobuf-ES can create a registry from generated code with [`createRegistry`][src-createRegistry], 
but it can also create a registry from [descriptors](#descriptors) with the 
function [`createRegistryFromDescriptors`][src-createRegistryFromDescriptors].

When a message, enumeration, or extension is retrieved from this registry, the 
type is created dynamically at runtime. The dynamic types are functionally 
identical to generated code, and can interact with message data the same way.
Dynamic messages are used to interact with message data for types that are not
known at compile time.

As an example, let's write a small tool that converts Protobuf message data from
the binary format to JSON:

```typescript
import { createRegistryFromDescriptors } from "@bufbuild/protobuf";
import { readFileSync } from "node:fs";

// The first argument is the path to a `google.protobuf.FileDescriptorSet`,
// the second argument is the fully qualified type name of a message in the set
if (process.argv.length !== 4) {
  console.error(`Usage: ${process.argv[1]} path-to-file-descriptor-set message-type-name`);
  process.exit(1);
}
const [, , schemaFile, messageTypeName] = process.argv;

// Create the message type at runtime
const registry = createRegistryFromDescriptors(readFileSync(schemaFile));
const messageType = registry.findMessage(messageTypeName);
if (!messageType) {
  console.error(`failed to find message type ${messageTypeName}`);
  process.exit(1);
}

// Read the binary message data from stdin
const message = messageType.fromBinary(readFileSync(0));

// Write the message as JSON to stdout
console.log(message.toJsonString({
  typeRegistry: registry,
  prettySpaces: 2,
}));
```


## Advanced serialization

### Binary serialization options

Options for `Message.toBinary`:

- `writeUnknownFields?: boolean`<br/>
  By default, [unknown fields](#unknown-fields) are included in the serialized output. 
  Setting this option to `false` changes the behavior to elide unknown fields. 
- `writerFactory?: () => IBinaryWriter`<br/>
  A function for specifying a custom implementation to [encode binary data](#binary-encoding).

Options for `Message.fromBinary`:

- `readUnknownFields?: boolean`<br/>
  By default, [unknown fields](#unknown-fields) are retained during parsing. 
  Setting this option to `false` changes the behavior to ignore unknown fields. 
- `readerFactory?: (bytes: Uint8Array) => IBinaryReader`<br/>
  A function for specifying a custom implementation to [decode binary data](#binary-encoding).


### JSON serialization options

Options for `Message.fromJson` and `Message.fromJsonString`:

- `emitDefaultValues?: boolean`<br/>
  Fields with default values are omitted by default in JSON output.
  This option overrides this behavior and outputs fields with
  their default values.
- `enumAsInteger?: boolean`<br/>
  The name of an enum value is used by default in JSON output. This option
  overrides the behavior to use the numeric value of the enum value instead.
- `useProtoFieldName?: boolean`<br/>
  Field names are converted to lowerCamelCase by default in JSON output. This
  option overrides the behavior to use the proto field name instead.
- `typeRegistry?: IMessageTypeRegistry & Partial<IExtensionRegistry>`<br/>
  A registry to convert [extensions](#extensions-and-json) and 
  [google.protobuf.Any](#any) to JSON.
- `prettySpaces?: boolean`<br/>
  Only available with `toJsonString`. A convenience property for the `space` 
  option to `JSON.stringify`, which controls indentation for prettier output.
  See the [`JSON.stringify` docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters).

Options for `Message.toJson` and `Message.toJsonString`:

- `ignoreUnknownFields?: boolean`<br/>
  By default, unknown properties are rejected.
  This option overrides this behavior and ignores properties, as
  well as unrecognized enum string representations.
- `typeRegistry?: IMessageTypeRegistry & Partial<IExtensionRegistry>`<br/>
  A registry to parse [extensions](#extensions-and-json) and 
  [google.protobuf.Any](#any) from JSON.


### JSON.stringify

Besides `toJson` and `toJsonString`, messages also have a `toJSON` method that is
used by `JSON.stringify`. See the [documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description)
for details on how it works.

We implement this method to ensure that Protobuf messages are always serialized
with the canonical JSON format. Otherwise, `JSON.stringify()` would
crash on `BigInt` values, and would not serialize `oneof`, enumerations, and
other types correctly.

The `toJSON` method is marked as protected since you should never need to invoke
this function directly.

Serializing a message with `JSON.stringify()` is equivalent to calling `toJsonString`
on the message, with the [serialization option](#json-serialization-options)
`emitDefaultValues: true`.


### Unknown fields

When binary message data is parsed, fields that the parser does not recognize are 
preserved. They are stored on the message as unknown fields, and will be included 
when the message is serialized again. 

This default behavior can be modified with the [binary serialization options](#binary-serialization-options) 
`readUnknownFields` and `writeUnknownFields`.

Note that [extension](#extensions) values are also stored as unknown fields.


### Size-delimited message streams

Protobuf-ES supports the size-delimited format for messages. It lets you serialize
multiple messages to a stream, and parse multiple messages from a stream.

A size-delimited message is a varint size in bytes, followed by exactly
that many bytes of a message serialized with the binary format. This implementation
is compatible with the counterparts in [C++](https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/util/delimited_message_util.h),
[Java](https://developers.google.com/protocol-buffers/docs/reference/java/com/google/protobuf/AbstractParser.html#parseDelimitedFrom-java.io.InputStream-),
[Go](https://github.com/golang/protobuf/issues/1382), and others.

The export [`protoDelimited`][src-protoDelimited] provides a method to serialize
such a size-delimited message: 

```typescript
import { protoDelimited } from "@bufbuild/protobuf";

const bytes = protoDelimited.enc(new User({ firstName: "John" }));
const user = protoDelimited.dec(User, bytes);
```

To parse size-delimited messages from a stream, the export provides the method 
`decStream`. The method expects an `AsyncIterable<Uint8Array>` as a stream input, 
so it works with Node.js streams out of the box, and can be easily adapted to other
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

### Binary encoding

At a low level, the Protobuf binary serialization is implemented with the classes 
[`BinaryReader`][src-BinaryReader] and [`BinaryWriter`][src-BinaryWriter]. They 
implement the primitives of the [Protobuf binary encoding][protobuf-dev-encoding].

Both classes are part of the public API and can be used on their own. The 
following example uses [`BinaryWriter`][src-BinaryWriter] to serialize valid data 
for our example message:

```ts
import { BinaryWriter } from "@bufbuild/protobuf";
import { User } from "./generated";

const bytes = new BinaryWriter()
  // string first_name = 1
  .tag(1, WireType.LengthDelimited)
  .string("Homer")
  // bool active = 3
  .tag(3, WireType.Varint)
  .bool(true)
  .finish();

const user = User.fromBinary(bytes);
user.firstName; // "Homer"
user.active; // true
```

Internally, the classes use `TextEncoder` and `TextDecoder` from the [text 
encoding API](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API) to
encode and decode text as UTF-8. In an environment where this API is unavailable, 
your need to bring your own UTF-8 encoder. To do so, you can use the 
[serialization options](#binary-serialization-options) `writerFactory` and 
`readerFactory` to provide your own implementation.


### Base64 encoding

Unfortunately, there is no convenient standard API for base64 encoding in 
ECMAScript, but it can be very useful when transmitting binary data. 

The export [`protoBase64`][src-protoBase64] provides methods to encode and 
decode base64:

```typescript
import { protoBase64 } from "@bufbuild/protobuf";
import { User } from "./generated";

const user = new User({ firstName: "Joe" });
const bytes: Uint8Array = user.toBinary();
const base64: string = protoBase64.enc(bytes)
```


## Advanced TypeScript types

### PartialMessage

This type is well suited in case you know the type of a message, but want to allow 
an instance to be given in the most flexible way. If you want to offer an API that lets 
users provide message data, consider accepting [`PartialMessage<T>`][src-PartialMessage], 
so that users can simply give an object literal with only the non-default values 
they want. Note that any `T` is assignable to [`PartialMessage<T>`][src-PartialMessage].

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

[`PlainMessage<T>`][src-PlainMessage] represents _just_ the fields of a message, without 
their methods. 

In contrast to `PartialMessage`, [`PlainMessage`][src-PlainMessage] requires all properties to be
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

As such, [`PlainMessage<T>`][src-PlainMessage] can be a great fit to use 
throughout your business logic, if that business logic is never concerned with 
serialization, and does not need `instanceof`.

Note that any `T` (assuming `T` extends `Message`) is assignable to a variable 
of type [`PlainMessage<T>`][src-PlainMessage].


### AnyMessage

If you want to handle messages of unknown type, the type [`AnyMessage`][src-AnyMessage] 
provides a convenient index signature to access fields:

```typescript
const anyMessage: AnyMessage = user;
user["firstName"];
```

Note that any message is assignable to `AnyMessage`.


[src-protoInt64]: https://github.com/bufbuild/protobuf-es/blob/5609f7aab3dcfbb468871774c70d2343ac0f265e/packages/protobuf/src/proto-int64.ts#L65
[src-Message]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/message.ts#L40
[src-MessageType]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/message-type.ts#L27
[src-EnumType]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/enum.ts#L18
[src-JsonValue]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/json-format.ts#L139-L154
[src-proto3-getEnumType]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/private/proto-runtime.ts#L81-L86
[src-proto3-makeEnum]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/private/proto-runtime.ts#L58
[src-BinaryReader]: https://github.com/bufbuild/protobuf-es/blob/51573c39ff38a9b43b6f7c22ba6b5ba40fa3ec3a/packages/protobuf/src/binary-encoding.ts#L547
[src-BinaryWriter]: https://github.com/bufbuild/protobuf-es/blob/51573c39ff38a9b43b6f7c22ba6b5ba40fa3ec3a/packages/protobuf/src/binary-encoding.ts#L283
[src-protoBase64]: https://github.com/bufbuild/protobuf-es/blob/51573c39ff38a9b43b6f7c22ba6b5ba40fa3ec3a/packages/protobuf/src/proto-base64.ts#L30
[src-protoDelimited]: https://github.com/bufbuild/protobuf-es/blob/51573c39ff38a9b43b6f7c22ba6b5ba40fa3ec3a/packages/protobuf/src/proto-delimited.ts#L31
[src-DescriptorSet]: https://github.com/bufbuild/protobuf-es/blob/51573c39ff38a9b43b6f7c22ba6b5ba40fa3ec3a/packages/protobuf/src/descriptor-set.ts#L42
[src-createDescriptorSet]: https://github.com/bufbuild/protobuf-es/blob/51573c39ff38a9b43b6f7c22ba6b5ba40fa3ec3a/packages/protobuf/src/create-descriptor-set.ts#L69
[src-createRegistry]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/create-registry-from-desc.ts#L81
[src-createRegistryFromDescriptors]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/create-registry-from-desc.ts#L81
[src-PartialMessage]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/message.ts#L143
[src-PlainMessage]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/message.ts#L137
[src-AnyMessage]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/message.ts#L25
[@bufbuild/protobuf]: https://www.npmjs.com/package/@bufbuild/protobuf
[@bufbuild/protoplugin]: https://www.npmjs.com/package/@bufbuild/protoplugin
[pkg-protoplugin]: https://www.npmjs.com/package/@bufbuild/protoplugin
[protobuf-dev-enum]: https://protobuf.dev/programming-guides/enum/
[protobuf-dev-encoding]: https://protobuf.dev/programming-guides/encoding/
