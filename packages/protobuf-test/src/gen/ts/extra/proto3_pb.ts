/* eslint-disable */
// @generated by protoc-gen-es v0.0.2-alpha.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/proto3.proto (package spec, syntax proto3)
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
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from enum spec.Proto3Enum
 */
export enum Proto3Enum {

    /**
     * @generated from enum value: PROTO3_ENUM_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,

    /**
     * @generated from enum value: PROTO3_ENUM_YES = 1;
     */
    YES = 1,

    /**
     * @generated from enum value: PROTO3_ENUM_NO = 2;
     */
    NO = 2,

}

// Retrieve enum metadata with: proto3.getEnumType(Proto3Enum)
proto3.util.setEnumType(Proto3Enum, "spec.Proto3Enum", [
    {no: 0, name: "PROTO3_ENUM_UNSPECIFIED"},
    {no: 1, name: "PROTO3_ENUM_YES"},
    {no: 2, name: "PROTO3_ENUM_NO"},
]);

/**
 * @generated from message spec.Proto3PackedMessage
 */
export class Proto3PackedMessage extends Message<Proto3PackedMessage> {

    /**
     * @generated from field: repeated double packed_double_field = 101 [packed = true];
     */
    packedDoubleField: number[] = [];

    /**
     * @generated from field: repeated uint32 packed_uint32_field = 102 [packed = true];
     */
    packedUint32Field: number[] = [];

    /**
     * @generated from field: repeated uint64 packed_uint64_field = 103 [packed = true];
     */
    packedUint64Field: bigint[] = [];

    constructor(data?: PartialMessage<Proto3PackedMessage>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "spec.Proto3PackedMessage";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 101, name: "packed_double_field", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true},
        {no: 102, name: "packed_uint32_field", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true},
        {no: 103, name: "packed_uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto3PackedMessage {
        return new Proto3PackedMessage().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto3PackedMessage {
        return new Proto3PackedMessage().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto3PackedMessage {
        return new Proto3PackedMessage().fromJsonString(jsonString, options);
    }

    static equals(a: Proto3PackedMessage | PlainMessage<Proto3PackedMessage> | undefined, b: Proto3PackedMessage | PlainMessage<Proto3PackedMessage> | undefined): boolean {
        return proto3.util.equals(Proto3PackedMessage, a, b);
    }

}


/**
 * @generated from message spec.Proto3UnpackedMessage
 */
export class Proto3UnpackedMessage extends Message<Proto3UnpackedMessage> {

    /**
     * @generated from field: repeated double unpacked_double_field = 201 [packed = false];
     */
    unpackedDoubleField: number[] = [];

    /**
     * @generated from field: repeated uint32 unpacked_uint32_field = 202 [packed = false];
     */
    unpackedUint32Field: number[] = [];

    /**
     * @generated from field: repeated uint64 unpacked_uint64_field = 203 [packed = false];
     */
    unpackedUint64Field: bigint[] = [];

    constructor(data?: PartialMessage<Proto3UnpackedMessage>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "spec.Proto3UnpackedMessage";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 201, name: "unpacked_double_field", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true, packed: false},
        {no: 202, name: "unpacked_uint32_field", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true, packed: false},
        {no: 203, name: "unpacked_uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true, packed: false},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto3UnpackedMessage {
        return new Proto3UnpackedMessage().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto3UnpackedMessage {
        return new Proto3UnpackedMessage().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto3UnpackedMessage {
        return new Proto3UnpackedMessage().fromJsonString(jsonString, options);
    }

    static equals(a: Proto3UnpackedMessage | PlainMessage<Proto3UnpackedMessage> | undefined, b: Proto3UnpackedMessage | PlainMessage<Proto3UnpackedMessage> | undefined): boolean {
        return proto3.util.equals(Proto3UnpackedMessage, a, b);
    }

}


/**
 * @generated from message spec.Proto3UnlabelledMessage
 */
export class Proto3UnlabelledMessage extends Message<Proto3UnlabelledMessage> {

    /**
     * @generated from field: repeated double double_field = 1;
     */
    doubleField: number[] = [];

    /**
     * @generated from field: repeated uint32 uint32_field = 2;
     */
    uint32Field: number[] = [];

    /**
     * @generated from field: repeated uint64 uint64_field = 3;
     */
    uint64Field: bigint[] = [];

    constructor(data?: PartialMessage<Proto3UnlabelledMessage>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "spec.Proto3UnlabelledMessage";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "double_field", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true},
        {no: 2, name: "uint32_field", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true},
        {no: 3, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto3UnlabelledMessage {
        return new Proto3UnlabelledMessage().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto3UnlabelledMessage {
        return new Proto3UnlabelledMessage().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto3UnlabelledMessage {
        return new Proto3UnlabelledMessage().fromJsonString(jsonString, options);
    }

    static equals(a: Proto3UnlabelledMessage | PlainMessage<Proto3UnlabelledMessage> | undefined, b: Proto3UnlabelledMessage | PlainMessage<Proto3UnlabelledMessage> | undefined): boolean {
        return proto3.util.equals(Proto3UnlabelledMessage, a, b);
    }

}


/**
 * @generated from message spec.Proto3OptionalMessage
 */
export class Proto3OptionalMessage extends Message<Proto3OptionalMessage> {

    /**
     * @generated from field: optional string string_field = 1;
     */
    stringField?: string;

    /**
     * @generated from field: optional bytes bytes_field = 2;
     */
    bytesField?: Uint8Array;

    /**
     * @generated from field: optional spec.Proto3Enum enum_field = 3;
     */
    enumField?: Proto3Enum;

    /**
     * @generated from field: optional spec.Proto3OptionalMessage message_field = 4;
     */
    messageField?: Proto3OptionalMessage;

    constructor(data?: PartialMessage<Proto3OptionalMessage>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "spec.Proto3OptionalMessage";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true},
        {no: 2, name: "bytes_field", kind: "scalar", T: 12 /* ScalarType.BYTES */, opt: true},
        {no: 3, name: "enum_field", kind: "enum", T: proto3.getEnumType(Proto3Enum), opt: true},
        {no: 4, name: "message_field", kind: "message", T: Proto3OptionalMessage, opt: true},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto3OptionalMessage {
        return new Proto3OptionalMessage().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto3OptionalMessage {
        return new Proto3OptionalMessage().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto3OptionalMessage {
        return new Proto3OptionalMessage().fromJsonString(jsonString, options);
    }

    static equals(a: Proto3OptionalMessage | PlainMessage<Proto3OptionalMessage> | undefined, b: Proto3OptionalMessage | PlainMessage<Proto3OptionalMessage> | undefined): boolean {
        return proto3.util.equals(Proto3OptionalMessage, a, b);
    }

}


