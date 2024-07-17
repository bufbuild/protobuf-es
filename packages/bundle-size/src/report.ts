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

import { writeFileSync } from "node:fs";
import {
  bundleStats,
  generateChart,
  generateMarkdownTable,
  injectTable,
} from "./util.js";
import { sizes } from "./constants.js";

const protobufEs = sizes.map((size) => ({
  name: "Protobuf-ES",
  files: size,
  ...bundleStats(`src/gen/protobuf-es/entry-${size}.ts`),
}));

const googleProtobuf = sizes.map((size) => ({
  name: "protobuf-javascript",
  files: size,
  ...bundleStats(`src/gen/google-protobuf/entry-${size}.ts`),
}));

injectTable(
  "README.md",
  generateMarkdownTable([...protobufEs, ...googleProtobuf]),
);

writeFileSync(
  "chart.svg",
  generateChart([
    {
      name: protobufEs[0].name,
      color: "#ffa600",
      points: protobufEs.map((g) => ({ bytes: g.compressed, files: g.files })),
    },
    {
      name: googleProtobuf[0].name,
      color: "#ff6361",
      points: googleProtobuf.map((g) => ({
        bytes: g.compressed,
        files: g.files,
      })),
    },
  ]),
);
