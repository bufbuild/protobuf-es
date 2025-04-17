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

import { TimeOfDay } from "./google/type/timeofday_pb";
import { Quaternion } from "./google/type/quaternion_pb";
import { PostalAddress } from "./google/type/postal_address_pb";
import { PhoneNumber } from "./google/type/phone_number_pb";
import { Money } from "./google/type/money_pb";
import { LocalizedText } from "./google/type/localized_text_pb";
import { Interval } from "./google/type/interval_pb";
import { Fraction } from "./google/type/fraction_pb";
import { Expr } from "./google/type/expr_pb";
import { Decimal } from "./google/type/decimal_pb";
import { DateTime, TimeZone } from "./google/type/datetime_pb";
import { Date } from "./google/type/date_pb";
import { Color } from "./google/type/color_pb";
import { AttributeContext } from "./google/rpc/context/attribute_context_pb";
import { Viewport } from "./google/geo/type/viewport_pb";
import { LatLng } from "./google/type/latlng_pb";


// google/type/timeofday.proto
console.log(new TimeOfDay().serializeBinary().length);
// google/type/quaternion.proto
console.log(new Quaternion().serializeBinary().length);
// google/type/postal_address.proto
console.log(new PostalAddress().serializeBinary().length);
// google/type/phone_number.proto
console.log(new PhoneNumber().serializeBinary().length);
// google/type/money.proto
console.log(new Money().serializeBinary().length);
// google/type/localized_text.proto
console.log(new LocalizedText().serializeBinary().length);
// google/type/interval.proto
console.log(new Interval().serializeBinary().length);
// google/type/fraction.proto
console.log(new Fraction().serializeBinary().length);
// google/type/expr.proto
console.log(new Expr().serializeBinary().length);
// google/type/decimal.proto
console.log(new Decimal().serializeBinary().length);
// google/type/datetime.proto
console.log(new DateTime().serializeBinary().length);
console.log(new TimeZone().serializeBinary().length);
// google/type/date.proto
console.log(new Date().serializeBinary().length);
// google/type/color.proto
console.log(new Color().serializeBinary().length);
// google/rpc/context/attribute_context.proto
console.log(new AttributeContext().serializeBinary().length);
// google/geo/type/viewport.proto
console.log(new Viewport().serializeBinary().length);
// google/type/latlng.proto
console.log(new LatLng().serializeBinary().length);
