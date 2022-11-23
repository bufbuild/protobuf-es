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

import type { PlainMessage } from "@bufbuild/protobuf";
import { NullValue, protoInt64, Timestamp } from "@bufbuild/protobuf";
import {
  TestAllTypesProto3,
  TestAllTypesProto3_NestedEnum,
  ForeignEnum,
  TestAllTypesProto3_AliasedEnum,
} from "./gen/ts/google/protobuf/test_messages_proto3_pb.js";

describe("PlainMessage", () => {
  test("keeps regular fields", () => {
    const msg: PlainMessage<TestAllTypesProto3> = {
      optionalInt32: 0,
      optionalInt64: protoInt64.zero,
      optionalUint32: 0,
      optionalUint64: protoInt64.zero,
      optionalSint32: 0,
      optionalSint64: protoInt64.zero,
      optionalFixed32: 0,
      optionalFixed64: protoInt64.zero,
      optionalSfixed32: 0,
      optionalSfixed64: protoInt64.zero,
      optionalFloat: 0,
      optionalDouble: 0,
      optionalBool: false,
      optionalString: "",
      optionalBytes: new Uint8Array(0),
      optionalNestedEnum: TestAllTypesProto3_NestedEnum.FOO,
      optionalForeignEnum: ForeignEnum.FOREIGN_FOO,
      optionalAliasedEnum: TestAllTypesProto3_AliasedEnum.ALIAS_FOO,
      optionalStringPiece: "",
      optionalCord: "",
      repeatedInt32: [],
      repeatedInt64: [],
      repeatedUint32: [],
      repeatedUint64: [],
      repeatedSint32: [],
      repeatedSint64: [],
      repeatedFixed32: [],
      repeatedFixed64: [],
      repeatedSfixed32: [],
      repeatedSfixed64: [],
      repeatedFloat: [],
      repeatedDouble: [],
      repeatedBool: [],
      repeatedString: [],
      repeatedBytes: [],
      repeatedNestedMessage: [],
      repeatedForeignMessage: [],
      repeatedNestedEnum: [],
      repeatedForeignEnum: [],
      repeatedStringPiece: [],
      repeatedCord: [],
      packedInt32: [],
      packedInt64: [],
      packedUint32: [],
      packedUint64: [],
      packedSint32: [],
      packedSint64: [],
      packedFixed32: [],
      packedFixed64: [],
      packedSfixed32: [],
      packedSfixed64: [],
      packedFloat: [],
      packedDouble: [],
      packedBool: [],
      packedNestedEnum: [],
      unpackedInt32: [],
      unpackedInt64: [],
      unpackedUint32: [],
      unpackedUint64: [],
      unpackedSint32: [],
      unpackedSint64: [],
      unpackedFixed32: [],
      unpackedFixed64: [],
      unpackedSfixed32: [],
      unpackedSfixed64: [],
      unpackedFloat: [],
      unpackedDouble: [],
      unpackedBool: [],
      unpackedNestedEnum: [],
      mapInt32Int32: {},
      mapInt64Int64: {},
      mapUint32Uint32: {},
      mapUint64Uint64: {},
      mapSint32Sint32: {},
      mapSint64Sint64: {},
      mapFixed32Fixed32: {},
      mapFixed64Fixed64: {},
      mapSfixed32Sfixed32: {},
      mapSfixed64Sfixed64: {},
      mapInt32Float: {},
      mapInt32Double: {},
      mapBoolBool: {},
      mapStringString: {},
      mapStringBytes: {},
      mapStringNestedMessage: {},
      mapStringForeignMessage: {},
      mapStringNestedEnum: {},
      mapStringForeignEnum: {},
      oneofField: { case: undefined },
      repeatedBoolWrapper: [],
      repeatedInt32Wrapper: [],
      repeatedInt64Wrapper: [],
      repeatedUint32Wrapper: [],
      repeatedUint64Wrapper: [],
      repeatedFloatWrapper: [],
      repeatedDoubleWrapper: [],
      repeatedStringWrapper: [],
      repeatedBytesWrapper: [],
      optionalNullValue: NullValue.NULL_VALUE,
      repeatedDuration: [],
      repeatedTimestamp: [],
      repeatedFieldmask: [],
      repeatedStruct: [],
      repeatedAny: [],
      repeatedValue: [],
      repeatedListValue: [],
      fieldname1: 0,
      fieldName2: 0,
      FieldName3: 0,
      fieldName4: 0,
      field0name5: 0,
      field0Name6: 0,
      fieldName7: 0,
      FieldName8: 0,
      fieldName9: 0,
      FieldName10: 0,
      FIELDNAME11: 0,
      FIELDName12: 0,
      FieldName13: 0,
      FieldName14: 0,
      fieldName15: 0,
      fieldName16: 0,
      fieldName17: 0,
      FieldName18: 0,
    };

    msg.optionalTimestamp = Timestamp.now();

    expect(msg).toBeDefined();

    // @ts-expect-error TS2339
    expect(msg.toBinary).toBeUndefined();

    // Test that PlainMessage is recursive w/r/t to nested fields
    // We want to test that the type system sees this function as undefined even though it's still actually there.  So
    // we expect TS error  TS2339, but add a simple test so Jest doesn't complain there's no expectations.
    // @ts-expect-error TS2339
    expect(msg.optionalTimestamp.toDate).toBeDefined();
  });
});
