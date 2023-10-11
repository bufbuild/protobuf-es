// Copyright 2021-2023 Buf Technologies, Inc.
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

import * as assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import { ElizaServiceClient } from "../src/gen/connectrpc/eliza/v1/eliza_twirp.js";
import { SayRequest } from "../src/gen/connectrpc/eliza/v1/eliza_pb.js";

describe("custom plugin", async () => {
  it("should generate client class", () => {
    assert.equal(typeof ElizaServiceClient, "function");
    const client = new ElizaServiceClient("https://example.com");
    assert.ok(client !== undefined);
  });
  describe("generated client", () => {
    it("should should take argument in constructor", () => {
      const client = new ElizaServiceClient("https://example.com");
      assert.ok(client !== undefined);
      assert.equal(
        (client as unknown as Record<string, unknown>).baseUrl,
        "https://example.com"
      );
    });
    it("should have method for unary RPC", () => {
      const client = new ElizaServiceClient("https://example.com");
      assert.equal(typeof client.say, "function");
    });
    it("should use fetch", async (t) => {
      let fetch = mock.fn<typeof globalThis.fetch>(globalThis.fetch);
      globalThis.fetch = fetch;
      t.after(() => fetch.mock.restore());
      fetch.mock.mockImplementationOnce(
        async () =>
          new Response('{"sentence":"ho"}', {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
      );
      const client = new ElizaServiceClient("https://example.com");
      const res = await client.say(new SayRequest({ sentence: "hi" }));
      assert.equal(res.sentence, "ho");
      assert.equal(fetch.mock.callCount(), 1);
      const [argInput, argInit] = fetch.mock.calls[0].arguments;
      assert.strictEqual(
        argInput,
        "https://example.com/connectrpc.eliza.v1.ElizaService/Say"
      );
      assert.equal(argInit?.method, "POST");
      assert.equal(
        new Headers(argInit?.headers).get("Content-Type"),
        "application/json"
      );
      assert.equal(argInit?.body, '{"sentence":"hi"}');
    });
  });
});
