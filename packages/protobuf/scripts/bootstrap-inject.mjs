// Copyright 2021-2025 Buf Technologies, Inc.
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

/* eslint-disable n/no-missing-import */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join as joinPath } from "node:path";
import assert from "node:assert";
import { stdout, stderr, argv } from "node:process";
import { UpstreamProtobuf } from "upstream-protobuf";
import { fromBinary, createFileRegistry } from "@bufbuild/protobuf";
import { reflect } from "@bufbuild/protobuf/reflect";
import {
  Edition,
  FeatureSetDefaultsSchema,
  FileDescriptorSetSchema,
} from "@bufbuild/protobuf/wkt";

const injectComment = "// bootstrap-inject";

void main(argv.slice(2)).catch((e) => {
  process.exitCode = 1;
  if (e instanceof Error) {
    stderr.write(`${e.message}\n\n${e.stack}\n`);
  } else {
    stderr.write(`${String(e)}\n`);
  }
});

/**
 * @param {Array<string>} args
 * @return {Promise<void>}
 */
async function main(args) {
  if (args.length !== 1) {
    throw new Error(`USAGE: bootstrap-inject <dir-path>`);
  }
  const upstream = new UpstreamProtobuf();
  const descriptorProto = await compileDescriptorProto(upstream);
  const dirPath = args[0];
  let processedFiles = 0;
  for (const filePath of listFiles(dirPath)) {
    if (!filePath.endsWith(".ts")) {
      continue;
    }
    const fileContent = readFileSync(filePath, "utf-8");
    if (!fileContent.includes(injectComment)) {
      continue;
    }
    stdout.write(`Injecting into ${filePath}... `);
    const newContent = await processFile(
      filePath,
      fileContent,
      descriptorProto,
      upstream,
    );
    if (newContent === fileContent) {
      processedFiles++;
      stdout.write(`no changes\n`);
    } else {
      writeFileSync(filePath, newContent);
      stdout.write(`updated\n`);
    }
  }
  if (processedFiles === 0) {
    throw new Error(`No files with inject comments found in ${dirPath}`);
  }
}

/**
 * @param {string} filePath
 * @param {string} content
 * @param {FileRegistry} descriptorProto
 * @param {UpstreamProtobuf} upstream
 */
async function processFile(filePath, content, descriptorProto, upstream) {
  let lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].startsWith(injectComment)) {
      continue;
    }
    {
      // bootstrap-inject google.protobuf.FieldDescriptorProto.Type.TYPE_DOUBLE: const $name: FieldDescriptorProto_Type.$localName = $number;
      const match = lines[i].match(
        /^\/\/ bootstrap-inject ([a-zA-Z0-9._]+)\.([a-zA-Z0-9_]+): (.*)$/,
      );
      if (match !== null) {
        const [, enumName, enumValueName, template] = match;
        const enumDesc = descriptorProto.getEnum(enumName);
        if (!enumDesc) {
          throw new Error(`${filePath}:${i}: enum ${enumName} not found`);
        }
        const enumValueDesc = enumDesc.values.find(
          (v) => v.name === enumValueName,
        );
        if (!enumValueDesc) {
          throw new Error(
            `${filePath}:${i + 1}: enum value ${enumName}.${enumValueName} not found`,
          );
        }
        i++;
        lines[i] = injectVars(template, {
          $name: enumValueDesc.name,
          $number: enumValueDesc.number,
          $localName: enumValueDesc.localName,
        });
        continue;
      }
    }
    {
      // bootstrap-inject feature-defaults: EDITION_PROTO2, EDITION_PROTO3, EDITION_2023
      const match = lines[i].match(
        /^\/\/ bootstrap-inject defaults: ([A-Z0-_]+) to ([A-Z0-_]+): (.+)$/,
      );
      if (match !== null) {
        const [, minimumEditionString, maximumEditionString, template] = match;
        const featureSetDefaults = await compileDefaults(
          upstream,
          descriptorProto,
          minimumEditionString.replace(/^EDITION_/, ""),
          maximumEditionString.replace(/^EDITION_/, ""),
        );
        const minimumEdition = featureSetDefaults.get(
          FeatureSetDefaultsSchema.field.minimumEdition,
        );
        const maximumEdition = featureSetDefaults.get(
          FeatureSetDefaultsSchema.field.maximumEdition,
        );
        if (
          typeof minimumEdition !== "number" ||
          typeof maximumEdition != "number"
        ) {
          throw new Error("Missing minimum_edition / maximum_edition");
        }
        const endOfPrevious = lines.findIndex(
          (line, index) => index > i && line.trim() === "",
        );
        if (endOfPrevious === -1) {
          throw new Error(`${filePath}:${i + 1}: unexpected EOF`);
        }
        const remainder = lines.splice(endOfPrevious);
        lines.splice(i + 1);
        lines.push(`// generated from protoc v${upstream.version()}`);
        lines.push(
          injectVars(template, {
            $minimumEdition: minimumEdition,
            $maximumEdition: maximumEdition,
          }),
        );
        lines.push(`const featureDefaults = {`);
        for (const edition of editionNumbersBetween(
          descriptorProto,
          minimumEdition,
          maximumEdition,
        )) {
          lines.push(`  // ${Edition[edition]}`);
          lines.push(`  ${edition}: {`);
          const features = bestDefaults(featureSetDefaults, edition);
          for (const f of features.fields) {
            if (f.fieldKind !== "enum") {
              throw new Error(
                `${filePath}:${i}: unexpected field kind "${f.fieldKind}" for ${f}`,
              );
            }
            const val = features.get(f);
            assert(val !== undefined);
            const valDesc = f.enum.values.find((e) => e.number === val);
            assert(valDesc !== undefined);
            lines.push(`    ${f.localName}: ${val}, // ${valDesc.name},`);
          }
          lines.push(`  },`);
        }
        lines.push(`} as const;`);
        lines.push();
        i = lines.length;
        lines.push(...remainder);
        continue;
      }
    }
    throw new Error(`${filePath}:${i + 1}: unrecognized inject comment`);
  }
  return lines.join("\n");
}

/**
 * @param {string} dir
 * @return {Iterable<string>}
 */
function* listFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = joinPath(dir, entry.name);
    if (entry.isDirectory()) {
      yield* listFiles(path);
    } else {
      yield path;
    }
  }
}

/**
 * @param {string} text
 * @param {Record<string, string>} vars
 * @returns string
 */
function injectVars(text, vars) {
  for (const [key, value] of Object.entries(vars)) {
    text = text.split(key).join(value);
  }
  return text;
}

/**
 * @param {UpstreamProtobuf} upstream
 * @param {import("@bufbuild/protobuf").FileRegistry} descriptorProto
 * @param {string} [minimumEdition]
 * @param {string} [maximumEdition]
 * @return {Promise<import("@bufbuild/protobuf/reflect").ReflectMessage>}
 */
async function compileDefaults(
  upstream,
  descriptorProto,
  minimumEdition,
  maximumEdition,
) {
  const bytes = await upstream.getFeatureSetDefaults(
    minimumEdition,
    maximumEdition,
  );
  const descDefaults = descriptorProto.getMessage(
    "google.protobuf.FeatureSetDefaults",
  );
  if (!descDefaults) {
    throw new Error("Cannot find google.protobuf.FeatureSetDefaults");
  }
  const defaults = reflect(descDefaults, fromBinary(descDefaults, bytes));
  // validate all fields known
  if (defaults.getUnknown() !== undefined && defaults.getUnknown().length > 0) {
    throw new Error(
      "Unexpected unknown fields in google.protobuf.FeatureSetDefaults",
    );
  }
  // validate min/max
  const f_minimumEdition = descDefaults.fields.find(
    (f) => f.name === "minimum_edition",
  );
  if (!f_minimumEdition || f_minimumEdition.fieldKind !== "enum") {
    throw new Error(
      "Need field google.protobuf.FeatureSetDefaults.minimum_edition",
    );
  }
  if (!defaults.isSet(f_minimumEdition)) {
    throw new Error(`${f_minimumEdition} unset`);
  }
  const f_maximumEdition = descDefaults.fields.find(
    (f) => f.name === "maximum_edition",
  );
  if (!f_maximumEdition || f_maximumEdition.fieldKind !== "enum") {
    throw new Error(
      "Need field google.protobuf.FeatureSetDefaults.maximum_edition",
    );
  }
  if (!defaults.isSet(f_maximumEdition)) {
    throw new Error(`${f_maximumEdition} unset`);
  }
  const min = defaults.get(f_minimumEdition);
  const max = defaults.get(f_maximumEdition);
  if (max < min) {
    throw new Error(
      `${f_maximumEdition} (${max}) must be greater or equal ${f_minimumEdition} (${min})`,
    );
  }
  return defaults;
}

/**
 * @param {FileRegistry} descriptorProto
 * @param {number} minimumEdition
 * @param {number} maximumEdition
 * @returns {Array<number>}
 */
function editionNumbersBetween(
  descriptorProto,
  minimumEdition,
  maximumEdition,
) {
  const editionEnum = descriptorProto.getEnum("google.protobuf.Edition");
  if (!editionEnum) {
    throw new Error(
      `enum google.protobuf.Edition not found in descriptor.proto`,
    );
  }
  return editionEnum.values
    .filter((value) => value.number >= minimumEdition)
    .filter((value) => value.number <= maximumEdition)
    .map((value) => value.number)
    .sort((a, b) => a - b);
}

/**
 * @param {import("@bufbuild/protobuf/reflect").ReflectMessage} featureSetDefaults - google.protobuf.FeatureSetDefaults
 * @param {number} edition
 * @return {import("@bufbuild/protobuf/reflect").ReflectMessage} - google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault
 */
function bestDefaults(featureSetDefaults, edition) {
  if (
    featureSetDefaults.desc.typeName !== "google.protobuf.FeatureSetDefaults"
  ) {
    throw new Error("Need google.protobuf.FeatureSetDefaults");
  }
  const f_defaults = featureSetDefaults.desc.field.defaults;
  if (
    !f_defaults ||
    f_defaults.fieldKind !== "list" ||
    f_defaults.listKind !== "message" ||
    f_defaults.message.typeName !==
      "google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault"
  ) {
    throw new Error("Need google.protobuf.FeatureSetDefaults.defaults");
  }
  const f_edition = f_defaults.message.field.edition;
  if (
    !f_edition ||
    f_edition.fieldKind !== "enum" ||
    f_edition.enum.typeName !== "google.protobuf.Edition"
  ) {
    throw new Error(
      "Need field google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.edition",
    );
  }
  let best = undefined;
  const editionDefaults = featureSetDefaults.get(f_defaults);
  for (const def of editionDefaults) {
    if (def.get(f_edition) <= edition) {
      if (best === undefined || def.get(f_edition) > best.get(f_edition)) {
        best = def;
      }
    }
  }
  if (!best) {
    throw new Error(
      `Unable to find google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault for edition ${edition}`,
    );
  }
  // merge fixed and overridable features
  const f_fixedFeatures = best.desc.field.fixedFeatures;
  if (
    !f_fixedFeatures ||
    f_fixedFeatures.fieldKind !== "message" ||
    f_fixedFeatures.message.typeName !== "google.protobuf.FeatureSet"
  ) {
    throw new Error(
      "Need field google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.fixed_features",
    );
  }
  const f_overridableFeatures = best.desc.field.overridableFeatures;
  if (
    !f_overridableFeatures ||
    f_overridableFeatures.fieldKind !== "message" ||
    f_overridableFeatures.message.typeName !== "google.protobuf.FeatureSet"
  ) {
    throw new Error(
      "Need field google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault.overridable_features",
    );
  }
  const fixedFeatures = best.get(f_fixedFeatures);
  const overridableFeatures = best.get(f_overridableFeatures);
  const features = reflect(fixedFeatures.desc);
  for (const f of features.fields) {
    if (f.fieldKind !== "enum") {
      throw new Error(`Unexpected type ${f.fieldKind} of ${f}`);
    }
    if (overridableFeatures.isSet(f)) {
      features.set(f, overridableFeatures.get(f));
    } else if (fixedFeatures.isSet(f)) {
      features.set(f, fixedFeatures.get(f));
    } else {
      throw new Error(`Incomplete feature defaults for ${f}`);
    }
  }
  return features;
}

/**
 * @param {UpstreamProtobuf} upstream
 * @return {Promise<FileRegistry>}
 */
async function compileDescriptorProto(upstream) {
  const path = "google/protobuf/descriptor.proto";
  const wktInclude = await upstream.getWktProtoInclude();
  const fdsBytes = await upstream.compileToDescriptorSet(
    {
      [path]: readFileSync(joinPath(wktInclude.dir, path), "utf-8"),
    },
    {
      includeImports: false,
      includeSourceInfo: false,
      retainOptions: false,
    },
  );
  const fds = fromBinary(FileDescriptorSetSchema, fdsBytes);
  const set = createFileRegistry(fds);
  const file = set.getFile(path);
  assert(file);
  return set;
}
