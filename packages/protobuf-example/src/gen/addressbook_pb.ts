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

// @generated by protoc-gen-es v2.0.0-alpha.1 with parameter "target=ts"
// @generated from file addressbook.proto (package example, syntax proto3)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { fileDesc_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

export const fileDesc_addressbook: GenDescFile = /*@__PURE__*/
  fileDesc("ChFhZGRyZXNzYm9vay5wcm90bxIHZXhhbXBsZSKFAgoGUGVyc29uEgwKBG5hbWUYASABKAkSCgoCaWQYAiABKAUSDQoFZW1haWwYAyABKAkSKwoGcGhvbmVzGAQgAygLMhsuZXhhbXBsZS5QZXJzb24uUGhvbmVOdW1iZXISMAoMbGFzdF91cGRhdGVkGAUgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBpGCgtQaG9uZU51bWJlchIOCgZudW1iZXIYASABKAkSJwoEdHlwZRgCIAEoDjIZLmV4YW1wbGUuUGVyc29uLlBob25lVHlwZSIrCglQaG9uZVR5cGUSCgoGTU9CSUxFEAASCAoESE9NRRABEggKBFdPUksQAiIuCgtBZGRyZXNzQm9vaxIfCgZwZW9wbGUYASADKAsyDy5leGFtcGxlLlBlcnNvbmIGcHJvdG8z", [fileDesc_google_protobuf_timestamp]);

/**
 * @generated from message example.Person
 */
export type Person = Message<"example.Person"> & {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * Unique ID number for this person.
   *
   * @generated from field: int32 id = 2;
   */
  id: number;

  /**
   * @generated from field: string email = 3;
   */
  email: string;

  /**
   * @generated from field: repeated example.Person.PhoneNumber phones = 4;
   */
  phones: Person_PhoneNumber[];

  /**
   * @generated from field: google.protobuf.Timestamp last_updated = 5;
   */
  lastUpdated?: Timestamp;
};

// Describes the message example.Person.
// Use `create(PersonDesc)` to create a new Person.
export const PersonDesc: GenDescMessage<Person> = /*@__PURE__*/
  messageDesc(fileDesc_addressbook, 0);

/**
 * @generated from message example.Person.PhoneNumber
 */
export type Person_PhoneNumber = Message<"example.Person.PhoneNumber"> & {
  /**
   * @generated from field: string number = 1;
   */
  number: string;

  /**
   * @generated from field: example.Person.PhoneType type = 2;
   */
  type: Person_PhoneType;
};

// Describes the message example.Person.PhoneNumber.
// Use `create(Person_PhoneNumberDesc)` to create a new Person_PhoneNumber.
export const Person_PhoneNumberDesc: GenDescMessage<Person_PhoneNumber> = /*@__PURE__*/
  messageDesc(fileDesc_addressbook, 0, 0);

/**
 * @generated from enum example.Person.PhoneType
 */
export enum Person_PhoneType {
  /**
   * @generated from enum value: MOBILE = 0;
   */
  MOBILE = 0,

  /**
   * @generated from enum value: HOME = 1;
   */
  HOME = 1,

  /**
   * @generated from enum value: WORK = 2;
   */
  WORK = 2,
}

// Describes the enum example.Person.PhoneType.
export const Person_PhoneTypeDesc: GenDescEnum<Person_PhoneType> = /*@__PURE__*/
  enumDesc(fileDesc_addressbook, 0, 0);

/**
 * Our address book file is just one of these.
 *
 * @generated from message example.AddressBook
 */
export type AddressBook = Message<"example.AddressBook"> & {
  /**
   * @generated from field: repeated example.Person people = 1;
   */
  people: Person[];
};

// Describes the message example.AddressBook.
// Use `create(AddressBookDesc)` to create a new AddressBook.
export const AddressBookDesc: GenDescMessage<AddressBook> = /*@__PURE__*/
  messageDesc(fileDesc_addressbook, 1);

