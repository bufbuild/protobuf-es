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
  DescExtension,
  DescFile,
  DescMessage,
  DescService,
} from "@bufbuild/protobuf";
import { wktPublicImportPaths } from "@bufbuild/protobuf/codegenv1";
import { nestedTypes } from "@bufbuild/protobuf/reflect";
import { safeIdentifier } from "./safe-identifier.js";

export function generateFilePath(
  file: DescFile,
  bootstrapWkt: boolean,
  filesToGenerate: DescFile[],
): string {
  // Well-known types are published with the runtime package. We usually want
  // the generated code to import them from the runtime package, with the
  // following exceptions:
  // 1. We are bootstrapping the runtime package via the plugin option
  //    "bootstrap_wkt". In that case, we cannot refer to the runtime package
  //    itself.
  // 2. We were explicitly asked to generate the well-known type.
  const wktFrom = wktPublicImportPaths[file.proto.name] as string | undefined;
  if (
    wktFrom !== undefined &&
    !bootstrapWkt &&
    !filesToGenerate.find((f) => f.name === file.name)
  ) {
    return wktFrom;
  }
  return "./" + file.name + "_pbv2.js";
}

export function localDescName(
  desc: DescFile | DescEnum | DescMessage | DescExtension | DescService,
): string {
  const file = desc.kind == "file" ? desc : desc.file;
  const { descNames } = allNames(file);
  const name = descNames.get(desc);
  if (name === undefined) {
    throw new Error(
      `unable to determine unique identifier for ${desc.toString()}`,
    );
  }
  return name;
}

export function localShapeName(desc: DescEnum | DescMessage): string {
  const { shapeNames } = allNames(desc.file);
  const name = shapeNames.get(desc);
  if (name === undefined) {
    throw new Error(
      `unable to determine unique identifier for ${desc.toString()}`,
    );
  }
  return name;
}

function idealDescName(
  desc: DescFile | DescEnum | DescMessage | DescExtension | DescService,
  i: number,
): string {
  const escape = i === 0 ? "" : i === 1 ? "$" : `$${i - 1}`;
  switch (desc.kind) {
    case "file":
      return (
        safeIdentifier(
          "fileDesc_" + desc.name.replace(/[^a-zA-Z0-9_]+/g, "_"),
        ) + escape
      );
    case "enum":
      return baseName(desc) + "Desc" + escape;
    case "message":
      return baseName(desc) + "Desc" + escape;
    case "extension":
      return baseName(desc) + escape;
    case "service":
      return baseName(desc) + escape;
  }
}

function idealShapeName(desc: DescEnum | DescMessage, i: number): string {
  const escape = i === 0 ? "" : i === 1 ? "$" : `$${i - 1}`;
  return baseName(desc) + escape;
}

function baseName(
  desc: DescEnum | DescMessage | DescExtension | DescService,
): string {
  const pkg = desc.file.proto.package;
  const offset = pkg.length > 0 ? pkg.length + 1 : 0;
  const name = desc.typeName.substring(offset).replace(/\./g, "_");
  return safeIdentifier(name);
}

function allNames(file: DescFile) {
  const taken = new Set<string>();
  const shapeNames = new Map<DescEnum | DescMessage, string>();
  const descNames = new Map<
    DescFile | DescEnum | DescMessage | DescExtension | DescService,
    string
  >();
  for (const desc of [file, ...nestedTypes(file)]) {
    switch (desc.kind) {
      case "enum":
      case "message": {
        let descName: string;
        let shapeName: string;
        for (let i = 0; ; i++) {
          descName = idealDescName(desc, i);
          shapeName = idealShapeName(desc, i);
          if (!taken.has(descName) && !taken.has(shapeName)) {
            break;
          }
        }
        taken.add(descName);
        taken.add(shapeName);
        descNames.set(desc, descName);
        shapeNames.set(desc, shapeName);
        break;
      }
      default: {
        let descName: string;
        for (let i = 0; ; i++) {
          descName = idealDescName(desc, i);
          if (!taken.has(descName)) {
            break;
          }
        }
        taken.add(descName);
        descNames.set(desc, descName);
        break;
      }
    }
  }
  return { shapeNames, descNames };
}
