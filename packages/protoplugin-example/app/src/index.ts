import { createElizaServiceClient } from "./gen/buf/connect/demo/eliza/v1/eliza_twirp.js";
import {
  IntroduceRequest,
  SayRequest,
} from "./gen/buf/connect/demo/eliza/v1/eliza_pb.js";

let introFinished = false;

const client = createElizaServiceClient({
  baseUrl: "https://demo.connect.build",
});

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
  const sentence = inputEl?.value ?? "";

  addNode(sentence, "user");

  inputEl.value = "";

  if (introFinished) {
    const request = new SayRequest({
      sentence,
    });

    const response = await client.Say(request);

    addNode(response.sentence, "eliza");
  } else {
    const request = new IntroduceRequest({
      name: sentence,
    });
    console.log(request);

    // for await (const response of client.Introduce(request)) {
    //   addNode(response.sentence, "eliza");
    // }

    introFinished = true;
  }
}

export function handleSend() {
  send();
}
