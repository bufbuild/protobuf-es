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
  isArg,
  isFunc,
  isVarDecl,
  literal,
  numberLiteral,
  parens,
  ref,
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
  () => code`
    ${{ const: ["lines", { type: "string[]" }, [""]] }}
    for (const word of text.split(" ")) {
      if ((lines[lines.length - 1].length + word.length + 1) > width) {
        lines.push("");
      }
      lines[lines.length - 1] += " " + word;
    }
    return lines.join("\\n");`,
);

console.log(funcDef.toString());

class TypeStripper extends Transformer {
  mutate(original: UnknownNode) {
    if (isArg(original)) return arg(original.id, original.value);
    if (isFunc(original))
      return func(original.id, original.args, original.body);
    if (isVarDecl(original)) return varDecl(original.id, original.value);
    return original;
  }
}

const transformer = new TypeStripper();

console.log(funcDef.transform(transformer).toString());
