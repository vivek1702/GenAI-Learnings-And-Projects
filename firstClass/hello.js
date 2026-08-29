import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

// console.log(dotenv.config());
// console.log(process.env.OPENAI_API_KEY);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

client.chat.completions
  .create({
    model: "gpt-4",
    messages: [{ role: "user", content: "how are you" }],
  })
  .then((response) => {
    console.log(response.choices[0].message.content);
  });
