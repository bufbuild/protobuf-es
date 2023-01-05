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

import { AddressBook, Person_PhoneType } from "./gen/addressbook_pb.js";
import { readFileSync } from "fs";

if (process.argv.length !== 3) {
  process.stderr.write("Usage: list-people ADDRESS_BOOK_FILE\n");
  process.exit(1);
}
const addressBookFile = process.argv[2];
const bytes = readFileSync(addressBookFile);
const addressBook = AddressBook.fromBinary(bytes);
printAddressBook(addressBook);

function printAddressBook(addressBook: AddressBook): void {
  for (const person of addressBook.people) {
    print(`Person ID: ${person.id}`);

    print(`  Name: ${person.name}`);
    if (person.email !== "") {
      print(`  E-mail address: ${person.email}`);
    }

    for (const phoneNumber of person.phones) {
      switch (phoneNumber.type) {
        case Person_PhoneType.MOBILE:
          print(`  Mobile phone #: ${phoneNumber.number}`);
          break;
        case Person_PhoneType.HOME:
          print(`  Home phone #: ${phoneNumber.number}`);
          break;
        case Person_PhoneType.WORK:
          print(`  Work phone #: ${phoneNumber.number}`);
          break;
        default:
          print(`  Unknown phone #: ${phoneNumber.number}`);
          break;
      }
    }
  }
}

function print(line: string): void {
  process.stdout.write(line);
  process.stdout.write("\n");
  process.exit(1);
}
