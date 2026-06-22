---
title: Serialization
---

Protobuf-ES uses the same generated schema for wire-compatible binary and ProtoJSON, so both formats stay tied to the same types. Binary is the default for network traffic and storage: faster, preserves unknown fields, and handles schema evolution well. JSON is useful for debugging and for integrations that already speak JSON.

## Serialize and parse

Use `toBinary()` and `fromBinary()` for the Protobuf wire format:

```typescript
import { fromBinary, toBinary } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/example_pb";

declare let user: User;

const bytes: Uint8Array = toBinary(UserSchema, user);
user = fromBinary(UserSchema, bytes);
```

Use `toJson()` and `fromJson()` for ProtoJSON values:

```typescript
import { fromJson, toJson, type JsonValue } from "@bufbuild/protobuf";
import { type User, UserSchema } from "./gen/example_pb";

declare let user: User;

const json: JsonValue = toJson(UserSchema, user);
user = fromJson(UserSchema, json);
```

If you want strings instead of `JsonValue`, use `toJsonString()` and `fromJsonString()`. To parse into an existing message, use `mergeFromBinary()` or `mergeFromJson()`.

## Binary serialization options

`toBinary()` accepts one option:

- `writeUnknownFields?: boolean`: Include unknown fields in the serialized output. By default, unknown fields are preserved and written back out.

`fromBinary()` accepts:

- `readUnknownFields?: boolean`: Retain unknown fields while parsing. By default, unknown fields are kept.
- `recursionLimit?: number`: Maximum depth of nested messages to parse. Parsing fails with an error instead of exhausting the call stack when input nests deeper. Defaults to 100.

## JSON serialization options

`fromJson()` and `fromJsonString()` accept:

- `ignoreUnknownFields?: boolean`: Ignore unknown properties and unknown enum string values instead of rejecting them.
- `registry?: Registry`: Use a registry when parsing `google.protobuf.Any` and extensions from JSON.
- `recursionLimit?: number`: Maximum depth of nested messages to parse. Parsing fails with an error instead of exhausting the call stack when input nests deeper. Defaults to 100.

`toJson()` and `toJsonString()` accept:

- `alwaysEmitImplicit?: boolean`: Emit fields with implicit presence even when they hold default values.
- `enumAsInteger?: boolean`: Write enum numbers instead of enum names.
- `useProtoFieldName?: boolean`: Use original proto field names instead of `lowerCamelCase` JSON names.
- `registry?: Registry`: Use a registry for `google.protobuf.Any` and extensions.
- `prettySpaces?: number`: Only for `toJsonString()`. Passed through to `JSON.stringify()`.

See [Registries](/reference/reflection/registries/) for creating registries, [Any with registries](/examples/any-registry/) for a complete `Any` example, and [Plugin options](/reference/plugin-options/#json_typestrue) if you want generated JSON types.

## Duplicate JSON keys

A duplicate key is the same field provided more than once, by repeating a key, or by mixing its proto field name with its JSON name:

```json
{ "firstName": "Homer", "first_name": "Max" }
```

`fromJsonString()` and `mergeFromJsonString()` reject duplicate keys at any depth, including inside maps and `google.protobuf.Struct`. This matches the behavior of Protobuf implementations in other languages.

`fromJson()` and `mergeFromJson()` parse a value that has already gone through `JSON.parse()`, which silently keeps only the last value of any repeated key. They still reject a field set by both its proto name and its JSON name, but identical repeated keys are gone before parsing begins. Parse from a string when you need strict duplicate-key checking.

## Unknown fields

When Protobuf-ES parses binary data, unrecognized fields are stored on the message as `$unknown?: UnknownField[] | undefined`. When the message is serialized again, those fields are preserved by default.

Extensions use the same storage under the hood.

## Binary encoding

The public `BinaryReader` and `BinaryWriter` classes implement the low-level Protobuf wire format.

```typescript
import { BinaryWriter, WireType } from "@bufbuild/protobuf/wire";
import { fromBinary } from "@bufbuild/protobuf";
import { UserSchema } from "./gen/example_pb";

const bytes = new BinaryWriter()
  .tag(1, WireType.LengthDelimited)
  .string("Homer")
  .tag(3, WireType.Varint)
  .bool(true)
  .finish();

const user = fromBinary(UserSchema, bytes);
```

Use the message-level helpers unless you are working directly with the wire format.

## Text encoding

Protobuf-ES uses the WHATWG [Text Encoding API](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API) to convert UTF-8 to and from binary.

If your environment does not provide the API, call `configureTextEncoding()` from `@bufbuild/protobuf/wire` early during initialization and supply your own implementation.

## Base64 encoding

Use the helpers from `@bufbuild/protobuf/wire` when you need a portable Base64 representation of binary data:

```typescript
import { base64Encode, base64Decode } from "@bufbuild/protobuf/wire";

base64Encode(new Uint8Array([2, 4, 8, 16])); // "AgQIEA=="
base64Decode("AgQIEA=="); // Uint8Array(4)
```

## Size-delimited message streams

Protobuf-ES supports the size-delimited format used to write multiple messages to a stream.

A size-delimited message is a varint length prefix followed by that many bytes of a normal binary Protobuf message.

Serialize with `sizeDelimitedEncode()`:

```typescript
import { sizeDelimitedEncode } from "@bufbuild/protobuf/wire";
import { type User, UserSchema } from "./gen/example_pb";
import { createWriteStream } from "node:fs";

declare const user: User;

const stream = createWriteStream("delim.bin", { encoding: "binary" });
stream.write(sizeDelimitedEncode(UserSchema, user));
stream.end();
```

Parse a stream with `sizeDelimitedDecodeStream()`:

```typescript
import { sizeDelimitedDecodeStream } from "@bufbuild/protobuf/wire";
import { createReadStream } from "node:fs";
import { UserSchema } from "./gen/example_pb";

const stream = createReadStream("delim.bin");
for await (const user of sizeDelimitedDecodeStream(UserSchema, stream)) {
  console.log(user);
}
```

This format is compatible with the delimited message support in the C++, Java, Go, and other Protobuf runtimes.
