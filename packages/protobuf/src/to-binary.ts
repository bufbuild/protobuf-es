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

import type { MessageShape, UnknownField } from "./types.js";
import { BinaryWriter, WireType } from "./wire/binary-encoding.js";
import { type DescField, type DescMessage, ScalarType } from "./descriptors.js";
import type { ReflectMessage } from "./reflect/index.js";
import { FieldError } from "./reflect/error.js";
import { unsafeLocal } from "./reflect/unsafe.js";
import { localMessageMapper } from "./reflect/message.js";
import { protoInt64 } from "./proto-int64.js";

// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.IMPLICIT: const $name = $number;
const IMPLICIT = 2;

// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.LEGACY_REQUIRED: const $name = $number;
const LEGACY_REQUIRED = 3;

/**
 * Options for serializing to binary data.
 *
 * V1 also had the option `readerFactory` for using a custom implementation to
 * encode to binary.
 */
export interface BinaryWriteOptions {
  /**
   * Include unknown fields in the serialized output? The default behavior
   * is to retain unknown fields and include them in the serialized output.
   *
   * For more details see https://developers.google.com/protocol-buffers/docs/proto3#unknowns
   */
  writeUnknownFields: boolean;
}

// Default options for serializing binary data.
const writeDefaults: Readonly<BinaryWriteOptions> = {
  writeUnknownFields: true,
};

function makeWriteOptions(
  options?: Partial<BinaryWriteOptions>,
): Readonly<BinaryWriteOptions> {
  return options ? { ...writeDefaults, ...options } : writeDefaults;
}

export function toBinary<Desc extends DescMessage>(
  schema: Desc,
  message: MessageShape<Desc>,
  options?: Partial<BinaryWriteOptions>,
): Uint8Array<ArrayBuffer> {
  const writer = new BinaryWriter();
  compiledWriter(schema)(
    writer,
    makeWriteOptions(options),
    message as Record<string, unknown>,
  );
  return writer.finish();
}

/**
 * A message or field encoder, compiled from a descriptor ahead of time.
 */
type CompiledWriter = (
  writer: BinaryWriter,
  opts: BinaryWriteOptions,
  message: Record<string, unknown>,
) => void;

const compiledWriters = new WeakMap<DescMessage, CompiledWriter>();

/**
 * Return the compiled encoder for a message, compiling it on first use.
 */
function compiledWriter(desc: DescMessage): CompiledWriter {
  let compiled = compiledWriters.get(desc);
  if (compiled === undefined) {
    compiled = compileMessage(desc);
  }
  return compiled;
}

function compileMessage(desc: DescMessage): CompiledWriter {
  const typeName = desc.typeName;
  const sortedFields = desc.fields.concat().sort((a, b) => a.number - b.number);
  // The field reported in ForeignFieldError.
  const foreignField: DescField | undefined = sortedFields[0];
  const fieldWriters: CompiledWriter[] = [];
  const compiled: CompiledWriter = (writer, opts, message) => {
    if (message.$typeName !== typeName && foreignField !== undefined) {
      throw new FieldError(
        foreignField,
        `cannot use ${foreignField} with message ${message.$typeName}`,
        "ForeignFieldError",
      );
    }
    for (let i = 0; i < fieldWriters.length; i++) {
      fieldWriters[i](writer, opts, message);
    }
    const unknown = message.$unknown as UnknownField[] | undefined;
    if (unknown !== undefined && opts.writeUnknownFields) {
      for (let i = 0; i < unknown.length; i++) {
        const { no, wireType, data } = unknown[i];
        writer.tag(no, wireType).raw(data);
      }
    }
  };
  // Register before compiling fields, so that recursive message types
  // resolve to this instance instead of compiling endlessly.
  compiledWriters.set(desc, compiled);
  for (const field of sortedFields) {
    fieldWriters.push(compileField(field));
  }
  return compiled;
}

function compileField(field: DescField): CompiledWriter {
  switch (field.fieldKind) {
    case "message":
    case "scalar":
    case "enum":
      return compileSingularField(field);
    case "list":
      return compileListField(field);
    case "map":
      return compileMapField(field);
  }
}

type DescFieldSingular = DescField &
  ({ fieldKind: "scalar" } | { fieldKind: "enum" } | { fieldKind: "message" });

/**
 * Compile an encoder for a singular field: the presence check, and the
 * value encoder.
 */
function compileSingularField(field: DescFieldSingular): CompiledWriter {
  const writeValue = compileSingularValue(field);
  const localName = field.localName;
  if (field.oneof) {
    const oneofLocalName = field.oneof.localName;
    return (writer, opts, message) => {
      const oneof = message[oneofLocalName] as {
        case: string | undefined;
        value?: unknown;
      };
      if (oneof.case === localName) {
        writeValue(writer, opts, oneof.value);
      }
    };
  }
  if (field.presence != IMPLICIT) {
    const requiredError =
      field.presence == LEGACY_REQUIRED
        ? `cannot encode ${field} to binary: required field not set`
        : undefined;
    return (writer, opts, message) => {
      if (Object.prototype.hasOwnProperty.call(message, localName)) {
        const value = message[localName];
        if (value !== undefined) {
          writeValue(writer, opts, value);
          return;
        }
      }
      if (requiredError !== undefined) {
        throw new Error(requiredError);
      }
    };
  }
  // Implicit presence: the field is set when the value is not the zero
  // value. The check is inlined per type, see isScalarZeroValue.
  if (field.fieldKind == "enum") {
    const zero = field.enum.values[0].number;
    return (writer, opts, message) => {
      const value = message[localName];
      if (value !== zero) {
        writeValue(writer, opts, value);
      }
    };
  }
  switch (field.scalar) {
    case ScalarType.BOOL:
      return (writer, opts, message) => {
        const value = message[localName];
        if (value !== false) {
          writeValue(writer, opts, value);
        }
      };
    case ScalarType.STRING:
      return (writer, opts, message) => {
        const value = message[localName];
        if (value !== "") {
          writeValue(writer, opts, value);
        }
      };
    case ScalarType.BYTES:
      return (writer, opts, message) => {
        const value = message[localName];
        if (!(value instanceof Uint8Array) || value.byteLength > 0) {
          writeValue(writer, opts, value);
        }
      };
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return (writer, opts, message) => {
        const value = message[localName];
        // Object.is distinguishes -0 from 0.
        if (!Object.is(value, 0)) {
          writeValue(writer, opts, value);
        }
      };
    default:
      return (writer, opts, message) => {
        const value = message[localName];
        // Loose comparison matches 0n, 0 and "0".
        if (value != 0) {
          writeValue(writer, opts, value);
        }
      };
  }
}

/**
 * An encoder for a field value. The tag is written by the encoder itself.
 */
type CompiledValueWriter = (
  writer: BinaryWriter,
  opts: BinaryWriteOptions,
  value: unknown,
) => void;

/**
 * Compile an encoder for the value of a singular field, including the tag.
 */
function compileSingularValue(field: DescFieldSingular): CompiledValueWriter {
  switch (field.fieldKind) {
    case "message": {
      const { toMessage } = localMessageMapper(field);
      const writeChild = compileChildWriter(field);
      return (writer, opts, value) => {
        writeChild(writer, opts, toMessage(value));
      };
    }
    case "scalar":
    case "enum": {
      const scalarType =
        field.fieldKind == "enum" ? ScalarType.INT32 : field.scalar;
      const fieldNo = field.number;
      const wireType = writeTypeOfScalar(scalarType);
      const writeScalar = compileScalarValue(
        scalarType,
        field.parent.typeName,
        field.name,
      );
      return (writer, opts, value) => {
        writer.tag(fieldNo, wireType);
        writeScalar(writer, value);
      };
    }
  }
}

function compileListField(
  field: DescField & { fieldKind: "list" },
): CompiledWriter {
  const localName = field.localName;
  const fieldNo = field.number;
  switch (field.listKind) {
    case "message": {
      const { toMessage } = localMessageMapper(field);
      const writeChild = compileChildWriter(field);
      return (writer, opts, message) => {
        const items = message[localName] as unknown[];
        for (let i = 0; i < items.length; i++) {
          writeChild(writer, opts, toMessage(items[i]));
        }
      };
    }
    case "scalar":
    case "enum": {
      const scalarType =
        field.listKind == "enum" ? ScalarType.INT32 : field.scalar;
      const writeScalar = compileScalarValue(
        scalarType,
        field.parent.typeName,
        field.name,
      );
      if (field.packed) {
        return (writer, opts, message) => {
          const items = message[localName] as unknown[];
          if (items.length == 0) {
            return;
          }
          writer.tag(fieldNo, WireType.LengthDelimited).fork();
          for (let i = 0; i < items.length; i++) {
            writeScalar(writer, items[i]);
          }
          writer.join();
        };
      }
      const wireType = writeTypeOfScalar(scalarType);
      return (writer, opts, message) => {
        const items = message[localName] as unknown[];
        for (let i = 0; i < items.length; i++) {
          writer.tag(fieldNo, wireType);
          writeScalar(writer, items[i]);
        }
      };
    }
  }
}

function compileMapField(
  field: DescField & { fieldKind: "map" },
): CompiledWriter {
  const localName = field.localName;
  const fieldNo = field.number;
  const writeKey = compileMapKey(field);
  if (field.mapKind == "message") {
    const { toMessage } = localMessageMapper(field);
    const writeMessage = compiledWriter(field.message);
    return (writer, opts, message) => {
      const record = message[localName] as Record<string, unknown>;
      const keys = Object.keys(record);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        writer.tag(fieldNo, WireType.LengthDelimited).fork();
        writeKey(writer, key);
        // The value of a map entry is always field number 2.
        writer.tag(2, WireType.LengthDelimited).fork();
        writeMessage(writer, opts, toMessage(record[key]));
        writer.join();
        writer.join();
      }
    };
  }
  const scalarType = field.mapKind == "enum" ? ScalarType.INT32 : field.scalar;
  const valueWireType = writeTypeOfScalar(scalarType);
  const writeScalar = compileScalarValue(
    scalarType,
    field.parent.typeName,
    field.name,
  );
  return (writer, opts, message) => {
    const record = message[localName] as Record<string, unknown>;
    const keys = Object.keys(record);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      writer.tag(fieldNo, WireType.LengthDelimited).fork();
      writeKey(writer, key);
      // The value of a map entry is always field number 2.
      writer.tag(2, valueWireType);
      writeScalar(writer, record[key]);
      writer.join();
    }
  };
}

/**
 * Compile an encoder for a map key. Map keys are stored as object keys and
 * are always strings locally. Convert them to their scalar type before
 * writing, like the reflect API does when iterating map entries.
 */
function compileMapKey(
  field: DescField & { fieldKind: "map" },
): (writer: BinaryWriter, key: string) => void {
  const wireType = writeTypeOfScalar(field.mapKey);
  const writeScalar = compileScalarValue(
    field.mapKey,
    field.parent.typeName,
    field.name,
  );
  const convertKey = compileMapKeyConverter(field.mapKey);
  return (writer, key) => {
    // The key of a map entry is always field number 1.
    writer.tag(1, wireType);
    writeScalar(writer, convertKey(key));
  };
}

/**
 * Returns a converter from an object key (always a string) to the closest
 * possible type for the map key type. Invalid keys are passed through to
 * the scalar writer, which raises an error for them.
 */
function compileMapKeyConverter(
  type: Exclude<
    ScalarType,
    ScalarType.FLOAT | ScalarType.DOUBLE | ScalarType.BYTES
  >,
): (key: string) => unknown {
  switch (type) {
    case ScalarType.STRING:
      return (key) => key;
    case ScalarType.BOOL:
      return (key) => (key === "true" ? true : key === "false" ? false : key);
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return (key) => {
        try {
          return protoInt64.uParse(key);
        } catch {
          return key;
        }
      };
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return (key) => {
        try {
          return protoInt64.parse(key);
        } catch {
          return key;
        }
      };
    default:
      // Handles INT32, UINT32, SINT32, FIXED32, SFIXED32.
      // We do not use individual cases to save a few bytes code size.
      return (key) => {
        const n = Number.parseInt(key);
        return Number.isFinite(n) ? n : key;
      };
  }
}

/**
 * Compile an encoder for a bare scalar value (no tag), wrapping errors from
 * the writer with the message and field name.
 */
function compileScalarValue(
  type: ScalarType,
  messageName: string,
  fieldName: string,
): (writer: BinaryWriter, value: unknown) => void {
  const writeScalar = compileScalarWrite(type);
  return (writer, value) => {
    try {
      writeScalar(writer, value);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(
          `cannot encode field ${messageName}.${fieldName} to binary: ${e.message}`,
        );
      }
      throw e;
    }
  };
}

function compileScalarWrite(
  type: ScalarType,
): (writer: BinaryWriter, value: unknown) => void {
  switch (type) {
    case ScalarType.STRING:
      return (writer, value) => writer.string(value as string);
    case ScalarType.BOOL:
      return (writer, value) => writer.bool(value as boolean);
    case ScalarType.DOUBLE:
      return (writer, value) => writer.double(value as number);
    case ScalarType.FLOAT:
      return (writer, value) => writer.float(value as number);
    case ScalarType.INT32:
      return (writer, value) => writer.int32(value as number);
    case ScalarType.INT64:
      return (writer, value) => writer.int64(value as number);
    case ScalarType.UINT64:
      return (writer, value) => writer.uint64(value as number);
    case ScalarType.FIXED64:
      return (writer, value) => writer.fixed64(value as number);
    case ScalarType.BYTES:
      return (writer, value) => writer.bytes(value as Uint8Array);
    case ScalarType.FIXED32:
      return (writer, value) => writer.fixed32(value as number);
    case ScalarType.SFIXED32:
      return (writer, value) => writer.sfixed32(value as number);
    case ScalarType.SFIXED64:
      return (writer, value) => writer.sfixed64(value as number);
    case ScalarType.SINT64:
      return (writer, value) => writer.sint64(value as number);
    case ScalarType.UINT32:
      return (writer, value) => writer.uint32(value as number);
    case ScalarType.SINT32:
      return (writer, value) => writer.sint32(value as number);
  }
}

/**
 * Write a single field to binary format, if it is set. Used to serialize
 * extensions: extensions always have explicit presence, so an extension
 * value that was just set on the container is always written.
 *
 * @private
 */
export function writeField(
  writer: BinaryWriter,
  opts: BinaryWriteOptions,
  msg: ReflectMessage,
  field: DescField,
): void {
  compileField(field)(
    writer,
    opts,
    msg[unsafeLocal] as unknown as Record<string, unknown>,
  );
}

/**
 * Compile an encoder for the wire format of a message field, honoring the
 * delimited encoding of the field. The tag is written by the encoder.
 */
function compileChildWriter(
  field: DescField &
    ({ fieldKind: "message" } | { fieldKind: "list"; listKind: "message" }),
): CompiledValueWriter {
  const fieldNo = field.number;
  const writeMessage = compiledWriter(field.message);
  if (field.delimitedEncoding) {
    return (writer, opts, child) => {
      writer.tag(fieldNo, WireType.StartGroup);
      writeMessage(writer, opts, child as Record<string, unknown>);
      writer.tag(fieldNo, WireType.EndGroup);
    };
  }
  return (writer, opts, child) => {
    writer.tag(fieldNo, WireType.LengthDelimited).fork();
    writeMessage(writer, opts, child as Record<string, unknown>);
    writer.join();
  };
}

function writeTypeOfScalar(type: ScalarType): WireType {
  switch (type) {
    case ScalarType.BYTES:
    case ScalarType.STRING:
      return WireType.LengthDelimited;
    case ScalarType.DOUBLE:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
      return WireType.Bit64;
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.FLOAT:
      return WireType.Bit32;
    default:
      return WireType.Varint;
  }
}
