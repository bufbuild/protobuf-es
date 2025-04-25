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

import { TimeOfDay } from "./google/type/timeofday_pb";
import { Quaternion } from "./google/type/quaternion_pb";
import { PostalAddress } from "./google/type/postal_address_pb";
import { PhoneNumber } from "./google/type/phone_number_pb";


// google/type/timeofday.proto
console.log(new TimeOfDay().serializeBinary().length);
// google/type/quaternion.proto
console.log(new Quaternion().serializeBinary().length);
// google/type/postal_address.proto
console.log(new PostalAddress().serializeBinary().length);
// google/type/phone_number.proto
console.log(new PhoneNumber().serializeBinary().length);
