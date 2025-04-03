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

import { describe, expect, test } from "@jest/globals";
import {
  createRegistry,
  type DescExtension,
  type DescMessage,
  type Registry,
} from "@bufbuild/protobuf";
import {
  buildPath,
  parsePath,
  type Path,
  pathToString,
} from "@bufbuild/protobuf/reflect";
import assert from "node:assert/strict";
import { compileExtension, compileFile, compileMessage } from "../helpers.js";

const { cases, invalid, schema } = await getTestDataForPaths();

describe("buildPath()", () => {
  describe("with schema argument only", () => {
    test("returns PathBuilder", () => {
      const builder = buildPath(schema);
      expect(builder.schema).toBe(schema);
    });
  });
  describe("with Path argument", () => {
    for (const { string, schema, golden } of cases) {
      test(`re-builds path "${string}"`, () => {
        const path = buildPath(schema, golden).toPath();
        assertPathsEqual(path, golden);
      });
    }
  });
});

describe("parsePath()", () => {
  for (const { schema, string, golden, usesExtension } of cases) {
    test(`parses "${string}"`, () => {
      const reg = usesExtension ? createRegistry(usesExtension) : undefined;
      const path = parsePath(schema, string, reg);
      assertPathsEqual(path, golden);
    });
  }
  for (const { schema, input, error } of invalid) {
    test(`fails to parse invalid "${input}"`, () => {
      expect(() => parsePath(schema, input)).toThrow({
        name: "InvalidXPathError",
        message: error,
        path: input,
      });
    });
  }
});

describe("pathToString()", () => {
  for (const { string, golden, goldenString } of cases) {
    test(string, () => {
      expect(pathToString(golden)).toBe(goldenString);
    });
  }
});

describe("PathBuilder", () => {
  describe("toPath()", () => {
    test("returns empty path", () => {
      const path = buildPath(schema).toPath();
      assert.equal(path.length, 0);
    });
    test("returns path", () => {
      const path = buildPath(schema).add(cases[0].golden).toPath();
      assertPathsEqual(path, cases[0].golden);
    });
    test("returns copy", () => {
      const builder = buildPath(schema);
      const a = builder.toPath();
      const b = builder.toPath();
      assert.notStrictEqual(a, b);
    });
  });
  describe("clone()", () => {
    test("returns copy", () => {
      const builder = buildPath(schema);
      const clone = builder.clone();
      assert.notStrictEqual(clone, builder);
    });
    test("copies path", () => {
      const builder = buildPath(schema);
      const clone = builder.clone().add(cases[0].golden);
      assert.notEqual(clone.toPath().length, builder.toPath().length);
    });
    test("clones", () => {
      const builder = buildPath(schema).add(cases[0].golden);
      const clone = builder.clone();
      assert.deepStrictEqual(clone, builder);
    });
  });
  for (const { string, schema, golden } of cases) {
    test(`add() Path "${string}"`, () => {
      const builder = buildPath(schema).add(golden);
      const path = builder.toPath();
      assertPathsEqual(path, golden);
    });
  }
  test(`add() PathBuilder`, () => {
    const builder = buildPath(schema).add(
      buildPath(schema).add(cases[0].golden),
    );
    assertPathsEqual(builder.toPath(), cases[0].golden);
  });
  test(`add() multiple with error does not modify path`, () => {
    const builder = buildPath(schema);
    assert.doesNotThrow(() => builder.clone().add([schema.field.manager]));
    assert.throws(() =>
      builder.add([schema.field.manager, { kind: "list_sub", index: 0 }]),
    );
    assert.equal(builder.toPath().length, 0);
  });
  for (const { string, schema, golden } of cases) {
    test(`build "${string}" via api`, () => {
      let b = buildPath(schema);
      for (const ele of golden) {
        switch (ele.kind) {
          case "field":
            b = b.field(ele);
            break;
          case "oneof":
            b = b.oneof(ele);
            break;
          case "extension":
            b = b.extension(ele);
            break;
          case "list_sub":
            b = b.list(ele.index);
            break;
          case "map_sub":
            b = b.mapKey(ele.key);
            break;
        }
      }
      const path = b.toPath();
      assertPathsEqual(path, golden);
    });
  }

  describe("build errors", () => {
    test("field() on non-message", () => {
      const builder = buildPath(schema).field(schema.field.firstName);
      assert.throws(() => builder.field(schema.field.firstName), {
        name: "InvalidPathError",
        message: "Invalid field access",
      });
    });
    test("oneof() foreign to message", async () => {
      const foreignOneof = (
        await compileMessage(`
        syntax="proto3";
        message M {
          oneof o {
            int32 f = 1;
          }
        }
      `)
      ).oneofs[0];
      const builder = buildPath(schema);
      assert.throws(() => builder.oneof(foreignOneof), {
        name: "InvalidPathError",
        message: `Invalid oneof access`,
      });
    });
    test("extension() on wrong message", async () => {
      const foreignExtension = await compileExtension(`
        syntax="proto2";
        message M { extensions 1 to 1; }
        extend M {
          optional string ext = 1;
        }
      `);
      const builder = buildPath(schema);
      assert.throws(() => builder.extension(foreignExtension), {
        name: "InvalidPathError",
        message: `Invalid extension access`,
      });
    });
    test("list() on non-list", () => {
      const builder = buildPath(schema);
      assert.throws(() => builder.list(77), {
        name: "InvalidPathError",
        message: `Invalid list access`,
      });
    });
    test("list() with negative index", () => {
      const builder = buildPath(schema).field(schema.field.locations);
      assert.doesNotThrow(() => builder.clone().list(0));
      assert.throws(() => builder.list(-1), {
        name: "InvalidPathError",
        message: `Invalid list index`,
      });
    });
    test("list() with float index", () => {
      const builder = buildPath(schema).field(schema.field.locations);
      assert.throws(() => builder.list(1.5), {
        name: "InvalidPathError",
        message: `Invalid list index`,
      });
    });
    test("list() with infinite index", () => {
      const builder = buildPath(schema).field(schema.field.locations);
      assert.throws(() => builder.list(Number.POSITIVE_INFINITY), {
        name: "InvalidPathError",
        message: `Invalid list index`,
      });
    });
    test("mapKey() on non-map", () => {
      const builder = buildPath(schema);
      assert.throws(() => builder.mapKey(77), {
        name: "InvalidPathError",
        message: `Invalid map access`,
      });
    });
    test("mapKey() with wrong type", () => {
      const builder = buildPath(schema).field(schema.field.projects);
      assert.doesNotThrow(() => builder.clone().mapKey("abc"));
      assert.throws(() => builder.mapKey(true), {
        name: "InvalidPathError",
        message: `Invalid map key`,
      });
    });
  });
});

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

async function getTestDataForPaths(): Promise<TestDataForPaths> {
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
