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

// Deterministically populates a message from its descriptor, so message
// fixtures don't have to be hand-written per schema. Dependency-free: it walks
// the fields and fills each with values from a tiny seeded PRNG (no Faker), so
// the same schema always yields the same message.

import {
  type DescField,
  type DescMessage,
  type DescOneof,
  type MessageInitShape,
  ScalarType,
} from "@bufbuild/protobuf";

/** PRNG seed; the same seed yields the same fixtures. */
const SEED = 1;

/** Entries per repeated/map field. */
const COLLECTION_SIZE = 16;
/** Characters per string, bytes per `bytes` field. */
const STRING_LENGTH = 32;
/** Nesting depth for self-referential messages (keeps General from exploding). */
const MAX_DEPTH = 1;
/** Max entries for top-level repeated/map message fields. */
const MESSAGE_COLLECTION_CAP = 3;

/** A tiny deterministic PRNG (Mulberry32). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  const TWO_POW_32 = 2 ** 32; // normalize the uint32 result down to [0, 1)
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / TWO_POW_32;
  };
}

/** A seeded source of random values. makeInit() creates one per call, so a
 * fixture's payload depends only on its own schema — never on how many other
 * fixtures exist or the order they are built. */
interface Rand {
  /** A uniform float in [0, 1). */
  rand(): number;
  uint32(): number;
  int32(): number;
  uint64(): bigint;
  int64(): bigint;
  bool(): boolean;
  /** A uniformly chosen element of `items`. */
  pick<T>(items: readonly T[]): T;
  /** `length` random lowercase letters (a-z). */
  string(length: number): string;
}

function makeRand(seed: number): Rand {
  const TWO_POW_32 = 2 ** 32;

  const rand = mulberry32(seed);
  const uint32 = () => Math.floor(rand() * TWO_POW_32);
  const uint64 = () => (BigInt(uint32()) << BigInt(32)) | BigInt(uint32());

  return {
    rand,
    uint32,
    int32: () => uint32() - 2 ** 31,
    uint64,
    int64: () => uint64() - (BigInt(1) << BigInt(63)),
    bool: () => rand() < 0.5,
    pick<T>(items: readonly T[]): T {
      return items[Math.floor(rand() * items.length)];
    },
    string(length: number): string {
      let s = "";
      for (let i = 0; i < length; i++)
        s += String.fromCharCode("a".charCodeAt(0) + Math.floor(rand() * 26));
      return s;
    },
  };
}

function scalarValue(rand: Rand, scalar: ScalarType): unknown {
  switch (scalar) {
    case ScalarType.DOUBLE:
      return (rand.rand() - 0.5) * 2e9;
    case ScalarType.FLOAT:
      return (rand.rand() - 0.5) * 2e6;
    case ScalarType.INT32:
    case ScalarType.SINT32:
    case ScalarType.SFIXED32:
      return rand.int32();
    case ScalarType.UINT32:
    case ScalarType.FIXED32:
      return rand.uint32();
    case ScalarType.INT64:
    case ScalarType.SINT64:
    case ScalarType.SFIXED64:
      return rand.int64();
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return rand.uint64();
    case ScalarType.BOOL:
      return rand.bool();
    case ScalarType.STRING:
      return rand.string(STRING_LENGTH);
    case ScalarType.BYTES:
      return Uint8Array.from(
        { length: STRING_LENGTH },
        () => rand.uint32() & 0xff,
      );
    default:
      throw new Error(`unhandled scalar type: ${scalar as number}`);
  }
}

function collectionCount(
  kind: "scalar" | "enum" | "message",
  depth: number,
  messageSize: number,
): number {
  if (kind !== "message") return COLLECTION_SIZE;
  return depth === 0 ? messageSize : 0;
}

function fieldValue(
  rand: Rand,
  field: DescField,
  depth: number,
  messageSize: number,
): unknown {
  switch (field.fieldKind) {
    case "scalar":
      return scalarValue(rand, field.scalar);
    case "enum":
      return rand.pick(field.enum.values).number;
    case "message":
      return depth >= MAX_DEPTH
        ? undefined
        : build(rand, field.message, depth + 1, messageSize);
    case "list":
      return listValue(rand, field, depth, messageSize);
    case "map":
      return mapValue(rand, field, depth, messageSize);
  }
}

// One element/value for a repeated field or map entry.
function randValue(
  rand: Rand,
  field: DescField & { fieldKind: "list" | "map" },
  depth: number,
  messageSize: number,
): unknown {
  if (field.scalar !== undefined) return scalarValue(rand, field.scalar);
  if (field.enum !== undefined) return rand.pick(field.enum.values).number;
  return build(rand, field.message, depth + 1, messageSize);
}

// A distinct map key for entry i, per the key type (map keys are always scalar).
function randMapKey(rand: Rand, keyType: ScalarType, i: number): string {
  switch (keyType) {
    case ScalarType.STRING:
      return `k${i}_${rand.string(3)}`;
    case ScalarType.BOOL:
      return i % 2 === 0 ? "true" : "false";
    default: // integer key types
      return String(i);
  }
}

function listValue(
  rand: Rand,
  field: DescField & { fieldKind: "list" },
  depth: number,
  messageSize: number,
): unknown {
  const count = collectionCount(field.listKind, depth, messageSize);
  if (count === 0) return undefined;
  return Array.from({ length: count }, () =>
    randValue(rand, field, depth, messageSize),
  );
}

function mapValue(
  rand: Rand,
  field: DescField & { fieldKind: "map" },
  depth: number,
  messageSize: number,
): unknown {
  const count = collectionCount(field.mapKind, depth, messageSize);
  if (count === 0) return undefined;
  const out: Record<string, unknown> = {};
  for (let i = 0; i < count; i++) {
    out[randMapKey(rand, field.mapKey, i)] = randValue(
      rand,
      field,
      depth,
      messageSize,
    );
  }
  return out;
}

function oneofValue(
  rand: Rand,
  oneof: DescOneof,
  depth: number,
  messageSize: number,
): unknown {
  const field = rand.pick(oneof.fields);
  if (field === undefined) return undefined;
  const value = fieldValue(rand, field, depth, messageSize);
  return value === undefined ? undefined : { case: field.localName, value };
}

function build(
  rand: Rand,
  schema: DescMessage,
  depth: number,
  messageSize: number,
): Record<string, unknown> {
  const init: Record<string, unknown> = {};
  for (const member of schema.members) {
    const value =
      member.kind === "oneof"
        ? oneofValue(rand, member, depth, messageSize)
        : fieldValue(rand, member, depth, messageSize);
    if (value !== undefined) init[member.localName] = value;
  }
  return init;
}

/**
 * Build a deterministic init object for the given message schema - the input to
 * `create()`. Callers pass it to `create` to get a message (and to bench create).
 *
 * `messageCollectionSize` sets the number of entries for top-level repeated/map
 * *message* fields. It defaults to a small cap so self-referential schemas
 * (General) don't explode; pass a larger value for fixtures whose message
 * elements are not self-referential.
 */
export function makeInit<Desc extends DescMessage>(
  schema: Desc,
  messageCollectionSize: number = MESSAGE_COLLECTION_CAP,
): MessageInitShape<Desc> {
  // A fresh PRNG per call, so this fixture's payload is independent of any
  // others - their count, and the order they are built.
  const rand = makeRand(SEED);
  return build(rand, schema, 0, messageCollectionSize) as never;
}
