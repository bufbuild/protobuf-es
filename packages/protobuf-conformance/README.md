# Conformance tests

This package implements a testee for the protocol buffers [conformance test 
suite](https://github.com/protocolbuffers/protobuf/tree/main/conformance).

The conformance tests run on code transpiled to ECMAScript modules.

To cover the code path for our string-based fallback for 64-bit integers, the
conformance tests should be run with the environment variable 
`BUF_BIGINT_DISABLE=1`, which disables our BigInt feature detection. 
