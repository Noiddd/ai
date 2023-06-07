import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
  modelName: "gpt-3.5-turbo",
  streaming: true,
  callbacks: [
    {
      handleLLMNewToken(token) {
        process.stdout.write(token);
      },
      handleLLMEnd(output) {
        console.log("This is the end " + output);
      },
    },
  ],
});

const memory = new BufferMemory({ returnMessages: true, memoryKey: "history" });

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `Answer as concisely as possible and ALWAYS answer in MARKDOWN. Answer based on previous conversations if provided and if it's relevant. Current date: ${new Date()}`
  ),
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

export const openai = new ConversationChain({
  llm: model,
  memory: memory,
  prompt: chatPrompt,
});
