import * as fs from "fs";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { createClient } from "@supabase/supabase-js";

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

  const supabaseClient = createClient(
    "https://jacratlygjsoxtsvfmxw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphY3JhdGx5Z2pzb3h0c3ZmbXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MTEwNTUsImV4cCI6MTk5NzQ4NzA1NX0.-TnLhGZJ91rgGj2Mf9kpufhd2zdW7Fb5j2rxNVio_Qc"
  );

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: "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", // In Node.js defaults to process.env.OPENAI_API_KEY
  });

  await supabaseClient.from("documents").insert({
    content: docOutput,
    embeddings,
  });

  // const vectorStore = await SupabaseVectorStore.fromDocuments(
  //   docOutput,
  //   embeddings,
  //   {
  //     supabaseClient,
  //     tableName: "documents",
  //     queryName: "match_documents",
  //   }
  // );
};

run();
