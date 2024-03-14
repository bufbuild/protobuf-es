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
  DescriptorProto,
  Edition,
  EnumDescriptorProto,
  FeatureSet_RepeatedFieldEncoding,
  FeatureSetDefaults,
  FieldDescriptorProto,
  FieldDescriptorProto_Label,
  FieldDescriptorProto_Type,
  FieldOptions_JSType,
  FileDescriptorProto,
  FileDescriptorSet,
  MethodDescriptorProto,
  MethodOptions_IdempotencyLevel,
  OneofDescriptorProto,
  ServiceDescriptorProto,
} from "../../google/protobuf/descriptor_pb.js";
import { assert } from "../../private/assert.js";
import type {
  DescEnum,
  DescExtension,
  DescField,
  DescFile,
  DescMessage,
  DescMethod,
  DescOneof,
  DescService,
} from "../../descriptor-set.js";
import { MethodIdempotency, MethodKind } from "../../service-type.js";
import { fieldJsonName, findEnumSharedPrefix } from "../../private/names.js";
import {
  parseTextFormatEnumValue,
  parseTextFormatScalarValue,
} from "../../private/text-format.js";
import type {
  BinaryReadOptions,
  BinaryWriteOptions,
} from "../../binary-format.js";
import type { FeatureResolverFn } from "../../private/feature-set.js";
import { createFeatureResolver } from "../../private/feature-set.js";
import { LongType, ScalarType } from "./scalar.js";
import { isFieldSet } from "../../field-accessor.js";
import type { AnyMessage, Message } from "../../message.js";
import { nestedTypes } from "./nested-types.js";

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
 * Options to createDescFileSet()
 */
interface CreateDescFileSetOptions {
  /**
   * Editions support language-specific features with extensions to
   * google.protobuf.FeatureSet. They can define defaults, and specify on
   * which targets the features can be set.
   *
   * To create a DescriptorSet that provides your language-specific features,
   * you have to provide a google.protobuf.FeatureSetDefaults message in this
   * option. It can also specify the minimum and maximum supported edition.
   *
   * The defaults can be generated with `protoc` - see the flag
   * `--experimental_edition_defaults_out`.
   */
  featureSetDefaults?: FeatureSetDefaults;

  /**
   * Internally, data is serialized when features are resolved. The
   * serialization options given here will be used for feature resolution.
   */
  serializationOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
}

/**
 * Create a set of descriptors (including file descriptors) from
 * a google.protobuf.FileDescriptorSet message.
 */
export function createDescFileSet(
  fileDescriptorSet: FileDescriptorSet,
  options?: CreateDescFileSetOptions,
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
  options?: CreateDescFileSetOptions,
): DescFileSet;

/**
 * Create a set of descriptors (including file descriptors) from
 * one or more sets of descriptors, merging them.
 */
export function createDescFileSet(...descFileSet: DescFileSet[]): DescFileSet;

export function createDescFileSet(
  ...args:
    | [fileDescriptorSet: FileDescriptorSet, options?: CreateDescFileSetOptions]
    | [
        fileDescriptorProto: FileDescriptorProto,
        resolve: (
          protoFileName: string,
        ) => FileDescriptorProto | DescFile | undefined,
        options?: CreateDescFileSetOptions,
      ]
    | DescFileSet[]
): DescFileSet {
  const set = createMutableDescFileSet();
  if (args[0] instanceof FileDescriptorSet) {
    const getFeatureResolver = createFeatureResolverCache(
      args[1] as CreateDescFileSetOptions | undefined,
    );
    for (const file of args[0].file) {
      addFile(file, set, getFeatureResolver(file));
    }
    return set;
  } else if (args[0] instanceof FileDescriptorProto) {
    const input = args[0];
    const resolve = args[1] as (
      protoFileName: string,
    ) => FileDescriptorProto | DescFile | undefined;
    const getFeatureResolver = createFeatureResolverCache(
      args[2] as CreateDescFileSetOptions | undefined,
    );
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
      addFile(file, set, getFeatureResolver(file));
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
 * Creates feature resolvers, but caches them.
 * @private
 */
function createFeatureResolverCache(options?: CreateDescFileSetOptions) {
  const resolverByEdition = new Map<Edition, FeatureResolverFn>();
  return function (
    fileDescriptorProto: FileDescriptorProto,
  ): FeatureResolverFn {
    const edition = isFieldSet(fileDescriptorProto, "edition")
      ? fileDescriptorProto.edition
      : parseFileSyntax(fileDescriptorProto.syntax, fileDescriptorProto.edition)
          .edition;
    let resolve = resolverByEdition.get(edition);
    if (resolve === undefined) {
      resolve = createFeatureResolver(
        edition,
        options?.featureSetDefaults,
        options?.serializationOptions,
      );
      resolverByEdition.set(edition, resolve);
    }
    return resolve;
  };
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
function addFile(
  proto: FileDescriptorProto,
  set: DescFileSetMutable,
  resolveFeatures: FeatureResolverFn,
): void {
  assertFieldSet(proto, "name");
  const file: DescFile = {
    kind: "file",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    ...parseFileSyntax(proto.syntax, proto.edition),
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
      return resolveFeatures(proto.options?.features);
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
    addEnum(enumProto, file, undefined, set, resolveFeatures);
  }
  for (const messageProto of proto.messageType) {
    addMessage(messageProto, file, undefined, set, mapEntries, resolveFeatures);
  }
  for (const serviceProto of proto.service) {
    addService(serviceProto, file, set, resolveFeatures);
  }
  addExtensions(file, set, resolveFeatures);
  for (const mapEntry of mapEntriesStore.values()) {
    // to create a map field, we need access to the map entry's fields
    addFields(mapEntry, set, mapEntries, resolveFeatures);
  }
  for (const message of file.messages) {
    addFields(message, set, mapEntries, resolveFeatures);
    addExtensions(message, set, resolveFeatures);
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
  resolveFeatures: FeatureResolverFn,
): void {
  switch (desc.kind) {
    case "file":
      for (const proto of desc.proto.extension) {
        const ext = newExtension(proto, desc, undefined, set, resolveFeatures);
        desc.extensions.push(ext);
        set.add(ext);
      }
      break;
    case "message":
      for (const proto of desc.proto.extension) {
        const ext = newExtension(proto, desc.file, desc, set, resolveFeatures);
        desc.nestedExtensions.push(ext);
        set.add(ext);
      }
      for (const message of desc.nestedMessages) {
        addExtensions(message, set, resolveFeatures);
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
  resolveFeatures: FeatureResolverFn,
): void {
  const allOneofs = message.proto.oneofDecl.map((proto) =>
    newOneof(proto, message, resolveFeatures),
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
      resolveFeatures,
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
    addFields(child, set, mapEntries, resolveFeatures);
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
  resolveFeatures: FeatureResolverFn,
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
      return resolveFeatures(
        parent?.getFeatures() ?? file.getFeatures(),
        proto.options?.features,
      );
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
        return resolveFeatures(desc.getFeatures(), proto.options?.features);
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
  resolveFeatures: FeatureResolverFn,
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
      return resolveFeatures(
        parent?.getFeatures() ?? file.getFeatures(),
        proto.options?.features,
      );
    },
  };
  if (proto.options?.mapEntry === true) {
    mapEntries.add(desc);
  } else {
    (parent?.nestedMessages ?? file.messages).push(desc);
    set.add(desc);
  }
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, desc, set, resolveFeatures);
  }
  for (const messageProto of proto.nestedType) {
    addMessage(messageProto, file, desc, set, mapEntries, resolveFeatures);
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
  resolveFeatures: FeatureResolverFn,
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
      return resolveFeatures(file.getFeatures(), proto.options?.features);
    },
  };
  file.services.push(desc);
  set.add(desc);
  for (const methodProto of proto.method) {
    desc.methods.push(newMethod(methodProto, desc, set, resolveFeatures));
  }
}

/**
 * Create a descriptor for a method.
 */
function newMethod(
  proto: MethodDescriptorProto,
  parent: DescService,
  set: DescSet,
  resolveFeatures: FeatureResolverFn,
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
  let idempotency: MethodIdempotency | undefined;
  switch (proto.options?.idempotencyLevel) {
    case MethodOptions_IdempotencyLevel.IDEMPOTENT:
      idempotency = MethodIdempotency.Idempotent;
      break;
    case MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS:
      idempotency = MethodIdempotency.NoSideEffects;
      break;
    case MethodOptions_IdempotencyLevel.IDEMPOTENCY_UNKNOWN:
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
      return resolveFeatures(parent.getFeatures(), proto.options?.features);
    },
  };
}

/**
 * Create a descriptor for a oneof group.
 */
function newOneof(
  proto: OneofDescriptorProto,
  parent: DescMessage,
  resolveFeatures: FeatureResolverFn,
): DescOneof {
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
      return resolveFeatures(parent.getFeatures(), proto.options?.features);
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
  resolveFeatures: FeatureResolverFn,
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
      return resolveFeatures(parent.getFeatures(), proto.options?.features);
    },
  };
  if (proto.label === FieldDescriptorProto_Label.REPEATED) {
    const mapEntry =
      proto.type == FieldDescriptorProto_Type.MESSAGE
        ? mapEntries.get(trimLeadingDot(proto.typeName))
        : undefined;
    if (mapEntry) {
      assert(!oneof);
      const keyField = mapEntry.fields.find((f) => f.number === 1);
      assert(keyField, "xxx " + mapEntry.name + ", " + mapEntry.typeName);
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
      packed: isPackedField(file, parent, proto, resolveFeatures),
      packedByDefault: isPackedFieldByDefault(
        file.edition,
        proto,
        resolveFeatures,
      ),
    };
    assert(!oneof);
    switch (proto.type) {
      case FieldDescriptorProto_Type.MESSAGE:
      case FieldDescriptorProto_Type.GROUP:
        list.listKind = "message";
        assertFieldSet(proto, "typeName");
        list.message = set.getMessage(trimLeadingDot(proto.typeName));
        assert(list.message);
        break;
      case FieldDescriptorProto_Type.ENUM:
        list.listKind = "enum";
        assertFieldSet(proto, "typeName");
        list.enum = set.getEnum(trimLeadingDot(proto.typeName));
        assert(list.enum);
        break;
      default:
        list.listKind = "scalar";
        list.scalar = fieldTypeToScalarType[proto.type];
        assert(list.scalar);
        list.longType =
          proto.options?.jstype == FieldOptions_JSType.JS_STRING
            ? LongType.STRING
            : LongType.BIGINT;
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
  switch (proto.type) {
    case FieldDescriptorProto_Type.MESSAGE:
    case FieldDescriptorProto_Type.GROUP:
      assertFieldSet(proto, "typeName");
      singular.fieldKind = "message";
      singular.message = set.getMessage(trimLeadingDot(proto.typeName));
      assert(
        singular.message,
        `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`,
      );
      break;
    case FieldDescriptorProto_Type.ENUM: {
      assertFieldSet(proto, "typeName");
      const enumeration = set.getEnum(trimLeadingDot(proto.typeName));
      assert(
        enumeration !== undefined,
        `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`,
      );
      singular.fieldKind = "enum";
      singular.enum = set.getEnum(trimLeadingDot(proto.typeName));
      singular.getDefaultValue = () => {
        return isFieldSet(proto, "defaultValue")
          ? parseTextFormatEnumValue(enumeration, proto.defaultValue)
          : undefined;
      };
      break;
    }
    default: {
      const scalar = fieldTypeToScalarType[proto.type];
      assert(
        scalar,
        `invalid FieldDescriptorProto: unknown type ${proto.type}`,
      );
      singular.fieldKind = "scalar";
      singular.scalar = scalar;
      singular.longType =
        proto.options?.jstype == FieldOptions_JSType.JS_STRING
          ? LongType.STRING
          : LongType.BIGINT;
      singular.getDefaultValue = () => {
        return isFieldSet(proto, "defaultValue")
          ? parseTextFormatScalarValue(scalar, proto.defaultValue)
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
  resolveFeatures: FeatureResolverFn,
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
    resolveFeatures,
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
    getFeatures() {
      return resolveFeatures(
        (parent ?? file).getFeatures(),
        proto.options?.features,
      );
    },
  };
}

/**
 * Parse the "syntax" and "edition" fields, stripping test editions.
 */
function parseFileSyntax(syntax: string, edition: Edition) {
  let e: Exclude<
    Edition,
    | Edition.EDITION_1_TEST_ONLY
    | Edition.EDITION_2_TEST_ONLY
    | Edition.EDITION_99997_TEST_ONLY
    | Edition.EDITION_99998_TEST_ONLY
    | Edition.EDITION_99999_TEST_ONLY
  >;
  let s: "proto2" | "proto3" | "editions";
  switch (syntax) {
    case "":
    case "proto2":
      s = "proto2";
      e = Edition.EDITION_PROTO2;
      break;
    case "proto3":
      s = "proto3";
      e = Edition.EDITION_PROTO3;
      break;
    case "editions":
      s = "editions";
      switch (edition) {
        case Edition.EDITION_1_TEST_ONLY:
        case Edition.EDITION_2_TEST_ONLY:
        case Edition.EDITION_99997_TEST_ONLY:
        case Edition.EDITION_99998_TEST_ONLY:
        case Edition.EDITION_99999_TEST_ONLY:
        case Edition.EDITION_UNKNOWN:
          e = Edition.EDITION_UNKNOWN;
          break;
        default:
          e = edition;
          break;
      }
      break;
    default:
      throw new Error(
        `invalid FileDescriptorProto: unsupported syntax: ${syntax}`,
      );
  }
  if (syntax === "editions" && edition === Edition.EDITION_UNKNOWN) {
    throw new Error(
      `invalid FileDescriptorProto: syntax ${syntax} cannot have edition ${String(
        edition,
      )}`,
    );
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
  if (!isFieldSet(proto, "oneofIndex")) {
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
      return (
        !isFieldSet(proto, "oneofIndex") &&
        proto.label === FieldDescriptorProto_Label.OPTIONAL
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
function isPackedFieldByDefault(
  edition: Edition,
  proto: FieldDescriptorProto,
  resolveFeatures: FeatureResolverFn,
) {
  switch (proto.type) {
    case FieldDescriptorProto_Type.STRING:
    case FieldDescriptorProto_Type.BYTES:
    case FieldDescriptorProto_Type.GROUP:
    case FieldDescriptorProto_Type.MESSAGE:
      // length-delimited types cannot be packed
      return false;
    default:
      switch (edition) {
        case Edition.EDITION_PROTO2:
          return false;
        case Edition.EDITION_PROTO3:
          return true;
        default: {
          const { repeatedFieldEncoding } = resolveFeatures();
          return (
            repeatedFieldEncoding == FeatureSet_RepeatedFieldEncoding.PACKED
          );
        }
      }
  }
}

/**
 * Pack this repeated field?
 *
 * Respects field type, proto2/proto3 defaults and the `packed` option, or
 * edition defaults and the edition features.repeated_field_encoding options.
 */
function isPackedField(
  file: DescFile,
  parent: DescMessage | undefined,
  proto: FieldDescriptorProto,
  resolveFeatures: FeatureResolverFn,
) {
  switch (proto.type) {
    case FieldDescriptorProto_Type.STRING:
    case FieldDescriptorProto_Type.BYTES:
    case FieldDescriptorProto_Type.GROUP:
    case FieldDescriptorProto_Type.MESSAGE:
      // length-delimited types cannot be packed
      return false;
    default:
      const protoOptions = proto.options; // eslint-disable-line no-case-declarations
      switch (file.edition) {
        case Edition.EDITION_PROTO2:
          return protoOptions !== undefined &&
            isFieldSet(protoOptions, "packed")
            ? protoOptions.packed
            : false;
        case Edition.EDITION_PROTO3:
          return protoOptions !== undefined &&
            isFieldSet(protoOptions, "packed")
            ? protoOptions.packed
            : true;
        default: {
          const { repeatedFieldEncoding } = resolveFeatures(
            parent?.getFeatures() ?? file.getFeatures(),
            protoOptions?.features,
          );
          return (
            repeatedFieldEncoding == FeatureSet_RepeatedFieldEncoding.PACKED
          );
        }
      }
  }
}

/**
 * Map from a compiler-generated field type to our ScalarType, which is a
 * subset of field types declared by protobuf enum google.protobuf.FieldDescriptorProto.
 */
const fieldTypeToScalarType: Record<
  FieldDescriptorProto_Type,
  ScalarType | undefined
> = {
  [FieldDescriptorProto_Type.DOUBLE]: ScalarType.DOUBLE,
  [FieldDescriptorProto_Type.FLOAT]: ScalarType.FLOAT,
  [FieldDescriptorProto_Type.INT64]: ScalarType.INT64,
  [FieldDescriptorProto_Type.UINT64]: ScalarType.UINT64,
  [FieldDescriptorProto_Type.INT32]: ScalarType.INT32,
  [FieldDescriptorProto_Type.FIXED64]: ScalarType.FIXED64,
  [FieldDescriptorProto_Type.FIXED32]: ScalarType.FIXED32,
  [FieldDescriptorProto_Type.BOOL]: ScalarType.BOOL,
  [FieldDescriptorProto_Type.STRING]: ScalarType.STRING,
  [FieldDescriptorProto_Type.GROUP]: undefined,
  [FieldDescriptorProto_Type.MESSAGE]: undefined,
  [FieldDescriptorProto_Type.BYTES]: ScalarType.BYTES,
  [FieldDescriptorProto_Type.UINT32]: ScalarType.UINT32,
  [FieldDescriptorProto_Type.ENUM]: undefined,
  [FieldDescriptorProto_Type.SFIXED32]: ScalarType.SFIXED32,
  [FieldDescriptorProto_Type.SFIXED64]: ScalarType.SFIXED64,
  [FieldDescriptorProto_Type.SINT32]: ScalarType.SINT32,
  [FieldDescriptorProto_Type.SINT64]: ScalarType.SINT64,
};

// TODO consider to remove to save bundle size.
// Before proto2 fields were switched to use the prototype chain, we used
// assertions to narrow down optional types. This function is used to make the
// same assertions, but they are no longer necessary for the type system, and
// the value they provide is questionable.
function assertFieldSet<T extends Message<T>>(target: T, field: keyof T) {
  if (!isFieldSet(target as AnyMessage, field as string)) {
    const type = target.getType().typeName.split(".").pop();
    throw new Error(`invalid ${type}: missing ${field as string}`);
  }
}
