# Code size comparison

This is a simple code size comparison between protobuf-es and google-protobuf.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with `protoc-gen-js` from [github.com/protocolbuffers/protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript), 
once with `protoc-gen-es` from Protobuf-ES. Then we bundle a [snippet of code](./src) 
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress it like a web 
server would usually do.

| code generator      | bundle size             | minified               | compressed         |
|---------------------|------------------------:|-----------------------:|-------------------:|
| protobuf-es         | 87,781 b      | 37,518 b | 9,782 b |
| protobuf-javascript | 394,384 b  | 288,761 b | 45,123 b |
