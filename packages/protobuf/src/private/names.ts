// Copyright 2021-2022 Buf Technologies, Inc.
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
  DescEnum,
  DescEnumValue,
  DescExtension,
  DescField,
  DescMessage,
  DescService,
} from "../descriptor-set.js";
import type { DescMethod, DescOneof } from "../descriptor-set.js";

/**
 * Returns the name of a protobuf element in generated code.
 *
 * Field names - including oneofs - are converted to lowerCamelCase. For
 * messages, enumerations and services, the package name is stripped from
 * the type name. For nested messages and enumerations, the names are joined
 * with an underscore. For methods, the first character is made lowercase.
 */
export function localName(
  desc:
    | DescEnum
    | DescEnumValue
    | DescMessage
    | DescOneof
    | DescField
    | DescExtension
    | DescService
    | DescMethod
): string {
  switch (desc.kind) {
    case "field":
      return localFieldName(desc.name, desc.oneof !== undefined);
    case "extension":
      return localExtensionFieldName(desc.typeName);
    case "oneof":
      return localOneofName(desc.name);
    case "enum":
    case "message":
    case "service": {
      const pkg = desc.file.proto.package;
      const offset = pkg === undefined ? 0 : pkg.length + 1;
      const name = desc.typeName.substring(offset).replace(/\./g, "_");
      if (reservedIdent[name]) {
        return name + "$";
      }
      return name;
    }
    case "enum_value": {
      const sharedPrefix = desc.parent.sharedPrefix;
      if (sharedPrefix === undefined) {
        return desc.name;
      }
      const name = desc.name.substring(sharedPrefix.length);
      if (reservedObjectProperties[name]) {
        return name + "$";
      }
      return name;
    }
    case "rpc": {
      let name = desc.name;
      if (name.length == 0) {
        return name;
      }
      name = name[0].toLowerCase() + name.substring(1);
      if (reservedObjectProperties[name]) {
        return name + "$";
      }
      return name;
    }
  }
}

// TODO
export function localExtensionFieldName(extensionTypeName: string) {
  if (extensionTypeName.includes(".")) {
    return extensionTypeName;
  }
  return `.${extensionTypeName}`;
}

export function extensionFieldJsonName(extensionTypeName: string) {
  return `[${extensionTypeName}]`;
}

/**
 * Returns the name of a field in generated code.
 */
export function localFieldName(protoName: string, inOneof: boolean) {
  let name = protoCamelCase(protoName);
  if (inOneof) {
    // oneof member names are not properties, but values of the `case` property.
    return name;
  }
  if (reservedObjectProperties[name] || reservedMessageProperties[name]) {
    name = name + "$";
  }
  return name;
}

/**
 * Returns the name of a oneof group in generated code.
 */
export function localOneofName(protoName: string): string {
  return localFieldName(protoName, false);
}

/**
 * Returns the JSON name for a protobuf field, exactly like protoc does.
 */
export const fieldJsonName = protoCamelCase;

/**
 * Finds a prefix shared by enum values, for example `MY_ENUM_` for
 * `enum MyEnum {MY_ENUM_A=0; MY_ENUM_B=1;}`.
 */
export function findEnumSharedPrefix(
  enumName: string,
  valueNames: string[]
): string | undefined {
  const prefix = camelToSnakeCase(enumName) + "_";
  for (const name of valueNames) {
    if (!name.toLowerCase().startsWith(prefix)) {
      return undefined;
    }
    const shortName = name.substring(prefix.length);
    if (shortName.length == 0) {
      return undefined;
    }
    if (/^\d/.test(shortName)) {
      // identifiers must not start with numbers
      return undefined;
    }
  }
  return prefix;
}

/**
 * Converts lowerCamelCase or UpperCamelCase into lower_snake_case.
 * This is used to find shared prefixes in an enum.
 */
function camelToSnakeCase(camel: string): string {
  return (
    camel.substring(0, 1) + camel.substring(1).replace(/[A-Z]/g, (c) => "_" + c)
  ).toLowerCase();
}

/**
 * Converts snake_case to protoCamelCase according to the convention
 * used by protoc to convert a field name to a JSON name.
 */
function protoCamelCase(snakeCase: string): string {
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

// Names that cannot be used for identifiers, such as class names,
// but _can_ be used for object properties.
const reservedIdent: { [k: string]: boolean } = {
  // ECMAScript 2015 keywords
  break: true,
  case: true,
  catch: true,
  class: true,
  const: true,
  continue: true,
  debugger: true,
  default: true,
  delete: true,
  do: true,
  else: true,
  export: true,
  extends: true,
  false: true,
  finally: true,
  for: true,
  function: true,
  if: true,
  import: true,
  in: true,
  instanceof: true,
  new: true,
  null: true,
  return: true,
  super: true,
  switch: true,
  this: true,
  throw: true,
  true: true,
  try: true,
  typeof: true,
  var: true,
  void: true,
  while: true,
  with: true,
  yield: true,

  // ECMAScript 2015 future reserved keywords
  enum: true,
  implements: true,
  interface: true,
  let: true,
  package: true,
  private: true,
  protected: true,
  public: true,
  static: true,

  // Class name cannot be 'Object' when targeting ES5 with module CommonJS
  Object: true,

  // TypeScript keywords that cannot be used for types (as opposed to variables)
  bigint: true,
  number: true,
  boolean: true,
  string: true,
  object: true,

  // Identifiers reserved for the runtime, so we can generate legible code
  globalThis: true,
  Uint8Array: true,
  Partial: true,
};

// Names that cannot be used for object properties because they are reserved
// by built-in JavaScript properties.
const reservedObjectProperties: { [k: string]: boolean } = {
  // names reserved by JavaScript
  constructor: true,
  toString: true,
  toJSON: true,
  valueOf: true,
};

// Names that cannot be used for object properties because they are reserved
// by the runtime.
const reservedMessageProperties: { [k: string]: boolean } = {
  // names reserved by the runtime
  getType: true,
  clone: true,
  equals: true,
  fromBinary: true,
  fromJson: true,
  fromJsonString: true,
  toBinary: true,
  toJson: true,
  toJsonString: true,

  // names reserved by the runtime for the future
  toObject: true,
};
