import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSWR } from "swr";
import { useAuth } from "../providers/supabase-auth-provider";
import { useSupabase } from "../providers/supabase-provider";

export default function NewChat() {
  // Auth & Supabase
  const { user } = useAuth();
  const { supabase } = useSupabase();

  const router = useRouter();

  // Add New Chat Handler
  const addChatHandler = async () => {
    const { data: newChat, error } = await supabase
      .from("chats")
      .insert({
        profile: user?.id,
      })
      .select(`*`)
      .returns()
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

    // Redirect to the new chat
    router.push(`/chat/${newChat.id}?new=true`);
  };

  return (
    <button className="flex-shrink-0 flex justify-center items-center gap-2 w-full mt-8 sm:mt-16 h-10 py-2 px-4 rounded-md bg-neutral-900 hover:bg-neutral-800 ">
      <AiOutlinePlus />
      New Chat
    </button>
  );
}
