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
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { suite, test } from "node:test";
import { create, equals } from "@bufbuild/protobuf";
import { StringValueSchema } from "@bufbuild/protobuf/wkt";
import { Client } from "@grpc/grpc-js";
import {
  ServiceAllClient,
  ServiceAllDefinition,
} from "../src/gen/ts/service-all_grpc.js";
import {
  ServiceEmptyClient,
  ServiceEmptyDefinition,
  ServiceNamesClient,
  ServiceNamesDefinition,
} from "../src/gen/ts/service-edge-cases_grpc.js";
import {
  ServiceAllClient as ServiceAllClientJs,
  ServiceAllDefinition as ServiceAllDefinitionJs,
} from "../src/gen/js/service-all_grpc.js";

const genDir = join(__dirname, "..", "src", "gen");

suite("service definition", () => {
  test("method paths", () => {
    assert.equal(ServiceAllDefinition.unary.path, "/spec.ServiceAll/Unary");
    assert.equal(
      ServiceAllDefinition.serverStream.path,
      "/spec.ServiceAll/ServerStream",
    );
    assert.equal(
      ServiceAllDefinition.clientStream.path,
      "/spec.ServiceAll/ClientStream",
    );
    assert.equal(ServiceAllDefinition.bidi.path, "/spec.ServiceAll/Bidi");
  });
  test("stream flags", () => {
    assert.equal(ServiceAllDefinition.unary.requestStream, false);
    assert.equal(ServiceAllDefinition.unary.responseStream, false);
    assert.equal(ServiceAllDefinition.serverStream.requestStream, false);
    assert.equal(ServiceAllDefinition.serverStream.responseStream, true);
    assert.equal(ServiceAllDefinition.clientStream.requestStream, true);
    assert.equal(ServiceAllDefinition.clientStream.responseStream, false);
    assert.equal(ServiceAllDefinition.bidi.requestStream, true);
    assert.equal(ServiceAllDefinition.bidi.responseStream, true);
  });
  test("serializers round-trip", () => {
    const message = create(StringValueSchema, { value: "hello" });
    const bytes = ServiceAllDefinition.unary.requestSerialize(message);
    assert.ok(bytes instanceof Buffer);
    const roundTripped = ServiceAllDefinition.unary.requestDeserialize(bytes);
    assert.ok(equals(StringValueSchema, roundTripped, message));
  });
  test("serializers reject foreign values", () => {
    // toBinary validates the value against the schema via reflection. The
    // error message belongs to @bufbuild/protobuf, so we don't assert on it.
    assert.throws(() =>
      ServiceAllDefinition.unary.requestSerialize({
        value: "hello",
      } as never),
    );
  });
});

suite("generated client class", () => {
  test("extends grpc.Client", () => {
    assert.ok(ServiceAllClient.prototype instanceof Client);
    assert.ok(ServiceEmptyClient.prototype instanceof Client);
    assert.ok(ServiceNamesClient.prototype instanceof Client);
  });
  test("has a method per RPC", () => {
    assert.equal(typeof ServiceAllClient.prototype.unary, "function");
    assert.equal(typeof ServiceAllClient.prototype.serverStream, "function");
    assert.equal(typeof ServiceAllClient.prototype.clientStream, "function");
    assert.equal(typeof ServiceAllClient.prototype.bidi, "function");
  });
});

suite("edge cases", () => {
  test("service without methods generates empty definition", () => {
    assert.deepEqual(ServiceEmptyDefinition, {});
  });
  test("rpc named Constructor is escaped", () => {
    // protobuf-es escapes the local name "constructor" to "constructor$"
    assert.equal(
      ServiceNamesDefinition.constructor$.path,
      "/spec.ServiceNames/Constructor",
    );
    assert.equal(typeof ServiceNamesClient.prototype.constructor$, "function");
  });
  test("rpc named Delete keeps its local name", () => {
    assert.equal(
      ServiceNamesDefinition.delete.path,
      "/spec.ServiceNames/Delete",
    );
    assert.equal(typeof ServiceNamesClient.prototype.delete, "function");
  });
});

suite("js target", () => {
  test("definition matches the ts target", () => {
    assert.equal(ServiceAllDefinitionJs.unary.path, "/spec.ServiceAll/Unary");
    assert.equal(ServiceAllDefinitionJs.bidi.requestStream, true);
    assert.equal(ServiceAllDefinitionJs.bidi.responseStream, true);
  });
  test("serializers round-trip", () => {
    const message = create(StringValueSchema, { value: "hello" });
    const bytes = ServiceAllDefinitionJs.unary.requestSerialize(message);
    const roundTripped = ServiceAllDefinitionJs.unary.requestDeserialize(bytes);
    assert.ok(equals(StringValueSchema, roundTripped, message));
  });
  test("client extends grpc.Client", () => {
    assert.ok(ServiceAllClientJs.prototype instanceof Client);
    assert.equal(typeof ServiceAllClientJs.prototype.unary, "function");
  });
});

suite("generated files", () => {
  test("no file is generated for a proto file without services", () => {
    assert.ok(existsSync(join(genDir, "ts", "no-service_pb.ts")));
    assert.ok(!existsSync(join(genDir, "ts", "no-service_grpc.ts")));
    assert.ok(!existsSync(join(genDir, "js", "no-service_grpc.js")));
    assert.ok(!existsSync(join(genDir, "js", "no-service_grpc.d.ts")));
  });
  test("deprecated rpc is annotated", () => {
    const source = readFileSync(
      join(genDir, "ts", "service-all_grpc.ts"),
      "utf-8",
    );
    const bidiOverload = source.indexOf(
      "bidi(metadata?: Metadata, options?: CallOptions)",
    );
    assert.ok(bidiOverload > 0);
    const jsDocBefore = source.lastIndexOf("/**", bidiOverload);
    assert.ok(
      source.slice(jsDocBefore, bidiOverload).includes("@deprecated"),
      "expected @deprecated in the JSDoc of the deprecated rpc",
    );
  });
});
