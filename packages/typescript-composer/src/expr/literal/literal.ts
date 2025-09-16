import type { UnknownNodeInput } from "../../plumbing.js";
import { ArrayLiteral, type ArrayLiteralInput } from "./array.js";
import { BigIntLiteral } from "./bigint.js";
import { BooleanLiteral } from "./boolean.js";
import { NumberLiteral } from "./number.js";
import { StringLiteral } from "./string.js";

export type Literal =
  | ArrayLiteral
  | BigIntLiteral
  | BooleanLiteral
  | NumberLiteral
  | StringLiteral;

export function literal(input: LiteralInput): Literal {
  if (isLiteral(input)) return input;
  if (ArrayLiteral.isArrayLiteralInput(input))
    return ArrayLiteral.arrayLiteral(...input);
  if (BooleanLiteral.isBooleanLiteralInput(input))
    return BooleanLiteral.booleanLiteral(input);
  if (BigIntLiteral.isBigIntLiteralInput(input))
    return BigIntLiteral.bigIntLiteral(input);
  if (NumberLiteral.isNumberLiteralInput(input))
    return NumberLiteral.numberLiteral(input);
  return StringLiteral.stringLiteral(input);
}

export function isLiteral(input: UnknownNodeInput): input is Literal {
  return (
    ArrayLiteral.isArrayLiteral(input) ||
    BooleanLiteral.isBooleanLiteral(input) ||
    BigIntLiteral.isBigIntLiteral(input) ||
    NumberLiteral.isNumberLiteral(input) ||
    StringLiteral.isStringLiteral(input)
  );
}

export function isLiteralInput(input: UnknownNodeInput): input is LiteralInput {
  return (
    isLiteral(input) ||
    ArrayLiteral.isArrayLiteralInput(input) ||
    BooleanLiteral.isBooleanLiteralInput(input) ||
    BigIntLiteral.isBigIntLiteralInput(input) ||
    NumberLiteral.isNumberLiteralInput(input) ||
    StringLiteral.isStringLiteralInput(input)
  );
}

export type RawLiteralInput =
  | ArrayLiteralInput
  | boolean
  | bigint
  | number
  | string;

export type LiteralInput = RawLiteralInput | Literal;

export const LiteralInput = { literal, isLiteral, isLiteralInput };
export * from "./array.js";
export * from "./bigint.js";
export * from "./boolean.js";
export * from "./number.js";
export * from "./string.js";
