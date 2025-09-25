import { type Id, id, isIdInput } from "../expr/id.js";
import type { IdInput } from "../expr/id.js";
import { type Ref, ref } from "../expr/ref.js";
import {
  type NamedNode,
  Node,
  type UnknownNodeInput,
  provider,
} from "../plumbing.js";
import { type Type, isTypeInput, type } from "../type/type.js";
import { type Arg, type ArgInput, arg, isArgInput } from "./arg.js";
import {
  type AtomicBlockInput,
  type Block,
  type BlockInput,
  block,
} from "./block.js";

type BlockOutput = AtomicBlockInput | BlockInput;

export class FuncNode implements NamedNode<"func", Node.Family.STMT> {
  static readonly kind = "func";
  readonly kind = "func";
  readonly family = Node.Family.STMT;

  private constructor(
    readonly id: Id,
    readonly args: Arg[],
    readonly body: Block,
    readonly returnType?: Type,
  ) {}

  toString() {
    const returnTypeAnnotation = this.returnType ? `: ${this.returnType}` : "";
    return `function ${this.id}(${this.args.join(", ")})${returnTypeAnnotation} ${this.body}`;
  }

  static marshal<
    I extends RawArgInputTuple,
    A extends I & ArgInputTuple<I>,
    B extends ArgFunc<I, A>,
  >(name: IdInput, args: I, body: B, returnType?: Type): Func;
  static marshal<
    I extends RawArgInputTuple,
    A extends I & ArgInputTuple<I>,
    B extends ArgFunc<I, A>,
  >(...input: FuncInput<I, A, B>): Func;
  static marshal<
    I extends RawArgInputTuple,
    A extends I & ArgInputTuple<I>,
    B extends ArgFunc<I, A>,
  >(name: IdInput, args: A, body: B, returnType?: Type): Func {
    const argInstances = args.map((a) =>
      arg(...(Array.isArray(a) ? a : [a])),
    ) as Arg[];

    const argRefs = argInstances.map((a) => ref(a)) as ArgRefTuple<I, A>;
    const bodyResult = body(...argRefs);

    return new FuncNode(
      id(name),
      argInstances,
      block(...(Array.isArray(bodyResult) ? bodyResult : [bodyResult])),
      returnType ? type(returnType) : undefined,
    );
  }

  static is(input: UnknownNodeInput): input is Func {
    return input instanceof FuncNode;
  }

  static isInput<
    I extends RawArgInputTuple,
    A extends I & ArgInputTuple<I>,
    B extends ArgFunc<I, A>,
  >(input: [IdInput, A, B, Type?]): input is FuncInput<I, A, B> {
    return (
      Array.isArray(input) &&
      (input.length === 3 || input.length === 4) &&
      isIdInput(input[0]) &&
      Array.isArray(input[1]) &&
      input[1].every((a) => isArgInput(a)) &&
      typeof input[2] === "function" &&
      (input[3] === undefined || isTypeInput(input[3]))
    );
  }
}

export type Func = FuncNode;
export const Func = provider(FuncNode);
export const { func, isFunc, isFuncInput } = Func;

export type FuncInput<
  I extends RawArgInputTuple,
  A extends ArgInputTuple<I>,
  B extends ArgFunc<I, A>,
> = [IdInput, A, B, Type?];

type ArgFunc<I extends RawArgInputTuple, A extends ArgInputTuple<I>> = (
  ...args: ArgRefTuple<I, A>
) => BlockOutput;

type RawArgInputTuple =
  | ArgInputTuple0
  | ArgInputTuple1
  | ArgInputTuple2
  | ArgInputTuple3
  | ArgInputTuple4
  | ArgInputTuple5
  | ArgInputTuple6
  | ArgInputTuple7
  | ArgInputTuple8
  | ArgInputTuple9
  | ArgInputTuple10
  | ArgInputTuple11
  | ArgInputTuple12
  | ArgInputTuple13
  | ArgInputTuple14
  | ArgInputTuple15
  | ArgInputTuple16;

type ArgInputTuple0 = [];
type ArgInputTuple1 = [ArgInput];
type ArgInputTuple2 = [ArgInput, ArgInput];
type ArgInputTuple3 = [ArgInput, ArgInput, ArgInput];
type ArgInputTuple4 = [ArgInput, ArgInput, ArgInput, ArgInput];
type ArgInputTuple5 = [ArgInput, ArgInput, ArgInput, ArgInput, ArgInput];
type ArgInputTuple6 = [
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
];
type ArgInputTuple7 = [
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
];
type ArgInputTuple8 = [
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
];
type ArgInputTuple9 = [
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
];
type ArgInputTuple10 = [
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
];
type ArgInputTuple11 = [
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
];
type ArgInputTuple12 = [
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
];
type ArgInputTuple13 = [
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
];
type ArgInputTuple14 = [
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
];
type ArgInputTuple15 = [
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
];
type ArgInputTuple16 = [
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
  ArgInput,
];

type ArgInputTuple<A extends [...ArgInput[]]> = RawArgInputTuple &
  A extends ArgInputTuple0
  ? { length: 0 }
  : A extends ArgInputTuple1
    ? { length: 1 }
    : A extends ArgInputTuple2
      ? { length: 2 }
      : A extends ArgInputTuple3
        ? { length: 3 }
        : A extends ArgInputTuple4
          ? { length: 4 }
          : A extends ArgInputTuple5
            ? { length: 5 }
            : A extends ArgInputTuple6
              ? { length: 6 }
              : A extends ArgInputTuple7
                ? { length: 7 }
                : A extends ArgInputTuple8
                  ? { length: 8 }
                  : A extends ArgInputTuple9
                    ? { length: 9 }
                    : A extends ArgInputTuple10
                      ? { length: 10 }
                      : A extends ArgInputTuple11
                        ? { length: 11 }
                        : A extends ArgInputTuple12
                          ? { length: 12 }
                          : A extends ArgInputTuple13
                            ? { length: 13 }
                            : A extends ArgInputTuple14
                              ? { length: 14 }
                              : A extends ArgInputTuple15
                                ? { length: 15 }
                                : A extends ArgInputTuple16
                                  ? { length: 16 }
                                  : never;

type ArgRefTuple0 = [];
type ArgRefTuple1 = [Ref<Arg>];
type ArgRefTuple2 = [Ref<Arg>, Ref<Arg>];
type ArgRefTuple3 = [Ref<Arg>, Ref<Arg>, Ref<Arg>];
type ArgRefTuple4 = [Ref<Arg>, Ref<Arg>, Ref<Arg>, Ref<Arg>];
type ArgRefTuple5 = [Ref<Arg>, Ref<Arg>, Ref<Arg>, Ref<Arg>, Ref<Arg>];
type ArgRefTuple6 = [
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
];
type ArgRefTuple7 = [
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
];
type ArgRefTuple8 = [
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
];
type ArgRefTuple9 = [
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
];
type ArgRefTuple10 = [
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
];
type ArgRefTuple11 = [
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
];
type ArgRefTuple12 = [
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
];
type ArgRefTuple13 = [
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
];
type ArgRefTuple14 = [
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
];
type ArgRefTuple15 = [
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
];
type ArgRefTuple16 = [
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
  Ref<Arg>,
];

type RawArgRefTuple =
  | ArgRefTuple0
  | ArgRefTuple1
  | ArgRefTuple2
  | ArgRefTuple3
  | ArgRefTuple4
  | ArgRefTuple5
  | ArgRefTuple6
  | ArgRefTuple7
  | ArgRefTuple8
  | ArgRefTuple9
  | ArgRefTuple10
  | ArgRefTuple11
  | ArgRefTuple12
  | ArgRefTuple13
  | ArgRefTuple14
  | ArgRefTuple15
  | ArgRefTuple16;

type ArgRefTuple<
  I extends RawArgInputTuple,
  A extends ArgInputTuple<I>,
> = RawArgRefTuple & A extends ArgInputTuple0
  ? ArgRefTuple0
  : A extends ArgInputTuple1
    ? ArgRefTuple1
    : A extends ArgInputTuple2
      ? ArgRefTuple2
      : A extends ArgInputTuple3
        ? ArgRefTuple3
        : A extends ArgInputTuple4
          ? ArgRefTuple4
          : A extends ArgInputTuple5
            ? ArgRefTuple5
            : A extends ArgInputTuple6
              ? ArgRefTuple6
              : A extends ArgInputTuple7
                ? ArgRefTuple7
                : A extends ArgInputTuple8
                  ? ArgRefTuple8
                  : A extends ArgInputTuple9
                    ? ArgRefTuple9
                    : A extends ArgInputTuple10
                      ? ArgRefTuple10
                      : A extends ArgInputTuple11
                        ? ArgRefTuple11
                        : A extends ArgInputTuple12
                          ? ArgRefTuple12
                          : A extends ArgInputTuple13
                            ? ArgRefTuple13
                            : A extends ArgInputTuple14
                              ? ArgRefTuple14
                              : A extends ArgInputTuple15
                                ? ArgRefTuple15
                                : A extends ArgInputTuple16
                                  ? ArgRefTuple16
                                  : never;
