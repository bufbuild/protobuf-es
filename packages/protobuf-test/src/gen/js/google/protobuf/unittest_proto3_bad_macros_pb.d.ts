// Protocol Buffers - Google's data interchange format
// Copyright 2023 Google Inc.  All rights reserved.
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

// @generated by protoc-gen-es v1.3.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_proto3_bad_macros.proto (package protobuf_unittest, syntax proto3)
/* eslint-disable */

/**
 * This generates `GID_MAX`, which is a macro in some circumstances.
 *
 * @generated from enum protobuf_unittest.GID
 */
export declare enum GID {
  /**
   * @generated from enum value: GID_UNUSED = 0;
   */
  GID_UNUSED = 0,
}

/**
 * This generates `UID_MAX`, which is a mcro in some circumstances.
 *
 * @generated from enum protobuf_unittest.UID
 */
export declare enum UID {
  /**
   * @generated from enum value: UID_UNUSED = 0;
   */
  UID_UNUSED = 0,
}

/**
 * Just a container for bad macro names. Some of these do not follow the normal
 * naming conventions, this is intentional, we just want to trigger a build
 * failure if the macro is left defined.
 *
 * @generated from enum protobuf_unittest.BadNames
 */
export declare enum BadNames {
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

