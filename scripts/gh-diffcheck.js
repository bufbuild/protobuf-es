import {execSync} from "node:child_process";

if (gitUncommitted()) {
  process.stdout.write(
    "::error::Uncommitted changes found. Please make sure this branch is up to date, and run the command locally (for example `npx turbo format`). " +
    "Verify the changes are what you want and commit them.\n"
  );
  execSync("git --no-pager diff", {
    stdio: "inherit"
  });
}

/**
 * @returns {boolean}
 */
function gitUncommitted() {
  const out = execSync("git status --porcelain", {
    encoding: "utf-8",
  });
  return out.trim().length > 0;
}

