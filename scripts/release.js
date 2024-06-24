import {readdirSync, readFileSync} from "fs";
import {join} from "path";
import {existsSync} from "node:fs";
import {execSync} from "node:child_process";

const tag = determinePublishTag(findWorkspaceVersion("packages"));
const uncommitted = gitUncommitted();
if (uncommitted.length > 0) {
  throw new Error("Uncommitted changes found: \n" + uncommitted);
}
npmPublish();


/**
 *
 */
function npmPublish() {
  const command = `npm publish --tag ${tag}`
    + " --workspace packages/protobuf"
    + " --workspace packages/protoplugin"
    + " --workspace packages/protoc-gen-es";
  execSync(command, {
    stdio: "inherit"
  });
}

/**
 * @returns {string}
 */
function gitUncommitted() {
  const out = execSync("git status --short", {
    encoding: "utf-8",
  });
  if (out.trim().length === 0) {
    return "";
  }
  return out;
}


/**
 * @param {string} version
 * @returns {string}
 */
function determinePublishTag(version) {
  if (/^\d+\.\d+\.\d+$/.test(version)) {
    return "latest";
  } else if (/^\d+\.\d+\.\d+-alpha.*$/.test(version)) {
    return "alpha";
  } else if (/^\d+\.\d+\.\d+-beta.*$/.test(version)) {
    return "beta";
  } else if (/^\d+\.\d+\.\d+-rc.*$/.test(version)) {
    return "rc";
  } else {
    throw new Error(`Unable to determine publish tag from version ${version}`);
  }
}

/**
 * @param {string} packagesDir
 * @returns {string}
 */
function findWorkspaceVersion(packagesDir) {
  let version = undefined;
  for (const entry of readdirSync(packagesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    const path = join(packagesDir, entry.name, "package.json");
    if (existsSync(path)) {
      const pkg = JSON.parse(readFileSync(path, "utf-8"));
      if (pkg.private === true) {
        continue;
      }
      if (!pkg.version) {
        throw new Error(`${path} is missing "version"`);
      }
      if (version === undefined) {
        version = pkg.version;
      } else if (version !== pkg.version) {
        throw new Error(`${path} has unexpected version ${pkg.version}`);
      }
    }
  }
  if (version === undefined) {
    throw new Error(`unable to find workspace version`);
  }
  return version;
}
