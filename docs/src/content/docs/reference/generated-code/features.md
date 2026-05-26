---
title: Generated features
---

Some Protobuf features generate specialized TypeScript shapes instead of simple scalar, message, enum, repeated, or map fields.

## Oneofs

Oneofs become discriminated unions.

```protobuf
oneof result {
  int32 number = 1;
  string error = 2;
}
```

```typescript
result:
  | { case: "number"; value: number }
  | { case: "error"; value: string }
  | { case: undefined; value?: undefined };
```

New messages created with `create()` initialize unset oneofs to `{ case: undefined }`.

```typescript
switch (user.result.case) {
  case "number":
    user.result.value; // number
    break;
  case "error":
    user.result.value; // string
    break;
}
```

This representation requires `strictNullChecks`, which is enabled by TypeScript's `strict` option.

## Proto2 groups

Groups are deprecated in proto2, but Protobuf-ES supports them.

```protobuf
optional group MyGroup = 1 {
  optional int32 int32_field = 1;
}
```

The generated code includes a property and a nested message type such as `User_MyGroup`.

## Proto2 required fields

Proto2 `required` fields are validated when serializing a message, not while constructing or parsing one.

With Protobuf-ES v2, scalar and enum `required` fields are no longer generated as optional properties. Message fields keep their previous behavior.

> [!CAUTION]
>
> `required` is a legacy feature. The official Protobuf language guide says not to use it in new schemas.

## Proto3 optional fields

Proto3 `optional` fields enable presence tracking for scalar and enum fields.

```protobuf
optional bool active = 3;
```

```typescript
active?: boolean | undefined;
```

See [Working with messages](/guides/messages/) for presence tracking at runtime.

## Extensions

Extensions become typed extension descriptors. For runtime usage, see [Extensions](/guides/extensions/).

```protobuf
syntax = "proto2";

message User {
  extensions 100 to 200;
}

extend User {
  optional uint32 age = 100;
}
```

```typescript
export const age: GenExtension<User, number> = extDesc(/* ... */);
```

Extensions are also the foundation for [custom options](/reference/reflection/custom-options/).

## Services

Services generate schemas only:

```protobuf
service UserService {
  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);
}
```

```typescript
export declare const UserService: GenService<{
  createUser: {
    methodKind: "unary";
    input: typeof CreateUserRequestSchema;
    output: typeof CreateUserResponseSchema;
  };
}>;
```

Protobuf-ES does not implement RPC transports itself. Libraries such as [connect-es](https://github.com/connectrpc/connect-es) use these typed service schemas.

## Field names

Generated property names use Protobuf's standard lower-camel JSON name conversion, even if the source field uses `snake_case`. Names that are reserved in ECMAScript or conflict with built-in properties are escaped by appending `$`.

## Nested types

Nested message and enum names are joined with underscores, similar to the Go implementation. The nested enum `User.Type` becomes `User_Type` in generated code.

## Comments

Comments in `.proto` files are carried over as JSDoc comments in generated output, including license headers, field comments, service comments, and deprecation markers.

```typescript
/**
 * This field is deprecated
 *
 * @generated from field: string deprecated_field = 1 [deprecated = true];
 * @deprecated
 */
deprecatedField: string;
```

## Packages

ECMAScript does not have Protobuf-style namespaces, so package declarations are mostly ignored in generated identifiers. They remain visible in descriptors and fully qualified type names.
