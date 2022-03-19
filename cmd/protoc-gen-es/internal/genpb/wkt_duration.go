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

package genpb

import (
	"errors"
	"fmt"

	"github.com/bufbuild/protobuf-es/private/protoplugin"
	"google.golang.org/protobuf/types/descriptorpb"
)

type wktDuration struct {
	typeName         string
	fieldCount       int
	fieldNoSeconds   int32
	fieldNoNanos     int32
	fieldTypeSeconds descriptorpb.FieldDescriptorProto_Type
	fieldTypeNanos   descriptorpb.FieldDescriptorProto_Type
}

func (g wktDuration) matches(message *protoplugin.Message) bool {
	_, _, err := g.getFields(message)
	return err == nil
}

func (g wktDuration) getFields(message *protoplugin.Message) (seconds *protoplugin.Field, nanos *protoplugin.Field, err error) {
	if message.TypeName != g.typeName {
		return nil, nil, errors.New("type name")
	}
	if message.File.Syntax != protoplugin.ProtoSyntax3 {
		return nil, nil, errors.New("syntax")
	}
	if len(message.Fields) != g.fieldCount {
		return nil, nil, errors.New("field count")
	}
	for _, f := range message.Fields {
		switch f.Proto.GetNumber() {
		case g.fieldNoSeconds:
			seconds = f
		case g.fieldNoNanos:
			nanos = f
		}
	}
	if seconds == nil {
		return nil, nil, fmt.Errorf("missing field %d", g.fieldNoSeconds)
	}
	if nanos == nil {
		return nil, nil, fmt.Errorf("missing field %d", g.fieldNoNanos)
	}
	if seconds.Proto.GetType() != g.fieldTypeSeconds {
		return nil, nil, fmt.Errorf("want field %d type %s, got %s", g.fieldNoSeconds, g.fieldTypeSeconds, seconds.Proto.GetType())
	}
	if nanos.Proto.GetType() != g.fieldTypeNanos {
		return nil, nil, fmt.Errorf("want field %d type %s, got %s", g.fieldNoNanos, g.fieldTypeNanos, nanos.Proto.GetType())
	}
	return seconds, nanos, nil
}

func (g wktDuration) genWktMethods(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
	rt := message.File.RuntimeSymbols
	seconds, nanos, _ := g.getFields(message)
	f.P("    override fromJson(json: JsonValue, options?: Partial<", rt.JsonReadOptions, ">): this {")
	f.P(`        if (typeof json !== "string") {`)
	f.P("            throw new Error(`cannot decode ", message.TypeName, " from JSON: ${proto3.json.debug(json)}`);")
	f.P("        }")
	f.P(`        const match = json.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);`)
	f.P("        if (match === null) {")
	f.P("            throw new Error(`cannot decode ", message.TypeName, " from JSON: ${", rt.ProtoN, ".json.debug(json)}`);")
	f.P("        }")
	f.P("        const longSeconds = Number(match[1]);")
	f.P("        if (longSeconds > 315576000000 || longSeconds < -315576000000) {")
	f.P("            throw new Error(`cannot decode ", message.TypeName, " from JSON: ${", rt.ProtoN, ".json.debug(json)}`);")
	f.P("        }")
	f.P("        this.", seconds.LocalName, " = ", rt.ProtoInt64, ".parse(longSeconds);")
	f.P(`        if (typeof match[2] == "string") {`)
	f.P(`            const nanosStr = match[2] + "0".repeat(9 - match[2].length);`)
	f.P("            this.", nanos.LocalName, " = parseInt(nanosStr);")
	f.P("            if (longSeconds < 0n) {")
	f.P("                this.", nanos.LocalName, " = -this.", nanos.LocalName, ";")
	f.P("            }")
	f.P("        }")
	f.P("        return this;")
	f.P("    }")
	f.P()
	f.P("    override toJson(options?: Partial<", rt.JsonWriteOptions, ">): JsonValue {")
	f.P("        if (Number(this.", seconds.LocalName, ") > 315576000000 || Number(this.", seconds.LocalName, ") < -315576000000) {")
	f.P("            throw new Error(`cannot encode ", message.TypeName, " to JSON: value out of range`);")
	f.P("        }")
	f.P("        let text = this.", seconds.LocalName, ".toString();")
	f.P("        if (this.", nanos.LocalName, " !== 0) {")
	f.P("            let nanosStr = Math.abs(this.", nanos.LocalName, ").toString();")
	f.P(`            nanosStr = "0".repeat(9 - nanosStr.length) + nanosStr;`)
	f.P(`            if (nanosStr.substring(3) === "000000") {`)
	f.P("                nanosStr = nanosStr.substring(0, 3);")
	f.P(`            } else if (nanosStr.substring(6) === "000") {`)
	f.P("                nanosStr = nanosStr.substring(0, 6);")
	f.P(`            }`)
	f.P(`            text += "." + nanosStr;`)
	f.P("        }")
	f.P(`        return text + "s";`)
	f.P("    }")
	f.P()
}

func (g wktDuration) genWktStaticMethods(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
	// TODO
}
