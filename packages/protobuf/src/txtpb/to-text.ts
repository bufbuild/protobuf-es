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

import {
  type DescEnum,
  type DescExtension,
  type DescField,
  type DescMessage,
  ScalarType,
} from "../descriptors.js";
import { protoInt64 } from "../proto-int64.js";
import { reflect } from "../reflect/reflect.js";
import type {
  ReflectList,
  ReflectMap,
  ReflectMessage,
} from "../reflect/reflect-types.js";
import type { Registry } from "../registry.js";
import type { MessageShape, UnknownField } from "../types.js";
import { createExtensionContainer, getExtension } from "../extensions.js";
import { BinaryReader, WireType } from "../wire/index.js";
import type { Any } from "../wkt/index.js";
import { anyUnpack } from "../wkt/index.js";
import { isGroupLike } from "./is-group-like.js";
import { quoteBytes, quoteString, Writer } from "./writer.js";

/**
 * Options for serializing to the protobuf text format.
 *
 * The text format represents 64-bit integral types with BigInt and has no
 * string fall-back: toText throws immediately when BigInt is unavailable.
 */
export interface TextWriteOptions {
  /**
   * Print unknown fields?
   *
   * Disabled by default. This is a debugging aid only: unknown fields are
   * printed by field number, and fromText rejects fields named by number, so
   * output that includes them cannot be parsed back.
   */
  printUnknownFields: boolean;

  /**
   * The registry to resolve `google.protobuf.Any` and extensions. Without it,
   * an Any is written as its raw `type_url`/`value` fields and extensions are
   * omitted.
   */
  registry?: Registry | undefined;
}

const textWriteDefaults: Readonly<TextWriteOptions> = {
  printUnknownFields: false,
};

function makeWriteOptions(
  options?: Partial<TextWriteOptions>,
): Readonly<TextWriteOptions> {
  return options ? { ...textWriteDefaults, ...options } : textWriteDefaults;
}

// A bound on nested unknown-field rendering. The known-field tree is a finite,
// valid in-memory message and needs no limit, but printUnknownFields re-parses
// bytes and recurses (the length-delimited and group heuristics), so we cap
// that path as defense-in-depth.
const unknownFieldDepthLimit = 100;

/**
 * Serialize a message to the protobuf text format.
 *
 * The output matches the default formatting of txtpbfmt: two-space indentation,
 * one field per line, and a trailing newline.
 *
 * Requires BigInt: throws immediately if the environment does not support it.
 */
export function toText<Desc extends DescMessage>(
  schema: Desc,
  message: MessageShape<Desc>,
  options?: Partial<TextWriteOptions>,
): string {
  if (!protoInt64.supported) {
    throw new Error(
      "the protobuf text format requires BigInt, which is unavailable in this environment",
    );
  }
  const writer = new Writer();
  writeMessage(writer, reflect(schema, message), makeWriteOptions(options));
  return writer.toString();
}

/**
 * Write the body of a message: regular fields in declaration order, then
 * resolvable extensions sorted by full name, then unknown fields by number
 * (only when printUnknownFields is enabled). For `google.protobuf.Any`, the
 * expanded form replaces all of this.
 */
function writeMessage(
  writer: Writer,
  msg: ReflectMessage,
  opts: Readonly<TextWriteOptions>,
): void {
  if (writeAny(writer, msg, opts)) {
    return;
  }
  for (const field of msg.fields) {
    // Unset fields are omitted, including unset required fields; like
    // protobuf-go, we do not validate required fields when serializing.
    if (msg.isSet(field)) {
      writeField(writer, fieldTextName(field), field, msg, opts);
    }
  }
  const extensionNumbers = writeExtensions(writer, msg, opts);
  if (opts.printUnknownFields) {
    for (const field of msg.getUnknown() ?? []) {
      if (!extensionNumbers.has(field.no)) {
        writeUnknownField(writer, field, 0);
      }
    }
  }
}

function writeField(
  writer: Writer,
  name: string,
  field: DescField,
  msg: ReflectMessage,
  opts: Readonly<TextWriteOptions>,
): void {
  // Narrowing on fieldKind lets msg.get(field) return the precise reflect type
  // for each case — ReflectMessage, ReflectList, ReflectMap, number, or a scalar
  // value — so none of the branches need a cast.
  switch (field.fieldKind) {
    case "scalar":
      writer.scalar(name, scalarToText(field.scalar, msg.get(field)));
      break;
    case "enum":
      writer.scalar(name, enumToText(field.enum, msg.get(field)));
      break;
    case "message":
      writeMessageValue(writer, name, msg.get(field), opts);
      break;
    case "list":
      writeList(writer, name, field, msg.get(field), opts);
      break;
    case "map":
      writeMap(writer, name, field, msg.get(field), opts);
      break;
  }
}

/**
 * Write a message value as `name: { ... }`, or `name: {}` when it has no body.
 * The body is rendered speculatively and rolled back if it turns out empty.
 */
function writeMessageValue(
  writer: Writer,
  name: string,
  msg: ReflectMessage,
  opts: Readonly<TextWriteOptions>,
): void {
  const mark = writer.mark();
  writer.openMessage(name);
  writeMessage(writer, msg, opts);
  if (writer.writesSince(mark) === 1) {
    // Only the opener was written, so the message is empty.
    writer.reset(mark);
    writer.emptyMessage(name);
  } else {
    writer.end();
  }
}

function writeList(
  writer: Writer,
  name: string,
  field: DescField & { fieldKind: "list" },
  list: ReflectList,
  opts: Readonly<TextWriteOptions>,
): void {
  switch (field.listKind) {
    case "scalar":
      for (const item of list) {
        writer.scalar(name, scalarToText(field.scalar, item));
      }
      break;
    case "enum":
      for (const item of list) {
        writer.scalar(name, enumToText(field.enum, item as number));
      }
      break;
    case "message":
      for (const item of list) {
        writeMessageValue(writer, name, item as ReflectMessage, opts);
      }
      break;
  }
}

function writeMap(
  writer: Writer,
  name: string,
  field: DescField & { fieldKind: "map" },
  map: ReflectMap,
  opts: Readonly<TextWriteOptions>,
): void {
  // Map entries are emitted in iteration (insertion) order; unlike protobuf-go,
  // we deliberately do not sort them.
  for (const [key, value] of map) {
    writer.openMessage(name);
    writer.scalar("key", scalarToText(field.mapKey, key));
    switch (field.mapKind) {
      case "scalar":
        writer.scalar("value", scalarToText(field.scalar, value));
        break;
      case "enum":
        writer.scalar("value", enumToText(field.enum, value as number));
        break;
      case "message":
        writeMessageValue(writer, "value", value as ReflectMessage, opts);
        break;
    }
    writer.end();
  }
}

/**
 * Write `google.protobuf.Any` in its expanded form `[type.url]: { ... }`.
 * Returns false (so the generic path writes `type_url`/`value` instead) when
 * the message is not an Any, has no type URL, or the type cannot be resolved.
 */
function writeAny(
  writer: Writer,
  msg: ReflectMessage,
  opts: Readonly<TextWriteOptions>,
): boolean {
  if (
    msg.desc.typeName !== "google.protobuf.Any" ||
    opts.registry === undefined
  ) {
    return false;
  }
  const any = msg.message as Any;
  if (any.typeUrl === "") {
    return false;
  }
  const unpacked = anyUnpack(any, opts.registry);
  if (unpacked === undefined) {
    return false;
  }
  const desc = opts.registry.getMessage(unpacked.$typeName);
  if (desc === undefined) {
    return false;
  }
  // The bracketed name preserves the exact type URL, including a custom domain.
  writeMessageValue(
    writer,
    "[" + any.typeUrl + "]",
    reflect(desc, unpacked),
    opts,
  );
  return true;
}

/**
 * Write resolvable extensions, sorted by full name, and return their field
 * numbers so writeMessage does not also emit them as raw unknown fields.
 */
function writeExtensions(
  writer: Writer,
  msg: ReflectMessage,
  opts: Readonly<TextWriteOptions>,
): Set<number> {
  const numbers = new Set<number>();
  const unknown = msg.getUnknown();
  if (opts.registry === undefined || unknown === undefined) {
    return numbers;
  }
  const extensions: DescExtension[] = [];
  for (const { no } of unknown) {
    if (numbers.has(no)) {
      continue;
    }
    const extension = opts.registry.getExtensionFor(msg.desc, no);
    if (extension !== undefined) {
      numbers.add(no);
      extensions.push(extension);
    }
  }
  extensions.sort((a, b) =>
    a.typeName < b.typeName ? -1 : a.typeName > b.typeName ? 1 : 0,
  );
  for (const extension of extensions) {
    const value = getExtension(msg.message, extension);
    const [container, field] = createExtensionContainer(extension, value);
    writeField(writer, "[" + extension.typeName + "]", field, container, opts);
  }
  return numbers;
}

/**
 * Write an unknown field by its field number, mirroring protobuf-go: varints as
 * decimal, fixed-width values as hexadecimal, length-delimited data as a nested
 * message when it parses cleanly as one and a quoted byte string otherwise, and
 * groups recursively.
 */
function writeUnknownField(
  writer: Writer,
  field: UnknownField,
  depth: number,
): void {
  const name = field.no.toString();
  const reader = new BinaryReader(field.data);
  switch (field.wireType) {
    case WireType.Varint:
      writer.scalar(name, reader.uint64().toString());
      break;
    case WireType.Bit32:
      writer.scalar(
        name,
        "0x" + (reader.fixed32() >>> 0).toString(16).padStart(8, "0"),
      );
      break;
    case WireType.Bit64:
      writer.scalar(
        name,
        "0x" + BigInt(reader.fixed64()).toString(16).padStart(16, "0"),
      );
      break;
    case WireType.LengthDelimited: {
      const bytes = reader.bytes();
      const nested =
        depth < unknownFieldDepthLimit ? parseUnknownMessage(bytes) : undefined;
      if (nested === undefined) {
        writer.scalar(name, quoteBytes(bytes));
      } else {
        writeUnknownGroup(writer, name, nested, depth);
      }
      break;
    }
    case WireType.StartGroup: {
      const fields: UnknownField[] = [];
      while (reader.pos < reader.len) {
        const [no, wireType] = reader.tag();
        if (wireType === WireType.EndGroup) {
          break;
        }
        fields.push({ no, wireType, data: reader.skip(wireType, no) });
      }
      writeUnknownGroup(writer, name, fields, depth);
      break;
    }
  }
}

function writeUnknownGroup(
  writer: Writer,
  name: string,
  fields: UnknownField[],
  depth: number,
): void {
  if (fields.length === 0) {
    writer.emptyMessage(name);
    return;
  }
  writer.openMessage(name);
  for (const field of fields) {
    writeUnknownField(writer, field, depth + 1);
  }
  writer.end();
}

/**
 * Try to interpret length-delimited bytes as a nested message. Returns its
 * unknown fields if the bytes parse cleanly and completely, otherwise undefined
 * (in which case the data is rendered as a quoted byte string).
 */
function parseUnknownMessage(bytes: Uint8Array): UnknownField[] | undefined {
  if (bytes.length === 0) {
    return undefined;
  }
  const reader = new BinaryReader(bytes);
  const fields: UnknownField[] = [];
  try {
    while (reader.pos < reader.len) {
      const [no, wireType] = reader.tag();
      if (no <= 0 || wireType === WireType.EndGroup) {
        return undefined;
      }
      fields.push({ no, wireType, data: reader.skip(wireType, no) });
    }
  } catch {
    return undefined;
  }
  return reader.pos === reader.len ? fields : undefined;
}

/**
 * The name a field is addressed by in the text format: a group-like (delimited)
 * field uses its message type name, every other field its proto name.
 */
function fieldTextName(field: DescField): string {
  return isGroupLike(field) ? field.message.name : field.name;
}

function scalarToText(type: ScalarType, value: unknown): string {
  switch (type) {
    case ScalarType.STRING:
      return quoteString(value as string);
    case ScalarType.BYTES:
      return quoteBytes(value as Uint8Array);
    case ScalarType.BOOL:
      return value === true ? "true" : "false";
    case ScalarType.FLOAT:
      return floatToText(value as number, true);
    case ScalarType.DOUBLE:
      return floatToText(value as number, false);
    default:
      // All integer types print as decimal with no prefix. 64-bit values are
      // bigint; String() gives the decimal form for both bigint and number.
      return String(value);
  }
}

function enumToText(descEnum: DescEnum, value: number): string {
  // Emit the first-declared name for a value, so allow_alias enums match
  // protobuf-go (the by-number record can resolve to a non-first alias). An
  // unknown value prints as a decimal.
  for (const v of descEnum.values) {
    if (v.number === value) {
      return v.name;
    }
  }
  return value.toString();
}

function floatToText(value: number, single: boolean): string {
  // Round to 32-bit precision first so an overflow becomes inf (not the JS
  // "Infinity") and the value is the true 32-bit value before we test it.
  const n = single ? Math.fround(value) : value;
  if (Number.isNaN(n)) {
    return "nan";
  }
  if (n === Number.POSITIVE_INFINITY) {
    return "inf";
  }
  if (n === Number.NEGATIVE_INFINITY) {
    return "-inf";
  }
  if (Object.is(n, -0)) {
    return "-0";
  }
  if (!single) {
    // Number.prototype.toString already yields the shortest decimal that
    // round-trips to the same 64-bit value.
    return n.toString();
  }
  // For 32-bit floats, find the shortest decimal that round-trips to the same
  // float32, mirroring strconv.AppendFloat(n, 'g', -1, 32) in protobuf-go.
  for (let precision = 1; precision <= 9; precision++) {
    const candidate = Number(n.toPrecision(precision));
    if (Math.fround(candidate) === n) {
      return candidate.toString();
    }
  }
  return n.toString();
}
