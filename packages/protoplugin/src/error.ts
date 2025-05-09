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

export class PluginOptionError extends Error {
  override name = "PluginOptionError";

  constructor(option: string, reason?: unknown) {
    const detail = reason !== undefined ? reasonToString(reason) : "";
    super(
      detail.length > 0
        ? `invalid option "${option}": ${detail}`
        : `invalid option "${option}"`,
    );
  }
}

export function reasonToString(reason: unknown): string {
  if (reason instanceof Error) {
    return reason.message;
  }
  if (typeof reason === "string") {
    return reason;
  }
  return String(reason);
}

export function isPluginOptionError(arg: unknown): arg is PluginOptionError {
  if (!(arg instanceof Error)) {
    return false;
  }
  return arg.name === "PluginOptionError";
}
