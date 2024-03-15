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

export * from "./types.js";
export * from "./is-message.js";
export * from "./create.js";
export * from "./clone.js";
export * from "./equals.js";
export * from "./fields.js";

// TODO
// ideally, we would export these types with sub-path exports:
export * from "./google/protobuf/compiler/plugin_pbv2.js";
export * from "./google/protobuf/api_pbv2.js";
export * from "./google/protobuf/any_pbv2.js";
export * from "./google/protobuf/descriptor_pbv2.js";
export * from "./google/protobuf/duration_pbv2.js";
export * from "./google/protobuf/empty_pbv2.js";
export * from "./google/protobuf/field_mask_pbv2.js";
export * from "./google/protobuf/source_context_pbv2.js";
export * from "./google/protobuf/struct_pbv2.js";
export * from "./google/protobuf/timestamp_pbv2.js";
export * from "./google/protobuf/type_pbv2.js";
export * from "./google/protobuf/wrappers_pbv2.js";