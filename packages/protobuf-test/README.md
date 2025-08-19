# Tests for @bufbuild/protobuf

This package provides test coverage for `@bufbuild/protobuf` with the Node.js 
built-in test runner.

We also generate code for many of the unit test Protobuf files that are part of
`github.com/protocolbuffers/protobuf`. They cover many edge cases for both code
generation and serialization.

Many test cases are run several times, once with the generated TypeScript code,
once with the generated JavaScript code, and once with types created at runtime
from a file descriptor set.

To cover the code path for our string-based fallback for 64-bit integers, the
entire suite should be run with the environment variable
`BUF_BIGINT_DISABLE=1`, which disables our BigInt feature detection.
