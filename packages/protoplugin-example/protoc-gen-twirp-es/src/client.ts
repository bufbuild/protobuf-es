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

import type { Message } from "@bufbuild/protobuf";

export interface TransportOptions {
  baseUrl: string;
  headers?: HeadersInit;
}

export class TwirpClient {
  private readonly options: TransportOptions = {
    baseUrl: "",
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
    headers.set("content-type", contentType);
    const response = await fetch(
      `${this.options.baseUrl}/${service}/${method}`,
      {
        ...this.options,
        method: "POST",
        headers,
        body: data.toJsonString(),
      }
    );
    if (response.status === 200) {
      if (contentType === "application/json") {
        return await response.json();
      }
      return new Uint8Array(await response.arrayBuffer());
    }

    throw Error(await response.json());
  }
}
