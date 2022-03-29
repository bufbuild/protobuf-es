/* eslint-disable */
// @generated by protoc-gen-es v0.0.2-alpha.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/msg-json-names.proto (package spec, syntax proto3)
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
 * @generated from message spec.JsonNamesMessage
 */
export declare class JsonNamesMessage extends Message<JsonNamesMessage> {

    /**
     * @generated from field: string scalar_field = 1 [json_name = "scalarFieldJsonName"];
     */
    scalarField: string;

    /**
     * @generated from field: repeated string repeated_scalar_field = 2 [json_name = "repeatedScalarFieldJsonName"];
     */
    repeatedScalarField: string[];

    /**
     * @generated from field: string a = 3 [json_name = "sameJsonName"];
     */
    a: string;

    /**
     * @generated from field: string b = 4 [json_name = "sameJsonName"];
     */
    b: string;

    /**
     * @generated from field: string c = 5;
     */
    c: string;

    /**
     * @generated from field: string d = 6 [json_name = "c"];
     */
    d: string;

    /**
     * @generated from field: string e = 7;
     */
    e: string;

    constructor(data?: PartialMessage<JsonNamesMessage>);

    static readonly runtime: typeof proto3;
    static readonly typeName = "spec.JsonNamesMessage";
    static readonly fields: FieldList;

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JsonNamesMessage;

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JsonNamesMessage;

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JsonNamesMessage;

    static equals(a: JsonNamesMessage | PlainMessage<JsonNamesMessage> | undefined, b: JsonNamesMessage | PlainMessage<JsonNamesMessage> | undefined): boolean;

}


