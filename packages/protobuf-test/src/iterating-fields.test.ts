import type { AnyMessage } from "@bufbuild/protobuf";
import { Example } from "./gen/ts/extra/example_pb";

/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions */

describe("iterating fields", function () {
  test("works as expected", function () {
    const r = walkFields(
      new Example({
        foo: "abc",
        bar: true,
        baz: undefined,
      })
    );
    expect(r.length).toBe(3);
    expect(r[0]).toBe("field foo: abc");
    expect(r[1]).toBe("field bar: true");
    expect(r[2]).toBe("field baz: undefined");
  });
});

function walkFields(message: AnyMessage): string[] {
  const r: string[] = [];
  for (const fieldInfo of message.getType().fields.byNumber()) {
    const value = message[fieldInfo.localName];
    r.push(`field ${fieldInfo.localName}: ${value}`);
  }
  return r;
}
