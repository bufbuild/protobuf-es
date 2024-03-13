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

export const packageName = "@bufbuild/protobuf/next";

export const wktPublicImportPaths: Readonly<Record<string, string>> = {
  "google/protobuf/compiler/plugin.proto": packageName,
  "google/protobuf/any.proto": packageName,
  "google/protobuf/api.proto": packageName,
  "google/protobuf/descriptor.proto": packageName,
  "google/protobuf/duration.proto": packageName,
  "google/protobuf/empty.proto": packageName,
  "google/protobuf/field_mask.proto": packageName,
  "google/protobuf/source_context.proto": packageName,
  "google/protobuf/struct.proto": packageName,
  "google/protobuf/timestamp.proto": packageName,
  "google/protobuf/type.proto": packageName,
  "google/protobuf/wrappers.proto": packageName,
};

// prettier-ignore
export const symbols = {
  create:                  {typeOnly: false, fromPrivate: "./create.js",               fromPublic: packageName },
  isMessage:               {typeOnly: false, fromPrivate: "./is-message.js",           fromPublic: packageName },
  Message:                 {typeOnly: true,  fromPrivate: "./types.js",                fromPublic: packageName },
  DescFile:                {typeOnly: true,  fromPrivate: "../descriptor-set.js",      fromPublic: "@bufbuild/protobuf" },
  legacy: {
    // TODO
    protoInt64:            {typeOnly: false, fromPrivate: "./proto-int64.js",          fromPublic: "@bufbuild/protobuf" },
    MethodKind:            {typeOnly: false, fromPrivate: "./service-type.js",         fromPublic: "@bufbuild/protobuf" },
  },
  codegen: {
    enumDesc:              {typeOnly: false, fromPrivate: "./codegenv1/hydrate.js",    fromPublic: packageName + "/codegenv1" },
    extDesc:               {typeOnly: false, fromPrivate: "./codegenv1/hydrate.js",    fromPublic: packageName + "/codegenv1" },
    fileDesc:              {typeOnly: false, fromPrivate: "./codegenv1/hydrate.js",    fromPublic: packageName + "/codegenv1" },
    globalNumber:          {typeOnly: false, fromPrivate: "./codegenv1/globals.js",    fromPublic: packageName + "/codegenv1" },
    messageDesc:           {typeOnly: false, fromPrivate: "./codegenv1/hydrate.js",    fromPublic: packageName + "/codegenv1" },
    serviceDesc:           {typeOnly: false, fromPrivate: "./codegenv1/hydrate.js",    fromPublic: packageName + "/codegenv1" },
    tsEnum:                {typeOnly: false, fromPrivate: "./codegenv1/enum.js",       fromPublic: packageName + "/codegenv1" },
    TypedDescEnum:         {typeOnly: true,  fromPrivate: "./codegenv1/typed-desc.js", fromPublic: packageName + "/codegenv1" },
    TypedDescExtension:    {typeOnly: true,  fromPrivate: "./codegenv1/typed-desc.js", fromPublic: packageName + "/codegenv1" },
    TypedDescMessage:      {typeOnly: true,  fromPrivate: "./codegenv1/typed-desc.js", fromPublic: packageName + "/codegenv1" },
    TypedDescService:      {typeOnly: true,  fromPrivate: "./codegenv1/typed-desc.js", fromPublic: packageName + "/codegenv1" },
  },
} as const satisfies Record<string, symbolInfo | Record<string, symbolInfo>>;

type symbolInfo = {
  readonly typeOnly: boolean;
  readonly fromPrivate: string;
  readonly fromPublic: string;
};
