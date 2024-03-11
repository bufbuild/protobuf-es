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

// @generated by protoc-gen-es-next v1.7.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_proto3_bad_macros.proto (package protobuf_unittest, syntax proto3)
/* eslint-disable */

import type { DescFile } from "@bufbuild/protobuf";
import type { TypedDescEnum } from "@bufbuild/protobuf/next/codegenv1";
import { enumDesc, fileDesc } from "@bufbuild/protobuf/next/codegenv1";

export const fileDesc_google_protobuf_unittest_proto3_bad_macros: DescFile = fileDesc("CjBnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfcHJvdG8zX2JhZF9tYWNyb3MucHJvdG8SEXByb3RvYnVmX3VuaXR0ZXN0KhUKA0dJRBIOCgpHSURfVU5VU0VEEAAqFQoDVUlEEg4KClVJRF9VTlVTRUQQACroAwoIQmFkTmFtZXMSCwoHUEFDS0FHRRAAEgoKBlBBQ0tFRBABEgkKBWxpbnV4EAISCgoGRE9NQUlOEAMSCAoEVFJVRRAEEgkKBUZBTFNFEAUSDgoKQ1JFQVRFX05FVxAGEgoKBkRFTEVURRAHEhAKDERPVUJMRV9DTElDSxAIEgkKBUVSUk9SEAkSDgoKRVJST1JfQlVTWRAKEhgKFEVSUk9SX0lOU1RBTExfRkFJTEVEEAsSEwoPRVJST1JfTk9UX0ZPVU5EEAwSEAoMR2V0Q2xhc3NOYW1lEA0SEgoOR2V0Q3VycmVudFRpbWUQDhIOCgpHZXRNZXNzYWdlEA8SDQoJR2V0T2JqZWN0EBASCgoGSUdOT1JFEBESBgoCSU4QEhISCg5JTlBVVF9LRVlCT0FSRBATEgwKCE5PX0VSUk9SEBQSBwoDT1VUEBUSDAoIT1BUSU9OQUwQFhIICgRORUFSEBcSCwoHTk9fREFUQRAYEhIKDlJFQVNPTl9VTktOT1dOEBkSFAoQU0VSVklDRV9ESVNBQkxFRBAaEhIKDlNFVkVSSVRZX0VSUk9SEBsSEgoOU1RBVFVTX1BFTkRJTkcQHBIKCgZTVFJJQ1QQHRINCglUWVBFX0JPT0wQHhIJCgVERUJVRxAfQjgKIWNvbS5nb29nbGUucHJvdG9idWYudGVzdGluZy5wcm90b1ABqgIQUHJvdG9idWZVbml0dGVzdGIGcHJvdG8z");

/**
 * This generates `GID_MAX`, which is a macro in some circumstances.
 *
 * @generated from enum protobuf_unittest.GID
 */
export enum GID {
  /**
   * @generated from enum value: GID_UNUSED = 0;
   */
  GID_UNUSED = 0,
}

// Describes the enum protobuf_unittest.GID.
export const GIDDesc: TypedDescEnum<GID> = enumDesc(fileDesc_google_protobuf_unittest_proto3_bad_macros, 0);

/**
 * This generates `UID_MAX`, which is a mcro in some circumstances.
 *
 * @generated from enum protobuf_unittest.UID
 */
export enum UID {
  /**
   * @generated from enum value: UID_UNUSED = 0;
   */
  UID_UNUSED = 0,
}

// Describes the enum protobuf_unittest.UID.
export const UIDDesc: TypedDescEnum<UID> = enumDesc(fileDesc_google_protobuf_unittest_proto3_bad_macros, 1);

/**
 * Just a container for bad macro names. Some of these do not follow the normal
 * naming conventions, this is intentional, we just want to trigger a build
 * failure if the macro is left defined.
 *
 * @generated from enum protobuf_unittest.BadNames
 */
export enum BadNames {
  /**
   * autoheader defines this in some circumstances.
   *
   * @generated from enum value: PACKAGE = 0;
   */
  PACKAGE = 0,

  /**
   * The comment says "a few common headers define this".
   *
   * @generated from enum value: PACKED = 1;
   */
  PACKED = 1,

  /**
   * Defined in many Linux system headers.
   *
   * @generated from enum value: linux = 2;
   */
  linux = 2,

  /**
   * This is often a macro in `<math.h>`.
   *
   * @generated from enum value: DOMAIN = 3;
   */
  DOMAIN = 3,

  /**
   * These are defined in both Windows and macOS headers.
   *
   * @generated from enum value: TRUE = 4;
   */
  TRUE = 4,

  /**
   * @generated from enum value: FALSE = 5;
   */
  FALSE = 5,

  /**
   * Sometimes defined in Windows system headers.
   *
   * @generated from enum value: CREATE_NEW = 6;
   */
  CREATE_NEW = 6,

  /**
   * @generated from enum value: DELETE = 7;
   */
  DELETE = 7,

  /**
   * @generated from enum value: DOUBLE_CLICK = 8;
   */
  DOUBLE_CLICK = 8,

  /**
   * @generated from enum value: ERROR = 9;
   */
  ERROR = 9,

  /**
   * @generated from enum value: ERROR_BUSY = 10;
   */
  ERROR_BUSY = 10,

  /**
   * @generated from enum value: ERROR_INSTALL_FAILED = 11;
   */
  ERROR_INSTALL_FAILED = 11,

  /**
   * @generated from enum value: ERROR_NOT_FOUND = 12;
   */
  ERROR_NOT_FOUND = 12,

  /**
   * @generated from enum value: GetClassName = 13;
   */
  GetClassName = 13,

  /**
   * @generated from enum value: GetCurrentTime = 14;
   */
  GetCurrentTime = 14,

  /**
   * @generated from enum value: GetMessage = 15;
   */
  GetMessage = 15,

  /**
   * @generated from enum value: GetObject = 16;
   */
  GetObject = 16,

  /**
   * @generated from enum value: IGNORE = 17;
   */
  IGNORE = 17,

  /**
   * @generated from enum value: IN = 18;
   */
  IN = 18,

  /**
   * @generated from enum value: INPUT_KEYBOARD = 19;
   */
  INPUT_KEYBOARD = 19,

  /**
   * @generated from enum value: NO_ERROR = 20;
   */
  NO_ERROR = 20,

  /**
   * @generated from enum value: OUT = 21;
   */
  OUT = 21,

  /**
   * @generated from enum value: OPTIONAL = 22;
   */
  OPTIONAL = 22,

  /**
   * @generated from enum value: NEAR = 23;
   */
  NEAR = 23,

  /**
   * @generated from enum value: NO_DATA = 24;
   */
  NO_DATA = 24,

  /**
   * @generated from enum value: REASON_UNKNOWN = 25;
   */
  REASON_UNKNOWN = 25,

  /**
   * @generated from enum value: SERVICE_DISABLED = 26;
   */
  SERVICE_DISABLED = 26,

  /**
   * @generated from enum value: SEVERITY_ERROR = 27;
   */
  SEVERITY_ERROR = 27,

  /**
   * @generated from enum value: STATUS_PENDING = 28;
   */
  STATUS_PENDING = 28,

  /**
   * @generated from enum value: STRICT = 29;
   */
  STRICT = 29,

  /**
   * Sometimed defined in macOS system headers.
   *
   * @generated from enum value: TYPE_BOOL = 30;
   */
  TYPE_BOOL = 30,

  /**
   * Defined in macOS, Windows, and Linux headers.
   *
   * @generated from enum value: DEBUG = 31;
   */
  DEBUG = 31,
}

// Describes the enum protobuf_unittest.BadNames.
export const BadNamesDesc: TypedDescEnum<BadNames> = enumDesc(fileDesc_google_protobuf_unittest_proto3_bad_macros, 2);

