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
  IEnumTypeRegistry,
  IExtensionRegistry,
  IMessageTypeRegistry,
  IMutableRegistry,
  IServiceTypeRegistry,
} from "./type-registry.js";
import type { Extension } from "./extension.js";
import type { FieldInfo } from "./field.js";

/**
 * Create a new registry from the given types.
 */
export function createRegistry(
  ...types: Array<MessageType | EnumType | ServiceType | Extension>
): IMessageTypeRegistry &
  IEnumTypeRegistry &
  IExtensionRegistry &
  IServiceTypeRegistry {
  return createMutableRegistry(...types);
}

/**
 * Create a mutable registry from the given types.
 */
export function createMutableRegistry(
  ...types: Array<MessageType | EnumType | ServiceType | Extension>
): IMutableRegistry {
  const messages: Record<string, MessageType> = {};
  const enums: Record<string, EnumType> = {};
  const services: Record<string, ServiceType> = {};
  const extensionsByName = new Map<string, Extension>();
  const extensionsByExtendee = new Map<string, Map<number, Extension>>();

  const registry: IMutableRegistry = {
    findMessage(typeName: string): MessageType | undefined {
      return messages[typeName];
    },
    findEnum(typeName: string): EnumType | undefined {
      return enums[typeName];
    },
    findService(typeName: string): ServiceType | undefined {
      return services[typeName];
    },
    findExtensionFor(typeName: string, no: number): Extension | undefined {
      return extensionsByExtendee.get(typeName)?.get(no) ?? undefined;
    },
    findExtension(typeName: string): Extension | undefined {
      return extensionsByName.get(typeName) ?? undefined;
    },
    add(type: MessageType | EnumType | ServiceType | Extension) {
      if ("fields" in type) {
        if (!this.findMessage(type.typeName)) {
          messages[type.typeName] = type;
          type.fields.list().forEach(addField);
        }
      } else if ("methods" in type) {
        if (!this.findService(type.typeName)) {
          services[type.typeName] = type;
          for (const method of Object.values(type.methods)) {
            this.add(method.I);
            this.add(method.O);
          }
        }
      } else if ("extendee" in type) {
        if (!extensionsByName.has(type.typeName)) {
          extensionsByName.set(type.typeName, type);
          const extendeeName = type.extendee.typeName;
          if (!extensionsByExtendee.has(extendeeName)) {
            extensionsByExtendee.set(
              extendeeName,
              new Map<number, Extension>(),
            );
          }
          extensionsByExtendee.get(extendeeName)?.set(type.field.no, type);
          this.add(type.extendee);
          addField(type.field);
        }
      } else {
        enums[type.typeName] = type;
      }
    },
  };

  function addField(field: FieldInfo) {
    if (field.kind == "message") {
      registry.add(field.T);
    } else if (field.kind == "map" && field.V.kind == "message") {
      registry.add(field.V.T);
    } else if (field.kind == "enum") {
      registry.add(field.T);
    }
  }
  for (const type of types) {
    registry.add(type);
  }
  return registry;
}
