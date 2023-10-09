const { useAuth } = require("@/components/providers/supabase-auth-provider");
import { useSupabase } from "@/components/providers/supabase-provider";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const useMessages = () => {
  const { user } = useAuth();
  const { supabase } = useSupabase();

  const addMessage = async (chatId, content, role) => {
    try {
      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: "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",
      });
      const embeddingRes = await embeddings.embedQuery(content);

      console.log("CHAT INPUT ADDING INTO supabase");
      const { data, error } = await supabase
        .from("messages")
        .insert({
          profile: user?.id,
          chat: chatId,
          content,
          role,
          embedding: embeddingRes,
        })
        .select("*")
        .single();

      if (error && !data) {
        console.log(error);
        return;
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { addMessage };
};

export default useMessages;
