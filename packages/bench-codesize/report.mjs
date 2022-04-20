import {buildSync} from "esbuild";
import {execSync} from "child_process";
import {readFileSync, unlinkSync, writeFileSync} from "fs";


const protobufEs = gather("src/entry-protobuf-es.ts");
const googleProtobuf = gather("src/entry-google-protobuf.js");

process.stdout.write(`# Code size comparison

This is a simple code size comparison between protobuf-es and google-protobuf.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with protoc's [built-in JavaScript generator](https://github.com/protocolbuffers/protobuf/blob/7ecf43f0cedc4320c1cb31ba787161011b62e741/src/google/protobuf/compiler/js/js_generator.cc), 
once with \`protoc-gen-es\`. Then we bundle a [snippet of code](./src) with [esbuild](https://esbuild.github.io/),
minify the bundle, and compress it like a web server would usually do.

| code generator    | bundle size             | minified               | compressed         |
|-------------------|------------------------:|-----------------------:|-------------------:|
| protobuf-es       | ${protobufEs.size}      | ${protobufEs.minified} | ${protobufEs.compressed} |
| google-protobuf   | ${googleProtobuf.size}  | ${googleProtobuf.minified} | ${googleProtobuf.compressed} |
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

function compress(buf) {
    const tempIn = ".tmpin";
    const tempOut = ".tmpout";
    writeFileSync(tempIn, buf);
    execSync(`gzip --no-name -6 --stdout ${tempIn} >${tempOut}`, {
        encoding: "buffer",
    });
    const res = readFileSync(tempOut);
    unlinkSync(tempIn);
    unlinkSync(tempOut);
    return res;
}

function formatSize(bytes) {
    return new Intl.NumberFormat().format(bytes) + " b";
}
