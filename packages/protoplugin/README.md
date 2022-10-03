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

#### generateJs

Type: `Function`
Optional: `True`

```typescript
(schema: Schema) => void;
```

The `generateJs` function is a function which will be invoked by the plugin framework, passing a `Schema` object which
can be used to generate JavaScript files.  

#### generateDts

Type: `Function`
Optional: `True`

```typescript
(schema: Schema) => void;
```

The `generateDts` function is a function which will be invoked by the plugin framework, passing a `Schema` object which
can be used to generate TypeScript declaration files.  

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
