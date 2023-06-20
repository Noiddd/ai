import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

const streamResponse = async (prompt) => {
  // creating a streamable object
  const stream = new TransformStream();

  // passing values to the stream
  const writer = stream.writable.getWriter();

  const encoder = new TextEncoder();

  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    modelName: "gpt-3.5-turbo",
    streaming: true,
    callbacks: [
      {
        async handleLLMNewToken(token) {
          // checking if writer is available
          await writer.ready;

          // converting token into a format the stream understands
          await writer.write(encoder.encode(`${token}`));

          //process.stdout.write(token);
        },
        async handleLLMEnd() {
          await writer.ready;
          await writer.close();
        },
      },
    ],
  });

  const memory = new BufferMemory({
    returnMessages: true,
    memoryKey: "history",
  });

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `Answer as concisely as possible and ALWAYS answer in MARKDOWN. Current date: ${new Date()}`
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  const openai = new ConversationChain({
    memory: memory,
    prompt: chatPrompt,
    llm: model,
  });

  openai.call({ input: prompt });

  return stream.readable;
};

export default streamResponse;
