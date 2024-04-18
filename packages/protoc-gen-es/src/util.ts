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
import {
  LongType,
  ScalarType,
  scalarTypeScriptType,
} from "@bufbuild/protobuf/reflect";
import { Edition, isWrapperDesc } from "@bufbuild/protobuf/wkt";
import type { Printable } from "@bufbuild/protoplugin/ecmascript";

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

export function getFieldTypeInfo(field: DescField | DescExtension): {
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
      if (!field.oneof && isWrapperDesc(field.message)) {
        const baseType = field.message.fields[0].scalar;
        typing.push(scalarTypeScriptType(baseType, LongType.BIGINT));
      } else {
        typing.push({
          kind: "es_shape_ref",
          desc: field.message,
        });
      }
      optional = true;
      typingInferrableFromZeroValue = true;
      break;
    }
    case "enum":
      typing.push({
        kind: "es_shape_ref",
        desc: field.enum,
      });
      optional = field.optional;
      typingInferrableFromZeroValue = true;
      break;
    case "list":
      optional = false;
      typingInferrableFromZeroValue = false;
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
          typing.push(scalarTypeScriptType(field.scalar, field.longType), "[]");
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
          valueType = scalarTypeScriptType(field.scalar, LongType.BIGINT);
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
      typingInferrableFromZeroValue = false;
      optional = false;
      break;
    }
  }
  return { typing, optional, typingInferrableFromZeroValue };
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
