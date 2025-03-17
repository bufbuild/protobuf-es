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

// @generated by protoc-gen-es v2.2.4 with parameter "target=ts,import_extension=js"
// @generated from file extra/example-service.proto (package example, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { User } from "./example_pb.js";
import { file_extra_example } from "./example_pb.js";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/example-service.proto.
 */
export const file_extra_example_service: GenFile = /*@__PURE__*/
  fileDesc("ChtleHRyYS9leGFtcGxlLXNlcnZpY2UucHJvdG8SB2V4YW1wbGUiOgoRQ3JlYXRlVXNlclJlcXVlc3QSEgoKZmlyc3RfbmFtZRgBIAEoCRIRCglsYXN0X25hbWUYAiABKAkiMQoSQ3JlYXRlVXNlclJlc3BvbnNlEhsKBHVzZXIYASABKAsyDS5leGFtcGxlLlVzZXIyVAoLVXNlclNlcnZpY2USRQoKQ3JlYXRlVXNlchIaLmV4YW1wbGUuQ3JlYXRlVXNlclJlcXVlc3QaGy5leGFtcGxlLkNyZWF0ZVVzZXJSZXNwb25zZWIGcHJvdG8z", [file_extra_example]);

/**
 * @generated from message example.CreateUserRequest
 */
export type CreateUserRequest = Message<"example.CreateUserRequest"> & {
  /**
   * @generated from field: string first_name = 1;
   */
  firstName: string;

  /**
   * @generated from field: string last_name = 2;
   */
  lastName: string;
};

/**
 * Describes the message example.CreateUserRequest.
 * Use `create(CreateUserRequestSchema)` to create a new message.
 */
export const CreateUserRequestSchema: GenMessage<CreateUserRequest> = /*@__PURE__*/
  messageDesc(file_extra_example_service, 0);

/**
 * @generated from message example.CreateUserResponse
 */
export type CreateUserResponse = Message<"example.CreateUserResponse"> & {
  /**
   * @generated from field: example.User user = 1;
   */
  user?: User;
};

/**
 * Describes the message example.CreateUserResponse.
 * Use `create(CreateUserResponseSchema)` to create a new message.
 */
export const CreateUserResponseSchema: GenMessage<CreateUserResponse> = /*@__PURE__*/
  messageDesc(file_extra_example_service, 1);

/**
 * @generated from service example.UserService
 */
export const UserService: GenService<{
  /**
   * @generated from rpc example.UserService.CreateUser
   */
  createUser: {
    methodKind: "unary";
    input: typeof CreateUserRequestSchema;
    output: typeof CreateUserResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_extra_example_service, 0);

