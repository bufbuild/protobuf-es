// Copyright 2021-2022 Buf Technologies, Inc.
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

import { ElizaServiceClient } from "./gen/buf/connect/demo/eliza/v1/eliza_twirp.js";
import { SayRequest } from "./gen/buf/connect/demo/eliza/v1/eliza_pb.js";

let introFinished = false;

const client = new ElizaServiceClient("https://demo.connect.build");

// Query for the common elements and cache them.
const containerEl = document.getElementById(
  "conversation-container"
) as HTMLDivElement;
const inputEl = document.getElementById("user-input") as HTMLInputElement;

// Add an event listener to the input so that the user can hit enter and click the Send button
document.getElementById("user-input")?.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.key === "Enter") {
    document.getElementById("send-button")?.click();
  }
});

// Adds a node to the DOM representing the conversation with Eliza
function addNode(text: string, sender: string): void {
  const divEl = document.createElement("div");
  const pEl = document.createElement("p");

  const respContainerEl = containerEl.appendChild(divEl);
  respContainerEl.className = `${sender}-resp-container`;

  const respTextEl = respContainerEl.appendChild(pEl);
  respTextEl.className = "resp-text";
  respTextEl.innerText = text;
}

async function send() {
  const sentence = inputEl.value;

  addNode(sentence, "user");

  inputEl.value = "";

  if (introFinished) {
    const request = new SayRequest({
      sentence,
    });

    const response = await client.say(request);

    addNode(response.sentence, "eliza");
  } else {
    addNode(`Streaming is not supported but we can still chat.  OK?`, "eliza");

    introFinished = true;
  }
}

export function handleSend() {
  void send();
}
