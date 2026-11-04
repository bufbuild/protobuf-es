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
| Protobuf-ES         |     1 |   136,704 b |  67,925 b |   16,015 b |
| Protobuf-ES         |     4 |   138,893 b |  69,429 b |   16,654 b |
| Protobuf-ES         |     8 |   141,651 b |  71,200 b |   17,242 b |
| Protobuf-ES         |    16 |   152,085 b |  79,185 b |   19,513 b |
| Protobuf-ES         |    32 |   179,872 b | 101,208 b |   24,995 b |
| protobuf-javascript |     1 |   316,830 b | 245,787 b |   36,226 b |
| protobuf-javascript |     4 |   342,847 b | 260,759 b |   37,632 b |
| protobuf-javascript |     8 |   363,641 b | 272,336 b |   38,713 b |
| protobuf-javascript |    16 |   521,616 b | 365,727 b |   45,977 b |
| protobuf-javascript |    32 | 1,293,833 b | 859,254 b |   75,983 b |

<!-- TABLE-END -->

</details>
