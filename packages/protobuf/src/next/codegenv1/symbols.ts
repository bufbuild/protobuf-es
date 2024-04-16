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
  "google/protobuf/compiler/plugin.proto": packageName + "/wkt",
  "google/protobuf/any.proto": packageName + "/wkt",
  "google/protobuf/api.proto": packageName + "/wkt",
  "google/protobuf/descriptor.proto": packageName + "/wkt",
  "google/protobuf/duration.proto": packageName + "/wkt",
  "google/protobuf/empty.proto": packageName + "/wkt",
  "google/protobuf/field_mask.proto": packageName + "/wkt",
  "google/protobuf/source_context.proto": packageName + "/wkt",
  "google/protobuf/struct.proto": packageName + "/wkt",
  "google/protobuf/timestamp.proto": packageName + "/wkt",
  "google/protobuf/type.proto": packageName + "/wkt",
  "google/protobuf/wrappers.proto": packageName + "/wkt",
};

// prettier-ignore
export const symbols = {
  isMessage:               {typeOnly: false, bootstrapWktFrom: "../../is-message.js",           from: packageName },
  Message:                 {typeOnly: true,  bootstrapWktFrom: "../../types.js",                from: packageName },
  create:                  {typeOnly: false, bootstrapWktFrom: "../../create.js",               from: packageName },
  fromJson:                {typeOnly: false, bootstrapWktFrom: "../../from-json.js",            from: packageName },
  fromJsonString:          {typeOnly: false, bootstrapWktFrom: "../../from-json.js",            from: packageName },
  fromBinary:              {typeOnly: false, bootstrapWktFrom: "../../from-binary.js",          from: packageName },
  toBinary:                {typeOnly: false, bootstrapWktFrom: "../../to-binary.js",            from: packageName },
  toJson:                  {typeOnly: false, bootstrapWktFrom: "../../to-json.js",              from: packageName },
  toJsonString:            {typeOnly: false, bootstrapWktFrom: "../../to-json.js",              from: packageName },
  protoInt64:              {typeOnly: false, bootstrapWktFrom: "../../proto-int64.js",          from: packageName },
  legacy: {
    // TODO
    MethodKind:            {typeOnly: false, bootstrapWktFrom: "../../service-type.js",         from: "@bufbuild/protobuf" },
    JsonValue:             {typeOnly: true,  bootstrapWktFrom: "../../json-format.js",          from: "@bufbuild/protobuf" },
  },
  reflect: {
    DescFile:              {typeOnly: true,  bootstrapWktFrom: "../../../descriptor-set.js",    from: "@bufbuild/protobuf" },
  },
  codegen: {
    boot:                  {typeOnly: false, bootstrapWktFrom: "../../codegenv1/boot.js",       from: packageName + "/codegenv1" },
    fileDesc:              {typeOnly: false, bootstrapWktFrom: "../../codegenv1/file.js",       from: packageName + "/codegenv1" },
    enumDesc:              {typeOnly: false, bootstrapWktFrom: "../../codegenv1/enum.js",       from: packageName + "/codegenv1" },
    extDesc:               {typeOnly: false, bootstrapWktFrom: "../../codegenv1/extension.js",  from: packageName + "/codegenv1" },
    messageDesc:           {typeOnly: false, bootstrapWktFrom: "../../codegenv1/message.js",    from: packageName + "/codegenv1" },
    serviceDesc:           {typeOnly: false, bootstrapWktFrom: "../../codegenv1/service.js",    from: packageName + "/codegenv1" },
    tsEnum:                {typeOnly: false, bootstrapWktFrom: "../../codegenv1/enum.js",       from: packageName + "/codegenv1" },
    GenDescEnum:           {typeOnly: true,  bootstrapWktFrom: "../../codegenv1/types.js",      from: packageName + "/codegenv1" },
    GenDescExtension:      {typeOnly: true,  bootstrapWktFrom: "../../codegenv1/types.js",      from: packageName + "/codegenv1" },
    GenDescMessage:        {typeOnly: true,  bootstrapWktFrom: "../../codegenv1/types.js",      from: packageName + "/codegenv1" },
    GenDescService:        {typeOnly: true,  bootstrapWktFrom: "../../codegenv1/types.js",      from: packageName + "/codegenv1" },
  },
} as const satisfies Record<string, symbolInfo | Record<string, symbolInfo>>;

type symbolInfo = {
  readonly typeOnly: boolean;
  readonly from: string;
  readonly bootstrapWktFrom: string;
};
