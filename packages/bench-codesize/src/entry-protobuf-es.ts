import { Module } from "./gen/protobuf-es/buf/alpha/module/v1alpha1/module_pb";

const module = new Module({
  files: [
    {
      path: "foo.proto",
      content: new TextEncoder().encode(`syntax="proto3";`),
    },
  ],
});

const bytes = module.toBinary();

// eslint-disable-next-line no-console -- log statement makes sure the variable is in use
console.log(bytes.length);
