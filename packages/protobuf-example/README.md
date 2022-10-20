# Code example

This directory contains example code that uses protocol buffers to manage an 
address book. The script [add-person.ts](./src/add-person.ts) adds a new person
to an address book, prompting the user to input the person's information. The
script [list-people.ts](./src/list-people.ts) lists people already in the 
address book.

Note that this example is compatible with all [other language implementations](https://github.com/protocolbuffers/protobuf/tree/main/examples), 
because the serialization format is standardized. That means you could add a 
person with Dart to an address book, and list people with TypeScript 
interchangeably.


### Build and run the example

You can easily run the example for yourself - you will only need npm or yarn. 
[Download the source](https://github.com/bufbuild/protobuf-es/archive/refs/heads/main.zip),
then run the following commands:

```shell
# in the project root:
cd packages/protobuf-example
npm install
npm run build
```

```shell
# To add a person to the address book:
node dist/esm/add-person.js addressbook.bin

# To list all entries of the address book:
node dist/esm/list-people.js addressbook.bin
```

### Generate code yourself

If you want to use [`buf`](https://github.com/bufbuild/buf) to generate the code, 
simply run `buf generate` in this directory. [`buf.gen.yaml`](./buf.gen.yaml) 
contains the plugin configuration.

If you want to use `protoc`, the following command is equivalent:

```shell
protoc -I . --es_out=src/gen --es_opt=target=ts --plugin=protoc-gen-es=./node_modules/.bin/protoc-gen-es addressbook.proto
```

Don't forget to run `npm run build` to compile TypeScript to JavaScript, so that 
Node will understand it. You do not need TypeScript to use `protobuf-es`. Just 
set the plugin option `target=js` if you prefer plain JavaScript, or `target=js+dts`
if you prefer JavaScript with TypeScript declaration files.
