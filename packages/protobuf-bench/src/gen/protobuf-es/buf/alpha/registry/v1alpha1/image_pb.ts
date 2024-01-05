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
// @generated from file buf/alpha/registry/v1alpha1/image.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { Image } from "../../image/v1/image_pb.js";

/**
 * ImageMask is used in GetImageRequest to specify which parts of an image 
 * should be masked in responses.
 *
 * @generated from enum buf.alpha.registry.v1alpha1.ImageMask
 */
export enum ImageMask {
  /**
   * @generated from enum value: IMAGE_MASK_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * IMAGE_MASK_MESSAGES refers to ImageFile's `google.protobuf.DescriptorProto
   * message_type` field.
   *
   * @generated from enum value: IMAGE_MASK_MESSAGES = 1;
   */
  MESSAGES = 1,

  /**
   * IMAGE_MASK_ENUMS refers to ImageFile's `google.protobuf.EnumDescriptorProto
   * enum_type` field.
   *
   * @generated from enum value: IMAGE_MASK_ENUMS = 2;
   */
  ENUMS = 2,

  /**
   * IMAGE_MASK_SERVICES refers to ImageFile's
   * `google.protobuf.ServiceDescriptorProto service` field.
   *
   * @generated from enum value: IMAGE_MASK_SERVICES = 3;
   */
  SERVICES = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(ImageMask)
proto3.util.setEnumType(ImageMask, "buf.alpha.registry.v1alpha1.ImageMask", [
  { no: 0, name: "IMAGE_MASK_UNSPECIFIED" },
  { no: 1, name: "IMAGE_MASK_MESSAGES" },
  { no: 2, name: "IMAGE_MASK_ENUMS" },
  { no: 3, name: "IMAGE_MASK_SERVICES" },
]);

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetImageRequest
 */
export class GetImageRequest extends Message<GetImageRequest> {
  /**
   * @generated from field: string owner = 1;
   */
  owner = "";

  /**
   * @generated from field: string repository = 2;
   */
  repository = "";

  /**
   * @generated from field: string reference = 3;
   */
  reference = "";

  /**
   * Exclude files from imported buf modules in this image.
   *
   * @generated from field: bool exclude_imports = 4;
   */
  excludeImports = false;

  /**
   * Exclude source_code_info fields from each ImageFile.
   *
   * @generated from field: bool exclude_source_info = 5;
   */
  excludeSourceInfo = false;

  /**
   * When specified the returned image will only contain the necessary files and
   * descriptors in those files to describe these types. Accepts messages, enums
   * and services. All types must be defined in the buf module, types in
   * dependencies are not accepted.
   *
   * At this time specifying `types` requires `exclude_source_info` to be set to
   * true. 
   *
   * @generated from field: repeated string types = 6;
   */
  types: string[] = [];

  /**
   * When not empty, the returned image's files will only include
   * *DescriptorProto fields for the elements specified here. The masks are
   * applied without regard for dependenices between types. For example, if
   * `IMAGE_MASK_MESSAGES` is specified without `IMAGE_MASK_ENUMS` the resulting
   * image will NOT contain enum definitions even if they are referenced from
   * message fields.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.ImageMask include_mask = 7;
   */
  includeMask: ImageMask[] = [];

  constructor(data?: PartialMessage<GetImageRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetImageRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "repository", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "reference", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "exclude_imports", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "exclude_source_info", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 6, name: "types", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 7, name: "include_mask", kind: "enum", T: proto3.getEnumType(ImageMask), repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetImageRequest {
    return new GetImageRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetImageRequest {
    return new GetImageRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetImageRequest {
    return new GetImageRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetImageRequest | PlainMessage<GetImageRequest> | undefined, b: GetImageRequest | PlainMessage<GetImageRequest> | undefined): boolean {
    return proto3.util.equals(GetImageRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetImageResponse
 */
export class GetImageResponse extends Message<GetImageResponse> {
  /**
   * @generated from field: buf.alpha.image.v1.Image image = 1;
   */
  image?: Image;

  constructor(data?: PartialMessage<GetImageResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GetImageResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "image", kind: "message", T: Image },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetImageResponse {
    return new GetImageResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetImageResponse {
    return new GetImageResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetImageResponse {
    return new GetImageResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetImageResponse | PlainMessage<GetImageResponse> | undefined, b: GetImageResponse | PlainMessage<GetImageResponse> | undefined): boolean {
    return proto3.util.equals(GetImageResponse, a, b);
  }
}

