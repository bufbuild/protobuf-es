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

import { create, toBinary } from "@bufbuild/protobuf";
import { TimeOfDayDesc } from "./google/type/timeofday_pb";
import { QuaternionDesc } from "./google/type/quaternion_pb";
import { PostalAddressDesc } from "./google/type/postal_address_pb";
import { PhoneNumberDesc } from "./google/type/phone_number_pb";
import { MoneyDesc } from "./google/type/money_pb";
import { LocalizedTextDesc } from "./google/type/localized_text_pb";
import { IntervalDesc } from "./google/type/interval_pb";
import { FractionDesc } from "./google/type/fraction_pb";

/* eslint-disable no-console */

// google/type/timeofday.proto
console.log(toBinary(TimeOfDayDesc, create(TimeOfDayDesc)).length);
// google/type/quaternion.proto
console.log(toBinary(QuaternionDesc, create(QuaternionDesc)).length);
// google/type/postal_address.proto
console.log(toBinary(PostalAddressDesc, create(PostalAddressDesc)).length);
// google/type/phone_number.proto
console.log(toBinary(PhoneNumberDesc, create(PhoneNumberDesc)).length);
// google/type/money.proto
console.log(toBinary(MoneyDesc, create(MoneyDesc)).length);
// google/type/localized_text.proto
console.log(toBinary(LocalizedTextDesc, create(LocalizedTextDesc)).length);
// google/type/interval.proto
console.log(toBinary(IntervalDesc, create(IntervalDesc)).length);
// google/type/fraction.proto
console.log(toBinary(FractionDesc, create(FractionDesc)).length);
