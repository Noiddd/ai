import ChatInterface from "@/components/chat/ChatInterface";
import { createServerClient } from "@/utils/supabase-server";
import React from "react";

export default async function ChatPage({ params }) {
  console.log(params);
  const chatId = params.id;
  const supabase = createServerClient();

  // Retrieve messages
  const { data: initialMessages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat", chatId)
    .order("created_at", { ascending: true });

  return <ChatInterface chatId={chatId} initialMessages={initialMessages} />;
}
