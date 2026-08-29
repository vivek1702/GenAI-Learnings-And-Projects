// to copy one .env file from one folder to another use linus command-- "link .env sdk-tutorials/.env"
// important: for structured output we use zod library, this will help us to structure the output in format we want

import { OpenAI } from "openai";
import dotenv from "dotenv";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
dotenv.config();

const client = new OpenAI();

const riskSchema = z.object({
  title: z.string().describe("the actual title for the risk"),
  tags: z.array(z.string().describe("3-4 tags for the risk")),
  score: z.number().min(1).max(5).describe("risk level out of 5"),
});

const outputSchema = z.object({
  risks: z.array(riskSchema).describe("array of risks"),
});

async function init() {
  const result = await client.responses.parse({
    model: "gpt-4.1-mini",
    text: {
      format: zodTextFormat(outputSchema, "risks"),
    },
    input: `Extract the risks from the following document

      Document:
      Our company recently launched a new software platform. 
      The platform relies on several third-party APIs that may experience downtime. 
      In addition, we are storing customer data in the cloud, and there are strict 
      regulatory requirements regarding data privacy and protection. 
      Some features are still in beta and could potentially introduce bugs 
      that affect user experience. 

      Please list any risks you find in the document above.`,
  });

  console.log(result.output_parsed);
}

init();
