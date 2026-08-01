import { Anthropic } from "@anthropic-ai/sdk";
const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"], // This is the default and can be omitted
});

async function init() {
  const message = await client.messages.create({
    model: "claude-3-5-sonnet",
    // max_tokens: 1024,
    messages: [{ role: "user", content: "Hello, Claude!" }],
  });

  for (const block of message.content) {
    if (block.type === "text") {
      console.log(block.text);
    }
  }
}
init();
