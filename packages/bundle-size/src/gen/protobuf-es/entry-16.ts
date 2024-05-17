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
import { Expr } from "./google/type/expr_pb.js";
import { Decimal } from "./google/type/decimal_pb.js";
import { DateTime, TimeZone } from "./google/type/datetime_pb.js";
import { Date } from "./google/type/date_pb.js";
import { Color } from "./google/type/color_pb.js";
import { AttributeContext } from "./google/rpc/context/attribute_context_pb.js";
import { Viewport } from "./google/geo/type/viewport_pb.js";
import { LatLng } from "./google/type/latlng_pb.js";

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
// google/type/expr.proto
console.log(new Expr().toBinary().length);
// google/type/decimal.proto
console.log(new Decimal().toBinary().length);
// google/type/datetime.proto
console.log(new DateTime().toBinary().length);
console.log(new TimeZone().toBinary().length);
// google/type/date.proto
console.log(new Date().toBinary().length);
// google/type/color.proto
console.log(new Color().toBinary().length);
// google/rpc/context/attribute_context.proto
console.log(new AttributeContext().toBinary().length);
// google/geo/type/viewport.proto
console.log(new Viewport().toBinary().length);
// google/type/latlng.proto
console.log(new LatLng().toBinary().length);
