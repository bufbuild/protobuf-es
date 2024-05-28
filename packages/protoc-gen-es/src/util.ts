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
  type DescExtension,
  type DescField,
  ScalarType,
} from "@bufbuild/protobuf";
import { scalarTypeScriptType } from "@bufbuild/protobuf/reflect";
import { isWrapperDesc } from "@bufbuild/protobuf/wkt";
import type { Printable } from "@bufbuild/protoplugin";

export function fieldTypeScriptType(field: DescField | DescExtension): {
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
      if (!field.oneof && isWrapperDesc(field.message)) {
        const baseType = field.message.fields[0].scalar;
        typing.push(scalarTypeScriptType(baseType, false));
      } else {
        typing.push({
          kind: "es_shape_ref",
          desc: field.message,
        });
      }
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
          typing.push(
            {
              kind: "es_shape_ref",
              desc: field.message,
            },
            "[]",
          );
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
          valueType = {
            kind: "es_shape_ref",
            desc: field.message,
          };
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

export function arrayLiteral(elements: Printable[]): Printable {
  return ["[", commaSeparate(elements), "]"];
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
