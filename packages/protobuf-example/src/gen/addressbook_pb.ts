// Copyright 2021-2023 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v1.4.2 with parameter "target=ts"
// @generated from file addressbook.proto (package example, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message example.Person
 */
export class Person extends Message<Person> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * Unique ID number for this person.
   *
   * @generated from field: int32 id = 2;
   */
  id = 0;

  /**
   * @generated from field: string email = 3;
   */
  email = "";

  /**
   * @generated from field: repeated example.Person.PhoneNumber phones = 4;
   */
  phones: Person_PhoneNumber[] = [];

  /**
   * @generated from field: google.protobuf.Timestamp last_updated = 5;
   */
  lastUpdated?: Timestamp;

  constructor(data?: PartialMessage<Person>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "example.Person";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "email", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "phones", kind: "message", T: Person_PhoneNumber, repeated: true },
    { no: 5, name: "last_updated", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Person {
    return new Person().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Person {
    return new Person().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Person {
    return new Person().fromJsonString(jsonString, options);
  }

  static equals(a: Person | PlainMessage<Person> | undefined, b: Person | PlainMessage<Person> | undefined): boolean {
    return proto3.util.equals(Person, a, b);
  }
}

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
// Retrieve enum metadata with: proto3.getEnumType(Person_PhoneType)
proto3.util.setEnumType(Person_PhoneType, "example.Person.PhoneType", [
  { no: 0, name: "MOBILE" },
  { no: 1, name: "HOME" },
  { no: 2, name: "WORK" },
]);

/**
 * @generated from message example.Person.PhoneNumber
 */
export class Person_PhoneNumber extends Message<Person_PhoneNumber> {
  /**
   * @generated from field: string number = 1;
   */
  number = "";

  /**
   * @generated from field: example.Person.PhoneType type = 2;
   */
  type = Person_PhoneType.MOBILE;

  constructor(data?: PartialMessage<Person_PhoneNumber>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "example.Person.PhoneNumber";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "number", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "type", kind: "enum", T: proto3.getEnumType(Person_PhoneType) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Person_PhoneNumber {
    return new Person_PhoneNumber().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Person_PhoneNumber {
    return new Person_PhoneNumber().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Person_PhoneNumber {
    return new Person_PhoneNumber().fromJsonString(jsonString, options);
  }

  static equals(a: Person_PhoneNumber | PlainMessage<Person_PhoneNumber> | undefined, b: Person_PhoneNumber | PlainMessage<Person_PhoneNumber> | undefined): boolean {
    return proto3.util.equals(Person_PhoneNumber, a, b);
  }
}

/**
 * Our address book file is just one of these.
 *
 * @generated from message example.AddressBook
 */
export class AddressBook extends Message<AddressBook> {
  /**
   * @generated from field: repeated example.Person people = 1;
   */
  people: Person[] = [];

  constructor(data?: PartialMessage<AddressBook>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "example.AddressBook";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "people", kind: "message", T: Person, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddressBook {
    return new AddressBook().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddressBook {
    return new AddressBook().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddressBook {
    return new AddressBook().fromJsonString(jsonString, options);
  }

  static equals(a: AddressBook | PlainMessage<AddressBook> | undefined, b: AddressBook | PlainMessage<AddressBook> | undefined): boolean {
    return proto3.util.equals(AddressBook, a, b);
  }
}

