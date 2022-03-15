import { Module } from "./gen/google-protobuf/buf/alpha/module/v1alpha1/module_pb.js";

const module = new Module();

const bytes = module.serializeBinary();

// eslint-disable-next-line no-console -- log statement makes sure the variable is in use
console.log(bytes.length);
