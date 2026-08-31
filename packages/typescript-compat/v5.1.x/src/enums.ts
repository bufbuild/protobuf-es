/*
TypeScript 5.0 changed enum behavior: Where previous versions allowed assigning
any number value to an enum without error (open enum), TypeScript 5.0 and later
reject literals out of range.
*/

enum TestEnum {
  RED = 1,
  GREEN = 2,
  BLUE = 3
}

export function testAssign(): TestEnum {
  let t: TestEnum;
  // Enum value assigns
  t = TestEnum.RED;
  // Known literals assign
  t = 1;
  // @ts-expect-error - out-of-range literal rejects
  t = 4;
  // number value assigns
  t = 4 as number;
  return t;
}

export function testExhaust(t: TestEnum) {
  // Illustrative: t can be an out-of-range value, but the compiler is unaware.
  switch (t) {
    case TestEnum.RED:
      return true;
    case TestEnum.GREEN:
      return true;
    case TestEnum.BLUE:
      return true;
    default:
      return t satisfies never;
  }
}
