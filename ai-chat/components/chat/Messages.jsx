"use client";

import { useAtomValue } from "jotai";
import { chatMessages } from "@/jotai/chat";
import React, { useEffect } from "react";
import Message from "./Message";

export default function Messages({ chatRef }) {
  const messages = useAtomValue(chatMessages);

  useEffect(() => {
    chatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  return (
    <div className="h-full overflow-y-scroll">
      {messages?.map((message, index) => (
        <Message message={message} key={index} />
      ))}

      <div className="mt-28" ref={chatRef} />
    </div>
  );
}
