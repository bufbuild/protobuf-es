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

// @generated by protoc-gen-es v0.1.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/user.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3, Timestamp} from "@bufbuild/protobuf";
import {OrganizationRole, ServerRole} from "./role_pb.js";

/**
 * @generated from enum buf.alpha.registry.v1alpha1.UserState
 */
export enum UserState {
  /**
   * @generated from enum value: USER_STATE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: USER_STATE_ACTIVE = 1;
   */
  ACTIVE = 1,

  /**
   * @generated from enum value: USER_STATE_DEACTIVATED = 2;
   */
  DEACTIVATED = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(UserState)
proto3.util.setEnumType(UserState, "buf.alpha.registry.v1alpha1.UserState", [
  { no: 0, name: "USER_STATE_UNSPECIFIED" },
  { no: 1, name: "USER_STATE_ACTIVE" },
  { no: 2, name: "USER_STATE_DEACTIVATED" },
]);

/**
 * @generated from message buf.alpha.registry.v1alpha1.User
 */
export class User extends Message<User> {
  /**
   * primary key, unique, immutable
   *
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * immutable
   *
   * @generated from field: google.protobuf.Timestamp create_time = 2;
   */
  createTime?: Timestamp;

  /**
   * mutable
   *
   * @generated from field: google.protobuf.Timestamp update_time = 3;
   */
  updateTime?: Timestamp;

  /**
   * unique, mutable
   *
   * @generated from field: string username = 4;
   */
  username = "";

  /**
   * mutable
   *
   * @generated from field: bool deactivated = 5;
   */
  deactivated = false;

  constructor(data?: PartialMessage<User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "create_time", kind: "message", T: Timestamp },
    { no: 3, name: "update_time", kind: "message", T: Timestamp },
    { no: 4, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "deactivated", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): User {
    return new User().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): User {
    return new User().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): User {
    return new User().fromJsonString(jsonString, options);
  }

  static equals(a: User | PlainMessage<User> | undefined, b: User | PlainMessage<User> | undefined): boolean {
    return proto3.util.equals(User, a, b);
  }
}

/**
 * TODO: #663 move this to organization service
 *
 * @generated from message buf.alpha.registry.v1alpha1.OrganizationUser
 */
export class OrganizationUser extends Message<OrganizationUser> {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.User user = 1;
   */
  user?: User;

  /**
   * The ID of the organization for which the role belongs to.
   *
   * @generated from field: string organization_id = 2;
   */
  organizationId = "";

  /**
   * The role that the user has in the organization above.
   *
   * @generated from field: buf.alpha.registry.v1alpha1.OrganizationRole organization_role = 3;
   */
  organizationRole = OrganizationRole.UNSPECIFIED;

  constructor(data?: PartialMessage<OrganizationUser>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.OrganizationUser";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: User },
    { no: 2, name: "organization_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "organization_role", kind: "enum", T: proto3.getEnumType(OrganizationRole) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): OrganizationUser {
    return new OrganizationUser().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): OrganizationUser {
    return new OrganizationUser().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): OrganizationUser {
    return new OrganizationUser().fromJsonString(jsonString, options);
  }

  static equals(a: OrganizationUser | PlainMessage<OrganizationUser> | undefined, b: OrganizationUser | PlainMessage<OrganizationUser> | undefined): boolean {
    return proto3.util.equals(OrganizationUser, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.CreateUserRequest
 */
export class CreateUserRequest extends Message<CreateUserRequest> {
  /**
   * @generated from field: string username = 1;
   */
  username = "";

  constructor(data?: PartialMessage<CreateUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.CreateUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateUserRequest {
    return new CreateUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateUserRequest {
    return new CreateUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateUserRequest {
    return new CreateUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateUserRequest | PlainMessage<CreateUserRequest> | undefined, b: CreateUserRequest | PlainMessage<CreateUserRequest> | undefined): boolean {
    return proto3.util.equals(CreateUserRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.CreateUserResponse
 */
export class CreateUserResponse extends Message<CreateUserResponse> {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.User user = 1;
   */
  user?: User;

  constructor(data?: PartialMessage<CreateUserResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.CreateUserResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateUserResponse {
    return new CreateUserResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateUserResponse {
    return new CreateUserResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateUserResponse {
    return new CreateUserResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateUserResponse | PlainMessage<CreateUserResponse> | undefined, b: CreateUserResponse | PlainMessage<CreateUserResponse> | undefined): boolean {
    return proto3.util.equals(CreateUserResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetUserRequest
 */
export class GetUserRequest extends Message<GetUserRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<GetUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetUserRequest {
    return new GetUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetUserRequest {
    return new GetUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetUserRequest {
    return new GetUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetUserRequest | PlainMessage<GetUserRequest> | undefined, b: GetUserRequest | PlainMessage<GetUserRequest> | undefined): boolean {
    return proto3.util.equals(GetUserRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetUserResponse
 */
export class GetUserResponse extends Message<GetUserResponse> {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.User user = 1;
   */
  user?: User;

  constructor(data?: PartialMessage<GetUserResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetUserResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetUserResponse {
    return new GetUserResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetUserResponse {
    return new GetUserResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetUserResponse {
    return new GetUserResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetUserResponse | PlainMessage<GetUserResponse> | undefined, b: GetUserResponse | PlainMessage<GetUserResponse> | undefined): boolean {
    return proto3.util.equals(GetUserResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetUserByUsernameRequest
 */
export class GetUserByUsernameRequest extends Message<GetUserByUsernameRequest> {
  /**
   * @generated from field: string username = 1;
   */
  username = "";

  constructor(data?: PartialMessage<GetUserByUsernameRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetUserByUsernameRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetUserByUsernameRequest {
    return new GetUserByUsernameRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetUserByUsernameRequest {
    return new GetUserByUsernameRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetUserByUsernameRequest {
    return new GetUserByUsernameRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetUserByUsernameRequest | PlainMessage<GetUserByUsernameRequest> | undefined, b: GetUserByUsernameRequest | PlainMessage<GetUserByUsernameRequest> | undefined): boolean {
    return proto3.util.equals(GetUserByUsernameRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetUserByUsernameResponse
 */
export class GetUserByUsernameResponse extends Message<GetUserByUsernameResponse> {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.User user = 1;
   */
  user?: User;

  constructor(data?: PartialMessage<GetUserByUsernameResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetUserByUsernameResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetUserByUsernameResponse {
    return new GetUserByUsernameResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetUserByUsernameResponse {
    return new GetUserByUsernameResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetUserByUsernameResponse {
    return new GetUserByUsernameResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetUserByUsernameResponse | PlainMessage<GetUserByUsernameResponse> | undefined, b: GetUserByUsernameResponse | PlainMessage<GetUserByUsernameResponse> | undefined): boolean {
    return proto3.util.equals(GetUserByUsernameResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListUsersRequest
 */
export class ListUsersRequest extends Message<ListUsersRequest> {
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

  /**
   * If the user_state_filter is unspecified, all users are included.
   *
   * @generated from field: buf.alpha.registry.v1alpha1.UserState user_state_filter = 4;
   */
  userStateFilter = UserState.UNSPECIFIED;

  constructor(data?: PartialMessage<ListUsersRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListUsersRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "page_size", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "reverse", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "user_state_filter", kind: "enum", T: proto3.getEnumType(UserState) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListUsersRequest {
    return new ListUsersRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListUsersRequest {
    return new ListUsersRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListUsersRequest {
    return new ListUsersRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListUsersRequest | PlainMessage<ListUsersRequest> | undefined, b: ListUsersRequest | PlainMessage<ListUsersRequest> | undefined): boolean {
    return proto3.util.equals(ListUsersRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListUsersResponse
 */
export class ListUsersResponse extends Message<ListUsersResponse> {
  /**
   * @generated from field: repeated buf.alpha.registry.v1alpha1.User users = 1;
   */
  users: User[] = [];

  /**
   * There are no more pages if this is empty.
   *
   * @generated from field: string next_page_token = 2;
   */
  nextPageToken = "";

  constructor(data?: PartialMessage<ListUsersResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListUsersResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "users", kind: "message", T: User, repeated: true },
    { no: 2, name: "next_page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListUsersResponse {
    return new ListUsersResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListUsersResponse {
    return new ListUsersResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListUsersResponse {
    return new ListUsersResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListUsersResponse | PlainMessage<ListUsersResponse> | undefined, b: ListUsersResponse | PlainMessage<ListUsersResponse> | undefined): boolean {
    return proto3.util.equals(ListUsersResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListOrganizationUsersRequest
 */
export class ListOrganizationUsersRequest extends Message<ListOrganizationUsersRequest> {
  /**
   * @generated from field: string organization_id = 1;
   */
  organizationId = "";

  /**
   * @generated from field: uint32 page_size = 2;
   */
  pageSize = 0;

  /**
   * The first page is returned if this is empty.
   *
   * @generated from field: string page_token = 3;
   */
  pageToken = "";

  /**
   * @generated from field: bool reverse = 4;
   */
  reverse = false;

  constructor(data?: PartialMessage<ListOrganizationUsersRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListOrganizationUsersRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "organization_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "page_size", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "reverse", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListOrganizationUsersRequest {
    return new ListOrganizationUsersRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListOrganizationUsersRequest {
    return new ListOrganizationUsersRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListOrganizationUsersRequest {
    return new ListOrganizationUsersRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListOrganizationUsersRequest | PlainMessage<ListOrganizationUsersRequest> | undefined, b: ListOrganizationUsersRequest | PlainMessage<ListOrganizationUsersRequest> | undefined): boolean {
    return proto3.util.equals(ListOrganizationUsersRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListOrganizationUsersResponse
 */
export class ListOrganizationUsersResponse extends Message<ListOrganizationUsersResponse> {
  /**
   * @generated from field: repeated buf.alpha.registry.v1alpha1.OrganizationUser users = 1;
   */
  users: OrganizationUser[] = [];

  /**
   * There are no more pages if this is empty.
   *
   * @generated from field: string next_page_token = 2;
   */
  nextPageToken = "";

  constructor(data?: PartialMessage<ListOrganizationUsersResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListOrganizationUsersResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "users", kind: "message", T: OrganizationUser, repeated: true },
    { no: 2, name: "next_page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListOrganizationUsersResponse {
    return new ListOrganizationUsersResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListOrganizationUsersResponse {
    return new ListOrganizationUsersResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListOrganizationUsersResponse {
    return new ListOrganizationUsersResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListOrganizationUsersResponse | PlainMessage<ListOrganizationUsersResponse> | undefined, b: ListOrganizationUsersResponse | PlainMessage<ListOrganizationUsersResponse> | undefined): boolean {
    return proto3.util.equals(ListOrganizationUsersResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.DeleteUserRequest
 */
export class DeleteUserRequest extends Message<DeleteUserRequest> {
  constructor(data?: PartialMessage<DeleteUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.DeleteUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteUserRequest {
    return new DeleteUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteUserRequest {
    return new DeleteUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteUserRequest {
    return new DeleteUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteUserRequest | PlainMessage<DeleteUserRequest> | undefined, b: DeleteUserRequest | PlainMessage<DeleteUserRequest> | undefined): boolean {
    return proto3.util.equals(DeleteUserRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.DeleteUserResponse
 */
export class DeleteUserResponse extends Message<DeleteUserResponse> {
  constructor(data?: PartialMessage<DeleteUserResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.DeleteUserResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteUserResponse {
    return new DeleteUserResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteUserResponse {
    return new DeleteUserResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteUserResponse {
    return new DeleteUserResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteUserResponse | PlainMessage<DeleteUserResponse> | undefined, b: DeleteUserResponse | PlainMessage<DeleteUserResponse> | undefined): boolean {
    return proto3.util.equals(DeleteUserResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.DeactivateUserRequest
 */
export class DeactivateUserRequest extends Message<DeactivateUserRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<DeactivateUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.DeactivateUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeactivateUserRequest {
    return new DeactivateUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeactivateUserRequest {
    return new DeactivateUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeactivateUserRequest {
    return new DeactivateUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeactivateUserRequest | PlainMessage<DeactivateUserRequest> | undefined, b: DeactivateUserRequest | PlainMessage<DeactivateUserRequest> | undefined): boolean {
    return proto3.util.equals(DeactivateUserRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.DeactivateUserResponse
 */
export class DeactivateUserResponse extends Message<DeactivateUserResponse> {
  constructor(data?: PartialMessage<DeactivateUserResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.DeactivateUserResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeactivateUserResponse {
    return new DeactivateUserResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeactivateUserResponse {
    return new DeactivateUserResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeactivateUserResponse {
    return new DeactivateUserResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeactivateUserResponse | PlainMessage<DeactivateUserResponse> | undefined, b: DeactivateUserResponse | PlainMessage<DeactivateUserResponse> | undefined): boolean {
    return proto3.util.equals(DeactivateUserResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.UpdateUserServerRoleRequest
 */
export class UpdateUserServerRoleRequest extends Message<UpdateUserServerRoleRequest> {
  /**
   * The ID of the user for which to be updated a role.
   *
   * @generated from field: string user_id = 1;
   */
  userId = "";

  /**
   * The new role of the user in the server.
   *
   * @generated from field: buf.alpha.registry.v1alpha1.ServerRole server_role = 2;
   */
  serverRole = ServerRole.UNSPECIFIED;

  constructor(data?: PartialMessage<UpdateUserServerRoleRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.UpdateUserServerRoleRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "server_role", kind: "enum", T: proto3.getEnumType(ServerRole) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateUserServerRoleRequest {
    return new UpdateUserServerRoleRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateUserServerRoleRequest {
    return new UpdateUserServerRoleRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateUserServerRoleRequest {
    return new UpdateUserServerRoleRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateUserServerRoleRequest | PlainMessage<UpdateUserServerRoleRequest> | undefined, b: UpdateUserServerRoleRequest | PlainMessage<UpdateUserServerRoleRequest> | undefined): boolean {
    return proto3.util.equals(UpdateUserServerRoleRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.UpdateUserServerRoleResponse
 */
export class UpdateUserServerRoleResponse extends Message<UpdateUserServerRoleResponse> {
  constructor(data?: PartialMessage<UpdateUserServerRoleResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.UpdateUserServerRoleResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateUserServerRoleResponse {
    return new UpdateUserServerRoleResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateUserServerRoleResponse {
    return new UpdateUserServerRoleResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateUserServerRoleResponse {
    return new UpdateUserServerRoleResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateUserServerRoleResponse | PlainMessage<UpdateUserServerRoleResponse> | undefined, b: UpdateUserServerRoleResponse | PlainMessage<UpdateUserServerRoleResponse> | undefined): boolean {
    return proto3.util.equals(UpdateUserServerRoleResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.CountUsersRequest
 */
export class CountUsersRequest extends Message<CountUsersRequest> {
  /**
   * If the user_state_filter is unspecified, all users are included.
   *
   * @generated from field: buf.alpha.registry.v1alpha1.UserState user_state_filter = 1;
   */
  userStateFilter = UserState.UNSPECIFIED;

  constructor(data?: PartialMessage<CountUsersRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.CountUsersRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user_state_filter", kind: "enum", T: proto3.getEnumType(UserState) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CountUsersRequest {
    return new CountUsersRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CountUsersRequest {
    return new CountUsersRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CountUsersRequest {
    return new CountUsersRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CountUsersRequest | PlainMessage<CountUsersRequest> | undefined, b: CountUsersRequest | PlainMessage<CountUsersRequest> | undefined): boolean {
    return proto3.util.equals(CountUsersRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.CountUsersResponse
 */
export class CountUsersResponse extends Message<CountUsersResponse> {
  /**
   * @generated from field: uint32 total_count = 1;
   */
  totalCount = 0;

  constructor(data?: PartialMessage<CountUsersResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.CountUsersResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "total_count", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CountUsersResponse {
    return new CountUsersResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CountUsersResponse {
    return new CountUsersResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CountUsersResponse {
    return new CountUsersResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CountUsersResponse | PlainMessage<CountUsersResponse> | undefined, b: CountUsersResponse | PlainMessage<CountUsersResponse> | undefined): boolean {
    return proto3.util.equals(CountUsersResponse, a, b);
  }
}

