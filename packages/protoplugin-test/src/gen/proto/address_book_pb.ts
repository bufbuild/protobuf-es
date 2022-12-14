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

// @generated by protoc-gen-es v0.5.0 with parameter "target=ts"
// @generated from file proto/address_book.proto (package example, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { Person } from "./person_pb.js";

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

  static readonly runtime = proto3;
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

