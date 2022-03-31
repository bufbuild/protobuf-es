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

// @generated by protoc-gen-es v0.0.2-alpha.2 with parameter "ts_nocheck=false,target=ts"
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
// Retrieve enum metadata with: proto3.getEnumType(EnumWithComments)
proto3.util.setEnumType(EnumWithComments, "spec.EnumWithComments", [
  {no: 0, name: "VALUE"},
]);

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
// Retrieve enum metadata with: proto3.getEnumType(DeprecatedEnumWithComment)
proto3.util.setEnumType(DeprecatedEnumWithComment, "spec.DeprecatedEnumWithComment", [
  {no: 0, name: "DEPRECATED_ENUM_WITH_COMMENT_A"},
  {no: 1, name: "DEPRECATED_ENUM_WITH_COMMENT_B"},
]);

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
// Retrieve enum metadata with: proto3.getEnumType(DeprecatedEnumNoComment)
proto3.util.setEnumType(DeprecatedEnumNoComment, "spec.DeprecatedEnumNoComment", [
  {no: 0, name: "DEPRECATED_ENUM_NO_COMMENT_A"},
  {no: 1, name: "DEPRECATED_ENUM_NO_COMMENT_B"},
]);

/**
 * Comment before message.
 *
 * @generated from message spec.MessageWithComments
 */
export class MessageWithComments extends Message<MessageWithComments> {
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
  foo = "";

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
  } | { case: undefined; value?: undefined } = { case: undefined };

  /**
   *
   *
   * @generated from field: string this_field_has_an_empty_comment = 4;
   */
  thisFieldHasAnEmptyComment = "";

  /**
   * @generated from field: string this_field_is_deprecated = 5 [json_name = "sdf", deprecated = true];
   * @deprecated
   */
  thisFieldIsDeprecated = "";

  constructor(data?: PartialMessage<MessageWithComments>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.MessageWithComments";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {no: 1, name: "foo", kind: "scalar", T: 9 /* ScalarType.STRING */},
    {no: 2, name: "value", kind: "scalar", T: 5 /* ScalarType.INT32 */, oneof: "result"},
    {no: 3, name: "error", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "result"},
    {no: 4, name: "this_field_has_an_empty_comment", kind: "scalar", T: 9 /* ScalarType.STRING */},
    {no: 5, name: "this_field_is_deprecated", jsonName: "sdf", kind: "scalar", T: 9 /* ScalarType.STRING */},
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageWithComments {
    return new MessageWithComments().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageWithComments {
    return new MessageWithComments().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageWithComments {
    return new MessageWithComments().fromJsonString(jsonString, options);
  }

  static equals(a: MessageWithComments | PlainMessage<MessageWithComments> | undefined, b: MessageWithComments | PlainMessage<MessageWithComments> | undefined): boolean {
    return proto3.util.equals(MessageWithComments, a, b);
  }
}

/**
 * Comment within empty message.
 *
 * @generated from message spec.EmptyMessageWithComment
 */
export class EmptyMessageWithComment extends Message<EmptyMessageWithComment> {
  constructor(data?: PartialMessage<EmptyMessageWithComment>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.EmptyMessageWithComment";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EmptyMessageWithComment {
    return new EmptyMessageWithComment().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EmptyMessageWithComment {
    return new EmptyMessageWithComment().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EmptyMessageWithComment {
    return new EmptyMessageWithComment().fromJsonString(jsonString, options);
  }

  static equals(a: EmptyMessageWithComment | PlainMessage<EmptyMessageWithComment> | undefined, b: EmptyMessageWithComment | PlainMessage<EmptyMessageWithComment> | undefined): boolean {
    return proto3.util.equals(EmptyMessageWithComment, a, b);
  }
}

/**
 * see https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/descriptor.proto
 *
 * @generated from message spec.GoogleCommentExample
 */
export class GoogleCommentExample extends Message<GoogleCommentExample> {
  /**
   * Comment attached to foo.
   *
   * @generated from field: int32 foo = 1;
   */
  foo = 0;

  /**
   * Comment attached to bar.
   *
   * @generated from field: int32 bar = 2;
   */
  bar = 0;

  /**
   * Comment attached to baz.
   * Another line attached to baz.
   *
   * @generated from field: string baz = 3;
   */
  baz = "";

  /**
   * Comment attached to qux.
   *
   * Another line attached to qux.
   *
   * @generated from field: double qux = 4;
   */
  qux = 0;

  /**
   * Block comment attached
   * to corge.  Leading asterisks
   * will be removed. 
   *
   * @generated from field: string corge = 5;
   */
  corge = "";

  /**
   * Block comment attached to
   * grault. 
   *
   * @generated from field: int32 grault = 6;
   */
  grault = 0;

  constructor(data?: PartialMessage<GoogleCommentExample>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.GoogleCommentExample";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {no: 1, name: "foo", kind: "scalar", T: 5 /* ScalarType.INT32 */},
    {no: 2, name: "bar", kind: "scalar", T: 5 /* ScalarType.INT32 */},
    {no: 3, name: "baz", kind: "scalar", T: 9 /* ScalarType.STRING */},
    {no: 4, name: "qux", kind: "scalar", T: 1 /* ScalarType.DOUBLE */},
    {no: 5, name: "corge", kind: "scalar", T: 9 /* ScalarType.STRING */},
    {no: 6, name: "grault", kind: "scalar", T: 5 /* ScalarType.INT32 */},
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GoogleCommentExample {
    return new GoogleCommentExample().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GoogleCommentExample {
    return new GoogleCommentExample().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GoogleCommentExample {
    return new GoogleCommentExample().fromJsonString(jsonString, options);
  }

  static equals(a: GoogleCommentExample | PlainMessage<GoogleCommentExample> | undefined, b: GoogleCommentExample | PlainMessage<GoogleCommentExample> | undefined): boolean {
    return proto3.util.equals(GoogleCommentExample, a, b);
  }
}

