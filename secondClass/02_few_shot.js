// few shot prompting: direct instructions but with some examples
// it inflence by examples
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const result = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `tell me 2+2 ? do not reply anything in answer take the samples from the examples. 
          Examples: 
          what is 5+4 ?
          expected output: 9 (Nine)
          what is 10+10 ?
          expected output: 20 (Twenty) `,
      },
    ],
  });

  console.log("answer from open ai ", result.choices[0].message.content);
}
main();
