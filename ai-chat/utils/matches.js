import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createServerClient } from "./supabase-server";

const getMatchesFromEmbeddings = async (inquiry, topK) => {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: "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",
  });
  const client = createServerClient();

  const store = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
  });

  try {
    const queryResult = await store.similaritySearch(inquiry, topK);
    return (
      queryResult.map((match) => ({
        ...match,
        metadata: match.metadata,
      })) || []
    );
  } catch (e) {
    console.log("Error querying embeddings: ", e);
    throw new Error(`Error querying embeddings: ${e}`);
  }
};

export { getMatchesFromEmbeddings };
