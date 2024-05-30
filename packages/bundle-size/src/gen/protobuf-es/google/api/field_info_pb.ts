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

// @generated by protoc-gen-es v1.10.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/api/field_info.proto (package google.api, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { FieldOptions, Message, proto3 } from "@bufbuild/protobuf";

/**
 * Rich semantic information of an API field beyond basic typing.
 *
 * @generated from message google.api.FieldInfo
 */
export class FieldInfo extends Message<FieldInfo> {
  /**
   * The standard format of a field value. This does not explicitly configure
   * any API consumer, just documents the API's format for the field it is
   * applied to.
   *
   * @generated from field: google.api.FieldInfo.Format format = 1;
   */
  format = FieldInfo_Format.FORMAT_UNSPECIFIED;

  constructor(data?: PartialMessage<FieldInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "google.api.FieldInfo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "format", kind: "enum", T: proto3.getEnumType(FieldInfo_Format) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FieldInfo {
    return new FieldInfo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FieldInfo {
    return new FieldInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FieldInfo {
    return new FieldInfo().fromJsonString(jsonString, options);
  }

  static equals(a: FieldInfo | PlainMessage<FieldInfo> | undefined, b: FieldInfo | PlainMessage<FieldInfo> | undefined): boolean {
    return proto3.util.equals(FieldInfo, a, b);
  }
}

/**
 * The standard format of a field value. The supported formats are all backed
 * by either an RFC defined by the IETF or a Google-defined AIP.
 *
 * @generated from enum google.api.FieldInfo.Format
 */
export enum FieldInfo_Format {
  /**
   * Default, unspecified value.
   *
   * @generated from enum value: FORMAT_UNSPECIFIED = 0;
   */
  FORMAT_UNSPECIFIED = 0,

  /**
   * Universally Unique Identifier, version 4, value as defined by
   * https://datatracker.ietf.org/doc/html/rfc4122. The value may be
   * normalized to entirely lowercase letters. For example, the value
   * `F47AC10B-58CC-0372-8567-0E02B2C3D479` would be normalized to
   * `f47ac10b-58cc-0372-8567-0e02b2c3d479`.
   *
   * @generated from enum value: UUID4 = 1;
   */
  UUID4 = 1,

  /**
   * Internet Protocol v4 value as defined by [RFC
   * 791](https://datatracker.ietf.org/doc/html/rfc791). The value may be
   * condensed, with leading zeros in each octet stripped. For example,
   * `001.022.233.040` would be condensed to `1.22.233.40`.
   *
   * @generated from enum value: IPV4 = 2;
   */
  IPV4 = 2,

  /**
   * Internet Protocol v6 value as defined by [RFC
   * 2460](https://datatracker.ietf.org/doc/html/rfc2460). The value may be
   * normalized to entirely lowercase letters with zeros compressed, following
   * [RFC 5952](https://datatracker.ietf.org/doc/html/rfc5952). For example,
   * the value `2001:0DB8:0::0` would be normalized to `2001:db8::`.
   *
   * @generated from enum value: IPV6 = 3;
   */
  IPV6 = 3,

  /**
   * An IP address in either v4 or v6 format as described by the individual
   * values defined herein. See the comments on the IPV4 and IPV6 types for
   * allowed normalizations of each.
   *
   * @generated from enum value: IPV4_OR_IPV6 = 4;
   */
  IPV4_OR_IPV6 = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(FieldInfo_Format)
proto3.util.setEnumType(FieldInfo_Format, "google.api.FieldInfo.Format", [
  { no: 0, name: "FORMAT_UNSPECIFIED" },
  { no: 1, name: "UUID4" },
  { no: 2, name: "IPV4" },
  { no: 3, name: "IPV6" },
  { no: 4, name: "IPV4_OR_IPV6" },
]);

/**
 * Rich semantic descriptor of an API field beyond the basic typing.
 *
 * Examples:
 *
 *   string request_id = 1 [(google.api.field_info).format = UUID4];
 *   string old_ip_address = 2 [(google.api.field_info).format = IPV4];
 *   string new_ip_address = 3 [(google.api.field_info).format = IPV6];
 *   string actual_ip_address = 4 [
 *     (google.api.field_info).format = IPV4_OR_IPV6
 *   ];
 *
 * @generated from extension: google.api.FieldInfo field_info = 291403980;
 */
export const field_info = proto3.makeExtension<FieldOptions, FieldInfo>(
  "google.api.field_info", 
  FieldOptions, 
  () => ({ no: 291403980, kind: "message", T: FieldInfo }),
);

