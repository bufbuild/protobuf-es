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
  SourceCodeInfo,
} from "./google/protobuf/descriptor_pb.js";
import { assert } from "./private/assert.js";
import type {
  DescComments,
  DescEnum,
  DescExtension,
  DescField,
  DescFile,
  DescMessage,
  DescMethod,
  DescOneof,
  DescriptorSet,
  DescService,
} from "./descriptor-set.js";
import { MethodIdempotency, MethodKind } from "./service-type.js";
import { fieldJsonName, findEnumSharedPrefix } from "./private/names.js";
import {
  parseTextFormatEnumValue,
  parseTextFormatScalarValue,
} from "./private/text-format.js";
import type { BinaryReadOptions, BinaryWriteOptions } from "./binary-format.js";
import type { FeatureResolverFn } from "./private/feature-set.js";
import { createFeatureResolver } from "./private/feature-set.js";
import { LongType, ScalarType } from "./scalar.js";
import { isFieldSet } from "./field-accessor.js";
import type { Message } from "./message.js";

/**
 * Create a DescriptorSet, a convenient interface for working with a set of
 * google.protobuf.FileDescriptorProto.
 *
 * Note that files must be given in topological order, so each file appears
 * before any file that imports it. Protocol buffer compilers always produce
 * files in topological order.
 */
export function createDescriptorSet(
  input: FileDescriptorProto[] | FileDescriptorSet | Uint8Array,
  options?: CreateDescriptorSetOptions,
): DescriptorSet {
  const cart: Cart = {
    files: [],
    enums: new Map<string, DescEnum>(),
    messages: new Map<string, DescMessage>(),
    services: new Map<string, DescService>(),
    extensions: new Map<string, DescExtension>(),
    mapEntries: new Map<string, DescMessage>(),
  };
  const fileDescriptors =
    input instanceof FileDescriptorSet
      ? input.file
      : input instanceof Uint8Array
        ? FileDescriptorSet.fromBinary(input).file
        : input;
  const resolverByEdition = new Map<Edition, FeatureResolverFn>();
  for (const proto of fileDescriptors) {
    const edition = isFieldSet(proto, "edition")
      ? proto.edition
      : parseFileSyntax(proto.syntax, proto.edition).edition;
    let resolveFeatures = resolverByEdition.get(edition);
    if (resolveFeatures === undefined) {
      resolveFeatures = createFeatureResolver(
        edition,
        options?.featureSetDefaults,
        options?.serializationOptions,
      );
      resolverByEdition.set(edition, resolveFeatures);
    }
    addFile(proto, cart, resolveFeatures);
  }
  return cart;
}

/**
 * Options to createDescriptorSet()
 */
interface CreateDescriptorSetOptions {
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
 * Cart is an implementation detail. It captures a few variables we
 * use to resolve reference when creating descriptors.
 */
interface Cart {
  files: DescFile[];
  enums: Map<string, DescEnum>;
  messages: Map<string, DescMessage>;
  services: Map<string, DescService>;
  extensions: Map<string, DescExtension>;
  mapEntries: Map<string, DescMessage>;
}

/**
 * Create a descriptor for a file.
 */
function addFile(
  proto: FileDescriptorProto,
  cart: Cart,
  resolveFeatures: FeatureResolverFn,
): void {
  assertFieldSet(proto, "name");
  const file: DescFile = {
    kind: "file",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    ...parseFileSyntax(proto.syntax, proto.edition),
    name: proto.name.replace(/\.proto/, ""),
    dependencies: findFileDependencies(proto, cart),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString(): string {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- we asserted above
      return `file ${this.proto.name}`;
    },
    getSyntaxComments() {
      return findComments(this.proto.sourceCodeInfo, [
        FieldNumber.FileDescriptorProto_Syntax,
      ]);
    },
    getPackageComments() {
      return findComments(this.proto.sourceCodeInfo, [
        FieldNumber.FileDescriptorProto_Package,
      ]);
    },
    getFeatures() {
      return resolveFeatures(proto.options?.features);
    },
  };
  cart.mapEntries.clear(); // map entries are local to the file, we can safely discard
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, undefined, cart, resolveFeatures);
  }
  for (const messageProto of proto.messageType) {
    addMessage(messageProto, file, undefined, cart, resolveFeatures);
  }
  for (const serviceProto of proto.service) {
    addService(serviceProto, file, cart, resolveFeatures);
  }
  addExtensions(file, cart, resolveFeatures);
  for (const mapEntry of cart.mapEntries.values()) {
    addFields(mapEntry, cart, resolveFeatures);
  }
  for (const message of file.messages) {
    addFields(message, cart, resolveFeatures);
    addExtensions(message, cart, resolveFeatures);
  }
  cart.mapEntries.clear(); // map entries are local to the file, we can safely discard
  cart.files.push(file);
}

/**
 * Create descriptors for extensions, and add them to the message / file,
 * and to our cart.
 * Recurses into nested types.
 */
function addExtensions(
  desc: DescFile | DescMessage,
  cart: Cart,
  resolveFeatures: FeatureResolverFn,
): void {
  switch (desc.kind) {
    case "file":
      for (const proto of desc.proto.extension) {
        const ext = newExtension(proto, desc, undefined, cart, resolveFeatures);
        desc.extensions.push(ext);
        cart.extensions.set(ext.typeName, ext);
      }
      break;
    case "message":
      for (const proto of desc.proto.extension) {
        const ext = newExtension(proto, desc.file, desc, cart, resolveFeatures);
        desc.nestedExtensions.push(ext);
        cart.extensions.set(ext.typeName, ext);
      }
      for (const message of desc.nestedMessages) {
        addExtensions(message, cart, resolveFeatures);
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
  cart: Cart,
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
      cart,
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
    addFields(child, cart, resolveFeatures);
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
  cart: Cart,
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
    getComments() {
      const path = this.parent
        ? [
            ...this.parent.getComments().sourcePath,
            FieldNumber.DescriptorProto_EnumType,
            this.parent.proto.enumType.indexOf(this.proto),
          ]
        : [
            FieldNumber.FileDescriptorProto_EnumType,
            this.file.proto.enumType.indexOf(this.proto),
          ];
      return findComments(file.proto.sourceCodeInfo, path);
    },
    getFeatures() {
      return resolveFeatures(
        parent?.getFeatures() ?? file.getFeatures(),
        proto.options?.features,
      );
    },
  };
  cart.enums.set(desc.typeName, desc);
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
      declarationString() {
        let str = `${this.name} = ${this.number}`;
        if (this.proto.options?.deprecated === true) {
          str += " [deprecated = true]";
        }
        return str;
      },
      getComments() {
        const path = [
          ...this.parent.getComments().sourcePath,
          FieldNumber.EnumDescriptorProto_Value,
          this.parent.proto.value.indexOf(this.proto),
        ];
        return findComments(file.proto.sourceCodeInfo, path);
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
  cart: Cart,
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
    getComments() {
      const path = this.parent
        ? [
            ...this.parent.getComments().sourcePath,
            FieldNumber.DescriptorProto_NestedType,
            this.parent.proto.nestedType.indexOf(this.proto),
          ]
        : [
            FieldNumber.FileDescriptorProto_MessageType,
            this.file.proto.messageType.indexOf(this.proto),
          ];
      return findComments(file.proto.sourceCodeInfo, path);
    },
    getFeatures() {
      return resolveFeatures(
        parent?.getFeatures() ?? file.getFeatures(),
        proto.options?.features,
      );
    },
  };
  if (proto.options?.mapEntry === true) {
    cart.mapEntries.set(desc.typeName, desc);
  } else {
    (parent?.nestedMessages ?? file.messages).push(desc);
    cart.messages.set(desc.typeName, desc);
  }
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, desc, cart, resolveFeatures);
  }
  for (const messageProto of proto.nestedType) {
    addMessage(messageProto, file, desc, cart, resolveFeatures);
  }
}

/**
 * Create a descriptor for a service, including methods, and add it to our
 * cart.
 */
function addService(
  proto: ServiceDescriptorProto,
  file: DescFile,
  cart: Cart,
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
    getComments() {
      const path = [
        FieldNumber.FileDescriptorProto_Service,
        this.file.proto.service.indexOf(this.proto),
      ];
      return findComments(file.proto.sourceCodeInfo, path);
    },
    getFeatures() {
      return resolveFeatures(file.getFeatures(), proto.options?.features);
    },
  };
  file.services.push(desc);
  cart.services.set(desc.typeName, desc);
  for (const methodProto of proto.method) {
    desc.methods.push(newMethod(methodProto, desc, cart, resolveFeatures));
  }
}

/**
 * Create a descriptor for a method.
 */
function newMethod(
  proto: MethodDescriptorProto,
  parent: DescService,
  cart: Cart,
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
  const input = cart.messages.get(trimLeadingDot(proto.inputType));
  const output = cart.messages.get(trimLeadingDot(proto.outputType));
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
    getComments() {
      const path = [
        ...this.parent.getComments().sourcePath,
        FieldNumber.ServiceDescriptorProto_Method,
        this.parent.proto.method.indexOf(this.proto),
      ];
      return findComments(parent.file.proto.sourceCodeInfo, path);
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
    getComments() {
      const path = [
        ...this.parent.getComments().sourcePath,
        FieldNumber.DescriptorProto_OneofDecl,
        this.parent.proto.oneofDecl.indexOf(this.proto),
      ];
      return findComments(parent.file.proto.sourceCodeInfo, path);
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
  cart: Cart,
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
    declarationString,
    // kind, toString, getComments, getFeatures are overridden in newExtension
    toString(): string {
      return `field ${parent.typeName}.${this.name as string}`;
    },
    getComments() {
      const path = [
        ...parent.getComments().sourcePath,
        FieldNumber.DescriptorProto_Field,
        parent.proto.field.indexOf(proto),
      ];
      return findComments(file.proto.sourceCodeInfo, path);
    },
    getFeatures() {
      return resolveFeatures(parent.getFeatures(), proto.options?.features);
    },
  };
  if (proto.label === FieldDescriptorProto_Label.REPEATED) {
    const mapEntry =
      proto.type == FieldDescriptorProto_Type.MESSAGE
        ? cart.mapEntries.get(trimLeadingDot(proto.typeName))
        : undefined;
    if (mapEntry) {
      assert(!oneof);
      const keyField = mapEntry.fields.find((f) => f.proto.number === 1);
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
        list.message = cart.messages.get(trimLeadingDot(proto.typeName));
        assert(list.message);
        break;
      case FieldDescriptorProto_Type.ENUM:
        list.listKind = "enum";
        assertFieldSet(proto, "typeName");
        list.enum = cart.enums.get(trimLeadingDot(proto.typeName));
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
      singular.message = cart.messages.get(trimLeadingDot(proto.typeName));
      assert(
        singular.message,
        `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`,
      );
      break;
    case FieldDescriptorProto_Type.ENUM: {
      assertFieldSet(proto, "typeName");
      const enumeration = cart.enums.get(trimLeadingDot(proto.typeName));
      assert(
        enumeration !== undefined,
        `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`,
      );
      singular.fieldKind = "enum";
      singular.enum = cart.enums.get(trimLeadingDot(proto.typeName));
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
  cart: Cart,
  resolveFeatures: FeatureResolverFn,
): DescExtension {
  assertFieldSet(proto, "extendee");
  const field = newField(
    proto,
    file,
    null as unknown as DescMessage, // to safe us many lines of duplicated code, we trick the type system
    undefined,
    cart,
    resolveFeatures,
  );
  const extendee = cart.messages.get(trimLeadingDot(proto.extendee));
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
    getComments() {
      const path = this.parent
        ? [
            ...this.parent.getComments().sourcePath,
            FieldNumber.DescriptorProto_Extension,
            this.parent.proto.extension.indexOf(proto),
          ]
        : [
            FieldNumber.FileDescriptorProto_Extension,
            this.file.proto.extension.indexOf(proto),
          ];
      return findComments(file.proto.sourceCodeInfo, path);
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
  cart: Cart,
): DescFile[] {
  return proto.dependency.map((wantName) => {
    const dep = cart.files.find((f) => f.proto.name === wantName);
    assert(dep);
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

/**
 * Find comments.
 */
function findComments(
  sourceCodeInfo: SourceCodeInfo | undefined,
  sourcePath: number[],
): DescComments {
  if (!sourceCodeInfo) {
    return {
      leadingDetached: [],
      sourcePath,
    };
  }
  for (const location of sourceCodeInfo.location) {
    if (location.path.length !== sourcePath.length) {
      continue;
    }
    if (location.path.some((value, index) => sourcePath[index] !== value)) {
      continue;
    }
    return {
      leadingDetached: location.leadingDetachedComments,
      leading: isFieldSet(location, "leadingComments")
        ? location.leadingComments
        : undefined,
      trailing: isFieldSet(location, "trailingComments")
        ? location.trailingComments
        : undefined,
      sourcePath,
    };
  }
  return {
    leadingDetached: [],
    sourcePath,
  };
}

/**
 * The following field numbers are used to find comments in
 * google.protobuf.SourceCodeInfo.
 */
enum FieldNumber {
  FileDescriptorProto_Package = 2,
  FileDescriptorProto_MessageType = 4,
  FileDescriptorProto_EnumType = 5,
  FileDescriptorProto_Service = 6,
  FileDescriptorProto_Extension = 7,
  FileDescriptorProto_Syntax = 12,
  DescriptorProto_Field = 2, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values
  DescriptorProto_NestedType = 3,
  DescriptorProto_EnumType = 4, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values
  DescriptorProto_Extension = 6, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values
  DescriptorProto_OneofDecl = 8,
  EnumDescriptorProto_Value = 2, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values
  ServiceDescriptorProto_Method = 2, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values
}

/**
 * Return a string that matches the definition of a field in the protobuf
 * source. Does not take custom options into account.
 */
function declarationString(this: DescField | DescExtension): string {
  const file = this.kind === "extension" ? this.file : this.parent.file;
  const parts: string[] = [];
  function typeName(f: DescField | DescExtension) {
    if (f.message) {
      return f.message.typeName;
    }
    if (f.enum) {
      return f.enum.typeName;
    }
    return ScalarType[f.scalar].toLowerCase();
  }
  switch (this.fieldKind) {
    case "scalar":
    case "enum":
    case "message":
      if (
        file.edition === Edition.EDITION_PROTO2 &&
        isFieldSet(this.proto, "label") &&
        this.proto.label == FieldDescriptorProto_Label.REQUIRED
      ) {
        parts.push("required");
      }
      if (this.optional) {
        parts.push("optional");
      }
      parts.push(typeName(this));
      break;
    case "list":
      parts.push("repeated", typeName(this));
      break;
    case "map": {
      const k = ScalarType[this.mapKey].toLowerCase();
      const v = typeName(this);
      parts.push(`map<${k}, ${v}>`);
      break;
    }
  }
  parts.push(this.name, "=", this.number.toString());
  const options: string[] = [];
  const protoOptions = this.proto.options;
  if (protoOptions !== undefined && isFieldSet(protoOptions, "packed")) {
    options.push(`packed = ${protoOptions.packed.toString()}`);
  }
  if (isFieldSet(this.proto, "defaultValue")) {
    let defaultValue = this.proto.defaultValue;
    if (
      this.proto.type == FieldDescriptorProto_Type.BYTES ||
      this.proto.type == FieldDescriptorProto_Type.STRING
    ) {
      defaultValue = '"' + defaultValue.replace('"', '\\"') + '"';
    }
    options.push(`default = ${defaultValue}`);
  }
  if (this.jsonName !== undefined) {
    options.push(`json_name = "${this.jsonName}"`);
  }
  if (protoOptions !== undefined && isFieldSet(protoOptions, "jstype")) {
    options.push(`jstype = ${FieldOptions_JSType[protoOptions.jstype]}`);
  }
  if (protoOptions !== undefined && isFieldSet(protoOptions, "deprecated")) {
    options.push(`deprecated = true`);
  }
  if (options.length > 0) {
    parts.push("[" + options.join(", ") + "]");
  }
  return parts.join(" ");
}

// TODO consider to remove to save bundle size.
// Before proto2 fields were switched to use the prototype chain, we used
// assertions to narrow down optional types. This function is used to make the
// same assertions, but they are no longer necessary for the type system, and
// the value they provide is questionable.
function assertFieldSet<T extends Message<T>>(
  target: T,
  field: Parameters<typeof isFieldSet<T>>[1],
) {
  if (!isFieldSet(target, field)) {
    const type = target.getType().typeName.split(".").pop();
    throw new Error(`invalid ${type}: missing ${field}`);
  }
}
