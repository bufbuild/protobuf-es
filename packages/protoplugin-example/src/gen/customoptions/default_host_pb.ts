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

// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file customoptions/default_host.proto (package customoptions, syntax proto3)
/* eslint-disable */

import type { GenExtension, GenFile } from "@bufbuild/protobuf/codegenv1";
import { extDesc, fileDesc } from "@bufbuild/protobuf/codegenv1";
import type { ServiceOptions } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_descriptor } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file customoptions/default_host.proto.
 */
export const file_customoptions_default_host: GenFile = /*@__PURE__*/
  fileDesc("CiBjdXN0b21vcHRpb25zL2RlZmF1bHRfaG9zdC5wcm90bxINY3VzdG9tb3B0aW9uczpGCgxkZWZhdWx0X2hvc3QSHy5nb29nbGUucHJvdG9idWYuU2VydmljZU9wdGlvbnMY6QcgASgJUgtkZWZhdWx0SG9zdIgBAWIGcHJvdG8z", [file_google_protobuf_descriptor]);

/**
 * An example for a custom option. Custom options are extensions to one of
 * the options messages defined in descriptor.proto.
 *
 * We extend the ServiceOptions message, so that other proto files can import
 * this file, and set the option on a service declaration.
 *
 * @generated from extension: optional string default_host = 1001;
 */
export const default_host: GenExtension<ServiceOptions, string> = /*@__PURE__*/
  extDesc(file_customoptions_default_host, 0);

