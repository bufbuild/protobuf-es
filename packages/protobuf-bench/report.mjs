// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { buildSync } from "esbuild";
import { compress } from "brotli";

const protobufEs = gather("src/entry-protobuf-es.ts");
const googleProtobuf = gather("src/entry-google-protobuf.js");

process.stdout.write(`# Code size comparison

This is a simple code size comparison between protobuf-es and google-protobuf.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with \`protoc-gen-js\` from [github.com/protocolbuffers/protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript), 
once with \`protoc-gen-es\` from Protobuf-ES. Then we bundle a [snippet of code](./src) 
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress it like a web 
server would usually do.

| code generator      | bundle size             | minified               | compressed         |
|---------------------|------------------------:|-----------------------:|-------------------:|
| protobuf-es         | ${protobufEs.size}      | ${protobufEs.minified} | ${protobufEs.compressed} |
| protobuf-javascript | ${googleProtobuf.size}  | ${googleProtobuf.minified} | ${googleProtobuf.compressed} |
`);

function gather(entryPoint) {
  const bundle = build(entryPoint, false, "esm");
  const bundleMinified = build(entryPoint, true, "esm");
  const compressed = compress(bundleMinified);
  return {
    entryPoint,
    size: formatSize(bundle.byteLength),
    minified: formatSize(bundleMinified.byteLength),
    compressed: formatSize(compressed.byteLength),
  };
}

function build(entryPoint, minify, format) {
  const result = buildSync({
    entryPoints: [entryPoint],
    bundle: true,
    format: format,
    treeShaking: true,
    minify: minify,
    write: false,
  });
  if (result.outputFiles.length !== 1) {
    throw new Error();
  }
  return result.outputFiles[0].contents;
}

function formatSize(bytes) {
  return new Intl.NumberFormat().format(bytes) + " b";
}
