#!/usr/bin/env node

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

import { createWriteStream } from "node:fs";
import { stdin, stdout } from "node:process";

// Dump the binary google.protobuf.CodeGenerateRequest from stdin to a file.
stdin.pipe(createWriteStream("dumpcodegenreq.bin"));

// Write a minimal a google.protobuf.CodeGenerateResponse to stdout.
// This is just the field supported_features set to a bitwise "or" of
// FEATURE_PROTO3_OPTIONAL and FEATURE_SUPPORTS_EDITIONS. See the code snippet
// below.
const minimalResponse = new Uint8Array([16, 3]);
stdout.write(minimalResponse);

/*
import {CodeGeneratorResponse, CodeGeneratorResponse_Feature} from "@bufbuild/protobuf";
const bytes = new CodeGeneratorResponse({
  supportedFeatures: BigInt(
    CodeGeneratorResponse_Feature.PROTO3_OPTIONAL | CodeGeneratorResponse_Feature.SUPPORTS_EDITIONS
  ),
}).toBinary();
console.log(Array.from(bytes));
*/
