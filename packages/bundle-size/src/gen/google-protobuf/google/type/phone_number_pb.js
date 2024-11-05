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

// source: google/type/phone_number.proto
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

goog.exportSymbol('proto.google.type.PhoneNumber', null, global);
goog.exportSymbol('proto.google.type.PhoneNumber.KindCase', null, global);
goog.exportSymbol('proto.google.type.PhoneNumber.ShortCode', null, global);
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
proto.google.type.PhoneNumber = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.google.type.PhoneNumber.oneofGroups_);
};
goog.inherits(proto.google.type.PhoneNumber, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.google.type.PhoneNumber.displayName = 'proto.google.type.PhoneNumber';
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
proto.google.type.PhoneNumber.ShortCode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.type.PhoneNumber.ShortCode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.google.type.PhoneNumber.ShortCode.displayName = 'proto.google.type.PhoneNumber.ShortCode';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.google.type.PhoneNumber.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.google.type.PhoneNumber.KindCase = {
  KIND_NOT_SET: 0,
  E164_NUMBER: 1,
  SHORT_CODE: 2
};

/**
 * @return {proto.google.type.PhoneNumber.KindCase}
 */
proto.google.type.PhoneNumber.prototype.getKindCase = function() {
  return /** @type {proto.google.type.PhoneNumber.KindCase} */(jspb.Message.computeOneofCase(this, proto.google.type.PhoneNumber.oneofGroups_[0]));
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
proto.google.type.PhoneNumber.prototype.toObject = function(opt_includeInstance) {
  return proto.google.type.PhoneNumber.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.type.PhoneNumber} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.type.PhoneNumber.toObject = function(includeInstance, msg) {
  var f, obj = {
e164Number: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
shortCode: (f = msg.getShortCode()) && proto.google.type.PhoneNumber.ShortCode.toObject(includeInstance, f),
extension: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.google.type.PhoneNumber}
 */
proto.google.type.PhoneNumber.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.type.PhoneNumber;
  return proto.google.type.PhoneNumber.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.type.PhoneNumber} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.type.PhoneNumber}
 */
proto.google.type.PhoneNumber.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setE164Number(value);
      break;
    case 2:
      var value = new proto.google.type.PhoneNumber.ShortCode;
      reader.readMessage(value,proto.google.type.PhoneNumber.ShortCode.deserializeBinaryFromReader);
      msg.setShortCode(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setExtension$(value);
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
proto.google.type.PhoneNumber.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.type.PhoneNumber.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.type.PhoneNumber} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.type.PhoneNumber.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getShortCode();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.google.type.PhoneNumber.ShortCode.serializeBinaryToWriter
    );
  }
  f = message.getExtension$();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
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
proto.google.type.PhoneNumber.ShortCode.prototype.toObject = function(opt_includeInstance) {
  return proto.google.type.PhoneNumber.ShortCode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.type.PhoneNumber.ShortCode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.type.PhoneNumber.ShortCode.toObject = function(includeInstance, msg) {
  var f, obj = {
regionCode: jspb.Message.getFieldWithDefault(msg, 1, ""),
number: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.google.type.PhoneNumber.ShortCode}
 */
proto.google.type.PhoneNumber.ShortCode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.type.PhoneNumber.ShortCode;
  return proto.google.type.PhoneNumber.ShortCode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.type.PhoneNumber.ShortCode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.type.PhoneNumber.ShortCode}
 */
proto.google.type.PhoneNumber.ShortCode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRegionCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNumber(value);
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
proto.google.type.PhoneNumber.ShortCode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.type.PhoneNumber.ShortCode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.type.PhoneNumber.ShortCode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.type.PhoneNumber.ShortCode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRegionCode();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNumber();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string region_code = 1;
 * @return {string}
 */
proto.google.type.PhoneNumber.ShortCode.prototype.getRegionCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.type.PhoneNumber.ShortCode} returns this
 */
proto.google.type.PhoneNumber.ShortCode.prototype.setRegionCode = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string number = 2;
 * @return {string}
 */
proto.google.type.PhoneNumber.ShortCode.prototype.getNumber = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.type.PhoneNumber.ShortCode} returns this
 */
proto.google.type.PhoneNumber.ShortCode.prototype.setNumber = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string e164_number = 1;
 * @return {string}
 */
proto.google.type.PhoneNumber.prototype.getE164Number = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.type.PhoneNumber} returns this
 */
proto.google.type.PhoneNumber.prototype.setE164Number = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.google.type.PhoneNumber.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.google.type.PhoneNumber} returns this
 */
proto.google.type.PhoneNumber.prototype.clearE164Number = function() {
  return jspb.Message.setOneofField(this, 1, proto.google.type.PhoneNumber.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.google.type.PhoneNumber.prototype.hasE164Number = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional ShortCode short_code = 2;
 * @return {?proto.google.type.PhoneNumber.ShortCode}
 */
proto.google.type.PhoneNumber.prototype.getShortCode = function() {
  return /** @type{?proto.google.type.PhoneNumber.ShortCode} */ (
    jspb.Message.getWrapperField(this, proto.google.type.PhoneNumber.ShortCode, 2));
};


/**
 * @param {?proto.google.type.PhoneNumber.ShortCode|undefined} value
 * @return {!proto.google.type.PhoneNumber} returns this
*/
proto.google.type.PhoneNumber.prototype.setShortCode = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.google.type.PhoneNumber.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.google.type.PhoneNumber} returns this
 */
proto.google.type.PhoneNumber.prototype.clearShortCode = function() {
  return this.setShortCode(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.google.type.PhoneNumber.prototype.hasShortCode = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string extension = 3;
 * @return {string}
 */
proto.google.type.PhoneNumber.prototype.getExtension$ = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.google.type.PhoneNumber} returns this
 */
proto.google.type.PhoneNumber.prototype.setExtension$ = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


goog.object.extend(exports, proto.google.type);
