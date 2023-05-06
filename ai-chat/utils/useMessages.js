const { useAuth } = require("@/components/providers/supabase-auth-provider");
const { useSupabase } = require("@/components/providers/supabase-provider");
import useSWR from "swr";

const useMessages = (chatId) => {
  const { user } = useAuth();

  // Get Initial Messages
  const { supabase } = useSupabase();

  const getMessages = async () => {
    // Retrieve messages
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat", chatId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    user ? ["messages", user.id] : null,
    getMessages
  );

  const addMessage = async (chatId, content, role) => {
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

    // Add it to the top of the list
    mutate((prev) => {
      if (prev && prev.length > 0) {
        return [data, ...prev];
      } else {
        return [data];
      }
    });
  };

  return { data, error, isLoading, mutate, addMessage };
};

export default useMessages;
