"use client";

import React, { useEffect } from "react";
import ChatInput from "./ChatInput";
import StartNewChat from "./StartNewChat";
import Messages from "./Messages";

import { useDispatch } from "react-redux";
import { addMessageStore, clearMessageStore } from "@/redux/chatSlice";

export default function ChatInterface({ chatId, initialMessages }) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("FIRST");
    console.log(initialMessages);

    dispatch(clearMessageStore());
    dispatch(addMessageStore(initialMessages));
  }, [chatId, initialMessages]);

  return (
    <main className="relative flex flex-col items-stretch flex-1 w-full h-full ml-0 overflow-hidden transition-all transition-width md:ml-64 bg-neutral-900">
      <div className="flex-1 overflow-hidden">
        {initialMessages?.length == 0 ? (
          <StartNewChat />
        ) : (
          <Messages initialMessages={initialMessages} />
        )}

        <ChatInput chatId={chatId} />
      </div>
    </main>
  );
}
