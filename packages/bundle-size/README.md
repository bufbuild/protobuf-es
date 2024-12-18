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
| Protobuf-ES         |     1 |   126,701 b |  65,774 b |   15,261 b |
| Protobuf-ES         |     4 |   128,890 b |  67,282 b |   15,950 b |
| Protobuf-ES         |     8 |   131,652 b |  69,053 b |   16,483 b |
| Protobuf-ES         |    16 |   142,102 b |  77,034 b |   18,801 b |
| Protobuf-ES         |    32 |   169,893 b |  99,052 b |   24,273 b |
| protobuf-javascript |     1 |   104,048 b |  70,318 b |   15,474 b |
| protobuf-javascript |     4 |   130,537 b |  85,670 b |   16,986 b |
| protobuf-javascript |     8 |   152,429 b |  98,042 b |   18,111 b |
| protobuf-javascript |    16 |   311,454 b | 192,881 b |   25,504 b |
| protobuf-javascript |    32 | 1,070,891 b | 679,746 b |   54,963 b |

<!-- TABLE-END -->

</details>
