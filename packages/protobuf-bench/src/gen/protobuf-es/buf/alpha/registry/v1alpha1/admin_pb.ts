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
// @generated from file buf/alpha/registry/v1alpha1/admin.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage, GenDescService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Organization } from "./organization_pb.js";
import { fileDesc_buf_alpha_registry_v1alpha1_organization } from "./organization_pb.js";
import type { Plugin, Template } from "./plugin_pb.js";
import { fileDesc_buf_alpha_registry_v1alpha1_plugin } from "./plugin_pb.js";
import type { Repository } from "./repository_pb.js";
import { fileDesc_buf_alpha_registry_v1alpha1_repository } from "./repository_pb.js";
import type { User } from "./user_pb.js";
import { fileDesc_buf_alpha_registry_v1alpha1_user } from "./user_pb.js";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/alpha/registry/v1alpha1/admin.proto.
 */
export const fileDesc_buf_alpha_registry_v1alpha1_admin: GenDescFile = /*@__PURE__*/
  fileDesc("CididWYvYWxwaGEvcmVnaXN0cnkvdjFhbHBoYTEvYWRtaW4ucHJvdG8SG2J1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMSIpChZGb3JjZURlbGV0ZVVzZXJSZXF1ZXN0Eg8KB3VzZXJfaWQYASABKAkiuwIKF0ZvcmNlRGVsZXRlVXNlclJlc3BvbnNlEi8KBHVzZXIYASABKAsyIS5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuVXNlchJACg1vcmdhbml6YXRpb25zGAIgAygLMikuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLk9yZ2FuaXphdGlvbhI9CgxyZXBvc2l0b3JpZXMYAyADKAsyJy5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuUmVwb3NpdG9yeRI0CgdwbHVnaW5zGAQgAygLMiMuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLlBsdWdpbhI4Cgl0ZW1wbGF0ZXMYBSADKAsyJS5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuVGVtcGxhdGUyjAEKDEFkbWluU2VydmljZRJ8Cg9Gb3JjZURlbGV0ZVVzZXISMy5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuRm9yY2VEZWxldGVVc2VyUmVxdWVzdBo0LmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5Gb3JjZURlbGV0ZVVzZXJSZXNwb25zZWIGcHJvdG8z", [fileDesc_buf_alpha_registry_v1alpha1_organization, fileDesc_buf_alpha_registry_v1alpha1_plugin, fileDesc_buf_alpha_registry_v1alpha1_repository, fileDesc_buf_alpha_registry_v1alpha1_user]);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ForceDeleteUserRequest
 */
export type ForceDeleteUserRequest = Message<"buf.alpha.registry.v1alpha1.ForceDeleteUserRequest"> & {
  /**
   * @generated from field: string user_id = 1;
   */
  userId: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ForceDeleteUserRequest.
 * Use `create(ForceDeleteUserRequestDesc)` to create a new message.
 */
export const ForceDeleteUserRequestDesc: GenDescMessage<ForceDeleteUserRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_admin, 0);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ForceDeleteUserResponse
 */
export type ForceDeleteUserResponse = Message<"buf.alpha.registry.v1alpha1.ForceDeleteUserResponse"> & {
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
  organizations: Organization[];

  /**
   * The deleted repositories.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.Repository repositories = 3;
   */
  repositories: Repository[];

  /**
   * The deleted plugins.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.Plugin plugins = 4;
   */
  plugins: Plugin[];

  /**
   * The deleted templates.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.Template templates = 5;
   */
  templates: Template[];
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ForceDeleteUserResponse.
 * Use `create(ForceDeleteUserResponseDesc)` to create a new message.
 */
export const ForceDeleteUserResponseDesc: GenDescMessage<ForceDeleteUserResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_admin, 1);

/**
 * AdminService is the Admin service.
 *
 * @generated from service buf.alpha.registry.v1alpha1.AdminService
 */
export const AdminService: GenDescService<{
  /**
   * ForceDeleteUser forces to delete a user. Resources and organizations that are
   * solely owned by the user will also be deleted.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.AdminService.ForceDeleteUser
   */
  forceDeleteUser: {
    kind: "unary";
    I: ForceDeleteUserRequest;
    O: ForceDeleteUserResponse;
  },
}
> = /*@__PURE__*/
  serviceDesc(fileDesc_buf_alpha_registry_v1alpha1_admin, 0);

