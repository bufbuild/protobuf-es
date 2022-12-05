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

// @generated by protoc-gen-es v0.4.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/admin.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { User } from "./user_pb.js";
import { Organization } from "./organization_pb.js";
import { Repository } from "./repository_pb.js";
import { Plugin, Template } from "./plugin_pb.js";

/**
 * @generated from message buf.alpha.registry.v1alpha1.ForceDeleteUserRequest
 */
export class ForceDeleteUserRequest extends Message<ForceDeleteUserRequest> {
  /**
   * @generated from field: string user_id = 1;
   */
  userId = "";

  constructor(data?: PartialMessage<ForceDeleteUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ForceDeleteUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ForceDeleteUserRequest {
    return new ForceDeleteUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ForceDeleteUserRequest {
    return new ForceDeleteUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ForceDeleteUserRequest {
    return new ForceDeleteUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ForceDeleteUserRequest | PlainMessage<ForceDeleteUserRequest> | undefined, b: ForceDeleteUserRequest | PlainMessage<ForceDeleteUserRequest> | undefined): boolean {
    return proto3.util.equals(ForceDeleteUserRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ForceDeleteUserResponse
 */
export class ForceDeleteUserResponse extends Message<ForceDeleteUserResponse> {
  /**
   * The deleted user.
   *
   * @generated from field: buf.alpha.registry.v1alpha1.User user = 1;
   */
  user?: User;

  /**
   * The deleted organizations.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.Organization organizations = 2;
   */
  organizations: Organization[] = [];

  /**
   * The deleted repositories.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.Repository repositories = 3;
   */
  repositories: Repository[] = [];

  /**
   * The deleted plugins.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.Plugin plugins = 4;
   */
  plugins: Plugin[] = [];

  /**
   * The deleted templates.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.Template templates = 5;
   */
  templates: Template[] = [];

  constructor(data?: PartialMessage<ForceDeleteUserResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ForceDeleteUserResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: User },
    { no: 2, name: "organizations", kind: "message", T: Organization, repeated: true },
    { no: 3, name: "repositories", kind: "message", T: Repository, repeated: true },
    { no: 4, name: "plugins", kind: "message", T: Plugin, repeated: true },
    { no: 5, name: "templates", kind: "message", T: Template, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ForceDeleteUserResponse {
    return new ForceDeleteUserResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ForceDeleteUserResponse {
    return new ForceDeleteUserResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ForceDeleteUserResponse {
    return new ForceDeleteUserResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ForceDeleteUserResponse | PlainMessage<ForceDeleteUserResponse> | undefined, b: ForceDeleteUserResponse | PlainMessage<ForceDeleteUserResponse> | undefined): boolean {
    return proto3.util.equals(ForceDeleteUserResponse, a, b);
  }
}

