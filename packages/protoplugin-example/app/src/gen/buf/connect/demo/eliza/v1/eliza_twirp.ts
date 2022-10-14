// Copyright 2022 Buf Technologies, Inc.
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

// @generated by protoc-gen-twirp-es v0.1.0 with parameter "target=ts+js+dts"
// @generated from file buf/connect/demo/eliza/v1/eliza.proto (package buf.connect.demo.eliza.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {ConverseRequest, ConverseResponse, IntroduceRequest, IntroduceResponse, SayRequest, SayResponse} from "./eliza_pb.js";

import type { JsonValue, Message } from '@bufbuild/protobuf';

export interface TransportOptions {
    baseUrl: string;
    headers?: HeadersInit;
}

export class TwirpError extends Error {
    public readonly msg: string;
    public readonly code: string;

    constructor(code: string, msg: string) {
        super(msg);
        this.code = code;
        this.msg = msg;
    }
}

class TwirpClient {
    private readonly options: TransportOptions = {
        baseUrl: '',
    };

    constructor(opts: TransportOptions) {
        this.options = opts;
    }

    async request<T extends Message<T>>(
        service: string,
        method: string,
        contentType: string,
        data: T
    ) {
        const headers = new Headers(this.options.headers ?? []);
        headers.set('content-type', contentType);
        const response = await fetch(
            `${this.options.baseUrl}/${service}/${method}`,
            {
                ...this.options,
                method: 'POST',
                headers,
                body: data.toJsonString(),
            }
        );
        if (response.status === 200) {
            if (contentType === 'application/json') {
                return await response.json();
            }
            return new Uint8Array(await response.arrayBuffer());
        }
        throw Error(await response.json());
    }
}

export function createElizaServiceClient(opts: TransportOptions): ElizaService {
    return new ElizaServiceClient(opts);
}

export interface ElizaService {
    /**
     * Say is a unary request demo. This method should allow for a one sentence
     * response given a one sentence request.
     *
     * @generated from rpc buf.connect.demo.eliza.v1.ElizaService.Say
     */
    Say(request: SayRequest): Promise<SayResponse>;
    /**
     * Converse is a bi-directional streaming request demo. This method should allow for
     * many requests and many responses.
     *
     * @generated from rpc buf.connect.demo.eliza.v1.ElizaService.Converse
     */
    Converse(request: ConverseRequest): Promise<ConverseResponse>;
    /**
     * Introduce is a server-streaming request demo.  This method allows for a single request that will return a series
     * of responses
     *
     * @generated from rpc buf.connect.demo.eliza.v1.ElizaService.Introduce
     */
    Introduce(request: IntroduceRequest): Promise<IntroduceResponse>;
}

export class ElizaServiceClient extends TwirpClient {
    constructor(opts: TransportOptions) {
        super(opts);
    }

    async Say(request: SayRequest): Promise<SayResponse> {
        const promise = this.request(
            "buf.connect.demo.eliza.v1.ElizaService", 
            "Say",
            "application/json",
            request
        );
        return promise.then(async (data) =>
             SayResponse.fromJson(data as JsonValue)
        );
    };

    async Converse(request: ConverseRequest): Promise<ConverseResponse> {
        throw new TwirpError('unimplemented', 'BiDiStreaming is not supported');
    };

    async Introduce(request: IntroduceRequest): Promise<IntroduceResponse> {
        throw new TwirpError('unimplemented', 'ServerStreaming is not supported');
    };

}
