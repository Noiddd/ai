import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

openai
  .createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello ChatGPT" }],
  })
  .then((res) => {
    console.log(res);
  });
