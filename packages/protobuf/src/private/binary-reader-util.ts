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

import type { IBinaryReader } from "../binary-encoding";
import type { BinaryReadOptions } from "../binary-format";
import type { Message } from "../message";

export class BinaryReaderUtil {
  static readMessage<T extends Message>(
    reader: IBinaryReader,
    message: T,
    length: number,
    options: BinaryReadOptions
  ): T {
    const format = message.getType().runtime.bin;
    format.readMessage(message, reader, length, options);
    return message;
  }

  static readMessageField<T extends Message>(
    reader: IBinaryReader,
    message: T,
    options: BinaryReadOptions
  ): T {
    return BinaryReaderUtil.readMessage(
      reader,
      message,
      reader.uint32(),
      options
    );
  }
}
