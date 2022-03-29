# Tests

This package provides test coverage for @bufbuild/protobuf with Jest. 

We also generate code for many of the unit test proto files that are part of 
github.com/protocolbuffers/protobuf. They cover many edge cases for both code 
generation and serialization.

Most tests are run twice, once with the generated code, once with a type that 
is created at run time from a file descriptor set.
