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

import {
  ConformanceRequest,
  ConformanceResponse,
  FailureSet,
  TestCategory,
  WireFormat,
} from "./gen/conformance/conformance_pb.js";
import { TestAllTypesProto3 } from "./gen/google/protobuf/test_messages_proto3_pb.js";
import {
  extension_int32,
  TestAllTypesProto2,
} from "./gen/google/protobuf/test_messages_proto2_pb.js";
import type { MessageType } from "@bufbuild/protobuf";
import {
  Any,
  createRegistry,
  Duration,
  FieldMask,
  Int32Value,
  Message,
  Struct,
  Timestamp,
  Value,
} from "@bufbuild/protobuf";
import type { Writable } from "node:stream";

const registry = createRegistry(
  Value,
  Struct,
  FieldMask,
  Timestamp,
  Duration,
  Int32Value,
  TestAllTypesProto3,
  TestAllTypesProto2,
  Any,
  extension_int32,
);

void main();

async function main() {
  let testCount = 0;
  try {
    const requests = readMessages(process.stdin, ConformanceRequest);
    const responses = processMessages(requests, (request) => {
      testCount += 1;
      return new ConformanceResponse({
        result: test(request),
      });
    });
    await writeMessages(process.stdout, responses);
  } catch (e) {
    process.stderr.write(
      `conformance.ts: exiting after ${testCount} tests: ${String(e)}`,
      () => process.exit(1),
    );
  }
}

function test(request: ConformanceRequest): ConformanceResponse["result"] {
  if (request.messageType === FailureSet.typeName) {
    // > The conformance runner will request a list of failures as the first request.
    // > This will be known by message_type == "conformance.FailureSet", a conformance
    // > test should return a serialized FailureSet in protobuf_payload.
    const failureSet = new FailureSet();
    return { case: "protobufPayload", value: failureSet.toBinary() };
  }

  const payloadType = registry.findMessage(request.messageType);
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
        payload = payloadType.fromBinary(request.payload.value);
        break;

      case "jsonPayload":
        payload = payloadType.fromJsonString(request.payload.value, {
          ignoreUnknownFields:
            request.testCategory ===
            TestCategory.JSON_IGNORE_UNKNOWN_PARSING_TEST,
          typeRegistry: registry,
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
          value: payload.toBinary(),
        };

      case WireFormat.JSON:
        return {
          case: "jsonPayload",
          value: payload.toJsonString({
            typeRegistry: registry,
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
async function* readMessages<T extends Message<T>>(
  stream: AsyncIterable<Uint8Array>,
  type: MessageType<T>,
): AsyncIterable<T> {
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
      yield type.fromBinary(buffer.subarray(4, 4 + size));
      buffer = buffer.subarray(4 + size);
    }
  }
  if (buffer.byteLength > 0) {
    throw new Error("incomplete data");
  }
}

// Returns a new iterable that processes each element of the input.
function processMessages<I extends Message<I>, O extends Message<O> = I>(
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
async function writeMessages(
  stream: Writable,
  messages: AsyncIterable<Message> | (() => AsyncIterable<Message>),
) {
  const input = typeof messages == "function" ? messages() : messages;
  for await (const message of input) {
    const bytes = message.toBinary();
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
