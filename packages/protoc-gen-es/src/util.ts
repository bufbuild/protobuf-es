// Copyright 2021-2025 Buf Technologies, Inc.
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
  type DescExtension,
  type DescField,
  DescMessage,
  ScalarType,
} from "@bufbuild/protobuf";
import {
  scalarJsonType,
  scalarTypeScriptType,
} from "@bufbuild/protobuf/codegenv1";
import {
  isWrapperDesc,
  StructSchema,
  ValueSchema,
} from "@bufbuild/protobuf/wkt";
import type { GeneratedFile, Printable } from "@bufbuild/protoplugin";

export function fieldTypeScriptType(
  field: DescField | DescExtension,
  imports: GeneratedFile["runtime"],
): {
  typing: Printable;
  optional: boolean;
} {
  const typing: Printable = [];
  let optional = false;
  switch (field.fieldKind) {
    case "scalar":
      typing.push(scalarTypeScriptType(field.scalar, field.longAsString));
      optional = field.proto.proto3Optional;
      break;
    case "message": {
      typing.push(messageFieldTypeScriptType(field, imports));
      optional = true;
      break;
    }
    case "enum":
      typing.push({
        kind: "es_shape_ref",
        desc: field.enum,
      });
      optional = field.proto.proto3Optional;
      break;
    case "list":
      optional = false;
      switch (field.listKind) {
        case "enum":
          typing.push(
            {
              kind: "es_shape_ref",
              desc: field.enum,
            },
            "[]",
          );
          break;
        case "scalar":
          typing.push(
            scalarTypeScriptType(field.scalar, field.longAsString),
            "[]",
          );
          break;
        case "message": {
          typing.push(messageFieldTypeScriptType(field, imports), "[]");
          break;
        }
      }
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
      let valueType: Printable;
      switch (field.mapKind) {
        case "scalar":
          valueType = scalarTypeScriptType(field.scalar, false);
          break;
        case "message":
          valueType = messageFieldTypeScriptType(field, imports);
          break;
        case "enum":
          valueType = {
            kind: "es_shape_ref",
            desc: field.enum,
          };
          break;
      }
      typing.push("{ [key: ", keyType, "]: ", valueType, " }");
      optional = false;
      break;
    }
  }
  return { typing, optional };
}

function messageFieldTypeScriptType(
  field: (DescField | DescExtension) & { message: DescMessage },
  imports: GeneratedFile["runtime"],
): Printable {
  if (
    isWrapperDesc(field.message) &&
    !field.oneof &&
    field.fieldKind == "message"
  ) {
    const baseType = field.message.fields[0].scalar;
    return scalarTypeScriptType(baseType, false);
  }
  if (
    field.message.typeName == StructSchema.typeName &&
    field.parent?.typeName != ValueSchema.typeName
  ) {
    return imports.JsonObject;
  }
  return {
    kind: "es_shape_ref",
    desc: field.message,
  };
}

export function fieldJsonType(field: DescField | DescExtension): Printable {
  switch (field.fieldKind) {
    case "scalar":
      return scalarJsonType(field.scalar);
    case "message":
      return {
        kind: "es_json_type_ref",
        desc: field.message,
      };
    case "enum":
      return {
        kind: "es_json_type_ref",
        desc: field.enum,
      };
    case "list":
      switch (field.listKind) {
        case "enum":
          return [
            {
              kind: "es_json_type_ref",
              desc: field.enum,
            },
            "[]",
          ];
        case "scalar": {
          const t = scalarJsonType(field.scalar);
          if (t.includes("|")) {
            return ["(", t, ")[]"];
          }
          return [t, "[]"];
        }
        case "message":
          return [
            {
              kind: "es_json_type_ref",
              desc: field.message,
            },
            "[]",
          ];
      }
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
      let valueType: Printable;
      switch (field.mapKind) {
        case "scalar":
          valueType = scalarJsonType(field.scalar);
          break;
        case "message":
          valueType = {
            kind: "es_json_type_ref",
            desc: field.message,
          };
          break;
        case "enum":
          valueType = {
            kind: "es_json_type_ref",
            desc: field.enum,
          };
          break;
      }
      return ["{ [key: ", keyType, "]: ", valueType, " }"];
    }
  }
}

export function functionCall(
  fn: Printable,
  args: Printable[],
  typeParams?: Printable[],
): Printable {
  let tp: Printable = [];
  if (typeParams !== undefined && typeParams.length > 0) {
    tp = ["<", commaSeparate(typeParams), ">"];
  }
  return [fn, ...tp, "(", commaSeparate(args), ")"];
}

function commaSeparate(elements: Printable[]): Printable {
  const r: Printable[] = [];
  for (let i = 0; i < elements.length; i++) {
    r.push(elements[i]);
    if (i < elements.length - 1) {
      r.push(", ");
    }
  }
  return r;
}
