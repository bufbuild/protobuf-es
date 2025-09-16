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

    import { ${upperNodeName} } from "./${kebabNodeName}.js";

    void suite("${upperNodeName}.is()", () => {
      void test("true", () => {
        const value = ${lowerNodeName}(__${inputType}__);

        assert(
          ${upperNodeName}.is(value),
          "${upperNodeName}.is() must return true for ${upperNodeName} instance",
        );
      });
      void test("false", () => {
        assert(
          !${upperNodeName}.is({}),
          "${upperNodeName}.is() must return false for empty object"
        );
      });
    });

    void suite("${upperNodeName}.marshal()", () => {
      void test("idempotency", () => {
        const value = ${lowerNodeName}(__${inputType}__);

        assert.equal(
          ${upperNodeName}.marshal(value),
          value,
          "${upperNodeName}.marshal() must be idempotent",
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
