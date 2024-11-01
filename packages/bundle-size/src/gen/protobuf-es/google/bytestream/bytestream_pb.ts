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

// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file google/bytestream/bytestream.proto (package google.bytestream, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/bytestream/bytestream.proto.
 */
export const file_google_bytestream_bytestream: GenFile = /*@__PURE__*/
  fileDesc("CiJnb29nbGUvYnl0ZXN0cmVhbS9ieXRlc3RyZWFtLnByb3RvEhFnb29nbGUuYnl0ZXN0cmVhbSJNCgtSZWFkUmVxdWVzdBIVCg1yZXNvdXJjZV9uYW1lGAEgASgJEhMKC3JlYWRfb2Zmc2V0GAIgASgDEhIKCnJlYWRfbGltaXQYAyABKAMiHAoMUmVhZFJlc3BvbnNlEgwKBGRhdGEYCiABKAwiXwoMV3JpdGVSZXF1ZXN0EhUKDXJlc291cmNlX25hbWUYASABKAkSFAoMd3JpdGVfb2Zmc2V0GAIgASgDEhQKDGZpbmlzaF93cml0ZRgDIAEoCBIMCgRkYXRhGAogASgMIicKDVdyaXRlUmVzcG9uc2USFgoOY29tbWl0dGVkX3NpemUYASABKAMiMAoXUXVlcnlXcml0ZVN0YXR1c1JlcXVlc3QSFQoNcmVzb3VyY2VfbmFtZRgBIAEoCSJEChhRdWVyeVdyaXRlU3RhdHVzUmVzcG9uc2USFgoOY29tbWl0dGVkX3NpemUYASABKAMSEAoIY29tcGxldGUYAiABKAgykgIKCkJ5dGVTdHJlYW0SSQoEUmVhZBIeLmdvb2dsZS5ieXRlc3RyZWFtLlJlYWRSZXF1ZXN0Gh8uZ29vZ2xlLmJ5dGVzdHJlYW0uUmVhZFJlc3BvbnNlMAESTAoFV3JpdGUSHy5nb29nbGUuYnl0ZXN0cmVhbS5Xcml0ZVJlcXVlc3QaIC5nb29nbGUuYnl0ZXN0cmVhbS5Xcml0ZVJlc3BvbnNlKAESawoQUXVlcnlXcml0ZVN0YXR1cxIqLmdvb2dsZS5ieXRlc3RyZWFtLlF1ZXJ5V3JpdGVTdGF0dXNSZXF1ZXN0GisuZ29vZ2xlLmJ5dGVzdHJlYW0uUXVlcnlXcml0ZVN0YXR1c1Jlc3BvbnNlQmUKFWNvbS5nb29nbGUuYnl0ZXN0cmVhbUIPQnl0ZVN0cmVhbVByb3RvWjtnb29nbGUuZ29sYW5nLm9yZy9nZW5wcm90by9nb29nbGVhcGlzL2J5dGVzdHJlYW07Ynl0ZXN0cmVhbWIGcHJvdG8z");

/**
 * Request object for ByteStream.Read.
 *
 * @generated from message google.bytestream.ReadRequest
 */
export type ReadRequest = Message<"google.bytestream.ReadRequest"> & {
  /**
   * The name of the resource to read.
   *
   * @generated from field: string resource_name = 1;
   */
  resourceName: string;

  /**
   * The offset for the first byte to return in the read, relative to the start
   * of the resource.
   *
   * A `read_offset` that is negative or greater than the size of the resource
   * will cause an `OUT_OF_RANGE` error.
   *
   * @generated from field: int64 read_offset = 2;
   */
  readOffset: bigint;

  /**
   * The maximum number of `data` bytes the server is allowed to return in the
   * sum of all `ReadResponse` messages. A `read_limit` of zero indicates that
   * there is no limit, and a negative `read_limit` will cause an error.
   *
   * If the stream returns fewer bytes than allowed by the `read_limit` and no
   * error occurred, the stream includes all data from the `read_offset` to the
   * end of the resource.
   *
   * @generated from field: int64 read_limit = 3;
   */
  readLimit: bigint;
};

/**
 * Describes the message google.bytestream.ReadRequest.
 * Use `create(ReadRequestSchema)` to create a new message.
 */
export const ReadRequestSchema: GenMessage<ReadRequest> = /*@__PURE__*/
  messageDesc(file_google_bytestream_bytestream, 0);

/**
 * Response object for ByteStream.Read.
 *
 * @generated from message google.bytestream.ReadResponse
 */
export type ReadResponse = Message<"google.bytestream.ReadResponse"> & {
  /**
   * A portion of the data for the resource. The service **may** leave `data`
   * empty for any given `ReadResponse`. This enables the service to inform the
   * client that the request is still live while it is running an operation to
   * generate more data.
   *
   * @generated from field: bytes data = 10;
   */
  data: Uint8Array;
};

/**
 * Describes the message google.bytestream.ReadResponse.
 * Use `create(ReadResponseSchema)` to create a new message.
 */
export const ReadResponseSchema: GenMessage<ReadResponse> = /*@__PURE__*/
  messageDesc(file_google_bytestream_bytestream, 1);

/**
 * Request object for ByteStream.Write.
 *
 * @generated from message google.bytestream.WriteRequest
 */
export type WriteRequest = Message<"google.bytestream.WriteRequest"> & {
  /**
   * The name of the resource to write. This **must** be set on the first
   * `WriteRequest` of each `Write()` action. If it is set on subsequent calls,
   * it **must** match the value of the first request.
   *
   * @generated from field: string resource_name = 1;
   */
  resourceName: string;

  /**
   * The offset from the beginning of the resource at which the data should be
   * written. It is required on all `WriteRequest`s.
   *
   * In the first `WriteRequest` of a `Write()` action, it indicates
   * the initial offset for the `Write()` call. The value **must** be equal to
   * the `committed_size` that a call to `QueryWriteStatus()` would return.
   *
   * On subsequent calls, this value **must** be set and **must** be equal to
   * the sum of the first `write_offset` and the sizes of all `data` bundles
   * sent previously on this stream.
   *
   * An incorrect value will cause an error.
   *
   * @generated from field: int64 write_offset = 2;
   */
  writeOffset: bigint;

  /**
   * If `true`, this indicates that the write is complete. Sending any
   * `WriteRequest`s subsequent to one in which `finish_write` is `true` will
   * cause an error.
   *
   * @generated from field: bool finish_write = 3;
   */
  finishWrite: boolean;

  /**
   * A portion of the data for the resource. The client **may** leave `data`
   * empty for any given `WriteRequest`. This enables the client to inform the
   * service that the request is still live while it is running an operation to
   * generate more data.
   *
   * @generated from field: bytes data = 10;
   */
  data: Uint8Array;
};

/**
 * Describes the message google.bytestream.WriteRequest.
 * Use `create(WriteRequestSchema)` to create a new message.
 */
export const WriteRequestSchema: GenMessage<WriteRequest> = /*@__PURE__*/
  messageDesc(file_google_bytestream_bytestream, 2);

/**
 * Response object for ByteStream.Write.
 *
 * @generated from message google.bytestream.WriteResponse
 */
export type WriteResponse = Message<"google.bytestream.WriteResponse"> & {
  /**
   * The number of bytes that have been processed for the given resource.
   *
   * @generated from field: int64 committed_size = 1;
   */
  committedSize: bigint;
};

/**
 * Describes the message google.bytestream.WriteResponse.
 * Use `create(WriteResponseSchema)` to create a new message.
 */
export const WriteResponseSchema: GenMessage<WriteResponse> = /*@__PURE__*/
  messageDesc(file_google_bytestream_bytestream, 3);

/**
 * Request object for ByteStream.QueryWriteStatus.
 *
 * @generated from message google.bytestream.QueryWriteStatusRequest
 */
export type QueryWriteStatusRequest = Message<"google.bytestream.QueryWriteStatusRequest"> & {
  /**
   * The name of the resource whose write status is being requested.
   *
   * @generated from field: string resource_name = 1;
   */
  resourceName: string;
};

/**
 * Describes the message google.bytestream.QueryWriteStatusRequest.
 * Use `create(QueryWriteStatusRequestSchema)` to create a new message.
 */
export const QueryWriteStatusRequestSchema: GenMessage<QueryWriteStatusRequest> = /*@__PURE__*/
  messageDesc(file_google_bytestream_bytestream, 4);

/**
 * Response object for ByteStream.QueryWriteStatus.
 *
 * @generated from message google.bytestream.QueryWriteStatusResponse
 */
export type QueryWriteStatusResponse = Message<"google.bytestream.QueryWriteStatusResponse"> & {
  /**
   * The number of bytes that have been processed for the given resource.
   *
   * @generated from field: int64 committed_size = 1;
   */
  committedSize: bigint;

  /**
   * `complete` is `true` only if the client has sent a `WriteRequest` with
   * `finish_write` set to true, and the server has processed that request.
   *
   * @generated from field: bool complete = 2;
   */
  complete: boolean;
};

/**
 * Describes the message google.bytestream.QueryWriteStatusResponse.
 * Use `create(QueryWriteStatusResponseSchema)` to create a new message.
 */
export const QueryWriteStatusResponseSchema: GenMessage<QueryWriteStatusResponse> = /*@__PURE__*/
  messageDesc(file_google_bytestream_bytestream, 5);

/**
 * #### Introduction
 *
 * The Byte Stream API enables a client to read and write a stream of bytes to
 * and from a resource. Resources have names, and these names are supplied in
 * the API calls below to identify the resource that is being read from or
 * written to.
 *
 * All implementations of the Byte Stream API export the interface defined here:
 *
 * * `Read()`: Reads the contents of a resource.
 *
 * * `Write()`: Writes the contents of a resource. The client can call `Write()`
 *   multiple times with the same resource and can check the status of the write
 *   by calling `QueryWriteStatus()`.
 *
 * #### Service parameters and metadata
 *
 * The ByteStream API provides no direct way to access/modify any metadata
 * associated with the resource.
 *
 * #### Errors
 *
 * The errors returned by the service are in the Google canonical error space.
 *
 * @generated from service google.bytestream.ByteStream
 */
export const ByteStream: GenService<{
  /**
   * `Read()` is used to retrieve the contents of a resource as a sequence
   * of bytes. The bytes are returned in a sequence of responses, and the
   * responses are delivered as the results of a server-side streaming RPC.
   *
   * @generated from rpc google.bytestream.ByteStream.Read
   */
  read: {
    methodKind: "server_streaming";
    input: typeof ReadRequestSchema;
    output: typeof ReadResponseSchema;
  },
  /**
   * `Write()` is used to send the contents of a resource as a sequence of
   * bytes. The bytes are sent in a sequence of request protos of a client-side
   * streaming RPC.
   *
   * A `Write()` action is resumable. If there is an error or the connection is
   * broken during the `Write()`, the client should check the status of the
   * `Write()` by calling `QueryWriteStatus()` and continue writing from the
   * returned `committed_size`. This may be less than the amount of data the
   * client previously sent.
   *
   * Calling `Write()` on a resource name that was previously written and
   * finalized could cause an error, depending on whether the underlying service
   * allows over-writing of previously written resources.
   *
   * When the client closes the request channel, the service will respond with
   * a `WriteResponse`. The service will not view the resource as `complete`
   * until the client has sent a `WriteRequest` with `finish_write` set to
   * `true`. Sending any requests on a stream after sending a request with
   * `finish_write` set to `true` will cause an error. The client **should**
   * check the `WriteResponse` it receives to determine how much data the
   * service was able to commit and whether the service views the resource as
   * `complete` or not.
   *
   * @generated from rpc google.bytestream.ByteStream.Write
   */
  write: {
    methodKind: "client_streaming";
    input: typeof WriteRequestSchema;
    output: typeof WriteResponseSchema;
  },
  /**
   * `QueryWriteStatus()` is used to find the `committed_size` for a resource
   * that is being written, which can then be used as the `write_offset` for
   * the next `Write()` call.
   *
   * If the resource does not exist (i.e., the resource has been deleted, or the
   * first `Write()` has not yet reached the service), this method returns the
   * error `NOT_FOUND`.
   *
   * The client **may** call `QueryWriteStatus()` at any time to determine how
   * much data has been processed for this resource. This is useful if the
   * client is buffering data and needs to know which data can be safely
   * evicted. For any sequence of `QueryWriteStatus()` calls for a given
   * resource name, the sequence of returned `committed_size` values will be
   * non-decreasing.
   *
   * @generated from rpc google.bytestream.ByteStream.QueryWriteStatus
   */
  queryWriteStatus: {
    methodKind: "unary";
    input: typeof QueryWriteStatusRequestSchema;
    output: typeof QueryWriteStatusResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_google_bytestream_bytestream, 0);

