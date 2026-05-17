---
title: Examples
---

Start with [Getting started](/getting-started/) if you have not generated code yet. The examples here either point to runnable packages in this repository or expand a pattern from the reference docs into a copyable recipe.

## Runnable examples

- [Node message store](/examples/node-message-store/): Based on [`packages/protobuf-example`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example). Write multiple Protobuf messages to a binary file and read them back as a stream.
- [Twirp plugin](/examples/twirp-plugin/): Based on [`packages/protoplugin-example`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoplugin-example). Generate TypeScript clients from Protobuf service definitions.

## Recipes

These are smaller docs examples, not separate packages in the repository.

- [Any with registries](/examples/any-registry/): Pack messages into `google.protobuf.Any` and unpack them when only a registry is available.
- [Custom option redaction](/examples/custom-options-redaction/): Define a field option and use reflection to redact annotated fields.

## Related projects

- [Connect-ES](https://github.com/connectrpc/connect-es): RPC support built on Protobuf-ES service descriptors.
- [Protovalidate-ES](https://github.com/bufbuild/protovalidate-es): Validation for Protobuf messages, with a [Valid types example](https://github.com/bufbuild/protovalidate-es/tree/main/packages/example#valid-types).
