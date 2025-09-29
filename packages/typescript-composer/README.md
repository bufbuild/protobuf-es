# @bufbuild/typescript-composer

TypeScript Composer is a library for constructing, transforming, and emitting abstract and
partially-abstract TypeScript syntax trees.

## Explicit Tree Construction

On one end of the spectrum, you can construct entirely explicit abstract syntax trees using the
provided functions:

```typescript
const funcDef = func(
  "wrap",
  [
    arg(id("text"), type("string")),
    arg(id("width"), numberLiteral(100)),
  ],
  (text, width) => {
    const lines = varDecl(
      id("lines"),
      type("string[]"),
      arrayLiteral(stringLiteral("")),
    );
    return block(
      varConst(lines),
      forOf(
        id("word"),
        call(access(text, "split"), stringLiteral(" ")),
        (word) => block(
          ifThen(
            binary(
              parens(
                binary(
                 binary(
                   access(
                     access(
                       ref(lines),
                       binary(
                         access(ref(lines), id("length")),
                         "-",
                         numberLiteral(1),
                       ),
                     ),
                     id("length"),
                   ),
                   "+",
                   access(word, id("length")),
                 ),
                 "+",
                 numberLiteral(1),
                ),
              ),
              ">",
              ref(width),
            ),
            block(call(access(ref(lines), id("push")), stringLiteral(""))),
          ),
          binary(
            access(
              ref(lines),
              binary(access(ref(lines), id("length")), "-", numberLiteral(1)),
            ),
            "+=",
            binary(stringLiteral(" "), "+", id("word")),
          ),
        ),
      ),
      ret(call(access(ref(lines), id("join")), stringLiteral("\n"))),
    );
  },
);
```

This tree emits:
```typescript
function wrap(text: string, width = 100) {
  const lines: string[] = [""];
  for (const word of text.split(" ")) {
    if ((lines[lines.length - 1].length + word.length + 1) > width) {
      lines.push("");
    }
    lines[lines.length - 1] += " " + word;
  }
  return lines.join("\n");
}
```

<details>
<summary>But in memory, the tree is preserved as a data structure, represented here in YAML (expand to view).</summary>

```yaml
kind: func
family: statement
id:
  family: expression
  kind: id
  id: wrap
args:
  - kind: arg
    family: statement
    id:
      family: expression
      kind: id
      id: text
    type:
      kind: type
      family: type
      id:
        family: expression
        kind: id
        id: string
  - kind: arg
    family: statement
    id:
      family: expression
      kind: id
      id: width
    type:
      kind: type
      family: type
      id:
        family: expression
        kind: id
        id: number
    value:
      kind: numberLiteral
      family: expression
      value: 100
body:
  kind: block
  family: statement
  parts:
    - kind: varDeclStmt
      family: statement
      keyword: const
      list:
        kind: varDeclList
        family: expression
        declarations:
          - kind: varDecl
            family: expression
            id:
              family: expression
              kind: id
              id: lines
            type:
              kind: type
              family: type
              id:
                family: expression
                kind: id
                id: 'string[]'
            value:
              kind: arrayLiteral
              family: expression
              values:
                - kind: stringLiteral
                  family: expression
                  value: ''
    - kind: forOf
      family: statement
      for:
        family: expression
        kind: id
        id: word
      of:
        family: expression
        kind: call
        target:
          family: expression
          kind: access
          base:
            family: expression
            kind: ref
            ref:
              kind: arg
              family: statement
              id:
                family: expression
                kind: id
                id: text
              type:
                kind: type
                family: type
                id:
                  family: expression
                  kind: id
                  id: string
          key:
            family: expression
            kind: id
            id: split
        args:
          - kind: stringLiteral
            family: expression
            value: ' '
      then:
        kind: block
        family: statement
        parts:
          - kind: ifThen
            family: statement
            if:
              family: expression
              kind: binary
              left:
                family: expression
                kind: parens
                value:
                  family: expression
                  kind: binary
                  left:
                    family: expression
                    kind: binary
                    left:
                      family: expression
                      kind: access
                      base:
                        family: expression
                        kind: access
                        base:
                          family: expression
                          kind: ref
                          ref:
                            kind: varDecl
                            family: expression
                            id:
                              family: expression
                              kind: id
                              id: lines
                            type:
                              kind: type
                              family: type
                              id:
                                family: expression
                                kind: id
                                id: 'string[]'
                            value:
                              kind: arrayLiteral
                              family: expression
                              values:
                                - kind: stringLiteral
                                  family: expression
                                  value: ''
                        key:
                          family: expression
                          kind: binary
                          left:
                            family: expression
                            kind: access
                            base:
                              family: expression
                              kind: ref
                              ref:
                                kind: varDecl
                                family: expression
                                id:
                                  family: expression
                                  kind: id
                                  id: lines
                                type:
                                  kind: type
                                  family: type
                                  id:
                                    family: expression
                                    kind: id
                                    id: 'string[]'
                                value:
                                  kind: arrayLiteral
                                  family: expression
                                  values:
                                    - kind: stringLiteral
                                      family: expression
                                      value: ''
                            key:
                              family: expression
                              kind: id
                              id: length
                          op: '-'
                          right:
                            kind: numberLiteral
                            family: expression
                            value: 1
                      key:
                        family: expression
                        kind: id
                        id: length
                    op: +
                    right:
                      family: expression
                      kind: access
                      base:
                        family: expression
                        kind: id
                        id: word
                      key:
                        family: expression
                        kind: id
                        id: length
                  op: +
                  right:
                    kind: numberLiteral
                    family: expression
                    value: 1
              op: '>'
              right:
                family: expression
                kind: ref
                ref:
                  kind: arg
                  family: statement
                  id:
                    family: expression
                    kind: id
                    id: width
                  type:
                    kind: type
                    family: type
                    id:
                      family: expression
                      kind: id
                      id: number
                  value:
                    kind: numberLiteral
                    family: expression
                    value: 100
            then:
              kind: block
              family: statement
              parts:
                - kind: exprStmt
                  family: statement
                  expr:
                    family: expression
                    kind: call
                    target:
                      family: expression
                      kind: access
                      base:
                        family: expression
                        kind: ref
                        ref:
                          kind: varDecl
                          family: expression
                          id:
                            family: expression
                            kind: id
                            id: lines
                          type:
                            kind: type
                            family: type
                            id:
                              family: expression
                              kind: id
                              id: 'string[]'
                          value:
                            kind: arrayLiteral
                            family: expression
                            values:
                              - kind: stringLiteral
                                family: expression
                                value: ''
                      key:
                        family: expression
                        kind: id
                        id: push
                    args:
                      - kind: stringLiteral
                        family: expression
                        value: ''
          - kind: exprStmt
            family: statement
            expr:
              family: expression
              kind: binary
              left:
                family: expression
                kind: access
                base:
                  family: expression
                  kind: ref
                  ref:
                    kind: varDecl
                    family: expression
                    id:
                      family: expression
                      kind: id
                      id: lines
                    type:
                      kind: type
                      family: type
                      id:
                        family: expression
                        kind: id
                        id: 'string[]'
                    value:
                      kind: arrayLiteral
                      family: expression
                      values:
                        - kind: stringLiteral
                          family: expression
                          value: ''
                key:
                  family: expression
                  kind: binary
                  left:
                    family: expression
                    kind: access
                    base:
                      family: expression
                      kind: ref
                      ref:
                        kind: varDecl
                        family: expression
                        id:
                          family: expression
                          kind: id
                          id: lines
                        type:
                          kind: type
                          family: type
                          id:
                            family: expression
                            kind: id
                            id: 'string[]'
                        value:
                          kind: arrayLiteral
                          family: expression
                          values:
                            - kind: stringLiteral
                              family: expression
                              value: ''
                    key:
                      family: expression
                      kind: id
                      id: length
                  op: '-'
                  right:
                    kind: numberLiteral
                    family: expression
                    value: 1
              op: +=
              right:
                family: expression
                kind: binary
                left:
                  kind: stringLiteral
                  family: expression
                  value: ' '
                op: +
                right:
                  family: expression
                  kind: id
                  id: word
    - family: statement
      kind: ret
      value:
        family: expression
        kind: call
        target:
          family: expression
          kind: access
          base:
            family: expression
            kind: ref
            ref:
              kind: varDecl
              family: expression
              id:
                family: expression
                kind: id
                id: lines
              type:
                kind: type
                family: type
                id:
                  family: expression
                  kind: id
                  id: 'string[]'
              value:
                kind: arrayLiteral
                family: expression
                values:
                  - kind: stringLiteral
                    family: expression
                    value: ''
          key:
            family: expression
            kind: id
            id: join
        args:
          - kind: stringLiteral
            family: expression
            value: |+
```
</details>

## Basic Node Type Inferences

But there are many inferences that can be made from the context in which you're constructing nodes
in the syntax tree.

Let's start with this (constant) variable declaration:

```typescript
const lines = varDecl(
  id("lines"),
  type("string[]"),
  arrayLiteral(stringLiteral("")),
);
```

The varDecl can infer that you want a string in the first position of the call to be treated as an
identifier, since it wouldn't be valid to have a string literal as an identifier. So `id("lines")`
becomes `"lines"`.

A string literal _can_ be a type expression, so we can't optimize there. However, for the value
expression, we can assume that an array is meant to be an array literal, and further that a string
within it is meant to be a string literal. So we can use:

```typescript
const lines = varDecl("lines", type("string[]"), [""]);
```

The definition of arguments for the function can be similarly optimized, and can even accept an
array of tuples in lieu of `arg()` calls which will generally save you having to import `arg` at
all.

```typescript
[["text", type("string")], ["width", 100]]
```

Now let's look at this phrase:

```typescript
binary(access(ref(lines), id("length")), "-", numberLiteral(1))
```

We already know this renders to `lines[lines.length - 1]` and boy is it ugly. Syntax nodes
have some handy features to clean this up. First, we can drop the `ref()` wrappers since we know
from context we only want to refer to the variable declaration. We can also drop the
`numberLiteral()` wrapper. Then, we can replace the `access()` wrapping with `.get()`, yielding:

```typescript
binary(lines.get(id("length")), "-", 1)
```

## Node Helper Methods

Finally, we can replace the binary wrapper with `.minus()`:

```typescript
lines.get(id("length")).minus(1)
```

## Dynamic Node Access

We do still need the `id()` wrapper here since a string literal would be perfectly reasonable in
this context. But there's one more shortcut. We can replace `.get(id("length"))` like so:

```typescript
lines.$length.minus(1)
```

Similarly, we can eliminate the `call()` wrapper with `.call()` in this phrase:

```typescript
call(access(ref(lines), id("push")), stringLiteral(""))
```

This yields:

```typescript
lines.$push.call("")
```

And we can shorten this sequence even further to:

```typescript
lines._push("")
```

In contexts where a `block(stmt1, stmt2, ...)` is expected, you can simply use an array:
`[stmt1, stmt2, ...]`. Or, if a block would consist of a single expression, you can just provide
the expression itself, and it will get wrapped in the block.

All these optimizations result in:

```typescript
const funcDef = func(
  "wrap",
  [
    ["text", type("string")],
    ["width", 100],
  ],
  (text, width) => {
    const lines = varDecl("lines", type("string[]"), [""]);
    return [
      varConst(lines),
      forOf("word", text._split(" "), (word) => [
        ifThen(
          parens(
            lines
              .get(lines.$length.minus(1)).$length
              .plus(word.$length)
              .plus(1),
          ).isGreaterThan(width),
          lines._push(""),
        ),
        lines.get(lines.$length.minus(1)).add(literal(" ").plus(id("word"))),
      ]),
      ret(lines._join("\n")),
    ];
  },
);
```

## Object-Style Node Definitions

But there's actually more we can do to avoid having to import as many specialized functions. For
example, `varConst(lines)` can become simply `{ const: lines }`. The end result requires fewer
imports, and it's also more readable:

```typescript
const funcDef = func(
  "wrap",
  [
    ["text", type("string")],
    ["width", 100],
  ],
  (text, width) => {
    const lines = varDecl("lines", { type: "string[]" }, [""]);
    return [
      { const: lines },
      {
        for: "word",
        of: text._split(" "),
        then: (word) => [
          {
            if: parens(
              lines
                .get(lines.$length.minus(1)).$length
                .plus(id("word").$length)
                .plus(1),
            ).isGreaterThan(width),
            then: lines._push(""),
          },
          lines.get(lines.$length.minus(1)).add(literal(" ").plus(id("word"))),
        ],
      },
      { return: lines._join("\n") },
    ];
  },
);
```

## Code and Inline Template Functions

In many cases, however, we may not need a full abstract syntax tree, because we may only be
concerned with having enough of the tree structure to emit TypeScript, JavaScript, or type
declarations.

In these cases, we can use `code` templates to construct a partially-solidified syntax tree. Note
that nodes defined within the template are preserved in the tree.

```TypeScript
const funcDef = func(
  "wrap",
  [
    ["text", type("string")],
    ["width", 100],
  ],
  () => code`
    ${{ const: ["lines", { type: "string[]" }, [""]] }}
    for (const word of text.split(" ")) {
      if ((lines[lines.length - 1].length + word.length + 1) > width) {
        lines.push("");
      }
      lines[lines.length - 1] += " " + word;
    }
    return lines.join("\n");
  `,
);
```

There are a few important behaviors for these `code` blocks:

1. They must start with a newline character.
2. The whitespace following that first newline character is stripped from all lines; consequently,
   all lines are required to be prefixed with at least that amount of whitespace. (Except for a last
   line that consists only of whitespace, which will be stripped entirely.)
3. Parameters are assumed to be expressions unless they are alone on a line, in which case they are
   assumed to be statements. This is very important for a named statement like a function
   declaration where, when assumed to be an expression, it will be wrapped in a reference.
