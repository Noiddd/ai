"use client";

import React from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";
import StartNewChat from "./StartNewChat";

export default function ChatInterface({ messages, chatId }) {
  return (
    <main className="relative flex flex-col items-stretch flex-1 w-full h-full ml-0 overflow-hidden transition-all transition-width md:ml-64 bg-neutral-900">
      <div className="flex-1 overflow-hidden">
        {messages.length == 0 ? (
          <StartNewChat />
        ) : (
          <div className="h-full overflow-y-scroll">
            {messages?.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        )}

        <ChatInput chatId={chatId} />
      </div>
    </main>
  );
}
