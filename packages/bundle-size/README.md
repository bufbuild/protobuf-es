# Code size comparison

This is a simple code size comparison between protobuf-es and google-protobuf.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with `protoc-gen-js` from [github.com/protocolbuffers/protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript), 
once with `protoc-gen-es` from Protobuf-ES. Then we bundle a [snippet of code that imports from one generated file](./src/gen/protobuf-es/entry-1.ts) 
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress it like a web server would 
usually do. We repeat this for an increasing number of files.

![chart](./chart.svg)


<details><summary>Tabular data</summary>

<!--- TABLE-START -->
| code generator  | files    | bundle size             | minified               | compressed         |
|-----------------|----------|------------------------:|-----------------------:|-------------------:|
| protobuf-es | 1 | 123,186 b | 64,107 b | 14,974 b |
| protobuf-es | 4 | 125,381 b | 65,617 b | 15,629 b |
| protobuf-es | 8 | 128,159 b | 67,388 b | 16,151 b |
| protobuf-es | 16 | 138,667 b | 75,369 b | 18,492 b |
| protobuf-es | 32 | 166,562 b | 97,384 b | 23,923 b |
| protobuf-javascript | 1 | 339,613 b | 255,820 b | 42,481 b |
| protobuf-javascript | 4 | 366,281 b | 271,092 b | 43,912 b |
| protobuf-javascript | 8 | 388,324 b | 283,409 b | 45,038 b |
| protobuf-javascript | 16 | 548,365 b | 378,100 b | 52,204 b |
| protobuf-javascript | 32 | 1,240,889 b | 819,610 b | 78,780 b |
<!--- TABLE-END -->

</details>
