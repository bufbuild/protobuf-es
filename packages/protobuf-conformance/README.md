# Conformance tests

This package implements a testee for the protocol buffers [conformance test 
suite](https://github.com/protocolbuffers/protobuf/tree/main/conformance) to 
ensure completeness and correctness of the implementation. 

If you would like to know how it stacks up compared to other implementations, 
please take a look at the [protobuf-conformance repository](https://github.com/bufbuild/protobuf-conformance).


Note: To cover the code path for our string-based fallback for 64-bit integers, 
the conformance tests should be run with the environment variable 
`BUF_BIGINT_DISABLE=1`, which disables our BigInt feature detection. 
