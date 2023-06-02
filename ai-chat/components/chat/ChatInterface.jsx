"use client";

import React, { useRef } from "react";
import ChatInput from "./ChatInput";
import StartNewChat from "./StartNewChat";
import Messages from "./Messages";

import { useAuth } from "../providers/supabase-auth-provider";
import useChat from "@/utils/useChat";

export default function ChatInterface({ chatId, initialMessages }) {
  const chatRef = useRef();
  const { user } = useAuth();

  useChat({ chatId, initialMessages, user });

  return (
    <main className="relative flex flex-col items-stretch flex-1 w-full h-full ml-0 overflow-hidden transition-all transition-width md:ml-64 bg-neutral-900">
      <div className="flex-1 overflow-hidden">
        {initialMessages?.length == 0 ? (
          <StartNewChat />
        ) : (
          <Messages chatRef={chatRef} />
        )}

        <ChatInput chatId={chatId} chatRef={chatRef} />
      </div>
    </main>
  );
}
