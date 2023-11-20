// Copyright 2022-2023 The Connect Authors
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
import { Message, proto3 } from "@bufbuild/protobuf";
/**
 * SayRequest is a single-sentence request.
 *
 * @generated from message connectrpc.eliza.v1.SayRequest
 */
export class SayRequest extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: string sentence = 1;
         */
        this.sentence = "";
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new SayRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new SayRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new SayRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(SayRequest, a, b);
    }
}
SayRequest.runtime = proto3;
SayRequest.typeName = "connectrpc.eliza.v1.SayRequest";
SayRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "sentence", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);
/**
 * SayResponse is a single-sentence response.
 *
 * @generated from message connectrpc.eliza.v1.SayResponse
 */
export class SayResponse extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: string sentence = 1;
         */
        this.sentence = "";
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new SayResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new SayResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new SayResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(SayResponse, a, b);
    }
}
SayResponse.runtime = proto3;
SayResponse.typeName = "connectrpc.eliza.v1.SayResponse";
SayResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "sentence", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);
/**
 * ConverseRequest is a single sentence request sent as part of a
 * back-and-forth conversation.
 *
 * @generated from message connectrpc.eliza.v1.ConverseRequest
 */
export class ConverseRequest extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: string sentence = 1;
         */
        this.sentence = "";
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ConverseRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ConverseRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ConverseRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ConverseRequest, a, b);
    }
}
ConverseRequest.runtime = proto3;
ConverseRequest.typeName = "connectrpc.eliza.v1.ConverseRequest";
ConverseRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "sentence", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);
/**
 * ConverseResponse is a single sentence response sent in answer to a
 * ConverseRequest.
 *
 * @generated from message connectrpc.eliza.v1.ConverseResponse
 */
export class ConverseResponse extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: string sentence = 1;
         */
        this.sentence = "";
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ConverseResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ConverseResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ConverseResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ConverseResponse, a, b);
    }
}
ConverseResponse.runtime = proto3;
ConverseResponse.typeName = "connectrpc.eliza.v1.ConverseResponse";
ConverseResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "sentence", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);
/**
 * IntroduceRequest asks Eliza to introduce itself to the named user.
 *
 * @generated from message connectrpc.eliza.v1.IntroduceRequest
 */
export class IntroduceRequest extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: string name = 1;
         */
        this.name = "";
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new IntroduceRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new IntroduceRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new IntroduceRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(IntroduceRequest, a, b);
    }
}
IntroduceRequest.runtime = proto3;
IntroduceRequest.typeName = "connectrpc.eliza.v1.IntroduceRequest";
IntroduceRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);
/**
 * IntroduceResponse is one sentence of Eliza's introductory monologue.
 *
 * @generated from message connectrpc.eliza.v1.IntroduceResponse
 */
export class IntroduceResponse extends Message {
    constructor(data) {
        super();
        /**
         * @generated from field: string sentence = 1;
         */
        this.sentence = "";
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new IntroduceResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new IntroduceResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new IntroduceResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(IntroduceResponse, a, b);
    }
}
IntroduceResponse.runtime = proto3;
IntroduceResponse.typeName = "connectrpc.eliza.v1.IntroduceResponse";
IntroduceResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "sentence", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);
