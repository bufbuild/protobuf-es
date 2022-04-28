Protobuf-ES
===========

A complete implementation of [protocol buffers](https://developers.google.com/protocol-buffers) in TypeScript,
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

We have a complete [example here](./packages/example), and the full documentation is right below:


- [How to compile](#how-to-compile)
- [Generated Code](#generated-code)
  - [Files](#files)
  - [Messages](#messages)
  - [Field names](#field-names)
  - [Scalar fields](#scalar-fields)
  - [64-bit integral types](#64-bit-integral-types)
  - [Message fields](#message-fields)
  - [Repeated fields](#repeated-fields)
  - [Map fields](#map-fields)
  - [Oneof groups](#oneof-groups)
  - [Enumerations](#enumerations)
  - [Extensions](#extensions)
  - [Nested types](#nested-types)
  - [Services](#services)
  - [Comments](#comments)
- [Runtime API](#runtime-api)
  - [Message class](#message-class)
    - [Constructing messages and accessing fields](#constructing-messages-and-accessing-fields)
    - [Cloning messages](#cloning-messages)
    - [Comparing messages](#comparing-messages)
    - [Serializing messages](#serializing-messages)
  - [Message types](#message-types)
  - [Using enumerations](#using-enumerations)
  - [Well-known types](#well-known-types)
  - [DescriptorRegistry](#descriptorregistry)
- [FAQ](#FAQ)
  - [What about protoc's JavaScript generator?](#what-about-protocs-javascript-generator)
  - [What features are implemented, what features are missing?](#what-features-are-implemented-what-features-are-missing)



## How to compile

We recommend [`buf`](https://github.com/bufbuild/buf) as a protocol buffer compiler, but
[`protoc`](https://github.com/protocolbuffers/protobuf/releases) works as well.

If you have the compiler set up, you can install the code generator plugin, as well as the 
accompanying runtime package [`@bufbuild/protobuf`](./packages/protobuf) with:

```shell
npm install @bufbuild/protoc-gen-es @bufbuild/protobuf
```

This will install the code generator plugin in `node_modules/.bin/protoc-gen-es`. It is 
actually just a simple node script that selects the correct precompiled binary for your 
platform.  

To compile with `buf`, add a file `buf.gen.yaml` with the following content: 

```yaml
# Learn more: https://docs.buf.build/configuration/v1/buf-gen-yaml
version: v1
plugins:
  - name: es
    path: ./node_modules/.bin/protoc-gen-es
    opt: target=ts
    out: src/gen
```

Now `buf generate` will compile your `.proto` files to idiomatic TypeScript classes. To 
learn about alternative install methods, and about the available plugin options, see 
[`@bufbuild/protoc-gen-es`](./packages/protoc-gen-es).


## Generated Code

The following sections describe what code is generated for any given protobuf definition.

### Files

For every protobuf source file, we generate a corresponding `.js`, `.ts`, or `.d.ts` file,
but add a `_pb` suffix to the name. For example, for the protobuf file `foo/bar.proto`, 
we generate `foo/bar_pb.js`.

By default, we generate JavaScript _and_ TypeScript declaration files, so the generated 
code can be used in JavaScript or TypeScript projects without transpilation. If you 
prefer to generate TypeScript, use the plugin option `target=ts`.

Note that we generate ECMAScript modules, which means we use `import` and `export` statements. 
All import paths include a `.js` extension, so you can use the generated code in Node.js
with `"type": "module"` in your project's `package.json` without transpilation.
If you do require support for the legacy CommonJS format, you can generate TypeScript and
transpile it, for example with the extremely fast [esbuild](https://github.com/evanw/esbuild)
bundler.



### Messages

For the following message declaration:

```protobuf
message Example {}
```

we generate a class called `Example`, which extends the base class [Message](https://github.com/bufbuild/protobuf-es/blob/tstamm/add-docs/packages/protobuf/src/message.ts#L40) 
provided by [@bufbuild/protobuf](./packages/protobuf). See the [runtime API documentation](#runtime-api) for details.

Note that [some names](https://github.com/bufbuild/protobuf-es/blob/5609f7aab3dcfbb468871774c70d2343ac0f265e/private/protoplugin/names.go#L30-L94)
cannot be used as class names and will be escaped by adding the suffix `$`.
For example, a protobuf message `break` will become a class `break$`.


### Field names

For each field declared in a message, we generate a property on the class. Note that property 
names are always `lowerCamelCase`, even if the corresponding protobuf field uses `snake_case`. 
While there is no official style for ECMAScript, most style guides 
([AirBnB](https://github.com/airbnb/javascript#naming--camelCase), 
[MDN](https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Code_guidelines/JavaScript#variable_naming), 
[Google](https://google.github.io/styleguide/jsguide.html#naming-non-constant-field-names)) as well as 
[Node.js APIs](https://nodejs.org/dist/latest-v16.x/docs/api/child_process.html#child_processforkmodulepath-args-options) and 
[browser APIs](https://fetch.spec.whatwg.org/#request-class) use `lowerCamelCase`, and so do we.

Note that [some names](https://github.com/bufbuild/protobuf-es/blob/5609f7aab3dcfbb468871774c70d2343ac0f265e/private/protoplugin/names.go#L96-L118)
cannot be used as class properties and will be escaped by adding the suffix `$`.
For example, a protobuf field `constructor` will become a class property `constructor$`.


### Scalar fields

For these field definitions:

```protobuf
string foo = 1;
optional string bar = 2;
```

we will generate the following properties:

```typescript
foo = "";
bar?: string;
```

Note that all scalar fields have an intrinsic default value in proto3 syntax, unless they are marked
as `optional`. Protobuf types map to ECMAScript types as follows:

| protobuf type | ECMAScript type | default value        |
|---------------|-----------------|----------------------|
| double        | number          | `0`                  |
| float         | number          | `0`                  |
| int64         | bigint          | `0n`                 |
| uint64        | bigint          | `0n`                 |
| int32         | number          | `0`                  |
| fixed64       | bigint          | `0n`                 |
| fixed32       | number          | `0`                  |
| bool          | boolean         | `false`              |
| string        | string          | `""`                 |
| bytes         | Uint8Array      | `new Uint8Array(0)`  |
| uint32        | number          | `0`                  |
| sfixed32      | number          | `0`                  |
| sfixed64      | bigint          | `0n`                 |
| sint32        | number          | `0`                  |
| sint64        | bigint          | `0n`                 |


### 64-bit integral types

We use the `bigint` primitive to represent 64-bit integral types. If bigint
is unavailable, we fall back to a string representation, which means that
all values typed as `bigint` will actually be strings.

For presentation purposes, it is always safe to simply call `toString()` on
the field value. For more detailed information, see the conversion utility 
[`protoInt64`](https://github.com/bufbuild/protobuf-es/blob/5609f7aab3dcfbb468871774c70d2343ac0f265e/packages/protobuf/src/proto-int64.ts#L65)
provided by [@bufbuild/protobuf](./packages/protobuf).

### Message fields

For the following message field declaration:

```protobuf
message Example {
  Example field = 1;
}
```

we generate the following property:

```typescript
field?: Example;
```

Note that we special case the well-known wrapper types: If a message uses `google.protobuf.BoolValue` for example, we 
automatically "unbox" the field to an optional primitive:

```typescript
/**
 * @generated from field: google.protobuf.BoolValue bool_value_field = 1;
 */
boolValueField?: boolean;
```


### Repeated fields

All repeated fields are represented with an ECMAScript Array. For example, the 
following field declaration:

```protobuf
repeated string field = 1;
```

is generated as:

```typescript
field: string[] = [];
```

Note that all repeated fields will have an empty array as a default value.


### Map fields

For the following map field declaration:

```protobuf
map<string, int32> field = 1;
```

we generate the property: 

```typescript
field: { [key: string]: number } = {};
```

Note that all map fields will have an empty object as a default value.

While it is not a perfectly clear-cut case, we chose to represent map fields 
as plain objects instead of [ECMAScript map objects](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-map-objects).
While `Map` has some benefits like better behavior around keys, they don't
have a literal representation and do not support the spread operator.


### Oneof groups

For the following oneof declaration:

```protobuf
message Example {
  oneof result {
    int32 number = 1;
    string error = 2;
  }
}
```

we generate the following property:

```typescript
result:
  | { value: number; case: "number" }
  | { value: string; case: "error" }
  | { case: undefined; value?: undefined } = { case: undefined };
```

So the entire oneof group is turned into an object `result` with two properties:
- `case` - the name of the selected field
- `value` - the value of the selected field

Example usage:

```typescript
// if blocks:
if (message.result.case === "number") {
    message.result.value; // a number
}
// switch statement:
switch (message.result.case) {
    case "number":
        message.result.value; // a number
        break;
    case "error":
        message.result.value; // a string
        break;
}
// selecting a field:
message.result = {case: "number", value: 123};
message.result = {case: undefined};
```

This representation is particularly useful in TypeScript, because the compiler 
narrows down the type. That means the if blocks and switch statements above tell
the compiler the type of the `value` property. Note that type narrowing requires 
the TypeScript compiler option [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks). 
This option is automatically enabled with the option `strict`, which is recommended. 


### Enumerations

For the following enum declaration:

```protobuf
enum Foo {
  DEFAULT_BAR = 0;
  BAR_BELLS = 1;
  BAR_B_CUE = 2;
}
```

we generate the following TypeScript enum:

```typescript
enum Foo {
  DEFAULT_BAR = 0,
  BAR_BELLS = 1,
  BAR_B_CUE = 2
}
```

Note that [some names](https://github.com/bufbuild/protobuf-es/blob/5609f7aab3dcfbb468871774c70d2343ac0f265e/private/protoplugin/names.go#L30-L94)
cannot be used as enum names and will be escaped by adding the suffix `$`.
For example, a protobuf enum `catch` will become a TypeScript enum `catch$`.

If all enum values share a prefix that corresponds with the enum's name, the 
prefix is dropped from all enum value names. For example, for the following 
enum declaration:

```protobuf
enum Foo {
  FOO_BAR = 0;
  FOO_BAZ = 1;
}
```

we generate the following TypeScript enum:

```typescript
enum Foo {
   BAR = 0,
   BAZ = 1
}
```


### Extensions

We do not support extensions (a proto2 feature) at this time.


### Nested types

A message or enum can be declared within a message. For example:

```protobuf
message Example {
  message Message {}
  enum Enum {ENUM_UNSPECIFIED = 0;}
}
```

Since ECMAScript doesn't have a concept of inner classes like Java or C#, we generate the 
two classes `Example` and `Example_Message`, as well as the enum `Example_Enum`. 


### Services

`protoc-gen-es` does not generate any code for service declarations.


### Comments

We think that your comments in proto sources files are important, and take great care 
to carry them over to the generated code as JSDocs comments. That includes license 
headers in your file, as well as comments down to individual enum values, for example.

#### Preamble

Each generated file contains a preamble with information about the source
file, and how it was generated:

```
@generated by protoc-gen-es v1.0.0 with parameter "target=ts"
@generated from file example.proto
```

To improve forwards and backwards compatibility, we also generated annotations to
disable eslint and type checking through the TypeScript compiler:

```
/* eslint-disable */
/* @ts-nocheck */
```

You can turn these annotations off with the plugin options `ts_nocheck=false` and
`eslint_disable=false`.


#### Element comments

We generate similar information for every single protobuf element, so you always have 
the best possible transparency: 

```
@generated from field: map<string, bytes> str_bytes_field = 5;
```

#### Deprecation

We support the `deprecated` option for all elements. For example, for the following 
field declaration:

```protobuf
// This field is deprecated
string deprecated_field = 1 [deprecated = true];
```

we generate:

```typescript
/**
 * This field is deprecated
 *
 * @generated from field: string deprecated_field = 1 [deprecated = true];
 * @deprecated
 */
deprecatedField = "";
```

If you mark a file as deprecated, we generate `@deprecated` JSDoc tags for all 
symbols in this file.




## Runtime API

The runtime library for the generated code is provided by the npm package [@bufbuild/protobuf](./packages/protobuf).
This is a detailed overview of the features provided by the library. 


### Message class

All generated messages extends the base class [Message](./packages/protobuf/src/message.ts#L40).
It provides a few methods to every message, to compare, clone, and serialize, as well as a
convenient constructor. All message classes also come with some static properties with 
metadata, and static convenience methods.

For the following examples, we will use the following message definition [example.proto](packages/protobuf-test/extra/example.proto):

```protobuf
syntax="proto3";
package docs;

message Example {
  string foo = 1;
  bool bar = 2;
  Example baz = 3;
}
```

#### Constructing messages and accessing fields

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

The accepted input is defined by the type [`PartialMessage<T>`](./packages/protobuf/src/message.ts#L145-L153).
It is similar to the TypeScript built-in type `Partial`, but works recursively. That means
you can create a shallow copy of a message with the help of the object spread operator:

```typescript
const shallowCopy = new Example({...example});
```

Note that the spread operator will dispose of all class methods. The type [`PlainMessage<T>`](./packages/protobuf/src/message.ts#L136-L140)
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

#### Cloning messages

While a shallow copy of a message can be created by using the spread operator with the 
message constructor, it is also possible to create a _deep_ clone of a message:

```typescript
example.clone();
```

#### Comparing messages

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

#### Serializing messages

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

But the result will be a [JSON value](./packages/protobuf/src/json-format.ts#L139-L154) – 
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
[conformance tests](./packages/conformance-test). We do not implement the text format.  


### Message types

In the previous section we went through the methods every message class provides, 
including static methods. But we actually generate a few more static properties 
with metadata. The static shape of the generated class is a [`MessageType`](packages/protobuf/src/message-type.ts#L27),
a representation of the _type_ of a message.

Such a type can actually be created at run time. We can take a peek at the [generated 
code](packages/protobuf-test/src/gen/ts/extra/example_pb.ts) to get some insights:

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


### Using enumerations

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

However, similar to MessageType, there is also [`EnumType`](./packages/protobuf/src/enum.ts#L15). 
It provides the fully qualified protobuf type name, as well as the original values and their 
names. Use  [`proto3.getEnumType()`](./packages/protobuf/src/private/proto-runtime.ts#L81-L86)
to retrieve the EnumType for a given enum.

Similar to messages, enums can also be created at run time, via 
[`proto3.makeEnum()`](./packages/protobuf/src/private/proto-runtime.ts#L58).


### Well-known types

Protocol buffers have a small standard library of well-known types. 
[@bufbuild/protobuf](./packages/protobuf) provides all of them as pre-compiled 
exports.

<details><summary>Expand the list of Well-known types</summary>

| Name                                                                            | Type    | Source                                                                                                                                 |
|---------------------------------------------------------------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------|
| [`Any`](./packages/protobuf/src/google/protobuf/any_pb.ts)                      | message | [google/protobuf/any.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/any.proto)                       |
| [`Api`](./packages/protobuf/src/google/protobuf/api_pb.ts)                      | message | [google/protobuf/api.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/api.proto)                       |
| [`BoolValue`](./packages/protobuf/src/google/protobuf/wrappers_pb.ts)           | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`BytesValue`](./packages/protobuf/src/google/protobuf/wrappers_pb.ts)          | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`DoubleValue`](./packages/protobuf/src/google/protobuf/wrappers_pb.ts)         | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`Duration`](./packages/protobuf/src/google/protobuf/duration_pb.ts)            | message | [google/protobuf/duration.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/duration.proto)             |
| [`Empty`](./packages/protobuf/src/google/protobuf/empty_pb.ts)                  | message | [google/protobuf/empty.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/empty.proto)                   |
| [`Enum`](./packages/protobuf/src/google/protobuf/type_pb.ts)                    | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`EnumValue`](./packages/protobuf/src/google/protobuf/type_pb.ts)               | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`Field`](./packages/protobuf/src/google/protobuf/type_pb.ts)                   | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`Field_Cardinality`](./packages/protobuf/src/google/protobuf/type_pb.ts)       | enum    | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`Field_Kind`](./packages/protobuf/src/google/protobuf/type_pb.ts)              | enum    | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`FieldMask`](./packages/protobuf/src/google/protobuf/field_mask_pb.ts)         | message | [google/protobuf/field_mask.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/field_mask.proto)         |
| [`FloatValue`](./packages/protobuf/src/google/protobuf/wrappers_pb.ts)          | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`Int32Value`](./packages/protobuf/src/google/protobuf/wrappers_pb.ts)          | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`Int64Value`](./packages/protobuf/src/google/protobuf/wrappers_pb.ts)          | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`ListValue`](./packages/protobuf/src/google/protobuf/struct_pb.ts)             | message | [google/protobuf/struct.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/struct.proto)                 |
| [`Method`](./packages/protobuf/src/google/protobuf/type_pb.ts)                  | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`Mixin`](./packages/protobuf/src/google/protobuf/type_pb.ts)                   | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`NullValue`](./packages/protobuf/src/google/protobuf/struct_pb.ts)             | enum    | [google/protobuf/struct.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/struct.proto)                 |
| [`Option`](./packages/protobuf/src/google/protobuf/type_pb.ts)                  | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`SourceContext`](./packages/protobuf/src/google/protobuf/source_context_pb.ts) | message | [google/protobuf/source_context.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/source_context.proto) |
| [`StringValue`](./packages/protobuf/src/google/protobuf/wrappers_pb.ts)         | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`Struct`](./packages/protobuf/src/google/protobuf/struct_pb.ts)                | message | [google/protobuf/struct.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/struct.proto)                 |
| [`Syntax`](./packages/protobuf/src/google/protobuf/type_pb.ts)                  | enum    | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`Timestamp`](./packages/protobuf/src/google/protobuf/timestamp_pb.ts)          | message | [google/protobuf/timestamp.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/timestamp.proto)           |
| [`Type`](./packages/protobuf/src/google/protobuf/type_pb.ts)                    | message | [google/protobuf/type.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/type.proto)                     |
| [`UInt32Value`](./packages/protobuf/src/google/protobuf/wrappers_pb.ts)         | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`UInt64Value`](./packages/protobuf/src/google/protobuf/wrappers_pb.ts)         | message | [google/protobuf/wrappers.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)             |
| [`Value`](./packages/protobuf/src/google/protobuf/struct_pb.ts)                 | message | [google/protobuf/struct.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/struct.proto)                 |
</details>


### DescriptorRegistry

As you may know, a `.proto` file can also be represented by a [FileDescriptor](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto).
Protobuf compilers such as [`buf`](https://github.com/bufbuild/buf) or `protoc` actually compile
`.proto` files to a set of descriptors, and code generator plugins receive them when code is generated.

Using a [`DescriptorRegistry`](./packages/protobuf/src/descriptor-registry.ts#L88), you 
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


## FAQ

### What about protoc's JavaScript generator?

[`js_generator.cc`](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/compiler/js/js_generator.cc)
is rarely updated, and has fallen behind the quickly moving world of JavaScript.

For example:
- it does not support ECMAScript modules
- it cannot generate TypeScript (3rd party plugins are necessary)
- it does not support the [canonical JSON format](https://developers.google.com/protocol-buffers/docs/proto3#json)
- it does not carry over comments from your `.proto` files

Because of this, we want to provide a solid, modern alternative with Protobuf-ES.

The main differences of the generated code:
- we use plain properties for fields, where protoc uses getters and setters
- we represent 64-bit integers with BigInt, where protoc uses `string` or `number`
- we implement the canonical JSON format, where protoc offers only a partial alternative with `toObject`
- we generate [much smaller bundles](./packages/bench-codesize)
- our implementation is rather dynamic, despite the use of TypeScript - we let you dynamically create 
  types at run time, for example


### What features are implemented, what features are missing?

We implement all proto3 features, including the canonical JSON format.  
We implement all proto2 features, except for extensions and the text format.  
The implementation is covered by the protocol buffers 
[conformance tests](./packages/conformance-test).


## Copyright

The [code to encode and decode varint](./packages/protobuf/src/google/varint.ts) is Copyright 2008 Google Inc., licensed under BSD-3-Clause.
