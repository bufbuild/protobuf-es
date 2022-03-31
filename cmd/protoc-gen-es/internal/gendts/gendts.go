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

package gendts

import (
	"github.com/bufbuild/protobuf-es/cmd/protoc-gen-es/internal/gencommon"
	"github.com/bufbuild/protobuf-es/private/protoplugin"
)

func GenerateFile(gen *protoplugin.Generator, file *protoplugin.File) {
	f := gen.NewGeneratedFile(file.Name + "_pb.d.ts")
	f.ImportPath = file.StandardImportPath
	f.H(file.Preamble)
	for _, enum := range file.Enums {
		generateEnum(f, enum)
	}
	for _, message := range file.Messages {
		generateMessage(f, message)
	}
	// We do not generate anything for services, and we do not support extensions at this time
}

func generateEnum(f *protoplugin.GeneratedFile, enum *protoplugin.Enum) {
	f.P(enum.JSDoc(""))
	f.P("export declare enum ", enum.Symbol, " {")
	for index, value := range enum.Values {
		if index > 0 {
			f.P()
		}
		f.P(value.JSDoc("  "))
		f.P("  ", value.LocalName, " = ", value.Proto.GetNumber(), ",")
	}
	f.P("}")
	f.P()
}

func generateMessage(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
	rt := message.File.RuntimeSymbols
	f.P(message.JSDoc(""))
	f.P("export declare class ", message.Symbol, " extends ", rt.Message, "<", message.Symbol, "> {")
	for _, member := range message.Members {
		switch member.Kind {
		case protoplugin.MemberKindOneof:
			generateOneof(f, member.Oneof)
		case protoplugin.MemberKindField:
			generateField(f, member.Field)
		}
		f.P()
	}
	f.P("  constructor(data?: ", rt.PartialMessage, "<", message.Symbol, ">);")
	f.P()
	generateWktMethods(f, message)
	f.P("  static readonly runtime: typeof ", rt.ProtoN, ";")
	f.P("  static readonly typeName = \"", message.TypeName, "\";")
	f.P("  static readonly fields: ", rt.FieldList, ";")
	// In case we start supporting options, we have to surface them here
	//f.P("  static readonly options: { readonly [extensionName: string]: ", rt.JsonValue, " } = {};")
	f.P()
	generateWktStaticMethods(f, message)
	f.P("  static fromBinary(bytes: Uint8Array, options?: Partial<", rt.BinaryReadOptions, ">): ", message.Symbol, ";")
	f.P()
	f.P("  static fromJson(jsonValue: ", rt.JsonValue, ", options?: Partial<", rt.JsonReadOptions, ">): ", message.Symbol, ";")
	f.P()
	f.P("  static fromJsonString(jsonString: string, options?: Partial<", rt.JsonReadOptions, ">): ", message.Symbol, ";")
	f.P()
	f.P("  static equals(a: ", message.Symbol, " | ", rt.PlainMessage, "<", message.Symbol, "> | undefined, b: ", message.Symbol, " | ", rt.PlainMessage, "<", message.Symbol, "> | undefined): boolean;")
	f.P("}")
	f.P()
	for _, nestedEnum := range message.NestedEnums {
		generateEnum(f, nestedEnum)
	}
	for _, nestedMessage := range message.NestedMessages {
		generateMessage(f, nestedMessage)
	}
	// We do not support extensions at this time
}

func generateOneof(f *protoplugin.GeneratedFile, oneof *protoplugin.Oneof) {
	f.P(oneof.JSDoc("  "))
	f.P("  ", oneof.LocalName, ": {")
	for i, field := range oneof.Fields {
		if i > 0 {
			f.P(`  } | {`)
		}
		f.P(field.JSDoc("    "))
		t, _ := gencommon.GetFieldTyping(field)
		f.P(`    value: `, t, `;`)
		f.P(`    case: "`, field.LocalName, `";`)
	}
	f.P(`  } | { case: undefined; value?: undefined };`)
}

func generateField(f *protoplugin.GeneratedFile, field *protoplugin.Field) {
	f.P(field.JSDoc("  "))
	var expr []interface{}
	expr = append(expr, "  ", field.LocalName)
	typing, optional := gencommon.GetFieldTyping(field)
	if optional {
		expr = append(expr, "?: ", typing)
	} else {
		expr = append(expr, ": ", typing)
	}
	expr = append(expr, ";")
	f.P(expr...)
}

func generateWktMethods(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
	rt := message.File.RuntimeSymbols
	if ok, _ := gencommon.MatchWktAny(message); ok {
		f.P("  override toJson(options?: Partial<", rt.JsonWriteOptions, ">): ", rt.JsonValue, ";")
		f.P()
		f.P("  override fromJson(json: ", rt.JsonValue, ", options?: Partial<", rt.JsonReadOptions, ">): this;")
		f.P()
		f.P("  packFrom(message: Message): void;")
		f.P()
		f.P("  unpackTo(target: Message): boolean;")
		f.P()
		f.P("  is(type: ", rt.MessageType, "): boolean;")
		f.P()
		f.P("  private typeNameToUrl(name: string): string;")
		f.P()
		f.P("  private typeUrlToName(url: string): string;")
		f.P()
	}
	if ok, _ := gencommon.MatchWktDuration(message); ok {
		f.P("  override fromJson(json: ", rt.JsonValue, ", options?: Partial<", rt.JsonReadOptions, ">): this;")
		f.P()
		f.P("  override toJson(options?: Partial<", rt.JsonWriteOptions, ">): JsonValue;")
		f.P()
	}
	if ok, _ := gencommon.MatchWktFieldMask(message); ok {
		f.P(`  toJson(options?: Partial<`, rt.JsonWriteOptions, `>): `, rt.JsonValue, `;`)
		f.P()
		f.P(`  override fromJson(json: `, rt.JsonValue, `, options?: Partial<`, rt.JsonReadOptions, `>): this;`)
		f.P()
	}
	if ok, _ := gencommon.MatchWktStruct(message); ok {
		f.P("  override toJson(options?: Partial<", rt.JsonWriteOptions, ">): ", rt.JsonValue, ";")
		f.P()
		f.P("  override fromJson(json: ", rt.JsonValue, ", options?: Partial<", rt.JsonReadOptions, ">): this;")
		f.P()
	}
	if ok, _ := gencommon.MatchWktValue(message); ok {
		f.P("  override toJson(options?: Partial<", rt.JsonWriteOptions, ">): ", rt.JsonValue, ";")
		f.P()
		f.P("  override fromJson(json: ", rt.JsonValue, ", options?: Partial<", rt.JsonReadOptions, ">): this;")
		f.P()
	}
	if ok, _ := gencommon.MatchWktListValue(message); ok {
		f.P(`  override toJson(options?: Partial<`, rt.JsonWriteOptions, `>): `, rt.JsonValue, `;`)
		f.P()
		f.P(`  override fromJson(json: `, rt.JsonValue, `, options?: Partial<`, rt.JsonReadOptions, `>): this;`)
		f.P()
	}
	if ok, _ := gencommon.MatchWktTimestamp(message); ok {
		f.P("  override fromJson(json: ", rt.JsonValue, ", options?: Partial<", rt.JsonReadOptions, ">): this;")
		f.P()
		f.P("  override toJson(options?: Partial<", rt.JsonWriteOptions, ">): JsonValue;")
		f.P()
		f.P("  toDate(): Date;")
		f.P()
	}
	if ok, _ := gencommon.MatchWktWrapper(message); ok {
		f.P("  override toJson(options?: Partial<", rt.JsonWriteOptions, ">): ", rt.JsonValue, ";")
		f.P()
		f.P("  override fromJson(json: ", rt.JsonValue, ", options?: Partial<", rt.JsonReadOptions, ">): this;")
		f.P()
	}
}

func generateWktStaticMethods(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
	if ok, _ := gencommon.MatchWktAny(message); ok {
		f.P("  static pack(message: Message): ", message.Symbol, ";")
		f.P()
	}
	if ok, _ := gencommon.MatchWktTimestamp(message); ok {
		f.P("  static now(): ", message.Symbol, ";")
		f.P()
		f.P("  static fromDate(date: Date): ", message.Symbol, ";")
		f.P()
	}
	if ok, ref := gencommon.MatchWktWrapper(message); ok {
		t := gencommon.ScalarTypeScriptType(ref.Value.Scalar)
		f.P("  static readonly fieldWrapper: {")
		f.P("    wrapField(value: ", t, " | ", message.Symbol, "): ", message.Symbol, ",")
		f.P("    unwrapField(value: ", message.Symbol, "): ", t, ",")
		f.P("  };")
		f.P()
	}
}
