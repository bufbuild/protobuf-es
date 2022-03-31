// Protocol Buffers - Google's data interchange format
// Copyright 2008 Google Inc.  All rights reserved.
// https://developers.google.com/protocol-buffers/
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// @generated by protoc-gen-es v0.0.2-alpha.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file conformance/conformance.proto (package conformance, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from enum conformance.WireFormat
 */
export enum WireFormat {
  /**
   * @generated from enum value: UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: PROTOBUF = 1;
   */
  PROTOBUF = 1,

  /**
   * @generated from enum value: JSON = 2;
   */
  JSON = 2,

  /**
   * Google internal only. Opensource testees just skip it.
   *
   * @generated from enum value: JSPB = 3;
   */
  JSPB = 3,

  /**
   * @generated from enum value: TEXT_FORMAT = 4;
   */
  TEXT_FORMAT = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(WireFormat)
proto3.util.setEnumType(WireFormat, "conformance.WireFormat", [
  { no: 0, name: "UNSPECIFIED" },
  { no: 1, name: "PROTOBUF" },
  { no: 2, name: "JSON" },
  { no: 3, name: "JSPB" },
  { no: 4, name: "TEXT_FORMAT" },
]);

/**
 * @generated from enum conformance.TestCategory
 */
export enum TestCategory {
  /**
   * @generated from enum value: UNSPECIFIED_TEST = 0;
   */
  UNSPECIFIED_TEST = 0,

  /**
   * Test binary wire format.
   *
   * @generated from enum value: BINARY_TEST = 1;
   */
  BINARY_TEST = 1,

  /**
   * Test json wire format.
   *
   * @generated from enum value: JSON_TEST = 2;
   */
  JSON_TEST = 2,

  /**
   * Similar to JSON_TEST. However, during parsing json, testee should ignore
   * unknown fields. This feature is optional. Each implementation can decide
   * whether to support it.  See
   * https://developers.google.com/protocol-buffers/docs/proto3#json_options
   * for more detail.
   *
   * @generated from enum value: JSON_IGNORE_UNKNOWN_PARSING_TEST = 3;
   */
  JSON_IGNORE_UNKNOWN_PARSING_TEST = 3,

  /**
   * Test jspb wire format. Google internal only. Opensource testees just skip it.
   *
   * @generated from enum value: JSPB_TEST = 4;
   */
  JSPB_TEST = 4,

  /**
   * Test text format. For cpp, java and python, testees can already deal with
   * this type. Testees of other languages can simply skip it.
   *
   * @generated from enum value: TEXT_FORMAT_TEST = 5;
   */
  TEXT_FORMAT_TEST = 5,
}
// Retrieve enum metadata with: proto3.getEnumType(TestCategory)
proto3.util.setEnumType(TestCategory, "conformance.TestCategory", [
  { no: 0, name: "UNSPECIFIED_TEST" },
  { no: 1, name: "BINARY_TEST" },
  { no: 2, name: "JSON_TEST" },
  { no: 3, name: "JSON_IGNORE_UNKNOWN_PARSING_TEST" },
  { no: 4, name: "JSPB_TEST" },
  { no: 5, name: "TEXT_FORMAT_TEST" },
]);

/**
 * The conformance runner will request a list of failures as the first request.
 * This will be known by message_type == "conformance.FailureSet", a conformance
 * test should return a serialized FailureSet in protobuf_payload.
 *
 * @generated from message conformance.FailureSet
 */
export class FailureSet extends Message<FailureSet> {
  /**
   * @generated from field: repeated string failure = 1;
   */
  failure: string[] = [];

  constructor(data?: PartialMessage<FailureSet>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "conformance.FailureSet";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "failure", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FailureSet {
    return new FailureSet().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FailureSet {
    return new FailureSet().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FailureSet {
    return new FailureSet().fromJsonString(jsonString, options);
  }

  static equals(a: FailureSet | PlainMessage<FailureSet> | undefined, b: FailureSet | PlainMessage<FailureSet> | undefined): boolean {
    return proto3.util.equals(FailureSet, a, b);
  }
}

/**
 * Represents a single test case's input.  The testee should:
 *
 *   1. parse this proto (which should always succeed)
 *   2. parse the protobuf or JSON payload in "payload" (which may fail)
 *   3. if the parse succeeded, serialize the message in the requested format.
 *
 * @generated from message conformance.ConformanceRequest
 */
export class ConformanceRequest extends Message<ConformanceRequest> {
  /**
   * The payload (whether protobuf of JSON) is always for a
   * protobuf_test_messages.proto3.TestAllTypes proto (as defined in
   * src/google/protobuf/proto3_test_messages.proto).
   *
   * TODO(haberman): if/when we expand the conformance tests to support proto2,
   * we will want to include a field that lets the payload/response be a
   * protobuf_test_messages.google.protobuf.TestAllTypes message instead.
   *
   * @generated from oneof conformance.ConformanceRequest.payload
   */
  payload: {
    /**
     * @generated from field: bytes protobuf_payload = 1;
     */
    value: Uint8Array;
    case: "protobufPayload";
  } | {
    /**
     * @generated from field: string json_payload = 2;
     */
    value: string;
    case: "jsonPayload";
  } | {
    /**
     * Google internal only.  Opensource testees just skip it.
     *
     * @generated from field: string jspb_payload = 7;
     */
    value: string;
    case: "jspbPayload";
  } | {
    /**
     * @generated from field: string text_payload = 8;
     */
    value: string;
    case: "textPayload";
  } | { case: undefined; value?: undefined } = { case: undefined };

  /**
   * Which format should the testee serialize its message to?
   *
   * @generated from field: conformance.WireFormat requested_output_format = 3;
   */
  requestedOutputFormat = WireFormat.UNSPECIFIED;

  /**
   * The full name for the test message to use; for the moment, either:
   * protobuf_test_messages.proto3.TestAllTypesProto3 or
   * protobuf_test_messages.google.protobuf.TestAllTypesProto2.
   *
   * @generated from field: string message_type = 4;
   */
  messageType = "";

  /**
   * Each test is given a specific test category. Some category may need
   * specific support in testee programs. Refer to the definition of TestCategory
   * for more information.
   *
   * @generated from field: conformance.TestCategory test_category = 5;
   */
  testCategory = TestCategory.UNSPECIFIED_TEST;

  /**
   * Specify details for how to encode jspb.
   *
   * @generated from field: conformance.JspbEncodingConfig jspb_encoding_options = 6;
   */
  jspbEncodingOptions?: JspbEncodingConfig;

  /**
   * This can be used in json and text format. If true, testee should print
   * unknown fields instead of ignore. This feature is optional.
   *
   * @generated from field: bool print_unknown_fields = 9;
   */
  printUnknownFields = false;

  constructor(data?: PartialMessage<ConformanceRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "conformance.ConformanceRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "protobuf_payload", kind: "scalar", T: 12 /* ScalarType.BYTES */, oneof: "payload" },
    { no: 2, name: "json_payload", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "payload" },
    { no: 7, name: "jspb_payload", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "payload" },
    { no: 8, name: "text_payload", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "payload" },
    { no: 3, name: "requested_output_format", kind: "enum", T: proto3.getEnumType(WireFormat) },
    { no: 4, name: "message_type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "test_category", kind: "enum", T: proto3.getEnumType(TestCategory) },
    { no: 6, name: "jspb_encoding_options", kind: "message", T: JspbEncodingConfig },
    { no: 9, name: "print_unknown_fields", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConformanceRequest {
    return new ConformanceRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConformanceRequest {
    return new ConformanceRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConformanceRequest {
    return new ConformanceRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ConformanceRequest | PlainMessage<ConformanceRequest> | undefined, b: ConformanceRequest | PlainMessage<ConformanceRequest> | undefined): boolean {
    return proto3.util.equals(ConformanceRequest, a, b);
  }
}

/**
 * Represents a single test case's output.
 *
 * @generated from message conformance.ConformanceResponse
 */
export class ConformanceResponse extends Message<ConformanceResponse> {
  /**
   * @generated from oneof conformance.ConformanceResponse.result
   */
  result: {
    /**
     * This string should be set to indicate parsing failed.  The string can
     * provide more information about the parse error if it is available.
     *
     * Setting this string does not necessarily mean the testee failed the
     * test.  Some of the test cases are intentionally invalid input.
     *
     * @generated from field: string parse_error = 1;
     */
    value: string;
    case: "parseError";
  } | {
    /**
     * If the input was successfully parsed but errors occurred when
     * serializing it to the requested output format, set the error message in
     * this field.
     *
     * @generated from field: string serialize_error = 6;
     */
    value: string;
    case: "serializeError";
  } | {
    /**
     * This should be set if some other error occurred.  This will always
     * indicate that the test failed.  The string can provide more information
     * about the failure.
     *
     * @generated from field: string runtime_error = 2;
     */
    value: string;
    case: "runtimeError";
  } | {
    /**
     * If the input was successfully parsed and the requested output was
     * protobuf, serialize it to protobuf and set it in this field.
     *
     * @generated from field: bytes protobuf_payload = 3;
     */
    value: Uint8Array;
    case: "protobufPayload";
  } | {
    /**
     * If the input was successfully parsed and the requested output was JSON,
     * serialize to JSON and set it in this field.
     *
     * @generated from field: string json_payload = 4;
     */
    value: string;
    case: "jsonPayload";
  } | {
    /**
     * For when the testee skipped the test, likely because a certain feature
     * wasn't supported, like JSON input/output.
     *
     * @generated from field: string skipped = 5;
     */
    value: string;
    case: "skipped";
  } | {
    /**
     * If the input was successfully parsed and the requested output was JSPB,
     * serialize to JSPB and set it in this field. JSPB is google internal only
     * format. Opensource testees can just skip it.
     *
     * @generated from field: string jspb_payload = 7;
     */
    value: string;
    case: "jspbPayload";
  } | {
    /**
     * If the input was successfully parsed and the requested output was
     * TEXT_FORMAT, serialize to TEXT_FORMAT and set it in this field.
     *
     * @generated from field: string text_payload = 8;
     */
    value: string;
    case: "textPayload";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<ConformanceResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "conformance.ConformanceResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "parse_error", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "result" },
    { no: 6, name: "serialize_error", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "result" },
    { no: 2, name: "runtime_error", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "result" },
    { no: 3, name: "protobuf_payload", kind: "scalar", T: 12 /* ScalarType.BYTES */, oneof: "result" },
    { no: 4, name: "json_payload", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "result" },
    { no: 5, name: "skipped", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "result" },
    { no: 7, name: "jspb_payload", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "result" },
    { no: 8, name: "text_payload", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "result" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConformanceResponse {
    return new ConformanceResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConformanceResponse {
    return new ConformanceResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConformanceResponse {
    return new ConformanceResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ConformanceResponse | PlainMessage<ConformanceResponse> | undefined, b: ConformanceResponse | PlainMessage<ConformanceResponse> | undefined): boolean {
    return proto3.util.equals(ConformanceResponse, a, b);
  }
}

/**
 * Encoding options for jspb format.
 *
 * @generated from message conformance.JspbEncodingConfig
 */
export class JspbEncodingConfig extends Message<JspbEncodingConfig> {
  /**
   * Encode the value field of Any as jspb array if true, otherwise binary.
   *
   * @generated from field: bool use_jspb_array_any_format = 1;
   */
  useJspbArrayAnyFormat = false;

  constructor(data?: PartialMessage<JspbEncodingConfig>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "conformance.JspbEncodingConfig";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "use_jspb_array_any_format", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JspbEncodingConfig {
    return new JspbEncodingConfig().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JspbEncodingConfig {
    return new JspbEncodingConfig().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JspbEncodingConfig {
    return new JspbEncodingConfig().fromJsonString(jsonString, options);
  }

  static equals(a: JspbEncodingConfig | PlainMessage<JspbEncodingConfig> | undefined, b: JspbEncodingConfig | PlainMessage<JspbEncodingConfig> | undefined): boolean {
    return proto3.util.equals(JspbEncodingConfig, a, b);
  }
}

