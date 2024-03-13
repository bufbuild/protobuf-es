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

// source: buf/alpha/rpc/v1alpha1/error.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

goog.exportSymbol('proto.buf.alpha.rpc.v1alpha1.ErrorCode', null, global);
/**
 * @enum {number}
 */
proto.buf.alpha.rpc.v1alpha1.ErrorCode = {
  ERROR_CODE_UNSPECIFIED: 0,
  ERROR_CODE_CANCELLED: 1,
  ERROR_CODE_UNKNOWN: 2,
  ERROR_CODE_INVALID_ARGUMENT: 3,
  ERROR_CODE_DEADLINE_EXCEEDED: 4,
  ERROR_CODE_NOT_FOUND: 5,
  ERROR_CODE_ALREADY_EXISTS: 6,
  ERROR_CODE_PERMISSION_DENIED: 7,
  ERROR_CODE_RESOURCE_EXHAUSTED: 8,
  ERROR_CODE_FAILED_PRECONDITION: 9,
  ERROR_CODE_ABORTED: 10,
  ERROR_CODE_OUT_OF_RANGE: 11,
  ERROR_CODE_UNIMPLEMENTED: 12,
  ERROR_CODE_INTERNAL: 13,
  ERROR_CODE_UNAVAILABLE: 14,
  ERROR_CODE_DATA_LOSS: 15,
  ERROR_CODE_UNAUTHENTICATED: 16
};

goog.object.extend(exports, proto.buf.alpha.rpc.v1alpha1);
