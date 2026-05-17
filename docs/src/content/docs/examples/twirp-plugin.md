---
title: Twirp plugin
---

A custom `protoc-gen-twirp-es` plugin reads service descriptors and generates TypeScript clients that call [Twirp](https://twitchtv.github.io/twirp/) endpoints over `fetch`.

The full source is in [`packages/protoplugin-example`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoplugin-example).

## Schema

The example starts with a service definition:

```protobuf
syntax = "proto3";
package connectrpc.eliza.v1;

message SayRequest {
  string sentence = 1;
}

message SayResponse {
  string sentence = 1;
}

service ElizaService {
  rpc Say(SayRequest) returns (SayResponse);
}
```

## Generate one client per service

The plugin loops through files, then services, and prints a client class for each service.

```typescript
import { createEcmaScriptPlugin, runNodeJs, safeIdentifier, type Schema } from "@bufbuild/protoplugin";

const plugin = createEcmaScriptPlugin({
  name: "protoc-gen-twirp-es",
  version: "v1",
  generateTs(schema: Schema) {
    for (const file of schema.files) {
      const f = schema.generateFile(file.name + "_twirp.ts");
      f.preamble(file);
      for (const service of file.services) {
        f.print(f.export("class", safeIdentifier(service.name + "Client")), " {");
        f.print("  constructor(private readonly baseUrl: string) {}");
        f.print("}");
      }
    }
  },
});

runNodeJs(plugin);
```

## Print methods from descriptors

Each unary method becomes an async method. The generated code imports the request type, response type, and schemas through `GeneratedFile` helpers.

```typescript
for (const method of service.methods) {
  if (method.methodKind !== "unary") {
    continue;
  }
  const inputType = f.importShape(method.input);
  const inputSchema = f.importSchema(method.input);
  const outputType = f.importShape(method.output);
  const outputSchema = f.importSchema(method.output);
  f.print("  async ", method.localName, "(request: ", inputType, "): Promise<", outputType, "> {");
  f.print('    const body = ', f.runtime.toJsonString, '(', inputSchema, ', request);');
  f.print("    const response = await fetch(this.baseUrl, { method: 'POST', body });");
  f.print("    return ", f.runtime.fromJson, "(", outputSchema, ", await response.json());");
  f.print("  }");
}
```

## Run the example package

```shellsession
cd packages/protoplugin-example
npm install
npx buf generate
npm test
```

See [Writing plugins](/writing-plugins/) for the minimal plugin flow and [Generating files](/writing-plugins/generating-files/) for imports, exports, and printing.
