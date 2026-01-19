# Conformance tests on Bun

This package implements a testee for the Protocol Buffers [conformance test suite](https://github.com/protocolbuffers/protobuf/tree/main/conformance).

Node.js and npm are required to build packages from source. 

```
npm ci
npx turbo run test --filter ./bun/conformance
```
