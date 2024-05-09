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

// @generated by protoc-gen-es v2.0.0-alpha.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/audit_logs.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage, GenDescService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { fileDesc_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Event } from "../../audit/v1alpha1/envelope_pb";
import { fileDesc_buf_alpha_audit_v1alpha1_envelope } from "../../audit/v1alpha1/envelope_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/alpha/registry/v1alpha1/audit_logs.proto.
 */
export const fileDesc_buf_alpha_registry_v1alpha1_audit_logs: GenDescFile = /*@__PURE__*/
  fileDesc("CixidWYvYWxwaGEvcmVnaXN0cnkvdjFhbHBoYTEvYXVkaXRfbG9ncy5wcm90bxIbYnVmLmFscGhhLnJlZ2lzdHJ5LnYxYWxwaGExIqwBChRMaXN0QXVkaXRMb2dzUmVxdWVzdBIRCglwYWdlX3NpemUYASABKA0SEgoKcGFnZV90b2tlbhgCIAEoCRIPCgdyZXZlcnNlGAMgASgIEi4KCnN0YXJ0X3RpbWUYBCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEiwKCGVuZF90aW1lGAUgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcCJlChVMaXN0QXVkaXRMb2dzUmVzcG9uc2USMwoKYXVkaXRfbG9ncxgBIAMoCzIfLmJ1Zi5hbHBoYS5hdWRpdC52MWFscGhhMS5FdmVudBIXCg9uZXh0X3BhZ2VfdG9rZW4YAiABKAkyigEKEEF1ZGl0TG9nc1NlcnZpY2USdgoNTGlzdEF1ZGl0TG9ncxIxLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5MaXN0QXVkaXRMb2dzUmVxdWVzdBoyLmJ1Zi5hbHBoYS5yZWdpc3RyeS52MWFscGhhMS5MaXN0QXVkaXRMb2dzUmVzcG9uc2ViBnByb3RvMw", [fileDesc_google_protobuf_timestamp, fileDesc_buf_alpha_audit_v1alpha1_envelope]);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListAuditLogsRequest
 */
export type ListAuditLogsRequest = Message<"buf.alpha.registry.v1alpha1.ListAuditLogsRequest"> & {
  /**
   * @generated from field: uint32 page_size = 1;
   */
  pageSize: number;

  /**
   * The first page is returned if this is empty.
   *
   * @generated from field: string page_token = 2;
   */
  pageToken: string;

  /**
   * @generated from field: bool reverse = 3;
   */
  reverse: boolean;

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
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListAuditLogsRequest.
 * Use `create(ListAuditLogsRequestDesc)` to create a new message.
 */
export const ListAuditLogsRequestDesc: GenDescMessage<ListAuditLogsRequest> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_audit_logs, 0);

/**
 * @generated from message buf.alpha.registry.v1alpha1.ListAuditLogsResponse
 */
export type ListAuditLogsResponse = Message<"buf.alpha.registry.v1alpha1.ListAuditLogsResponse"> & {
  /**
   * @generated from field: repeated buf.alpha.audit.v1alpha1.Event audit_logs = 1;
   */
  auditLogs: Event[];

  /**
   * There are no more pages if this is empty.
   *
   * @generated from field: string next_page_token = 2;
   */
  nextPageToken: string;
};

/**
 * Describes the message buf.alpha.registry.v1alpha1.ListAuditLogsResponse.
 * Use `create(ListAuditLogsResponseDesc)` to create a new message.
 */
export const ListAuditLogsResponseDesc: GenDescMessage<ListAuditLogsResponse> = /*@__PURE__*/
  messageDesc(fileDesc_buf_alpha_registry_v1alpha1_audit_logs, 1);

/**
 * AuditLogsService serves audit logs on the instance.
 *
 * @generated from service buf.alpha.registry.v1alpha1.AuditLogsService
 */
export const AuditLogsService: GenDescService<{
  /**
   * ListAuditLogs lists audit logs matching the filters specified.
   *
   * @generated from rpc buf.alpha.registry.v1alpha1.AuditLogsService.ListAuditLogs
   */
  listAuditLogs: {
    kind: "unary";
    I: ListAuditLogsRequest;
    O: ListAuditLogsResponse;
  },
}
> = /*@__PURE__*/
  serviceDesc(fileDesc_buf_alpha_registry_v1alpha1_audit_logs, 0);

