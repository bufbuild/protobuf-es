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

// @generated by protoc-gen-es v2.0.0-beta.1 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file extra/example.proto (package docs, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/example.proto.
 */
export declare const file_extra_example: GenDescFile;

/**
 * @generated from message docs.User
 */
export declare type User = Message<"docs.User"> & {
  /**
   * @generated from field: string first_name = 1;
   */
  firstName: string;

  /**
   * @generated from field: string last_name = 2;
   */
  lastName: string;

  /**
   * @generated from field: bool active = 3;
   */
  active: boolean;

  /**
   * @generated from field: docs.User manager = 4;
   */
  manager?: User;

  /**
   * @generated from field: repeated string locations = 5;
   */
  locations: string[];

  /**
   * @generated from field: map<string, string> projects = 6;
   */
  projects: { [key: string]: string };
};

/**
 * Describes the message docs.User.
 * Use `create(UserSchema)` to create a new message.
 */
export declare const UserSchema: GenDescMessage<User>;

