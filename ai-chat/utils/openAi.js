import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
  modelName: "gpt-3.5-turbo",
  streaming: true,
  callbacks: [
    {
      handleLLMNewToken(token) {
        process.stdout.write(token);
      },
    },
  ],
});

const memory = new BufferMemory();
export const openai = new ConversationChain({ llm: model, memory: memory });
