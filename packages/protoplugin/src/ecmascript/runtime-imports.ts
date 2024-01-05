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

import type { ImportSymbol } from "./import-symbol.js";
import { createImportSymbol } from "./import-symbol.js";
import { codegenInfo } from "@bufbuild/protobuf";

export interface RuntimeImports {
  proto2: ImportSymbol;
  proto3: ImportSymbol;
  Message: ImportSymbol;
  PartialMessage: ImportSymbol;
  PlainMessage: ImportSymbol;
  FieldList: ImportSymbol;
  MessageType: ImportSymbol;
  BinaryReadOptions: ImportSymbol;
  BinaryWriteOptions: ImportSymbol;
  JsonReadOptions: ImportSymbol;
  JsonWriteOptions: ImportSymbol;
  JsonValue: ImportSymbol;
  JsonObject: ImportSymbol;
  protoDouble: ImportSymbol;
  protoInt64: ImportSymbol;
  ScalarType: ImportSymbol;
  LongType: ImportSymbol;
  MethodKind: ImportSymbol;
  MethodIdempotency: ImportSymbol;
  IMessageTypeRegistry: ImportSymbol;
}

export function createRuntimeImports(bootstrapWkt: boolean): RuntimeImports {
  // prettier-ignore
  return {
    proto2:                infoToSymbol("proto2",               bootstrapWkt),
    proto3:                infoToSymbol("proto3",               bootstrapWkt),
    Message:               infoToSymbol("Message",              bootstrapWkt),
    PartialMessage:        infoToSymbol("PartialMessage",       bootstrapWkt),
    PlainMessage:          infoToSymbol("PlainMessage",         bootstrapWkt),
    FieldList:             infoToSymbol("FieldList",            bootstrapWkt),
    MessageType:           infoToSymbol("MessageType",          bootstrapWkt),
    BinaryReadOptions:     infoToSymbol("BinaryReadOptions",    bootstrapWkt),
    BinaryWriteOptions:    infoToSymbol("BinaryWriteOptions",   bootstrapWkt),
    JsonReadOptions:       infoToSymbol("JsonReadOptions",      bootstrapWkt),
    JsonWriteOptions:      infoToSymbol("JsonWriteOptions",     bootstrapWkt),
    JsonValue:             infoToSymbol("JsonValue",            bootstrapWkt),
    JsonObject:            infoToSymbol("JsonObject",           bootstrapWkt),
    protoDouble:           infoToSymbol("protoDouble",          bootstrapWkt),
    protoInt64:            infoToSymbol("protoInt64",           bootstrapWkt),
    ScalarType:            infoToSymbol("ScalarType",           bootstrapWkt),
    LongType:              infoToSymbol("LongType",             bootstrapWkt),
    MethodKind:            infoToSymbol("MethodKind",           bootstrapWkt),
    MethodIdempotency:     infoToSymbol("MethodIdempotency",    bootstrapWkt),
    IMessageTypeRegistry:  infoToSymbol("IMessageTypeRegistry", bootstrapWkt),
  };
}

function infoToSymbol(
  name: keyof typeof codegenInfo.symbols,
  bootstrapWkt: boolean,
): ImportSymbol {
  const info = codegenInfo.symbols[name];
  const symbol = createImportSymbol(
    name,
    bootstrapWkt ? info.privateImportPath : info.publicImportPath,
  );
  return info.typeOnly ? symbol.toTypeOnly() : symbol;
}
