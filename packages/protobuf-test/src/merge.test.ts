import { proto3 } from "@bufbuild/protobuf";
import { it, describe, expect } from "@jest/globals";
import { RepeatedScalarValuesMessage } from "./gen/ts/extra/msg-scalar_pb";
import { makeMessageTypeDynamic } from "./helpers";

describe("mergePartial", () => {
  describe("with scalar fields", () => {
    it("can merge scalar types from left to right", () => {
      const msgType = makeMessageTypeDynamic(RepeatedScalarValuesMessage);

      const msg = new msgType({
        doubleField: [0.75],
      });

      proto3.util.mergePartial(msg, {
        doubleField: [0.5],
      });

      expect(msg.doubleField).toEqual([0.5]);
    });

    it("new value overwrites old value", () => {
      const msgType = makeMessageTypeDynamic(RepeatedScalarValuesMessage);

      const msg = new msgType({
        doubleField: [0.75],
      });

      proto3.util.mergePartial(msg, {
        doubleField: [0.5],
      });

      expect(msg.doubleField).toEqual([0.5]);
    });

    it("new default value overwrites old value", () => {
      const msgType = makeMessageTypeDynamic(RepeatedScalarValuesMessage);

      const msg = new msgType({
        doubleField: [0.75],
      });

      proto3.util.mergePartial(msg, {
        doubleField: [0],
      });

      expect(msg.doubleField).toEqual([0]);
    });

    it("omitted value does not overwrite existing value", () => {
      const msgType = makeMessageTypeDynamic(RepeatedScalarValuesMessage);

      const msg = new msgType({
        doubleField: [0.75],
      });

      proto3.util.mergePartial(msg, {});

      expect(msg.doubleField).toEqual([0.75]);
    });
    it("repeated fields are overwritten", () => {
      const msgType = makeMessageTypeDynamic(RepeatedScalarValuesMessage);

      const msg = new msgType({
        doubleField: [0.75],
      });

      proto3.util.mergePartial(msg, {
        doubleField: [0.5, 0.25],
      });

      expect(msg.doubleField).toEqual([0.5, 0.25]);
    });

    it("int64 fields are overritten", () => {
      const msgType = makeMessageTypeDynamic(RepeatedScalarValuesMessage);

      const msg = new msgType({
        int64Field: [BigInt(0)],
      });

      proto3.util.mergePartial(msg, {
        int64Field: [BigInt(1)],
      });

      expect(msg.int64Field).toEqual([BigInt(1)]);
    });
  });
});
