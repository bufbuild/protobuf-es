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

// @generated by protoc-gen-es v0.0.7 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_drop_unknown_fields.proto (package unittest_drop_unknown_fields, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message unittest_drop_unknown_fields.Foo
 */
export class Foo extends Message<Foo> {
  /**
   * @generated from field: int32 int32_value = 1;
   */
  int32Value = 0;

  /**
   * @generated from field: unittest_drop_unknown_fields.Foo.NestedEnum enum_value = 2;
   */
  enumValue = Foo_NestedEnum.FOO;

  constructor(data?: PartialMessage<Foo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "unittest_drop_unknown_fields.Foo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "int32_value", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "enum_value", kind: "enum", T: proto3.getEnumType(Foo_NestedEnum) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Foo {
    return new Foo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Foo {
    return new Foo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Foo {
    return new Foo().fromJsonString(jsonString, options);
  }

  static equals(a: Foo | PlainMessage<Foo> | undefined, b: Foo | PlainMessage<Foo> | undefined): boolean {
    return proto3.util.equals(Foo, a, b);
  }
}

/**
 * @generated from enum unittest_drop_unknown_fields.Foo.NestedEnum
 */
export enum Foo_NestedEnum {
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
// Retrieve enum metadata with: proto3.getEnumType(Foo_NestedEnum)
proto3.util.setEnumType(Foo_NestedEnum, "unittest_drop_unknown_fields.Foo.NestedEnum", [
  { no: 0, name: "FOO" },
  { no: 1, name: "BAR" },
  { no: 2, name: "BAZ" },
]);

/**
 * @generated from message unittest_drop_unknown_fields.FooWithExtraFields
 */
export class FooWithExtraFields extends Message<FooWithExtraFields> {
  /**
   * @generated from field: int32 int32_value = 1;
   */
  int32Value = 0;

  /**
   * @generated from field: unittest_drop_unknown_fields.FooWithExtraFields.NestedEnum enum_value = 2;
   */
  enumValue = FooWithExtraFields_NestedEnum.FOO;

  /**
   * @generated from field: int32 extra_int32_value = 3;
   */
  extraInt32Value = 0;

  constructor(data?: PartialMessage<FooWithExtraFields>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "unittest_drop_unknown_fields.FooWithExtraFields";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "int32_value", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "enum_value", kind: "enum", T: proto3.getEnumType(FooWithExtraFields_NestedEnum) },
    { no: 3, name: "extra_int32_value", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FooWithExtraFields {
    return new FooWithExtraFields().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FooWithExtraFields {
    return new FooWithExtraFields().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FooWithExtraFields {
    return new FooWithExtraFields().fromJsonString(jsonString, options);
  }

  static equals(a: FooWithExtraFields | PlainMessage<FooWithExtraFields> | undefined, b: FooWithExtraFields | PlainMessage<FooWithExtraFields> | undefined): boolean {
    return proto3.util.equals(FooWithExtraFields, a, b);
  }
}

/**
 * @generated from enum unittest_drop_unknown_fields.FooWithExtraFields.NestedEnum
 */
export enum FooWithExtraFields_NestedEnum {
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
   * @generated from enum value: QUX = 3;
   */
  QUX = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(FooWithExtraFields_NestedEnum)
proto3.util.setEnumType(FooWithExtraFields_NestedEnum, "unittest_drop_unknown_fields.FooWithExtraFields.NestedEnum", [
  { no: 0, name: "FOO" },
  { no: 1, name: "BAR" },
  { no: 2, name: "BAZ" },
  { no: 3, name: "QUX" },
]);

