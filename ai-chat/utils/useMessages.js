const { useAuth } = require("@/components/providers/supabase-auth-provider");
import { useSupabase } from "@/components/providers/supabase-provider";
import { useRouter } from "next/navigation";

const useMessages = () => {
  const { user } = useAuth();
  const { supabase } = useSupabase();
  const router = useRouter();

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

    // Refresh chat
    //router.push(`/chat/${chatId}`);

    return data;
  };

  return { addMessage };
};

export default useMessages;
