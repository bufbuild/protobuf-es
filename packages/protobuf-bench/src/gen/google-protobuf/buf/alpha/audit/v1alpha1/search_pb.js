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

// source: buf/alpha/audit/v1alpha1/search.proto
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

goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1SearchFilter', null, global);
/**
 * @enum {number}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1SearchFilter = {
  BUF_ALPHA_REGISTRY_V1_ALPHA1_SEARCH_FILTER_UNSPECIFIED: 0,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_SEARCH_FILTER_USER: 1,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_SEARCH_FILTER_ORGANIZATION: 2,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_SEARCH_FILTER_REPOSITORY: 3,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_SEARCH_FILTER_PLUGIN: 4,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_SEARCH_FILTER_TEMPLATE: 5,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_SEARCH_FILTER_TEAM: 6
};

goog.object.extend(exports, proto.buf.alpha.audit.v1alpha1);
