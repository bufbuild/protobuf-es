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

import { create, toBinary } from "@bufbuild/protobuf";
import { TimeOfDaySchema } from "./google/type/timeofday_pb";
import { QuaternionSchema } from "./google/type/quaternion_pb";
import { PostalAddressSchema } from "./google/type/postal_address_pb";
import { PhoneNumberSchema } from "./google/type/phone_number_pb";
import { MoneySchema } from "./google/type/money_pb";
import { LocalizedTextSchema } from "./google/type/localized_text_pb";
import { IntervalSchema } from "./google/type/interval_pb";
import { FractionSchema } from "./google/type/fraction_pb";


// google/type/timeofday.proto
console.log(toBinary(TimeOfDaySchema, create(TimeOfDaySchema)).length);
// google/type/quaternion.proto
console.log(toBinary(QuaternionSchema, create(QuaternionSchema)).length);
// google/type/postal_address.proto
console.log(toBinary(PostalAddressSchema, create(PostalAddressSchema)).length);
// google/type/phone_number.proto
console.log(toBinary(PhoneNumberSchema, create(PhoneNumberSchema)).length);
// google/type/money.proto
console.log(toBinary(MoneySchema, create(MoneySchema)).length);
// google/type/localized_text.proto
console.log(toBinary(LocalizedTextSchema, create(LocalizedTextSchema)).length);
// google/type/interval.proto
console.log(toBinary(IntervalSchema, create(IntervalSchema)).length);
// google/type/fraction.proto
console.log(toBinary(FractionSchema, create(FractionSchema)).length);
