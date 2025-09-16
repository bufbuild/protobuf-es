import { Node, type UnknownNodeInput } from "../plumbing.js";
import {
  type ExprNode,
  expr,
  exprProvider,
  exprProxy,
  isExprInput,
} from "./expr.js";
import type { Expr, ExprInput } from "./expr.js";
import { type IdInput, id, isId, isIdInput } from "./id.js";

class AccessNode implements Node<"access"> {
  static readonly kind = "access" as const;
  readonly family = Node.Family.EXPR;
  readonly kind = "access" as const;

  private constructor(
    readonly base: Expr,
    readonly key: Expr,
  ) {}

  toString(): string {
    if (isId(this.key)) return `${this.base}.${this.key}`;

    return `${this.base}[${this.key}]`;
  }

  static marshal(
    base: IdInput | ExprInput,
    key: IdInput | ExprInput,
    ...additionalKeys: (IdInput | ExprInput)[]
  ): Access {
    const access = exprProxy(
      new AccessNode(
        isIdInput(base) ? id(base) : expr(base),
        isIdInput(key) ? id(key) : expr(key),
      ),
    );

    if (additionalKeys.length > 0)
      return AccessNode.marshal(
        access,
        additionalKeys[0],
        ...additionalKeys.slice(1),
      );

    return access;
  }

  static is(input: UnknownNodeInput): input is Access {
    return input instanceof AccessNode;
  }

  static isInput(input: UnknownNodeInput): input is AccessInput {
    return (
      Array.isArray(input) &&
      input.length >= 2 &&
      input.every((i) => isExprInput(i))
    );
  }
}

export type AccessInput = Parameters<typeof AccessNode.marshal>;
export type Access = ExprNode<AccessNode>;
export const Access = exprProvider(AccessNode);
export const { access, isAccess, isAccessInput } = Access;
