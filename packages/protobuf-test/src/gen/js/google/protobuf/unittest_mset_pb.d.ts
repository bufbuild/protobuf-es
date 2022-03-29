/* eslint-disable */
// @generated by protoc-gen-es v0.0.2-alpha.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_mset.proto (package protobuf_unittest, syntax proto2)
//
// Protocol Buffers - Google's data interchange format
// Copyright 2008 Google Inc.  All rights reserved.
// https://developers.google.com/protocol-buffers/
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// Author: kenton@google.com (Kenton Varda)
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// This file is similar to unittest_mset_wire_format.proto, but does not
// have a TestMessageSet, so it can be downgraded to proto1.

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto2} from "@bufbuild/protobuf";
import type {TestMessageSet} from "./unittest_mset_wire_format_pb.js";

/**
 * @generated from message protobuf_unittest.TestMessageSetContainer
 */
export declare class TestMessageSetContainer extends Message<TestMessageSetContainer> {

    /**
     * @generated from field: optional proto2_wireformat_unittest.TestMessageSet message_set = 1;
     */
    messageSet?: TestMessageSet;

    constructor(data?: PartialMessage<TestMessageSetContainer>);

    static readonly runtime: typeof proto2;
    static readonly typeName = "protobuf_unittest.TestMessageSetContainer";
    static readonly fields: FieldList;

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageSetContainer;

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageSetContainer;

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageSetContainer;

    static equals(a: TestMessageSetContainer | PlainMessage<TestMessageSetContainer> | undefined, b: TestMessageSetContainer | PlainMessage<TestMessageSetContainer> | undefined): boolean;

}


/**
 * @generated from message protobuf_unittest.TestMessageSetExtension1
 */
export declare class TestMessageSetExtension1 extends Message<TestMessageSetExtension1> {

    /**
     * @generated from field: optional int32 i = 15;
     */
    i?: number;

    /**
     * @generated from field: optional proto2_wireformat_unittest.TestMessageSet recursive = 16;
     */
    recursive?: TestMessageSet;

    /**
     * @generated from field: optional string test_aliasing = 17;
     */
    testAliasing?: string;

    constructor(data?: PartialMessage<TestMessageSetExtension1>);

    static readonly runtime: typeof proto2;
    static readonly typeName = "protobuf_unittest.TestMessageSetExtension1";
    static readonly fields: FieldList;

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageSetExtension1;

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageSetExtension1;

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageSetExtension1;

    static equals(a: TestMessageSetExtension1 | PlainMessage<TestMessageSetExtension1> | undefined, b: TestMessageSetExtension1 | PlainMessage<TestMessageSetExtension1> | undefined): boolean;

}


/**
 * @generated from message protobuf_unittest.TestMessageSetExtension2
 */
export declare class TestMessageSetExtension2 extends Message<TestMessageSetExtension2> {

    /**
     * @generated from field: optional string str = 25;
     */
    str?: string;

    constructor(data?: PartialMessage<TestMessageSetExtension2>);

    static readonly runtime: typeof proto2;
    static readonly typeName = "protobuf_unittest.TestMessageSetExtension2";
    static readonly fields: FieldList;

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageSetExtension2;

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageSetExtension2;

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageSetExtension2;

    static equals(a: TestMessageSetExtension2 | PlainMessage<TestMessageSetExtension2> | undefined, b: TestMessageSetExtension2 | PlainMessage<TestMessageSetExtension2> | undefined): boolean;

}


/**
 * MessageSet wire format is equivalent to this.
 *
 * @generated from message protobuf_unittest.RawMessageSet
 */
export declare class RawMessageSet extends Message<RawMessageSet> {

    /**
     * @generated from field: repeated protobuf_unittest.RawMessageSet.Item item = 1;
     */
    item: RawMessageSet_Item[];

    constructor(data?: PartialMessage<RawMessageSet>);

    static readonly runtime: typeof proto2;
    static readonly typeName = "protobuf_unittest.RawMessageSet";
    static readonly fields: FieldList;

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RawMessageSet;

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RawMessageSet;

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RawMessageSet;

    static equals(a: RawMessageSet | PlainMessage<RawMessageSet> | undefined, b: RawMessageSet | PlainMessage<RawMessageSet> | undefined): boolean;

}

/**
 * @generated from message protobuf_unittest.RawMessageSet.Item
 */
export declare class RawMessageSet_Item extends Message<RawMessageSet_Item> {

    /**
     * @generated from field: required int32 type_id = 2;
     */
    typeId: number;

    /**
     * @generated from field: required bytes message = 3;
     */
    message: Uint8Array;

    constructor(data?: PartialMessage<RawMessageSet_Item>);

    static readonly runtime: typeof proto2;
    static readonly typeName = "protobuf_unittest.RawMessageSet.Item";
    static readonly fields: FieldList;

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RawMessageSet_Item;

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RawMessageSet_Item;

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RawMessageSet_Item;

    static equals(a: RawMessageSet_Item | PlainMessage<RawMessageSet_Item> | undefined, b: RawMessageSet_Item | PlainMessage<RawMessageSet_Item> | undefined): boolean;

}



