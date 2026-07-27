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
| Protobuf-ES         |     1 |   137,653 b |  70,628 b |   16,332 b |
| Protobuf-ES         |     4 |   139,842 b |  72,138 b |   16,998 b |
| Protobuf-ES         |     8 |   142,604 b |  73,909 b |   17,511 b |
| Protobuf-ES         |    16 |   153,054 b |  81,890 b |   19,891 b |
| Protobuf-ES         |    32 |   180,845 b | 103,905 b |   25,379 b |
| protobuf-javascript |     1 |   314,172 b | 244,057 b |   36,091 b |
| protobuf-javascript |     4 |   340,189 b | 259,029 b |   37,458 b |
| protobuf-javascript |     8 |   360,983 b | 270,606 b |   38,596 b |
| protobuf-javascript |    16 |   518,958 b | 363,997 b |   45,717 b |
| protobuf-javascript |    32 | 1,286,266 b | 854,428 b |   75,520 b |

<!-- TABLE-END -->

</details>
