import {
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
  literal,
  numberLiteral,
  parens,
  ret,
  stringLiteral,
  typeExpr,
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
    typeExpr("void"),
  )}

  console.log("Listing current directory...");
  ${listDirName}();
`;

console.log(file.toString());

const funcDef = func(
  "wrap",
  [
    ["text", typeExpr("string")],
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
);

console.log(JSON.stringify(funcDef, null, 2));
console.log(funcDef.toString());

function wrap(text: string, width = 100) {
  const lines: string[] = [""];
  for (const word of text.split(" ")) {
    if (lines[lines.length - 1].length + word.length + 1 > width) {
      lines.push("");
    }
    lines[lines.length - 1] += " " + word;
  }
  return lines.join("\n");
}

console.log(
  wrap(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nisi sapien, iaculis ac orci scelerisque, porta consequat turpis. Integer augue sem, varius pulvinar dolor vitae, semper rutrum elit. Mauris massa turpis, finibus et libero quis, iaculis consectetur mauris. Aenean pharetra elit urna, nec commodo odio varius non. Pellentesque aliquet, nisl a pharetra ultricies, dolor ante vehicula justo, sed bibendum elit odio id sem. Morbi bibendum vestibulum tristique. Morbi ac quam molestie, accumsan sapien eget, feugiat arcu. Curabitur magna tortor, accumsan sit amet lacinia dignissim, fringilla quis erat. Aliquam lectus sapien, vestibulum sed enim nec, ultricies luctus lorem. Sed euismod facilisis cursus. Cras finibus, diam non tincidunt commodo, quam nunc mattis metus, sit amet cursus eros metus imperdiet tortor. Mauris dictum arcu eu nunc vulputate, ornare venenatis velit commodo. Nam id eleifend velit. Vestibulum vitae metus risus. Vestibulum eu ante vitae diam congue tincidunt sit amet at justo. Donec consectetur tristique tincidunt.",
    40,
  ),
);
