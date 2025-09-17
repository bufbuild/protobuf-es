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

import { create } from "@bufbuild/protobuf";
import { sizeDelimitedEncode } from "@bufbuild/protobuf/wire";
import { UserSchema } from "./gen/example_pb.ts";

async function main() {
  const filepath = Deno.args[0] ?? "users.binpb";

  // Create a new user, prompting the user for details:
  const user = create(UserSchema, {
    firstName: (await prompt("Enter first name:")) ?? undefined,
    lastName: (await prompt("Enter last name:")) ?? undefined,
    active: true,
  });
  for (;;) {
    const location = prompt("Enter a location (or leave blank to finish):");
    if (location?.length) {
      user.locations.push(location);
    } else {
      break;
    }
  }

  // We're writing multiple users to a single file, prefixing each message with
  // its length.
  // For standard serialization, simply use toBinary() from @bufbuild/protobuf
  await Deno.writeFile(filepath, sizeDelimitedEncode(UserSchema, user), {
    append: true,
  });
}

void main();
