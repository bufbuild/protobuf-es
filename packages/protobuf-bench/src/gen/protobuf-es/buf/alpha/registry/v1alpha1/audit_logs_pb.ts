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

// @generated by protoc-gen-es v1.4.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/audit_logs.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";
import { Event } from "../../audit/v1alpha1/envelope_pb.js";

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListAuditLogsRequest
 */
export class ListAuditLogsRequest extends Message<ListAuditLogsRequest> {
  /**
   * @generated from field: uint32 page_size = 1;
   */
  pageSize = 0;

  /**
   * The first page is returned if this is empty.
   *
   * @generated from field: string page_token = 2;
   */
  pageToken = "";

  /**
   * @generated from field: bool reverse = 3;
   */
  reverse = false;

  /**
   * Optionally specifies a start time for the query.
   * Only audit logs from later than or equal to this time will be returned.
   * This value is inclusive so that start_time and end_time together
   * form a closed-open range [start_time, end_time), allowing
   * consecutive pages to cover exclusive logs.
   *
   * @generated from field: google.protobuf.Timestamp start_time = 4;
   */
  startTime?: Timestamp;

  /**
   * Optionally specifies an end time for the query.
   * Only audit logs from earlier than this time will be returned.
   * This value is exclusive, so that start_time and end_time together
   * form a closed-open range [start_time, end_time), allowing
   * consecutive pages to cover exclusive logs.
   *
   * @generated from field: google.protobuf.Timestamp end_time = 5;
   */
  endTime?: Timestamp;

  constructor(data?: PartialMessage<ListAuditLogsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListAuditLogsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "page_size", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "reverse", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "start_time", kind: "message", T: Timestamp },
    { no: 5, name: "end_time", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListAuditLogsRequest {
    return new ListAuditLogsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListAuditLogsRequest {
    return new ListAuditLogsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListAuditLogsRequest {
    return new ListAuditLogsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListAuditLogsRequest | PlainMessage<ListAuditLogsRequest> | undefined, b: ListAuditLogsRequest | PlainMessage<ListAuditLogsRequest> | undefined): boolean {
    return proto3.util.equals(ListAuditLogsRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListAuditLogsResponse
 */
export class ListAuditLogsResponse extends Message<ListAuditLogsResponse> {
  /**
   * @generated from field: repeated buf.alpha.audit.v1alpha1.Event audit_logs = 1;
   */
  auditLogs: Event[] = [];

  /**
   * There are no more pages if this is empty.
   *
   * @generated from field: string next_page_token = 2;
   */
  nextPageToken = "";

  constructor(data?: PartialMessage<ListAuditLogsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.ListAuditLogsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "audit_logs", kind: "message", T: Event, repeated: true },
    { no: 2, name: "next_page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListAuditLogsResponse {
    return new ListAuditLogsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListAuditLogsResponse {
    return new ListAuditLogsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListAuditLogsResponse {
    return new ListAuditLogsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListAuditLogsResponse | PlainMessage<ListAuditLogsResponse> | undefined, b: ListAuditLogsResponse | PlainMessage<ListAuditLogsResponse> | undefined): boolean {
    return proto3.util.equals(ListAuditLogsResponse, a, b);
  }
}

