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
  codegenInfo,
  DescEnum,
  DescEnumValue,
  DescExtension,
  DescField,
  DescMessage,
  DescMethod,
  DescOneof,
  LongType,
  protoInt64,
  ScalarType,
  ScalarValue,
} from "@bufbuild/protobuf";
import {
  Edition,
  FieldDescriptorProto_Type,
} from "@bufbuild/protobuf/next/wkt";
import type { Printable, Schema } from "@bufbuild/protoplugin/ecmascript";
import { wktPublicImportPaths } from "@bufbuild/protobuf/next/codegenv1";
import { scalarTypeScriptType } from "@bufbuild/protobuf/next/reflect";
import { localName as reflectLocalName } from "@bufbuild/protobuf/next/reflect";
import {
  createImportSymbol,
  GeneratedFile,
  ImportSymbol,
  safeIdentifier,
} from "@bufbuild/protoplugin/ecmascript";

interface RuntimeImports {
  proto2: ImportSymbol;
  proto3: ImportSymbol;
  Message: ImportSymbol;
  PartialMessage: ImportSymbol;
  PlainMessage: ImportSymbol;
  FieldList: ImportSymbol;
  MessageType: ImportSymbol;
  Extension: ImportSymbol;
  BinaryReadOptions: ImportSymbol;
  BinaryWriteOptions: ImportSymbol;
  JsonReadOptions: ImportSymbol;
  JsonWriteOptions: ImportSymbol;
  JsonValue: ImportSymbol;
  JsonObject: ImportSymbol;
  protoDouble: ImportSymbol;
  protoInt64: ImportSymbol;
  ScalarType: ImportSymbol;
  LongType: ImportSymbol;
  MethodKind: ImportSymbol;
  MethodIdempotency: ImportSymbol;
  IMessageTypeRegistry: ImportSymbol;
}
export function runtimeImports(f: GeneratedFile): RuntimeImports {
  const isBootstrap = !f.runtime.create.from.startsWith("@bufbuild/protobuf");
  // prettier-ignore
  return {
    proto2:                infoToSymbol("proto2",               isBootstrap),
    proto3:                infoToSymbol("proto3",               isBootstrap),
    Message:               infoToSymbol("Message",              isBootstrap),
    PartialMessage:        infoToSymbol("PartialMessage",       isBootstrap),
    PlainMessage:          infoToSymbol("PlainMessage",         isBootstrap),
    FieldList:             infoToSymbol("FieldList",            isBootstrap),
    MessageType:           infoToSymbol("MessageType",          isBootstrap),
    Extension:             infoToSymbol("Extension",            isBootstrap),
    BinaryReadOptions:     infoToSymbol("BinaryReadOptions",    isBootstrap),
    BinaryWriteOptions:    infoToSymbol("BinaryWriteOptions",   isBootstrap),
    JsonReadOptions:       infoToSymbol("JsonReadOptions",      isBootstrap),
    JsonWriteOptions:      infoToSymbol("JsonWriteOptions",     isBootstrap),
    JsonValue:             infoToSymbol("JsonValue",            isBootstrap),
    JsonObject:            infoToSymbol("JsonObject",           isBootstrap),
    protoDouble:           infoToSymbol("protoDouble",          isBootstrap),
    protoInt64:            infoToSymbol("protoInt64",          isBootstrap),
    ScalarType:            infoToSymbol("ScalarType",           isBootstrap),
    LongType:              infoToSymbol("LongType",             isBootstrap),
    MethodKind:            infoToSymbol("MethodKind",           isBootstrap),
    MethodIdempotency:     infoToSymbol("MethodIdempotency",    isBootstrap),
    IMessageTypeRegistry:  infoToSymbol("IMessageTypeRegistry", isBootstrap),
  };
  function infoToSymbol(
    name: keyof typeof codegenInfo.symbols,
    bootstrapWkt: boolean,
  ): ImportSymbol {
    const info = codegenInfo.symbols[name];
    const symbol = createImportSymbol(
      name,
      bootstrapWkt ? info.privateImportPath : info.publicImportPath,
    );
    return info.typeOnly ? symbol.toTypeOnly() : symbol;
  }
}

export function importPb(
  schema: Schema,
  f: GeneratedFile,
  desc: DescMessage | DescEnum,
): ImportSymbol {
  const isBootstrap = !f.runtime.create.from.startsWith("@bufbuild/protobuf");
  const isWkt =
    (wktPublicImportPaths[desc.file.proto.name] as string | undefined) !==
    undefined;
  if (
    isWkt &&
    !isBootstrap &&
    !schema.files.find((f) => f.name === desc.file.name)
  ) {
    return createImportSymbol(localName(desc), "@bufbuild/protobuf");
  }
  const from = "./" + desc.file.name + "_pb.js";
  return createImportSymbol(localName(desc), from);
}

const reservedMessageProperties = new Set([
  // names reserved by the runtime
  "getType",
  "clone",
  "equals",
  "fromBinary",
  "fromJson",
  "fromJsonString",
  "toBinary",
  "toJson",
  "toJsonString",

  // names reserved by the runtime for the future
  "toObject",
]);

export function localName(
  desc:
    | DescMessage
    | DescEnum
    | DescEnumValue
    | DescOneof
    | DescField
    | DescMethod
    | DescExtension,
) {
  switch (desc.kind) {
    case "enum":
    case "message":
    case "extension": {
      const pkg = desc.file.proto.package;
      const offset = pkg.length > 0 ? pkg.length + 1 : 0;
      const name = desc.typeName.substring(offset).replace(/\./g, "_");
      return safeIdentifier(name);
    }
    case "field": {
      const n = reflectLocalName(desc);
      if (!desc.oneof && reservedMessageProperties.has(n)) {
        return n + "$";
      }
      return n;
    }
    case "enum_value":
    case "oneof":
    case "rpc":
      return reflectLocalName(desc);
  }
}

export function isFieldPackedByDefault(field: DescField | DescExtension) {
  switch (field.proto.type) {
    case FieldDescriptorProto_Type.STRING:
    case FieldDescriptorProto_Type.BYTES:
    case FieldDescriptorProto_Type.GROUP:
    case FieldDescriptorProto_Type.MESSAGE:
      return false;
    default: {
      const edition =
        field.kind == "field" ? field.parent.file.edition : field.file.edition;
      switch (edition) {
        case Edition.EDITION_PROTO2:
          return false;
        default:
          return true;
      }
    }
  }
}

/**
 * Tells whether a field uses the prototype chain for field presence.
 * Behavior must match with the counterpart in @bufbuild/protobuf.
 */
export function fieldUsesPrototype(field: DescField): field is DescField & {
  fieldKind: "scalar" | "enum";
  oneof: undefined;
  repeated: false;
} {
  if (field.parent.file.edition != Edition.EDITION_PROTO2) {
    return false;
  }
  if (field.fieldKind != "scalar" && field.fieldKind != "enum") {
    return false;
  }
  if (field.oneof) {
    return false;
  }
  // proto2 singular scalar and enum fields use an initial value on the prototype chain
  return true;
}

export function getFieldTypeInfo(
  schema: Schema,
  f: GeneratedFile,
  field: DescField | DescExtension,
): {
  typing: Printable;
  optional: boolean;
  typingInferrableFromZeroValue: boolean;
} {
  const typing: Printable = [];
  let typingInferrableFromZeroValue: boolean;
  let optional = false;
  switch (field.fieldKind) {
    case "scalar":
      typing.push(scalarTypeScriptType(field.scalar, field.longType));
      optional = field.optional;
      typingInferrableFromZeroValue = true;
      break;
    case "message": {
      const baseType = codegenInfo.getUnwrappedFieldType(field);
      if (baseType !== undefined) {
        typing.push(scalarTypeScriptType(baseType, LongType.BIGINT));
      } else {
        typing.push(importPb(schema, f, field.message).toTypeOnly());
      }
      optional = true;
      typingInferrableFromZeroValue = true;
      break;
    }
    case "enum":
      typing.push(importPb(schema, f, field.enum).toTypeOnly());
      optional = field.optional;
      typingInferrableFromZeroValue = true;
      break;
    case "list": {
      switch (field.listKind) {
        case "scalar":
          typing.push(scalarTypeScriptType(field.scalar, field.longType));
          break;
        case "enum":
          typing.push(importPb(schema, f, field.enum).toTypeOnly());
          break;
        case "message":
          typing.push(importPb(schema, f, field.message).toTypeOnly());
          break;
      }
      typing.push("[]");
      typingInferrableFromZeroValue = false;
      break;
    }
    case "map": {
      let keyType: string;
      switch (field.mapKey) {
        case ScalarType.INT32:
        case ScalarType.FIXED32:
        case ScalarType.UINT32:
        case ScalarType.SFIXED32:
        case ScalarType.SINT32:
          keyType = "number";
          break;
        default:
          keyType = "string";
          break;
      }
      let valueType: Printable;
      switch (field.mapKind) {
        case "scalar":
          valueType = scalarTypeScriptType(field.scalar, LongType.BIGINT);
          break;
        case "message":
          valueType = importPb(schema, f, field.message).toTypeOnly();
          break;
        case "enum":
          valueType = importPb(schema, f, field.enum).toTypeOnly();
          break;
      }
      typing.push("{ [key: ", keyType, "]: ", valueType, " }");
      typingInferrableFromZeroValue = false;
      optional = false;
      break;
    }
  }
  return { typing, optional, typingInferrableFromZeroValue };
}

/**
 * Return a printable expression for the default value of a field.
 * Only applicable for singular scalar and enum fields.
 */
export function getFieldDefaultValueExpression(
  schema: Schema,
  f: GeneratedFile,
  field: DescField | DescExtension,
  enumAs:
    | "enum_value_as_is"
    | "enum_value_as_integer"
    | "enum_value_as_cast_integer" = "enum_value_as_is",
): Printable | undefined {
  if (field.fieldKind !== "enum" && field.fieldKind !== "scalar") {
    return undefined;
  }
  const defaultValue = field.getDefaultValue();
  if (defaultValue === undefined) {
    return undefined;
  }
  switch (field.fieldKind) {
    case "enum": {
      const enumValue = field.enum.values.find(
        (value) => value.number === defaultValue,
      );
      if (enumValue === undefined) {
        throw new Error(
          `invalid enum default value: ${String(defaultValue)} for ${enumValue}`,
        );
      }
      return literalEnumValue(schema, f, enumValue, enumAs);
    }
    case "scalar":
      return literalScalarValue(schema, f, defaultValue, field);
  }
}

/**
 * Return a printable expression for the zero value of a field.
 *
 * Returns either:
 * - empty array literal for repeated fields
 * - empty object literal for maps
 * - undefined for message fields
 * - an enums first value
 * - scalar zero value
 */
export function getFieldZeroValueExpression(
  schema: Schema,
  f: GeneratedFile,
  field: DescField | DescExtension,
  enumAs:
    | "enum_value_as_is"
    | "enum_value_as_integer"
    | "enum_value_as_cast_integer" = "enum_value_as_is",
): Printable | undefined {
  switch (field.fieldKind) {
    case "list":
      return "[]";
    case "message":
      return undefined;
    case "map":
      return "{}";
    case "enum": {
      // In proto3, the first enum value must be zero.
      // In proto2, protobuf-go returns the first value as the default.
      if (field.enum.values.length < 1) {
        throw new Error("invalid enum: missing at least one value");
      }
      const zeroValue = field.enum.values[0];
      return literalEnumValue(schema, f, zeroValue, enumAs);
    }
    case "scalar": {
      const defaultValue = codegenInfo.scalarZeroValue(
        field.scalar,
        field.longType,
      );
      return literalScalarValue(schema, f, defaultValue, field);
    }
  }
}

function literalScalarValue(
  schema: Schema,
  f: GeneratedFile,
  value: ScalarValue,
  field: (DescField | DescExtension) & { fieldKind: "scalar" },
): Printable {
  switch (field.scalar) {
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      if (typeof value != "number") {
        throw new Error(
          `Unexpected value for ${ScalarType[field.scalar]} ${field.toString()}: ${String(value)}`,
        );
      }
      return value;
    case ScalarType.BOOL:
      if (typeof value != "boolean") {
        throw new Error(
          `Unexpected value for ${ScalarType[field.scalar]} ${field.toString()}: ${String(value)}`,
        );
      }
      return value;
    case ScalarType.STRING:
      if (typeof value != "string") {
        throw new Error(
          `Unexpected value for ${ScalarType[field.scalar]} ${field.toString()}: ${String(value)}`,
        );
      }
      return { kind: "es_string", value };
    case ScalarType.BYTES:
      if (!(value instanceof Uint8Array)) {
        throw new Error(
          `Unexpected value for ${ScalarType[field.scalar]} ${field.toString()}: ${String(value)}`,
        );
      }
      return value;
    case ScalarType.INT64:
    case ScalarType.SINT64:
    case ScalarType.SFIXED64:
    case ScalarType.UINT64:
    case ScalarType.FIXED64: {
      if (typeof value != "bigint" && typeof value != "string") {
        throw new Error(
          `Unexpected value for ${ScalarType[field.scalar]} ${field.toString()}: ${String(value)}`,
        );
      }
      const literal = {
        kind: "es_proto_int64",
        type: field.scalar,
        longType: field.longType,
        value,
      } as const;
      const isBootstrap =
        !f.runtime.create.from.startsWith("@bufbuild/protobuf");
      if (!isBootstrap) {
        return literal;
      }
      return elProtoInt64(literal, runtimeImports(f));
    }
  }
}

type LiteralProtoInt64 = {
  readonly kind: "es_proto_int64";
  type:
    | ScalarType.INT64
    | ScalarType.SINT64
    | ScalarType.SFIXED64
    | ScalarType.UINT64
    | ScalarType.FIXED64;
  longType: LongType;
  value: bigint | string;
};

// we don't want to use v2's local bootstrapping import path, since v2 bootstraps
// to a different directory, the path does not match
function elProtoInt64(
  literal: LiteralProtoInt64,
  runtimeImports: RuntimeImports,
): Printable {
  switch (literal.longType) {
    case LongType.STRING:
      return [`"`, literal.value.toString(), `"`];
    case LongType.BIGINT:
      if (literal.value == protoInt64.zero) {
        // Loose comparison will match between 0n and 0.
        return [runtimeImports.protoInt64, ".zero"];
      }
      switch (literal.type) {
        case ScalarType.UINT64:
        case ScalarType.FIXED64:
          return [
            runtimeImports.protoInt64,
            ".uParse(",
            `"`,
            literal.value.toString(),
            `"`,
            ")",
          ];
        default:
          return [
            runtimeImports.protoInt64,
            ".parse(",
            `"`,
            literal.value.toString(),
            `"`,
            ")",
          ];
      }
  }
}

function literalEnumValue(
  schema: Schema,
  f: GeneratedFile,
  value: DescEnumValue,
  enumAs:
    | "enum_value_as_is"
    | "enum_value_as_integer"
    | "enum_value_as_cast_integer",
): Printable {
  switch (enumAs) {
    case "enum_value_as_is":
      return [importPb(schema, f, value.parent), ".", localName(value)];
    case "enum_value_as_integer":
      return [
        value.number,
        " /* ",
        value.parent.typeName,
        ".",
        value.name,
        " */",
      ];
    case "enum_value_as_cast_integer":
      return [
        value.number,
        " as ",
        importPb(schema, f, value.parent).toTypeOnly(),
        ".",
        localName(value),
      ];
  }
}
