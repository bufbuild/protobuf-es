import { type Id, id } from "../expr/id.js";
import type { IdInput } from "../expr/id.js";
import { type Ref, ref } from "../expr/ref.js";
import {
  type NamedNode,
  Node,
  type Transformer,
  type UnknownNodeInput,
  provider,
} from "../plumbing.js";
import { type Type, type } from "../type/type.js";
import { type Arg, type ArgInput, arg } from "./arg.js";
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

  static marshal<const I extends ArgInput[]>(
    name: IdInput,
    args: I,
    body: BodyFunc<I> | Block,
    returnType?: Type,
  ): Func;
  static marshal<const I extends ArgInput[]>(func: FuncObjectInput<I>): Func;
  static marshal<const I extends ArgInput[]>(
    ...i: FuncInput<I> | [FuncObjectInput<I>]
  ): Func {
    const [name, args, body, returnType] =
      i.length === 1 ? [i[0].id, i[0].args, i[0].body, i[0].returnType] : i;

    const argInstances = args.map((a) =>
      arg(...(Array.isArray(a) ? a : [a])),
    ) as Arg[];

    const argRefs = argInstances.map((a) => ref(a)) as ArgRefTuple<I>;
    const bodyResult = typeof body === "function" ? body(...argRefs) : body;

    return new FuncNode(
      id(name),
      argInstances,
      block(...(Array.isArray(bodyResult) ? bodyResult : [bodyResult])),
      returnType ? type(returnType) : undefined,
    );
  }

  transform(t: Transformer) {
    return t.replace(
      this,
      () =>
        new FuncNode(
          this.id.transform(t),
          this.args.map((a) => a.transform(t)),
          this.body.transform(t),
          this.returnType ? this.returnType.transform(t) : undefined,
        ),
    );
  }

  static is(input: UnknownNodeInput): input is Func {
    return input instanceof FuncNode;
  }

  static isInput(_: UnknownNodeInput): _ is FuncInput<ArgInput[]> {
    return false;
  }
}

export type ArgRefTuple<I extends readonly ArgInput[]> = I extends readonly [
  ArgInput,
  ...infer Rest extends ArgInput[],
]
  ? [Ref<Arg>, ...ArgRefTuple<Rest>]
  : [];

export type Func = FuncNode;
export const Func = provider(FuncNode);
export const { func, isFunc, isFuncInput } = Func;

export type FuncInput<I extends readonly ArgInput[]> = readonly [
  IdInput,
  I,
  BodyFunc<I> | Block,
  Type?,
];

interface FuncObjectInput<I extends readonly ArgInput[]> {
  id: IdInput;
  args: I;
  body: BodyFunc<I> | Block;
  returnType?: Type;
}

type BodyFunc<I extends readonly ArgInput[]> = (
  ...args: ArgRefTuple<I> & readonly Ref<Arg>[]
) => BlockOutput;
