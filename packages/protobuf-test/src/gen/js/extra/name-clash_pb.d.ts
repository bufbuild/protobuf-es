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

// @generated by protoc-gen-es v0.0.2-alpha.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/name-clash.proto (package spec, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage as PartialMessage$1, PlainMessage as PlainMessage$1} from "@bufbuild/protobuf";
import {Message as Message$1, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message spec.ReservedPropertyNames
 */
export declare class ReservedPropertyNames extends Message$1<ReservedPropertyNames> {

  constructor(data?: PartialMessage$1<ReservedPropertyNames>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.ReservedPropertyNames";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReservedPropertyNames;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReservedPropertyNames;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReservedPropertyNames;

  static equals(a: ReservedPropertyNames | PlainMessage$1<ReservedPropertyNames> | undefined, b: ReservedPropertyNames | PlainMessage$1<ReservedPropertyNames> | undefined): boolean;

}

/**
 * @generated from enum spec.ReservedPropertyNames.EnumBuiltIn
 */
export declare enum ReservedPropertyNames_EnumBuiltIn {

  /**
   * @generated from enum value: constructor = 0;
   */
  constructor = 0,

  /**
   * @generated from enum value: toString = 1;
   */
  toString = 1,

  /**
   * @generated from enum value: to_JSON = 2;
   */
  to_JSON = 2,

  /**
   * @generated from enum value: value_of = 3;
   */
  value_of = 3,

}


/**
 * @generated from enum spec.ReservedPropertyNames.EnumRuntime
 */
export declare enum ReservedPropertyNames_EnumRuntime {

  /**
   * @generated from enum value: to_json = 0;
   */
  to_json = 0,

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
   * @generated from enum value: from_binary = 9;
   */
  from_binary = 9,

  /**
   * @generated from enum value: from_json = 10;
   */
  from_json = 10,

  /**
   * @generated from enum value: from_json_string = 11;
   */
  from_json_string = 11,

  /**
   * @generated from enum value: to_binary = 12;
   */
  to_binary = 12,

  /**
   * @generated from enum value: to_json_string = 14;
   */
  to_json_string = 14,

}


/**
 * @generated from message spec.ReservedPropertyNames.BuiltIn
 */
export declare class ReservedPropertyNames_BuiltIn extends Message$1<ReservedPropertyNames_BuiltIn> {

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

  constructor(data?: PartialMessage$1<ReservedPropertyNames_BuiltIn>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.ReservedPropertyNames.BuiltIn";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReservedPropertyNames_BuiltIn;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReservedPropertyNames_BuiltIn;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReservedPropertyNames_BuiltIn;

  static equals(a: ReservedPropertyNames_BuiltIn | PlainMessage$1<ReservedPropertyNames_BuiltIn> | undefined, b: ReservedPropertyNames_BuiltIn | PlainMessage$1<ReservedPropertyNames_BuiltIn> | undefined): boolean;

}


/**
 * @generated from message spec.ReservedPropertyNames.Runtime
 */
export declare class ReservedPropertyNames_Runtime extends Message$1<ReservedPropertyNames_Runtime> {

  /**
   * runtime toJson()
   *
   * @generated from field: string to_json = 4;
   */
  toJson$: string;

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
  clone$: string;

  /**
   * runtime equals()
   *
   * @generated from field: string equals = 8;
   */
  equals$: string;

  /**
   * runtime fromBinary()
   *
   * @generated from field: string from_binary = 9;
   */
  fromBinary$: string;

  /**
   * runtime fromJson()
   *
   * @generated from field: string from_json = 10;
   */
  fromJson$: string;

  /**
   * runtime fromJsonString()
   *
   * @generated from field: string from_json_string = 11;
   */
  fromJsonString$: string;

  /**
   * runtime toBinary()
   *
   * @generated from field: string to_binary = 12;
   */
  toBinary$: string;

  /**
   * runtime toJsonString()
   *
   * @generated from field: string to_json_string = 14;
   */
  toJsonString$: string;

  constructor(data?: PartialMessage$1<ReservedPropertyNames_Runtime>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.ReservedPropertyNames.Runtime";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReservedPropertyNames_Runtime;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReservedPropertyNames_Runtime;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReservedPropertyNames_Runtime;

  static equals(a: ReservedPropertyNames_Runtime | PlainMessage$1<ReservedPropertyNames_Runtime> | undefined, b: ReservedPropertyNames_Runtime | PlainMessage$1<ReservedPropertyNames_Runtime> | undefined): boolean;

}


/**
 * @generated from message spec.ReservedPropertyNames.OneofBultIn
 */
export declare class ReservedPropertyNames_OneofBultIn extends Message$1<ReservedPropertyNames_OneofBultIn> {

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

  constructor(data?: PartialMessage$1<ReservedPropertyNames_OneofBultIn>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.ReservedPropertyNames.OneofBultIn";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReservedPropertyNames_OneofBultIn;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReservedPropertyNames_OneofBultIn;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReservedPropertyNames_OneofBultIn;

  static equals(a: ReservedPropertyNames_OneofBultIn | PlainMessage$1<ReservedPropertyNames_OneofBultIn> | undefined, b: ReservedPropertyNames_OneofBultIn | PlainMessage$1<ReservedPropertyNames_OneofBultIn> | undefined): boolean;

}


/**
 * @generated from message spec.ReservedPropertyNames.OneofRuntime
 */
export declare class ReservedPropertyNames_OneofRuntime extends Message$1<ReservedPropertyNames_OneofRuntime> {

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

  constructor(data?: PartialMessage$1<ReservedPropertyNames_OneofRuntime>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.ReservedPropertyNames.OneofRuntime";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReservedPropertyNames_OneofRuntime;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReservedPropertyNames_OneofRuntime;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReservedPropertyNames_OneofRuntime;

  static equals(a: ReservedPropertyNames_OneofRuntime | PlainMessage$1<ReservedPropertyNames_OneofRuntime> | undefined, b: ReservedPropertyNames_OneofRuntime | PlainMessage$1<ReservedPropertyNames_OneofRuntime> | undefined): boolean;

}



/**
 * reserved identifier
 *
 * @generated from message spec.interface
 */
export declare class interface$ extends Message$1<interface$> {

  constructor(data?: PartialMessage$1<interface$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.interface";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): interface$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): interface$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): interface$;

  static equals(a: interface$ | PlainMessage$1<interface$> | undefined, b: interface$ | PlainMessage$1<interface$> | undefined): boolean;

}


/**
 * reserved identifier
 *
 * @generated from message spec.function
 */
export declare class function$ extends Message$1<function$> {

  constructor(data?: PartialMessage$1<function$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.function";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): function$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): function$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): function$;

  static equals(a: function$ | PlainMessage$1<function$> | undefined, b: function$ | PlainMessage$1<function$> | undefined): boolean;

}


/**
 * reserved identifier
 *
 * @generated from message spec.instanceof
 */
export declare class instanceof$ extends Message$1<instanceof$> {

  constructor(data?: PartialMessage$1<instanceof$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.instanceof";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): instanceof$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): instanceof$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): instanceof$;

  static equals(a: instanceof$ | PlainMessage$1<instanceof$> | undefined, b: instanceof$ | PlainMessage$1<instanceof$> | undefined): boolean;

}


/**
 * reserved identifier
 *
 * @generated from message spec.switch
 */
export declare class switch$ extends Message$1<switch$> {

  constructor(data?: PartialMessage$1<switch$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.switch";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): switch$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): switch$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): switch$;

  static equals(a: switch$ | PlainMessage$1<switch$> | undefined, b: switch$ | PlainMessage$1<switch$> | undefined): boolean;

}


/**
 * reserved identifier
 *
 * @generated from message spec.case
 */
export declare class case$ extends Message$1<case$> {

  constructor(data?: PartialMessage$1<case$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.case";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): case$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): case$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): case$;

  static equals(a: case$ | PlainMessage$1<case$> | undefined, b: case$ | PlainMessage$1<case$> | undefined): boolean;

}


/**
 * reserved identifier
 *
 * @generated from message spec.return
 */
export declare class return$ extends Message$1<return$> {

  constructor(data?: PartialMessage$1<return$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.return";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): return$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): return$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): return$;

  static equals(a: return$ | PlainMessage$1<return$> | undefined, b: return$ | PlainMessage$1<return$> | undefined): boolean;

}


/**
 * used by runtime
 *
 * @generated from message spec.Message
 */
export declare class Message extends Message$1<Message> {

  constructor(data?: PartialMessage$1<Message>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.Message";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Message;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Message;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Message;

  static equals(a: Message | PlainMessage$1<Message> | undefined, b: Message | PlainMessage$1<Message> | undefined): boolean;

}


/**
 * used by runtime
 *
 * @generated from message spec.PartialMessage
 */
export declare class PartialMessage extends Message$1<PartialMessage> {

  constructor(data?: PartialMessage$1<PartialMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.PartialMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PartialMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PartialMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PartialMessage;

  static equals(a: PartialMessage | PlainMessage$1<PartialMessage> | undefined, b: PartialMessage | PlainMessage$1<PartialMessage> | undefined): boolean;

}


/**
 * used by runtime
 *
 * @generated from message spec.PlainMessage
 */
export declare class PlainMessage extends Message$1<PlainMessage> {

  constructor(data?: PartialMessage$1<PlainMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.PlainMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PlainMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PlainMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PlainMessage;

  static equals(a: PlainMessage | PlainMessage$1<PlainMessage> | undefined, b: PlainMessage | PlainMessage$1<PlainMessage> | undefined): boolean;

}


/**
 * clash with global type "Error"
 * either this message name is escaped in generated code, or the generated
 * code must escape its calls to the global error object (i.e. `new Error`)
 *
 * @generated from message spec.Error
 */
export declare class Error extends Message$1<Error> {

  /**
   * @generated from field: string field_name = 1;
   */
  fieldName: string;

  /**
   * @generated from field: string message = 2;
   */
  message: string;

  constructor(data?: PartialMessage$1<Error>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.Error";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Error;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Error;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Error;

  static equals(a: Error | PlainMessage$1<Error> | undefined, b: Error | PlainMessage$1<Error> | undefined): boolean;

}


/**
 * clash with global type
 *
 * @generated from message spec.Object
 */
export declare class Object$ extends Message$1<Object$> {

  constructor(data?: PartialMessage$1<Object$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.Object";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Object$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Object$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Object$;

  static equals(a: Object$ | PlainMessage$1<Object$> | undefined, b: Object$ | PlainMessage$1<Object$> | undefined): boolean;

}


/**
 * @generated from message spec.object
 */
export declare class object$ extends Message$1<object$> {

  constructor(data?: PartialMessage$1<object$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.object";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): object$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): object$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): object$;

  static equals(a: object$ | PlainMessage$1<object$> | undefined, b: object$ | PlainMessage$1<object$> | undefined): boolean;

}


/**
 * clash with global type
 *
 * @generated from message spec.array
 */
export declare class array extends Message$1<array> {

  constructor(data?: PartialMessage$1<array>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.array";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): array;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): array;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): array;

  static equals(a: array | PlainMessage$1<array> | undefined, b: array | PlainMessage$1<array> | undefined): boolean;

}


/**
 * clash with global type
 *
 * @generated from message spec.string
 */
export declare class string$ extends Message$1<string$> {

  constructor(data?: PartialMessage$1<string$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.string";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): string$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): string$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): string$;

  static equals(a: string$ | PlainMessage$1<string$> | undefined, b: string$ | PlainMessage$1<string$> | undefined): boolean;

}


/**
 * clash with global type
 *
 * @generated from message spec.number
 */
export declare class number$ extends Message$1<number$> {

  constructor(data?: PartialMessage$1<number$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.number";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): number$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): number$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): number$;

  static equals(a: number$ | PlainMessage$1<number$> | undefined, b: number$ | PlainMessage$1<number$> | undefined): boolean;

}


/**
 * clash with global type
 *
 * @generated from message spec.boolean
 */
export declare class boolean$ extends Message$1<boolean$> {

  constructor(data?: PartialMessage$1<boolean$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.boolean";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): boolean$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): boolean$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): boolean$;

  static equals(a: boolean$ | PlainMessage$1<boolean$> | undefined, b: boolean$ | PlainMessage$1<boolean$> | undefined): boolean;

}


/**
 * clash with global type
 *
 * @generated from message spec.bigint
 */
export declare class bigint$ extends Message$1<bigint$> {

  constructor(data?: PartialMessage$1<bigint$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.bigint";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): bigint$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): bigint$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): bigint$;

  static equals(a: bigint$ | PlainMessage$1<bigint$> | undefined, b: bigint$ | PlainMessage$1<bigint$> | undefined): boolean;

}


/**
 * clash with global type
 *
 * @generated from message spec.Uint8Array
 */
export declare class Uint8Array$ extends Message$1<Uint8Array$> {

  constructor(data?: PartialMessage$1<Uint8Array$>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.Uint8Array";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Uint8Array$;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Uint8Array$;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Uint8Array$;

  static equals(a: Uint8Array$ | PlainMessage$1<Uint8Array$> | undefined, b: Uint8Array$ | PlainMessage$1<Uint8Array$> | undefined): boolean;

}


/**
 * clash with global type
 *
 * @generated from message spec.Array
 */
export declare class Array extends Message$1<Array> {

  constructor(data?: PartialMessage$1<Array>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.Array";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Array;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Array;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Array;

  static equals(a: Array | PlainMessage$1<Array> | undefined, b: Array | PlainMessage$1<Array> | undefined): boolean;

}


/**
 * clash with global type
 *
 * @generated from message spec.String
 */
export declare class String extends Message$1<String> {

  constructor(data?: PartialMessage$1<String>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.String";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): String;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): String;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): String;

  static equals(a: String | PlainMessage$1<String> | undefined, b: String | PlainMessage$1<String> | undefined): boolean;

}


/**
 * clash with global type
 *
 * @generated from message spec.Number
 */
export declare class Number extends Message$1<Number> {

  constructor(data?: PartialMessage$1<Number>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.Number";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Number;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Number;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Number;

  static equals(a: Number | PlainMessage$1<Number> | undefined, b: Number | PlainMessage$1<Number> | undefined): boolean;

}


/**
 * clash with global type
 *
 * @generated from message spec.Boolean
 */
export declare class Boolean extends Message$1<Boolean> {

  constructor(data?: PartialMessage$1<Boolean>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.Boolean";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Boolean;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Boolean;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Boolean;

  static equals(a: Boolean | PlainMessage$1<Boolean> | undefined, b: Boolean | PlainMessage$1<Boolean> | undefined): boolean;

}


/**
 * clash with global type
 *
 * @generated from message spec.BigInt
 */
export declare class BigInt extends Message$1<BigInt> {

  constructor(data?: PartialMessage$1<BigInt>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.BigInt";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BigInt;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BigInt;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BigInt;

  static equals(a: BigInt | PlainMessage$1<BigInt> | undefined, b: BigInt | PlainMessage$1<BigInt> | undefined): boolean;

}


/**
 * @generated from message spec.ClashParent
 */
export declare class ClashParent extends Message$1<ClashParent> {

  constructor(data?: PartialMessage$1<ClashParent>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.ClashParent";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ClashParent;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ClashParent;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ClashParent;

  static equals(a: ClashParent | PlainMessage$1<ClashParent> | undefined, b: ClashParent | PlainMessage$1<ClashParent> | undefined): boolean;

}

/**
 * should clash with message ClashParent_ClashChild
 *
 * @generated from message spec.ClashParent.ClashChild
 */
export declare class ClashParent_ClashChild extends Message$1<ClashParent_ClashChild> {

  constructor(data?: PartialMessage$1<ClashParent_ClashChild>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.ClashParent.ClashChild";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ClashParent_ClashChild;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ClashParent_ClashChild;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ClashParent_ClashChild;

  static equals(a: ClashParent_ClashChild | PlainMessage$1<ClashParent_ClashChild> | undefined, b: ClashParent_ClashChild | PlainMessage$1<ClashParent_ClashChild> | undefined): boolean;

}



/**
 * @generated from message spec.NoClashFields
 */
export declare class NoClashFields extends Message$1<NoClashFields> {

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

  constructor(data?: PartialMessage$1<NoClashFields>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.NoClashFields";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NoClashFields;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NoClashFields;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NoClashFields;

  static equals(a: NoClashFields | PlainMessage$1<NoClashFields> | undefined, b: NoClashFields | PlainMessage$1<NoClashFields> | undefined): boolean;

}


/**
 * @generated from message spec.NoClashOneof
 */
export declare class NoClashOneof extends Message$1<NoClashOneof> {

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

  constructor(data?: PartialMessage$1<NoClashOneof>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.NoClashOneof";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NoClashOneof;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NoClashOneof;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NoClashOneof;

  static equals(a: NoClashOneof | PlainMessage$1<NoClashOneof> | undefined, b: NoClashOneof | PlainMessage$1<NoClashOneof> | undefined): boolean;

}


/**
 * @generated from message spec.NoClashOneofADT
 */
export declare class NoClashOneofADT extends Message$1<NoClashOneofADT> {

  /**
   * @generated from field: string case = 1;
   */
  case: string;

  /**
   * @generated from field: optional string value = 2;
   */
  value?: string;

  constructor(data?: PartialMessage$1<NoClashOneofADT>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.NoClashOneofADT";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NoClashOneofADT;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NoClashOneofADT;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NoClashOneofADT;

  static equals(a: NoClashOneofADT | PlainMessage$1<NoClashOneofADT> | undefined, b: NoClashOneofADT | PlainMessage$1<NoClashOneofADT> | undefined): boolean;

}


/**
 * just here as a "namespace" for the enum
 *
 * @generated from message spec.NoClashEnumWrap
 */
export declare class NoClashEnumWrap extends Message$1<NoClashEnumWrap> {

  constructor(data?: PartialMessage$1<NoClashEnumWrap>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.NoClashEnumWrap";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NoClashEnumWrap;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NoClashEnumWrap;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NoClashEnumWrap;

  static equals(a: NoClashEnumWrap | PlainMessage$1<NoClashEnumWrap> | undefined, b: NoClashEnumWrap | PlainMessage$1<NoClashEnumWrap> | undefined): boolean;

}

/**
 * @generated from enum spec.NoClashEnumWrap.X
 */
export declare enum NoClashEnumWrap_X {

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



