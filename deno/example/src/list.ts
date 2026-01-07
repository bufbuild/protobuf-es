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

import { sizeDelimitedDecodeStream } from "@bufbuild/protobuf/wire";
import { UserSchema } from "./gen/example_pb.ts";

async function main() {
  const filepath = Deno.args[0] ?? "users.binpb";
  try {
    using file = await Deno.open(filepath, { read: true });
    // We read multiple users from a single file, where each message is prefixed
    // by its length.
    // For standard deserialization, simply use fromBinary() from @bufbuild/protobuf
    for await (
      const user of sizeDelimitedDecodeStream(
        UserSchema,
        iterateFileChunks(file),
      )
    ) {
      console.log(`User: ${user.firstName} ${user.lastName}`);
      console.log(`Active: ${user.active ? "Yes" : "No"}`);
      if (user.locations.length) {
        console.log(`Locations: ${user.locations.join(", ")}`);
      }
      console.log();
    }
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      console.error(
        `File ${filepath} not found. Create users first, with add.ts`,
      );
    } else {
      console.error(e);
    }
    Deno.exit(1);
  }
}

void main();

function iterateFileChunks(file: Deno.FsFile): AsyncIterable<Uint8Array> {
  // https://github.com/denoland/deno/issues/19946
  return file.readable as unknown as AsyncIterable<Uint8Array<ArrayBufferLike>>;
}
