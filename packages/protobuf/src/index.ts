// Copyright 2021-2023 Buf Technologies, Inc.
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

export { proto3 } from "./proto3.js";
export { proto2 } from "./proto2.js";
export { protoInt64 } from "./proto-int64.js";
export { protoBase64 } from "./proto-base64.js";
export { protoDelimited } from "./proto-delimited.js";
export { codegenInfo } from "./codegen-info.js";

export { Message } from "./message.js";
export type { AnyMessage, PartialMessage, PlainMessage } from "./message.js";

export type { FieldInfo } from "./field.js";
export type { FieldList } from "./field-list.js";
export { ScalarType } from "./field.js";

export type { MessageType } from "./message-type.js";
export type { EnumType, EnumValueInfo } from "./enum.js";
export type {
  ServiceType,
  MethodInfo,
  MethodInfoUnary,
  MethodInfoServerStreaming,
  MethodInfoClientStreaming,
  MethodInfoBiDiStreaming,
} from "./service-type.js";
export { MethodKind, MethodIdempotency } from "./service-type.js";

export { WireType, BinaryWriter, BinaryReader } from "./binary-encoding.js";
export type { IBinaryReader, IBinaryWriter } from "./binary-encoding.js";
export type {
  BinaryFormat,
  BinaryWriteOptions,
  BinaryReadOptions,
} from "./binary-format.js";

export type {
  JsonFormat,
  JsonObject,
  JsonValue,
  JsonReadOptions,
  JsonWriteOptions,
  JsonWriteStringOptions,
} from "./json-format.js";

export type {
  DescriptorSet,
  AnyDesc,
  DescFile,
  DescEnum,
  DescEnumValue,
  DescMessage,
  DescOneof,
  DescField,
  DescService,
  DescMethod,
  DescExtension,
  DescComments,
} from "./descriptor-set.js";
export { createDescriptorSet } from "./create-descriptor-set.js";
export type { IMessageTypeRegistry } from "./type-registry.js";
export { createRegistry } from "./create-registry.js";
export { createRegistryFromDescriptors } from "./create-registry-from-desc.js";

// ideally, we would export these types with sub-path exports:
export * from "./google/protobuf/compiler/plugin_pb.js";
export * from "./google/protobuf/api_pb.js";
export * from "./google/protobuf/any_pb.js";
export * from "./google/protobuf/descriptor_pb.js";
export * from "./google/protobuf/duration_pb.js";
export * from "./google/protobuf/empty_pb.js";
export * from "./google/protobuf/field_mask_pb.js";
export * from "./google/protobuf/source_context_pb.js";
export * from "./google/protobuf/struct_pb.js";
export * from "./google/protobuf/timestamp_pb.js";
export * from "./google/protobuf/type_pb.js";
export * from "./google/protobuf/wrappers_pb.js";
