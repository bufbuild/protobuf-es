# Code size comparison

This is a simple code size comparison between Protobuf-ES and google-protobuf.

We are generating code for the module [buf.build/googleapis/googleapis](https://buf.build/googleapis/googleapis)
once with `protoc-gen-js` from [github.com/protocolbuffers/protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript),
once with `protoc-gen-es` from Protobuf-ES. Then we bundle a [snippet of code that imports from one generated file](./src/gen/protobuf-es/entry-1.ts)
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress it like a web server would
usually do. We repeat this for an increasing number of files.

![chart](./chart.svg)

<details><summary>Tabular data</summary>

<!-- TABLE-START -->

| code generator      | files | bundle size |  minified | compressed |
| ------------------- | ----: | ----------: | --------: | ---------: |
| Protobuf-ES         |     1 |   136,704 b |  67,925 b |   16,050 b |
| Protobuf-ES         |     4 |   138,893 b |  69,429 b |   16,694 b |
| Protobuf-ES         |     8 |   141,651 b |  71,200 b |   17,177 b |
| Protobuf-ES         |    16 |   152,085 b |  79,185 b |   19,484 b |
| Protobuf-ES         |    32 |   179,872 b | 101,208 b |   25,023 b |
| protobuf-javascript |     1 |   314,172 b | 244,057 b |   36,091 b |
| protobuf-javascript |     4 |   340,189 b | 259,029 b |   37,458 b |
| protobuf-javascript |     8 |   360,983 b | 270,606 b |   38,596 b |
| protobuf-javascript |    16 |   518,958 b | 363,997 b |   45,717 b |
| protobuf-javascript |    32 | 1,286,266 b | 854,428 b |   75,520 b |

<!-- TABLE-END -->

</details>
