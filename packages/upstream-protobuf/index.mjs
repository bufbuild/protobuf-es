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
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { dirname, join as joinPath, relative as relativePath } from "node:path";
import os from "node:os";
import { unzipSync } from "fflate";
import micromatch from "micromatch";

/**
 * Provides release of `protoc`, `conformance_test_runner`, and related proto
 * files from the following repositories:
 * - https://github.com/bufbuild/protobuf-conformance
 * - https://github.com/protocolbuffers/protobuf
 *
 * The upstream version is picked up from version.txt
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
   * Proto files for the "well-known types".
   *
   * @type {string[]}
   */
  #wktprotos = [
    "google/protobuf/**/*.proto",
    "!google/protobuf/*_features.proto",
  ];

  /**
   * Relevant proto files for testing in upstream protobuf.
   *
   * @type {string[]}
   */
  #testprotos = [
    "src/google/protobuf/test_messages_*.proto",
    "src/google/protobuf/*unittest*.proto",
    "editions/golden/test_messages_proto3_editions.proto",
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

  /**
   * @param {string} [temp]
   * @param {string} [version]
   */
  constructor(temp, version) {
    if (typeof version !== "string") {
      version = readFileSync(
        new URL("version.txt", import.meta.url).pathname,
        "utf-8",
      ).trim();
    }
    this.#version = version;
    if (typeof temp !== "string") {
      const thisFilePath = new URL(import.meta.url).pathname;
      const thisFileContent = readFileSync(new URL(import.meta.url).pathname);
      const digest = createHash("sha256").update(thisFileContent).digest("hex");
      temp = joinPath(thisFilePath, "..", ".tmp", this.#version + "-" + digest);
    }
    this.#temp = temp;
  }

  version() {
    return this.#version;
  }

  /**
   * @return {Promise<void>}
   */
  async warmup() {
    await Promise.all([
      this.#extractProtocRelease(),
      this.#extractConformanceRelease(),
      this.#extractProtobufSourceTestProtos(),
    ]);
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
    const protocPath = await this.getProtocPath();
    const tempDir = mkdtempSync(
      joinPath(this.#temp, "compile-descriptor-set-"),
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
      execFileSync(protocPath, args, {
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
    const protocPath = await this.getProtocPath();
    const tempDir = mkdtempSync(joinPath(this.#temp, "create-codegenreq-"));
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
      execFileSync(protocPath, args, {
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
    const protocPath = await this.getProtocPath();
    const tempDir = mkdtempSync(joinPath(this.#temp, "feature-set-defaults-"));
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
      execFileSync(protocPath, args, {
        shell: false,
        cwd: tempDir,
      });
      return readFileSync(joinPath(tempDir, "defaults.binpb"));
    } finally {
      rmSync(tempDir, { recursive: true });
    }
  }

  /**
   * @return {Promise<string>}
   */
  async getProtocPath() {
    const release = await this.#extractProtocRelease();
    return release.protocPath;
  }

  /**
   * @return {Promise<string>}
   */
  async getConformanceTestRunnerPath() {
    const release = await this.#extractConformanceRelease();
    return release.runnerPath;
  }

  /**
   * @return {Promise<ProtoInclude>}
   */
  async getConformanceProtoInclude() {
    const release = await this.#extractConformanceRelease();
    return release.protoInclude;
  }

  /**
   * @return {Promise<ProtoInclude>}
   */
  async getWktProtoInclude() {
    const release = await this.#extractProtocRelease();
    return release.protoInclude;
  }

  /**
   * @return {Promise<ProtoInclude>}
   */
  async getTestProtoInclude() {
    return await this.#extractProtobufSourceTestProtos();
  }

  /**
   * @param {...string[]} paths
   */
  #getTempPath(...paths) {
    const p = joinPath(this.#temp, ...paths);
    if (!existsSync(dirname(p))) {
      mkdirSync(dirname(p), { recursive: true });
    }
    return p;
  }

  /**
   * @typedef ProtocRelease
   * @property {string} protocPath
   * @property {ProtoInclude} protoInclude
   */
  /**
   * @return {Promise<ProtocRelease>}
   */
  async #extractProtocRelease() {
    const path = this.#getTempPath("protoc");
    const protocPath = joinPath(path, "bin/protoc");
    const wktDir = joinPath(path, "include");
    if (!existsSync(path)) {
      const zipPath = await this.#downloadProtocRelease();
      const zip = await readFileSync(zipPath);
      const entries = Object.entries(
        unzipSync(zip, {
          filter: (file) =>
            file.name === "bin/protoc" || file.name.endsWith(".proto"),
        }),
      );
      if (!entries.some(([name]) => name === "bin/protoc")) {
        throw new Error(`Missing bin/protoc in protoc release`);
      }
      if (
        !entries.some(
          ([name]) =>
            name.startsWith("include/google/protobuf/") &&
            name.endsWith(".proto"),
        )
      ) {
        throw new Error(`Missing protos in protoc release`);
      }
      writeTree(entries, path);
    }
    return {
      protocPath,
      protoInclude: {
        dir: wktDir,
        files: micromatch(lsfiles(wktDir), this.#wktprotos, {}),
      },
    };
  }

  /**
   * @return {Promise<string>}
   */
  async #downloadProtocRelease() {
    let build = `${os.platform()}-${os.arch()}`;
    switch (os.platform()) {
      case "darwin":
        switch (os.arch()) {
          case "arm64":
            build = "osx-aarch_64";
            break;
          case "x64":
            build = "osx-x86_64";
            break;
          default:
            build = "osx-universal_binary";
        }
        break;
      case "linux":
        switch (os.arch()) {
          case "x64":
            build = "linux-x86_64";
            break;
          case "x32":
            build = "linux-x86_32";
            break;
          case "arm64":
            build = "linux-aarch_64";
            break;
        }
        break;
      case "win32":
        switch (os.arch()) {
          case "x64":
            build = "win64";
            break;
          case "x32":
          case "ia32":
            build = "win32";
            break;
        }
        break;
    }
    let archiveVersion = this.#version;
    const rcMatch = /^(\d+\.\d+-rc)(\d)$/.exec(archiveVersion);
    if (rcMatch != null) {
      archiveVersion = rcMatch[1] + "-" + rcMatch[2];
    }
    const url = `https://github.com/protocolbuffers/protobuf/releases/download/v${this.#version}/protoc-${archiveVersion}-${build}.zip`;
    return this.#download(url, "protoc.zip");
  }

  /**
   * @typedef ConformanceRelease
   * @property {string} runnerPath
   * @property {ProtoInclude} protoInclude
   */
  /**
   * @return {Promise<ConformanceRelease>}
   */
  async #extractConformanceRelease() {
    const path = this.#getTempPath("conformance");
    const runnerPath = joinPath(path, "bin/conformance_test_runner");
    const wktDir = joinPath(path, "include");
    if (!existsSync(path)) {
      const zipPath = await this.#downloadConformanceRelease();
      const zip = await readFileSync(zipPath);
      const entries = Object.entries(
        unzipSync(zip, {
          filter: (file) =>
            file.name === "bin/conformance_test_runner" ||
            file.name.endsWith(".proto"),
        }),
      );
      if (!entries.some(([name]) => name === "bin/conformance_test_runner")) {
        throw new Error(
          `Missing bin/conformance_test_runner in conformance release`,
        );
      }
      if (
        !entries.some(
          ([name]) =>
            name.startsWith("include/google/protobuf/") &&
            name.endsWith(".proto"),
        )
      ) {
        throw new Error(`Missing protos in conformance release`);
      }
      writeTree(entries, path);
    }
    return {
      runnerPath,
      protoInclude: {
        dir: wktDir,
        files: lsfiles(wktDir).filter((n) => n.endsWith(".proto")),
      },
    };
  }

  /**
   * @return {Promise<string>}
   */
  async #downloadConformanceRelease() {
    let build;
    switch (os.platform()) {
      case "darwin":
        switch (os.arch()) {
          case "arm64":
          case "x64":
            build = "osx-x86_64";
            break;
        }
        break;
      case "linux":
        switch (os.arch()) {
          case "x64":
            build = "linux-x86_64";
            break;
        }
        break;
    }
    if (typeof build !== "string") {
      throw new Error(
        `Unable to find conformance runner binary release for ${os.platform()} / ${os.arch()}`,
      );
    }
    const url = `https://github.com/bufbuild/protobuf-conformance/releases/download/v${this.#version}/conformance_test_runner-${this.#version}-${build}.zip`;
    return this.#download(url, "conformance_test_runner.zip");
  }

  /**
   * @return {Promise<string>}
   */
  async #downloadProtobufSource() {
    const url = `https://github.com/protocolbuffers/protobuf/releases/download/v${this.#version}/protobuf-${this.#version}.zip`;
    return this.#download(url, "protobuf.zip");
  }

  /**
   * @return {Promise<ProtoInclude>}
   */
  async #extractProtobufSource() {
    const path = this.#getTempPath("protobuf/");
    if (!existsSync(path)) {
      const zipPath = await this.#downloadProtobufSource();
      const zip = await readFileSync(zipPath);
      const allEntries = Object.entries(
        unzipSync(zip, {
          filter: (file) =>
            file.originalSize !== 0 /* assuming a directory entry */,
        }),
      ).map(([name, content]) => {
        // drop top directory, e.g. "protobuf-24.4"
        return [name.split("/").slice(1).join("/"), content];
      });
      writeTree(allEntries, path);
    }
    return {
      dir: path,
      files: lsfiles(path),
    };
  }

  /**
   * @return {Promise<ProtoInclude>}
   */
  async #extractProtobufSourceTestProtos() {
    const path = this.#getTempPath("protobuf-test/");
    if (!existsSync(path)) {
      const source = await this.#extractProtobufSource();
      const files = micromatch(source.files, this.#testprotos, {});
      const entries = files.map((file) => {
        const from = joinPath(source.dir, file);
        if (file.startsWith("src/")) {
          file = file.substring("src/".length);
        }
        return [file, readFileSync(from)];
      });
      writeTree(entries, path);
    }
    return {
      dir: path,
      files: lsfiles(path),
    };
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
