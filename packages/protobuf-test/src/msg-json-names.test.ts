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

import { describeMT } from "./helpers.js";
import { JsonNamesMessage as TS_JsonNamesMessage } from "./gen/ts/extra/msg-json-names_pb.js";
import { JsonNamesMessage as JS_JsonNamesMessage } from "./gen/js/extra/msg-json-names_pb.js";
import { Any, createRegistry } from "@bufbuild/protobuf";

describeMT(
  { ts: TS_JsonNamesMessage, js: JS_JsonNamesMessage },
  (JsonNamesMessage) => {
    const msg = new JsonNamesMessage();
    msg.a = "a";
    msg.b = "b";
    msg.c = "c";
    msg.d = "c";
    msg.e = "e";
    msg.f = "f";
    test("serializes as expected", () => {
      const got = msg.toJson();
      expect(got).toStrictEqual({
        "": "e",
        "@type": "f",
        c: "c",
        sameJsonName: "b",
      });
    });
    test("json_name clash with Any.@type is not prevented", () => {
      const any = Any.pack(msg);
      const got = any.toJson({
        typeRegistry: createRegistry(JsonNamesMessage),
      });
      expect(got).toStrictEqual({
        "": "e",
        "@type": "type.googleapis.com/spec.JsonNamesMessage",
        c: "c",
        sameJsonName: "b",
      });
    });
  }
);
