import { type Expr, type ExprInput, expr, isExprInput } from "../expr/expr.js";
import { type Id, type IdInput, id, isIdInput } from "../expr/id.js";
import {
  type NamedNode,
  Node,
  type UnknownNodeInput,
  provider,
} from "../plumbing.js";
import {
  type Type,
  type TypeInput,
  isType,
  isTypeInput,
  type,
} from "../type/type.js";

class ArgNode implements NamedNode<"arg", Node.Family.STMT> {
  static readonly kind = "arg";
  readonly kind = "arg";
  readonly family = Node.Family.STMT;

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

  static marshal(name: IdInput): Arg;
  static marshal(name: IdInput, defaultValue: ExprInput): Arg;
  static marshal(name: IdInput, type: Type): Arg;
  static marshal(name: IdInput, type: TypeInput, defaultValue: ExprInput): Arg;
  static marshal(...input: TupleArgInput | [Arg | IdInput]): Arg;
  static marshal(...input: TupleArgInput | [Arg | IdInput]): Arg {
    if (input.length === 1) {
      const i = input[0];
      if (ArgNode.is(i)) return i;
      return new ArgNode(id(i));
    }

    if (ArgNode.#isIdTupleInput(input)) return new ArgNode(id(input[0]));
    if (ArgNode.#isIdValueTupleInput(input))
      return new ArgNode(id(input[0]), undefined, expr(input[1]));
    if (ArgNode.#isIdTypeTupleInput(input))
      return new ArgNode(id(input[0]), type(input[1]));

    return new ArgNode(id(input[0]), type(input[1]), expr(input[2]));
  }

  static is(input: UnknownNodeInput): input is Arg {
    return input instanceof ArgNode;
  }

  static isInput(input: UnknownNodeInput): input is ArgInput {
    return (
      ArgNode.is(input) || isIdInput(input) || ArgNode.#isTupleInput(input)
    );
  }

  static #isTupleInput(input: UnknownNodeInput): input is TupleArgInput {
    return (
      ArgNode.#isIdTupleInput(input) ||
      ArgNode.#isIdValueTupleInput(input) ||
      ArgNode.#isIdTypeTupleInput(input) ||
      ArgNode.#isIdTypeValueTupleInput(input)
    );
  }

  static #isIdTupleInput(input: UnknownNodeInput): input is IdTupleArgInput {
    return Array.isArray(input) && input.length === 1 && isIdInput(input[0]);
  }

  static #isIdValueTupleInput(
    input: UnknownNodeInput,
  ): input is IdValueTupleArgInput {
    return (
      Array.isArray(input) &&
      input.length === 2 &&
      isIdInput(input[0]) &&
      isExprInput(input[1])
    );
  }

  static #isIdTypeTupleInput(
    input: UnknownNodeInput,
  ): input is IdTypeTupleArgInput {
    return (
      Array.isArray(input) &&
      input.length === 2 &&
      isIdInput(input[0]) &&
      isType(input[1])
    );
  }

  static #isIdTypeValueTupleInput(
    input: UnknownNodeInput,
  ): input is IdTypeValueTupleArgInput {
    return (
      Array.isArray(input) &&
      input.length === 3 &&
      isIdInput(input[0]) &&
      isExprInput(input[1]) &&
      isTypeInput(input[2])
    );
  }
}

type IdTupleArgInput = [IdInput];
type IdValueTupleArgInput = [IdInput, ExprInput];
type IdTypeTupleArgInput = [IdInput, Type];
type IdTypeValueTupleArgInput = [IdInput, TypeInput, ExprInput];
type TupleArgInput =
  | IdTupleArgInput
  | IdValueTupleArgInput
  | IdTypeTupleArgInput
  | IdTypeValueTupleArgInput;

// @TODO: consider map input like { [name]: value }
export type ArgInput = TupleArgInput | IdInput | Arg;
export type Arg = ArgNode;
export const Arg = provider(ArgNode);
export const { arg, isArg, isArgInput } = Arg;
