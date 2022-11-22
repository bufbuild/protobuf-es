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

### Why use `BigInt` to represent 64-bit integers?

TODO

### Why generate classes instead of interfaces?

This is definitely something we considered.  We are aware of the debates on whether JavaScript classes should be used and whether they're actually worthwhile.  We chose to generate classes for a few reasons:

- Protobuf messages and classes are very similar in how they represent data.  They are both encapsulating objects that contain properties that describe the overall entity.  A class is a great way to model this relationship.  The [official MDN documentation on classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes#why_classes) states:

  > In general, you should consider using classes when you want to create objects that store their own internal data and expose a lot of behavior.

  Which is exactly what our aim is when generating code from a Protobuf file.

- Our messages contain numerous additional functions such as constructing an object, serializing to and from JSON, serializing to and from binary data, and cloning.  Most of this functionality is reusable, so using inheritance with a `Message` super class is beneficial.

- We want the generated code to be approachable.  While the behavior of classes under the hood may be surprising as to how they're constructed and represented, they make for a very easy-to-read representation of a message.  The encapsulation they provide and some assurances that TypeScript provides on top of them make for a compelling argument to readability.

So, in summary, yes, we know that JavaScript is not an OOP language and classes were shoehorned in, but our use case seems to be the reason they were added.

To complement the above advantages of classes, there is also a list of disadvantages to using interfaces that we found counterproductive:

- How should they be generated?  As part of the current `protoc-gen-es` plugin?  In that case, generated code would include an additional interface alongside the class which could be confusing to users as to which one they should use.  

  If we provided an option to generate interfaces, then in addition to the above problem, we now have a plugin option that could be confusing.  We also are striving to limit the number of options in our plugin as we find that only makes the plugin less-approachable.
  
  If we made this a separate plugin, then it seems to *really* confuse the matter because now users have to configure another plugin.  And because of the way plugins work, the separate plugin would generate new files presumably named something like `msg_interface_pb.ts`.  If users want to refactor to use the generated interface, they have to change their import statement path.  If users want to use both, they need two separate imports now.  Granted, these all may seem inconsequential at first, but they add additional overhead with arguably little payoff.
  
All this being said, we know that some still would like an interface-like type that exposes only the properties of a message and is recursive for nested members.  As a result, we've exposed a helper type named `PlainMessage`, which will accomplish this.  It can be used as follows:

```typescript
import { PlainMessage } from "@bufbuild/protobuf";

import { FooMessage } from "protos/foo_pb.js";

const plainFoo: PlainMessage<FooMessage> = new FooMessage();
```

In the above code, `plainFoo` will be a type with only its fields and `oneOf` groups.  All methods will be omitted from the type.  Additionally, we also expose `PartialMessage` which serves the same purpose except that it makes all fields optional as well.  

### What are the intended use cases for `PartialMessage<T>` and `PlainMessage<T>`?
  
TODO

### Why do imports have a `.js` extension in the generated TypeScript code?

TODO

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
