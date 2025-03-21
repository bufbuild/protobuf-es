// Copyright 2021-2025 Buf Technologies, Inc.
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

// source: google/api/http.proto
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

goog.exportSymbol('proto.google.api.CustomHttpPattern', null, global);
goog.exportSymbol('proto.google.api.Http', null, global);
goog.exportSymbol('proto.google.api.HttpRule', null, global);
goog.exportSymbol('proto.google.api.HttpRule.PatternCase', null, global);
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
proto.google.api.Http = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.api.Http.repeatedFields_, null);
};
goog.inherits(proto.google.api.Http, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.google.api.Http.displayName = 'proto.google.api.Http';
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
proto.google.api.HttpRule = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.api.HttpRule.repeatedFields_, proto.google.api.HttpRule.oneofGroups_);
};
goog.inherits(proto.google.api.HttpRule, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.google.api.HttpRule.displayName = 'proto.google.api.HttpRule';
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
proto.google.api.CustomHttpPattern = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.api.CustomHttpPattern, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.google.api.CustomHttpPattern.displayName = 'proto.google.api.CustomHttpPattern';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.api.Http.repeatedFields_ = [1];



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
proto.google.api.Http.prototype.toObject = function(opt_includeInstance) {
  return proto.google.api.Http.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.api.Http} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.Http.toObject = function(includeInstance, msg) {
  var f, obj = {
rulesList: jspb.Message.toObjectList(msg.getRulesList(),
    proto.google.api.HttpRule.toObject, includeInstance),
fullyDecodeReservedExpansion: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
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
 * @return {!proto.google.api.Http}
 */
proto.google.api.Http.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.api.Http;
  return proto.google.api.Http.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.api.Http} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.api.Http}
 */
proto.google.api.Http.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.google.api.HttpRule;
      reader.readMessage(value,proto.google.api.HttpRule.deserializeBinaryFromReader);
      msg.addRules(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setFullyDecodeReservedExpansion(value);
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
proto.google.api.Http.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.api.Http.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.api.Http} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.Http.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRulesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.google.api.HttpRule.serializeBinaryToWriter
    );
  }
  f = message.getFullyDecodeReservedExpansion();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * repeated HttpRule rules = 1;
 * @return {!Array<!proto.google.api.HttpRule>}
 */
proto.google.api.Http.prototype.getRulesList = function() {
  return /** @type{!Array<!proto.google.api.HttpRule>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.api.HttpRule, 1));
};


/**
 * @param {!Array<!proto.google.api.HttpRule>} value
 * @return {!proto.google.api.Http} returns this
*/
proto.google.api.Http.prototype.setRulesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.google.api.HttpRule=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.api.HttpRule}
 */
proto.google.api.Http.prototype.addRules = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.google.api.HttpRule, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.google.api.Http} returns this
 */
proto.google.api.Http.prototype.clearRulesList = function() {
  return this.setRulesList([]);
};


/**
 * optional bool fully_decode_reserved_expansion = 2;
 * @return {boolean}
 */
proto.google.api.Http.prototype.getFullyDecodeReservedExpansion = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.google.api.Http} returns this
 */
proto.google.api.Http.prototype.setFullyDecodeReservedExpansion = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.api.HttpRule.repeatedFields_ = [11];

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.google.api.HttpRule.oneofGroups_ = [[2,3,4,5,6,8]];

/**
 * @enum {number}
 */
proto.google.api.HttpRule.PatternCase = {
  PATTERN_NOT_SET: 0,
  GET: 2,
  PUT: 3,
  POST: 4,
  DELETE: 5,
  PATCH: 6,
  CUSTOM: 8
};

/**
 * @return {proto.google.api.HttpRule.PatternCase}
 */
proto.google.api.HttpRule.prototype.getPatternCase = function() {
  return /** @type {proto.google.api.HttpRule.PatternCase} */(jspb.Message.computeOneofCase(this, proto.google.api.HttpRule.oneofGroups_[0]));
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
proto.google.api.HttpRule.prototype.toObject = function(opt_includeInstance) {
  return proto.google.api.HttpRule.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.api.HttpRule} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.HttpRule.toObject = function(includeInstance, msg) {
  var f, obj = {
selector: jspb.Message.getFieldWithDefault(msg, 1, ""),
get: (f = jspb.Message.getField(msg, 2)) == null ? undefined : f,
put: (f = jspb.Message.getField(msg, 3)) == null ? undefined : f,
post: (f = jspb.Message.getField(msg, 4)) == null ? undefined : f,
pb_delete: (f = jspb.Message.getField(msg, 5)) == null ? undefined : f,
patch: (f = jspb.Message.getField(msg, 6)) == null ? undefined : f,
custom: (f = msg.getCustom()) && proto.google.api.CustomHttpPattern.toObject(includeInstance, f),
body: jspb.Message.getFieldWithDefault(msg, 7, ""),
responseBody: jspb.Message.getFieldWithDefault(msg, 12, ""),
additionalBindingsList: jspb.Message.toObjectList(msg.getAdditionalBindingsList(),
    proto.google.api.HttpRule.toObject, includeInstance)
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
 * @return {!proto.google.api.HttpRule}
 */
proto.google.api.HttpRule.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.api.HttpRule;
  return proto.google.api.HttpRule.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.api.HttpRule} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.api.HttpRule}
 */
proto.google.api.HttpRule.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSelector(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setGet(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPut(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setPost(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setDelete(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setPatch(value);
      break;
    case 8:
      var value = new proto.google.api.CustomHttpPattern;
      reader.readMessage(value,proto.google.api.CustomHttpPattern.deserializeBinaryFromReader);
      msg.setCustom(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setBody(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setResponseBody(value);
      break;
    case 11:
      var value = new proto.google.api.HttpRule;
      reader.readMessage(value,proto.google.api.HttpRule.deserializeBinaryFromReader);
      msg.addAdditionalBindings(value);
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
proto.google.api.HttpRule.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.api.HttpRule.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.api.HttpRule} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.HttpRule.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSelector();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 4));
  if (f != null) {
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
  f = message.getCustom();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.google.api.CustomHttpPattern.serializeBinaryToWriter
    );
  }
  f = message.getBody();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getResponseBody();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getAdditionalBindingsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      11,
      f,
      proto.google.api.HttpRule.serializeBinaryToWriter
    );
  }
};


/**
 * optional string selector = 1;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getSelector = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.setSelector = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string get = 2;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getGet = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.setGet = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.google.api.HttpRule.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.clearGet = function() {
  return jspb.Message.setOneofField(this, 2, proto.google.api.HttpRule.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.google.api.HttpRule.prototype.hasGet = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string put = 3;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getPut = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.setPut = function(value) {
  return jspb.Message.setOneofField(this, 3, proto.google.api.HttpRule.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.clearPut = function() {
  return jspb.Message.setOneofField(this, 3, proto.google.api.HttpRule.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.google.api.HttpRule.prototype.hasPut = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string post = 4;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getPost = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.setPost = function(value) {
  return jspb.Message.setOneofField(this, 4, proto.google.api.HttpRule.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.clearPost = function() {
  return jspb.Message.setOneofField(this, 4, proto.google.api.HttpRule.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.google.api.HttpRule.prototype.hasPost = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional string delete = 5;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getDelete = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.setDelete = function(value) {
  return jspb.Message.setOneofField(this, 5, proto.google.api.HttpRule.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.clearDelete = function() {
  return jspb.Message.setOneofField(this, 5, proto.google.api.HttpRule.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.google.api.HttpRule.prototype.hasDelete = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional string patch = 6;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getPatch = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.setPatch = function(value) {
  return jspb.Message.setOneofField(this, 6, proto.google.api.HttpRule.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.clearPatch = function() {
  return jspb.Message.setOneofField(this, 6, proto.google.api.HttpRule.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.google.api.HttpRule.prototype.hasPatch = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional CustomHttpPattern custom = 8;
 * @return {?proto.google.api.CustomHttpPattern}
 */
proto.google.api.HttpRule.prototype.getCustom = function() {
  return /** @type{?proto.google.api.CustomHttpPattern} */ (
    jspb.Message.getWrapperField(this, proto.google.api.CustomHttpPattern, 8));
};


/**
 * @param {?proto.google.api.CustomHttpPattern|undefined} value
 * @return {!proto.google.api.HttpRule} returns this
*/
proto.google.api.HttpRule.prototype.setCustom = function(value) {
  return jspb.Message.setOneofWrapperField(this, 8, proto.google.api.HttpRule.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.clearCustom = function() {
  return this.setCustom(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.google.api.HttpRule.prototype.hasCustom = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional string body = 7;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getBody = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.setBody = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string response_body = 12;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getResponseBody = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.setResponseBody = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * repeated HttpRule additional_bindings = 11;
 * @return {!Array<!proto.google.api.HttpRule>}
 */
proto.google.api.HttpRule.prototype.getAdditionalBindingsList = function() {
  return /** @type{!Array<!proto.google.api.HttpRule>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.api.HttpRule, 11));
};


/**
 * @param {!Array<!proto.google.api.HttpRule>} value
 * @return {!proto.google.api.HttpRule} returns this
*/
proto.google.api.HttpRule.prototype.setAdditionalBindingsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 11, value);
};


/**
 * @param {!proto.google.api.HttpRule=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.api.HttpRule}
 */
proto.google.api.HttpRule.prototype.addAdditionalBindings = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 11, opt_value, proto.google.api.HttpRule, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.google.api.HttpRule} returns this
 */
proto.google.api.HttpRule.prototype.clearAdditionalBindingsList = function() {
  return this.setAdditionalBindingsList([]);
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
proto.google.api.CustomHttpPattern.prototype.toObject = function(opt_includeInstance) {
  return proto.google.api.CustomHttpPattern.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.api.CustomHttpPattern} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.CustomHttpPattern.toObject = function(includeInstance, msg) {
  var f, obj = {
kind: jspb.Message.getFieldWithDefault(msg, 1, ""),
path: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.google.api.CustomHttpPattern}
 */
proto.google.api.CustomHttpPattern.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.api.CustomHttpPattern;
  return proto.google.api.CustomHttpPattern.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.api.CustomHttpPattern} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.api.CustomHttpPattern}
 */
proto.google.api.CustomHttpPattern.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setKind(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPath(value);
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
proto.google.api.CustomHttpPattern.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.api.CustomHttpPattern.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.api.CustomHttpPattern} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.CustomHttpPattern.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getKind();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPath();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string kind = 1;
 * @return {string}
 */
proto.google.api.CustomHttpPattern.prototype.getKind = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.api.CustomHttpPattern} returns this
 */
proto.google.api.CustomHttpPattern.prototype.setKind = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string path = 2;
 * @return {string}
 */
proto.google.api.CustomHttpPattern.prototype.getPath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.api.CustomHttpPattern} returns this
 */
proto.google.api.CustomHttpPattern.prototype.setPath = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


goog.object.extend(exports, proto.google.api);
