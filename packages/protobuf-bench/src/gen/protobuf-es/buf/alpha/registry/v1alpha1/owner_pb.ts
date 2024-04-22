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
// @generated from file buf/alpha/registry/v1alpha1/owner.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage, GenDescService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { User } from "./user_pb.js";
import { fileDesc_buf_alpha_registry_v1alpha1_user } from "./user_pb.js";
import type { Organization } from "./organization_pb.js";
import { fileDesc_buf_alpha_registry_v1alpha1_organization } from "./organization_pb.js";
import type { Message } from "@bufbuild/protobuf";

export const fileDesc_buf_alpha_registry_v1alpha1_owner: GenDescFile = /*@__PURE__*/
  fileDesc("CididWYvYWxwaGEvcmVnaXN0cnkvdjFhbHBoYTEvb3duZXIucHJvdG8SG2J1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMSKGAQoFT3duZXISMQoEdXNlchgBIAEoCzIhLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5Vc2VySAASQQoMb3JnYW5pemF0aW9uGAIgASgLMikuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLk9yZ2FuaXphdGlvbkgAQgcKBW93bmVyIiUKFUdldE93bmVyQnlOYW1lUmVxdWVzdBIMCgRuYW1lGAEgASgJIksKFkdldE93bmVyQnlOYW1lUmVzcG9uc2USMQoFb3duZXIYASABKAsyIi5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuT3duZXIyiQEKDE93bmVyU2VydmljZRJ5Cg5HZXRPd25lckJ5TmFtZRIyLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5HZXRPd25lckJ5TmFtZVJlcXVlc3QaMy5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuR2V0T3duZXJCeU5hbWVSZXNwb25zZWIGcHJvdG8z", [fileDesc_buf_alpha_registry_v1alpha1_user, fileDesc_buf_alpha_registry_v1alpha1_organization]);

/**
 * @generated from message buf.alpha.registry.v1alpha1.Owner
 */
export type Owner = Message<"buf.alpha.registry.v1alpha1.Owner"> & {
  /**
   * @generated from oneof buf.alpha.registry.v1alpha1.Owner.owner
   */
  owner: {
    /**
     * The requested owner is a `User`.
     *
     * @generated from field: buf.alpha.registry.v1alpha1.User user = 1;
     */
    value: User;
    case: "user";
  } | {
    /**
     * The requested owner is a `Organization`.
     *
     * @generated from field: buf.alpha.registry.v1alpha1.Organization organization = 2;
     */
    value: Organization;
    case: "organization";
  } | { case: undefined; value?: undefined };
};

// Describes the message buf.alpha.registry.v1alpha1.Owner.
// Use `create(OwnerDesc)` to create a new Owner.
export const OwnerDesc: GenDescMessage<Owner> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_owner, 0);

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetOwnerByNameRequest
 */
export type GetOwnerByNameRequest = Message<"buf.alpha.registry.v1alpha1.GetOwnerByNameRequest"> & {
  /**
   * Name of the requested owner.
   *
   * @generated from field: string name = 1;
   */
  name: string;
};

// Describes the message buf.alpha.registry.v1alpha1.GetOwnerByNameRequest.
// Use `create(GetOwnerByNameRequestDesc)` to create a new GetOwnerByNameRequest.
export const GetOwnerByNameRequestDesc: GenDescMessage<GetOwnerByNameRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_owner, 1);

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetOwnerByNameResponse
 */
export type GetOwnerByNameResponse = Message<"buf.alpha.registry.v1alpha1.GetOwnerByNameResponse"> & {
  /**
   * @generated from field: buf.alpha.registry.v1alpha1.Owner owner = 1;
   */
  owner?: Owner;
};

// Describes the message buf.alpha.registry.v1alpha1.GetOwnerByNameResponse.
// Use `create(GetOwnerByNameResponseDesc)` to create a new GetOwnerByNameResponse.
export const GetOwnerByNameResponseDesc: GenDescMessage<GetOwnerByNameResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_owner, 2);

/**
 * OwnerService is a service that provides RPCs that allow the BSR to query
 * for owner information.
 *
 * @generated from service buf.alpha.registry.v1alpha1.OwnerService
 */
export const OwnerService: GenDescService<{
  /**
   * GetOwnerByName takes an owner name and returns the owner as
   * either a user or organization.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.OwnerService.GetOwnerByName
   */
  getOwnerByName: {
    kind: "unary";
    I: GetOwnerByNameRequest;
    O: GetOwnerByNameResponse;
  },
}
> = /*@__PURE__*/
  serviceDesc(fileDesc_buf_alpha_registry_v1alpha1_owner, 0);

