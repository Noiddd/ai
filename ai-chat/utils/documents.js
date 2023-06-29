import * as fs from "fs";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { createClient } from "@supabase/supabase-js";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";

const supabaseClient = createClient(
  "https://jacratlygjsoxtsvfmxw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphY3JhdGx5Z2pzb3h0c3ZmbXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MTEwNTUsImV4cCI6MTk5NzQ4NzA1NX0.-TnLhGZJ91rgGj2Mf9kpufhd2zdW7Fb5j2rxNVio_Qc"
);

export const run = async () => {
  const loader = new PDFLoader(
    "/Users/dion/Documents/GitHub/ai/ai-chat/pdf/HFE.pdf"
  );

  const rawDocs = await loader.load();
  //console.log(rawDocs);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });

  const docOutput = await splitter.splitDocuments([
    new Document({ pageContent: rawDocs }),
  ]);

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: "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", // In Node.js defaults to process.env.OPENAI_API_KEY
  });

  const model = new OpenAI({
    openAIApiKey: "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", // In Node.js defaults to process.env.OPENAI_API_KEY
  });

  const vectorStore = await SupabaseVectorStore.fromDocuments(
    docOutput,
    embeddings,
    {
      supabaseClient,
      tableName: "documents",
      queryName: "match_documents",
    }
  );

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  const res = await chain.call({
    query: "What is HFE",
  });

  console.log({ res });
};

run();
