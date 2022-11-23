// @generated by protoc-gen-es v0.3.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_well_known_types.proto (package protobuf_unittest, syntax proto3)
/* eslint-disable */

import { Any, Api, BoolValue, BytesValue, DoubleValue, Duration, Empty, FieldMask, FloatValue, Int32Value, Int64Value, proto3, SourceContext, StringValue, Struct, Timestamp, UInt32Value, UInt64Value, Value } from "@bufbuild/protobuf";
import { Type } from "./type_pb.js";

/**
 * Test that we can include all well-known types.
 * Each wrapper type is included separately, as languages
 * map handle different wrappers in different ways.
 *
 * @generated from message protobuf_unittest.TestWellKnownTypes
 */
export const TestWellKnownTypes = proto3.makeMessageType(
  "protobuf_unittest.TestWellKnownTypes",
  () => [
    { no: 1, name: "any_field", kind: "message", T: Any },
    { no: 2, name: "api_field", kind: "message", T: Api },
    { no: 3, name: "duration_field", kind: "message", T: Duration },
    { no: 4, name: "empty_field", kind: "message", T: Empty },
    { no: 5, name: "field_mask_field", kind: "message", T: FieldMask },
    { no: 6, name: "source_context_field", kind: "message", T: SourceContext },
    { no: 7, name: "struct_field", kind: "message", T: Struct },
    { no: 8, name: "timestamp_field", kind: "message", T: Timestamp },
    { no: 9, name: "type_field", kind: "message", T: Type },
    { no: 10, name: "double_field", kind: "message", T: DoubleValue },
    { no: 11, name: "float_field", kind: "message", T: FloatValue },
    { no: 12, name: "int64_field", kind: "message", T: Int64Value },
    { no: 13, name: "uint64_field", kind: "message", T: UInt64Value },
    { no: 14, name: "int32_field", kind: "message", T: Int32Value },
    { no: 15, name: "uint32_field", kind: "message", T: UInt32Value },
    { no: 16, name: "bool_field", kind: "message", T: BoolValue },
    { no: 17, name: "string_field", kind: "message", T: StringValue },
    { no: 18, name: "bytes_field", kind: "message", T: BytesValue },
    { no: 19, name: "value_field", kind: "message", T: Value },
  ],
);

/**
 * A repeated field for each well-known type.
 *
 * @generated from message protobuf_unittest.RepeatedWellKnownTypes
 */
export const RepeatedWellKnownTypes = proto3.makeMessageType(
  "protobuf_unittest.RepeatedWellKnownTypes",
  () => [
    { no: 1, name: "any_field", kind: "message", T: Any, repeated: true },
    { no: 2, name: "api_field", kind: "message", T: Api, repeated: true },
    { no: 3, name: "duration_field", kind: "message", T: Duration, repeated: true },
    { no: 4, name: "empty_field", kind: "message", T: Empty, repeated: true },
    { no: 5, name: "field_mask_field", kind: "message", T: FieldMask, repeated: true },
    { no: 6, name: "source_context_field", kind: "message", T: SourceContext, repeated: true },
    { no: 7, name: "struct_field", kind: "message", T: Struct, repeated: true },
    { no: 8, name: "timestamp_field", kind: "message", T: Timestamp, repeated: true },
    { no: 9, name: "type_field", kind: "message", T: Type, repeated: true },
    { no: 10, name: "double_field", kind: "message", T: DoubleValue, repeated: true },
    { no: 11, name: "float_field", kind: "message", T: FloatValue, repeated: true },
    { no: 12, name: "int64_field", kind: "message", T: Int64Value, repeated: true },
    { no: 13, name: "uint64_field", kind: "message", T: UInt64Value, repeated: true },
    { no: 14, name: "int32_field", kind: "message", T: Int32Value, repeated: true },
    { no: 15, name: "uint32_field", kind: "message", T: UInt32Value, repeated: true },
    { no: 16, name: "bool_field", kind: "message", T: BoolValue, repeated: true },
    { no: 17, name: "string_field", kind: "message", T: StringValue, repeated: true },
    { no: 18, name: "bytes_field", kind: "message", T: BytesValue, repeated: true },
  ],
);

/**
 * @generated from message protobuf_unittest.OneofWellKnownTypes
 */
export const OneofWellKnownTypes = proto3.makeMessageType(
  "protobuf_unittest.OneofWellKnownTypes",
  () => [
    { no: 1, name: "any_field", kind: "message", T: Any, oneof: "oneof_field" },
    { no: 2, name: "api_field", kind: "message", T: Api, oneof: "oneof_field" },
    { no: 3, name: "duration_field", kind: "message", T: Duration, oneof: "oneof_field" },
    { no: 4, name: "empty_field", kind: "message", T: Empty, oneof: "oneof_field" },
    { no: 5, name: "field_mask_field", kind: "message", T: FieldMask, oneof: "oneof_field" },
    { no: 6, name: "source_context_field", kind: "message", T: SourceContext, oneof: "oneof_field" },
    { no: 7, name: "struct_field", kind: "message", T: Struct, oneof: "oneof_field" },
    { no: 8, name: "timestamp_field", kind: "message", T: Timestamp, oneof: "oneof_field" },
    { no: 9, name: "type_field", kind: "message", T: Type, oneof: "oneof_field" },
    { no: 10, name: "double_field", kind: "message", T: DoubleValue, oneof: "oneof_field" },
    { no: 11, name: "float_field", kind: "message", T: FloatValue, oneof: "oneof_field" },
    { no: 12, name: "int64_field", kind: "message", T: Int64Value, oneof: "oneof_field" },
    { no: 13, name: "uint64_field", kind: "message", T: UInt64Value, oneof: "oneof_field" },
    { no: 14, name: "int32_field", kind: "message", T: Int32Value, oneof: "oneof_field" },
    { no: 15, name: "uint32_field", kind: "message", T: UInt32Value, oneof: "oneof_field" },
    { no: 16, name: "bool_field", kind: "message", T: BoolValue, oneof: "oneof_field" },
    { no: 17, name: "string_field", kind: "message", T: StringValue, oneof: "oneof_field" },
    { no: 18, name: "bytes_field", kind: "message", T: BytesValue, oneof: "oneof_field" },
  ],
);

/**
 * A map field for each well-known type. We only
 * need to worry about the value part of the map being the
 * well-known types, as messages can't be map keys.
 *
 * @generated from message protobuf_unittest.MapWellKnownTypes
 */
export const MapWellKnownTypes = proto3.makeMessageType(
  "protobuf_unittest.MapWellKnownTypes",
  () => [
    { no: 1, name: "any_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: Any} },
    { no: 2, name: "api_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: Api} },
    { no: 3, name: "duration_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: Duration} },
    { no: 4, name: "empty_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: Empty} },
    { no: 5, name: "field_mask_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: FieldMask} },
    { no: 6, name: "source_context_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: SourceContext} },
    { no: 7, name: "struct_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: Struct} },
    { no: 8, name: "timestamp_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: Timestamp} },
    { no: 9, name: "type_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: Type} },
    { no: 10, name: "double_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: DoubleValue} },
    { no: 11, name: "float_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: FloatValue} },
    { no: 12, name: "int64_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: Int64Value} },
    { no: 13, name: "uint64_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: UInt64Value} },
    { no: 14, name: "int32_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: Int32Value} },
    { no: 15, name: "uint32_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: UInt32Value} },
    { no: 16, name: "bool_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: BoolValue} },
    { no: 17, name: "string_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: StringValue} },
    { no: 18, name: "bytes_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: BytesValue} },
  ],
);

