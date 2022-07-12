// Copyright 2020-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// @generated by protoc-gen-es v0.0.8 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/token.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, Timestamp, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message buf.alpha.registry.v1alpha1.Token
 */
export class Token extends Message<Token> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: google.protobuf.Timestamp create_time = 2;
   */
  createTime?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp expire_time = 3;
   */
  expireTime?: Timestamp;

  /**
   * @generated from field: string note = 4;
   */
  note = "";

  constructor(data?: PartialMessage<Token>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.Token";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "create_time", kind: "message", T: Timestamp },
    { no: 3, name: "expire_time", kind: "message", T: Timestamp },
    { no: 4, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Token {
    return new Token().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Token {
    return new Token().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Token {
    return new Token().fromJsonString(jsonString, options);
  }

  static equals(a: Token | PlainMessage<Token> | undefined, b: Token | PlainMessage<Token> | undefined): boolean {
    return proto3.util.equals(Token, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.CreateTokenRequest
 */
export class CreateTokenRequest extends Message<CreateTokenRequest> {
  /**
   * @generated from field: string note = 1;
   */
  note = "";

  /**
   * The time until which the token should be valid.
   * Must be in the future. May be null for no expiry.
   *
   * @generated from field: google.protobuf.Timestamp expire_time = 2;
   */
  expireTime?: Timestamp;

  constructor(data?: PartialMessage<CreateTokenRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.CreateTokenRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "expire_time", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateTokenRequest {
    return new CreateTokenRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateTokenRequest {
    return new CreateTokenRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateTokenRequest {
    return new CreateTokenRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateTokenRequest | PlainMessage<CreateTokenRequest> | undefined, b: CreateTokenRequest | PlainMessage<CreateTokenRequest> | undefined): boolean {
    return proto3.util.equals(CreateTokenRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.CreateTokenResponse
 */
export class CreateTokenResponse extends Message<CreateTokenResponse> {
  /**
   * The plaintext token to use for authentication.
   *
   * @generated from field: string token = 1;
   */
  token = "";

  constructor(data?: PartialMessage<CreateTokenResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.CreateTokenResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateTokenResponse {
    return new CreateTokenResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateTokenResponse {
    return new CreateTokenResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateTokenResponse {
    return new CreateTokenResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateTokenResponse | PlainMessage<CreateTokenResponse> | undefined, b: CreateTokenResponse | PlainMessage<CreateTokenResponse> | undefined): boolean {
    return proto3.util.equals(CreateTokenResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetTokenRequest
 */
export class GetTokenRequest extends Message<GetTokenRequest> {
  /**
   * @generated from field: string token_id = 1;
   */
  tokenId = "";

  constructor(data?: PartialMessage<GetTokenRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetTokenRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "token_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTokenRequest {
    return new GetTokenRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTokenRequest {
    return new GetTokenRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTokenRequest {
    return new GetTokenRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetTokenRequest | PlainMessage<GetTokenRequest> | undefined, b: GetTokenRequest | PlainMessage<GetTokenRequest> | undefined): boolean {
    return proto3.util.equals(GetTokenRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetTokenResponse
 */
export class GetTokenResponse extends Message<GetTokenResponse> {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.Token token = 1;
   */
  token?: Token;

  constructor(data?: PartialMessage<GetTokenResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetTokenResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "token", kind: "message", T: Token },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTokenResponse {
    return new GetTokenResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTokenResponse {
    return new GetTokenResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTokenResponse {
    return new GetTokenResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetTokenResponse | PlainMessage<GetTokenResponse> | undefined, b: GetTokenResponse | PlainMessage<GetTokenResponse> | undefined): boolean {
    return proto3.util.equals(GetTokenResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListTokensRequest
 */
export class ListTokensRequest extends Message<ListTokensRequest> {
  /**
   * @generated from field: uint32 page_size = 1;
   */
  pageSize = 0;

  /**
   * The first page is returned if this is empty.
   *
   * @generated from field: string page_token = 2;
   */
  pageToken = "";

  /**
   * @generated from field: bool reverse = 3;
   */
  reverse = false;

  constructor(data?: PartialMessage<ListTokensRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListTokensRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "page_size", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "reverse", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListTokensRequest {
    return new ListTokensRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListTokensRequest {
    return new ListTokensRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListTokensRequest {
    return new ListTokensRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListTokensRequest | PlainMessage<ListTokensRequest> | undefined, b: ListTokensRequest | PlainMessage<ListTokensRequest> | undefined): boolean {
    return proto3.util.equals(ListTokensRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListTokensResponse
 */
export class ListTokensResponse extends Message<ListTokensResponse> {
  /**
   * @generated from field: repeated buf.alpha.registry.v1alpha1.Token tokens = 1;
   */
  tokens: Token[] = [];

  /**
   * There are no more pages if this is empty.
   *
   * @generated from field: string next_page_token = 2;
   */
  nextPageToken = "";

  constructor(data?: PartialMessage<ListTokensResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListTokensResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "tokens", kind: "message", T: Token, repeated: true },
    { no: 2, name: "next_page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListTokensResponse {
    return new ListTokensResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListTokensResponse {
    return new ListTokensResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListTokensResponse {
    return new ListTokensResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListTokensResponse | PlainMessage<ListTokensResponse> | undefined, b: ListTokensResponse | PlainMessage<ListTokensResponse> | undefined): boolean {
    return proto3.util.equals(ListTokensResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.DeleteTokenRequest
 */
export class DeleteTokenRequest extends Message<DeleteTokenRequest> {
  /**
   * @generated from field: string token_id = 1;
   */
  tokenId = "";

  constructor(data?: PartialMessage<DeleteTokenRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.DeleteTokenRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "token_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteTokenRequest {
    return new DeleteTokenRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteTokenRequest {
    return new DeleteTokenRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteTokenRequest {
    return new DeleteTokenRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteTokenRequest | PlainMessage<DeleteTokenRequest> | undefined, b: DeleteTokenRequest | PlainMessage<DeleteTokenRequest> | undefined): boolean {
    return proto3.util.equals(DeleteTokenRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.DeleteTokenResponse
 */
export class DeleteTokenResponse extends Message<DeleteTokenResponse> {
  constructor(data?: PartialMessage<DeleteTokenResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.DeleteTokenResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteTokenResponse {
    return new DeleteTokenResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteTokenResponse {
    return new DeleteTokenResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteTokenResponse {
    return new DeleteTokenResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteTokenResponse | PlainMessage<DeleteTokenResponse> | undefined, b: DeleteTokenResponse | PlainMessage<DeleteTokenResponse> | undefined): boolean {
    return proto3.util.equals(DeleteTokenResponse, a, b);
  }
}

