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

import type { DescEnumValue, DescField } from "../../descriptor-set.js";
import type { DescMethod, DescOneof } from "../../descriptor-set.js";

/**
 * Returns the name of a protobuf element in generated code.
 *
 * Field names - including oneofs - are converted to lowerCamelCase. For methods,
 * the first character is made lowercase. All names are escaped to be safe object
 * property names.
 *
 * This function does not provide names for messages, enumerations, and services.
 */
export function localName(
  desc: DescEnumValue | DescOneof | DescField | DescMethod,
): string {
  const name = desc.name;
  switch (desc.kind) {
    // @ts-expect-error TS7029
    case "field":
      if (desc.oneof !== undefined) {
        // oneof member names are not properties, but values of the `case` property.
        return protoCamelCase(name);
      }
    // eslint-disable-next-line no-fallthrough
    case "oneof":
      return safeObjectProperty(protoCamelCase(name));
    case "enum_value": {
      let name = desc.name;
      const sharedPrefix = desc.parent.sharedPrefix;
      if (sharedPrefix !== undefined) {
        name = name.substring(sharedPrefix.length);
      }
      return safeObjectProperty(name);
    }
    case "rpc": {
      if (name.length == 0) {
        return name;
      }
      return safeObjectProperty(name[0].toLowerCase() + name.substring(1));
    }
  }
}

/**
 * Converts snake_case to protoCamelCase according to the convention
 * used by protoc to convert a field name to a JSON name.
 */
export function protoCamelCase(snakeCase: string): string {
  let capNext = false;
  const b = [];
  for (let i = 0; i < snakeCase.length; i++) {
    let c = snakeCase.charAt(i);
    switch (c) {
      case "_":
        capNext = true;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        b.push(c);
        capNext = false;
        break;
      default:
        if (capNext) {
          capNext = false;
          c = c.toUpperCase();
        }
        b.push(c);
        break;
    }
  }
  return b.join("");
}

/**
 * Names that cannot be used for object properties because they are reserved
 * by built-in JavaScript properties.
 */
const reservedObjectProperties = new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf",
]);

/**
 * Escapes names that are reserved for ECMAScript built-in object properties.
 *
 * Also see safeIdentifier() from @bufbuild/protoplugin/ecmascript.
 */
export function safeObjectProperty(name: string): string {
  return reservedObjectProperties.has(name) ? name + "$" : name;
}
