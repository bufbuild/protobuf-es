// Copyright 2021-2024 Buf Technologies, Inc.
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

import {
  DescriptorProto as V1DescriptorProto,
  FileDescriptorProto as V1FileDescriptorProto,
} from "../../google/protobuf/descriptor_pb.js";
import type {
  DescEnum,
  DescExtension,
  DescFile,
  DescMessage,
  DescService,
} from "../../descriptor-set.js";
import {
  clearField as v1_clearField,
  isFieldSet as v1_isFieldSet,
} from "../../field-accessor.js";
import { protoCamelCase } from "../reflect/names.js";
import { assert } from "../../private/assert.js";
import { isFieldSet } from "../fields.js";
import { base64Encode } from "../wire/base64-encoding.js";
import type {
  DescriptorProto,
  EnumDescriptorProto,
  FileDescriptorProto,
  FieldDescriptorProto,
  FieldOptions,
} from "../wkt/gen/google/protobuf/descriptor_pbv2.js";
import {
  Edition,
  FieldDescriptorProtoDesc,
  FieldOptionsDesc,
  FileDescriptorProtoDesc,
} from "../wkt/gen/google/protobuf/descriptor_pbv2.js";
import type {
  DescriptorProtoBoot,
  EnumDescriptorProtoBoot,
  EnumValueDescriptorProtoBoot,
  FieldDescriptorProtoBoot,
  FieldOptions_EditionDefaultBoot,
  FieldOptionsBoot,
  FileDescriptorProtoBoot,
} from "./boot.js";
import { fromBinary } from "../from-binary.js";

type EmbedUnknown = {
  bootable: false;
  proto(): V1FileDescriptorProto;
  base64(): string;
};

type EmbedDescriptorProto = Omit<EmbedUnknown, "bootable"> & {
  bootable: true;
  boot(): FileDescriptorProtoBoot;
};

/**
 * Create necessary information to embed a file descriptor in
 * generated code.
 *
 * @private
 */
export function embedFileDesc(
  file: DescFile,
): EmbedUnknown | EmbedDescriptorProto {
  const embed: EmbedUnknown = {
    bootable: false,
    proto() {
      const i = file.proto;
      const o = new V1FileDescriptorProto();
      if (v1_isFieldSet(i, "name")) o.name = i.name;
      if (v1_isFieldSet(i, "package")) o.package = i.package;
      // dependency
      if (v1_isFieldSet(i, "publicDependency"))
        o.publicDependency = i.publicDependency;
      if (v1_isFieldSet(i, "weakDependency"))
        o.weakDependency = i.weakDependency;
      if (v1_isFieldSet(i, "messageType"))
        o.messageType = i.messageType.map(cloneAndStripJsonNames);
      if (v1_isFieldSet(i, "enumType")) o.enumType = i.enumType;
      if (v1_isFieldSet(i, "service")) o.service = i.service;
      if (v1_isFieldSet(i, "extension")) o.extension = i.extension;
      if (v1_isFieldSet(i, "options")) o.options = i.options;
      // sourceCodeInfo
      if (v1_isFieldSet(i, "syntax")) o.syntax = i.syntax;
      if (v1_isFieldSet(i, "edition")) o.edition = i.edition;
      return o;
    },
    base64() {
      const bytes = this.proto().toBinary();
      return base64Encode(bytes, "std_raw");
    },
  };
  return file.proto.name == "google/protobuf/descriptor.proto"
    ? {
        ...embed,
        bootable: true,
        boot(): FileDescriptorProtoBoot {
          const bytes = this.proto().toBinary();
          const proto = fromBinary(FileDescriptorProtoDesc, bytes);
          return createFileDescriptorProtoBoot(proto);
        },
      }
    : embed;
}

function cloneAndStripJsonNames(i: V1DescriptorProto): V1DescriptorProto {
  // not using clone() because it does not retain unknown fields
  const o = V1DescriptorProto.fromBinary(i.toBinary());
  stripJsonNames(o);
  return o;
}
function stripJsonNames(d: V1DescriptorProto): void {
  for (const f of d.field) {
    if (f.jsonName === protoCamelCase(f.name)) {
      v1_clearField(f, "jsonName");
    }
  }
  for (const n of d.nestedType) {
    stripJsonNames(n);
  }
}

/**
 * Compute the path to a message, enumeration, extension, or service in a
 * file descriptor.
 *
 * @private
 */
export function pathInFileDesc(
  desc: DescMessage | DescEnum | DescExtension | DescService,
): number[] {
  if (desc.kind == "service") {
    return [desc.file.services.indexOf(desc)];
  }
  const parent = desc.parent;
  if (parent == undefined) {
    switch (desc.kind) {
      case "enum":
        return [desc.file.enums.indexOf(desc)];
      case "message":
        return [desc.file.messages.indexOf(desc)];
      case "extension":
        return [desc.file.extensions.indexOf(desc)];
    }
  }
  function findPath(cur: DescMessage): number[] {
    const nested: number[] = [];
    for (let parent = cur.parent; parent; ) {
      const idx = parent.nestedMessages.indexOf(cur);
      nested.unshift(idx);
      cur = parent;
      parent = cur.parent;
    }
    nested.unshift(cur.file.messages.indexOf(cur));
    return nested;
  }
  const path = findPath(parent);
  switch (desc.kind) {
    case "extension":
      return [...path, parent.nestedExtensions.indexOf(desc)];
    case "message":
      return [...path, parent.nestedMessages.indexOf(desc)];
    case "enum":
      return [...path, parent.nestedEnums.indexOf(desc)];
  }
}

/**
 * The file descriptor for google/protobuf/descriptor.proto cannot be embedded
 * in serialized form, since it is required to parse itself.
 *
 * This function takes an instance of the message, and returns a plain object
 * that can be hydrated to the message again via bootFileDescriptorProto().
 *
 * This function only works with a message google.protobuf.FileDescriptorProto
 * for google/protobuf/descriptor.proto, and only supports features that are
 * relevant for the specific use case. For example, it discards file options,
 * reserved ranges and reserved names, and field options that are unused in
 * descriptor.proto.
 *
 * @private
 */
export function createFileDescriptorProtoBoot(
  proto: FileDescriptorProto,
): FileDescriptorProtoBoot {
  assert(proto.name == "google/protobuf/descriptor.proto");
  assert(proto.package == "google.protobuf");
  assert(!proto.dependency.length);
  assert(!proto.publicDependency.length);
  assert(!proto.weakDependency.length);
  assert(!proto.service.length);
  assert(!proto.extension.length);
  assert(proto.sourceCodeInfo === undefined);
  assert(proto.syntax == "" || proto.syntax == "proto2");
  assert(!proto.options?.features); // we're dropping file options
  assert(proto.edition === Edition.EDITION_UNKNOWN);
  return {
    name: proto.name,
    package: proto.package,
    messageType: proto.messageType.map(createDescriptorBoot),
    enumType: proto.enumType.map(createEnumDescriptorBoot),
  };
}

function createDescriptorBoot(proto: DescriptorProto) {
  assert(proto.extension.length == 0);
  assert(!proto.oneofDecl.length);
  assert(!proto.options);
  assert(!proto.reservedName.length); // we're also dropping reserved_range
  const b: DescriptorProtoBoot = {
    name: proto.name,
  };
  if (proto.field.length) {
    b.field = proto.field.map(createFieldDescriptorBoot);
  }
  if (proto.nestedType.length) {
    b.nestedType = proto.nestedType.map(createDescriptorBoot);
  }
  if (proto.enumType.length) {
    b.enumType = proto.enumType.map(createEnumDescriptorBoot);
  }
  if (proto.extensionRange.length) {
    b.extensionRange = proto.extensionRange.map((r) => {
      assert(!r.options);
      return { start: r.start, end: r.end };
    });
  }
  return b;
}

function createFieldDescriptorBoot(
  proto: FieldDescriptorProto,
): FieldDescriptorProtoBoot {
  assert(isFieldSet(FieldDescriptorProtoDesc, proto, "name"));
  assert(isFieldSet(FieldDescriptorProtoDesc, proto, "number"));
  assert(isFieldSet(FieldDescriptorProtoDesc, proto, "type"));
  assert(!isFieldSet(FieldDescriptorProtoDesc, proto, "oneofIndex"));
  assert(
    !isFieldSet(FieldDescriptorProtoDesc, proto, "jsonName") ||
      proto.jsonName === protoCamelCase(proto.name),
  );
  const b: FieldDescriptorProtoBoot = {
    name: proto.name,
    number: proto.number,
    type: proto.type,
  };
  if (isFieldSet(FieldDescriptorProtoDesc, proto, "label")) {
    b.label = proto.label;
  }
  if (isFieldSet(FieldDescriptorProtoDesc, proto, "typeName")) {
    b.typeName = proto.typeName;
  }
  if (isFieldSet(FieldDescriptorProtoDesc, proto, "extendee")) {
    b.extendee = proto.extendee;
  }
  if (isFieldSet(FieldDescriptorProtoDesc, proto, "defaultValue")) {
    b.defaultValue = proto.defaultValue;
  }
  if (proto.options) {
    b.options = createFieldOptionsBoot(proto.options);
  }
  return b;
}

function createFieldOptionsBoot(proto: FieldOptions): FieldOptionsBoot {
  const b: FieldOptionsBoot = {};
  assert(!isFieldSet(FieldOptionsDesc, proto, "ctype"));
  if (isFieldSet(FieldOptionsDesc, proto, "packed")) {
    b.packed = proto.packed;
  }
  assert(!isFieldSet(FieldOptionsDesc, proto, "jstype"));
  assert(!isFieldSet(FieldOptionsDesc, proto, "lazy"));
  assert(!isFieldSet(FieldOptionsDesc, proto, "unverifiedLazy"));
  if (isFieldSet(FieldOptionsDesc, proto, "deprecated")) {
    b.deprecated = proto.deprecated;
  }
  assert(!isFieldSet(FieldOptionsDesc, proto, "weak"));
  assert(!isFieldSet(FieldOptionsDesc, proto, "debugRedact"));
  if (isFieldSet(FieldOptionsDesc, proto, "retention")) {
    b.retention = proto.retention;
  }
  if (proto.targets.length) {
    b.targets = proto.targets;
  }
  if (proto.editionDefaults.length) {
    b.editionDefaults = proto.editionDefaults.map(
      (d): FieldOptions_EditionDefaultBoot => ({
        value: d.value,
        edition: d.edition,
      }),
    );
  }
  assert(!isFieldSet(FieldOptionsDesc, proto, "features"));
  assert(!isFieldSet(FieldOptionsDesc, proto, "uninterpretedOption"));
  return b;
}

function createEnumDescriptorBoot(
  proto: EnumDescriptorProto,
): EnumDescriptorProtoBoot {
  assert(!proto.reservedName.length);
  assert(!proto.reservedRange.length);
  assert(!proto.options);
  return {
    name: proto.name,
    value: proto.value.map((v): EnumValueDescriptorProtoBoot => {
      assert(!v.options);
      return {
        name: v.name,
        number: v.number,
      };
    }),
  };
}
