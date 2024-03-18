import type { BinaryReadOptions } from "../binary-format.js";
import type { DescMessage } from "../descriptor-set.js";
import type { MessageShape } from "./types.js";

export function fromBinary<Desc extends DescMessage>(
    desc: Desc,
    bin: Uint8Array,
    options?: Partial<BinaryReadOptions>,
): MessageShape<Desc> {
    throw new Error("unimplemented");
}
