import { Node, type UnknownNodeInput } from "../../plumbing.js";
import { type ExprNode, exprProvider, exprProxy } from "../expr.js";

export class StringLiteralNode implements Node<"stringLiteral"> {
  static readonly kind = "stringLiteral";
  readonly kind = "stringLiteral";
  readonly family = Node.Family.EXPR;
  static #registry: StringLiteral[] = [];

  constructor(readonly value: string) {}

  toString() {
    return JSON.stringify(this.value);
  }

  static marshal(input: StringLiteralInput): StringLiteral {
    if (StringLiteralNode.is(input)) return input;

    const found = StringLiteralNode.#registry.find((v) => v.value === input);
    if (found) return found;

    const created = exprProxy(new StringLiteralNode(input));
    StringLiteralNode.#registry.push(created);

    return created;
  }

  static is(input: UnknownNodeInput): input is StringLiteral {
    return input instanceof StringLiteralNode;
  }

  static isInput(input: UnknownNodeInput): input is StringLiteralInput {
    return StringLiteralNode.is(input) || typeof input === "string";
  }
}

export type StringLiteralInput = StringLiteral | string;
export type StringLiteral = ExprNode<StringLiteralNode>;
export const StringLiteral = exprProvider(StringLiteralNode);
export const { stringLiteral, isStringLiteral, isStringLiteralInput } =
  StringLiteral;
