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

// @generated by protoc-gen-es v1.2.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/lint/v1/config.proto (package buf.alpha.lint.v1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * Config represents the lint configuration for a module. The rule and category IDs are defined
 * by the version and apply across the config. The version is independent of the version of
 * the package. The package version refers to the config shape, the version encoded in the Config message
 * indicates which rule and category IDs should be used.
 *
 * The rule and category IDs are not encoded as enums in this package because we may want to support custom rule
 * and category IDs in the future. Callers will need to resolve the rule and category ID strings.
 *
 * @generated from message buf.alpha.lint.v1.Config
 */
export class Config extends Message<Config> {
  /**
   * version represents the version of the lint rule and category IDs that should be used with this config.
   *
   * @generated from field: string version = 1;
   */
  version = "";

  /**
   * use_ids lists the rule and/or category IDs that are included in the lint check.
   *
   * @generated from field: repeated string use_ids = 2;
   */
  useIds: string[] = [];

  /**
   * except_ids lists the rule and/or category IDs that are excluded from the lint check.
   *
   * @generated from field: repeated string except_ids = 3;
   */
  exceptIds: string[] = [];

  /**
   * ignore_paths lists the paths of directories and/or files that should be ignored by the lint check.
   * All paths are relative to the root of the module.
   *
   * @generated from field: repeated string ignore_paths = 4;
   */
  ignorePaths: string[] = [];

  /**
   * ignore_id_paths is a map of rule and/or category IDs to directory and/or file paths to exclude from the
   * lint check. This corresponds with the ignore_only configuration key.
   *
   * @generated from field: repeated buf.alpha.lint.v1.IDPaths ignore_id_paths = 5;
   */
  ignoreIdPaths: IDPaths[] = [];

  /**
   * enum_zero_value_suffix controls the behavior of the ENUM_ZERO_VALUE lint rule ID. By default, this rule
   * verifies that the zero value of all enums ends in _UNSPECIFIED. This config allows the user to override
   * this value with the given string.
   *
   * @generated from field: string enum_zero_value_suffix = 6;
   */
  enumZeroValueSuffix = "";

  /**
   * rpc_allow_same_request_response allows the same message type for both the request and response of an RPC.
   *
   * @generated from field: bool rpc_allow_same_request_response = 7;
   */
  rpcAllowSameRequestResponse = false;

  /**
   * rpc_allow_google_protobuf_empty_requests allows the RPC requests to use the google.protobuf.Empty message.
   *
   * @generated from field: bool rpc_allow_google_protobuf_empty_requests = 8;
   */
  rpcAllowGoogleProtobufEmptyRequests = false;

  /**
   * rpc_allow_google_protobuf_empty_responses allows the RPC responses to use the google.protobuf.Empty message.
   *
   * @generated from field: bool rpc_allow_google_protobuf_empty_responses = 9;
   */
  rpcAllowGoogleProtobufEmptyResponses = false;

  /**
   * service_suffix applies to the SERVICE_SUFFIX rule ID. By default, the rule verifies that all service names
   * end with the suffix Service. This allows users to override the value with the given string.
   *
   * @generated from field: string service_suffix = 10;
   */
  serviceSuffix = "";

  /**
   * allow_comment_ignores turns on comment-driven ignores.
   *
   * @generated from field: bool allow_comment_ignores = 11;
   */
  allowCommentIgnores = false;

  constructor(data?: PartialMessage<Config>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.lint.v1.Config";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "version", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "use_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 3, name: "except_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 4, name: "ignore_paths", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 5, name: "ignore_id_paths", kind: "message", T: IDPaths, repeated: true },
    { no: 6, name: "enum_zero_value_suffix", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "rpc_allow_same_request_response", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 8, name: "rpc_allow_google_protobuf_empty_requests", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 9, name: "rpc_allow_google_protobuf_empty_responses", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 10, name: "service_suffix", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 11, name: "allow_comment_ignores", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Config {
    return new Config().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Config {
    return new Config().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Config {
    return new Config().fromJsonString(jsonString, options);
  }

  static equals(a: Config | PlainMessage<Config> | undefined, b: Config | PlainMessage<Config> | undefined): boolean {
    return proto3.util.equals(Config, a, b);
  }
}

/**
 * IDPaths represents a rule or category ID and the file and/or directory paths that are ignored for the rule.
 *
 * @generated from message buf.alpha.lint.v1.IDPaths
 */
export class IDPaths extends Message<IDPaths> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: repeated string paths = 2;
   */
  paths: string[] = [];

  constructor(data?: PartialMessage<IDPaths>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.lint.v1.IDPaths";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "paths", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): IDPaths {
    return new IDPaths().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): IDPaths {
    return new IDPaths().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): IDPaths {
    return new IDPaths().fromJsonString(jsonString, options);
  }

  static equals(a: IDPaths | PlainMessage<IDPaths> | undefined, b: IDPaths | PlainMessage<IDPaths> | undefined): boolean {
    return proto3.util.equals(IDPaths, a, b);
  }
}

