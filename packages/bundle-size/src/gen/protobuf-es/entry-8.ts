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

import { TimeOfDay } from "./google/type/timeofday_pb.js";
import { Quaternion } from "./google/type/quaternion_pb.js";
import { PostalAddress } from "./google/type/postal_address_pb.js";
import { PhoneNumber } from "./google/type/phone_number_pb.js";
import { Money } from "./google/type/money_pb.js";
import { LocalizedText } from "./google/type/localized_text_pb.js";
import { Interval } from "./google/type/interval_pb.js";
import { Fraction } from "./google/type/fraction_pb.js";

/* eslint-disable no-console */

// google/type/timeofday.proto
console.log(new TimeOfDay().toBinary().length);
// google/type/quaternion.proto
console.log(new Quaternion().toBinary().length);
// google/type/postal_address.proto
console.log(new PostalAddress().toBinary().length);
// google/type/phone_number.proto
console.log(new PhoneNumber().toBinary().length);
// google/type/money.proto
console.log(new Money().toBinary().length);
// google/type/localized_text.proto
console.log(new LocalizedText().toBinary().length);
// google/type/interval.proto
console.log(new Interval().toBinary().length);
// google/type/fraction.proto
console.log(new Fraction().toBinary().length);
