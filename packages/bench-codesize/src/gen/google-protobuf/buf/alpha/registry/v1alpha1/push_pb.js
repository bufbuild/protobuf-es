// source: buf/alpha/registry/v1alpha1/push.proto
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
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var buf_alpha_module_v1alpha1_module_pb = require('../../../../buf/alpha/module/v1alpha1/module_pb.js');
goog.object.extend(proto, buf_alpha_module_v1alpha1_module_pb);
var buf_alpha_registry_v1alpha1_module_pb = require('../../../../buf/alpha/registry/v1alpha1/module_pb.js');
goog.object.extend(proto, buf_alpha_registry_v1alpha1_module_pb);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.PushRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.PushResponse', null, global);
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
proto.buf.alpha.registry.v1alpha1.PushRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.PushRequest.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.PushRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.PushRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.PushRequest';
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
proto.buf.alpha.registry.v1alpha1.PushResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.PushResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.PushResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.PushResponse';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.repeatedFields_ = [5,6];



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
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.PushRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.PushRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    repository: jspb.Message.getFieldWithDefault(msg, 2, ""),
    branch: jspb.Message.getFieldWithDefault(msg, 3, ""),
    module: (f = msg.getModule()) && buf_alpha_module_v1alpha1_module_pb.Module.toObject(includeInstance, f),
    tagsList: (f = jspb.Message.getRepeatedField(msg, 5)) == null ? undefined : f,
    tracksList: (f = jspb.Message.getRepeatedField(msg, 6)) == null ? undefined : f
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
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest}
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.PushRequest;
  return proto.buf.alpha.registry.v1alpha1.PushRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.PushRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest}
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setBranch(value);
      break;
    case 4:
      var value = new buf_alpha_module_v1alpha1_module_pb.Module;
      reader.readMessage(value,buf_alpha_module_v1alpha1_module_pb.Module.deserializeBinaryFromReader);
      msg.setModule(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.addTags(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.addTracks(value);
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
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.PushRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.PushRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getBranch();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getModule();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      buf_alpha_module_v1alpha1_module_pb.Module.serializeBinaryToWriter
    );
  }
  f = message.getTagsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      5,
      f
    );
  }
  f = message.getTracksList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      6,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string repository = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.getRepository = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.setRepository = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string branch = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.getBranch = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.setBranch = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional buf.alpha.module.v1alpha1.Module module = 4;
 * @return {?proto.buf.alpha.module.v1alpha1.Module}
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.getModule = function() {
  return /** @type{?proto.buf.alpha.module.v1alpha1.Module} */ (
    jspb.Message.getWrapperField(this, buf_alpha_module_v1alpha1_module_pb.Module, 4));
};


/**
 * @param {?proto.buf.alpha.module.v1alpha1.Module|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest} returns this
*/
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.setModule = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.clearModule = function() {
  return this.setModule(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.hasModule = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * repeated string tags = 5;
 * @return {!Array<string>}
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.getTagsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 5));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.setTagsList = function(value) {
  return jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.addTags = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.clearTagsList = function() {
  return this.setTagsList([]);
};


/**
 * repeated string tracks = 6;
 * @return {!Array<string>}
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.getTracksList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 6));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.setTracksList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.addTracks = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.PushRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.PushRequest.prototype.clearTracksList = function() {
  return this.setTracksList([]);
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
proto.buf.alpha.registry.v1alpha1.PushResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.PushResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.PushResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.PushResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    localModulePin: (f = msg.getLocalModulePin()) && buf_alpha_registry_v1alpha1_module_pb.LocalModulePin.toObject(includeInstance, f)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.PushResponse}
 */
proto.buf.alpha.registry.v1alpha1.PushResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.PushResponse;
  return proto.buf.alpha.registry.v1alpha1.PushResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.PushResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.PushResponse}
 */
proto.buf.alpha.registry.v1alpha1.PushResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 5:
      var value = new buf_alpha_registry_v1alpha1_module_pb.LocalModulePin;
      reader.readMessage(value,buf_alpha_registry_v1alpha1_module_pb.LocalModulePin.deserializeBinaryFromReader);
      msg.setLocalModulePin(value);
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
proto.buf.alpha.registry.v1alpha1.PushResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.PushResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.PushResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.PushResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLocalModulePin();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      buf_alpha_registry_v1alpha1_module_pb.LocalModulePin.serializeBinaryToWriter
    );
  }
};


/**
 * optional LocalModulePin local_module_pin = 5;
 * @return {?proto.buf.alpha.registry.v1alpha1.LocalModulePin}
 */
proto.buf.alpha.registry.v1alpha1.PushResponse.prototype.getLocalModulePin = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.LocalModulePin} */ (
    jspb.Message.getWrapperField(this, buf_alpha_registry_v1alpha1_module_pb.LocalModulePin, 5));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.LocalModulePin|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PushResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.PushResponse.prototype.setLocalModulePin = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.PushResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.PushResponse.prototype.clearLocalModulePin = function() {
  return this.setLocalModulePin(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.PushResponse.prototype.hasLocalModulePin = function() {
  return jspb.Message.getField(this, 5) != null;
};


goog.object.extend(exports, proto.buf.alpha.registry.v1alpha1);
