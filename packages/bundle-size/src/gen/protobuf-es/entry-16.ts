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
import { ExprSchema } from "./google/type/expr_pb";
import { DecimalSchema } from "./google/type/decimal_pb";
import { DateTimeSchema, TimeZoneSchema } from "./google/type/datetime_pb";
import { DateSchema } from "./google/type/date_pb";
import { ColorSchema } from "./google/type/color_pb";
import { AttributeContextSchema } from "./google/rpc/context/attribute_context_pb";
import { ViewportSchema } from "./google/geo/type/viewport_pb";
import { LatLngSchema } from "./google/type/latlng_pb";


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
// google/type/expr.proto
console.log(toBinary(ExprSchema, create(ExprSchema)).length);
// google/type/decimal.proto
console.log(toBinary(DecimalSchema, create(DecimalSchema)).length);
// google/type/datetime.proto
console.log(toBinary(DateTimeSchema, create(DateTimeSchema)).length);
console.log(toBinary(TimeZoneSchema, create(TimeZoneSchema)).length);
// google/type/date.proto
console.log(toBinary(DateSchema, create(DateSchema)).length);
// google/type/color.proto
console.log(toBinary(ColorSchema, create(ColorSchema)).length);
// google/rpc/context/attribute_context.proto
console.log(toBinary(AttributeContextSchema, create(AttributeContextSchema)).length);
// google/geo/type/viewport.proto
console.log(toBinary(ViewportSchema, create(ViewportSchema)).length);
// google/type/latlng.proto
console.log(toBinary(LatLngSchema, create(LatLngSchema)).length);
