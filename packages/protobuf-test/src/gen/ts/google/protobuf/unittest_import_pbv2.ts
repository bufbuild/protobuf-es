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

// Author: kenton@google.com (Kenton Varda)
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// A proto file which is imported by unittest.proto to test importing.

// @generated by protoc-gen-es-next v1.7.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_import.proto (package protobuf_unittest_import, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.
// In test_util.h we do
// "using namespace unittest_import = protobuf_unittest_import".

import type { DescFile } from "@bufbuild/protobuf";
import type { TypedDescEnum, TypedDescMessage } from "@bufbuild/protobuf/next/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/next/codegenv1";
import { fileDesc_google_protobuf_unittest_import_public } from "./unittest_import_public_pbv2.js";
import type { Message } from "@bufbuild/protobuf/next";

export const fileDesc_google_protobuf_unittest_import: DescFile = fileDesc("CiVnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfaW1wb3J0LnByb3RvEhhwcm90b2J1Zl91bml0dGVzdF9pbXBvcnQiGgoNSW1wb3J0TWVzc2FnZRIJCgFkGAEgASgFKjwKCkltcG9ydEVudW0SDgoKSU1QT1JUX0ZPTxAHEg4KCklNUE9SVF9CQVIQCBIOCgpJTVBPUlRfQkFaEAkqMQoQSW1wb3J0RW51bUZvck1hcBILCgdVTktOT1dOEAASBwoDRk9PEAESBwoDQkFSEAJCHwoYY29tLmdvb2dsZS5wcm90b2J1Zi50ZXN0SAH4AQFQAA", [fileDesc_google_protobuf_unittest_import_public]);

/**
 * @generated from message protobuf_unittest_import.ImportMessage
 */
export type ImportMessage = Message<"protobuf_unittest_import.ImportMessage"> & {
  /**
   * @generated from field: optional int32 d = 1;
   */
  d: number;
};

// Describes the message protobuf_unittest_import.ImportMessage.
// Use `create(ImportMessageDesc)` to create a new ImportMessage.
export const ImportMessageDesc: TypedDescMessage<ImportMessage> = messageDesc(fileDesc_google_protobuf_unittest_import, 0);

/**
 * @generated from enum protobuf_unittest_import.ImportEnum
 */
export enum ImportEnum {
  /**
   * @generated from enum value: IMPORT_FOO = 7;
   */
  IMPORT_FOO = 7,

  /**
   * @generated from enum value: IMPORT_BAR = 8;
   */
  IMPORT_BAR = 8,

  /**
   * @generated from enum value: IMPORT_BAZ = 9;
   */
  IMPORT_BAZ = 9,
}

// Describes the enum protobuf_unittest_import.ImportEnum.
export const ImportEnumDesc: TypedDescEnum<ImportEnum> = enumDesc(fileDesc_google_protobuf_unittest_import, 0);

/**
 * To use an enum in a map, it must has the first value as 0.
 *
 * @generated from enum protobuf_unittest_import.ImportEnumForMap
 */
export enum ImportEnumForMap {
  /**
   * @generated from enum value: UNKNOWN = 0;
   */
  UNKNOWN = 0,

  /**
   * @generated from enum value: FOO = 1;
   */
  FOO = 1,

  /**
   * @generated from enum value: BAR = 2;
   */
  BAR = 2,
}

// Describes the enum protobuf_unittest_import.ImportEnumForMap.
export const ImportEnumForMapDesc: TypedDescEnum<ImportEnumForMap> = enumDesc(fileDesc_google_protobuf_unittest_import, 1);

