// Copyright 2021-2024 Buf Technologies, Inc.
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

import { describe, expect, test } from "@jest/globals";
import * as TS from "./gen/ts/extra/proto3_pb.js";
import * as JS from "./gen/js/extra/proto3_pb.js";
import { describeMT, testMT } from "./helpers.js";

describe("proto3 field info packed", () => {
  // Also see msg-scalars.test.ts
  describeMT(
    { ts: TS.Proto3PackedMessage, js: JS.Proto3PackedMessage },
    (messageType) => {
      test.each(messageType.fields.byNumber())("$name is packed", (field) => {
        expect(field.packed).toBe(true);
        expect(field.repeated).toBe(true);
      });
    },
  );
  describeMT(
    { ts: TS.Proto3UnpackedMessage, js: JS.Proto3UnpackedMessage },
    (messageType) => {
      test.each(messageType.fields.byNumber())("$name is unpacked", (field) => {
        expect(field.packed).toBe(false);
        expect(field.repeated).toBe(true);
      });
    },
  );
  describeMT(
    {
      ts: TS.Proto3UnlabelledMessage,
      js: JS.Proto3UnlabelledMessage,
    },
    (messageType) => {
      test.each(messageType.fields.byNumber())("$name is unpacked", (field) => {
        expect(field.packed).toBe(true);
        expect(field.repeated).toBe(true);
      });
    },
  );
});

describe("proto3 field info optional / required", () => {
  describeMT(
    { ts: TS.Proto3OptionalMessage, js: JS.Proto3OptionalMessage },
    (messageType) => {
      test.each(messageType.fields.byNumber())("$name is optional", (field) => {
        expect(field.req).toBe(false);
        expect(field.opt).toBe(true);
      });
    },
  );
  describeMT(
    { ts: TS.Proto3UnlabelledMessage, js: JS.Proto3UnlabelledMessage },
    (messageType) => {
      test.each(messageType.fields.byNumber())("$name is optional", (field) => {
        expect(field.req).toBe(false);
        expect(field.opt).toBe(false);
      });
    },
  );
});

describe("proto3 toBinary", () => {
  describe("toBinary does not raise an error with fields that were set to undefined", () => {
    testMT({ ts: TS.Proto3Message, js: JS.Proto3Message }, (messageType) => {
      const message = new messageType();
      message.stringField = undefined as unknown as string;
      const serializedMessage = message.toBinary();
      expect(serializedMessage).toBeDefined();
    });
  });
});
