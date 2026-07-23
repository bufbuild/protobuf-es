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

import { test } from "node:test";
import * as assert from "node:assert";
import * as main from "@bufbuild/protobuf";
import * as wkt from "@bufbuild/protobuf/wkt";
import * as wire from "@bufbuild/protobuf/wire";
import * as enums_pb from "./gen/ts,erasable/extra/erasable_syntax_pb.js";
import * as msg_scalar_pb from "./gen/ts/extra/msg-scalar_pb.js";
import * as service_pb from "./gen/ts/extra/service-all_pb.js";

void test("erasableSyntaxOnly regression tests", () => {
  // This test file is compiled with tsconfig.erasable.json, which enables
  // the option `erasableSyntaxOnly`. With the option enabled, `tsc` errors
  // on syntax that requires transformation - not just type stripping - to
  // become valid ECMAScript.
  //
  // See https://www.typescriptlang.org/tsconfig/#erasableSyntaxOnly

  // protoc-gen-es generates TypeScript enums by default, which are not erasable.
  // With the plugin option `erasable_syntax=true`, it generates an object
  // with `as const` instead, which is erasable:
  assert.ok(enums_pb);

  // Besides TS enums, protoc-gen-es does not generate constructs that are
  // incompatible with `erasableSyntaxOnly`:
  assert.ok(msg_scalar_pb);
  assert.ok(service_pb);

  // Protobuf-ES exports TypeScript enums, for example:
  // - enum ScalarType from @bufbuild/protobuf
  // - enum WireType from @bufbuild/protobuf/wire
  // - various enums from @bufbuild/protobuf/wkt
  // Because `tsc` never compiles the code (the npm packages ship compiled
  // .js files), those TypeScript enums can be used with `erasableSyntaxOnly`.
  assert.ok([
    main,
    main.ScalarType.FIXED32,
    wire,
    wire.WireType.Varint,
    wkt,
    wkt.Edition.EDITION_PROTO3,
  ]);
});
