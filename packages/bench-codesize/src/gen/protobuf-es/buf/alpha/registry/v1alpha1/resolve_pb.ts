/* eslint-disable */
// @generated by protoc-gen-es v0.0.2-alpha.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/resolve.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
//
// Copyright 2020-2022 Buf Technologies, Inc.
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

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import {ModulePin, ModuleReference} from "../../module/v1alpha1/module_pb.js";
import {LocalModulePin, LocalModuleReference} from "./module_pb.js";

/**
 * @generated from enum buf.alpha.registry.v1alpha1.ResolvedReferenceType
 */
export enum ResolvedReferenceType {

    /**
     * @generated from enum value: RESOLVED_REFERENCE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,

    /**
     * @generated from enum value: RESOLVED_REFERENCE_TYPE_COMMIT = 1;
     */
    COMMIT = 1,

    /**
     * @generated from enum value: RESOLVED_REFERENCE_TYPE_BRANCH = 2;
     */
    BRANCH = 2,

    /**
     * @generated from enum value: RESOLVED_REFERENCE_TYPE_TAG = 3;
     */
    TAG = 3,

    /**
     * @generated from enum value: RESOLVED_REFERENCE_TYPE_TRACK = 4;
     */
    TRACK = 4,

}

// Retrieve enum metadata with: proto3.getEnumType(ResolvedReferenceType)
proto3.util.setEnumType(ResolvedReferenceType, "buf.alpha.registry.v1alpha1.ResolvedReferenceType", [
    {no: 0, name: "RESOLVED_REFERENCE_TYPE_UNSPECIFIED"},
    {no: 1, name: "RESOLVED_REFERENCE_TYPE_COMMIT"},
    {no: 2, name: "RESOLVED_REFERENCE_TYPE_BRANCH"},
    {no: 3, name: "RESOLVED_REFERENCE_TYPE_TAG"},
    {no: 4, name: "RESOLVED_REFERENCE_TYPE_TRACK"},
]);

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetModulePinsRequest
 */
export class GetModulePinsRequest extends Message<GetModulePinsRequest> {

    /**
     * @generated from field: repeated buf.alpha.module.v1alpha1.ModuleReference module_references = 1;
     */
    moduleReferences: ModuleReference[] = [];

    /**
     * current_module_pins allows for partial dependency updates by letting clients
     * send a request with the pins for their current module and only the
     * identities of the dependencies they want to update in module_references.
     *
     * When resolving, if a client supplied module pin is:
     * - in the transitive closure of pins resolved from the module_references,
     *   the client supplied module pin will be an extra candidate for tie
     *   breaking.
     * - NOT in the in the transitive closure of pins resolved from the
     *   module_references, it will be returned as is.
     *
     * @generated from field: repeated buf.alpha.module.v1alpha1.ModulePin current_module_pins = 2;
     */
    currentModulePins: ModulePin[] = [];

    constructor(data?: PartialMessage<GetModulePinsRequest>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.registry.v1alpha1.GetModulePinsRequest";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "module_references", kind: "message", T: ModuleReference, repeated: true},
        {no: 2, name: "current_module_pins", kind: "message", T: ModulePin, repeated: true},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetModulePinsRequest {
        return new GetModulePinsRequest().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetModulePinsRequest {
        return new GetModulePinsRequest().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetModulePinsRequest {
        return new GetModulePinsRequest().fromJsonString(jsonString, options);
    }

    static equals(a: GetModulePinsRequest | PlainMessage<GetModulePinsRequest> | undefined, b: GetModulePinsRequest | PlainMessage<GetModulePinsRequest> | undefined): boolean {
        return proto3.util.equals(GetModulePinsRequest, a, b);
    }

}


/**
 * @generated from message buf.alpha.registry.v1alpha1.GetModulePinsResponse
 */
export class GetModulePinsResponse extends Message<GetModulePinsResponse> {

    /**
     * @generated from field: repeated buf.alpha.module.v1alpha1.ModulePin module_pins = 1;
     */
    modulePins: ModulePin[] = [];

    constructor(data?: PartialMessage<GetModulePinsResponse>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.registry.v1alpha1.GetModulePinsResponse";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "module_pins", kind: "message", T: ModulePin, repeated: true},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetModulePinsResponse {
        return new GetModulePinsResponse().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetModulePinsResponse {
        return new GetModulePinsResponse().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetModulePinsResponse {
        return new GetModulePinsResponse().fromJsonString(jsonString, options);
    }

    static equals(a: GetModulePinsResponse | PlainMessage<GetModulePinsResponse> | undefined, b: GetModulePinsResponse | PlainMessage<GetModulePinsResponse> | undefined): boolean {
        return proto3.util.equals(GetModulePinsResponse, a, b);
    }

}


/**
 * @generated from message buf.alpha.registry.v1alpha1.GetLocalModulePinsRequest
 */
export class GetLocalModulePinsRequest extends Message<GetLocalModulePinsRequest> {

    /**
     * @generated from field: repeated buf.alpha.registry.v1alpha1.LocalModuleReference local_module_references = 1;
     */
    localModuleReferences: LocalModuleReference[] = [];

    constructor(data?: PartialMessage<GetLocalModulePinsRequest>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.registry.v1alpha1.GetLocalModulePinsRequest";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "local_module_references", kind: "message", T: LocalModuleReference, repeated: true},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLocalModulePinsRequest {
        return new GetLocalModulePinsRequest().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLocalModulePinsRequest {
        return new GetLocalModulePinsRequest().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLocalModulePinsRequest {
        return new GetLocalModulePinsRequest().fromJsonString(jsonString, options);
    }

    static equals(a: GetLocalModulePinsRequest | PlainMessage<GetLocalModulePinsRequest> | undefined, b: GetLocalModulePinsRequest | PlainMessage<GetLocalModulePinsRequest> | undefined): boolean {
        return proto3.util.equals(GetLocalModulePinsRequest, a, b);
    }

}


/**
 * @generated from message buf.alpha.registry.v1alpha1.LocalModuleResolveResult
 */
export class LocalModuleResolveResult extends Message<LocalModuleResolveResult> {

    /**
     * A copy of the reference that was resolved.
     *
     * @generated from field: buf.alpha.registry.v1alpha1.LocalModuleReference reference = 1;
     */
    reference?: LocalModuleReference;

    /**
     * The pin the reference resolved to.
     *
     * @generated from field: buf.alpha.registry.v1alpha1.LocalModulePin pin = 2;
     */
    pin?: LocalModulePin;

    /**
     * The type the reference resolved as.
     *
     * @generated from field: buf.alpha.registry.v1alpha1.ResolvedReferenceType resolved_reference_type = 3;
     */
    resolvedReferenceType = ResolvedReferenceType.UNSPECIFIED;

    constructor(data?: PartialMessage<LocalModuleResolveResult>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.registry.v1alpha1.LocalModuleResolveResult";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "reference", kind: "message", T: LocalModuleReference},
        {no: 2, name: "pin", kind: "message", T: LocalModulePin},
        {no: 3, name: "resolved_reference_type", kind: "enum", T: proto3.getEnumType(ResolvedReferenceType)},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LocalModuleResolveResult {
        return new LocalModuleResolveResult().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LocalModuleResolveResult {
        return new LocalModuleResolveResult().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LocalModuleResolveResult {
        return new LocalModuleResolveResult().fromJsonString(jsonString, options);
    }

    static equals(a: LocalModuleResolveResult | PlainMessage<LocalModuleResolveResult> | undefined, b: LocalModuleResolveResult | PlainMessage<LocalModuleResolveResult> | undefined): boolean {
        return proto3.util.equals(LocalModuleResolveResult, a, b);
    }

}


/**
 * @generated from message buf.alpha.registry.v1alpha1.GetLocalModulePinsResponse
 */
export class GetLocalModulePinsResponse extends Message<GetLocalModulePinsResponse> {

    /**
     * @generated from field: repeated buf.alpha.registry.v1alpha1.LocalModuleResolveResult local_module_resolve_results = 1;
     */
    localModuleResolveResults: LocalModuleResolveResult[] = [];

    /**
     * dependencies are the dependencies of the LocalModulePins.
     *
     * This includes the transitive deps.
     *
     * @generated from field: repeated buf.alpha.module.v1alpha1.ModulePin dependencies = 2;
     */
    dependencies: ModulePin[] = [];

    constructor(data?: PartialMessage<GetLocalModulePinsResponse>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.registry.v1alpha1.GetLocalModulePinsResponse";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "local_module_resolve_results", kind: "message", T: LocalModuleResolveResult, repeated: true},
        {no: 2, name: "dependencies", kind: "message", T: ModulePin, repeated: true},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLocalModulePinsResponse {
        return new GetLocalModulePinsResponse().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLocalModulePinsResponse {
        return new GetLocalModulePinsResponse().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLocalModulePinsResponse {
        return new GetLocalModulePinsResponse().fromJsonString(jsonString, options);
    }

    static equals(a: GetLocalModulePinsResponse | PlainMessage<GetLocalModulePinsResponse> | undefined, b: GetLocalModulePinsResponse | PlainMessage<GetLocalModulePinsResponse> | undefined): boolean {
        return proto3.util.equals(GetLocalModulePinsResponse, a, b);
    }

}


