# Protoplugin Example

This directory contains an example plugin, which shows how to work with the 
plugin framework.  It also contains a separate webpage which shows the generated files working with a remote server.

The code generation logic for the actual plugin is located in [`protoc-gen-twirp-es.ts`](src/protoc-gen-twirp-es.ts).

The sample plugin generates a [Twirp](https://twitchtv.github.io/twirp/docs/spec_v7.html) client from service definitions in Protobuf files.  The Twirp client uses base types generated from [`@bufbuild/protobuf-es`](https://www.npmjs.com/package/@bufbuild/protoc-gen-es).

From the project root, first install and build all required packages:

```shell
npm install -w packages/protoplugin-example
npm run -w packages/protobuf build
npm run -w packages/protoplugin build
npm run -w packages/protoc-gen-es build
```

Next, `cd` into the example directory and build:

```shell
cd packages/protoplugin-example
npm run build
```

To run the plugin (i.e. generate files):

`npm run buf:generate`

To run the example webpage and see the generated code in action:

`npm run start`
