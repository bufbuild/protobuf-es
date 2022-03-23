// Copyright 2021-2022 Buf Technologies, Inc.
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

package gencommon

import (
	"fmt"
	"strings"

	"github.com/bufbuild/protobuf-es/private/protoplugin"
	"google.golang.org/protobuf/types/descriptorpb"
)

// GetFieldTyping returns an expression for the TypeScript typing of a field,
// and whether the property should be optional.
func GetFieldTyping(field *protoplugin.Field) (expr []interface{}, optional bool) {
	switch field.Kind {
	case protoplugin.FieldKindScalar:
		expr = append(expr, ScalarTypeScriptType(field.Scalar))
		optional = field.Optional

	case protoplugin.FieldKindMessage:
		if unwrapped, ok := GetUnwrappedFieldType(field); ok {
			expr = append(expr, ScalarTypeScriptType(unwrapped))
		} else {
			expr = append(expr, field.Message.Symbol.ToTypeOnly())
		}
		optional = true

	case protoplugin.FieldKindEnum:
		expr = append(expr, field.Enum.Symbol.ToTypeOnly())
		optional = field.Optional

	case protoplugin.FieldKindMap:
		var keyType string
		switch field.Map.Key {
		case
			descriptorpb.FieldDescriptorProto_TYPE_INT32,
			descriptorpb.FieldDescriptorProto_TYPE_FIXED32,
			descriptorpb.FieldDescriptorProto_TYPE_UINT32,
			descriptorpb.FieldDescriptorProto_TYPE_SFIXED32,
			descriptorpb.FieldDescriptorProto_TYPE_SINT32:
			keyType = "number"
		default:
			keyType = "string"
		}
		var valueType interface{}
		switch field.Map.ValueKind {
		case protoplugin.FieldKindScalar:
			valueType = ScalarTypeScriptType(field.Map.ValueScalar)
		case protoplugin.FieldKindMessage:
			valueType = field.Map.ValueMessage.Symbol.ToTypeOnly()
		case protoplugin.FieldKindEnum:
			valueType = field.Map.ValueEnum.Symbol.ToTypeOnly()
		}
		expr = append(expr, "{ [key: ", keyType, "]: ", valueType, " }")
		optional = false
	}

	if field.Repeated {
		expr = append(expr, "[]")
		optional = false
	}

	return expr, optional
}

// GetFieldExplicitDefaultValue returns an expression for the default value
// specified via `[ default = 123 ]`, and a bool that indicates whether the
// TypeScript type of the value can be trivially inferred from the value.
// If the field has no explicit default value, the expression is nil.
func GetFieldExplicitDefaultValue(field *protoplugin.Field) (expr []interface{}, typingInferrable bool) {
	rt := field.Parent.File.RuntimeSymbols
	if field.Parent.File.Syntax != protoplugin.ProtoSyntax2 {
		return nil, false
	}
	value := field.Proto.GetDefaultValue()
	if value == "" {
		return nil, true
	}
	switch field.Kind {
	case protoplugin.FieldKindEnum:
		enumValue := field.Enum.FindValueByName(field.Proto.GetDefaultValue())
		expr = append(expr, field.Enum.Symbol, ".", enumValue.LocalName)
		return expr, true
	case protoplugin.FieldKindScalar:
		switch field.Scalar {
		case descriptorpb.FieldDescriptorProto_TYPE_STRING:
			expr = append(expr, `"`+strings.ReplaceAll(value, `"`, `\"`)+`"`)
		case descriptorpb.FieldDescriptorProto_TYPE_BYTES:
			bytes, err := UnescapeBytesDefaultValue(value)
			if err != nil {
				return nil, false
			}
			expr = append(expr, "new Uint8Array([")
			for _, b := range bytes {
				expr = append(expr, fmt.Sprintf("0x%02X, ", b))
			}
			expr = append(expr, "])")
		case
			descriptorpb.FieldDescriptorProto_TYPE_INT64,
			descriptorpb.FieldDescriptorProto_TYPE_SFIXED64,
			descriptorpb.FieldDescriptorProto_TYPE_SINT64:
			str := `"` + strings.ReplaceAll(value, `"`, `\"`) + `"`
			expr = append(expr, rt.ProtoInt64, ".parse(", str, ")")
		case descriptorpb.FieldDescriptorProto_TYPE_UINT64,
			descriptorpb.FieldDescriptorProto_TYPE_FIXED64:
			str := `"` + strings.ReplaceAll(value, `"`, `\"`) + `"`
			expr = append(expr, rt.ProtoInt64, ".uParse(", str, ")")
		case descriptorpb.FieldDescriptorProto_TYPE_DOUBLE,
			descriptorpb.FieldDescriptorProto_TYPE_FLOAT:
			switch value {
			case "inf":
				expr = append(expr, "globalThis.Number.POSITIVE_INFINITY")
			case "-inf":
				expr = append(expr, "globalThis.Number.NEGATIVE_INFINITY")
			case "nan":
				expr = append(expr, "globalThis.Number.NaN")
			default:
				expr = append(expr, value)
			}
		case descriptorpb.FieldDescriptorProto_TYPE_INT32,
			descriptorpb.FieldDescriptorProto_TYPE_UINT32,
			descriptorpb.FieldDescriptorProto_TYPE_SINT32,
			descriptorpb.FieldDescriptorProto_TYPE_FIXED32,
			descriptorpb.FieldDescriptorProto_TYPE_SFIXED32:
			expr = append(expr, value)
		case descriptorpb.FieldDescriptorProto_TYPE_BOOL:
			switch value {
			case "true", "false":
				expr = append(expr, value)
			}
		}
		return expr, true
	}
	return nil, false
}

// GetFieldIntrinsicDefaultValue returns an expression for the intrinsic
// default value for a field, and a bool that indicates whether the
// TypeScript type of the value can be trivially inferred from the value.
// If the field has no intrinsic default value, the expression is nil.
func GetFieldIntrinsicDefaultValue(field *protoplugin.Field) (expr []interface{}, typingInferrable bool) {
	rt := field.Parent.File.RuntimeSymbols
	if field.Repeated {
		expr = append(expr, "[]")
		return expr, false
	}
	if field.Kind == protoplugin.FieldKindMap {
		expr = append(expr, "{}")
		return expr, false
	}
	if field.Parent.File.Syntax != protoplugin.ProtoSyntax3 {
		return nil, false
	}
	switch field.Kind {
	case protoplugin.FieldKindEnum:
		if !field.Optional {
			enumValue := field.Enum.FindValueByNumber(0)
			expr = append(expr, field.Enum.Symbol, ".", enumValue.LocalName)
			return expr, true
		}
	case protoplugin.FieldKindScalar:
		if !field.Optional {
			switch field.Scalar {
			case descriptorpb.FieldDescriptorProto_TYPE_STRING:
				expr = append(expr, `""`)
			case descriptorpb.FieldDescriptorProto_TYPE_BOOL:
				expr = append(expr, false)
			case
				descriptorpb.FieldDescriptorProto_TYPE_UINT64,
				descriptorpb.FieldDescriptorProto_TYPE_SFIXED64,
				descriptorpb.FieldDescriptorProto_TYPE_FIXED64,
				descriptorpb.FieldDescriptorProto_TYPE_SINT64,
				descriptorpb.FieldDescriptorProto_TYPE_INT64:
				expr = append(expr, rt.ProtoInt64, ".zero")
			case descriptorpb.FieldDescriptorProto_TYPE_BYTES:
				expr = append(expr, "new Uint8Array(0)")
			default:
				expr = append(expr, "0")
			}
			return expr, true
		}
	}
	return nil, false
}
