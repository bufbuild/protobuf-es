import type { FieldInfo, PartialFieldInfo } from "./field.js";
import { ScalarType } from "./field.js";
import type { AnyMessage, Message } from "./message.js";
import type { MessageType } from "./message-type.js";
import type { IExtensionRegistry } from "./type-registry.js";
import { Struct } from "./google/protobuf/struct_pb";

export interface Extension<E extends Message<E> = AnyMessage, V = unknown> {

  /**
   * The fully qualified name of the extension.
   */
  readonly typeName: string;

  readonly extendee: MessageType<E>;

  readonly field: FieldInfo;

  // TODO this would be an alternative, but right now, external functions look preferable
  // isSet(message: E): boolean;
  // getValue(message: E): V | undefined;
  // setValue(message: E, value: V): void;
  // clearValue(message: E): void;
}


// TODO this is an alternative to Extension.getValue() - this _may_ be the better solution
function getExtensionValue<E extends Message<E>, V>(extension: Extension<E, V>, extendee: Message<E>): V | undefined {
  return undefined;
}
function setExtensionValue<E extends Message<E>, V>(extension: Extension<E, V>, extendee: Message<E>, value: V): void {
  //
}
function clearExtensionValue<E extends Message<E>, V>(extension: Extension<E, V>, extendee: Message<E>): void {
  //
}
function hasExtensionValue<E extends Message<E>, V>(extension: Extension<E, V>, extendee: Message<E>): boolean {
  //
}


type DistributiveOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never;

type PartialExtensionInfo = DistributiveOmit<PartialFieldInfo, "name" | "oneof">;


// TODO this one would expect the name of the extension as the `name` in the field info
// TODO this needs to be a method of the proto2 and proto3 objects, and normalize the field info
function createExtension4<E extends Message<E> = AnyMessage, V = unknown>(extendee: MessageType<E>, info: PartialFieldInfo): Extension<E, V> {

}

// TODO this one takes the name of the extension as a separate argument, and a special form of FieldInfo
// TODO this needs to be a method of the proto2 and proto3 objects, and normalize the field info
function createExtension3<E extends Message<E> = AnyMessage, V = unknown>(typeName: string, extendee: MessageType<E>, field: PartialExtensionInfo): Extension<E, V> {

}


// ---


const extFoo = createExtension3<Struct, boolean>("foo", Struct, {no: 1, kind: "scalar", T: ScalarType.BOOL, default: "f"});

createExtension3("bar", Struct, {no: 1, kind: "scalar", T: ScalarType.BOOL, default: "f"});
createExtension4<Struct, boolean>(Struct, {name: "foo", no: 1, kind: "scalar", T: ScalarType.BOOL, default: "f"});


function example(m: Struct, bytes: Uint8Array, extensions: IExtensionRegistry) {
  // TODO do we _need_ an extension registry when for binary I/O? why not simply modify unknown fields in getExtensionValue() etc?
  m.fromBinary(bytes, {
    typeRegistry: extensions,
  });
  // TODO here we definitely need an extension registry
  m.toJson({
    typeRegistry: extensions,
  })
  const extFooVal = getExtensionValue(extFoo, m);
  setExtensionValue(extFoo, m, extFooVal);
  setExtensionValue(extFoo, m, false);
  setExtensionValue(extFoo, m, undefined); // TODO this should not accept undefined
  setExtensionValue(extFoo, m, undefined); // TODO this should not accept undefined
  if (hasExtensionValue(extFoo, m)) {
    clearExtensionValue(extFoo, m);
  }
}
