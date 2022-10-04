# @bufbuild/protoplugin

## Introduction

This package helps to create your own code generator plugin.  The overall process involves a series of xx steps:

1.  Implement a TypeScript generator function, which is used to generate TypeScript files
2.  Optionally implement a JavaScript generator function, a declaration file generator function, or a transpile function.
3.  Pass these functions along with some static configuration values to `createEcmaScriptPlugin` from the `@bufbuild/protoplugin` package.
4.  Create a binary file which runs your plugin.

## Usage

Create a binary for your plugin:

```js
#!/usr/bin/env node

const { runNodeJs } = require("@bufbuild/protoplugin");
const { protocGenEs } = require("../dist/cjs/src/protoc-gen-foo-plugin.js");

runNodeJs(protocGenEs);
```

An example invocation looks as follows:

```js
export const protocGenFoo = createEcmaScriptPlugin({
   name: "protoc-gen-foo",
   version: "v0.1.0",
   
   // Generator functions
   generateTs,
   generateJs,
   generateDts,
});

```
### Generating Code

The generator functions are invoked by the plugin framework with a parameter of type `Schema`.  This `Schema` object contains the information needed to generate code.  

In addition to the [CodeGeneratorRequest](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/compiler/plugin.proto) that is standard when working with protoc plugins, the `Schema` object also contains some convenience interfaces that make it a bit easier to work with the various descriptor objects.  See the API definition of [Schema](#schema) for more information.

The `Schema` object contains a `files` property, which is a list of `DescFile` objects representing the files requested to be generated.  The first thing to do in your generator function is to iterate over this list and issue a call to the `generateFile` function for each file object.  This will return a `GeneratedFile` object which you can then use to "print" the generated code.  

Each `DescFile` object in the `files` property contains all enums and messages needed to begin generating code.  You can iterate over each as follows:

```ts
for (const file of schema.files) {
  const f = schema.generateFile(file.name + "_pb.ts");
  
  for (const enumeration of file.enums) {
     f.print("// generating enums");
     ...
  }
  
  for (const enumeration of file.messages) {
     f.print("// generating messages");
     ...
  }
}
```

### Custom Options

Protobuf-ES does not yet provide support for extensions, neither in general as pertaining to proto2 nor with custom options in proto3.  However, in the interim, there are convenience functions for retrieving any custom options specified in your .proto files.  These are provided as a temporary utility until full extension support is implemented.

For available functions, see the [custom options](#custom-options) section under **API**.

### Working Example

For a working example of a plugin written with the framework, check out [protoc-gen-es](https://github.com/bufbuild/protobuf-es/packages/protoc-gen-es).


## API

```typescript
createEcmaScriptPlugin(init: PluginInit): Plugin
```

### `PluginInit`

Type: `object`

#### name

Type: `string`.
Required:  `true`.

The name of your plugin.  
Most plugins are prefixed with `protoc-gen` as required by `protoc`.  
For example, the official ECMAScript plugin which generates JavaScript,
  TypeScript, and declaration files is named `protoc-gen-es`..

---

#### version

Type: `string`.
Required:  `true`.

The version of your plugin.  
Typically, this should mirror the version specified in your package.json.

---

#### generateTs

Type: `Function`
Required: `True`

```typescript
(schema: Schema) => void;
```

The `generateTs` function is a function which will be invoked by the plugin framework, passing a `Schema` object which
can be used to generate TypeScript files.

---

#### generateJs

Type: `Function`
Optional: `True`

```typescript
(schema: Schema) => void;
```

The `generateJs` function is a function which will be invoked by the plugin framework if `js` is specified as a target out
parameter.  A `Schema` object will be passed, containing relevant `CodeGeneratorRequest` information that can be used to 
generate JavaScript files.  

If this function is not provided, the plugin framework will attempt to transpile JavaScript files using a pre-configured
version of TypeScript internally.  Users can override this transpilation process by passing their own `transpile` function 
(see [transpile](#transpile) below).

---

#### generateDts

Type: `Function`
Optional: `True`

```typescript
(schema: Schema) => void;
```

The `generateDts` function is a function which will be invoked by the plugin framework if `dts` is specified as a target out
parameter.  A [`Schema`](#schema) object will be passed, containing relevant `CodeGeneratorRequest` information that can be used to 
generate declaration files.  

If this function is not provided, the plugin framework will attempt to transpile declaration files using a pre-configured
version of TypeScript internally.  Users can override this transpilation process by passing their own `transpile` function 
(see [transpile](#transpile) below).

---

#### transpile

Type: `Function`
Optional: `True`

```typescript
(files: FileInfo[],
 transpileJs: boolean,
 transpileDts: boolean) => FileInfo[];
```

This function can be used to override the plugin framework's transpilation process.  As mentioned above,
if `js` or `dts` is specified as a target out and `generateJs` or `generateDts` is not specified in the 
plugin initialization, the framework will attempt to transpile JavaScript and/or declaration files where
appropriate.  This process uses a stable version of TypeScript with lenient compiler options so that files
are generated under most circumstances.  However, if this is not sufficient for plugin authors, they may 
specify this function to override this process with a transpiler using their own version of TypeScript or
compiler options.

The function will be invoked with an array of `FileInfo` objects representing the TypeScript file content
to use for transpilation as well as two booleans indicating whether the function should transpile JavaScript,
declaration files, or both.

The `transpile` function is meant to be used in place of either `generateJs`, `generateDts`, or both.  
However, those functions will take precedence.  This means that if `generateJs`, `generateDts`, and 
this transpile function are all provided, this transpile function will be ignored.

---

#### parseOption

Type: `Function`
```js
 (key: string, value: string | undefined) => void
 ```
Optional

The optional `parseOption` function which can be used to customize the parsing of parameters passed to your plugin.
The plugin framework attempts to parse a set of pre-defined parameters, but if your plugin needs to be passed additional parameters,
this function parameter can be used to parse those and act accordingly.



### `Schema`

Type: `object`

#### files

Type: `DescFile[]`

A list of `DescFile` objects representing the files that were asked to be generated.

---

#### allFiles

Type: `DescFile[]`

A list of `DescFile` objects representing *all* files contained in the `CodeGeneratorRequest`.

---

#### targets

Type: `Target[]`

A list of targets requested as the desired output, i.e. `ts`, `js`, `dts`.

---

#### runtime

Type: `RuntimeImports`

An object containing symbols from the runtime library.  Contains helpful utilities for working with nuances between runtimes of `proto2` and `proto3`.

---

#### generateFile

Type: `Function`

```typescript
(name: string): GeneratedFile;
```

This function is used to generate a new file with the given name.  The returned `GeneratedFile` can then be used to "print" information, which will
be represented as the actual file generated by the plugin.

---

#### proto

Type: `CodeGeneratorRequest`

The original [CodeGeneratorRequest](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/compiler/plugin.proto).

---

### Custom Options

#### Scalar Options

Custom options of a scalar type (`boolean`, `string`, `int32`, etc.) can be retrieved by a series of functions specific to the type of custom option desired.  Each function expects an `AnyDesc` object, which can represent any of the `DescXXX` objects such as `DescFile`, `DescEnum`, `DescMessage`, etc. and the ID of the custom option field.

For example, given the following:

```proto
extend google.protobuf.MessageOptions {
  optional int32 foo_message_option = 50001;
}
extend google.protobuf.FieldOptions {
  optional string foo_field_option = 50002;
}

message FooMessage {
  option (foo_message_option) = 1234;

  int32 foo = 1 [(foo_field_option) = "test"];
}
```

The values of these options can be retrieved as follows:

```ts
const msgVal = getCustomOptionInt32(descMessage, 50001);  // 1234

const fieldVal = getCustomOptionString(descField, 50002);  // "test"
```

#### Message Options

Message options are retrieved slightly differently.  There is one function to retrieve them named `getCustomOptionMessage`, but the signature is a bit more involved.

It still expects a `DescXXX` type and field ID, but it also expects a message type created at runtime that is used for returning the values of the custom option.

For example, given the following proto file:

```proto
extend google.protobuf.MethodOptions {
  optional ServiceOptions service_method_option = 50007;
}

message ServiceOptions {
  int32 foo = 1;
  string bar = 2;
  oneof qux {
    string quux = 3;
  }
  repeated string many = 4;
  map<string, string> mapping = 5;
}

service FooService {
  rpc Get(GetRequest) returns (GetResponse) {
    option (service_method_option) = { 
        foo: 567, 
        bar: "Some string", 
        quux: "Oneof string",
        many: ["a", "b", "c"],
        mapping: [{key: "testKey", value: "testVal"}]
    };
  }
}
```

The value of this options can be retrieved as follows:

```ts
const opts = proto3.makeMessageType("ServiceOptions", [
  {
    no: 1,
    name: "foo",
    kind: "scalar",
    T: 5 /* ScalarType.INT32 */,
  },
  {
    no: 2,
    name: "bar",
    kind: "scalar",
    T: 9 /* ScalarType.STRING */,
  },
  {
    no: 3,
    name: "quux",
    kind: "scalar",
    T: 9 /* ScalarType.STRING */,
  },
  {
    no: 4,
    name: "many",
    kind: "scalar",
    repeated: true,
    T: 9 /* ScalarType.STRING */,
  },
  {
    no: 5,
    name: "mapping",
    kind: "map",
    K: 9 /* ScalarType.STRING */,
    V: {
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
    },
  },
]);
const option = getCustomOptionMessage(method, 50007, opts)

console.log(option);
/*
 * {
 *     foo: 567, 
 *     bar: "Some string", 
 *     quux: "Oneof string",
 *     many: ["a", "b", "c"],
 *     mapping: [{key: "testKey", value: "testVal"}]
 * }
 */
```

Note that `repeated` and `map` values are only supported within a custom message option.  They are not supported as option types independently.  If you have need to use a custom option that is `repeated` or is of type `map`, it is recommended to use a message option as a wrapper.

