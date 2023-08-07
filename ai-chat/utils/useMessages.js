const { useAuth } = require("@/components/providers/supabase-auth-provider");
import { useSupabase } from "@/components/providers/supabase-provider";

const useMessages = () => {
  const { user } = useAuth();
  const { supabase } = useSupabase();

  const addMessage = async (chatId, content, role) => {
    console.log("CHAT INPUT ADDING INTO supabase");
    const { data, error } = await supabase
      .from("messages")
      .insert({
        profile: user?.id,
        chat: chatId,
        content,
        role,
      })
      .select("*")
      .single();

    if (error && !data) {
      console.log(error);
      return;
    }

    return data;
  };

  return { addMessage };
};

export default useMessages;
