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

// source: buf/alpha/registry/v1alpha1/image.proto
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

var buf_alpha_image_v1_image_pb = require('../../../../buf/alpha/image/v1/image_pb.js');
goog.object.extend(proto, buf_alpha_image_v1_image_pb);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetImageRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetImageResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ImageMask', null, global);
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
proto.buf.alpha.registry.v1alpha1.GetImageRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.GetImageRequest.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetImageRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetImageRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.GetImageRequest';
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
proto.buf.alpha.registry.v1alpha1.GetImageResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetImageResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetImageResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.GetImageResponse';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.repeatedFields_ = [6,7];



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
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetImageRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    repository: jspb.Message.getFieldWithDefault(msg, 2, ""),
    reference: jspb.Message.getFieldWithDefault(msg, 3, ""),
    excludeImports: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    excludeSourceInfo: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    typesList: (f = jspb.Message.getRepeatedField(msg, 6)) == null ? undefined : f,
    includeMaskList: (f = jspb.Message.getRepeatedField(msg, 7)) == null ? undefined : f
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
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetImageRequest;
  return proto.buf.alpha.registry.v1alpha1.GetImageRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwner(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepository(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setReference(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setExcludeImports(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setExcludeSourceInfo(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.addTypes(value);
      break;
    case 7:
      var values = /** @type {!Array<!proto.buf.alpha.registry.v1alpha1.ImageMask>} */ (reader.isDelimited() ? reader.readPackedEnum() : [reader.readEnum()]);
      for (var i = 0; i < values.length; i++) {
        msg.addIncludeMask(values[i]);
      }
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
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetImageRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRepository();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getReference();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getExcludeImports();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getExcludeSourceInfo();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getTypesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      6,
      f
    );
  }
  f = message.getIncludeMaskList();
  if (f.length > 0) {
    writer.writePackedEnum(
      7,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string repository = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.getRepository = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.setRepository = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string reference = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.getReference = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.setReference = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool exclude_imports = 4;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.getExcludeImports = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.setExcludeImports = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional bool exclude_source_info = 5;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.getExcludeSourceInfo = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.setExcludeSourceInfo = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * repeated string types = 6;
 * @return {!Array<string>}
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.getTypesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 6));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.setTypesList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.addTypes = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.clearTypesList = function() {
  return this.setTypesList([]);
};


/**
 * repeated ImageMask include_mask = 7;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.ImageMask>}
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.getIncludeMaskList = function() {
  return /** @type {!Array<!proto.buf.alpha.registry.v1alpha1.ImageMask>} */ (jspb.Message.getRepeatedField(this, 7));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.ImageMask>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.setIncludeMaskList = function(value) {
  return jspb.Message.setField(this, 7, value || []);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ImageMask} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.addIncludeMask = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 7, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetImageRequest.prototype.clearIncludeMaskList = function() {
  return this.setIncludeMaskList([]);
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
proto.buf.alpha.registry.v1alpha1.GetImageResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetImageResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetImageResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetImageResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    image: (f = msg.getImage()) && buf_alpha_image_v1_image_pb.Image.toObject(includeInstance, f)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetImageResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetImageResponse;
  return proto.buf.alpha.registry.v1alpha1.GetImageResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetImageResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetImageResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new buf_alpha_image_v1_image_pb.Image;
      reader.readMessage(value,buf_alpha_image_v1_image_pb.Image.deserializeBinaryFromReader);
      msg.setImage(value);
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
proto.buf.alpha.registry.v1alpha1.GetImageResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetImageResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetImageResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetImageResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getImage();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      buf_alpha_image_v1_image_pb.Image.serializeBinaryToWriter
    );
  }
};


/**
 * optional buf.alpha.image.v1.Image image = 1;
 * @return {?proto.buf.alpha.image.v1.Image}
 */
proto.buf.alpha.registry.v1alpha1.GetImageResponse.prototype.getImage = function() {
  return /** @type{?proto.buf.alpha.image.v1.Image} */ (
    jspb.Message.getWrapperField(this, buf_alpha_image_v1_image_pb.Image, 1));
};


/**
 * @param {?proto.buf.alpha.image.v1.Image|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.GetImageResponse.prototype.setImage = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetImageResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetImageResponse.prototype.clearImage = function() {
  return this.setImage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.GetImageResponse.prototype.hasImage = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.ImageMask = {
  IMAGE_MASK_UNSPECIFIED: 0,
  IMAGE_MASK_MESSAGES: 1,
  IMAGE_MASK_ENUMS: 2,
  IMAGE_MASK_SERVICES: 3
};

goog.object.extend(exports, proto.buf.alpha.registry.v1alpha1);
