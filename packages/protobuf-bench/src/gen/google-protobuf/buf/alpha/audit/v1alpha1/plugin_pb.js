// source: buf/alpha/audit/v1alpha1/plugin.proto
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

goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVisibility', null, global);
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
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.displayName = 'proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping';
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
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.displayName = 'proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig';
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
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.displayName = 'proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary';
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
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginOwner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pluginName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    version: jspb.Message.getFieldWithDefault(msg, 3, ""),
    deleted: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping;
  return proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPluginOwner(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPluginName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setVersion(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeleted(value);
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
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPluginName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getVersion();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDeleted();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string plugin_owner = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.prototype.getPluginOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping} returns this
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.prototype.setPluginOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string plugin_name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.prototype.getPluginName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping} returns this
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.prototype.setPluginName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string version = 3;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.prototype.getVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping} returns this
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.prototype.setVersion = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool deleted = 4;
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.prototype.getDeleted = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping} returns this
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping.prototype.setDeleted = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.repeatedFields_ = [3];



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
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginOwner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pluginName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    parametersList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    deleted: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig;
  return proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPluginOwner(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPluginName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addParameters(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeleted(value);
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
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPluginName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getParametersList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
  f = message.getDeleted();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string plugin_owner = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.prototype.getPluginOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig} returns this
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.prototype.setPluginOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string plugin_name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.prototype.getPluginName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig} returns this
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.prototype.setPluginName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated string parameters = 3;
 * @return {!Array<string>}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.prototype.getParametersList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig} returns this
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.prototype.setParametersList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig} returns this
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.prototype.addParameters = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig} returns this
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.prototype.clearParametersList = function() {
  return this.setParametersList([]);
};


/**
 * optional bool deleted = 4;
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.prototype.getDeleted = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig} returns this
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig.prototype.setDeleted = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
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
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    version: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary;
  return proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setVersion(value);
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
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getVersion();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary} returns this
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string version = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.prototype.getVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary} returns this
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.prototype.setVersion = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * @enum {number}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVisibility = {
  BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_VISIBILITY_UNSPECIFIED: 0,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_VISIBILITY_PUBLIC: 1,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_VISIBILITY_PRIVATE: 2
};

goog.object.extend(exports, proto.buf.alpha.audit.v1alpha1);
