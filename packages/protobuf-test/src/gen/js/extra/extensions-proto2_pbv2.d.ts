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

// @generated by protoc-gen-es-next v1.7.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/extensions-proto2.proto (package proto2ext, syntax proto2)
/* eslint-disable */

import type { DescFile } from "@bufbuild/protobuf";
import type { Message } from "@bufbuild/protobuf/next";
import type { TypedDescEnum, TypedDescExtension, TypedDescMessage } from "@bufbuild/protobuf/next/codegenv1";
import type { User } from "./example_pbv2.js";

export declare const fileDesc_extra_extensions_proto2: DescFile;

/**
 * The message we're going to extend
 *
 * @generated from message proto2ext.Proto2Extendee
 */
export declare type Proto2Extendee = Message<"proto2ext.Proto2Extendee"> & {
  /**
   * @generated from field: optional int32 own_field = 1;
   */
  ownField: number;
};

// Describes the message proto2ext.Proto2Extendee. Use `create(Proto2ExtendeeDesc)` to create a new Proto2Extendee.
export declare const Proto2ExtendeeDesc: TypedDescMessage<Proto2Extendee>;

/**
 * A message used in extensions
 *
 * @generated from message proto2ext.Proto2ExtMessage
 */
export declare type Proto2ExtMessage = Message<"proto2ext.Proto2ExtMessage"> & {
  /**
   * @generated from field: optional string string_field = 1;
   */
  stringField: string;
};

// Describes the message proto2ext.Proto2ExtMessage. Use `create(Proto2ExtMessageDesc)` to create a new Proto2ExtMessage.
export declare const Proto2ExtMessageDesc: TypedDescMessage<Proto2ExtMessage>;

/**
 * @generated from message proto2ext.GroupExt
 */
export declare type GroupExt = Message<"proto2ext.GroupExt"> & {
  /**
   * @generated from field: optional int32 a = 1;
   */
  a: number;

  /**
   * @generated from field: optional int32 b = 2;
   */
  b: number;
};

// Describes the message proto2ext.GroupExt. Use `create(GroupExtDesc)` to create a new GroupExt.
export declare const GroupExtDesc: TypedDescMessage<GroupExt>;

/**
 * @generated from message proto2ext.RepeatedGroupExt
 */
export declare type RepeatedGroupExt = Message<"proto2ext.RepeatedGroupExt"> & {
  /**
   * @generated from field: optional int32 a = 1;
   */
  a: number;

  /**
   * @generated from field: optional int32 b = 2;
   */
  b: number;
};

// Describes the message proto2ext.RepeatedGroupExt. Use `create(RepeatedGroupExtDesc)` to create a new RepeatedGroupExt.
export declare const RepeatedGroupExtDesc: TypedDescMessage<RepeatedGroupExt>;

/**
 * A container for nested extensions
 *
 * @generated from message proto2ext.Proto2ExtContainer
 */
export declare type Proto2ExtContainer = Message<"proto2ext.Proto2ExtContainer"> & {
};

// Describes the message proto2ext.Proto2ExtContainer. Use `create(Proto2ExtContainerDesc)` to create a new Proto2ExtContainer.
export declare const Proto2ExtContainerDesc: TypedDescMessage<Proto2ExtContainer>;

/**
 * @generated from message proto2ext.Proto2ExtContainer.Child
 */
export declare type Proto2ExtContainer_Child = Message<"proto2ext.Proto2ExtContainer.Child"> & {
};

// Describes the message proto2ext.Proto2ExtContainer.Child. Use `create(Proto2ExtContainer_ChildDesc)` to create a new Proto2ExtContainer_Child.
export declare const Proto2ExtContainer_ChildDesc: TypedDescMessage<Proto2ExtContainer_Child>;

/**
 * @generated from extension: optional uint32 uint32_ext = 9010;
 */
export declare const Proto2ExtContainer_Child_uint32_ext: TypedDescExtension<Proto2Extendee, number>;

/**
 * @generated from extension: optional uint32 uint32_ext = 9001;
 */
export declare const Proto2ExtContainer_uint32_ext: TypedDescExtension<Proto2Extendee, number>;

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

// Describes the enum proto2ext.Proto2ExtEnum.
export declare const Proto2ExtEnumDesc: TypedDescEnum<Proto2ExtEnum>;

/**
 * @generated from extension: optional uint32 uint32_ext = 1001;
 */
export declare const uint32_ext: TypedDescExtension<Proto2Extendee, number>;

/**
 * @generated from extension: optional uint32 uint32_ext_with_default = 1002 [default = 999];
 */
export declare const uint32_ext_with_default: TypedDescExtension<Proto2Extendee, number>;

/**
 * @generated from extension: optional string string_ext = 2001;
 */
export declare const string_ext: TypedDescExtension<Proto2Extendee, string>;

/**
 * @generated from extension: optional string string_ext_with_default = 2002 [default = "hello \" *\/ "];
 */
export declare const string_ext_with_default: TypedDescExtension<Proto2Extendee, string>;

/**
 * @generated from extension: optional uint64 uint64_ext = 3001;
 */
export declare const uint64_ext: TypedDescExtension<Proto2Extendee, bigint>;

/**
 * @generated from extension: optional uint64 uint64_ext_js_string = 3002 [jstype = JS_STRING];
 */
export declare const uint64_ext_js_string: TypedDescExtension<Proto2Extendee, string>;

/**
 * @generated from extension: optional bytes bytes_ext = 4001;
 */
export declare const bytes_ext: TypedDescExtension<Proto2Extendee, Uint8Array>;

/**
 * @generated from extension: optional bytes bytes_ext_with_default = 4002 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
 */
export declare const bytes_ext_with_default: TypedDescExtension<Proto2Extendee, Uint8Array>;

/**
 * @generated from extension: optional proto2ext.Proto2ExtEnum enum_ext = 5001;
 */
export declare const enum_ext: TypedDescExtension<Proto2Extendee, Proto2ExtEnum>;

/**
 * @generated from extension: optional proto2ext.Proto2ExtEnum enum_ext_with_default = 5002 [default = PROTO2_EXT_ENUM_NO];
 */
export declare const enum_ext_with_default: TypedDescExtension<Proto2Extendee, Proto2ExtEnum>;

/**
 * @generated from extension: optional proto2ext.Proto2ExtMessage message_ext = 6001;
 */
export declare const message_ext: TypedDescExtension<Proto2Extendee, Proto2ExtMessage>;

/**
 * @generated from extension: optional docs.User message_ext_proto3 = 6002;
 */
export declare const message_ext_proto3: TypedDescExtension<Proto2Extendee, User>;

/**
 * @generated from extension: repeated proto2ext.Proto2ExtMessage repeated_message_ext = 7001;
 */
export declare const repeated_message_ext: TypedDescExtension<Proto2Extendee, Proto2ExtMessage[]>;

/**
 * @generated from extension: repeated proto2ext.Proto2ExtEnum repeated_enum_ext = 7005;
 */
export declare const repeated_enum_ext: TypedDescExtension<Proto2Extendee, Proto2ExtEnum[]>;

/**
 * @generated from extension: repeated string repeated_string_ext = 7002;
 */
export declare const repeated_string_ext: TypedDescExtension<Proto2Extendee, string[]>;

/**
 * @generated from extension: repeated uint32 packed_uint32_ext = 7003 [packed = true];
 */
export declare const packed_uint32_ext: TypedDescExtension<Proto2Extendee, number[]>;

/**
 * unpacked by default in proto2
 *
 * @generated from extension: repeated uint32 unpacked_uint32_ext = 7004;
 */
export declare const unpacked_uint32_ext: TypedDescExtension<Proto2Extendee, number[]>;

/**
 * @generated from extension: optional google.protobuf.UInt32Value wrapper_ext = 8001;
 */
export declare const wrapper_ext: TypedDescExtension<Proto2Extendee, number>;

/**
 * @generated from extension: optional proto2ext.GroupExt groupext = 8100;
 */
export declare const groupext: TypedDescExtension<Proto2Extendee, GroupExt>;

/**
 * @generated from extension: repeated proto2ext.RepeatedGroupExt repeatedgroupext = 8101;
 */
export declare const repeatedgroupext: TypedDescExtension<Proto2Extendee, RepeatedGroupExt[]>;

