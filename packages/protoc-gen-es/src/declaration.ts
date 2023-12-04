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
  DescEnum,
  DescField,
  DescMessage,
  DescOneof,
} from "@bufbuild/protobuf";
import type {
  GeneratedFile,
  Printable,
  Schema,
} from "@bufbuild/protoplugin/ecmascript";
import {
  getFieldTyping,
  literalString,
  localName,
  makeJsDoc,
  reifyWkt,
} from "@bufbuild/protoplugin/ecmascript";
import { getNonEditionRuntime } from "./editions.js";

export function generateDts(schema: Schema) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_pb.d.ts");
    f.preamble(file);
    for (const enumeration of file.enums) {
      generateEnum(schema, f, enumeration);
    }
    for (const message of file.messages) {
      generateMessage(schema, f, message);
    }
    // We do not generate anything for services, and we do not support extensions at this time
  }
}

// prettier-ignore
function generateEnum(schema: Schema, f: GeneratedFile, enumeration: DescEnum) {
  f.print(makeJsDoc(enumeration));
  f.print("export declare enum ", enumeration, " {");
  for (const value of enumeration.values) {
    if (enumeration.values.indexOf(value) > 0) {
      f.print();
    }
    f.print(makeJsDoc(value, "  "));
    f.print("  ", localName(value), " = ", value.number, ",");
  }
  f.print("}");
  f.print();
}

// prettier-ignore
function generateMessage(schema: Schema, f: GeneratedFile, message: DescMessage) {
  const protoN = getNonEditionRuntime(schema, message.file);
  const {
    PartialMessage,
    FieldList,
    Message,
    PlainMessage,
    BinaryReadOptions,
    JsonReadOptions,
    JsonValue
  } = schema.runtime;
  f.print(makeJsDoc(message));
  f.print("export declare class ", message, " extends ", Message, "<", message, "> {");
  for (const member of message.members) {
    switch (member.kind) {
      case "oneof":
        generateOneof(schema, f, member);
        break;
      default:
        generateField(schema, f, member);
        break;
    }
    f.print();
  }
  f.print("  constructor(data?: ", PartialMessage, "<", message, ">);");
  f.print();
  generateWktMethods(schema, f, message);
  f.print("  static readonly runtime: typeof ", protoN, ";");
  f.print('  static readonly typeName = ', literalString(message.typeName), ';');
  f.print("  static readonly fields: ", FieldList, ";");
  // In case we start supporting options, we have to surface them here
  //f.print("  static readonly options: { readonly [extensionName: string]: ", rt.JsonValue, " } = {};")
  f.print();
  generateWktStaticMethods(schema, f, message);
  f.print("  static fromBinary(bytes: Uint8Array, options?: Partial<", BinaryReadOptions, ">): ", message, ";")
  f.print()
  f.print("  static fromJson(jsonValue: ", JsonValue, ", options?: Partial<", JsonReadOptions, ">): ", message, ";")
  f.print()
  f.print("  static fromJsonString(jsonString: string, options?: Partial<", JsonReadOptions, ">): ", message, ";")
  f.print()
  f.print("  static equals(a: ", message, " | ", PlainMessage, "<", message, "> | undefined, b: ", message, " | ", PlainMessage, "<", message, "> | undefined): boolean;")
  f.print("}")
  f.print()
  for (const nestedEnum of message.nestedEnums) {
    generateEnum(schema, f, nestedEnum);
  }
  for (const nestedMessage of message.nestedMessages) {
    generateMessage(schema, f, nestedMessage);
  }
  // We do not support extensions at this time
}

// prettier-ignore
function generateOneof(schema: Schema, f: GeneratedFile, oneof: DescOneof) {
  f.print(makeJsDoc(oneof, "  "));
  f.print("  ", localName(oneof), ": {");
  for (const field of oneof.fields) {
    if (oneof.fields.indexOf(field) > 0) {
      f.print(`  } | {`);
    }
    f.print(makeJsDoc(field, "    "));
    const { typing } = getFieldTyping(field, f);
    f.print(`    value: `, typing, `;`);
    f.print(`    case: "`, localName(field), `";`);
  }
  f.print(`  } | { case: undefined; value?: undefined };`);
}

function generateField(schema: Schema, f: GeneratedFile, field: DescField) {
  f.print(makeJsDoc(field, "  "));
  const e: Printable = [];
  e.push("  ", localName(field));
  const { typing, optional } = getFieldTyping(field, f);
  if (optional) {
    e.push("?: ", typing);
  } else {
    e.push(": ", typing);
  }
  e.push(";");
  f.print(e);
}

// prettier-ignore
function generateWktMethods(schema: Schema, f: GeneratedFile, message: DescMessage) {
  const ref = reifyWkt(message);
  if (ref === undefined) {
    return;
  }
  const {
    Message,
    MessageType,
    IMessageTypeRegistry
  } = schema.runtime;
  switch (ref.typeName) {
    case "google.protobuf.Any":
      f.print("  packFrom(message: ", Message, "): void;");
      f.print();
      f.print("  unpackTo(target: ", Message, "): boolean;");
      f.print();
      f.print("  unpack(registry: ", IMessageTypeRegistry, "): Message | undefined;");
      f.print();
      f.print("  is(type: ", MessageType, " | string): boolean;");
      f.print();
      f.print("  private typeNameToUrl(name: string): string;");
      f.print();
      f.print("  private typeUrlToName(url: string): string;");
      f.print();
      break;
    case "google.protobuf.Timestamp":
      f.print("  toDate(): Date;");
      f.print();
      break;
    case "google.protobuf.Duration":
    case "google.protobuf.Struct":
    case "google.protobuf.Value":
    case "google.protobuf.ListValue":
    case "google.protobuf.FieldMask":
    case "google.protobuf.DoubleValue":
    case "google.protobuf.FloatValue":
    case "google.protobuf.Int64Value":
    case "google.protobuf.UInt64Value":
    case "google.protobuf.Int32Value":
    case "google.protobuf.UInt32Value":
    case "google.protobuf.BoolValue":
    case "google.protobuf.StringValue":
    case "google.protobuf.BytesValue":
      break;
  }
}

// prettier-ignore
function generateWktStaticMethods(schema: Schema, f: GeneratedFile, message: DescMessage) {
  const ref = reifyWkt(message);
  if (ref === undefined) {
    return;
  }
  switch (ref.typeName) {
    case "google.protobuf.Any":
      f.print("  static pack(message: Message): ", message, ";")
      f.print()
      break;
    case "google.protobuf.Timestamp":
      f.print("  static now(): ", message, ";")
      f.print()
      f.print("  static fromDate(date: Date): ", message, ";")
      f.print()
      break;
    case "google.protobuf.DoubleValue":
    case "google.protobuf.FloatValue":
    case "google.protobuf.Int64Value":
    case "google.protobuf.UInt64Value":
    case "google.protobuf.Int32Value":
    case "google.protobuf.UInt32Value":
    case "google.protobuf.BoolValue":
    case "google.protobuf.StringValue":
    case "google.protobuf.BytesValue": {
      const {typing} = getFieldTyping(ref.value, f);
      f.print("  static readonly fieldWrapper: {")
      f.print("    wrapField(value: ", typing, "): ", message, ",")
      f.print("    unwrapField(value: ", message, "): ", typing, ",")
      f.print("  };")
      f.print()
      break;
    }
    case "google.protobuf.Duration":
    case "google.protobuf.Struct":
    case "google.protobuf.Value":
    case "google.protobuf.ListValue":
    case "google.protobuf.FieldMask":
      break;
  }
}
