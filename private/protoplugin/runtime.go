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

package protoplugin

import "fmt"

// Runtime provides convenient access to exports from the runtime library.
type Runtime struct {
	ProtoN             *Symbol
	Message            *Symbol
	PartialMessage     *Symbol
	PlainMessage       *Symbol
	FieldList          *Symbol
	MessageType        *Symbol
	BinaryReadOptions  *Symbol
	BinaryWriteOptions *Symbol
	JsonReadOptions    *Symbol
	JsonWriteOptions   *Symbol
	JsonValue          *Symbol
	JsonObject         *Symbol
	ProtoInt64         *Symbol
	ScalarType         *Symbol
	MethodKind         *Symbol
	MethodIdempotency  *Symbol
}

func newRuntime(symbolPool *symbolPool, syntax ProtoSyntax, bootstrapWKT bool) *Runtime {
	if bootstrapWKT {
		return &Runtime{
			ProtoN:             symbolPool.new(syntax.String(), fmt.Sprintf("./%s.js", syntax.String())),
			Message:            symbolPool.new("Message", "./message.js"),
			PartialMessage:     symbolPool.new("PartialMessage", "./message.js").ToTypeOnly(),
			PlainMessage:       symbolPool.new("PlainMessage", "./message.js").ToTypeOnly(),
			FieldList:          symbolPool.new("FieldList", "./field-list.js").ToTypeOnly(),
			MessageType:        symbolPool.new("MessageType", "./message-type.js").ToTypeOnly(),
			BinaryReadOptions:  symbolPool.new("BinaryReadOptions", "./binary-format.js").ToTypeOnly(),
			BinaryWriteOptions: symbolPool.new("BinaryWriteOptions", "./binary-format.js").ToTypeOnly(),
			JsonReadOptions:    symbolPool.new("JsonReadOptions", "./json-format.js").ToTypeOnly(),
			JsonWriteOptions:   symbolPool.new("JsonWriteOptions", "./json-format.js").ToTypeOnly(),
			JsonValue:          symbolPool.new("JsonValue", "./json-format.js").ToTypeOnly(),
			JsonObject:         symbolPool.new("JsonObject", "./json-format.js").ToTypeOnly(),
			ProtoInt64:         symbolPool.new("protoInt64", "./proto-int64.js"),
			ScalarType:         symbolPool.new("ScalarType", "./field.js"),
			MethodKind:         symbolPool.new("MethodKind", "./service-type.js"),
			MethodIdempotency:  symbolPool.new("MethodIdempotency", "./service-type.js"),
		}
	}
	return &Runtime{
		ProtoN:             symbolPool.new(syntax.String(), runtimeImportPath),
		Message:            symbolPool.new("Message", runtimeImportPath),
		PartialMessage:     symbolPool.new("PartialMessage", runtimeImportPath).ToTypeOnly(),
		PlainMessage:       symbolPool.new("PlainMessage", runtimeImportPath).ToTypeOnly(),
		FieldList:          symbolPool.new("FieldList", runtimeImportPath).ToTypeOnly(),
		MessageType:        symbolPool.new("MessageType", runtimeImportPath).ToTypeOnly(),
		BinaryReadOptions:  symbolPool.new("BinaryReadOptions", runtimeImportPath).ToTypeOnly(),
		BinaryWriteOptions: symbolPool.new("BinaryWriteOptions", runtimeImportPath).ToTypeOnly(),
		JsonReadOptions:    symbolPool.new("JsonReadOptions", runtimeImportPath).ToTypeOnly(),
		JsonWriteOptions:   symbolPool.new("JsonWriteOptions", runtimeImportPath).ToTypeOnly(),
		JsonValue:          symbolPool.new("JsonValue", runtimeImportPath).ToTypeOnly(),
		JsonObject:         symbolPool.new("JsonObject", runtimeImportPath).ToTypeOnly(),
		ProtoInt64:         symbolPool.new("protoInt64", runtimeImportPath),
		ScalarType:         symbolPool.new("ScalarType", runtimeImportPath),
		MethodKind:         symbolPool.new("MethodKind", runtimeImportPath),
		MethodIdempotency:  symbolPool.new("MethodIdempotency", runtimeImportPath),
	}
}
