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

// @generated by protoc-gen-es v1.7.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/extensions-proto2.proto (package proto2ext, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2, UInt32Value } from "@bufbuild/protobuf";
import { User } from "./example_pb.js";

/**
 * An enumeration used in extensions
 *
 * @generated from enum proto2ext.Proto2ExtEnum
 */
export enum Proto2ExtEnum {
  /**
   * @generated from enum value: PROTO2_EXT_ENUM_YES = 1;
   */
  YES = 1,

  /**
   * @generated from enum value: PROTO2_EXT_ENUM_NO = 2;
   */
  NO = 2,
}
// Retrieve enum metadata with: proto2.getEnumType(Proto2ExtEnum)
proto2.util.setEnumType(Proto2ExtEnum, "proto2ext.Proto2ExtEnum", [
  { no: 1, name: "PROTO2_EXT_ENUM_YES" },
  { no: 2, name: "PROTO2_EXT_ENUM_NO" },
]);

/**
 * The message we're going to extend
 *
 * @generated from message proto2ext.Proto2Extendee
 */
export class Proto2Extendee extends Message<Proto2Extendee> {
  /**
   * @generated from field: optional int32 own_field = 1;
   */
  ownField?: number;

  constructor(data?: PartialMessage<Proto2Extendee>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "proto2ext.Proto2Extendee";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "own_field", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2Extendee {
    return new Proto2Extendee().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2Extendee {
    return new Proto2Extendee().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2Extendee {
    return new Proto2Extendee().fromJsonString(jsonString, options);
  }

  static equals(a: Proto2Extendee | PlainMessage<Proto2Extendee> | undefined, b: Proto2Extendee | PlainMessage<Proto2Extendee> | undefined): boolean {
    return proto2.util.equals(Proto2Extendee, a, b);
  }
}

/**
 * A message used in extensions
 *
 * @generated from message proto2ext.Proto2ExtMessage
 */
export class Proto2ExtMessage extends Message<Proto2ExtMessage> {
  /**
   * @generated from field: optional string string_field = 1;
   */
  stringField?: string;

  constructor(data?: PartialMessage<Proto2ExtMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "proto2ext.Proto2ExtMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2ExtMessage {
    return new Proto2ExtMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2ExtMessage {
    return new Proto2ExtMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2ExtMessage {
    return new Proto2ExtMessage().fromJsonString(jsonString, options);
  }

  static equals(a: Proto2ExtMessage | PlainMessage<Proto2ExtMessage> | undefined, b: Proto2ExtMessage | PlainMessage<Proto2ExtMessage> | undefined): boolean {
    return proto2.util.equals(Proto2ExtMessage, a, b);
  }
}

/**
 * @generated from message proto2ext.GroupExt
 */
export class GroupExt extends Message<GroupExt> {
  /**
   * @generated from field: optional int32 a = 1;
   */
  a?: number;

  /**
   * @generated from field: optional int32 b = 2;
   */
  b?: number;

  constructor(data?: PartialMessage<GroupExt>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "proto2ext.GroupExt";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "a", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "b", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GroupExt {
    return new GroupExt().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GroupExt {
    return new GroupExt().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GroupExt {
    return new GroupExt().fromJsonString(jsonString, options);
  }

  static equals(a: GroupExt | PlainMessage<GroupExt> | undefined, b: GroupExt | PlainMessage<GroupExt> | undefined): boolean {
    return proto2.util.equals(GroupExt, a, b);
  }
}

/**
 * @generated from message proto2ext.RepeatedGroupExt
 */
export class RepeatedGroupExt extends Message<RepeatedGroupExt> {
  /**
   * @generated from field: optional int32 a = 1;
   */
  a?: number;

  /**
   * @generated from field: optional int32 b = 2;
   */
  b?: number;

  constructor(data?: PartialMessage<RepeatedGroupExt>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "proto2ext.RepeatedGroupExt";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "a", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "b", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RepeatedGroupExt {
    return new RepeatedGroupExt().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RepeatedGroupExt {
    return new RepeatedGroupExt().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RepeatedGroupExt {
    return new RepeatedGroupExt().fromJsonString(jsonString, options);
  }

  static equals(a: RepeatedGroupExt | PlainMessage<RepeatedGroupExt> | undefined, b: RepeatedGroupExt | PlainMessage<RepeatedGroupExt> | undefined): boolean {
    return proto2.util.equals(RepeatedGroupExt, a, b);
  }
}

/**
 * A container for nested extensions
 *
 * @generated from message proto2ext.Proto2ExtContainer
 */
export class Proto2ExtContainer extends Message<Proto2ExtContainer> {
  constructor(data?: PartialMessage<Proto2ExtContainer>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "proto2ext.Proto2ExtContainer";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2ExtContainer {
    return new Proto2ExtContainer().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2ExtContainer {
    return new Proto2ExtContainer().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2ExtContainer {
    return new Proto2ExtContainer().fromJsonString(jsonString, options);
  }

  static equals(a: Proto2ExtContainer | PlainMessage<Proto2ExtContainer> | undefined, b: Proto2ExtContainer | PlainMessage<Proto2ExtContainer> | undefined): boolean {
    return proto2.util.equals(Proto2ExtContainer, a, b);
  }
}

/**
 * @generated from message proto2ext.Proto2ExtContainer.Child
 */
export class Proto2ExtContainer_Child extends Message<Proto2ExtContainer_Child> {
  constructor(data?: PartialMessage<Proto2ExtContainer_Child>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "proto2ext.Proto2ExtContainer.Child";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2ExtContainer_Child {
    return new Proto2ExtContainer_Child().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2ExtContainer_Child {
    return new Proto2ExtContainer_Child().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2ExtContainer_Child {
    return new Proto2ExtContainer_Child().fromJsonString(jsonString, options);
  }

  static equals(a: Proto2ExtContainer_Child | PlainMessage<Proto2ExtContainer_Child> | undefined, b: Proto2ExtContainer_Child | PlainMessage<Proto2ExtContainer_Child> | undefined): boolean {
    return proto2.util.equals(Proto2ExtContainer_Child, a, b);
  }
}

/**
 * @generated from extension: optional uint32 uint32_ext = 9010;
 */
export const Proto2ExtContainer_Child_uint32_ext = proto2.makeExtension<Proto2Extendee, number>(
  "proto2ext.Proto2ExtContainer.Child.uint32_ext", 
  Proto2Extendee, 
  { no: 9010, kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
);

/**
 * @generated from extension: optional uint32 uint32_ext = 9001;
 */
export const Proto2ExtContainer_uint32_ext = proto2.makeExtension<Proto2Extendee, number>(
  "proto2ext.Proto2ExtContainer.uint32_ext", 
  Proto2Extendee, 
  { no: 9001, kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
);

/**
 * @generated from extension: optional uint32 uint32_ext = 1001;
 */
export const uint32_ext = proto2.makeExtension<Proto2Extendee, number>(
  "proto2ext.uint32_ext", 
  Proto2Extendee, 
  { no: 1001, kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
);

/**
 * @generated from extension: optional uint32 uint32_ext_with_default = 1002 [default = 999];
 */
export const uint32_ext_with_default = proto2.makeExtension<Proto2Extendee, number>(
  "proto2ext.uint32_ext_with_default", 
  Proto2Extendee, 
  { no: 1002, kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true, default: 999 },
);

/**
 * @generated from extension: optional string string_ext = 2001;
 */
export const string_ext = proto2.makeExtension<Proto2Extendee, string>(
  "proto2ext.string_ext", 
  Proto2Extendee, 
  { no: 2001, kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
);

/**
 * @generated from extension: optional string string_ext_with_default = 2002 [default = "hello \" *\/ "];
 */
export const string_ext_with_default = proto2.makeExtension<Proto2Extendee, string>(
  "proto2ext.string_ext_with_default", 
  Proto2Extendee, 
  { no: 2002, kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true, default: "hello \" */ " },
);

/**
 * @generated from extension: optional uint64 uint64_ext = 3001;
 */
export const uint64_ext = proto2.makeExtension<Proto2Extendee, bigint>(
  "proto2ext.uint64_ext", 
  Proto2Extendee, 
  { no: 3001, kind: "scalar", T: 4 /* ScalarType.UINT64 */, opt: true },
);

/**
 * @generated from extension: optional uint64 uint64_ext_js_string = 3002 [jstype = JS_STRING];
 */
export const uint64_ext_js_string = proto2.makeExtension<Proto2Extendee, string>(
  "proto2ext.uint64_ext_js_string", 
  Proto2Extendee, 
  { no: 3002, kind: "scalar", T: 4 /* ScalarType.UINT64 */, L: 1 /* LongType.STRING */, opt: true },
);

/**
 * @generated from extension: optional bytes bytes_ext = 4001;
 */
export const bytes_ext = proto2.makeExtension<Proto2Extendee, Uint8Array>(
  "proto2ext.bytes_ext", 
  Proto2Extendee, 
  { no: 4001, kind: "scalar", T: 12 /* ScalarType.BYTES */, opt: true },
);

/**
 * @generated from extension: optional bytes bytes_ext_with_default = 4002 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
 */
export const bytes_ext_with_default = proto2.makeExtension<Proto2Extendee, Uint8Array>(
  "proto2ext.bytes_ext_with_default", 
  Proto2Extendee, 
  { no: 4002, kind: "scalar", T: 12 /* ScalarType.BYTES */, opt: true, default: new Uint8Array([0x00, 0x78, 0x5C, 0x78, 0x78, 0x41, 0x41, 0x41, 0x41, 0x41, 0x41, 0x08, 0x0C, 0x0A, 0x0D, 0x09, 0x0B]) },
);

/**
 * @generated from extension: optional proto2ext.Proto2ExtEnum enum_ext = 5001;
 */
export const enum_ext = proto2.makeExtension<Proto2Extendee, Proto2ExtEnum>(
  "proto2ext.enum_ext", 
  Proto2Extendee, 
  () => ({ no: 5001, kind: "enum", T: proto2.getEnumType(Proto2ExtEnum), opt: true }),
);

/**
 * @generated from extension: optional proto2ext.Proto2ExtEnum enum_ext_with_default = 5002 [default = PROTO2_EXT_ENUM_NO];
 */
export const enum_ext_with_default = proto2.makeExtension<Proto2Extendee, Proto2ExtEnum>(
  "proto2ext.enum_ext_with_default", 
  Proto2Extendee, 
  () => ({ no: 5002, kind: "enum", T: proto2.getEnumType(Proto2ExtEnum), opt: true, default: Proto2ExtEnum.NO }),
);

/**
 * @generated from extension: optional proto2ext.Proto2ExtMessage message_ext = 6001;
 */
export const message_ext = proto2.makeExtension<Proto2Extendee, Proto2ExtMessage>(
  "proto2ext.message_ext", 
  Proto2Extendee, 
  () => ({ no: 6001, kind: "message", T: Proto2ExtMessage, opt: true }),
);

/**
 * @generated from extension: optional docs.User message_ext_proto3 = 6002;
 */
export const message_ext_proto3 = proto2.makeExtension<Proto2Extendee, User>(
  "proto2ext.message_ext_proto3", 
  Proto2Extendee, 
  () => ({ no: 6002, kind: "message", T: User, opt: true }),
);

/**
 * @generated from extension: repeated proto2ext.Proto2ExtMessage repeated_message_ext = 7001;
 */
export const repeated_message_ext = proto2.makeExtension<Proto2Extendee, Proto2ExtMessage[]>(
  "proto2ext.repeated_message_ext", 
  Proto2Extendee, 
  () => ({ no: 7001, kind: "message", T: Proto2ExtMessage, repeated: true }),
);

/**
 * @generated from extension: repeated proto2ext.Proto2ExtEnum repeated_enum_ext = 7005;
 */
export const repeated_enum_ext = proto2.makeExtension<Proto2Extendee, Proto2ExtEnum[]>(
  "proto2ext.repeated_enum_ext", 
  Proto2Extendee, 
  () => ({ no: 7005, kind: "enum", T: proto2.getEnumType(Proto2ExtEnum), repeated: true }),
);

/**
 * @generated from extension: repeated string repeated_string_ext = 7002;
 */
export const repeated_string_ext = proto2.makeExtension<Proto2Extendee, string[]>(
  "proto2ext.repeated_string_ext", 
  Proto2Extendee, 
  { no: 7002, kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
);

/**
 * @generated from extension: repeated uint32 packed_uint32_ext = 7003 [packed = true];
 */
export const packed_uint32_ext = proto2.makeExtension<Proto2Extendee, number[]>(
  "proto2ext.packed_uint32_ext", 
  Proto2Extendee, 
  { no: 7003, kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true, packed: true },
);

/**
 * unpacked by default in proto2
 *
 * @generated from extension: repeated uint32 unpacked_uint32_ext = 7004;
 */
export const unpacked_uint32_ext = proto2.makeExtension<Proto2Extendee, number[]>(
  "proto2ext.unpacked_uint32_ext", 
  Proto2Extendee, 
  { no: 7004, kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true },
);

/**
 * @generated from extension: optional google.protobuf.UInt32Value wrapper_ext = 8001;
 */
export const wrapper_ext = proto2.makeExtension<Proto2Extendee, number>(
  "proto2ext.wrapper_ext", 
  Proto2Extendee, 
  () => ({ no: 8001, kind: "message", T: UInt32Value, opt: true }),
);

/**
 * @generated from extension: optional proto2ext.GroupExt groupext = 8100;
 */
export const groupext = proto2.makeExtension<Proto2Extendee, GroupExt>(
  "proto2ext.groupext", 
  Proto2Extendee, 
  () => ({ no: 8100, kind: "message", T: GroupExt, delimited: true, opt: true }),
);

/**
 * @generated from extension: repeated proto2ext.RepeatedGroupExt repeatedgroupext = 8101;
 */
export const repeatedgroupext = proto2.makeExtension<Proto2Extendee, RepeatedGroupExt[]>(
  "proto2ext.repeatedgroupext", 
  Proto2Extendee, 
  () => ({ no: 8101, kind: "message", T: RepeatedGroupExt, delimited: true, repeated: true }),
);

