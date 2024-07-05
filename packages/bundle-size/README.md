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
| protobuf-es         |     1 |   125,898 b |  65,644 b |   15,266 b |
| protobuf-es         |     4 |   128,087 b |  67,152 b |   15,927 b |
| protobuf-es         |     8 |   130,849 b |  68,923 b |   16,445 b |
| protobuf-es         |    16 |   141,299 b |  76,904 b |   18,751 b |
| protobuf-es         |    32 |   169,090 b |  98,922 b |   24,258 b |
| protobuf-javascript |     1 |   334,193 b | 255,820 b |   42,481 b |
| protobuf-javascript |     4 |   360,861 b | 271,092 b |   43,912 b |
| protobuf-javascript |     8 |   382,904 b | 283,409 b |   45,038 b |
| protobuf-javascript |    16 |   542,945 b | 378,100 b |   52,204 b |
| protobuf-javascript |    32 | 1,235,469 b | 819,610 b |   78,780 b |

<!-- TABLE-END -->

</details>
