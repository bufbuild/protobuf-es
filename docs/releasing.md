Release
=======

## Cutting a release

This guide is a step-by-step process for cutting a release for `@bufbuild/protobuf` 
and `@bufbuild/protoc-gen-es`.


### Prerequisites

- Make sure you have an NPM access token that can publish to the organization 
  https://www.npmjs.com/org/bufbuild
- Tooling needed for the build
    - node and npm
    - bazel
    - go
    - buf


### Steps

First, start with a new git branch, so you can commit changes before publishing to 
npmjs.com.

To update the version across the packages within the monorepo, run the following 
command:

```bash
make setversion SET_VERSION=1.2.3 
```

Commit all changes, then run the following command to publish to npmjs.com:

```bash
make release 
```

Merge the branch into main.

Make a release at https://github.com/bufbuild/protobuf-es: 

> **Name**: The version (e.g. v1.1.0)  
> **Description**: List all changes since the previous release, link to issues 
> or pull requests if applicable.


## Updating conformance tests

The `Makefile` contains a variable `GOOGPROTOBUF_VERSION`, which controls the
upstream version of [github.com/protocolbuffers/protobuf](https://github.com/protocolbuffers/protobuf)
being used for conformance testing, as well as generation of well-known types.

For every new release, we have to adjust the variable, run `make`, and watch
out for failures during build or test.

