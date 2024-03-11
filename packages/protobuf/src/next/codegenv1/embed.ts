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

import {
  DescriptorProto,
  FileDescriptorProto,
} from "../../google/protobuf/descriptor_pb";
import type {
  DescEnum,
  DescExtension,
  DescFile,
  DescMessage,
  DescService,
} from "../../descriptor-set";
import { clearField, isFieldSet } from "../../field-accessor";
import { protoBase64 } from "../../proto-base64";
import { protoCamelCase } from "../reflect/names.js";

interface FileDescEmbedded {
  proto(): FileDescriptorProto;
  protoB64(): { kind: "es_string"; value: string };
  // TODO deps?
}

export function embedFileDesc(file: DescFile): FileDescEmbedded {
  return {
    proto() {
      const i = file.proto;
      const o = new FileDescriptorProto();
      if (isFieldSet(i, "name")) o.name = i.name;
      if (isFieldSet(i, "package")) o.package = i.package;
      // dependency
      if (isFieldSet(i, "publicDependency"))
        o.publicDependency = i.publicDependency;
      if (isFieldSet(i, "weakDependency")) o.weakDependency = i.weakDependency;
      if (isFieldSet(i, "messageType"))
        o.messageType = i.messageType.map(cloneAndStripRedundantJsonNames);
      if (isFieldSet(i, "enumType")) o.enumType = i.enumType;
      if (isFieldSet(i, "service")) o.service = i.service;
      if (isFieldSet(i, "extension")) o.extension = i.extension;
      if (isFieldSet(i, "options")) o.options = i.options;
      // sourceCodeInfo
      if (isFieldSet(i, "syntax")) o.syntax = i.syntax;
      if (isFieldSet(i, "edition")) o.edition = i.edition;
      return o;
    },
    protoB64() {
      const bytes = this.proto().toBinary();
      const b64 = protoBase64.enc(bytes).replace(/=+$/, "");
      return { kind: "es_string", value: b64 };
    },
  };
}

function cloneAndStripRedundantJsonNames(i: DescriptorProto): DescriptorProto {
  // not using clone() because it does not retain unknown fields
  const o = DescriptorProto.fromBinary(i.toBinary());
  stripRedundantJsonNames(o);
  return o;
}
function stripRedundantJsonNames(d: DescriptorProto): void {
  for (const f of d.field) {
    if (f.jsonName === protoCamelCase(f.name)) {
      clearField(f, "jsonName");
    }
  }
  for (const n of d.nestedType) {
    // TODO avoid recursion
    stripRedundantJsonNames(n);
  }
}

export function pathInFileDesc(
  desc: DescMessage | DescEnum | DescExtension | DescService,
): number[] {
  if (desc.kind == "service") {
    return [desc.file.services.indexOf(desc)];
  }
  const parent = desc.parent;
  if (parent == undefined) {
    switch (desc.kind) {
      case "enum":
        return [desc.file.enums.indexOf(desc)];
      case "message":
        return [desc.file.messages.indexOf(desc)];
      case "extension":
        return [desc.file.extensions.indexOf(desc)];
    }
  }
  function findPath(cur: DescMessage): number[] {
    const nested: number[] = [];
    for (let parent = cur.parent; parent; ) {
      const idx = parent.nestedMessages.indexOf(cur);
      nested.unshift(idx);
      cur = parent;
      parent = cur.parent;
    }
    nested.unshift(cur.file.messages.indexOf(cur));
    return nested;
  }
  const path = findPath(parent);
  switch (desc.kind) {
    case "extension":
      return [...path, parent.nestedExtensions.indexOf(desc)];
    case "message":
      return [...path, parent.nestedMessages.indexOf(desc)];
    case "enum":
      return [...path, parent.nestedEnums.indexOf(desc)];
  }
}
