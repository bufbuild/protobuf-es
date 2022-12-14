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

// @generated by protoc-gen-es v0.5.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/audit/v1alpha1/plugin.proto (package buf.alpha.audit.v1alpha1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVisibility
 */
export enum BufAlphaRegistryV1Alpha1PluginVisibility {
  /**
   * @generated from enum value: BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_VISIBILITY_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_VISIBILITY_PUBLIC = 1;
   */
  PUBLIC = 1,

  /**
   * @generated from enum value: BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_VISIBILITY_PRIVATE = 2;
   */
  PRIVATE = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(BufAlphaRegistryV1Alpha1PluginVisibility)
proto3.util.setEnumType(BufAlphaRegistryV1Alpha1PluginVisibility, "buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVisibility", [
  { no: 0, name: "BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_VISIBILITY_UNSPECIFIED" },
  { no: 1, name: "BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_VISIBILITY_PUBLIC" },
  { no: 2, name: "BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_VISIBILITY_PRIVATE" },
]);

/**
 * @generated from message buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping
 */
export class BufAlphaRegistryV1Alpha1PluginVersionMapping extends Message<BufAlphaRegistryV1Alpha1PluginVersionMapping> {
  /**
   * @generated from field: string plugin_owner = 1;
   */
  pluginOwner = "";

  /**
   * @generated from field: string plugin_name = 2;
   */
  pluginName = "";

  /**
   * @generated from field: string version = 3;
   */
  version = "";

  /**
   * @generated from field: bool deleted = 4;
   */
  deleted = false;

  constructor(data?: PartialMessage<BufAlphaRegistryV1Alpha1PluginVersionMapping>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "plugin_owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "plugin_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "version", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "deleted", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BufAlphaRegistryV1Alpha1PluginVersionMapping {
    return new BufAlphaRegistryV1Alpha1PluginVersionMapping().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1PluginVersionMapping {
    return new BufAlphaRegistryV1Alpha1PluginVersionMapping().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1PluginVersionMapping {
    return new BufAlphaRegistryV1Alpha1PluginVersionMapping().fromJsonString(jsonString, options);
  }

  static equals(a: BufAlphaRegistryV1Alpha1PluginVersionMapping | PlainMessage<BufAlphaRegistryV1Alpha1PluginVersionMapping> | undefined, b: BufAlphaRegistryV1Alpha1PluginVersionMapping | PlainMessage<BufAlphaRegistryV1Alpha1PluginVersionMapping> | undefined): boolean {
    return proto3.util.equals(BufAlphaRegistryV1Alpha1PluginVersionMapping, a, b);
  }
}

/**
 * @generated from message buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig
 */
export class BufAlphaRegistryV1Alpha1PluginConfig extends Message<BufAlphaRegistryV1Alpha1PluginConfig> {
  /**
   * @generated from field: string plugin_owner = 1;
   */
  pluginOwner = "";

  /**
   * @generated from field: string plugin_name = 2;
   */
  pluginName = "";

  /**
   * @generated from field: repeated string parameters = 3;
   */
  parameters: string[] = [];

  /**
   * @generated from field: bool deleted = 4;
   */
  deleted = false;

  constructor(data?: PartialMessage<BufAlphaRegistryV1Alpha1PluginConfig>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "plugin_owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "plugin_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "parameters", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 4, name: "deleted", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BufAlphaRegistryV1Alpha1PluginConfig {
    return new BufAlphaRegistryV1Alpha1PluginConfig().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1PluginConfig {
    return new BufAlphaRegistryV1Alpha1PluginConfig().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1PluginConfig {
    return new BufAlphaRegistryV1Alpha1PluginConfig().fromJsonString(jsonString, options);
  }

  static equals(a: BufAlphaRegistryV1Alpha1PluginConfig | PlainMessage<BufAlphaRegistryV1Alpha1PluginConfig> | undefined, b: BufAlphaRegistryV1Alpha1PluginConfig | PlainMessage<BufAlphaRegistryV1Alpha1PluginConfig> | undefined): boolean {
    return proto3.util.equals(BufAlphaRegistryV1Alpha1PluginConfig, a, b);
  }
}

/**
 * @generated from message buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary
 */
export class BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary extends Message<BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string version = 2;
   */
  version = "";

  constructor(data?: PartialMessage<BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "version", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary {
    return new BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary {
    return new BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary {
    return new BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary().fromJsonString(jsonString, options);
  }

  static equals(a: BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary | PlainMessage<BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary> | undefined, b: BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary | PlainMessage<BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary> | undefined): boolean {
    return proto3.util.equals(BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary, a, b);
  }
}

