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

import type {
  DescEnum,
  DescExtension,
  DescFile,
  DescMessage,
  DescService,
} from "./desc-types.js";

/**
 * DescriptorSet provides a convenient interface for working with a set
 * of google.protobuf.FileDescriptorProto.
 *
 * When protobuf sources are compiled, each file is parsed into a
 * google.protobuf.FileDescriptorProto. Those messages describe all parts
 * of the source file that are required to generate code for them.
 *
 * DescriptorSet resolves references between the descriptors, hides
 * implementation details like synthetic map entry messages, and provides
 * simple access to comments.
 */
export interface DescriptorSet {
  /**
   * All files, in the order they were added to the set.
   */
  readonly files: DescFile[];
  /**
   * All enumerations, indexed by their fully qualified type name.
   * (We omit the leading dot.)
   */
  readonly enums: ReadonlyMap<string, DescEnum>;
  /**
   * All messages, indexed by their fully qualified type name.
   * (We omit the leading dot.)
   */
  readonly messages: ReadonlyMap<string, DescMessage>;
  /**
   * All services, indexed by their fully qualified type name.
   * (We omit the leading dot.)
   */
  readonly services: ReadonlyMap<string, DescService>;
  /**
   * All extensions, indexed by their fully qualified type name.
   */
  readonly extensions: ReadonlyMap<string, DescExtension>;
}
