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
  type GeneratedFile,
  type Printable,
  type Schema,
  type Target,
} from "@bufbuild/protoplugin";
import { fieldJsonType, fieldTypeScriptType, functionCall } from "./util";
import { version } from "../package.json";

export const protocGenEs = createEcmaScriptPlugin({
  name: "protoc-gen-es",
  version: `v${String(version)}`,
  parseOptions,
  generateTs,
  generateJs,
  generateDts,
});

type Options = {
  jsonTypes: boolean;
};

function parseOptions(
  options: {
    key: string;
    value: string;
  }[],
): Options {
  let jsonTypes = false;
  for (const { key, value } of options) {
    switch (key) {
      case "json_types":
        if (!["true", "1", "false", "0"].includes(value)) {
          throw "please provide true or false";
        }
        jsonTypes = ["true", "1"].includes(value);
        break;
      default:
        throw new Error();
    }
  }
  return { jsonTypes };
}

// This annotation informs bundlers that the succeeding function call is free of
// side effects. This means the symbol can be removed from the module during
// tree-shaking if it is unused.
// See https://github.com/bufbuild/protobuf-es/pull/470
const pure = "/*@__PURE__*/";

// prettier-ignore
function generateTs(schema: Schema<Options>) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_pb.ts");
    f.preamble(file);
    const { GenFile } = f.runtime.codegen;
    const fileDesc = f.importSchema(file);
    generateDescDoc(f, file);
    f.print(f.export("const", fileDesc.name), ": ", GenFile, " = ", pure);
    f.print("  ", getFileDescCall(f, file, schema), ";");
    f.print();
    for (const desc of schema.typesInFile(file)) {
      switch (desc.kind) {
        case "message": {
          generateMessageShape(f, desc, "ts");
          if (schema.options.jsonTypes) {
            generateMessageJsonShape(f, desc, "ts");
          }
          generateDescDoc(f, desc);
          const name = f.importSchema(desc).name;
          const Shape = f.importShape(desc);
          const { GenMessage, messageDesc } = f.runtime.codegen;
          if (schema.options.jsonTypes) {
            const JsonType = f.importJson(desc);
            f.print(f.export("const", name), ": ", GenMessage, "<", Shape, ", ", JsonType, ">", " = ", pure);
          } else {
            f.print(f.export("const", name), ": ", GenMessage, "<", Shape, ">", " = ", pure);
          }
          const call = functionCall(messageDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "enum": {
          generateEnumShape(f, desc);
          if (schema.options.jsonTypes) {
            generateEnumJsonShape(f, desc, "ts");
          }
          generateDescDoc(f, desc);
          const name = f.importSchema(desc).name;
          const Shape = f.importShape(desc);
          const { GenEnum, enumDesc } = f.runtime.codegen;
          if (schema.options.jsonTypes) {
            const JsonType = f.importJson(desc);
            f.print(f.export("const", name), ": ", GenEnum, "<", Shape, ", ", JsonType, ">", " = ", pure);
          } else {
            f.print(f.export("const", name), ": ", GenEnum, "<", Shape, ">", " = ", pure);
          }
          const call = functionCall(enumDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "extension": {
          const { GenExtension, extDesc } = f.runtime.codegen;
          const name = f.importSchema(desc).name;
          const E = f.importShape(desc.extendee);
          const V = fieldTypeScriptType(desc, f.runtime).typing;
          const call = functionCall(extDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.jsDoc(desc));
          f.print(f.export("const", name), ": ", GenExtension, "<", E, ", ", V, ">", " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "service": {
          const { GenService, serviceDesc } = f.runtime.codegen;
          const name = f.importSchema(desc).name;
          const call = functionCall(serviceDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.jsDoc(desc));
          f.print(f.export("const", name), ": ", GenService, "<", getServiceShapeExpr(f, desc), "> = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
      }
    }
  }
}

// prettier-ignore
function generateJs(schema: Schema<Options>) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_pb.js");
    f.preamble(file);
    const fileDesc = f.importSchema(file);
    generateDescDoc(f, file);
    f.print(f.export("const", fileDesc.name), " = ", pure);
    f.print("  ", getFileDescCall(f, file, schema), ";");
    f.print();
    for (const desc of schema.typesInFile(file)) {
      switch (desc.kind) {
        case "message": {
          const name = f.importSchema(desc).name;
          generateDescDoc(f, desc);
          const { messageDesc } = f.runtime.codegen;
          const call = functionCall(messageDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.export("const", name), " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "enum": {
          // generate descriptor
          {
            generateDescDoc(f, desc);
            const name = f.importSchema(desc).name;
            f.print(f.export("const", name), " = ", pure);
            const { enumDesc } = f.runtime.codegen;
            const call = functionCall(enumDesc, [fileDesc, ...pathInFileDesc(desc)]);
            f.print("  ", call, ";");
            f.print();
          }
          // declare TypeScript enum
          {
            f.print(f.jsDoc(desc));
            f.print(f.export("const", f.importShape(desc).name), " = ", pure);
            const { tsEnum } = f.runtime.codegen;
            const call = functionCall(tsEnum, [f.importSchema(desc)]);
            f.print("  ", call, ";");
            f.print();
          }
          break;
        }
        case "extension": {
          f.print(f.jsDoc(desc));
          const name = f.importSchema(desc).name;
          f.print(f.export("const", name), " = ", pure);
          const { extDesc } = f.runtime.codegen;
          const call = functionCall(extDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "service": {
          f.print(f.jsDoc(desc));
          const name = f.importSchema(desc).name;
          f.print(f.export("const", name), " = ", pure);
          const { serviceDesc } = f.runtime.codegen;
          const call = functionCall(serviceDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print("  ", call, ";");
          f.print();
          break;
        }
      }
    }
  }
}

// prettier-ignore
function generateDts(schema: Schema<Options>) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_pb.d.ts");
    f.preamble(file);
    const { GenFile } = f.runtime.codegen;
    const fileDesc = f.importSchema(file);
    generateDescDoc(f, file);
    f.print(f.export("declare const", fileDesc.name), ": ", GenFile, ";");
    f.print();
    for (const desc of schema.typesInFile(file)) {
      switch (desc.kind) {
        case "message": {
          generateMessageShape(f, desc, "dts");
          if (schema.options.jsonTypes) {
            generateMessageJsonShape(f, desc, "dts");
          }
          const name = f.importSchema(desc).name;
          const Shape = f.importShape(desc);
          const { GenMessage } = f.runtime.codegen;
          generateDescDoc(f, desc);
          if (schema.options.jsonTypes) {
            const JsonType = f.importJson(desc);
            f.print(f.export("declare const", name), ": ", GenMessage, "<", Shape, ", ", JsonType, ">", ";");
          } else {
            f.print(f.export("declare const", name), ": ", GenMessage, "<", Shape, ">", ";");
          }
          f.print();
          break;
        }
        case "enum": {
          generateEnumShape(f, desc);
          if (schema.options.jsonTypes) {
            generateEnumJsonShape(f, desc, "dts");
          }
          generateDescDoc(f, desc);
          const name = f.importSchema(desc).name;
          const Shape = f.importShape(desc);
          const { GenEnum } = f.runtime.codegen;
          if (schema.options.jsonTypes) {
            const JsonType = f.importJson(desc);
            f.print(f.export("declare const", name), ": ", GenEnum, "<", Shape, ", ", JsonType, ">;");
          } else {
            f.print(f.export("declare const", name), ": ", GenEnum, "<", Shape, ">;");
          }
          f.print();
          break;
        }
        case "extension": {
          const { GenExtension } = f.runtime.codegen;
          const name = f.importSchema(desc).name;
          const E = f.importShape(desc.extendee);
          const V = fieldTypeScriptType(desc, f.runtime).typing;
          f.print(f.jsDoc(desc));
          f.print(f.export("declare const", name), ": ", GenExtension, "<", E, ", ", V, ">;");
          f.print();
          break;
        }
        case "service": {
          const { GenService } = f.runtime.codegen;
          const name = f.importSchema(desc).name;
          f.print(f.jsDoc(desc));
          f.print(f.export("declare const", name), ": ", GenService, "<", getServiceShapeExpr(f, desc), ">;");
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
        `Use \`create(${f.importSchema(desc).name})\` to create a new message.`,
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
      f.array(deps),
    ]);
  }
  return functionCall(fileDesc, [f.string(info.base64())]);
}

// prettier-ignore
function getServiceShapeExpr(f: GeneratedFile, service: DescService): Printable {
  const p: Printable[] = ["{\n"];
  for (const method of service.methods) {
    p.push(f.jsDoc(method, "  "), "\n");
    p.push("  ", method.localName, ": {\n");
    p.push("    methodKind: ", f.string(method.methodKind), ";\n");
    p.push("    input: typeof ", f.importSchema(method.input, true), ";\n");
    p.push("    output: typeof ", f.importSchema(method.output, true), ";\n");
    p.push("  },\n");
  }
  p.push("}");
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
  f.print(f.jsDoc(enumeration));
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
          const { typing } = fieldTypeScriptType(field, f.runtime);
          f.print(`    value: `, typing, `;`);
          f.print(`    case: "`, field.localName, `";`);
        }
        f.print(`  } | { case: undefined; value?: undefined };`);
        break;
      default: {
        f.print(f.jsDoc(member, "  "));
        const { typing, optional } = fieldTypeScriptType(member, f.runtime);
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
  f.print(f.jsDoc(message));
  switch (message.typeName) {
    case "google.protobuf.Any":
      f.print(exp, " = {");
      f.print(`  "@type"?: string;`);
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
          f.print(f.jsDoc(field, "  "));
          let jsonName: Printable = field.jsonName;
          const startWithNumber = /^[0-9]/;
          const containsSpecialChar = /[^a-zA-Z0-9_$]/;
          if (jsonName === ""
            || startWithNumber.test(jsonName)
            || containsSpecialChar.test(jsonName)) {
            jsonName = f.string(jsonName);
          }
          f.print("  ", jsonName, "?: ", fieldJsonType(field), ";");
          if (message.fields.indexOf(field) < message.fields.length - 1) {
            f.print();
          }
        }
        f.print("};");
      }
  }
  f.print();
}
