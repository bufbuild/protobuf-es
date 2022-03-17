#!/usr/bin/env node

const { basename } = require("path");

// TODO(tstamm) shim for failed installation/yarn berry/windows/missing optional dependency

process.stderr.write(`Failed to locate the binary for ${basename(__dirname)}.
Platform: ${process.platform}
Architecture: ${process.arch}
`);
process.exit(1);
