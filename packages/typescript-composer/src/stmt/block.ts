import { type Code, isCode } from "../code/code.js";
import { isExpr } from "../expr/expr.js";
import { isInline } from "../expr/inline.js";
import {
  Node,
  type UnknownNodeInput,
  hasNodeInputProperty,
  indent,
  provider,
} from "../plumbing.js";
import { exprStmt } from "./expr-stmt.js";
import { type Stmt, type StmtInput, isStmtInput, stmt } from "./stmt.js";

class BlockNode implements Node<"block", Node.Family.STMT> {
  static readonly kind = "block";
  readonly kind = "block";
  readonly family = Node.Family.STMT;

  private constructor(readonly parts: (Stmt | Code)[]) {}

  toString() {
    return `{\n${indent(this.parts.join("\n"))}\n}`;
  }

  static marshal(...input: StmtInput[]): Block;
  static marshal(block: BlockObject): Block;
  static marshal(block: Block): Block;
  static marshal(func: () => BlockInput): Block;
  static marshal(...input: Code[]): Block;
  static marshal(
    input?: AtomicBlockInput,
    ...additionalInput: AdditionalBlockInput[]
  ): Block;
  static marshal(
    input?: AtomicBlockInput,
    ...additionalInput: AdditionalBlockInput[]
  ): Block {
    if (input === undefined) return new BlockNode([]);
    if (BlockNode.is(input)) return input;
    if (BlockNode.isBlockObject(input))
      return BlockNode.marshal(...input.block);
    if (typeof input === "function" && !isExpr(input)) {
      const result = input();
      return BlockNode.marshal(...(Array.isArray(result) ? result : [result]));
    }

    return new BlockNode(
      [input, ...additionalInput].map((s) => (isCode(s) ? s : stmt(s))),
    );
  }

  static is(input: UnknownNodeInput): input is Block {
    return input instanceof BlockNode;
  }

  static isInput(input: UnknownNodeInput[]): input is BlockInputParams {
    return (
      (input.length === 1 &&
        (BlockNode.is(input[0]) || BlockNode.isBlockObject(input[0]))) ||
      input.every((s) => isStmtInput(s))
    );
  }

  static isBlockObject(input: UnknownNodeInput): input is BlockObject {
    return (
      hasNodeInputProperty(input, "block") &&
      Array.isArray(input.block) &&
      input.block.every((s) => isStmtInput(s))
    );
  }
}

// When we probably want a block...except when we don't.
export function blockish(node: BlockInput) {
  if (isBlock(node)) return node;
  if (isInline(node)) return exprStmt(node);
  return block(...(Array.isArray(node) ? node : [node]));
}

export type BlockObject = { block: StmtInput[] };
export type AtomicBlockInput =
  | Block
  | BlockObject
  | AdditionalBlockInput
  | (() => BlockInput);
export type AdditionalBlockInput = StmtInput | Code;
export type BlockInputParams = [AtomicBlockInput] | AdditionalBlockInput[];
export type BlockInput =
  | AtomicBlockInput
  | [AtomicBlockInput]
  | AdditionalBlockInput[];
export type Block = BlockNode;
export const Block = provider(BlockNode);
export const { block, isBlock, isBlockInput, isBlockObject } = {
  ...Block,
  isBlockObject: BlockNode.isBlockObject,
};
