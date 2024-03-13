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

import { describe, expect, test } from "@jest/globals";
import { readFileSync } from "fs";

import type {
  AnyMessage,
  DescExtension,
  DescMessage,
  DescEnum,
} from "@bufbuild/protobuf";
import {
  createDescriptorSet,
  Edition,
  FeatureSet,
  FeatureSet_EnumType,
  FeatureSet_FieldPresence,
  FeatureSet_JsonFormat,
  FeatureSet_MessageEncoding,
  FeatureSet_RepeatedFieldEncoding,
  FeatureSet_Utf8Validation,
  FeatureSetDefaults,
  FeatureSetDefaults_FeatureSetEditionDefault,
  isMessage,
  protoInt64,
  ScalarType,
} from "@bufbuild/protobuf";
import assert from "node:assert";
import { UpstreamProtobuf } from "upstream-protobuf";

/**
 * A rough implementation of the edition feature resolution. Does not support
 * extensions.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/main/docs/design/editions/protobuf-editions-design-features.md#specification-of-an-edition
 *
 * @private experimental, API may change drastically
 */
export class FeatureResolver {
  static compileDefaults(
    minimumEdition: Edition,
    maximumEdition: Edition,
    descFeatureSet: DescMessage,
    ...descExtensions: DescExtension[]
  ): FeatureSetDefaults {
    if (minimumEdition > maximumEdition) {
      throw new Error(
        `Invalid edition range, edition ${Edition[minimumEdition]} is newer than edition ${Edition[maximumEdition]}.`,
      );
    }
    validateFeatureSetDescriptor(descFeatureSet);

    // Collect all the editions with unique defaults.
    const collector = new EditionCollector(minimumEdition, maximumEdition);
    collector.add(descFeatureSet);
    for (const extension of descExtensions) {
      validateExtension(extension);
      collector.add(extension.message);
    }
    const editions = collector.get();

    const defaults = new FeatureSetDefaults({
      minimumEdition,
      maximumEdition,
    });
    for (const edition of editions) {
      defaults.defaults.push(
        new FeatureSetDefaults_FeatureSetEditionDefault({
          edition,
          features: fillDefaults(edition, descFeatureSet, ...descExtensions),
        }),
      );
    }
    return defaults;
  }

  static create(
    edition: Edition,
    compiledFeatureSetDefaults: FeatureSetDefaults,
  ): FeatureResolver {
    const minimumEdition = compiledFeatureSetDefaults.minimumEdition ?? 0;
    const maximumEdition = compiledFeatureSetDefaults.maximumEdition ?? 0;
    if (edition < minimumEdition) {
      throw new Error(
        `Edition ${Edition[edition]} is earlier than the minimum supported edition ${Edition[minimumEdition]}`,
      );
    }
    if (maximumEdition < edition) {
      throw new Error(
        `Edition ${Edition[edition]} is later than the maximum supported edition ${Edition[maximumEdition]}`,
      );
    }
    let prevEdition = Edition.EDITION_UNKNOWN;
    for (const editionDefault of compiledFeatureSetDefaults.defaults) {
      const editionDefaultEdition = editionDefault.edition ?? 0;
      if (editionDefaultEdition === Edition.EDITION_UNKNOWN) {
        throw new Error(
          `Invalid edition ${Edition[editionDefaultEdition]} specified.`,
        );
      }
      if (prevEdition !== Edition.EDITION_UNKNOWN) {
        if (editionDefaultEdition <= prevEdition) {
          throw new Error(
            `Feature set defaults are not strictly increasing. Edition ${
              Edition[prevEdition]
            } is greater than or equal to edition ${
              Edition[editionDefault.edition ?? 0]
            }.`,
          );
        }
      }
      validateMergedFeatures(editionDefault.features ?? new FeatureSet());
      prevEdition = editionDefaultEdition;
    }
    const highestMatch = findHighestMatchingEdition(
      edition,
      compiledFeatureSetDefaults.defaults,
    );
    if (highestMatch?.features === undefined) {
      throw new Error(`No valid default found for edition ${Edition[edition]}`);
    }
    return new FeatureResolver(highestMatch.features);
  }

  private constructor(private readonly defaults: FeatureSet) {}

  mergeFeatures(
    mergedParent: FeatureSet,
    unmergedChild: FeatureSet,
  ): FeatureSet {
    const features = new FeatureSet();
    features.fromBinary(this.defaults.toBinary());
    features.fromBinary(mergedParent.toBinary());
    features.fromBinary(unmergedChild.toBinary());
    validateMergedFeatures(features);
    return features;
  }
}

class EditionCollector {
  private readonly set = new Set<Edition>();

  constructor(
    private readonly minimumEdition: Edition,
    private readonly maximumEdition: Edition,
  ) {}

  add(descMessage: DescMessage) {
    for (const field of descMessage.fields) {
      const def = field.proto.options?.editionDefaults;
      if (def === undefined) {
        continue;
      }
      for (const { edition } of def) {
        if (edition === undefined) {
          continue;
        }
        if (this.maximumEdition < edition) {
          continue;
        }
        this.set.add(edition);
      }
    }
  }

  get() {
    const editions = Array.from(this.set.values()).sort((a, b) => a - b);
    if (editions.length == 0 || editions[0] > this.minimumEdition) {
      // Always insert the minimum edition to make sure the full range is covered
      // in valid defaults.
      editions.unshift(this.minimumEdition);
    }
    return editions;
  }
}

function fillDefaults(
  edition: Edition,
  descFeatureSet: DescMessage,
  ...descExtensions: DescExtension[] // eslint-disable-line @typescript-eslint/no-unused-vars -- TODO extensions
): FeatureSet {
  const featureSet = new FeatureSet();
  for (const field of descFeatureSet.fields) {
    const fieldLocalName = FeatureSet.fields.find(field.number)?.localName;
    if (fieldLocalName === undefined) {
      throw new Error(
        `Cannot find local name for feature field ${field.parent.typeName}.${field.name}`,
      );
    }
    const highestMatch = findHighestMatchingEdition(
      edition,
      field.proto.options?.editionDefaults.concat() ?? [],
    );
    if (highestMatch === undefined) {
      throw new Error(
        `No valid default found for edition ${Edition[edition]} in feature field ${field.parent.typeName}.${field.name}`,
      );
    }
    let value: unknown;
    switch (field.fieldKind) {
      case "message":
        throw new Error(
          `Cannot parse default value for edition ${Edition[edition]} in feature field ${field.parent.typeName}.${field.name}. Text format for messages is not implemented.`,
        );
      case "scalar":
        value = parseTextFormatScalarValue(
          field.scalar,
          highestMatch.value ?? "",
        );
        break;
      case "enum":
        value = parseTextFormatEnumValue(field.enum, highestMatch.value ?? "");
        break;
      case "map":
        throw new Error(
          `Cannot parse default value for edition ${Edition[edition]} in feature field ${field.parent.typeName}.${field.name}. Map field is unexpected.`,
        );
    }
    (featureSet as AnyMessage)[fieldLocalName] = value;
  }
  return featureSet;
}

function validateFeatureSetDescriptor(descFeatureSet: DescMessage) {
  if (descFeatureSet.oneofs.length > 0) {
    throw new Error(
      `Type ${descFeatureSet.typeName} contains unsupported oneof feature fields.`,
    );
  }
  for (const field of descFeatureSet.fields) {
    if (!field.optional) {
      throw new Error(
        `Feature field ${field.parent.typeName}.${field.name} is an unsupported required field.`,
      );
    }
    if (field.repeated) {
      throw new Error(
        `Feature field ${field.parent.typeName}.${field.name} is an unsupported repeated field.`,
      );
    }
    if ((field.proto.options?.targets.length ?? 0) === 0) {
      throw new Error(
        `Feature field ${field.parent.typeName}.${field.name} has no target specified.`,
      );
    }
  }
}

function validateExtension(
  descExtension: DescExtension,
): asserts descExtension is DescExtension & { fieldKind: "message" } {
  if (descExtension.fieldKind !== "message") {
    throw new Error(
      `Extension ${descExtension.typeName} is not of message type. Feature extensions should always use messages to allow for evolution.`,
    );
  }
  if (descExtension.message.typeName !== FeatureSet.typeName) {
    throw new Error(
      `Extension ${descExtension.typeName} is not an extension of ${FeatureSet.typeName}.`,
    );
  }
  if (descExtension.repeated) {
    throw new Error(
      `Only singular features extensions are supported. Found repeated extension ${descExtension.typeName}.`,
    );
  }
  if (
    descExtension.message.nestedExtensions.length > 0 ||
    descExtension.message.proto.extensionRange.length > 0
  ) {
    throw new Error(
      `Nested extensions in feature extension ${descExtension.typeName} are not supported.`,
    );
  }
}

function validateMergedFeatures(featureSet: FeatureSet) {
  function checkEnumFeature(
    fieldLocalName:
      | "fieldPresence"
      | "enumType"
      | "repeatedFieldEncoding"
      | "utf8Validation"
      | "messageEncoding"
      | "jsonFormat",
  ) {
    const value = featureSet[fieldLocalName] ?? 0;
    if (value === 0) {
      const field = featureSet
        .getType()
        .fields.list()
        .find((f) => f.localName === fieldLocalName);
      const fieldProtoName = field?.name ?? fieldLocalName;
      throw new Error(
        `Feature field ${
          featureSet.getType().typeName
        }.${fieldProtoName} must resolve to a known value.`,
      );
    }
  }

  checkEnumFeature("fieldPresence");
  checkEnumFeature("enumType");
  checkEnumFeature("repeatedFieldEncoding");
  checkEnumFeature("utf8Validation");
  checkEnumFeature("messageEncoding");
  checkEnumFeature("jsonFormat");
}

// Find latest edition in the given defaults that is earlier or equal to the given edition.
// See https://github.com/protocolbuffers/protobuf/blob/main/docs/design/editions/protobuf-editions-design-features.md#specification-of-an-edition
function findHighestMatchingEdition<
  T extends { edition?: Edition | undefined },
>(edition: Edition, defaults: T[]): T | undefined {
  const d = defaults
    .concat()
    .sort((a, b) => (a.edition ?? 0) - (b.edition ?? 0));
  let highestMatch: T | undefined = undefined;
  for (let i = d.length - 1; i >= 0; i--) {
    const c = d[i];
    if ((c.edition ?? 0) <= edition) {
      highestMatch = c;
      break;
    }
  }
  return highestMatch;
}

export function parseTextFormatEnumValue(
  descEnum: DescEnum,
  value: string,
): number {
  const enumValue = descEnum.values.find((v) => v.name === value);
  assert(enumValue, `cannot parse ${descEnum.name} default value: ${value}`);
  return enumValue.number;
}

export function parseTextFormatScalarValue(
  type: ScalarType,
  value: string,
): number | boolean | string | bigint | Uint8Array {
  switch (type) {
    case ScalarType.STRING:
      return value;
    case ScalarType.BYTES: {
      const u = unescapeBytesDefaultValue(value);
      if (u === false) {
        throw new Error(
          `cannot parse ${ScalarType[type]} default value: ${value}`,
        );
      }
      return u;
    }
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return protoInt64.parse(value);
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return protoInt64.uParse(value);
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      switch (value) {
        case "inf":
          return Number.POSITIVE_INFINITY;
        case "-inf":
          return Number.NEGATIVE_INFINITY;
        case "nan":
          return Number.NaN;
        default:
          return parseFloat(value);
      }
    case ScalarType.BOOL:
      return value === "true";
    case ScalarType.INT32:
    case ScalarType.UINT32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
      return parseInt(value, 10);
  }
}

/**
 * Parses a text-encoded default value (proto2) of a BYTES field.
 */
function unescapeBytesDefaultValue(str: string): Uint8Array | false {
  const b: number[] = [];
  const input = {
    tail: str,
    c: "",
    next(): boolean {
      if (this.tail.length == 0) {
        return false;
      }
      this.c = this.tail[0];
      this.tail = this.tail.substring(1);
      return true;
    },
    take(n: number): string | false {
      if (this.tail.length >= n) {
        const r = this.tail.substring(0, n);
        this.tail = this.tail.substring(n);
        return r;
      }
      return false;
    },
  };
  while (input.next()) {
    switch (input.c) {
      case "\\":
        if (input.next()) {
          switch (input.c as string) {
            case "\\":
              b.push(input.c.charCodeAt(0));
              break;
            case "b":
              b.push(0x08);
              break;
            case "f":
              b.push(0x0c);
              break;
            case "n":
              b.push(0x0a);
              break;
            case "r":
              b.push(0x0d);
              break;
            case "t":
              b.push(0x09);
              break;
            case "v":
              b.push(0x0b);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const s = input.c;
              const t = input.take(2);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 8);
              if (isNaN(n)) {
                return false;
              }
              b.push(n);
              break;
            }
            case "x": {
              const s = input.c;
              const t = input.take(2);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 16);
              if (isNaN(n)) {
                return false;
              }
              b.push(n);
              break;
            }
            case "u": {
              const s = input.c;
              const t = input.take(4);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 16);
              if (isNaN(n)) {
                return false;
              }
              const chunk = new Uint8Array(4);
              const view = new DataView(chunk.buffer);
              view.setInt32(0, n, true);
              b.push(chunk[0], chunk[1], chunk[2], chunk[3]);
              break;
            }
            case "U": {
              const s = input.c;
              const t = input.take(8);
              if (t === false) {
                return false;
              }
              const tc = protoInt64.uEnc(s + t);
              const chunk = new Uint8Array(8);
              const view = new DataView(chunk.buffer);
              view.setInt32(0, tc.lo, true);
              view.setInt32(4, tc.hi, true);
              b.push(
                chunk[0],
                chunk[1],
                chunk[2],
                chunk[3],
                chunk[4],
                chunk[5],
                chunk[6],
                chunk[7],
              );
              break;
            }
          }
        }
        break;
      default:
        b.push(input.c.charCodeAt(0));
    }
  }
  return new Uint8Array(b);
}

describe("FeatureResolver", function () {
  const set = createDescriptorSet(readFileSync("./descriptorset.binpb"));
  const descFeatureSet = set.messages.get(FeatureSet.typeName);
  assert(descFeatureSet !== undefined);

  describe("default features", () => {
    const featureSetDefaults = FeatureResolver.compileDefaults(
      Edition.EDITION_PROTO2,
      Edition.EDITION_2023,
      descFeatureSet,
    );
    test("equals protoc", async () => {
      const protocDefaults = FeatureSetDefaults.fromBinary(
        await new UpstreamProtobuf().getFeatureSetDefaults("PROTO2", "2023"),
      );
      expect(featureSetDefaults.equals(protocDefaults)).toBeTruthy();
    });
    test("EDITION_PROTO2", () => {
      const { edition, features } = featureSetDefaults.defaults[0];
      expect(edition).toBe(Edition.EDITION_PROTO2);
      const f = features ?? new FeatureSet();
      expect(f.fieldPresence).toBe(FeatureSet_FieldPresence.EXPLICIT);
      expect(f.enumType).toBe(FeatureSet_EnumType.CLOSED);
      expect(f.repeatedFieldEncoding).toBe(
        FeatureSet_RepeatedFieldEncoding.EXPANDED,
      );
      expect(f.utf8Validation).toBe(FeatureSet_Utf8Validation.NONE);
      expect(f.messageEncoding).toBe(
        FeatureSet_MessageEncoding.LENGTH_PREFIXED,
      );
      expect(f.jsonFormat).toBe(FeatureSet_JsonFormat.LEGACY_BEST_EFFORT);
    });
    test("EDITION_PROTO3", () => {
      const { edition, features } = featureSetDefaults.defaults[1];
      expect(edition).toBe(Edition.EDITION_PROTO3);
      const f = features ?? new FeatureSet();
      expect(f.fieldPresence).toBe(FeatureSet_FieldPresence.IMPLICIT);
      expect(f.enumType).toBe(FeatureSet_EnumType.OPEN);
      expect(f.repeatedFieldEncoding).toBe(
        FeatureSet_RepeatedFieldEncoding.PACKED,
      );
      expect(f.utf8Validation).toBe(FeatureSet_Utf8Validation.VERIFY);
      expect(f.messageEncoding).toBe(
        FeatureSet_MessageEncoding.LENGTH_PREFIXED,
      );
      expect(f.jsonFormat).toBe(FeatureSet_JsonFormat.ALLOW);
    });
    test("EDITION_2023", () => {
      const { edition, features } = featureSetDefaults.defaults[2];
      expect(edition).toBe(Edition.EDITION_2023);
      const f = features ?? new FeatureSet();
      expect(f.fieldPresence).toBe(FeatureSet_FieldPresence.EXPLICIT);
      expect(f.enumType).toBe(FeatureSet_EnumType.OPEN);
      expect(f.repeatedFieldEncoding).toBe(
        FeatureSet_RepeatedFieldEncoding.PACKED,
      );
      expect(f.utf8Validation).toBe(FeatureSet_Utf8Validation.VERIFY);
      expect(f.messageEncoding).toBe(
        FeatureSet_MessageEncoding.LENGTH_PREFIXED,
      );
      expect(f.jsonFormat).toBe(FeatureSet_JsonFormat.ALLOW);
    });
  });

  // Tests ported from https://github.com/protocolbuffers/protobuf/blob/65cdac4ac5631163d0ffe08957838c754155750d/src/google/protobuf/feature_resolver_test.cc
  //
  // Not ported because we do not support extensions:
  // - DefaultsTest2023
  // - DefaultsTestMessageExtension
  // - DefaultsTestNestedExtension
  // - DefaultsGeneratedPoolCustom
  // - DefaultsFarFuture
  // - DefaultsMiddleEdition
  // - DefaultsMessageMerge
  // - CompileDefaultsInvalidExtension
  // - MergeFeaturesChildOverrideComplex
  // - MergeFeaturesParentOverrides
  // - MergeFeaturesExtensionEnumUnknown
  // - CompileDefaultsInvalidNonMessage
  // - CompileDefaultsInvalidRepeated
  // - CompileDefaultsInvalidWithExtensions
  // - CompileDefaultsInvalidWithOneof
  // - CompileDefaultsInvalidWithRequired
  // - CompileDefaultsInvalidWithRepeated
  // - CompileDefaultsInvalidWithMissingTarget
  // - CompileDefaultsInvalidDefaultsMessageParsingError
  // - CompileDefaultsInvalidDefaultsMessageParsingErrorMerged
  // - CompileDefaultsInvalidDefaultsMessageParsingErrorSkipped
  // - CompileDefaultsInvalidDefaultsScalarParsingError
  // - CompileDefaultsInvalidDefaultsScalarParsingErrorSkipped
  // - CompileDefaultsInvalidDefaultsTooEarly
  // - CompileDefaultsMinimumTooEarly
  // - CompileDefaultsMinimumCovered
  //
  // Not ported because scenario does not apply:
  // - CompileDefaultsMissingDescriptor
  // - CompileDefaultsMissingExtension
  describe("ported tests", () => {
    function getDefaults(
      edition: Edition,
      compiledFeatureSetDefaults: FeatureSetDefaults,
    ): FeatureSet;
    function getDefaults(
      edition: Edition,
      descFeatureSet: DescMessage,
      ...descExtensions: DescExtension[]
    ): FeatureSet;
    function getDefaults(edition: Edition, ...rest: unknown[]) {
      if (isMessage(rest[0], FeatureSetDefaults)) {
        const compiledFeatureSetDefaults = rest[0];
        const resolver = FeatureResolver.create(
          edition,
          compiledFeatureSetDefaults,
        );
        return resolver.mergeFeatures(new FeatureSet(), new FeatureSet());
      } else {
        const descFeatureSet = rest[0] as DescMessage;
        const descExtensions = rest.slice(1) as DescExtension[];
        const compiledFeatureSetDefaults = FeatureResolver.compileDefaults(
          Edition.EDITION_2023,
          Edition.EDITION_99999_TEST_ONLY,
          descFeatureSet,
          ...descExtensions,
        );
        return getDefaults(edition, compiledFeatureSetDefaults);
      }
    }

    function setupFeatureResolver(
      edition: Edition,
      descFeatureSet: DescMessage,
      ...descExtensions: DescExtension[]
    ) {
      const defaults = FeatureResolver.compileDefaults(
        Edition.EDITION_2023,
        Edition.EDITION_99997_TEST_ONLY,
        descFeatureSet,
        ...descExtensions,
      );
      return FeatureResolver.create(edition, defaults);
    }

    test("DefaultsCore2023", function () {
      const merged = getDefaults(Edition.EDITION_2023, descFeatureSet);
      expect(merged.fieldPresence).toBe(FeatureSet_FieldPresence.EXPLICIT);
      expect(merged.enumType).toBe(FeatureSet_EnumType.OPEN);
      expect(merged.repeatedFieldEncoding).toBe(
        FeatureSet_RepeatedFieldEncoding.PACKED,
      );
      expect(merged.utf8Validation).toBe(FeatureSet_Utf8Validation.VERIFY);
      expect(merged.messageEncoding).toBe(
        FeatureSet_MessageEncoding.LENGTH_PREFIXED,
      );
      expect(merged.jsonFormat).toBe(FeatureSet_JsonFormat.ALLOW);
    });
    test("CreateFromUnsortedDefaults", () => {
      const featureSetDefaults = FeatureResolver.compileDefaults(
        Edition.EDITION_2023,
        Edition.EDITION_99999_TEST_ONLY,
        descFeatureSet,
      );
      // swap elements 0 and 1
      const [d0, d1, ...drest] = featureSetDefaults.defaults;
      featureSetDefaults.defaults = [d1, d0, ...drest];
      expect(() =>
        FeatureResolver.create(Edition.EDITION_2023, featureSetDefaults),
      ).toThrowError(
        "Feature set defaults are not strictly increasing. Edition EDITION_PROTO3 is greater than or equal to edition EDITION_PROTO2.",
      );
    });
    test("CreateUnknownEdition", () => {
      const featureSetDefaults = new FeatureSetDefaults({
        minimumEdition: Edition.EDITION_UNKNOWN,
        maximumEdition: Edition.EDITION_99999_TEST_ONLY,
        defaults: [{ edition: Edition.EDITION_UNKNOWN, features: {} }],
      });
      expect(() =>
        FeatureResolver.create(Edition.EDITION_2023, featureSetDefaults),
      ).toThrowError("Invalid edition EDITION_UNKNOWN specified.");
    });
    test("CreateMissingEdition", () => {
      const featureSetDefaults = new FeatureSetDefaults({
        minimumEdition: Edition.EDITION_UNKNOWN,
        maximumEdition: Edition.EDITION_99999_TEST_ONLY,
        defaults: [{ features: {} }],
      });
      expect(() =>
        FeatureResolver.create(Edition.EDITION_2023, featureSetDefaults),
      ).toThrowError("Invalid edition EDITION_UNKNOWN specified.");
    });
    test("CreateUnknownEnumFeature", () => {
      const validDefaults = FeatureResolver.compileDefaults(
        Edition.EDITION_2023,
        Edition.EDITION_2023,
        descFeatureSet,
      );

      // Use reflection to walk through every feature field
      for (const field of descFeatureSet.fields) {
        const fieldLocalName = FeatureSet.fields.find(field.number)?.localName;
        if (fieldLocalName === undefined) {
          continue;
        }
        const defaults = validDefaults.clone();
        if (defaults.defaults.length === 0) {
          continue;
        }
        const features = defaults.defaults[0].features;
        if (features === undefined) {
          continue;
        }
        // Clear the feature, which should be invalid
        (features as AnyMessage)[fieldLocalName] = undefined;
        expect(() =>
          FeatureResolver.create(Edition.EDITION_2023, defaults),
        ).toThrow(
          /Feature field google\.protobuf\.FeatureSet\..+ must resolve to a known value\./,
        );
        // Also test zero-value
        (features as AnyMessage)[fieldLocalName] = 0;
        expect(() =>
          FeatureResolver.create(Edition.EDITION_2023, defaults),
        ).toThrow(
          /Feature field google\.protobuf\.FeatureSet\..+ must resolve to a known value\./,
        );
      }
    });
    test("CompileDefaultsMinimumLaterThanMaximum", () => {
      expect(() =>
        FeatureResolver.compileDefaults(
          Edition.EDITION_99999_TEST_ONLY,
          Edition.EDITION_2023,
          descFeatureSet,
        ),
      ).toThrowError(
        "Invalid edition range, edition EDITION_99999_TEST_ONLY is newer than edition EDITION_2023.",
      );
    });
    test("MergeFeaturesChildOverrideCore", () => {
      const resolver = setupFeatureResolver(
        Edition.EDITION_2023,
        descFeatureSet,
      );
      const child = new FeatureSet({
        fieldPresence: FeatureSet_FieldPresence.IMPLICIT,
        repeatedFieldEncoding: FeatureSet_RepeatedFieldEncoding.EXPANDED,
      });
      const merged = resolver.mergeFeatures(new FeatureSet(), child);
      expect(merged.fieldPresence).toBe(FeatureSet_FieldPresence.IMPLICIT);
      expect(merged.enumType).toBe(FeatureSet_EnumType.OPEN);
      expect(merged.repeatedFieldEncoding).toBe(
        FeatureSet_RepeatedFieldEncoding.EXPANDED,
      );
      expect(merged.messageEncoding).toBe(
        FeatureSet_MessageEncoding.LENGTH_PREFIXED,
      );
    });
    test("MergeFeaturesUnknownEnumFeature", () => {
      const resolver = setupFeatureResolver(
        Edition.EDITION_2023,
        descFeatureSet,
      );
      for (const field of FeatureSet.fields.list()) {
        const features = new FeatureSet();
        // Set the feature to a value of 0, which is unknown by convention.
        (features as AnyMessage)[field.localName] = 0;
        expect(() =>
          resolver.mergeFeatures(new FeatureSet(), features),
        ).toThrow(
          /Feature field google\.protobuf\.FeatureSet\..+ must resolve to a known value\./,
        );
      }
    });
    test("MergeFeaturesDistantPast", () => {
      expect(() =>
        setupFeatureResolver(Edition.EDITION_1_TEST_ONLY, descFeatureSet),
      ).toThrowError(
        "Edition EDITION_1_TEST_ONLY is earlier than the minimum supported edition EDITION_2023",
      );
    });
    test("MergeFeaturesDistantFuture", () => {
      expect(() =>
        setupFeatureResolver(Edition.EDITION_99998_TEST_ONLY, descFeatureSet),
      ).toThrowError(
        "Edition EDITION_99998_TEST_ONLY is later than the maximum supported edition EDITION_99997_TEST_ONLY",
      );
    });
    test("DefaultsTooEarly", () => {
      const defaults = FeatureResolver.compileDefaults(
        Edition.EDITION_2023,
        Edition.EDITION_2023,
        descFeatureSet,
      );
      defaults.minimumEdition = Edition.EDITION_1_TEST_ONLY;
      expect(() =>
        getDefaults(Edition.EDITION_1_TEST_ONLY, defaults),
      ).toThrowError("No valid default found for edition EDITION_1_TEST_ONLY");
    });
  });
});
