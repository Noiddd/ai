"use client";

import ChatInput from "@/components/chat/ChatInput";
import Message from "@/components/chat/Message";
import useMessages from "@/utils/useMessages";
import React from "react";

export default function ChatPage({ params }) {
  const chatId = params.id;
  const { data: messages } = useMessages(chatId);

  console.log(messages);

  return (
    <main className="relative flex flex-col items-stretch flex-1 w-full h-full ml-0 overflow-hidden transition-all transition-width md:ml-64 bg-neutral-900">
      <div className="flex-1 overflow-hidden">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <ChatInput />
      </div>
    </main>
  );
}
