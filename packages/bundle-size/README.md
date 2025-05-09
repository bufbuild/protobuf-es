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
| Protobuf-ES         |     1 |   128,579 b |  66,681 b |   15,401 b |
| Protobuf-ES         |     4 |   130,768 b |  68,189 b |   16,142 b |
| Protobuf-ES         |     8 |   133,530 b |  69,960 b |   16,659 b |
| Protobuf-ES         |    16 |   143,980 b |  77,941 b |   18,987 b |
| Protobuf-ES         |    32 |   171,771 b |  99,959 b |   24,411 b |
| protobuf-javascript |     1 |   104,048 b |  70,320 b |   15,540 b |
| protobuf-javascript |     4 |   130,537 b |  85,672 b |   16,956 b |
| protobuf-javascript |     8 |   152,429 b |  98,044 b |   18,138 b |
| protobuf-javascript |    16 |   311,454 b | 192,883 b |   25,460 b |
| protobuf-javascript |    32 | 1,070,891 b | 679,723 b |   54,904 b |

<!-- TABLE-END -->

</details>
