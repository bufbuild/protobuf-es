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
import { Visibility, VisibilityRule } from "./google/api/visibility_pb";
import { ResourceDescriptor, ResourceReference } from "./google/api/resource_pb";
import { HttpBody } from "./google/api/httpbody_pb";
import { FieldInfo } from "./google/api/field_info_pb";
import { EvalState, ExprValue } from "./google/api/expr/v1beta1/eval_pb";
import { EnumValue, Value } from "./google/api/expr/v1beta1/value_pb";
import { Decl, DeclType } from "./google/api/expr/v1beta1/decl_pb";
import { Expr as Expr$1, ParsedExpr } from "./google/api/expr/v1beta1/expr_pb";
import { SourceInfo, SourcePosition } from "./google/api/expr/v1beta1/source_pb";
import { Explain } from "./google/api/expr/v1alpha1/explain_pb";
import { EvalState as EvalState$1, ExprValue as ExprValue$1 } from "./google/api/expr/v1alpha1/eval_pb";
import { Status } from "./google/rpc/status_pb";
import { EnumValue as EnumValue$1, Value as Value$1 } from "./google/api/expr/v1alpha1/value_pb";
import { CheckedExpr, Type } from "./google/api/expr/v1alpha1/checked_pb";
import { Expr as Expr$2, ParsedExpr as ParsedExpr$1 } from "./google/api/expr/v1alpha1/syntax_pb";
import { Http, HttpRule } from "./google/api/http_pb";


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
// google/api/visibility.proto
console.log(new Visibility().serializeBinary().length);
console.log(new VisibilityRule().serializeBinary().length);
// google/api/resource.proto
console.log(new ResourceDescriptor().serializeBinary().length);
console.log(new ResourceReference().serializeBinary().length);
// google/api/httpbody.proto
console.log(new HttpBody().serializeBinary().length);
// google/api/field_info.proto
console.log(new FieldInfo().serializeBinary().length);
// google/api/expr/v1beta1/eval.proto
console.log(new EvalState().serializeBinary().length);
console.log(new ExprValue().serializeBinary().length);
// google/api/expr/v1beta1/value.proto
console.log(new Value().serializeBinary().length);
console.log(new EnumValue().serializeBinary().length);
// google/api/expr/v1beta1/decl.proto
console.log(new Decl().serializeBinary().length);
console.log(new DeclType().serializeBinary().length);
// google/api/expr/v1beta1/expr.proto
console.log(new ParsedExpr().serializeBinary().length);
console.log(new Expr$1().serializeBinary().length);
// google/api/expr/v1beta1/source.proto
console.log(new SourceInfo().serializeBinary().length);
console.log(new SourcePosition().serializeBinary().length);
// google/api/expr/v1alpha1/explain.proto
console.log(new Explain().serializeBinary().length);
// google/api/expr/v1alpha1/eval.proto
console.log(new EvalState$1().serializeBinary().length);
console.log(new ExprValue$1().serializeBinary().length);
// google/rpc/status.proto
console.log(new Status().serializeBinary().length);
// google/api/expr/v1alpha1/value.proto
console.log(new Value$1().serializeBinary().length);
console.log(new EnumValue$1().serializeBinary().length);
// google/api/expr/v1alpha1/checked.proto
console.log(new CheckedExpr().serializeBinary().length);
console.log(new Type().serializeBinary().length);
// google/api/expr/v1alpha1/syntax.proto
console.log(new ParsedExpr$1().serializeBinary().length);
console.log(new Expr$2().serializeBinary().length);
// google/api/http.proto
console.log(new Http().serializeBinary().length);
console.log(new HttpRule().serializeBinary().length);
