# @bufbuild/protoplugin

## Introduction

This package helps to create your own code generator plugin.  The overall process involves a series of xx steps:

1. j

## Getting Started

The entire process involves calling the `createEcmaScriptPlugin` function located in the `@bufbuild/protoplugin` package.  This function accepts a single `PluginInit` object, which details the various attributes of your plugin:

```js
PluginInit {

    // The name of your plugin.  Most plugins are prefixed with `protoc-gen` as required by `protoc`.  For example, the official ECMAScript plugin which generates JavaScript, TypeScript, and declaration files is named `protoc-gen-es`.
    name: string;

    /** 
    * The version of your plugin.  Typically, this should mirror the version specified in your package.json.  
    version: string;



}
```
 k l




For a working example of a plugin written with the framework, check out [protoc-gen-es](https://github.com/bufbuild/protobuf-es/packages/protoc-gen-es).
