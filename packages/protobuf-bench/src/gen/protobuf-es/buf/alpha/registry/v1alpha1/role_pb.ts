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

// @generated by protoc-gen-es v1.6.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/role.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import { proto3 } from "@bufbuild/protobuf";

/**
 * The roles that users can have in a Server.
 *
 * @generated from enum buf.alpha.registry.v1alpha1.ServerRole
 */
export enum ServerRole {
  /**
   * @generated from enum value: SERVER_ROLE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: SERVER_ROLE_ADMIN = 1;
   */
  ADMIN = 1,

  /**
   * @generated from enum value: SERVER_ROLE_MEMBER = 2;
   */
  MEMBER = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(ServerRole)
proto3.util.setEnumType(ServerRole, "buf.alpha.registry.v1alpha1.ServerRole", [
  { no: 0, name: "SERVER_ROLE_UNSPECIFIED" },
  { no: 1, name: "SERVER_ROLE_ADMIN" },
  { no: 2, name: "SERVER_ROLE_MEMBER" },
]);

/**
 * The roles that users can have in a Organization.
 *
 * @generated from enum buf.alpha.registry.v1alpha1.OrganizationRole
 */
export enum OrganizationRole {
  /**
   * @generated from enum value: ORGANIZATION_ROLE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: ORGANIZATION_ROLE_OWNER = 1;
   */
  OWNER = 1,

  /**
   * @generated from enum value: ORGANIZATION_ROLE_ADMIN = 2;
   */
  ADMIN = 2,

  /**
   * @generated from enum value: ORGANIZATION_ROLE_MEMBER = 3;
   */
  MEMBER = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(OrganizationRole)
proto3.util.setEnumType(OrganizationRole, "buf.alpha.registry.v1alpha1.OrganizationRole", [
  { no: 0, name: "ORGANIZATION_ROLE_UNSPECIFIED" },
  { no: 1, name: "ORGANIZATION_ROLE_OWNER" },
  { no: 2, name: "ORGANIZATION_ROLE_ADMIN" },
  { no: 3, name: "ORGANIZATION_ROLE_MEMBER" },
]);

/**
 * The roles that users can have for a Repository.
 *
 * @generated from enum buf.alpha.registry.v1alpha1.RepositoryRole
 */
export enum RepositoryRole {
  /**
   * @generated from enum value: REPOSITORY_ROLE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: REPOSITORY_ROLE_OWNER = 1;
   */
  OWNER = 1,

  /**
   * @generated from enum value: REPOSITORY_ROLE_ADMIN = 2;
   */
  ADMIN = 2,

  /**
   * @generated from enum value: REPOSITORY_ROLE_WRITE = 3;
   */
  WRITE = 3,

  /**
   * @generated from enum value: REPOSITORY_ROLE_READ = 4;
   */
  READ = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(RepositoryRole)
proto3.util.setEnumType(RepositoryRole, "buf.alpha.registry.v1alpha1.RepositoryRole", [
  { no: 0, name: "REPOSITORY_ROLE_UNSPECIFIED" },
  { no: 1, name: "REPOSITORY_ROLE_OWNER" },
  { no: 2, name: "REPOSITORY_ROLE_ADMIN" },
  { no: 3, name: "REPOSITORY_ROLE_WRITE" },
  { no: 4, name: "REPOSITORY_ROLE_READ" },
]);

/**
 * The roles that users can have for a Template.
 *
 * @generated from enum buf.alpha.registry.v1alpha1.TemplateRole
 */
export enum TemplateRole {
  /**
   * @generated from enum value: TEMPLATE_ROLE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: TEMPLATE_ROLE_OWNER = 1;
   */
  OWNER = 1,

  /**
   * @generated from enum value: TEMPLATE_ROLE_ADMIN = 2;
   */
  ADMIN = 2,

  /**
   * @generated from enum value: TEMPLATE_ROLE_WRITE = 3;
   */
  WRITE = 3,

  /**
   * @generated from enum value: TEMPLATE_ROLE_READ = 4;
   */
  READ = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(TemplateRole)
proto3.util.setEnumType(TemplateRole, "buf.alpha.registry.v1alpha1.TemplateRole", [
  { no: 0, name: "TEMPLATE_ROLE_UNSPECIFIED" },
  { no: 1, name: "TEMPLATE_ROLE_OWNER" },
  { no: 2, name: "TEMPLATE_ROLE_ADMIN" },
  { no: 3, name: "TEMPLATE_ROLE_WRITE" },
  { no: 4, name: "TEMPLATE_ROLE_READ" },
]);

/**
 * The roles that users can have for a Plugin.
 *
 * @generated from enum buf.alpha.registry.v1alpha1.PluginRole
 */
export enum PluginRole {
  /**
   * @generated from enum value: PLUGIN_ROLE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: PLUGIN_ROLE_OWNER = 1;
   */
  OWNER = 1,

  /**
   * @generated from enum value: PLUGIN_ROLE_ADMIN = 2;
   */
  ADMIN = 2,

  /**
   * @generated from enum value: PLUGIN_ROLE_WRITE = 3;
   */
  WRITE = 3,

  /**
   * @generated from enum value: PLUGIN_ROLE_READ = 4;
   */
  READ = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(PluginRole)
proto3.util.setEnumType(PluginRole, "buf.alpha.registry.v1alpha1.PluginRole", [
  { no: 0, name: "PLUGIN_ROLE_UNSPECIFIED" },
  { no: 1, name: "PLUGIN_ROLE_OWNER" },
  { no: 2, name: "PLUGIN_ROLE_ADMIN" },
  { no: 3, name: "PLUGIN_ROLE_WRITE" },
  { no: 4, name: "PLUGIN_ROLE_READ" },
]);

