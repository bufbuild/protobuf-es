// Copyright 2021-2026 Buf Technologies, Inc.
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
import { after, before, suite, test } from "node:test";
import { create } from "@bufbuild/protobuf";
import {
  type Int32Value,
  Int32ValueSchema,
  type StringValue,
  StringValueSchema,
} from "@bufbuild/protobuf/wkt";
import * as grpc from "@grpc/grpc-js";
import {
  ServiceAllClient,
  ServiceAllDefinition,
  type ServiceAllServer,
} from "../src/gen/ts/service-all_grpc.js";

let lastMetadata: string[] = [];

const implementation: ServiceAllServer = {
  unary(call, callback) {
    lastMetadata = call.metadata.get("x-test").map(String);
    if (call.request.value == "error") {
      const error = Object.assign(new Error("intentional failure"), {
        code: grpc.status.INVALID_ARGUMENT,
      });
      callback(error);
      return;
    }
    callback(
      null,
      create(Int32ValueSchema, { value: call.request.value.length }),
    );
  },
  serverStream(call) {
    lastMetadata = call.metadata.get("x-test").map(String);
    const length = call.request.value.length;
    for (const factor of [1, 2, 3]) {
      call.write(create(Int32ValueSchema, { value: length * factor }));
    }
    call.end();
  },
  clientStream(call, callback) {
    lastMetadata = call.metadata.get("x-test").map(String);
    let total = 0;
    call.on("data", (request: StringValue) => {
      total += request.value.length;
    });
    call.on("end", () => {
      callback(null, create(Int32ValueSchema, { value: total }));
    });
  },
  bidi(call) {
    lastMetadata = call.metadata.get("x-test").map(String);
    call.on("data", (request: StringValue) => {
      call.write(create(Int32ValueSchema, { value: request.value.length }));
    });
    call.on("end", () => {
      call.end();
    });
  },
};

suite("e2e against a @grpc/grpc-js server", () => {
  let server: grpc.Server;
  let client: ServiceAllClient;

  before(async () => {
    server = new grpc.Server();
    server.addService(ServiceAllDefinition, implementation);
    const port = await new Promise<number>((resolve, reject) => {
      server.bindAsync(
        "127.0.0.1:0",
        grpc.ServerCredentials.createInsecure(),
        (error, port) => (error !== null ? reject(error) : resolve(port)),
      );
    });
    client = new ServiceAllClient(
      `127.0.0.1:${port}`,
      grpc.credentials.createInsecure(),
    );
  });

  after(() => {
    client.close();
    server.forceShutdown();
  });

  test("unary", async () => {
    const response = await new Promise<Int32Value | undefined>(
      (resolve, reject) => {
        client.unary(
          create(StringValueSchema, { value: "hello" }),
          (error, response) =>
            error !== null ? reject(error) : resolve(response),
        );
      },
    );
    assert.equal(response?.value, 5);
  });

  test("unary with metadata", async () => {
    const metadata = new grpc.Metadata();
    metadata.set("x-test", "yes");
    const response = await new Promise<Int32Value | undefined>(
      (resolve, reject) => {
        client.unary(
          create(StringValueSchema, { value: "hey" }),
          metadata,
          (error, response) =>
            error !== null ? reject(error) : resolve(response),
        );
      },
    );
    assert.equal(response?.value, 3);
    assert.deepEqual(lastMetadata, ["yes"]);
  });

  test("unary with call options", async () => {
    const options: grpc.CallOptions = {
      deadline: new Date(Date.now() + 10_000),
    };
    const response = await new Promise<Int32Value | undefined>(
      (resolve, reject) => {
        client.unary(
          create(StringValueSchema, { value: "hey" }),
          options,
          (error, response) =>
            error !== null ? reject(error) : resolve(response),
        );
      },
    );
    assert.equal(response?.value, 3);
  });

  test("unary with metadata and call options", async () => {
    const metadata = new grpc.Metadata();
    metadata.set("x-test", "both");
    const options: grpc.CallOptions = {
      deadline: new Date(Date.now() + 10_000),
    };
    const response = await new Promise<Int32Value | undefined>(
      (resolve, reject) => {
        client.unary(
          create(StringValueSchema, { value: "hello" }),
          metadata,
          options,
          (error, response) =>
            error !== null ? reject(error) : resolve(response),
        );
      },
    );
    assert.equal(response?.value, 5);
    assert.deepEqual(lastMetadata, ["both"]);
  });

  test("unary error propagation", async () => {
    const error = await new Promise<grpc.ServiceError | null>((resolve) => {
      client.unary(create(StringValueSchema, { value: "error" }), (error) =>
        resolve(error),
      );
    });
    assert.ok(error);
    assert.equal(error.code, grpc.status.INVALID_ARGUMENT);
    assert.match(error.details, /intentional failure/);
  });

  test("server streaming", async () => {
    const stream = client.serverStream(
      create(StringValueSchema, { value: "hi" }),
    );
    const received: number[] = [];
    for await (const response of stream as AsyncIterable<Int32Value>) {
      received.push(response.value);
    }
    assert.deepEqual(received, [2, 4, 6]);
  });

  test("server streaming with metadata", async () => {
    const metadata = new grpc.Metadata();
    metadata.set("x-test", "server-stream");
    const stream = client.serverStream(
      create(StringValueSchema, { value: "hi" }),
      metadata,
    );
    const received: number[] = [];
    for await (const response of stream as AsyncIterable<Int32Value>) {
      received.push(response.value);
    }
    assert.deepEqual(received, [2, 4, 6]);
    assert.deepEqual(lastMetadata, ["server-stream"]);
  });

  test("client streaming", async () => {
    const response = await new Promise<Int32Value | undefined>(
      (resolve, reject) => {
        const stream = client.clientStream((error, response) =>
          error !== null ? reject(error) : resolve(response),
        );
        stream.write(create(StringValueSchema, { value: "a" }));
        stream.write(create(StringValueSchema, { value: "bc" }));
        stream.end();
      },
    );
    assert.equal(response?.value, 3);
  });

  test("client streaming with metadata", async () => {
    const metadata = new grpc.Metadata();
    metadata.set("x-test", "client-stream");
    const response = await new Promise<Int32Value | undefined>(
      (resolve, reject) => {
        const stream = client.clientStream(metadata, (error, response) =>
          error !== null ? reject(error) : resolve(response),
        );
        stream.write(create(StringValueSchema, { value: "abc" }));
        stream.end();
      },
    );
    assert.equal(response?.value, 3);
    assert.deepEqual(lastMetadata, ["client-stream"]);
  });

  test("bidi streaming", async () => {
    const stream = client.bidi();
    const received: number[] = [];
    stream.on("data", (response: Int32Value) => {
      received.push(response.value);
    });
    const ended = new Promise<void>((resolve) => stream.on("end", resolve));
    stream.write(create(StringValueSchema, { value: "x" }));
    stream.write(create(StringValueSchema, { value: "xyz" }));
    stream.end();
    await ended;
    assert.deepEqual(received, [1, 3]);
  });

  test("bidi streaming with metadata", async () => {
    const metadata = new grpc.Metadata();
    metadata.set("x-test", "bidi");
    const stream = client.bidi(metadata);
    const received: number[] = [];
    stream.on("data", (response: Int32Value) => {
      received.push(response.value);
    });
    const ended = new Promise<void>((resolve) => stream.on("end", resolve));
    stream.write(create(StringValueSchema, { value: "xy" }));
    stream.end();
    await ended;
    assert.deepEqual(received, [2]);
    assert.deepEqual(lastMetadata, ["bidi"]);
  });
});
