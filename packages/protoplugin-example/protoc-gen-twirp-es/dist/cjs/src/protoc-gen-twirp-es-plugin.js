"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.protocGenTwirpEs = void 0;
const protoplugin_1 = require("@bufbuild/protoplugin");
const typescript_js_1 = require("./typescript.js");
const package_json_1 = require("../package.json");
exports.protocGenTwirpEs = (0, protoplugin_1.createEcmaScriptPlugin)({
    name: "protoc-gen-twirp-es",
    version: `v${String(package_json_1.version)}`,
    generateTs: typescript_js_1.generateTs,
});
