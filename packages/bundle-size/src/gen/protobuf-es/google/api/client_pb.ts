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

// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file google/api/client.proto (package google.api, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenExtension, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { LaunchStage } from "./launch_stage_pb";
import { file_google_api_launch_stage } from "./launch_stage_pb";
import type { Duration, MethodOptions, ServiceOptions } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_descriptor, file_google_protobuf_duration } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/api/client.proto.
 */
export const file_google_api_client: GenFile = /*@__PURE__*/
  fileDesc("Chdnb29nbGUvYXBpL2NsaWVudC5wcm90bxIKZ29vZ2xlLmFwaSJ0ChZDb21tb25MYW5ndWFnZVNldHRpbmdzEh4KEnJlZmVyZW5jZV9kb2NzX3VyaRgBIAEoCUICGAESOgoMZGVzdGluYXRpb25zGAIgAygOMiQuZ29vZ2xlLmFwaS5DbGllbnRMaWJyYXJ5RGVzdGluYXRpb24i+wMKFUNsaWVudExpYnJhcnlTZXR0aW5ncxIPCgd2ZXJzaW9uGAEgASgJEi0KDGxhdW5jaF9zdGFnZRgCIAEoDjIXLmdvb2dsZS5hcGkuTGF1bmNoU3RhZ2USGgoScmVzdF9udW1lcmljX2VudW1zGAMgASgIEi8KDWphdmFfc2V0dGluZ3MYFSABKAsyGC5nb29nbGUuYXBpLkphdmFTZXR0aW5ncxItCgxjcHBfc2V0dGluZ3MYFiABKAsyFy5nb29nbGUuYXBpLkNwcFNldHRpbmdzEi0KDHBocF9zZXR0aW5ncxgXIAEoCzIXLmdvb2dsZS5hcGkuUGhwU2V0dGluZ3MSMwoPcHl0aG9uX3NldHRpbmdzGBggASgLMhouZ29vZ2xlLmFwaS5QeXRob25TZXR0aW5ncxIvCg1ub2RlX3NldHRpbmdzGBkgASgLMhguZ29vZ2xlLmFwaS5Ob2RlU2V0dGluZ3MSMwoPZG90bmV0X3NldHRpbmdzGBogASgLMhouZ29vZ2xlLmFwaS5Eb3RuZXRTZXR0aW5ncxIvCg1ydWJ5X3NldHRpbmdzGBsgASgLMhguZ29vZ2xlLmFwaS5SdWJ5U2V0dGluZ3MSKwoLZ29fc2V0dGluZ3MYHCABKAsyFi5nb29nbGUuYXBpLkdvU2V0dGluZ3MiqAMKClB1Ymxpc2hpbmcSMwoPbWV0aG9kX3NldHRpbmdzGAIgAygLMhouZ29vZ2xlLmFwaS5NZXRob2RTZXR0aW5ncxIVCg1uZXdfaXNzdWVfdXJpGGUgASgJEhkKEWRvY3VtZW50YXRpb25fdXJpGGYgASgJEhYKDmFwaV9zaG9ydF9uYW1lGGcgASgJEhQKDGdpdGh1Yl9sYWJlbBhoIAEoCRIeChZjb2Rlb3duZXJfZ2l0aHViX3RlYW1zGGkgAygJEhYKDmRvY190YWdfcHJlZml4GGogASgJEjsKDG9yZ2FuaXphdGlvbhhrIAEoDjIlLmdvb2dsZS5hcGkuQ2xpZW50TGlicmFyeU9yZ2FuaXphdGlvbhI7ChBsaWJyYXJ5X3NldHRpbmdzGG0gAygLMiEuZ29vZ2xlLmFwaS5DbGllbnRMaWJyYXJ5U2V0dGluZ3MSKQohcHJvdG9fcmVmZXJlbmNlX2RvY3VtZW50YXRpb25fdXJpGG4gASgJEigKIHJlc3RfcmVmZXJlbmNlX2RvY3VtZW50YXRpb25fdXJpGG8gASgJIuMBCgxKYXZhU2V0dGluZ3MSFwoPbGlicmFyeV9wYWNrYWdlGAEgASgJEkwKE3NlcnZpY2VfY2xhc3NfbmFtZXMYAiADKAsyLy5nb29nbGUuYXBpLkphdmFTZXR0aW5ncy5TZXJ2aWNlQ2xhc3NOYW1lc0VudHJ5EjIKBmNvbW1vbhgDIAEoCzIiLmdvb2dsZS5hcGkuQ29tbW9uTGFuZ3VhZ2VTZXR0aW5ncxo4ChZTZXJ2aWNlQ2xhc3NOYW1lc0VudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEiQQoLQ3BwU2V0dGluZ3MSMgoGY29tbW9uGAEgASgLMiIuZ29vZ2xlLmFwaS5Db21tb25MYW5ndWFnZVNldHRpbmdzIkEKC1BocFNldHRpbmdzEjIKBmNvbW1vbhgBIAEoCzIiLmdvb2dsZS5hcGkuQ29tbW9uTGFuZ3VhZ2VTZXR0aW5ncyJECg5QeXRob25TZXR0aW5ncxIyCgZjb21tb24YASABKAsyIi5nb29nbGUuYXBpLkNvbW1vbkxhbmd1YWdlU2V0dGluZ3MiQgoMTm9kZVNldHRpbmdzEjIKBmNvbW1vbhgBIAEoCzIiLmdvb2dsZS5hcGkuQ29tbW9uTGFuZ3VhZ2VTZXR0aW5ncyKqAwoORG90bmV0U2V0dGluZ3MSMgoGY29tbW9uGAEgASgLMiIuZ29vZ2xlLmFwaS5Db21tb25MYW5ndWFnZVNldHRpbmdzEkkKEHJlbmFtZWRfc2VydmljZXMYAiADKAsyLy5nb29nbGUuYXBpLkRvdG5ldFNldHRpbmdzLlJlbmFtZWRTZXJ2aWNlc0VudHJ5EksKEXJlbmFtZWRfcmVzb3VyY2VzGAMgAygLMjAuZ29vZ2xlLmFwaS5Eb3RuZXRTZXR0aW5ncy5SZW5hbWVkUmVzb3VyY2VzRW50cnkSGQoRaWdub3JlZF9yZXNvdXJjZXMYBCADKAkSIAoYZm9yY2VkX25hbWVzcGFjZV9hbGlhc2VzGAUgAygJEh4KFmhhbmR3cml0dGVuX3NpZ25hdHVyZXMYBiADKAkaNgoUUmVuYW1lZFNlcnZpY2VzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ARo3ChVSZW5hbWVkUmVzb3VyY2VzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ASJCCgxSdWJ5U2V0dGluZ3MSMgoGY29tbW9uGAEgASgLMiIuZ29vZ2xlLmFwaS5Db21tb25MYW5ndWFnZVNldHRpbmdzIkAKCkdvU2V0dGluZ3MSMgoGY29tbW9uGAEgASgLMiIuZ29vZ2xlLmFwaS5Db21tb25MYW5ndWFnZVNldHRpbmdzIs8CCg5NZXRob2RTZXR0aW5ncxIQCghzZWxlY3RvchgBIAEoCRI8Cgxsb25nX3J1bm5pbmcYAiABKAsyJi5nb29nbGUuYXBpLk1ldGhvZFNldHRpbmdzLkxvbmdSdW5uaW5nEh0KFWF1dG9fcG9wdWxhdGVkX2ZpZWxkcxgDIAMoCRrNAQoLTG9uZ1J1bm5pbmcSNQoSaW5pdGlhbF9wb2xsX2RlbGF5GAEgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uEh0KFXBvbGxfZGVsYXlfbXVsdGlwbGllchgCIAEoAhIxCg5tYXhfcG9sbF9kZWxheRgDIAEoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbhI1ChJ0b3RhbF9wb2xsX3RpbWVvdXQYBCABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb24qowEKGUNsaWVudExpYnJhcnlPcmdhbml6YXRpb24SKwonQ0xJRU5UX0xJQlJBUllfT1JHQU5JWkFUSU9OX1VOU1BFQ0lGSUVEEAASCQoFQ0xPVUQQARIHCgNBRFMQAhIKCgZQSE9UT1MQAxIPCgtTVFJFRVRfVklFVxAEEgwKCFNIT1BQSU5HEAUSBwoDR0VPEAYSEQoNR0VORVJBVElWRV9BSRAHKmcKGENsaWVudExpYnJhcnlEZXN0aW5hdGlvbhIqCiZDTElFTlRfTElCUkFSWV9ERVNUSU5BVElPTl9VTlNQRUNJRklFRBAAEgoKBkdJVEhVQhAKEhMKD1BBQ0tBR0VfTUFOQUdFUhAUOkoKEG1ldGhvZF9zaWduYXR1cmUSHi5nb29nbGUucHJvdG9idWYuTWV0aG9kT3B0aW9ucxibCCADKAlSD21ldGhvZFNpZ25hdHVyZTpDCgxkZWZhdWx0X2hvc3QSHy5nb29nbGUucHJvdG9idWYuU2VydmljZU9wdGlvbnMYmQggASgJUgtkZWZhdWx0SG9zdDpDCgxvYXV0aF9zY29wZXMSHy5nb29nbGUucHJvdG9idWYuU2VydmljZU9wdGlvbnMYmgggASgJUgtvYXV0aFNjb3BlczpECgthcGlfdmVyc2lvbhIfLmdvb2dsZS5wcm90b2J1Zi5TZXJ2aWNlT3B0aW9ucxjBuqv6ASABKAlSCmFwaVZlcnNpb25CaQoOY29tLmdvb2dsZS5hcGlCC0NsaWVudFByb3RvUAFaQWdvb2dsZS5nb2xhbmcub3JnL2dlbnByb3RvL2dvb2dsZWFwaXMvYXBpL2Fubm90YXRpb25zO2Fubm90YXRpb25zogIER0FQSWIGcHJvdG8z", [file_google_api_launch_stage, file_google_protobuf_descriptor, file_google_protobuf_duration]);

/**
 * Required information for every language.
 *
 * @generated from message google.api.CommonLanguageSettings
 */
export type CommonLanguageSettings = Message<"google.api.CommonLanguageSettings"> & {
  /**
   * Link to automatically generated reference documentation.  Example:
   * https://cloud.google.com/nodejs/docs/reference/asset/latest
   *
   * @generated from field: string reference_docs_uri = 1 [deprecated = true];
   * @deprecated
   */
  referenceDocsUri: string;

  /**
   * The destination where API teams want this client library to be published.
   *
   * @generated from field: repeated google.api.ClientLibraryDestination destinations = 2;
   */
  destinations: ClientLibraryDestination[];
};

/**
 * Describes the message google.api.CommonLanguageSettings.
 * Use `create(CommonLanguageSettingsSchema)` to create a new message.
 */
export const CommonLanguageSettingsSchema: GenMessage<CommonLanguageSettings> = /*@__PURE__*/
  messageDesc(file_google_api_client, 0);

/**
 * Details about how and where to publish client libraries.
 *
 * @generated from message google.api.ClientLibrarySettings
 */
export type ClientLibrarySettings = Message<"google.api.ClientLibrarySettings"> & {
  /**
   * Version of the API to apply these settings to. This is the full protobuf
   * package for the API, ending in the version element.
   * Examples: "google.cloud.speech.v1" and "google.spanner.admin.database.v1".
   *
   * @generated from field: string version = 1;
   */
  version: string;

  /**
   * Launch stage of this version of the API.
   *
   * @generated from field: google.api.LaunchStage launch_stage = 2;
   */
  launchStage: LaunchStage;

  /**
   * When using transport=rest, the client request will encode enums as
   * numbers rather than strings.
   *
   * @generated from field: bool rest_numeric_enums = 3;
   */
  restNumericEnums: boolean;

  /**
   * Settings for legacy Java features, supported in the Service YAML.
   *
   * @generated from field: google.api.JavaSettings java_settings = 21;
   */
  javaSettings?: JavaSettings;

  /**
   * Settings for C++ client libraries.
   *
   * @generated from field: google.api.CppSettings cpp_settings = 22;
   */
  cppSettings?: CppSettings;

  /**
   * Settings for PHP client libraries.
   *
   * @generated from field: google.api.PhpSettings php_settings = 23;
   */
  phpSettings?: PhpSettings;

  /**
   * Settings for Python client libraries.
   *
   * @generated from field: google.api.PythonSettings python_settings = 24;
   */
  pythonSettings?: PythonSettings;

  /**
   * Settings for Node client libraries.
   *
   * @generated from field: google.api.NodeSettings node_settings = 25;
   */
  nodeSettings?: NodeSettings;

  /**
   * Settings for .NET client libraries.
   *
   * @generated from field: google.api.DotnetSettings dotnet_settings = 26;
   */
  dotnetSettings?: DotnetSettings;

  /**
   * Settings for Ruby client libraries.
   *
   * @generated from field: google.api.RubySettings ruby_settings = 27;
   */
  rubySettings?: RubySettings;

  /**
   * Settings for Go client libraries.
   *
   * @generated from field: google.api.GoSettings go_settings = 28;
   */
  goSettings?: GoSettings;
};

/**
 * Describes the message google.api.ClientLibrarySettings.
 * Use `create(ClientLibrarySettingsSchema)` to create a new message.
 */
export const ClientLibrarySettingsSchema: GenMessage<ClientLibrarySettings> = /*@__PURE__*/
  messageDesc(file_google_api_client, 1);

/**
 * This message configures the settings for publishing [Google Cloud Client
 * libraries](https://cloud.google.com/apis/docs/cloud-client-libraries)
 * generated from the service config.
 *
 * @generated from message google.api.Publishing
 */
export type Publishing = Message<"google.api.Publishing"> & {
  /**
   * A list of API method settings, e.g. the behavior for methods that use the
   * long-running operation pattern.
   *
   * @generated from field: repeated google.api.MethodSettings method_settings = 2;
   */
  methodSettings: MethodSettings[];

  /**
   * Link to a *public* URI where users can report issues.  Example:
   * https://issuetracker.google.com/issues/new?component=190865&template=1161103
   *
   * @generated from field: string new_issue_uri = 101;
   */
  newIssueUri: string;

  /**
   * Link to product home page.  Example:
   * https://cloud.google.com/asset-inventory/docs/overview
   *
   * @generated from field: string documentation_uri = 102;
   */
  documentationUri: string;

  /**
   * Used as a tracking tag when collecting data about the APIs developer
   * relations artifacts like docs, packages delivered to package managers,
   * etc.  Example: "speech".
   *
   * @generated from field: string api_short_name = 103;
   */
  apiShortName: string;

  /**
   * GitHub label to apply to issues and pull requests opened for this API.
   *
   * @generated from field: string github_label = 104;
   */
  githubLabel: string;

  /**
   * GitHub teams to be added to CODEOWNERS in the directory in GitHub
   * containing source code for the client libraries for this API.
   *
   * @generated from field: repeated string codeowner_github_teams = 105;
   */
  codeownerGithubTeams: string[];

  /**
   * A prefix used in sample code when demarking regions to be included in
   * documentation.
   *
   * @generated from field: string doc_tag_prefix = 106;
   */
  docTagPrefix: string;

  /**
   * For whom the client library is being published.
   *
   * @generated from field: google.api.ClientLibraryOrganization organization = 107;
   */
  organization: ClientLibraryOrganization;

  /**
   * Client library settings.  If the same version string appears multiple
   * times in this list, then the last one wins.  Settings from earlier
   * settings with the same version string are discarded.
   *
   * @generated from field: repeated google.api.ClientLibrarySettings library_settings = 109;
   */
  librarySettings: ClientLibrarySettings[];

  /**
   * Optional link to proto reference documentation.  Example:
   * https://cloud.google.com/pubsub/lite/docs/reference/rpc
   *
   * @generated from field: string proto_reference_documentation_uri = 110;
   */
  protoReferenceDocumentationUri: string;

  /**
   * Optional link to REST reference documentation.  Example:
   * https://cloud.google.com/pubsub/lite/docs/reference/rest
   *
   * @generated from field: string rest_reference_documentation_uri = 111;
   */
  restReferenceDocumentationUri: string;
};

/**
 * Describes the message google.api.Publishing.
 * Use `create(PublishingSchema)` to create a new message.
 */
export const PublishingSchema: GenMessage<Publishing> = /*@__PURE__*/
  messageDesc(file_google_api_client, 2);

/**
 * Settings for Java client libraries.
 *
 * @generated from message google.api.JavaSettings
 */
export type JavaSettings = Message<"google.api.JavaSettings"> & {
  /**
   * The package name to use in Java. Clobbers the java_package option
   * set in the protobuf. This should be used **only** by APIs
   * who have already set the language_settings.java.package_name" field
   * in gapic.yaml. API teams should use the protobuf java_package option
   * where possible.
   *
   * Example of a YAML configuration::
   *
   *  publishing:
   *    java_settings:
   *      library_package: com.google.cloud.pubsub.v1
   *
   * @generated from field: string library_package = 1;
   */
  libraryPackage: string;

  /**
   * Configure the Java class name to use instead of the service's for its
   * corresponding generated GAPIC client. Keys are fully-qualified
   * service names as they appear in the protobuf (including the full
   * the language_settings.java.interface_names" field in gapic.yaml. API
   * teams should otherwise use the service name as it appears in the
   * protobuf.
   *
   * Example of a YAML configuration::
   *
   *  publishing:
   *    java_settings:
   *      service_class_names:
   *        - google.pubsub.v1.Publisher: TopicAdmin
   *        - google.pubsub.v1.Subscriber: SubscriptionAdmin
   *
   * @generated from field: map<string, string> service_class_names = 2;
   */
  serviceClassNames: { [key: string]: string };

  /**
   * Some settings.
   *
   * @generated from field: google.api.CommonLanguageSettings common = 3;
   */
  common?: CommonLanguageSettings;
};

/**
 * Describes the message google.api.JavaSettings.
 * Use `create(JavaSettingsSchema)` to create a new message.
 */
export const JavaSettingsSchema: GenMessage<JavaSettings> = /*@__PURE__*/
  messageDesc(file_google_api_client, 3);

/**
 * Settings for C++ client libraries.
 *
 * @generated from message google.api.CppSettings
 */
export type CppSettings = Message<"google.api.CppSettings"> & {
  /**
   * Some settings.
   *
   * @generated from field: google.api.CommonLanguageSettings common = 1;
   */
  common?: CommonLanguageSettings;
};

/**
 * Describes the message google.api.CppSettings.
 * Use `create(CppSettingsSchema)` to create a new message.
 */
export const CppSettingsSchema: GenMessage<CppSettings> = /*@__PURE__*/
  messageDesc(file_google_api_client, 4);

/**
 * Settings for Php client libraries.
 *
 * @generated from message google.api.PhpSettings
 */
export type PhpSettings = Message<"google.api.PhpSettings"> & {
  /**
   * Some settings.
   *
   * @generated from field: google.api.CommonLanguageSettings common = 1;
   */
  common?: CommonLanguageSettings;
};

/**
 * Describes the message google.api.PhpSettings.
 * Use `create(PhpSettingsSchema)` to create a new message.
 */
export const PhpSettingsSchema: GenMessage<PhpSettings> = /*@__PURE__*/
  messageDesc(file_google_api_client, 5);

/**
 * Settings for Python client libraries.
 *
 * @generated from message google.api.PythonSettings
 */
export type PythonSettings = Message<"google.api.PythonSettings"> & {
  /**
   * Some settings.
   *
   * @generated from field: google.api.CommonLanguageSettings common = 1;
   */
  common?: CommonLanguageSettings;
};

/**
 * Describes the message google.api.PythonSettings.
 * Use `create(PythonSettingsSchema)` to create a new message.
 */
export const PythonSettingsSchema: GenMessage<PythonSettings> = /*@__PURE__*/
  messageDesc(file_google_api_client, 6);

/**
 * Settings for Node client libraries.
 *
 * @generated from message google.api.NodeSettings
 */
export type NodeSettings = Message<"google.api.NodeSettings"> & {
  /**
   * Some settings.
   *
   * @generated from field: google.api.CommonLanguageSettings common = 1;
   */
  common?: CommonLanguageSettings;
};

/**
 * Describes the message google.api.NodeSettings.
 * Use `create(NodeSettingsSchema)` to create a new message.
 */
export const NodeSettingsSchema: GenMessage<NodeSettings> = /*@__PURE__*/
  messageDesc(file_google_api_client, 7);

/**
 * Settings for Dotnet client libraries.
 *
 * @generated from message google.api.DotnetSettings
 */
export type DotnetSettings = Message<"google.api.DotnetSettings"> & {
  /**
   * Some settings.
   *
   * @generated from field: google.api.CommonLanguageSettings common = 1;
   */
  common?: CommonLanguageSettings;

  /**
   * Map from original service names to renamed versions.
   * This is used when the default generated types
   * would cause a naming conflict. (Neither name is
   * fully-qualified.)
   * Example: Subscriber to SubscriberServiceApi.
   *
   * @generated from field: map<string, string> renamed_services = 2;
   */
  renamedServices: { [key: string]: string };

  /**
   * Map from full resource types to the effective short name
   * for the resource. This is used when otherwise resource
   * named from different services would cause naming collisions.
   * Example entry:
   * "datalabeling.googleapis.com/Dataset": "DataLabelingDataset"
   *
   * @generated from field: map<string, string> renamed_resources = 3;
   */
  renamedResources: { [key: string]: string };

  /**
   * List of full resource types to ignore during generation.
   * This is typically used for API-specific Location resources,
   * which should be handled by the generator as if they were actually
   * the common Location resources.
   * Example entry: "documentai.googleapis.com/Location"
   *
   * @generated from field: repeated string ignored_resources = 4;
   */
  ignoredResources: string[];

  /**
   * Namespaces which must be aliased in snippets due to
   * a known (but non-generator-predictable) naming collision
   *
   * @generated from field: repeated string forced_namespace_aliases = 5;
   */
  forcedNamespaceAliases: string[];

  /**
   * Method signatures (in the form "service.method(signature)")
   * which are provided separately, so shouldn't be generated.
   * Snippets *calling* these methods are still generated, however.
   *
   * @generated from field: repeated string handwritten_signatures = 6;
   */
  handwrittenSignatures: string[];
};

/**
 * Describes the message google.api.DotnetSettings.
 * Use `create(DotnetSettingsSchema)` to create a new message.
 */
export const DotnetSettingsSchema: GenMessage<DotnetSettings> = /*@__PURE__*/
  messageDesc(file_google_api_client, 8);

/**
 * Settings for Ruby client libraries.
 *
 * @generated from message google.api.RubySettings
 */
export type RubySettings = Message<"google.api.RubySettings"> & {
  /**
   * Some settings.
   *
   * @generated from field: google.api.CommonLanguageSettings common = 1;
   */
  common?: CommonLanguageSettings;
};

/**
 * Describes the message google.api.RubySettings.
 * Use `create(RubySettingsSchema)` to create a new message.
 */
export const RubySettingsSchema: GenMessage<RubySettings> = /*@__PURE__*/
  messageDesc(file_google_api_client, 9);

/**
 * Settings for Go client libraries.
 *
 * @generated from message google.api.GoSettings
 */
export type GoSettings = Message<"google.api.GoSettings"> & {
  /**
   * Some settings.
   *
   * @generated from field: google.api.CommonLanguageSettings common = 1;
   */
  common?: CommonLanguageSettings;
};

/**
 * Describes the message google.api.GoSettings.
 * Use `create(GoSettingsSchema)` to create a new message.
 */
export const GoSettingsSchema: GenMessage<GoSettings> = /*@__PURE__*/
  messageDesc(file_google_api_client, 10);

/**
 * Describes the generator configuration for a method.
 *
 * @generated from message google.api.MethodSettings
 */
export type MethodSettings = Message<"google.api.MethodSettings"> & {
  /**
   * The fully qualified name of the method, for which the options below apply.
   * This is used to find the method to apply the options.
   *
   * @generated from field: string selector = 1;
   */
  selector: string;

  /**
   * Describes settings to use for long-running operations when generating
   * API methods for RPCs. Complements RPCs that use the annotations in
   * google/longrunning/operations.proto.
   *
   * Example of a YAML configuration::
   *
   *  publishing:
   *    method_settings:
   *      - selector: google.cloud.speech.v2.Speech.BatchRecognize
   *        long_running:
   *          initial_poll_delay:
   *            seconds: 60 # 1 minute
   *          poll_delay_multiplier: 1.5
   *          max_poll_delay:
   *            seconds: 360 # 6 minutes
   *          total_poll_timeout:
   *             seconds: 54000 # 90 minutes
   *
   * @generated from field: google.api.MethodSettings.LongRunning long_running = 2;
   */
  longRunning?: MethodSettings_LongRunning;

  /**
   * List of top-level fields of the request message, that should be
   * automatically populated by the client libraries based on their
   * (google.api.field_info).format. Currently supported format: UUID4.
   *
   * Example of a YAML configuration:
   *
   *  publishing:
   *    method_settings:
   *      - selector: google.example.v1.ExampleService.CreateExample
   *        auto_populated_fields:
   *        - request_id
   *
   * @generated from field: repeated string auto_populated_fields = 3;
   */
  autoPopulatedFields: string[];
};

/**
 * Describes the message google.api.MethodSettings.
 * Use `create(MethodSettingsSchema)` to create a new message.
 */
export const MethodSettingsSchema: GenMessage<MethodSettings> = /*@__PURE__*/
  messageDesc(file_google_api_client, 11);

/**
 * Describes settings to use when generating API methods that use the
 * long-running operation pattern.
 * All default values below are from those used in the client library
 * generators (e.g.
 * [Java](https://github.com/googleapis/gapic-generator-java/blob/04c2faa191a9b5a10b92392fe8482279c4404803/src/main/java/com/google/api/generator/gapic/composer/common/RetrySettingsComposer.java)).
 *
 * @generated from message google.api.MethodSettings.LongRunning
 */
export type MethodSettings_LongRunning = Message<"google.api.MethodSettings.LongRunning"> & {
  /**
   * Initial delay after which the first poll request will be made.
   * Default value: 5 seconds.
   *
   * @generated from field: google.protobuf.Duration initial_poll_delay = 1;
   */
  initialPollDelay?: Duration;

  /**
   * Multiplier to gradually increase delay between subsequent polls until it
   * reaches max_poll_delay.
   * Default value: 1.5.
   *
   * @generated from field: float poll_delay_multiplier = 2;
   */
  pollDelayMultiplier: number;

  /**
   * Maximum time between two subsequent poll requests.
   * Default value: 45 seconds.
   *
   * @generated from field: google.protobuf.Duration max_poll_delay = 3;
   */
  maxPollDelay?: Duration;

  /**
   * Total polling timeout.
   * Default value: 5 minutes.
   *
   * @generated from field: google.protobuf.Duration total_poll_timeout = 4;
   */
  totalPollTimeout?: Duration;
};

/**
 * Describes the message google.api.MethodSettings.LongRunning.
 * Use `create(MethodSettings_LongRunningSchema)` to create a new message.
 */
export const MethodSettings_LongRunningSchema: GenMessage<MethodSettings_LongRunning> = /*@__PURE__*/
  messageDesc(file_google_api_client, 11, 0);

/**
 * The organization for which the client libraries are being published.
 * Affects the url where generated docs are published, etc.
 *
 * @generated from enum google.api.ClientLibraryOrganization
 */
export enum ClientLibraryOrganization {
  /**
   * Not useful.
   *
   * @generated from enum value: CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED = 0;
   */
  CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED = 0,

  /**
   * Google Cloud Platform Org.
   *
   * @generated from enum value: CLOUD = 1;
   */
  CLOUD = 1,

  /**
   * Ads (Advertising) Org.
   *
   * @generated from enum value: ADS = 2;
   */
  ADS = 2,

  /**
   * Photos Org.
   *
   * @generated from enum value: PHOTOS = 3;
   */
  PHOTOS = 3,

  /**
   * Street View Org.
   *
   * @generated from enum value: STREET_VIEW = 4;
   */
  STREET_VIEW = 4,

  /**
   * Shopping Org.
   *
   * @generated from enum value: SHOPPING = 5;
   */
  SHOPPING = 5,

  /**
   * Geo Org.
   *
   * @generated from enum value: GEO = 6;
   */
  GEO = 6,

  /**
   * Generative AI - https://developers.generativeai.google
   *
   * @generated from enum value: GENERATIVE_AI = 7;
   */
  GENERATIVE_AI = 7,
}

/**
 * Describes the enum google.api.ClientLibraryOrganization.
 */
export const ClientLibraryOrganizationSchema: GenEnum<ClientLibraryOrganization> = /*@__PURE__*/
  enumDesc(file_google_api_client, 0);

/**
 * To where should client libraries be published?
 *
 * @generated from enum google.api.ClientLibraryDestination
 */
export enum ClientLibraryDestination {
  /**
   * Client libraries will neither be generated nor published to package
   * managers.
   *
   * @generated from enum value: CLIENT_LIBRARY_DESTINATION_UNSPECIFIED = 0;
   */
  CLIENT_LIBRARY_DESTINATION_UNSPECIFIED = 0,

  /**
   * Generate the client library in a repo under github.com/googleapis,
   * but don't publish it to package managers.
   *
   * @generated from enum value: GITHUB = 10;
   */
  GITHUB = 10,

  /**
   * Publish the library to package managers like nuget.org and npmjs.com.
   *
   * @generated from enum value: PACKAGE_MANAGER = 20;
   */
  PACKAGE_MANAGER = 20,
}

/**
 * Describes the enum google.api.ClientLibraryDestination.
 */
export const ClientLibraryDestinationSchema: GenEnum<ClientLibraryDestination> = /*@__PURE__*/
  enumDesc(file_google_api_client, 1);

/**
 * A definition of a client library method signature.
 *
 * In client libraries, each proto RPC corresponds to one or more methods
 * which the end user is able to call, and calls the underlying RPC.
 * Normally, this method receives a single argument (a struct or instance
 * corresponding to the RPC request object). Defining this field will
 * add one or more overloads providing flattened or simpler method signatures
 * in some languages.
 *
 * The fields on the method signature are provided as a comma-separated
 * string.
 *
 * For example, the proto RPC and annotation:
 *
 *   rpc CreateSubscription(CreateSubscriptionRequest)
 *       returns (Subscription) {
 *     option (google.api.method_signature) = "name,topic";
 *   }
 *
 * Would add the following Java overload (in addition to the method accepting
 * the request object):
 *
 *   public final Subscription createSubscription(String name, String topic)
 *
 * The following backwards-compatibility guidelines apply:
 *
 *   * Adding this annotation to an unannotated method is backwards
 *     compatible.
 *   * Adding this annotation to a method which already has existing
 *     method signature annotations is backwards compatible if and only if
 *     the new method signature annotation is last in the sequence.
 *   * Modifying or removing an existing method signature annotation is
 *     a breaking change.
 *   * Re-ordering existing method signature annotations is a breaking
 *     change.
 *
 * @generated from extension: repeated string method_signature = 1051;
 */
export const method_signature: GenExtension<MethodOptions, string[]> = /*@__PURE__*/
  extDesc(file_google_api_client, 0);

/**
 * The hostname for this service.
 * This should be specified with no prefix or protocol.
 *
 * Example:
 *
 *   service Foo {
 *     option (google.api.default_host) = "foo.googleapi.com";
 *     ...
 *   }
 *
 * @generated from extension: string default_host = 1049;
 */
export const default_host: GenExtension<ServiceOptions, string> = /*@__PURE__*/
  extDesc(file_google_api_client, 1);

/**
 * OAuth scopes needed for the client.
 *
 * Example:
 *
 *   service Foo {
 *     option (google.api.oauth_scopes) = \
 *       "https://www.googleapis.com/auth/cloud-platform";
 *     ...
 *   }
 *
 * If there is more than one scope, use a comma-separated string:
 *
 * Example:
 *
 *   service Foo {
 *     option (google.api.oauth_scopes) = \
 *       "https://www.googleapis.com/auth/cloud-platform,"
 *       "https://www.googleapis.com/auth/monitoring";
 *     ...
 *   }
 *
 * @generated from extension: string oauth_scopes = 1050;
 */
export const oauth_scopes: GenExtension<ServiceOptions, string> = /*@__PURE__*/
  extDesc(file_google_api_client, 2);

/**
 * The API version of this service, which should be sent by version-aware
 * clients to the service. This allows services to abide by the schema and
 * behavior of the service at the time this API version was deployed.
 * The format of the API version must be treated as opaque by clients.
 * Services may use a format with an apparent structure, but clients must
 * not rely on this to determine components within an API version, or attempt
 * to construct other valid API versions. Note that this is for upcoming
 * functionality and may not be implemented for all services.
 *
 * Example:
 *
 *   service Foo {
 *     option (google.api.api_version) = "v1_20230821_preview";
 *   }
 *
 * @generated from extension: string api_version = 525000001;
 */
export const api_version: GenExtension<ServiceOptions, string> = /*@__PURE__*/
  extDesc(file_google_api_client, 3);

