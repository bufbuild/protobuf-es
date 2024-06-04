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
| protobuf-es | 1 | 123,350 b | 64,136 b | 14,970 b |
| protobuf-es | 4 | 125,545 b | 65,646 b | 15,662 b |
| protobuf-es | 8 | 128,323 b | 67,417 b | 16,196 b |
| protobuf-es | 16 | 138,831 b | 75,398 b | 18,504 b |
| protobuf-es | 32 | 166,726 b | 97,413 b | 23,953 b |
| protobuf-javascript | 1 | 339,613 b | 255,820 b | 42,481 b |
| protobuf-javascript | 4 | 366,281 b | 271,092 b | 43,912 b |
| protobuf-javascript | 8 | 388,324 b | 283,409 b | 45,038 b |
| protobuf-javascript | 16 | 548,365 b | 378,100 b | 52,204 b |
| protobuf-javascript | 32 | 1,240,889 b | 819,610 b | 78,780 b |
<!--- TABLE-END -->

</details>
