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

// @formatter:off

// Comment before syntax.

// @generated by protoc-gen-es v2.0.0-alpha.4 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file extra/comments.proto (package spec, syntax proto3)
/* eslint-disable */

// Comment after syntax.

// Comment before package.

import type { GenDescEnum, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/comments.proto.
 */
export declare const file_extra_comments: GenDescFile;

/**
 * Comment before message.
 *
 * @generated from message spec.MessageWithComments
 */
export declare type MessageWithComments = Message<"spec.MessageWithComments"> & {
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
   * @generated from field: string this_field_has_an_empty_comment = 4;
   */
  thisFieldHasAnEmptyComment: string;

  /**
   * @generated from field: string this_field_is_deprecated = 5 [json_name = "sdf", deprecated = true];
   * @deprecated
   */
  thisFieldIsDeprecated: string;
};

/**
 * Describes the message spec.MessageWithComments.
 * Use `create(MessageWithCommentsSchema)` to create a new message.
 */
export declare const MessageWithCommentsSchema: GenDescMessage<MessageWithComments>;

/**
 * Comment within empty message.
 *
 * @generated from message spec.EmptyMessageWithComment
 */
export declare type EmptyMessageWithComment = Message<"spec.EmptyMessageWithComment"> & {
};

/**
 * Describes the message spec.EmptyMessageWithComment.
 * Use `create(EmptyMessageWithCommentSchema)` to create a new message.
 */
export declare const EmptyMessageWithCommentSchema: GenDescMessage<EmptyMessageWithComment>;

/**
 * see https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/descriptor.proto
 *
 * @generated from message spec.GoogleCommentExample
 */
export declare type GoogleCommentExample = Message<"spec.GoogleCommentExample"> & {
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
};

/**
 * Describes the message spec.GoogleCommentExample.
 * Use `create(GoogleCommentExampleSchema)` to create a new message.
 */
export declare const GoogleCommentExampleSchema: GenDescMessage<GoogleCommentExample>;

/**
 * Leading comment for enum.
 *
 * Comment between start of enum and first value.
 *
 * @generated from enum spec.EnumWithComments
 */
export enum EnumWithComments {
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
 * Describes the enum spec.EnumWithComments.
 */
export declare const EnumWithCommentsSchema: GenDescEnum<EnumWithComments>;

/**
 * Leading comment for deprecated enum
 *
 * @generated from enum spec.DeprecatedEnumWithComment
 * @deprecated
 */
export enum DeprecatedEnumWithComment {
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
 * Describes the enum spec.DeprecatedEnumWithComment.
 * @deprecated
 */
export declare const DeprecatedEnumWithCommentSchema: GenDescEnum<DeprecatedEnumWithComment>;

/**
 * @generated from enum spec.DeprecatedEnumNoComment
 * @deprecated
 */
export enum DeprecatedEnumNoComment {
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
 * Describes the enum spec.DeprecatedEnumNoComment.
 * @deprecated
 */
export declare const DeprecatedEnumNoCommentSchema: GenDescEnum<DeprecatedEnumNoComment>;

