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

import {
  DescField,
  DescMessage,
  DescOneof,
  ScalarType,
} from "@bufbuild/protobuf";

type DescWkt =
  | {
      typeName: "google.protobuf.Any";
      typeUrl: DescField;
      value: DescField;
    }
  | {
      typeName: "google.protobuf.Timestamp";
      seconds: DescField;
      nanos: DescField;
    }
  | {
      typeName: "google.protobuf.Duration";
      seconds: DescField;
      nanos: DescField;
    }
  | {
      typeName: "google.protobuf.Struct";
      fields: DescField & { fieldKind: "map" };
    }
  | {
      typeName: "google.protobuf.Value";
      kind: DescOneof;
      nullValue: DescField & { fieldKind: "enum" };
      numberValue: DescField;
      stringValue: DescField;
      boolValue: DescField;
      structValue: DescField & { fieldKind: "message" };
      listValue: DescField & { fieldKind: "message" };
    }
  | {
      typeName: "google.protobuf.ListValue";
      values: DescField & { fieldKind: "message" };
    }
  | {
      typeName: "google.protobuf.FieldMask";
      paths: DescField;
    }
  | {
      typeName: "google.protobuf.DoubleValue";
      value: DescField & { fieldKind: "scalar" };
    }
  | {
      typeName: "google.protobuf.FloatValue";
      value: DescField & { fieldKind: "scalar" };
    }
  | {
      typeName: "google.protobuf.Int64Value";
      value: DescField & { fieldKind: "scalar" };
    }
  | {
      typeName: "google.protobuf.UInt64Value";
      value: DescField & { fieldKind: "scalar" };
    }
  | {
      typeName: "google.protobuf.Int32Value";
      value: DescField & { fieldKind: "scalar" };
    }
  | {
      typeName: "google.protobuf.UInt32Value";
      value: DescField & { fieldKind: "scalar" };
    }
  | {
      typeName: "google.protobuf.BoolValue";
      value: DescField & { fieldKind: "scalar" };
    }
  | {
      typeName: "google.protobuf.StringValue";
      value: DescField & { fieldKind: "scalar" };
    }
  | {
      typeName: "google.protobuf.BytesValue";
      value: DescField & { fieldKind: "scalar" };
    };

export function matchWkt(message: DescMessage): DescWkt | undefined {
  switch (message.typeName) {
    case "google.protobuf.Any": {
      const typeUrl = message.fields.find(
        (f) =>
          f.number == 1 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.STRING
      );
      const value = message.fields.find(
        (f) =>
          f.number == 2 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.BYTES
      );
      if (typeUrl && value) {
        return {
          typeName: message.typeName,
          typeUrl,
          value,
        };
      }
      break;
    }
    case "google.protobuf.Timestamp": {
      const seconds = message.fields.find(
        (f) =>
          f.number == 1 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.INT64
      );
      const nanos = message.fields.find(
        (f) =>
          f.number == 2 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.INT32
      );
      if (seconds && nanos) {
        return {
          typeName: message.typeName,
          seconds,
          nanos,
        };
      }
      break;
    }
    case "google.protobuf.Duration": {
      const seconds = message.fields.find(
        (f) =>
          f.number == 1 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.INT64
      );
      const nanos = message.fields.find(
        (f) =>
          f.number == 2 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.INT32
      );
      if (seconds && nanos) {
        return {
          typeName: message.typeName,
          seconds,
          nanos,
        };
      }
      break;
    }
    case "google.protobuf.Struct": {
      const fields = message.fields.find((f) => f.number == 1 && !f.repeated);
      if (
        fields?.fieldKind !== "map" ||
        fields.mapValue.kind !== "message" ||
        fields.mapValue.message.typeName !== "google.protobuf.Value"
      ) {
        break;
      }
      return { typeName: message.typeName, fields };
    }
    case "google.protobuf.Value": {
      const kind = message.oneofs.find((o) => o.name === "kind");
      const nullValue = message.fields.find(
        (f) => f.number == 1 && f.oneof === kind
      );
      if (
        nullValue?.fieldKind !== "enum" ||
        nullValue.enum.typeName !== "google.protobuf.NullValue"
      ) {
        return undefined;
      }
      const numberValue = message.fields.find(
        (f) =>
          f.number == 2 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.DOUBLE &&
          f.oneof === kind
      );
      const stringValue = message.fields.find(
        (f) =>
          f.number == 3 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.STRING &&
          f.oneof === kind
      );
      const boolValue = message.fields.find(
        (f) =>
          f.number == 4 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.BOOL &&
          f.oneof === kind
      );
      const structValue = message.fields.find(
        (f) => f.number == 5 && f.oneof === kind
      );
      if (
        structValue?.fieldKind !== "message" ||
        structValue.message.typeName !== "google.protobuf.Struct"
      ) {
        return undefined;
      }
      const listValue = message.fields.find(
        (f) => f.number == 6 && f.oneof === kind
      );
      if (
        listValue?.fieldKind !== "message" ||
        listValue.message.typeName !== "google.protobuf.ListValue"
      ) {
        return undefined;
      }
      if (kind && numberValue && stringValue && boolValue) {
        return {
          typeName: message.typeName,
          kind,
          nullValue,
          numberValue,
          stringValue,
          boolValue,
          structValue,
          listValue,
        };
      }
      break;
    }
    case "google.protobuf.ListValue": {
      const values = message.fields.find((f) => f.number == 1 && f.repeated);
      if (
        values?.fieldKind != "message" ||
        values.message.typeName !== "google.protobuf.Value"
      ) {
        break;
      }
      return { typeName: message.typeName, values };
    }
    case "google.protobuf.FieldMask": {
      const paths = message.fields.find(
        (f) =>
          f.number == 1 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.STRING &&
          f.repeated
      );
      if (paths) {
        return { typeName: message.typeName, paths };
      }
      break;
    }
    case "google.protobuf.DoubleValue":
    case "google.protobuf.FloatValue":
    case "google.protobuf.Int64Value":
    case "google.protobuf.UInt64Value":
    case "google.protobuf.Int32Value":
    case "google.protobuf.UInt32Value":
    case "google.protobuf.BoolValue":
    case "google.protobuf.StringValue":
    case "google.protobuf.BytesValue": {
      const value = message.fields.find(
        (f) => f.number == 1 && f.name == "value"
      );
      if (!value) {
        break;
      }
      if (value.fieldKind !== "scalar") {
        break;
      }
      return { typeName: message.typeName, value };
    }
  }
  return undefined;
}
