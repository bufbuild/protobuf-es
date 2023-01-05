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

import type { AnyMessage, Message } from "../message.js";
import type { BinaryFormat, BinaryWriteOptions } from "../binary-format.js";
import type { IBinaryWriter } from "../binary-encoding.js";
import { ScalarType } from "../field.js";
import {
  makeBinaryFormatCommon,
  writeMapEntry,
  writeMessageField,
  writePacked,
  writeScalar,
} from "./binary-format-common.js";

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions, prefer-const, no-case-declarations */

export function makeBinaryFormatProto3(): BinaryFormat {
  return {
    ...makeBinaryFormatCommon(),
    writeMessage(
      message: Message,
      writer: IBinaryWriter,
      options: BinaryWriteOptions
    ): IBinaryWriter {
      const type = message.getType();
      for (const field of type.fields.byNumber()) {
        let value, // this will be our field value, whether it is member of a oneof or regular field
          repeated = field.repeated,
          localName = field.localName;

        if (field.oneof) {
          const oneof = (message as AnyMessage)[field.oneof.localName];
          if (oneof.case !== localName) {
            continue; // field is not selected, skip
          }
          value = oneof.value;
        } else {
          value = (message as AnyMessage)[localName];
        }

        switch (field.kind) {
          case "scalar":
          case "enum":
            let scalarType = field.kind == "enum" ? ScalarType.INT32 : field.T;
            if (repeated) {
              if (field.packed) {
                writePacked(writer, scalarType, field.no, value);
              } else {
                for (const item of value) {
                  writeScalar(writer, scalarType, field.no, item, true);
                }
              }
            } else {
              if (value !== undefined) {
                writeScalar(
                  writer,
                  scalarType,
                  field.no,
                  value,
                  !!field.oneof || field.opt
                );
              }
            }
            break;
          case "message":
            if (repeated) {
              for (const item of value) {
                writeMessageField(writer, options, field.T, field.no, item);
              }
            } else {
              writeMessageField(writer, options, field.T, field.no, value);
            }
            break;
          case "map":
            for (const [key, val] of Object.entries(value)) {
              writeMapEntry(writer, options, field, key, val);
            }
            break;
        }
      }
      if (options.writeUnknownFields) {
        this.writeUnknownFields(message, writer);
      }
      return writer;
    },
  };
}
