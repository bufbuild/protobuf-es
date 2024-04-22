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

// @generated by protoc-gen-es v1.9.0 with parameter "target=ts"
// @generated from file customoptions/default_host.proto (package customoptions, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3, ServiceOptions } from "@bufbuild/protobuf";

/**
 * An example for a custom option. Custom options are extensions to one of
 * the options messages defined in descriptor.proto.
 *
 * We extend the ServiceOptions message, so that other proto files can import
 * this file, and set the option on a service declaration.
 *
 * @generated from extension: optional string default_host = 1001;
 */
export const default_host = proto3.makeExtension<ServiceOptions, string>(
  "customoptions.default_host", 
  ServiceOptions, 
  { no: 1001, kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
);

