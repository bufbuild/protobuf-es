// Protocol Buffers - Google's data interchange format
// Copyright 2008 Google Inc.  All rights reserved.
// https://developers.google.com/protocol-buffers/
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// @generated by protoc-gen-es v0.1.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_drop_unknown_fields.proto (package unittest_drop_unknown_fields, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message unittest_drop_unknown_fields.Foo
 */
export declare class Foo extends Message<Foo> {
  /**
   * @generated from field: int32 int32_value = 1;
   */
  int32Value: number;

  /**
   * @generated from field: unittest_drop_unknown_fields.Foo.NestedEnum enum_value = 2;
   */
  enumValue: Foo_NestedEnum;

  constructor(data?: PartialMessage<Foo>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "unittest_drop_unknown_fields.Foo";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Foo;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Foo;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Foo;

  static equals(a: Foo | PlainMessage<Foo> | undefined, b: Foo | PlainMessage<Foo> | undefined): boolean;
}

/**
 * @generated from enum unittest_drop_unknown_fields.Foo.NestedEnum
 */
export declare enum Foo_NestedEnum {
  /**
   * @generated from enum value: FOO = 0;
   */
  FOO = 0,

  /**
   * @generated from enum value: BAR = 1;
   */
  BAR = 1,

  /**
   * @generated from enum value: BAZ = 2;
   */
  BAZ = 2,
}

/**
 * @generated from message unittest_drop_unknown_fields.FooWithExtraFields
 */
export declare class FooWithExtraFields extends Message<FooWithExtraFields> {
  /**
   * @generated from field: int32 int32_value = 1;
   */
  int32Value: number;

  /**
   * @generated from field: unittest_drop_unknown_fields.FooWithExtraFields.NestedEnum enum_value = 2;
   */
  enumValue: FooWithExtraFields_NestedEnum;

  /**
   * @generated from field: int32 extra_int32_value = 3;
   */
  extraInt32Value: number;

  constructor(data?: PartialMessage<FooWithExtraFields>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "unittest_drop_unknown_fields.FooWithExtraFields";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FooWithExtraFields;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FooWithExtraFields;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FooWithExtraFields;

  static equals(a: FooWithExtraFields | PlainMessage<FooWithExtraFields> | undefined, b: FooWithExtraFields | PlainMessage<FooWithExtraFields> | undefined): boolean;
}

/**
 * @generated from enum unittest_drop_unknown_fields.FooWithExtraFields.NestedEnum
 */
export declare enum FooWithExtraFields_NestedEnum {
  /**
   * @generated from enum value: FOO = 0;
   */
  FOO = 0,

  /**
   * @generated from enum value: BAR = 1;
   */
  BAR = 1,

  /**
   * @generated from enum value: BAZ = 2;
   */
  BAZ = 2,

  /**
   * @generated from enum value: MOO = 3;
   */
  MOO = 3,
}

