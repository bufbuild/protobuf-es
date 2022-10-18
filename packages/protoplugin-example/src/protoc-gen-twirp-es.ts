#!/usr/bin/env npx tsx

import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import { generateTs } from "./typescript.js";
import { version } from "../package.json";
import { runNodeJs } from "@bufbuild/protoplugin";

export const protocGenTwirpEs = createEcmaScriptPlugin({
  name: "protoc-gen-twirp-es",
  version: `v${String(version)}`,
  generateTs,
});

runNodeJs(protocGenTwirpEs);
