import {
  binary,
  block,
  code,
  forOf,
  func,
  id,
  ifThen,
  inline,
  literal,
  typeExpr,
  varConst,
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
            listDirName.$(id("newPath"), binary(d, "+", 1), m),
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
