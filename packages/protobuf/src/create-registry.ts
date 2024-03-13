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
  const messages: Record<string, MessageType> = {};
  const enums: Record<string, EnumType> = {};
  const services: Record<string, ServiceType> = {};
  const extensionsByName = new Map<string, Extension>();
  const extensionsByExtendee = new Map<string, Map<number, Extension>>();
  const registry = {
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
  };

  function addType(type: MessageType | EnumType | ServiceType | Extension) {
    if ("fields" in type) {
      if (!registry.findMessage(type.typeName)) {
        messages[type.typeName] = type;
        type.fields.list().forEach(addField);
      }
    } else if ("methods" in type) {
      if (!registry.findService(type.typeName)) {
        services[type.typeName] = type;
        for (const method of Object.values(type.methods)) {
          addType(method.I);
          addType(method.O);
        }
      }
    } else if ("extendee" in type) {
      if (!extensionsByName.has(type.typeName)) {
        extensionsByName.set(type.typeName, type);
        const extendeeName = type.extendee.typeName;
        if (!extensionsByExtendee.has(extendeeName)) {
          extensionsByExtendee.set(extendeeName, new Map<number, Extension>());
        }
        extensionsByExtendee.get(extendeeName)?.set(type.field.no, type);
        addType(type.extendee);
        addField(type.field);
      }
    } else {
      enums[type.typeName] = type;
    }
  }

  function addField(field: FieldInfo) {
    if (field.kind == "message") {
      addType(field.T);
    } else if (field.kind == "map" && field.V.kind == "message") {
      addType(field.V.T);
    } else if (field.kind == "enum") {
      addType(field.T);
    }
  }
  for (const type of types) {
    addType(type);
  }
  return registry;
}
