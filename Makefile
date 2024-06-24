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

node_modules: package-lock.json
	npm ci

$(BUILD)/upstream-protobuf: node_modules packages/upstream-protobuf/version.txt $(shell find packages/upstream-protobuf -name '*.mjs' -not -path "*/node_modules/*")
	@mkdir -p $(@D)
	npm run -w packages/upstream-protobuf build
	@touch $(@)

$(BUILD)/protobuf: node_modules tsconfig.base.json packages/protobuf/tsconfig.json $(shell find packages/protobuf/src -name '*.ts')
	npm run -w packages/protobuf build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protobuf-test: $(BUILD)/protobuf $(GEN)/protobuf-test node_modules tsconfig.base.json packages/protobuf-test/tsconfig.json $(shell find packages/protobuf-test/src -name '*.ts')
	npm run -w packages/protobuf-test build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protoplugin: $(BUILD)/protobuf node_modules tsconfig.base.json packages/protoplugin/tsconfig.json $(shell find packages/protoplugin/src -name '*.ts')
	npm run -w packages/protoplugin build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protoplugin-test: $(BUILD)/protoplugin $(BUILD)/upstream-protobuf node_modules tsconfig.base.json packages/protoplugin-test/tsconfig.json $(shell find packages/protoplugin-test/src -name '*.ts')
	npm run -w packages/protoplugin-test build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protoplugin-example: $(BUILD)/protoc-gen-es packages/protoplugin-example/buf.gen.yaml node_modules tsconfig.base.json packages/protoplugin-example/tsconfig.json $(shell find packages/protoplugin-example/src -name '*.ts')
	npm run -w packages/protoplugin-example generate
	npm run -w packages/protoplugin-example build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protoc-gen-es: $(BUILD)/protoplugin node_modules tsconfig.base.json packages/protoc-gen-es/tsconfig.json $(shell find packages/protoc-gen-es/src -name '*.ts')
	npm run -w packages/protoc-gen-es build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protobuf-conformance: $(GEN)/protobuf-conformance node_modules tsconfig.base.json packages/protobuf-conformance $(shell find packages/protobuf-conformance/src -name '*.ts')
	npm run -w packages/protobuf-conformance build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/protobuf-example: $(BUILD)/protobuf node_modules tsconfig.base.json packages/protobuf-example/tsconfig.json $(shell find packages/protobuf-example/src -name '*.ts')
	npm run -w packages/protobuf-example build
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/protobuf-test: $(BUILD)/upstream-protobuf $(BUILD)/protoc-gen-es packages/protobuf-test/package.json $(shell find packages/protobuf-test/extra -name '*.proto')
	npm run -w packages/protobuf-test generate
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/protobuf-conformance: $(BUILD)/upstream-protobuf $(BUILD)/protoc-gen-es
	npm run -w packages/protobuf-conformance generate
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/protobuf-example: $(BUILD)/protoc-gen-es packages/protobuf-example/buf.gen.yaml $(shell find packages/protobuf-example -name '*.proto')
	npm run -w packages/protobuf-example generate
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/bundle-size: $(BUILD)/protoplugin $(BUILD)/protoc-gen-es $(shell find packages/bundle-size/src -name '*.ts' -maxdepth 1) packages/bundle-size/buf.gen.yaml Makefile
	npm run -w packages/bundle-size generate
	@mkdir -p $(@D)
	@touch $(@)


.PHONY: help
help: ## Describe useful make targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%-30s %s\n", $$1, $$2}'

.PHONY: all
all: build test format lint bundle-size bootstrap ## build, test, format, lint, bundle-size, and bootstrap (default)

.PHONY: ci
ci: build test-protobuf test-protoplugin test-protoplugin-example test-conformance format bundle-size bootstrap #
	$(MAKE) checkdiff

.PHONY: clean
clean: ## Delete build artifacts and installed dependencies
	@# -X only removes untracked files, -d recurses into directories, -f actually removes files/dirs
	git clean -Xdf

.PHONY: build
build: $(BUILD)/protobuf $(BUILD)/protobuf-test $(BUILD)/protoplugin $(BUILD)/protoplugin-test $(BUILD)/protobuf-conformance $(BUILD)/protoc-gen-es $(BUILD)/protobuf-example $(BUILD)/protoplugin-example ## Build

.PHONY: test
test: test-protobuf test-protoplugin test-protoplugin-example test-conformance test-ts-compat ## Run all tests

.PHONY: test-protobuf
test-protobuf: $(BUILD)/protobuf-test packages/protobuf-test/jest.config.js
	npx turbo run test -F ./packages/protobuf-test

.PHONY: test-protoplugin
test-protoplugin: $(BUILD)/protoplugin-test packages/protoplugin-test/jest.config.js
	npx turbo run test -F ./packages/protoplugin-test

.PHONY: test-protoplugin-example
test-protoplugin-example: $(BUILD)/protoplugin-example
	npx turbo run test -F ./packages/protoplugin-example

.PHONY: test-conformance
test-conformance: $(BUILD)/upstream-protobuf $(BUILD)/protobuf-conformance
	npx turbo run test -F ./packages/protobuf-conformance

.PHONY: test-ts-compat
test-ts-compat: $(GEN)/protobuf-test $(BUILD)/protobuf node_modules
	npx turbo run test -F './packages/typescript-compat/*'

.PHONY: lint
lint: node_modules $(BUILD)/protobuf $(BUILD)/protobuf-test $(BUILD)/protobuf-conformance $(BUILD)/protoplugin $(GEN)/bundle-size $(GEN)/protobuf-example ## Lint all files
	npx turbo run lint attw

.PHONY: format
format: node_modules ## Format all files, adding license headers
	npx turbo run format license-header

.PHONY: bundle-size
bundle-size: node_modules $(GEN)/bundle-size $(BUILD)/protobuf ## Benchmark bundle-size
	npx turbo run build -F ./packages/bundle-size

.PHONY: perf
perf: $(BUILD)/protobuf-test
	npx turbo run perf -F ./packages/protobuf-test

.PHONY: flamegraph
flamegraph: $(BUILD)/protobuf-test
	npx turbo run flamegraph -F ./packages/protobuf-test

.PHONY: bootstrap
bootstrap: $(BUILD)/upstream-protobuf $(BUILD)/protoc-gen-es node_modules ## Bootstrap well-known types and edition features-set defaults in @bufbuild/protobuf from upstream protobuf
	npx turbo run bootstrap:inject bootstrap:wkt -F ./packages/protobuf

.PHONY: setversion
setversion: ## Set a new version in for the project, i.e. make setversion SET_VERSION=1.2.3
	node scripts/set-workspace-version.js $(SET_VERSION)
	npm ci
	$(MAKE) all

# Recommended procedure:
# 1. Set a new version with the target `setversion`
# 2. Commit and push all changes
# 3. Login with `npm login`
# 4. Run this target, publishing to npmjs.com
# 5. Tag the release
.PHONY: release
release: all ## Release @bufbuild/protobuf
	npm run release

.PHONY: checkdiff
checkdiff:
	@# Used in CI to verify that `make` doesn't produce a diff
	test -z "$$(git status --porcelain | tee /dev/stderr)"
