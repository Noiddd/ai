"use client";

import React from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";

export default function ChatInterface({ messages, chatId }) {
  return (
    <main className="relative flex flex-col items-stretch flex-1 w-full h-full ml-0 overflow-hidden transition-all transition-width md:ml-64 bg-neutral-900">
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-scroll">
          {messages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <ChatInput chatId={chatId} />
      </div>
    </main>
  );
}
