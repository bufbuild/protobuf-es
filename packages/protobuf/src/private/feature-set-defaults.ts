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

import { FeatureSetDefaults } from "../google/protobuf/descriptor_pb.js";
import { protoBase64 } from "../proto-base64.js";

export const featureSetDefaults = FeatureSetDefaults.fromBinary(
  protoBase64.dec(
    /*upstream-inject-feature-defaults-start*/"ChESDAgBEAIYAiABKAEwAhjmBwoREgwIAhABGAEgAigBMAEY5wcKERIMCAEQARgBIAIoATABGOgHIOYHKOgH"/*upstream-inject-feature-defaults-end*/,
  ),
);
