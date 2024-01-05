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

// @generated by protoc-gen-es v1.6.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/msg-maps.proto (package spec, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum spec.MapsEnum
 */
export enum MapsEnum {
  /**
   * @generated from enum value: MAPS_ENUM_ANY = 0;
   */
  ANY = 0,

  /**
   * @generated from enum value: MAPS_ENUM_YES = 1;
   */
  YES = 1,

  /**
   * @generated from enum value: MAPS_ENUM_NO = 2;
   */
  NO = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(MapsEnum)
proto3.util.setEnumType(MapsEnum, "spec.MapsEnum", [
  { no: 0, name: "MAPS_ENUM_ANY" },
  { no: 1, name: "MAPS_ENUM_YES" },
  { no: 2, name: "MAPS_ENUM_NO" },
]);

/**
 * @generated from message spec.MapsMessage
 */
export class MapsMessage extends Message<MapsMessage> {
  /**
   * @generated from field: map<string, string> str_str_field = 1;
   */
  strStrField: { [key: string]: string } = {};

  /**
   * @generated from field: map<string, int32> str_int32_field = 2;
   */
  strInt32Field: { [key: string]: number } = {};

  /**
   * @generated from field: map<string, int64> str_int64_field = 3;
   */
  strInt64Field: { [key: string]: bigint } = {};

  /**
   * @generated from field: map<string, bool> str_bool_field = 4;
   */
  strBoolField: { [key: string]: boolean } = {};

  /**
   * @generated from field: map<string, bytes> str_bytes_field = 5;
   */
  strBytesField: { [key: string]: Uint8Array } = {};

  /**
   * @generated from field: map<int32, string> int32_str_field = 6;
   */
  int32StrField: { [key: number]: string } = {};

  /**
   * @generated from field: map<int64, string> int64_str_field = 7;
   */
  int64StrField: { [key: string]: string } = {};

  /**
   * @generated from field: map<bool, string> bool_str_field = 8;
   */
  boolStrField: { [key: string]: string } = {};

  /**
   * @generated from field: map<string, spec.MapsMessage> str_msg_field = 9;
   */
  strMsgField: { [key: string]: MapsMessage } = {};

  /**
   * @generated from field: map<int32, spec.MapsMessage> int32_msg_field = 10;
   */
  int32MsgField: { [key: number]: MapsMessage } = {};

  /**
   * @generated from field: map<int64, spec.MapsMessage> int64_msg_field = 11;
   */
  int64MsgField: { [key: string]: MapsMessage } = {};

  /**
   * @generated from field: map<string, spec.MapsEnum> str_enu_field = 12;
   */
  strEnuField: { [key: string]: MapsEnum } = {};

  /**
   * @generated from field: map<int32, spec.MapsEnum> int32_enu_field = 13;
   */
  int32EnuField: { [key: number]: MapsEnum } = {};

  /**
   * @generated from field: map<int64, spec.MapsEnum> int64_enu_field = 14;
   */
  int64EnuField: { [key: string]: MapsEnum } = {};

  constructor(data?: PartialMessage<MapsMessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "spec.MapsMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "str_str_field", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
    { no: 2, name: "str_int32_field", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 5 /* ScalarType.INT32 */} },
    { no: 3, name: "str_int64_field", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 3 /* ScalarType.INT64 */} },
    { no: 4, name: "str_bool_field", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 8 /* ScalarType.BOOL */} },
    { no: 5, name: "str_bytes_field", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 12 /* ScalarType.BYTES */} },
    { no: 6, name: "int32_str_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
    { no: 7, name: "int64_str_field", kind: "map", K: 3 /* ScalarType.INT64 */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
    { no: 8, name: "bool_str_field", kind: "map", K: 8 /* ScalarType.BOOL */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
    { no: 9, name: "str_msg_field", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "message", T: MapsMessage} },
    { no: 10, name: "int32_msg_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: MapsMessage} },
    { no: 11, name: "int64_msg_field", kind: "map", K: 3 /* ScalarType.INT64 */, V: {kind: "message", T: MapsMessage} },
    { no: 12, name: "str_enu_field", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "enum", T: proto3.getEnumType(MapsEnum)} },
    { no: 13, name: "int32_enu_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto3.getEnumType(MapsEnum)} },
    { no: 14, name: "int64_enu_field", kind: "map", K: 3 /* ScalarType.INT64 */, V: {kind: "enum", T: proto3.getEnumType(MapsEnum)} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MapsMessage {
    return new MapsMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MapsMessage {
    return new MapsMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MapsMessage {
    return new MapsMessage().fromJsonString(jsonString, options);
  }

  static equals(a: MapsMessage | PlainMessage<MapsMessage> | undefined, b: MapsMessage | PlainMessage<MapsMessage> | undefined): boolean {
    return proto3.util.equals(MapsMessage, a, b);
  }
}

