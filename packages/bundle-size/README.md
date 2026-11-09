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
| Protobuf-ES         |     1 |   136,798 b |  68,003 b |   16,041 b |
| Protobuf-ES         |     4 |   138,987 b |  69,507 b |   16,697 b |
| Protobuf-ES         |     8 |   141,745 b |  71,278 b |   17,220 b |
| Protobuf-ES         |    16 |   152,179 b |  79,263 b |   19,507 b |
| Protobuf-ES         |    32 |   179,966 b | 101,286 b |   24,934 b |
| protobuf-javascript |     1 |   316,830 b | 245,787 b |   36,226 b |
| protobuf-javascript |     4 |   342,847 b | 260,759 b |   37,632 b |
| protobuf-javascript |     8 |   363,641 b | 272,336 b |   38,713 b |
| protobuf-javascript |    16 |   521,616 b | 365,727 b |   45,977 b |
| protobuf-javascript |    32 | 1,293,833 b | 859,254 b |   75,983 b |

<!-- TABLE-END -->

</details>
