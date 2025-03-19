// Copyright 2021-2025 Buf Technologies, Inc.
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

// @generated by protoc-gen-twirp-es v2.2.5 with parameter "target=ts,log_requests=true"
// @generated from file connectrpc/eliza.proto (package connectrpc.eliza.v1, syntax proto3)
/* eslint-disable */

import type { SayRequest, SayResponse } from "./eliza_pb";
import { SayRequestSchema, SayResponseSchema } from "./eliza_pb";
import { fromJson, toJsonString } from "@bufbuild/protobuf";

/**
 * This is a modified copy of ElizaService from https://buf.build/connectrpc/eliza
 *
 * @generated from service connectrpc.eliza.v1.ElizaService
 */
export class ElizaServiceClient {
  constructor(private readonly baseUrl = "https://demo.connectrpc.com/") {}

  /**
   * Say is a unary RPC. Eliza responds to the prompt with a single sentence.
   *
   * @generated from rpc connectrpc.eliza.v1.ElizaService.Say
   */
  async say(request: SayRequest): Promise<SayResponse> {
    const method = "POST";
    const url = `${this.baseUrl}/connectrpc.eliza.v1.ElizaService/Say`;
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const body = toJsonString(SayRequestSchema, request);
    console.log(`${method} ${url}`, request);
    const response = await fetch(url, { method, headers, body });
    if (response.status !== 200) {
      throw Error(`HTTP ${response.status} ${response.statusText}`);
    }
    return fromJson(SayResponseSchema, await response.json());
  }
}
