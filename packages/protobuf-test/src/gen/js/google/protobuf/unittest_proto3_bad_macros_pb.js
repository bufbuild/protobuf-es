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

// @generated by protoc-gen-es v2.0.0-alpha.4 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js,json_types=true"
// @generated from file google/protobuf/unittest_proto3_bad_macros.proto (package protobuf_unittest, syntax proto3)
/* eslint-disable */

import { enumDesc, fileDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";

/**
 * Describes the file google/protobuf/unittest_proto3_bad_macros.proto.
 */
export const file_google_protobuf_unittest_proto3_bad_macros = /*@__PURE__*/
  fileDesc("CjBnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfcHJvdG8zX2JhZF9tYWNyb3MucHJvdG8SEXByb3RvYnVmX3VuaXR0ZXN0KhUKA0dJRBIOCgpHSURfVU5VU0VEEAAqFQoDVUlEEg4KClVJRF9VTlVTRUQQACroAwoIQmFkTmFtZXMSCwoHUEFDS0FHRRAAEgoKBlBBQ0tFRBABEgkKBWxpbnV4EAISCgoGRE9NQUlOEAMSCAoEVFJVRRAEEgkKBUZBTFNFEAUSDgoKQ1JFQVRFX05FVxAGEgoKBkRFTEVURRAHEhAKDERPVUJMRV9DTElDSxAIEgkKBUVSUk9SEAkSDgoKRVJST1JfQlVTWRAKEhgKFEVSUk9SX0lOU1RBTExfRkFJTEVEEAsSEwoPRVJST1JfTk9UX0ZPVU5EEAwSEAoMR2V0Q2xhc3NOYW1lEA0SEgoOR2V0Q3VycmVudFRpbWUQDhIOCgpHZXRNZXNzYWdlEA8SDQoJR2V0T2JqZWN0EBASCgoGSUdOT1JFEBESBgoCSU4QEhISCg5JTlBVVF9LRVlCT0FSRBATEgwKCE5PX0VSUk9SEBQSBwoDT1VUEBUSDAoIT1BUSU9OQUwQFhIICgRORUFSEBcSCwoHTk9fREFUQRAYEhIKDlJFQVNPTl9VTktOT1dOEBkSFAoQU0VSVklDRV9ESVNBQkxFRBAaEhIKDlNFVkVSSVRZX0VSUk9SEBsSEgoOU1RBVFVTX1BFTkRJTkcQHBIKCgZTVFJJQ1QQHRINCglUWVBFX0JPT0wQHhIJCgVERUJVRxAfQjgKIWNvbS5nb29nbGUucHJvdG9idWYudGVzdGluZy5wcm90b1ABqgIQUHJvdG9idWZVbml0dGVzdGIGcHJvdG8z");

/**
 * Describes the enum protobuf_unittest.GID.
 */
export const GIDSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_unittest_proto3_bad_macros, 0);

/**
 * This generates `GID_MAX`, which is a macro in some circumstances.
 *
 * @generated from enum protobuf_unittest.GID
 */
export const GID = /*@__PURE__*/
  tsEnum(GIDSchema);

/**
 * Describes the enum protobuf_unittest.UID.
 */
export const UIDSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_unittest_proto3_bad_macros, 1);

/**
 * This generates `UID_MAX`, which is a mcro in some circumstances.
 *
 * @generated from enum protobuf_unittest.UID
 */
export const UID = /*@__PURE__*/
  tsEnum(UIDSchema);

/**
 * Describes the enum protobuf_unittest.BadNames.
 */
export const BadNamesSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_unittest_proto3_bad_macros, 2);

/**
 * Just a container for bad macro names. Some of these do not follow the normal
 * naming conventions, this is intentional, we just want to trigger a build
 * failure if the macro is left defined.
 *
 * @generated from enum protobuf_unittest.BadNames
 */
export const BadNames = /*@__PURE__*/
  tsEnum(BadNamesSchema);

