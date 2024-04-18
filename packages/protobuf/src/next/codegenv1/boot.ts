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

import type {
  DescriptorProto_ExtensionRange,
  FieldDescriptorProto_Label,
  FieldDescriptorProto_Type,
  FieldOptions_OptionRetention,
  FieldOptions_OptionTargetType,
  FieldOptions_EditionDefault,
  EnumValueDescriptorProto,
  FileDescriptorProto,
  DescriptorProto,
  FieldDescriptorProto,
  FieldOptions,
  EnumDescriptorProto,
} from "../wkt/gen/google/protobuf/descriptor_pbv2.js";
import type { DescFile } from "../../desc-types.js";
import { restoreJsonNames } from "./restore-json-names.js";
import { createFileRegistry } from "../reflect/registry.js";
import { assert } from "../reflect/assert.js";

/**
 * Hydrate a file descriptor for google/protobuf/descriptor.proto from a plain
 * object.
 *
 * See createFileDescriptorProtoBoot() for details.
 *
 * @private
 */
export function boot(boot: FileDescriptorProtoBoot): DescFile {
  const root = bootFileDescriptorProto(boot);
  root.messageType.forEach(restoreJsonNames);
  const reg = createFileRegistry(root, () => undefined);
  const file = reg.getFile(root.name);
  assert(file);
  return file;
}

/**
 * An object literal for initializing the message google.protobuf.FileDescriptorProto
 * for google/protobuf/descriptor.proto.
 *
 * See createFileDescriptorProtoBoot() for details.
 *
 * @private
 */
export type FileDescriptorProtoBoot = {
  name: "google/protobuf/descriptor.proto";
  package: "google.protobuf";
  messageType: DescriptorProtoBoot[];
  enumType: EnumDescriptorProtoBoot[];
};

export type DescriptorProtoBoot = {
  name: string;
  field?: FieldDescriptorProtoBoot[];
  nestedType?: DescriptorProtoBoot[];
  enumType?: EnumDescriptorProtoBoot[];
  extensionRange?: Pick<DescriptorProto_ExtensionRange, "start" | "end">[];
};

export type FieldDescriptorProtoBoot = {
  name: string;
  number: number;
  label?: FieldDescriptorProto_Label;
  type: FieldDescriptorProto_Type;
  typeName?: string;
  extendee?: string;
  defaultValue?: string;
  options?: FieldOptionsBoot;
};

export type FieldOptionsBoot = {
  packed?: boolean;
  deprecated?: boolean;
  retention?: FieldOptions_OptionRetention;
  targets?: FieldOptions_OptionTargetType[];
  editionDefaults?: FieldOptions_EditionDefaultBoot[];
};

export type FieldOptions_EditionDefaultBoot = Pick<
  FieldOptions_EditionDefault,
  "edition" | "value"
>;

export type EnumDescriptorProtoBoot = {
  name: string;
  value: EnumValueDescriptorProtoBoot[];
};

export type EnumValueDescriptorProtoBoot = Pick<
  EnumValueDescriptorProto,
  "name" | "number"
>;

/**
 * Creates the message google.protobuf.FileDescriptorProto from an object literal.
 *
 * See createFileDescriptorProtoBoot() for details.
 *
 * @private
 */
export function bootFileDescriptorProto(
  init: FileDescriptorProtoBoot,
): FileDescriptorProto {
  type Prototype = Pick<FileDescriptorProto, "edition" | "syntax">;
  const proto = Object.create({
    syntax: "",
    edition: 0,
  } satisfies Prototype) as Prototype;
  return Object.assign(proto, {
    $typeName: "google.protobuf.FileDescriptorProto" as const,
    dependency: [],
    publicDependency: [],
    weakDependency: [],
    service: [],
    extension: [],
    ...init,
    messageType: init.messageType.map(bootDescriptorProto),
    enumType: init.enumType.map(bootEnumDescriptorProto),
  });
}

function bootDescriptorProto(init: DescriptorProtoBoot): DescriptorProto {
  return {
    $typeName: "google.protobuf.DescriptorProto",
    name: init.name,
    field: init.field?.map(bootFieldDescriptorProto) ?? [],
    extension: [],
    nestedType: init.nestedType?.map(bootDescriptorProto) ?? [],
    enumType: init.enumType?.map(bootEnumDescriptorProto) ?? [],
    extensionRange:
      init.extensionRange?.map((e) => ({
        $typeName: "google.protobuf.DescriptorProto.ExtensionRange",
        ...e,
      })) ?? [],
    oneofDecl: [],
    reservedRange: [],
    reservedName: [],
  };
}

function bootFieldDescriptorProto(
  init: FieldDescriptorProtoBoot,
): FieldDescriptorProto {
  type Prototype = Pick<
    FieldDescriptorProto,
    | "label"
    | "typeName"
    | "extendee"
    | "defaultValue"
    | "oneofIndex"
    | "jsonName"
    | "proto3Optional"
  >;
  const proto = Object.create({
    label: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    proto3Optional: false,
  } satisfies Prototype) as Prototype;
  return Object.assign(proto, {
    $typeName: "google.protobuf.FieldDescriptorProto" as const,
    ...init,
    options: init.options ? bootFieldOptions(init.options) : undefined,
  });
}

function bootFieldOptions(init: FieldOptionsBoot): FieldOptions {
  type Prototype = Pick<
    FieldOptions,
    | "ctype"
    | "packed"
    | "jstype"
    | "lazy"
    | "unverifiedLazy"
    | "deprecated"
    | "weak"
    | "debugRedact"
    | "retention"
  >;
  const proto = Object.create({
    ctype: 0,
    packed: false,
    jstype: 0,
    lazy: false,
    unverifiedLazy: false,
    deprecated: false,
    weak: false,
    debugRedact: false,
    retention: 0,
  } satisfies Prototype) as Prototype;
  return Object.assign(proto, {
    $typeName: "google.protobuf.FieldOptions" as const,
    ...init,
    targets: init.targets ?? [],
    editionDefaults:
      init.editionDefaults?.map((e) => ({
        $typeName: "google.protobuf.FieldOptions.EditionDefault" as const,
        ...e,
      })) ?? [],
    uninterpretedOption: [],
  });
}

function bootEnumDescriptorProto(
  init: EnumDescriptorProtoBoot,
): EnumDescriptorProto {
  return {
    $typeName: "google.protobuf.EnumDescriptorProto",
    name: init.name,
    reservedName: [],
    reservedRange: [],
    value: init.value.map((e) => ({
      $typeName: "google.protobuf.EnumValueDescriptorProto",
      ...e,
    })),
  };
}
