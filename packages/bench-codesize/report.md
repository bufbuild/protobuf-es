# Code size comparison

This is a simple code size comparison between Connect-Web and gRPC-web.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with protoc's [built-in JavaScript generator](https://github.com/protocolbuffers/protobuf/blob/7ecf43f0cedc4320c1cb31ba787161011b62e741/src/google/protobuf/compiler/js/js_generator.cc), 
once with `protoc-gen-es`. Then we bundle a snipped of code with [esbuild](https://esbuild.github.io/),
minify the bundle, and compress it like a web server would usually do.

| code generator                         | bundle size        | minified               | gzip               |
|----------------------------------------|-------------------:|-----------------------:|-------------------:|
| [protobuf-es](src/entry-protobuf-es.ts) | 159,893 b | 86,189 b | 17,623 b |
| [google-protobuf](src/entry-google-protobuf.js)       | 368,167 b    | 270,731 b    | 51,068 b    |
