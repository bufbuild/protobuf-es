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

// @generated by protoc-gen-es v1.8.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/msg-maps.proto (package spec, syntax proto3)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

export const fileDesc_extra_msg_maps: GenDescFile = /*@__PURE__*/
  fileDesc("ChRleHRyYS9tc2ctbWFwcy5wcm90bxIEc3BlYyLEDQoLTWFwc01lc3NhZ2USOQoNc3RyX3N0cl9maWVsZBgBIAMoCzIiLnNwZWMuTWFwc01lc3NhZ2UuU3RyU3RyRmllbGRFbnRyeRI9Cg9zdHJfaW50MzJfZmllbGQYAiADKAsyJC5zcGVjLk1hcHNNZXNzYWdlLlN0ckludDMyRmllbGRFbnRyeRI9Cg9zdHJfaW50NjRfZmllbGQYAyADKAsyJC5zcGVjLk1hcHNNZXNzYWdlLlN0ckludDY0RmllbGRFbnRyeRI7Cg5zdHJfYm9vbF9maWVsZBgEIAMoCzIjLnNwZWMuTWFwc01lc3NhZ2UuU3RyQm9vbEZpZWxkRW50cnkSPQoPc3RyX2J5dGVzX2ZpZWxkGAUgAygLMiQuc3BlYy5NYXBzTWVzc2FnZS5TdHJCeXRlc0ZpZWxkRW50cnkSPQoPaW50MzJfc3RyX2ZpZWxkGAYgAygLMiQuc3BlYy5NYXBzTWVzc2FnZS5JbnQzMlN0ckZpZWxkRW50cnkSPQoPaW50NjRfc3RyX2ZpZWxkGAcgAygLMiQuc3BlYy5NYXBzTWVzc2FnZS5JbnQ2NFN0ckZpZWxkRW50cnkSOwoOYm9vbF9zdHJfZmllbGQYCCADKAsyIy5zcGVjLk1hcHNNZXNzYWdlLkJvb2xTdHJGaWVsZEVudHJ5EjkKDXN0cl9tc2dfZmllbGQYCSADKAsyIi5zcGVjLk1hcHNNZXNzYWdlLlN0ck1zZ0ZpZWxkRW50cnkSPQoPaW50MzJfbXNnX2ZpZWxkGAogAygLMiQuc3BlYy5NYXBzTWVzc2FnZS5JbnQzMk1zZ0ZpZWxkRW50cnkSPQoPaW50NjRfbXNnX2ZpZWxkGAsgAygLMiQuc3BlYy5NYXBzTWVzc2FnZS5JbnQ2NE1zZ0ZpZWxkRW50cnkSOQoNc3RyX2VudV9maWVsZBgMIAMoCzIiLnNwZWMuTWFwc01lc3NhZ2UuU3RyRW51RmllbGRFbnRyeRI9Cg9pbnQzMl9lbnVfZmllbGQYDSADKAsyJC5zcGVjLk1hcHNNZXNzYWdlLkludDMyRW51RmllbGRFbnRyeRI9Cg9pbnQ2NF9lbnVfZmllbGQYDiADKAsyJC5zcGVjLk1hcHNNZXNzYWdlLkludDY0RW51RmllbGRFbnRyeRoyChBTdHJTdHJGaWVsZEVudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEaNAoSU3RySW50MzJGaWVsZEVudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoBToCOAEaNAoSU3RySW50NjRGaWVsZEVudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoAzoCOAEaMwoRU3RyQm9vbEZpZWxkRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgIOgI4ARo0ChJTdHJCeXRlc0ZpZWxkRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgMOgI4ARo0ChJJbnQzMlN0ckZpZWxkRW50cnkSCwoDa2V5GAEgASgFEg0KBXZhbHVlGAIgASgJOgI4ARo0ChJJbnQ2NFN0ckZpZWxkRW50cnkSCwoDa2V5GAEgASgDEg0KBXZhbHVlGAIgASgJOgI4ARozChFCb29sU3RyRmllbGRFbnRyeRILCgNrZXkYASABKAgSDQoFdmFsdWUYAiABKAk6AjgBGkUKEFN0ck1zZ0ZpZWxkRW50cnkSCwoDa2V5GAEgASgJEiAKBXZhbHVlGAIgASgLMhEuc3BlYy5NYXBzTWVzc2FnZToCOAEaRwoSSW50MzJNc2dGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIgCgV2YWx1ZRgCIAEoCzIRLnNwZWMuTWFwc01lc3NhZ2U6AjgBGkcKEkludDY0TXNnRmllbGRFbnRyeRILCgNrZXkYASABKAMSIAoFdmFsdWUYAiABKAsyES5zcGVjLk1hcHNNZXNzYWdlOgI4ARpCChBTdHJFbnVGaWVsZEVudHJ5EgsKA2tleRgBIAEoCRIdCgV2YWx1ZRgCIAEoDjIOLnNwZWMuTWFwc0VudW06AjgBGkQKEkludDMyRW51RmllbGRFbnRyeRILCgNrZXkYASABKAUSHQoFdmFsdWUYAiABKA4yDi5zcGVjLk1hcHNFbnVtOgI4ARpEChJJbnQ2NEVudUZpZWxkRW50cnkSCwoDa2V5GAEgASgDEh0KBXZhbHVlGAIgASgOMg4uc3BlYy5NYXBzRW51bToCOAEqQgoITWFwc0VudW0SEQoNTUFQU19FTlVNX0FOWRAAEhEKDU1BUFNfRU5VTV9ZRVMQARIQCgxNQVBTX0VOVU1fTk8QAmIGcHJvdG8z");

/**
 * @generated from message spec.MapsMessage
 */
export type MapsMessage = Message<"spec.MapsMessage"> & {
  /**
   * @generated from field: map<string, string> str_str_field = 1;
   */
  strStrField: { [key: string]: string };

  /**
   * @generated from field: map<string, int32> str_int32_field = 2;
   */
  strInt32Field: { [key: string]: number };

  /**
   * @generated from field: map<string, int64> str_int64_field = 3;
   */
  strInt64Field: { [key: string]: bigint };

  /**
   * @generated from field: map<string, bool> str_bool_field = 4;
   */
  strBoolField: { [key: string]: boolean };

  /**
   * @generated from field: map<string, bytes> str_bytes_field = 5;
   */
  strBytesField: { [key: string]: Uint8Array };

  /**
   * @generated from field: map<int32, string> int32_str_field = 6;
   */
  int32StrField: { [key: number]: string };

  /**
   * @generated from field: map<int64, string> int64_str_field = 7;
   */
  int64StrField: { [key: string]: string };

  /**
   * @generated from field: map<bool, string> bool_str_field = 8;
   */
  boolStrField: { [key: string]: string };

  /**
   * @generated from field: map<string, spec.MapsMessage> str_msg_field = 9;
   */
  strMsgField: { [key: string]: MapsMessage };

  /**
   * @generated from field: map<int32, spec.MapsMessage> int32_msg_field = 10;
   */
  int32MsgField: { [key: number]: MapsMessage };

  /**
   * @generated from field: map<int64, spec.MapsMessage> int64_msg_field = 11;
   */
  int64MsgField: { [key: string]: MapsMessage };

  /**
   * @generated from field: map<string, spec.MapsEnum> str_enu_field = 12;
   */
  strEnuField: { [key: string]: MapsEnum };

  /**
   * @generated from field: map<int32, spec.MapsEnum> int32_enu_field = 13;
   */
  int32EnuField: { [key: number]: MapsEnum };

  /**
   * @generated from field: map<int64, spec.MapsEnum> int64_enu_field = 14;
   */
  int64EnuField: { [key: string]: MapsEnum };
};

// Describes the message spec.MapsMessage.
// Use `create(MapsMessageDesc)` to create a new MapsMessage.
export const MapsMessageDesc: GenDescMessage<MapsMessage> = /*@__PURE__*/
  messageDesc(fileDesc_extra_msg_maps, 0);

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

// Describes the enum spec.MapsEnum.
export const MapsEnumDesc: GenDescEnum<MapsEnum> = /*@__PURE__*/
  enumDesc(fileDesc_extra_msg_maps, 0);

