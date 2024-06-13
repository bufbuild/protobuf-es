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
  type AnyDesc,
  type DescComments,
  type DescEnumValue,
  type DescExtension,
  type DescField,
  type DescFile,
  isFieldSet,
  ScalarType,
} from "@bufbuild/protobuf";
import { protoCamelCase, reflect } from "@bufbuild/protobuf/reflect";
import {
  Edition,
  type SourceCodeInfo,
  FieldDescriptorProto_Label,
  FieldDescriptorProto_Type,
  FieldDescriptorProtoDesc,
  FieldOptions_JSType,
  FieldOptionsDesc,
  FeatureSetDesc,
  SourceCodeInfo_Location_Desc,
  FileDescriptorProtoDesc,
  DescriptorProtoDesc,
  EnumDescriptorProtoDesc,
  ServiceDescriptorProtoDesc,
} from "@bufbuild/protobuf/wkt";

/**
 * Get comments on the package element in the protobuf source.
 */
export function getPackageComments(desc: DescFile): DescComments {
  return findComments(desc.proto.sourceCodeInfo, [
    FileDescriptorProtoDesc.field.package.number,
  ]);
}

/**
 * Get comments on the syntax element in the protobuf source.
 */
export function getSyntaxComments(desc: DescFile): DescComments {
  return findComments(desc.proto.sourceCodeInfo, [
    FileDescriptorProtoDesc.field.syntax.number,
  ]);
}

/**
 * Get comments on the element in the protobuf source.
 */
export function getComments(desc: Exclude<AnyDesc, DescFile>): DescComments {
  let path: number[] = [];
  let file: DescFile;
  switch (desc.kind) {
    case "enum":
      path = desc.parent
        ? [
            ...getComments(desc.parent).sourcePath,
            DescriptorProtoDesc.field.enumType.number,
            desc.parent.proto.enumType.indexOf(desc.proto),
          ]
        : [
            FileDescriptorProtoDesc.field.enumType.number,
            desc.file.proto.enumType.indexOf(desc.proto),
          ];
      file = desc.file;
      break;
    case "oneof":
      path = [
        ...getComments(desc.parent).sourcePath,
        DescriptorProtoDesc.field.oneofDecl.number,
        desc.parent.proto.oneofDecl.indexOf(desc.proto),
      ];
      file = desc.parent.file;
      break;
    case "message":
      path = desc.parent
        ? [
            ...getComments(desc.parent).sourcePath,
            DescriptorProtoDesc.field.nestedType.number,
            desc.parent.proto.nestedType.indexOf(desc.proto),
          ]
        : [
            FileDescriptorProtoDesc.field.messageType.number,
            desc.file.proto.messageType.indexOf(desc.proto),
          ];
      file = desc.file;
      break;
    case "enum_value":
      path = [
        ...getComments(desc.parent).sourcePath,
        EnumDescriptorProtoDesc.field.value.number,
        desc.parent.proto.value.indexOf(desc.proto),
      ];
      file = desc.parent.file;
      break;
    case "field":
      path = [
        ...getComments(desc.parent).sourcePath,
        DescriptorProtoDesc.field.field.number,
        desc.parent.proto.field.indexOf(desc.proto),
      ];
      file = desc.parent.file;
      break;
    case "extension":
      path = desc.parent
        ? [
            ...getComments(desc.parent).sourcePath,
            DescriptorProtoDesc.field.extension.number,
            desc.parent.proto.extension.indexOf(desc.proto),
          ]
        : [
            FileDescriptorProtoDesc.field.extension.number,
            desc.file.proto.extension.indexOf(desc.proto),
          ];
      file = desc.file;
      break;
    case "service":
      path = [
        FileDescriptorProtoDesc.field.service.number,
        desc.file.proto.service.indexOf(desc.proto),
      ];
      file = desc.file;
      break;
    case "rpc":
      path = [
        ...getComments(desc.parent).sourcePath,
        ServiceDescriptorProtoDesc.field.method.number,
        desc.parent.proto.method.indexOf(desc.proto),
      ];
      file = desc.parent.file;
      break;
  }
  return findComments(file.proto.sourceCodeInfo, path);
}

/**
 * Get feature options set on the element in the protobuf source. This returns
 * compact (e.g. fields) or regular options (e.g. files) as an array of strings.
 */
export function getFeatureOptionStrings(desc: AnyDesc): string[] {
  const strings: string[] = [];
  const features = desc.proto.options?.features;
  if (features !== undefined) {
    const r = reflect(FeatureSetDesc, features);
    for (const f of r.fields) {
      if (f.fieldKind != "enum" || !r.isSet(f)) {
        continue;
      }
      const val = r.get(f);
      const name = f.enum.values.find((v) => v.number == val)?.name;
      if (name !== undefined) {
        strings.push(`features.${f.name} = ${name}`);
      }
    }
  }
  return strings;
}

/**
 * Return a string that matches the definition of a field in the protobuf
 * source. Does not take custom options into account.
 */
export function getDeclarationString(
  desc: DescField | DescExtension | DescEnumValue,
): string {
  if (desc.kind === "enum_value") {
    let str = `${desc.name} = ${desc.number}`;
    if (desc.proto.options?.deprecated === true) {
      str += " [deprecated = true]";
    }
    return str;
  }
  const parts: string[] = [];
  function typeName(f: DescField | DescExtension) {
    if (f.message) {
      return f.message.typeName;
    }
    if (f.enum) {
      return f.enum.typeName;
    }
    return ScalarType[f.scalar].toLowerCase();
  }
  switch (desc.fieldKind) {
    case "scalar":
    case "enum":
    case "message":
      if (fieldHasRequiredKeyword(desc)) {
        parts.push("required");
      }
      if (fieldHasOptionalKeyword(desc)) {
        parts.push("optional");
      }
      parts.push(typeName(desc));
      break;
    case "list":
      parts.push("repeated", typeName(desc));
      break;
    case "map": {
      const k = ScalarType[desc.mapKey].toLowerCase();
      const v = typeName(desc);
      parts.push(`map<${k}, ${v}>`);
      break;
    }
  }
  parts.push(desc.name, "=", desc.number.toString());
  const options: string[] = [];
  const protoOptions = desc.proto.options;
  if (
    protoOptions !== undefined &&
    isFieldSet(protoOptions, FieldOptionsDesc.field.packed)
  ) {
    options.push(`packed = ${protoOptions.packed.toString()}`);
  }
  if (isFieldSet(desc.proto, FieldDescriptorProtoDesc.field.defaultValue)) {
    let defaultValue = desc.proto.defaultValue;
    if (
      desc.proto.type == FieldDescriptorProto_Type.BYTES ||
      desc.proto.type == FieldDescriptorProto_Type.STRING
    ) {
      defaultValue = '"' + defaultValue.replace('"', '\\"') + '"';
    }
    options.push(`default = ${defaultValue}`);
  }
  if (desc.kind == "field" && desc.jsonName !== protoCamelCase(desc.name)) {
    options.push(`json_name = "${desc.jsonName}"`);
  }
  if (
    protoOptions !== undefined &&
    isFieldSet(protoOptions, FieldOptionsDesc.field.jstype)
  ) {
    options.push(`jstype = ${FieldOptions_JSType[protoOptions.jstype]}`);
  }
  if (
    protoOptions !== undefined &&
    isFieldSet(protoOptions, FieldOptionsDesc.field.deprecated)
  ) {
    options.push(`deprecated = true`);
  }
  options.push(...getFeatureOptionStrings(desc));
  if (options.length > 0) {
    parts.push("[" + options.join(", ") + "]");
  }
  return parts.join(" ");
}

/**
 * Whether this field was declared with `required` in the protobuf source.
 */
function fieldHasRequiredKeyword(field: DescField | DescExtension): boolean {
  const edition = (field.kind == "extension" ? field.file : field.parent.file)
    .edition;
  return (
    edition == Edition.EDITION_PROTO2 &&
    field.proto.label == FieldDescriptorProto_Label.REQUIRED
  );
}

/**
 * Whether this field was declared with `optional` in the protobuf source.
 * Note that message fields are always optional. It is impossible to determine
 * whether the keyword was used.
 */
function fieldHasOptionalKeyword(field: DescField | DescExtension): boolean {
  const edition = (field.kind == "extension" ? field.file : field.parent.file)
    .edition;
  if (edition == Edition.EDITION_PROTO2) {
    return (
      !field.oneof && field.proto.label == FieldDescriptorProto_Label.OPTIONAL
    );
  }
  if (edition == Edition.EDITION_PROTO3) {
    return field.proto.proto3Optional;
  }
  return false;
}

/**
 * Find comments.
 */
function findComments(
  sourceCodeInfo: SourceCodeInfo | undefined,
  sourcePath: number[],
): DescComments {
  if (!sourceCodeInfo) {
    return {
      leadingDetached: [],
      sourcePath,
    };
  }
  for (const location of sourceCodeInfo.location) {
    if (location.path.length !== sourcePath.length) {
      continue;
    }
    if (location.path.some((value, index) => sourcePath[index] !== value)) {
      continue;
    }
    return {
      leadingDetached: location.leadingDetachedComments,
      leading: isFieldSet(
        location,
        SourceCodeInfo_Location_Desc.field.leadingComments,
      )
        ? location.leadingComments
        : undefined,
      trailing: isFieldSet(
        location,
        SourceCodeInfo_Location_Desc.field.trailingComments,
      )
        ? location.trailingComments
        : undefined,
      sourcePath,
    };
  }
  return {
    leadingDetached: [],
    sourcePath,
  };
}
