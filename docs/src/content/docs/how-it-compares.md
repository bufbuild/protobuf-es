---
title: How it compares
---

Public conformance is a good place to start. The [protobuf-conformance](https://github.com/bufbuild/protobuf-conformance) runner tests proto2, proto3, and the highest Edition each implementation advertises.

| Implementation | JavaScript and TypeScript | Standard Plugin | Supported Edition | Required tests | Recommended tests |
|---|:---:|:---:|:---:|:---:|:---:|
| [`protobuf-es`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf-es) | :heavy_check_mark: | :heavy_check_mark: | 2024 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/Protobuf-ES-required.svg" height="25" width="125" /></sub><br><sup>(0 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/Protobuf-ES-recommended.svg" height="25" width="125" /></sub><br><sup>(12 failures)</sup> |
| [`google-protobuf`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/google-protobuf) | :x: | :heavy_check_mark: | 2023 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/google-protobuf-required.svg" height="25" width="125" /></sub><br><sup>(1169 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/google-protobuf-recommended.svg" height="25" width="125" /></sub><br><sup>(389 failures)</sup> |
| [`protobuf.js`](https://github.com/bufbuild/protobuf-conformance/tree/main/impl/protobuf.js) | :heavy_check_mark: | :x: | 2023 | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/protobuf.js-required.svg" height="25" width="125" /></sub><br><sup>(1847 failures)</sup> | <sub><img src="https://raw.githubusercontent.com/bufbuild/protobuf-conformance/main/.github/genimg/protobuf.js-recommended.svg" height="25" width="125" /></sub><br><sup>(579 failures)</sup> |

Those numbers matter because they say something simple: Protobuf-ES does not make you choose between modern JavaScript ergonomics and actual Protobuf semantics.

`google-protobuf` implements the core surface, but its JavaScript API still reads like an older generation of generated code: `setName()`, `getNamesList()`, `getProjectsMap()`, `serializeBinary()`, no ES6 imports in the README, and a TypeScript story that comes from outside the project. Its own README also notes that there is staffing for only minimal support.

`protobuf.js` deserves credit for pushing JavaScript Protobuf in a friendlier direction. Protobuf-ES keeps that emphasis on usability and adds the parts teams eventually need: standard plugin flow, much stronger conformance, Editions 2024, and typed extensions.

| Capability | `protobuf-es` | `google-protobuf` | `protobuf.js` |
|---|---|---|---|
| Generated API | ✅ Plain objects plus schema functions | ❌ Getter and setter classes like `setName()` and `serializeBinary()` | ⚠️ Better than Google, but centered on `verify()`, `create()`, `fromObject()`, and `toObject()` |
| TypeScript output | ✅ Built in | ❌ Community-maintained typings and separate generators | ⚠️ Separate `pbts` step from generated JavaScript |
| Codegen flow | ✅ Standard `protoc` and Buf plugin | ⚠️ Standard `protoc` plugin, but JavaScript-first | ❌ `pbjs` and `pbts`, not a standard plugin |
| Module system | ✅ ESM by default, CommonJS when needed | ❌ README says ES6 imports are not implemented | ⚠️ Runtime supports CommonJS and AMD; conformance runner needs a wrapper for `static-module` plus `es6` |
| Editions | ✅ 2024 | ⚠️ 2023 in the public runner | ⚠️ Public runner says it cannot generate code for Editions |
| Proto2 extensions | ✅ Typed extensions and registry APIs | ⚠️ Supported with older extension APIs | ❌ Proto2 generation breaks on extensions with groups in the public runner |
| Oneofs | ✅ Discriminated unions | ❌ Getter maze plus `*Case()` enums | ⚠️ Virtual oneof field names during object conversion |
| Generated code readability | ✅ Typed `User` definitions and schema exports | ❌ Generated classes with list and map helper methods | ⚠️ Generated JavaScript plus separate `.d.ts` output |
| Tooling friction | ✅ One generator, one runtime | ⚠️ Extra TypeScript tooling and older JS conventions | ❌ `pbjs`, `pbts`, `skipLibChecks`, and custom wrapping in the runner |

## Code comparison

Tables describe the difference. Code shows it.

### Creating a message

**`google-protobuf`**

```javascript
const { User } = require("./gen/example_pb");

const user = new User();
user.setFirstName("Alice");
user.setLastName("Smith");
user.setActive(true);
user.setLocationsList(["NYC", "LDN"]);
user.getProjectsMap().set("atlas", "infra");

const bytes = user.serializeBinary();
const parsed = User.deserializeBinary(bytes);
parsed.getFirstName(); // "Alice"
parsed.getProjectsMap().get("atlas"); // "infra"
```

**`protobuf.js`**

```javascript
const { User } = require("./gen/example");

const errMsg = User.verify({ firstName: "Alice", lastName: "Smith", active: true });
if (errMsg) throw Error(errMsg);

const user = User.create({ firstName: "Alice", lastName: "Smith", active: true });
user.locations.push("NYC", "LDN");
user.projects["atlas"] = "infra";

const bytes = User.encode(user).finish();
const parsed = User.decode(bytes);
parsed.firstName; // "Alice"
parsed.projects["atlas"]; // "infra"
```

**`protobuf-es`**

```typescript
import { create, toBinary, fromBinary } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/example_pb";

const user: User = create(UserSchema, {
  firstName: "Alice",
  lastName: "Smith",
  active: true,
  locations: ["NYC", "LDN"],
  projects: { atlas: "infra" },
});

const bytes = toBinary(UserSchema, user);
const parsed = fromBinary(UserSchema, bytes);
parsed.firstName; // "Alice"
parsed.projects.atlas; // "infra"
```

### Oneofs

**`google-protobuf`**

```javascript
switch (msg.getResultCase()) {
  case Question.ResultCase.NUMBER:
    msg.getNumber();
    break;
  case Question.ResultCase.ERROR:
    msg.getError();
    break;
  case Question.ResultCase.RESULT_NOT_SET:
    break;
}
```

**`protobuf-es`**

```typescript
switch (msg.result.case) {
  case "number":
    msg.result.value; // number
    break;
  case "error":
    msg.result.value; // string
    break;
}
```

TypeScript narrows `msg.result.value` to the correct type in each branch. No enum import, no getter chain.

### Code generation toolchain

**`google-protobuf`** uses a standard `protoc` plugin, but only generates JavaScript. TypeScript types come from third-party generators or community `.d.ts` files.

**`protobuf.js`** uses its own CLI tools instead of a `protoc` plugin:

```shellsession
npx pbjs -t static-module -w es6 -o gen/example.js proto/example.proto
npx pbts -o gen/example.d.ts gen/example.js
```

**`protobuf-es`** is a standard plugin that works with both `protoc` and the Buf CLI:

```shellsession
npx buf generate
```

One command, one plugin, TypeScript output by default.

## Bundle size {#bundle-size}

`google-protobuf` does not support ES6 imports, which limits what modern bundlers can tree-shake. Protobuf-ES generates ESM by default and produces significantly smaller output.

From this repo's [bundle size comparison](https://github.com/bufbuild/protobuf-es/tree/main/packages/bundle-size):

| Scenario | `protobuf-es` | `google-protobuf` |
|---|---|---|
| 1 generated file | `15,803 b` compressed | `35,999 b` compressed |
| 32 generated files | `24,783 b` compressed | `75,520 b` compressed |

The gap grows as you import more generated files because `protobuf-es` shares runtime code more efficiently.

## Ready to try it?

[Getting started](/getting-started/) takes about five minutes.
