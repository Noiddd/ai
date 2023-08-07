import { LLMChain, RetrievalQAChain } from "langchain/chains";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { OpenAI } from "langchain/llms/openai";
import { templates } from "./templates";
import { ConversationLog } from "./conversationLog";
import { getMatchesFromEmbeddings } from "./matches";

const streamResponse = async (prompt, chatId) => {
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

  const llm = new OpenAI({
    openAIApiKey: "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",
  });

  const convoHistoryLimit = 10;

  // Retrieve the conversation log and save the user's prompt
  const conversationLog = new ConversationLog();
  const conversationHistory = await conversationLog.getConversationHistory({
    chatId: chatId,
    limit: convoHistoryLimit,
  });

  console.log("---------------------conversationHistory------------------");
  console.log(conversationHistory);
  console.log("---------------------conversationHistory------------------");

  const inquiryChain = new LLMChain({
    llm,
    prompt: new PromptTemplate({
      template: templates.inquiryTemplate,
      inputVariables: ["userPrompt", "conversationHistory"],
    }),
  });

  // const inquiryChainResult = await inquiryChain.call({
  //   userPrompt: prompt,
  //   conversationHistory,
  // });

  // const inquiry = inquiryChainResult.text;
  // console.log("-------------------inquiry--------------------");
  // console.log(inquiry);
  // console.log("-------------------inquiry--------------------");

  console.log("-------------------prompt--------------------");
  console.log(prompt);
  console.log("-------------------prompt--------------------");

  const matches = await getMatchesFromEmbeddings(prompt, 4);

  const context = matches
    .map(function (match) {
      return match["pageContent"];
    })
    .reduce((combineContent, content) => {
      return combineContent + " " + content;
    });

  const promptTemplate = new PromptTemplate({
    template: templates.qaTemplate,
    inputVariables: ["context", "question", "conversationHistory"],
  });

  console.log("---------------------context------------------");
  console.log(context);
  console.log("---------------------context------------------");

  const chain = new LLMChain({
    prompt: promptTemplate,
    llm: model,
  });

  const res = chain.call({
    context,
    question: prompt,
    conversationHistory,
  });
  //console.log({ res });
  /* -------------------------------------------------------------------------------------------------- */

  // const res = chaintest.call({
  //   query: `
  //   Context: You are Demsei AI.
  //   You are a helpful assistant and an expert in Singapore's Real Estate industry.
  //   ALWAYS answer in MARKDOWN. ALWAYS answer succinctly and in detail.
  //   If you do not know the answer, reply with 'hmm... I'm sorry I do not know the answer to that'.
  //   Current date: ${new Date()}.

  //   Question:${prompt}`,
  // });

  //console.log({ res });

  return stream.readable;
};

export default streamResponse;
