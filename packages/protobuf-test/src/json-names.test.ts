// Copyright 2021-2023 Buf Technologies, Inc.
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

import { expect, test } from "@jest/globals";
import { FileDescriptorSet, proto3, ScalarType } from "@bufbuild/protobuf";
import { UpstreamProtobuf } from "upstream-protobuf";

test("JSON names equal protoc", async () => {
  const names = [
    "foo_bar",
    "__proto__",
    "fieldname1",
    "field_name2",
    "_field_name3",
    "field__name4_",
    "field0name5",
    "field_0_name6",
    "fieldName7",
    "FieldName8",
    "field_Name9",
    "Field_Name10",
    "FIELD_NAME11",
    "FIELD_name12",
    "__field_name13",
    "__Field_name14",
    "field__name15",
    "field__Name16",
    "field_name17__",
    "Field_name18__",
  ];
  const protocNames = await getProtocJsonNames(names);
  const runtimeNames = getRuntimeJsonNames(names);
  expect(runtimeNames).toStrictEqual(protocNames);
});

function getRuntimeJsonNames(protoFieldNames: string[]) {
  const mt = proto3.makeMessageType(
    "M",
    protoFieldNames.map(
      (n, i) =>
        ({ no: i + 1, kind: "scalar", T: ScalarType.INT32, name: n }) as const,
    ),
  );
  return mt.fields.list().map((f) => f.jsonName);
}

async function getProtocJsonNames(protoFieldNames: string[]) {
  const upstream = new UpstreamProtobuf();
  const bytes = await upstream.compileToDescriptorSet({
    "i.proto": [
      `syntax="proto3";`,
      `message M {`,
      ...protoFieldNames.map((n, i) => `int32 ${n} = ${i + 1};`),
      `}`,
    ].join("\n"),
  });
  const fds = FileDescriptorSet.fromBinary(bytes);
  return fds.file[0].messageType[0].field.map((f) => f.jsonName);
}
