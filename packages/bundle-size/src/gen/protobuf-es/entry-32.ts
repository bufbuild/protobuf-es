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
import { VisibilityRuleSchema, VisibilitySchema } from "./google/api/visibility_pb";
import { ResourceDescriptorSchema, ResourceReferenceSchema } from "./google/api/resource_pb";
import { HttpBodySchema } from "./google/api/httpbody_pb";
import { FieldInfoSchema } from "./google/api/field_info_pb";
import { EvalStateSchema, ExprValueSchema } from "./google/api/expr/v1beta1/eval_pb";
import { EnumValueSchema, ValueSchema } from "./google/api/expr/v1beta1/value_pb";
import { DeclSchema, DeclTypeSchema } from "./google/api/expr/v1beta1/decl_pb";
import { ExprSchema as ExprSchema$1, ParsedExprSchema } from "./google/api/expr/v1beta1/expr_pb";
import { SourceInfoSchema, SourcePositionSchema } from "./google/api/expr/v1beta1/source_pb";
import { ExplainSchema } from "./google/api/expr/v1alpha1/explain_pb";
import { EvalStateSchema as EvalStateSchema$1, ExprValueSchema as ExprValueSchema$1 } from "./google/api/expr/v1alpha1/eval_pb";
import { StatusSchema } from "./google/rpc/status_pb";
import { EnumValueSchema as EnumValueSchema$1, ValueSchema as ValueSchema$1 } from "./google/api/expr/v1alpha1/value_pb";
import { CheckedExprSchema, TypeSchema } from "./google/api/expr/v1alpha1/checked_pb";
import { ExprSchema as ExprSchema$2, ParsedExprSchema as ParsedExprSchema$1 } from "./google/api/expr/v1alpha1/syntax_pb";
import { HttpRuleSchema, HttpSchema } from "./google/api/http_pb";


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
// google/api/visibility.proto
console.log(toBinary(VisibilitySchema, create(VisibilitySchema)).length);
console.log(toBinary(VisibilityRuleSchema, create(VisibilityRuleSchema)).length);
// google/api/resource.proto
console.log(toBinary(ResourceDescriptorSchema, create(ResourceDescriptorSchema)).length);
console.log(toBinary(ResourceReferenceSchema, create(ResourceReferenceSchema)).length);
// google/api/httpbody.proto
console.log(toBinary(HttpBodySchema, create(HttpBodySchema)).length);
// google/api/field_info.proto
console.log(toBinary(FieldInfoSchema, create(FieldInfoSchema)).length);
// google/api/expr/v1beta1/eval.proto
console.log(toBinary(EvalStateSchema, create(EvalStateSchema)).length);
console.log(toBinary(ExprValueSchema, create(ExprValueSchema)).length);
// google/api/expr/v1beta1/value.proto
console.log(toBinary(ValueSchema, create(ValueSchema)).length);
console.log(toBinary(EnumValueSchema, create(EnumValueSchema)).length);
// google/api/expr/v1beta1/decl.proto
console.log(toBinary(DeclSchema, create(DeclSchema)).length);
console.log(toBinary(DeclTypeSchema, create(DeclTypeSchema)).length);
// google/api/expr/v1beta1/expr.proto
console.log(toBinary(ParsedExprSchema, create(ParsedExprSchema)).length);
console.log(toBinary(ExprSchema$1, create(ExprSchema$1)).length);
// google/api/expr/v1beta1/source.proto
console.log(toBinary(SourceInfoSchema, create(SourceInfoSchema)).length);
console.log(toBinary(SourcePositionSchema, create(SourcePositionSchema)).length);
// google/api/expr/v1alpha1/explain.proto
console.log(toBinary(ExplainSchema, create(ExplainSchema)).length);
// google/api/expr/v1alpha1/eval.proto
console.log(toBinary(EvalStateSchema$1, create(EvalStateSchema$1)).length);
console.log(toBinary(ExprValueSchema$1, create(ExprValueSchema$1)).length);
// google/rpc/status.proto
console.log(toBinary(StatusSchema, create(StatusSchema)).length);
// google/api/expr/v1alpha1/value.proto
console.log(toBinary(ValueSchema$1, create(ValueSchema$1)).length);
console.log(toBinary(EnumValueSchema$1, create(EnumValueSchema$1)).length);
// google/api/expr/v1alpha1/checked.proto
console.log(toBinary(CheckedExprSchema, create(CheckedExprSchema)).length);
console.log(toBinary(TypeSchema, create(TypeSchema)).length);
// google/api/expr/v1alpha1/syntax.proto
console.log(toBinary(ParsedExprSchema$1, create(ParsedExprSchema$1)).length);
console.log(toBinary(ExprSchema$2, create(ExprSchema$2)).length);
// google/api/http.proto
console.log(toBinary(HttpSchema, create(HttpSchema)).length);
console.log(toBinary(HttpRuleSchema, create(HttpRuleSchema)).length);
