import { codegenInfo } from "@bufbuild/protobuf";
import { describe, expect, test } from "@jest/globals";

describe("safeIdentifier", () => {
  const { safeIdentifier } = codegenInfo;

  // prettier-ignore
  test("sanitized reserved identifiers", () => {
    expect<"break$">(safeIdentifier("break")).toBe("break$");
    expect<"case$">(safeIdentifier("case")).toBe("case$");
    expect<"catch$">(safeIdentifier("catch")).toBe("catch$");
    expect<"class$">(safeIdentifier("class")).toBe("class$");
    expect<"const$">(safeIdentifier("const")).toBe("const$");
    expect<"continue$">(safeIdentifier("continue")).toBe("continue$");
    expect<"debugger$">(safeIdentifier("debugger")).toBe("debugger$");
    expect<"default$">(safeIdentifier("default")).toBe("default$");
    expect<"delete$">(safeIdentifier("delete")).toBe("delete$");
  });

  // prettier-ignore
  test("does not modify other inputs which are not reserved identifiers", () => {
    expect<"constructor">(safeIdentifier("constructor")).toBe("constructor");
    expect<"toString">(safeIdentifier("toString")).toBe("toString");
    expect<"toJSON">(safeIdentifier("toJSON")).toBe("toJSON");
    expect<"valueOf">(safeIdentifier("valueOf")).toBe("valueOf");
  });
});

describe("safeObjectProperty", () => {
  const { safeObjectProperty } = codegenInfo;

  // prettier-ignore
  test("sanitizes reserved object property names", () => {
    expect<"constructor$">(safeObjectProperty("constructor")).toBe("constructor$");
    expect<"toString$">(safeObjectProperty("toString")).toBe("toString$");
    expect<"toJSON$">(safeObjectProperty("toJSON")).toBe("toJSON$");
    expect<"valueOf$">(safeObjectProperty("valueOf")).toBe("valueOf$");
  });

  // prettier-ignore
  test("does not modify other inputs which are not reserved object properties", () => {
    expect<"break">(safeObjectProperty("break")).toBe("break");
    expect<"case">(safeObjectProperty("case")).toBe("case");
    expect<"catch">(safeObjectProperty("catch")).toBe("catch");
    expect<"class">(safeObjectProperty("class")).toBe("class");
    expect<"const">(safeObjectProperty("const")).toBe("const");
    expect<"continue">(safeObjectProperty("continue")).toBe("continue");
    expect<"debugger">(safeObjectProperty("debugger")).toBe("debugger");
    expect<"default">(safeObjectProperty("default")).toBe("default");
    expect<"delete">(safeObjectProperty("delete")).toBe("delete");
  });
});
