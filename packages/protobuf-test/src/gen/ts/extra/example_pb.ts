// Copyright 2021-2025 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v2.2.5 with parameter "target=ts,import_extension=js"
// @generated from file extra/example.proto (package example, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/example.proto.
 */
export const file_extra_example: GenFile = /*@__PURE__*/
  fileDesc("ChNleHRyYS9leGFtcGxlLnByb3RvEgdleGFtcGxlItABCgRVc2VyEhIKCmZpcnN0X25hbWUYASABKAkSEQoJbGFzdF9uYW1lGAIgASgJEg4KBmFjdGl2ZRgDIAEoCBIeCgdtYW5hZ2VyGAQgASgLMg0uZXhhbXBsZS5Vc2VyEhEKCWxvY2F0aW9ucxgFIAMoCRItCghwcm9qZWN0cxgGIAMoCzIbLmV4YW1wbGUuVXNlci5Qcm9qZWN0c0VudHJ5Gi8KDVByb2plY3RzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4AWIGcHJvdG8z");

/**
 * @generated from message example.User
 */
export type User = Message<"example.User"> & {
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
   * @generated from field: example.User manager = 4;
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
 * Describes the message example.User.
 * Use `create(UserSchema)` to create a new message.
 */
export const UserSchema: GenMessage<User> = /*@__PURE__*/
  messageDesc(file_extra_example, 0);

