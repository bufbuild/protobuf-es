#!/usr/bin/env node

// Copyright 2021-2023 Buf Technologies, Inc.
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

import {argv, exit, stdout, stderr} from "node:process";
import {parseArgs} from "node:util";
import {readFileSync, writeFileSync} from "node:fs";
import {UpstreamProtobuf} from "../index.mjs";

void main(argv.slice(2));

async function main(args) {
    let min, max, positionals;
    try {
        ({values: {min, max}, positionals} = parseArgs({
            args,
            options: {
                min: { type: 'string' },
                max: { type: 'string' },
            },
            allowPositionals: true,
        }));
    } catch {
        exitUsage();
    }
    const upstream = new UpstreamProtobuf();
    const defaults = await upstream.getFeatureSetDefaults(min, max);
    stdout.write(`Injecting google.protobuf.FeatureSetDefaults into ${positionals.length} files...\n`);
    for (const path of positionals) {
        const content = readFileSync(path, "utf-8");
        const r = inject(content, `"${defaults.toString("base64url")}"`);
        if (!r.ok) {
            stderr.write(`Error injecting into ${path}: ${r.message}\n`);
            exit(1);
        }
        if (r.newContent === content) {
            stdout.write(`- ${path} - no changes\n`);
            continue;
        }
        writeFileSync(path, r.newContent);
        stdout.write(`- ${path} - updated\n`);
    }
}

/**
 * @typedef {object} InjectSuccess
 * @property {true} ok
 * @property {string} newContent
 */
/**
 * @typedef {object} InjectError
 * @property {false} ok
 * @property {string} message
 */
/**
 * @param {string} content
 * @param {string} contentToInject
 * @return {InjectSuccess | InjectError}
 */
function inject(content, contentToInject) {
    const tokenStart = "/*upstream-inject-feature-defaults-start*/";
    const tokenEnd = "/*upstream-inject-feature-defaults-end*/";
    const indexStart = content.indexOf(tokenStart);
    const indexEnd = content.indexOf(tokenEnd);
    if (indexStart < 0 || indexEnd < 0) {
        return {ok: false, message: "missing comment annotations"};
    }
    if (indexEnd < indexStart) {
        return {ok: false, message: "invalid comment annotations"};
    }
    const head = content.substring(0, indexStart + tokenStart.length);
    const foot = content.substring(indexEnd);
    const newContent = head + contentToInject + foot;
    return {ok: true, newContent};
}

/**
 * @return never
 */
function exitUsage() {
    stderr.write(`USAGE: upstream-inject-feature-defaults [--min <mininum supported edition>] [--max <maximum supported edition>] <file-to-inject-into>\n`);
    exit(1);
}
