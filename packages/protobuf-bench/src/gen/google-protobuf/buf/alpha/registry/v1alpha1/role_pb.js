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

// source: buf/alpha/registry/v1alpha1/role.proto
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

goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.OrganizationRole', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.PluginRole', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.RepositoryRole', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ServerRole', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.TemplateRole', null, global);
/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.ServerRole = {
  SERVER_ROLE_UNSPECIFIED: 0,
  SERVER_ROLE_ADMIN: 1,
  SERVER_ROLE_MEMBER: 2
};

/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.OrganizationRole = {
  ORGANIZATION_ROLE_UNSPECIFIED: 0,
  ORGANIZATION_ROLE_OWNER: 1,
  ORGANIZATION_ROLE_ADMIN: 2,
  ORGANIZATION_ROLE_MEMBER: 3
};

/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.RepositoryRole = {
  REPOSITORY_ROLE_UNSPECIFIED: 0,
  REPOSITORY_ROLE_OWNER: 1,
  REPOSITORY_ROLE_ADMIN: 2,
  REPOSITORY_ROLE_WRITE: 3,
  REPOSITORY_ROLE_READ: 4
};

/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.TemplateRole = {
  TEMPLATE_ROLE_UNSPECIFIED: 0,
  TEMPLATE_ROLE_OWNER: 1,
  TEMPLATE_ROLE_ADMIN: 2,
  TEMPLATE_ROLE_WRITE: 3,
  TEMPLATE_ROLE_READ: 4
};

/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.PluginRole = {
  PLUGIN_ROLE_UNSPECIFIED: 0,
  PLUGIN_ROLE_OWNER: 1,
  PLUGIN_ROLE_ADMIN: 2,
  PLUGIN_ROLE_WRITE: 3,
  PLUGIN_ROLE_READ: 4
};

goog.object.extend(exports, proto.buf.alpha.registry.v1alpha1);
