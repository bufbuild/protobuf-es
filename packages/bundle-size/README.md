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
| Protobuf-ES         |     1 |   126,585 b |  65,684 b |   15,268 b |
| Protobuf-ES         |     4 |   128,774 b |  67,192 b |   15,925 b |
| Protobuf-ES         |     8 |   131,536 b |  68,963 b |   16,458 b |
| Protobuf-ES         |    16 |   141,986 b |  76,944 b |   18,756 b |
| Protobuf-ES         |    32 |   169,777 b |  98,962 b |   24,290 b |
| protobuf-javascript |     1 |   104,048 b |  70,318 b |   15,474 b |
| protobuf-javascript |     4 |   130,537 b |  85,670 b |   16,986 b |
| protobuf-javascript |     8 |   152,429 b |  98,042 b |   18,111 b |
| protobuf-javascript |    16 |   311,454 b | 192,881 b |   25,504 b |
| protobuf-javascript |    32 | 1,070,891 b | 679,746 b |   54,963 b |

<!-- TABLE-END -->

</details>
