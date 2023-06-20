import { SupabaseVectorStore } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { VectorDBQAChain } from "langchain/chains";
import { openai } from "@/utils/openai-client";
import { createClient } from "@supabase/supabase-js";

const query = "How do i create a notion database?";

const model = openai;

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function searchForDocs() {
  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    supabaseClient,
    new OpenAIEmbeddings()
  );

  /*uncomment below to test similarity search */
  //   const results = await vectorStore.similaritySearch(query, 2);

  //   console.log("results", results);

  const chain = VectorDBQAChain.fromLLM(model, vectorStore);

  //Ask a question
  const response = await chain.call({
    query: query,
  });

  console.log("response", response);
}

(async () => {
  await searchForDocs();
})();
