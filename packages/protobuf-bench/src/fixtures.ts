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
  const MAX_UINT32 = 2 ** 32; // normalize the uint32 result down to [0, 1)
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / MAX_UINT32;
  };
}
const rand = mulberry32(SEED);

const randomUint32 = () => {
  const MAX_UINT32 = 2 ** 32;
  return Math.floor(rand() * MAX_UINT32);
};

const randomInt32 = () => {
  // Shift the uint32 range [0, 2**32) down to the int32 range [-2**31, 2**31).
  const MAX_INT32 = 2 ** 31;
  return randomUint32() - MAX_INT32;
};

const randomUint64 = () =>
  (BigInt(randomUint32()) << BigInt(32)) | BigInt(randomUint32());

const randomInt64 = () => {
  // Shift the uint64 range [0, 2**64) down to the int64 range [-2**63, 2**63).
  const MAX_INT64 = BigInt(1) << BigInt(63);
  return randomUint64() - MAX_INT64;
};

const randomBool = () => rand() < 0.5;

const pick = <T>(items: readonly T[]): T =>
  items[Math.floor(rand() * items.length)];

function makeString(length: number): string {
  const POOL = "abcdefghijklmnopqrstuvwxyz      ";
  let s = "";
  for (let i = 0; i < length; i++) s += POOL[Math.floor(rand() * POOL.length)];
  return s;
}

function scalarValue(scalar: ScalarType): unknown {
  switch (scalar) {
    case ScalarType.DOUBLE:
      return (rand() - 0.5) * 2e9;
    case ScalarType.FLOAT:
      return (rand() - 0.5) * 2e6;
    case ScalarType.INT32:
    case ScalarType.SINT32:
    case ScalarType.SFIXED32:
      return randomInt32();
    case ScalarType.UINT32:
    case ScalarType.FIXED32:
      return randomUint32();
    case ScalarType.INT64:
    case ScalarType.SINT64:
    case ScalarType.SFIXED64:
      return randomInt64();
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return randomUint64();
    case ScalarType.BOOL:
      return randomBool();
    case ScalarType.STRING:
      return makeString(STRING_LENGTH);
    case ScalarType.BYTES:
      return Uint8Array.from(
        { length: STRING_LENGTH },
        () => randomUint32() & 0xff,
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
  field: DescField,
  depth: number,
  messageSize: number,
): unknown {
  switch (field.fieldKind) {
    case "scalar":
      return scalarValue(field.scalar);
    case "enum":
      return pick(field.enum.values).number;
    case "message":
      return depth >= MAX_DEPTH
        ? undefined
        : build(field.message, depth + 1, messageSize);
    case "list":
      return listValue(field, depth, messageSize);
    case "map":
      return mapValue(field, depth, messageSize);
  }
}

// One element/value for a repeated field or map entry.
function randValue(
  field: DescField & { fieldKind: "list" | "map" },
  depth: number,
  messageSize: number,
): unknown {
  if (field.scalar !== undefined) return scalarValue(field.scalar);
  if (field.enum !== undefined) return pick(field.enum.values).number;
  return build(field.message, depth + 1, messageSize);
}

// A distinct map key for entry i, per the key type (map keys are always scalar).
function randMapKey(keyType: ScalarType, i: number): string {
  switch (keyType) {
    case ScalarType.STRING:
      return `k${i}_${makeString(3)}`;
    case ScalarType.BOOL:
      return i % 2 === 0 ? "true" : "false";
    default: // integer key types
      return String(i);
  }
}

function listValue(
  field: DescField & { fieldKind: "list" },
  depth: number,
  messageSize: number,
): unknown {
  const count = collectionCount(field.listKind, depth, messageSize);
  if (count === 0) return undefined;
  return Array.from({ length: count }, () =>
    randValue(field, depth, messageSize),
  );
}

function mapValue(
  field: DescField & { fieldKind: "map" },
  depth: number,
  messageSize: number,
): unknown {
  const count = collectionCount(field.mapKind, depth, messageSize);
  if (count === 0) return undefined;
  const out: Record<string, unknown> = {};
  for (let i = 0; i < count; i++) {
    out[randMapKey(field.mapKey, i)] = randValue(field, depth, messageSize);
  }
  return out;
}

function oneofValue(
  oneof: DescOneof,
  depth: number,
  messageSize: number,
): unknown {
  const field = pick(oneof.fields);
  if (field === undefined) return undefined;
  const value = fieldValue(field, depth, messageSize);
  return value === undefined ? undefined : { case: field.localName, value };
}

function build(
  schema: DescMessage,
  depth: number,
  messageSize: number,
): Record<string, unknown> {
  const init: Record<string, unknown> = {};
  for (const member of schema.members) {
    const value =
      member.kind === "oneof"
        ? oneofValue(member, depth, messageSize)
        : fieldValue(member, depth, messageSize);
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
  return build(schema, 0, messageCollectionSize) as never;
}
