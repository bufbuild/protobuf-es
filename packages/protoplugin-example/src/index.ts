// Copyright 2021-2025 Buf Technologies, Inc.
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

import { ElizaServiceClient } from "./gen/connectrpc/eliza_twirp";
import { SayRequestSchema } from "./gen/connectrpc/eliza_pb";
import { create } from "@bufbuild/protobuf";

const client = new ElizaServiceClient();
const input = document.querySelector("input");
const conversationContainer = document.querySelector("#conversation-container");
if (!input || !conversationContainer) {
  throw new Error();
}

document.querySelector("form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  void send(input.value);
  input.value = "";
});

// Send a sentence to the Eliza service
async function send(sentence: string) {
  addConversationPill(sentence, "user");
  const request = create(SayRequestSchema, { sentence });
  const response = await client.say(request);
  addConversationPill(response.sentence, "eliza");
}

// Adds a node to the DOM representing the conversation with Eliza
function addConversationPill(text: string, sender: string): void {
  const div = document.createElement("div");
  div.className = `${sender}-resp-container`;
  const p = div.appendChild(document.createElement("p"));
  p.className = "resp-text";
  p.innerText = text;
  conversationContainer?.appendChild(div);
}
