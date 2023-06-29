import { BufferMemory } from "langchain/memory";
import {
  ConversationChain,
  ConversationalRetrievalQAChain,
  RetrievalQAChain,
} from "langchain/chains";

import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { createClient } from "@supabase/supabase-js";

const streamResponse = async (prompt) => {
  // creating a streamable object
  const stream = new TransformStream();

  // passing values to the stream
  const writer = stream.writable.getWriter();

  const encoder = new TextEncoder();

  const model = new ChatOpenAI({
    openAIApiKey: "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",
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

  // vector query
  const client = createClient(
    "https://jacratlygjsoxtsvfmxw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphY3JhdGx5Z2pzb3h0c3ZmbXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MTEwNTUsImV4cCI6MTk5NzQ4NzA1NX0.-TnLhGZJ91rgGj2Mf9kpufhd2zdW7Fb5j2rxNVio_Qc"
  );

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `Answer as concisely as possible and ALWAYS answer in MARKDOWN. Current date: ${new Date()}`
    ),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({
      openAIApiKey: "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",
    }),
    { client, tableName: "documents", queryName: "match_documents" }
  );

  let chaintest = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  const res = chaintest.call({
    query: `You are Taco, a helpful assistant and an expert in Singapore's Real Estate industry. ALWAYS answer in MARKDOWN. If you do not know the answer, reply with 'hmm... I'm sorry I do not know the answer to that'. Current date: ${new Date()}.${prompt}`,
  });

  console.log({ res });

  return stream.readable;
};

export default streamResponse;
