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
LICENSE_HEADER_YEAR_RANGE := 2021-2022
LICENSE_HEADER_IGNORES := .tmp\/ node_module\/ packages\/protobuf-conformance\/bin\/conformance_esm.js packages\/protobuf-conformance\/src\/gen\/ packages\/protobuf-test\/src\/gen\/ packages\/protobuf\/src\/google\/varint.ts packages\/protobuf-bench\/src\/gen\/ packages\/protobuf\/dist\/ packages\/protobuf-test\/dist\/ scripts\/
GOOGLE_PROTOBUF_WKT = google/protobuf/api.proto google/protobuf/any.proto google/protobuf/compiler/plugin.proto google/protobuf/descriptor.proto google/protobuf/duration.proto google/protobuf/descriptor.proto google/protobuf/empty.proto google/protobuf/field_mask.proto google/protobuf/source_context.proto google/protobuf/struct.proto google/protobuf/timestamp.proto google/protobuf/type.proto google/protobuf/wrappers.proto
GOOGLE_PROTOBUF_VERSION = 21.5

node_modules: package-lock.json
	npm ci


$(PB):
	echo $(PB)
	@mkdir -p $(TMP)
	curl -L https://github.com/protocolbuffers/protobuf/releases/download/v$(GOOGLE_PROTOBUF_VERSION)/protobuf-all-$(GOOGLE_PROTOBUF_VERSION).tar.gz \
		> $(TMP)/protobuf-$(GOOGLE_PROTOBUF_VERSION).tar.gz
	tar -xzf $(TMP)/protobuf-$(GOOGLE_PROTOBUF_VERSION).tar.gz -C $(TMP)/

$(BIN)/protoc: $(PB)
	@mkdir -p $(@D)
	cd $(PB) && bazel build protoc
	cp -f $(PB)/bazel-bin/protoc $(@D)
	@touch $(@)

$(BIN)/conformance_test_runner: $(PB)
	@mkdir -p $(@D)
	cd $(PB) && bazel build test_messages_proto3_proto conformance:conformance_proto conformance:conformance_test conformance:conformance_test_runner
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

$(BUILD)/example: $(BUILD)/protobuf node_modules tsconfig.base.json packages/example/tsconfig.json $(shell find packages/example/src -name '*.ts')
	npm run -w packages/example clean
	npm run -w packages/example build
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

$(GEN)/protobuf-conformance: $(BIN)/protoc $(BUILD)/protoc-gen-es Makefile
	@rm -rf packages/protobuf-conformance/src/gen/*
	$(BIN)/protoc --plugin packages/protoc-gen-es/bin/protoc-gen-es --es_out packages/protobuf-conformance/src/gen --es_opt ts_nocheck=false,target=ts \
		--proto_path $(PB) --proto_path $(PB)/src \
		conformance/conformance.proto \
		google/protobuf/test_messages_proto2.proto \
		google/protobuf/test_messages_proto3.proto
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/example: $(BIN)/protoc $(BUILD)/protoc-gen-es packages/example/buf.gen.yaml $(shell find packages/example -name '*.proto')
	@rm -rf packages/example/src/gen/*
	buf generate packages/example --template packages/example/buf.gen.yaml --output packages/example
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/protobuf-bench: $(BIN)/protoc $(BUILD)/protoc-gen-es packages/protobuf-bench Makefile
	@rm -rf packages/protobuf-bench/src/gen/*
	buf generate buf.build/bufbuild/buf:4505cba5e5a94a42af02ebc7ac3a0a04 --template packages/protobuf-bench/buf.gen.yaml --output packages/protobuf-bench
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
build: $(BUILD)/protobuf $(BUILD)/protobuf-test $(BUILD)/protoplugin $(BUILD)/protobuf-conformance $(BUILD)/protoc-gen-es $(BUILD)/example ## Build

.PHONY: test
test: test-jest test-conformance ## Run all tests

.PHONY: test-jest
test-jest: $(BUILD)/protobuf-test packages/protobuf-test/jest.config.js
	cd packages/protobuf-test && PATH="$(abspath $(BIN)):$(PATH)" NODE_OPTIONS=--experimental-vm-modules npx jest

.PHONY: test-conformance
test-conformance: $(BIN)/conformance_test_runner $(BUILD)/protobuf-conformance
	$(BIN)/conformance_test_runner --enforce_recommended \
		--failure_list packages/protobuf-conformance/conformance_failing_tests.txt \
		--text_format_failure_list packages/protobuf-conformance/conformance_failing_tests_text_format.txt \
		packages/protobuf-conformance/bin/conformance_esm.js

NUMBERS = 4.4.4 \
		  4.5.5 \
		  4.7.4

.PHONY: test-ts-install
test-ts-install:  node_modules
	@# we can add more typescript versions here with:
	@# npm i -w packages/protobuf-test ts4_4_4@npm:typescript@4.4.4
	for number in $(NUMBERS) ; do \
		dirname=$$(echo "$${number}" | sed -r 's/[\.]/_/g'); \
		npm i -w packages/protobuf-test ts$${dirname}@npm:typescript@$${number}; \
		echo "Using TypeScript `node_modules/ts$$dirname/bin/tsc --version`" ; \
		node_modules/ts$$dirname/bin/tsc --init ; \
		mkdir -p packages/protobuf-test/typescript/ts$${dirname}; \
		sed -i '' -e "1s/^//p; 1s/^.*/\t\"include\": [\"\.\.\/\.\.\/src\/\*\*\/\*\.ts\"],\n\t\"exclude\": [\"\.\.\/\.\.\/src\/\*\*\/\*\.test\.ts\"],/" tsconfig.json ; \
		mv tsconfig.json packages/protobuf-test/typescript/ts$${dirname}/tsconfig.json; \
		node_modules/ts$$dirname/bin/tsc -p packages/protobuf-test/typescript/ts$$dirname/tsconfig.json --noEmit; \
	done

.PHONY: test-ts-compat
test-ts-compat: node_modules $(shell find packages/protobuf-test -name '*.json')
	for number in $(NUMBERS) ; do \
		dirname=$$(echo "$${number}" | sed -r 's/[\.]/_/g'); \
		echo "Using TypeScript `node_modules/ts$$dirname/bin/tsc --version`" ; \
		node_modules/ts$$dirname/bin/tsc -p packages/protobuf-test/typescript/ts$$dirname/tsconfig.json --noEmit; \
	done

.PHONY: timo
timo: node_modules $(shell find packages/protobuf-test -name '*.json')
	# rm -rf packages/protobuf/dist/cjs/* packages/protobuf/dist/esm/* packages/protobuf/dist/types/*
	# rm -rf packages/protobuf/dist/cjs/* packages/protobuf/dist/esm/* packages/protobuf/dist/types/*
	node_modules/ts4_4_4/bin/tsc -p packages/protobuf-test/tsconfig.4_4_4.json --noEmit
	node_modules/ts4_5_5/bin/tsc -p packages/protobuf-test/tsconfig.4_5_5.json --noEmit

.PHONY: lint
lint: node_modules $(BUILD)/protobuf $(BUILD)/protobuf-test $(BUILD)/protobuf-conformance $(GEN)/protobuf-bench $(GEN)/example ## Lint all files
	npx eslint --max-warnings 0 .

.PHONY: format
format: node_modules $(BIN)/git-ls-files-unstaged $(BIN)/license-header ## Format all files, adding license headers
	npx prettier --write '**/*.{json,js,jsx,ts,tsx,css}' --loglevel error
	$(BIN)/git-ls-files-unstaged | \
		grep -v $(patsubst %,-e %,$(sort $(LICENSE_HEADER_IGNORES))) | \
		xargs $(BIN)/license-header \
			--license-type "apache" \
			--copyright-holder "Buf Technologies, Inc." \
			--year-range "$(LICENSE_HEADER_YEAR_RANGE)"

.PHONY: bench
bench: node_modules $(GEN)/protobuf-bench $(BUILD)/protobuf ## Benchmark code size
	npm run -w packages/protobuf-bench report

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
	@# Used in CI to verify that `make` doesn't produce a diff, but ignore changes in benchmarks
	git checkout packages/protobuf-bench/README.md
	test -z "$$(git status --porcelain | tee /dev/stderr)"


# TypeScript testing
.PHONY: test-ts
test-ts::

TS_VERSIONS := $(TS_VERSIONS) \
		   4.7.4 \
		   4.4.2 \
		   4.4.3

define settsfunc
.PHONY: set-ts$(notdir $(1))
set-ts$(notdir $(1)):
	echo "Installing TypeScript version $(1)"
	sed 's/\"typescript\": \"0.0.0\"/\"typescript\": \"$(1)\"/g' packages/protobuf-ts-test/template.json > packages/protobuf-ts-test/package.json
	npm install
	
.PHONY: run-test$(notdir $(1))
run-test$(notdir $(1)):
	cd packages/protobuf-ts-test && PATH="$(abspath $(BIN)):$(PATH)" NODE_OPTIONS=--experimental-vm-modules npx jest

test-ts:: set-ts$(notdir $(1)) $(BUILD)/protobuf-ts-test$(notdir $(1)) packages/protobuf-ts-test/jest.config.js run-test$(notdir $(1))

$(BUILD)/protobuf-ts-test$(notdir $(1)): $(BUILD)/protobuf-force$(notdir $(1))
	npm run -w packages/protobuf-ts-test clean
	-npm run -w packages/protobuf-ts-test build

$(BUILD)/protobuf-force$(notdir $(1)): 
	npm run -w packages/protobuf clean
	npm run -w packages/protobuf build
endef


$(foreach gobin,$(sort $(TS_VERSIONS)),$(eval $(call settsfunc,$(gobin))))



$(GEN)/protobuf-ts-test: $(BIN)/protoc $(BUILD)/protoc-gen-es
	@rm -rf packages/protobuf-ts-test/src/gen/ts/* packages/protobuf-ts-test/src/gen/js/* packages/protobuf--ts-test/descriptorset.bin
	$(BIN)/protoc \
		--descriptor_set_out packages/protobuf-ts-test/descriptorset.bin --include_imports --include_source_info \
		--plugin protoc-gen-a=packages/protoc-gen-es/bin/protoc-gen-es --a_out packages/protobuf-ts-test/src/gen/ts --a_opt ts_nocheck=false,target=ts \
		--plugin protoc-gen-b=packages/protoc-gen-es/bin/protoc-gen-es --b_out packages/protobuf-ts-test/src/gen/js --b_opt ts_nocheck=false,target=js+dts \
		--proto_path $(PB) --proto_path $(PB)/src -I packages/protobuf-ts-test \
		$(shell cd packages/protobuf-ts-test && find . -name '*.proto' | cut -sd / -f 2-) \
		$(shell cd $(PB)/src && find . -name 'unittest*.proto' | cut -sd / -f 2-) \
		google/protobuf/type.proto \
		google/protobuf/test_messages_proto2.proto \
		google/protobuf/test_messages_proto3.proto
	$(BIN)/protoc \
		--plugin protoc-gen-a=packages/protoc-gen-es/bin/protoc-gen-es --a_out packages/protobuf-ts-test/src/gen/ts --a_opt ts_nocheck=false,target=ts \
		--plugin protoc-gen-b=packages/protoc-gen-es/bin/protoc-gen-es --b_out packages/protobuf-ts-test/src/gen/js --b_opt ts_nocheck=false,target=js+dts \
		--proto_path $(PB)/src \
		$(GOOGLE_PROTOBUF_WKT)
	@mkdir -p $(@D)
	@touch $(@)

