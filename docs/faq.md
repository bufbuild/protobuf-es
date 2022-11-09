Frequently Asked Questions
========================

### Why not use string unions for Protobuf enumerations instead of TypeScript `enum`?

TypeScript's `enum` definitely has drawbacks. It requires an extra import, `console.log` loses the name, and they aren't compatible with plain JavaScript, so the generated objects are a bit odd. Admittedly, `{ species: "DOG" }` looks nicer than `{ species: Species.DOG }`, and past experience has shown that unions of `enum` don't work out.

But `enums` also have some nice properties.  For example, the numeric values can actually be meaningful (`enum {ONE=1, TWO=2}` for a silly example), and they can be used for bitwise flags.  You can also attach comments to enum values, but not to elements of union types (see [this TypeScript issue](https://github.com/microsoft/TypeScript/issues/38106) for an example).

They also have a property that's important for backwards compatibility in Protobuf: Similar to enumerations in C# and C++, you can actually assign values other than the declared ones to an enum. For example, consider the following Protobuf file:

```proto
enum Species {
  UNSPECIFIED = 0; CAT = 1; DOG = 2;
}
message Animal {
  Species species = 1;
}
```

If we were to add `HAMSTER = 3;` to the enumeration, old generated code can still (de)serialize an `Animal` created by new generated code:

```ts
enum Species {
    UNSPECIFIED = 0, CAT = 1, DOG = 2
}
const hamster: Species = 3;
```

As a result, there is a range of Protobuf features we would not be able to model if we were using string union types for enumerations. Many users may not need those features, but this also has downstream impacts on frameworks such as [Connect-Web](https://github.com/bufbuild/connect-web), which couldn't be a fully featured replacement for gRPC-web if we didn't use TypeScript enums.

### Why `BigInt` for 64-bit integers?

TODO

### Why classes instead of interfaces?

TODO

### Why do imports have a `.js` extension in the generated TypeScript code?

TODO

### What are the intended use cases for `PartialMessage<T>` and `PlainMessage<T>`?
  
TODO
