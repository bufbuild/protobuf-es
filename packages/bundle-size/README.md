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
| Protobuf-ES         |     1 |   132,962 b |  68,782 b |   15,811 b |
| Protobuf-ES         |     4 |   135,151 b |  70,289 b |   16,433 b |
| Protobuf-ES         |     8 |   137,913 b |  72,060 b |   16,996 b |
| Protobuf-ES         |    16 |   148,363 b |  80,041 b |   19,301 b |
| Protobuf-ES         |    32 |   176,154 b | 102,059 b |   24,783 b |
| protobuf-javascript |     1 |   304,887 b | 234,890 b |   35,823 b |
| protobuf-javascript |     4 |   330,904 b | 249,862 b |   37,252 b |
| protobuf-javascript |     8 |   351,698 b | 261,439 b |   38,402 b |
| protobuf-javascript |    16 |   509,673 b | 355,106 b |   45,647 b |
| protobuf-javascript |    32 | 1,276,951 b | 845,961 b |   75,389 b |

<!-- TABLE-END -->

</details>
