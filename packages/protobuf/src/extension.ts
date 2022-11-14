import type { FieldInfo } from "./field.js";
import type { AnyMessage, Message } from "./message.js";
import type { MessageType } from "./message-type.js";

export interface Extension<E extends Message<E> = AnyMessage, V = unknown> {
  /**
   * The fully qualified name of the extension.
   */
  readonly typeName: string;

  readonly extendee: MessageType<E>;

  readonly field: FieldInfo;
}
