# See https://tech.davis-hansson.com/p/make/
SHELL := bash
.DELETE_ON_ERROR:
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
MAKEFLAGS += --no-print-directory
TMP   = .tmp
BIN   = .tmp/bin
BUILD = .tmp/build
GEN   = .tmp/gen
PB   =  .tmp/protobuf-$(GOOGLE_PROTOBUF_VERSION)
LICENSE_HEADER_YEAR_RANGE := 2021-2023
LICENSE_HEADER_IGNORES := .tmp\/ node_module\/ packages\/protobuf-conformance\/bin\/conformance_esm.js packages\/protobuf-conformance\/src\/gen\/ packages\/protobuf-test\/src\/gen\/ packages\/protobuf\/src\/google\/varint.ts packages\/protobuf-bench\/src\/gen\/ packages\/protobuf\/dist\/ packages\/protobuf-test\/dist\/ scripts\/ packages\/protoplugin-example/src/protoc-gen-twirp-es.ts
GOOGLE_PROTOBUF_WKT = google/protobuf/api.proto google/protobuf/any.proto google/protobuf/compiler/plugin.proto google/protobuf/descriptor.proto google/protobuf/duration.proto google/protobuf/descriptor.proto google/protobuf/empty.proto google/protobuf/field_mask.proto google/protobuf/source_context.proto google/protobuf/struct.proto google/protobuf/timestamp.proto google/protobuf/type.proto google/protobuf/wrappers.proto
GOOGLE_PROTOBUF_VERSION = 23.4
BAZEL_VERSION = 5.4.0
TS_VERSIONS = 4.1.2 4.2.4 4.3.5 4.4.4 4.5.2 4.6.4 4.7.4 4.8.4 4.9.5 5.0.4

# test

node_modules: package-lock.json
	npm ci

$(PB):
	echo $(PB)
	@mkdir -p $(TMP)
	curl -L https://github.com/protocolbuffers/protobuf/releases/download/v$(GOOGLE_PROTOBUF_VERSION)/protobuf-$(GOOGLE_PROTOBUF_VERSION).tar.gz \
		> $(TMP)/protobuf-$(GOOGLE_PROTOBUF_VERSION).tar.gz
	tar -xzf $(TMP)/protobuf-$(GOOGLE_PROTOBUF_VERSION).tar.gz -C $(TMP)/

$(BIN)/protoc: $(PB)
	@mkdir -p $(@D)
	cd $(PB) && USE_BAZEL_VERSION=$(BAZEL_VERSION) bazel build protoc
	cp -f $(PB)/bazel-bin/protoc $(@D)
	@touch $(@)

$(BIN)/conformance_test_runner: $(PB)
	@mkdir -p $(@D)
	cd $(PB) && USE_BAZEL_VERSION=$(BAZEL_VERSION) bazel build test_messages_proto3_cc_proto conformance:conformance_proto conformance:conformance_test conformance:conformance_test_runner
	cp -f $(PB)/bazel-bin/conformance/conformance_test_runner $(@D)
	@touch $(@)

$(BIN)/license-header: Makefile
	@mkdir -p $(@D)
	GOBIN=$(abspath $(BIN)) go install github.com/bufbuild/buf/private/pkg/licenseheader/cmd/license-header@v1.1.0

$(BIN)/git-ls-files-unstaged: Makefile
	@mkdir -p $(@D)
	GOBIN=$(abspath $(BIN)) go install github.com/bufbuild/buf/private/pkg/git/cmd/git-ls-files-unstaged@v1.1.0

$(BUILD)/protobuf: node_modules tsconfig.base.json packages/protobuf/tsconfig.json $(shell find packages/protobuf/src -name '*.ts')
	npm run -w packages/protobuf clean
	npm run -w packages/protobuf build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protobuf-test: $(BUILD)/protobuf $(GEN)/protobuf-test node_modules tsconfig.base.json packages/protobuf-test/tsconfig.json $(shell find packages/protobuf-test/src -name '*.ts')
	npm run -w packages/protobuf-test clean
	npm run -w packages/protobuf-test build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protoplugin: $(BUILD)/protobuf node_modules tsconfig.base.json packages/protoplugin/tsconfig.json $(shell find packages/protoplugin/src -name '*.ts')
	npm run -w packages/protoplugin clean
	npm run -w packages/protoplugin build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protoplugin-test: $(BUILD)/protoplugin $(GEN)/protoplugin-test node_modules tsconfig.base.json packages/protoplugin-test/tsconfig.json $(shell find packages/protoplugin-test/src -name '*.ts')
	npm run -w packages/protoplugin-test clean
	npm run -w packages/protoplugin-test build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protoplugin-example: $(BUILD)/protoc-gen-es packages/protoplugin-example/buf.gen.yaml node_modules tsconfig.base.json packages/protoplugin-example/tsconfig.json $(shell find packages/protoplugin-example/src -name '*.ts')
	npm run -w packages/protoplugin-example clean
	npm run -w packages/protoplugin-example generate
	npm run -w packages/protoplugin-example build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protoc-gen-es: $(BUILD)/protoplugin node_modules tsconfig.base.json packages/protoc-gen-es/tsconfig.json $(shell find packages/protoc-gen-es/src -name '*.ts')
	npm run -w packages/protoc-gen-es clean
	npm run -w packages/protoc-gen-es build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protobuf-conformance: $(GEN)/protobuf-conformance node_modules tsconfig.base.json packages/protobuf-conformance $(shell find packages/protobuf-conformance/src -name '*.ts')
	npm run -w packages/protobuf-conformance clean
	npm run -w packages/protobuf-conformance build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protobuf-example: $(BUILD)/protobuf node_modules tsconfig.base.json packages/protobuf-example/tsconfig.json $(shell find packages/protobuf-example/src -name '*.ts')
	npm run -w packages/protobuf-example clean
	npm run -w packages/protobuf-example build
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/protobuf-test: $(BIN)/protoc $(BUILD)/protoc-gen-es $(shell find packages/protobuf-test/extra -name '*.proto')
	@rm -rf packages/protobuf-test/src/gen/ts/* packages/protobuf-test/src/gen/js/* packages/protobuf-test/descriptorset.bin
	$(BIN)/protoc \
		--descriptor_set_out packages/protobuf-test/descriptorset.bin --include_imports --include_source_info \
		--plugin protoc-gen-a=packages/protoc-gen-es/bin/protoc-gen-es --a_out packages/protobuf-test/src/gen/ts --a_opt ts_nocheck=false,target=ts \
		--plugin protoc-gen-b=packages/protoc-gen-es/bin/protoc-gen-es --b_out packages/protobuf-test/src/gen/js --b_opt ts_nocheck=false,target=js+dts \
		--proto_path $(PB) --proto_path $(PB)/src -I packages/protobuf-test \
		$(shell cd packages/protobuf-test && find . -name '*.proto' | cut -sd / -f 2-) \
		$(shell cd $(PB)/src && find . -name 'unittest*.proto' | cut -sd / -f 2-) \
		google/protobuf/type.proto \
		google/protobuf/test_messages_proto2.proto \
		google/protobuf/test_messages_proto3.proto
	$(BIN)/protoc \
		--plugin protoc-gen-a=packages/protoc-gen-es/bin/protoc-gen-es --a_out packages/protobuf-test/src/gen/ts --a_opt ts_nocheck=false,target=ts \
		--plugin protoc-gen-b=packages/protoc-gen-es/bin/protoc-gen-es --b_out packages/protobuf-test/src/gen/js --b_opt ts_nocheck=false,target=js+dts \
		--proto_path $(PB)/src \
		$(GOOGLE_PROTOBUF_WKT)
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/protoplugin-test: $(BUILD)/protoc-gen-es $(shell find packages/protoplugin-test/proto -name '*.proto')
	@rm -rf packages/protoplugin-test/src/gen/* packages/protoplugin-test/descriptorset.bin
	@npm run -w packages/protoplugin-test buf:build
	@npm run -w packages/protoplugin-test generate

$(GEN)/protobuf-conformance: $(BIN)/protoc $(BUILD)/protoc-gen-es Makefile
	@rm -rf packages/protobuf-conformance/src/gen/*
	$(BIN)/protoc --plugin packages/protoc-gen-es/bin/protoc-gen-es --es_out packages/protobuf-conformance/src/gen --es_opt ts_nocheck=false,target=ts \
		--proto_path $(PB) --proto_path $(PB)/src \
		conformance/conformance.proto \
		google/protobuf/test_messages_proto2.proto \
		google/protobuf/test_messages_proto3.proto
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/protobuf-example: $(BUILD)/protoc-gen-es packages/protobuf-example/buf.gen.yaml $(shell find packages/protobuf-example -name '*.proto')
	npm run -w packages/protobuf-example clean
	npm run -w packages/protobuf-example generate
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/protobuf-bench: $(BIN)/protoc $(BUILD)/protoc-gen-es packages/protobuf-bench Makefile
	npm run -w packages/protobuf-bench clean
	npx buf generate buf.build/bufbuild/buf:4505cba5e5a94a42af02ebc7ac3a0a04 --template packages/protobuf-bench/buf.gen.yaml --output packages/protobuf-bench
	@mkdir -p $(@D)
	@touch $(@)


.PHONY: help
help: ## Describe useful make targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%-30s %s\n", $$1, $$2}'

.PHONY: all
all: build test format lint bench bootstrapwkt ## build, test, format, lint, bench, and bootstrapwkt (default)

.PHONY: clean
clean: ## Delete build artifacts and installed dependencies
	@# -X only removes untracked files, -d recurses into directories, -f actually removes files/dirs
	git clean -Xdf

.PHONY: build
build: $(BUILD)/protobuf $(BUILD)/protobuf-test $(BUILD)/protoplugin $(BUILD)/protoplugin-test $(BUILD)/protobuf-conformance $(BUILD)/protoc-gen-es $(BUILD)/protobuf-example $(BUILD)/protoplugin-example ## Build

.PHONY: test
test: test-protobuf test-protoplugin test-conformance test-ts-compat ## Run all tests

.PHONY: test-protobuf
test-protobuf: $(BUILD)/protobuf-test packages/protobuf-test/jest.config.js
	cd packages/protobuf-test \
		&& BUF_BIGINT_DISABLE=0 PATH="$(abspath $(BIN)):$(PATH)" NODE_OPTIONS=--experimental-vm-modules npx jest \
		&& BUF_BIGINT_DISABLE=1 PATH="$(abspath $(BIN)):$(PATH)" NODE_OPTIONS=--experimental-vm-modules npx jest \

.PHONY: test-protoplugin
test-protoplugin: $(BUILD)/protoplugin-test packages/protoplugin-test/jest.config.js
	npm run -w packages/protoplugin-test test

.PHONY: test-protoplugin-example
test-protoplugin-example: $(BUILD)/protoplugin-example
	npm run -w packages/protoplugin-example test

.PHONY: test-conformance
test-conformance: $(BIN)/conformance_test_runner $(BUILD)/protobuf-conformance
	cd packages/protobuf-conformance \
		&& BUF_BIGINT_DISABLE=0 $(abspath $(BIN)/conformance_test_runner) --enforce_recommended --failure_list failing_tests_with_bigint.txt    --text_format_failure_list failing_tests_text_format.txt bin/conformance_esm.js \
		&& BUF_BIGINT_DISABLE=1 $(abspath $(BIN)/conformance_test_runner) --enforce_recommended --failure_list failing_tests_without_bigint.txt --text_format_failure_list failing_tests_text_format.txt bin/conformance_esm.js

.PHONY: test-ts-compat
test-ts-compat: $(GEN)/protobuf-test node_modules
	@for number in $(TS_VERSIONS) ; do \
		formatted=$$(echo "$${number}" | sed -r 's/[\.]/_/g'); \
		dirname=packages/protobuf-test ; \
		echo "Testing TypeScript `node_modules/ts$$formatted/bin/tsc --version`" ; \
		node_modules/ts$$formatted/bin/tsc -p $$dirname/typescript/tsconfig.$${formatted}.json --outDir $$dirname/dist/typescript/$$formatted || exit ; \
	done

.PHONY: lint
lint: node_modules $(BUILD)/protobuf $(BUILD)/protobuf-test $(BUILD)/protobuf-conformance $(GEN)/protobuf-bench $(GEN)/protobuf-example ## Lint all files
	npx eslint --max-warnings 0 .
	npm run -w packages/protobuf lint:types
	npm run -w packages/protoplugin lint:types

.PHONY: format
format: node_modules $(BIN)/git-ls-files-unstaged $(BIN)/license-header ## Format all files, adding license headers
	npx prettier --write '**/*.{json,js,jsx,ts,tsx,css,mjs}' --log-level error
	$(BIN)/git-ls-files-unstaged | \
		grep -v $(patsubst %,-e %,$(sort $(LICENSE_HEADER_IGNORES))) | \
		xargs $(BIN)/license-header \
			--license-type "apache" \
			--copyright-holder "Buf Technologies, Inc." \
			--year-range "$(LICENSE_HEADER_YEAR_RANGE)"

.PHONY: bench
bench: node_modules $(GEN)/protobuf-bench $(BUILD)/protobuf ## Benchmark code size
	npm run -w packages/protobuf-bench report

.PHONY: perf
perf: $(BUILD)/protobuf-test
	npm run -w packages/protobuf-test perf

.PHONY: boostrapwkt
bootstrapwkt: $(BIN)/protoc $(BUILD)/protoc-gen-es $(BIN)/license-header ## Generate the well-known types in @bufbuild/protobuf
	@rm -rf $(TMP)/bootstrapwkt
	@mkdir -p $(TMP)/bootstrapwkt
	$(BIN)/protoc \
		--plugin packages/protoc-gen-es/bin/protoc-gen-es --es_out $(TMP)/bootstrapwkt --es_opt bootstrap_wkt=true,ts_nocheck=false,target=ts \
		--proto_path $(PB)/src $(GOOGLE_PROTOBUF_WKT)
	find $(TMP)/bootstrapwkt -name '*.ts' | \
		xargs $(BIN)/license-header \
			--license-type "apache" \
			--copyright-holder "Buf Technologies, Inc." \
			--year-range "$(LICENSE_HEADER_YEAR_RANGE)"
	@# If the generated code differs, use it, and run tests again
	diff >/dev/null -r packages/protobuf/src/google/protobuf $(TMP)/bootstrapwkt/google/protobuf || \
		(cp -r $(TMP)/bootstrapwkt/google/protobuf packages/protobuf/src/google/ && $(MAKE) build test format lint)

.PHONY: setversion
setversion: ## Set a new version in for the project, i.e. make setversion SET_VERSION=1.2.3
	node scripts/set-workspace-version.js $(SET_VERSION)
	rm package-lock.json
	npm i
	$(MAKE) all

# Recommended procedure:
# 1. Set a new version with the target `setversion`
# 2. Commit and push all changes
# 3. Login with `npm login`
# 4. Run this target, publishing to npmjs.com
# 5. Tag the release
.PHONY: release
release: all ## Release @bufbuild/protobuf
	@[ -z "$(shell git status --short)" ] || (echo "Uncommitted changes found." && exit 1);
	npm publish \
		--workspace packages/protobuf \
		--workspace packages/protoplugin \
		--workspace packages/protoc-gen-es

.PHONY: checkdiff
checkdiff:
	@# Used in CI to verify that `make` doesn't produce a diff
	test -z "$$(git status --porcelain | tee /dev/stderr)"
