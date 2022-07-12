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

package main

import (
	"github.com/bufbuild/protobuf-es/cmd/protoc-gen-es/internal/gendts"
	"github.com/bufbuild/protobuf-es/cmd/protoc-gen-es/internal/genjs"
	"github.com/bufbuild/protobuf-es/cmd/protoc-gen-es/internal/gents"
	"github.com/bufbuild/protobuf-es/private/protoplugin"
	"google.golang.org/protobuf/types/pluginpb"
)

// version is the semantic version of the protobuf-es module.
const version = "v0.0.8"

func main() {
	protoplugin.Options{
		Name:    "protoc-gen-es",
		Version: version,
	}.Pipe(func(gen *protoplugin.Generator) error {
		gen.SupportedFeatures = uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL)
		for _, file := range gen.Files {
			if !file.Generate {
				continue
			}
			for _, target := range gen.Targets {
				switch target {
				case protoplugin.TargetTypeScript:
					gents.GenerateFile(gen, file)
				case protoplugin.TargetJavaScript:
					genjs.GenerateFile(gen, file)
				case protoplugin.TargetTypeDeclaration:
					gendts.GenerateFile(gen, file)
				}
			}
		}
		return nil
	})
}
