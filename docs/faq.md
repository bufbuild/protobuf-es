Frequently Asked Questions
========================

### What features are implemented?

**Protobuf-ES** is intended to be a solid, modern alternative to existing Protobuf implementations for the JavaScript ecosystem.  It is the first project in this space to provide a comprehensive plugin framework and decouple the base types from RPC functionality.

Some additional features that set it apart from the others:

- ECMAScript module support
- First-class TypeScript support
- Generation of idiomatic JavaScript and TypeScript code.
- Generation of [much smaller bundles](https://github.com/bufbuild/protobuf-es/blob/main/packages/protobuf-bench)
- Implementation of all proto3 features, including the [canonical JSON format](https://developers.google.com/protocol-buffers/docs/proto3#json).
- Implementation of all proto2 features, except for extensions and the text format.  
- Usage of standard JavaScript APIs instead of the [Closure Library](http://googlecode.blogspot.com/2009/11/introducing-closure-tools.html)
- Compatibility is covered by the protocol buffers [conformance tests](https://github.com/bufbuild/protobuf-es/blob/main/packages/protobuf-conformance).
- Descriptor and reflection support

To learn more, have a look at a complete [code example](https://github.com/bufbuild/protobuf-es/tree/main/packages/protobuf-example), 
the documentation for the [generated code](https://github.com/bufbuild/protobuf-es/blob/main/docs/generated_code.md), 
and the documentation for the [runtime API](https://github.com/bufbuild/protobuf-es/blob/main/docs/runtime_api.md).


### Why not use string unions for Protobuf enumerations instead of TypeScript `enum`?

TypeScript's `enum` definitely has drawbacks. It requires an extra import, `console.log` loses the name, and they don't have a native equivalent in JavaScript. 
Admittedly, `{ species: "DOG" }` looks a bit more straight-forward than `{ species: Species.DOG }`.

But `enum`s also have some nice properties that union types don't provide.  For example, the numeric values can actually 
be meaningful (`enum {ONE=1, TWO=2}` for a silly example), and they can be used for bitwise flags.  
You can also attach comments and metadata to enum values, but not to elements of union types (see [this TypeScript issue](https://github.com/microsoft/TypeScript/issues/38106) for an example).

**Protobuf-ES** actually makes use of this ability and attaches metadata to the enum object in our generated code to 
implement the JSON format. This would not be possible with a union type.

TypeScript `enum`s also have a property that's important for backwards compatibility in Protobuf: Similar to enumerations in C# and C++, you can actually assign values other than the declared ones to an enum. For example, consider the following Protobuf file:

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

As a result, there is a range of Protobuf features we would not be able to model if we were using string union types for enumerations. Many users may not need those features, but this also has downstream impacts on frameworks such as [Connect-ES](https://github.com/bufbuild/connect-es), which couldn't be a fully featured replacement for gRPC-web if we didn't use TypeScript enums.

### Why aren't `enum` values generated in PascalCase?

We generate our `enum` values based on how they are written in the source Protobuf file.  The reason for this is that the [Protobuf JSON spec](https://developers.google.com/protocol-buffers/docs/proto3#json) requires that the name of the enum value be whatever is used in the Protobuf file and this makes it very easy to encode/decode JSON.

The [Buf style guide](https://docs.buf.build/best-practices/style-guide#enums) further says that `enum` values should be UPPER_SNAKE_CASE, which will result in your generated TypeScript `enum` values being in UPPER_SNAKE_CASE if you follow the style guide.

We do not provide an option to generate different cases for your `enum` values because we try to limit options to ones that we feel are important.  The more options there are, the less approachable the plugin becomes.  This seems to be more of a stylistic choice as even [TypeScript's own documentation](https://www.typescriptlang.org/docs/handbook/enums.html) uses various ways to name `enum` members.


### Why use `BigInt` to represent 64-bit integers?

The short answer is that they are the best way to represent the 64-bit numerical types allowable in Protobuf.  `BigInt` has [widespread browser support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#browser_compatibility) and for those environments where it is not supported, we fall back to a [string representation](https://github.com/bufbuild/protobuf-es/blob/main/docs/runtime_api.md#bigint-in-unsupported-environments).  

While it is true that an `int32`'s 2^32 size is not enough to represent a 64-bit value, Javascript's [`MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER#description) can safely represent integers between -(2^53 – 1) and 2^53 – 1.  However, this is obviously only effective if you can guarantee that no number in that field will ever exceed this range.  This could lead to subtle and potentially serious bugs, so the clear-cut usage of `BigInt` makes more sense.

### Why generate classes instead of interfaces?

This is definitely something we considered.  We are aware of the debates on whether JavaScript classes should be used and whether they're actually worthwhile.  We chose to generate classes instead of interfaces for a few reasons:

- Protobuf messages and classes are very similar in how they represent data.  They are both encapsulating objects that contain properties describing the overall entity.  A class is a great way to model this relationship.  The [official MDN documentation on classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes#why_classes) states:

  > In general, you should consider using classes when you want to create objects that store their own internal data and expose a lot of behavior.

  Which is exactly what our aim is when generating code from a Protobuf file.

- Our messages contain numerous additional functions such as constructing an object, serializing to and from JSON, serializing to and from binary data, and cloning.  Most of this functionality is reusable, so using inheritance with a `Message` super class is beneficial.  If we only generated interfaces, we would be unable to augment the generated code with this additional behavior.

- We want the generated code to be approachable.  While the behavior of classes under the hood may be surprising as to how they're constructed and represented, they make for a very easy-to-read representation of a message.  The encapsulation they provide and some assurances that TypeScript provides on top of them make for a compelling argument to readability.

So, in summary, yes, we know that some argue classes were shoehorned into the language, but our use case seems to be the reason they were added.

### OK, so why not generate *both* classes **and** interfaces?

This is also something we considered.  However, when analyzing the pros and cons, we realized that generating interfaces in addition to classes raised more questions than answers.  

One of the major questions was "how should they be generated?"  As part of the current `protoc-gen-es` plugin?  In that case, generated code would include an additional interface alongside the class which could be confusing to users as to which one they should use.  

  If we provided an option to generate interfaces, then in addition to the above problem, we now have a plugin option that could be confusing.  A new user attempting to configure their codebase to begin using the library would most likely not know whether they needed classes or interfaces until they actually started using the library.  If they decided they wanted the alternate option, they would need to conduct a pretty invasive refactoring of their code.
  
  If we made this a separate plugin, then it seems to *really* confuse the matter because now users have to configure another plugin and face the same uncertainty mentioned above.  And because of the way plugins work, the separate plugin would generate new files presumably named something like `msg_interface_pb.ts`.  If users want to use both classes and interfaces, they would now need two separate imports.  Granted, these all may seem inconsequential at first, but they add additional overhead with arguably little payoff.  In the end, we decided that simply generating classes provided the most benefits to the users.
  
All this being said, we know that some still would like an interface-like type that exposes only the properties of a message and is recursive for nested members.  As a result, we've exposed a helper type named `PlainMessage`, which will accomplish this.  It can be used as follows:

```typescript
import { PlainMessage } from "@bufbuild/protobuf";

import { FooMessage } from "protos/foo_pb.js";

const plainFoo: PlainMessage<FooMessage> = new FooMessage();
```

In the above code, `plainFoo` will be a type with only its fields and `oneOf` groups.  All methods will be omitted from the type.  Additionally, we also expose `PartialMessage` which serves the same purpose except that it makes all fields optional as well.  

### What are the intended use cases for `PartialMessage<T>` and `PlainMessage<T>`?
  
Great segue!  Our [docs](https://github.com/bufbuild/protobuf-es/blob/main/docs/runtime_api.md#advanced-typescript-types) provide a good explanation for their usage and example use cases.

### How does this compare to protoc's JavaScript generator?

[`js_generator.cc`](https://github.com/protocolbuffers/protobuf-javascript/blob/main/generator/js_generator.cc)
is rarely updated, and has fallen behind the quickly moving world of JavaScript.

For example:
- it does not support ECMAScript modules
- it cannot generate TypeScript (3rd party plugins are necessary)
- it does not support the [canonical JSON format](https://developers.google.com/protocol-buffers/docs/proto3#json)
- it does not carry over comments from your `.proto` files

Because of this, we want to provide a solid, modern alternative with Protobuf-ES.

The main differences of the generated code:
- we use plain properties for fields, where protoc uses getter and setter methods
- we implement the canonical JSON format
- we generate [much smaller bundles](packages/protobuf-bench)
- we rely on standard APIs instead of the [Closure Library](http://googlecode.blogspot.com/2009/11/introducing-closure-tools.html)
