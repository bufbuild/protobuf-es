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
  DescriptorProto,
  Edition,
  EnumDescriptorProto,
  FeatureSet,
  FeatureSet_FieldPresence,
  FeatureSet_RepeatedFieldEncoding,
  FeatureSet_MessageEncoding,
  FeatureSet_EnumType,
  FieldDescriptorProto,
  FieldDescriptorProto_Type,
  FieldDescriptorProto_Label,
  FieldOptions_JSType,
  FileDescriptorProto,
  FileDescriptorSet,
  MethodDescriptorProto,
  MethodOptions_IdempotencyLevel,
  OneofDescriptorProto,
  ServiceDescriptorProto,
  EnumValueDescriptorProto,
} from "./wkt/gen/google/protobuf/descriptor_pb.js";
import {
  type DescEnum,
  type DescExtension,
  type DescField,
  type DescFile,
  type DescMessage,
  type DescMethod,
  type DescOneof,
  type DescService,
  ScalarType,
  type SupportedEdition,
} from "./descriptors.js";
import {
  parseTextFormatEnumValue,
  parseTextFormatScalarValue,
} from "./wire/text-format.js";
import { nestedTypes } from "./reflect/nested-types.js";
import { unsafeIsSetExplicit } from "./reflect/unsafe.js";
import { protoCamelCase, safeObjectProperty } from "./reflect/names.js";

/**
 * A set of descriptors for messages, enumerations, extensions,
 * and services.
 */
export interface Registry {
  readonly kind: "registry";
  /**
   * All types (message, enumeration, extension, or service) contained
   * in this registry.
   */
  [Symbol.iterator](): IterableIterator<
    DescMessage | DescEnum | DescExtension | DescService
  >;
  /**
   * Look up a type (message, enumeration, extension, or service) by
   * its fully qualified name.
   */
  get(
    typeName: string,
  ): DescMessage | DescEnum | DescExtension | DescService | undefined;
  /**
   * Look up a message descriptor by its fully qualified name.
   */
  getMessage(typeName: string): DescMessage | undefined;
  /**
   * Look up an enumeration descriptor by its fully qualified name.
   */
  getEnum(typeName: string): DescEnum | undefined;
  /**
   * Look up an extension descriptor by its fully qualified name.
   */
  getExtension(typeName: string): DescExtension | undefined;
  /**
   * Look up an extension by the extendee - the message it extends - and
   * the extension number.
   */
  getExtensionFor(extendee: DescMessage, no: number): DescExtension | undefined;
  /**
   * Look up a service descriptor by its fully qualified name.
   */
  getService(typeName: string): DescService | undefined;
}

/**
 * A set of descriptors for messages, enumerations, extensions,
 * and services - and files.
 */
export interface FileRegistry extends Registry {
  /**
   * All files in this registry.
   */
  readonly files: Iterable<DescFile>;
  /**
   * Look up a file descriptor by file name.
   */
  getFile(fileName: string): DescFile | undefined;
}

/**
 * Create a registry from the given inputs.
 *
 * An input can be:
 * - Any message, enum, service, or extension descriptor, which adds just the
 *   descriptor for this type.
 * - A file descriptor, which adds all typed defined in this file.
 * - A registry, which adds all types from the registry.
 *
 * For duplicate descriptors (same type name), the one given last wins.
 */
export function createRegistry(
  ...input: (
    | Registry
    | DescFile
    | DescMessage
    | DescEnum
    | DescExtension
    | DescService
  )[]
): Registry {
  const reg = createMutableRegistry();
  for (const i of input) {
    switch (i.kind) {
      case "registry":
        for (const n of i) {
          reg.add(n);
        }
        break;
      case "file":
        for (const n of nestedTypes(i)) {
          reg.add(n);
        }
        break;
      default:
        reg.add(i);
        break;
    }
  }
  return reg;
}

/**
 * Create a registry (including file descriptors) from a google.protobuf.FileDescriptorSet
 * message.
 */
export function createFileRegistry(
  fileDescriptorSet: FileDescriptorSet,
): FileRegistry;

/**
 * Create a registry (including file descriptors) from a google.protobuf.FileDescriptorProto
 * message. For every import, the given resolver function is called.
 */
export function createFileRegistry(
  fileDescriptorProto: FileDescriptorProto,
  resolve: (
    protoFileName: string,
  ) => FileDescriptorProto | DescFile | undefined,
): FileRegistry;

/**
 * Create a registry (including file descriptors) from one or more registries,
 * merging them.
 */
export function createFileRegistry(...registries: FileRegistry[]): FileRegistry;

export function createFileRegistry(
  ...args:
    | [fileDescriptorSet: FileDescriptorSet]
    | [
        fileDescriptorProto: FileDescriptorProto,
        resolve: (
          protoFileName: string,
        ) => FileDescriptorProto | DescFile | undefined,
      ]
    | FileRegistry[]
): FileRegistry {
  const registry = createMutableRegistry();
  if (
    "$typeName" in args[0] &&
    args[0].$typeName == "google.protobuf.FileDescriptorSet"
  ) {
    for (const file of args[0].file) {
      addFile(file, registry);
    }
    return registry;
  }
  if ("$typeName" in args[0]) {
    const input = args[0];
    const resolve = args[1] as (
      protoFileName: string,
    ) => FileDescriptorProto | DescFile | undefined;
    const seen = new Set<string>();
    // eslint-disable-next-line no-inner-declarations
    function recurseDeps(file: FileDescriptorProto): FileDescriptorProto[] {
      const deps: FileDescriptorProto[] = [];
      for (const protoFileName of file.dependency) {
        if (registry.getFile(protoFileName) != undefined) {
          continue;
        }
        if (seen.has(protoFileName)) {
          continue;
        }
        const dep = resolve(protoFileName);
        if (!dep) {
          throw new Error(
            `Unable to resolve ${protoFileName}, imported by ${file.name}`,
          );
        }
        if ("kind" in dep) {
          addDescFile(dep, registry);
        } else {
          seen.add(dep.name);
          deps.push(dep);
        }
      }
      return [...deps, ...deps.flatMap((dep) => recurseDeps(dep))];
    }
    for (const file of [input, ...recurseDeps(input)].reverse()) {
      addFile(file, registry);
    }
  } else {
    for (const fileReg of args as FileRegistry[]) {
      for (const file of fileReg.files) {
        registry.add(file);
        for (const type of nestedTypes(file)) {
          registry.add(type);
        }
      }
    }
  }
  return registry;
}

/**
 * A FileRegistry that allows adding and removing descriptors.
 * @private
 */
interface MutableRegistry extends FileRegistry {
  /**
   * Adds the given descriptor - but not types nested within - to the registry.
   */
  add(
    desc: DescFile | DescMessage | DescEnum | DescExtension | DescService,
  ): void;
  /**
   * Remove the given descriptor from the registry.
   */
  remove(
    desc: DescFile | DescMessage | DescEnum | DescExtension | DescService,
  ): void;
}

/**
 * Create a mutable file registry.
 * @private
 */
function createMutableRegistry(): MutableRegistry {
  const types = new Map<
    string,
    DescMessage | DescEnum | DescExtension | DescService
  >();
  const extendees = new Map<string, Map<number, DescExtension>>();
  const files = new Map<string, DescFile>();
  return {
    kind: "registry",
    [Symbol.iterator]() {
      return types.values();
    },
    get files() {
      return files.values();
    },
    add(desc) {
      switch (desc.kind) {
        case "file":
          files.set(desc.proto.name, desc);
          break;
        // @ts-expect-error TS7029: Fallthrough case in switch
        case "extension":
          // eslint-disable-next-line no-case-declarations
          let numberToExt = extendees.get(desc.extendee.typeName);
          if (!numberToExt) {
            extendees.set(
              desc.extendee.typeName,
              (numberToExt = new Map<number, DescExtension>()),
            );
          }
          numberToExt.set(desc.number, desc);
        // eslint-disable-next-line no-fallthrough
        default:
          types.set(desc.typeName, desc);
      }
    },
    remove(desc) {
      switch (desc.kind) {
        case "file":
          files.delete(desc.proto.name);
          break;
        default:
          types.delete(desc.typeName);
      }
    },
    get(typeName) {
      return types.get(typeName);
    },
    getFile(fileName) {
      return files.get(fileName);
    },
    getMessage(typeName) {
      const t = types.get(typeName);
      return t?.kind == "message" ? t : undefined;
    },
    getEnum(typeName) {
      const t = types.get(typeName);
      return t?.kind == "enum" ? t : undefined;
    },
    getExtension(typeName) {
      const t = types.get(typeName);
      return t?.kind == "extension" ? t : undefined;
    },
    getExtensionFor(
      extendee: DescMessage,
      no: number,
    ): DescExtension | undefined {
      return extendees.get(extendee.typeName)?.get(no);
    },
    getService(typeName) {
      const t = types.get(typeName);
      return t?.kind == "service" ? t : undefined;
    },
  };
}

/**
 * Add the file descriptor and the types it contains to the registry.
 */
function addDescFile(file: DescFile, reg: MutableRegistry) {
  reg.add(file);
  for (const type of nestedTypes(file)) {
    reg.add(type);
  }
  for (const dep of file.dependencies) {
    addDescFile(dep, reg);
  }
}

// bootstrap-inject google.protobuf.Edition.EDITION_PROTO2: const $name: Edition.$localName = $number;
const EDITION_PROTO2: Edition.EDITION_PROTO2 = 998;
// bootstrap-inject google.protobuf.Edition.EDITION_PROTO3: const $name: Edition.$localName = $number;
const EDITION_PROTO3: Edition.EDITION_PROTO3 = 999;

// bootstrap-inject google.protobuf.FieldDescriptorProto.Type.TYPE_STRING: const $name: FieldDescriptorProto_Type.$localName = $number;
const TYPE_STRING: FieldDescriptorProto_Type.STRING = 9;
// bootstrap-inject google.protobuf.FieldDescriptorProto.Type.TYPE_GROUP: const $name: FieldDescriptorProto_Type.$localName = $number;
const TYPE_GROUP: FieldDescriptorProto_Type.GROUP = 10;
// bootstrap-inject google.protobuf.FieldDescriptorProto.Type.TYPE_MESSAGE: const $name: FieldDescriptorProto_Type.$localName = $number;
const TYPE_MESSAGE: FieldDescriptorProto_Type.MESSAGE = 11;
// bootstrap-inject google.protobuf.FieldDescriptorProto.Type.TYPE_BYTES: const $name: FieldDescriptorProto_Type.$localName = $number;
const TYPE_BYTES: FieldDescriptorProto_Type.BYTES = 12;
// bootstrap-inject google.protobuf.FieldDescriptorProto.Type.TYPE_ENUM: const $name: FieldDescriptorProto_Type.$localName = $number;
const TYPE_ENUM: FieldDescriptorProto_Type.ENUM = 14;

// bootstrap-inject google.protobuf.FieldDescriptorProto.Label.LABEL_REPEATED: const $name: FieldDescriptorProto_Label.$localName = $number;
const LABEL_REPEATED: FieldDescriptorProto_Label.REPEATED = 3;
// bootstrap-inject google.protobuf.FieldDescriptorProto.Label.LABEL_REQUIRED: const $name: FieldDescriptorProto_Label.$localName = $number;
const LABEL_REQUIRED: FieldDescriptorProto_Label.REQUIRED = 2;

// bootstrap-inject google.protobuf.FieldOptions.JSType.JS_STRING: const $name: FieldOptions_JSType.$localName = $number;
const JS_STRING: FieldOptions_JSType.JS_STRING = 1;

// bootstrap-inject google.protobuf.MethodOptions.IdempotencyLevel.IDEMPOTENCY_UNKNOWN: const $name: MethodOptions_IdempotencyLevel.$localName = $number;
const IDEMPOTENCY_UNKNOWN: MethodOptions_IdempotencyLevel.IDEMPOTENCY_UNKNOWN = 0;

// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.EXPLICIT: const $name: FeatureSet_FieldPresence.$localName = $number;
const EXPLICIT: FeatureSet_FieldPresence.EXPLICIT = 1;
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.IMPLICIT: const $name: FeatureSet_FieldPresence.$localName = $number;
const IMPLICIT: FeatureSet_FieldPresence.IMPLICIT = 2;
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.LEGACY_REQUIRED: const $name: FeatureSet_FieldPresence.$localName = $number;
const LEGACY_REQUIRED: FeatureSet_FieldPresence.LEGACY_REQUIRED = 3;

// bootstrap-inject google.protobuf.FeatureSet.RepeatedFieldEncoding.PACKED: const $name: FeatureSet_RepeatedFieldEncoding.$localName = $number;
const PACKED: FeatureSet_RepeatedFieldEncoding.PACKED = 1;

// bootstrap-inject google.protobuf.FeatureSet.MessageEncoding.DELIMITED: const $name: FeatureSet_MessageEncoding.$localName = $number;
const DELIMITED: FeatureSet_MessageEncoding.DELIMITED = 2;

// bootstrap-inject google.protobuf.FeatureSet.EnumType.OPEN: const $name: FeatureSet_EnumType.$localName = $number;
const OPEN: FeatureSet_EnumType.OPEN = 1;

// prettier-ignore
// bootstrap-inject defaults: EDITION_PROTO2 to EDITION_2023: export const minimumEdition: SupportedEdition = $minimumEdition, maximumEdition: SupportedEdition = $maximumEdition;
// generated from protoc v27.0
export const minimumEdition: SupportedEdition = 998, maximumEdition: SupportedEdition = 1000;
const featureDefaults = {
  // EDITION_PROTO2
  998: {
    fieldPresence: 1, // EXPLICIT,
    enumType: 2, // CLOSED,
    repeatedFieldEncoding: 2, // EXPANDED,
    utf8Validation: 3, // NONE,
    messageEncoding: 1, // LENGTH_PREFIXED,
    jsonFormat: 2, // LEGACY_BEST_EFFORT,
  },
  // EDITION_PROTO3
  999: {
    fieldPresence: 2, // IMPLICIT,
    enumType: 1, // OPEN,
    repeatedFieldEncoding: 1, // PACKED,
    utf8Validation: 2, // VERIFY,
    messageEncoding: 1, // LENGTH_PREFIXED,
    jsonFormat: 1, // ALLOW,
  },
  // EDITION_2023
  1000: {
    fieldPresence: 1, // EXPLICIT,
    enumType: 1, // OPEN,
    repeatedFieldEncoding: 1, // PACKED,
    utf8Validation: 2, // VERIFY,
    messageEncoding: 1, // LENGTH_PREFIXED,
    jsonFormat: 1, // ALLOW,
  },
} as const;

/**
 * Create a descriptor for a file, add it to the registry.
 */
function addFile(proto: FileDescriptorProto, reg: MutableRegistry): void {
  const file: DescFile = {
    kind: "file",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    edition: getFileEdition(proto),
    name: proto.name.replace(/\.proto$/, ""),
    dependencies: findFileDependencies(proto, reg),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString(): string {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- we asserted above
      return `file ${proto.name}`;
    },
  };
  const mapEntriesStore = new Map<string, DescMessage>();
  const mapEntries: FileMapEntries = {
    get(typeName) {
      return mapEntriesStore.get(typeName);
    },
    add(desc) {
      assert(desc.proto.options?.mapEntry === true);
      mapEntriesStore.set(desc.typeName, desc);
    },
  };
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, undefined, reg);
  }
  for (const messageProto of proto.messageType) {
    addMessage(messageProto, file, undefined, reg, mapEntries);
  }
  for (const serviceProto of proto.service) {
    addService(serviceProto, file, reg);
  }
  addExtensions(file, reg);
  for (const mapEntry of mapEntriesStore.values()) {
    // to create a map field, we need access to the map entry's fields
    addFields(mapEntry, reg, mapEntries);
  }
  for (const message of file.messages) {
    addFields(message, reg, mapEntries);
    addExtensions(message, reg);
  }
  reg.add(file);
}

/**
 * Stores map entries - messages for map fields synthesized by the compiler.
 * We need to track them while we create a DescFile from a FileDescriptorProto.
 */
interface FileMapEntries {
  add(desc: DescMessage): void;
  get(typeName: string): DescMessage | undefined;
}

/**
 * Create descriptors for extensions, and add them to the message / file,
 * and to our cart.
 * Recurses into nested types.
 */
function addExtensions(
  desc: DescFile | DescMessage,
  reg: MutableRegistry,
): void {
  switch (desc.kind) {
    case "file":
      for (const proto of desc.proto.extension) {
        const ext = newField(proto, desc, reg);
        desc.extensions.push(ext);
        reg.add(ext);
      }
      break;
    case "message":
      for (const proto of desc.proto.extension) {
        const ext = newField(proto, desc, reg);
        desc.nestedExtensions.push(ext);
        reg.add(ext);
      }
      for (const message of desc.nestedMessages) {
        addExtensions(message, reg);
      }
      break;
  }
}

/**
 * Create descriptors for fields and oneof groups, and add them to the message.
 * Recurses into nested types.
 */
function addFields(
  message: DescMessage,
  reg: Registry,
  mapEntries: FileMapEntries,
): void {
  const allOneofs = message.proto.oneofDecl.map((proto) =>
    newOneof(proto, message),
  );
  const oneofsSeen = new Set<DescOneof>();
  for (const proto of message.proto.field) {
    const oneof = findOneof(proto, allOneofs);
    const field = newField(proto, message, reg, oneof, mapEntries);
    message.fields.push(field);
    message.field[field.localName] = field;
    if (oneof === undefined) {
      message.members.push(field);
    } else {
      oneof.fields.push(field);
      if (!oneofsSeen.has(oneof)) {
        oneofsSeen.add(oneof);
        message.members.push(oneof);
      }
    }
  }
  for (const oneof of allOneofs.filter((o) => oneofsSeen.has(o))) {
    message.oneofs.push(oneof);
  }
  for (const child of message.nestedMessages) {
    addFields(child, reg, mapEntries);
  }
}

/**
 * Create a descriptor for an enumeration, and add it our cart and to the
 * parent type, if any.
 */
function addEnum(
  proto: EnumDescriptorProto,
  file: DescFile,
  parent: DescMessage | undefined,
  reg: MutableRegistry,
): void {
  const sharedPrefix = findEnumSharedPrefix(proto.name, proto.value);
  const desc: { -readonly [P in keyof DescEnum]: DescEnum[P] } = {
    kind: "enum",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    file,
    parent,
    open: true,
    name: proto.name,
    typeName: makeTypeName(proto, parent, file),
    values: [],
    sharedPrefix,
    toString(): string {
      return `enum ${this.typeName}`;
    },
  };
  desc.open = isEnumOpen(desc);
  reg.add(desc);
  proto.value.forEach((proto) => {
    const name = proto.name;
    desc.values.push({
      kind: "enum_value",
      proto,
      deprecated: proto.options?.deprecated ?? false,
      parent: desc,
      name: proto.name,
      localName: safeObjectProperty(
        sharedPrefix == undefined ? name : name.substring(sharedPrefix.length),
      ),
      number: proto.number,
      toString() {
        return `enum value ${desc.typeName}.${this.name}`;
      },
    });
  });
  (parent?.nestedEnums ?? file.enums).push(desc);
}

/**
 * Create a descriptor for a message, including nested types, and add it to our
 * cart. Note that this does not create descriptors fields.
 */
function addMessage(
  proto: DescriptorProto,
  file: DescFile,
  parent: DescMessage | undefined,
  reg: MutableRegistry,
  mapEntries: FileMapEntries,
): void {
  const desc: DescMessage = {
    kind: "message",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    file,
    parent,
    name: proto.name,
    typeName: makeTypeName(proto, parent, file),
    fields: [],
    field: {},
    oneofs: [],
    members: [],
    nestedEnums: [],
    nestedMessages: [],
    nestedExtensions: [],
    toString(): string {
      return `message ${this.typeName}`;
    },
  };
  if (proto.options?.mapEntry === true) {
    mapEntries.add(desc);
  } else {
    (parent?.nestedMessages ?? file.messages).push(desc);
    reg.add(desc);
  }
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, desc, reg);
  }
  for (const messageProto of proto.nestedType) {
    addMessage(messageProto, file, desc, reg, mapEntries);
  }
}

/**
 * Create a descriptor for a service, including methods, and add it to our
 * cart.
 */
function addService(
  proto: ServiceDescriptorProto,
  file: DescFile,
  reg: MutableRegistry,
): void {
  const desc: DescService = {
    kind: "service",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    file,
    name: proto.name,
    typeName: makeTypeName(proto, undefined, file),
    methods: [],
    method: {},
    toString(): string {
      return `service ${this.typeName}`;
    },
  };
  file.services.push(desc);
  reg.add(desc);
  for (const methodProto of proto.method) {
    const method = newMethod(methodProto, desc, reg);
    desc.methods.push(method);
    desc.method[method.localName] = method;
  }
}

/**
 * Create a descriptor for a method.
 */
function newMethod(
  proto: MethodDescriptorProto,
  parent: DescService,
  reg: Registry,
): DescMethod {
  let methodKind: DescMethod["methodKind"];
  if (proto.clientStreaming && proto.serverStreaming) {
    methodKind = "bidi_streaming";
  } else if (proto.clientStreaming) {
    methodKind = "client_streaming";
  } else if (proto.serverStreaming) {
    methodKind = "server_streaming";
  } else {
    methodKind = "unary";
  }
  const input = reg.getMessage(trimLeadingDot(proto.inputType));
  const output = reg.getMessage(trimLeadingDot(proto.outputType));
  assert(
    input,
    `invalid MethodDescriptorProto: input_type ${proto.inputType} not found`,
  );
  assert(
    output,
    `invalid MethodDescriptorProto: output_type ${proto.inputType} not found`,
  );
  const name = proto.name;
  return {
    kind: "rpc",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    parent,
    name,
    localName: safeObjectProperty(
      name.length
        ? safeObjectProperty(name[0].toLowerCase() + name.substring(1))
        : name,
    ),
    methodKind,
    input,
    output,
    idempotency: proto.options?.idempotencyLevel ?? IDEMPOTENCY_UNKNOWN,
    toString() {
      return `rpc ${parent.typeName}.${name}`;
    },
  };
}

/**
 * Create a descriptor for a oneof group.
 */
function newOneof(proto: OneofDescriptorProto, parent: DescMessage): DescOneof {
  return {
    kind: "oneof",
    proto,
    deprecated: false,
    parent,
    fields: [],
    name: proto.name,
    localName: safeObjectProperty(protoCamelCase(proto.name)),
    toString(): string {
      return `oneof ${parent.typeName}.${this.name}`;
    },
  };
}

/**
 * Create a descriptor for a field.
 */
function newField(
  proto: FieldDescriptorProto,
  parent: DescMessage,
  reg: Registry,
  oneof: DescOneof | undefined,
  mapEntries: FileMapEntries,
): DescField;

/**
 * Create a descriptor for an extension field.
 */
function newField(
  proto: FieldDescriptorProto,
  parent: DescFile | DescMessage,
  reg: Registry,
): DescExtension;

function newField(
  proto: FieldDescriptorProto,
  parentOrFile: DescMessage | DescFile,
  reg: Registry,
  oneof?: DescOneof | undefined,
  mapEntries?: FileMapEntries,
): DescField | DescExtension {
  const isExtension = mapEntries === undefined;
  type AllKeys =
    | keyof DescField
    | keyof DescExtension
    | keyof (DescField & { fieldKind: "message" })
    | keyof (DescField & { fieldKind: "map" })
    | keyof (DescField & { fieldKind: "list" })
    | keyof (DescField & { fieldKind: "scalar" });
  const field: Partial<Record<AllKeys, unknown>> = {
    kind: "field",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    name: proto.name,
    number: proto.number,
    scalar: undefined,
    message: undefined,
    enum: undefined,
    presence: getFieldPresence(proto, oneof, isExtension, parentOrFile),
    listKind: undefined,
    mapKind: undefined,
    mapKey: undefined,
    delimitedEncoding: undefined,
    packed: undefined,
    longAsString: false,
    getDefaultValue: undefined,
  };
  if (isExtension) {
    // extension field
    const file = parentOrFile.kind == "file" ? parentOrFile : parentOrFile.file;
    const parent = parentOrFile.kind == "file" ? undefined : parentOrFile;
    const typeName = makeTypeName(proto, parent, file);
    field.kind = "extension";
    field.file = file;
    field.parent = parent;
    field.oneof = undefined;
    field.typeName = typeName;
    field.jsonName = `[${typeName}]`; // option json_name is not allowed on extension fields
    field.toString = () => `extension ${typeName}`;
    const extendee = reg.getMessage(trimLeadingDot(proto.extendee));
    assert(
      extendee,
      `invalid FieldDescriptorProto: extendee ${proto.extendee} not found`,
    );
    field.extendee = extendee;
  } else {
    // regular field
    const parent = parentOrFile;
    assert(parent.kind == "message");
    field.parent = parent;
    field.oneof = oneof;
    field.localName = oneof
      ? protoCamelCase(proto.name)
      : safeObjectProperty(protoCamelCase(proto.name));
    field.jsonName = proto.jsonName;
    field.toString = () => `field ${parent.typeName}.${proto.name}`;
  }
  const label: FieldDescriptorProto_Label = proto.label;
  const type: FieldDescriptorProto_Type = proto.type;
  const jstype: FieldOptions_JSType | undefined = proto.options?.jstype;
  if (label === LABEL_REPEATED) {
    // list or map field
    const mapEntry =
      type == TYPE_MESSAGE
        ? mapEntries?.get(trimLeadingDot(proto.typeName))
        : undefined;
    if (mapEntry) {
      // map field
      field.fieldKind = "map";
      const { key, value } = findMapEntryFields(mapEntry);
      field.mapKey = key.scalar;
      field.mapKind = value.fieldKind;
      field.message = value.message;
      field.delimitedEncoding = false; // map fields are always LENGTH_PREFIXED
      field.enum = value.enum;
      field.scalar = value.scalar;
      return field as DescField;
    }
    // list field
    field.fieldKind = "list";
    switch (type) {
      case TYPE_MESSAGE:
      case TYPE_GROUP:
        field.listKind = "message";
        field.message = reg.getMessage(trimLeadingDot(proto.typeName));
        assert(field.message);
        field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
        break;
      case TYPE_ENUM:
        field.listKind = "enum";
        field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
        assert(field.enum);
        break;
      default:
        field.listKind = "scalar";
        field.scalar = type;
        field.longAsString = jstype == JS_STRING;
        break;
    }
    field.packed = isPackedField(proto, parentOrFile);
    return field as DescField | DescExtension;
  }
  // singular
  switch (type) {
    case TYPE_MESSAGE:
    case TYPE_GROUP:
      field.fieldKind = "message";
      field.message = reg.getMessage(trimLeadingDot(proto.typeName));
      assert(
        field.message,
        `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`,
      );
      field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
      field.getDefaultValue = () => undefined;
      break;
    case TYPE_ENUM: {
      const enumeration = reg.getEnum(trimLeadingDot(proto.typeName));
      assert(
        enumeration !== undefined,
        `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`,
      );
      field.fieldKind = "enum";
      field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
      field.getDefaultValue = () => {
        return unsafeIsSetExplicit(proto, "defaultValue")
          ? parseTextFormatEnumValue(enumeration, proto.defaultValue)
          : undefined;
      };
      break;
    }
    default: {
      field.fieldKind = "scalar";
      field.scalar = type;
      field.longAsString = jstype == JS_STRING;
      field.getDefaultValue = () => {
        return unsafeIsSetExplicit(proto, "defaultValue")
          ? parseTextFormatScalarValue(
              type as number as ScalarType,
              proto.defaultValue,
            )
          : undefined;
      };
      break;
    }
  }
  return field as DescField | DescExtension;
}

/**
 * Parse the "syntax" and "edition" fields, returning one of the supported
 * editions.
 */
function getFileEdition(proto: FileDescriptorProto): SupportedEdition {
  switch (proto.syntax) {
    case "":
    case "proto2":
      return EDITION_PROTO2;
    case "proto3":
      return EDITION_PROTO3;
    case "editions":
      if (proto.edition in featureDefaults) {
        return proto.edition as SupportedEdition;
      }
      throw new Error(`${proto.name}: unsupported edition`);
    default:
      throw new Error(`${proto.name}: unsupported syntax "${proto.syntax}"`);
  }
}

/**
 * Resolve dependencies of FileDescriptorProto to DescFile.
 */
function findFileDependencies(
  proto: FileDescriptorProto,
  reg: FileRegistry,
): DescFile[] {
  return proto.dependency.map((wantName) => {
    const dep = reg.getFile(wantName);
    if (!dep) {
      throw new Error(`Cannot find ${wantName}, imported by ${proto.name}`);
    }
    return dep;
  });
}

/**
 * Finds a prefix shared by enum values, for example `my_enum_` for
 * `enum MyEnum {MY_ENUM_A=0; MY_ENUM_B=1;}`.
 */
function findEnumSharedPrefix(
  enumName: string,
  values: EnumValueDescriptorProto[],
): string | undefined {
  const prefix = camelToSnakeCase(enumName) + "_";
  for (const value of values) {
    if (!value.name.toLowerCase().startsWith(prefix)) {
      return undefined;
    }
    const shortName = value.name.substring(prefix.length);
    if (shortName.length == 0) {
      return undefined;
    }
    if (/^\d/.test(shortName)) {
      // identifiers must not start with numbers
      return undefined;
    }
  }
  return prefix;
}

/**
 * Converts lowerCamelCase or UpperCamelCase into lower_snake_case.
 * This is used to find shared prefixes in an enum.
 */
function camelToSnakeCase(camel: string): string {
  return (
    camel.substring(0, 1) + camel.substring(1).replace(/[A-Z]/g, (c) => "_" + c)
  ).toLowerCase();
}

/**
 * Create a fully qualified name for a protobuf type or extension field.
 *
 * The fully qualified name for messages, enumerations, and services is
 * constructed by concatenating the package name (if present), parent
 * message names (for nested types), and the type name. We omit the leading
 * dot added by protobuf compilers. Examples:
 * - mypackage.MyMessage
 * - mypackage.MyMessage.NestedMessage
 *
 * The fully qualified name for extension fields is constructed by
 * concatenating the package name (if present), parent message names (for
 * extensions declared within a message), and the field name. Examples:
 * - mypackage.extfield
 * - mypackage.MyMessage.extfield
 */
function makeTypeName(
  proto:
    | DescriptorProto
    | ServiceDescriptorProto
    | EnumDescriptorProto
    | FieldDescriptorProto,
  parent: DescMessage | DescService | undefined,
  file: DescFile,
): string {
  let typeName: string;
  if (parent) {
    typeName = `${parent.typeName}.${proto.name}`;
  } else if (file.proto.package.length > 0) {
    typeName = `${file.proto.package}.${proto.name}`;
  } else {
    typeName = `${proto.name}`;
  }
  return typeName;
}

/**
 * Remove the leading dot from a fully qualified type name.
 */
function trimLeadingDot(typeName: string): string {
  return typeName.startsWith(".") ? typeName.substring(1) : typeName;
}

/**
 * Did the user put the field in a oneof group?
 * Synthetic oneofs for proto3 optionals are ignored.
 */
function findOneof(
  proto: FieldDescriptorProto,
  allOneofs: DescOneof[],
): DescOneof | undefined {
  if (!unsafeIsSetExplicit(proto, "oneofIndex")) {
    return undefined;
  }
  if (proto.proto3Optional) {
    return undefined;
  }
  const oneof = allOneofs[proto.oneofIndex];
  assert(
    oneof,
    `invalid FieldDescriptorProto: oneof #${proto.oneofIndex} for field #${proto.number} not found`,
  );
  return oneof;
}

/**
 * Presence of the field.
 * See https://protobuf.dev/programming-guides/field_presence/
 */
function getFieldPresence(
  proto: FieldDescriptorProto,
  oneof: DescOneof | undefined,
  isExtension: boolean,
  parent: DescMessage | DescFile,
): FeatureSet_FieldPresence {
  if (proto.label == LABEL_REQUIRED) {
    // proto2 required is LEGACY_REQUIRED
    return LEGACY_REQUIRED;
  }
  if (proto.label == LABEL_REPEATED) {
    // repeated fields (including maps) do not track presence
    return IMPLICIT;
  }
  if (!!oneof || proto.proto3Optional) {
    // oneof is always explicit
    return EXPLICIT;
  }
  if (proto.type == TYPE_MESSAGE) {
    // singular message field cannot be implicit
    return EXPLICIT;
  }
  if (isExtension) {
    // extensions always track presence
    return EXPLICIT;
  }
  return resolveFeature("fieldPresence", { proto, parent });
}

/**
 * Pack this repeated field?
 */
function isPackedField(
  proto: FieldDescriptorProto,
  parent: DescMessage | DescFile,
): boolean {
  if (proto.label != LABEL_REPEATED) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (proto.type) {
    case TYPE_STRING:
    case TYPE_BYTES:
    case TYPE_GROUP:
    case TYPE_MESSAGE:
      // length-delimited types cannot be packed
      return false;
  }
  const o = proto.options;
  if (o && unsafeIsSetExplicit(o, "packed")) {
    // prefer the field option over edition features
    return o.packed;
  }
  return (
    PACKED ==
    resolveFeature("repeatedFieldEncoding", {
      proto,
      parent,
    })
  );
}

/**
 * Find the key and value fields of a synthetic map entry message.
 */
function findMapEntryFields(mapEntry: DescMessage): {
  key: DescField & { fieldKind: "scalar" };
  value: DescField & { fieldKind: "enum" | "scalar" | "message" };
} {
  const key = mapEntry.fields.find((f) => f.number === 1);
  const value = mapEntry.fields.find((f) => f.number === 2);
  assert(
    key &&
      key.fieldKind == "scalar" &&
      key.scalar != ScalarType.BYTES &&
      key.scalar != ScalarType.FLOAT &&
      key.scalar != ScalarType.DOUBLE &&
      value &&
      value.fieldKind != "list" &&
      value.fieldKind != "map",
  );
  return { key, value };
}

/**
 * Enumerations can be open or closed.
 * See https://protobuf.dev/programming-guides/enum/
 */
function isEnumOpen(desc: DescEnum): boolean {
  return (
    OPEN ==
    resolveFeature("enumType", {
      proto: desc.proto,
      parent: desc.parent ?? desc.file,
    })
  );
}

/**
 * Encode the message delimited (a.k.a. proto2 group encoding), or
 * length-prefixed?
 */
function isDelimitedEncoding(
  proto: FieldDescriptorProto,
  parent: DescMessage | DescFile,
): boolean {
  if (proto.type == TYPE_GROUP) {
    return true;
  }
  return (
    DELIMITED ==
    resolveFeature("messageEncoding", {
      proto,
      parent,
    })
  );
}

/**
 * A google.protobuf.FeatureSet with just numeric properties.
 */
type Features = {
  [P in keyof FeatureSet as FeatureSet[P] extends number
    ? P
    : never]: FeatureSet[P];
};

/**
 * One of the numeric properties of google.protobuf.FeatureSet, excluding 0.
 */
type ResolvedFeature<Name extends keyof Features> = Exclude<
  FeatureSet[Name],
  0
>;

function resolveFeature<Name extends keyof Features>(
  name: Name,
  ref:
    | DescFile
    | DescMessage
    | {
        proto: DescriptorProto | FieldDescriptorProto | EnumDescriptorProto;
        parent: DescMessage | DescFile;
      },
): ResolvedFeature<Name> {
  const featureSet = ref.proto.options?.features;
  if (featureSet) {
    const val = featureSet[name];
    if (val != 0) {
      return val as unknown as ResolvedFeature<Name>;
    }
  }
  if ("kind" in ref) {
    if (ref.kind == "message") {
      return resolveFeature(name, ref.parent ?? ref.file);
    }
    const editionDefaults = (
      featureDefaults as Record<number, Features | undefined>
    )[ref.edition];
    if (!editionDefaults) {
      throw new Error(`feature default for edition ${ref.edition} not found`);
    }
    return editionDefaults[name] as unknown as ResolvedFeature<Name>;
  }
  return resolveFeature(name, ref.parent);
}

/**
 * Assert that condition is truthy or throw error (with message)
 */
function assert(condition: unknown, msg?: string): asserts condition {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- we want the implicit conversion to boolean
  if (!condition) {
    throw new Error(msg);
  }
}
