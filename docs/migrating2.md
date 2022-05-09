Migrating to Protobuf-ES
========================

The following guides show the changes you'll need to switch your existing code base 
from [`protobuf-javascript`](#from-protobuf-javascript) to Protobuf-ES.


## From protobuf-javascript

With `protobuf-javascript`, we mean the official implementation hosted at
[github.com/protocolbuffers/protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript), 
consisting of the code generator `protoc-gen-js` and the runtime library [`google-protobuf`](https://www.npmjs.com/package/google-protobuf).

### Comparison

Unfortunately, the code it generates feels a bit awkward to use, because it uses getter /
setter methods instead of [plain properties](https://github.com/protocolbuffers/protobuf/issues/2107).
And if you dig a bit deeper, you'll notice it [does not implement the JSON format](https://github.com/protocolbuffers/protobuf/issues/4540),
[does not support TypeScript](https://github.com/protocolbuffers/protobuf/pull/9412),
[does not have any reflection capabilities](https://github.com/protocolbuffers/protobuf/issues/1711),
[does not use a standard module system](https://github.com/protocolbuffers/protobuf/issues/8389),
and produces rather [large bundles](https://github.com/bufbuild/protobuf-es/tree/main/packages/bench-codesize)
for the web.



### Migrating

1. **Generating code**  
    Assuming you have installed [`protoc-gen-es`](https://github.com/bufbuild/protobuf-es/tree/main/packages/protoc-gen-es),
    change your compiler invocation as follows: 
    
    ```diff
    - protoc -I . helloworld.proto --js_out . -js_opt=import_style=commonjs,binary
    + protoc -I . helloworld.proto --es_out .
    ```
    Note that the output uses [ECMAScript modules](https://nodejs.org/api/esm.html#introduction), 
    the official standard for JavaScript.  

2. **Field access**  
   Singular scalar fields like `string foo` and message fields like `Example bar` become
   [plain properties](./generated_code.md#field-names):

   ```diff
   let message = new Example();
   - message.setFoo("baz");
   - message.setBar(message);
   + message.foo = "baz";
   + message.bar = message;
   ```

3. **Optional fields**  
   Optional fields like `optional string value` simply become optional properties:
    
    ```diff
    - message.getValue(); // string - might be the default value ""
    - if (message.hasValue()) {
    -   message.getValue(); // string
    - }
    + message.value; // string | undefined
    ```

4. **Wrapper fields**  
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

5. **Map fields**  
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

6. **Repeated fields**  
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

7. **Oneof groups**  
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


8. **Message constructors**  
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

9. **Serialization**  
    
    Using the binary format is a simple change:
    
    ```diff
    let message = new Example();
    - let bytes = message.serializeBinary();
    + let bytes = message.toBinary();
    - message = Example.deserializeBinary(bytes);
    + message = Example.fromBinary(bytes);
    ```
    
    
10. **Enumerations**
    
    We drop prefixes from [enum values](./generated_code.md#enumerations).
    An enum definition like `enum Foo { FOO_BAR = 0; FOO_BAZ = 1; }` becomes:
    
    ```diff
    - MyEnum.MY_ENUM_FOO
    + MyEnum.FOO
    ```

11. **toObject()**
    
    Protobuf-ES does not provide a [`toObject()`](https://github.com/protocolbuffers/protobuf/issues/6955) 
    method, because the messages it generates already are rather simple objects.
    
    ```diff
    - example.toObject()
    + example
    Object.keys(example); // ["foo", "bar"]
    ```
    
    Note that you can use `toJson()` to convert to an object that matches the JSON 
    representation.

