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

// @generated by protoc-gen-es v2.0.0-alpha.1 with parameter "ts_nocheck=false,target=ts,import_extension=.js"
// @generated from file buf/alpha/registry/v1alpha1/display.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage, GenDescService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { PluginRole, RepositoryRole, TemplateRole } from "./role_pb.js";
import { fileDesc_buf_alpha_registry_v1alpha1_role } from "./role_pb.js";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/alpha/registry/v1alpha1/display.proto.
 */
export const fileDesc_buf_alpha_registry_v1alpha1_display: GenDescFile = /*@__PURE__*/
  fileDesc("CilidWYvYWxwaGEvcmVnaXN0cnkvdjFhbHBoYTEvZGlzcGxheS5wcm90bxIbYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExIj0KIkRpc3BsYXlPcmdhbml6YXRpb25FbGVtZW50c1JlcXVlc3QSFwoPb3JnYW5pemF0aW9uX2lkGAEgASgJIqsBCiNEaXNwbGF5T3JnYW5pemF0aW9uRWxlbWVudHNSZXNwb25zZRIZChFjcmVhdGVfcmVwb3NpdG9yeRgBIAEoCBIVCg1jcmVhdGVfcGx1Z2luGAIgASgIEhcKD2NyZWF0ZV90ZW1wbGF0ZRgDIAEoCBIQCghzZXR0aW5ncxgEIAEoCBIXCg91cGRhdGVfc2V0dGluZ3MYBSABKAgSDgoGZGVsZXRlGAYgASgIIjkKIERpc3BsYXlSZXBvc2l0b3J5RWxlbWVudHNSZXF1ZXN0EhUKDXJlcG9zaXRvcnlfaWQYASABKAkiRQohRGlzcGxheVJlcG9zaXRvcnlFbGVtZW50c1Jlc3BvbnNlEhAKCHNldHRpbmdzGAEgASgIEg4KBmRlbGV0ZRgCIAEoCCIxChxEaXNwbGF5UGx1Z2luRWxlbWVudHNSZXF1ZXN0EhEKCXBsdWdpbl9pZBgBIAEoCSJZCh1EaXNwbGF5UGx1Z2luRWxlbWVudHNSZXNwb25zZRIWCg5jcmVhdGVfdmVyc2lvbhgBIAEoCBIQCghzZXR0aW5ncxgCIAEoCBIOCgZkZWxldGUYAyABKAgiNQoeRGlzcGxheVRlbXBsYXRlRWxlbWVudHNSZXF1ZXN0EhMKC3RlbXBsYXRlX2lkGAEgASgJIlsKH0Rpc3BsYXlUZW1wbGF0ZUVsZW1lbnRzUmVzcG9uc2USFgoOY3JlYXRlX3ZlcnNpb24YASABKAgSEAoIc2V0dGluZ3MYAiABKAgSDgoGZGVsZXRlGAMgASgIIhwKGkRpc3BsYXlVc2VyRWxlbWVudHNSZXF1ZXN0Ii0KG0Rpc3BsYXlVc2VyRWxlbWVudHNSZXNwb25zZRIOCgZkZWxldGUYASABKAgiHgocRGlzcGxheVNlcnZlckVsZW1lbnRzUmVxdWVzdCI0Ch1EaXNwbGF5U2VydmVyRWxlbWVudHNSZXNwb25zZRITCgthZG1pbl9wYW5lbBgBIAEoCCI9CiRMaXN0TWFuYWdlYWJsZVJlcG9zaXRvcnlSb2xlc1JlcXVlc3QSFQoNcmVwb3NpdG9yeV9pZBgBIAEoCSJjCiVMaXN0TWFuYWdlYWJsZVJlcG9zaXRvcnlSb2xlc1Jlc3BvbnNlEjoKBXJvbGVzGAEgAygOMisuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLlJlcG9zaXRvcnlSb2xlIlIKKExpc3RNYW5hZ2VhYmxlVXNlclJlcG9zaXRvcnlSb2xlc1JlcXVlc3QSFQoNcmVwb3NpdG9yeV9pZBgBIAEoCRIPCgd1c2VyX2lkGAIgASgJImcKKUxpc3RNYW5hZ2VhYmxlVXNlclJlcG9zaXRvcnlSb2xlc1Jlc3BvbnNlEjoKBXJvbGVzGAEgAygOMisuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLlJlcG9zaXRvcnlSb2xlIjUKIExpc3RNYW5hZ2VhYmxlUGx1Z2luUm9sZXNSZXF1ZXN0EhEKCXBsdWdpbl9pZBgBIAEoCSJbCiFMaXN0TWFuYWdlYWJsZVBsdWdpblJvbGVzUmVzcG9uc2USNgoFcm9sZXMYASADKA4yJy5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuUGx1Z2luUm9sZSJKCiRMaXN0TWFuYWdlYWJsZVVzZXJQbHVnaW5Sb2xlc1JlcXVlc3QSEQoJcGx1Z2luX2lkGAEgASgJEg8KB3VzZXJfaWQYAiABKAkiXwolTGlzdE1hbmFnZWFibGVVc2VyUGx1Z2luUm9sZXNSZXNwb25zZRI2CgVyb2xlcxgBIAMoDjInLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5QbHVnaW5Sb2xlIjkKIkxpc3RNYW5hZ2VhYmxlVGVtcGxhdGVSb2xlc1JlcXVlc3QSEwoLdGVtcGxhdGVfaWQYASABKAkiXwojTGlzdE1hbmFnZWFibGVUZW1wbGF0ZVJvbGVzUmVzcG9uc2USOAoFcm9sZXMYASADKA4yKS5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuVGVtcGxhdGVSb2xlIk4KJkxpc3RNYW5hZ2VhYmxlVXNlclRlbXBsYXRlUm9sZXNSZXF1ZXN0EhMKC3RlbXBsYXRlX2lkGAEgASgJEg8KB3VzZXJfaWQYAiABKAkiYwonTGlzdE1hbmFnZWFibGVVc2VyVGVtcGxhdGVSb2xlc1Jlc3BvbnNlEjgKBXJvbGVzGAEgAygOMikuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLlRlbXBsYXRlUm9sZTKKDwoORGlzcGxheVNlcnZpY2USoAEKG0Rpc3BsYXlPcmdhbml6YXRpb25FbGVtZW50cxI/LmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5EaXNwbGF5T3JnYW5pemF0aW9uRWxlbWVudHNSZXF1ZXN0GkAuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkRpc3BsYXlPcmdhbml6YXRpb25FbGVtZW50c1Jlc3BvbnNlEpoBChlEaXNwbGF5UmVwb3NpdG9yeUVsZW1lbnRzEj0uYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkRpc3BsYXlSZXBvc2l0b3J5RWxlbWVudHNSZXF1ZXN0Gj4uYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkRpc3BsYXlSZXBvc2l0b3J5RWxlbWVudHNSZXNwb25zZRKOAQoVRGlzcGxheVBsdWdpbkVsZW1lbnRzEjkuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkRpc3BsYXlQbHVnaW5FbGVtZW50c1JlcXVlc3QaOi5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuRGlzcGxheVBsdWdpbkVsZW1lbnRzUmVzcG9uc2USlAEKF0Rpc3BsYXlUZW1wbGF0ZUVsZW1lbnRzEjsuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkRpc3BsYXlUZW1wbGF0ZUVsZW1lbnRzUmVxdWVzdBo8LmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5EaXNwbGF5VGVtcGxhdGVFbGVtZW50c1Jlc3BvbnNlEogBChNEaXNwbGF5VXNlckVsZW1lbnRzEjcuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkRpc3BsYXlVc2VyRWxlbWVudHNSZXF1ZXN0GjguYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkRpc3BsYXlVc2VyRWxlbWVudHNSZXNwb25zZRKOAQoVRGlzcGxheVNlcnZlckVsZW1lbnRzEjkuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkRpc3BsYXlTZXJ2ZXJFbGVtZW50c1JlcXVlc3QaOi5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuRGlzcGxheVNlcnZlckVsZW1lbnRzUmVzcG9uc2USpgEKHUxpc3RNYW5hZ2VhYmxlUmVwb3NpdG9yeVJvbGVzEkEuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkxpc3RNYW5hZ2VhYmxlUmVwb3NpdG9yeVJvbGVzUmVxdWVzdBpCLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5MaXN0TWFuYWdlYWJsZVJlcG9zaXRvcnlSb2xlc1Jlc3BvbnNlErIBCiFMaXN0TWFuYWdlYWJsZVVzZXJSZXBvc2l0b3J5Um9sZXMSRS5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuTGlzdE1hbmFnZWFibGVVc2VyUmVwb3NpdG9yeVJvbGVzUmVxdWVzdBpGLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5MaXN0TWFuYWdlYWJsZVVzZXJSZXBvc2l0b3J5Um9sZXNSZXNwb25zZRKaAQoZTGlzdE1hbmFnZWFibGVQbHVnaW5Sb2xlcxI9LmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5MaXN0TWFuYWdlYWJsZVBsdWdpblJvbGVzUmVxdWVzdBo+LmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5MaXN0TWFuYWdlYWJsZVBsdWdpblJvbGVzUmVzcG9uc2USpgEKHUxpc3RNYW5hZ2VhYmxlVXNlclBsdWdpblJvbGVzEkEuYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExLkxpc3RNYW5hZ2VhYmxlVXNlclBsdWdpblJvbGVzUmVxdWVzdBpCLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5MaXN0TWFuYWdlYWJsZVVzZXJQbHVnaW5Sb2xlc1Jlc3BvbnNlEqABChtMaXN0TWFuYWdlYWJsZVRlbXBsYXRlUm9sZXMSPy5idWYuYWxwaGEucmVnaXN0cnkudjFhbHBoYTEuTGlzdE1hbmFnZWFibGVUZW1wbGF0ZVJvbGVzUmVxdWVzdBpALmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5MaXN0TWFuYWdlYWJsZVRlbXBsYXRlUm9sZXNSZXNwb25zZRKsAQofTGlzdE1hbmFnZWFibGVVc2VyVGVtcGxhdGVSb2xlcxJDLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5MaXN0TWFuYWdlYWJsZVVzZXJUZW1wbGF0ZVJvbGVzUmVxdWVzdBpELmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5MaXN0TWFuYWdlYWJsZVVzZXJUZW1wbGF0ZVJvbGVzUmVzcG9uc2ViBnByb3RvMw", [fileDesc_buf_alpha_registry_v1alpha1_role]);

/**
 * @generated from message buf.alpha.registry.v1alpha1.DisplayOrganizationElementsRequest
 */
export type DisplayOrganizationElementsRequest = Message<"buf.alpha.registry.v1alpha1.DisplayOrganizationElementsRequest"> & {
  /**
   * The ID of the organization for which to check
   * which elements should be displayed.
   *
   * @generated from field: string organization_id = 1;
   */
  organizationId: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.DisplayOrganizationElementsRequest.
 * Use `create(DisplayOrganizationElementsRequestDesc)` to create a new message.
 */
export const DisplayOrganizationElementsRequestDesc: GenDescMessage<DisplayOrganizationElementsRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 0);

/**
 * @generated from message buf.alpha.registry.v1alpha1.DisplayOrganizationElementsResponse
 */
export type DisplayOrganizationElementsResponse = Message<"buf.alpha.registry.v1alpha1.DisplayOrganizationElementsResponse"> & {
  /**
   * Display create organization repository element if true.
   *
   * @generated from field: bool create_repository = 1;
   */
  createRepository: boolean;

  /**
   * Display create organization plugin element if true.
   *
   * @generated from field: bool create_plugin = 2;
   */
  createPlugin: boolean;

  /**
   * Display create organization template element if true.
   *
   * @generated from field: bool create_template = 3;
   */
  createTemplate: boolean;

  /**
   * Display organization settings element if true.
   *
   * @generated from field: bool settings = 4;
   */
  settings: boolean;

  /**
   * Display update organization settings element if true.
   *
   * @generated from field: bool update_settings = 5;
   */
  updateSettings: boolean;

  /**
   * Display delete organization element if true.
   *
   * @generated from field: bool delete = 6;
   */
  delete: boolean;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.DisplayOrganizationElementsResponse.
 * Use `create(DisplayOrganizationElementsResponseDesc)` to create a new message.
 */
export const DisplayOrganizationElementsResponseDesc: GenDescMessage<DisplayOrganizationElementsResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 1);

/**
 * @generated from message buf.alpha.registry.v1alpha1.DisplayRepositoryElementsRequest
 */
export type DisplayRepositoryElementsRequest = Message<"buf.alpha.registry.v1alpha1.DisplayRepositoryElementsRequest"> & {
  /**
   * The ID of the repository for which to check
   * which elements should be displayed.
   *
   * @generated from field: string repository_id = 1;
   */
  repositoryId: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.DisplayRepositoryElementsRequest.
 * Use `create(DisplayRepositoryElementsRequestDesc)` to create a new message.
 */
export const DisplayRepositoryElementsRequestDesc: GenDescMessage<DisplayRepositoryElementsRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 2);

/**
 * @generated from message buf.alpha.registry.v1alpha1.DisplayRepositoryElementsResponse
 */
export type DisplayRepositoryElementsResponse = Message<"buf.alpha.registry.v1alpha1.DisplayRepositoryElementsResponse"> & {
  /**
   * Display repository settings element if true.
   *
   * @generated from field: bool settings = 1;
   */
  settings: boolean;

  /**
   * Display delete repository element if true.
   *
   * @generated from field: bool delete = 2;
   */
  delete: boolean;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.DisplayRepositoryElementsResponse.
 * Use `create(DisplayRepositoryElementsResponseDesc)` to create a new message.
 */
export const DisplayRepositoryElementsResponseDesc: GenDescMessage<DisplayRepositoryElementsResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 3);

/**
 * @generated from message buf.alpha.registry.v1alpha1.DisplayPluginElementsRequest
 */
export type DisplayPluginElementsRequest = Message<"buf.alpha.registry.v1alpha1.DisplayPluginElementsRequest"> & {
  /**
   * The ID of the plugin for which to check
   * which elements should be displayed.
   *
   * @generated from field: string plugin_id = 1;
   */
  pluginId: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.DisplayPluginElementsRequest.
 * Use `create(DisplayPluginElementsRequestDesc)` to create a new message.
 */
export const DisplayPluginElementsRequestDesc: GenDescMessage<DisplayPluginElementsRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 4);

/**
 * @generated from message buf.alpha.registry.v1alpha1.DisplayPluginElementsResponse
 */
export type DisplayPluginElementsResponse = Message<"buf.alpha.registry.v1alpha1.DisplayPluginElementsResponse"> & {
  /**
   * Display create plugin version element if true.
   *
   * @generated from field: bool create_version = 1;
   */
  createVersion: boolean;

  /**
   * Display plugin settings element if true.
   *
   * @generated from field: bool settings = 2;
   */
  settings: boolean;

  /**
   * Display delete plugin element if true.
   *
   * @generated from field: bool delete = 3;
   */
  delete: boolean;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.DisplayPluginElementsResponse.
 * Use `create(DisplayPluginElementsResponseDesc)` to create a new message.
 */
export const DisplayPluginElementsResponseDesc: GenDescMessage<DisplayPluginElementsResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 5);

/**
 * @generated from message buf.alpha.registry.v1alpha1.DisplayTemplateElementsRequest
 */
export type DisplayTemplateElementsRequest = Message<"buf.alpha.registry.v1alpha1.DisplayTemplateElementsRequest"> & {
  /**
   * The ID of the template for which to check
   * which elements should be displayed.
   *
   * @generated from field: string template_id = 1;
   */
  templateId: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.DisplayTemplateElementsRequest.
 * Use `create(DisplayTemplateElementsRequestDesc)` to create a new message.
 */
export const DisplayTemplateElementsRequestDesc: GenDescMessage<DisplayTemplateElementsRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 6);

/**
 * @generated from message buf.alpha.registry.v1alpha1.DisplayTemplateElementsResponse
 */
export type DisplayTemplateElementsResponse = Message<"buf.alpha.registry.v1alpha1.DisplayTemplateElementsResponse"> & {
  /**
   * Display create template version element if true.
   *
   * @generated from field: bool create_version = 1;
   */
  createVersion: boolean;

  /**
   * Display template settings element if true.
   *
   * @generated from field: bool settings = 2;
   */
  settings: boolean;

  /**
   * Display delete template element if true.
   *
   * @generated from field: bool delete = 3;
   */
  delete: boolean;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.DisplayTemplateElementsResponse.
 * Use `create(DisplayTemplateElementsResponseDesc)` to create a new message.
 */
export const DisplayTemplateElementsResponseDesc: GenDescMessage<DisplayTemplateElementsResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 7);

/**
 * @generated from message buf.alpha.registry.v1alpha1.DisplayUserElementsRequest
 */
export type DisplayUserElementsRequest = Message<"buf.alpha.registry.v1alpha1.DisplayUserElementsRequest"> & {
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.DisplayUserElementsRequest.
 * Use `create(DisplayUserElementsRequestDesc)` to create a new message.
 */
export const DisplayUserElementsRequestDesc: GenDescMessage<DisplayUserElementsRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 8);

/**
 * @generated from message buf.alpha.registry.v1alpha1.DisplayUserElementsResponse
 */
export type DisplayUserElementsResponse = Message<"buf.alpha.registry.v1alpha1.DisplayUserElementsResponse"> & {
  /**
   * Display delete user element if true.
   *
   * @generated from field: bool delete = 1;
   */
  delete: boolean;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.DisplayUserElementsResponse.
 * Use `create(DisplayUserElementsResponseDesc)` to create a new message.
 */
export const DisplayUserElementsResponseDesc: GenDescMessage<DisplayUserElementsResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 9);

/**
 * @generated from message buf.alpha.registry.v1alpha1.DisplayServerElementsRequest
 */
export type DisplayServerElementsRequest = Message<"buf.alpha.registry.v1alpha1.DisplayServerElementsRequest"> & {
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.DisplayServerElementsRequest.
 * Use `create(DisplayServerElementsRequestDesc)` to create a new message.
 */
export const DisplayServerElementsRequestDesc: GenDescMessage<DisplayServerElementsRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 10);

/**
 * @generated from message buf.alpha.registry.v1alpha1.DisplayServerElementsResponse
 */
export type DisplayServerElementsResponse = Message<"buf.alpha.registry.v1alpha1.DisplayServerElementsResponse"> & {
  /**
   * Display server admin panel element if true.
   *
   * @generated from field: bool admin_panel = 1;
   */
  adminPanel: boolean;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.DisplayServerElementsResponse.
 * Use `create(DisplayServerElementsResponseDesc)` to create a new message.
 */
export const DisplayServerElementsResponseDesc: GenDescMessage<DisplayServerElementsResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 11);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesRequest
 */
export type ListManageableRepositoryRolesRequest = Message<"buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesRequest"> & {
  /**
   * The ID of the repository for which to check
   * which roles should be displayed as manageable.
   *
   * @generated from field: string repository_id = 1;
   */
  repositoryId: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesRequest.
 * Use `create(ListManageableRepositoryRolesRequestDesc)` to create a new message.
 */
export const ListManageableRepositoryRolesRequestDesc: GenDescMessage<ListManageableRepositoryRolesRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 12);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesResponse
 */
export type ListManageableRepositoryRolesResponse = Message<"buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesResponse"> & {
  /**
   * The list of roles that should be displayed
   * to the user as manageable.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.RepositoryRole roles = 1;
   */
  roles: RepositoryRole[];
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesResponse.
 * Use `create(ListManageableRepositoryRolesResponseDesc)` to create a new message.
 */
export const ListManageableRepositoryRolesResponseDesc: GenDescMessage<ListManageableRepositoryRolesResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 13);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesRequest
 */
export type ListManageableUserRepositoryRolesRequest = Message<"buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesRequest"> & {
  /**
   * The ID of the repository for which to check
   * which roles should be displayed as manageable.
   *
   * @generated from field: string repository_id = 1;
   */
  repositoryId: string;

  /**
   * The ID of the target user for which to check
   * which roles are manageable.
   *
   * @generated from field: string user_id = 2;
   */
  userId: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesRequest.
 * Use `create(ListManageableUserRepositoryRolesRequestDesc)` to create a new message.
 */
export const ListManageableUserRepositoryRolesRequestDesc: GenDescMessage<ListManageableUserRepositoryRolesRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 14);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesResponse
 */
export type ListManageableUserRepositoryRolesResponse = Message<"buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesResponse"> & {
  /**
   * The list of roles that should be displayed
   * to the user as manageable.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.RepositoryRole roles = 1;
   */
  roles: RepositoryRole[];
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesResponse.
 * Use `create(ListManageableUserRepositoryRolesResponseDesc)` to create a new message.
 */
export const ListManageableUserRepositoryRolesResponseDesc: GenDescMessage<ListManageableUserRepositoryRolesResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 15);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListManageablePluginRolesRequest
 */
export type ListManageablePluginRolesRequest = Message<"buf.alpha.registry.v1alpha1.ListManageablePluginRolesRequest"> & {
  /**
   * The ID of the plugin for which to check
   * which roles should be displayed as manageable.
   *
   * @generated from field: string plugin_id = 1;
   */
  pluginId: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListManageablePluginRolesRequest.
 * Use `create(ListManageablePluginRolesRequestDesc)` to create a new message.
 */
export const ListManageablePluginRolesRequestDesc: GenDescMessage<ListManageablePluginRolesRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 16);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListManageablePluginRolesResponse
 */
export type ListManageablePluginRolesResponse = Message<"buf.alpha.registry.v1alpha1.ListManageablePluginRolesResponse"> & {
  /**
   * The list of roles that should be displayed
   * to the user as manageable.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.PluginRole roles = 1;
   */
  roles: PluginRole[];
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListManageablePluginRolesResponse.
 * Use `create(ListManageablePluginRolesResponseDesc)` to create a new message.
 */
export const ListManageablePluginRolesResponseDesc: GenDescMessage<ListManageablePluginRolesResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 17);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesRequest
 */
export type ListManageableUserPluginRolesRequest = Message<"buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesRequest"> & {
  /**
   * The ID of the plugin for which to check
   * which roles should be displayed as manageable.
   *
   * @generated from field: string plugin_id = 1;
   */
  pluginId: string;

  /**
   * The ID of the target user for which to check
   * which roles are manageable.
   *
   * @generated from field: string user_id = 2;
   */
  userId: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesRequest.
 * Use `create(ListManageableUserPluginRolesRequestDesc)` to create a new message.
 */
export const ListManageableUserPluginRolesRequestDesc: GenDescMessage<ListManageableUserPluginRolesRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 18);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesResponse
 */
export type ListManageableUserPluginRolesResponse = Message<"buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesResponse"> & {
  /**
   * The list of roles that should be displayed
   * to the user as manageable.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.PluginRole roles = 1;
   */
  roles: PluginRole[];
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesResponse.
 * Use `create(ListManageableUserPluginRolesResponseDesc)` to create a new message.
 */
export const ListManageableUserPluginRolesResponseDesc: GenDescMessage<ListManageableUserPluginRolesResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 19);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListManageableTemplateRolesRequest
 */
export type ListManageableTemplateRolesRequest = Message<"buf.alpha.registry.v1alpha1.ListManageableTemplateRolesRequest"> & {
  /**
   * The ID of the template for which to check
   * which roles should be displayed as manageable.
   *
   * @generated from field: string template_id = 1;
   */
  templateId: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListManageableTemplateRolesRequest.
 * Use `create(ListManageableTemplateRolesRequestDesc)` to create a new message.
 */
export const ListManageableTemplateRolesRequestDesc: GenDescMessage<ListManageableTemplateRolesRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 20);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListManageableTemplateRolesResponse
 */
export type ListManageableTemplateRolesResponse = Message<"buf.alpha.registry.v1alpha1.ListManageableTemplateRolesResponse"> & {
  /**
   * The list of roles that should be displayed
   * to the user as manageable.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.TemplateRole roles = 1;
   */
  roles: TemplateRole[];
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListManageableTemplateRolesResponse.
 * Use `create(ListManageableTemplateRolesResponseDesc)` to create a new message.
 */
export const ListManageableTemplateRolesResponseDesc: GenDescMessage<ListManageableTemplateRolesResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 21);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesRequest
 */
export type ListManageableUserTemplateRolesRequest = Message<"buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesRequest"> & {
  /**
   * The ID of the template for which to check
   * which roles should be displayed as manageable.
   *
   * @generated from field: string template_id = 1;
   */
  templateId: string;

  /**
   * The ID of the target user for which to check
   * which roles are manageable.
   *
   * @generated from field: string user_id = 2;
   */
  userId: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesRequest.
 * Use `create(ListManageableUserTemplateRolesRequestDesc)` to create a new message.
 */
export const ListManageableUserTemplateRolesRequestDesc: GenDescMessage<ListManageableUserTemplateRolesRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 22);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesResponse
 */
export type ListManageableUserTemplateRolesResponse = Message<"buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesResponse"> & {
  /**
   * The list of roles that should be displayed
   * to the user as manageable.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.TemplateRole roles = 1;
   */
  roles: TemplateRole[];
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesResponse.
 * Use `create(ListManageableUserTemplateRolesResponseDesc)` to create a new message.
 */
export const ListManageableUserTemplateRolesResponseDesc: GenDescMessage<ListManageableUserTemplateRolesResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 23);

/**
 * DisplayService provides information regarding
 * UI element displaying based on the users roles.
 *
 * @generated from service buf.alpha.registry.v1alpha1.DisplayService
 */
export const DisplayService: GenDescService<{
  /**
   * DisplayOrganizationElements returns which organization elements should be displayed to the user.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.DisplayService.DisplayOrganizationElements
   */
  displayOrganizationElements: {
    kind: "unary";
    I: DisplayOrganizationElementsRequest;
    O: DisplayOrganizationElementsResponse;
  },
  /**
   * DisplayRepositoryElements returns which repository elements should be displayed to the user.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.DisplayService.DisplayRepositoryElements
   */
  displayRepositoryElements: {
    kind: "unary";
    I: DisplayRepositoryElementsRequest;
    O: DisplayRepositoryElementsResponse;
  },
  /**
   * DisplayPluginElements returns which plugin elements should be displayed to the user.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.DisplayService.DisplayPluginElements
   */
  displayPluginElements: {
    kind: "unary";
    I: DisplayPluginElementsRequest;
    O: DisplayPluginElementsResponse;
  },
  /**
   * DisplayTemplateElements returns which template elements should be displayed to the user.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.DisplayService.DisplayTemplateElements
   */
  displayTemplateElements: {
    kind: "unary";
    I: DisplayTemplateElementsRequest;
    O: DisplayTemplateElementsResponse;
  },
  /**
   * DisplayUserElements returns which user elements should be displayed to the user.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.DisplayService.DisplayUserElements
   */
  displayUserElements: {
    kind: "unary";
    I: DisplayUserElementsRequest;
    O: DisplayUserElementsResponse;
  },
  /**
   * DisplayServerElements returns which server elements should be displayed to the user.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.DisplayService.DisplayServerElements
   */
  displayServerElements: {
    kind: "unary";
    I: DisplayServerElementsRequest;
    O: DisplayServerElementsResponse;
  },
  /**
   * ListManageableRepositoryRoles returns which roles should be displayed
   * to the user when they are managing contributors on the repository.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.DisplayService.ListManageableRepositoryRoles
   */
  listManageableRepositoryRoles: {
    kind: "unary";
    I: ListManageableRepositoryRolesRequest;
    O: ListManageableRepositoryRolesResponse;
  },
  /**
   * ListManageableUserRepositoryRoles returns which roles should be displayed
   * to the user when they are managing a specific contributor on the repository.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.DisplayService.ListManageableUserRepositoryRoles
   */
  listManageableUserRepositoryRoles: {
    kind: "unary";
    I: ListManageableUserRepositoryRolesRequest;
    O: ListManageableUserRepositoryRolesResponse;
  },
  /**
   * ListManageablePluginRoles returns which roles should be displayed
   * to the user when they are managing contributors on the plugin.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.DisplayService.ListManageablePluginRoles
   */
  listManageablePluginRoles: {
    kind: "unary";
    I: ListManageablePluginRolesRequest;
    O: ListManageablePluginRolesResponse;
  },
  /**
   * ListManageableUserPluginRoles returns which roles should be displayed
   * to the user when they are managing a specific contributor on the plugin.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.DisplayService.ListManageableUserPluginRoles
   */
  listManageableUserPluginRoles: {
    kind: "unary";
    I: ListManageableUserPluginRolesRequest;
    O: ListManageableUserPluginRolesResponse;
  },
  /**
   * ListManageableTemplateRoles returns which roles should be displayed
   * to the user when they are managing contributors on the template.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.DisplayService.ListManageableTemplateRoles
   */
  listManageableTemplateRoles: {
    kind: "unary";
    I: ListManageableTemplateRolesRequest;
    O: ListManageableTemplateRolesResponse;
  },
  /**
   * ListManageableUserTemplateRoles returns which roles should be displayed
   * to the user when they are managing a specific contributor on the template.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.DisplayService.ListManageableUserTemplateRoles
   */
  listManageableUserTemplateRoles: {
    kind: "unary";
    I: ListManageableUserTemplateRolesRequest;
    O: ListManageableUserTemplateRolesResponse;
  },
}
> = /*@__PURE__*/
  serviceDesc(fileDesc_buf_alpha_registry_v1alpha1_display, 0);

