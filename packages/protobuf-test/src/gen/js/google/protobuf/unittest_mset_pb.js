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

// Author: kenton@google.com (Kenton Varda)
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// This file is similar to unittest_mset_wire_format.proto, but does not
// have a TestMessageSet, so it can be downgraded to proto1.

// @generated by protoc-gen-es v2.0.0-alpha.1 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file google/protobuf/unittest_mset.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import { extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import { fileDesc_google_protobuf_unittest_mset_wire_format } from "./unittest_mset_wire_format_pb.js";

/**
 * Describes the file google/protobuf/unittest_mset.proto.
 */
export const fileDesc_google_protobuf_unittest_mset = /*@__PURE__*/
  fileDesc("CiNnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfbXNldC5wcm90bxIRcHJvdG9idWZfdW5pdHRlc3QiWgoXVGVzdE1lc3NhZ2VTZXRDb250YWluZXISPwoLbWVzc2FnZV9zZXQYASABKAsyKi5wcm90bzJfd2lyZWZvcm1hdF91bml0dGVzdC5UZXN0TWVzc2FnZVNldCLpAQodTmVzdGVkVGVzdE1lc3NhZ2VTZXRDb250YWluZXISPQoJY29udGFpbmVyGAEgASgLMioucHJvdG9idWZfdW5pdHRlc3QuVGVzdE1lc3NhZ2VTZXRDb250YWluZXISPwoFY2hpbGQYAiABKAsyMC5wcm90b2J1Zl91bml0dGVzdC5OZXN0ZWRUZXN0TWVzc2FnZVNldENvbnRhaW5lchJICgpsYXp5X2NoaWxkGAMgASgLMjAucHJvdG9idWZfdW5pdHRlc3QuTmVzdGVkVGVzdE1lc3NhZ2VTZXRDb250YWluZXJCAigBIlYKDU5lc3RlZFRlc3RJbnQSCQoBYRgBIAEoBxIJCgFiGAMgASgFEi8KBWNoaWxkGAIgASgLMiAucHJvdG9idWZfdW5pdHRlc3QuTmVzdGVkVGVzdEludCKPAgoYVGVzdE1lc3NhZ2VTZXRFeHRlbnNpb24xEgkKAWkYDyABKAUSPQoJcmVjdXJzaXZlGBAgASgLMioucHJvdG8yX3dpcmVmb3JtYXRfdW5pdHRlc3QuVGVzdE1lc3NhZ2VTZXQSGQoNdGVzdF9hbGlhc2luZxgRIAEoCUICCAIyjQEKFW1lc3NhZ2Vfc2V0X2V4dGVuc2lvbhIqLnByb3RvMl93aXJlZm9ybWF0X3VuaXR0ZXN0LlRlc3RNZXNzYWdlU2V0GLCmXiABKAsyKy5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWVzc2FnZVNldEV4dGVuc2lvbjFSE21lc3NhZ2VTZXRFeHRlbnNpb24itwEKGFRlc3RNZXNzYWdlU2V0RXh0ZW5zaW9uMhILCgNzdHIYGSABKAkyjQEKFW1lc3NhZ2Vfc2V0X2V4dGVuc2lvbhIqLnByb3RvMl93aXJlZm9ybWF0X3VuaXR0ZXN0LlRlc3RNZXNzYWdlU2V0GPm7XiABKAsyKy5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWVzc2FnZVNldEV4dGVuc2lvbjJSE21lc3NhZ2VTZXRFeHRlbnNpb24i8AEKGFRlc3RNZXNzYWdlU2V0RXh0ZW5zaW9uMxItCgNtc2cYIyABKAsyIC5wcm90b2J1Zl91bml0dGVzdC5OZXN0ZWRUZXN0SW50EhQKDHJlcXVpcmVkX2ludBgkIAIoBTKOAQoVbWVzc2FnZV9zZXRfZXh0ZW5zaW9uEioucHJvdG8yX3dpcmVmb3JtYXRfdW5pdHRlc3QuVGVzdE1lc3NhZ2VTZXQYqcOOXSABKAsyKy5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWVzc2FnZVNldEV4dGVuc2lvbjNSE21lc3NhZ2VTZXRFeHRlbnNpb24ibgoNUmF3TWVzc2FnZVNldBIzCgRpdGVtGAEgAygKMiUucHJvdG9idWZfdW5pdHRlc3QuUmF3TWVzc2FnZVNldC5JdGVtGigKBEl0ZW0SDwoHdHlwZV9pZBgCIAIoBRIPCgdtZXNzYWdlGAMgAigMQgVIAfgBAQ", [fileDesc_google_protobuf_unittest_mset_wire_format]);

/**
 * Describes the message protobuf_unittest.TestMessageSetContainer.
 * Use `create(TestMessageSetContainerDesc)` to create a new message.
 */
export const TestMessageSetContainerDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_mset, 0);

/**
 * Describes the message protobuf_unittest.NestedTestMessageSetContainer.
 * Use `create(NestedTestMessageSetContainerDesc)` to create a new message.
 */
export const NestedTestMessageSetContainerDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_mset, 1);

/**
 * Describes the message protobuf_unittest.NestedTestInt.
 * Use `create(NestedTestIntDesc)` to create a new message.
 */
export const NestedTestIntDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_mset, 2);

/**
 * Describes the message protobuf_unittest.TestMessageSetExtension1.
 * Use `create(TestMessageSetExtension1Desc)` to create a new message.
 */
export const TestMessageSetExtension1Desc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_mset, 3);

/**
 * @generated from extension: optional protobuf_unittest.TestMessageSetExtension1 message_set_extension = 1545008;
 */
export const TestMessageSetExtension1_message_set_extension = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_mset, 3, 0);

/**
 * Describes the message protobuf_unittest.TestMessageSetExtension2.
 * Use `create(TestMessageSetExtension2Desc)` to create a new message.
 */
export const TestMessageSetExtension2Desc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_mset, 4);

/**
 * @generated from extension: optional protobuf_unittest.TestMessageSetExtension2 message_set_extension = 1547769;
 */
export const TestMessageSetExtension2_message_set_extension = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_mset, 4, 0);

/**
 * Describes the message protobuf_unittest.TestMessageSetExtension3.
 * Use `create(TestMessageSetExtension3Desc)` to create a new message.
 */
export const TestMessageSetExtension3Desc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_mset, 5);

/**
 * @generated from extension: optional protobuf_unittest.TestMessageSetExtension3 message_set_extension = 195273129;
 */
export const TestMessageSetExtension3_message_set_extension = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_mset, 5, 0);

/**
 * Describes the message protobuf_unittest.RawMessageSet.
 * Use `create(RawMessageSetDesc)` to create a new message.
 */
export const RawMessageSetDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_mset, 6);

/**
 * Describes the message protobuf_unittest.RawMessageSet.Item.
 * Use `create(RawMessageSet_ItemDesc)` to create a new message.
 */
export const RawMessageSet_ItemDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_mset, 6, 0);

