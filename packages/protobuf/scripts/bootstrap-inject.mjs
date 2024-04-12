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

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join as joinPath } from "node:path";
import assert from "node:assert";
import { stdout, stderr, argv } from "node:process";
import { UpstreamProtobuf } from "upstream-protobuf";
import {
  createDescFileSet,
  localName,
  reflect,
} from "@bufbuild/protobuf/next/reflect";
import { fromBinary } from "@bufbuild/protobuf/next";
import {
  Edition,
  FeatureSetDefaultsDesc,
  FeatureSetDesc,
  FileDescriptorSetDesc,
} from "@bufbuild/protobuf/next/wkt";

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
 * @param {DescFileSet} descriptorProto
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
          $localName: localName(enumValueDesc),
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
        const enumDesc = descriptorProto.getEnum("google.protobuf.Edition");
        if (!enumDesc) {
          throw new Error(
            `${filePath}:${i}: enum google.protobuf.Edition not found`,
          );
        }
        const [, minimumEditionString, maximumEditionString, template] = match;
        const featureSetDefaults = await compileDefaults(
          upstream,
          minimumEditionString.replace(/^EDITION_/, ""),
          maximumEditionString.replace(/^EDITION_/, ""),
        );
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
            $minimumEdition: featureSetDefaults.minimumEdition,
            $maximumEdition: featureSetDefaults.maximumEdition,
          }),
        );
        lines.push(`const featureDefaults = {`);
        for (const def of featureSetDefaults.defaults) {
          lines.push(`  // ${Edition[def.edition]}`);
          lines.push(`  ${def.edition}: {`);
          const r = reflect(FeatureSetDesc, def.features);
          for (const f of r.fields) {
            if (f.fieldKind !== "enum") {
              throw new Error(
                `${filePath}:${i}: unexpected field kind "${f.fieldKind}" for ${f}`,
              );
            }
            if (!r.isSet(f)) {
              throw new Error(`${filePath}:${i}: ${f} is not set`);
            }
            const val = r.get(f);
            assert(val !== undefined);
            const valDesc = f.enum.values.find((e) => e.number === val);
            assert(valDesc !== undefined);
            lines.push(`    ${localName(f)}: ${val}, // ${valDesc.name},`);
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
 * @param {string} [minimumEdition]
 * @param {string} [maximumEdition]
 * @return {Promise<import("@bufbuild/protobuf/next/wkt").FeatureSetDefaults>}
 */
async function compileDefaults(upstream, minimumEdition, maximumEdition) {
  const featureSetDefaultsBytes = await upstream.getFeatureSetDefaults(
    minimumEdition,
    maximumEdition,
  );
  const featureSetDefaults = fromBinary(
    FeatureSetDefaultsDesc,
    featureSetDefaultsBytes,
  );
  const hasUnknownFields =
    featureSetDefaults.$unknown !== undefined &&
    featureSetDefaults.$unknown.length > 0;
  if (
    hasUnknownFields ||
    featureSetDefaults.minimumEdition === 0 ||
    featureSetDefaults.maximumEdition === 0 ||
    featureSetDefaults.maximumEdition < featureSetDefaults.minimumEdition ||
    featureSetDefaults.defaults.some((d) => d.edition === 0) ||
    featureSetDefaults.defaults.some(
      (d) =>
        !d.features ||
        d.features.fieldPresence === 0 ||
        d.features.enumType === 0 ||
        d.features.repeatedFieldEncoding === 0 ||
        d.features.utf8Validation === 0 ||
        d.features.messageEncoding === 0 ||
        d.features.jsonFormat === 0,
    )
  ) {
    throw new Error(`invalid ${FeatureSetDefaultsDesc.typeName}`);
  }
  return featureSetDefaults;
}

/**
 * @param {UpstreamProtobuf} upstream
 * @return {Promise<DescFileSet>}
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
  const fds = fromBinary(FileDescriptorSetDesc, fdsBytes);
  const set = createDescFileSet(fds);
  const file = set.getFile(path);
  assert(file);
  return set;
}
