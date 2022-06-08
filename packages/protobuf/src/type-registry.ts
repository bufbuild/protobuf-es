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
 * TypeRegistry is a simple registry for all message, enum, or service types.
 */
export class TypeRegistry
  implements IMessageTypeRegistry, IEnumTypeRegistry, IServiceTypeRegistry
{
  private readonly messages: Record<string, MessageType> = {};
  private readonly enums: Record<string, EnumType> = {};
  private readonly services: Record<string, ServiceType> = {};

  /**
   * Find a message type by its protobuf type name.
   */
  findMessage(typeName: string): MessageType | undefined {
    return this.messages[typeName];
  }

  /**
   * Find an enum type by its protobuf type name.
   */
  findEnum(typeName: string): EnumType | undefined {
    return this.enums[typeName];
  }

  /**
   * Find a service type by its protobuf type name.
   */
  findService(typeName: string): ServiceType | undefined {
    return this.services[typeName];
  }

  /**
   * Create a new TypeRegistry from the given types.
   */
  static from(
    ...types: Array<MessageType | EnumType | ServiceType>
  ): TypeRegistry {
    const registry = new TypeRegistry();
    for (const type of types) {
      registry.add(type);
    }
    return registry;
  }

  /**
   * @deprecated use TypeRegistry.from()
   */
  static fromIterable(types: Iterable<MessageType>): TypeRegistry {
    return TypeRegistry.from(...types);
  }

  /**
   * @deprecated use TypeRegistry.from()
   */
  static fromTypes(...types: MessageType[]): TypeRegistry {
    return TypeRegistry.from(...types);
  }

  /**
   * Add a type to the registry. For messages, the types used in message
   * fields are added recursively. For services, the message types used
   * for requests and responses are added recursively.
   */
  add(type: MessageType | EnumType | ServiceType): void {
    if ("fields" in type) {
      if (!this.findMessage(type.typeName)) {
        this.messages[type.typeName] = type;
        for (const field of type.fields.list()) {
          if (field.kind == "message") {
            this.add(field.T);
          } else if (field.kind == "map" && field.V.kind == "message") {
            this.add(field.V.T);
          } else if (field.kind == "enum") {
            this.add(field.T);
          }
        }
      }
    } else if ("methods" in type) {
      if (!this.findService(type.typeName)) {
        this.services[type.typeName] = type;
        for (const method of Object.values(type.methods)) {
          this.add(method.I);
          this.add(method.O);
        }
      }
    } else {
      this.enums[type.typeName] = type;
    }
  }
}
