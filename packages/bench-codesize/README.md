# Code size comparison

This is a simple code size comparison between protobuf-es and google-protobuf.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with protoc's [built-in JavaScript generator](https://github.com/protocolbuffers/protobuf/blob/7ecf43f0cedc4320c1cb31ba787161011b62e741/src/google/protobuf/compiler/js/js_generator.cc), 
once with `protoc-gen-es`. Then we bundle a [snippet of code](./src) with [esbuild](https://esbuild.github.io/),
minify the bundle, and compress it like a web server would usually do.

| code generator    | bundle size             | minified               | compressed         |
|-------------------|------------------------:|-----------------------:|-------------------:|
| protobuf-es       | 160,617 b      | 86,421 b | 15,136 b |
| google-protobuf   | 368,034 b  | 270,748 b | 43,704 b |
