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
  FieldDescriptorProto,
  MethodDescriptorProto,
  OneofDescriptorProto,
  ServiceDescriptorProto,
} from "../../google/protobuf/descriptor_pb.js";
import {
  FileDescriptorProto,
  FileDescriptorSet,
} from "../../google/protobuf/descriptor_pb.js";
import { assert } from "../../private/assert.js";
import type {
  AnyDesc,
  DescEnum,
  DescExtension,
  DescField,
  DescFile,
  DescMessage,
  DescMethod,
  DescOneof,
  DescService,
  ResolvedFeatureSet,
} from "../../descriptor-set.js";
import { MethodIdempotency, MethodKind } from "../../service-type.js";
import { fieldJsonName, findEnumSharedPrefix } from "../../private/names.js";
import {
  parseTextFormatEnumValue,
  parseTextFormatScalarValue,
} from "../../private/text-format.js";
import { LongType, ScalarType } from "./scalar.js";
import type { AnyMessage, Message } from "../../message.js";
import { nestedTypes } from "./nested-types.js";
import { unsafeIsSetExplicit } from "./unsafe.js";

/**
 * A set of descriptors for messages, enumerations, extensions,
 * and services.
 */
export interface DescSet {
  readonly kind: "set";
  /**
   * All types (message, enumeration, extension, or service) contained
   * in this set.
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
export interface DescFileSet extends DescSet {
  /**
   * All files in this set.
   */
  readonly files: Iterable<DescFile>;
  /**
   * Look up a file descriptor by file name.
   */
  getFile(fileName: string): DescFile | undefined;
}

/**
 * Create a set of descriptors from the given inputs.
 *
 * An input can be:
 * - Any message, enum, service, or extension descriptor, which adds just the
 *   descriptor for this type.
 * - A file descriptor, which adds all typed defined in this file.
 * - A set of descriptors, which adds all types from the set.
 *
 * For duplicate descriptors (same type name), the one given last wins.
 */
export function createDescSet(
  ...input: (
    | DescSet
    | DescFile
    | DescMessage
    | DescEnum
    | DescExtension
    | DescService
  )[]
): DescSet {
  const set = createMutableDescFileSet();
  for (const i of input) {
    switch (i.kind) {
      case "set":
        for (const n of i) {
          set.add(n);
        }
        break;
      case "file":
        for (const n of nestedTypes(i)) {
          set.add(n);
        }
        break;
      default:
        set.add(i);
        break;
    }
  }
  return set;
}

/**
 * Create a set of descriptors (including file descriptors) from
 * a google.protobuf.FileDescriptorSet message.
 */
export function createDescFileSet(
  fileDescriptorSet: FileDescriptorSet,
): DescFileSet;

/**
 * Create a set of descriptors (including file descriptors) from
 * a google.protobuf.FileDescriptorProto message. For every import, the given
 * resolver function is called.
 */
export function createDescFileSet(
  fileDescriptorProto: FileDescriptorProto,
  resolve: (
    protoFileName: string,
  ) => FileDescriptorProto | DescFile | undefined,
): DescFileSet;

/**
 * Create a set of descriptors (including file descriptors) from
 * one or more sets of descriptors, merging them.
 */
export function createDescFileSet(...descFileSet: DescFileSet[]): DescFileSet;

export function createDescFileSet(
  ...args:
    | [fileDescriptorSet: FileDescriptorSet]
    | [
        fileDescriptorProto: FileDescriptorProto,
        resolve: (
          protoFileName: string,
        ) => FileDescriptorProto | DescFile | undefined,
      ]
    | DescFileSet[]
): DescFileSet {
  const set = createMutableDescFileSet();
  if (args[0] instanceof FileDescriptorSet) {
    for (const file of args[0].file) {
      addFile(file, set);
    }
    return set;
  } else if (args[0] instanceof FileDescriptorProto) {
    const input = args[0];
    const resolve = args[1] as (
      protoFileName: string,
    ) => FileDescriptorProto | DescFile | undefined;
    const seen = new Set<string>();
    // eslint-disable-next-line no-inner-declarations
    function recurseDeps(file: FileDescriptorProto): FileDescriptorProto[] {
      const deps: FileDescriptorProto[] = [];
      for (const protoFileName of file.dependency) {
        if (set.getFile(protoFileName) != undefined) {
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
          addDescFile(dep, set);
        } else {
          seen.add(dep.name);
          deps.push(dep);
        }
      }
      return [...deps, ...deps.flatMap((dep) => recurseDeps(dep))];
    }
    for (const file of [input, ...recurseDeps(input)].reverse()) {
      addFile(file, set);
    }
  } else {
    for (const fileSet of args as DescFileSet[]) {
      for (const file of fileSet.files) {
        set.add(file);
        for (const type of nestedTypes(file)) {
          set.add(type);
        }
      }
    }
  }
  return set;
}

/**
 * A DescFileSet that allows adding and removing descriptors.
 * @private
 */
interface DescFileSetMutable extends DescFileSet {
  /**
   * Adds the given descriptor - but not types nested within - to the set.
   */
  add(
    desc: DescFile | DescMessage | DescEnum | DescExtension | DescService,
  ): void;
  /**
   * Remove the given descriptor from the set.
   */
  remove(
    desc: DescFile | DescMessage | DescEnum | DescExtension | DescService,
  ): void;
}

/**
 * Create a mutable DescFileSet.
 * @private
 */
function createMutableDescFileSet(): DescFileSetMutable {
  const types = new Map<
    string,
    DescMessage | DescEnum | DescExtension | DescService
  >();
  const extendees = new Map<string, Map<number, DescExtension>>();
  const files = new Map<string, DescFile>();
  return {
    kind: "set",
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
        // @ts-expect-error TS7029
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
 * Add the file descriptor and the types it contains to the set.
 */
function addDescFile(file: DescFile, set: DescFileSetMutable) {
  set.add(file);
  for (const type of nestedTypes(file)) {
    set.add(type);
  }
  for (const dep of file.dependencies) {
    addDescFile(dep, set);
  }
}

/**
 * Create a descriptor for a file, add it to the set.
 */
function addFile(proto: FileDescriptorProto, set: DescFileSetMutable): void {
  assertFieldSet(proto, "name");
  const file: DescFile = {
    kind: "file",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    ...parseFileSyntax(proto.name, proto.syntax, proto.edition),
    name: proto.name.replace(/\.proto/, ""),
    dependencies: findFileDependencies(proto, set),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString(): string {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- we asserted above
      return `file ${this.proto.name}`;
    },
    getFeatures() {
      return resolveFeatures(file);
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
    addEnum(enumProto, file, undefined, set);
  }
  for (const messageProto of proto.messageType) {
    addMessage(messageProto, file, undefined, set, mapEntries);
  }
  for (const serviceProto of proto.service) {
    addService(serviceProto, file, set);
  }
  addExtensions(file, set);
  for (const mapEntry of mapEntriesStore.values()) {
    // to create a map field, we need access to the map entry's fields
    addFields(mapEntry, set, mapEntries);
  }
  for (const message of file.messages) {
    addFields(message, set, mapEntries);
    addExtensions(message, set);
  }
  set.add(file);
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
  set: DescFileSetMutable,
): void {
  switch (desc.kind) {
    case "file":
      for (const proto of desc.proto.extension) {
        const ext = newExtension(proto, desc, undefined, set);
        desc.extensions.push(ext);
        set.add(ext);
      }
      break;
    case "message":
      for (const proto of desc.proto.extension) {
        const ext = newExtension(proto, desc.file, desc, set);
        desc.nestedExtensions.push(ext);
        set.add(ext);
      }
      for (const message of desc.nestedMessages) {
        addExtensions(message, set);
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
  set: DescSet,
  mapEntries: FileMapEntries,
): void {
  const allOneofs = message.proto.oneofDecl.map((proto) =>
    newOneof(proto, message),
  );
  const oneofsSeen = new Set<DescOneof>();
  for (const proto of message.proto.field) {
    const oneof = findOneof(proto, allOneofs);
    const field = newField(
      proto,
      message.file,
      message,
      oneof,
      set,
      mapEntries,
    );
    message.fields.push(field);
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
    addFields(child, set, mapEntries);
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
  set: DescFileSetMutable,
): void {
  assertFieldSet(proto, "name");
  const desc: DescEnum = {
    kind: "enum",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    file,
    parent,
    name: proto.name,
    typeName: makeTypeName(proto, parent, file),
    values: [],
    sharedPrefix: findEnumSharedPrefix(
      proto.name,
      proto.value.map((v) => v.name),
    ),
    toString(): string {
      return `enum ${this.typeName}`;
    },
    getFeatures() {
      return resolveFeatures(desc);
    },
  };
  set.add(desc);
  proto.value.forEach((proto) => {
    assertFieldSet(proto, "name");
    assertFieldSet(proto, "number");
    desc.values.push({
      kind: "enum_value",
      proto,
      deprecated: proto.options?.deprecated ?? false,
      parent: desc,
      name: proto.name,
      number: proto.number,
      toString() {
        return `enum value ${desc.typeName}.${this.name}`;
      },
      getFeatures() {
        return resolveFeatures(this);
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
  set: DescFileSetMutable,
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
    oneofs: [],
    members: [],
    nestedEnums: [],
    nestedMessages: [],
    nestedExtensions: [],
    toString(): string {
      return `message ${this.typeName}`;
    },
    getFeatures() {
      return resolveFeatures(this);
    },
  };
  if (proto.options?.mapEntry === true) {
    mapEntries.add(desc);
  } else {
    (parent?.nestedMessages ?? file.messages).push(desc);
    set.add(desc);
  }
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, desc, set);
  }
  for (const messageProto of proto.nestedType) {
    addMessage(messageProto, file, desc, set, mapEntries);
  }
}

/**
 * Create a descriptor for a service, including methods, and add it to our
 * cart.
 */
function addService(
  proto: ServiceDescriptorProto,
  file: DescFile,
  set: DescFileSetMutable,
): void {
  assertFieldSet(proto, "name");
  const desc: DescService = {
    kind: "service",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    file,
    name: proto.name,
    typeName: makeTypeName(proto, undefined, file),
    methods: [],
    toString(): string {
      return `service ${this.typeName}`;
    },
    getFeatures() {
      return resolveFeatures(this);
    },
  };
  file.services.push(desc);
  set.add(desc);
  for (const methodProto of proto.method) {
    desc.methods.push(newMethod(methodProto, desc, set));
  }
}

/**
 * Create a descriptor for a method.
 */
function newMethod(
  proto: MethodDescriptorProto,
  parent: DescService,
  set: DescSet,
): DescMethod {
  assertFieldSet(proto, "name");
  assertFieldSet(proto, "inputType");
  assertFieldSet(proto, "outputType");
  let methodKind: MethodKind;
  if (proto.clientStreaming && proto.serverStreaming) {
    methodKind = MethodKind.BiDiStreaming;
  } else if (proto.clientStreaming) {
    methodKind = MethodKind.ClientStreaming;
  } else if (proto.serverStreaming) {
    methodKind = MethodKind.ServerStreaming;
  } else {
    methodKind = MethodKind.Unary;
  }
  const protoIdempotency: IDEMPOTENCY | undefined =
    proto.options?.idempotencyLevel;
  let idempotency: MethodIdempotency | undefined;
  switch (protoIdempotency) {
    case IDEMPOTENT:
      idempotency = MethodIdempotency.Idempotent;
      break;
    case NO_SIDE_EFFECTS:
      idempotency = MethodIdempotency.NoSideEffects;
      break;
    case IDEMPOTENCY_UNKNOWN:
    case undefined:
      idempotency = undefined;
      break;
  }
  const input = set.getMessage(trimLeadingDot(proto.inputType));
  const output = set.getMessage(trimLeadingDot(proto.outputType));
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
    methodKind,
    input,
    output,
    idempotency,
    toString() {
      return `rpc ${parent.typeName}.${name}`;
    },
    getFeatures() {
      return resolveFeatures(this);
    },
  };
}

/**
 * Create a descriptor for a oneof group.
 */
function newOneof(proto: OneofDescriptorProto, parent: DescMessage): DescOneof {
  assertFieldSet(proto, "name");
  return {
    kind: "oneof",
    proto,
    deprecated: false,
    parent,
    fields: [],
    name: proto.name,
    toString(): string {
      return `oneof ${parent.typeName}.${this.name}`;
    },
    getFeatures() {
      return resolveFeatures(this);
    },
  };
}

/**
 * Create a descriptor for a field.
 */
function newField(
  proto: FieldDescriptorProto,
  file: DescFile,
  parent: DescMessage,
  oneof: DescOneof | undefined,
  set: DescSet,
  mapEntries: FileMapEntries,
): DescField {
  assertFieldSet(proto, "name");
  assertFieldSet(proto, "number");
  assertFieldSet(proto, "type");
  type fieldFragment<
    FieldKind extends "scalar" | "enum" | "message" | "list" | "map" =
      | "scalar"
      | "enum"
      | "message"
      | "list"
      | "map",
    ExtraProperties extends string = "",
  > = {
    -readonly [P in
      | keyof (DescField & { fieldKind: FieldKind })
      | ExtraProperties]?: unknown;
  };
  const common: fieldFragment = {
    kind: "field",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    name: proto.name,
    number: proto.number,
    parent,
    oneof,
    jsonName:
      proto.jsonName === fieldJsonName(proto.name) ? undefined : proto.jsonName,
    scalar: undefined,
    message: undefined,
    enum: undefined,
    // kind, toString, getComments, getFeatures are overridden in newExtension
    toString(): string {
      return `field ${parent.typeName}.${this.name as string}`;
    },
    getFeatures() {
      return resolveFeatures(this as DescField | DescExtension);
    },
  };
  const label: LABEL = proto.label;
  const type: TYPE = proto.type;
  const jstype: JSTYPE | undefined = proto.options?.jstype;
  if (label === LABEL_REPEATED) {
    const mapEntry =
      type == TYPE_MESSAGE
        ? mapEntries.get(trimLeadingDot(proto.typeName))
        : undefined;
    if (mapEntry) {
      assert(!oneof);
      const keyField = mapEntry.fields.find((f) => f.number === 1);
      assert(keyField);
      assert(keyField.fieldKind == "scalar");
      assert(
        keyField.scalar != ScalarType.BYTES &&
          keyField.scalar != ScalarType.FLOAT &&
          keyField.scalar != ScalarType.DOUBLE,
      );
      const valueField = mapEntry.fields.find((f) => f.proto.number === 2);
      assert(valueField);
      assert(valueField.fieldKind != "list" && valueField.fieldKind != "map");
      return {
        ...common,
        fieldKind: "map",
        mapKey: keyField.scalar,
        mapKind: valueField.fieldKind,
        message: valueField.message,
        enum: valueField.enum,
        scalar: valueField.scalar,
      } as DescField;
    }
    const list: fieldFragment<"list", "longType"> = {
      ...common,
      fieldKind: "list",
      packed: isPackedField(file, common as DescField | DescExtension),
      packedByDefault: isPackedFieldByDefault(file.edition, type),
    };
    assert(!oneof);
    switch (type) {
      case TYPE_MESSAGE:
      case TYPE_GROUP:
        list.listKind = "message";
        assertFieldSet(proto, "typeName");
        list.message = set.getMessage(trimLeadingDot(proto.typeName));
        assert(list.message);
        break;
      case TYPE_ENUM:
        list.listKind = "enum";
        assertFieldSet(proto, "typeName");
        list.enum = set.getEnum(trimLeadingDot(proto.typeName));
        assert(list.enum);
        break;
      default:
        list.listKind = "scalar";
        list.scalar = type;
        list.longType = jstype == JS_STRING ? LongType.STRING : LongType.BIGINT;
        break;
    }
    return list as DescField;
  }
  const singular: fieldFragment<"scalar" | "enum" | "message", "longType"> = {
    ...common,
    optional: isOptionalField(proto, file.syntax),
    getDefaultValue() {
      return undefined;
    },
  };
  switch (type) {
    case TYPE_MESSAGE:
    case TYPE_GROUP:
      assertFieldSet(proto, "typeName");
      singular.fieldKind = "message";
      singular.message = set.getMessage(trimLeadingDot(proto.typeName));
      assert(
        singular.message,
        `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`,
      );
      break;
    case TYPE_ENUM: {
      assertFieldSet(proto, "typeName");
      const enumeration = set.getEnum(trimLeadingDot(proto.typeName));
      assert(
        enumeration !== undefined,
        `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`,
      );
      singular.fieldKind = "enum";
      singular.enum = set.getEnum(trimLeadingDot(proto.typeName));
      singular.getDefaultValue = () => {
        return unsafeIsSetExplicit(proto, "defaultValue")
          ? parseTextFormatEnumValue(enumeration, proto.defaultValue)
          : undefined;
      };
      break;
    }
    default: {
      singular.fieldKind = "scalar";
      singular.scalar = type;
      singular.longType =
        jstype == JS_STRING ? LongType.STRING : LongType.BIGINT;
      singular.getDefaultValue = () => {
        return unsafeIsSetExplicit(proto, "defaultValue")
          ? parseTextFormatScalarValue(type, proto.defaultValue)
          : undefined;
      };
      break;
    }
  }
  return singular as DescField;
}

/**
 * Create a descriptor for an extension field.
 */
function newExtension(
  proto: FieldDescriptorProto,
  file: DescFile,
  parent: DescMessage | undefined,
  set: DescFileSetMutable,
): DescExtension {
  assertFieldSet(proto, "extendee");
  const emptyMapEntries: FileMapEntries = {
    get: () => undefined,
    add: () => assert(false),
  };
  const field = newField(
    proto,
    file,
    null as unknown as DescMessage, // to safe us many lines of duplicated code, we trick the type system
    undefined,
    set,
    emptyMapEntries, // extension fields cannot be maps
  );
  const extendee = set.getMessage(trimLeadingDot(proto.extendee));
  assert(
    extendee,
    `invalid FieldDescriptorProto: extendee ${proto.extendee} not found`,
  );
  assert(field.fieldKind != "map");
  assert(!field.oneof);
  return {
    ...field,
    kind: "extension",
    typeName: makeTypeName(proto, parent, file),
    parent,
    file,
    extendee,
    // Must override toString, getComments, getFeatures from newField, because we
    // call newField with parent undefined.
    oneof: undefined,
    toString(): string {
      return `extension ${this.typeName}`;
    },
  };
}

/**
 * Parse the "syntax" and "edition" fields, stripping test editions.
 */
function parseFileSyntax(fileName: string, syntax: string, edition: EDITION) {
  let e: Extract<
    Edition,
    Edition.EDITION_PROTO2 | Edition.EDITION_PROTO3 | Edition.EDITION_2023
  >;
  let s: "proto2" | "proto3" | "editions";
  switch (syntax) {
    case "":
    case "proto2":
      s = "proto2";
      e = EDITION_PROTO2;
      break;
    case "proto3":
      s = "proto3";
      e = EDITION_PROTO3;
      break;
    case "editions":
      s = "editions";
      switch (edition) {
        case EDITION_2023:
          e = edition;
          break;
        default:
          throw new Error(
            `unsupported edition in ${fileName}: the latest supported edition is 2023`,
          );
      }
      break;
    default:
      throw new Error(`unsupported syntax in ${fileName}: ${syntax}`);
  }
  return {
    syntax: s,
    edition: e,
  };
}

/**
 * Resolve dependencies of FileDescriptorProto to DescFile.
 */
function findFileDependencies(
  proto: FileDescriptorProto,
  set: DescFileSet,
): DescFile[] {
  return proto.dependency.map((wantName) => {
    const dep = set.getFile(wantName);
    if (!dep) {
      throw new Error(`Cannot find ${wantName}, imported by ${proto.name}`);
    }
    return dep;
  });
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
  assert(proto.name, `invalid ${proto.getType().typeName}: missing name`);
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
 * This handles proto3 optionals.
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
 * Did the user use the `optional` keyword?
 * This handles proto3 optionals.
 */
function isOptionalField(
  proto: FieldDescriptorProto,
  syntax: "proto2" | "proto3" | "editions",
): boolean {
  switch (syntax) {
    case "proto2":
      // eslint-disable-next-line no-case-declarations
      const label: LABEL = proto.label;
      return (
        !unsafeIsSetExplicit(proto, "oneofIndex") && label === LABEL_OPTIONAL
      );
    case "proto3":
      return proto.proto3Optional;
    case "editions":
      return false;
  }
}

/**
 * Is this field packed by default? Only valid for repeated enum fields, and
 * for repeated scalar fields except BYTES and STRING.
 *
 * In proto3 syntax, fields are packed by default. In proto2 syntax, fields
 * are unpacked by default. With editions, the default is whatever the edition
 * specifies as a default. In edition 2023, fields are packed by default.
 */
function isPackedFieldByDefault(edition: EDITION, type: TYPE) {
  switch (type) {
    case TYPE_STRING:
    case TYPE_BYTES:
    case TYPE_GROUP:
    case TYPE_MESSAGE:
      // length-delimited types cannot be packed
      return false;
    default:
      // eslint-disable-next-line no-case-declarations
      const repeatedFieldEncoding: REPEATED_FIELD_ENCODING = resolveDefault(
        edition,
        "repeatedFieldEncoding",
      );
      return repeatedFieldEncoding == PACKED;
  }
}

/**
 * Pack this repeated field?
 *
 * Respects field type, proto2/proto3 defaults and the `packed` option, or
 * edition defaults and the edition features.repeated_field_encoding options.
 */
function isPackedField(file: DescFile, field: DescField | DescExtension) {
  const type: TYPE = field.proto.type;
  switch (type) {
    case TYPE_STRING:
    case TYPE_BYTES:
    case TYPE_GROUP:
    case TYPE_MESSAGE:
      // length-delimited types cannot be packed
      return false;
    default:
      const protoOptions = field.proto.options; // eslint-disable-line no-case-declarations
      const edition: EDITION = file.edition; // eslint-disable-line no-case-declarations
      switch (edition) {
        case EDITION_PROTO2:
          return protoOptions !== undefined &&
            unsafeIsSetExplicit(protoOptions, "packed")
            ? protoOptions.packed
            : false;
        case EDITION_PROTO3:
          return protoOptions !== undefined &&
            unsafeIsSetExplicit(protoOptions, "packed")
            ? protoOptions.packed
            : true;
        default: {
          const r: REPEATED_FIELD_ENCODING = resolveFeature(
            field,
            "repeatedFieldEncoding",
          );
          return r === PACKED;
        }
      }
  }
}

// TODO consider to remove to save bundle size.
// Before proto2 fields were switched to use the prototype chain, we used
// assertions to narrow down optional types. This function is used to make the
// same assertions, but they are no longer necessary for the type system, and
// the value they provide is questionable.
function assertFieldSet<T extends Message<T>>(target: T, field: keyof T) {
  if (!unsafeIsSetExplicit(target as AnyMessage, field as string)) {
    const type = target.getType().typeName.split(".").pop();
    throw new Error(`invalid ${type}: missing ${field as string}`);
  }
}

/*bootstrap-inject-start*/
// generated from enum google.protobuf.FieldDescriptorProto.Type v26.0
type TYPE =
  | typeof TYPE_DOUBLE
  | typeof TYPE_FLOAT
  | typeof TYPE_INT64
  | typeof TYPE_UINT64
  | typeof TYPE_INT32
  | typeof TYPE_FIXED64
  | typeof TYPE_FIXED32
  | typeof TYPE_BOOL
  | typeof TYPE_STRING
  | typeof TYPE_GROUP
  | typeof TYPE_MESSAGE
  | typeof TYPE_BYTES
  | typeof TYPE_UINT32
  | typeof TYPE_ENUM
  | typeof TYPE_SFIXED32
  | typeof TYPE_SFIXED64
  | typeof TYPE_SINT32
  | typeof TYPE_SINT64;
const TYPE_DOUBLE = 1;
const TYPE_FLOAT = 2;
const TYPE_INT64 = 3;
const TYPE_UINT64 = 4;
const TYPE_INT32 = 5;
const TYPE_FIXED64 = 6;
const TYPE_FIXED32 = 7;
const TYPE_BOOL = 8;
const TYPE_STRING = 9;
const TYPE_GROUP = 10;
const TYPE_MESSAGE = 11;
const TYPE_BYTES = 12;
const TYPE_UINT32 = 13;
const TYPE_ENUM = 14;
const TYPE_SFIXED32 = 15;
const TYPE_SFIXED64 = 16;
const TYPE_SINT32 = 17;
const TYPE_SINT64 = 18;

// generated from enum google.protobuf.FieldDescriptorProto.Label v26.0
type LABEL =
  | typeof LABEL_OPTIONAL
  | typeof LABEL_REPEATED
  | typeof LABEL_REQUIRED;
const LABEL_OPTIONAL = 1;
const LABEL_REPEATED = 3;
const LABEL_REQUIRED = 2;

// generated from enum google.protobuf.FieldOptions.JSType v26.0
type JSTYPE =
  | typeof JS_NORMAL
  | typeof JS_STRING
  | typeof JS_NUMBER;
const JS_NORMAL = 0;
const JS_STRING = 1;
const JS_NUMBER = 2;

// generated from enum google.protobuf.MethodOptions.IdempotencyLevel v26.0
type IDEMPOTENCY =
  | typeof IDEMPOTENCY_UNKNOWN
  | typeof NO_SIDE_EFFECTS
  | typeof IDEMPOTENT;
const IDEMPOTENCY_UNKNOWN = 0;
const NO_SIDE_EFFECTS = 1;
const IDEMPOTENT = 2;

// generated from enum google.protobuf.Edition v26.0
type EDITION =
  | typeof EDITION_UNKNOWN
  | typeof EDITION_PROTO2
  | typeof EDITION_PROTO3
  | typeof EDITION_2023
  | typeof EDITION_2024
  | typeof EDITION_1_TEST_ONLY
  | typeof EDITION_2_TEST_ONLY
  | typeof EDITION_99997_TEST_ONLY
  | typeof EDITION_99998_TEST_ONLY
  | typeof EDITION_99999_TEST_ONLY
  | typeof EDITION_MAX;
const EDITION_UNKNOWN = 0;
const EDITION_PROTO2 = 998;
const EDITION_PROTO3 = 999;
const EDITION_2023 = 1000;
const EDITION_2024 = 1001;
const EDITION_1_TEST_ONLY = 1;
const EDITION_2_TEST_ONLY = 2;
const EDITION_99997_TEST_ONLY = 99997;
const EDITION_99998_TEST_ONLY = 99998;
const EDITION_99999_TEST_ONLY = 99999;
const EDITION_MAX = 2147483647;

// generated from enum google.protobuf.FeatureSet.RepeatedFieldEncoding v26.0
type REPEATED_FIELD_ENCODING =
  | typeof REPEATED_FIELD_ENCODING_UNKNOWN
  | typeof PACKED
  | typeof EXPANDED;
const REPEATED_FIELD_ENCODING_UNKNOWN = 0;
const PACKED = 1;
const EXPANDED = 2;

// generated from protoc experimental_edition_defaults_out v26.0
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
/*bootstrap-inject-end*/

export function resolveFeatures(desc: AnyDesc): ResolvedFeatureSet {
  return {
    fieldPresence: resolveFeature(desc, "fieldPresence"),
    enumType: resolveFeature(desc, "enumType"),
    repeatedFieldEncoding: resolveFeature(desc, "repeatedFieldEncoding"),
    utf8Validation: resolveFeature(desc, "utf8Validation"),
    messageEncoding: resolveFeature(desc, "messageEncoding"),
    jsonFormat: resolveFeature(desc, "jsonFormat"),
  };
}

function resolveFeature<Name extends keyof ResolvedFeatureSet>(
  desc: AnyDesc,
  name: Name,
): ResolvedFeatureSet[Name] {
  let d: AnyDesc = desc;
  for (;;) {
    const o = d.proto.options?.features;
    if (o) {
      const val = o[name] as number;
      if (val != 0) {
        return val as ResolvedFeatureSet[Name];
      }
    }
    if (d.kind == "file") {
      return resolveDefault(d.edition, name);
    }
    if ("parent" in d && d.parent !== undefined) {
      d = d.parent;
    } else if ("file" in d) {
      d = d.file;
    }
  }
}

function resolveDefault<Name extends keyof ResolvedFeatureSet>(
  edition: number,
  name: Name,
): ResolvedFeatureSet[Name] {
  const editionDefaults = (
    featureDefaults as Record<number, ResolvedFeatureSet | undefined>
  )[edition];
  if (!editionDefaults) {
    throw new Error(`feature default for edition ${edition} not found`);
  }
  return editionDefaults[name];
}
