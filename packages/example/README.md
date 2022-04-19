# Code example

This directory contains example code that uses protocol buffers to manage an 
address book. The script [add-person.ts](./src/add-person.ts) adds a new person
to an address book, prompting the user to input the person's information. The
script [list-people.ts](./src/list-people.ts) lists people already in the 
address book.

Note that this example is compatible with [all other](https://github.com/protocolbuffers/protobuf/tree/main/examples) 
language implementations. The serialization format is standardized across all 
implementations. That means you could add a person with Dart to an address book, 
and list people with TypeScript interchangeably.


### Build and run the example

```shell
# in the project root:
make clean

cd packages/example
node dist/esm/add-person.js addressbook.bin
node dist/esm/list-people.js addressbook.bin
```

If you want to use [buf](https://github.com/bufbuild/buf) to generate the code, 
simply run `buf generate` in this directory.
