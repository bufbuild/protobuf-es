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

// @generated by protoc-gen-es v1.10.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/deprecation-implicit.proto (package spec, syntax proto3)
/* eslint-disable */

import { FieldOptions, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum spec.ImplicitlyDeprecatedEnum
 * @deprecated
 */
export const ImplicitlyDeprecatedEnum = /*@__PURE__*/ proto3.makeEnum(
  "spec.ImplicitlyDeprecatedEnum",
  [
    {no: 0, name: "IMPLICITLY_DEPRECATED_ENUM_UNSPECIFIED", localName: "UNSPECIFIED"},
  ],
);

/**
 * @generated from message spec.ImplicitlyDeprecatedMessage
 * @deprecated
 */
export const ImplicitlyDeprecatedMessage = /*@__PURE__*/ proto3.makeMessageType(
  "spec.ImplicitlyDeprecatedMessage",
  () => [
    { no: 1, name: "implicitly_deprecated_field", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from extension: int32 implicitly_deprecated_option = 2002;
 */
export const implicitly_deprecated_option = proto3.makeExtension(
  "spec.implicitly_deprecated_option", 
  FieldOptions, 
  { no: 2002, kind: "scalar", T: 5 /* ScalarType.INT32 */ },
);

