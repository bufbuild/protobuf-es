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
  EnumValueDescriptorProto,
  FieldDescriptorProto,
  FileDescriptorProto,
  MethodDescriptorProto,
  OneofDescriptorProto,
  ServiceDescriptorProto,
} from "./google/protobuf/descriptor_pb.js";
import type { ScalarType } from "./field.js";
import type { MethodIdempotency, MethodKind } from "./service-type.js";

/**
 * DescriptorSet provides a convenient interface for working with a set
 * of google.protobuf.FileDescriptorProto.
 *
 * When protobuf sources are compiled, each file is parsed into a
 * google.protobuf.FileDescriptorProto. Those messages describe all parts
 * of the source file that are required to generate code for them.
 *
 * DescriptorSet resolves references between the descriptors, hides
 * implementation details like synthetic map entry messages, and provides
 * simple access to comments.
 */
export interface DescriptorSet {
  /**
   * All files, in the order they were added to the set.
   */
  readonly files: DescFile[];
  /**
   * All enumerations, indexed by their fully qualified type name.
   * (We omit the leading dot.)
   */
  readonly enums: ReadonlyMap<string, DescEnum>;
  /**
   * All messages, indexed by their fully qualified type name.
   * (We omit the leading dot.)
   */
  readonly messages: ReadonlyMap<string, DescMessage>;
  /**
   * All services, indexed by their fully qualified type name.
   * (We omit the leading dot.)
   */
  readonly services: ReadonlyMap<string, DescService>;
  /**
   * All extensions, indexed by their fully qualified type name.
   */
  readonly extensions: ReadonlyMap<string, DescExtension>;
}

/**
 * A union of all descriptors, discriminated by a `kind` property.
 */
export type AnyDesc =
  | DescFile
  | DescEnum
  | DescEnumValue
  | DescMessage
  | DescField
  | DescExtension
  | DescOneof
  | DescService
  | DescMethod;

/**
 * Describes a protobuf source file.
 */
export interface DescFile {
  kind: "file";
  /**
   * The syntax specified in the protobuf source.
   */
  readonly syntax: "proto3" | "proto2";
  /**
   * The name of the file, excluding the .proto suffix.
   * For a protobuf file `foo/bar.proto`, this is `foo/bar`.
   */
  readonly name: string;
  /**
   * Top-level enumerations declared in this file.
   * Note that more enumerations might be declared within message declarations.
   */
  readonly enums: DescEnum[];
  /**
   * Top-level messages declared in this file.
   * Note that more messages might be declared within message declarations.
   */
  readonly messages: DescMessage[];
  /**
   * Top-level extensions declared in this file.
   * Note that more extensions might be declared within message declarations.
   */
  readonly extensions: DescExtension[];
  /**
   * Services declared in this file.
   */
  readonly services: DescService[];
  /**
   * Marked as deprecated in the protobuf source.
   */
  readonly deprecated: boolean;
  /**
   * The compiler-generated descriptor.
   */
  readonly proto: FileDescriptorProto;

  /**
   * Get comments on the syntax element in the protobuf source.
   */
  getSyntaxComments(): DescComments;

  /**
   * Get comments on the package element in the protobuf source.
   */
  getPackageComments(): DescComments;

  toString(): string;
}

/**
 * Describes an enumeration in a protobuf source file.
 */
export interface DescEnum {
  kind: "enum";
  /**
   * The fully qualified name of the enumeration. (We omit the leading dot.)
   */
  readonly typeName: string;
  /**
   * The name of the enumeration, as declared in the protobuf source.
   */
  readonly name: string;
  /**
   * The file this enumeration was declared in.
   */
  readonly file: DescFile;
  /**
   * The parent message, if this enumeration was declared inside a message declaration.
   */
  readonly parent: DescMessage | undefined;
  /**
   * Values declared for this enumeration.
   */
  readonly values: DescEnumValue[];
  /**
   * A prefix shared by all enum values.
   * For example, `MY_ENUM_` for `enum MyEnum {MY_ENUM_A=0; MY_ENUM_B=1;}`
   */
  readonly sharedPrefix?: string;
  /**
   * Marked as deprecated in the protobuf source.
   */
  readonly deprecated: boolean;
  /**
   * The compiler-generated descriptor.
   */
  readonly proto: EnumDescriptorProto;

  /**
   * Get comments on the element in the protobuf source.
   */
  getComments(): DescComments;

  toString(): string;
}

/**
 * Describes an individual value of an enumeration in a protobuf source file.
 */
export interface DescEnumValue {
  kind: "enum_value";
  /**
   * The name of the enumeration value, as specified in the protobuf source.
   */
  readonly name: string;
  /**
   * The enumeration this value belongs to.
   */
  readonly parent: DescEnum;
  /**
   * The numeric enumeration value, as specified in the protobuf source.
   */
  readonly number: number;
  /**
   * Marked as deprecated in the protobuf source.
   */
  readonly deprecated: boolean;
  /**
   * The compiler-generated descriptor.
   */
  readonly proto: EnumValueDescriptorProto;

  /**
   * Return a string that (closely) matches the definition of the enumeration
   * value in the protobuf source.
   */
  declarationString(): string;

  /**
   * Get comments on the element in the protobuf source.
   */
  getComments(): DescComments;

  toString(): string;
}

/**
 * Describes a message declaration in a protobuf source file.
 */
export interface DescMessage {
  kind: "message";
  /**
   * The fully qualified name of the message. (We omit the leading dot.)
   */
  readonly typeName: string;
  /**
   * The name of the message, as specified in the protobuf source.
   */
  readonly name: string;
  /**
   * The file this message was declared in.
   */
  readonly file: DescFile;
  /**
   * The parent message, if this message was declared inside a message declaration.
   */
  readonly parent: DescMessage | undefined;
  /**
   * Fields declared for this message, including fields declared in a oneof
   * group.
   */
  readonly fields: DescField[];
  /**
   * Oneof groups declared for this message.
   * This does not include synthetic oneofs for proto3 optionals.
   */
  readonly oneofs: DescOneof[];
  /**
   * Fields and oneof groups for this message, ordered by their appearance in the
   * protobuf source.
   */
  readonly members: (DescField | DescOneof)[];
  /**
   * Enumerations declared within the message, if any.
   */
  readonly nestedEnums: DescEnum[];
  /**
   * Messages declared within the message, if any.
   * This does not include synthetic messages like map entries.
   */
  readonly nestedMessages: DescMessage[];
  /**
   * Extensions declared within the message, if any.
   */
  readonly nestedExtensions: DescExtension[];
  /**
   * Marked as deprecated in the protobuf source.
   */
  readonly deprecated: boolean;
  /**
   * The compiler-generated descriptor.
   */
  readonly proto: DescriptorProto;

  /**
   * Get comments on the element in the protobuf source.
   */
  getComments(): DescComments;

  toString(): string;
}

/**
 * Describes a field declaration in a protobuf source file.
 */
export type DescField = DescFieldCommon &
  (DescFieldScalar | DescFieldMessage | DescFieldEnum | DescFieldMap) & {
    kind: "field";

    /**
     * The message this field is declared on.
     */
    readonly parent: DescMessage;
  };

/**
 * Describes an extension in a protobuf source file.
 */
export type DescExtension = DescFieldCommon &
  (DescFieldScalar | DescFieldMessage | DescFieldEnum | DescFieldMap) & {
    kind: "extension";

    /**
     * The fully qualified name of the extension.
     */
    readonly typeName: string;
    /**
     * The file this extension was declared in.
     */
    readonly file: DescFile;
    /**
     * The parent message, if this extension was declared inside a message declaration.
     */
    readonly parent: DescMessage | undefined;
    /**
     * The message that this extension extends.
     */
    readonly extendee: DescMessage;
  };

interface DescFieldCommon {
  /**
   * The field name, as specified in the protobuf source
   */
  readonly name: string;
  /**
   * The field number, as specified in the protobuf source.
   */
  readonly number: number;
  /**
   * The `oneof` group this field belongs to, if any.
   */
  readonly oneof: DescOneof | undefined;
  /**
   * Whether this field was declared with `optional` in the protobuf source.
   */
  readonly optional: boolean;
  /**
   * Pack this repeated field?
   */
  readonly packed: boolean;
  /**
   * Is this field packed by default? Only valid for enum fields, and for
   * scalar fields except BYTES and STRING.
   * In proto3 syntax, fields are packed by default. In proto2 syntax, fields
   * are unpacked by default.
   */
  readonly packedByDefault: boolean;
  /**
   * A user-defined name for the JSON format, set with the field option
   * [json_name="foo"].
   */
  readonly jsonName: string | undefined;
  /**
   * Marked as deprecated in the protobuf source.
   */
  readonly deprecated: boolean;
  /**
   * The compiler-generated descriptor.
   */
  readonly proto: FieldDescriptorProto;

  /**
   * Get comments on the element in the protobuf source.
   */
  getComments(): DescComments;

  /**
   * Return a string that (closely) matches the definition of the field in the
   * protobuf source.
   */
  declarationString(): string;

  toString(): string;
}

interface DescFieldScalar {
  readonly fieldKind: "scalar";
  /**
   * Is the field repeated?
   */
  readonly repeated: boolean;
  /**
   * Scalar type, if it is a scalar field.
   */
  readonly scalar: ScalarType;
  /**
   * The message type, if it is a message field.
   */
  readonly message: undefined;
  /**
   * The enum type, if it is an enum field.
   */
  readonly enum: undefined;
  /**
   * The map key type, if this is a map field.
   */
  readonly mapKey: undefined;
  /**
   * The map value type, if this is a map field.
   */
  readonly mapValue: undefined;

  /**
   * Return the default value specified in the protobuf source.
   * Only valid for proto2 syntax.
   */
  getDefaultValue():
    | number
    | boolean
    | string
    | bigint
    | Uint8Array
    | undefined;
}

interface DescFieldMessage {
  readonly fieldKind: "message";
  /**
   * Is the field repeated?
   */
  readonly repeated: boolean;
  /**
   * Scalar type, if it is a scalar field.
   */
  readonly scalar: undefined;
  /**
   * The message type, if it is a message field.
   */
  readonly message: DescMessage;
  /**
   * The enum type, if it is an enum field.
   */
  readonly enum: undefined;
  /**
   * The map key type, if this is a map field.
   */
  readonly mapKey: undefined;
  /**
   * The map value type, if this is a map field.
   */
  readonly mapValue: undefined;
}

interface DescFieldEnum {
  readonly fieldKind: "enum";
  /**
   * Is the field repeated?
   */
  readonly repeated: boolean;
  /**
   * Scalar type, if it is a scalar field.
   */
  readonly scalar: undefined;
  /**
   * The message type, if it is a message field.
   */
  readonly message: undefined;
  /**
   * The enum type, if it is an enum field.
   */
  readonly enum: DescEnum;
  /**
   * The map key type, if this is a map field.
   */
  readonly mapKey: undefined;
  /**
   * The map value type, if this is a map field.
   */
  readonly mapValue: undefined;

  /**
   * Return the default value specified in the protobuf source.
   * Only valid for proto2 syntax.
   */
  getDefaultValue():
    | number
    | boolean
    | string
    | bigint
    | Uint8Array
    | undefined;
}

interface DescFieldMap {
  readonly fieldKind: "map";
  /**
   * Is the field repeated?
   */
  readonly repeated: false;
  /**
   * Scalar type, if it is a scalar field.
   */
  readonly scalar: undefined;
  /**
   * The message type, if it is a message field.
   */
  readonly message: undefined;
  /**
   * The enum type, if it is an enum field.
   */
  readonly enum: undefined;
  /**
   * The map key type, if this is a map field.
   */
  readonly mapKey: Exclude<
    ScalarType,
    ScalarType.FLOAT | ScalarType.DOUBLE | ScalarType.BYTES
  >;
  /**
   * The map value type, if this is a map field.
   */
  readonly mapValue:
    | DescFieldMapValueEnum
    | DescFieldMapValueMessage
    | DescFieldMapValueScalar;
}

interface DescFieldMapValueEnum {
  readonly kind: "enum";
  /**
   * The enum type, if this is a map field with enum values.
   */
  readonly enum: DescEnum;
  /**
   * The message this message field uses.
   */
  readonly message: undefined;
  /**
   * Scalar type, if this is a map field with scalar values.
   */
  readonly scalar: undefined;
}

interface DescFieldMapValueMessage {
  readonly kind: "message";
  /**
   * The enum type, if this is a map field with enum values.
   */
  readonly enum: undefined;
  /**
   * The message type, if this is a map field with message values.
   */
  readonly message: DescMessage;
  /**
   * Scalar type, if this is a map field with scalar values.
   */
  readonly scalar: undefined;
}

interface DescFieldMapValueScalar {
  readonly kind: "scalar";
  /**
   * The enum type, if this is a map field with enum values.
   */
  readonly enum: undefined;
  /**
   * The message type, if this is a map field with message values.
   */
  readonly message: undefined;
  /**
   * Scalar type, if this is a map field with scalar values.
   */
  readonly scalar: ScalarType;
}

/**
 * Describes a oneof group in a protobuf source file.
 */
export interface DescOneof {
  kind: "oneof";
  /**
   * The name of the oneof group, as specified in the protobuf source.
   */
  readonly name: string;
  /**
   * The message this oneof group was declared in.
   */
  readonly parent: DescMessage;
  /**
   * The fields declared in this oneof group.
   */
  readonly fields: DescField[];
  /**
   * Marked as deprecated in the protobuf source.
   * Note that oneof groups cannot be marked as deprecated, this property
   * only exists for consistency and will always be false.
   */
  readonly deprecated: boolean;
  /**
   * The compiler-generated descriptor.
   */
  readonly proto: OneofDescriptorProto;

  /**
   * Get comments on the element in the protobuf source.
   */
  getComments(): DescComments;

  toString(): string;
}

/**
 * Describes a service declaration in a protobuf source file.
 */
export interface DescService {
  kind: "service";
  /**
   * The fully qualified name of the service. (We omit the leading dot.)
   */
  readonly typeName: string;
  /**
   * The name of the service, as specified in the protobuf source.
   */
  readonly name: string;
  /**
   * The file this service was declared in.
   */
  readonly file: DescFile;
  /**
   * The RPCs this service declares.
   */
  readonly methods: DescMethod[];
  /**
   * Marked as deprecated in the protobuf source.
   */
  readonly deprecated: boolean;
  /**
   * The compiler-generated descriptor.
   */
  readonly proto: ServiceDescriptorProto;

  /**
   * Get comments on the element in the protobuf source.
   */
  getComments(): DescComments;

  toString(): string;
}

/**
 * Describes an RPC declaration in a protobuf source file.
 */
export interface DescMethod {
  kind: "rpc";
  /**
   * The name of the RPC, as specified in the protobuf source.
   */
  readonly name: string;
  /**
   * The parent service.
   */
  readonly parent: DescService;
  /**
   * One of the four available method types.
   */
  readonly methodKind: MethodKind;
  /**
   * The message type for requests.
   */
  readonly input: DescMessage;
  /**
   * The message type for responses.
   */
  readonly output: DescMessage;
  /**
   * The idempotency level declared in the protobuf source, if any.
   */
  readonly idempotency?: MethodIdempotency;
  /**
   * Marked as deprecated in the protobuf source.
   */
  readonly deprecated: boolean;
  /**
   * The compiler-generated descriptor.
   */
  readonly proto: MethodDescriptorProto;

  /**
   * Get comments on the element in the protobuf source.
   */
  getComments(): DescComments;

  toString(): string;
}

/**
 * Comments on an element in a protobuf source file.
 */
export interface DescComments {
  readonly leadingDetached: readonly string[];
  readonly leading?: string;
  readonly trailing?: string;
  readonly sourcePath: readonly number[];
}
