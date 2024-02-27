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

import { setEnumType } from "./enum.js";
import { Message } from "../message.js";
import type { AnyMessage, PartialMessage, PlainMessage } from "../message.js";
import type { MessageType } from "../message-type.js";
import type { Util } from "./util.js";
import { scalarEquals } from "./scalars.js";
import { ScalarType } from "../scalar.js";
import { isMessage } from "../is-message.js";

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-argument,no-case-declarations */

export function makeUtilCommon(): Omit<Util, "newFieldList" | "initFields"> {
  return {
    setEnumType,
    initPartial<T extends Message<T>>(
      source: PartialMessage<T> | undefined,
      target: T,
    ): void {
      if (source === undefined) {
        return;
      }
      const type = target.getType();
      for (const member of type.fields.byMember()) {
        const localName = member.localName,
          t = target as AnyMessage,
          s = source as PartialMessage<AnyMessage>;
        if (s[localName] === undefined) {
          // TODO if source is a Message instance, we should use isFieldSet() here to support future field presence
          continue;
        }
        switch (member.kind) {
          case "oneof":
            const sk = s[localName].case;
            if (sk === undefined) {
              continue;
            }
            const sourceField = member.findField(sk);
            let val = s[localName].value;
            if (
              sourceField &&
              sourceField.kind == "message" &&
              !isMessage(val, sourceField.T)
            ) {
              val = new sourceField.T(val);
            } else if (
              sourceField &&
              sourceField.kind === "scalar" &&
              sourceField.T === ScalarType.BYTES
            ) {
              val = toU8Arr(val);
            }
            t[localName] = { case: sk, value: val };
            break;
          case "scalar":
          case "enum":
            let copy = s[localName];
            if (member.T === ScalarType.BYTES) {
              copy = member.repeated
                ? (copy as ArrayLike<number>[]).map(toU8Arr)
                : toU8Arr(copy);
            }
            t[localName] = copy;
            break;
          case "map":
            switch (member.V.kind) {
              case "scalar":
              case "enum":
                if (member.V.T === ScalarType.BYTES) {
                  for (const [k, v] of Object.entries(s[localName])) {
                    t[localName][k] = toU8Arr(v as ArrayLike<number>);
                  }
                } else {
                  Object.assign(t[localName], s[localName]);
                }
                break;
              case "message":
                const messageType = member.V.T;
                for (const k of Object.keys(s[localName])) {
                  let val = s[localName][k];
                  if (!messageType.fieldWrapper) {
                    // We only take partial input for messages that are not a wrapper type.
                    // For those messages, we recursively normalize the partial input.
                    val = new messageType(val);
                  }
                  t[localName][k] = val;
                }
                break;
            }
            break;
          case "message":
            const mt = member.T;
            if (member.repeated) {
              t[localName] = (s[localName] as any[]).map((val) =>
                isMessage(val, mt) ? val : new mt(val),
              );
            } else {
              const val = s[localName];
              if (mt.fieldWrapper) {
                if (
                  // We can't use BytesValue.typeName as that will create a circular import
                  mt.typeName === "google.protobuf.BytesValue"
                ) {
                  t[localName] = toU8Arr(val);
                } else {
                  t[localName] = val;
                }
              } else {
                t[localName] = isMessage(val, mt) ? val : new mt(val);
              }
            }
            break;
        }
      }
    },
    // TODO use isFieldSet() here to support future field presence
    equals<T extends Message<T>>(
      type: MessageType<T>,
      a: T | PlainMessage<T> | undefined | null,
      b: T | PlainMessage<T> | undefined | null,
    ): boolean {
      if (a === b) {
        return true;
      }
      if (!a || !b) {
        return false;
      }
      return type.fields.byMember().every((m) => {
        const va = (a as any)[m.localName];
        const vb = (b as any)[m.localName];
        if (m.repeated) {
          if (va.length !== vb.length) {
            return false;
          }
          // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- repeated fields are never "map"
          switch (m.kind) {
            case "message":
              return (va as any[]).every((a, i) => m.T.equals(a, vb[i]));
            case "scalar":
              return (va as any[]).every((a: any, i: number) =>
                scalarEquals(m.T, a, vb[i]),
              );
            case "enum":
              return (va as any[]).every((a: any, i: number) =>
                scalarEquals(ScalarType.INT32, a, vb[i]),
              );
          }
          throw new Error(`repeated cannot contain ${m.kind}`);
        }
        switch (m.kind) {
          case "message":
            return m.T.equals(va, vb);
          case "enum":
            return scalarEquals(ScalarType.INT32, va, vb);
          case "scalar":
            return scalarEquals(m.T, va, vb);
          case "oneof":
            if (va.case !== vb.case) {
              return false;
            }
            const s = m.findField(va.case);
            if (s === undefined) {
              return true;
            }
            // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- oneof fields are never "map"
            switch (s.kind) {
              case "message":
                return s.T.equals(va.value, vb.value);
              case "enum":
                return scalarEquals(ScalarType.INT32, va.value, vb.value);
              case "scalar":
                return scalarEquals(s.T, va.value, vb.value);
            }
            throw new Error(`oneof cannot contain ${s.kind}`);
          case "map":
            const keys = Object.keys(va).concat(Object.keys(vb));
            switch (m.V.kind) {
              case "message":
                const messageType = m.V.T;
                return keys.every((k) => messageType.equals(va[k], vb[k]));
              case "enum":
                return keys.every((k) =>
                  scalarEquals(ScalarType.INT32, va[k], vb[k]),
                );
              case "scalar":
                const scalarType = m.V.T;
                return keys.every((k) =>
                  scalarEquals(scalarType, va[k], vb[k]),
                );
            }
            break;
        }
      });
    },
    // TODO use isFieldSet() here to support future field presence
    clone<T extends Message<T>>(message: T): T {
      const type = message.getType(),
        target = new type(),
        any = target as AnyMessage;
      for (const member of type.fields.byMember()) {
        const source = (message as AnyMessage)[member.localName];
        let copy: any;
        if (member.repeated) {
          copy = (source as any[]).map(cloneSingularField);
        } else if (member.kind == "map") {
          copy = any[member.localName];
          for (const [key, v] of Object.entries(source)) {
            copy[key] = cloneSingularField(v);
          }
        } else if (member.kind == "oneof") {
          const f = member.findField(source.case);
          copy = f
            ? { case: source.case, value: cloneSingularField(source.value) }
            : { case: undefined };
        } else {
          copy = cloneSingularField(source);
        }
        any[member.localName] = copy;
      }
      return target;
    },
  };
}

// clone a single field value - i.e. the element type of repeated fields, the value type of maps
function cloneSingularField(value: any): any {
  if (value === undefined) {
    return value;
  }
  if (isMessage(value)) {
    return value.clone();
  }
  if (value instanceof Uint8Array) {
    const c = new Uint8Array(value.byteLength);
    c.set(value);
    return c;
  }
  return value;
}

// converts any ArrayLike<number> to Uint8Array if necessary.
function toU8Arr(input: ArrayLike<number>) {
  return input instanceof Uint8Array ? input : new Uint8Array(input);
}
