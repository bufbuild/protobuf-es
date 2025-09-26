import { Transformer, type UnknownNode } from "./plumbing.js";
import {
  Code,
  Expr,
  Stmt,
  access,
  arg,
  arrayLiteral,
  binary,
  block,
  call,
  code,
  forOf,
  func,
  id,
  ifThen,
  inline,
  isFunc,
  isVarDecl,
  literal,
  numberLiteral,
  parens,
  ret,
  stringLiteral,
  type,
  varConst,
  varDecl,
  varDeclList,
} from "./porcelain.js";

const listDirName = id("listDir");

const file = code`
  import fs from "node:fs";

  ${func(
    listDirName,
    [
      ["path", "string", "."],
      ["depth", 0],
      ["maxDepth", 3],
    ],
    (p, d, m) => code`
      ${ifThen(
        binary(d, ">", m),
        code`
          return;
        `,
      )}

      ${varConst(["files", inline`fs.readdirSync(${p})`])}

      ${forOf(
        "file",
        id("files"),
        block(
          varConst(["newPath", inline`path + ${literal("/")} + file`]),
          varConst(["isDir", inline`fs.statSync(newPath).isDirectory()`]),
          inline`console.log("  ".repeat(${d}) + file + (isDir ? "/" : ""))`,
          ifThen(
            id("isDir"),
            listDirName.call(id("newPath"), binary(d, "+", 1), m),
          ),
        ),
      )}
    `,
    type("void"),
  )}

  console.log("Listing current directory...");
  ${listDirName}();
`;

console.log(file.toString());

const funcDef = func(
  "wrap",
  [
    ["text", type("string")],
    ["width", 100],
  ],
  (text, width) => {
    const lines = varDecl("lines", { type: "string[]" }, [""]);
    return [
      { const: lines },
      {
        for: "word",
        of: text._split(" "),
        then: (word) => [
          {
            if: parens(
              lines
                .get(lines.$length.minus(1))
                .$length.plus(word.$length)
                .plus(1),
            ).isGreaterThan(width),
            then: lines._push(""),
          },
          lines.get(lines.$length.minus(1)).add(literal(" ").plus(word)),
        ],
      },
      { return: lines._join("\n") },
    ];
  },
  type("string"),
);

// Argument of type '(text: never, width: never) => [{ const: VarDecl; }, { for: string; of: any; then: (word: Id) => [{ if: Binary; then: Call; }, Binary]; }, { return: Call; }]'
// is not assignable to parameter of type 'BodyFunc<([string, number] | [string, TypeNode])[], [] & readonly Ref<ArgNode>[]>'.
//  Types of parameters 'text' and 'args' are incompatible.
//    Type '[] & readonly Ref<ArgNode>[]' is not assignable to type '[text: never, width: never]'.

// Argument of type '(text: any, width: any) => ({ const: VarDecl; for?: undefined; of?: undefined; then?: undefined; return?: undefined; } | { for: string; of: any; then: (word: any) => (Binary | { if: Binary; then: Call; })[]; const?: undefined; return?: undefined; } | { ...; })[]'
// is not assignable to parameter of type 'BodyFunc<([string, number] | [string, TypeNode])[], []>'.
// Target signature provides too few arguments. Expected 2 or more, but got 0.

console.log(JSON.stringify(funcDef, null, 2));
console.log(funcDef.toString());

class TypeStripper extends Transformer {
  mutate(original: UnknownNode) {
    if (isFunc(original))
      return func(original.id, original.args, original.body);
    if (isVarDecl(original)) return varDecl(original.id, original.value);
    return original;
  }
}

const transformer = new TypeStripper();

console.log(funcDef.transform(transformer).toString());
