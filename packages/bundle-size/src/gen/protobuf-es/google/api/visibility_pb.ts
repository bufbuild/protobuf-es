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

// @generated by protoc-gen-es v2.0.0-alpha.4 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/api/visibility.proto (package google.api, syntax proto3)
/* eslint-disable */

import type { GenDescExtension, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { EnumOptions, EnumValueOptions, FieldOptions, MessageOptions, MethodOptions, ServiceOptions } from "@bufbuild/protobuf/wkt";
import { fileDesc_google_protobuf_descriptor } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/api/visibility.proto.
 */
export const fileDesc_google_api_visibility: GenDescFile = /*@__PURE__*/
  fileDesc("Chtnb29nbGUvYXBpL3Zpc2liaWxpdHkucHJvdG8SCmdvb2dsZS5hcGkiNwoKVmlzaWJpbGl0eRIpCgVydWxlcxgBIAMoCzIaLmdvb2dsZS5hcGkuVmlzaWJpbGl0eVJ1bGUiNwoOVmlzaWJpbGl0eVJ1bGUSEAoIc2VsZWN0b3IYASABKAkSEwoLcmVzdHJpY3Rpb24YAiABKAk6ZAoPZW51bV92aXNpYmlsaXR5EhwuZ29vZ2xlLnByb3RvYnVmLkVudW1PcHRpb25zGK/KvCIgASgLMhouZ29vZ2xlLmFwaS5WaXNpYmlsaXR5UnVsZVIOZW51bVZpc2liaWxpdHk6awoQdmFsdWVfdmlzaWJpbGl0eRIhLmdvb2dsZS5wcm90b2J1Zi5FbnVtVmFsdWVPcHRpb25zGK/KvCIgASgLMhouZ29vZ2xlLmFwaS5WaXNpYmlsaXR5UnVsZVIPdmFsdWVWaXNpYmlsaXR5OmcKEGZpZWxkX3Zpc2liaWxpdHkSHS5nb29nbGUucHJvdG9idWYuRmllbGRPcHRpb25zGK/KvCIgASgLMhouZ29vZ2xlLmFwaS5WaXNpYmlsaXR5UnVsZVIPZmllbGRWaXNpYmlsaXR5Om0KEm1lc3NhZ2VfdmlzaWJpbGl0eRIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxivyrwiIAEoCzIaLmdvb2dsZS5hcGkuVmlzaWJpbGl0eVJ1bGVSEW1lc3NhZ2VWaXNpYmlsaXR5OmoKEW1ldGhvZF92aXNpYmlsaXR5Eh4uZ29vZ2xlLnByb3RvYnVmLk1ldGhvZE9wdGlvbnMYr8q8IiABKAsyGi5nb29nbGUuYXBpLlZpc2liaWxpdHlSdWxlUhBtZXRob2RWaXNpYmlsaXR5OmUKDmFwaV92aXNpYmlsaXR5Eh8uZ29vZ2xlLnByb3RvYnVmLlNlcnZpY2VPcHRpb25zGK/KvCIgASgLMhouZ29vZ2xlLmFwaS5WaXNpYmlsaXR5UnVsZVINYXBpVmlzaWJpbGl0eUJuCg5jb20uZ29vZ2xlLmFwaUIPVmlzaWJpbGl0eVByb3RvUAFaP2dvb2dsZS5nb2xhbmcub3JnL2dlbnByb3RvL2dvb2dsZWFwaXMvYXBpL3Zpc2liaWxpdHk7dmlzaWJpbGl0efgBAaICBEdBUEliBnByb3RvMw", [fileDesc_google_protobuf_descriptor]);

/**
 * `Visibility` restricts service consumer's access to service elements,
 * such as whether an application can call a visibility-restricted method.
 * The restriction is expressed by applying visibility labels on service
 * elements. The visibility labels are elsewhere linked to service consumers.
 *
 * A service can define multiple visibility labels, but a service consumer
 * should be granted at most one visibility label. Multiple visibility
 * labels for a single service consumer are not supported.
 *
 * If an element and all its parents have no visibility label, its visibility
 * is unconditionally granted.
 *
 * Example:
 *
 *     visibility:
 *       rules:
 *       - selector: google.calendar.Calendar.EnhancedSearch
 *         restriction: PREVIEW
 *       - selector: google.calendar.Calendar.Delegate
 *         restriction: INTERNAL
 *
 * Here, all methods are publicly visible except for the restricted methods
 * EnhancedSearch and Delegate.
 *
 * @generated from message google.api.Visibility
 */
export type Visibility = Message<"google.api.Visibility"> & {
  /**
   * A list of visibility rules that apply to individual API elements.
   *
   * **NOTE:** All service configuration rules follow "last one wins" order.
   *
   * @generated from field: repeated google.api.VisibilityRule rules = 1;
   */
  rules: VisibilityRule[];
};

/**
 * Describes the message google.api.Visibility.
 * Use `create(VisibilityDesc)` to create a new message.
 */
export const VisibilityDesc: GenDescMessage<Visibility> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_visibility, 0);

/**
 * A visibility rule provides visibility configuration for an individual API
 * element.
 *
 * @generated from message google.api.VisibilityRule
 */
export type VisibilityRule = Message<"google.api.VisibilityRule"> & {
  /**
   * Selects methods, messages, fields, enums, etc. to which this rule applies.
   *
   * Refer to [selector][google.api.DocumentationRule.selector] for syntax
   * details.
   *
   * @generated from field: string selector = 1;
   */
  selector: string;

  /**
   * A comma-separated list of visibility labels that apply to the `selector`.
   * Any of the listed labels can be used to grant the visibility.
   *
   * If a rule has multiple labels, removing one of the labels but not all of
   * them can break clients.
   *
   * Example:
   *
   *     visibility:
   *       rules:
   *       - selector: google.calendar.Calendar.EnhancedSearch
   *         restriction: INTERNAL, PREVIEW
   *
   * Removing INTERNAL from this restriction will break clients that rely on
   * this method and only had access to it through INTERNAL.
   *
   * @generated from field: string restriction = 2;
   */
  restriction: string;
};

/**
 * Describes the message google.api.VisibilityRule.
 * Use `create(VisibilityRuleDesc)` to create a new message.
 */
export const VisibilityRuleDesc: GenDescMessage<VisibilityRule> = /*@__PURE__*/
  messageDesc(fileDesc_google_api_visibility, 1);

/**
 * See `VisibilityRule`.
 *
 * @generated from extension: google.api.VisibilityRule enum_visibility = 72295727;
 */
export const enum_visibility: GenDescExtension<EnumOptions, VisibilityRule> = /*@__PURE__*/
  extDesc(fileDesc_google_api_visibility, 0);

/**
 * See `VisibilityRule`.
 *
 * @generated from extension: google.api.VisibilityRule value_visibility = 72295727;
 */
export const value_visibility: GenDescExtension<EnumValueOptions, VisibilityRule> = /*@__PURE__*/
  extDesc(fileDesc_google_api_visibility, 1);

/**
 * See `VisibilityRule`.
 *
 * @generated from extension: google.api.VisibilityRule field_visibility = 72295727;
 */
export const field_visibility: GenDescExtension<FieldOptions, VisibilityRule> = /*@__PURE__*/
  extDesc(fileDesc_google_api_visibility, 2);

/**
 * See `VisibilityRule`.
 *
 * @generated from extension: google.api.VisibilityRule message_visibility = 72295727;
 */
export const message_visibility: GenDescExtension<MessageOptions, VisibilityRule> = /*@__PURE__*/
  extDesc(fileDesc_google_api_visibility, 3);

/**
 * See `VisibilityRule`.
 *
 * @generated from extension: google.api.VisibilityRule method_visibility = 72295727;
 */
export const method_visibility: GenDescExtension<MethodOptions, VisibilityRule> = /*@__PURE__*/
  extDesc(fileDesc_google_api_visibility, 4);

/**
 * See `VisibilityRule`.
 *
 * @generated from extension: google.api.VisibilityRule api_visibility = 72295727;
 */
export const api_visibility: GenDescExtension<ServiceOptions, VisibilityRule> = /*@__PURE__*/
  extDesc(fileDesc_google_api_visibility, 5);

