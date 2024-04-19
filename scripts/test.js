import assert from "node:assert";

test("3.1.4", "latest");
test("2.0.0", "latest");
test("0.1.2", "latest");
test("23.24.25", "latest");

test("1.0.0-alpha.8", "alpha");
test("1.0.0-alpha-8", "alpha");
test("1.0.0-alpha8", "alpha");
test("1.0.0-alpha", "alpha");
test("23.24.25-alpha", "alpha");

test("1.0.0-beta.8", "beta");
test("1.0.0-beta-8", "beta");
test("1.0.0-beta8", "beta");
test("1.0.0-beta", "beta");
test("23.24.25-beta", "beta");

test("1.0.0-rc.8", "rc");
test("1.0.0-rc-8", "rc");
test("1.0.0-rc8", "rc");
test("1.0.0-rc", "rc");
test("23.24.25-rc", "rc");

function test(ver, tag) {
  const actual = determinePublishTag(ver);
  console.log(ver, "=", actual);
  assert(actual === tag);
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
