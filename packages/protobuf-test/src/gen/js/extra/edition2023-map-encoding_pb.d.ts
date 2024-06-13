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

// @generated by protoc-gen-es v2.0.0-alpha.4 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file extra/edition2023-map-encoding.proto (package spec, edition 2023)
// option features.message_encoding = DELIMITED;
/* eslint-disable */

import type { GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/edition2023-map-encoding.proto.
 */
export declare const fileDesc_extra_edition2023_map_encoding: GenDescFile;

/**
 * Map fields are syntactic sugar for a repeated message field with field 1 for
 * key and field 2 for value. Despite that, the file feature message_encoding =
 * DELIMITED should NOT apply to this "synthetic" message, and it should also
 * not apply to map message values.
 *
 * @generated from message spec.Edition2023MapEncodingMessage
 */
export declare type Edition2023MapEncodingMessage = Message<"spec.Edition2023MapEncodingMessage"> & {
  /**
   * @generated from field: map<int32, string> string_map = 77;
   */
  stringMap: { [key: number]: string };

  /**
   * @generated from field: map<int32, spec.Edition2023MapEncodingMessage.Child> message_map = 88;
   */
  messageMap: { [key: number]: Edition2023MapEncodingMessage_Child };
};

/**
 * Describes the message spec.Edition2023MapEncodingMessage.
 * Use `create(Edition2023MapEncodingMessageDesc)` to create a new message.
 */
export declare const Edition2023MapEncodingMessageDesc: GenDescMessage<Edition2023MapEncodingMessage>;

/**
 * @generated from message spec.Edition2023MapEncodingMessage.Child
 */
export declare type Edition2023MapEncodingMessage_Child = Message<"spec.Edition2023MapEncodingMessage.Child"> & {
};

/**
 * Describes the message spec.Edition2023MapEncodingMessage.Child.
 * Use `create(Edition2023MapEncodingMessage_Child_Desc)` to create a new message.
 */
export declare const Edition2023MapEncodingMessage_Child_Desc: GenDescMessage<Edition2023MapEncodingMessage_Child>;

