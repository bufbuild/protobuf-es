// source: buf/alpha/breaking/v1/config.proto
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

goog.exportSymbol('proto.buf.alpha.breaking.v1.Config', null, global);
goog.exportSymbol('proto.buf.alpha.breaking.v1.IDPaths', null, global);
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
proto.buf.alpha.breaking.v1.Config = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.breaking.v1.Config.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.breaking.v1.Config, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.breaking.v1.Config.displayName = 'proto.buf.alpha.breaking.v1.Config';
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
proto.buf.alpha.breaking.v1.IDPaths = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.breaking.v1.IDPaths.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.breaking.v1.IDPaths, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.breaking.v1.IDPaths.displayName = 'proto.buf.alpha.breaking.v1.IDPaths';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.breaking.v1.Config.repeatedFields_ = [2,3,4,5];



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
proto.buf.alpha.breaking.v1.Config.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.breaking.v1.Config.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.breaking.v1.Config} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.breaking.v1.Config.toObject = function(includeInstance, msg) {
  var f, obj = {
    version: jspb.Message.getFieldWithDefault(msg, 1, ""),
    useIdsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f,
    exceptIdsList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    ignorePathsList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f,
    ignoreIdPathsList: jspb.Message.toObjectList(msg.getIgnoreIdPathsList(),
    proto.buf.alpha.breaking.v1.IDPaths.toObject, includeInstance),
    ignoreUnstablePackages: jspb.Message.getBooleanFieldWithDefault(msg, 6, false)
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
 * @return {!proto.buf.alpha.breaking.v1.Config}
 */
proto.buf.alpha.breaking.v1.Config.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.breaking.v1.Config;
  return proto.buf.alpha.breaking.v1.Config.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.breaking.v1.Config} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.breaking.v1.Config}
 */
proto.buf.alpha.breaking.v1.Config.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVersion(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addUseIds(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addExceptIds(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.addIgnorePaths(value);
      break;
    case 5:
      var value = new proto.buf.alpha.breaking.v1.IDPaths;
      reader.readMessage(value,proto.buf.alpha.breaking.v1.IDPaths.deserializeBinaryFromReader);
      msg.addIgnoreIdPaths(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIgnoreUnstablePackages(value);
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
proto.buf.alpha.breaking.v1.Config.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.breaking.v1.Config.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.breaking.v1.Config} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.breaking.v1.Config.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVersion();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUseIdsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
  f = message.getExceptIdsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
  f = message.getIgnorePathsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
  f = message.getIgnoreIdPathsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.buf.alpha.breaking.v1.IDPaths.serializeBinaryToWriter
    );
  }
  f = message.getIgnoreUnstablePackages();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
};


/**
 * optional string version = 1;
 * @return {string}
 */
proto.buf.alpha.breaking.v1.Config.prototype.getVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
 */
proto.buf.alpha.breaking.v1.Config.prototype.setVersion = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated string use_ids = 2;
 * @return {!Array<string>}
 */
proto.buf.alpha.breaking.v1.Config.prototype.getUseIdsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
 */
proto.buf.alpha.breaking.v1.Config.prototype.setUseIdsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
 */
proto.buf.alpha.breaking.v1.Config.prototype.addUseIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
 */
proto.buf.alpha.breaking.v1.Config.prototype.clearUseIdsList = function() {
  return this.setUseIdsList([]);
};


/**
 * repeated string except_ids = 3;
 * @return {!Array<string>}
 */
proto.buf.alpha.breaking.v1.Config.prototype.getExceptIdsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
 */
proto.buf.alpha.breaking.v1.Config.prototype.setExceptIdsList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
 */
proto.buf.alpha.breaking.v1.Config.prototype.addExceptIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
 */
proto.buf.alpha.breaking.v1.Config.prototype.clearExceptIdsList = function() {
  return this.setExceptIdsList([]);
};


/**
 * repeated string ignore_paths = 4;
 * @return {!Array<string>}
 */
proto.buf.alpha.breaking.v1.Config.prototype.getIgnorePathsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
 */
proto.buf.alpha.breaking.v1.Config.prototype.setIgnorePathsList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
 */
proto.buf.alpha.breaking.v1.Config.prototype.addIgnorePaths = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
 */
proto.buf.alpha.breaking.v1.Config.prototype.clearIgnorePathsList = function() {
  return this.setIgnorePathsList([]);
};


/**
 * repeated IDPaths ignore_id_paths = 5;
 * @return {!Array<!proto.buf.alpha.breaking.v1.IDPaths>}
 */
proto.buf.alpha.breaking.v1.Config.prototype.getIgnoreIdPathsList = function() {
  return /** @type{!Array<!proto.buf.alpha.breaking.v1.IDPaths>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.breaking.v1.IDPaths, 5));
};


/**
 * @param {!Array<!proto.buf.alpha.breaking.v1.IDPaths>} value
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
*/
proto.buf.alpha.breaking.v1.Config.prototype.setIgnoreIdPathsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.buf.alpha.breaking.v1.IDPaths=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.breaking.v1.IDPaths}
 */
proto.buf.alpha.breaking.v1.Config.prototype.addIgnoreIdPaths = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.buf.alpha.breaking.v1.IDPaths, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
 */
proto.buf.alpha.breaking.v1.Config.prototype.clearIgnoreIdPathsList = function() {
  return this.setIgnoreIdPathsList([]);
};


/**
 * optional bool ignore_unstable_packages = 6;
 * @return {boolean}
 */
proto.buf.alpha.breaking.v1.Config.prototype.getIgnoreUnstablePackages = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.breaking.v1.Config} returns this
 */
proto.buf.alpha.breaking.v1.Config.prototype.setIgnoreUnstablePackages = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.breaking.v1.IDPaths.repeatedFields_ = [2];



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
proto.buf.alpha.breaking.v1.IDPaths.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.breaking.v1.IDPaths.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.breaking.v1.IDPaths} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.breaking.v1.IDPaths.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pathsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
 * @return {!proto.buf.alpha.breaking.v1.IDPaths}
 */
proto.buf.alpha.breaking.v1.IDPaths.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.breaking.v1.IDPaths;
  return proto.buf.alpha.breaking.v1.IDPaths.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.breaking.v1.IDPaths} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.breaking.v1.IDPaths}
 */
proto.buf.alpha.breaking.v1.IDPaths.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.addPaths(value);
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
proto.buf.alpha.breaking.v1.IDPaths.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.breaking.v1.IDPaths.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.breaking.v1.IDPaths} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.breaking.v1.IDPaths.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPathsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.breaking.v1.IDPaths.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.breaking.v1.IDPaths} returns this
 */
proto.buf.alpha.breaking.v1.IDPaths.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated string paths = 2;
 * @return {!Array<string>}
 */
proto.buf.alpha.breaking.v1.IDPaths.prototype.getPathsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.buf.alpha.breaking.v1.IDPaths} returns this
 */
proto.buf.alpha.breaking.v1.IDPaths.prototype.setPathsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.breaking.v1.IDPaths} returns this
 */
proto.buf.alpha.breaking.v1.IDPaths.prototype.addPaths = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.breaking.v1.IDPaths} returns this
 */
proto.buf.alpha.breaking.v1.IDPaths.prototype.clearPathsList = function() {
  return this.setPathsList([]);
};


goog.object.extend(exports, proto.buf.alpha.breaking.v1);
