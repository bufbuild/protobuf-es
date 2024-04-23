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
import { localName } from "@bufbuild/protobuf/reflect";
import { embedFileDesc, pathInFileDesc } from "@bufbuild/protobuf/codegenv1";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import type {
  Schema,
  GeneratedFile,
  Printable,
  Target,
} from "@bufbuild/protoplugin/ecmascript";
import { arrayLiteral, functionCall, fieldTypeScriptType } from "./util";
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
    f.print(f.exportDecl("const", fileDesc.name), ": ", GenDescFile, " = ", pure);
    f.print("  ", getFileDescCall(f, file), ";");
    f.print();
    for (const desc of schema.typesInFile(file)) {
      switch (desc.kind) {
        case "message": {
          generateMessageShape(f, desc, "ts");
          const {GenDescMessage, messageDesc} = f.runtime.codegen;
          const MessageShape = f.importShape(desc);
          const fileDesc = f.importDesc(file);
          const name = f.importDesc(desc).name;
          f.print("// Describes the ", desc.toString(), ".");
          f.print("// Use `create(", name, ")` to create a new ", MessageShape.name, ".");
          const call = functionCall(messageDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.exportDecl("const", name), ": ", GenDescMessage, "<", MessageShape, ">", " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "enum": {
          generateEnumShape(f, desc);
          const {GenDescEnum, enumDesc} = f.runtime.codegen;
          const EnumShape = f.importShape(desc);
          const fileDesc = f.importDesc(file);
          f.print("// Describes the ", desc.toString(), ".");
          const name = f.importDesc(desc).name;
          const call = functionCall(enumDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.exportDecl("const", name), ": ", GenDescEnum, "<", EnumShape, ">", " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "extension": {
          const { GenDescExtension, extDesc } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          const E = f.importShape(desc.extendee);
          const V = fieldTypeScriptType(desc).typing;
          const call = functionCall(extDesc, [f.importDesc(file), ...pathInFileDesc(desc)]);
          f.print(f.jsDoc(desc));
          f.print(f.exportDecl("const", name), ": ", GenDescExtension, "<", E, ", ", V, ">", " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "service": {
          const { GenDescService, serviceDesc} = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          const call = functionCall(serviceDesc, [f.importDesc(file), ...pathInFileDesc(desc)]);
          f.print(f.jsDoc(desc));
          f.print(f.exportDecl("const", name), ": ", GenDescService, "<", getServiceShapeExpr(f, desc), "> = ", pure);
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
    f.print(f.exportDecl("const", fileDesc.name), " = ", pure);
    f.print("  ", getFileDescCall(f, file), ";");
    f.print();
    for (const desc of schema.typesInFile(file)) {
      switch (desc.kind) {
        case "message": {
          const { messageDesc} = f.runtime.codegen;
          const MessageShape = f.importShape(desc);
          const name = f.importDesc(desc).name;
          f.print("// Describes the ", desc.toString(), ". Use `create(", name, ")` to create a new ", MessageShape.name, ".");
          const call = functionCall(messageDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.exportDecl("const", name), " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "enum": {
          // generate descriptor
          {
            const { enumDesc } = f.runtime.codegen;
            f.print("// Describes the ", desc.toString(), ".");
            const name = f.importDesc(desc).name;
            const call = functionCall(enumDesc, [fileDesc, ...pathInFileDesc(desc)]);
            f.print(f.exportDecl("const", name), " = ", pure);
            f.print("  ", call, ";");
            f.print();
          }
          // declare TypeScript enum
          {
            f.print(f.jsDoc(desc));
            const { tsEnum } = f.runtime.codegen;
            const call = functionCall(tsEnum, [f.importDesc(desc)]);
            f.print(f.exportDecl("const", f.importShape(desc).name), " = ", pure);
            f.print("  ", call, ";");
            f.print();
          }
          break;
        }
        case "extension": {
          const { extDesc } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          const call = functionCall(extDesc, [f.importDesc(desc.file), ...pathInFileDesc(desc)]);
          f.print(f.jsDoc(desc));
          f.print(f.exportDecl("const", name), " = ", pure);
          f.print("  ", call, ";");
          f.print();
          break;
        }
        case "service": {
          const { serviceDesc} = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          f.print(f.jsDoc(desc));
          const call = functionCall(serviceDesc, [f.importDesc(desc.file), ...pathInFileDesc(desc)]);
          f.print(f.exportDecl("const", name), " = ", pure);
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
    f.print(f.exportDecl("declare const", fileDesc.name), ": ", GenDescFile, ";");
    f.print();
    for (const desc of schema.typesInFile(file)) {
      switch (desc.kind) {
        case "message": {
          generateMessageShape(f, desc, "dts");
          const { GenDescMessage } = f.runtime.codegen;
          const MessageShape = f.importShape(desc);
          const name = f.importDesc(desc).name;
          f.print("// Describes the ", desc.toString(), ". Use `create(", name, ")` to create a new ", MessageShape.name, ".");
          f.print(f.exportDecl("declare const", name), ": ", GenDescMessage, "<", MessageShape, ">", ";");
          f.print();
          break;
        }
        case "enum": {
          generateEnumShape(f, desc);
          const { GenDescEnum } = f.runtime.codegen;
          const EnumShape = f.importShape(desc);
          f.print("// Describes the ", desc.toString(), ".");
          const name = f.importDesc(desc).name;
          f.print(f.exportDecl("declare const", name), ": ", GenDescEnum, "<", EnumShape, ">;");
          f.print();
          break;
        }
        case "extension": {
          const { GenDescExtension } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          const E = f.importShape(desc.extendee);
          const V = fieldTypeScriptType(desc).typing;
          f.print(f.jsDoc(desc));
          f.print(f.exportDecl("declare const", name), ": ", GenDescExtension, "<", E, ", ", V, ">;");
          f.print();
          break;
        }
        case "service": {
          const { GenDescService } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          f.print(f.jsDoc(desc));
          f.print(f.exportDecl("declare const", name), ": ", GenDescService, "<", getServiceShapeExpr(f, desc), ">;");
          f.print();
          break;
        }
      }
    }
  }
}

// prettier-ignore
function getFileDescCall(f: GeneratedFile, file: DescFile) {
  const info = embedFileDesc(file);
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
    print("  ", localName(method), ": {");
    print("    kind: ", f.string(method.methodKind), ";");
    print("    I: ", f.importShape(method.input), ";");
    print("    O: ", f.importShape(method.output), ";");
    print("  },");
  }
  print("}");
  return p;
}

// prettier-ignore
function generateEnumShape(f: GeneratedFile, enumeration: DescEnum) {
  f.print(f.jsDoc(enumeration));
  f.print(f.exportDecl("enum", f.importShape(enumeration).name), " {");
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
function generateMessageShape(f: GeneratedFile, message: DescMessage, target: Extract<Target, "ts" | "dts">) {
  const { Message } = f.runtime;
  const declaration = target == "ts" ? "type" : "declare type";
  f.print(f.jsDoc(message));
  f.print(f.exportDecl(declaration, f.importShape(message).name), " = ", Message, "<", f.string(message.typeName), "> & {");
  for (const member of message.members) {
    switch (member.kind) {
      case "oneof":
        f.print(f.jsDoc(member, "  "));
        f.print("  ", localName(member), ": {");
        for (const field of member.fields) {
          if (member.fields.indexOf(field) > 0) {
            f.print(`  } | {`);
          }
          f.print(f.jsDoc(field, "    "));
          const { typing } = fieldTypeScriptType(field);
          f.print(`    value: `, typing, `;`);
          f.print(`    case: "`, localName(field), `";`);
        }
        f.print(`  } | { case: undefined; value?: undefined };`);
        break;
      default: {
        f.print(f.jsDoc(member, "  "));
        const {typing, optional} = fieldTypeScriptType(member);
        if (optional) {
          f.print("  ", localName(member), "?: ", typing, ";");
        } else {
          f.print("  ", localName(member), ": ", typing, ";");
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
