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

// @generated by protoc-gen-es v0.0.9 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/reference.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import {RepositoryBranch} from "./repository_branch_pb.js";
import {RepositoryTag} from "./repository_tag_pb.js";
import {RepositoryCommit} from "./repository_commit_pb.js";
import {RepositoryTrack} from "./repository_track_pb.js";

/**
 * @generated from message buf.alpha.registry.v1alpha1.Reference
 */
export class Reference extends Message<Reference> {
  /**
   * @generated from oneof buf.alpha.registry.v1alpha1.Reference.reference
   */
  reference: {
    /**
     * The requested reference is a branch.
     *
     * @generated from field: buf.alpha.registry.v1alpha1.RepositoryBranch branch = 1;
     */
    value: RepositoryBranch;
    case: "branch";
  } | {
    /**
     * The requested reference is a tag.
     *
     * @generated from field: buf.alpha.registry.v1alpha1.RepositoryTag tag = 2;
     */
    value: RepositoryTag;
    case: "tag";
  } | {
    /**
     * The requested reference is a commit.
     *
     * @generated from field: buf.alpha.registry.v1alpha1.RepositoryCommit commit = 3;
     */
    value: RepositoryCommit;
    case: "commit";
  } | {
    /**
     * The requested reference is a track.
     *
     * @generated from field: buf.alpha.registry.v1alpha1.RepositoryTrack track = 4;
     */
    value: RepositoryTrack;
    case: "track";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<Reference>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.Reference";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "branch", kind: "message", T: RepositoryBranch, oneof: "reference" },
    { no: 2, name: "tag", kind: "message", T: RepositoryTag, oneof: "reference" },
    { no: 3, name: "commit", kind: "message", T: RepositoryCommit, oneof: "reference" },
    { no: 4, name: "track", kind: "message", T: RepositoryTrack, oneof: "reference" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Reference {
    return new Reference().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Reference {
    return new Reference().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Reference {
    return new Reference().fromJsonString(jsonString, options);
  }

  static equals(a: Reference | PlainMessage<Reference> | undefined, b: Reference | PlainMessage<Reference> | undefined): boolean {
    return proto3.util.equals(Reference, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetReferenceByNameRequest
 */
export class GetReferenceByNameRequest extends Message<GetReferenceByNameRequest> {
  /**
   * Name of the requested reference.
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * Owner of the repository the reference belongs to.
   *
   * @generated from field: string owner = 2;
   */
  owner = "";

  /**
   * Name of the repository the reference belongs to.
   *
   * @generated from field: string repository_name = 3;
   */
  repositoryName = "";

  constructor(data?: PartialMessage<GetReferenceByNameRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetReferenceByNameRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "repository_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetReferenceByNameRequest {
    return new GetReferenceByNameRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetReferenceByNameRequest {
    return new GetReferenceByNameRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetReferenceByNameRequest {
    return new GetReferenceByNameRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetReferenceByNameRequest | PlainMessage<GetReferenceByNameRequest> | undefined, b: GetReferenceByNameRequest | PlainMessage<GetReferenceByNameRequest> | undefined): boolean {
    return proto3.util.equals(GetReferenceByNameRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetReferenceByNameResponse
 */
export class GetReferenceByNameResponse extends Message<GetReferenceByNameResponse> {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.Reference reference = 1;
   */
  reference?: Reference;

  constructor(data?: PartialMessage<GetReferenceByNameResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetReferenceByNameResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "reference", kind: "message", T: Reference },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetReferenceByNameResponse {
    return new GetReferenceByNameResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetReferenceByNameResponse {
    return new GetReferenceByNameResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetReferenceByNameResponse {
    return new GetReferenceByNameResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetReferenceByNameResponse | PlainMessage<GetReferenceByNameResponse> | undefined, b: GetReferenceByNameResponse | PlainMessage<GetReferenceByNameResponse> | undefined): boolean {
    return proto3.util.equals(GetReferenceByNameResponse, a, b);
  }
}

