# Code size comparison

This is a simple code size comparison between protobuf-es and google-protobuf.

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
| Protobuf-ES         |     1 |   126,123 b |  65,653 b |   15,258 b |
| Protobuf-ES         |     4 |   128,312 b |  67,161 b |   15,970 b |
| Protobuf-ES         |     8 |   131,074 b |  68,932 b |   16,481 b |
| Protobuf-ES         |    16 |   141,524 b |  76,913 b |   18,797 b |
| Protobuf-ES         |    32 |   169,315 b |  98,931 b |   24,268 b |
| protobuf-javascript |     1 |   334,193 b | 255,820 b |   42,481 b |
| protobuf-javascript |     4 |   360,861 b | 271,092 b |   43,912 b |
| protobuf-javascript |     8 |   382,904 b | 283,409 b |   45,038 b |
| protobuf-javascript |    16 |   542,945 b | 378,100 b |   52,204 b |
| protobuf-javascript |    32 | 1,235,469 b | 819,610 b |   78,780 b |

<!-- TABLE-END -->

</details>
