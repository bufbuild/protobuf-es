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

// @generated by protoc-gen-es v2.0.0-alpha.2 with parameter "ts_nocheck=false,target=ts,import_extension=.js"
// @generated from file extra/name-clash.proto (package spec, syntax proto3)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage, GenDescService } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { User as User$1 } from "./example_pb.js";
import { fileDesc_extra_example } from "./example_pb.js";
import type { Message as Message$1 } from "@bufbuild/protobuf";

/**
 * Describes the file extra/name-clash.proto.
 */
export const fileDesc_extra_name_clash: GenDescFile = /*@__PURE__*/
  fileDesc("ChZleHRyYS9uYW1lLWNsYXNoLnByb3RvEgRzcGVjIh0KBFVzZXISFQoBdRgBIAEoCzIKLmRvY3MuVXNlciLtBwoVUmVzZXJ2ZWRQcm9wZXJ0eU5hbWVzGlQKB0J1aWx0SW4SEwoLY29uc3RydWN0b3IYAiABKAkSEQoJdG9fc3RyaW5nGAMgASgJEg8KB3RvX0pTT04YBCABKAkSEAoIdmFsdWVfb2YYBSABKAkatAEKB1J1bnRpbWUSDwoHdG9fanNvbhgEIAEoCRIMCgR0eXBlGAYgASgJEg0KBWNsb25lGAcgASgJEg4KBmVxdWFscxgIIAEoCRITCgtmcm9tX2JpbmFyeRgJIAEoCRIRCglmcm9tX2pzb24YCiABKAkSGAoQZnJvbV9qc29uX3N0cmluZxgLIAEoCRIRCgl0b19iaW5hcnkYDCABKAkSFgoOdG9fanNvbl9zdHJpbmcYDiABKAkabAoLT25lb2ZCdWx0SW4SFQoLY29uc3RydWN0b3IYASABKAlIABITCgl0b19zdHJpbmcYAiABKAlIABIRCgd0b19KU09OGAMgASgJSAASEgoIdmFsdWVfb2YYBCABKAlIAEIKCghidWlsdF9pbhrWAQoMT25lb2ZSdW50aW1lEhEKB3RvX2pzb24YBSABKAlIABIOCgR0eXBlGAYgASgJSAASDwoFY2xvbmUYByABKAlIABIQCgZlcXVhbHMYCCABKAlIABIVCgtmcm9tX2JpbmFyeRgJIAEoCUgAEhMKCWZyb21fanNvbhgKIAEoCUgAEhoKEGZyb21fanNvbl9zdHJpbmcYCyABKAlIABITCgl0b19iaW5hcnkYDCABKAlIABIYCg50b19qc29uX3N0cmluZxgOIAEoCUgAQgkKB3J1bnRpbWUiRQoLRW51bUJ1aWx0SW4SDwoLY29uc3RydWN0b3IQABIMCgh0b1N0cmluZxABEgoKBnRvSlNPThACEgsKB3ZhbHVlT2YQAyKpAQoTRW51bUJ1aWx0SW5QcmVmaXhlZBImCiJFTlVNX0JVSUxUX0lOX1BSRUZJWEVEX2NvbnN0cnVjdG9yEAASIwofRU5VTV9CVUlMVF9JTl9QUkVGSVhFRF90b1N0cmluZxABEiEKHUVOVU1fQlVJTFRfSU5fUFJFRklYRURfdG9KU09OEAISIgoeRU5VTV9CVUlMVF9JTl9QUkVGSVhFRF92YWx1ZU9mEAMijAEKC0VudW1SdW50aW1lEgoKBnRvSnNvbhAAEggKBHR5cGUQBhIJCgVjbG9uZRAHEgoKBmVxdWFscxAIEg4KCmZyb21CaW5hcnkQCRIMCghmcm9tSnNvbhAKEhIKDmZyb21Kc29uU3RyaW5nEAsSDAoIdG9CaW5hcnkQDBIQCgx0b0pzb25TdHJpbmcQDiILCglpbnRlcmZhY2UiCgoIZnVuY3Rpb24iDAoKaW5zdGFuY2VvZiIICgZzd2l0Y2giBgoEY2FzZSIICgZyZXR1cm4iCQoHTWVzc2FnZSIQCg5QYXJ0aWFsTWVzc2FnZSIOCgxQbGFpbk1lc3NhZ2UiLAoFRXJyb3ISEgoKZmllbGRfbmFtZRgBIAEoCRIPCgdtZXNzYWdlGAIgASgJIggKBk9iamVjdCIICgZvYmplY3QiBwoFYXJyYXkiCAoGc3RyaW5nIggKBm51bWJlciIJCgdib29sZWFuIggKBmJpZ2ludCIMCgpVaW50OEFycmF5IgcKBUFycmF5IggKBlN0cmluZyIICgZOdW1iZXIiCQoHQm9vbGVhbiIICgZCaWdJbnQiGwoLQ2xhc2hQYXJlbnQaDAoKQ2xhc2hDaGlsZCJxCg1Ob0NsYXNoRmllbGRzEg0KBWNvbnN0GAEgASgJEg4KBnN3aXRjaBgCIAEoCRIMCgRjYXNlGAMgASgJEhAKCGZ1bmN0aW9uGAQgASgJEhEKCWludGVyZmFjZRgFIAEoCRIOCgZyZXR1cm4YBiABKAkihAEKDE5vQ2xhc2hPbmVvZhIPCgVjb25zdBgBIAEoCUgAEhAKBnN3aXRjaBgCIAEoCUgAEg4KBGNhc2UYAyABKAlIABISCghmdW5jdGlvbhgEIAEoCUgAEhMKCWludGVyZmFjZRgFIAEoCUgAEhAKBnJldHVybhgGIAEoCUgAQgYKBGtpbmQiZgoPTm9DbGFzaE9uZW9mQURUEiIKAW0YASABKAsyFy5zcGVjLk5vQ2xhc2hPbmVvZkFEVC5NGi8KAU0SDAoEY2FzZRgBIAEoCRISCgV2YWx1ZRgCIAEoCUgAiAEBQggKBl92YWx1ZSJlCg9Ob0NsYXNoRW51bVdyYXAiUgoBWBIOCgppbnN0YW5jZW9mEAASCgoGc3dpdGNoEAESCAoEY2FzZRADEgwKCGZ1bmN0aW9uEAQSDQoJaW50ZXJmYWNlEAUSCgoGcmV0dXJuEAYyuAEKHFJlc2VydmVkUHJvcGVydHlOYW1lc1NlcnZpY2USJwoLY29uc3RydWN0b3ISCy5zcGVjLkVycm9yGgsuc3BlYy5FcnJvchIkCgh0b1N0cmluZxILLnNwZWMuRXJyb3IaCy5zcGVjLkVycm9yEiMKB3RvX0pTT04SCy5zcGVjLkVycm9yGgsuc3BlYy5FcnJvchIkCgh2YWx1ZV9vZhILLnNwZWMuRXJyb3IaCy5zcGVjLkVycm9yYgZwcm90bzM", [fileDesc_extra_example]);

/**
 * This message class will clash with the imported message class
 *
 * @generated from message spec.User
 */
export type User = Message$1<"spec.User"> & {
  /**
   * Reference the import with the same name to trigger a clash
   *
   * @generated from field: docs.User u = 1;
   */
  u?: User$1;
};

/**
 * Describes the message spec.User.
 * Use `create(UserDesc)` to create a new message.
 */
export const UserDesc: GenDescMessage<User> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 0);

/**
 * @generated from message spec.ReservedPropertyNames
 */
export type ReservedPropertyNames = Message$1<"spec.ReservedPropertyNames"> & {
};

/**
 * Describes the message spec.ReservedPropertyNames.
 * Use `create(ReservedPropertyNamesDesc)` to create a new message.
 */
export const ReservedPropertyNamesDesc: GenDescMessage<ReservedPropertyNames> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 1);

/**
 * @generated from message spec.ReservedPropertyNames.BuiltIn
 */
export type ReservedPropertyNames_BuiltIn = Message$1<"spec.ReservedPropertyNames.BuiltIn"> & {
  /**
   * built-in constructor()
   *
   * @generated from field: string constructor = 2;
   */
  constructor$: string;

  /**
   * built-in toString()
   *
   * @generated from field: string to_string = 3;
   */
  toString$: string;

  /**
   * built-in toJSON()
   *
   * @generated from field: string to_JSON = 4;
   */
  toJSON$: string;

  /**
   * built-in valueOf()
   *
   * @generated from field: string value_of = 5;
   */
  valueOf$: string;
};

/**
 * Describes the message spec.ReservedPropertyNames.BuiltIn.
 * Use `create(ReservedPropertyNames_BuiltInDesc)` to create a new message.
 */
export const ReservedPropertyNames_BuiltInDesc: GenDescMessage<ReservedPropertyNames_BuiltIn> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 1, 0);

/**
 * @generated from message spec.ReservedPropertyNames.Runtime
 */
export type ReservedPropertyNames_Runtime = Message$1<"spec.ReservedPropertyNames.Runtime"> & {
  /**
   * runtime toJson()
   *
   * @generated from field: string to_json = 4;
   */
  toJson: string;

  /**
   * runtime type()
   *
   * @generated from field: string type = 6;
   */
  type: string;

  /**
   * runtime clone()
   *
   * @generated from field: string clone = 7;
   */
  clone: string;

  /**
   * runtime equals()
   *
   * @generated from field: string equals = 8;
   */
  equals: string;

  /**
   * runtime fromBinary()
   *
   * @generated from field: string from_binary = 9;
   */
  fromBinary: string;

  /**
   * runtime fromJson()
   *
   * @generated from field: string from_json = 10;
   */
  fromJson: string;

  /**
   * runtime fromJsonString()
   *
   * @generated from field: string from_json_string = 11;
   */
  fromJsonString: string;

  /**
   * runtime toBinary()
   *
   * @generated from field: string to_binary = 12;
   */
  toBinary: string;

  /**
   * runtime toJsonString()
   *
   * @generated from field: string to_json_string = 14;
   */
  toJsonString: string;
};

/**
 * Describes the message spec.ReservedPropertyNames.Runtime.
 * Use `create(ReservedPropertyNames_RuntimeDesc)` to create a new message.
 */
export const ReservedPropertyNames_RuntimeDesc: GenDescMessage<ReservedPropertyNames_Runtime> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 1, 1);

/**
 * @generated from message spec.ReservedPropertyNames.OneofBultIn
 */
export type ReservedPropertyNames_OneofBultIn = Message$1<"spec.ReservedPropertyNames.OneofBultIn"> & {
  /**
   * @generated from oneof spec.ReservedPropertyNames.OneofBultIn.built_in
   */
  builtIn: {
    /**
     * @generated from field: string constructor = 1;
     */
    value: string;
    case: "constructor";
  } | {
    /**
     * @generated from field: string to_string = 2;
     */
    value: string;
    case: "toString";
  } | {
    /**
     * @generated from field: string to_JSON = 3;
     */
    value: string;
    case: "toJSON";
  } | {
    /**
     * @generated from field: string value_of = 4;
     */
    value: string;
    case: "valueOf";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message spec.ReservedPropertyNames.OneofBultIn.
 * Use `create(ReservedPropertyNames_OneofBultInDesc)` to create a new message.
 */
export const ReservedPropertyNames_OneofBultInDesc: GenDescMessage<ReservedPropertyNames_OneofBultIn> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 1, 2);

/**
 * @generated from message spec.ReservedPropertyNames.OneofRuntime
 */
export type ReservedPropertyNames_OneofRuntime = Message$1<"spec.ReservedPropertyNames.OneofRuntime"> & {
  /**
   * @generated from oneof spec.ReservedPropertyNames.OneofRuntime.runtime
   */
  runtime: {
    /**
     * @generated from field: string to_json = 5;
     */
    value: string;
    case: "toJson";
  } | {
    /**
     * @generated from field: string type = 6;
     */
    value: string;
    case: "type";
  } | {
    /**
     * @generated from field: string clone = 7;
     */
    value: string;
    case: "clone";
  } | {
    /**
     * @generated from field: string equals = 8;
     */
    value: string;
    case: "equals";
  } | {
    /**
     * @generated from field: string from_binary = 9;
     */
    value: string;
    case: "fromBinary";
  } | {
    /**
     * @generated from field: string from_json = 10;
     */
    value: string;
    case: "fromJson";
  } | {
    /**
     * @generated from field: string from_json_string = 11;
     */
    value: string;
    case: "fromJsonString";
  } | {
    /**
     * @generated from field: string to_binary = 12;
     */
    value: string;
    case: "toBinary";
  } | {
    /**
     * @generated from field: string to_json_string = 14;
     */
    value: string;
    case: "toJsonString";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message spec.ReservedPropertyNames.OneofRuntime.
 * Use `create(ReservedPropertyNames_OneofRuntimeDesc)` to create a new message.
 */
export const ReservedPropertyNames_OneofRuntimeDesc: GenDescMessage<ReservedPropertyNames_OneofRuntime> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 1, 3);

/**
 * @generated from enum spec.ReservedPropertyNames.EnumBuiltIn
 */
export enum ReservedPropertyNames_EnumBuiltIn {
  /**
   * @generated from enum value: constructor = 0;
   */
  constructor$ = 0,

  /**
   * @generated from enum value: toString = 1;
   */
  toString$ = 1,

  /**
   * @generated from enum value: toJSON = 2;
   */
  toJSON$ = 2,

  /**
   * @generated from enum value: valueOf = 3;
   */
  valueOf$ = 3,
}

/**
 * Describes the enum spec.ReservedPropertyNames.EnumBuiltIn.
 */
export const ReservedPropertyNames_EnumBuiltInDesc: GenDescEnum<ReservedPropertyNames_EnumBuiltIn> = /*@__PURE__*/
  enumDesc(fileDesc_extra_name_clash, 1, 0);

/**
 * @generated from enum spec.ReservedPropertyNames.EnumBuiltInPrefixed
 */
export enum ReservedPropertyNames_EnumBuiltInPrefixed {
  /**
   * @generated from enum value: ENUM_BUILT_IN_PREFIXED_constructor = 0;
   */
  constructor$ = 0,

  /**
   * @generated from enum value: ENUM_BUILT_IN_PREFIXED_toString = 1;
   */
  toString$ = 1,

  /**
   * @generated from enum value: ENUM_BUILT_IN_PREFIXED_toJSON = 2;
   */
  toJSON$ = 2,

  /**
   * @generated from enum value: ENUM_BUILT_IN_PREFIXED_valueOf = 3;
   */
  valueOf$ = 3,
}

/**
 * Describes the enum spec.ReservedPropertyNames.EnumBuiltInPrefixed.
 */
export const ReservedPropertyNames_EnumBuiltInPrefixedDesc: GenDescEnum<ReservedPropertyNames_EnumBuiltInPrefixed> = /*@__PURE__*/
  enumDesc(fileDesc_extra_name_clash, 1, 1);

/**
 * @generated from enum spec.ReservedPropertyNames.EnumRuntime
 */
export enum ReservedPropertyNames_EnumRuntime {
  /**
   * @generated from enum value: toJson = 0;
   */
  toJson = 0,

  /**
   * @generated from enum value: type = 6;
   */
  type = 6,

  /**
   * @generated from enum value: clone = 7;
   */
  clone = 7,

  /**
   * @generated from enum value: equals = 8;
   */
  equals = 8,

  /**
   * @generated from enum value: fromBinary = 9;
   */
  fromBinary = 9,

  /**
   * @generated from enum value: fromJson = 10;
   */
  fromJson = 10,

  /**
   * @generated from enum value: fromJsonString = 11;
   */
  fromJsonString = 11,

  /**
   * @generated from enum value: toBinary = 12;
   */
  toBinary = 12,

  /**
   * @generated from enum value: toJsonString = 14;
   */
  toJsonString = 14,
}

/**
 * Describes the enum spec.ReservedPropertyNames.EnumRuntime.
 */
export const ReservedPropertyNames_EnumRuntimeDesc: GenDescEnum<ReservedPropertyNames_EnumRuntime> = /*@__PURE__*/
  enumDesc(fileDesc_extra_name_clash, 1, 2);

/**
 * reserved identifier
 *
 * @generated from message spec.interface
 */
export type interface$ = Message$1<"spec.interface"> & {
};

/**
 * Describes the message spec.interface.
 * Use `create(interface$Desc)` to create a new message.
 */
export const interface$Desc: GenDescMessage<interface$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 2);

/**
 * reserved identifier
 *
 * @generated from message spec.function
 */
export type function$ = Message$1<"spec.function"> & {
};

/**
 * Describes the message spec.function.
 * Use `create(function$Desc)` to create a new message.
 */
export const function$Desc: GenDescMessage<function$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 3);

/**
 * reserved identifier
 *
 * @generated from message spec.instanceof
 */
export type instanceof$ = Message$1<"spec.instanceof"> & {
};

/**
 * Describes the message spec.instanceof.
 * Use `create(instanceof$Desc)` to create a new message.
 */
export const instanceof$Desc: GenDescMessage<instanceof$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 4);

/**
 * reserved identifier
 *
 * @generated from message spec.switch
 */
export type switch$ = Message$1<"spec.switch"> & {
};

/**
 * Describes the message spec.switch.
 * Use `create(switch$Desc)` to create a new message.
 */
export const switch$Desc: GenDescMessage<switch$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 5);

/**
 * reserved identifier
 *
 * @generated from message spec.case
 */
export type case$ = Message$1<"spec.case"> & {
};

/**
 * Describes the message spec.case.
 * Use `create(case$Desc)` to create a new message.
 */
export const case$Desc: GenDescMessage<case$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 6);

/**
 * reserved identifier
 *
 * @generated from message spec.return
 */
export type return$ = Message$1<"spec.return"> & {
};

/**
 * Describes the message spec.return.
 * Use `create(return$Desc)` to create a new message.
 */
export const return$Desc: GenDescMessage<return$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 7);

/**
 * used by runtime
 *
 * @generated from message spec.Message
 */
export type Message = Message$1<"spec.Message"> & {
};

/**
 * Describes the message spec.Message.
 * Use `create(MessageDesc)` to create a new message.
 */
export const MessageDesc: GenDescMessage<Message> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 8);

/**
 * used by runtime
 *
 * @generated from message spec.PartialMessage
 */
export type PartialMessage = Message$1<"spec.PartialMessage"> & {
};

/**
 * Describes the message spec.PartialMessage.
 * Use `create(PartialMessageDesc)` to create a new message.
 */
export const PartialMessageDesc: GenDescMessage<PartialMessage> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 9);

/**
 * used by runtime
 *
 * @generated from message spec.PlainMessage
 */
export type PlainMessage = Message$1<"spec.PlainMessage"> & {
};

/**
 * Describes the message spec.PlainMessage.
 * Use `create(PlainMessageDesc)` to create a new message.
 */
export const PlainMessageDesc: GenDescMessage<PlainMessage> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 10);

/**
 * clash with global type "Error"
 * either this message name is escaped in generated code, or the generated
 * code must escape its calls to the global error object (i.e. `new Error`)
 *
 * @generated from message spec.Error
 */
export type Error = Message$1<"spec.Error"> & {
  /**
   * @generated from field: string field_name = 1;
   */
  fieldName: string;

  /**
   * @generated from field: string message = 2;
   */
  message: string;
};

/**
 * Describes the message spec.Error.
 * Use `create(ErrorDesc)` to create a new message.
 */
export const ErrorDesc: GenDescMessage<Error> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 11);

/**
 * clash with global type
 *
 * @generated from message spec.Object
 */
export type Object$ = Message$1<"spec.Object"> & {
};

/**
 * Describes the message spec.Object.
 * Use `create(Object$Desc)` to create a new message.
 */
export const Object$Desc: GenDescMessage<Object$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 12);

/**
 * @generated from message spec.object
 */
export type object$ = Message$1<"spec.object"> & {
};

/**
 * Describes the message spec.object.
 * Use `create(object$Desc)` to create a new message.
 */
export const object$Desc: GenDescMessage<object$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 13);

/**
 * clash with global type
 *
 * @generated from message spec.array
 */
export type array = Message$1<"spec.array"> & {
};

/**
 * Describes the message spec.array.
 * Use `create(arrayDesc)` to create a new message.
 */
export const arrayDesc: GenDescMessage<array> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 14);

/**
 * clash with global type
 *
 * @generated from message spec.string
 */
export type string$ = Message$1<"spec.string"> & {
};

/**
 * Describes the message spec.string.
 * Use `create(string$Desc)` to create a new message.
 */
export const string$Desc: GenDescMessage<string$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 15);

/**
 * clash with global type
 *
 * @generated from message spec.number
 */
export type number$ = Message$1<"spec.number"> & {
};

/**
 * Describes the message spec.number.
 * Use `create(number$Desc)` to create a new message.
 */
export const number$Desc: GenDescMessage<number$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 16);

/**
 * clash with global type
 *
 * @generated from message spec.boolean
 */
export type boolean$ = Message$1<"spec.boolean"> & {
};

/**
 * Describes the message spec.boolean.
 * Use `create(boolean$Desc)` to create a new message.
 */
export const boolean$Desc: GenDescMessage<boolean$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 17);

/**
 * clash with global type
 *
 * @generated from message spec.bigint
 */
export type bigint$ = Message$1<"spec.bigint"> & {
};

/**
 * Describes the message spec.bigint.
 * Use `create(bigint$Desc)` to create a new message.
 */
export const bigint$Desc: GenDescMessage<bigint$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 18);

/**
 * clash with global type
 *
 * @generated from message spec.Uint8Array
 */
export type Uint8Array$ = Message$1<"spec.Uint8Array"> & {
};

/**
 * Describes the message spec.Uint8Array.
 * Use `create(Uint8Array$Desc)` to create a new message.
 */
export const Uint8Array$Desc: GenDescMessage<Uint8Array$> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 19);

/**
 * clash with global type
 *
 * @generated from message spec.Array
 */
export type Array = Message$1<"spec.Array"> & {
};

/**
 * Describes the message spec.Array.
 * Use `create(ArrayDesc)` to create a new message.
 */
export const ArrayDesc: GenDescMessage<Array> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 20);

/**
 * clash with global type
 *
 * @generated from message spec.String
 */
export type String = Message$1<"spec.String"> & {
};

/**
 * Describes the message spec.String.
 * Use `create(StringDesc)` to create a new message.
 */
export const StringDesc: GenDescMessage<String> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 21);

/**
 * clash with global type
 *
 * @generated from message spec.Number
 */
export type Number = Message$1<"spec.Number"> & {
};

/**
 * Describes the message spec.Number.
 * Use `create(NumberDesc)` to create a new message.
 */
export const NumberDesc: GenDescMessage<Number> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 22);

/**
 * clash with global type
 *
 * @generated from message spec.Boolean
 */
export type Boolean = Message$1<"spec.Boolean"> & {
};

/**
 * Describes the message spec.Boolean.
 * Use `create(BooleanDesc)` to create a new message.
 */
export const BooleanDesc: GenDescMessage<Boolean> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 23);

/**
 * clash with global type
 *
 * @generated from message spec.BigInt
 */
export type BigInt = Message$1<"spec.BigInt"> & {
};

/**
 * Describes the message spec.BigInt.
 * Use `create(BigIntDesc)` to create a new message.
 */
export const BigIntDesc: GenDescMessage<BigInt> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 24);

/**
 * @generated from message spec.ClashParent
 */
export type ClashParent = Message$1<"spec.ClashParent"> & {
};

/**
 * Describes the message spec.ClashParent.
 * Use `create(ClashParentDesc)` to create a new message.
 */
export const ClashParentDesc: GenDescMessage<ClashParent> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 25);

/**
 * should clash with message ClashParent_ClashChild
 *
 * @generated from message spec.ClashParent.ClashChild
 */
export type ClashParent_ClashChild = Message$1<"spec.ClashParent.ClashChild"> & {
};

/**
 * Describes the message spec.ClashParent.ClashChild.
 * Use `create(ClashParent_ClashChildDesc)` to create a new message.
 */
export const ClashParent_ClashChildDesc: GenDescMessage<ClashParent_ClashChild> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 25, 0);

/**
 * @generated from message spec.NoClashFields
 */
export type NoClashFields = Message$1<"spec.NoClashFields"> & {
  /**
   * ok as object property
   *
   * @generated from field: string const = 1;
   */
  const: string;

  /**
   * ok as object property
   *
   * @generated from field: string switch = 2;
   */
  switch: string;

  /**
   * ok as object property
   *
   * @generated from field: string case = 3;
   */
  case: string;

  /**
   * ok as object property
   *
   * @generated from field: string function = 4;
   */
  function: string;

  /**
   * ok as object property
   *
   * @generated from field: string interface = 5;
   */
  interface: string;

  /**
   * ok as object property
   *
   * @generated from field: string return = 6;
   */
  return: string;
};

/**
 * Describes the message spec.NoClashFields.
 * Use `create(NoClashFieldsDesc)` to create a new message.
 */
export const NoClashFieldsDesc: GenDescMessage<NoClashFields> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 26);

/**
 * @generated from message spec.NoClashOneof
 */
export type NoClashOneof = Message$1<"spec.NoClashOneof"> & {
  /**
   * @generated from oneof spec.NoClashOneof.kind
   */
  kind: {
    /**
     * ok as object property
     *
     * @generated from field: string const = 1;
     */
    value: string;
    case: "const";
  } | {
    /**
     * ok as object property
     *
     * @generated from field: string switch = 2;
     */
    value: string;
    case: "switch";
  } | {
    /**
     * ok as object property
     *
     * @generated from field: string case = 3;
     */
    value: string;
    case: "case";
  } | {
    /**
     * ok as object property
     *
     * @generated from field: string function = 4;
     */
    value: string;
    case: "function";
  } | {
    /**
     * ok as object property
     *
     * @generated from field: string interface = 5;
     */
    value: string;
    case: "interface";
  } | {
    /**
     * ok as object property
     *
     * @generated from field: string return = 6;
     */
    value: string;
    case: "return";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message spec.NoClashOneof.
 * Use `create(NoClashOneofDesc)` to create a new message.
 */
export const NoClashOneofDesc: GenDescMessage<NoClashOneof> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 27);

/**
 * @generated from message spec.NoClashOneofADT
 */
export type NoClashOneofADT = Message$1<"spec.NoClashOneofADT"> & {
  /**
   * @generated from field: spec.NoClashOneofADT.M m = 1;
   */
  m?: NoClashOneofADT_M;
};

/**
 * Describes the message spec.NoClashOneofADT.
 * Use `create(NoClashOneofADTDesc)` to create a new message.
 */
export const NoClashOneofADTDesc: GenDescMessage<NoClashOneofADT> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 28);

/**
 * @generated from message spec.NoClashOneofADT.M
 */
export type NoClashOneofADT_M = Message$1<"spec.NoClashOneofADT.M"> & {
  /**
   * @generated from field: string case = 1;
   */
  case: string;

  /**
   * @generated from field: optional string value = 2;
   */
  value?: string;
};

/**
 * Describes the message spec.NoClashOneofADT.M.
 * Use `create(NoClashOneofADT_MDesc)` to create a new message.
 */
export const NoClashOneofADT_MDesc: GenDescMessage<NoClashOneofADT_M> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 28, 0);

/**
 * just here as a "namespace" for the enum
 *
 * @generated from message spec.NoClashEnumWrap
 */
export type NoClashEnumWrap = Message$1<"spec.NoClashEnumWrap"> & {
};

/**
 * Describes the message spec.NoClashEnumWrap.
 * Use `create(NoClashEnumWrapDesc)` to create a new message.
 */
export const NoClashEnumWrapDesc: GenDescMessage<NoClashEnumWrap> = /*@__PURE__*/
  messageDesc(fileDesc_extra_name_clash, 29);

/**
 * @generated from enum spec.NoClashEnumWrap.X
 */
export enum NoClashEnumWrap_X {
  /**
   * ok as object property
   *
   * @generated from enum value: instanceof = 0;
   */
  instanceof = 0,

  /**
   * ok as object property
   *
   * @generated from enum value: switch = 1;
   */
  switch = 1,

  /**
   * ok as object property
   *
   * @generated from enum value: case = 3;
   */
  case = 3,

  /**
   * ok as object property
   *
   * @generated from enum value: function = 4;
   */
  function = 4,

  /**
   * ok as object property
   *
   * @generated from enum value: interface = 5;
   */
  interface = 5,

  /**
   * ok as object property
   *
   * @generated from enum value: return = 6;
   */
  return = 6,
}

/**
 * Describes the enum spec.NoClashEnumWrap.X.
 */
export const NoClashEnumWrap_XDesc: GenDescEnum<NoClashEnumWrap_X> = /*@__PURE__*/
  enumDesc(fileDesc_extra_name_clash, 29, 0);

/**
 * @generated from service spec.ReservedPropertyNamesService
 */
export const ReservedPropertyNamesService: GenDescService<{
  /**
   * @generated from rpc spec.ReservedPropertyNamesService.constructor
   */
  constructor$: {
    kind: "unary";
    I: Error;
    O: Error;
  },
  /**
   * @generated from rpc spec.ReservedPropertyNamesService.toString
   */
  toString$: {
    kind: "unary";
    I: Error;
    O: Error;
  },
  /**
   * @generated from rpc spec.ReservedPropertyNamesService.to_JSON
   */
  to_JSON: {
    kind: "unary";
    I: Error;
    O: Error;
  },
  /**
   * @generated from rpc spec.ReservedPropertyNamesService.value_of
   */
  value_of: {
    kind: "unary";
    I: Error;
    O: Error;
  },
}
> = /*@__PURE__*/
  serviceDesc(fileDesc_extra_name_clash, 0);

