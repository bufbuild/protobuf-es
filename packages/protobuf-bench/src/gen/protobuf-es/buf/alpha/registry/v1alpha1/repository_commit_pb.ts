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

// @generated by protoc-gen-es v0.2.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/repository_commit.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3, protoInt64, Timestamp} from "@bufbuild/protobuf";
import {RepositoryTag} from "./repository_tag_pb.js";

/**
 * @generated from message buf.alpha.registry.v1alpha1.RepositoryCommit
 */
export class RepositoryCommit extends Message<RepositoryCommit> {
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
   * The digest of the commit.
   *
   * @generated from field: string digest = 3;
   */
  digest = "";

  /**
   * The name of the commit.
   * This is what is referenced by users.
   * Unique, immutable.
   *
   * @generated from field: string name = 4;
   */
  name = "";

  /**
   * The branch on which this commit was created.
   *
   * @generated from field: string branch = 5;
   */
  branch = "";

  /**
   * The commit sequence ID for this commit. This
   * is essentially what number commit this is on
   * the branch.
   *
   * @generated from field: int64 commit_sequence_id = 6;
   */
  commitSequenceId = protoInt64.zero;

  /**
   * The username of the user who authored this commit.
   *
   * @generated from field: string author = 7;
   */
  author = "";

  /**
   * The tags associated with this commit
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.RepositoryTag tags = 8;
   */
  tags: RepositoryTag[] = [];

  constructor(data?: PartialMessage<RepositoryCommit>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.RepositoryCommit";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "create_time", kind: "message", T: Timestamp },
    { no: 3, name: "digest", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "branch", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "commit_sequence_id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 7, name: "author", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "tags", kind: "message", T: RepositoryTag, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RepositoryCommit {
    return new RepositoryCommit().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RepositoryCommit {
    return new RepositoryCommit().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RepositoryCommit {
    return new RepositoryCommit().fromJsonString(jsonString, options);
  }

  static equals(a: RepositoryCommit | PlainMessage<RepositoryCommit> | undefined, b: RepositoryCommit | PlainMessage<RepositoryCommit> | undefined): boolean {
    return proto3.util.equals(RepositoryCommit, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchRequest
 */
export class ListRepositoryCommitsByBranchRequest extends Message<ListRepositoryCommitsByBranchRequest> {
  /**
   * The owner of the repository which the repository branch belongs to.
   *
   * @generated from field: string repository_owner = 1;
   */
  repositoryOwner = "";

  /**
   * The name of the repository which the repository branch belongs to.
   *
   * @generated from field: string repository_name = 2;
   */
  repositoryName = "";

  /**
   * The name of the repository branch whose commits should be listed.
   *
   * @generated from field: string repository_branch_name = 3;
   */
  repositoryBranchName = "";

  /**
   * @generated from field: uint32 page_size = 4;
   */
  pageSize = 0;

  /**
   * @generated from field: string page_token = 5;
   */
  pageToken = "";

  /**
   * @generated from field: bool reverse = 6;
   */
  reverse = false;

  constructor(data?: PartialMessage<ListRepositoryCommitsByBranchRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repository_owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "repository_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "repository_branch_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "page_size", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 5, name: "page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "reverse", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListRepositoryCommitsByBranchRequest {
    return new ListRepositoryCommitsByBranchRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListRepositoryCommitsByBranchRequest {
    return new ListRepositoryCommitsByBranchRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListRepositoryCommitsByBranchRequest {
    return new ListRepositoryCommitsByBranchRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListRepositoryCommitsByBranchRequest | PlainMessage<ListRepositoryCommitsByBranchRequest> | undefined, b: ListRepositoryCommitsByBranchRequest | PlainMessage<ListRepositoryCommitsByBranchRequest> | undefined): boolean {
    return proto3.util.equals(ListRepositoryCommitsByBranchRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchResponse
 */
export class ListRepositoryCommitsByBranchResponse extends Message<ListRepositoryCommitsByBranchResponse> {
  /**
   * @generated from field: repeated buf.alpha.registry.v1alpha1.RepositoryCommit repository_commits = 1;
   */
  repositoryCommits: RepositoryCommit[] = [];

  /**
   * @generated from field: string next_page_token = 2;
   */
  nextPageToken = "";

  constructor(data?: PartialMessage<ListRepositoryCommitsByBranchResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repository_commits", kind: "message", T: RepositoryCommit, repeated: true },
    { no: 2, name: "next_page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListRepositoryCommitsByBranchResponse {
    return new ListRepositoryCommitsByBranchResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListRepositoryCommitsByBranchResponse {
    return new ListRepositoryCommitsByBranchResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListRepositoryCommitsByBranchResponse {
    return new ListRepositoryCommitsByBranchResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListRepositoryCommitsByBranchResponse | PlainMessage<ListRepositoryCommitsByBranchResponse> | undefined, b: ListRepositoryCommitsByBranchResponse | PlainMessage<ListRepositoryCommitsByBranchResponse> | undefined): boolean {
    return proto3.util.equals(ListRepositoryCommitsByBranchResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceRequest
 */
export class ListRepositoryCommitsByReferenceRequest extends Message<ListRepositoryCommitsByReferenceRequest> {
  /**
   * The owner of the repository which the repository reference belongs to.
   *
   * @generated from field: string repository_owner = 1;
   */
  repositoryOwner = "";

  /**
   * The name of the repository which the repository reference belongs to.
   *
   * @generated from field: string repository_name = 2;
   */
  repositoryName = "";

  /**
   * The reference used to resolve repository commits. Can be a branch, tag or commit.
   *
   * @generated from field: string reference = 3;
   */
  reference = "";

  /**
   * @generated from field: uint32 page_size = 4;
   */
  pageSize = 0;

  /**
   * @generated from field: string page_token = 5;
   */
  pageToken = "";

  /**
   * @generated from field: bool reverse = 6;
   */
  reverse = false;

  constructor(data?: PartialMessage<ListRepositoryCommitsByReferenceRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repository_owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "repository_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "reference", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "page_size", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 5, name: "page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "reverse", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListRepositoryCommitsByReferenceRequest {
    return new ListRepositoryCommitsByReferenceRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListRepositoryCommitsByReferenceRequest {
    return new ListRepositoryCommitsByReferenceRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListRepositoryCommitsByReferenceRequest {
    return new ListRepositoryCommitsByReferenceRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListRepositoryCommitsByReferenceRequest | PlainMessage<ListRepositoryCommitsByReferenceRequest> | undefined, b: ListRepositoryCommitsByReferenceRequest | PlainMessage<ListRepositoryCommitsByReferenceRequest> | undefined): boolean {
    return proto3.util.equals(ListRepositoryCommitsByReferenceRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceResponse
 */
export class ListRepositoryCommitsByReferenceResponse extends Message<ListRepositoryCommitsByReferenceResponse> {
  /**
   * @generated from field: repeated buf.alpha.registry.v1alpha1.RepositoryCommit repository_commits = 1;
   */
  repositoryCommits: RepositoryCommit[] = [];

  /**
   * @generated from field: string next_page_token = 2;
   */
  nextPageToken = "";

  constructor(data?: PartialMessage<ListRepositoryCommitsByReferenceResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repository_commits", kind: "message", T: RepositoryCommit, repeated: true },
    { no: 2, name: "next_page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListRepositoryCommitsByReferenceResponse {
    return new ListRepositoryCommitsByReferenceResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListRepositoryCommitsByReferenceResponse {
    return new ListRepositoryCommitsByReferenceResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListRepositoryCommitsByReferenceResponse {
    return new ListRepositoryCommitsByReferenceResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListRepositoryCommitsByReferenceResponse | PlainMessage<ListRepositoryCommitsByReferenceResponse> | undefined, b: ListRepositoryCommitsByReferenceResponse | PlainMessage<ListRepositoryCommitsByReferenceResponse> | undefined): boolean {
    return proto3.util.equals(ListRepositoryCommitsByReferenceResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceRequest
 */
export class GetRepositoryCommitByReferenceRequest extends Message<GetRepositoryCommitByReferenceRequest> {
  /**
   * The owner of the repository which the repository branch belongs to.
   *
   * @generated from field: string repository_owner = 1;
   */
  repositoryOwner = "";

  /**
   * The name of the repository which the repository branch belongs to.
   *
   * @generated from field: string repository_name = 2;
   */
  repositoryName = "";

  /**
   * The reference that should be resolved to a commit. Can be a branch, tag or commit.
   *
   * @generated from field: string reference = 3;
   */
  reference = "";

  constructor(data?: PartialMessage<GetRepositoryCommitByReferenceRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repository_owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "repository_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "reference", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRepositoryCommitByReferenceRequest {
    return new GetRepositoryCommitByReferenceRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRepositoryCommitByReferenceRequest {
    return new GetRepositoryCommitByReferenceRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRepositoryCommitByReferenceRequest {
    return new GetRepositoryCommitByReferenceRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetRepositoryCommitByReferenceRequest | PlainMessage<GetRepositoryCommitByReferenceRequest> | undefined, b: GetRepositoryCommitByReferenceRequest | PlainMessage<GetRepositoryCommitByReferenceRequest> | undefined): boolean {
    return proto3.util.equals(GetRepositoryCommitByReferenceRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceResponse
 */
export class GetRepositoryCommitByReferenceResponse extends Message<GetRepositoryCommitByReferenceResponse> {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.RepositoryCommit repository_commit = 1;
   */
  repositoryCommit?: RepositoryCommit;

  constructor(data?: PartialMessage<GetRepositoryCommitByReferenceResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repository_commit", kind: "message", T: RepositoryCommit },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRepositoryCommitByReferenceResponse {
    return new GetRepositoryCommitByReferenceResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRepositoryCommitByReferenceResponse {
    return new GetRepositoryCommitByReferenceResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRepositoryCommitByReferenceResponse {
    return new GetRepositoryCommitByReferenceResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetRepositoryCommitByReferenceResponse | PlainMessage<GetRepositoryCommitByReferenceResponse> | undefined, b: GetRepositoryCommitByReferenceResponse | PlainMessage<GetRepositoryCommitByReferenceResponse> | undefined): boolean {
    return proto3.util.equals(GetRepositoryCommitByReferenceResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdRequest
 */
export class GetRepositoryCommitBySequenceIdRequest extends Message<GetRepositoryCommitBySequenceIdRequest> {
  /**
   * The owner of the repository which the repository branch belongs to.
   *
   * @generated from field: string repository_owner = 1;
   */
  repositoryOwner = "";

  /**
   * The name of the repository which the repository branch belongs to.
   *
   * @generated from field: string repository_name = 2;
   */
  repositoryName = "";

  /**
   * The name of the repository branch which the sequence ID is relative to.
   *
   * @generated from field: string repository_branch_name = 3;
   */
  repositoryBranchName = "";

  /**
   * The sequence ID to look up.
   *
   * @generated from field: int64 commit_sequence_id = 4;
   */
  commitSequenceId = protoInt64.zero;

  constructor(data?: PartialMessage<GetRepositoryCommitBySequenceIdRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repository_owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "repository_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "repository_branch_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "commit_sequence_id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRepositoryCommitBySequenceIdRequest {
    return new GetRepositoryCommitBySequenceIdRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRepositoryCommitBySequenceIdRequest {
    return new GetRepositoryCommitBySequenceIdRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRepositoryCommitBySequenceIdRequest {
    return new GetRepositoryCommitBySequenceIdRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetRepositoryCommitBySequenceIdRequest | PlainMessage<GetRepositoryCommitBySequenceIdRequest> | undefined, b: GetRepositoryCommitBySequenceIdRequest | PlainMessage<GetRepositoryCommitBySequenceIdRequest> | undefined): boolean {
    return proto3.util.equals(GetRepositoryCommitBySequenceIdRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdResponse
 */
export class GetRepositoryCommitBySequenceIdResponse extends Message<GetRepositoryCommitBySequenceIdResponse> {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.RepositoryCommit repository_commit = 1;
   */
  repositoryCommit?: RepositoryCommit;

  constructor(data?: PartialMessage<GetRepositoryCommitBySequenceIdResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "repository_commit", kind: "message", T: RepositoryCommit },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRepositoryCommitBySequenceIdResponse {
    return new GetRepositoryCommitBySequenceIdResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRepositoryCommitBySequenceIdResponse {
    return new GetRepositoryCommitBySequenceIdResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRepositoryCommitBySequenceIdResponse {
    return new GetRepositoryCommitBySequenceIdResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetRepositoryCommitBySequenceIdResponse | PlainMessage<GetRepositoryCommitBySequenceIdResponse> | undefined, b: GetRepositoryCommitBySequenceIdResponse | PlainMessage<GetRepositoryCommitBySequenceIdResponse> | undefined): boolean {
    return proto3.util.equals(GetRepositoryCommitBySequenceIdResponse, a, b);
  }
}

