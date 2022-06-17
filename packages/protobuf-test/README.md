# Tests

This package provides test coverage for @bufbuild/protobuf with Jest. 

We also generate code for many of the unit test proto files that are part of 
github.com/protocolbuffers/protobuf. They cover many edge cases for both code 
generation and serialization.

Most tests are run several times, once with the generated TypeScript code, 
once with the generated JavaScript code, and with a message type that is 
created at runtime from a file descriptor set.

We use target es2017 to compile the tests, even though we use BigInt literals,
which require es2020. We do that to ensure that @bufbuild/protobuf can be used 
with the lower target. 
