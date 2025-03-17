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

// @generated by protoc-gen-es v2.2.4 with parameter "target=ts,import_extension=js"
// @generated from file extra/msg-oneof.proto (package spec, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/msg-oneof.proto.
 */
export const file_extra_msg_oneof: GenFile = /*@__PURE__*/
  fileDesc("ChVleHRyYS9tc2ctb25lb2YucHJvdG8SBHNwZWMi7gEKDE9uZW9mTWVzc2FnZRIPCgV2YWx1ZRgBIAEoBUgAEg8KBWVycm9yGAIgASgJSAASDwoFYnl0ZXMYAyABKAxIABIkCgNmb28YCyABKAsyFS5zcGVjLk9uZW9mTWVzc2FnZUZvb0gBEiQKA2JhchgMIAEoCzIVLnNwZWMuT25lb2ZNZXNzYWdlQmFySAESJAoDYmF6GA0gASgLMhUuc3BlYy5PbmVvZk1lc3NhZ2VCYXJIARIcCgFlGBUgASgOMg8uc3BlYy5PbmVvZkVudW1IAkIICgZzY2FsYXJCCQoHbWVzc2FnZUIGCgRlbnVtIi8KD09uZW9mTWVzc2FnZUZvbxIMCgRuYW1lGAEgASgJEg4KBnRvZ2dsZRgCIAEoCCInCg9PbmVvZk1lc3NhZ2VCYXISCQoBYRgBIAEoBRIJCgFiGAIgASgFKksKCU9uZW9mRW51bRIaChZPTkVPRl9FTlVNX1VOU1BFQ0lGSUVEEAASEAoMT05FT0ZfRU5VTV9BEAESEAoMT05FT0ZfRU5VTV9CEAJiBnByb3RvMw");

/**
 * @generated from message spec.OneofMessage
 */
export type OneofMessage = Message<"spec.OneofMessage"> & {
  /**
   * @generated from oneof spec.OneofMessage.scalar
   */
  scalar: {
    /**
     * @generated from field: int32 value = 1;
     */
    value: number;
    case: "value";
  } | {
    /**
     * @generated from field: string error = 2;
     */
    value: string;
    case: "error";
  } | {
    /**
     * @generated from field: bytes bytes = 3;
     */
    value: Uint8Array;
    case: "bytes";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from oneof spec.OneofMessage.message
   */
  message: {
    /**
     * @generated from field: spec.OneofMessageFoo foo = 11;
     */
    value: OneofMessageFoo;
    case: "foo";
  } | {
    /**
     * @generated from field: spec.OneofMessageBar bar = 12;
     */
    value: OneofMessageBar;
    case: "bar";
  } | {
    /**
     * @generated from field: spec.OneofMessageBar baz = 13;
     */
    value: OneofMessageBar;
    case: "baz";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from oneof spec.OneofMessage.enum
   */
  enum: {
    /**
     * @generated from field: spec.OneofEnum e = 21;
     */
    value: OneofEnum;
    case: "e";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message spec.OneofMessage.
 * Use `create(OneofMessageSchema)` to create a new message.
 */
export const OneofMessageSchema: GenMessage<OneofMessage> = /*@__PURE__*/
  messageDesc(file_extra_msg_oneof, 0);

/**
 * @generated from message spec.OneofMessageFoo
 */
export type OneofMessageFoo = Message<"spec.OneofMessageFoo"> & {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * @generated from field: bool toggle = 2;
   */
  toggle: boolean;
};

/**
 * Describes the message spec.OneofMessageFoo.
 * Use `create(OneofMessageFooSchema)` to create a new message.
 */
export const OneofMessageFooSchema: GenMessage<OneofMessageFoo> = /*@__PURE__*/
  messageDesc(file_extra_msg_oneof, 1);

/**
 * @generated from message spec.OneofMessageBar
 */
export type OneofMessageBar = Message<"spec.OneofMessageBar"> & {
  /**
   * @generated from field: int32 a = 1;
   */
  a: number;

  /**
   * @generated from field: int32 b = 2;
   */
  b: number;
};

/**
 * Describes the message spec.OneofMessageBar.
 * Use `create(OneofMessageBarSchema)` to create a new message.
 */
export const OneofMessageBarSchema: GenMessage<OneofMessageBar> = /*@__PURE__*/
  messageDesc(file_extra_msg_oneof, 2);

/**
 * @generated from enum spec.OneofEnum
 */
export enum OneofEnum {
  /**
   * @generated from enum value: ONEOF_ENUM_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: ONEOF_ENUM_A = 1;
   */
  A = 1,

  /**
   * @generated from enum value: ONEOF_ENUM_B = 2;
   */
  B = 2,
}

/**
 * Describes the enum spec.OneofEnum.
 */
export const OneofEnumSchema: GenEnum<OneofEnum> = /*@__PURE__*/
  enumDesc(file_extra_msg_oneof, 0);

