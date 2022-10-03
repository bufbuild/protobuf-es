# @bufbuild/protoplugin

## Introduction

This package helps to create your own code generator plugin.  The overall process involves a series of xx steps:

## Usage

The entire process involves calling the `createEcmaScriptPlugin` function located in the `@bufbuild/protoplugin` package.  This function accepts a single `PluginInit` object, which details the various attributes of your plugin.  An example invocation looks as follows:

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

## API

```typescript
createEcmaScriptPlugin(init: PluginInit): Plugin
```

### PluginInit

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
parameter.  A `Schema` object will be passed, containing relevant `CodeGeneratorRequest` information that can be used to 
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




For a working example of a plugin written with the framework, check out [protoc-gen-es](https://github.com/bufbuild/protobuf-es/packages/protoc-gen-es).
