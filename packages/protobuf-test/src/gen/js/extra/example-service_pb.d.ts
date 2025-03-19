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

// @generated by protoc-gen-es v2.2.5 with parameter "target=js+dts,import_extension=js"
// @generated from file extra/example-service.proto (package example, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { User } from "./example_pb.js";

/**
 * Describes the file extra/example-service.proto.
 */
export declare const file_extra_example_service: GenFile;

/**
 * @generated from message example.CreateUserRequest
 */
export declare type CreateUserRequest = Message<"example.CreateUserRequest"> & {
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
export declare const CreateUserRequestSchema: GenMessage<CreateUserRequest>;

/**
 * @generated from message example.CreateUserResponse
 */
export declare type CreateUserResponse = Message<"example.CreateUserResponse"> & {
  /**
   * @generated from field: example.User user = 1;
   */
  user?: User;
};

/**
 * Describes the message example.CreateUserResponse.
 * Use `create(CreateUserResponseSchema)` to create a new message.
 */
export declare const CreateUserResponseSchema: GenMessage<CreateUserResponse>;

/**
 * @generated from service example.UserService
 */
export declare const UserService: GenService<{
  /**
   * @generated from rpc example.UserService.CreateUser
   */
  createUser: {
    methodKind: "unary";
    input: typeof CreateUserRequestSchema;
    output: typeof CreateUserResponseSchema;
  },
}>;

