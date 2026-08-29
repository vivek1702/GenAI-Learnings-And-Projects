import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const result = await client.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: "tell me 2+2 ?" }],
  });

  console.log("answer from open ai ", result.choices[0].message.content);
}
main();

// "this is zero shot prompting: direct instructions";
