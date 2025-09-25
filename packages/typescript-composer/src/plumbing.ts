import type { Id } from "./expr/id.js";

export function isNode(
  input: UnknownNodeInput,
): input is Node<"string", Node.Family> {
  return (
    hasNodeInputProperty(input, "kind") &&
    typeof input.kind === "string" &&
    hasNodeInputProperty(input, "family") &&
    typeof input.family === "string" &&
    (Object.values(Node.Family) as string[]).includes(input.family) &&
    hasNodeInputProperty(input, "toString") &&
    typeof input.toString === "function"
  );
}

export function isTemplateStringsArray(
  input: UnknownNodeInput,
): input is TemplateStringsArray {
  return (
    Array.isArray(input) &&
    Array.isArray((input as { raw?: unknown })?.raw) &&
    input.every((s) => typeof s === "string")
  );
}

export interface NamedNode<
  K extends string,
  F extends Node.Family = Node.Family.EXPR,
> extends Node<K, F> {
  readonly id: Id;
}

export namespace Node {
  export enum Family {
    CODE = "code",
    EXPR = "expression",
    STMT = "statement",
    TYPE = "type",
  }
}

export type Node<K extends string, F extends Node.Family = Node.Family.EXPR> = {
  readonly kind: K;
  readonly family: F;
  readonly toString: () => string;
};

export type UnknownNodeInput =
  | [...NonNullable<unknown>[]]
  | NonNullable<unknown>;

function capitalize<S extends string>(s: S): Capitalize<S> {
  return (s.slice(0, 1).toUpperCase() + s.slice(1)) as Capitalize<S>;
}

export function provider<
  P extends NodeImplementation<Node<string, Node.Family>, UnknownNodeInput>,
>(nodeClass: P) {
  return {
    [nodeClass.kind]: nodeClass.marshal,
    [`is${capitalize(nodeClass.kind)}`]: nodeClass.is,
    [`is${capitalize(nodeClass.kind)}Input`]: nodeClass.isInput,
  } as Provider<P>;
}

export type Provider<
  P extends NodeImplementation<Node<string, Node.Family>, UnknownNodeInput>,
> = {
  [A in P["kind"]]: P["marshal"];
} & {
  [B in `is${Capitalize<P["kind"]>}`]: P["is"];
} & {
  [C in `is${Capitalize<P["kind"]>}Input`]: P["isInput"];
};

export type NodeImplementation<
  N extends Node<string, Node.Family>,
  I extends UnknownNodeInput,
> = {
  readonly kind: N["kind"];
  marshal(...input: I extends [...UnknownNodeInput[]] ? I : [I]): N;
  is(input: UnknownNodeInput): input is N;
  isInput(input: UnknownNodeInput): input is I;
};

export function hasNodeInputProperty<P extends string | symbol>(
  thing: UnknownNodeInput,
  property: P,
): thing is { [I in P]: UnknownNodeInput } {
  return (
    (thing as { [p: string | symbol]: unknown })?.[property] !== undefined &&
    (thing as { [p: string | symbol]: unknown })?.[property] !== null
  );
}

export function indent(code: string) {
  return code
    .split("\n")
    .map((l) => (l == "" ? "" : `  ${l}`))
    .join("\n");
}
