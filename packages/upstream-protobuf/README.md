# Upstream protobuf

This package provides `protoc`, `conformance_test_runner`, related proto files, 
and feature-set defaults for editions via npm "binaries", and via an exported 
class.

To update this project to use a new version, update the version number in 
version.txt and run `make bootstrap`. This will re-generate the well-known types
from the upstream definitions, and seed the edition feature-set defaults. As a 
result, `@bufbuild/protobuf` may be modified. Run `make` to run all tests with
the updated code.
