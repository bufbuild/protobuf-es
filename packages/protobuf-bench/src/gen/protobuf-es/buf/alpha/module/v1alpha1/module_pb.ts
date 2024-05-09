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

// @generated by protoc-gen-es v2.0.0-alpha.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/module/v1alpha1/module.proto (package buf.alpha.module.v1alpha1, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Config } from "../../breaking/v1/config_pb";
import { fileDesc_buf_alpha_breaking_v1_config } from "../../breaking/v1/config_pb";
import type { Config as Config$1 } from "../../lint/v1/config_pb";
import { fileDesc_buf_alpha_lint_v1_config } from "../../lint/v1/config_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { fileDesc_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/alpha/module/v1alpha1/module.proto.
 */
export const fileDesc_buf_alpha_module_v1alpha1_module: GenDescFile = /*@__PURE__*/
  fileDesc("CiZidWYvYWxwaGEvbW9kdWxlL3YxYWxwaGExL21vZHVsZS5wcm90bxIZYnVmLmFscGhhLm1vZHVsZS52MWFscGhhMSL5AQoGTW9kdWxlEjQKBWZpbGVzGAEgAygLMiUuYnVmLmFscGhhLm1vZHVsZS52MWFscGhhMS5Nb2R1bGVGaWxlEjoKDGRlcGVuZGVuY2llcxgCIAMoCzIkLmJ1Zi5hbHBoYS5tb2R1bGUudjFhbHBoYTEuTW9kdWxlUGluEhUKDWRvY3VtZW50YXRpb24YAyABKAkSNgoPYnJlYWtpbmdfY29uZmlnGAQgASgLMh0uYnVmLmFscGhhLmJyZWFraW5nLnYxLkNvbmZpZxIuCgtsaW50X2NvbmZpZxgFIAEoCzIZLmJ1Zi5hbHBoYS5saW50LnYxLkNvbmZpZyIrCgpNb2R1bGVGaWxlEgwKBHBhdGgYASABKAkSDwoHY29udGVudBgCIAEoDCJXCg9Nb2R1bGVSZWZlcmVuY2USDgoGcmVtb3RlGAEgASgJEg0KBW93bmVyGAIgASgJEhIKCnJlcG9zaXRvcnkYAyABKAkSEQoJcmVmZXJlbmNlGAQgASgJIp8BCglNb2R1bGVQaW4SDgoGcmVtb3RlGAEgASgJEg0KBW93bmVyGAIgASgJEhIKCnJlcG9zaXRvcnkYAyABKAkSDgoGYnJhbmNoGAQgASgJEg4KBmNvbW1pdBgFIAEoCRIOCgZkaWdlc3QYBiABKAkSLwoLY3JlYXRlX3RpbWUYByABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wYgZwcm90bzM", [fileDesc_buf_alpha_breaking_v1_config, fileDesc_buf_alpha_lint_v1_config, fileDesc_google_protobuf_timestamp]);

/**
 * Module is a module.
 *
 * @generated from message buf.alpha.module.v1alpha1.Module
 */
export type Module = Message<"buf.alpha.module.v1alpha1.Module"> & {
  /**
   * files are the files that make up the set.
   *
   * Sorted by path.
   * Path must be unique.
   * Only the target files. No imports.
   *
   * Maximum total size of all content: 32MB.
   *
   * @generated from field: repeated buf.alpha.module.v1alpha1.ModuleFile files = 1;
   */
  files: ModuleFile[];

  /**
   * dependencies are the dependencies.
   *
   * @generated from field: repeated buf.alpha.module.v1alpha1.ModulePin dependencies = 2;
   */
  dependencies: ModulePin[];

  /**
   * documentation is the string representation of the contents of the `buf.md` file.
   *
   * string is used to enforce UTF-8 encoding or 7-bit ASCII text.
   *
   * @generated from field: string documentation = 3;
   */
  documentation: string;

  /**
   * breaking_config is the breaking change detection configuration set for the module.
   *
   * @generated from field: buf.alpha.breaking.v1.Config breaking_config = 4;
   */
  breakingConfig?: Config;

  /**
   * lint_config is the lint configuration set for the module.
   *
   * @generated from field: buf.alpha.lint.v1.Config lint_config = 5;
   */
  lintConfig?: Config$1;
};

/**
 * Describes the message buf.alpha.module.v1alpha1.Module.
 * Use `create(ModuleDesc)` to create a new message.
 */
export const ModuleDesc: GenDescMessage<Module> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_module_v1alpha1_module, 0);

/**
 * ModuleFile is a file within a FileSet.
 *
 * @generated from message buf.alpha.module.v1alpha1.ModuleFile
 */
export type ModuleFile = Message<"buf.alpha.module.v1alpha1.ModuleFile"> & {
  /**
   * path is the relative path of the file.
   * Path can only use '/' as the separator character, and includes no ".." components.
   *
   * @generated from field: string path = 1;
   */
  path: string;

  /**
   * content is the content of the file.
   *
   * @generated from field: bytes content = 2;
   */
  content: Uint8Array;
};

/**
 * Describes the message buf.alpha.module.v1alpha1.ModuleFile.
 * Use `create(ModuleFileDesc)` to create a new message.
 */
export const ModuleFileDesc: GenDescMessage<ModuleFile> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_module_v1alpha1_module, 1);

/**
 * ModuleReference is a module reference.
 *
 * @generated from message buf.alpha.module.v1alpha1.ModuleReference
 */
export type ModuleReference = Message<"buf.alpha.module.v1alpha1.ModuleReference"> & {
  /**
   * @generated from field: string remote = 1;
   */
  remote: string;

  /**
   * @generated from field: string owner = 2;
   */
  owner: string;

  /**
   * @generated from field: string repository = 3;
   */
  repository: string;

  /**
   * either branch, tag, or commit
   *
   * @generated from field: string reference = 4;
   */
  reference: string;
};

/**
 * Describes the message buf.alpha.module.v1alpha1.ModuleReference.
 * Use `create(ModuleReferenceDesc)` to create a new message.
 */
export const ModuleReferenceDesc: GenDescMessage<ModuleReference> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_module_v1alpha1_module, 2);

/**
 * ModulePin is a module pin.
 *
 * @generated from message buf.alpha.module.v1alpha1.ModulePin
 */
export type ModulePin = Message<"buf.alpha.module.v1alpha1.ModulePin"> & {
  /**
   * @generated from field: string remote = 1;
   */
  remote: string;

  /**
   * @generated from field: string owner = 2;
   */
  owner: string;

  /**
   * @generated from field: string repository = 3;
   */
  repository: string;

  /**
   * @generated from field: string branch = 4;
   */
  branch: string;

  /**
   * @generated from field: string commit = 5;
   */
  commit: string;

  /**
   * @generated from field: string digest = 6;
   */
  digest: string;

  /**
   * @generated from field: google.protobuf.Timestamp create_time = 7;
   */
  createTime?: Timestamp;
};

/**
 * Describes the message buf.alpha.module.v1alpha1.ModulePin.
 * Use `create(ModulePinDesc)` to create a new message.
 */
export const ModulePinDesc: GenDescMessage<ModulePin> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_module_v1alpha1_module, 3);

