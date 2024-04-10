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

import type {
  DescEnum,
  DescField,
  DescMessage,
  DescOneof,
} from "@bufbuild/protobuf";
import { DescExtension } from "@bufbuild/protobuf";
import type {
  GeneratedFile,
  Printable,
  Schema,
} from "@bufbuild/protoplugin/ecmascript";
import { getNonEditionRuntime } from "./editions.js";
import {
  fieldUsesPrototype,
  getFieldTypeInfo,
  importPb,
  localName,
  runtimeImports,
} from "./util.js";
import { reifyWkt } from "./reify-wkt.js";

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
    for (const extension of file.extensions) {
      generateExtension(schema, f, extension);
    }
    // We do not generate anything for services
  }
}

// prettier-ignore
function generateEnum(schema: Schema, f: GeneratedFile, enumeration: DescEnum) {
  f.print(f.jsDoc(enumeration));
  f.print(f.exportDecl("declare enum", localName(enumeration)), " {");
  for (const value of enumeration.values) {
    if (enumeration.values.indexOf(value) > 0) {
      f.print();
    }
    f.print(f.jsDoc(value, "  "));
    f.print("  ", localName(value), " = ", value.number, ",");
  }
  f.print("}");
  f.print();
}

// prettier-ignore
function generateMessage(schema: Schema, f: GeneratedFile, message: DescMessage) {
  const protoN = getNonEditionRuntime(f, message.file);
  const {
    PartialMessage,
    FieldList,
    Message,
    PlainMessage,
    BinaryReadOptions,
    JsonReadOptions,
    JsonValue
  } = runtimeImports(f);
  const m = localName(message);
  f.print(f.jsDoc(message));
  f.print(f.exportDecl("declare class", m), " extends ", Message, "<", m, "> {");
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
  f.print("  constructor(data?: ", PartialMessage, "<", m, ">);");
  f.print();
  generateWktMethods(schema, f, message);
  f.print("  static readonly runtime: typeof ", protoN, ";");
  f.print('  static readonly typeName = ', f.string(message.typeName), ';');
  f.print("  static readonly fields: ", FieldList, ";");
  // In case we start supporting options, we have to surface them here
  //f.print("  static readonly options: { readonly [extensionName: string]: ", rt.JsonValue, " } = {};")
  f.print();
  generateWktStaticMethods(schema, f, message);
  f.print("  static fromBinary(bytes: Uint8Array, options?: Partial<", BinaryReadOptions, ">): ", m, ";")
  f.print()
  f.print("  static fromJson(jsonValue: ", JsonValue, ", options?: Partial<", JsonReadOptions, ">): ", m, ";")
  f.print()
  f.print("  static fromJsonString(jsonString: string, options?: Partial<", JsonReadOptions, ">): ", m, ";")
  f.print()
  f.print("  static equals(a: ", m, " | ", PlainMessage, "<", m, "> | undefined, b: ", m, " | ", PlainMessage, "<", m, "> | undefined): boolean;")
  f.print("}")
  f.print()
  for (const nestedEnum of message.nestedEnums) {
    generateEnum(schema, f, nestedEnum);
  }
  for (const nestedMessage of message.nestedMessages) {
    generateMessage(schema, f, nestedMessage);
  }
  for (const nestedExtension of message.nestedExtensions) {
    generateExtension(schema, f, nestedExtension);
  }
}

// prettier-ignore
function generateOneof(schema: Schema, f: GeneratedFile, oneof: DescOneof) {
  f.print(f.jsDoc(oneof, "  "));
  f.print("  ", localName(oneof), ": {");
  for (const field of oneof.fields) {
    if (oneof.fields.indexOf(field) > 0) {
      f.print(`  } | {`);
    }
    f.print(f.jsDoc(field, "    "));
    const { typing } = getFieldTypeInfo(schema, f, field);
    f.print(`    value: `, typing, `;`);
    f.print(`    case: "`, localName(field), `";`);
  }
  f.print(`  } | { case: undefined; value?: undefined };`);
}

// prettier-ignore
function generateField(schema: Schema, f: GeneratedFile, field: DescField) {
    f.print(f.jsDoc(field, "  "));
    const e: Printable = [];
    const { typing, optional } = getFieldTypeInfo(schema, f, field);
    if (fieldUsesPrototype(field) || !optional) {
      e.push("  ", localName(field), ": ", typing, ";");
    } else {
      e.push("  ", localName(field), "?: ", typing, ";");
    }
    f.print(e);
}

// prettier-ignore
function generateExtension(
  schema: Schema,
  f: GeneratedFile,
  ext: DescExtension,
) {
  const { typing } = getFieldTypeInfo(schema, f, ext);
  const e = importPb(schema, f, ext.extendee).toTypeOnly();
  f.print(f.jsDoc(ext));
  f.print(f.exportDecl("declare const", localName(ext)), ": ", runtimeImports(f).Extension, "<", e, ", ", typing, ">;");
  f.print();
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
  } = runtimeImports(f);
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
      f.print("  static pack(message: Message): ", localName(message), ";")
      f.print()
      break;
    case "google.protobuf.Timestamp":
      f.print("  static now(): ", localName(message), ";")
      f.print()
      f.print("  static fromDate(date: Date): ", localName(message), ";")
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
      const {typing} = getFieldTypeInfo(schema, f, ref.value);
      f.print("  static readonly fieldWrapper: {")
      f.print("    wrapField(value: ", typing, "): ", localName(message), ",")
      f.print("    unwrapField(value: ", localName(message), "): ", typing, ",")
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
