import { type NamedNode, Node, type UnknownNodeInput } from "../plumbing.js";
import { type Type, isType, isTypeInput, type } from "../type/type.js";
import type { TypeInput } from "../type/type.js";
import type { ExprNode } from "./expr.js";
import {
  type Expr,
  type ExprInput,
  expr,
  exprProvider,
  exprProxy,
  isExprInput,
} from "./expr.js";
import { type Id, id, isIdInput } from "./id.js";
import type { IdInput } from "./id.js";

export class VarDeclNode implements NamedNode<"varDecl"> {
  static readonly kind = "varDecl";
  readonly kind = "varDecl";
  readonly family = Node.Family.EXPR;

  private constructor(
    readonly id: Id,
    readonly type?: Type,
    readonly value?: Expr,
  ) {}

  toString() {
    let declaration = this.id.toString();

    if (this.type) declaration += `: ${this.type}`;
    if (this.value) declaration += ` = ${this.value}`;

    return declaration;
  }

  static marshal(name: IdInput): VarDecl;
  static marshal(name: IdInput, value: ExprInput): VarDecl;
  static marshal(name: IdInput, type: Type): VarDecl;
  static marshal(name: IdInput, type: Type, value: ExprInput): VarDecl;
  static marshal(...input: VarDeclInput): VarDecl;
  static marshal(varDecl: IdInput | VarDecl): VarDecl;
  static marshal(...input: VarDeclInput | [IdInput | VarDecl]): VarDecl {
    if (input.length === 1) {
      if (VarDeclNode.is(input[0])) return input[0];
      return exprProxy(new VarDeclNode(id(input[0])));
    }
    if (VarDeclNode.#isIdValueTupleInput(input))
      return exprProxy(
        new VarDeclNode(id(input[0]), undefined, expr(input[1])),
      );
    if (VarDeclNode.#isIdTypeTupleInput(input))
      return exprProxy(new VarDeclNode(id(input[0]), type(input[1])));

    return exprProxy(
      new VarDeclNode(id(input[0]), type(input[1]), expr(input[2])),
    );
  }

  static is(input: UnknownNodeInput): input is VarDecl {
    return input instanceof VarDeclNode;
  }

  static isInput(input: UnknownNodeInput): input is VarDeclInput {
    return (
      VarDeclNode.#isIdTupleInput(input) ||
      VarDeclNode.#isIdValueTupleInput(input) ||
      VarDeclNode.#isIdTypeTupleInput(input) ||
      VarDeclNode.#isIdTypeValueTupleInput(input)
    );
  }

  static #isIdTupleInput(
    input: UnknownNodeInput,
  ): input is IdTupleVarDeclInput {
    return Array.isArray(input) && input.length === 1 && isIdInput(input[0]);
  }

  static #isIdValueTupleInput(
    input: UnknownNodeInput,
  ): input is IdValueTupleVarDeclInput {
    return (
      Array.isArray(input) &&
      input.length === 2 &&
      isIdInput(input[0]) &&
      isExprInput(input[1])
    );
  }

  static #isIdTypeTupleInput(
    input: UnknownNodeInput,
  ): input is IdTypeTupleVarDeclInput {
    return (
      Array.isArray(input) &&
      input.length === 2 &&
      isIdInput(input[0]) &&
      isType(input[1])
    );
  }

  static #isIdTypeValueTupleInput(
    input: UnknownNodeInput,
  ): input is IdTypeValueTupleVarDeclInput {
    return (
      Array.isArray(input) &&
      input.length === 3 &&
      isIdInput(input[0]) &&
      isExprInput(input[1]) &&
      isTypeInput(input[2])
    );
  }
}

type IdTupleVarDeclInput = [IdInput];
type IdValueTupleVarDeclInput = [IdInput, ExprInput];
type IdTypeTupleVarDeclInput = [IdInput, Type];
type IdTypeValueTupleVarDeclInput = [IdInput, TypeInput, ExprInput];

export type VarDeclInput =
  | IdTupleVarDeclInput
  | IdValueTupleVarDeclInput
  | IdTypeTupleVarDeclInput
  | IdTypeValueTupleVarDeclInput;

export type VarDecl = ExprNode<VarDeclNode>;
export const VarDecl = exprProvider(VarDeclNode);
export const { varDecl, isVarDecl, isVarDeclInput } = VarDecl;
