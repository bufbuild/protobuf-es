# Upstream protobuf

This internal package provides auxiliary Protobuf files and functions from the
upstream repository https://github.com/protocolbuffers/protobuf.

The class `UpstreamProtobuf` provides methods to compile a file descriptor set,
features-set defaults, and code-generator requests. Protobuf files can be
retrieved with the npm binaries `upstream-files` and `upstream-include`.

The upstream version is picked up from shelling out to `protoc --version`.

To update this project to use a new version, install the corresponding version
of the `protoc` and `protobuf-conformance` packages. Run `npx turbo run bootstrap -F ./packages/protobuf`.
This will  re-generate the well-known types from the upstream definitions, and
seed the edition feature-set defaults. As a result, `@bufbuild/protobuf` may
be modified. Run `npx turbo run test` to run all tests with the updated code.
