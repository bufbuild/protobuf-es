# Code size comparison

This is a simple code size comparison between protobuf-es and google-protobuf.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with `protoc-gen-js` from [github.com/protocolbuffers/protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript),
once with `protoc-gen-es` from Protobuf-ES. Then we bundle a [snippet of code that imports from one generated file](./src/gen/protobuf-es/entry-1.ts)
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress it like a web server would
usually do. We repeat this for an increasing number of files.

![chart](./chart.svg)

<details><summary>Tabular data< /summary>

<!-- TABLE-START -->

| code generator      | files | bundle size |  minified | compressed |
| ------------------- | ----: | ----------: | --------: | ---------: |
| protobuf-es         |     1 |   125,833 b |  65,603 b |   15,257 b |
| protobuf-es         |     4 |   128,022 b |  67,111 b |   15,948 b |
| protobuf-es         |     8 |   130,784 b |  68,882 b |   16,433 b |
| protobuf-es         |    16 |   141,234 b |  76,863 b |   18,756 b |
| protobuf-es         |    32 |   169,025 b |  98,881 b |   24,210 b |
| protobuf-javascript |     1 |   339,613 b | 255,820 b |   42,481 b |
| protobuf-javascript |     4 |   366,281 b | 271,092 b |   43,912 b |
| protobuf-javascript |     8 |   388,324 b | 283,409 b |   45,038 b |
| protobuf-javascript |    16 |   548,365 b | 378,100 b |   52,204 b |
| protobuf-javascript |    32 | 1,240,889 b | 819,610 b |   78,780 b |

<!-- TABLE-END -->

</details>
