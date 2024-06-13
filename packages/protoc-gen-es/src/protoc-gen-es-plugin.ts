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
  DescFile,
  DescMessage,
  DescService,
} from "@bufbuild/protobuf";
import { parentTypes } from "@bufbuild/protobuf/reflect";
import { embedFileDesc, pathInFileDesc } from "@bufbuild/protobuf/codegenv1";
import { isWrapperDesc } from "@bufbuild/protobuf/wkt";
import {
  createEcmaScriptPlugin,
  getDeclarationString,
  type GeneratedFile,
  type Printable,
  type Schema,
  type Target,
} from "@bufbuild/protoplugin";
import {
  arrayLiteral,
  fieldJsonType,
  fieldTypeScriptType,
  functionCall,
} from "./util";
import { version } from "../package.json";

export const protocGenEs = createEcmaScriptPlugin({
  name: "protoc-gen-es",
  version: `v${String(version)}`,
  generateTs,
  generateJs,
  generateDts,
});

// This annotation informs bundlers that the succeeding function call is free of
// side effects. This means the symbol can be removed from the module during
// tree-shaking if it is unused.
// See https://github.com/bufbuild/protobuf-es/pull/470
const pure = "/*@__PURE__*/";

// prettier-ignore
function generateTs(schema: Schema) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_pb.ts");
    f.preamble(file);
    const { GenDescFile } = f.runtime.codegen;
    const fileDesc = f.importDesc(file);
    generateDescDoc(f, file);
    f.print(f.export("const", fileDesc.name), ": ", GenDescFile, " = ", pure);
    f.print("  ", getFileDescCall(f, file, schema), ";");
    f.print();
    for (const desc of schema.typesInFile(file)) {
      switch (desc.kind) {
        case "message": {
          generateMessageShape(f, desc, "ts");
          generateMessageJsonShape(f, desc, "ts");
          const { GenDescMessage, messageDesc } = f.runtime.codegen;
          const Shape = f.importShape(desc);
          const JsonType = f.importJson(desc);
          const name = f.importDesc(desc).name;
          generateDescDoc(f, desc);
          const call = functionCall(messageDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.export("const", name), ": ", GenDescMessage, "<", Shape, ", ", JsonType, ">", " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "enum": {
          generateEnumShape(f, desc);
          generateEnumJsonShape(f, desc, "ts");
          const { GenDescEnum, enumDesc } = f.runtime.codegen;
          const Shape = f.importShape(desc);
          const JsonType = f.importJson(desc);
          generateDescDoc(f, desc);
          const name = f.importDesc(desc).name;
          const call = functionCall(enumDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.export("const", name), ": ", GenDescEnum, "<", Shape, ", ", JsonType, ">", " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "extension": {
          const { GenDescExtension, extDesc } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          const E = f.importShape(desc.extendee);
          const V = fieldTypeScriptType(desc).typing;
          const call = functionCall(extDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.jsDoc(desc));
          f.print(f.export("const", name), ": ", GenDescExtension, "<", E, ", ", V, ">", " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "service": {
          const { GenDescService, serviceDesc } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          const call = functionCall(serviceDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.jsDoc(desc));
          f.print(f.export("const", name), ": ", GenDescService, "<", getServiceShapeExpr(f, desc), "> = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
      }
    }
  }
}

// prettier-ignore
function generateJs(schema: Schema) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_pb.js");
    f.preamble(file);
    const fileDesc = f.importDesc(file);
    generateDescDoc(f, file);
    f.print(f.export("const", fileDesc.name), " = ", pure);
    f.print("  ", getFileDescCall(f, file, schema), ";");
    f.print();
    for (const desc of schema.typesInFile(file)) {
      switch (desc.kind) {
        case "message": {
          const { messageDesc } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          generateDescDoc(f, desc);
          const call = functionCall(messageDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.export("const", name), " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "enum": {
          // generate descriptor
          {
            const { enumDesc } = f.runtime.codegen;
            generateDescDoc(f, desc);
            const name = f.importDesc(desc).name;
            const call = functionCall(enumDesc, [fileDesc, ...pathInFileDesc(desc)]);
            f.print(f.export("const", name), " = ", pure);
            f.print("  ", call, ";");
            f.print();
          }
          // declare TypeScript enum
          {
            f.print(f.jsDoc(desc));
            const { tsEnum } = f.runtime.codegen;
            const call = functionCall(tsEnum, [f.importDesc(desc)]);
            f.print(f.export("const", f.importShape(desc).name), " = ", pure);
            f.print("  ", call, ";");
            f.print();
          }
          break;
        }
        case "extension": {
          const { extDesc } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          const call = functionCall(extDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.jsDoc(desc));
          f.print(f.export("const", name), " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "service": {
          const { serviceDesc } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          f.print(f.jsDoc(desc));
          const call = functionCall(serviceDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.export("const", name), " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
      }
    }
  }
}

// prettier-ignore
function generateDts(schema: Schema) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_pb.d.ts");
    f.preamble(file);
    const { GenDescFile } = f.runtime.codegen;
    const fileDesc = f.importDesc(file);
    generateDescDoc(f, file);
    f.print(f.export("declare const", fileDesc.name), ": ", GenDescFile, ";");
    f.print();
    for (const desc of schema.typesInFile(file)) {
      switch (desc.kind) {
        case "message": {
          generateMessageShape(f, desc, "dts");
          generateMessageJsonShape(f, desc, "dts");
          const { GenDescMessage } = f.runtime.codegen;
          const Shape = f.importShape(desc);
          const JsonType = f.importJson(desc);
          const name = f.importDesc(desc).name;
          generateDescDoc(f, desc);
          f.print(f.export("declare const", name), ": ", GenDescMessage, "<", Shape, ", ", JsonType, ">", ";");
          f.print();
          break;
        }
        case "enum": {
          generateEnumShape(f, desc);
          generateEnumJsonShape(f, desc, "dts");
          const { GenDescEnum } = f.runtime.codegen;
          const Shape = f.importShape(desc);
          const JsonType = f.importJson(desc);
          generateDescDoc(f, desc);
          const name = f.importDesc(desc).name;
          f.print(f.export("declare const", name), ": ", GenDescEnum, "<", Shape, ", ", JsonType, ">;");
          f.print();
          break;
        }
        case "extension": {
          const { GenDescExtension } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          const E = f.importShape(desc.extendee);
          const V = fieldTypeScriptType(desc).typing;
          f.print(f.jsDoc(desc));
          f.print(f.export("declare const", name), ": ", GenDescExtension, "<", E, ", ", V, ">;");
          f.print();
          break;
        }
        case "service": {
          const { GenDescService } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          f.print(f.jsDoc(desc));
          f.print(f.export("declare const", name), ": ", GenDescService, "<", getServiceShapeExpr(f, desc), ">;");
          f.print();
          break;
        }
      }
    }
  }
}

function generateDescDoc(
  f: GeneratedFile,
  desc: DescFile | DescMessage | DescEnum,
): void {
  let lines: string[];
  switch (desc.kind) {
    case "file":
      lines = [`Describes the ${desc.toString()}.`];
      break;
    case "message":
      lines = [
        `Describes the ${desc.toString()}.`,
        `Use \`create(${f.importDesc(desc).name})\` to create a new message.`,
      ];
      break;
    case "enum":
      lines = [`Describes the ${desc.toString()}.`];
      break;
  }
  const deprecated =
    desc.deprecated || parentTypes(desc).some((d) => d.deprecated);
  if (deprecated) {
    lines.push("@deprecated");
  }
  f.print({
    kind: "es_jsdoc",
    text: lines.join("\n"),
  });
}

// prettier-ignore
function getFileDescCall(f: GeneratedFile, file: DescFile, schema: Schema) {
  // Schema provides files with source retention options. Since we do not want to
  // embed source retention options in generated code, we use FileDescriptorProto
  // messages from CodeGeneratorRequest.proto_file instead.
  const sourceFile = file.proto;
  const runtimeFile = schema.proto.protoFile.find(f => f.name == sourceFile.name);
  const info = embedFileDesc(runtimeFile ?? sourceFile);
  if (info.bootable && !f.runtime.create.from.startsWith("@bufbuild/protobuf")) {
    // google/protobuf/descriptor.proto is embedded as a plain object when
    // bootstrapping to avoid recursion
    return functionCall(f.runtime.codegen.boot, [JSON.stringify(info.boot())]);
  }
  const { fileDesc } = f.runtime.codegen;
  if (file.dependencies.length > 0) {
    const deps: Printable = file.dependencies.map((f) => ({
      kind: "es_desc_ref",
      desc: f,
    }));
    return functionCall(fileDesc, [
      f.string(info.base64()),
      arrayLiteral(deps),
    ]);
  }
  return functionCall(fileDesc, [f.string(info.base64())]);
}

// prettier-ignore
function getServiceShapeExpr(f: GeneratedFile, service: DescService): Printable {
  const p: Printable[] = [];
  function print(...printables: Printable[]) {
    p.push(...printables, "\n");
  }
  print("{");
  for (const method of service.methods) {
    print(f.jsDoc(method, "  "));
    print("  ", method.localName, ": {");
    print("    methodKind: ", f.string(method.methodKind), ";");
    print("    input: typeof ", f.importDesc(method.input, true), ";");
    print("    output: typeof ", f.importDesc(method.output, true), ";");
    print("  },");
  }
  print("}");
  return p;
}

// prettier-ignore
function generateEnumShape(f: GeneratedFile, enumeration: DescEnum) {
  f.print(f.jsDoc(enumeration));
  f.print(f.export("enum", f.importShape(enumeration).name), " {");
  for (const value of enumeration.values) {
    if (enumeration.values.indexOf(value) > 0) {
      f.print();
    }
    f.print(f.jsDoc(value, "  "));
    f.print("  ", value.localName, " = ", value.number, ",");
  }
  f.print("}");
  f.print();
}

// prettier-ignore
function generateEnumJsonShape(f: GeneratedFile, enumeration: DescEnum, target: Extract<Target, "ts" | "dts">) {
  f.print(f.jsDoc(`JSON type for the ${enumeration.toString()}.`));
  const declaration = target == "ts" ? "type" : "declare type";
  const values: Printable[] = [];
  if (enumeration.typeName == "google.protobuf.NullValue") {
    values.push("null");
  } else {
    for (const v of enumeration.values) {
      if (enumeration.values.indexOf(v) > 0) {
        values.push(" | ");
      }
      values.push(f.string(v.name));
    }
  }
  f.print(f.export(declaration, f.importJson(enumeration).name), " = ", values, ";");
  f.print();
}

// prettier-ignore
function generateMessageShape(f: GeneratedFile, message: DescMessage, target: Extract<Target, "ts" | "dts">) {
  const { Message } = f.runtime;
  const declaration = target == "ts" ? "type" : "declare type";
  f.print(f.jsDoc(message));
  f.print(f.export(declaration, f.importShape(message).name), " = ", Message, "<", f.string(message.typeName), "> & {");
  for (const member of message.members) {
    switch (member.kind) {
      case "oneof":
        f.print(f.jsDoc(member, "  "));
        f.print("  ", member.localName, ": {");
        for (const field of member.fields) {
          if (member.fields.indexOf(field) > 0) {
            f.print(`  } | {`);
          }
          f.print(f.jsDoc(field, "    "));
          const { typing } = fieldTypeScriptType(field);
          f.print(`    value: `, typing, `;`);
          f.print(`    case: "`, field.localName, `";`);
        }
        f.print(`  } | { case: undefined; value?: undefined };`);
        break;
      default: {
        f.print(f.jsDoc(member, "  "));
        const { typing, optional } = fieldTypeScriptType(member);
        if (optional) {
          f.print("  ", member.localName, "?: ", typing, ";");
        } else {
          f.print("  ", member.localName, ": ", typing, ";");
        }
        break;
      }
    }
    if (message.members.indexOf(member) < message.members.length - 1) {
      f.print();
    }
  }
  f.print("};");
  f.print();
}

// prettier-ignore
function generateMessageJsonShape(f: GeneratedFile, message: DescMessage, target: Extract<Target, "ts" | "dts">) {
  const exp = f.export(target == "ts" ? "type" : "declare type", f.importJson(message).name);
  f.print(f.jsDoc(`JSON type for the ${message.toString()}.`));
  switch (message.typeName) {
    case "google.protobuf.Any":
      f.print(exp, " = {");
      f.print(`  "@type"?: string`);
      f.print("};");
      break;
    case "google.protobuf.Timestamp":
      f.print(exp, " = string;");
      break;
    case "google.protobuf.Duration":
      f.print(exp, " = string;");
      break;
    case "google.protobuf.FieldMask":
      f.print(exp, " = string;");
      break;
    case "google.protobuf.Struct":
      f.print(exp, " = ", f.runtime.JsonObject, ";");
      break;
    case "google.protobuf.Value":
      f.print(exp, " = ", f.runtime.JsonValue, ";");
      break;
    case "google.protobuf.ListValue":
      f.print(exp, " = ", f.runtime.JsonValue, "[];");
      break;
    case "google.protobuf.Empty":
      f.print(exp, " = Record<string, never>;");
      break;
    default:
      if (isWrapperDesc(message)) {
        f.print(exp, " = ", fieldJsonType(message.fields[0]), ";");
      } else {
        f.print(exp, " = {");
        for (const field of message.fields) {
          switch (field.kind) {
            default:
              f.print(f.jsDoc(`@generated from field: ${getDeclarationString(field)};`, "  "));
              // eslint-disable-next-line no-case-declarations
              let jsonName: Printable = field.jsonName;
              if (jsonName === ""
                || /^[0-9]/.test(jsonName)
                || jsonName.indexOf("@") > -1) {
                jsonName = f.string(jsonName);
              }
              f.print("  ", jsonName, "?: ", fieldJsonType(field), ";");
              break;
          }
          if (message.fields.indexOf(field) < message.fields.length - 1) {
            f.print();
          }
        }
        f.print("};");
      }
  }
  f.print();
}
