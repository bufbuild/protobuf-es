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

// @generated by protoc-gen-es v2.0.0-alpha.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/repository_track_commit.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage, GenDescService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { fileDesc_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

export const fileDesc_buf_alpha_registry_v1alpha1_repository_track_commit: GenDescFile = /*@__PURE__*/
  fileDesc("CjlidWYvYWxwaGEvcmVnaXN0cnkvdjFhbHBoYTEvcmVwb3NpdG9yeV90cmFja19jb21taXQucHJvdG8SG2J1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMSKYAQoVUmVwb3NpdG9yeVRyYWNrQ29tbWl0Ei8KC2NyZWF0ZV90aW1lGAIgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIbChNyZXBvc2l0b3J5X3RyYWNrX2lkGAQgASgJEhwKFHJlcG9zaXRvcnlfY29tbWl0X2lkGAUgASgJEhMKC3NlcXVlbmNlX2lkGAYgASgDIm4KMUdldFJlcG9zaXRvcnlUcmFja0NvbW1pdEJ5UmVwb3NpdG9yeUNvbW1pdFJlcXVlc3QSGwoTcmVwb3NpdG9yeV90cmFja19pZBgBIAEoCRIcChRyZXBvc2l0b3J5X2NvbW1pdF9pZBgCIAEoCSKJAQoyR2V0UmVwb3NpdG9yeVRyYWNrQ29tbWl0QnlSZXBvc2l0b3J5Q29tbWl0UmVzcG9uc2USUwoXcmVwb3NpdG9yeV90cmFja19jb21taXQYASABKAsyMi5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuUmVwb3NpdG9yeVRyYWNrQ29tbWl0IokBCjJMaXN0UmVwb3NpdG9yeVRyYWNrQ29tbWl0c0J5UmVwb3NpdG9yeVRyYWNrUmVxdWVzdBIbChNyZXBvc2l0b3J5X3RyYWNrX2lkGAEgASgJEhEKCXBhZ2Vfc2l6ZRgCIAEoDRISCgpwYWdlX3Rva2VuGAMgASgJEg8KB3JldmVyc2UYBCABKAgipAEKM0xpc3RSZXBvc2l0b3J5VHJhY2tDb21taXRzQnlSZXBvc2l0b3J5VHJhY2tSZXNwb25zZRJUChhyZXBvc2l0b3J5X3RyYWNrX2NvbW1pdHMYASADKAsyMi5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuUmVwb3NpdG9yeVRyYWNrQ29tbWl0EhcKD25leHRfcGFnZV90b2tlbhgCIAEoCSKBAQoqR2V0UmVwb3NpdG9yeVRyYWNrQ29tbWl0QnlSZWZlcmVuY2VSZXF1ZXN0EhgKEHJlcG9zaXRvcnlfb3duZXIYASABKAkSFwoPcmVwb3NpdG9yeV9uYW1lGAIgASgJEg0KBXRyYWNrGAMgASgJEhEKCXJlZmVyZW5jZRgEIAEoCSKCAQorR2V0UmVwb3NpdG9yeVRyYWNrQ29tbWl0QnlSZWZlcmVuY2VSZXNwb25zZRJTChdyZXBvc2l0b3J5X3RyYWNrX2NvbW1pdBgBIAEoCzIyLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5SZXBvc2l0b3J5VHJhY2tDb21taXQy/AQKHFJlcG9zaXRvcnlUcmFja0NvbW1pdFNlcnZpY2USzQEKKkdldFJlcG9zaXRvcnlUcmFja0NvbW1pdEJ5UmVwb3NpdG9yeUNvbW1pdBJOLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5HZXRSZXBvc2l0b3J5VHJhY2tDb21taXRCeVJlcG9zaXRvcnlDb21taXRSZXF1ZXN0Gk8uYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkdldFJlcG9zaXRvcnlUcmFja0NvbW1pdEJ5UmVwb3NpdG9yeUNvbW1pdFJlc3BvbnNlEtABCitMaXN0UmVwb3NpdG9yeVRyYWNrQ29tbWl0c0J5UmVwb3NpdG9yeVRyYWNrEk8uYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkxpc3RSZXBvc2l0b3J5VHJhY2tDb21taXRzQnlSZXBvc2l0b3J5VHJhY2tSZXF1ZXN0GlAuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkxpc3RSZXBvc2l0b3J5VHJhY2tDb21taXRzQnlSZXBvc2l0b3J5VHJhY2tSZXNwb25zZRK4AQojR2V0UmVwb3NpdG9yeVRyYWNrQ29tbWl0QnlSZWZlcmVuY2USRy5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuR2V0UmVwb3NpdG9yeVRyYWNrQ29tbWl0QnlSZWZlcmVuY2VSZXF1ZXN0GkguYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkdldFJlcG9zaXRvcnlUcmFja0NvbW1pdEJ5UmVmZXJlbmNlUmVzcG9uc2ViBnByb3RvMw", [fileDesc_google_protobuf_timestamp]);

/**
 * RepositoryTrackCommit is the existance of a RepositoryCommit on a RepositoryTrack. Currently its only purpose is
 * for querying whether a RepositoryCommit is on a RepositoryTrack and determining it's sequence id.
 *
 * We reserve field number '3' for id, but RepositoryTrackCommits have no id.
 * string id = 1;
 *
 * @generated from message buf.alpha.registry.v1alpha1.RepositoryTrackCommit
 */
export type RepositoryTrackCommit = Message<"buf.alpha.registry.v1alpha1.RepositoryTrackCommit"> & {
  /**
   * immutable
   *
   * @generated from field: google.protobuf.Timestamp create_time = 2;
   */
  createTime?: Timestamp;

  /**
   * immutable
   *
   * @generated from field: string repository_track_id = 4;
   */
  repositoryTrackId: string;

  /**
   * immutable
   *
   * @generated from field: string repository_commit_id = 5;
   */
  repositoryCommitId: string;

  /**
   * unique for repository_track, immutable
   *
   * @generated from field: int64 sequence_id = 6;
   */
  sequenceId: bigint;
};

// Describes the message buf.alpha.registry.v1alpha1.RepositoryTrackCommit.
// Use `create(RepositoryTrackCommitDesc)` to create a new RepositoryTrackCommit.
export const RepositoryTrackCommitDesc: GenDescMessage<RepositoryTrackCommit> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_track_commit, 0);

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitRequest
 */
export type GetRepositoryTrackCommitByRepositoryCommitRequest = Message<"buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitRequest"> & {
  /**
   * @generated from field: string repository_track_id = 1;
   */
  repositoryTrackId: string;

  /**
   * @generated from field: string repository_commit_id = 2;
   */
  repositoryCommitId: string;
};

// Describes the message buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitRequest.
// Use `create(GetRepositoryTrackCommitByRepositoryCommitRequestDesc)` to create a new GetRepositoryTrackCommitByRepositoryCommitRequest.
export const GetRepositoryTrackCommitByRepositoryCommitRequestDesc: GenDescMessage<GetRepositoryTrackCommitByRepositoryCommitRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_track_commit, 1);

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitResponse
 */
export type GetRepositoryTrackCommitByRepositoryCommitResponse = Message<"buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitResponse"> & {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.RepositoryTrackCommit repository_track_commit = 1;
   */
  repositoryTrackCommit?: RepositoryTrackCommit;
};

// Describes the message buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitResponse.
// Use `create(GetRepositoryTrackCommitByRepositoryCommitResponseDesc)` to create a new GetRepositoryTrackCommitByRepositoryCommitResponse.
export const GetRepositoryTrackCommitByRepositoryCommitResponseDesc: GenDescMessage<GetRepositoryTrackCommitByRepositoryCommitResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_track_commit, 2);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackRequest
 */
export type ListRepositoryTrackCommitsByRepositoryTrackRequest = Message<"buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackRequest"> & {
  /**
   * @generated from field: string repository_track_id = 1;
   */
  repositoryTrackId: string;

  /**
   * @generated from field: uint32 page_size = 2;
   */
  pageSize: number;

  /**
   * @generated from field: string page_token = 3;
   */
  pageToken: string;

  /**
   * @generated from field: bool reverse = 4;
   */
  reverse: boolean;
};

// Describes the message buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackRequest.
// Use `create(ListRepositoryTrackCommitsByRepositoryTrackRequestDesc)` to create a new ListRepositoryTrackCommitsByRepositoryTrackRequest.
export const ListRepositoryTrackCommitsByRepositoryTrackRequestDesc: GenDescMessage<ListRepositoryTrackCommitsByRepositoryTrackRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_track_commit, 3);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackResponse
 */
export type ListRepositoryTrackCommitsByRepositoryTrackResponse = Message<"buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackResponse"> & {
  /**
   * @generated from field: repeated buf.alpha.registry.v1alpha1.RepositoryTrackCommit repository_track_commits = 1;
   */
  repositoryTrackCommits: RepositoryTrackCommit[];

  /**
   * @generated from field: string next_page_token = 2;
   */
  nextPageToken: string;
};

// Describes the message buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackResponse.
// Use `create(ListRepositoryTrackCommitsByRepositoryTrackResponseDesc)` to create a new ListRepositoryTrackCommitsByRepositoryTrackResponse.
export const ListRepositoryTrackCommitsByRepositoryTrackResponseDesc: GenDescMessage<ListRepositoryTrackCommitsByRepositoryTrackResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_track_commit, 4);

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceRequest
 */
export type GetRepositoryTrackCommitByReferenceRequest = Message<"buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceRequest"> & {
  /**
   * @generated from field: string repository_owner = 1;
   */
  repositoryOwner: string;

  /**
   * @generated from field: string repository_name = 2;
   */
  repositoryName: string;

  /**
   * @generated from field: string track = 3;
   */
  track: string;

  /**
   * @generated from field: string reference = 4;
   */
  reference: string;
};

// Describes the message buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceRequest.
// Use `create(GetRepositoryTrackCommitByReferenceRequestDesc)` to create a new GetRepositoryTrackCommitByReferenceRequest.
export const GetRepositoryTrackCommitByReferenceRequestDesc: GenDescMessage<GetRepositoryTrackCommitByReferenceRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_track_commit, 5);

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceResponse
 */
export type GetRepositoryTrackCommitByReferenceResponse = Message<"buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceResponse"> & {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.RepositoryTrackCommit repository_track_commit = 1;
   */
  repositoryTrackCommit?: RepositoryTrackCommit;
};

// Describes the message buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceResponse.
// Use `create(GetRepositoryTrackCommitByReferenceResponseDesc)` to create a new GetRepositoryTrackCommitByReferenceResponse.
export const GetRepositoryTrackCommitByReferenceResponseDesc: GenDescMessage<GetRepositoryTrackCommitByReferenceResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_track_commit, 6);

/**
 * @generated from service buf.alpha.registry.v1alpha1.RepositoryTrackCommitService
 */
export const RepositoryTrackCommitService: GenDescService<{
  /**
   * GetRepositoryTrackCommitByRepositoryCommit returns the RepositoryTrackCommit associated given repository_commit on
   * the given repository_track. Returns NOT_FOUND if the RepositoryTrackCommit does not exist.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.RepositoryTrackCommitService.GetRepositoryTrackCommitByRepositoryCommit
   */
  getRepositoryTrackCommitByRepositoryCommit: {
    kind: "unary";
    I: GetRepositoryTrackCommitByRepositoryCommitRequest;
    O: GetRepositoryTrackCommitByRepositoryCommitResponse;
  },
  /**
   * ListRepositoryTrackCommitsByRepositoryTrack lists the RepositoryTrackCommitS associated with a repository track,
   * ordered by their sequence id.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.RepositoryTrackCommitService.ListRepositoryTrackCommitsByRepositoryTrack
   */
  listRepositoryTrackCommitsByRepositoryTrack: {
    kind: "unary";
    I: ListRepositoryTrackCommitsByRepositoryTrackRequest;
    O: ListRepositoryTrackCommitsByRepositoryTrackResponse;
  },
  /**
   * GetRepositoryTrackCommitByReference returns the RepositoryTrackCommit associated with the given reference.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.RepositoryTrackCommitService.GetRepositoryTrackCommitByReference
   */
  getRepositoryTrackCommitByReference: {
    kind: "unary";
    I: GetRepositoryTrackCommitByReferenceRequest;
    O: GetRepositoryTrackCommitByReferenceResponse;
  },
}
> = /*@__PURE__*/
  serviceDesc(fileDesc_buf_alpha_registry_v1alpha1_repository_track_commit, 0);

