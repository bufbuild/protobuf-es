## Behavior

- For code changes, make the MINIMAL change that satisfies the request. If you believe an optimization, refactor, or abstraction is warranted, make the minimal change first, then offer to make the larger change when you're done.
- Never state an unverified result or mechanism in the declarative voice. Tag it inline: "unverified", "hypothesis".

## Code

Rules for any code written.

- Every exported symbol gets a doc comment: functions, types, consts, classes.
- Avoid magic numbers and strings by extracting recurring or meaningful values into named constants or enums. Derive the constant when reasonable.
- Use inline comments to provide additional context that is not obvious from the code itself.
- For libraries, bundle size is extremely important, so treat added code as a cost the change must earn.
- Never edit generated `*_pb.ts` files; change the generator or the protos and run `npm run all`.

## Unit Tests

- Write the smallest test that would fail if the behavior broke.
- One test per behavior; merge tests that share setup and differ only in assertions.
- Do not modify or remove existing tests. Stop and ask the user instead.
- For `node:test`:
  - use `assert.strictEqual(x, y)` / `assert.deepStrictEqual(x, y)` for equality checks.
  - use `assert.notStrictEqual(x, y)` / `assert.notDeepStrictEqual(x, y)` for inequality checks, unless type narrowing is required, in which case use `assert.ok(x !== y)`, e.g. `x !== undefined`, `x !== null`, narrowing a union.
  - use `assert.ok()` for booleans.
  - Use the test framework's built-ins (timeouts, `t.signal`, `t.after`, fixtures) before writing helpers.

## Before opening a pull request

- Run `npm run all`; it must pass, and commit any files it changes.
- Review the full diff in a fresh context (a new session or subagent, without your notes from this session). Check that:
  - every change is needed for the request, and nothing unrelated is included
  - public API and behavior stay backward compatible
  - new code is worth its bundle size
  - tests would fail if the change were broken
- Fix what the review finds, run `npm run all` again and commit any files it changes, then tell the user what was checked and what could not be verified.
