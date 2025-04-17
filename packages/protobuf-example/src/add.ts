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

import { createInterface } from "node:readline";
import { appendFileSync } from "node:fs";
import { create } from "@bufbuild/protobuf";
import { UserSchema } from "./gen/example_pb.js";
import { sizeDelimitedEncode } from "@bufbuild/protobuf/wire";
import * as process from "node:process";

async function main() {
  const filepath = process.argv[2] ?? "users.binpb";

  // Create a new user, prompting the user for details:
  const user = create(UserSchema, {
    firstName: await prompt("Enter first name: "),
    lastName: await prompt("Enter last name: "),
    active: true,
  });
  for (;;) {
    const location = await prompt(
      "Enter a location (or leave blank to finish): ",
    );
    if (location === "") {
      break;
    }
    user.locations.push(location);
  }

  // We're writing multiple users to a single file, prefixing each message with
  // its length.
  // For standard serialization, simply use toBinary() from @bufbuild/protobuf
  appendFileSync(filepath, sizeDelimitedEncode(UserSchema, user));
}

main().catch((e) => {
  process.stderr.write(String(e) + "\n");
  process.exit(1);
});

function prompt(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise<string>((resolve) => {
    rl.question(question, (value) => {
      resolve(value);
      rl.close();
    });
  });
}
