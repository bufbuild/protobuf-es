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

/**
 * Return a file path for the give file descriptor.
 */
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
  return "./" + file.name + "_pb.js";
}

/**
 * Return a safe identifier for a generated descriptor.
 */
export function generatedDescName(
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

/**
 * Return a safe identifier for a generated shape.
 */
export function generatedShapeName(desc: DescEnum | DescMessage): string {
  const { shapeNames } = allNames(desc.file);
  const name = shapeNames.get(desc);
  if (name === undefined) {
    throw new Error(
      `unable to determine unique identifier for ${desc.toString()}`,
    );
  }
  return name;
}

/**
 * Compute the ideal name for a generated descriptor.
 */
function idealDescName(
  desc: DescFile | DescEnum | DescMessage | DescExtension | DescService,
  i: number,
): string {
  const escape = i === 0 ? "" : i === 1 ? "$" : `$${i - 1}`;
  if (desc.kind == "file") {
    const name = "fileDesc_" + desc.name.replace(/[^a-zA-Z0-9_]+/g, "_");
    return safeIdentifier(name + escape);
  }
  switch (desc.kind) {
    case "enum":
      return safeIdentifier(identifier(desc) + "Desc" + escape);
    case "message":
      return safeIdentifier(identifier(desc) + "Desc" + escape);
    case "extension":
      return safeIdentifier(identifier(desc) + escape);
    case "service":
      return safeIdentifier(identifier(desc) + escape);
  }
}

/**
 * Compute the ideal name for a generated shape.
 */
function idealShapeName(desc: DescEnum | DescMessage, i: number): string {
  const escape = i === 0 ? "" : i === 1 ? "$" : `$${i - 1}`;
  return safeIdentifier(identifier(desc) + escape);
}

/**
 * Return an identifier for the given descriptor based on its type name.
 *
 * The type name for a protobuf message is the package name (if any), plus
 * the names of parent messages it is nested in (if any), plus the name of
 * the element, separated by dots. For example: foo.bar.ParentMsg.MyEnum.
 *
 * ECMAScript does not have packages or namespaces, so we need a single
 * identifier. Our convention is to drop the package name, and to join other
 * parts of the name with an underscore. For example: ParentMsg_MyEnum.
 */
function identifier(
  desc: DescEnum | DescMessage | DescExtension | DescService,
): string {
  const pkg = desc.file.proto.package;
  const offset = pkg.length > 0 ? pkg.length + 1 : 0;
  const nameWithoutPkg = desc.typeName.substring(offset);
  return nameWithoutPkg.replace(/\./g, "_");
}

/**
 * Compute all ideal names for the elements in the file, resolving name clashes.
 */
function allNames(file: DescFile) {
  const taken = new Set<string>();
  const shapeNames = new Map<DescEnum | DescMessage, string>();
  const descNames = new Map<
    DescFile | DescEnum | DescMessage | DescExtension | DescService,
    string
  >();
  // In the first pass, register shape names
  for (const desc of nestedTypes(file)) {
    if (desc.kind != "enum" && desc.kind != "message") {
      continue;
    }
    let name: string;
    for (let i = 0; ; i++) {
      name = idealShapeName(desc, i);
      if (!taken.has(name)) {
        break;
      }
    }
    taken.add(name);
    shapeNames.set(desc, name);
  }
  // In the second pass, register desc names
  for (const desc of [file, ...nestedTypes(file)]) {
    let name: string;
    switch (desc.kind) {
      case "enum":
      case "message": {
        for (let i = 0; ; i++) {
          name = idealDescName(desc, i);
          if (!taken.has(name)) {
            break;
          }
        }
        break;
      }
      default: {
        for (let i = 0; ; i++) {
          name = idealDescName(desc, i);
          if (!taken.has(name)) {
            break;
          }
        }
        break;
      }
    }
    taken.add(name);
    descNames.set(desc, name);
  }
  return { shapeNames, descNames };
}
