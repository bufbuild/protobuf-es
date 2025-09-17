import { code, typeExpr } from "../src/porcelain.js";

export function generate(kebabNodeName: string, wrappedType: string) {
  const upperNodeName = kebabNodeName
    .split("-")
    .map((s) => s.slice(0, 1).toUpperCase() + s.slice(1))
    .join("");
  const lowerNodeName = kebabNodeName
    .split("-")
    .map((s, i) => (i > 0 ? s.slice(0, 1).toUpperCase() + s.slice(1) : s))
    .join("");

  const inputType = typeExpr(wrappedType);

  return code`
    import assert from "node:assert";
    import { suite, test } from "node:test";
    import { ${lowerNodeName} } from "./${kebabNodeName}.js";

    void suite("is${upperNodeName}()", () => {
      void test("true", () => {
        const value = ${lowerNodeName}(__${inputType}__);

        assert(
          is${upperNodeName}(value),
          "is${upperNodeName}() must return true for ${upperNodeName} instance",
        );
      });
      void test("false", () => {
        assert(
          !is${upperNodeName}.({}),
          "is${upperNodeName}() must return false for empty object"
        );
      });
    });

    void suite("${lowerNodeName}()", () => {
      void test("idempotency", () => {
        const value = ${lowerNodeName}(__${inputType}__);

        assert.equal(
          ${lowerNodeName}(value),
          value,
          "${lowerNodeName}() must be idempotent",
        );
      });
    });

    void suite("print", () => {
      void test("barebones", () => {
        const value = ${lowerNodeName}(__${inputType}__);

        assert.equal(
          ${lowerNodeName}.toString(),
          "__expected_output__",
          "A barebones ${upperNodeName} instance must print correctly",
        );
      });
    });`.toString();
}
