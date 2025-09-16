import { type IdInput, isIdInput } from "../expr/id.js";
import { type VarDeclList, isVarDeclList } from "../expr/var-decl-list.js";
import { type VarDeclListInput, varDeclList } from "../expr/var-decl-list.js";
import { isVarDecl, isVarDeclInput } from "../expr/var-decl.js";
import {
  Node,
  type UnknownNodeInput,
  hasNodeInputProperty,
  provider,
} from "../plumbing.js";

export class VarDeclStmtNode implements Node<"varDeclStmt", Node.Family.STMT> {
  static readonly kind = "varDeclStmt";
  readonly kind = "varDeclStmt";
  readonly family = Node.Family.STMT;

  constructor(
    readonly keyword: VarDeclStmtNodeKeyword,
    readonly list: VarDeclList,
  ) {}

  toString() {
    return `${this.keyword} ${this.list}`;
  }

  static marshal(input: ConstVarDeclList): VarDeclStmt;
  static marshal(input: ConstIdInput): VarDeclStmt;
  static marshal(input: ConstVarDeclListInput): VarDeclStmt;
  static marshal(input: LetVarDeclList): VarDeclStmt;
  static marshal(input: LetIdInput): VarDeclStmt;
  static marshal(input: LetVarDeclListInput): VarDeclStmt;
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
      input as { [keyword]: VarDeclList | IdInput | VarDeclListInput }
    )[keyword];

    if (isVarDeclList(list)) return new VarDeclStmtNode(keyword, list);
    if (isIdInput(list)) return new VarDeclStmtNode(keyword, varDeclList(list));
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

    if (isVarDeclList(value)) return true;
    if (isIdInput(value)) return true;
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

type ConstVarDeclList = { const: VarDeclList };
type ConstIdInput = { const: IdInput };
type ConstVarDeclListInput = { const: VarDeclListInput };
type LetVarDeclList = { let: VarDeclList };
type LetIdInput = { let: IdInput };
type LetVarDeclListInput = { let: VarDeclListInput };

type ConstInput = { const: VarDeclList | IdInput | VarDeclListInput };
type LetInput = { let: VarDeclList | IdInput | VarDeclListInput };

export type VarDeclStmtInput =
  | ConstVarDeclList
  | ConstIdInput
  | ConstVarDeclListInput
  | LetVarDeclList
  | LetIdInput
  | LetVarDeclListInput
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
