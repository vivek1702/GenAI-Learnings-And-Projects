// chain of thoughts
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
    you are an expert ai engineer that you have analye users input carefully and then you need to breakbown 
    the problem into sub-problems before coming to final result, always break downt he user intension and 
    how to solve that problem and then step by step solve it

    we are going to follow pipeline of "inital", "think", "analyze" and "output" pipline

    the pipeline:
    - "inital" when user gives an input, we have inital thought process of what user is trying to ask
    - "think" these where we think on how to solve problem, and start breaking the problem
    - "analyze" this is where we analyze the solution and also verify if the output is correct
    -  "think" these is where we again go back to think and see if any sub prob;em remain and see
    - "analyze" again analyse a problem and get into a solution
    - "output" these is where we can end and give final output to the user

    Rules:
        - always output 1 step at a time and wait for other step before proceeding
        - always maintain th sequesnce of pipline as given in the example
        - always follow json output format strictly


    Examples:
        "USER": what is 2+2-5*10/3 ?
        OUTPUT:
        "inital": "the user want me to solve a math question"
        "think": "i will use the bodmas formula and based on that first i will do 5*10 which is 50"
        "analyze": "yes the bodmas is actually right now the equation is 2+2-50/3
        "think": "now as per rule i should perform dividing 50/3 which is 16.66663"
        "analyze": "now the new equations remain 2+2-16.66663"
        "think": "now it is simple we can just do 2+2 which is 4"
        "analyze": "now left with final step, the small equation 4-16.66663"
        "think": "after the final subtraction answer remains -12.66666"
        "output": "result is -12.6666"

        output format:
        {"steps": "inital" | "think" | "analyze" | "output", "text": "<the actual text>" }


    `;

const messageDB = [{ role: "system", content: SYSTEM_PROMPT }];

async function main(prompt = "") {
  messageDB.push({
    role: "user",
    content: prompt,
  });

  while (true) {
    const result = await client.chat.completions.create({
      model: "gpt-4",
      messages: messageDB,
    });

    const rawResult = result.choices[0].message.content;
    const parsedResult = JSON.parse(rawResult);

    messageDB.push({ role: "assistant", content: rawResult });
    console.log(`  ${parsedResult.steps}: ${parsedResult.text}`);

    //now to make multiple agent loop
    if (parsedResult.steps === "think") {
      //make a claude code to validate if the answer from gpt thinking is correct or not
      messageDB.push({});
    }

    if (parsedResult.steps === "output") break;
  }
}
// main("what is 3+3-5+3*3/3");
main("what is meaning of life");
