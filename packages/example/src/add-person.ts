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

import {
  AddressBook,
  Person,
  Person_PhoneNumber,
  Person_PhoneType,
} from "./gen/addressbook_pb.js";
import { createInterface } from "readline";
import { readFileSync, existsSync, writeFileSync } from "fs";

async function main() {
  if (process.argv.length !== 3) {
    throw new Error("Usage: add-person ADDRESS_BOOK_FILE");
  }
  const addressBookFile = process.argv[2];

  const person = new Person({
    id: parseInt(await prompt("Enter person ID number: ")),
    name: await prompt("Enter name: "),
    email: await prompt("Enter email address (blank for none): "),
  });

  for (;;) {
    const phoneNumber = new Person_PhoneNumber({
      number: await prompt("Enter a phone number (or leave blank to finish): "),
    });
    if (phoneNumber.number === "") {
      break;
    }
    person.phones.push(phoneNumber);
    const type = await prompt("Is this a mobile, home, or work phone? ");
    switch (type) {
      case "mobile":
        phoneNumber.type = Person_PhoneType.MOBILE;
        break;
      case "home":
        phoneNumber.type = Person_PhoneType.HOME;
        break;
      case "work":
        phoneNumber.type = Person_PhoneType.WORK;
        break;
      default:
        print("Unknown phone type; leaving as default value.");
    }
  }

  const addressBook = new AddressBook();
  if (existsSync(addressBookFile)) {
    const bytes = readFileSync(addressBookFile);
    addressBook.fromBinary(bytes);
  } else {
    print("File not found. Creating new file.");
  }

  addressBook.people.push(person);
  writeFileSync(addressBookFile, addressBook.toBinary());
}

main().catch((e) => {
  process.stderr.write(`${e instanceof Error ? e.message : String(e)}\n`);
  process.exit(1);
});

function print(line: string): void {
  process.stdout.write(line);
  process.stdout.write("\n");
}

function prompt(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise<string>((resolve) => {
    rl.question(question, (value) => {
      resolve(value);
      rl.close();
    });
  });
}
