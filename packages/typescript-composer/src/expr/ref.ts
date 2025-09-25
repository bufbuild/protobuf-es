import { type NamedNode, Node, type UnknownNodeInput } from "../plumbing.js";
import { hasNodeInputProperty } from "../plumbing.js";
import { type ExprNode, exprProvider, exprProxy, isExpr } from "./expr.js";
import { isId } from "./id.js";

export class RefNode<T extends NamedNode<string, Node.Family>>
  implements Node<"ref">
{
  static readonly kind = "ref" as const;
  static readonly #registry: Ref<NamedNode<string, Node.Family>>[] = [];
  readonly family = Node.Family.EXPR as const;
  readonly kind = "ref" as const;

  private constructor(readonly ref: T) {}

  toString() {
    return this.ref.id.toString();
  }

  static marshal<T extends NamedNode<string, Node.Family>>(
    input: RefInput<T>,
  ): Ref<T> {
    if (RefNode.is(input)) return input;
    if (RefNode.#isObjectInput(input)) return RefNode.marshal(input.ref);

    const found = RefNode.#registry.find((t) => t.ref === input);
    if (found) return found as Ref<T>;

    const created = exprProxy(new RefNode(input));
    RefNode.#registry.push(created);

    return created;
  }

  static is<T extends NamedNode<string, Node.Family>>(
    input: UnknownNodeInput,
  ): input is Ref<T> {
    return input instanceof RefNode;
  }

  static isInput(
    input: UnknownNodeInput,
  ): input is RefInput<NamedNode<string, Node.Family>> {
    return (
      isRef(input) || RefNode.#isObjectInput(input) || RefNode.#isRefable(input)
    );
  }

  static #isRefable(
    input: UnknownNodeInput,
  ): input is NamedNode<string, Node.Family> {
    return isExpr(input) && hasNodeInputProperty(input, "id") && isId(input.id);
  }

  static #isObjectInput(
    input: UnknownNodeInput,
  ): input is ObjectRefInput<NamedNode<string, Node.Family>> {
    return hasNodeInputProperty(input, "ref") && isRefInput(input.ref);
  }
}

type ObjectRefInput<T extends NamedNode<string, Node.Family>> = {
  ref: T;
};

export type RefInput<T extends NamedNode<string, Node.Family>> =
  | Ref<T>
  | ObjectRefInput<T>
  | T;

export type Ref<T extends NamedNode<string, Node.Family>> = ExprNode<
  RefNode<T>
>;
export const Ref = exprProvider(RefNode);
export const { ref, isRef, isRefInput } = Ref;
