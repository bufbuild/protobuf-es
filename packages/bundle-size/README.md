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
| Protobuf-ES         |     1 |   132,341 b |  68,489 b |   15,756 b |
| Protobuf-ES         |     4 |   134,530 b |  69,996 b |   16,428 b |
| Protobuf-ES         |     8 |   137,292 b |  71,767 b |   16,932 b |
| Protobuf-ES         |    16 |   147,742 b |  79,748 b |   19,320 b |
| Protobuf-ES         |    32 |   175,533 b | 101,766 b |   24,771 b |
| protobuf-javascript |     1 |   304,940 b | 235,014 b |   35,843 b |
| protobuf-javascript |     4 |   330,957 b | 249,986 b |   37,225 b |
| protobuf-javascript |     8 |   351,751 b | 261,563 b |   38,385 b |
| protobuf-javascript |    16 |   509,726 b | 355,230 b |   45,599 b |
| protobuf-javascript |    32 | 1,277,004 b | 846,085 b |   75,291 b |

<!-- TABLE-END -->

</details>
