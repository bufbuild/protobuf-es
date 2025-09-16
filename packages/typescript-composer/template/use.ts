import assert from "node:assert";
import fs from "node:fs";
import { parseArgs } from "node:util";

import { Node } from "../src/plumbing.js";
import { generate as nodeGen } from "./node.template.js";
import { generate as nodeTestGen } from "./node.test.template.js";

try {
  const config = parseArgs({
    allowPositionals: true,
  });

  const usage = `
Usage: npm run new-node -- <target file path> <wrapped type>
Example: npm run new-node -- src/stmt/block.ts string
`;

  assert(config.positionals.length === 2, usage);

  const targetPath = config.positionals[0];
  const wrappedType = config.positionals[1];

  const targetSplitFilePath = targetPath.split("/");
  const targetFileName = targetSplitFilePath.slice(-1)[0];
  assert(targetFileName.length > 0, `Must provide a target file name ${usage}`);

  const family =
    Node.Family?.[targetSplitFilePath[1]?.toUpperCase()] ?? Node.Family.EXPR;

  const targetDirectory =
    (["/", "."].includes(targetPath[0]) ? "" : "./") +
    targetSplitFilePath.slice(0, -1).join("/");
  assert(
    fs.existsSync(targetDirectory) &&
      fs.statSync(targetDirectory).isDirectory(),
    `Target directory ("${targetDirectory}") must exist`,
  );

  const targetSplitFileName = targetFileName.split(".");
  assert(
    targetSplitFileName.length <= 2,
    `Target file name must not have multiple extensions (".${targetSplitFileName.slice(1).join(".")}") \n${usage}`,
  );
  assert(
    targetSplitFileName.length === 1 || targetSplitFileName[1] === "ts",
    `If provided, target file extension must be ".ts" \n${usage}`,
  );

  const kebabNodeName = targetSplitFileName[0];
  assert(
    /^[a-z]+(-[a-z]+)*$/.test(kebabNodeName),
    `Target node name ("${kebabNodeName}") must be in "lower-kebab-case" \n${usage}`,
  );

  const nodeFilePath = `${targetDirectory}/${kebabNodeName}.ts`;
  const nodeTestFilePath = `${targetDirectory}/${kebabNodeName}.test.ts`;

  assert(
    !fs.existsSync(nodeFilePath),
    `Target file path ("${nodeFilePath}") must not already exist \n${usage}`,
  );
  assert(
    !fs.existsSync(nodeTestFilePath),
    `Target test file path ("${nodeTestFilePath}") must not already exist \n${usage}`,
  );

  fs.writeFileSync(nodeFilePath, nodeGen(kebabNodeName, wrappedType, family));
  fs.writeFileSync(nodeTestFilePath, nodeTestGen(kebabNodeName, wrappedType));
} catch (e) {
  console.error(e.message);
}
