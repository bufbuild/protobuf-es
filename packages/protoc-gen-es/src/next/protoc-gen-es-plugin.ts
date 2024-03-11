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
import { MethodKind } from "@bufbuild/protobuf";
import { localName } from "@bufbuild/protobuf/next/reflect";
import {
  embedFileDesc,
  pathInFileDesc,
} from "@bufbuild/protobuf/next/codegenv1";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin/next";
import type {
  Schema,
  GeneratedFile,
  Printable,
  Target,
} from "@bufbuild/protoplugin/next/ecmascript";
import {
  arrayLiteral,
  fieldUsesPrototype,
  functionCall,
  getFieldTypeInfo,
} from "./util.js";
import { version } from "../../package.json";

export const protocGenEs = createEcmaScriptPlugin({
  name: "protoc-gen-es-next",
  version: `v${String(version)}`,
  generateTs,
  generateJs,
  generateDts,
});

// prettier-ignore
function generateTs(schema: Schema) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_pbv2.ts");
    f.preamble(file);
    const { DescFile } = f.runtime;
    const fileDesc = f.importDesc(file);
    // f.print("// ", file.proto.toJsonString());
    f.print(f.exportDecl("const", fileDesc.name), ": ", DescFile, " = ", getFileDescCall(f, file), ";");
    f.print();
    for (const desc of schema.typesInFile(file)) {
      switch (desc.kind) {
        case "message": {
          generateMessageShape(f, desc, "ts");
          const {TypedDescMessage, messageDesc} = f.runtime.codegen;
          const MessageShape = f.importShape(desc);
          const fileDesc = f.importDesc(file);
          const name = f.importDesc(desc).name;
          f.print("// Describes the ", desc.toString(), ".");
          f.print("// Use `create(", name, ")` to create a new ", MessageShape.name, ".");
          const call = functionCall(messageDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.exportDecl("const", name), ": ", TypedDescMessage, "<", MessageShape, ">", " = ", call, ";");
          f.print();
          break;
        }
        case "enum": {
          generateEnumShape(f, desc);
          const {TypedDescEnum, enumDesc} = f.runtime.codegen;
          const EnumShape = f.importShape(desc);
          const fileDesc = f.importDesc(file);
          f.print("// Describes the ", desc.toString(), ".");
          const name = f.importDesc(desc).name;
          const call = functionCall(enumDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.exportDecl("const", name), ": ", TypedDescEnum, "<", EnumShape, ">", " = ", call, ";");
          f.print();
          break;
        }
        case "extension": {
          const { TypedDescExtension, extDesc } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          const E = f.importShape(desc.extendee);
          const V = getFieldTypeInfo(desc).typing;
          const call = functionCall(extDesc, [f.importDesc(file), ...pathInFileDesc(desc)]);
          f.print(f.jsDoc(desc));
          f.print(f.exportDecl("const", name), ": ", TypedDescExtension, "<", E, ", ", V, ">", " = ", call, ";");
          f.print();
          break;
        }
        case "service": {
          const { TypedDescService, serviceDesc} = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          const call = functionCall(serviceDesc, [f.importDesc(file), ...pathInFileDesc(desc)]);
          f.print(f.jsDoc(desc));
          f.print(f.exportDecl("const", name), ": ", TypedDescService, "<", getServiceShapeExpr(f, desc), "> = ", call, ";");
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
    const f = schema.generateFile(file.name + "_pbv2.js");
    f.preamble(file);
    const fileDesc = f.importDesc(file);
    f.print(f.exportDecl("const", fileDesc.name), " = ", getFileDescCall(f, file), ";");
    f.print();
    for (const desc of schema.typesInFile(file)) {
      switch (desc.kind) {
        case "message": {
          const { messageDesc} = f.runtime.codegen;
          const MessageShape = f.importShape(desc);
          const name = f.importDesc(desc).name;
          f.print("// Describes the ", desc.toString(), ". Use `create(", name, ")` to create a new ", MessageShape.name, ".");
          const call = functionCall(messageDesc, [fileDesc, ...pathInFileDesc(desc)]);
          f.print(f.exportDecl("const", name), " = ", call, ";");
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
            f.print(f.exportDecl("const", name), " = ", call, ";");
            f.print();
          }
          // declare TypeScript enum
          {
            f.print(f.jsDoc(desc));
            const { tsEnum } = f.runtime.codegen;
            const call = functionCall(tsEnum, [f.importDesc(desc)]);
            f.print(f.exportDecl("const", f.importShape(desc).name), " = ", call, ";");
            f.print();
          }
          break;
        }
        case "extension": {
          const { extDesc } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          const call = functionCall(extDesc, [f.importDesc(desc.file), ...pathInFileDesc(desc)]);
          f.print(f.jsDoc(desc));
          f.print(f.exportDecl("const", name), " = ", call, ";");
          f.print();
          break;
        }
        case "service": {
          const { serviceDesc} = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          f.print(f.jsDoc(desc));
          const call = functionCall(serviceDesc, [f.importDesc(desc.file), ...pathInFileDesc(desc)]);
          f.print(f.exportDecl("const", name), " = ", call, ";");
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
    const f = schema.generateFile(file.name + "_pbv2.d.ts");
    f.preamble(file);
    const { DescFile } = f.runtime;
    const fileDesc = f.importDesc(file);
    f.print(f.exportDecl("declare const", fileDesc.name), ": ", DescFile, ";");
    f.print();
    for (const desc of schema.typesInFile(file)) {
      switch (desc.kind) {
        case "message": {
          generateMessageShape(f, desc, "dts");
          const { TypedDescMessage } = f.runtime.codegen;
          const MessageShape = f.importShape(desc);
          const name = f.importDesc(desc).name;
          f.print("// Describes the ", desc.toString(), ". Use `create(", name, ")` to create a new ", MessageShape.name, ".");
          f.print(f.exportDecl("declare const", name), ": ", TypedDescMessage, "<", MessageShape, ">", ";");
          f.print();
          break;
        }
        case "enum": {
          generateEnumShape(f, desc);
          const { TypedDescEnum } = f.runtime.codegen;
          const EnumShape = f.importShape(desc);
          f.print("// Describes the ", desc.toString(), ".");
          const name = f.importDesc(desc).name;
          f.print(f.exportDecl("declare const", name), ": ", TypedDescEnum, "<", EnumShape, ">;");
          f.print();
          break;
        }
        case "extension": {
          const { TypedDescExtension } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          const E = f.importShape(desc.extendee);
          const V = getFieldTypeInfo(desc).typing;
          f.print(f.jsDoc(desc));
          f.print(f.exportDecl("declare const", name), ": ", TypedDescExtension, "<", E, ", ", V, ">;");
          f.print();
          break;
        }
        case "service": {
          const { TypedDescService } = f.runtime.codegen;
          const name = f.importDesc(desc).name;
          f.print(f.jsDoc(desc));
          f.print(f.exportDecl("declare const", name), ": ", TypedDescService, "<", getServiceShapeExpr(f, desc), ">;");
          f.print();
          break;
        }
      }
    }
  }
}

function getFileDescCall(f: GeneratedFile, file: DescFile) {
  const { fileDesc } = f.runtime.codegen;
  const info = embedFileDesc(file);
  if (file.dependencies.length > 0) {
    const deps: Printable = file.dependencies.map((f) => ({
      kind: "es_desc_ref",
      desc: f,
    }));
    return functionCall(fileDesc, [info.protoB64(), arrayLiteral(deps)]);
  }
  return functionCall(fileDesc, [info.protoB64()]);
}

// prettier-ignore
function getServiceShapeExpr(f: GeneratedFile, service: DescService): Printable {
  const MethodKindType = f.runtime.legacy.MethodKind.toTypeOnly();
  const p: Printable[] = [];
  function print(...printables: Printable[]) {
    p.push(...printables, "\n");
  }
  print("{");
  for (const method of service.methods) {
    print(f.jsDoc(method, "  "));
    print("  ", localName(method), ": {");
    print("    kind: ", MethodKindType, ".", MethodKind[method.methodKind], ";");
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
          const { typing } = getFieldTypeInfo(field);
          f.print(`    value: `, typing, `;`);
          f.print(`    case: "`, localName(field), `";`);
        }
        f.print(`  } | { case: undefined; value?: undefined };`);
        break;
      default: {
        f.print(f.jsDoc(member, "  "));
        const {typing, optional} = getFieldTypeInfo(member);
        if (fieldUsesPrototype(member) || !optional) {
          f.print("  ", localName(member), ": ", typing, ";");
        } else {
          f.print("  ", localName(member), "?: ", typing, ";");
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
