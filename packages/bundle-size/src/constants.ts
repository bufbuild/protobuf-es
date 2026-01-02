// Copyright 2021-2026 Buf Technologies, Inc.
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

/**
 * Number of Protobuf files used per entrypoint.
 */
export const sizes = [1, 4, 8, 16, 32];

/**
 * Protobuf files, and messages to import.
 */
export const files = [
  {
    name: "google/type/timeofday.proto",
    messages: ["TimeOfDay"],
  },
  {
    name: "google/type/quaternion.proto",
    messages: ["Quaternion"],
  },
  {
    name: "google/type/postal_address.proto",
    messages: ["PostalAddress"],
  },
  {
    name: "google/type/phone_number.proto",
    messages: ["PhoneNumber"],
  },
  {
    name: "google/type/money.proto",
    messages: ["Money"],
  },
  {
    name: "google/type/localized_text.proto",
    messages: ["LocalizedText"],
  },
  {
    name: "google/type/interval.proto",
    messages: ["Interval"],
  },
  {
    name: "google/type/fraction.proto",
    messages: ["Fraction"],
  },
  {
    name: "google/type/expr.proto",
    messages: ["Expr"],
  },
  {
    name: "google/type/decimal.proto",
    messages: ["Decimal"],
  },
  {
    name: "google/type/datetime.proto",
    messages: ["DateTime", "TimeZone"],
  },
  {
    name: "google/type/date.proto",
    messages: ["Date"],
  },
  {
    name: "google/type/color.proto",
    messages: ["Color"],
  },
  {
    name: "google/rpc/context/attribute_context.proto",
    messages: ["AttributeContext"],
  },
  {
    name: "google/geo/type/viewport.proto",
    messages: ["Viewport"],
  },
  {
    name: "google/type/latlng.proto",
    messages: ["LatLng"],
  },
  {
    name: "google/api/visibility.proto",
    messages: ["Visibility", "VisibilityRule"],
  },
  {
    name: "google/api/resource.proto",
    messages: ["ResourceDescriptor", "ResourceReference"],
  },
  {
    name: "google/api/httpbody.proto",
    messages: ["HttpBody"],
  },
  {
    name: "google/api/field_info.proto",
    messages: ["FieldInfo"],
  },
  {
    name: "google/api/expr/v1beta1/eval.proto",
    messages: ["EvalState", "ExprValue"],
  },
  {
    name: "google/api/expr/v1beta1/value.proto",
    messages: ["Value", "EnumValue"],
  },
  {
    name: "google/api/expr/v1beta1/decl.proto",
    messages: ["Decl", "DeclType"],
  },
  {
    name: "google/api/expr/v1beta1/expr.proto",
    messages: ["ParsedExpr", "Expr"],
  },
  {
    name: "google/api/expr/v1beta1/source.proto",
    messages: ["SourceInfo", "SourcePosition"],
  },
  {
    name: "google/api/expr/v1alpha1/explain.proto",
    messages: ["Explain"],
  },
  {
    name: "google/api/expr/v1alpha1/eval.proto",
    messages: ["EvalState", "ExprValue"],
  },
  {
    name: "google/rpc/status.proto",
    messages: ["Status"],
  },
  {
    name: "google/api/expr/v1alpha1/value.proto",
    messages: ["Value", "EnumValue"],
  },
  {
    name: "google/api/expr/v1alpha1/checked.proto",
    messages: ["CheckedExpr", "Type"],
  },
  {
    name: "google/api/expr/v1alpha1/syntax.proto",
    messages: ["ParsedExpr", "Expr"],
  },
  {
    name: "google/api/http.proto",
    messages: ["Http", "HttpRule"],
  },
];
