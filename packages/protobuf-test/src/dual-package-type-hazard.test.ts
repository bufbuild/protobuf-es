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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import type { DescMessage, Message } from "@bufbuild/protobuf";

import type {
  GenEnum as CjsGenEnumV2,
  GenExtension as CjsGenExtensionV2,
  GenMessage as CjsGenMessageV2,
} from "../../protobuf/dist/commonjs/codegenv2/types.js";
import type {
  GenEnum as EsmGenEnumV2,
  GenExtension as EsmGenExtensionV2,
  GenMessage as EsmGenMessageV2,
} from "../../protobuf/dist/esm/codegenv2/types.js";
import type { GenMessage as CjsGenMessageV1 } from "../../protobuf/dist/commonjs/codegenv1/types.js";
import type { GenMessage as EsmGenMessageV1 } from "../../protobuf/dist/esm/codegenv1/types.js";

type M = Message<"example.M"> & { name: string };
type E = 1 | 2;

void suite("dual-package type hazard (issue #1420)", () => {
  void suite("codegenv2 brand is structural across CJS/ESM", () => {
    void test("GenMessage from CJS is assignable to GenMessage from ESM", () => {
      function t(cjs: CjsGenMessageV2<M>, esm: EsmGenMessageV2<M>) {
        esm = cjs;
        cjs = esm;
        return [cjs, esm];
      }

      assert.ok(t);
    });
    void test("GenEnum from CJS is assignable to GenEnum from ESM", () => {
      function t(cjs: CjsGenEnumV2<E>, esm: EsmGenEnumV2<E>) {
        esm = cjs;
        cjs = esm;
        return [cjs, esm];
      }

      assert.ok(t);
    });
    void test("GenExtension from CJS is assignable to GenExtension from ESM", () => {
      function t(
        cjs: CjsGenExtensionV2<M, string>,
        esm: EsmGenExtensionV2<M, string>,
      ) {
        esm = cjs;
        cjs = esm;
        return [cjs, esm];
      }

      assert.ok(t);
    });
  });

  void suite("codegenv1 brand is structural across CJS/ESM", () => {
    void test("GenMessage from CJS is assignable to GenMessage from ESM", () => {
      function t(cjs: CjsGenMessageV1<M>, esm: EsmGenMessageV1<M>) {
        esm = cjs;
        cjs = esm;
        return [cjs, esm];
      }

      assert.ok(t);
    });
  });

  void suite("brand still rejects DescMessage", () => {
    void test("DescMessage is not assignable to GenMessage (codegenv2)", () => {
      function t(desc: DescMessage) {
        // @ts-expect-error DescMessage lacks the codegenv2 brand.
        const gen: EsmGenMessageV2<M> = desc;
        return gen;
      }

      assert.ok(t);
    });
  });

  void suite("codegenv1 and codegenv2 brands are mutually exclusive", () => {
    void test("codegenv1.GenMessage is not assignable to codegenv2.GenMessage", () => {
      function t(v1: EsmGenMessageV1<M>) {
        // @ts-expect-error different brand properties must not match.
        const v2: EsmGenMessageV2<M> = v1;
        return v2;
      }

      assert.ok(t);
    });
    void test("codegenv2.GenMessage is not assignable to codegenv1.GenMessage", () => {
      function t(v2: EsmGenMessageV2<M>) {
        // @ts-expect-error different brand properties must not match.
        const v1: EsmGenMessageV1<M> = v2;
        return v1;
      }

      assert.ok(t);
    });
    void test("isolation holds across resolution modes too", () => {
      function t(cjsV1: CjsGenMessageV1<M>, esmV2: EsmGenMessageV2<M>) {
        // @ts-expect-error v1 (CJS) and v2 (ESM) brands are not the same.
        const a: EsmGenMessageV2<M> = cjsV1;
        // @ts-expect-error v1 (CJS) and v2 (ESM) brands are not the same.
        const b: CjsGenMessageV1<M> = esmV2;
        return [a, b];
      }

      assert.ok(t);
    });
  });
});
