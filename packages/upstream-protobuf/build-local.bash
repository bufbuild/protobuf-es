#!/usr/bin/env bash

set -eo pipefail

# Locally build protoc and conformance_test_runner.
# We highly recommend to use Bazelisk to manage Bazel installations.
# If you are on Apple M1 and see the error `symbol not found in flat namespace (_CFRelease)`,
# you may need to install XCode from the Apple App Store.

GOOGLE_PROTOBUF_VERSION=24.4
export USE_BAZEL_VERSION=6.4.0
TMP=".tmp/local${GOOGLE_PROTOBUF_VERSION}"

# Download full release
mkdir -p "${TMP}"
curl -L "https://github.com/protocolbuffers/protobuf/releases/download/v${GOOGLE_PROTOBUF_VERSION}/protobuf-${GOOGLE_PROTOBUF_VERSION}.tar.gz" > "${TMP}/protobuf.tar.gz"
tar -xzf "${TMP}/protobuf.tar.gz" -C "${TMP}/"
rm -rf "${TMP}/protobuf"
mv "${TMP}/protobuf-${GOOGLE_PROTOBUF_VERSION}" "${TMP}/protobuf"

# Build protoc and conformance_test_runner
cd "${TMP}/protobuf"
bazel build test_messages_proto3_cc_proto conformance:conformance_proto conformance:conformance_test conformance:conformance_test_runner
bazel build protoc

bazel-bin/protoc --version
bazel-bin/conformance/conformance_test_runner --version
