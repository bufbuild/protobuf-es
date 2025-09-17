import {
  Node,
  type UnknownNodeInput,
  hasNodeInputProperty,
  isNode,
} from "../plumbing.js";
import { type Access, access } from "./access.js";
import { type Call, call } from "./call.js";
import {
  type Literal,
  type RawLiteralInput,
  isLiteralInput,
  literal,
} from "./literal/literal.js";

export type Expr<E extends UnknownExpr = UnknownExpr> = E;

function capitalize<S extends string>(s: S): Capitalize<S> {
  return (s.slice(0, 1).toUpperCase() + s.slice(1)) as Capitalize<S>;
}

const isExprProxyKey = Symbol("isExprProxyKey");

export function exprProxy<N extends Node<string>>(base: N) {
  return new Proxy(base, {
    get(target: N, name, receiver: N & ExprNode<N>) {
      if (typeof name === "string" && name.startsWith("$")) {
        if (name === "$") return exprCallingProxy(receiver);
        return access(receiver, name.slice(1));
      }
      if (typeof name === "symbol" && name === isExprProxyKey) {
        return true;
      }

      return Reflect.get(target, name, receiver);
    },
  }) as ExprNode<N>;
}

type Caller = (...args: ExprInput[]) => Call;
type CallableExpr = Expr & Caller;

function exprCallingProxy(base: Expr): CallableExpr {
  const func: Caller = (...args: ExprInput[]) => call(base, ...args);

  return new Proxy(func, {
    get() {
      throw new Error(
        "Property access is not supported for expression calling proxy.",
      );
    },
  }) as CallableExpr;
}

export type ExprNode<N extends Node<string>> = N &
  UnknownExpr & {
    // This looks a little silly, but it avoids a circular dependency,
    // while preserving the correct type if N is AccessNode.
    [Key in `$${string}`]: N extends ExprNode<Node<"access">> ? N : Access;
  } & {
    // As above...
    $: (...args: ExprInput[]) => N extends ExprNode<Node<"call">> ? N : Call;
  };

export function exprProvider<
  P extends ExprNodeImplementation<Node<string>, UnknownNodeInput>,
>(nodeClass: P) {
  return {
    [nodeClass.kind]: nodeClass.marshal,
    [`is${capitalize(nodeClass.kind)}`]: nodeClass.is,
    [`is${capitalize(nodeClass.kind)}Input`]: nodeClass.isInput,
  } as ExprProvider<P>;
}

export type ExprProvider<
  P extends ExprNodeImplementation<Node<string>, UnknownNodeInput>,
> = {
  [A in P["kind"]]: P["marshal"];
} & {
  [B in `is${Capitalize<P["kind"]>}`]: P["is"];
} & {
  [C in `is${Capitalize<P["kind"]>}Input`]: P["isInput"];
};

export type ExprNodeImplementation<
  N extends Node<string>,
  I extends UnknownNodeInput,
> = {
  readonly kind: N["kind"];
  marshal(...input: I extends [...UnknownNodeInput[]] ? I : [I]): ExprNode<N>;
  is(input: UnknownNodeInput): input is ExprNode<N>;
  isInput(input: UnknownNodeInput): input is I;
};

type ExprNodeBase = Node<string, Node.Family.EXPR>;
type UnknownExpr = ExprNodeBase & {
  [K in `$${string}`]: UnknownExpr;
} & (() => UnknownExpr);
export type ExprInput = UnknownExpr | RawLiteralInput;

export function expr<E extends UnknownExpr>(input: E): E;
export function expr(input: RawLiteralInput): Literal;
export function expr(input: ExprInput): Expr;
export function expr(input: ExprInput): Expr {
  if (isExpr(input)) return input;
  return literal(input);
}

function isExprNodeBase(input: UnknownNodeInput): input is ExprNodeBase {
  return isNode(input) && input.family === Node.Family.EXPR;
}

export function isExpr<E extends UnknownExpr>(input: E): input is E;
export function isExpr(input: UnknownNodeInput): input is Expr;
export function isExpr(input: UnknownNodeInput): input is Expr {
  return isExprNodeBase(input) && hasNodeInputProperty(input, isExprProxyKey);
}

export function isExprInput(input: UnknownNodeInput): input is ExprInput {
  return isExpr(input) || isLiteralInput(input);
}

export * from "./access.js";
export * from "./binary.js";
export * from "./id.js";
export * from "./inline.js";
export * from "./literal/literal.js";
export * from "./ref.js";
export * from "./var-decl.js";
export * from "./var-decl-list.js";
