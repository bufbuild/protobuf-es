// Copyright 2021-2023 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v1.6.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/repository_tag.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message buf.alpha.registry.v1alpha1.RepositoryTag
 */
export class RepositoryTag extends Message<RepositoryTag> {
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
   * We reserve field number '3' for the update_time.
   * google.protobuf.Timestamp update_time = 3;
   * The name of the repository tag, e.g. "6e2e7f24718a76caa32a80d0e2b1841ef2c61403".
   *
   * @generated from field: string name = 4;
   */
  name = "";

  /**
   * The name of the commit this tag belongs to.
   *
   * @generated from field: string commit_name = 5;
   */
  commitName = "";

  /**
   * The username of the author of the tag.
   *
   * @generated from field: string author = 6;
   */
  author = "";

  constructor(data?: PartialMessage<RepositoryTag>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.RepositoryTag";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "create_time", kind: "message", T: Timestamp },
    { no: 4, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "commit_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "author", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RepositoryTag {
    return new RepositoryTag().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RepositoryTag {
    return new RepositoryTag().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RepositoryTag {
    return new RepositoryTag().fromJsonString(jsonString, options);
  }

  static equals(a: RepositoryTag | PlainMessage<RepositoryTag> | undefined, b: RepositoryTag | PlainMessage<RepositoryTag> | undefined): boolean {
    return proto3.util.equals(RepositoryTag, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.CreateRepositoryTagRequest
 */
export class CreateRepositoryTagRequest extends Message<CreateRepositoryTagRequest> {
  /**
   * The ID of the repository this tag should be created on.
   *
   * @generated from field: string repository_id = 1;
   */
  repositoryId = "";

  /**
   * The name of the repository tag, e.g. "6e2e7f24718a76caa32a80d0e2b1841ef2c61403".
   *
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * The name of the commit this tag should be created for.
   *
   * @generated from field: string commit_name = 3;
   */
  commitName = "";

  constructor(data?: PartialMessage<CreateRepositoryTagRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.CreateRepositoryTagRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repository_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "commit_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateRepositoryTagRequest {
    return new CreateRepositoryTagRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateRepositoryTagRequest {
    return new CreateRepositoryTagRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateRepositoryTagRequest {
    return new CreateRepositoryTagRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateRepositoryTagRequest | PlainMessage<CreateRepositoryTagRequest> | undefined, b: CreateRepositoryTagRequest | PlainMessage<CreateRepositoryTagRequest> | undefined): boolean {
    return proto3.util.equals(CreateRepositoryTagRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.CreateRepositoryTagResponse
 */
export class CreateRepositoryTagResponse extends Message<CreateRepositoryTagResponse> {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.RepositoryTag repository_tag = 1;
   */
  repositoryTag?: RepositoryTag;

  constructor(data?: PartialMessage<CreateRepositoryTagResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.CreateRepositoryTagResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repository_tag", kind: "message", T: RepositoryTag },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateRepositoryTagResponse {
    return new CreateRepositoryTagResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateRepositoryTagResponse {
    return new CreateRepositoryTagResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateRepositoryTagResponse {
    return new CreateRepositoryTagResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateRepositoryTagResponse | PlainMessage<CreateRepositoryTagResponse> | undefined, b: CreateRepositoryTagResponse | PlainMessage<CreateRepositoryTagResponse> | undefined): boolean {
    return proto3.util.equals(CreateRepositoryTagResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListRepositoryTagsRequest
 */
export class ListRepositoryTagsRequest extends Message<ListRepositoryTagsRequest> {
  /**
   * The ID of the repository whose tags should be listed.
   *
   * @generated from field: string repository_id = 1;
   */
  repositoryId = "";

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

  constructor(data?: PartialMessage<ListRepositoryTagsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListRepositoryTagsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repository_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "page_size", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "reverse", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListRepositoryTagsRequest {
    return new ListRepositoryTagsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListRepositoryTagsRequest {
    return new ListRepositoryTagsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListRepositoryTagsRequest {
    return new ListRepositoryTagsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListRepositoryTagsRequest | PlainMessage<ListRepositoryTagsRequest> | undefined, b: ListRepositoryTagsRequest | PlainMessage<ListRepositoryTagsRequest> | undefined): boolean {
    return proto3.util.equals(ListRepositoryTagsRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListRepositoryTagsResponse
 */
export class ListRepositoryTagsResponse extends Message<ListRepositoryTagsResponse> {
  /**
   * @generated from field: repeated buf.alpha.registry.v1alpha1.RepositoryTag repository_tags = 1;
   */
  repositoryTags: RepositoryTag[] = [];

  /**
   * There are no more pages if this is empty.
   *
   * @generated from field: string next_page_token = 2;
   */
  nextPageToken = "";

  constructor(data?: PartialMessage<ListRepositoryTagsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListRepositoryTagsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repository_tags", kind: "message", T: RepositoryTag, repeated: true },
    { no: 2, name: "next_page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListRepositoryTagsResponse {
    return new ListRepositoryTagsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListRepositoryTagsResponse {
    return new ListRepositoryTagsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListRepositoryTagsResponse {
    return new ListRepositoryTagsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListRepositoryTagsResponse | PlainMessage<ListRepositoryTagsResponse> | undefined, b: ListRepositoryTagsResponse | PlainMessage<ListRepositoryTagsResponse> | undefined): boolean {
    return proto3.util.equals(ListRepositoryTagsResponse, a, b);
  }
}

