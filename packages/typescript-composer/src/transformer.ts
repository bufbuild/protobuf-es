import type { UnknownNode } from "./plumbing.js";

export abstract class Transformer {
  abstract mutate(original: UnknownNode): UnknownNode;

  readonly #registry: Entry<UnknownNode>[] = [];
  #register<N extends UnknownNode>(original: N, replacement: N): N {
    this.#registry.push({ original, replacement });
    return replacement;
  }

  replace<N extends UnknownNode>(original: N, replacer: () => N): N;
  replace(original: UnknownNode, replacer: () => UnknownNode): UnknownNode {
    const found = this.#registry.find((n) => n.original === original);
    if (found) return found.replacement;

    return this.#register(original, this.mutate(replacer()));
  }
}

type Entry<T extends UnknownNode> = {
  original: T;
  replacement: T;
};
