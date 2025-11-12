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
| Protobuf-ES         |     1 |   132,946 b |  68,756 b |   15,807 b |
| Protobuf-ES         |     4 |   135,135 b |  70,263 b |   16,491 b |
| Protobuf-ES         |     8 |   137,897 b |  72,034 b |   17,016 b |
| Protobuf-ES         |    16 |   148,347 b |  80,015 b |   19,359 b |
| Protobuf-ES         |    32 |   176,138 b | 102,033 b |   24,779 b |
| protobuf-javascript |     1 |   304,940 b | 235,014 b |   35,843 b |
| protobuf-javascript |     4 |   330,957 b | 249,986 b |   37,225 b |
| protobuf-javascript |     8 |   351,751 b | 261,563 b |   38,385 b |
| protobuf-javascript |    16 |   509,726 b | 355,230 b |   45,599 b |
| protobuf-javascript |    32 | 1,277,004 b | 846,085 b |   75,291 b |

<!-- TABLE-END -->

</details>
