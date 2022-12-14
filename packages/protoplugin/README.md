# @bufbuild/protoplugin

This package helps to create your own code generator plugin using the 
Protobuf-ES plugin framework.

**Protobuf-ES** is a complete implementation of [Protocol Buffers](https://developers.google.com/protocol-buffers) in TypeScript, suitable for web browsers and Node.js.  

In addition to a full Protobuf runtime library, it also provides a code generator
[`protoc-gen-es`](https://www.npmjs.com/package/@bufbuild/protoc-gen-es), which utilizes a plugin framework to generate base types from
your Protobuf schema.  It is fully compatible with both Buf and protoc compilers.

And now, you can write your own **Protobuf-ES** compatible plugins using this same
plugin framework with the `@bufbuild/protoplugin` package.

With `@bufbuild/protoplugin`, you can generate your own TypeScript code tailored 
to your project or needs.  You also have various options for producing 
JavaScript and TypeScript declaration files:

- Exercise full control by writing your own JavaScript and declaration file
generators in addition to TypeScript.

- Generate TypeScript files only and let the framework generate JavaScript and
declaration files automatically using our internal TypeScript compiler.

- Generate TypeScript files only and bring your own TypeScript compiler, using
it to generate JavaScript and declaration files with your own version of 
TypeScript and your own compiler options.

With `protoplugin`, you have all the tools at your disposal to produce ECMAScript-compliant
code.  

## Usage

Get started now with our [plugin documentation](https://github.com/bufbuild/protobuf-es/blob/main/docs/writing_plugins.md). 
