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

import { assert } from "./private/assert.js";
import type { MessageType } from "./message-type.js";
import { proto3 } from "./proto3.js";
import { proto2 } from "./proto2.js";
import type { PartialFieldInfo } from "./field.js";
import { LongType } from "./field.js";
import type { EnumType, EnumValueInfo } from "./enum.js";
import type {
  IEnumTypeRegistry,
  IExtensionRegistry,
  IMessageTypeRegistry,
  IServiceTypeRegistry,
} from "./type-registry.js";
import type { MethodInfo, ServiceType } from "./service-type.js";
import { localName } from "./private/names.js";
import { Timestamp } from "./google/protobuf/timestamp_pb.js";
import { Duration } from "./google/protobuf/duration_pb.js";
import { Any } from "./google/protobuf/any_pb.js";
import { Empty } from "./google/protobuf/empty_pb.js";
import { FieldMask } from "./google/protobuf/field_mask_pb.js";
import {
  ListValue,
  NullValue,
  Struct,
  Value,
} from "./google/protobuf/struct_pb.js";
import { getEnumType } from "./private/enum.js";
import {
  BoolValue,
  BytesValue,
  DoubleValue,
  FloatValue,
  Int32Value,
  Int64Value,
  StringValue,
  UInt32Value,
  UInt64Value,
} from "./google/protobuf/wrappers_pb.js";
import {
  FieldDescriptorProto_Type,
  FileDescriptorSet,
} from "./google/protobuf/descriptor_pb.js";
import type {
  DescExtension,
  DescField,
  DescriptorSet,
} from "./descriptor-set.js";
import { createDescriptorSet } from "./create-descriptor-set.js";
import type { Extension } from "./extension.js";
import type { ExtensionFieldSource } from "./private/extensions.js";

// well-known message types with specialized JSON representation
const wkMessages = [
  Any,
  Duration,
  Empty,
  FieldMask,
  Struct,
  Value,
  ListValue,
  Timestamp,
  Duration,
  DoubleValue,
  FloatValue,
  Int64Value,
  Int32Value,
  UInt32Value,
  UInt64Value,
  BoolValue,
  StringValue,
  BytesValue,
];

// well-known enum types with specialized JSON representation
const wkEnums = [getEnumType(NullValue)];

/**
 * Create a registry from a set of descriptors. The types returned by this
 * registry behave exactly like types from generated code.
 *
 * This function accepts google.protobuf.FileDescriptorSet in serialized or
 * deserialized form. Alternatively, it also accepts a DescriptorSet (see
 * createDescriptorSet()).
 *
 * By default, all well-known types with a specialized JSON representation
 * are replaced with their generated counterpart in this package.
 */
export function createRegistryFromDescriptors(
  input: DescriptorSet | FileDescriptorSet | Uint8Array,
  replaceWkt = true,
): IMessageTypeRegistry &
  IEnumTypeRegistry &
  IExtensionRegistry &
  IServiceTypeRegistry {
  const set: DescriptorSet =
    input instanceof Uint8Array || input instanceof FileDescriptorSet
      ? createDescriptorSet(input)
      : input;
  const enums = new Map<string, EnumType>();
  const messages = new Map<string, MessageType>();
  const extensions = new Map<string, Extension>();
  const extensionsByExtendee = new Map<string, Map<number, DescExtension>>();
  const services: Record<string, ServiceType | undefined> = {};
  if (replaceWkt) {
    for (const mt of wkMessages) {
      messages.set(mt.typeName, mt);
    }
    for (const et of wkEnums) {
      enums.set(et.typeName, et);
    }
  }
  return {
    /**
     * May raise an error on invalid descriptors.
     */
    findEnum(typeName: string): EnumType | undefined {
      const existing = enums.get(typeName);
      if (existing) {
        return existing;
      }
      const desc = set.enums.get(typeName);
      if (!desc) {
        return undefined;
      }
      const runtime = desc.file.syntax == "proto3" ? proto3 : proto2;
      const type = runtime.makeEnumType(
        typeName,
        desc.values.map(
          (u): EnumValueInfo => ({
            no: u.number,
            name: u.name,
            localName: localName(u),
          }),
        ),
        {},
      );
      enums.set(typeName, type);
      return type;
    },

    /**
     * May raise an error on invalid descriptors.
     */
    findMessage(typeName: string): MessageType | undefined {
      const existing = messages.get(typeName);
      if (existing) {
        return existing;
      }
      const desc = set.messages.get(typeName);
      if (!desc) {
        return undefined;
      }
      const runtime = desc.file.syntax == "proto3" ? proto3 : proto2;
      const fields: PartialFieldInfo[] = [];
      const type = runtime.makeMessageType(typeName, () => fields, {
        localName: localName(desc),
      });
      messages.set(typeName, type);
      for (const field of desc.fields) {
        const fieldInfo = makeFieldInfo(field, this);
        fields.push(fieldInfo);
      }
      return type;
    },

    /**
     * May raise an error on invalid descriptors.
     */
    findService(typeName: string): ServiceType | undefined {
      const existing = services[typeName];
      if (existing) {
        return existing;
      }
      const desc = set.services.get(typeName);
      if (!desc) {
        return undefined;
      }
      const methods: Record<string, MethodInfo> = {};
      for (const method of desc.methods) {
        const I = this.findMessage(method.input.typeName);
        const O = this.findMessage(method.output.typeName);
        assert(
          I,
          `message "${
            method.input.typeName
          }" for ${method.toString()} not found`,
        );
        assert(
          O,
          `output message "${
            method.output.typeName
          }" for ${method.toString()} not found`,
        );
        methods[localName(method)] = {
          name: method.name,
          I,
          O,
          kind: method.methodKind,
          idempotency: method.idempotency,
          // We do not surface options at this time
          // options: {},
        };
      }
      return (services[typeName] = {
        typeName: desc.typeName,
        methods,
      });
    },

    /**
     * May raise an error on invalid descriptors.
     */
    findExtensionFor(typeName: string, no: number): Extension | undefined {
      if (!set.messages.has(typeName)) {
        return undefined;
      }
      let extensionsByNo = extensionsByExtendee.get(typeName);
      if (!extensionsByNo) {
        // maintain a lookup for extension desc by number
        extensionsByNo = new Map<number, DescExtension>();
        extensionsByExtendee.set(typeName, extensionsByNo);
        for (const desc of set.extensions.values()) {
          if (desc.extendee.typeName == typeName) {
            extensionsByNo.set(desc.number, desc);
          }
        }
      }
      const desc = extensionsByExtendee.get(typeName)?.get(no);
      return desc ? this.findExtension(desc.typeName) : undefined;
    },

    /**
     * May raise an error on invalid descriptors.
     */
    findExtension(typeName: string): Extension | undefined {
      const existing = extensions.get(typeName);
      if (existing) {
        return existing;
      }
      const desc = set.extensions.get(typeName);
      if (!desc) {
        return undefined;
      }
      const extendee = this.findMessage(desc.extendee.typeName);
      assert(
        extendee,
        `message "${desc.extendee.typeName}" for ${desc.toString()} not found`,
      );
      const runtime = desc.file.syntax == "proto3" ? proto3 : proto2;
      const ext = runtime.makeExtension(
        typeName,
        extendee,
        makeFieldInfo(desc, this) as ExtensionFieldSource,
      );
      extensions.set(typeName, ext);
      return ext;
    },
  };
}

interface Resolver extends IMessageTypeRegistry, IEnumTypeRegistry {}

function makeFieldInfo(
  desc: DescField | DescExtension,
  resolver: Resolver,
): PartialFieldInfo {
  switch (desc.fieldKind) {
    case "map":
      assert(desc.kind == "field"); // maps are not allowed for extensions
      return makeMapFieldInfo(desc, resolver);
    case "message":
      return makeMessageFieldInfo(desc, resolver);
    case "enum": {
      const fi = makeEnumFieldInfo(desc, resolver);
      fi.default = desc.getDefaultValue();
      return fi;
    }
    case "scalar": {
      const fi = makeScalarFieldInfo(desc);
      fi.default = desc.getDefaultValue();
      return fi;
    }
  }
}

function makeMapFieldInfo(
  field: DescField & { fieldKind: "map" },
  resolver: Resolver,
): PartialFieldInfo {
  const base = {
    kind: "map",
    no: field.number,
    name: field.name,
    jsonName: field.jsonName,
    K: field.mapKey,
  } as const;
  if (field.mapValue.message) {
    const messageType = resolver.findMessage(field.mapValue.message.typeName);
    assert(
      messageType,
      `message "${
        field.mapValue.message.typeName
      }" for ${field.toString()} not found`,
    );
    return {
      ...base,
      V: {
        kind: "message",
        T: messageType,
      },
    };
  }
  if (field.mapValue.enum) {
    const enumType = resolver.findEnum(field.mapValue.enum.typeName);
    assert(
      enumType,
      `enum "${
        field.mapValue.enum.typeName
      }" for ${field.toString()} not found`,
    );
    return {
      ...base,
      V: {
        kind: "enum",
        T: enumType,
      },
    };
  }
  return {
    ...base,
    V: {
      kind: "scalar",
      T: field.mapValue.scalar,
    },
  };
}

function makeScalarFieldInfo(
  field: (DescField | DescExtension) & { fieldKind: "scalar" },
): PartialFieldInfo {
  // We are creating _partial_ field info here, so we omit long type bigint,
  // which is the default.
  const longType =
    field.longType == LongType.STRING
      ? ({ L: LongType.STRING } as const)
      : ({} as const);
  const base = {
    kind: "scalar",
    no: field.number,
    name: field.name,
    jsonName: field.jsonName,
    T: field.scalar,
    ...longType,
  } as const;
  if (field.repeated) {
    return {
      ...base,
      repeated: true,
      packed: field.packed,
      oneof: undefined,
      T: field.scalar,
    };
  }
  if (field.oneof) {
    return {
      ...base,
      oneof: field.oneof.name,
    };
  }
  if (field.optional) {
    return {
      ...base,
      opt: true,
    };
  }
  return base;
}

function makeMessageFieldInfo(
  field: (DescField | DescExtension) & { fieldKind: "message" },
  resolver: Resolver,
): PartialFieldInfo {
  const messageType = resolver.findMessage(field.message.typeName);
  assert(
    messageType,
    `message "${field.message.typeName}" for ${field.toString()} not found`,
  );
  const base = {
    kind: "message",
    no: field.number,
    name: field.name,
    jsonName: field.jsonName,
    T: messageType,
    delimited: field.proto.type == FieldDescriptorProto_Type.GROUP,
  } as const;
  if (field.repeated) {
    return {
      ...base,
      repeated: true,
      packed: field.packed,
      oneof: undefined,
    };
  }
  if (field.oneof) {
    return {
      ...base,
      oneof: field.oneof.name,
    };
  }
  if (field.optional) {
    return {
      ...base,
      opt: true,
    };
  }
  return base;
}

function makeEnumFieldInfo(
  field: (DescField | DescExtension) & { fieldKind: "enum" },
  resolver: Resolver,
): PartialFieldInfo {
  const enumType = resolver.findEnum(field.enum.typeName);
  assert(
    enumType,
    `enum "${field.enum.typeName}" for ${field.toString()} not found`,
  );
  const base = {
    kind: "enum",
    no: field.number,
    name: field.name,
    jsonName: field.jsonName,
    T: enumType,
  } as const;
  if (field.repeated) {
    return {
      ...base,
      repeated: true,
      packed: field.packed,
      oneof: undefined,
    };
  }
  if (field.oneof) {
    return {
      ...base,
      oneof: field.oneof.name,
    };
  }
  if (field.optional) {
    return {
      ...base,
      opt: true,
    };
  }
  return base;
}
