---
title: Examples
---

These examples show Protobuf-ES beyond the first message: size-delimited streams, custom code generation, `Any`, registries, custom options, and reflection. Start with [Getting started](/getting-started/) if you have not generated code yet.

## Runnable packages

- [Node message store](/examples/node-message-store/): a Node application that writes multiple Protobuf messages to a binary file and reads them back as a stream. Based on [`packages/protobuf-example`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example).
- [Twirp plugin](/examples/twirp-plugin/): a custom plugin that generates TypeScript clients from Protobuf service definitions. Based on [`packages/protoplugin-example`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoplugin-example).

## Patterns

- [Any with registries](/examples/any-registry/): pack messages into `google.protobuf.Any` and unpack them when only a registry is available.
- [Custom option redaction](/examples/custom-options-redaction/): define a field option and use reflection to clear annotated fields.
