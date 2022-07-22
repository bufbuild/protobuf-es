# @bufbuild/protoc-gen-es

This package provides the code generator plugin `protoc-gen-es`. The code it 
generates depends on `@bufbuild/protobuf`.

## Protocol Buffers for ECMAScript

A complete implementation of [Protocol Buffers](https://developers.google.com/protocol-buffers) 
in TypeScript, suitable for web browsers and Node.js.  

For example, the following definition:

```protobuf
message Person {
  string name = 1;
  int32 id = 2;  // Unique ID number for this person.
  string email = 3;
}
```

Is compiled to an ECMAScript class that can be used like this:

```typescript
let pete = new Person({
  name: "pete",
  id: 123
});

let bytes = pete.toBinary();
pete = Person.fromBinary(bytes);
pete = Person.fromJsonString('{"name": "pete", "id": 123}');
```

Learn more at [github.com/bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es).


## Installation

### With npm

```shell
npm install @bufbuild/protoc-gen-es
```

This will install the code generator plugin in `node_modules/.bin/protoc-gen-es`. 
Note that npm does not add the executable to your `$PATH`. You can do so with:

```shell
PATH=$PATH:$(pwd)/node_modules/.bin
```

### With yarn

```shell
yarn add @bufbuild/protoc-gen-es
```

Note that yarn v2 does not use a `node_modules` directory anymore. To find the path 
where yarn stores the executable, run `yarn bin protoc-gen-es` (it is "unplugged" 
automatically).

You can always confirm successful installation with:
```shell
protoc-gen-es --version
```


## Plugin options

### `target`

This option controls whether the plugin generates JavaScript, TypeScript, 
or TypeScript declaration files.

Possible values:
- `target=js` - generates a `_pb.js` file for every `.proto` input file.
- `target=ts` - generates a `_pb.ts` file for every `.proto` input file.
- `target=dts` - generates a `_pb.d.ts` file for every `.proto` input file.

Multiple values can be given by separating them with `+`, for example
`target=js+dts`.

By default, we generate JavaScript and TypeScript declaration files, which
produces the smallest code size. If you prefer to generate TypeScript, use
`target=ts`.

