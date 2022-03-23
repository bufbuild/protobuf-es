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

package genjs

import (
	"strings"

	"github.com/bufbuild/protobuf-es/cmd/protoc-gen-es/internal/gencommon"
	"github.com/bufbuild/protobuf-es/private/protoplugin"
)

func GenerateFile(gen *protoplugin.Generator, file *protoplugin.File) {
	f := gen.NewGeneratedFile(file.Name + "_pb.js")
	f.ImportPath = file.StandardImportPath
	f.H(file.Preamble)
	for _, enum := range file.Enums {
		generateEnum(f, enum)
		f.P()
	}
	for _, message := range file.Messages {
		generateMessage(f, message)
		f.P()
	}
	// We do not generate anything for services, and we do not support extensions at this time
}

func generateEnum(f *protoplugin.GeneratedFile, enum *protoplugin.Enum) {
	rt := enum.File.RuntimeSymbols
	f.P(enum.JSDoc(""))
	f.P("export const ", enum.Symbol, " = ", rt.ProtoN, ".makeEnum(")
	f.P(`    "`, enum.TypeName, `",`)
	f.P(`    [`)
	for _, value := range enum.Values {
		f.P("        {no: ", value.Proto.GetNumber(), ", name: \"", value.Proto.GetName(), "\"},")
	}
	f.P(`    ]`)
	f.P(");")
	f.P()
}

func generateMessage(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
	rt := message.File.RuntimeSymbols
	needsLocalName := message.Proto.GetName() != message.Symbol.Name // if localName is not inferrable, we need to provide it
	f.P(message.JSDoc(""))
	f.P("export const ", message.Symbol, " = ", rt.ProtoN, ".makeMessageType(")
	f.P(`    "`, message.TypeName, `",`)
	if len(message.Fields) == 0 {
		f.P("    [],")
	} else {
		f.P("    () => [")
		for _, field := range message.Fields {
			generateFieldInfo(f, field)
		}
		f.P("    ],")
	}
	if needsLocalName {
		f.P(`    {localName: "`, message.Symbol, `"},`)
	}
	f.P(");")
	f.P()
	generateWktMethods(f, message)
	generateWktStaticMethods(f, message)
	for _, nestedEnum := range message.NestedEnums {
		generateEnum(f, nestedEnum)
		f.P()
	}
	for _, nestedMessage := range message.NestedMessages {
		generateMessage(f, nestedMessage)
		f.P()
	}
	// We do not support extensions at this time
}

func generateFieldInfo(f *protoplugin.GeneratedFile, field *protoplugin.Field) {
	rt := field.Parent.File.RuntimeSymbols

	e := make([]interface{}, 0)
	e = append(e, "        {no: ", field.Proto.GetNumber(), `, name: "`, field.Proto.GetName(), `", `)

	if field.JSONName != "" {
		e = append(e, `jsonName: "`, field.JSONName, `", `)
	}

	switch field.Kind {
	case protoplugin.FieldKindScalar:
		t := strings.TrimPrefix(field.Scalar.String(), "TYPE_")
		e = append(e, `kind: "scalar", T: `, int32(field.Scalar), ` /* ScalarType.`, t, ` */, `)

	case protoplugin.FieldKindMap:
		t := strings.TrimPrefix(field.Map.Key.String(), "TYPE_")
		e = append(e, `kind: "map", K: `, int32(field.Map.Key), ` /* ScalarType.`, t, ` */, `)
		switch field.Map.ValueKind {
		case protoplugin.FieldKindScalar:
			t := strings.TrimPrefix(field.Scalar.String(), "TYPE_")
			e = append(e, `V: {kind: "scalar", T: `, int32(field.Map.ValueScalar), ` /* ScalarType.`, t, ` */}, `)
		case protoplugin.FieldKindMessage:
			e = append(e, `V: {kind: "message", T: `, field.Map.ValueMessage.Symbol, `}, `)
		case protoplugin.FieldKindEnum:
			e = append(e, `V: {kind: "enum", T: `, rt.ProtoN, `.getEnumType(`, field.Map.ValueEnum.Symbol, `)}, `)
		}

	case protoplugin.FieldKindMessage:
		e = append(e, `kind: "message", T: `, field.Message.Symbol, `, `)

	case protoplugin.FieldKindEnum:
		e = append(e, `kind: "enum", T: `, rt.ProtoN, `.getEnumType(`, field.Enum.Symbol, `), `)
	}

	if field.Repeated {
		e = append(e, `repeated: true, `)
		if field.Packed != field.PackedByDefault {
			e = append(e, `packed: `, field.Packed, `, `)
		}
	}

	if field.Optional {
		e = append(e, `opt: true, `)
	}

	if expr, _ := gencommon.GetFieldExplicitDefaultValue(field); expr != nil {
		e = append(e, `default: `, expr, `, `)
	}

	if field.Oneof != nil {
		e = append(e, `oneof: "`, field.Oneof.Proto.GetName(), `", `)
	}

	if l, ok := e[len(e)-1].(string); ok && strings.HasSuffix(l, ", ") {
		e = append(e[:len(e)-1], strings.TrimSuffix(l, ", ")) // remove trailing ", "
	}
	e = append(e, "},")
	f.P(e...)
}

func generateWktMethods(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
	rt := message.File.RuntimeSymbols
	if ok, ref := gencommon.MatchWktAny(message); ok {
		f.P(message.Symbol, ".prototype.toJson = function toJson(options) {")
		f.P(`        if (this.`, ref.TypeURL.LocalName, ` === "") {`)
		f.P("            return {};")
		f.P("        }")
		f.P("        const typeName = this.typeUrlToName(this.", ref.TypeURL.LocalName, ");")
		f.P("        const messageType = options?.typeRegistry?.findMessage(typeName);")
		f.P("        if (!messageType) {")
		f.P("            throw new Error(`cannot encode message ", message.TypeName, " to JSON: \"${this.", ref.TypeURL.LocalName, "}\" is not in the type registry`);")
		f.P("        }")
		f.P("        const message = messageType.fromBinary(this.", ref.Value.LocalName, ");")
		f.P("        let json = message.toJson(options);")
		f.P(`        if (typeName.startsWith("google.protobuf.") || (json === null || Array.isArray(json) || typeof json !== "object")) {`)
		f.P("            json = {value: json};")
		f.P("        }")
		f.P(`        json["@type"] = this.`, ref.TypeURL.LocalName, `;`)
		f.P("        return json;")
		f.P("    };")
		f.P()
		f.P(message.Symbol, ".prototype.fromJson = function fromJson(json, options) {")
		f.P(`        if (json === null || Array.isArray(json) || typeof json != "object") {`)
		f.P("            throw new Error(`cannot decode message ", message.TypeName, " from JSON: expected object but got ${json === null ? \"null\" : Array.isArray(json) ? \"array\" : typeof json}`);")
		f.P("        }")
		f.P(`        const typeUrl = json["@type"];`)
		f.P(`        if (typeof typeUrl != "string" || typeUrl == "") {`)
		f.P("            throw new Error(`cannot decode message ", message.TypeName, " from JSON: \"@type\" is empty`);")
		f.P("        }")
		f.P("        const typeName = this.typeUrlToName(typeUrl), messageType = options?.typeRegistry?.findMessage(typeName);")
		f.P("        if (!messageType) {")
		f.P("            throw new Error(`cannot decode message ", message.TypeName, " from JSON: ${typeUrl} is not in the type registry`);")
		f.P("        }")
		f.P("        let message;")
		f.P(`        if (typeName.startsWith("google.protobuf.") &&  Object.prototype.hasOwnProperty.call(json, "value")) {`)
		f.P(`            message = messageType.fromJson(json["value"], options);`)
		f.P("        } else {")
		f.P("            const copy = Object.assign({}, json);")
		f.P(`            delete copy["@type"];`)
		f.P("            message = messageType.fromJson(copy, options);")
		f.P("        }")
		f.P("        this.packFrom(message);")
		f.P("        return this;")
		f.P("    };")
		f.P()
		f.P(message.Symbol, ".prototype.packFrom = function packFrom(message) {")
		f.P("        this.", ref.Value.LocalName, " = message.toBinary();")
		f.P("        this.", ref.TypeURL.LocalName, " = this.typeNameToUrl(message.getType().typeName);")
		f.P("    };")
		f.P()
		f.P(message.Symbol, ".prototype.unpackTo = function unpackTo(target) {")
		f.P("    unpackTo(target) {")
		f.P("        if (!this.is(target.getType())) {")
		f.P("            return false;")
		f.P("        }")
		f.P("        target.fromBinary(this.", ref.Value.LocalName, ");")
		f.P("        return true;")
		f.P("    };")
		f.P()
		f.P(message.Symbol, ".prototype.is = function is(type) {")
		f.P("    is(type) {")
		f.P("        return this.", ref.TypeURL.LocalName, " === this.typeNameToUrl(type.typeName);")
		f.P("    };")
		f.P()
		f.P(message.Symbol, ".prototype.typeNameToUrl = function typeNameToUrl(name) {")
		f.P("        return `type.googleapis.com/${name}`;")
		f.P("    };")
		f.P()
		f.P(message.Symbol, ".prototype.typeUrlToName = function typeUrlToName(url) {")
		f.P("        if (!url.length) {")
		f.P("            throw new Error(`invalid type url: ${url}`);")
		f.P("        }")
		f.P(`        const slash = url.lastIndexOf("/");`)
		f.P("        const name = slash > 0 ? url.substring(slash + 1) : url;")
		f.P("        if (!name.length) {")
		f.P("            throw new Error(`invalid type url: ${url}`);")
		f.P("        }")
		f.P("        return name;")
		f.P("    };")
		f.P()
	}
	if ok, ref := gencommon.MatchWktDuration(message); ok {
		f.P(message.Symbol, ".prototype.fromJson = function fromJson(json, options) {")
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
		f.P("        this.", ref.Seconds.LocalName, " = ", rt.ProtoInt64, ".parse(longSeconds);")
		f.P(`        if (typeof match[2] == "string") {`)
		f.P(`            const nanosStr = match[2] + "0".repeat(9 - match[2].length);`)
		f.P("            this.", ref.Nanos.LocalName, " = parseInt(nanosStr);")
		f.P("            if (longSeconds < 0n) {")
		f.P("                this.", ref.Nanos.LocalName, " = -this.", ref.Nanos.LocalName, ";")
		f.P("            }")
		f.P("        }")
		f.P("        return this;")
		f.P("    };")
		f.P()
		f.P(message.Symbol, ".prototype.toJson = function toJson(options) {")
		f.P("        if (Number(this.", ref.Seconds.LocalName, ") > 315576000000 || Number(this.", ref.Seconds.LocalName, ") < -315576000000) {")
		f.P("            throw new Error(`cannot encode ", message.TypeName, " to JSON: value out of range`);")
		f.P("        }")
		f.P("        let text = this.", ref.Seconds.LocalName, ".toString();")
		f.P("        if (this.", ref.Nanos.LocalName, " !== 0) {")
		f.P("            let nanosStr = Math.abs(this.", ref.Nanos.LocalName, ").toString();")
		f.P(`            nanosStr = "0".repeat(9 - nanosStr.length) + nanosStr;`)
		f.P(`            if (nanosStr.substring(3) === "000000") {`)
		f.P("                nanosStr = nanosStr.substring(0, 3);")
		f.P(`            } else if (nanosStr.substring(6) === "000") {`)
		f.P("                nanosStr = nanosStr.substring(0, 6);")
		f.P(`            }`)
		f.P(`            text += "." + nanosStr;`)
		f.P("        }")
		f.P(`        return text + "s";`)
		f.P("    };")
		f.P()
	}
	if ok, ref := gencommon.MatchWktFieldMask(message); ok {
		f.P(message.Symbol, ".prototype.toJson = function toJson(options) {")
		f.P(`        // Converts snake_case to protoCamelCase according to the convention`)
		f.P(`        // used by protoc to convert a field name to a JSON name.`)
		f.P(`        function protoCamelCase(snakeCase: string): string {`)
		f.P(`            let capNext = false;`)
		f.P(`            const b = [];`)
		f.P(`            for (let i = 0; i < snakeCase.length; i++) {`)
		f.P(`                let c = snakeCase.charAt(i);`)
		f.P(`                switch (c) {`)
		f.P(`                    case '_':`)
		f.P(`                        capNext = true;`)
		f.P(`                        break;`)
		f.P(`                    case '0':`)
		f.P(`                    case '1':`)
		f.P(`                    case '2':`)
		f.P(`                    case '3':`)
		f.P(`                    case '4':`)
		f.P(`                    case '5':`)
		f.P(`                    case '6':`)
		f.P(`                    case '7':`)
		f.P(`                    case '8':`)
		f.P(`                    case '9':`)
		f.P(`                        b.push(c);`)
		f.P(`                        capNext = false;`)
		f.P(`                        break;`)
		f.P(`                    default:`)
		f.P(`                        if (capNext) {`)
		f.P(`                            capNext = false;`)
		f.P(`                            c = c.toUpperCase();`)
		f.P(`                        }`)
		f.P(`                        b.push(c);`)
		f.P(`                        break;`)
		f.P(`                }`)
		f.P(`            }`)
		f.P(`            return b.join('');`)
		f.P(`        }`)
		f.P(`        return this.`, ref.Paths.LocalName, `.map(p => {`)
		f.P(`            if (p.match(/_[0-9]?_/g) || p.match(/[A-Z]/g)) {`)
		f.P(`                throw new Error("cannot decode `, message.TypeName, ` from JSON: lowerCamelCase of path name \"" + p + "\" is irreversible");`)
		f.P(`            }`)
		f.P(`            return protoCamelCase(p);`)
		f.P(`        }).join(",");`)
		f.P(`    };`)
		f.P()
		f.P(message.Symbol, ".prototype.fromJson = function fromJson(json, options) {")
		f.P(`        if (typeof json !== "string") {`)
		f.P(`            throw new Error("cannot decode `, message.TypeName, ` from JSON: " + proto3.json.debug(json));`)
		f.P(`        }`)
		f.P(`        if (json === "") {`)
		f.P(`            return this;`)
		f.P(`        }`)
		f.P(`        function camelToSnake (str) {`)
		f.P(`            if (str.includes("_")) {`)
		f.P(`                throw new Error("cannot decode `, message.TypeName, ` from JSON: path names must be lowerCamelCase");`)
		f.P(`            }`)
		f.P(`            const sc = str.replace(/[A-Z]/g, letter => "_" + letter.toLowerCase());`)
		f.P(`            return (sc[0] === "_") ? sc.substring(1) : sc;`)
		f.P(`        }`)
		f.P(`        this.`, ref.Paths.LocalName, ` = json.split(",").map(camelToSnake);`)
		f.P(`        return this;`)
		f.P(`    };`)
		f.P()
	}
	if ok, ref := gencommon.MatchWktStruct(message); ok {
		f.P(message.Symbol, ".prototype.toJson = function toJson(options) {")
		f.P("        const json = {}")
		f.P("        for (const [k, v] of Object.entries(this.", ref.Fields.LocalName, ")) {")
		f.P("            json[k] = v.toJson(options);")
		f.P("        }")
		f.P("        return json;")
		f.P("    };")
		f.P()
		f.P(message.Symbol, ".prototype.fromJson = function fromJson(json, options) {")
		f.P(`        if (typeof json != "object" || json == null || Array.isArray(json)) {`)
		f.P(`            throw new Error("cannot decode `, message.TypeName, ` from JSON " + `, rt.ProtoN, `.json.debug(json));`)
		f.P("        }")
		f.P("        for (const [k, v] of Object.entries(json)) {")
		f.P("            this.", ref.Fields.LocalName, "[k] = ", ref.Fields.Map.ValueMessage.Symbol, ".fromJson(v);")
		f.P("        }")
		f.P("        return this;")
		f.P("    };")
		f.P()
	}
	if ok, ref := gencommon.MatchWktValue(message); ok {
		f.P(message.Symbol, ".prototype.toJson = function toJson(options) {")
		f.P("        switch (this.", ref.Kind.LocalName, ".case) {")
		f.P(`            case "`, ref.NullValue.LocalName, `":`)
		f.P("                return null;")
		f.P(`            case "`, ref.BoolValue.LocalName, `":`)
		f.P(`            case "`, ref.NumberValue.LocalName, `":`)
		f.P(`            case "`, ref.StringValue.LocalName, `":`)
		f.P("                return this.", ref.Kind.LocalName, ".value;")
		f.P(`            case "`, ref.StructValue.LocalName, `":`)
		f.P(`            case "`, ref.ListValue.LocalName, `":`)
		f.P(`                return this.`, ref.Kind.LocalName, `.value.toJson({...options, emitDefaultValues: true});`)
		f.P("        }")
		f.P(`        throw new Error("`, message.TypeName, ` must have a value");`)
		f.P("    };")
		f.P()
		f.P(message.Symbol, ".prototype.fromJson = function fromJson(json, options) {")
		f.P("        switch (typeof json) {")
		f.P(`            case "number":`)
		f.P(`                this.kind = { case: "`, ref.NumberValue.LocalName, `", value: json };`)
		f.P("                break;")
		f.P(`            case "string":`)
		f.P(`                this.kind = { case: "`, ref.StringValue.LocalName, `", value: json };`)
		f.P("                break;")
		f.P(`            case "boolean":`)
		f.P(`                this.kind = { case: "`, ref.BoolValue.LocalName, `", value: json };`)
		f.P("                break;")
		f.P(`            case "object":`)
		f.P("                if (json === null) {")
		f.P(`                    this.kind = { case: "`, ref.NullValue.LocalName, `", value: `, ref.NullValue.Enum.Symbol, `.`, ref.NullValue.Enum.Values[0].LocalName, ` };`)
		f.P("                } else if (Array.isArray(json)) {")
		f.P(`                    this.kind = { case: "`, ref.ListValue.LocalName, `", value: `, ref.ListValue.Message.Symbol, `.fromJson(json) };`)
		f.P("                } else {")
		f.P(`                    this.kind = { case: "`, ref.StructValue.LocalName, `", value: `, ref.StructValue.Message.Symbol, `.fromJson(json) };`)
		f.P("                }")
		f.P("                break;")
		f.P("            default:")
		f.P(`                throw new Error("cannot decode `, message.TypeName, ` from JSON " + `, rt.ProtoN, `.json.debug(json));`)
		f.P("        }")
		f.P("        return this;")
		f.P("    };")
		f.P()
	}
	if ok, ref := gencommon.MatchWktListValue(message); ok {
		f.P(message.Symbol, ".prototype.toJson = function toJson(options) {")
		f.P(`        return this.`, ref.Values.LocalName, `.map(v => v.toJson());`)
		f.P(`    }`)
		f.P()
		f.P(message.Symbol, ".prototype.fromJson = function fromJson(json, options) {")
		f.P(`        if (!Array.isArray(json)) {`)
		f.P(`            throw new Error("cannot decode `, message.TypeName, ` from JSON " + `, rt.ProtoN, `.json.debug(json));`)
		f.P(`        }`)
		f.P(`        for (let e of json) {`)
		f.P(`            this.`, ref.Values.LocalName, `.push(`, ref.Values.Message.Symbol, `.fromJson(e));`)
		f.P(`        }`)
		f.P(`        return this;`)
		f.P(`    };`)
		f.P()
	}
	if ok, ref := gencommon.MatchWktTimestamp(message); ok {
		f.P(message.Symbol, ".prototype.fromJson = function fromJson(json, options) {")
		f.P(`        if (typeof json !== "string") {`)
		f.P("            throw new Error(`cannot decode ", message.TypeName, " from JSON: ${", rt.ProtoN, ".json.debug(json)}`);")
		f.P("        }")
		f.P(`        const matches = json.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);`)
		f.P("        if (!matches) {")
		f.P("            throw new Error(`cannot decode ", message.TypeName, " from JSON: invalid RFC 3339 string`);")
		f.P("        }")
		f.P(`        const ms = Date.parse(matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"));`)
		f.P("        if (Number.isNaN(ms)) {")
		f.P("            throw new Error(`cannot decode ", message.TypeName, " from JSON: invalid RFC 3339 string`);")
		f.P("        }")
		f.P(`        if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {`)
		f.P("            throw new Error(`cannot decode message ", message.TypeName, " from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);")
		f.P("        }")
		f.P("        this.", ref.Seconds.LocalName, " = ", rt.ProtoInt64, ".parse(ms / 1000);")
		f.P("        this.", ref.Nanos.LocalName, " = 0;")
		f.P("        if (matches[7]) {")
		f.P(`            this.`, ref.Nanos.LocalName, ` = (parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) - 1000000000);`)
		f.P("        }")
		f.P("        return this;")
		f.P("    };")
		f.P()
		f.P(message.Symbol, ".prototype.toJson = function toJson(options) {")
		f.P("        const ms = Number(this.", ref.Seconds.LocalName, ") * 1000;")
		f.P(`        if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {`)
		f.P("            throw new Error(`cannot encode ", message.TypeName, " to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);")
		f.P("        }")
		f.P("        if (this.", ref.Nanos.LocalName, " < 0) {")
		f.P("            throw new Error(`cannot encode ", message.TypeName, " to JSON: nanos must not be negative`);")
		f.P("        }")
		f.P(`        let z = "Z";`)
		f.P("        if (this.", ref.Nanos.LocalName, " > 0) {")
		f.P("            const nanosStr = (this.", ref.Nanos.LocalName, " + 1000000000).toString().substring(1);")
		f.P(`            if (nanosStr.substring(3) === "000000") {`)
		f.P(`                z = "." + nanosStr.substring(0, 3) + "Z";`)
		f.P(`            } else if (nanosStr.substring(6) === "000") {`)
		f.P(`                z = "." + nanosStr.substring(0, 6) + "Z";`)
		f.P("            } else {")
		f.P(`                z = "." + nanosStr + "Z";`)
		f.P("            }")
		f.P("        }")
		f.P(`        return new Date(ms).toISOString().replace(".000Z", z);`)
		f.P("    };")
		f.P()
		f.P(message.Symbol, ".prototype.typeUrlToName = function typeUrlToName(url) {")
		f.P("    toDate(): Date {")
		f.P("        return new Date(Number(this.", ref.Seconds.LocalName, ") * 1000 + Math.ceil(this.", ref.Nanos.LocalName, " / 1000000));")
		f.P("    };")
		f.P()
	}
	if ok, ref := gencommon.MatchWktWrapper(message); ok {
		t := strings.TrimPrefix(ref.Value.Scalar.String(), "TYPE_")
		f.P(message.Symbol, ".prototype.typeUrlToName = function toJson(options) {")
		f.P("        return proto3.json.writeScalar(", rt.ScalarType, ".", t, ", this.value, true);")
		f.P("    };")
		f.P()
		f.P(message.Symbol, ".prototype.fromJson = function fromJson(json, options) {")
		f.P("        try {")
		f.P("            this.value = ", rt.ProtoN, ".json.readScalar(", rt.ScalarType, ".", t, ", json);")
		f.P("        } catch (e) {")
		f.P("            let m = `cannot decode message ", message.TypeName, " from JSON\"`;")
		f.P("            if (e instanceof Error && e.message.length > 0) {")
		f.P("                m += `: ${e.message}`")
		f.P("            }")
		f.P("            throw new Error(m);")
		f.P("        }")
		f.P("        return this;")
		f.P("    };")
		f.P()
	}
}

func generateWktStaticMethods(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
	rt := message.File.RuntimeSymbols
	if ok, _ := gencommon.MatchWktAny(message); ok {
		f.P(message.Symbol, ".pack = function pack(message) {")
		f.P("    const any = new ", message.Symbol, "();")
		f.P("    any.packFrom(message);")
		f.P("    return any;")
		f.P("};")
		f.P()
	}
	if ok, ref := gencommon.MatchWktTimestamp(message); ok {
		f.P(message.Symbol, ".now = function now() {")
		f.P("    return ", message.Symbol, ".fromDate(new Date())")
		f.P("};")
		f.P()
		f.P(message.Symbol, ".fromDate = function fromDate(date) {")
		f.P("    const ms = date.getTime();")
		f.P("    return new ", message.Symbol, "({")
		f.P("        ", ref.Seconds.LocalName, ": ", rt.ProtoInt64, ".parse(Math.floor(ms / 1000)),")
		f.P("        ", ref.Nanos.LocalName, ": (ms % 1000) * 1000000,")
		f.P("    });")
		f.P("};")
		f.P()
	}
	if ok, ref := gencommon.MatchWktWrapper(message); ok {
		f.P(message.Symbol, ".fieldWrapper = {")
		f.P("    wrapField(value) {")
		f.P("        return value instanceof ", message.Symbol, " ? value : new ", message.Symbol, "({value});")
		f.P("    },")
		f.P("    unwrapField(value) {")
		f.P("        return value.", ref.Value.LocalName, ";")
		f.P("    }")
		f.P("};")
		f.P()
	}
}
