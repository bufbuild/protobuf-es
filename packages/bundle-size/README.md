# Code size comparison

This is a simple code size comparison between Protobuf-ES and google-protobuf.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with `protoc-gen-js` from [github.com/protocolbuffers/protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript),
once with `protoc-gen-es` from Protobuf-ES. Then we bundle a [snippet of code that imports from one generated file](./src/gen/protobuf-es/entry-1.ts)
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress it like a web server would
usually do. We repeat this for an increasing number of files.

![chart](./chart.svg)

<details><summary>Tabular data</summary>

<!-- TABLE-START -->

| code generator      | files | bundle size |  minified | compressed |
| ------------------- | ----: | ----------: | --------: | ---------: |
| Protobuf-ES         |     1 |   125,855 b |  65,617 b |   15,259 b |
| Protobuf-ES         |     4 |   128,044 b |  67,125 b |   15,961 b |
| Protobuf-ES         |     8 |   130,806 b |  68,896 b |   16,468 b |
| Protobuf-ES         |    16 |   141,256 b |  76,877 b |   18,761 b |
| Protobuf-ES         |    32 |   169,047 b |  98,895 b |   24,249 b |
| protobuf-javascript |     1 |   334,193 b | 255,820 b |   42,481 b |
| protobuf-javascript |     4 |   360,861 b | 271,092 b |   43,912 b |
| protobuf-javascript |     8 |   382,904 b | 283,409 b |   45,038 b |
| protobuf-javascript |    16 |   542,945 b | 378,100 b |   52,204 b |
| protobuf-javascript |    32 | 1,235,469 b | 819,610 b |   78,780 b |

<!-- TABLE-END -->

</details>
