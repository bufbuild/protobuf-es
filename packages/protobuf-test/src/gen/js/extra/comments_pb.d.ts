// Copyright 2021-2022 Buf Technologies, Inc.
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

// @formatter:off

// Comment before syntax.

// @generated by protoc-gen-es v0.0.7 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/comments.proto (package spec, syntax proto3)
/* eslint-disable */

// Comment after syntax.

// Comment before package.

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * Leading comment for enum.
 *
 * Comment between start of enum and first value.
 *
 * @generated from enum spec.EnumWithComments
 */
export declare enum EnumWithComments {
  /**
   * Comment before enum value.
   *
   * Comment next to enum value.
   *
   * @generated from enum value: VALUE = 0;
   */
  VALUE = 0,
}

/**
 * Leading comment for deprecated enum
 *
 * @generated from enum spec.DeprecatedEnumWithComment
 * @deprecated
 */
export declare enum DeprecatedEnumWithComment {
  /**
   * @generated from enum value: DEPRECATED_ENUM_WITH_COMMENT_A = 0;
   */
  A = 0,

  /**
   * @generated from enum value: DEPRECATED_ENUM_WITH_COMMENT_B = 1;
   */
  B = 1,
}

/**
 * @generated from enum spec.DeprecatedEnumNoComment
 * @deprecated
 */
export declare enum DeprecatedEnumNoComment {
  /**
   * @generated from enum value: DEPRECATED_ENUM_NO_COMMENT_A = 0;
   */
  A = 0,

  /**
   * @generated from enum value: DEPRECATED_ENUM_NO_COMMENT_B = 1;
   */
  B = 1,
}

/**
 * Comment before message.
 *
 * @generated from message spec.MessageWithComments
 */
export declare class MessageWithComments extends Message<MessageWithComments> {
  /**
   * Comment before field with 5 lines:
   * line 2, next is empty
   *
   * line 4, next is empty
   *
   *
   * Comment next to field.
   *
   * @generated from field: string foo = 1;
   */
  foo: string;

  /**
   * Comment before oneof.
   *
   * Comment after start of oneof.
   *
   * @generated from oneof spec.MessageWithComments.result
   */
  result: {
    /**
     * Comment before oneof member.
     *
     * Comment next to oneof member.
     *
     * @generated from field: int32 value = 2;
     */
    value: number;
    case: "value";
  } | {
    /**
     * @generated from field: string error = 3;
     */
    value: string;
    case: "error";
  } | { case: undefined; value?: undefined };

  /**
   *
   *
   * @generated from field: string this_field_has_an_empty_comment = 4;
   */
  thisFieldHasAnEmptyComment: string;

  /**
   * @generated from field: string this_field_is_deprecated = 5 [json_name = "sdf", deprecated = true];
   * @deprecated
   */
  thisFieldIsDeprecated: string;

  constructor(data?: PartialMessage<MessageWithComments>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.MessageWithComments";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageWithComments;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageWithComments;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageWithComments;

  static equals(a: MessageWithComments | PlainMessage<MessageWithComments> | undefined, b: MessageWithComments | PlainMessage<MessageWithComments> | undefined): boolean;
}

/**
 * Comment within empty message.
 *
 * @generated from message spec.EmptyMessageWithComment
 */
export declare class EmptyMessageWithComment extends Message<EmptyMessageWithComment> {
  constructor(data?: PartialMessage<EmptyMessageWithComment>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.EmptyMessageWithComment";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EmptyMessageWithComment;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EmptyMessageWithComment;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EmptyMessageWithComment;

  static equals(a: EmptyMessageWithComment | PlainMessage<EmptyMessageWithComment> | undefined, b: EmptyMessageWithComment | PlainMessage<EmptyMessageWithComment> | undefined): boolean;
}

/**
 * see https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/descriptor.proto
 *
 * @generated from message spec.GoogleCommentExample
 */
export declare class GoogleCommentExample extends Message<GoogleCommentExample> {
  /**
   * Comment attached to foo.
   *
   * @generated from field: int32 foo = 1;
   */
  foo: number;

  /**
   * Comment attached to bar.
   *
   * @generated from field: int32 bar = 2;
   */
  bar: number;

  /**
   * Comment attached to baz.
   * Another line attached to baz.
   *
   * @generated from field: string baz = 3;
   */
  baz: string;

  /**
   * Comment attached to qux.
   *
   * Another line attached to qux.
   *
   * @generated from field: double qux = 4;
   */
  qux: number;

  /**
   * Block comment attached
   * to corge.  Leading asterisks
   * will be removed. 
   *
   * @generated from field: string corge = 5;
   */
  corge: string;

  /**
   * Block comment attached to
   * grault. 
   *
   * @generated from field: int32 grault = 6;
   */
  grault: number;

  constructor(data?: PartialMessage<GoogleCommentExample>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.GoogleCommentExample";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GoogleCommentExample;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GoogleCommentExample;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GoogleCommentExample;

  static equals(a: GoogleCommentExample | PlainMessage<GoogleCommentExample> | undefined, b: GoogleCommentExample | PlainMessage<GoogleCommentExample> | undefined): boolean;
}

