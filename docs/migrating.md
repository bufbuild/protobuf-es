Migrating to Protobuf-ES
========================

The following guides show the changes you'll need to switch your existing code base 
[from `protobuf-javascript`](#from-protobuf-javascript) or [from `protobuf-ts`](#from-protobuf-ts) 
to Protobuf-ES.


# From protobuf-javascript

With `protobuf-javascript`, we mean the official implementation hosted at
[github.com/protocolbuffers/protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript), 
consisting of the code generator `protoc-gen-js` and the runtime library [`google-protobuf`](https://www.npmjs.com/package/google-protobuf).

Unfortunately, the code it generates feels a bit awkward to use, because it uses getter / 
setter methods instead of [plain properties](https://github.com/protocolbuffers/protobuf/issues/2107).
And if you dig a bit deeper, you'll notice it [does not implement the JSON format](https://github.com/protocolbuffers/protobuf/issues/4540),
[does not support TypeScript](https://github.com/protocolbuffers/protobuf/pull/9412), 
[does not have any reflection capabilities](https://github.com/protocolbuffers/protobuf/issues/1711),
[does not use a standard module system](https://github.com/protocolbuffers/protobuf/issues/8389), 
and produces rather [large bundles](https://github.com/bufbuild/protobuf-es/tree/main/packages/bench-codesize)
for the web. 

The following steps show the changes needed to migrate:


### Generating code

Assuming you have installed [`protoc-gen-es`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoc-gen-es),
change your compiler invocation as follows: 

```diff
- protoc -I . helloworld.proto --js_out . -js_opt import_style=commonjs,binary
+ protoc -I . helloworld.proto --es_out .
```

Note that the output uses [ECMAScript modules](https://nodejs.org/api/esm.html#introduction), 
the official standard for JavaScript. 


### Field access

Singular scalar fields like `string foo` and message fields like `Example bar` become
[plain properties](./generated_code.md#field-names):

```diff
let message = new Example();
- message.setFoo("baz");
- message.setBar(message);
+ message.foo = "baz";
+ message.bar = message;
```


### Optional fields

Optional fields like `optional string value` simply become optional properties:

```diff
- message.getValue(); // string - might be the default value ""
- if (message.hasValue()) {
-   message.getValue(); // string
- }
+ message.value; // string | undefined
```

### Well-known types

Update your import paths for well-known types as follows:

```diff
- import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
+ import { Timestamp } from "@bufbuild/protobuf";
```

```diff
// google.protobuf.Timestamp

- let ts = new Timestamp();
- ts.fromDate(someDateObject);
+ let ts = Timestamp.fromDate(someDateObject);
```

```diff
// google.protobuf.Any

declare var example: Example;

- let any = new Any();
- any.pack(example.serializeBinary(), "Example");
- any.unpack((packed) => Timestamp.deserializeBinary(packed), "Example");
+ let any = Any.pack(example);
+ any.unpackTo(example);
```


### Wrapper fields

Fields using wrapper messages from [`google/protobuf/wrappers.proto`](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)
simply become optional properties. For a field `google.protobuf.BoolValue tristate`: 

```diff
- let value = new BoolValue();
- value.setValue(true);
- message.setTristrate(value);
+ message.tristate = true;

- message.getTristate()?.value;
+ messsage.tristate; // boolean | undefined
```

### Map fields

Where protobuf-javascript uses [goog.collections.map](https://google.github.io/closure-library/api/goog.collections.maps.html), 
we use [plain objects](./generated_code.md#map-fields).  
For a field `map<string, int32> map_field`, map access changes as follows:

```diff
// setting a value:
- message.getMapField().set("a", 123);
+ message.mapField["a"] = 123;

// retrieving a value:
- message.getMapField().get("a"); // number | undefined
+ message.mapField["a"]; // number | undefined

// clearing all values:
- message.clearMapField();
+ message.mapField = {};
```

### Repeated fields

For a field `repeated string values`, array access changes as follows:

```diff
// accessing the array:
- message.getValuesList();
+ message.values;

// replacing the array:
- message.setValuesList(["a", "b", "c"]);
+ message.values = ["a", "b", "c"];

// adding a value:
- message.addValues("a");
- message.addValues("b");
+ message.values.push("a", "b");

// clearing all values:
- message.clearValues();
+ message.values = [];
```


### Oneof groups

Where protobuf-javascript uses getters, has'ers, and a case enumeration, we use an 
[algebraic data type ](./generated_code.md#oneof-groups)
for oneof groups. For the following definition:
```protobuf
message Example {
  oneof result {
    Example a = 1;
    string b = 2;
  }
}
```

Narrowing down the selected field correctly becomes much less cumbersome, 
because the type system is now aware of the oneof group:

```diff
- switch (message.getResultCase()) {
-   case Example.ResultCase.A:
-     let a = message.getA(); // undefined | Example
-     if (a !== undefined) {
-         a; // Example
-     }
-     break;
-   // ...
- }
+ switch (message.result.case) {
+   case "a":
+     message.result.value; // Example
+     break;
+   // ...
+ }
```

```diff
// selecting a field:
- message.setB("foo");
+ message.result = { case: "b", value: "foo" };

// clearing the selected field:
- message.clearA();
- message.clearB();
+ message.result = { case: undefined };
```


### Message constructors

Protobuf-ES adds an initializer argument to constructors. Using it is optional:

```diff
- let message = new Example();
- message.setFoo("baz");
- message.setBar(true);
+ let message = new Example({
+   foo: "baz",
+   bar: true,
+ });
```


### Serialization

Using the binary format is a simple change:

```diff
let message = new Example();
- let bytes = message.serializeBinary();
+ let bytes = message.toBinary();
- message = Example.deserializeBinary(bytes);
+ message = Example.fromBinary(bytes);
```

Note that protobuf-javascript does _not_ implement the JSON format. Messages have
a `toObject()` method that returns a plain object, but it is very different
from the canonical [JSON mapping](https://developers.google.com/protocol-buffers/docs/proto3#json).


### Enumerations

We drop prefixes from [enum values](./generated_code.md#enumerations).
An enum definition like `enum Foo { FOO_BAR = 0; FOO_BAZ = 1; }` becomes:

```diff
- MyEnum.MY_ENUM_FOO
+ MyEnum.FOO
```



### toObject()

Protobuf-ES does not provide a [`toObject()`](https://github.com/protocolbuffers/protobuf/issues/6955) 
method, because the messages it generates already are rather simple objects.

```diff
- example.toObject()
+ example
Object.keys(example); // ["foo", "bar"]
```

Note that you can use `toJson()` to convert to an object that matches the JSON 
representation.


# From protobuf-ts

[`protobuf-ts`](https://github.com/timostamm/protobuf-ts) is an open source implementation
of protocol buffers focused on TypeScript. If you are familiar with it, you will probably
recognize many concepts from `protobuf-ts` in Protobuf-ES. To some degree, that is because
many bits are from the same author, but also because they have proven themselves.

So why add another implementation? `protobuf-ts` comes with several RPC implementations,
uses interfaces for messages (which is nice, but also has some downsides), and is married
to the TypeScript compiler API to generate code, so it is not straight-forward to write
plugins based on it. You can think of Protobuf-ES as a refined version of `protobuf-ts`,
that is suitable as a foundation for other projects to build upon.

The following steps show the changes needed to migrate:

### Generating code

Assuming you have installed [`protoc-gen-es`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoc-gen-es),
change your compiler invocation as follows:

```diff
- protoc -I . helloworld.proto --ts_out . -ts_opt long_type_bigint,output_javascript
+ protoc -I . helloworld.proto --es_out .
```


### Well-known types

With `protobuf-ts` you are always using locally generated versions of well-known types. 
With Protobuf-ES, you import them from `@bufbuild/protobuf`:

```diff
- import { Timestamp } from "./google/protobuf/timestamp_pb";
+ import { Timestamp } from "@bufbuild/protobuf";
```

There are slight API changes, mostly because Protobuf-ES has instance methods:

```diff
// google.protobuf.Any

declare var message: Example;
declare var any: Any;

- any = Any.pack(message, Example);
+ any = Any.pack(message);

- Any.contains(any, Example);
+ any.is(Example);

- message = Any.unpack(any, Example);
+ any.unpackTo(message);
```

```diff
// google.protobuf.Timestamp

declare var someDate: Date;
let ts = Timestamp.fromDate(someDate);
- someDate = Timestamp.toDate(ts);
+ someDate = ts.toDate();
```



### Wrapper fields

Fields using wrapper messages from [`google/protobuf/wrappers.proto`](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/wrappers.proto)
simply become optional properties. For a field `google.protobuf.BoolValue tristate`:

```diff
- message.triState = BoolValue.create(true);
+ message.tristate = true;

- message.tristate?.value;
+ messsage.tristate; // boolean | undefined
```


### Oneof groups

TODO


### Serialization

```diff
// serialize to the binary format
- Example.toBinary(message);
+ message.toBinary();

// serialize to JSON
- Example.toJson(message);
+ message.toJson();

// unchanged
Example.fromBinary(); 
Example.fromJson();
```


### Message constructors

```diff
- let message = Example.create({ foo: "baz" });
+ let message = new Example({ foo: "baz" });
```


### Cloning

```diff
declare var message: Example;
- let clone = Example.clone(message);
+ let clone = message.clone();
```


### Message type guards

```diff
- Example.is(message);
+ message instanceof Example;
```

Note that `instanceof` has much better performance characteristics than `is()`.
For that reason, we do not provide an equivalent to `isAssignable()`.


### Reflection

```diff
- for (let field of Example.fields)
+ for (let field of Example.fields.byNumber())
```

### Dynamic messages

```diff
- const Example = new MessageType("Example", [
+ const Example = proto3.makeMessageType("Example", [
  { no: 1, name: "foo", kind: "scalar", T: ScalarType.STRING },
]);
```

Note that the type of message and enum fields does not need to be deferred:

```diff
- { no: 1, name: "foo", kind: "message", T: () => OtherMessage },
+ { no: 1, name: "foo", kind: "message", T: OtherMessage },
```

In case a message refers to itself, the entire field list can be deferred:

```diff
- [{ no: 1, name: "foo", kind: "message", T: Example } ]
+ () => [{ no: 1, name: "foo", kind: "message", T: Example } ]
```

