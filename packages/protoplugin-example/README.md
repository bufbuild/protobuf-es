# Protoplugin Example

This directory contains an example plugin, which shows how to work with the 
plugin framework.  It also contains a separate webpage which shows the generated files working with a remote server.

The code generation logic for the actual plugin is located in the following files:

- `protoc-gen-twirp-es.ts`
- `typescript.ts`

The sample plugin generates a [Twirp](https://twitchtv.github.io/twirp/docs/spec_v7.html) client from service 
definitions in Protobuf files.  The Twirp client uses base types generated from `protobuf-es`.

To build the plugin:

`npm run build`

To run the example webpage and see the generated code in action:

`npm run start`
