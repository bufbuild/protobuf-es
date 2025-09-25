import { type Expr, type ExprInput, expr, isExprInput } from "../expr/expr.js";
import {
  Node,
  type UnknownNodeInput,
  hasNodeInputProperty,
  provider,
} from "../plumbing.js";

class RetNode implements Node<"ret", Node.Family.STMT> {
  static readonly kind = "ret" as const;
  readonly family = Node.Family.STMT;
  readonly kind = "ret" as const;
  readonly return: Expr;

  private constructor(ret: Expr) {
    this.return = ret;
  }

  toString(): string {
    return `return ${this.return};`;
  }

  static marshal(input: ExprInput | RetInput): Ret {
    if (RetNode.isInput(input)) return new RetNode(expr(input.return));
    return new RetNode(expr(input));
  }

  static is(input: UnknownNodeInput): input is Ret {
    return input instanceof RetNode;
  }

  static isInput(input: UnknownNodeInput): input is RetInput {
    return RetNode.#isObjectInput(input);
  }

  static #isObjectInput(input: UnknownNodeInput): input is RetInput {
    return hasNodeInputProperty(input, "return") && isExprInput(input.return);
  }
}

export type RetInput = { return: ExprInput };
export type Ret = RetNode;
export const Ret = provider(RetNode);
export const { ret, isRet, isRetInput } = Ret;
