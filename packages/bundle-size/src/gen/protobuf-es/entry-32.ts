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
import { ExprDesc } from "./google/type/expr_pb";
import { DecimalDesc } from "./google/type/decimal_pb";
import { DateTimeDesc, TimeZoneDesc } from "./google/type/datetime_pb";
import { DateDesc } from "./google/type/date_pb";
import { ColorDesc } from "./google/type/color_pb";
import { AttributeContextDesc } from "./google/rpc/context/attribute_context_pb";
import { ViewportDesc } from "./google/geo/type/viewport_pb";
import { LatLngDesc } from "./google/type/latlng_pb";
import { VisibilityDesc, VisibilityRuleDesc } from "./google/api/visibility_pb";
import { ResourceDescriptorDesc, ResourceReferenceDesc } from "./google/api/resource_pb";
import { HttpBodyDesc } from "./google/api/httpbody_pb";
import { FieldInfoDesc } from "./google/api/field_info_pb";
import { EvalStateDesc, ExprValueDesc } from "./google/api/expr/v1beta1/eval_pb";
import { EnumValueDesc, ValueDesc } from "./google/api/expr/v1beta1/value_pb";
import { DeclDesc, DeclTypeDesc } from "./google/api/expr/v1beta1/decl_pb";
import { ExprDesc as ExprDesc$1, ParsedExprDesc } from "./google/api/expr/v1beta1/expr_pb";
import { SourceInfoDesc, SourcePositionDesc } from "./google/api/expr/v1beta1/source_pb";
import { ExplainDesc } from "./google/api/expr/v1alpha1/explain_pb";
import { EvalStateDesc as EvalStateDesc$1, ExprValueDesc as ExprValueDesc$1 } from "./google/api/expr/v1alpha1/eval_pb";
import { StatusDesc } from "./google/rpc/status_pb";
import { EnumValueDesc as EnumValueDesc$1, ValueDesc as ValueDesc$1 } from "./google/api/expr/v1alpha1/value_pb";
import { CheckedExprDesc, TypeDesc } from "./google/api/expr/v1alpha1/checked_pb";
import { ExprDesc as ExprDesc$2, ParsedExprDesc as ParsedExprDesc$1 } from "./google/api/expr/v1alpha1/syntax_pb";
import { HttpDesc, HttpRuleDesc } from "./google/api/http_pb";

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
// google/type/expr.proto
console.log(toBinary(ExprDesc, create(ExprDesc)).length);
// google/type/decimal.proto
console.log(toBinary(DecimalDesc, create(DecimalDesc)).length);
// google/type/datetime.proto
console.log(toBinary(DateTimeDesc, create(DateTimeDesc)).length);
console.log(toBinary(TimeZoneDesc, create(TimeZoneDesc)).length);
// google/type/date.proto
console.log(toBinary(DateDesc, create(DateDesc)).length);
// google/type/color.proto
console.log(toBinary(ColorDesc, create(ColorDesc)).length);
// google/rpc/context/attribute_context.proto
console.log(toBinary(AttributeContextDesc, create(AttributeContextDesc)).length);
// google/geo/type/viewport.proto
console.log(toBinary(ViewportDesc, create(ViewportDesc)).length);
// google/type/latlng.proto
console.log(toBinary(LatLngDesc, create(LatLngDesc)).length);
// google/api/visibility.proto
console.log(toBinary(VisibilityDesc, create(VisibilityDesc)).length);
console.log(toBinary(VisibilityRuleDesc, create(VisibilityRuleDesc)).length);
// google/api/resource.proto
console.log(toBinary(ResourceDescriptorDesc, create(ResourceDescriptorDesc)).length);
console.log(toBinary(ResourceReferenceDesc, create(ResourceReferenceDesc)).length);
// google/api/httpbody.proto
console.log(toBinary(HttpBodyDesc, create(HttpBodyDesc)).length);
// google/api/field_info.proto
console.log(toBinary(FieldInfoDesc, create(FieldInfoDesc)).length);
// google/api/expr/v1beta1/eval.proto
console.log(toBinary(EvalStateDesc, create(EvalStateDesc)).length);
console.log(toBinary(ExprValueDesc, create(ExprValueDesc)).length);
// google/api/expr/v1beta1/value.proto
console.log(toBinary(ValueDesc, create(ValueDesc)).length);
console.log(toBinary(EnumValueDesc, create(EnumValueDesc)).length);
// google/api/expr/v1beta1/decl.proto
console.log(toBinary(DeclDesc, create(DeclDesc)).length);
console.log(toBinary(DeclTypeDesc, create(DeclTypeDesc)).length);
// google/api/expr/v1beta1/expr.proto
console.log(toBinary(ParsedExprDesc, create(ParsedExprDesc)).length);
console.log(toBinary(ExprDesc$1, create(ExprDesc$1)).length);
// google/api/expr/v1beta1/source.proto
console.log(toBinary(SourceInfoDesc, create(SourceInfoDesc)).length);
console.log(toBinary(SourcePositionDesc, create(SourcePositionDesc)).length);
// google/api/expr/v1alpha1/explain.proto
console.log(toBinary(ExplainDesc, create(ExplainDesc)).length);
// google/api/expr/v1alpha1/eval.proto
console.log(toBinary(EvalStateDesc$1, create(EvalStateDesc$1)).length);
console.log(toBinary(ExprValueDesc$1, create(ExprValueDesc$1)).length);
// google/rpc/status.proto
console.log(toBinary(StatusDesc, create(StatusDesc)).length);
// google/api/expr/v1alpha1/value.proto
console.log(toBinary(ValueDesc$1, create(ValueDesc$1)).length);
console.log(toBinary(EnumValueDesc$1, create(EnumValueDesc$1)).length);
// google/api/expr/v1alpha1/checked.proto
console.log(toBinary(CheckedExprDesc, create(CheckedExprDesc)).length);
console.log(toBinary(TypeDesc, create(TypeDesc)).length);
// google/api/expr/v1alpha1/syntax.proto
console.log(toBinary(ParsedExprDesc$1, create(ParsedExprDesc$1)).length);
console.log(toBinary(ExprDesc$2, create(ExprDesc$2)).length);
// google/api/http.proto
console.log(toBinary(HttpDesc, create(HttpDesc)).length);
console.log(toBinary(HttpRuleDesc, create(HttpRuleDesc)).length);
