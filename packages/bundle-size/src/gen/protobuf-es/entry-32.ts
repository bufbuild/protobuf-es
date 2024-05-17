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
import { Visibility, VisibilityRule } from "./google/api/visibility_pb.js";
import { ResourceDescriptor, ResourceReference } from "./google/api/resource_pb.js";
import { HttpBody } from "./google/api/httpbody_pb.js";
import { FieldInfo } from "./google/api/field_info_pb.js";
import { EvalState, ExprValue } from "./google/api/expr/v1beta1/eval_pb.js";
import { EnumValue, Value } from "./google/api/expr/v1beta1/value_pb.js";
import { Decl, DeclType } from "./google/api/expr/v1beta1/decl_pb.js";
import { Expr as Expr$1, ParsedExpr } from "./google/api/expr/v1beta1/expr_pb.js";
import { SourceInfo, SourcePosition } from "./google/api/expr/v1beta1/source_pb.js";
import { Explain } from "./google/api/expr/v1alpha1/explain_pb.js";
import { EvalState as EvalState$1, ExprValue as ExprValue$1 } from "./google/api/expr/v1alpha1/eval_pb.js";
import { Status } from "./google/rpc/status_pb.js";
import { EnumValue as EnumValue$1, Value as Value$1 } from "./google/api/expr/v1alpha1/value_pb.js";
import { CheckedExpr, Type } from "./google/api/expr/v1alpha1/checked_pb.js";
import { Expr as Expr$2, ParsedExpr as ParsedExpr$1 } from "./google/api/expr/v1alpha1/syntax_pb.js";
import { Http, HttpRule } from "./google/api/http_pb.js";

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
// google/api/visibility.proto
console.log(new Visibility().toBinary().length);
console.log(new VisibilityRule().toBinary().length);
// google/api/resource.proto
console.log(new ResourceDescriptor().toBinary().length);
console.log(new ResourceReference().toBinary().length);
// google/api/httpbody.proto
console.log(new HttpBody().toBinary().length);
// google/api/field_info.proto
console.log(new FieldInfo().toBinary().length);
// google/api/expr/v1beta1/eval.proto
console.log(new EvalState().toBinary().length);
console.log(new ExprValue().toBinary().length);
// google/api/expr/v1beta1/value.proto
console.log(new Value().toBinary().length);
console.log(new EnumValue().toBinary().length);
// google/api/expr/v1beta1/decl.proto
console.log(new Decl().toBinary().length);
console.log(new DeclType().toBinary().length);
// google/api/expr/v1beta1/expr.proto
console.log(new ParsedExpr().toBinary().length);
console.log(new Expr$1().toBinary().length);
// google/api/expr/v1beta1/source.proto
console.log(new SourceInfo().toBinary().length);
console.log(new SourcePosition().toBinary().length);
// google/api/expr/v1alpha1/explain.proto
console.log(new Explain().toBinary().length);
// google/api/expr/v1alpha1/eval.proto
console.log(new EvalState$1().toBinary().length);
console.log(new ExprValue$1().toBinary().length);
// google/rpc/status.proto
console.log(new Status().toBinary().length);
// google/api/expr/v1alpha1/value.proto
console.log(new Value$1().toBinary().length);
console.log(new EnumValue$1().toBinary().length);
// google/api/expr/v1alpha1/checked.proto
console.log(new CheckedExpr().toBinary().length);
console.log(new Type().toBinary().length);
// google/api/expr/v1alpha1/syntax.proto
console.log(new ParsedExpr$1().toBinary().length);
console.log(new Expr$2().toBinary().length);
// google/api/http.proto
console.log(new Http().toBinary().length);
console.log(new HttpRule().toBinary().length);
