import { Node, type UnknownNodeInput } from "../plumbing.js";
import { type ExprNode, exprProvider, exprProxy } from "./expr.js";
import type { IdInput } from "./id.js";
import {
  type VarDecl,
  type VarDeclInput,
  isVarDecl,
  isVarDeclInput,
  varDecl,
} from "./var-decl.js";

export class VarDeclListNode implements Node<"varDeclList"> {
  static readonly kind = "varDeclList";
  readonly kind = "varDeclList";
  readonly family = Node.Family.EXPR;

  private constructor(readonly declarations: VarDecl[]) {}

  toString() {
    return this.declarations.join(", ");
  }

  static marshal(
    decl: FlexibleVarDeclInput,
    ...additionalDecls: FlexibleVarDeclInput[]
  ): VarDeclList;
  static marshal(declList: VarDeclList): VarDeclList;
  static marshal(
    decl: FlexibleVarDeclInput | VarDeclList,
    ...additionalDecls: FlexibleVarDeclInput[]
  ): VarDeclList {
    if (VarDeclListNode.is(decl)) return decl;

    return exprProxy(
      new VarDeclListNode(
        [decl, ...additionalDecls].map((v) => {
          if (isVarDecl(v)) return v;
          if (Array.isArray(v)) return varDecl(...v);
          return varDecl(v);
        }),
      ),
    );
  }

  static is(input: UnknownNodeInput): input is VarDeclList {
    return input instanceof VarDeclListNode;
  }

  static isInput(input: UnknownNodeInput): input is VarDeclListInput {
    return (
      Array.isArray(input) &&
      input.length >= 1 &&
      input.every((v) => isVarDeclInput(v))
    );
  }
}

// @TODO consider adding { [string]: value } map input

type FlexibleVarDeclInput = VarDeclInput | IdInput | VarDecl;

export type VarDeclListInput = [
  FlexibleVarDeclInput,
  ...FlexibleVarDeclInput[],
];

export type VarDeclList = ExprNode<VarDeclListNode>;
export const VarDeclList = exprProvider(VarDeclListNode);
export const { varDeclList, isVarDeclList, isVarDeclListInput } = VarDeclList;
