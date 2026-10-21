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
import {
  create,
  createFileRegistry,
  type DescFile,
  type MessageInitShape,
  toBinary,
} from "@bufbuild/protobuf";
import {
  FileDescriptorProtoSchema,
  FieldDescriptorProto_Type,
  FieldDescriptorProto_Label,
  FileDescriptorSetSchema,
} from "@bufbuild/protobuf/wkt";

function file(
  name: string,
  dependencies: DescFile[] = [],
  init: MessageInitShape<typeof FileDescriptorProtoSchema> = {},
): DescFile {
  const proto = create(FileDescriptorProtoSchema, {
    syntax: "proto3",
    ...init,
    name,
    dependency: dependencies.map((f) => f.proto.name),
  });
  const desc = createFileRegistry(proto, (name) =>
    dependencies.find((f) => f.proto.name === name),
  ).getFile(name);
  assert.ok(desc);
  return desc;
}

function branches(first: DescFile, second: DescFile): DescFile[] {
  return [
    file("left.proto", [first]),
    file("middle.proto", [second]),
    file("right.proto", [first]),
  ];
}

void suite("createFileRegistry() imported descriptors", () => {
  for (const sameFileName of [true, false]) {
    test(`preserves last type precedence with ${sameFileName ? "equal" : "different"} file names`, () => {
      const first = file("common.proto", [], {
        messageType: [
          {
            name: "Common",
            field: [
              {
                name: "value",
                number: 1,
                type: FieldDescriptorProto_Type.STRING,
              },
            ],
          },
          { name: "FirstOnly" },
        ],
      });
      const second = file(sameFileName ? "common.proto" : "other.proto", [], {
        messageType: [
          {
            name: "Common",
            field: [
              {
                name: "value",
                number: 1,
                type: FieldDescriptorProto_Type.STRING,
              },
              {
                name: "extra",
                number: 2,
                type: FieldDescriptorProto_Type.STRING,
              },
            ],
          },
          { name: "SecondOnly" },
        ],
      });
      const hub = file("hub.proto", branches(first, second));
      const input = create(FileDescriptorProtoSchema, {
        name: "root.proto",
        syntax: "proto3",
        dependency: ["hub.proto", "common.proto"],
        messageType: [
          {
            name: "Root",
            field: [
              {
                name: "payload",
                number: 1,
                type: FieldDescriptorProto_Type.MESSAGE,
                typeName: ".Common",
              },
            ],
          },
        ],
      });
      const resolved: string[] = [];
      const reg = createFileRegistry(input, (name) => {
        resolved.push(name);
        return hub;
      });
      assert.deepStrictEqual(resolved, ["hub.proto"]);
      assert.strictEqual(reg.getFile("common.proto"), first);
      assert.strictEqual(reg.getMessage("Common"), first.messages[0]);
      assert.strictEqual(reg.getMessage("SecondOnly"), second.messages[1]);
      assert.deepStrictEqual(
        Array.from(reg.files, (f) => f.proto.name),
        sameFileName
          ? [
              "hub.proto",
              "left.proto",
              "common.proto",
              "middle.proto",
              "right.proto",
              "root.proto",
            ]
          : [
              "hub.proto",
              "left.proto",
              "common.proto",
              "middle.proto",
              "other.proto",
              "right.proto",
              "root.proto",
            ],
      );
      assert.deepStrictEqual(
        Array.from(reg, (t) => t.typeName),
        ["Common", "FirstOnly", "SecondOnly", "Root"],
      );
      const root = reg.getMessage("Root");
      assert.ok(root);
      assert.strictEqual(root.fields[0].message, first.messages[0]);
      assert.deepStrictEqual(
        toBinary(root, create(root, { payload: { value: "v", extra: "x" } })),
        new Uint8Array([10, 3, 10, 1, 118]),
      );
    });
  }

  test("preserves last file precedence for files without types", () => {
    const first = file("empty.proto");
    const second = file("empty.proto", [], { options: { deprecated: true } });
    const hub = file("hub.proto", branches(first, second));
    const input = create(FileDescriptorProtoSchema, {
      name: "root.proto",
      syntax: "proto3",
      dependency: ["hub.proto"],
    });
    const reg = createFileRegistry(input, () => hub);
    assert.strictEqual(reg.getFile("empty.proto"), first);
  });

  test("preserves extension-number precedence for differently named extensions", () => {
    const base = file("base.proto", [], {
      syntax: "proto2",
      messageType: [
        { name: "Options", extensionRange: [{ start: 100, end: 200 }] },
      ],
    });
    const first = file("first.proto", [base], {
      syntax: "proto2",
      extension: [
        {
          name: "first",
          number: 100,
          type: FieldDescriptorProto_Type.STRING,
          label: FieldDescriptorProto_Label.OPTIONAL,
          extendee: ".Options",
        },
      ],
    });
    const second = file("second.proto", [base], {
      syntax: "proto2",
      extension: [
        {
          name: "second",
          number: 100,
          type: FieldDescriptorProto_Type.STRING,
          label: FieldDescriptorProto_Label.OPTIONAL,
          extendee: ".Options",
        },
      ],
    });
    const hub = file("hub.proto", branches(first, second));
    const input = create(FileDescriptorProtoSchema, {
      name: "root.proto",
      syntax: "proto3",
      dependency: ["hub.proto"],
    });
    const reg = createFileRegistry(input, () => hub);
    assert.strictEqual(
      reg.getExtensionFor(base.messages[0], 100),
      first.extensions[0],
    );
    assert.strictEqual(reg.getExtension("first"), first.extensions[0]);
    assert.strictEqual(reg.getExtension("second"), second.extensions[0]);
  });

  test("preserves precedence across separate resolver results", () => {
    const first = file("common.proto", [], {
      messageType: [{ name: "Common" }],
    });
    const second = file("common.proto", [], {
      messageType: [{ name: "Common" }],
    });
    const [left, middle, right] = branches(first, second);
    const hub = file("hub.proto", [middle, right]);
    const input = create(FileDescriptorProtoSchema, {
      name: "root.proto",
      syntax: "proto3",
      dependency: ["left.proto", "hub.proto"],
    });
    const reg = createFileRegistry(input, (name) =>
      name === "left.proto" ? left : hub,
    );
    assert.strictEqual(reg.getFile("common.proto"), first);
    assert.strictEqual(reg.getMessage("Common"), first.messages[0]);
  });

  test("retains both extension numbers when their type names collide", () => {
    const base = file("base.proto", [], {
      syntax: "proto2",
      messageType: [
        { name: "Options", extensionRange: [{ start: 100, end: 200 }] },
      ],
    });
    const first = file("first.proto", [base], {
      syntax: "proto2",
      extension: [
        {
          name: "option",
          number: 100,
          type: FieldDescriptorProto_Type.STRING,
          label: FieldDescriptorProto_Label.OPTIONAL,
          extendee: ".Options",
        },
      ],
    });
    const second = file("second.proto", [base], {
      syntax: "proto2",
      extension: [
        {
          name: "option",
          number: 101,
          type: FieldDescriptorProto_Type.STRING,
          label: FieldDescriptorProto_Label.OPTIONAL,
          extendee: ".Options",
        },
      ],
    });
    const hub = file("hub.proto", branches(first, second));
    const input = create(FileDescriptorProtoSchema, {
      name: "root.proto",
      syntax: "proto3",
      dependency: ["hub.proto"],
    });
    const reg = createFileRegistry(input, () => hub);
    assert.strictEqual(reg.getExtension("option"), first.extensions[0]);
    assert.strictEqual(
      reg.getExtensionFor(base.messages[0], 100),
      first.extensions[0],
    );
    assert.strictEqual(
      reg.getExtensionFor(base.messages[0], 101),
      second.extensions[0],
    );
  });

  test("preserves resolver calls and field bindings with mixed descriptor inputs", () => {
    const common = file("common.proto", [], {
      messageType: [{ name: "Common" }],
    });
    const loaded = file("loaded.proto", [common]);
    const raw = create(FileDescriptorProtoSchema, {
      name: "raw.proto",
      syntax: "proto3",
      dependency: ["common.proto", "later.proto"],
      messageType: [
        {
          name: "Raw",
          field: [
            {
              name: "value",
              number: 1,
              type: FieldDescriptorProto_Type.MESSAGE,
              typeName: ".Common",
            },
          ],
        },
      ],
    });
    const later = create(FileDescriptorProtoSchema, {
      name: "later.proto",
      syntax: "proto3",
    });
    const input = create(FileDescriptorProtoSchema, {
      name: "root.proto",
      syntax: "proto3",
      dependency: ["raw.proto", "loaded.proto", "common.proto"],
    });
    const resolved: string[] = [];
    const reg = createFileRegistry(input, (name) => {
      resolved.push(name);
      switch (name) {
        case "raw.proto":
          return raw;
        case "loaded.proto":
          return loaded;
        case "later.proto":
          return later;
        default:
          return undefined;
      }
    });
    assert.deepStrictEqual(resolved, [
      "raw.proto",
      "loaded.proto",
      "later.proto",
    ]);
    assert.strictEqual(
      reg.getMessage("Raw")?.fields[0].message,
      common.messages[0],
    );
    assert.deepStrictEqual(
      Array.from(reg.files, (f) => f.proto.name),
      [
        "loaded.proto",
        "common.proto",
        "later.proto",
        "raw.proto",
        "root.proto",
      ],
    );
  });

  test("observes dependency changes made by a later resolver call", () => {
    const shared = file("shared.proto");
    const second = file("second.proto", [shared]);
    const late = file("late.proto", [], { messageType: [{ name: "Late" }] });
    const input = create(FileDescriptorProtoSchema, {
      name: "root.proto",
      syntax: "proto3",
      dependency: ["shared.proto", "second.proto"],
    });
    const reg = createFileRegistry(input, (name) => {
      if (name === "shared.proto") return shared;
      shared.dependencies.push(late);
      shared.proto.dependency.push("late.proto");
      return second;
    });
    assert.strictEqual(reg.getFile("late.proto"), late);
    assert.strictEqual(reg.getMessage("Late"), late.messages[0]);
  });

  test("preserves iteration order for every kind of imported nested type", () => {
    const imported = file("types.proto", [], {
      syntax: "proto2",
      messageType: [
        { name: "Options", extensionRange: [{ start: 100, end: 200 }] },
        {
          name: "Outer",
          nestedType: [
            {
              name: "Inner",
              nestedType: [{ name: "Deep" }],
              enumType: [
                { name: "Kind", value: [{ name: "UNKNOWN", number: 0 }] },
              ],
              extension: [
                {
                  name: "innerOption",
                  number: 100,
                  type: FieldDescriptorProto_Type.STRING,
                  label: FieldDescriptorProto_Label.OPTIONAL,
                  extendee: ".Options",
                },
              ],
            },
            { name: "Sibling" },
          ],
          enumType: [{ name: "Kind", value: [{ name: "UNKNOWN", number: 0 }] }],
          extension: [
            {
              name: "outerOption",
              number: 101,
              type: FieldDescriptorProto_Type.STRING,
              label: FieldDescriptorProto_Label.OPTIONAL,
              extendee: ".Options",
            },
          ],
        },
      ],
      enumType: [{ name: "Top", value: [{ name: "UNKNOWN", number: 0 }] }],
      service: [
        {
          name: "Api",
          method: [
            { name: "Get", inputType: ".Outer", outputType: ".Outer.Inner" },
          ],
        },
      ],
      extension: [
        {
          name: "fileOption",
          number: 102,
          type: FieldDescriptorProto_Type.STRING,
          label: FieldDescriptorProto_Label.OPTIONAL,
          extendee: ".Options",
        },
      ],
    });
    const hub = file("hub.proto", [imported]);
    const input = create(FileDescriptorProtoSchema, {
      name: "root.proto",
      syntax: "proto3",
      dependency: ["hub.proto"],
    });
    const reg = createFileRegistry(input, () => hub);
    assert.deepStrictEqual(
      Array.from(reg, (type) => type.typeName),
      [
        "Options",
        "Outer",
        "Outer.Inner",
        "Outer.Inner.Deep",
        "Outer.Inner.Kind",
        "Outer.Inner.innerOption",
        "Outer.Sibling",
        "Outer.Kind",
        "Outer.outerOption",
        "Top",
        "Api",
        "fileOption",
      ],
    );
    assert.strictEqual(reg.getService("Api"), imported.services[0]);
    assert.strictEqual(
      reg.getExtensionFor(imported.messages[0], 102),
      imported.extensions[0],
    );
  });

  for (const conflicting of [false, true]) {
    test(`traverses shared dependencies in linear time ${conflicting ? "with" : "without"} conflicts`, () => {
      const files: DescFile[] = [];
      let reads = 0;
      for (let layer = 0; layer < 16; layer++) {
        const dependencies = files.slice(-2);
        for (const side of ["a", "b"]) {
          const desc = file(`${layer}${side}.proto`, dependencies, {
            messageType: conflicting ? [{ name: "Shared" }] : [],
          });
          files.push(
            new Proxy(desc, {
              get(target, property, receiver) {
                if (property === "dependencies") reads++;
                return Reflect.get(target, property, receiver);
              },
            }),
          );
        }
      }
      const dependencies = files.slice(-2);
      const input = create(FileDescriptorProtoSchema, {
        name: "root.proto",
        syntax: "proto3",
        dependency: dependencies.map((f) => f.proto.name),
      });
      reads = 0;
      const reg = createFileRegistry(input, (name) =>
        dependencies.find((f) => f.proto.name === name),
      );
      assert.ok(
        reads <= dependencies.length * files.length * (conflicting ? 2 : 1),
        `${reads} dependency reads for ${files.length} files`,
      );
      assert.strictEqual(Array.from(reg.files).length, files.length + 1);
      if (conflicting) {
        assert.strictEqual(reg.getMessage("Shared"), files[1].messages[0]);
      }
    });
  }

  test("preserves raw import resolution and construction order", () => {
    const protos = new Map(
      [
        { name: "a.proto", dependency: ["c.proto", "b.proto"] },
        { name: "b.proto", dependency: ["d.proto"] },
        { name: "c.proto", dependency: ["e.proto"] },
        { name: "d.proto", dependency: [] },
        { name: "e.proto", dependency: [] },
      ].map((init) => {
        const proto = create(FileDescriptorProtoSchema, {
          ...init,
          syntax: "proto3",
        });
        return [proto.name, proto];
      }),
    );
    const input = create(FileDescriptorProtoSchema, {
      name: "root.proto",
      syntax: "proto3",
      dependency: ["a.proto", "b.proto"],
    });
    const calls: string[] = [];
    const reg = createFileRegistry(input, (name) => {
      calls.push(name);
      return protos.get(name);
    });
    assert.deepStrictEqual(calls, [
      "a.proto",
      "b.proto",
      "c.proto",
      "e.proto",
      "d.proto",
    ]);
    assert.deepStrictEqual(
      Array.from(reg.files, (f) => f.proto.name),
      ["d.proto", "e.proto", "c.proto", "b.proto", "a.proto", "root.proto"],
    );
  });

  test("still resolves queued raw imports after a hydrated file replaces their name", () => {
    const prior = file("shared.proto", [], {
      messageType: [{ name: "Chosen" }],
    });
    const loaded = file("loaded.proto", [prior]);
    const raw = create(FileDescriptorProtoSchema, {
      name: "shared.proto",
      syntax: "proto3",
      dependency: ["leaf.proto"],
      messageType: [{ name: "Chosen" }],
    });
    const leaf = create(FileDescriptorProtoSchema, {
      name: "leaf.proto",
      syntax: "proto3",
    });
    const input = create(FileDescriptorProtoSchema, {
      name: "root.proto",
      syntax: "proto3",
      dependency: ["shared.proto", "loaded.proto"],
      messageType: [
        {
          name: "Root",
          field: [
            {
              name: "value",
              number: 1,
              type: FieldDescriptorProto_Type.MESSAGE,
              typeName: ".Chosen",
            },
          ],
        },
      ],
    });
    const calls: string[] = [];
    const reg = createFileRegistry(input, (name) => {
      calls.push(name);
      switch (name) {
        case "shared.proto":
          return raw;
        case "loaded.proto":
          return loaded;
        case "leaf.proto":
          return leaf;
        default:
          return undefined;
      }
    });
    assert.deepStrictEqual(calls, [
      "shared.proto",
      "loaded.proto",
      "leaf.proto",
    ]);
    assert.strictEqual(reg.getFile("shared.proto")?.proto, raw);
    assert.strictEqual(
      reg.getFile("shared.proto")?.dependencies[0],
      reg.getFile("leaf.proto"),
    );
    assert.strictEqual(loaded.dependencies[0], prior);
    assert.notStrictEqual(reg.getMessage("Chosen"), prior.messages[0]);
    assert.strictEqual(
      reg.getMessage("Root")?.fields[0].message,
      reg.getMessage("Chosen"),
    );
    assert.deepStrictEqual(
      Array.from(reg.files, (f) => f.proto.name),
      ["loaded.proto", "shared.proto", "leaf.proto", "root.proto"],
    );
  });

  test("loads a deep raw dependency chain without overflowing the call stack", () => {
    const count = 10000;
    const protos = Array.from({ length: count }, (_, i) =>
      create(FileDescriptorProtoSchema, {
        name: `${i}.proto`,
        syntax: "proto3",
        dependency: i === 0 ? [] : [`${i - 1}.proto`],
      }),
    );
    const lookup = new Map(protos.map((p) => [p.name, p]));
    const reg = createFileRegistry(protos[count - 1], (name) =>
      lookup.get(name),
    );
    assert.strictEqual(reg.getFile("0.proto")?.proto, protos[0]);
    assert.strictEqual(Array.from(reg.files).length, count);
  });

  test("loads a deep hydrated dependency chain without overflowing the call stack", () => {
    const count = 10000;
    const source = createFileRegistry(
      create(FileDescriptorSetSchema, {
        file: Array.from({ length: count }, (_, i) => ({
          name: `${i}.proto`,
          syntax: "proto3",
          dependency: i === 0 ? [] : [`${i - 1}.proto`],
        })),
      }),
    );
    const input = create(FileDescriptorProtoSchema, {
      name: "root.proto",
      syntax: "proto3",
      dependency: [`${count - 1}.proto`],
    });
    const reg = createFileRegistry(input, (name) => source.getFile(name));
    assert.strictEqual(reg.getFile("0.proto"), source.getFile("0.proto"));
    assert.strictEqual(Array.from(reg.files).length, count + 1);
  });
});
