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

// @generated by protoc-gen-es v0.1.1 with parameter "target=js+dts"
// @generated from file addressbook.proto (package example, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage, Timestamp} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message example.Person
 */
export declare class Person extends Message<Person> {
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

  constructor(data?: PartialMessage<Person>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "example.Person";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Person;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Person;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Person;

  static equals(a: Person | PlainMessage<Person> | undefined, b: Person | PlainMessage<Person> | undefined): boolean;
}

/**
 * @generated from enum example.Person.PhoneType
 */
export declare enum Person_PhoneType {
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

/**
 * @generated from message example.Person.PhoneNumber
 */
export declare class Person_PhoneNumber extends Message<Person_PhoneNumber> {
  /**
   * @generated from field: string number = 1;
   */
  number: string;

  /**
   * @generated from field: example.Person.PhoneType type = 2;
   */
  type: Person_PhoneType;

  constructor(data?: PartialMessage<Person_PhoneNumber>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "example.Person.PhoneNumber";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Person_PhoneNumber;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Person_PhoneNumber;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Person_PhoneNumber;

  static equals(a: Person_PhoneNumber | PlainMessage<Person_PhoneNumber> | undefined, b: Person_PhoneNumber | PlainMessage<Person_PhoneNumber> | undefined): boolean;
}

/**
 * Our address book file is just one of these.
 *
 * @generated from message example.AddressBook
 */
export declare class AddressBook extends Message<AddressBook> {
  /**
   * @generated from field: repeated example.Person people = 1;
   */
  people: Person[];

  constructor(data?: PartialMessage<AddressBook>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "example.AddressBook";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddressBook;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddressBook;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddressBook;

  static equals(a: AddressBook | PlainMessage<AddressBook> | undefined, b: AddressBook | PlainMessage<AddressBook> | undefined): boolean;
}

