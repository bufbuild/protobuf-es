Protobuf-ES: Generated Code
===========================

The following document describe how to generate, and what code precisely is generated 
for any given protobuf definition.


- [How to generate](#how-to-generate)
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


## How to generate

We recommend [`buf`](https://github.com/bufbuild/buf) as a protocol buffer compiler, but
[`protoc`](https://github.com/protocolbuffers/protobuf/releases) works as well.

If you have the compiler set up, you can install the code generator plugin, as well as the
accompanying runtime package [@bufbuild/protobuf][pkg-protobuf] 
with:

```shell
npm install @bufbuild/protoc-gen-es @bufbuild/protobuf
```

This will install the code generator plugin in `node_modules/.bin/protoc-gen-es`. It is
actually just a simple node script that selects the correct precompiled binary for your
platform.

#### Generate with `buf`

To compile with [`buf`](https://github.com/bufbuild/buf), add a file `buf.gen.yaml` with 
the following content:

```yaml
# Learn more: https://docs.buf.build/configuration/v1/buf-gen-yaml
version: v1
plugins:
  - plugin: es
    path: ./node_modules/.bin/protoc-gen-es
    opt: target=ts
    out: src/gen
```

Now `buf generate` will compile your `.proto` files to idiomatic TypeScript classes. 

#### Generate with `protoc`

To compile with `protoc`:
```shell
protoc -I . --plugin ./node_modules/.bin/protoc-gen-es --es_out src/gen --es_opt target=ts example.proto
```

To learn about other ways to install the plugin, and about the available plugin options, 
see [@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es).



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

It is also possible to modify the extension used in the import paths via the 
[`import_extension`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoc-gen-es#import_extensionjs) plugin option.  
This option allows you to choose which extension will used in the imports, 
providing flexibility for different environments.


### Messages

For the following message declaration:

```protobuf
message Example {}
```

we generate a class called `Example`, which extends the base class [Message][src-message]
provided by [@bufbuild/protobuf][pkg-protobuf]. 
See the [runtime API documentation](#runtime-api) for details.

Note that some names cannot be used as class names and will be escaped by adding the suffix `$`.
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

Note that some names cannot be used as class properties and will be escaped by adding the suffix `$`.
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

We use the `BigInt` primitive to represent 64-bit integral types. `BigInt` has 
been available in all major runtimes since 2020.

If you prefer to avoid `BigInt` in generated code, you can set the field option
`jstype = JS_STRING` to generate `String` instead:

```protobuf
int64 my_field = 1 [jstype = JS_STRING]; // will generate `myField: string`
```

If `BigInt` is unavailable in your environment, Protobuf-ES falls back to the
string representation. This means all values typed as `bigint` will be a `string`
at runtime. For detailed information on how to handle both variants, see the 
conversion utility [`protoInt64`][src-proto-int64] provided by [@bufbuild/protobuf][pkg-protobuf].


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
While `Map` has better behavior around keys, they do not have a literal 
representation, do not support the spread operator and type narrowing in 
TypeScript.


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
  | { case: "number";  value: number }
  | { case: "error";   value: string }
  | { case: undefined; value?: undefined } = { case: undefined };
```

So the entire oneof group is turned into an object `result` with two properties:
- `case` - the name of the selected field
- `value` - the value of the selected field

Refer to the [runtime API documentation](runtime_api.md#accessing-oneof-groups) for 
details on how to use this object.

> **Note:** This feature requires the TypeScript compiler option `strictNullChecks` 
> to be true. See the [documentation](https://www.typescriptlang.org/tsconfig#strictNullChecks) for details.


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

Note that some names cannot be used as enum names and will be escaped by 
adding the suffix `$`. For example, a protobuf enum `catch` will become a 
TypeScript enum `catch$`.

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

```typescript
// @generated by protoc-gen-es v1.0.0
// @generated from file comments.proto (package spec, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */
```

To improve forwards and backwards compatibility, we add the annotations to
disable eslint and type checking through the TypeScript compiler.


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


[src-proto-int64]: https://github.com/bufbuild/protobuf-es/blob/5609f7aab3dcfbb468871774c70d2343ac0f265e/packages/protobuf/src/proto-int64.ts#L65
[src-message]: https://github.com/bufbuild/protobuf-es/blob/9b8efb4f4eb8ff8ce9f56798e769914ee2069cd1/packages/protobuf/src/message.ts#L40
[pkg-protobuf]: https://www.npmjs.com/package/@bufbuild/protobuf
