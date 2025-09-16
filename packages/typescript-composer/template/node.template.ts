import { Node } from "../src/plumbing.js";
import { code, literal, typeExpr } from "../src/porcelain.js";

const familyMap = {
  [Node.Family.CODE]: "CODE",
  [Node.Family.EXPR]: "EXPR",
  [Node.Family.STMT]: "STMT",
  [Node.Family.TYPE]: "TYPE",
};

export function generate(
  kebabNodeName: string,
  wrappedType: string,
  family: Node.Family = Node.Family.EXPR,
) {
  const upperNodeName = kebabNodeName
    .split("-")
    .map((s) => s.slice(0, 1).toUpperCase() + s.slice(1))
    .join("");
  const lowerNodeName = kebabNodeName
    .split("-")
    .map((s, i) => (i > 0 ? s.slice(0, 1).toUpperCase() + s.slice(1) : s))
    .join("");

  const familyName = `Node.Family.${familyMap[family]}`;
  const nodeType = typeExpr(
    `Node<${literal(lowerNodeName)}${family !== Node.Family.EXPR ? `, ${familyName}` : ""}>`,
  );
  const inputType = typeExpr(wrappedType);

  return code`
    import { Node, type UnknownNodeInput } from "../plumbing.js";

    class ${upperNodeName}Node implements ${nodeType} {
      static readonly kind = ${literal(lowerNodeName)} as const;
      readonly family = ${familyName};
      readonly kind = ${literal(lowerNodeName)} as const;

      private constructor(
        readonly value: ${inputType},
      ) {}

      toString(): string {
        return this.value.toString();
      }

      static marshal(
        input: ${inputType},
      ): ${upperNodeName} {
        return exprProxy(
          new ${upperNodeName}Node(input),
        );
      }

      static is(input: UnknownNodeInput): input is ${upperNodeName} {
        return input instanceof ${upperNodeName}Node;
      }

      static isInput(input: UnknownNodeInput): input is ${upperNodeName}Input {
        return false;
      }
    }

    export type ${upperNodeName}Input = Parameters<typeof ${upperNodeName}Node.marshal>;
    export type ${upperNodeName} = ExprNode<${upperNodeName}Node>;
    export const ${upperNodeName} = exprProvider(${upperNodeName}Node);
    export const { ${lowerNodeName}, is${upperNodeName}, is${upperNodeName}Input } = ${upperNodeName};
  `.toString();
}
