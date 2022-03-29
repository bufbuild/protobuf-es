/* eslint-disable */
// @generated by protoc-gen-es v0.0.2-alpha.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/msg-scalar.proto (package spec, syntax proto3)
//
// Copyright 2021-2022 Buf Technologies, Inc.
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

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3, protoInt64} from "@bufbuild/protobuf";

/**
 * @generated from message spec.ScalarValuesMessage
 */
export class ScalarValuesMessage extends Message<ScalarValuesMessage> {

    /**
     * @generated from field: double double_field = 1;
     */
    doubleField = 0;

    /**
     * @generated from field: float float_field = 2;
     */
    floatField = 0;

    /**
     * @generated from field: int64 int64_field = 3;
     */
    int64Field = protoInt64.zero;

    /**
     * @generated from field: uint64 uint64_field = 4;
     */
    uint64Field = protoInt64.zero;

    /**
     * @generated from field: int32 int32_field = 5;
     */
    int32Field = 0;

    /**
     * @generated from field: fixed64 fixed64_field = 6;
     */
    fixed64Field = protoInt64.zero;

    /**
     * @generated from field: fixed32 fixed32_field = 7;
     */
    fixed32Field = 0;

    /**
     * @generated from field: bool bool_field = 8;
     */
    boolField = false;

    /**
     * @generated from field: string string_field = 9;
     */
    stringField = "";

    /**
     * @generated from field: bytes bytes_field = 11;
     */
    bytesField = new Uint8Array(0);

    /**
     * @generated from field: uint32 uint32_field = 12;
     */
    uint32Field = 0;

    /**
     * @generated from field: sfixed32 sfixed32_field = 14;
     */
    sfixed32Field = 0;

    /**
     * @generated from field: sfixed64 sfixed64_field = 15;
     */
    sfixed64Field = protoInt64.zero;

    /**
     * @generated from field: sint32 sint32_field = 16;
     */
    sint32Field = 0;

    /**
     * @generated from field: sint64 sint64_field = 17;
     */
    sint64Field = protoInt64.zero;

    constructor(data?: PartialMessage<ScalarValuesMessage>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "spec.ScalarValuesMessage";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "double_field", kind: "scalar", T: 1 /* ScalarType.DOUBLE */},
        {no: 2, name: "float_field", kind: "scalar", T: 2 /* ScalarType.FLOAT */},
        {no: 3, name: "int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */},
        {no: 4, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */},
        {no: 5, name: "int32_field", kind: "scalar", T: 5 /* ScalarType.INT32 */},
        {no: 6, name: "fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */},
        {no: 7, name: "fixed32_field", kind: "scalar", T: 7 /* ScalarType.FIXED32 */},
        {no: 8, name: "bool_field", kind: "scalar", T: 8 /* ScalarType.BOOL */},
        {no: 9, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 11, name: "bytes_field", kind: "scalar", T: 12 /* ScalarType.BYTES */},
        {no: 12, name: "uint32_field", kind: "scalar", T: 13 /* ScalarType.UINT32 */},
        {no: 14, name: "sfixed32_field", kind: "scalar", T: 15 /* ScalarType.SFIXED32 */},
        {no: 15, name: "sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */},
        {no: 16, name: "sint32_field", kind: "scalar", T: 17 /* ScalarType.SINT32 */},
        {no: 17, name: "sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ScalarValuesMessage {
        return new ScalarValuesMessage().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ScalarValuesMessage {
        return new ScalarValuesMessage().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ScalarValuesMessage {
        return new ScalarValuesMessage().fromJsonString(jsonString, options);
    }

    static equals(a: ScalarValuesMessage | PlainMessage<ScalarValuesMessage> | undefined, b: ScalarValuesMessage | PlainMessage<ScalarValuesMessage> | undefined): boolean {
        return proto3.util.equals(ScalarValuesMessage, a, b);
    }

}


/**
 * @generated from message spec.RepeatedScalarValuesMessage
 */
export class RepeatedScalarValuesMessage extends Message<RepeatedScalarValuesMessage> {

    /**
     * @generated from field: repeated double double_field = 1;
     */
    doubleField: number[] = [];

    /**
     * @generated from field: repeated float float_field = 2;
     */
    floatField: number[] = [];

    /**
     * @generated from field: repeated int64 int64_field = 3;
     */
    int64Field: bigint[] = [];

    /**
     * @generated from field: repeated uint64 uint64_field = 4;
     */
    uint64Field: bigint[] = [];

    /**
     * @generated from field: repeated int32 int32_field = 5;
     */
    int32Field: number[] = [];

    /**
     * @generated from field: repeated fixed64 fixed64_field = 6;
     */
    fixed64Field: bigint[] = [];

    /**
     * @generated from field: repeated fixed32 fixed32_field = 7;
     */
    fixed32Field: number[] = [];

    /**
     * @generated from field: repeated bool bool_field = 8;
     */
    boolField: boolean[] = [];

    /**
     * @generated from field: repeated string string_field = 9;
     */
    stringField: string[] = [];

    /**
     * @generated from field: repeated bytes bytes_field = 11;
     */
    bytesField: Uint8Array[] = [];

    /**
     * @generated from field: repeated uint32 uint32_field = 12;
     */
    uint32Field: number[] = [];

    /**
     * @generated from field: repeated sfixed32 sfixed32_field = 14;
     */
    sfixed32Field: number[] = [];

    /**
     * @generated from field: repeated sfixed64 sfixed64_field = 15;
     */
    sfixed64Field: bigint[] = [];

    /**
     * @generated from field: repeated sint32 sint32_field = 16;
     */
    sint32Field: number[] = [];

    /**
     * @generated from field: repeated sint64 sint64_field = 17;
     */
    sint64Field: bigint[] = [];

    constructor(data?: PartialMessage<RepeatedScalarValuesMessage>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "spec.RepeatedScalarValuesMessage";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "double_field", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true},
        {no: 2, name: "float_field", kind: "scalar", T: 2 /* ScalarType.FLOAT */, repeated: true},
        {no: 3, name: "int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true},
        {no: 4, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true},
        {no: 5, name: "int32_field", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true},
        {no: 6, name: "fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true},
        {no: 7, name: "fixed32_field", kind: "scalar", T: 7 /* ScalarType.FIXED32 */, repeated: true},
        {no: 8, name: "bool_field", kind: "scalar", T: 8 /* ScalarType.BOOL */, repeated: true},
        {no: 9, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true},
        {no: 11, name: "bytes_field", kind: "scalar", T: 12 /* ScalarType.BYTES */, repeated: true},
        {no: 12, name: "uint32_field", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true},
        {no: 14, name: "sfixed32_field", kind: "scalar", T: 15 /* ScalarType.SFIXED32 */, repeated: true},
        {no: 15, name: "sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true},
        {no: 16, name: "sint32_field", kind: "scalar", T: 17 /* ScalarType.SINT32 */, repeated: true},
        {no: 17, name: "sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RepeatedScalarValuesMessage {
        return new RepeatedScalarValuesMessage().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RepeatedScalarValuesMessage {
        return new RepeatedScalarValuesMessage().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RepeatedScalarValuesMessage {
        return new RepeatedScalarValuesMessage().fromJsonString(jsonString, options);
    }

    static equals(a: RepeatedScalarValuesMessage | PlainMessage<RepeatedScalarValuesMessage> | undefined, b: RepeatedScalarValuesMessage | PlainMessage<RepeatedScalarValuesMessage> | undefined): boolean {
        return proto3.util.equals(RepeatedScalarValuesMessage, a, b);
    }

}


