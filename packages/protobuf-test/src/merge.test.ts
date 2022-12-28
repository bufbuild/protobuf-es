import { proto3 } from "@bufbuild/protobuf";
import { it, describe, expect } from "@jest/globals";
import { MessageFieldMessage } from "./gen/ts/extra/msg-message_pb";
import { RepeatedScalarValuesMessage } from "./gen/ts/extra/msg-scalar_pb";
import { makeMessageTypeDynamic } from "./helpers";
import {
  TestAllTypesProto3 as TS_TestAllTypesProto3,
  // TestAllTypesProto3_NestedMessage as TS_TestAllTypesProto3_NestedMessage,
} from "./gen/ts/google/protobuf/test_messages_proto3_pb.js";

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

  describe("with message fields", () => {
    it("can deep merge message fields recursively", () => {
      const msgType = makeMessageTypeDynamic(MessageFieldMessage);

      const msg = new msgType({
        messageField: {
          name: "foo",
        },
        repeatedMessageField: [
          {
            name: "bar",
          },
          {
            name: "baz",
          },
        ],
      });

      proto3.util.mergePartial(msg, {
        messageField: {
          name: "qux",
        },
        repeatedMessageField: [
          {
            name: "new-bar",
          },
          {
            name: "baz",
          },
        ],
      });

      expect(msg.messageField).toEqual({ name: "qux" });
      expect(msg.repeatedMessageField).toEqual([
        {
          name: "new-bar",
        },
        {
          name: "baz",
        },
      ]);
    });

    it("keeps original value if source field is undefined", () => {
      const msgType = makeMessageTypeDynamic(MessageFieldMessage);

      const msg = new msgType({
        messageField: {
          name: "foo",
        },
      });

      proto3.util.mergePartial(msg, {
        messageField: undefined,
      });

      expect(msg.messageField).toEqual({ name: "foo" });
    });

    it("merges recursive messages", () => {
      const messageType = makeMessageTypeDynamic(TS_TestAllTypesProto3);
      const m = new messageType({
        recursiveMessage: new messageType({
          optionalInt32: 123,
        }),
      });
      expect(m.recursiveMessage?.optionalInt32).toBe(123);
      proto3.util.mergePartial(m, {
        recursiveMessage: new messageType({
          optionalInt32: 125,
        }),
      });

      expect(m.recursiveMessage?.optionalInt32).toBe(125);
    });

    it("merges fully formed messages", () => {
      const messageType = makeMessageTypeDynamic(TS_TestAllTypesProto3);
      const m1 = new messageType({
        recursiveMessage: new messageType({
          optionalInt32: 123,
        }),
      });
      const m2 = new messageType({
        recursiveMessage: new messageType({
          optionalInt32: 125,
        }),
      });

      expect(m1.recursiveMessage?.optionalInt32).toBe(123);
      proto3.util.mergePartial(m1, m2);
      expect(m1.recursiveMessage?.optionalInt32).toBe(125);
    });
  });
});
