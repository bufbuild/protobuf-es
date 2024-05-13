// Copyright 2021-2024 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v2.0.0-alpha.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/repository_commit.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage, GenDescService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { RepositoryTag } from "./repository_tag_pb";
import { fileDesc_buf_alpha_registry_v1alpha1_repository_tag } from "./repository_tag_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { fileDesc_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/alpha/registry/v1alpha1/repository_commit.proto.
 */
export const fileDesc_buf_alpha_registry_v1alpha1_repository_commit: GenDescFile = /*@__PURE__*/
  fileDesc("CjNidWYvYWxwaGEvcmVnaXN0cnkvdjFhbHBoYTEvcmVwb3NpdG9yeV9jb21taXQucHJvdG8SG2J1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMSLjAQoQUmVwb3NpdG9yeUNvbW1pdBIKCgJpZBgBIAEoCRIvCgtjcmVhdGVfdGltZRgCIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASDgoGZGlnZXN0GAMgASgJEgwKBG5hbWUYBCABKAkSDgoGYnJhbmNoGAUgASgJEhoKEmNvbW1pdF9zZXF1ZW5jZV9pZBgGIAEoAxIOCgZhdXRob3IYByABKAkSOAoEdGFncxgIIAMoCzIqLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5SZXBvc2l0b3J5VGFnIrEBCiRMaXN0UmVwb3NpdG9yeUNvbW1pdHNCeUJyYW5jaFJlcXVlc3QSGAoQcmVwb3NpdG9yeV9vd25lchgBIAEoCRIXCg9yZXBvc2l0b3J5X25hbWUYAiABKAkSHgoWcmVwb3NpdG9yeV9icmFuY2hfbmFtZRgDIAEoCRIRCglwYWdlX3NpemUYBCABKA0SEgoKcGFnZV90b2tlbhgFIAEoCRIPCgdyZXZlcnNlGAYgASgIIosBCiVMaXN0UmVwb3NpdG9yeUNvbW1pdHNCeUJyYW5jaFJlc3BvbnNlEkkKEnJlcG9zaXRvcnlfY29tbWl0cxgBIAMoCzItLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5SZXBvc2l0b3J5Q29tbWl0EhcKD25leHRfcGFnZV90b2tlbhgCIAEoCSKnAQonTGlzdFJlcG9zaXRvcnlDb21taXRzQnlSZWZlcmVuY2VSZXF1ZXN0EhgKEHJlcG9zaXRvcnlfb3duZXIYASABKAkSFwoPcmVwb3NpdG9yeV9uYW1lGAIgASgJEhEKCXJlZmVyZW5jZRgDIAEoCRIRCglwYWdlX3NpemUYBCABKA0SEgoKcGFnZV90b2tlbhgFIAEoCRIPCgdyZXZlcnNlGAYgASgIIo4BCihMaXN0UmVwb3NpdG9yeUNvbW1pdHNCeVJlZmVyZW5jZVJlc3BvbnNlEkkKEnJlcG9zaXRvcnlfY29tbWl0cxgBIAMoCzItLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5SZXBvc2l0b3J5Q29tbWl0EhcKD25leHRfcGFnZV90b2tlbhgCIAEoCSJtCiVHZXRSZXBvc2l0b3J5Q29tbWl0QnlSZWZlcmVuY2VSZXF1ZXN0EhgKEHJlcG9zaXRvcnlfb3duZXIYASABKAkSFwoPcmVwb3NpdG9yeV9uYW1lGAIgASgJEhEKCXJlZmVyZW5jZRgDIAEoCSJyCiZHZXRSZXBvc2l0b3J5Q29tbWl0QnlSZWZlcmVuY2VSZXNwb25zZRJIChFyZXBvc2l0b3J5X2NvbW1pdBgBIAEoCzItLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5SZXBvc2l0b3J5Q29tbWl0IpcBCiZHZXRSZXBvc2l0b3J5Q29tbWl0QnlTZXF1ZW5jZUlkUmVxdWVzdBIYChByZXBvc2l0b3J5X293bmVyGAEgASgJEhcKD3JlcG9zaXRvcnlfbmFtZRgCIAEoCRIeChZyZXBvc2l0b3J5X2JyYW5jaF9uYW1lGAMgASgJEhoKEmNvbW1pdF9zZXF1ZW5jZV9pZBgEIAEoAyJzCidHZXRSZXBvc2l0b3J5Q29tbWl0QnlTZXF1ZW5jZUlkUmVzcG9uc2USSAoRcmVwb3NpdG9yeV9jb21taXQYASABKAsyLS5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuUmVwb3NpdG9yeUNvbW1pdDLPBQoXUmVwb3NpdG9yeUNvbW1pdFNlcnZpY2USpgEKHUxpc3RSZXBvc2l0b3J5Q29tbWl0c0J5QnJhbmNoEkEuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkxpc3RSZXBvc2l0b3J5Q29tbWl0c0J5QnJhbmNoUmVxdWVzdBpCLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5MaXN0UmVwb3NpdG9yeUNvbW1pdHNCeUJyYW5jaFJlc3BvbnNlEq8BCiBMaXN0UmVwb3NpdG9yeUNvbW1pdHNCeVJlZmVyZW5jZRJELmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5MaXN0UmVwb3NpdG9yeUNvbW1pdHNCeVJlZmVyZW5jZVJlcXVlc3QaRS5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuTGlzdFJlcG9zaXRvcnlDb21taXRzQnlSZWZlcmVuY2VSZXNwb25zZRKpAQoeR2V0UmVwb3NpdG9yeUNvbW1pdEJ5UmVmZXJlbmNlEkIuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkdldFJlcG9zaXRvcnlDb21taXRCeVJlZmVyZW5jZVJlcXVlc3QaQy5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuR2V0UmVwb3NpdG9yeUNvbW1pdEJ5UmVmZXJlbmNlUmVzcG9uc2USrAEKH0dldFJlcG9zaXRvcnlDb21taXRCeVNlcXVlbmNlSWQSQy5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuR2V0UmVwb3NpdG9yeUNvbW1pdEJ5U2VxdWVuY2VJZFJlcXVlc3QaRC5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuR2V0UmVwb3NpdG9yeUNvbW1pdEJ5U2VxdWVuY2VJZFJlc3BvbnNlYgZwcm90bzM", [fileDesc_buf_alpha_registry_v1alpha1_repository_tag, fileDesc_google_protobuf_timestamp]);

/**
 * @generated from message buf.alpha.registry.v1alpha1.RepositoryCommit
 */
export type RepositoryCommit = Message<"buf.alpha.registry.v1alpha1.RepositoryCommit"> & {
  /**
   * primary key, unique, immutable
   *
   * @generated from field: string id = 1;
   */
  id: string;

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
  digest: string;

  /**
   * The name of the commit.
   * This is what is referenced by users.
   * Unique, immutable.
   *
   * @generated from field: string name = 4;
   */
  name: string;

  /**
   * The branch on which this commit was created.
   *
   * @generated from field: string branch = 5;
   */
  branch: string;

  /**
   * The commit sequence ID for this commit. This
   * is essentially what number commit this is on
   * the branch.
   *
   * @generated from field: int64 commit_sequence_id = 6;
   */
  commitSequenceId: bigint;

  /**
   * The username of the user who authored this commit.
   *
   * @generated from field: string author = 7;
   */
  author: string;

  /**
   * The tags associated with this commit
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.RepositoryTag tags = 8;
   */
  tags: RepositoryTag[];
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.RepositoryCommit.
 * Use `create(RepositoryCommitDesc)` to create a new message.
 */
export const RepositoryCommitDesc: GenDescMessage<RepositoryCommit> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_commit, 0);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchRequest
 */
export type ListRepositoryCommitsByBranchRequest = Message<"buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchRequest"> & {
  /**
   * The owner of the repository which the repository branch belongs to.
   *
   * @generated from field: string repository_owner = 1;
   */
  repositoryOwner: string;

  /**
   * The name of the repository which the repository branch belongs to.
   *
   * @generated from field: string repository_name = 2;
   */
  repositoryName: string;

  /**
   * The name of the repository branch whose commits should be listed.
   *
   * @generated from field: string repository_branch_name = 3;
   */
  repositoryBranchName: string;

  /**
   * @generated from field: uint32 page_size = 4;
   */
  pageSize: number;

  /**
   * @generated from field: string page_token = 5;
   */
  pageToken: string;

  /**
   * @generated from field: bool reverse = 6;
   */
  reverse: boolean;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchRequest.
 * Use `create(ListRepositoryCommitsByBranchRequestDesc)` to create a new message.
 */
export const ListRepositoryCommitsByBranchRequestDesc: GenDescMessage<ListRepositoryCommitsByBranchRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_commit, 1);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchResponse
 */
export type ListRepositoryCommitsByBranchResponse = Message<"buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchResponse"> & {
  /**
   * @generated from field: repeated buf.alpha.registry.v1alpha1.RepositoryCommit repository_commits = 1;
   */
  repositoryCommits: RepositoryCommit[];

  /**
   * @generated from field: string next_page_token = 2;
   */
  nextPageToken: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchResponse.
 * Use `create(ListRepositoryCommitsByBranchResponseDesc)` to create a new message.
 */
export const ListRepositoryCommitsByBranchResponseDesc: GenDescMessage<ListRepositoryCommitsByBranchResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_commit, 2);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceRequest
 */
export type ListRepositoryCommitsByReferenceRequest = Message<"buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceRequest"> & {
  /**
   * The owner of the repository which the repository reference belongs to.
   *
   * @generated from field: string repository_owner = 1;
   */
  repositoryOwner: string;

  /**
   * The name of the repository which the repository reference belongs to.
   *
   * @generated from field: string repository_name = 2;
   */
  repositoryName: string;

  /**
   * The reference used to resolve repository commits. Can be a branch, tag or commit.
   *
   * @generated from field: string reference = 3;
   */
  reference: string;

  /**
   * @generated from field: uint32 page_size = 4;
   */
  pageSize: number;

  /**
   * @generated from field: string page_token = 5;
   */
  pageToken: string;

  /**
   * @generated from field: bool reverse = 6;
   */
  reverse: boolean;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceRequest.
 * Use `create(ListRepositoryCommitsByReferenceRequestDesc)` to create a new message.
 */
export const ListRepositoryCommitsByReferenceRequestDesc: GenDescMessage<ListRepositoryCommitsByReferenceRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_commit, 3);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceResponse
 */
export type ListRepositoryCommitsByReferenceResponse = Message<"buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceResponse"> & {
  /**
   * @generated from field: repeated buf.alpha.registry.v1alpha1.RepositoryCommit repository_commits = 1;
   */
  repositoryCommits: RepositoryCommit[];

  /**
   * @generated from field: string next_page_token = 2;
   */
  nextPageToken: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceResponse.
 * Use `create(ListRepositoryCommitsByReferenceResponseDesc)` to create a new message.
 */
export const ListRepositoryCommitsByReferenceResponseDesc: GenDescMessage<ListRepositoryCommitsByReferenceResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_commit, 4);

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceRequest
 */
export type GetRepositoryCommitByReferenceRequest = Message<"buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceRequest"> & {
  /**
   * The owner of the repository which the repository branch belongs to.
   *
   * @generated from field: string repository_owner = 1;
   */
  repositoryOwner: string;

  /**
   * The name of the repository which the repository branch belongs to.
   *
   * @generated from field: string repository_name = 2;
   */
  repositoryName: string;

  /**
   * The reference that should be resolved to a commit. Can be a branch, tag or commit.
   *
   * @generated from field: string reference = 3;
   */
  reference: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceRequest.
 * Use `create(GetRepositoryCommitByReferenceRequestDesc)` to create a new message.
 */
export const GetRepositoryCommitByReferenceRequestDesc: GenDescMessage<GetRepositoryCommitByReferenceRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_commit, 5);

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceResponse
 */
export type GetRepositoryCommitByReferenceResponse = Message<"buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceResponse"> & {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.RepositoryCommit repository_commit = 1;
   */
  repositoryCommit?: RepositoryCommit;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceResponse.
 * Use `create(GetRepositoryCommitByReferenceResponseDesc)` to create a new message.
 */
export const GetRepositoryCommitByReferenceResponseDesc: GenDescMessage<GetRepositoryCommitByReferenceResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_commit, 6);

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdRequest
 */
export type GetRepositoryCommitBySequenceIdRequest = Message<"buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdRequest"> & {
  /**
   * The owner of the repository which the repository branch belongs to.
   *
   * @generated from field: string repository_owner = 1;
   */
  repositoryOwner: string;

  /**
   * The name of the repository which the repository branch belongs to.
   *
   * @generated from field: string repository_name = 2;
   */
  repositoryName: string;

  /**
   * The name of the repository branch which the sequence ID is relative to.
   *
   * @generated from field: string repository_branch_name = 3;
   */
  repositoryBranchName: string;

  /**
   * The sequence ID to look up.
   *
   * @generated from field: int64 commit_sequence_id = 4;
   */
  commitSequenceId: bigint;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdRequest.
 * Use `create(GetRepositoryCommitBySequenceIdRequestDesc)` to create a new message.
 */
export const GetRepositoryCommitBySequenceIdRequestDesc: GenDescMessage<GetRepositoryCommitBySequenceIdRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_commit, 7);

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdResponse
 */
export type GetRepositoryCommitBySequenceIdResponse = Message<"buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdResponse"> & {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.RepositoryCommit repository_commit = 1;
   */
  repositoryCommit?: RepositoryCommit;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdResponse.
 * Use `create(GetRepositoryCommitBySequenceIdResponseDesc)` to create a new message.
 */
export const GetRepositoryCommitBySequenceIdResponseDesc: GenDescMessage<GetRepositoryCommitBySequenceIdResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_commit, 8);

/**
 * RepositoryCommitService is the Repository commit service.
 *
 * @generated from service buf.alpha.registry.v1alpha1.RepositoryCommitService
 */
export const RepositoryCommitService: GenDescService<{
  /**
   * ListRepositoryCommitsByBranch lists the repository commits associated
   * with a repository branch on a repository, ordered by their create time.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.RepositoryCommitService.ListRepositoryCommitsByBranch
   */
  listRepositoryCommitsByBranch: {
    kind: "unary";
    I: ListRepositoryCommitsByBranchRequest;
    O: ListRepositoryCommitsByBranchResponse;
  },
  /**
   * ListRepositoryCommitsByReference returns repository commits up-to and including
   * the provided reference.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.RepositoryCommitService.ListRepositoryCommitsByReference
   */
  listRepositoryCommitsByReference: {
    kind: "unary";
    I: ListRepositoryCommitsByReferenceRequest;
    O: ListRepositoryCommitsByReferenceResponse;
  },
  /**
   * GetRepositoryCommitByReference returns the repository commit matching
   * the provided reference, if it exists.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.RepositoryCommitService.GetRepositoryCommitByReference
   */
  getRepositoryCommitByReference: {
    kind: "unary";
    I: GetRepositoryCommitByReferenceRequest;
    O: GetRepositoryCommitByReferenceResponse;
  },
  /**
   * GetRepositoryCommitBySequenceId returns the repository commit matching
   * the provided sequence ID and branch, if it exists.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.RepositoryCommitService.GetRepositoryCommitBySequenceId
   */
  getRepositoryCommitBySequenceId: {
    kind: "unary";
    I: GetRepositoryCommitBySequenceIdRequest;
    O: GetRepositoryCommitBySequenceIdResponse;
  },
}
> = /*@__PURE__*/
  serviceDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_commit, 0);

