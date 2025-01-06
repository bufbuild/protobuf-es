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

import type { MessageShape } from "./types.js";
import { scalarEquals, type ScalarValue } from "./reflect/scalar.js";
import { reflect } from "./reflect/reflect.js";
import {
  type DescExtension,
  type DescField,
  type DescMessage,
  ScalarType,
} from "./descriptors.js";
import type { ReflectMessage } from "./reflect/index.js";
import type { Registry } from "./registry.js";
import { type Any, anyUnpack } from "./wkt/index.js";
import { createExtensionContainer, getExtension } from "./extensions.js";

interface EqualsOptions {
  /**
   * A registry to look up extensions, and messages packed in Any.
   *
   * @private Experimental API, does not follow semantic versioning.
   */
  registry: Registry;
  /**
   * Unpack google.protobuf.Any before comparing.
   * If a type is not in the registry, comparison falls back to comparing the
   * fields of Any.
   *
   * @private Experimental API, does not follow semantic versioning.
   */
  unpackAny?: boolean;
  /**
   * Consider extensions when comparing.
   *
   * @private Experimental API, does not follow semantic versioning.
   */
  extensions?: boolean;
  /**
   * Consider unknown fields when comparing.
   * The registry is used to distinguish between extensions, and unknown fields
   * caused by schema changes.
   *
   * @private Experimental API, does not follow semantic versioning.
   */
  unknown?: boolean;
}

/**
 * Compare two messages of the same type.
 *
 * Note that this function disregards extensions and unknown fields, and that
 * NaN is not equal NaN, following the IEEE standard.
 */
export function equals<Desc extends DescMessage>(
  schema: Desc,
  a: MessageShape<Desc>,
  b: MessageShape<Desc>,
  options?: EqualsOptions,
): boolean {
  if (a.$typeName != schema.typeName || b.$typeName != schema.typeName) {
    return false;
  }
  if (a === b) {
    return true;
  }
  return reflectEquals(reflect(schema, a), reflect(schema, b), options);
}

function reflectEquals(
  a: ReflectMessage,
  b: ReflectMessage,
  opts?: EqualsOptions,
): boolean {
  if (a.desc.typeName === "google.protobuf.Any" && opts?.unpackAny == true) {
    return anyUnpackedEquals(a.message as Any, b.message as Any, opts);
  }
  for (const f of a.fields) {
    if (!fieldEquals(f, a, b, opts)) {
      return false;
    }
  }
  if (opts?.unknown == true && !unknownEquals(a, b, opts.registry)) {
    return false;
  }
  if (opts?.extensions == true && !extensionsEquals(a, b, opts)) {
    return false;
  }
  return true;
}

// TODO(tstamm) add an option to consider NaN equal to NaN?
function fieldEquals(
  f: DescField,
  a: ReflectMessage,
  b: ReflectMessage,
  opts: EqualsOptions | undefined,
): boolean {
  if (!a.isSet(f) && !b.isSet(f)) {
    return true;
  }
  if (!a.isSet(f) || !b.isSet(f)) {
    return false;
  }
  switch (f.fieldKind) {
    case "scalar":
      return scalarEquals(f.scalar, a.get(f), b.get(f));
    case "enum":
      return a.get(f) === b.get(f);
    case "message":
      return reflectEquals(a.get(f), b.get(f), opts);
    case "map": {
      // TODO(tstamm) can't we compare sizes first?
      const mapA = a.get(f);
      const mapB = b.get(f);
      const keys: unknown[] = [];
      for (const k of mapA.keys()) {
        if (!mapB.has(k)) {
          return false;
        }
        keys.push(k);
      }
      for (const k of mapB.keys()) {
        if (!mapA.has(k)) {
          return false;
        }
      }
      for (const key of keys) {
        const va = mapA.get(key);
        const vb = mapB.get(key);
        if (va === vb) {
          continue;
        }
        switch (f.mapKind) {
          case "enum":
            return false;
          case "message":
            if (
              !reflectEquals(va as ReflectMessage, vb as ReflectMessage, opts)
            ) {
              return false;
            }
            break;
          case "scalar":
            if (!scalarEquals(f.scalar, va as ScalarValue, vb as ScalarValue)) {
              return false;
            }
            break;
        }
      }
      break;
    }
    case "list": {
      const listA = a.get(f);
      const listB = b.get(f);
      if (listA.size != listB.size) {
        return false;
      }
      for (let i = 0; i < listA.size; i++) {
        const va = listA.get(i);
        const vb = listB.get(i);
        if (va === vb) {
          continue;
        }
        switch (f.listKind) {
          case "enum":
            return false;
          case "message":
            if (
              !reflectEquals(va as ReflectMessage, vb as ReflectMessage, opts)
            ) {
              return false;
            }
            break;
          case "scalar":
            if (!scalarEquals(f.scalar, va as ScalarValue, vb as ScalarValue)) {
              return false;
            }
            break;
        }
      }
      break;
    }
  }
  return true;
}

function anyUnpackedEquals(a: Any, b: Any, opts: EqualsOptions): boolean {
  if (a.typeUrl !== b.typeUrl) {
    return false;
  }
  const unpackedA = anyUnpack(a, opts.registry);
  const unpackedB = anyUnpack(b, opts.registry);
  if (unpackedA && unpackedB) {
    const schema = opts.registry.getMessage(unpackedA.$typeName);
    if (schema) {
      return equals(schema, unpackedA, unpackedB, opts);
    }
  }
  return scalarEquals(ScalarType.BYTES, a.value, b.value);
}

function unknownEquals(
  a: ReflectMessage,
  b: ReflectMessage,
  registry: Registry | undefined,
) {
  function getTrulyUnknown(
    msg: ReflectMessage,
    registry: Registry | undefined,
  ) {
    const u = msg.getUnknown() ?? [];
    return registry
      ? u.filter((uf) => !registry.getExtensionFor(msg.desc, uf.no))
      : u;
  }
  const unknownA = getTrulyUnknown(a, registry);
  const unknownB = getTrulyUnknown(b, registry);
  if (unknownA.length != unknownB.length) {
    return false;
  }
  for (let i = 0; i < unknownA.length; i++) {
    const a = unknownA[i],
      b = unknownB[i];
    if (a.no != b.no) {
      return false;
    }
    if (a.wireType != b.wireType) {
      return false;
    }
    if (!scalarEquals(ScalarType.BYTES, a.data, b.data)) {
      return false;
    }
  }
  return true;
}

function extensionsEquals(
  a: ReflectMessage,
  b: ReflectMessage,
  opts: EqualsOptions,
) {
  function getSetExtensions(
    msg: ReflectMessage,
    registry: Registry,
  ): DescExtension[] {
    return (msg.getUnknown() ?? [])
      .map((uf) => registry.getExtensionFor(msg.desc, uf.no))
      .filter((e) => e != undefined)
      .filter((e, index, arr) => arr.indexOf(e) === index);
  }
  const extensionsA = getSetExtensions(a, opts.registry);
  const extensionsB = getSetExtensions(b, opts.registry);
  if (
    extensionsA.length != extensionsB.length ||
    extensionsA.some((e) => !extensionsB.includes(e))
  ) {
    return false;
  }
  for (const extension of extensionsA) {
    const [containerA, field] = createExtensionContainer(
      extension,
      getExtension(a.message, extension),
    );
    const [containerB] = createExtensionContainer(
      extension,
      getExtension(b.message, extension),
    );
    if (!fieldEquals(field, containerA, containerB, opts)) {
      return false;
    }
  }
  return true;
}
