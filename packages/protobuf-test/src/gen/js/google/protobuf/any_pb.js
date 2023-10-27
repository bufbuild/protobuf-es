// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// @generated by protoc-gen-es v1.4.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/any.proto (package google.protobuf, syntax proto3)
/* eslint-disable */

import { proto3 } from "@bufbuild/protobuf";

/**
 * `Any` contains an arbitrary serialized protocol buffer message along with a
 * URL that describes the type of the serialized message.
 *
 * Protobuf library provides support to pack/unpack Any values in the form
 * of utility functions or additional generated methods of the Any type.
 *
 * Example 1: Pack and unpack a message in C++.
 *
 *     Foo foo = ...;
 *     Any any;
 *     any.PackFrom(foo);
 *     ...
 *     if (any.UnpackTo(&foo)) {
 *       ...
 *     }
 *
 * Example 2: Pack and unpack a message in Java.
 *
 *     Foo foo = ...;
 *     Any any = Any.pack(foo);
 *     ...
 *     if (any.is(Foo.class)) {
 *       foo = any.unpack(Foo.class);
 *     }
 *     // or ...
 *     if (any.isSameTypeAs(Foo.getDefaultInstance())) {
 *       foo = any.unpack(Foo.getDefaultInstance());
 *     }
 *
 *  Example 3: Pack and unpack a message in Python.
 *
 *     foo = Foo(...)
 *     any = Any()
 *     any.Pack(foo)
 *     ...
 *     if any.Is(Foo.DESCRIPTOR):
 *       any.Unpack(foo)
 *       ...
 *
 *  Example 4: Pack and unpack a message in Go
 *
 *      foo := &pb.Foo{...}
 *      any, err := anypb.New(foo)
 *      if err != nil {
 *        ...
 *      }
 *      ...
 *      foo := &pb.Foo{}
 *      if err := any.UnmarshalTo(foo); err != nil {
 *        ...
 *      }
 *
 * The pack methods provided by protobuf library will by default use
 * 'type.googleapis.com/full.type.name' as the type URL and the unpack
 * methods only use the fully qualified type name after the last '/'
 * in the type URL, for example "foo.bar.com/x/y.z" will yield type
 * name "y.z".
 *
 * JSON
 * ====
 * The JSON representation of an `Any` value uses the regular
 * representation of the deserialized, embedded message, with an
 * additional field `@type` which contains the type URL. Example:
 *
 *     package google.profile;
 *     message Person {
 *       string first_name = 1;
 *       string last_name = 2;
 *     }
 *
 *     {
 *       "@type": "type.googleapis.com/google.profile.Person",
 *       "firstName": <string>,
 *       "lastName": <string>
 *     }
 *
 * If the embedded message type is well-known and has a custom JSON
 * representation, that representation will be embedded adding a field
 * `value` which holds the custom JSON in addition to the `@type`
 * field. Example (for message [google.protobuf.Duration][]):
 *
 *     {
 *       "@type": "type.googleapis.com/google.protobuf.Duration",
 *       "value": "1.212s"
 *     }
 *
 *
 * @generated from message google.protobuf.Any
 */
export const Any = proto3.makeMessageType(
  "google.protobuf.Any",
  () => [
    { no: 1, name: "type_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ],
);

Any.prototype.toJson = function toJson(options) {
  if (this.typeUrl === "") {
    return {};
  }
  const typeName = this.typeUrlToName(this.typeUrl);
  const messageType = options?.typeRegistry?.findMessage(typeName);
  if (!messageType) {
    throw new Error(`cannot encode message google.protobuf.Any to JSON: "${this.typeUrl}" is not in the type registry`);
  }
  const message = messageType.fromBinary(this.value);
  let json = message.toJson(options);
  if (typeName.startsWith("google.protobuf.") || (json === null || Array.isArray(json) || typeof json !== "object")) {
    json = {value: json};
  }
  json["@type"] = this.typeUrl;
  return json;
};

Any.prototype.fromJson = function fromJson(json, options) {
  if (json === null || Array.isArray(json) || typeof json != "object") {
    throw new Error(`cannot decode message google.protobuf.Any from JSON: expected object but got ${json === null ? "null" : Array.isArray(json) ? "array" : typeof json}`);
  }
  if (Object.keys(json).length == 0) {
    return this;
  }
  const typeUrl = json["@type"];
  if (typeof typeUrl != "string" || typeUrl == "") {
    throw new Error(`cannot decode message google.protobuf.Any from JSON: "@type" is empty`);
  }
  const typeName = this.typeUrlToName(typeUrl), messageType = options?.typeRegistry?.findMessage(typeName);
  if (!messageType) {
    throw new Error(`cannot decode message google.protobuf.Any from JSON: ${typeUrl} is not in the type registry`);
  }
  let message;
  if (typeName.startsWith("google.protobuf.") &&  Object.prototype.hasOwnProperty.call(json, "value")) {
    message = messageType.fromJson(json["value"], options);
  } else {
    const copy = Object.assign({}, json);
    delete copy["@type"];
    message = messageType.fromJson(copy, options);
  }
  this.packFrom(message);
  return this;
};

Any.prototype.packFrom = function packFrom(message) {
  this.value = message.toBinary();
  this.typeUrl = this.typeNameToUrl(message.getType().typeName);
};

Any.prototype.unpackTo = function unpackTo(target) {
  if (!this.is(target.getType())) {
    return false;
  }
  target.fromBinary(this.value);
  return true;
};

Any.prototype.unpack = function unpack(registry) {
    if (this.typeUrl === "") {
      return undefined;
    }
    const messageType = registry.findMessage(this.typeUrlToName(this.typeUrl));
    if (!messageType) {
      return undefined;
    }
    return messageType.fromBinary(this.value);
  }

Any.prototype.is = function is(type) {
  if (this.typeUrl === '') {
    return false;
  }
  const name = this.typeUrlToName(this.typeUrl);
  let typeName = '';
  if (typeof type === 'string') {
      typeName = type;
  } else {
      typeName = type.typeName;
  }
  return name === typeName;
};

Any.prototype.typeNameToUrl = function typeNameToUrl(name) {
  return `type.googleapis.com/${name}`;
};

Any.prototype.typeUrlToName = function typeUrlToName(url) {
  if (!url.length) {
    throw new Error(`invalid type url: ${url}`);
  }
  const slash = url.lastIndexOf("/");
  const name = slash > 0 ? url.substring(slash + 1) : url;
  if (!name.length) {
    throw new Error(`invalid type url: ${url}`);
  }
  return name;
};

Any.pack = function pack(message) {
  const any = new Any();
  any.packFrom(message);
  return any;
};

