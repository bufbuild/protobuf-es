import { proto3 } from "@bufbuild/protobuf";
import { it, describe, expect } from "@jest/globals";
import { MessageFieldMessage } from "./gen/ts/extra/msg-message_pb";
import { RepeatedScalarValuesMessage } from "./gen/ts/extra/msg-scalar_pb";
import { makeMessageTypeDynamic, testMT } from "./helpers";
import {
  TestAllTypesProto3 as TS_TestAllTypesProto3,
  // TestAllTypesProto3_NestedMessage as TS_TestAllTypesProto3_NestedMessage,
} from "./gen/ts/google/protobuf/test_messages_proto3_pb.js";
import { TestAllTypesProto3 as JS_TestAllTypesProto3 } from "./gen/js/google/protobuf/test_messages_proto3_pb.js";

describe("mergePartial", () => {
  describe("with scalar fields", () => {
    it("can merge repeated scalar types from right to left", () => {
      const msgType = makeMessageTypeDynamic(RepeatedScalarValuesMessage);

      const msg = new msgType({
        doubleField: [0.75],
      });

      proto3.util.mergePartial(msg, {
        doubleField: [0.5],
      });

      expect(msg.doubleField).toEqual([0.5]);
    });

    it("can merge scalar types from right to left", () => {
      const msgType = makeMessageTypeDynamic(TS_TestAllTypesProto3);

      const msg = new msgType({
        optionalInt32: 123,
        fieldname1: 10, // It should merge this field into the new result.
      });

      proto3.util.mergePartial(msg, {
        optionalInt32: 125,
      });

      expect(msg.fieldname1).toEqual(10);
      expect(msg.optionalInt32).toEqual(125);
    });

    it("can merge scalar messages", () => {
      const msgType = makeMessageTypeDynamic(TS_TestAllTypesProto3);

      const m1 = new msgType({
        optionalInt32: 123,
        fieldname1: 10, // It should merge this field into the new result.
      });

      const m2 = new msgType({
        optionalInt32: 125,
      });

      proto3.util.mergePartial(m1, m2);

      expect(m1.fieldname1).toEqual(10);
      expect(m1.optionalInt32).toEqual(125);
    });

    it("can set field back to default value", () => {
      const msgType = makeMessageTypeDynamic(TS_TestAllTypesProto3);

      const m1 = new msgType({
        optionalInt32: 123,
        fieldname1: 10,
      });

      const m2 = new msgType({
        optionalInt32: 0,
        fieldname1: 0,
      });

      proto3.util.mergePartial(m1, m2, true);

      expect(m1.fieldname1).toEqual(0);
      expect(m1.optionalInt32).toEqual(0);
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

    it("new undefined value overwrites keeps old value", () => {
      const msgType = makeMessageTypeDynamic(RepeatedScalarValuesMessage);

      const msg = new msgType({
        doubleField: [0.75],
      });

      proto3.util.mergePartial(msg, {
        doubleField: undefined,
      });

      expect(msg.doubleField).toEqual([0.75]);
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
          fieldname1: 10, // It should merge this field into the new result.
        }),
      });
      expect(m.recursiveMessage?.optionalInt32).toBe(123);
      proto3.util.mergePartial(m, {
        recursiveMessage: new messageType({
          optionalInt32: 125,
        }),
      });

      expect(m.recursiveMessage?.optionalInt32).toBe(125);
      expect(m.recursiveMessage?.fieldname1).toBe(10);
    });

    it("merges fully-formed message", () => {
      const messageType = makeMessageTypeDynamic(TS_TestAllTypesProto3);
      const m1 = new messageType({
        recursiveMessage: new messageType({
          optionalInt32: 123,
          fieldname1: 10, // It should merge this field into the new result.
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
      expect(m1.recursiveMessage?.fieldname1).toBe(10);
    });
  });

  describe("with oneof fields", () => {
    describe("takes partial message for oneof field", function () {
      testMT(
        { ts: TS_TestAllTypesProto3, js: JS_TestAllTypesProto3 },
        (messageType) => {
          const m = new messageType({
            oneofField: {
              case: "oneofNestedMessage",
              value: {
                corecursive: {
                  optionalInt32: 123,
                },
              },
            },
          });

          expect(m.oneofField.case).toBe("oneofNestedMessage");
          proto3.util.mergePartial(m, {
            oneofField: {
              case: "oneofBool",
              value: true,
            },
          });
          expect(m.oneofField.case).toBe("oneofBool");
          expect(m.oneofField.value).toBe(true);
        }
      );
    });
  });
});
