const { useAuth } = require("@/components/providers/supabase-auth-provider");
const { useSupabase } = require("@/components/providers/supabase-provider");
import { chatIsNew } from "@/redux/chatSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const useChats = () => {
  const { user } = useAuth();
  const { supabase } = useSupabase();

  const dispatch = useDispatch();

  const getChats = async () => {
    const { data, error } = await supabase
      .from("chat")
      .select(`*, messages(*)`)
      .eq("profile", user?.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    user ? ["chat", user.id] : null,
    getChats
  );

  const router = useRouter();

  // Add New Chat Handler
  const addChatHandler = async () => {
    const { data: newChat, error } = await supabase
      .from("chat")
      .insert({
        profile: user?.id,
      })
      .select(`*`)
      .single();

    if (error && !newChat) {
      console.log(error);
      return;
    }

    // Add it to the top of the list
    mutate((prev) => {
      if (prev && prev.length > 0) {
        return [newChat, ...prev];
      } else {
        return [newChat];
      }
    });

    console.log("Routing to new chat");
    // Redirect to the new chat
    router.push(`/chat/${newChat.id}`);

    return newChat;
  };

  // Delete Chat Handler
  const deleteChatHandler = async (chatId) => {
    const { data, error } = await supabase
      .from("chat")
      .delete()
      .eq("id", chatId)
      .select();

    if (error && !newChat) {
      console.log(error);
      return;
    }

    // Update chat
    mutate((prev) => {
      return prev.filter((chat) => chat !== data);
    });

    // Redirect to the new chat
    router.push(`/chat`);
  };

  return { data, error, isLoading, mutate, addChatHandler, deleteChatHandler };
};

export default useChats;
