import {BinaryWriter, base64Decode, getTextEncoding} from "@bufbuild/protobuf/wire";
import {DescMessage, type Message, toBinary} from "@bufbuild/protobuf";

export function testBinaryWriterFinish() {
  const infer = new BinaryWriter().finish();
  const uint8Arr: Uint8Array = new BinaryWriter().finish();
  return [infer, uint8Arr] as const;
}

export function testBase64Decode() {
  const infer = base64Decode("");
  const uint8Arr: Uint8Array = base64Decode("");
  return [infer, uint8Arr] as const;
}

export function testEncodeUtf8() {
  const infer = getTextEncoding().encodeUtf8("");
  const uint8Arr: Uint8Array = getTextEncoding().encodeUtf8("");
  return [infer, uint8Arr] as const;
}

export function testToBinary() {
  const infer = toBinary(null as unknown as DescMessage, null as unknown as Message);
  const uint8Arr: Uint8Array = toBinary(null as unknown as DescMessage, null as unknown as Message);
  return [infer, uint8Arr] as const;
}


