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

import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { matchesGlob } from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { dirname, join as joinPath, relative as relativePath } from "node:path";
import { unzipSync } from "fflate";

/**
 * Provides auxiliary Protobuf files and functions from the
 * upstream repository https://github.com/protocolbuffers/protobuf.
 *
 * The upstream version is picked up from shelling out to `protoc --version`.
 */
export class UpstreamProtobuf {
  /**
   * @typedef ProtoInclude
   * @property {string} dir
   * @property {string[]} files
   */

  /**
   * Upstream version of protobuf.
   *
   * @type {string}
   */
  #version;

  /**
   * Relevant proto files for testing in upstream protobuf.
   *
   * @type {string[]}
   */
  #testprotos = [
    "src/google/protobuf/test_messages_*.proto",
    "src/google/protobuf/*unittest*.proto",
    "editions/golden/test_messages_proto3_editions.proto",
    "!src/google/protobuf/unittest_custom_features.proto",
    "!src/google/protobuf/unittest_lite_edition_2024.proto",
    "!src/google/protobuf/unittest_string_type.proto",
    "!src/google/protobuf/map_proto3_unittest.proto",
    "!src/google/protobuf/edition_unittest.proto",
    "!src/google/protobuf/unittest_arena.proto",
    "!src/google/protobuf/map_unittest.proto",
    "!src/google/protobuf/map_lite_unittest.proto",
    "!src/google/protobuf/unittest_lite.proto",
    "!src/google/protobuf/unittest_import_lite.proto",
    "!src/google/protobuf/unittest_import_public_lite.proto",
    "!src/google/protobuf/unittest_delimited.proto",
    "!src/google/protobuf/unittest_delimited_import.proto",
    "!src/google/protobuf/unittest_proto3_extensions.proto",
    "!src/google/protobuf/unittest_proto3_lite.proto",
    "!src/google/protobuf/unittest_proto3_arena.proto",
    "!src/google/protobuf/unittest_proto3_arena_lite.proto",
    "!src/google/protobuf/unittest_string_view.proto",
    "!src/google/protobuf/unittest_drop_unknown_fields.proto",
    "!src/google/protobuf/unittest_lazy_dependencies.proto",
    "!src/google/protobuf/unittest_lazy_dependencies_custom_option.proto",
    "!src/google/protobuf/unittest_lazy_dependencies_enum.proto",
    "!src/google/protobuf/unittest_no_field_presence.proto",
    "!src/google/protobuf/unittest_preserve_unknown_enum.proto",
    "!src/google/protobuf/unittest_preserve_unknown_enum2.proto",
    "!src/google/protobuf/unittest_legacy_features.proto",
  ];

  /**
   * @member {string}
   */
  #temp;

  constructor() {
    // find upstream version by shelling out to protoc
    const rawVersion = execFileSync("protoc", ["--version"], {
      shell: false,
      stdio: "pipe",
      encoding: "utf8",
    }).trim();
    const match = rawVersion.match(/^libprotoc (\d\d\.\d(?:-.+)?)$/);
    if (!match) {
      throw new Error(
        `Unable to determine upstream version from protoc --version output "${rawVersion}"`,
      );
    }
    this.#version = match[1];
    // set up temp dir based on version and this script's hash
    const thisFilePath = new URL(import.meta.url).pathname;
    const thisFileContent = readFileSync(new URL(import.meta.url).pathname);
    const digest = createHash("sha256").update(thisFileContent).digest("hex");
    this.#temp = joinPath(
      thisFilePath,
      "..",
      ".tmp",
      this.#version + "-" + digest,
    );
  }

  version() {
    return this.#version;
  }

  temp() {
    return this.#temp;
  }

  /**
   * @return {Promise<void>}
   */
  async warmup() {
    await this.getTestProtoInclude();
  }

  /**
   * @typedef CompileToDescriptorSetOptions
   * @property {boolean} [includeImports] Also include all dependencies of the input files in the set, so that the set is self-contained.
   * @property {boolean} [includeSourceInfo] Do not strip SourceCodeInfo from the FileDescriptorProto.
   * @property {boolean} [retainOptions] Do not strip any options from the FileDescriptorProto.
   * @property {boolean} [experimentalEditions] Enable compiling unreleased editions in protoc (undocumented flag `--experimental_editions`).
   */
  /**
   * @param {Record<string, string>|string} filesOrFileContent
   * @param {CompileToDescriptorSetOptions} [opt]
   * @return {Promise<Buffer>}
   */
  async compileToDescriptorSet(filesOrFileContent, opt) {
    const tempDir = mkdtempSync(
      joinPath(this.temp(), "compile-descriptor-set-"),
    );
    const files =
      typeof filesOrFileContent == "string"
        ? { "input.proto": filesOrFileContent }
        : filesOrFileContent;
    try {
      writeTree(Object.entries(files), tempDir);
      const outPath = joinPath(tempDir, "desc.binpb");
      const args = [
        "--descriptor_set_out",
        outPath,
        "--proto_path",
        tempDir,
        ...Object.keys(files),
      ];
      if (opt?.includeImports) {
        args.unshift("--include_imports");
      }
      if (opt?.includeSourceInfo) {
        args.unshift("--include_source_info");
      }
      if (opt?.retainOptions) {
        args.unshift("--retain_options");
      }
      if (opt?.experimentalEditions) {
        args.unshift("--experimental_editions");
      }
      execFileSync("protoc", args, {
        shell: false,
      });
      return readFileSync(outPath);
    } finally {
      rmSync(tempDir, { recursive: true });
    }
  }

  /**
   * @typedef CreateCodeGeneratorRequestOptions
   * @property {Array<string>} [filesToGenerate]
   * @property {string} parameter
   */
  /**
   * @param {Record<string, string>|string} filesOrFileContent
   * @param {CreateCodeGeneratorRequestOptions} [opt]
   * @return {Promise<Buffer>}
   */
  async createCodeGeneratorRequest(filesOrFileContent, opt) {
    const tempDir = mkdtempSync(joinPath(this.temp(), "create-codegenreq-"));
    const files =
      typeof filesOrFileContent == "string"
        ? { "input.proto": filesOrFileContent }
        : filesOrFileContent;
    try {
      writeTree(Object.entries(files), tempDir);
      const args = [
        "--dumpcodegenreq_out",
        ".",
        "--proto_path",
        ".",
        ...(opt?.filesToGenerate ?? Object.keys(files)),
      ];
      if (opt?.parameter !== undefined && opt.parameter.length > 0) {
        args.unshift("--dumpcodegenreq_opt", opt.parameter);
      }
      execFileSync("protoc", args, {
        shell: false,
        cwd: tempDir,
      });
      const outPath = joinPath(tempDir, "dumpcodegenreq.binpb");
      return readFileSync(outPath);
    } finally {
      rmSync(tempDir, { recursive: true });
    }
  }

  /**
   * @param {string} [minimumEdition]
   * @param {string} [maximumEdition]
   * @param {string} [maximumEdition]
   * @param {Record<string, string>|string} [filesOrFileContent]
   * @return Promise<Buffer>
   */
  async getFeatureSetDefaults(
    minimumEdition,
    maximumEdition,
    filesOrFileContent,
  ) {
    const tempDir = mkdtempSync(joinPath(this.temp(), "feature-set-defaults-"));
    const files =
      typeof filesOrFileContent == "string"
        ? { "input.proto": filesOrFileContent }
        : filesOrFileContent === undefined
          ? {}
          : filesOrFileContent;
    try {
      writeTree(Object.entries(files), tempDir);
      const args = [
        "--edition_defaults_out",
        "defaults.binpb",
        "google/protobuf/descriptor.proto",
        ...Object.keys(files),
      ];
      if (minimumEdition !== undefined) {
        args.push("--edition_defaults_minimum", minimumEdition);
      }
      if (maximumEdition !== undefined) {
        args.push("--edition_defaults_maximum", maximumEdition);
      }
      execFileSync("protoc", args, {
        shell: false,
        cwd: tempDir,
      });
      return readFileSync(joinPath(tempDir, "defaults.binpb"));
    } finally {
      rmSync(tempDir, { recursive: true });
    }
  }

  /**
   * @return {Promise<ProtoInclude>}
   */
  async getWktProtoInclude() {
    const wktUrl = import.meta.resolve("protoc/include");
    const wktDir = new URL(wktUrl).pathname;
    return {
      dir: wktDir,
      files: lsfiles(wktDir),
    };
  }

  /**
   * @return {Promise<ProtoInclude>}
   */
  async getTestProtoInclude() {
    const path = this.#getTempPath("test-proto-include/");
    if (!existsSync(path)) {
      const zipPath = await this.#download(
        `https://github.com/protocolbuffers/protobuf/releases/download/v${this.version()}/protobuf-${this.version()}.zip`,
        "protobuf.zip",
      );
      const zip = await readFileSync(zipPath);
      const includePatterns = this.#testprotos.filter(
        (p) => !p.startsWith("!"),
      );
      const excludePatterns = this.#testprotos
        .filter((p) => p.startsWith("!"))
        .map((p) => p.slice(1));
      const unzipped = unzipSync(zip, {
        filter: (file) => {
          // drop top directory, e.g. "protobuf-24.4"
          const name = file.name.split("/").slice(1).join("/");
          return (
            includePatterns.some((p) => matchesGlob(name, p)) &&
            !excludePatterns.some((p) => matchesGlob(name, p))
          );
        },
      });
      const allEntries = Object.entries(unzipped).map(([name, content]) => {
        // drop top directory, e.g. "protobuf-24.4"
        name = name.split("/").slice(1).join("/");
        if (name.startsWith("src/")) {
          name = name.substring("src/".length);
        }
        return [name, content];
      });
      writeTree(allEntries, path);
    }
    return {
      dir: path,
      files: lsfiles(path),
    };
  }

  /**
   * @param {...string[]} paths
   */
  #getTempPath(...paths) {
    const p = joinPath(this.temp(), ...paths);
    if (!existsSync(dirname(p))) {
      mkdirSync(dirname(p), { recursive: true });
    }
    return p;
  }

  /**
   * @param {string} url
   * @param {string} filename
   * @return {Promise<string>}
   */
  async #download(url, filename) {
    const path = this.#getTempPath(filename);
    if (existsSync(path)) {
      return path;
    }
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
    }
    writeFileSync(path, new Uint8Array(await res.arrayBuffer()));
    return path;
  }
}

/**
 * @param {Array<[string, Uint8Array|string]>} files
 * @param {string} [dir]
 */
function writeTree(files, dir = ".") {
  for (const [file, contents] of files) {
    const path = joinPath(dir, file);
    if (!existsSync(dirname(path))) {
      mkdirSync(dirname(path), { recursive: true });
    }
    writeFileSync(path, contents, {
      mode: 0o755,
    });
  }
}

/**
 * @param {string} dir
 * @return {string[]}
 */
function lsfiles(dir) {
  const hits = [];

  function ls(dir) {
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const entPath = joinPath(dir, ent.name);
      if (ent.isFile()) {
        hits.push(entPath);
      } else if (ent.isDirectory()) {
        ls(entPath);
      }
    }
  }

  ls(dir);
  return hits.map((path) => relativePath(dir, path));
}
