#!/usr/bin/env node

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

import { createWriteStream } from "node:fs";
import { stdin, stdout } from "node:process";

// Dump the binary google.protobuf.CodeGenerateRequest from stdin to a file.
stdin.pipe(createWriteStream("dumpcodegenreq.binpb"));

// Write a minimal a google.protobuf.CodeGenerateResponse to stdout.
/*
import {create, toBinary} from "@bufbuild/protobuf";
import {CodeGeneratorResponse_Feature, CodeGeneratorResponseSchema, Edition} from "@bufbuild/protobuf/wkt";
const res = create(CodeGeneratorResponseSchema, {
  supportedFeatures: BigInt(
    CodeGeneratorResponse_Feature.SUPPORTS_EDITIONS | CodeGeneratorResponse_Feature.PROTO3_OPTIONAL
  ),
  minimumEdition: Edition.EDITION_LEGACY,
  maximumEdition: Edition.EDITION_MAX,
});
console.log(
  toBinary(CodeGeneratorResponseSchema, res)
);
*/
const minimalResponse = new Uint8Array([
  16, 3, 24, 132, 7, 32, 255, 255, 255, 255, 7,
]);
stdout.write(minimalResponse);
