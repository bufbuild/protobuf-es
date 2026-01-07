// Copyright 2021-2026 Buf Technologies, Inc.
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
  DescExtension,
  DescFile,
  DescMessage,
  DescService,
  ScalarType,
} from "@bufbuild/protobuf";
import type { ImportSymbol } from "./import-symbol.js";

/**
 * All types that can be passed to GeneratedFile.print()
 */
export type Printable =
  | string
  | number
  | boolean
  | bigint
  | Uint8Array
  | ImportSymbol
  | ExportStatement
  | JSDocBlock
  | LiteralString
  | LiteralProtoInt64
  | DescImport
  | ShapeImport
  | JsonTypeImport
  | ValidTypeImport
  | Printable[];

export type ExportStatement = {
  kind: "es_export_stmt";
  name: string;
  declaration?: string;
};

export type LiteralProtoInt64 = {
  readonly kind: "es_proto_int64";
  type:
    | ScalarType.INT64
    | ScalarType.SINT64
    | ScalarType.SFIXED64
    | ScalarType.UINT64
    | ScalarType.FIXED64;
  longAsString: boolean;
  value: bigint | string;
};

export type LiteralString = {
  readonly kind: "es_string";
  value: string;
};

export type DescImport = {
  readonly kind: "es_desc_ref";
  desc: DescMessage | DescEnum | DescExtension | DescService | DescFile;
  typeOnly?: boolean;
};

export type ShapeImport = {
  readonly kind: "es_shape_ref";
  desc: DescMessage | DescEnum;
};

export type JsonTypeImport = {
  readonly kind: "es_json_type_ref";
  desc: DescMessage | DescEnum;
};

export type ValidTypeImport = {
  readonly kind: "es_valid_type_ref";
  desc: DescMessage;
};

export type JSDocBlock = {
  readonly kind: "es_jsdoc";
  text: string;
  indentation?: string;
};
