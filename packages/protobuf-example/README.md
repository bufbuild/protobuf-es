# Protobuf Example

This directory contains example code that uses Protocol Buffers to manage a
list of users. The [add.ts](./src/add.ts) script adds a new user, prompting the
user to input the person's information. The [list.ts](./src/list.ts) script 
lists users.

Note that this example can be easily implemented in other languages, because
the serialization format is standardized. That means you could add a user to the
list with Dart, and list people with TypeScript interchangeably.

### Build and run the example

To run the example, you only need npm or Yarn.
[Download the source](https://github.com/bufbuild/protobuf-es/archive/refs/heads/main.zip),
then run the following commands:

From the project root, first install and build all required packages:

```shellsession
npm ci
npm run generate --filter ./packages/protobuf-example
```

Next, `cd` into the example directory:

```shellsession
cd packages/protobuf-example
```

To add a user:

```shellsession
npm run add
```

To list all users:

```shellsession
npm run list
```

### Generate code

If you want to use the [Buf CLI](https://github.com/bufbuild/buf) to generate the code,
simply run `npx buf generate` in this directory. [`buf.gen.yaml`](./buf.gen.yaml)
contains the plugin configuration.

If you want to use `protoc`, the following command is equivalent:

```shellsession
protoc -I . --es_out=src/gen --es_opt=target=ts --plugin=protoc-gen-es=./node_modules/.bin/protoc-gen-es proto/example.proto
```

You don't need TypeScript to use **Protobuf-ES**. Just set the plugin option `target=js` if you prefer plain JavaScript,
or `target=js+dts` if you prefer JavaScript with TypeScript declaration files.
