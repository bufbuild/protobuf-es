# Code size comparison

This is a simple code size comparison between protobuf-es and google-protobuf.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with `protoc-gen-js` from [github.com/protocolbuffers/protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript), 
once with `protoc-gen-es` from Protobuf-ES. Then we bundle a [snippet of code](./src) 
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress it like a web 
server would usually do.

| code generator      | bundle size             | minified               | compressed         |
|---------------------|------------------------:|-----------------------:|-------------------:|
| protobuf-es         | 73,175 b      | 36,430 b | 9,481 b |
| protobuf-javascript | 368,088 b  | 270,868 b | 43,782 b |
