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

import type { DescExtension, DescField } from "@bufbuild/protobuf";
import { codegenInfo, LongType, ScalarType } from "@bufbuild/protobuf";
import type { GeneratedFile, Printable } from "./generated-file.js";
import type { ImportSymbol } from "./import-symbol.js";

const { localName, getUnwrappedFieldType, scalarZeroValue } = codegenInfo;

/**
 * @deprecated Please use GeneratedFile.string() instead
 */
export function literalString(value: string): string {
  return (
    '"' +
    value
      .split("\\")
      .join("\\\\")
      .split('"')
      .join('\\"')
      .split("\r")
      .join("\\r")
      .split("\n")
      .join("\\n") +
    '"'
  );
}

/**
 * @deprecated
 */
export function getFieldTyping(
  field: DescField | DescExtension,
  file: GeneratedFile,
): { typing: Printable; optional: boolean } {
  const typing: Printable = [];
  let optional = false;
  switch (field.fieldKind) {
    case "scalar":
      typing.push(scalarTypeScriptType(field.scalar, field.longType));
      optional = field.optional;
      break;
    case "message": {
      const baseType = getUnwrappedFieldType(field);
      if (baseType !== undefined) {
        typing.push(scalarTypeScriptType(baseType, LongType.BIGINT));
      } else {
        typing.push(file.import(field.message).toTypeOnly());
      }
      optional = true;
      break;
    }
    case "enum":
      typing.push(file.import(field.enum).toTypeOnly());
      optional = field.optional;
      break;
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
      let valueType;
      switch (field.mapValue.kind) {
        case "scalar":
          valueType = scalarTypeScriptType(
            field.mapValue.scalar,
            LongType.BIGINT,
          );
          break;
        case "message":
          valueType = file.import(field.mapValue.message).toTypeOnly();
          break;
        case "enum":
          valueType = file.import(field.mapValue.enum).toTypeOnly();
          break;
      }
      typing.push("{ [key: ", keyType, "]: ", valueType, " }");
      optional = false;
      break;
    }
  }
  if (field.repeated) {
    typing.push("[]");
    optional = false;
  }
  return { typing, optional };
}

/**
 * @deprecated
 */
export function getFieldExplicitDefaultValue(
  field: DescField | DescExtension,
  protoInt64Symbol: ImportSymbol,
): Printable | undefined {
  switch (field.fieldKind) {
    case "enum": {
      const value = field.enum.values.find(
        (v) => v.number === field.getDefaultValue(),
      );
      if (value !== undefined) {
        return [value.parent, ".", localName(value)];
      }
      break;
    }
    case "scalar": {
      const defaultValue = field.getDefaultValue();
      if (defaultValue === undefined) {
        break;
      }
      switch (field.scalar) {
        case ScalarType.FLOAT:
        case ScalarType.DOUBLE: {
          return defaultValue;
        }
        case ScalarType.INT64:
        case ScalarType.SINT64:
        case ScalarType.SFIXED64:
          return [protoInt64Symbol, `.parse("${defaultValue.toString()}")`];
        case ScalarType.UINT64:
        case ScalarType.FIXED64:
          return [protoInt64Symbol, `.uParse("${defaultValue.toString()}")`];
        case ScalarType.INT32:
        case ScalarType.FIXED32:
        case ScalarType.UINT32:
        case ScalarType.SFIXED32:
        case ScalarType.SINT32:
          return defaultValue;
        case ScalarType.BOOL: {
          return defaultValue;
        }
        case ScalarType.STRING: {
          if (typeof defaultValue == "string") {
            return literalString(defaultValue);
          }
          break;
        }
        case ScalarType.BYTES: {
          if (defaultValue instanceof Uint8Array) {
            return defaultValue;
          }
          break;
        }
      }
      break;
    }
    default:
      break;
  }
  return undefined;
}

/**
 * @deprecated
 */
export function getFieldIntrinsicDefaultValue(field: DescField): {
  defaultValue: Printable | undefined;
  typingInferrable: boolean;
} {
  if (field.repeated) {
    return {
      defaultValue: "[]",
      typingInferrable: false,
    };
  }
  if (field.fieldKind == "map") {
    return {
      defaultValue: "{}",
      typingInferrable: false,
    };
  }
  let defaultValue: Printable | undefined = undefined;
  let typingInferrable = false;
  if (field.parent.file.syntax == "proto3") {
    switch (field.fieldKind) {
      case "enum": {
        if (!field.optional) {
          const zeroValue = field.enum.values.find((v) => v.number === 0);
          if (zeroValue === undefined) {
            throw new Error("invalid proto3 enum: missing 0 value");
          }
          defaultValue = [field.enum, ".", localName(zeroValue)];
          typingInferrable = true;
        }
        break;
      }
      case "scalar":
        if (!field.optional) {
          typingInferrable = true;
          if (field.scalar === ScalarType.STRING) {
            defaultValue = literalString("");
          } else {
            defaultValue = scalarZeroValue(field.scalar, field.longType);
            if (typeof defaultValue === "string") {
              defaultValue = literalString(defaultValue);
            }
          }
        }
        break;
      default:
        break;
    }
  }
  return {
    defaultValue,
    typingInferrable,
  };
}

/**
 * @deprecated
 */
function scalarTypeScriptType(type: ScalarType, longType: LongType): Printable {
  switch (type) {
    case ScalarType.STRING:
      return "string";
    case ScalarType.BOOL:
      return "boolean";
    case ScalarType.UINT64:
    case ScalarType.SFIXED64:
    case ScalarType.FIXED64:
    case ScalarType.SINT64:
    case ScalarType.INT64:
      if (longType === LongType.STRING) {
        return "string";
      }
      return "bigint";
    case ScalarType.BYTES:
      return "Uint8Array";
    default:
      return "number";
  }
}
