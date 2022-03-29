/* eslint-disable */
// @generated by protoc-gen-es v0.0.2-alpha.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/audit/v1alpha1/repository.proto (package buf.alpha.audit.v1alpha1, syntax proto3)
//
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

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, Timestamp, proto3, protoInt64} from "@bufbuild/protobuf";

/**
 * @generated from enum buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1Visibility
 */
export enum BufAlphaRegistryV1Alpha1Visibility {

    /**
     * @generated from enum value: BUF_ALPHA_REGISTRY_V1_ALPHA1_VISIBILITY_UNSPECIFIED = 0;
     */
    BUF_ALPHA_REGISTRY_V1_ALPHA1_VISIBILITY_UNSPECIFIED = 0,

    /**
     * @generated from enum value: BUF_ALPHA_REGISTRY_V1_ALPHA1_VISIBILITY_PUBLIC = 1;
     */
    BUF_ALPHA_REGISTRY_V1_ALPHA1_VISIBILITY_PUBLIC = 1,

    /**
     * @generated from enum value: BUF_ALPHA_REGISTRY_V1_ALPHA1_VISIBILITY_PRIVATE = 2;
     */
    BUF_ALPHA_REGISTRY_V1_ALPHA1_VISIBILITY_PRIVATE = 2,

}

// Retrieve enum metadata with: proto3.getEnumType(BufAlphaRegistryV1Alpha1Visibility)
proto3.util.setEnumType(BufAlphaRegistryV1Alpha1Visibility, "buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1Visibility", [
    {no: 0, name: "BUF_ALPHA_REGISTRY_V1_ALPHA1_VISIBILITY_UNSPECIFIED"},
    {no: 1, name: "BUF_ALPHA_REGISTRY_V1_ALPHA1_VISIBILITY_PUBLIC"},
    {no: 2, name: "BUF_ALPHA_REGISTRY_V1_ALPHA1_VISIBILITY_PRIVATE"},
]);

/**
 * @generated from message buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryBranch
 */
export class BufAlphaRegistryV1Alpha1RepositoryBranch extends Message<BufAlphaRegistryV1Alpha1RepositoryBranch> {

    /**
     * @generated from field: string id = 1;
     */
    id = "";

    /**
     * @generated from field: google.protobuf.Timestamp create_time = 2;
     */
    createTime?: Timestamp;

    /**
     * Field number '3' reserved for the update_time.
     *
     * @generated from field: string name = 4;
     */
    name = "";

    /**
     * @generated from field: string repository_id = 5;
     */
    repositoryId = "";

    constructor(data?: PartialMessage<BufAlphaRegistryV1Alpha1RepositoryBranch>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryBranch";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 2, name: "create_time", kind: "message", T: Timestamp},
        {no: 4, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 5, name: "repository_id", kind: "scalar", T: 9 /* ScalarType.STRING */},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BufAlphaRegistryV1Alpha1RepositoryBranch {
        return new BufAlphaRegistryV1Alpha1RepositoryBranch().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1RepositoryBranch {
        return new BufAlphaRegistryV1Alpha1RepositoryBranch().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1RepositoryBranch {
        return new BufAlphaRegistryV1Alpha1RepositoryBranch().fromJsonString(jsonString, options);
    }

    static equals(a: BufAlphaRegistryV1Alpha1RepositoryBranch | PlainMessage<BufAlphaRegistryV1Alpha1RepositoryBranch> | undefined, b: BufAlphaRegistryV1Alpha1RepositoryBranch | PlainMessage<BufAlphaRegistryV1Alpha1RepositoryBranch> | undefined): boolean {
        return proto3.util.equals(BufAlphaRegistryV1Alpha1RepositoryBranch, a, b);
    }

}


/**
 * @generated from message buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTag
 */
export class BufAlphaRegistryV1Alpha1RepositoryTag extends Message<BufAlphaRegistryV1Alpha1RepositoryTag> {

    /**
     * @generated from field: string id = 1;
     */
    id = "";

    /**
     * @generated from field: google.protobuf.Timestamp create_time = 2;
     */
    createTime?: Timestamp;

    /**
     * Field number '3' reserved for the update_time.
     *
     * @generated from field: string name = 4;
     */
    name = "";

    /**
     * @generated from field: string commit_name = 5;
     */
    commitName = "";

    /**
     * @generated from field: string author = 6;
     */
    author = "";

    constructor(data?: PartialMessage<BufAlphaRegistryV1Alpha1RepositoryTag>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTag";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 2, name: "create_time", kind: "message", T: Timestamp},
        {no: 4, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 5, name: "commit_name", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 6, name: "author", kind: "scalar", T: 9 /* ScalarType.STRING */},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BufAlphaRegistryV1Alpha1RepositoryTag {
        return new BufAlphaRegistryV1Alpha1RepositoryTag().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1RepositoryTag {
        return new BufAlphaRegistryV1Alpha1RepositoryTag().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1RepositoryTag {
        return new BufAlphaRegistryV1Alpha1RepositoryTag().fromJsonString(jsonString, options);
    }

    static equals(a: BufAlphaRegistryV1Alpha1RepositoryTag | PlainMessage<BufAlphaRegistryV1Alpha1RepositoryTag> | undefined, b: BufAlphaRegistryV1Alpha1RepositoryTag | PlainMessage<BufAlphaRegistryV1Alpha1RepositoryTag> | undefined): boolean {
        return proto3.util.equals(BufAlphaRegistryV1Alpha1RepositoryTag, a, b);
    }

}


/**
 * @generated from message buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryCommit
 */
export class BufAlphaRegistryV1Alpha1RepositoryCommit extends Message<BufAlphaRegistryV1Alpha1RepositoryCommit> {

    /**
     * @generated from field: string id = 1;
     */
    id = "";

    /**
     * @generated from field: google.protobuf.Timestamp create_time = 2;
     */
    createTime?: Timestamp;

    /**
     * @generated from field: string digest = 3;
     */
    digest = "";

    /**
     * @generated from field: string name = 4;
     */
    name = "";

    /**
     * @generated from field: string branch = 5;
     */
    branch = "";

    /**
     * @generated from field: int64 commit_sequence_id = 6;
     */
    commitSequenceId = protoInt64.zero;

    /**
     * @generated from field: string author = 7;
     */
    author = "";

    /**
     * @generated from field: repeated buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTag tags = 8;
     */
    tags: BufAlphaRegistryV1Alpha1RepositoryTag[] = [];

    constructor(data?: PartialMessage<BufAlphaRegistryV1Alpha1RepositoryCommit>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryCommit";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 2, name: "create_time", kind: "message", T: Timestamp},
        {no: 3, name: "digest", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 4, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 5, name: "branch", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 6, name: "commit_sequence_id", kind: "scalar", T: 3 /* ScalarType.INT64 */},
        {no: 7, name: "author", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 8, name: "tags", kind: "message", T: BufAlphaRegistryV1Alpha1RepositoryTag, repeated: true},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BufAlphaRegistryV1Alpha1RepositoryCommit {
        return new BufAlphaRegistryV1Alpha1RepositoryCommit().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1RepositoryCommit {
        return new BufAlphaRegistryV1Alpha1RepositoryCommit().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1RepositoryCommit {
        return new BufAlphaRegistryV1Alpha1RepositoryCommit().fromJsonString(jsonString, options);
    }

    static equals(a: BufAlphaRegistryV1Alpha1RepositoryCommit | PlainMessage<BufAlphaRegistryV1Alpha1RepositoryCommit> | undefined, b: BufAlphaRegistryV1Alpha1RepositoryCommit | PlainMessage<BufAlphaRegistryV1Alpha1RepositoryCommit> | undefined): boolean {
        return proto3.util.equals(BufAlphaRegistryV1Alpha1RepositoryCommit, a, b);
    }

}


/**
 * @generated from message buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTrack
 */
export class BufAlphaRegistryV1Alpha1RepositoryTrack extends Message<BufAlphaRegistryV1Alpha1RepositoryTrack> {

    /**
     * @generated from field: string id = 1;
     */
    id = "";

    /**
     * @generated from field: google.protobuf.Timestamp create_time = 2;
     */
    createTime?: Timestamp;

    /**
     * Field number '3' reserved for the update_time.
     *
     * @generated from field: string name = 4;
     */
    name = "";

    constructor(data?: PartialMessage<BufAlphaRegistryV1Alpha1RepositoryTrack>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTrack";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 2, name: "create_time", kind: "message", T: Timestamp},
        {no: 4, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BufAlphaRegistryV1Alpha1RepositoryTrack {
        return new BufAlphaRegistryV1Alpha1RepositoryTrack().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1RepositoryTrack {
        return new BufAlphaRegistryV1Alpha1RepositoryTrack().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1RepositoryTrack {
        return new BufAlphaRegistryV1Alpha1RepositoryTrack().fromJsonString(jsonString, options);
    }

    static equals(a: BufAlphaRegistryV1Alpha1RepositoryTrack | PlainMessage<BufAlphaRegistryV1Alpha1RepositoryTrack> | undefined, b: BufAlphaRegistryV1Alpha1RepositoryTrack | PlainMessage<BufAlphaRegistryV1Alpha1RepositoryTrack> | undefined): boolean {
        return proto3.util.equals(BufAlphaRegistryV1Alpha1RepositoryTrack, a, b);
    }

}


