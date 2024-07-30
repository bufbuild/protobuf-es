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

import type { Writable } from "node:stream";
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
} from "./gen/conformance/conformance_pb.js";
import { file_google_protobuf_test_messages_proto3 } from "./gen/google/protobuf/test_messages_proto3_pb.js";
import { file_google_protobuf_test_messages_proto2 } from "./gen/google/protobuf/test_messages_proto2_pb.js";
import { file_google_protobuf_test_messages_edition2023 } from "./gen/google/protobuf/test_messages_edition2023_pb.js";
import { file_google_protobuf_test_messages_proto2_editions } from "./gen/google/protobuf/test_messages_proto2_editions_pb.js";
import { file_google_protobuf_test_messages_proto3_editions } from "./gen/google/protobuf/test_messages_proto3_editions_pb.js";
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
    const requests = readMessages(process.stdin, ConformanceRequestSchema);
    const responses = processMessages(
      requests,
      (request: ConformanceRequest): ConformanceResponse => {
        testCount += 1;
        return create(ConformanceResponseSchema, {
          result: test(request),
        });
      },
    );
    await writeMessages(process.stdout, ConformanceResponseSchema, responses);
  } catch (e) {
    process.stderr.write(
      `conformance.ts: exiting after ${testCount} tests: ${String(e)}`,
      () => process.exit(1),
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

// Reads length-prefixed messages from a stream.
async function* readMessages<Desc extends DescMessage>(
  stream: AsyncIterable<Uint8Array>,
  messageDesc: Desc,
): AsyncIterable<MessageShape<Desc>> {
  // append chunk to buffer, returning updated buffer
  function append(buffer: Uint8Array, chunk: Uint8Array): Uint8Array {
    const n = new Uint8Array(buffer.byteLength + chunk.byteLength);
    n.set(buffer);
    n.set(chunk, buffer.byteLength);
    return n;
  }

  let buffer = new Uint8Array(0);
  for await (const chunk of stream) {
    buffer = append(buffer, chunk);
    for (;;) {
      if (buffer.byteLength < 4) {
        // size is incomplete, buffer more data
        break;
      }
      const size = new DataView(buffer.buffer).getInt32(0, true);
      if (buffer.byteLength < 4 + size) {
        // message is incomplete, buffer more data
        break;
      }
      yield fromBinary(messageDesc, buffer.subarray(4, 4 + size));
      buffer = buffer.subarray(4 + size);
    }
  }
  if (buffer.byteLength > 0) {
    throw new Error("incomplete data");
  }
}

// Returns a new iterable that processes each element of the input.
function processMessages<I, O>(
  requests: AsyncIterable<I>,
  processor: (req: I) => O,
): AsyncIterable<O> {
  const source = requests[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]() {
      return {
        async next() {
          const s = await source.next();
          if (s.done === true) {
            return {
              done: true,
              value: undefined,
            };
          }
          return {
            done: false,
            value: processor(s.value),
          };
        },
      };
    },
  };
}

// Writes length-prefixed messages to a stream.
async function writeMessages<Desc extends DescMessage>(
  stream: Writable,
  messageDesc: Desc,
  messages:
    | AsyncIterable<MessageShape<Desc>>
    | (() => AsyncIterable<MessageShape<Desc>>),
) {
  const input = typeof messages == "function" ? messages() : messages;
  for await (const message of input) {
    const bytes = toBinary(messageDesc, message);
    await new Promise<void>((resolve, reject) => {
      const lengthBytes = new Uint8Array(4);
      new DataView(lengthBytes.buffer).setInt32(0, bytes.length, true);
      stream.write(lengthBytes, (err) => (err ? reject(err) : resolve()));
    });
    await new Promise<void>((resolve, reject) => {
      stream.write(bytes, (err) => (err ? reject(err) : resolve()));
    });
  }
}
