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

import { SimpleEnum as SimpleEnum_TS } from "./gen/ts/extra/enum_pb.js";
import { SimpleEnum as SimpleEnum_JS } from "./gen/js/extra/enum_pb.js";
import { AliasEnum as AliasEnum_TS } from "./gen/ts/extra/enum_pb.js";
import { AliasEnum as AliasEnum_JS } from "./gen/js/extra/enum_pb.js";
import { PrefixEnum as PrefixEnum_TS } from "./gen/ts/extra/enum_pb.js";
import { PrefixEnum as PrefixEnum_JS } from "./gen/js/extra/enum_pb.js";
import { proto3 } from "@bufbuild/protobuf";

describe("simple enum", () => {
  describe("generated as TS", () => {
    test("has expected values", () => {
      expect(SimpleEnum_TS.SIMPLE_ZERO).toBe(0);
      expect(SimpleEnum_TS.SIMPLE_ONE).toBe(1);
    });
    test("has enum type", () => {
      const type = proto3.getEnumType(SimpleEnum_TS);
      const value0 = type.findName("SIMPLE_ZERO");
      expect(value0).toBeDefined();
      expect(value0?.no).toBe(0);
      expect(value0?.name).toBe("SIMPLE_ZERO");
      expect(value0?.localName).toBe("SIMPLE_ZERO");
    });
  });
  describe("generated as JS", () => {
    test("has expected values", () => {
      expect(SimpleEnum_JS.SIMPLE_ZERO).toBe(0);
      expect(SimpleEnum_JS.SIMPLE_ONE).toBe(1);
    });
    test("has enum type", () => {
      const type = proto3.getEnumType(SimpleEnum_JS);
      const value0 = type.findName("SIMPLE_ZERO");
      expect(value0).toBeDefined();
      expect(value0?.no).toBe(0);
      expect(value0?.name).toBe("SIMPLE_ZERO");
      expect(value0?.localName).toBe("SIMPLE_ZERO");
    });
  });
});

describe("prefixed enum", () => {
  describe("generated as TS", () => {
    test("has expected values", () => {
      expect(PrefixEnum_TS.ZERO).toBe(0);
      expect(PrefixEnum_TS.ONE).toBe(1);
    });
    test("has enum type", () => {
      const type = proto3.getEnumType(PrefixEnum_TS);
      const value0 = type.findName("PREFIX_ENUM_ZERO");
      expect(value0).toBeDefined();
      expect(value0?.no).toBe(0);
      expect(value0?.name).toBe("PREFIX_ENUM_ZERO");
      expect(value0?.localName).toBe("ZERO");
    });
  });
  describe("generated as JS", () => {
    test("has expected values", () => {
      expect(PrefixEnum_JS.ZERO).toBe(0);
      expect(PrefixEnum_JS.ONE).toBe(1);
    });
    test("has enum type", () => {
      const type = proto3.getEnumType(PrefixEnum_JS);
      const value0 = type.findName("PREFIX_ENUM_ZERO");
      expect(value0).toBeDefined();
      expect(value0?.no).toBe(0);
      expect(value0?.name).toBe("PREFIX_ENUM_ZERO");
      expect(value0?.localName).toBe("ZERO");
    });
  });
});

describe("alias enum", () => {
  describe("generated as TS", () => {
    test("has expected values", () => {
      expect(AliasEnum_TS.ALIAS_ZERO).toBe(0);
      expect(AliasEnum_TS.ALIAS_ONE).toBe(1);
      expect(AliasEnum_TS.ALIAS_ONE_ALIASED).toBe(1);
    });
    test("has enum type", () => {
      const type = proto3.getEnumType(AliasEnum_TS);
      const value0 = type.findName("ALIAS_ZERO");
      expect(value0).toBeDefined();
      expect(value0?.no).toBe(0);
      expect(value0?.name).toBe("ALIAS_ZERO");
      expect(value0?.localName).toBe("ALIAS_ZERO");
    });
  });
  describe("generated as JS", () => {
    test("has expected values", () => {
      expect(AliasEnum_JS.ALIAS_ZERO).toBe(0);
      expect(AliasEnum_JS.ALIAS_ONE).toBe(1);
      expect(AliasEnum_JS.ALIAS_ONE_ALIASED).toBe(1);
    });
    test("has enum type", () => {
      const type = proto3.getEnumType(AliasEnum_JS);
      const value0 = type.findName("ALIAS_ZERO");
      expect(value0).toBeDefined();
      expect(value0?.no).toBe(0);
      expect(value0?.name).toBe("ALIAS_ZERO");
      expect(value0?.localName).toBe("ALIAS_ZERO");
    });
  });
});
