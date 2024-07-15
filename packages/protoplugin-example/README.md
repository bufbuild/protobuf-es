# Protoplugin example

This example shows how to write a custom plugin. It generates [Twirp](https://twitchtv.github.io/twirp/docs/spec_v7.html)
clients from service definitions in Protobuf files.

## Run the example

You need [Node](https://nodejs.org/en/download/) version 18.17.0 or later installed.
Download the example project and install its dependencies:

```shell
curl -L https://github.com/bufbuild/protobuf-es/archive/refs/heads/main.zip > protobuf-es-main.zip
unzip protobuf-es-main.zip 'protobuf-es-main/packages/protoplugin-example/*'

cd protobuf-es-main/packages/protoplugin-example
npm install
```

To see the client in action:

```shell
npm start
```

Open http://127.0.0.1:3000/ in your browser.

To re-generate code:

```shell
npx buf generate buf.build/connectrpc/eliza
```

This will generate the [Eliza module](https://buf.build/connectrpc/eliza) from the Buf Schema Registry (BSR).
You can change this path to generate additional files locally or from the BSR.

Test the generated code:

```shell
npm test
```

## About this example

This example is a starting point—we encourage you to try it out and experiment.

Take a look at the code generation logic in [protoc-gen-twirp-es.ts](./src/protoc-gen-twirp-es.ts),
and at [buf.gen.yaml](./buf.gen.yaml) to see how it's invoked.
