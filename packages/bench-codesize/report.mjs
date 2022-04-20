import {deflateRawSync, gzipSync, brotliCompressSync} from "zlib";
import {buildSync} from "esbuild";


const protobufEs = gather("src/entry-protobuf-es.ts");
const googleProtobuf = gather("src/entry-google-protobuf.js");

process.stdout.write(`# Code size comparison

This is a simple code size comparison between protobuf-es and google-protobuf.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with protoc's [built-in JavaScript generator](https://github.com/protocolbuffers/protobuf/blob/7ecf43f0cedc4320c1cb31ba787161011b62e741/src/google/protobuf/compiler/js/js_generator.cc), 
once with \`protoc-gen-es\`. Then we bundle a [snippet of code](./src) with [esbuild](https://esbuild.github.io/),
minify the bundle, and compress it like a web server would usually do.

| code generator    | bundle size             | minified               | brotli             |
|-------------------|------------------------:|-----------------------:|-------------------:|
| protobuf-es       | ${protobufEs.size}      | ${protobufEs.minified} | ${protobufEs.brotli} |
| google-protobuf   | ${googleProtobuf.size}  | ${googleProtobuf.minified}    | ${googleProtobuf.brotli}    |
`);


function gather(entryPoint) {
    const bundle = build(entryPoint, false, "esm");
    const bundleMinified = build(entryPoint, true, "esm");
    const compressed = compress(bundleMinified);
    return {
        entryPoint,
        size: formatSize(bundle.byteLength),
        minified: formatSize(bundleMinified.byteLength),
        brotli: formatSize(compressed.brotli),
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

function compress(buf) {
    const deflate = deflateRawSync(buf, {
        info: false,
    });
    const gzip = gzipSync(buf, {
        info: false,
    });
    const brotli = brotliCompressSync(buf, {
        info: false,
    });
    return {
        deflate: deflate.byteLength,
        gzip: gzip.byteLength,
        brotli: brotli.byteLength,
    };
}

function formatSize(bytes) {
    return new Intl.NumberFormat().format(bytes) + " b";
}
