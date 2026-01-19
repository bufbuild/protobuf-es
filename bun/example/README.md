# Protobuf Example on Deno

This directory contains example code that uses Protocol Buffers to manage a list
of users. The [add.ts](./src/add.ts) script adds a new user, prompting the user
to input the person's information. The [list.ts](./src/list.ts) script lists
users.

Note that this example can be easily implemented in other languages, because the
serialization format is standardized. That means you could add a user to the
list with Dart, and list people with TypeScript interchangeably.

### Run the example

To add a user:

```bash
bun run src/add.ts
```

To list all users:

```bash
bun run src/list.ts
```

### Generate code

This example uses the [Buf CLI](https://github.com/bufbuild/buf) to generate
TypeScript from protobuf files:

```bash
bun run generate
```
