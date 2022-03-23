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
	"github.com/bufbuild/protobuf-es/private/protoplugin"
	"google.golang.org/protobuf/types/descriptorpb"
)

var wrapperToBaseType = map[string]descriptorpb.FieldDescriptorProto_Type{
	"google.protobuf.DoubleValue": descriptorpb.FieldDescriptorProto_TYPE_DOUBLE,
	"google.protobuf.FloatValue":  descriptorpb.FieldDescriptorProto_TYPE_FLOAT,
	"google.protobuf.Int64Value":  descriptorpb.FieldDescriptorProto_TYPE_INT64,
	"google.protobuf.UInt64Value": descriptorpb.FieldDescriptorProto_TYPE_UINT64,
	"google.protobuf.Int32Value":  descriptorpb.FieldDescriptorProto_TYPE_INT32,
	"google.protobuf.UInt32Value": descriptorpb.FieldDescriptorProto_TYPE_UINT32,
	"google.protobuf.BoolValue":   descriptorpb.FieldDescriptorProto_TYPE_BOOL,
	"google.protobuf.StringValue": descriptorpb.FieldDescriptorProto_TYPE_STRING,
	"google.protobuf.BytesValue":  descriptorpb.FieldDescriptorProto_TYPE_BYTES,
}

func GetUnwrappedFieldType(field *protoplugin.Field) (scalarType descriptorpb.FieldDescriptorProto_Type, ok bool) {
	if field.Kind != protoplugin.FieldKindMessage {
		return 0, false
	}
	if field.Repeated {
		return 0, false
	}
	if field.Oneof != nil {
		return 0, false
	}
	scalarType, ok = wrapperToBaseType[field.Message.TypeName]
	return scalarType, ok
}

type wktAny struct {
	TypeURL *protoplugin.Field
	Value   *protoplugin.Field
}

func MatchWktAny(message *protoplugin.Message) (bool, *wktAny) {
	if message.TypeName != "google.protobuf.Any" {
		return false, nil
	}
	ok := true
	r := &wktAny{
		TypeURL: findField(&ok, message, 1, descriptorpb.FieldDescriptorProto_TYPE_STRING),
		Value:   findField(&ok, message, 2, descriptorpb.FieldDescriptorProto_TYPE_BYTES),
	}
	return ok, r
}

type wktTimestamp struct {
	Seconds *protoplugin.Field
	Nanos   *protoplugin.Field
}

func MatchWktTimestamp(message *protoplugin.Message) (bool, *wktTimestamp) {
	if message.TypeName != "google.protobuf.Timestamp" {
		return false, nil
	}
	ok := true
	r := &wktTimestamp{
		Seconds: findField(&ok, message, 1, descriptorpb.FieldDescriptorProto_TYPE_INT64),
		Nanos:   findField(&ok, message, 2, descriptorpb.FieldDescriptorProto_TYPE_INT32),
	}
	return ok, r
}

type wktDuration struct {
	Seconds *protoplugin.Field
	Nanos   *protoplugin.Field
}

func MatchWktDuration(message *protoplugin.Message) (bool, *wktDuration) {
	if message.TypeName != "google.protobuf.Duration" {
		return false, nil
	}
	ok := true
	r := &wktDuration{
		Seconds: findField(&ok, message, 1, descriptorpb.FieldDescriptorProto_TYPE_INT64),
		Nanos:   findField(&ok, message, 2, descriptorpb.FieldDescriptorProto_TYPE_INT32),
	}
	return ok, r
}

type wktStruct struct {
	Fields *protoplugin.Field
}

func MatchWktStruct(message *protoplugin.Message) (bool, *wktStruct) {
	if message.TypeName != "google.protobuf.Struct" {
		return false, nil
	}
	ok := true
	r := &wktStruct{
		Fields: findField(&ok, message, 1, descriptorpb.FieldDescriptorProto_TYPE_MESSAGE, func(field *protoplugin.Field) bool {
			if field.Kind != protoplugin.FieldKindMap {
				return false
			}
			if field.Map.ValueKind != protoplugin.FieldKindMessage {
				return false
			}
			return field.Map.ValueMessage.TypeName == "google.protobuf.Value"
		}),
	}
	return ok, r
}

type wktValue struct {
	Kind        *protoplugin.Oneof
	NullValue   *protoplugin.Field
	NumberValue *protoplugin.Field
	StringValue *protoplugin.Field
	BoolValue   *protoplugin.Field
	StructValue *protoplugin.Field
	ListValue   *protoplugin.Field
}

func MatchWktValue(message *protoplugin.Message) (bool, *wktValue) {
	if message.TypeName != "google.protobuf.Value" {
		return false, nil
	}
	ok := true
	kind := findOneof(&ok, message, "kind")
	r := &wktValue{
		Kind: kind,
		NullValue: findField(&ok, message, 1, descriptorpb.FieldDescriptorProto_TYPE_ENUM, func(field *protoplugin.Field) bool {
			return field.Oneof == kind
		}),
		NumberValue: findField(&ok, message, 2, descriptorpb.FieldDescriptorProto_TYPE_DOUBLE, func(field *protoplugin.Field) bool {
			return field.Oneof == kind
		}),
		StringValue: findField(&ok, message, 3, descriptorpb.FieldDescriptorProto_TYPE_STRING, func(field *protoplugin.Field) bool {
			return field.Oneof == kind
		}),
		BoolValue: findField(&ok, message, 4, descriptorpb.FieldDescriptorProto_TYPE_BOOL, func(field *protoplugin.Field) bool {
			return field.Oneof == kind
		}),
		StructValue: findField(&ok, message, 5, descriptorpb.FieldDescriptorProto_TYPE_MESSAGE, func(field *protoplugin.Field) bool {
			return field.Oneof == kind && field.Message.TypeName == "google.protobuf.Struct"
		}),
		ListValue: findField(&ok, message, 6, descriptorpb.FieldDescriptorProto_TYPE_MESSAGE, func(field *protoplugin.Field) bool {
			return field.Message.TypeName == "google.protobuf.ListValue"
		}),
	}
	return ok, r
}

type wktListValue struct {
	Values *protoplugin.Field
}

func MatchWktListValue(message *protoplugin.Message) (bool, *wktListValue) {
	if message.TypeName != "google.protobuf.ListValue" {
		return false, nil
	}
	ok := true
	r := &wktListValue{
		Values: findField(&ok, message, 1, descriptorpb.FieldDescriptorProto_TYPE_MESSAGE, func(field *protoplugin.Field) bool {
			return field.Repeated && field.Kind == protoplugin.FieldKindMessage && field.Message.TypeName == "google.protobuf.Value"
		}),
	}
	return ok, r
}

type wktFieldMask struct {
	Paths *protoplugin.Field
}

func MatchWktFieldMask(message *protoplugin.Message) (bool, *wktFieldMask) {
	if message.TypeName != "google.protobuf.FieldMask" {
		return false, nil
	}
	ok := true
	r := &wktFieldMask{
		Paths: findField(&ok, message, 1, descriptorpb.FieldDescriptorProto_TYPE_STRING, func(field *protoplugin.Field) bool {
			return field.Repeated
		}),
	}
	return ok, r
}

type wktWrapper struct {
	Value *protoplugin.Field
}

func MatchWktWrapper(message *protoplugin.Message) (bool, *wktWrapper) {
	baseType, ok := wrapperToBaseType[message.TypeName]
	if !ok {
		return false, nil
	}
	ok = true
	r := &wktWrapper{
		Value: findField(&ok, message, 1, baseType, func(field *protoplugin.Field) bool {
			return !field.Repeated
		}),
	}
	return ok, r
}

func findOneof(ok *bool, message *protoplugin.Message, wantName string) *protoplugin.Oneof {
	if *ok {
		for _, oneof := range message.Oneofs {
			if oneof.Proto.GetName() != wantName {
				continue
			}
			return oneof
		}
	}
	*ok = false
	return nil
}

func findField(ok *bool, message *protoplugin.Message, wantNumber int32, wantType descriptorpb.FieldDescriptorProto_Type, predicate ...func(*protoplugin.Field) bool) *protoplugin.Field {
	if *ok {
		for _, f := range message.Fields {
			if f.Proto.GetNumber() != wantNumber {
				continue
			}
			if f.Proto.GetType() != wantType {
				continue
			}
			for _, p := range predicate {
				if !p(f) {
					continue
				}
			}
			return f
		}
	}
	*ok = false
	return nil
}
