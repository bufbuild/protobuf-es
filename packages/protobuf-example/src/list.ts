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

import { createReadStream, existsSync } from "fs";
import * as process from "node:process";
import { sizeDelimitedDecodeStream } from "@bufbuild/protobuf/wire";
import { UserSchema } from "./gen/example_pb.js";

async function main() {
  const filepath = process.argv[2] ?? "users.binpb";
  if (!existsSync(filepath)) {
    print(`File ${filepath} not found. Create users first, with add.ts`);
    return;
  }
  // We read multiple users from a single file, where each message is prefixed
  // by its length.
  // For standard deserialization, simply use fromBinary() from @bufbuild/protobuf
  const readStream = createReadStream(filepath);
  for await (const user of sizeDelimitedDecodeStream(UserSchema, readStream)) {
    print(`User: ${user.firstName} ${user.lastName}`);
    print(`Active: ${user.active ? "Yes" : "No"}`);
    if (user.locations.length) {
      print(`Locations: ${user.locations.join(", ")}`);
    }
    print("");
  }
}

main().catch((e) => {
  process.stderr.write(String(e) + "\n");
  process.exit(1);
});

function print(line: string): void {
  process.stdout.write(line);
  process.stdout.write("\n");
}
