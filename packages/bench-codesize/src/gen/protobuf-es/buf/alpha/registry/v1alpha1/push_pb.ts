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

// @generated by protoc-gen-es v0.0.2-alpha.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/push.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import {Module} from "../../module/v1alpha1/module_pb.js";
import {LocalModulePin} from "./module_pb.js";

/**
 * @generated from message buf.alpha.registry.v1alpha1.PushRequest
 */
export class PushRequest extends Message<PushRequest> {
  /**
   * @generated from field: string owner = 1;
   */
  owner = "";

  /**
   * @generated from field: string repository = 2;
   */
  repository = "";

  /**
   * @generated from field: string branch = 3;
   */
  branch = "";

  /**
   * @generated from field: buf.alpha.module.v1alpha1.Module module = 4;
   */
  module?: Module;

  /**
   * Optional; if provided, the provided tags
   * are created for the pushed commit.
   *
   * @generated from field: repeated string tags = 5;
   */
  tags: string[] = [];

  /**
   * Optional; if provided, the pushed commit
   * will be appended to these tracks. If the
   * tracks do not exist, they will be created.
   *
   * @generated from field: repeated string tracks = 6;
   */
  tracks: string[] = [];

  constructor(data?: PartialMessage<PushRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.PushRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "repository", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "branch", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "module", kind: "message", T: Module },
    { no: 5, name: "tags", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 6, name: "tracks", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PushRequest {
    return new PushRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PushRequest {
    return new PushRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PushRequest {
    return new PushRequest().fromJsonString(jsonString, options);
  }

  static equals(a: PushRequest | PlainMessage<PushRequest> | undefined, b: PushRequest | PlainMessage<PushRequest> | undefined): boolean {
    return proto3.util.equals(PushRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.PushResponse
 */
export class PushResponse extends Message<PushResponse> {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.LocalModulePin local_module_pin = 5;
   */
  localModulePin?: LocalModulePin;

  constructor(data?: PartialMessage<PushResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.PushResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 5, name: "local_module_pin", kind: "message", T: LocalModulePin },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PushResponse {
    return new PushResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PushResponse {
    return new PushResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PushResponse {
    return new PushResponse().fromJsonString(jsonString, options);
  }

  static equals(a: PushResponse | PlainMessage<PushResponse> | undefined, b: PushResponse | PlainMessage<PushResponse> | undefined): boolean {
    return proto3.util.equals(PushResponse, a, b);
  }
}

