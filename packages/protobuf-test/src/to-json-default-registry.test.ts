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

import {
  create,
  createRegistry,
  toJson as toJsonOriginal,
} from "@bufbuild/protobuf";
import { anyPack, AnySchema, DurationSchema } from "@bufbuild/protobuf/wkt";
import { describe, expect, test } from "@jest/globals";

describe("default registry with custom toJson()", () => {
  // Define you own default registry
  const registry = createRegistry(
    // You can register as many types as you need. In this example, we only
    // register google.protobuf.Duration.
    DurationSchema,
  );

  // Define your own toJson function that uses your default registry
  const toJson: typeof toJsonOriginal = (schema, message, options) => {
    // biome-ignore lint/suspicious/noExplicitAny: `any` is the best choice here
    return toJsonOriginal(schema, message, options ?? { registry }) as any;
  };

  test("works as expected", () => {
    // Create a google.protobuf.Any that holds a google.protobuf.Duration
    const duration = create(DurationSchema, { nanos: 123 });
    const any = anyPack(DurationSchema, duration);

    // Serializing to JSON requires a registry that contains google.protobuf.Duration
    const json = toJson(AnySchema, any);

    expect(json).toStrictEqual({
      "@type": "type.googleapis.com/google.protobuf.Duration",
      value: "0.000000123s",
    });
  });
});
