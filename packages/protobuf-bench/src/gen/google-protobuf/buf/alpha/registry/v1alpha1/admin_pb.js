// Copyright 2021-2023 Buf Technologies, Inc.
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

// source: buf/alpha/registry/v1alpha1/admin.proto
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

var buf_alpha_registry_v1alpha1_organization_pb = require('../../../../buf/alpha/registry/v1alpha1/organization_pb.js');
goog.object.extend(proto, buf_alpha_registry_v1alpha1_organization_pb);
var buf_alpha_registry_v1alpha1_plugin_pb = require('../../../../buf/alpha/registry/v1alpha1/plugin_pb.js');
goog.object.extend(proto, buf_alpha_registry_v1alpha1_plugin_pb);
var buf_alpha_registry_v1alpha1_repository_pb = require('../../../../buf/alpha/registry/v1alpha1/repository_pb.js');
goog.object.extend(proto, buf_alpha_registry_v1alpha1_repository_pb);
var buf_alpha_registry_v1alpha1_user_pb = require('../../../../buf/alpha/registry/v1alpha1/user_pb.js');
goog.object.extend(proto, buf_alpha_registry_v1alpha1_user_pb);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse', null, global);
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
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest';
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
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse';
}



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
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest;
  return proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.repeatedFields_ = [2,3,4,5];



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
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    user: (f = msg.getUser()) && buf_alpha_registry_v1alpha1_user_pb.User.toObject(includeInstance, f),
    organizationsList: jspb.Message.toObjectList(msg.getOrganizationsList(),
    buf_alpha_registry_v1alpha1_organization_pb.Organization.toObject, includeInstance),
    repositoriesList: jspb.Message.toObjectList(msg.getRepositoriesList(),
    buf_alpha_registry_v1alpha1_repository_pb.Repository.toObject, includeInstance),
    pluginsList: jspb.Message.toObjectList(msg.getPluginsList(),
    buf_alpha_registry_v1alpha1_plugin_pb.Plugin.toObject, includeInstance),
    templatesList: jspb.Message.toObjectList(msg.getTemplatesList(),
    buf_alpha_registry_v1alpha1_plugin_pb.Template.toObject, includeInstance)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse;
  return proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new buf_alpha_registry_v1alpha1_organization_pb.Organization;
      reader.readMessage(value,buf_alpha_registry_v1alpha1_organization_pb.Organization.deserializeBinaryFromReader);
      msg.addOrganizations(value);
      break;
    case 3:
      var value = new buf_alpha_registry_v1alpha1_repository_pb.Repository;
      reader.readMessage(value,buf_alpha_registry_v1alpha1_repository_pb.Repository.deserializeBinaryFromReader);
      msg.addRepositories(value);
      break;
    case 4:
      var value = new buf_alpha_registry_v1alpha1_plugin_pb.Plugin;
      reader.readMessage(value,buf_alpha_registry_v1alpha1_plugin_pb.Plugin.deserializeBinaryFromReader);
      msg.addPlugins(value);
      break;
    case 5:
      var value = new buf_alpha_registry_v1alpha1_plugin_pb.Template;
      reader.readMessage(value,buf_alpha_registry_v1alpha1_plugin_pb.Template.deserializeBinaryFromReader);
      msg.addTemplates(value);
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
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUser();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      buf_alpha_registry_v1alpha1_user_pb.User.serializeBinaryToWriter
    );
  }
  f = message.getOrganizationsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      buf_alpha_registry_v1alpha1_organization_pb.Organization.serializeBinaryToWriter
    );
  }
  f = message.getRepositoriesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      buf_alpha_registry_v1alpha1_repository_pb.Repository.serializeBinaryToWriter
    );
  }
  f = message.getPluginsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      buf_alpha_registry_v1alpha1_plugin_pb.Plugin.serializeBinaryToWriter
    );
  }
  f = message.getTemplatesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      buf_alpha_registry_v1alpha1_plugin_pb.Template.serializeBinaryToWriter
    );
  }
};


/**
 * optional User user = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.User}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.getUser = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.User} */ (
    jspb.Message.getWrapperField(this, buf_alpha_registry_v1alpha1_user_pb.User, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.User|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.setUser = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.clearUser = function() {
  return this.setUser(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.hasUser = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated Organization organizations = 2;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Organization>}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.getOrganizationsList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Organization>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_registry_v1alpha1_organization_pb.Organization, 2));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Organization>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.setOrganizationsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Organization=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Organization}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.addOrganizations = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.buf.alpha.registry.v1alpha1.Organization, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.clearOrganizationsList = function() {
  return this.setOrganizationsList([]);
};


/**
 * repeated Repository repositories = 3;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Repository>}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.getRepositoriesList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Repository>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_registry_v1alpha1_repository_pb.Repository, 3));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Repository>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.setRepositoriesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Repository=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Repository}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.addRepositories = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.buf.alpha.registry.v1alpha1.Repository, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.clearRepositoriesList = function() {
  return this.setRepositoriesList([]);
};


/**
 * repeated Plugin plugins = 4;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Plugin>}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.getPluginsList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Plugin>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_registry_v1alpha1_plugin_pb.Plugin, 4));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Plugin>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.setPluginsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Plugin=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Plugin}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.addPlugins = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.buf.alpha.registry.v1alpha1.Plugin, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.clearPluginsList = function() {
  return this.setPluginsList([]);
};


/**
 * repeated Template templates = 5;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Template>}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.getTemplatesList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Template>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_registry_v1alpha1_plugin_pb.Template, 5));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Template>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.setTemplatesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Template=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Template}
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.addTemplates = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.buf.alpha.registry.v1alpha1.Template, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.prototype.clearTemplatesList = function() {
  return this.setTemplatesList([]);
};


goog.object.extend(exports, proto.buf.alpha.registry.v1alpha1);
