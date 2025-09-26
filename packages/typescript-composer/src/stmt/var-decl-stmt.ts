import { type IdInput, isIdInput } from "../expr/id.js";
import {
  type VarDeclList,
  isVarDeclList,
  isVarDeclListInput,
} from "../expr/var-decl-list.js";
import { type VarDeclListInput, varDeclList } from "../expr/var-decl-list.js";
import {
  type VarDecl,
  type VarDeclInput,
  isVarDecl,
  isVarDeclInput,
} from "../expr/var-decl.js";
import {
  Node,
  type UnknownNodeInput,
  hasNodeInputProperty,
  provider,
} from "../plumbing.js";
import type { Transformer } from "../plumbing.js";

export class VarDeclStmtNode implements Node<"varDeclStmt", Node.Family.STMT> {
  static readonly kind = "varDeclStmt";
  readonly kind = "varDeclStmt";
  readonly family = Node.Family.STMT;

  constructor(
    readonly keyword: VarDeclStmtNodeKeyword,
    readonly list: VarDeclList,
  ) {}

  toString() {
    return `${this.keyword} ${this.list};`;
  }

  transform(t: Transformer) {
    return t.replace(
      this,
      () => new VarDeclStmtNode(this.keyword, this.list.transform(t)),
    );
  }

  static marshal(input: ConstIdInput): VarDeclStmt;
  static marshal(input: ConstVarDeclInput): VarDeclStmt;
  static marshal(input: ConstVarDecl): VarDeclStmt;
  static marshal(input: ConstVarDeclListInput): VarDeclStmt;
  static marshal(input: ConstVarDeclList): VarDeclStmt;
  static marshal(input: LetIdInput): VarDeclStmt;
  static marshal(input: LetVarDeclInput): VarDeclStmt;
  static marshal(input: LetVarDecl): VarDeclStmt;
  static marshal(input: LetVarDeclListInput): VarDeclStmt;
  static marshal(input: LetVarDeclList): VarDeclStmt;
  static marshal(input: VarDeclStmt): VarDeclStmt;
  static marshal(input: VarDeclStmtInput): VarDeclStmt;
  static marshal(input: ConstInput): VarDeclStmt;
  static marshal(input: LetInput): VarDeclStmt;
  static marshal(input: VarDeclStmtInput): VarDeclStmt {
    if (VarDeclStmtNode.is(input)) return input;

    const keyword: VarDeclStmtNodeKeyword = hasNodeInputProperty(input, "const")
      ? "const"
      : "let";
    const list = (
      input as {
        [keyword]:
          | IdInput
          | VarDeclList
          | VarDecl
          | VarDeclInput
          | VarDeclListInput;
      }
    )[keyword];

    if (isVarDeclList(list)) return new VarDeclStmtNode(keyword, list);
    if (isVarDeclInput(list) || isVarDecl(list) || isIdInput(list))
      return new VarDeclStmtNode(keyword, varDeclList(list));
    return new VarDeclStmtNode(keyword, varDeclList(...list));
  }

  static const(...declList: VarDeclListInput): VarDeclStmt;
  static const(list: VarDeclList): VarDeclStmt;
  static const(
    decl: VarDeclListInput[0] | VarDeclList,
    ...additionalDecls: VarDeclListInput[0][]
  ): VarDeclStmt {
    if (isVarDeclList(decl)) return VarDeclStmtNode.marshal({ const: decl });
    return VarDeclStmtNode.marshal({ const: [decl, ...additionalDecls] });
  }

  static let(...declList: VarDeclListInput): VarDeclStmt;
  static let(list: VarDeclList): VarDeclStmt;
  static let(
    decl: VarDeclListInput[0] | VarDeclList,
    ...additionalDecls: VarDeclListInput[0][]
  ): VarDeclStmt {
    if (isVarDeclList(decl)) return VarDeclStmtNode.marshal({ let: decl });
    return VarDeclStmtNode.marshal({ let: [decl, ...additionalDecls] });
  }

  static is(input: UnknownNodeInput): input is VarDeclStmtNode {
    return input instanceof VarDeclStmtNode;
  }

  static isInput(input: UnknownNodeInput): input is VarDeclStmtInput {
    const hasConst = hasNodeInputProperty(input, "const");
    const hasLet = hasNodeInputProperty(input, "let");

    // XOR
    if (hasConst === hasLet) return false;

    const value = hasConst
      ? input.const
      : (input as { let: UnknownNodeInput }).let;

    if (isIdInput(value)) return true;
    if (isVarDeclInput(value)) return true;
    if (isVarDecl(value)) return true;
    if (isVarDeclListInput(value)) return true;
    if (isVarDeclList(value)) return true;
    if (
      Array.isArray(value) &&
      value.length < 1 &&
      value.every((v) => isVarDecl(v) || isIdInput(v) || isVarDeclInput(v))
    )
      return true;

    return false;
  }
}

type VarDeclStmtNodeKeyword = "const" | "let";
export type FlexibleVarDeclListInput = VarDeclList | IdInput | VarDeclListInput;

type ConstIdInput = { const: IdInput };
type ConstVarDeclInput = { const: VarDeclInput };
type ConstVarDecl = { const: VarDecl };
type ConstVarDeclListInput = { const: VarDeclListInput };
type ConstVarDeclList = { const: VarDeclList };
type LetIdInput = { let: IdInput };
type LetVarDeclInput = { let: VarDeclInput };
type LetVarDecl = { let: VarDecl };
type LetVarDeclList = { let: VarDeclList };
type LetVarDeclListInput = { let: VarDeclListInput };

type ConstInput = {
  const: IdInput | VarDeclInput | VarDecl | VarDeclListInput | VarDeclList;
};
type LetInput = {
  let: IdInput | VarDeclInput | VarDecl | VarDeclListInput | VarDeclList;
};

export type VarDeclStmtInput =
  | ConstIdInput
  | ConstVarDeclInput
  | ConstVarDecl
  | ConstVarDeclListInput
  | ConstVarDeclList
  | LetIdInput
  | LetVarDeclInput
  | LetVarDecl
  | LetVarDeclListInput
  | LetVarDeclList
  | VarDeclStmt
  | ConstInput
  | LetInput;

export type VarDeclStmt = VarDeclStmtNode;
export const VarDeclStmt = provider(VarDeclStmtNode);
export const {
  varDeclStmt,
  isVarDeclStmt,
  isVarDeclStmtInput,
  varConst,
  varLet,
} = {
  ...VarDeclStmt,
  varConst: VarDeclStmtNode.const,
  varLet: VarDeclStmtNode.let,
};
