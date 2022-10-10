// Copyright 2021-2022 Buf Technologies, Inc.
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

import type { MessageType } from "./message-type.js";
import type { EnumType } from "./enum.js";
import type { ServiceType } from "./service-type.js";
import type { Extension } from "./extension";

/**
 * IMessageTypeRegistry provides look-up for message types.
 */
export interface IMessageTypeRegistry {
  /**
   * Find a message type by its protobuf type name.
   */
  findMessage(typeName: string): MessageType | undefined;
}

/**
 * IEnumTypeRegistry provides look-up for enum types.
 */
export interface IEnumTypeRegistry {
  /**
   * Find an enum type by its protobuf type name.
   */
  findEnum(typeName: string): EnumType | undefined;
}

/**
 * IServiceTypeRegistry provides look-up for service types.
 */
export interface IServiceTypeRegistry {
  /**
   * Find a service type by its protobuf type name.
   */
  findService(typeName: string): ServiceType | undefined;
}

/**
 * IExtensionRegistry provides look-up for extensions.
 */
export interface IExtensionRegistry {

  // TODO these methods need to change, according to what's needed for the binary and json format

  findExtensions(extendee: string): Extension[];
  findExtensionByNumber(no: number, extendee: string): Extension | undefined;
  /**
   * Find an extension type by its protobuf type name.
   */
  findExtension(typeName: string): Extension | undefined;
}
