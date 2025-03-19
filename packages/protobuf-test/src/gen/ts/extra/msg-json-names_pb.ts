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

// @generated by protoc-gen-es v2.2.5 with parameter "target=ts,import_extension=js"
// @generated from file extra/msg-json-names.proto (package spec, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/msg-json-names.proto.
 */
export const file_extra_msg_json_names: GenFile = /*@__PURE__*/
  fileDesc("ChpleHRyYS9tc2ctanNvbi1uYW1lcy5wcm90bxIEc3BlYyKyAQoQSnNvbk5hbWVzTWVzc2FnZRIpCgxzY2FsYXJfZmllbGQYASABKAlSE3NjYWxhckZpZWxkSnNvbk5hbWUSOgoVcmVwZWF0ZWRfc2NhbGFyX2ZpZWxkGAIgAygJUhtyZXBlYXRlZFNjYWxhckZpZWxkSnNvbk5hbWUSCQoBYRgDIAEoCRILCgFiGAQgASgJUgASEAoBYxgFIAEoCVIFQHR5cGUSDQoBZBgGIAEoCVICMWRiBnByb3RvMw");

/**
 * @generated from message spec.JsonNamesMessage
 */
export type JsonNamesMessage = Message<"spec.JsonNamesMessage"> & {
  /**
   * @generated from field: string scalar_field = 1 [json_name = "scalarFieldJsonName"];
   */
  scalarField: string;

  /**
   * @generated from field: repeated string repeated_scalar_field = 2 [json_name = "repeatedScalarFieldJsonName"];
   */
  repeatedScalarField: string[];

  /**
   * @generated from field: string a = 3;
   */
  a: string;

  /**
   * @generated from field: string b = 4 [json_name = ""];
   */
  b: string;

  /**
   * @generated from field: string c = 5 [json_name = "@type"];
   */
  c: string;

  /**
   * @generated from field: string d = 6 [json_name = "1d"];
   */
  d: string;
};

/**
 * Describes the message spec.JsonNamesMessage.
 * Use `create(JsonNamesMessageSchema)` to create a new message.
 */
export const JsonNamesMessageSchema: GenMessage<JsonNamesMessage> = /*@__PURE__*/
  messageDesc(file_extra_msg_json_names, 0);

