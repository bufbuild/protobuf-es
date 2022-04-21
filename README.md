Protobuf-ES
===========

A complete implementation of [protocol buffers](https://developers.google.com/protocol-buffers) in TypeScript,
suitable for web browsers and Node.js.


## Features

- small code size
- no dependencies
- very fast code generation, implemented in Go
- implements all proto3 features, including the canonical JSON format
- implements all proto2 features, except for extensions and the text format
- passes the protocol buffers [conformance tests](./packages/conformance-test)
- provides all well-known types with their specialized JSON representation
- uses and algebraic data type to represent `oneof` groups
- unboxes fields using google/protobuf/wrappers.proto to optional primitives
- represents 64-bit integers with BigInt, and falls back to `string` if unavailable
- uses standard TypeScript enums for protocol buffer `enum`
- provides `equals()` and `clone()` on each message for convenience
- fields are plain properties, and support the object spread operator
- messages can be constructed from partial plain objects
- can dynamically create types at run time, for example from a set of `google.protobuf.FileDescriptorProto`
- provides field information to traverse types programmatically
- first class support of comments for documentation, including deprecations


## Getting started

- installation instructions
- tutorial - packages/example/

## Code Generator

## Runtime library



## Generated Code

### Files

For every protobuf source file, we generate a corresponding `.js`, `.ts`, or `.d.ts` file,
but add a `_pb` suffix to the name.

For example, for the protobuf file `foo/bar.proto`, we generate `foo/bar_pb.js`.

By default, we generate JavaScript _and_ TypeScript declaration files, so the generated 
code can be used in JavaScript or TypeScript projects without transpilation. If you 
prefer to generate TypeScript, use the plugin option `target=ts`.


### Messages

For the following message declaration:

```protobuf
message Example {}
```

we generate a class called `Example`, which extends the base class [Message](./packages/protobuf/src/message.ts) 
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

A quick reminder about TypeScript enums:
- It is possible to lookup the name for an enum value:
  ```typescript
  let val: Foo = Foo.BAR_BELLS;
  let name = Foo[val]; // => "BAR_BELLS"
  ``` 
- and to lookup an enum value by name:
  ```typescript
  let val: Foo = Foo["BAR_B_CUE"];
  ``` 
- TypeScript enums are just plain objects in JavaScript.
- TypeScript enums support aliases - as does protobuf with the `allow_alias` option.


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

We do not support extensions at this time.


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


### ECMAScript modules

We generate ECMAScript modules with `import` and `export` statements. All import
paths include a `.js` extension. That means you can use the generated code in Node.js
with `"type": "module"` in your project's `package.json` without transpilation.
If you require support for the legacy CommonJS format, you can generate TypeScript and
transpile it, for example with the extremely fast [esbuild](https://github.com/evanw/esbuild)
bundler.


### Comments

We think that your comments in proto sources files are important, and take great care 
to carry them over to the generated code as JSDocs comments. That includes license 
headers in your file, as well as comments down to individual enum values, for example.

### Preamble

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


### Element comments

We generate similar information for every single protobuf element, so you always have 
the best possible transparency: 

```
@generated from field: map<string, bytes> str_bytes_field = 5;
```

### Deprecation

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

If you mark a file as deprecated, we generate `@deprecated` JSDoc tags for all symbols in this file.




## Runtime API

The runtime library for the generated code is provided by the npm package [@bufbuild/protobuf](./packages/protobuf).

### Serialization


### Messages


### Enumerations


### DescriptorRegistry


### Well-known types

---


https://github.com/bufbuild/protobuf-es/blob/5609f7aab3dcfbb468871774c70d2343ac0f265e/packages/protobuf/src/message-type.ts#L27

```typescript
/**
 * @generated from message Example
 */
export declare class Example extends Message<Example> {
  constructor(data?: PartialMessage<Example>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "Example";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Example;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Example;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Example;

  static equals(a: Example | PlainMessage<Example> | undefined, b: Example | PlainMessage<Example> | undefined): boolean;
}
```


---

```ts
// @generated by protoc-gen-es v0.0.2-alpha.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/example.proto (syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message Example
 */
export class Example extends Message<Example> {
  constructor(data?: PartialMessage<Example>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "Example";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Example {
    return new Example().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Example {
    return new Example().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Example {
    return new Example().fromJsonString(jsonString, options);
  }

  static equals(a: Example | PlainMessage<Example> | undefined, b: Example | PlainMessage<Example> | undefined): boolean {
    return proto3.util.equals(Example, a, b);
  }
}
```


## Copyright

The [code to encode and decode varint](./packages/protobuf/src/google/varint.ts) is Copyright 2008 Google Inc., licensed under BSD-3-Clause.
