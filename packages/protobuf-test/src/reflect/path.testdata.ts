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

import type { Path } from "@bufbuild/protobuf/reflect";
import assert from "node:assert/strict";
import {
  createRegistry,
  type DescExtension,
  type DescMessage,
  type Registry,
} from "@bufbuild/protobuf";
import { compileFile } from "../helpers.js";

export function assertPathsEqual(got: Path, want: Path) {
  assert.equal(
    got.length,
    want.length,
    `wanted path with ${want.length} elements, got ${got.length}`,
  );
  const gotKinds = got.map((e) => e.kind);
  const wantKinds = want.map((e) => e.kind);
  assert.deepStrictEqual(
    gotKinds,
    wantKinds,
    `wanted path with kinds "${wantKinds.join('", "')}", got "${gotKinds.join('", "')}"`,
  );
  assert.deepStrictEqual(got, want);
}

type TestDataForPaths = {
  schema: DescMessage;
  registry: Registry;
  cases: {
    schema: DescMessage;
    string: string;
    goldenString: string;
    golden: Path;
    usesExtension?: DescExtension;
  }[];
  invalid: {
    schema: DescMessage;
    input: string;
    error: string | RegExp;
  }[];
};

export async function getTestDataForPaths(): Promise<TestDataForPaths> {
  const file = await compileFile(`
    syntax="proto2";
    message User {
      optional string first_name = 1;
      optional User manager = 4;
      repeated string locations = 5;
      map<string, string> projects = 6;
      oneof scalar {
        int32 value = 11;
      }
      repeated User peers = 12;
      extensions 1000;
    }
    extend User {
      optional bool foo = 1000;
    }
  `);
  const schema = file.messages[0];
  const ext = file.extensions[0];
  const cases: TestDataForPaths["cases"] = [
    {
      schema,
      string: "scalar",
      goldenString: "scalar",
      golden: [schema.oneofs[0]],
    },
    {
      schema,
      string: "first_name",
      goldenString: "first_name",
      golden: [schema.field.firstName],
    },
    {
      schema,
      string: "[ foo ]",
      goldenString: "[foo]",
      golden: [ext],
      usesExtension: ext,
    },
    {
      schema,
      string: "manager[foo]",
      goldenString: "manager[foo]",
      golden: [schema.field.manager, ext],
      usesExtension: ext,
    },
    {
      schema,
      string: "locations[ 0]",
      goldenString: "locations[0]",
      golden: [schema.field.locations, { kind: "list_sub", index: 0 }],
    },
    {
      schema,
      string: `projects["abc" ]`,
      goldenString: `projects["abc"]`,
      golden: [schema.field.projects, { kind: "map_sub", key: "abc" }],
    },
    {
      schema,
      string: `projects["a\\"bc"]`,
      goldenString: `projects["a\\"bc"]`,
      golden: [schema.field.projects, { kind: "map_sub", key: `a"bc` }],
    },
    {
      schema,
      string: `projects[""]`,
      goldenString: `projects[""]`,
      golden: [schema.field.projects, { kind: "map_sub", key: "" }],
    },
    {
      schema,
      string: `peers`,
      goldenString: `peers`,
      golden: [schema.field.peers],
    },
    {
      schema,
      string: `peers[77].first_name`,
      goldenString: `peers[77].first_name`,
      golden: [
        schema.field.peers,
        { kind: "list_sub", index: 77 },
        schema.field.firstName,
      ],
    },
    {
      schema,
      string: ``,
      goldenString: ``,
      golden: [],
    },
  ];
  const invalid: TestDataForPaths["invalid"] = [
    {
      schema,
      input: `.first_name`,
      error: `Invalid ident at column 1`,
    },
    {
      schema,
      input: `1`,
      error: `Invalid ident at column 1`,
    },
    {
      schema,
      input: `[]`,
      error: `Premature ] at column 2`,
    },
    {
      schema,
      input: `[`,
      error: `Premature end at column 1`,
    },
    {
      schema,
      input: `[ `,
      error: `Premature end at column 2`,
    },
    {
      schema,
      input: `["\\"]`,
      error: `Premature end of string at column 5`,
    },
    {
      schema,
      input: `projects["\\x"]`,
      error: `Invalid escape sequence at column 11`,
    },
    {
      schema,
      input: `[ ext.$invalid ]`,
      error: `Invalid ident at column 3`,
    },
    {
      schema,
      input: `[ true .foo`,
      error: `Missing ] at column 8`,
    },
    {
      schema,
      input: `first_name$name`,
      error: `Invalid ident at column 1`,
    },
    {
      schema,
      input: `manager.first_name$name`,
      error: `Invalid ident at column 9`,
    },
    {
      schema,
      input: `does_not_exist`,
      error: `Unknown field "does_not_exist" at column 1`,
    },
    {
      schema,
      input: `first_name.does_not_exist`,
      error: `Unknown field "does_not_exist" at column 11`,
    },
    {
      schema,
      input: `[ext.does_not_exist]`,
      error: `Unknown extension "ext.does_not_exist" at column 1`,
    },
    {
      schema,
      input: `locations[true]`,
      error: `Invalid map access at column 10`,
    },
    {
      schema,
      input: `projects[123]`,
      error: `Invalid map key at column 9`,
    },
  ];
  return { cases, invalid, schema, registry: createRegistry(file) };
}
