const { join, basename } = require("path");
const { existsSync, readFileSync, copyFileSync } = require("fs");

// TODO(tstamm) make this optional, and rely on shim for yarn berry
try {
  const pkg = readBasePackage(__dirname);
  const pkgBinPath =
    Object.values(pkg.bin)[0] + (process.platform === "win32" ? ".exe" : "");
  copyFileSync(
    `${__dirname}-${process.platform}-${process.arch}/${pkgBinPath}`,
    `${__dirname}/${pkgBinPath}`
  );
} catch (e) {
  basename(__dirname);
  process.stderr.write(`Failed to install the binary for ${basename(__dirname)}.
Platform: ${process.platform}
Architecture: ${process.arch}
Error: ${e}
`);
  process.exit(1);
}

function readBasePackage(npmBase) {
  const pkgPath = join(npmBase, "package.json");
  if (!existsSync(pkgPath)) {
    throw new Error(`invalid npm-base: ${pkgPath} not found`);
  }
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  if (!pkg.name) {
    throw new Error(`${pkgPath} is missing "name"`);
  }
  if (!pkg.bin) {
    throw new Error(`${pkgPath} is missing "bin"`);
  }
  if (Object.keys(pkg.bin).length !== 1) {
    throw new Error(`${pkgPath} is requires exactly one entry in "bin"`);
  }
  const binName = Object.keys(pkg.bin)[0];
  const binValue = Object.values(pkg.bin)[0];
  if (
    binName === undefined ||
    binValue === undefined ||
    binValue !== `bin/${binName}`
  ) {
    throw new Error(
      `${pkgPath} is missing an entry in "bin" in the form of {"foo": "bin/foo"}`
    );
  }
  return pkg;
}
