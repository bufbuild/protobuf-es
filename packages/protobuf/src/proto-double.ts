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

// Export global Number constants. This is done so that we can safely use
// these global constants when generating code and be assured we're using
// the correct values. We cannot rely on globalThis since we support ES2017
// and globalThis was introduced in ES2020. We also don't want to explicitly
// generate code using, for example, Number.NaN, since this could clash with
// a message name of Number. Instead we can export them here since this will
// be in a different scope as the generated code and we are guaranteed to use
// the intended global values.
export const protoDouble = {
  NaN: Number.NaN,
  POSITIVE_INFINITY: Number.POSITIVE_INFINITY,
  NEGATIVE_INFINITY: Number.NEGATIVE_INFINITY,
} as const;
