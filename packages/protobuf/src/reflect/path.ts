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
  ScalarType,
  type DescExtension,
  type DescField,
  type DescMessage,
  type DescOneof,
} from "../descriptors.js";

import type { Registry } from "../registry.js";

/**
 * A path to a (nested) member of a Protobuf message, such as a field, oneof,
 * extension, list element, or map entry.
 */
export type Path = (
  | DescField
  | DescExtension
  | DescOneof
  | { kind: "list_sub"; index: number }
  | {
      kind: "map_sub";
      key: string | number | bigint | boolean;
    }
)[];

/**
 * Builds a Path.
 */
export type PathBuilder = {
  /**
   * The root message of the path.
   */
  readonly schema: DescMessage;
  /**
   * Add field access.
   *
   * Throws an InvalidPathError if the field cannot be added to the path.
   */
  field(field: DescField): PathBuilder;
  /**
   * Access a oneof.
   *
   * Throws an InvalidPathError if the oneof cannot be added to the path.
   *
   */
  oneof(oneof: DescOneof): PathBuilder;
  /**
   * Access an extension.
   *
   * Throws an InvalidPathError if the extension cannot be added to the path.
   */
  extension(extension: DescExtension): PathBuilder;
  /**
   * Access a list field by index.
   *
   * Throws an InvalidPathError if the list access cannot be added to the path.
   */
  list(index: number): PathBuilder;
  /**
   * Access a map field by key.
   *
   * Throws an InvalidPathError if the map access cannot be added to the path.
   */
  mapKey(key: string | number | bigint | boolean): PathBuilder;
  /**
   * Append a path.
   *
   * Throws an InvalidPathError if the path cannot be added.
   */
  add(path: Path | PathBuilder): PathBuilder;
  /**
   * Return the path.
   */
  toPath(): Path;
  /**
   * Create a copy of this builder.
   */
  clone(): PathBuilder;
  /**
   * Get the current container - a list, map, or message.
   */
  getLeft():
    | DescMessage
    | (DescField & { fieldKind: "list" })
    | (DescField & { fieldKind: "map" })
    | undefined;
};

/**
 * Create a PathBuilder.
 */
export function buildPath(schema: DescMessage): PathBuilder {
  return new PathBuilderImpl(schema, schema, []);
}

/**
 * Parse a Path from a string.
 *
 * Throws an InvalidPathError if the path is invalid.
 */
export function parsePath(
  schema: DescMessage,
  path: string,
  registry?: Registry,
): Path {
  const builder = new PathBuilderImpl(schema, schema, []);
  const err = (message: string, i: number) =>
    new InvalidPathError(schema, message + " at column " + (i + 1), path);
  for (let i = 0; i < path.length; ) {
    const token = nextToken(i, path);
    const left = builder.getLeft();
    let right: Path[number] | undefined = undefined;
    if ("field" in token) {
      right =
        left?.kind != "message"
          ? undefined
          : (left.fields.find((field) => field.name === token.field) ??
            left.oneofs.find((oneof) => oneof.name === token.field));
      if (!right) {
        throw err(`Unknown field "${token.field}"`, i);
      }
    } else if ("ext" in token) {
      right = registry?.getExtension(token.ext);
      if (!right) {
        throw err(`Unknown extension "${token.ext}"`, i);
      }
    } else if ("val" in token) {
      // list or map
      right =
        left?.kind == "field" &&
        left.fieldKind == "list" &&
        typeof token.val == "bigint"
          ? { kind: "list_sub", index: Number(token.val) }
          : { kind: "map_sub", key: token.val };
    } else if ("err" in token) {
      throw err(token.err, token.i);
    }
    if (right) {
      try {
        builder.add([right]);
      } catch (e) {
        throw err(e instanceof InvalidPathError ? e.message : String(e), i);
      }
    }
    i = token.i;
  }
  return builder.toPath();
}

/**
 * Stringify a path.
 */
export function pathToString(path: Path): string {
  const str: (string | number | bigint | boolean)[] = [];
  for (const ele of path) {
    switch (ele.kind) {
      case "field":
      case "oneof":
        if (str.length > 0) {
          str.push(".");
        }
        str.push(ele.name);
        break;
      case "extension":
        str.push("[", ele.typeName, "]");
        break;
      case "list_sub":
        str.push("[", ele.index, "]");
        break;
      case "map_sub":
        if (typeof ele.key == "string") {
          str.push(
            '["',
            ele.key
              .split("\\")
              .join("\\\\")
              .split('"')
              .join('\\"')
              .split("\r")
              .join("\\r")
              .split("\n")
              .join("\\n"),
            '"]',
          );
        } else {
          str.push("[", ele.key, "]");
        }
        break;
    }
  }
  return str.join("");
}

export class InvalidPathError extends Error {
  override name = "InvalidPathError";
  readonly schema: DescMessage;
  readonly path: Path | string;
  constructor(schema: DescMessage, message: string, path: string | Path) {
    super(message);
    this.schema = schema;
    this.path = path;
    // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class PathBuilderImpl implements PathBuilder {
  constructor(
    readonly schema: DescMessage,
    private left:
      | DescMessage
      | (DescField & { fieldKind: "list" })
      | (DescField & { fieldKind: "map" })
      | undefined,
    private readonly path: Path,
  ) {}

  getLeft():
    | DescMessage
    | (DescField & { fieldKind: "list" })
    | (DescField & { fieldKind: "map" })
    | undefined {
    return this.left;
  }

  field(field: DescField) {
    return this.push(field);
  }

  oneof(oneof: DescOneof) {
    return this.push(oneof);
  }

  extension(extension: DescExtension) {
    return this.push(extension);
  }

  list(index: number) {
    return this.push({ kind: "list_sub", index });
  }

  mapKey(key: string | number | bigint | boolean) {
    return this.push({ kind: "map_sub", key });
  }

  add(pathOrBuilder: Path | PathBuilder) {
    const path = Array.isArray(pathOrBuilder)
      ? pathOrBuilder
      : pathOrBuilder.toPath();
    const l = this.path.length;
    try {
      for (const ele of path) {
        this.push(ele);
      }
    } catch (e) {
      // undo pushes
      this.path.splice(l);
      throw e;
    }
    return this;
  }

  toPath(): Path {
    return this.path.concat();
  }

  clone() {
    return new PathBuilderImpl(this.schema, this.left, this.path.concat());
  }

  private push(ele: Path[number]) {
    switch (ele.kind) {
      case "field":
        if (
          !this.left ||
          this.left.kind != "message" ||
          this.left.typeName != ele.parent.typeName
        ) {
          throw this.err("field access");
        }
        this.path.push(ele);
        this.left =
          ele.fieldKind == "message"
            ? ele.message
            : ele.fieldKind == "list" || ele.fieldKind == "map"
              ? ele
              : undefined;
        return this;
      case "oneof":
        if (
          !this.left ||
          this.left.kind != "message" ||
          this.left.typeName != ele.parent.typeName
        ) {
          throw this.err("oneof access");
        }
        this.path.push(ele);
        this.left = undefined;
        return this;
      case "extension":
        if (
          !this.left ||
          this.left.kind != "message" ||
          this.left.typeName != ele.extendee.typeName
        ) {
          throw this.err("extension access");
        }
        this.path.push(ele);
        this.left = ele.fieldKind == "message" ? ele.message : undefined;
        return this;
      case "list_sub":
        if (
          !this.left ||
          this.left.kind != "field" ||
          this.left.fieldKind != "list"
        ) {
          throw this.err("list access");
        }
        if (ele.index < 0 || !Number.isInteger(ele.index)) {
          throw this.err("list index");
        }
        this.path.push(ele);
        this.left =
          this.left.listKind == "message" ? this.left.message : undefined;
        return this;
      case "map_sub":
        if (
          !this.left ||
          this.left.kind != "field" ||
          this.left.fieldKind != "map"
        ) {
          throw this.err("map access");
        }
        if (!checkKeyType(ele.key, this.left.mapKey)) {
          throw this.err("map key");
        }
        this.path.push(ele);
        this.left =
          this.left.mapKind == "message" ? this.left.message : undefined;
        return this;
    }
  }

  private err(what: string) {
    return new InvalidPathError(this.schema, "Invalid " + what, this.path);
  }
}

function checkKeyType(
  key: string | number | bigint | boolean,
  type: (DescField & { fieldKind: "map" })["mapKey"],
): boolean {
  switch (type) {
    case ScalarType.STRING:
      return typeof key == "string";
    case ScalarType.INT32:
    case ScalarType.UINT32:
    case ScalarType.SINT32:
    case ScalarType.SFIXED32:
    case ScalarType.FIXED32:
      return typeof key == "number";
    case ScalarType.UINT64:
    case ScalarType.INT64:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return typeof key == "bigint";
    case ScalarType.BOOL:
      return typeof key == "boolean";
  }
}

function nextToken(
  i: number,
  path: string,
):
  | { err: string; i: number }
  | { val: string | bigint | boolean; i: number }
  | { field: string; i: number }
  | { ext: string; i: number } {
  const re_extension = /^[A-Za-z_][A-Za-z_0-9]*(?:\.[A-Za-z_][A-Za-z_0-9]*)*$/;
  const re_field = /^[A-Za-z_][A-Za-z_0-9]*$/;
  if (path[i] == "[") {
    i++;
    while (path[i] == " ") {
      // skip leading whitespace
      i++;
    }
    if (i >= path.length) {
      return { err: "Premature end", i: path.length - 1 };
    }
    let token: { val: string | bigint | boolean } | { ext: string };
    if (path[i] == `"`) {
      // string literal
      i++;
      let val = "";
      for (;;) {
        if (path[i] == `"`) {
          // end of string literal
          i++;
          break;
        }
        if (path[i] == "\\") {
          switch (path[i + 1]) {
            case `"`:
            case "\\":
              val += path[i + 1];
              break;
            case "r":
              val += "\r";
              break;
            case "n":
              val += "\n";
              break;
            default:
              return { err: "Invalid escape sequence", i };
          }
          i++;
        } else {
          val += path[i];
        }
        if (i >= path.length) {
          return { err: "Premature end of string", i: path.length - 1 };
        }
        i++;
      }
      token = { val };
    } else if (path[i].match(/\d/)) {
      // integer literal
      const start = i;
      while (i < path.length && /\d/.test(path[i])) {
        i++;
      }
      token = { val: BigInt(path.substring(start, i)) };
    } else if (path[i] == "]") {
      return { err: "Premature ]", i };
    } else {
      // extension identifier or bool literal
      const start = i;
      while (i < path.length && path[i] != " " && path[i] != "]") {
        i++;
      }
      const name = path.substring(start, i);
      if (name === "true") {
        token = { val: true };
      } else if (name === "false") {
        token = { val: false };
      } else if (re_extension.test(name)) {
        token = { ext: name };
      } else {
        return { err: "Invalid ident", i: start };
      }
    }
    while (path[i] == " ") {
      // skip trailing whitespace
      i++;
    }
    if (path[i] != "]") {
      return { err: "Missing ]", i };
    }
    i++;
    return { ...token, i };
  }
  // field identifier
  if (i > 0) {
    if (path[i] != ".") {
      return { err: `Expected "."`, i };
    }
    i++;
  }
  const start = i;
  while (i < path.length && path[i] != "." && path[i] != "[") {
    i++;
  }
  const field = path.substring(start, i);
  return re_field.test(field)
    ? { field, i }
    : { err: "Invalid ident", i: start };
}
