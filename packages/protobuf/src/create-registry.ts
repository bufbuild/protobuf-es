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

import type { MessageType } from "./message-type.js";
import type { EnumType } from "./enum.js";
import type { ServiceType } from "./service-type.js";
import type {
  IMessageTypeRegistry,
  IEnumTypeRegistry,
  IServiceTypeRegistry,
} from "./type-registry.js";

/**
 * Create a new registry from the given types.
 */
export function createRegistry(
  ...types: Array<MessageType | EnumType | ServiceType>
): IMessageTypeRegistry & IEnumTypeRegistry & IServiceTypeRegistry {
  const messages: Record<string, MessageType> = {};
  const enums: Record<string, EnumType> = {};
  const services: Record<string, ServiceType> = {};
  const registry = {
    /**
     * Add a type to the registry. For messages, the types used in message
     * fields are added recursively. For services, the message types used
     * for requests and responses are added recursively.
     */
    add(type: MessageType | EnumType | ServiceType): void {
      if ("fields" in type) {
        if (!this.findMessage(type.typeName)) {
          messages[type.typeName] = type;
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
          services[type.typeName] = type;
          for (const method of Object.values(type.methods)) {
            this.add(method.I);
            this.add(method.O);
          }
        }
      } else {
        enums[type.typeName] = type;
      }
    },
    findMessage(typeName: string): MessageType | undefined {
      return messages[typeName];
    },
    findEnum(typeName: string): EnumType | undefined {
      return enums[typeName];
    },
    findService(typeName: string): ServiceType | undefined {
      return services[typeName];
    },
  };
  for (const type of types) {
    registry.add(type);
  }
  return registry;
}
