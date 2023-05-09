import React from "react";

import { createServerClient } from "@/utils/supabase-server";
import ChatInput from "@/components/chat/ChatInput";
import StartNewChat from "@/components/chat/StartNewChat";

export default async function Chat() {
  return (
    <div className="relative flex flex-col items-stretch flex-1 w-full h-full ml-0 overflow-hidden md:ml-64 bg-neutral-900 ">
      <div className="flex-1 overflow-hidden">
        <StartNewChat />
        <ChatInput chatId={""} />
      </div>
    </div>
  );
}
