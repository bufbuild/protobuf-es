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

import type {
  DescriptorProto,
  EnumDescriptorProto,
  FieldDescriptorProto,
  OneofDescriptorProto,
} from "./google/protobuf/descriptor_pb.js";
import {
  FieldDescriptorProto_Label,
  FieldDescriptorProto_Type,
  FileDescriptorProto,
  FileDescriptorSet,
  MethodDescriptorProto,
  MethodOptions_IdempotencyLevel,
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
import { ScalarType } from "./field.js";
import { MethodIdempotency, MethodKind } from "./service-type.js";
import { findEnumSharedPrefix, fieldJsonName } from "./private/names.js";
import { protoInt64 } from "./proto-int64.js";

/**
 * Create a DescriptorSet, a convenient interface for working with a set of
 * google.protobuf.FileDescriptorProto.
 *
 * Note that files must be given in topological order, so each file appears
 * before any file that imports it. Protocol buffer compilers always produce
 * files in topological order.
 */
export function createDescriptorSet(
  input: FileDescriptorProto[] | FileDescriptorSet | Uint8Array
): DescriptorSet {
  const cart = {
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
  const files = fileDescriptors.map((proto) => newFile(proto, cart));
  return { files, ...cart };
}

/**
 * Cart is an implementation detail. It captures a few variables we
 * use to resolve reference when creating descriptors.
 */
interface Cart {
  enums: Map<string, DescEnum>;
  messages: Map<string, DescMessage>;
  services: Map<string, DescService>;
  extensions: Map<string, DescExtension>;
  mapEntries: Map<string, DescMessage>;
}

/**
 * Create a descriptor for a file.
 */
function newFile(proto: FileDescriptorProto, cart: Cart): DescFile {
  assert(proto.name, `invalid FileDescriptorProto: missing name`);
  assert(
    proto.syntax === undefined || proto.syntax === "proto3",
    `invalid FileDescriptorProto: unsupported syntax: ${
      proto.syntax ?? "undefined"
    }`
  );
  const file: DescFile = {
    kind: "file",
    proto,
    deprecated: proto.options?.deprecated ?? false,
    syntax: proto.syntax === "proto3" ? "proto3" : "proto2",
    name: proto.name.replace(/\.proto/, ""),
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
  };
  cart.mapEntries.clear(); // map entries are local to the file, we can safely discard
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, undefined, cart);
  }
  for (const messageProto of proto.messageType) {
    addMessage(messageProto, file, undefined, cart);
  }
  for (const serviceProto of proto.service) {
    addService(serviceProto, file, cart);
  }
  addExtensions(file, cart);
  for (const mapEntry of cart.mapEntries.values()) {
    addFields(mapEntry, cart);
  }
  for (const message of file.messages) {
    addFields(message, cart);
    addExtensions(message, cart);
  }
  cart.mapEntries.clear(); // map entries are local to the file, we can safely discard
  return file;
}

/**
 * Create descriptors for extensions, and add them to the message / file,
 * and to our cart.
 * Recurses into nested types.
 */
function addExtensions(desc: DescFile | DescMessage, cart: Cart): void {
  switch (desc.kind) {
    case "file":
      for (const proto of desc.proto.extension) {
        const ext = newExtension(proto, desc, undefined, cart);
        desc.extensions.push(ext);
        cart.extensions.set(ext.typeName, ext);
      }
      break;
    case "message":
      for (const proto of desc.proto.extension) {
        const ext = newExtension(proto, desc.file, desc, cart);
        desc.nestedExtensions.push(ext);
        cart.extensions.set(ext.typeName, ext);
      }
      for (const message of desc.nestedMessages) {
        addExtensions(message, cart);
      }
      break;
  }
}

/**
 * Create descriptors for fields and oneof groups, and add them to the message.
 * Recurses into nested types.
 */
function addFields(message: DescMessage, cart: Cart): void {
  const allOneofs = message.proto.oneofDecl.map((proto) =>
    newOneof(proto, message)
  );
  const oneofsSeen = new Set<DescOneof>();
  for (const proto of message.proto.field) {
    const oneof = findOneof(proto, allOneofs);
    const field = newField(proto, message.file, message, oneof, cart);
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
    addFields(child, cart);
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
  cart: Cart
): void {
  assert(proto.name, `invalid EnumDescriptorProto: missing name`);
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
      proto.value.map((v) => v.name ?? "")
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
  };
  cart.enums.set(desc.typeName, desc);
  proto.value.forEach((proto) => {
    assert(proto.name, `invalid EnumValueDescriptorProto: missing name`);
    assert(
      proto.number !== undefined,
      `invalid EnumValueDescriptorProto: missing number`
    );
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
  cart: Cart
): void {
  assert(proto.name, `invalid DescriptorProto: missing name`);
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
  };
  if (proto.options?.mapEntry === true) {
    cart.mapEntries.set(desc.typeName, desc);
  } else {
    (parent?.nestedMessages ?? file.messages).push(desc);
    cart.messages.set(desc.typeName, desc);
  }
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, desc, cart);
  }
  for (const messageProto of proto.nestedType) {
    addMessage(messageProto, file, desc, cart);
  }
}

/**
 * Create a descriptor for a service, including methods, and add it to our
 * cart.
 */
function addService(
  proto: ServiceDescriptorProto,
  file: DescFile,
  cart: Cart
): void {
  assert(proto.name, `invalid ServiceDescriptorProto: missing name`);
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
  };
  file.services.push(desc);
  cart.services.set(desc.typeName, desc);
  for (const methodProto of proto.method) {
    desc.methods.push(newMethod(methodProto, desc, cart));
  }
}

/**
 * Create a descriptor for a method.
 */
function newMethod(
  proto: MethodDescriptorProto,
  parent: DescService,
  cart: Cart
): DescMethod {
  assert(proto.name, `invalid MethodDescriptorProto: missing name`);
  assert(proto.inputType, `invalid MethodDescriptorProto: missing input_type`);
  assert(
    proto.outputType,
    `invalid MethodDescriptorProto: missing output_type`
  );
  let methodKind: MethodKind;
  if (proto.clientStreaming === true && proto.serverStreaming === true) {
    methodKind = MethodKind.BiDiStreaming;
  } else if (proto.clientStreaming === true) {
    methodKind = MethodKind.ClientStreaming;
  } else if (proto.serverStreaming === true) {
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
    `invalid MethodDescriptorProto: input_type ${proto.inputType} not found`
  );
  assert(
    output,
    `invalid MethodDescriptorProto: output_type ${proto.inputType} not found`
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
  };
}

/**
 * Create a descriptor for a oneof group.
 */
function newOneof(proto: OneofDescriptorProto, parent: DescMessage): DescOneof {
  assert(proto.name, `invalid OneofDescriptorProto: missing name`);
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
  cart: Cart
): DescField {
  assert(proto.name, `invalid FieldDescriptorProto: missing name`);
  assert(proto.number, `invalid FieldDescriptorProto: missing number`);
  assert(proto.type, `invalid FieldDescriptorProto: missing type`);
  const packedByDefault = isPackedFieldByDefault(proto, file.syntax);
  const common = {
    proto,
    deprecated: proto.options?.deprecated ?? false,
    name: proto.name,
    number: proto.number,
    parent,
    oneof,
    optional: isOptionalField(proto, file.syntax),
    packed: proto.options?.packed ?? packedByDefault,
    packedByDefault,
    jsonName:
      proto.jsonName === fieldJsonName(proto.name) ? undefined : proto.jsonName,
    scalar: undefined,
    message: undefined,
    enum: undefined,
    mapKey: undefined,
    mapValue: undefined,
    toString(): string {
      // note that newExtension() calls us with parent = null
      return `field ${this.parent.typeName}.${this.name}`;
    },
    declarationString,
    getComments() {
      const path = [
        ...this.parent.getComments().sourcePath,
        FieldNumber.DescriptorProto_Field,
        this.parent.proto.field.indexOf(this.proto),
      ];
      return findComments(file.proto.sourceCodeInfo, path);
    },
  };
  const repeated = proto.label === FieldDescriptorProto_Label.REPEATED;
  switch (proto.type) {
    case FieldDescriptorProto_Type.MESSAGE:
    case FieldDescriptorProto_Type.GROUP: {
      assert(proto.typeName, `invalid FieldDescriptorProto: missing type_name`);
      const mapEntry = cart.mapEntries.get(trimLeadingDot(proto.typeName));
      if (mapEntry !== undefined) {
        assert(
          repeated,
          `invalid FieldDescriptorProto: expected map entry to be repeated`
        );
        return {
          ...common,
          kind: "field",
          fieldKind: "map",
          repeated: false,
          ...getMapFieldTypes(mapEntry),
        };
      }
      const message = cart.messages.get(trimLeadingDot(proto.typeName));
      assert(
        message !== undefined,
        `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`
      );
      return {
        ...common,
        kind: "field",
        fieldKind: "message",
        repeated,
        message,
      };
    }
    case FieldDescriptorProto_Type.ENUM: {
      assert(proto.typeName, `invalid FieldDescriptorProto: missing type_name`);
      const e = cart.enums.get(trimLeadingDot(proto.typeName));
      assert(
        e !== undefined,
        `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`
      );
      return {
        ...common,
        kind: "field",
        fieldKind: "enum",
        getDefaultValue,
        repeated,
        enum: e,
      };
    }
    default: {
      const scalar = fieldTypeToScalarType[proto.type];
      assert(
        scalar,
        `invalid FieldDescriptorProto: unknown type ${proto.type}`
      );
      return {
        ...common,
        kind: "field",
        fieldKind: "scalar",
        getDefaultValue,
        repeated,
        scalar,
      };
    }
  }
}

/**
 * Create a descriptor for an extension field.
 */
function newExtension(
  proto: FieldDescriptorProto,
  file: DescFile,
  parent: DescMessage | undefined,
  cart: Cart
): DescExtension {
  assert(proto.extendee, `invalid FieldDescriptorProto: missing extendee`);
  const field = newField(
    proto,
    file,
    null as unknown as DescMessage, // to safe us many lines of duplicated code, we trick the type system
    undefined,
    cart
  );
  const extendee = cart.messages.get(trimLeadingDot(proto.extendee));
  assert(
    extendee,
    `invalid FieldDescriptorProto: extendee ${proto.extendee} not found`
  );
  return {
    ...field,
    kind: "extension",
    typeName: makeTypeName(proto, parent, file),
    parent,
    file,
    extendee,
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
  };
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
  file: DescFile
): string {
  assert(proto.name, `invalid ${proto.getType().typeName}: missing name`);
  let typeName: string;
  if (parent) {
    typeName = `${parent.typeName}.${proto.name}`;
  } else if (file.proto.package !== undefined) {
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

function getMapFieldTypes(
  mapEntry: DescMessage
): Pick<DescField & { fieldKind: "map" }, "mapKey" | "mapValue"> {
  assert(
    mapEntry.proto.options?.mapEntry,
    `invalid DescriptorProto: expected ${mapEntry.toString()} to be a map entry`
  );
  assert(
    mapEntry.fields.length === 2,
    `invalid DescriptorProto: map entry ${mapEntry.toString()} has ${
      mapEntry.fields.length
    } fields`
  );
  const keyField = mapEntry.fields.find((f) => f.proto.number === 1);
  assert(
    keyField,
    `invalid DescriptorProto: map entry ${mapEntry.toString()} is missing key field`
  );
  const mapKey = keyField.scalar;
  assert(
    mapKey !== undefined &&
      mapKey !== ScalarType.BYTES &&
      mapKey !== ScalarType.FLOAT &&
      mapKey !== ScalarType.DOUBLE,
    `invalid DescriptorProto: map entry ${mapEntry.toString()} has unexpected key type ${
      keyField.proto.type ?? -1
    }`
  );
  const valueField = mapEntry.fields.find((f) => f.proto.number === 2);
  assert(
    valueField,
    `invalid DescriptorProto: map entry ${mapEntry.toString()} is missing value field`
  );
  switch (valueField.fieldKind) {
    case "scalar":
      return {
        mapKey,
        mapValue: {
          ...valueField,
          kind: "scalar",
        },
      };
    case "message":
      return {
        mapKey,
        mapValue: {
          ...valueField,
          kind: "message",
        },
      };
    case "enum":
      return {
        mapKey,
        mapValue: {
          ...valueField,
          kind: "enum",
        },
      };
    default:
      throw new Error(
        "invalid DescriptorProto: unsupported map entry value field"
      );
  }
}

/**
 * Did the user put the field in a oneof group?
 * This handles proto3 optionals.
 */
function findOneof(
  proto: FieldDescriptorProto,
  allOneofs: DescOneof[]
): DescOneof | undefined {
  const oneofIndex = proto.oneofIndex;
  if (oneofIndex === undefined) {
    return undefined;
  }
  let oneof: DescOneof | undefined;
  if (proto.proto3Optional !== true) {
    oneof = allOneofs[oneofIndex];
    assert(
      oneof,
      `invalid FieldDescriptorProto: oneof #${oneofIndex} for field #${
        proto.number ?? -1
      } not found`
    );
  }
  return oneof;
}

/**
 * Did the user use the `optional` keyword?
 * This handles proto3 optionals.
 */
function isOptionalField(
  proto: FieldDescriptorProto,
  syntax: "proto2" | "proto3"
): boolean {
  switch (syntax) {
    case "proto2":
      return (
        proto.oneofIndex === undefined &&
        proto.label === FieldDescriptorProto_Label.OPTIONAL
      );
    case "proto3":
      return proto.proto3Optional === true;
  }
}

/**
 * Get the default `packed` state of a repeated field.
 */
export function isPackedFieldByDefault(
  proto: FieldDescriptorProto,
  syntax: "proto2" | "proto3"
): boolean {
  assert(proto.type, `invalid FieldDescriptorProto: missing type`);
  if (syntax === "proto3") {
    switch (proto.type) {
      case FieldDescriptorProto_Type.DOUBLE:
      case FieldDescriptorProto_Type.FLOAT:
      case FieldDescriptorProto_Type.INT64:
      case FieldDescriptorProto_Type.UINT64:
      case FieldDescriptorProto_Type.INT32:
      case FieldDescriptorProto_Type.FIXED64:
      case FieldDescriptorProto_Type.FIXED32:
      case FieldDescriptorProto_Type.UINT32:
      case FieldDescriptorProto_Type.SFIXED32:
      case FieldDescriptorProto_Type.SFIXED64:
      case FieldDescriptorProto_Type.SINT32:
      case FieldDescriptorProto_Type.SINT64:
      case FieldDescriptorProto_Type.BOOL:
      case FieldDescriptorProto_Type.ENUM:
        // From the proto3 language guide:
        // > In proto3, repeated fields of scalar numeric types are packed by default.
        // This information is incomplete - according to the conformance tests, BOOL
        // and ENUM are packed by default as well. This means only STRING and BYTES
        // are not packed by default, which makes sense because they are length-delimited.
        return true;
      default:
        return false;
    }
  }
  return false;
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
  sourcePath: number[]
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
      leading: location.leadingComments,
      trailing: location.trailingComments,
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
  DescriptorProto_Field = 2,
  DescriptorProto_NestedType = 3,
  DescriptorProto_EnumType = 4,
  DescriptorProto_Extension = 6,
  DescriptorProto_OneofDecl = 8,
  EnumDescriptorProto_Value = 2,
  ServiceDescriptorProto_Method = 2,
}

/**
 * Return a string that matches the definition of a field in the protobuf
 * source. Does not take custom options into account.
 */
function declarationString(this: DescField | DescExtension): string {
  const parts: string[] = [];
  if (this.repeated) {
    parts.push("repeated");
  }
  if (this.optional) {
    parts.push("optional");
  }
  const file = this.kind === "extension" ? this.file : this.parent.file;
  if (
    file.syntax == "proto2" &&
    this.proto.label === FieldDescriptorProto_Label.REQUIRED
  ) {
    parts.push("required");
  }
  let type: string;
  switch (this.fieldKind) {
    case "scalar":
      type = ScalarType[this.scalar].toLowerCase();
      break;
    case "enum":
      type = this.enum.typeName;
      break;
    case "message":
      type = this.message.typeName;
      break;
    case "map": {
      const k = ScalarType[this.mapKey].toLowerCase();
      let v: string;
      switch (this.mapValue.kind) {
        case "scalar":
          v = ScalarType[this.mapValue.scalar].toLowerCase();
          break;
        case "enum":
          v = this.mapValue.enum.typeName;
          break;
        case "message":
          v = this.mapValue.message.typeName;
          break;
      }
      type = `map<${k}, ${v}>`;
      break;
    }
  }
  parts.push(`${type} ${this.name} = ${this.number}`);
  const options: string[] = [];
  if (this.proto.options?.packed !== undefined) {
    options.push(`packed = ${this.proto.options.packed.toString()}`);
  }
  let defaultValue = this.proto.defaultValue;
  if (defaultValue !== undefined) {
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
  if (this.proto.options?.deprecated === true) {
    options.push(`deprecated = true`);
  }
  if (options.length > 0) {
    parts.push("[" + options.join(", ") + "]");
  }
  return parts.join(" ");
}

/**
 * Parses a text-encoded default value (proto2) of a scalar or enum field.
 */
function getDefaultValue(
  this: DescField | DescExtension
): number | boolean | string | bigint | Uint8Array | undefined {
  const d = this.proto.defaultValue;
  if (d === undefined) {
    return undefined;
  }
  switch (this.fieldKind) {
    case "enum": {
      const enumValue = this.enum.values.find((v) => v.name === d);
      assert(enumValue, `cannot parse ${this.toString()} default value: ${d}`);
      return enumValue.number;
    }
    case "scalar":
      switch (this.scalar) {
        case ScalarType.STRING:
          return d;
        case ScalarType.BYTES: {
          const u = unescapeBytesDefaultValue(d);
          if (u === false) {
            throw new Error(
              `cannot parse ${this.toString()} default value: ${d}`
            );
          }
          return u;
        }
        case ScalarType.INT64:
        case ScalarType.SFIXED64:
        case ScalarType.SINT64:
          return protoInt64.parse(d);
        case ScalarType.UINT64:
        case ScalarType.FIXED64:
          return protoInt64.uParse(d);
        case ScalarType.DOUBLE:
        case ScalarType.FLOAT:
          switch (d) {
            case "inf":
              return Number.POSITIVE_INFINITY;
            case "-inf":
              return Number.NEGATIVE_INFINITY;
            case "nan":
              return Number.NaN;
            default:
              return parseFloat(d);
          }
        case ScalarType.BOOL:
          return d === "true";
        case ScalarType.INT32:
        case ScalarType.UINT32:
        case ScalarType.SINT32:
        case ScalarType.FIXED32:
        case ScalarType.SFIXED32:
          return parseInt(d, 10);
      }
      break;
    default:
      return undefined;
  }
}

/**
 * Parses a text-encoded default value (proto2) of a BYTES field.
 */
function unescapeBytesDefaultValue(str: string): Uint8Array | false {
  const b: number[] = [];
  const input = {
    tail: str,
    c: "",
    next(): boolean {
      if (this.tail.length == 0) {
        return false;
      }
      this.c = this.tail[0];
      this.tail = this.tail.substring(1);
      return true;
    },
    take(n: number): string | false {
      if (this.tail.length >= n) {
        const r = this.tail.substring(0, n);
        this.tail = this.tail.substring(n);
        return r;
      }
      return false;
    },
  };
  while (input.next()) {
    switch (input.c) {
      case "\\":
        if (input.next()) {
          switch (input.c as string) {
            case "\\":
              b.push(input.c.charCodeAt(0));
              break;
            case "b":
              b.push(0x08);
              break;
            case "f":
              b.push(0x0c);
              break;
            case "n":
              b.push(0x0a);
              break;
            case "r":
              b.push(0x0d);
              break;
            case "t":
              b.push(0x09);
              break;
            case "v":
              b.push(0x0b);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const s = input.c;
              const t = input.take(2);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 8);
              if (isNaN(n)) {
                return false;
              }
              b.push(n);
              break;
            }
            case "x": {
              const s = input.c;
              const t = input.take(2);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 16);
              if (isNaN(n)) {
                return false;
              }
              b.push(n);
              break;
            }
            case "u": {
              const s = input.c;
              const t = input.take(4);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 16);
              if (isNaN(n)) {
                return false;
              }
              const chunk = new Uint8Array(4);
              const view = new DataView(chunk.buffer);
              view.setInt32(0, n, true);
              b.push(chunk[0], chunk[1], chunk[2], chunk[3]);
              break;
            }
            case "U": {
              const s = input.c;
              const t = input.take(8);
              if (t === false) {
                return false;
              }
              const tc = protoInt64.uEnc(s + t);
              const chunk = new Uint8Array(8);
              const view = new DataView(chunk.buffer);
              view.setInt32(0, tc.lo, true);
              view.setInt32(4, tc.hi, true);
              b.push(
                chunk[0],
                chunk[1],
                chunk[2],
                chunk[3],
                chunk[4],
                chunk[5],
                chunk[6],
                chunk[7]
              );
              break;
            }
          }
        }
        break;
      default:
        b.push(input.c.charCodeAt(0));
    }
  }
  return new Uint8Array(b);
}
