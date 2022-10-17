Writing Plugins
========================

## Introduction

This package helps to create your own code generator plugin.  At a high level, the process is:

1.  Implement a TypeScript generator function, `generateTs`, which is used to generate TypeScript files
2.  Pass this function along with some static configuration values (and optional functions) to `createEcmaScriptPlugin` from the `@bufbuild/protoplugin` package.
3.  Create an executable file which runs your plugin.
4.  Specify this in your `package.json` file.

**NOTE**:  Plugin authors may optionally implement a JavaScript generator function, a declaration file generator function, or a transpile function for more 
fine-grained control over the generation process.  See [API](#api) for more information.

The following instructions will walk authors through the process outlined above.

### Generating Code

Generator functions are functions that are used to generate the actual file content parsed from protobuf files.  There are three that can be implemented, corresponding to the three possible target outputs for plugins:

| Target Out | Function |
| :--- | :--- |
| `ts` | [`generateTs`](#generatets) |
| `js` | [`generateJs`](#generatejs) |
| `dts` | [`generateDts`](#generatedts) |

Of the three, only [`generateTs`](#generatets) is required.  These functions will be passed as part of your plugin initialization and as the plugin runs, the framework will invoke the functions depending on which target outputs were specified by the plugin consumer.  

Since [`generateJs`](#generatejs) and [`generateDts`](#generatedts) are both optional, if they are not provided, the plugin framework will attempt to transpile your generated TypeScript files to generate any desired `js` or `dts` outputs if necessary.  See the [`PluginInit`](#plugininit) object definition for more information.

The generator functions are invoked by the plugin framework with a parameter of type [`Schema`](#schema).  This object contains the information needed to generate code.  In addition to the [`CodeGeneratorRequest`](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/compiler/plugin.proto) that is standard when working with protoc plugins, the [`Schema`](#schema) object also contains some convenience interfaces that make it a bit easier to work with the various descriptor objects.  

For example, the [`Schema`](#schema) object contains a [`files`](#files) property, which is a list of `DescFile` objects representing the files requested to be generated.  The first thing you will most likely do in your generator function is iterate over this list and issue a call to the [`generateFile`](#generatefile) function for each file object.  This will return a generated file object containing a `print` function which you can then use to "print" to the file.

Each `DescFile` object in the [`files`](#files) property contains all enums and messages needed to begin generating code:

```ts
// protoc-gen-foo-plugin.js

function generateTs(schema: Schema) {
   for (const file of schema.files) {
     const f = schema.generateFile(file.name + "_pb.ts");
  
     for (const enumeration of file.enums) {
        f.print(`// generating enums from ${file.name}`);
        ...
     }
  
     for (const message of file.messages) {
        f.print(`// generating messages from ${file.name}`);
        ...
     }
   }
}
```

#### Reading Custom Options

Protobuf-ES does not yet provide support for extensions, neither in general as pertaining to proto2 nor with custom options in proto3.  However, in the interim, there are convenience functions for retrieving any custom options specified in your .proto files.  These are provided as a temporary utility until full extension support is implemented.

For available functions, see the [custom options](#custom-options) section under **API**.


### Initializing your plugin

Once your generator functions are defined, you then need to initialize your plugin by calling `createEcmaScriptPlugin` with a plugin initialization object.  

```ts
// protoc-gen-foo-plugin.js

export const protocGenFoo = createEcmaScriptPlugin({
   name: "protoc-gen-foo",
   version: "v0.1.0",
   generateTs,
});
```

See the [`PluginInit`](#plugininit) object definition for more information.

### Create an executable file

Then, you need to create an executable file that will execute the plugin returned from the above call.  This file should be placed in `bin` without an extension and named after the plugin.  For this example, the file would reside at `bin/protoc-gen-foo`:

```js
#!/usr/bin/env node

const { runNodeJs } = require("@bufbuild/protoplugin");
const { protocGenFoo } = require("../protoc-gen-foo-plugin.js");

runNodeJs(protocGenFoo);
```

### Specify the executable

Finally, specify the path to the executable file in the `bin` property of your `package.json` file:

```js
// package.json

{
  "name": "protoc-gen-foo",
  "version": "0.1.0",
  "bin": {
    "protoc-gen-foo": "bin/protoc-gen-foo"
  },
  ...
}

```

For a complete working example of a plugin written with the framework, check out [protoc-gen-es](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoc-gen-es).


## API

Following are the definitions of relevant objects in the plugin framework.

### `PluginInit`

Type: `object`

#### `name`

**Type**: `string`

**Required**:  `Yes`

The name of your plugin.  
Most plugins are prefixed with `protoc-gen` as required by `protoc` i.e. [protoc-gen-es](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoc-gen-es).

---

#### `version`

**Type**: `string`

**Required**:  `Yes`

The version of your plugin.  
Typically, this should mirror the version specified in your package.json.

---

#### `generateTs`

**Type**: `Function`

**Required**: `Yes`

```typescript
(schema: Schema) => void;
```

The `generateTs` function will be invoked by the plugin framework, passing a [`Schema`](#schema) object which
can be used to generate TypeScript files.

---

#### `generateJs`

**Type**: `Function`

**Required**: `No`

```typescript
(schema: Schema) => void;
```

The `generateJs` function will be invoked by the plugin framework if `js` is specified as a target out
parameter.  A [`Schema`](#schema) object will be passed, containing relevant [`CodeGeneratorRequest`](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/compiler/plugin.proto) information that can be used to  generate JavaScript files.  

If this function is not provided, the plugin framework will attempt to transpile JavaScript files using a pre-configured
version of TypeScript internally.  Users can override this transpilation process by passing their own [`transpile`](#transpile) function.

---

#### `generateDts`

**Type**: `Function`

**Required**: `No`

```typescript
(schema: Schema) => void;
```

The `generateDts` function will be invoked by the plugin framework if `dts` is specified as a target out
parameter.  A [`Schema`](#schema) object will be passed, containing relevant [`CodeGeneratorRequest`](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/compiler/plugin.proto) information that can be used to 
generate declaration files.  

If this function is not provided, the plugin framework will attempt to transpile declaration files using a pre-configured
version of TypeScript internally.  Users can override this transpilation process by passing their own [`transpile`](#transpile) function.

---

#### `transpile`

**Type**: `Function`

**Required**: `No`

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
this `transpile` function are all provided, `transpile` will be ignored.

---

#### `parseOption`

**Type**: `Function`

```js
 (key: string, value: string | undefined) => void
 ```
 
Required: `No`

The optional `parseOption` function which can be used to customize the parsing of parameters passed to your plugin.
The plugin framework attempts to parse a set of pre-defined key/value pairs, but if your plugin needs to be passed additional parameters,
`parseOption` can be used to read them and act accordingly.



### `Schema`

**Type**: `object`

#### `files`

**Type**: `DescFile[]`

A list of `DescFile` objects representing the files that were asked to be generated.

---

#### `allFiles`

**Type**: `DescFile[]`

A list of `DescFile` objects representing *all* files contained in the `CodeGeneratorRequest`.

---

#### `targets`

**Type**: `Target[]`

A list of targets requested as the desired output, i.e. `ts`, `js`, `dts`.

---

#### runtime

**Type**: `RuntimeImports`

An object containing symbols from the runtime library.  Contains helpful utilities for working with nuances between runtimes of `proto2` and `proto3`.

---

#### `generateFile`

**Type**: `Function`

```typescript
(name: string): GeneratedFile;
```

This function is used to generate a new file with the given name.  The returned `GeneratedFile` can then be used to "print" information, which will
be represented as the actual file generated by the plugin.

---

#### `proto`

**Type**: `CodeGeneratorRequest`

The original [CodeGeneratorRequest](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/compiler/plugin.proto).

---

### Custom Options

Custom options can be obtained via utility functions exported by the `@bufbuild/protoplugin/ecmascript` package.  There are three functions depending on the structure of the custom option desired (scalar, message, or enum):

#### Scalar Options

Custom options of a scalar type (`boolean`, `string`, `int32`, etc.) can be retrieved via the `findCustomScalarOption` function.  It returns a type corresponding to the given `scalarType` parameter.  For example, if `ScalarType.STRING` is passed, the return type will be a `string`.  If the option is not found, it returns `undefined`.

```ts
function findCustomScalarOption<T extends ScalarType>(
  desc: AnyDesc,
  id: number,
  scalarType: T
): ScalarValue<T> | undefined;
```

##### `desc`

**Type**: `AnyDesc`

Represents any of the `DescXXX` objects such as `DescFile`, `DescEnum`, `DescMessage`, etc.

##### `id`

**Type**: `number`

The ID of the custom options field definition.

##### `scalarType`

**Type**: `<T extends ScalarType>`

The scalar type of the custom option you are searching for.  `ScalarType` is an enum that represents all possible scalar types in the Protobuf grammar

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
const msgVal = findCustomScalarOption(descMessage, 50001, ScalarType.INT32);  // 1234

const fieldVal = findCustomScalarOption(descField, 50002, ScalarType.STRING);  // "test"
```

#### Message Options

Custom options of a more complex message type can be retrieved via the `findCustomMessageOption` function.  It returns a concrete type with fields populated corresponding to the values set in the proto file.

```ts
export function findCustomMessageOption<T extends Message<T>>(
  desc: AnyDesc,
  id: number,
  msgType: MessageType<T>
): T | undefined {
```

##### `desc`

**Type**: `AnyDesc`

Represents any of the `DescXXX` objects such as `DescFile`, `DescEnum`, `DescMessage`, etc.

##### `id`

**Type**: `number`

The ID of the custom options field definition.

##### `msgType`

**Type**: `MessageType<T>`

The type of the message you are searching for.  Note that this can be a message generated from a proto file or can be a type created at runtime via `makeMessageType`.

For example, given the following proto files:

```proto
// custom_options.proto

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
```

```proto
// service.proto

import "custom_options.proto";

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

You can retrieve the options using a generated type by first generating the file which defines the custom option type.  Then, import and pass this type to the `findCustomMessageOption` function.

```ts
import { ServiceOptions } from "./gen/proto/custom_options_pb.js";

const option = findCustomMessageOption(method, 50007, ServiceOptions)

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
 
 Alternatively, you can use a type created at runtime:

```ts
const opts = proto3.makeMessageType("ServiceOptions", [
  {
    no: 1,
    name: "foo",
    kind: "scalar",
    T: ScalarType.STRING,
  },
  {
    no: 2,
    name: "bar",
    kind: "scalar",
    T: ScalarType.STRING,
  },
  {
    no: 3,
    name: "quux",
    kind: "scalar",
    T: ScalarType.STRING,
  },
  {
    no: 4,
    name: "many",
    kind: "scalar",
    repeated: true,
    T: ScalarType.STRING,
  },
  {
    no: 5,
    name: "mapping",
    kind: "map",
    K: 9 /* ScalarType.STRING */,
    V: {
      kind: "scalar",
      T: ScalarType.STRING,
    },
  },
]);
const option = findCustomMessageOption(method, 50007, opts)

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


#### Enum Options

Custom options of an enum type can be retrieved via the `findCustomEnumOption` function.  It returns a `number` corresponding to the enum value set in the option.

```ts
export function findCustomEnumOption(
  desc: AnyDesc,
  id: number
): number | undefined {
```

##### `desc`

**Type**: `AnyDesc`

Represents any of the `DescXXX` objects such as `DescFile`, `DescEnum`, `DescMessage`, etc.

##### `id`

**Type**: `number`

For example, given the following:

```proto
extend google.protobuf.MessageOptions {
  optional FooEnum foo_enum_option = 50001;
}

enum FooEnum {
  UNDEFINED = 0;
  ACTIVE = 1;
  INACTIVE = 2;
}

message FooMessage {
  option (foo_enum_option) = ACTIVE;

  string name = 1;
}
```

The value of this option can be retrieved as follows:

```ts
const enumVal = findCustomEnumOption(descMessage, 50001);  // 1
```
