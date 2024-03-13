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

// source: buf/alpha/registry/v1alpha1/repository.proto
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

var buf_alpha_registry_v1alpha1_role_pb = require('../../../../buf/alpha/registry/v1alpha1/role_pb.js');
goog.object.extend(proto, buf_alpha_registry_v1alpha1_role_pb);
var buf_alpha_registry_v1alpha1_user_pb = require('../../../../buf/alpha/registry/v1alpha1/user_pb.js');
goog.object.extend(proto, buf_alpha_registry_v1alpha1_user_pb);
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
goog.object.extend(proto, google_protobuf_timestamp_pb);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.Repository', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.Repository.OwnerCase', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.RepositoryContributor', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.Visibility', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.Repository = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.buf.alpha.registry.v1alpha1.Repository.oneofGroups_);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.Repository, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.Repository.displayName = 'proto.buf.alpha.registry.v1alpha1.Repository';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.RepositoryContributor, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.RepositoryContributor.displayName = 'proto.buf.alpha.registry.v1alpha1.RepositoryContributor';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.Repository.oneofGroups_ = [[5,6]];

/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.Repository.OwnerCase = {
  OWNER_NOT_SET: 0,
  USER_ID: 5,
  ORGANIZATION_ID: 6
};

/**
 * @return {proto.buf.alpha.registry.v1alpha1.Repository.OwnerCase}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.getOwnerCase = function() {
  return /** @type {proto.buf.alpha.registry.v1alpha1.Repository.OwnerCase} */(jspb.Message.computeOneofCase(this, proto.buf.alpha.registry.v1alpha1.Repository.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.Repository.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.Repository} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.Repository.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    createTime: (f = msg.getCreateTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    updateTime: (f = msg.getUpdateTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    name: jspb.Message.getFieldWithDefault(msg, 4, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 5, ""),
    organizationId: jspb.Message.getFieldWithDefault(msg, 6, ""),
    visibility: jspb.Message.getFieldWithDefault(msg, 7, 0),
    deprecated: jspb.Message.getBooleanFieldWithDefault(msg, 8, false),
    deprecationMessage: jspb.Message.getFieldWithDefault(msg, 9, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.Repository;
  return proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.Repository} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setCreateTime(value);
      break;
    case 3:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setUpdateTime(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrganizationId(value);
      break;
    case 7:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.Visibility} */ (reader.readEnum());
      msg.setVisibility(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeprecated(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeprecationMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.Repository.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.Repository} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.Repository.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCreateTime();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getUpdateTime();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeString(
      5,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getVisibility();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
  f = message.getDeprecated();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
  f = message.getDeprecationMessage();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional google.protobuf.Timestamp create_time = 2;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.getCreateTime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 2));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
*/
proto.buf.alpha.registry.v1alpha1.Repository.prototype.setCreateTime = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.clearCreateTime = function() {
  return this.setCreateTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.hasCreateTime = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional google.protobuf.Timestamp update_time = 3;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.getUpdateTime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 3));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
*/
proto.buf.alpha.registry.v1alpha1.Repository.prototype.setUpdateTime = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.clearUpdateTime = function() {
  return this.setUpdateTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.hasUpdateTime = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string name = 4;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string user_id = 5;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.setUserId = function(value) {
  return jspb.Message.setOneofField(this, 5, proto.buf.alpha.registry.v1alpha1.Repository.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.clearUserId = function() {
  return jspb.Message.setOneofField(this, 5, proto.buf.alpha.registry.v1alpha1.Repository.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.hasUserId = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional string organization_id = 6;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.getOrganizationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.setOrganizationId = function(value) {
  return jspb.Message.setOneofField(this, 6, proto.buf.alpha.registry.v1alpha1.Repository.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.clearOrganizationId = function() {
  return jspb.Message.setOneofField(this, 6, proto.buf.alpha.registry.v1alpha1.Repository.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.hasOrganizationId = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional Visibility visibility = 7;
 * @return {!proto.buf.alpha.registry.v1alpha1.Visibility}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.getVisibility = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.Visibility} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Visibility} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.setVisibility = function(value) {
  return jspb.Message.setProto3EnumField(this, 7, value);
};


/**
 * optional bool deprecated = 8;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.getDeprecated = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.setDeprecated = function(value) {
  return jspb.Message.setProto3BooleanField(this, 8, value);
};


/**
 * optional string deprecation_message = 9;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.getDeprecationMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository} returns this
 */
proto.buf.alpha.registry.v1alpha1.Repository.prototype.setDeprecationMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.RepositoryContributor.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.RepositoryContributor} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.toObject = function(includeInstance, msg) {
  var f, obj = {
    user: (f = msg.getUser()) && buf_alpha_registry_v1alpha1_user_pb.User.toObject(includeInstance, f),
    repositoryId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    explicitRole: jspb.Message.getFieldWithDefault(msg, 3, 0),
    implicitRole: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.RepositoryContributor}
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.RepositoryContributor;
  return proto.buf.alpha.registry.v1alpha1.RepositoryContributor.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.RepositoryContributor} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.RepositoryContributor}
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new buf_alpha_registry_v1alpha1_user_pb.User;
      reader.readMessage(value,buf_alpha_registry_v1alpha1_user_pb.User.deserializeBinaryFromReader);
      msg.setUser(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepositoryId(value);
      break;
    case 3:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.RepositoryRole} */ (reader.readEnum());
      msg.setExplicitRole(value);
      break;
    case 4:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.RepositoryRole} */ (reader.readEnum());
      msg.setImplicitRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.RepositoryContributor.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.RepositoryContributor} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUser();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      buf_alpha_registry_v1alpha1_user_pb.User.serializeBinaryToWriter
    );
  }
  f = message.getRepositoryId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getExplicitRole();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getImplicitRole();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * optional User user = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.User}
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.prototype.getUser = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.User} */ (
    jspb.Message.getWrapperField(this, buf_alpha_registry_v1alpha1_user_pb.User, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.User|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.RepositoryContributor} returns this
*/
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.prototype.setUser = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.RepositoryContributor} returns this
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.prototype.clearUser = function() {
  return this.setUser(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.prototype.hasUser = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string repository_id = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.prototype.getRepositoryId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.RepositoryContributor} returns this
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.prototype.setRepositoryId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional RepositoryRole explicit_role = 3;
 * @return {!proto.buf.alpha.registry.v1alpha1.RepositoryRole}
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.prototype.getExplicitRole = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.RepositoryRole} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.RepositoryRole} value
 * @return {!proto.buf.alpha.registry.v1alpha1.RepositoryContributor} returns this
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.prototype.setExplicitRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional RepositoryRole implicit_role = 4;
 * @return {!proto.buf.alpha.registry.v1alpha1.RepositoryRole}
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.prototype.getImplicitRole = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.RepositoryRole} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.RepositoryRole} value
 * @return {!proto.buf.alpha.registry.v1alpha1.RepositoryContributor} returns this
 */
proto.buf.alpha.registry.v1alpha1.RepositoryContributor.prototype.setImplicitRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    fullNamesList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest;
  return proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addFullNames(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFullNamesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string full_names = 1;
 * @return {!Array<string>}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.prototype.getFullNamesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.prototype.setFullNamesList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.prototype.addFullNames = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest.prototype.clearFullNamesList = function() {
  return this.setFullNamesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoriesList: jspb.Message.toObjectList(msg.getRepositoriesList(),
    proto.buf.alpha.registry.v1alpha1.Repository.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse;
  return proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Repository;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinaryFromReader);
      msg.addRepositories(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoriesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Repository.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Repository repositories = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Repository>}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.prototype.getRepositoriesList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Repository>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.Repository, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Repository>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.prototype.setRepositoriesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Repository=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.prototype.addRepositories = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.Repository, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.prototype.clearRepositoriesList = function() {
  return this.setRepositoriesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest;
  return proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    repository: (f = msg.getRepository()) && proto.buf.alpha.registry.v1alpha1.Repository.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse;
  return proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Repository;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinaryFromReader);
      msg.setRepository(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepository();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Repository.serializeBinaryToWriter
    );
  }
};


/**
 * optional Repository repository = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.prototype.getRepository = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.Repository} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.registry.v1alpha1.Repository, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.Repository|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.prototype.setRepository = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.prototype.clearRepository = function() {
  return this.setRepository(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.prototype.hasRepository = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    fullName: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest;
  return proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFullName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFullName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string full_name = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest.prototype.getFullName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest.prototype.setFullName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    repository: (f = msg.getRepository()) && proto.buf.alpha.registry.v1alpha1.Repository.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse;
  return proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Repository;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinaryFromReader);
      msg.setRepository(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepository();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Repository.serializeBinaryToWriter
    );
  }
};


/**
 * optional Repository repository = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.prototype.getRepository = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.Repository} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.registry.v1alpha1.Repository, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.Repository|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.prototype.setRepository = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.prototype.clearRepository = function() {
  return this.setRepository(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.prototype.hasRepository = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    pageSize: jspb.Message.getFieldWithDefault(msg, 1, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 2, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest;
  return proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional uint32 page_size = 1;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool reverse = 3;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoriesList: jspb.Message.toObjectList(msg.getRepositoriesList(),
    proto.buf.alpha.registry.v1alpha1.Repository.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse;
  return proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Repository;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinaryFromReader);
      msg.addRepositories(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoriesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Repository.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated Repository repositories = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Repository>}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.prototype.getRepositoriesList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Repository>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.Repository, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Repository>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.prototype.setRepositoriesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Repository=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.prototype.addRepositories = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.Repository, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.prototype.clearRepositoriesList = function() {
  return this.setRepositoriesList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.prototype.setNextPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pageSize: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 3, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest;
  return proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 page_size = 2;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string page_token = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool reverse = 4;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoriesList: jspb.Message.toObjectList(msg.getRepositoriesList(),
    proto.buf.alpha.registry.v1alpha1.Repository.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse;
  return proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Repository;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinaryFromReader);
      msg.addRepositories(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoriesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Repository.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated Repository repositories = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Repository>}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.prototype.getRepositoriesList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Repository>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.Repository, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Repository>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.prototype.setRepositoriesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Repository=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.prototype.addRepositories = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.Repository, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.prototype.clearRepositoriesList = function() {
  return this.setRepositoriesList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.prototype.setNextPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    pageSize: jspb.Message.getFieldWithDefault(msg, 1, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 2, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest;
  return proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional uint32 page_size = 1;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool reverse = 3;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoriesList: jspb.Message.toObjectList(msg.getRepositoriesList(),
    proto.buf.alpha.registry.v1alpha1.Repository.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse;
  return proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Repository;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinaryFromReader);
      msg.addRepositories(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoriesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Repository.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated Repository repositories = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Repository>}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.prototype.getRepositoriesList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Repository>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.Repository, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Repository>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.prototype.setRepositoriesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Repository=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.prototype.addRepositories = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.Repository, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.prototype.clearRepositoriesList = function() {
  return this.setRepositoriesList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.prototype.setNextPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    organizationId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pageSize: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 3, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest;
  return proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrganizationId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrganizationId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string organization_id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.prototype.getOrganizationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.prototype.setOrganizationId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 page_size = 2;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string page_token = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool reverse = 4;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoriesList: jspb.Message.toObjectList(msg.getRepositoriesList(),
    proto.buf.alpha.registry.v1alpha1.Repository.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse;
  return proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Repository;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinaryFromReader);
      msg.addRepositories(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoriesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Repository.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated Repository repositories = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Repository>}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.prototype.getRepositoriesList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Repository>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.Repository, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Repository>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.prototype.setRepositoriesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Repository=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.prototype.addRepositories = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.Repository, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.prototype.clearRepositoriesList = function() {
  return this.setRepositoriesList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.prototype.setNextPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    fullName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    visibility: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest}
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest;
  return proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest}
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFullName(value);
      break;
    case 2:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.Visibility} */ (reader.readEnum());
      msg.setVisibility(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFullName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getVisibility();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * optional string full_name = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.prototype.getFullName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.prototype.setFullName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional Visibility visibility = 2;
 * @return {!proto.buf.alpha.registry.v1alpha1.Visibility}
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.prototype.getVisibility = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.Visibility} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Visibility} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest.prototype.setVisibility = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    repository: (f = msg.getRepository()) && proto.buf.alpha.registry.v1alpha1.Repository.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse}
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse;
  return proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse}
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Repository;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinaryFromReader);
      msg.setRepository(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepository();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Repository.serializeBinaryToWriter
    );
  }
};


/**
 * optional Repository repository = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.prototype.getRepository = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.Repository} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.registry.v1alpha1.Repository, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.Repository|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.prototype.setRepository = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.prototype.clearRepository = function() {
  return this.setRepository(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.prototype.hasRepository = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest;
  return proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse;
  return proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    fullName: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest;
  return proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFullName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFullName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string full_name = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest.prototype.getFullName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest.prototype.setFullName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse;
  return proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    ownerName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    repositoryName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    deprecationMessage: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest;
  return proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnerName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepositoryName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeprecationMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwnerName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRepositoryName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDeprecationMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string owner_name = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.prototype.getOwnerName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.prototype.setOwnerName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string repository_name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.prototype.getRepositoryName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.prototype.setRepositoryName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string deprecation_message = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.prototype.getDeprecationMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest.prototype.setDeprecationMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    repository: (f = msg.getRepository()) && proto.buf.alpha.registry.v1alpha1.Repository.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse;
  return proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Repository;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinaryFromReader);
      msg.setRepository(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepository();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Repository.serializeBinaryToWriter
    );
  }
};


/**
 * optional Repository repository = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.prototype.getRepository = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.Repository} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.registry.v1alpha1.Repository, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.Repository|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.prototype.setRepository = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.prototype.clearRepository = function() {
  return this.setRepository(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.prototype.hasRepository = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    ownerName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    repositoryName: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest;
  return proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnerName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepositoryName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwnerName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRepositoryName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string owner_name = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.prototype.getOwnerName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.prototype.setOwnerName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string repository_name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.prototype.getRepositoryName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest.prototype.setRepositoryName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    repository: (f = msg.getRepository()) && proto.buf.alpha.registry.v1alpha1.Repository.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse;
  return proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Repository;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Repository.deserializeBinaryFromReader);
      msg.setRepository(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepository();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Repository.serializeBinaryToWriter
    );
  }
};


/**
 * optional Repository repository = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.prototype.getRepository = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.Repository} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.registry.v1alpha1.Repository, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.Repository|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.prototype.setRepository = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.prototype.clearRepository = function() {
  return this.setRepository(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.prototype.hasRepository = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoryId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    repositoryRole: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest}
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest;
  return proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest}
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepositoryId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 3:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.RepositoryRole} */ (reader.readEnum());
      msg.setRepositoryRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoryId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRepositoryRole();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional string repository_id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.prototype.getRepositoryId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.prototype.setRepositoryId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional RepositoryRole repository_role = 3;
 * @return {!proto.buf.alpha.registry.v1alpha1.RepositoryRole}
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.prototype.getRepositoryRole = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.RepositoryRole} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.RepositoryRole} value
 * @return {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest.prototype.setRepositoryRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse}
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse;
  return proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse}
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoryId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pageSize: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 3, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest;
  return proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepositoryId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoryId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string repository_id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.prototype.getRepositoryId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.prototype.setRepositoryId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 page_size = 2;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string page_token = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool reverse = 4;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.buf.alpha.registry.v1alpha1.RepositoryContributor.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse;
  return proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.RepositoryContributor;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.RepositoryContributor.deserializeBinaryFromReader);
      msg.addUsers(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.RepositoryContributor.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated RepositoryContributor users = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.RepositoryContributor>}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.prototype.getUsersList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.RepositoryContributor>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.RepositoryContributor, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.RepositoryContributor>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.prototype.setUsersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.RepositoryContributor=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.RepositoryContributor}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.prototype.addUsers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.RepositoryContributor, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.prototype.clearUsersList = function() {
  return this.setUsersList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.prototype.setNextPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoryId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest;
  return proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepositoryId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoryId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string repository_id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest.prototype.getRepositoryId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest.prototype.setRepositoryId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    contributorsCount: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse;
  return proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setContributorsCount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContributorsCount();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
};


/**
 * optional uint32 contributors_count = 1;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.prototype.getContributorsCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.prototype.setContributorsCount = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.Visibility = {
  VISIBILITY_UNSPECIFIED: 0,
  VISIBILITY_PUBLIC: 1,
  VISIBILITY_PRIVATE: 2
};

goog.object.extend(exports, proto.buf.alpha.registry.v1alpha1);
