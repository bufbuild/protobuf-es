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

import type { DescField, DescMessage, DescOneof } from "@bufbuild/protobuf";
import { ScalarType } from "@bufbuild/protobuf";

type DescWkt =
  | {
      typeName: "google.protobuf.Any";
      typeUrl: DescField;
      value: DescField;
    }
  | {
      typeName: "google.protobuf.Timestamp";
      seconds: DescField & { fieldKind: "scalar" };
      nanos: DescField & { fieldKind: "scalar" };
    }
  | {
      typeName: "google.protobuf.Duration";
      seconds: DescField & { fieldKind: "scalar" };
      nanos: DescField & { fieldKind: "scalar" };
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
      values: DescField & { fieldKind: "list"; listKind: "message" };
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

/**
 * Reifies a given DescMessage into a more concrete object representing its
 * respective well-known type.  The returned object will contain properties
 * representing the WKT's defined fields.
 *
 * Useful during code generation when immediate access to a particular field
 * is needed without having to search the object's typename and DescField list.
 *
 * Returns undefined if the WKT cannot be completely constructed via the
 * DescMessage.
 */
export function reifyWkt(message: DescMessage): DescWkt | undefined {
  switch (message.typeName) {
    case "google.protobuf.Any": {
      const typeUrl = message.fields.find(
        (f) =>
          f.number == 1 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.STRING,
      );
      const value = message.fields.find(
        (f) =>
          f.number == 2 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.BYTES,
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
      const seconds = message.fields.find((f) => f.number == 1);
      if (seconds?.fieldKind !== "scalar") {
        break;
      }
      const nanos = message.fields.find((f) => f.number == 2);
      if (nanos?.fieldKind !== "scalar") {
        break;
      }
      return {
        typeName: message.typeName,
        seconds,
        nanos,
      };
    }
    case "google.protobuf.Duration": {
      const seconds = message.fields.find((f) => f.number == 1);
      if (seconds?.fieldKind !== "scalar") {
        break;
      }
      const nanos = message.fields.find((f) => f.number == 2);
      if (nanos?.fieldKind !== "scalar") {
        break;
      }
      return {
        typeName: message.typeName,
        seconds,
        nanos,
      };
    }
    case "google.protobuf.Struct": {
      const fields = message.fields.find((f) => f.number == 1);
      if (
        fields?.fieldKind !== "map" ||
        fields.mapKind !== "message" ||
        fields.message.typeName !== "google.protobuf.Value"
      ) {
        break;
      }
      return { typeName: message.typeName, fields };
    }
    case "google.protobuf.Value": {
      const kind = message.oneofs.find((o) => o.name === "kind");
      const nullValue = message.fields.find(
        (f) => f.number == 1 && f.oneof === kind,
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
          f.oneof === kind,
      );
      const stringValue = message.fields.find(
        (f) =>
          f.number == 3 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.STRING &&
          f.oneof === kind,
      );
      const boolValue = message.fields.find(
        (f) =>
          f.number == 4 &&
          f.fieldKind == "scalar" &&
          f.scalar === ScalarType.BOOL &&
          f.oneof === kind,
      );
      const structValue = message.fields.find(
        (f) => f.number == 5 && f.oneof === kind,
      );
      if (
        structValue?.fieldKind !== "message" ||
        structValue.message.typeName !== "google.protobuf.Struct"
      ) {
        return undefined;
      }
      const listValue = message.fields.find(
        (f) => f.number == 6 && f.oneof === kind,
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
      const values = message.fields.find((f) => f.number == 1);
      if (
        values?.fieldKind != "list" ||
        values.listKind != "message" ||
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
          f.fieldKind == "list" &&
          f.listKind == "scalar" &&
          f.scalar === ScalarType.STRING,
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
        (f) => f.number == 1 && f.name == "value",
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
