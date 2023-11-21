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

export declare class UpstreamProtobuf {
  constructor(temp?: string, version?: string);

  getProtocPath(): Promise<string>;

  getFeatureSetDefaults(
    minimumEdition?: string,
    maximumEdition?: string,
  ): Promise<Uint8Array>;

  compileToDescriptorSet(fileContent: string): Promise<Uint8Array>;
  compileToDescriptorSet(files: Record<string, string>): Promise<Uint8Array>;
}
