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

import { LongType, ScalarType } from "@bufbuild/protobuf";
import type { DescEnum, DescExtension, DescMessage } from "@bufbuild/protobuf";

export type LiteralProtoInt64 = {
  readonly kind: "es_proto_int64";
  type:
    | ScalarType.INT64
    | ScalarType.SINT64
    | ScalarType.SFIXED64
    | ScalarType.UINT64
    | ScalarType.FIXED64;
  longType: LongType;
  value: bigint | string;
};

export type LiteralString = {
  readonly kind: "es_string";
  value: string;
};

export type RefDescMessage = {
  readonly kind: "es_ref_message";
  type: DescMessage;
  typeOnly: boolean;
};

export type RefDescEnum = {
  readonly kind: "es_ref_enum";
  type: DescEnum;
  typeOnly: boolean;
};

export type ExportDeclaration = {
  readonly kind: "es_export_decl";
  declaration: string;
  name: string | DescMessage | DescEnum | DescExtension;
};
