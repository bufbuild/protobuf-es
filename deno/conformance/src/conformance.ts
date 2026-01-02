#!/usr/bin/env -S deno run

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

import type { ReaderSync, WriterSync } from "@std/io";
import {
  create,
  fromBinary,
  fromJsonString,
  type DescMessage,
  type Message,
  type MessageShape,
  toBinary,
  toJsonString,
  createRegistry,
} from "@bufbuild/protobuf";
import {
  type ConformanceRequest,
  type ConformanceResponse,
  ConformanceRequestSchema,
  ConformanceResponseSchema,
  FailureSetSchema,
  TestCategory,
  WireFormat,
} from "./gen/conformance/conformance_pb.ts";
import { file_google_protobuf_test_messages_proto3 } from "./gen/google/protobuf/test_messages_proto3_pb.ts";
import { file_google_protobuf_test_messages_proto2 } from "./gen/google/protobuf/test_messages_proto2_pb.ts";
import { file_google_protobuf_test_messages_edition2023 } from "./gen/google/protobuf/test_messages_edition2023_pb.ts";
import { file_google_protobuf_test_messages_proto2_editions } from "./gen/google/protobuf/test_messages_proto2_editions_pb.ts";
import { file_google_protobuf_test_messages_proto3_editions } from "./gen/google/protobuf/test_messages_proto3_editions_pb.ts";
import {
  file_google_protobuf_any,
  file_google_protobuf_duration,
  file_google_protobuf_field_mask,
  file_google_protobuf_struct,
  file_google_protobuf_timestamp,
  file_google_protobuf_wrappers,
} from "@bufbuild/protobuf/wkt";

const registry = createRegistry(
  file_google_protobuf_test_messages_proto2,
  file_google_protobuf_test_messages_proto3,
  file_google_protobuf_test_messages_edition2023,
  file_google_protobuf_test_messages_proto2_editions,
  file_google_protobuf_test_messages_proto3_editions,
  file_google_protobuf_any,
  file_google_protobuf_struct,
  file_google_protobuf_field_mask,
  file_google_protobuf_timestamp,
  file_google_protobuf_duration,
  file_google_protobuf_wrappers,
);

void main();

async function main() {
  let testCount = 0;
  try {
    for (const request of readMessages(Deno.stdin, ConformanceRequestSchema)) {
      testCount += 1;
      const response = create(ConformanceResponseSchema, {
        result: test(request),
      });
      writeMessage(Deno.stdout, ConformanceResponseSchema, response);
    }
  } catch (e) {
    const encoder = new TextEncoder();
    Deno.stderr.writeSync(
      encoder.encode(
        `conformance.ts: exiting after ${testCount} tests: ${String(e)}\n`,
      ),
    );
  }
}

function test(request: ConformanceRequest): ConformanceResponse["result"] {
  if (request.messageType === FailureSetSchema.typeName) {
    // > The conformance runner will request a list of failures as the first request.
    // > This will be known by message_type == "conformance.FailureSet", a conformance
    // > test should return a serialized FailureSet in protobuf_payload.
    const failureSet = create(FailureSetSchema);
    return {
      case: "protobufPayload",
      value: toBinary(FailureSetSchema, failureSet),
    };
  }

  const payloadType = registry.getMessage(request.messageType);
  if (!payloadType) {
    return {
      case: "runtimeError",
      value: `unknown request message type ${request.messageType}`,
    };
  }

  let payload: Message;

  try {
    switch (request.payload.case) {
      case "protobufPayload":
        payload = fromBinary(payloadType, request.payload.value);
        break;

      case "jsonPayload":
        payload = fromJsonString(payloadType, request.payload.value, {
          ignoreUnknownFields:
            request.testCategory ===
            TestCategory.JSON_IGNORE_UNKNOWN_PARSING_TEST,
          registry,
        });
        break;

      default:
        // We use a failure list instead of skipping, because that is more transparent.
        return {
          case: "runtimeError",
          value: `${request.payload.case ?? "?"} not supported`,
        };
    }
  } catch (err) {
    // > This string should be set to indicate parsing failed.  The string can
    // > provide more information about the parse error if it is available.
    // >
    // > Setting this string does not necessarily mean the testee failed the
    // > test.  Some of the test cases are intentionally invalid input.
    return { case: "parseError", value: String(err) };
  }

  try {
    switch (request.requestedOutputFormat) {
      case WireFormat.PROTOBUF:
        return {
          case: "protobufPayload",
          value: toBinary(payloadType, payload),
        };

      case WireFormat.JSON:
        return {
          case: "jsonPayload",
          value: toJsonString(payloadType, payload, {
            registry,
          }),
        };

      case WireFormat.JSPB:
        return { case: "skipped", value: "JSPB not supported." };

      case WireFormat.TEXT_FORMAT:
        return { case: "skipped", value: "Text format not supported." };

      default:
        return {
          case: "runtimeError",
          value: `unknown requested output format ${request.requestedOutputFormat}`,
        };
    }
  } catch (err) {
    // > If the input was successfully parsed but errors occurred when
    // > serializing it to the requested output format, set the error message in
    // > this field.
    return { case: "serializeError", value: String(err) };
  }
}

// Reads length-prefixed messages.
function* readMessages<Desc extends DescMessage>(
  reader: ReaderSync,
  messageDesc: Desc,
): Iterable<MessageShape<Desc>> {
  for (;;) {
    const sizeBytes = readN(reader, 4);
    if (sizeBytes === null) {
      return;
    }
    const size = new DataView(sizeBytes.buffer).getInt32(0, true);
    const messageBytes = readN(reader, size);
    if (messageBytes === null) {
      throw new Error("premature EOF");
    }
    yield fromBinary(messageDesc, messageBytes);
  }
}

// Reads n bytes.
function readN(reader: ReaderSync, n: number): Uint8Array | null {
  const buf = new Uint8Array(n);
  let read = 0;
  while (read < n) {
    const b = read > 0 ? new Uint8Array(n - read) : buf;
    let r: number | null = reader.readSync(b);
    if (r === null) {
      if (read > 0) {
        throw new Error("premature EOF");
      }
      return null;
    }
    if (read > 0) {
      buf.set(b, read);
    }
    read += r;
  }
  return buf;
}

// Writes a length-prefixed message.
function writeMessage<Desc extends DescMessage>(
  writer: WriterSync,
  messageDesc: Desc,
  message: MessageShape<Desc>,
): void {
  const bytes = toBinary(messageDesc, message);
  const lengthBytes = new Uint8Array(4);
  new DataView(lengthBytes.buffer).setInt32(0, bytes.length, true);
  writer.writeSync(lengthBytes);
  writer.writeSync(bytes);
}
