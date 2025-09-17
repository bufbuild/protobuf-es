import { Node, type UnknownNodeInput } from "../plumbing.js";
import {
  type Expr,
  type ExprInput,
  type ExprNode,
  expr,
  exprProvider,
  exprProxy,
  isExprInput,
} from "./expr.js";

class CallNode implements Node<"call"> {
  static readonly kind = "call" as const;
  readonly family = Node.Family.EXPR;
  readonly kind = "call" as const;

  private constructor(
    readonly target: Expr,
    readonly args: Expr[],
  ) {}

  toString(): string {
    return `${this.target}(${this.args.join(", ")})`;
  }

  static marshal(target: ExprInput, ...args: ExprInput[]): Call {
    return exprProxy(new CallNode(expr(target), args.map(expr)));
  }

  static is(input: UnknownNodeInput): input is Call {
    return input instanceof CallNode;
  }

  static isInput(input: UnknownNodeInput[]): input is CallInput {
    return input.every(isExprInput);
  }
}

export type CallInput = [ExprInput, ...ExprInput[]];
export type Call = ExprNode<CallNode>;
export const Call = exprProvider(CallNode);
export const { call, isCall, isCallInput } = Call;
