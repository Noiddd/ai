"use client";

import { useAtomValue } from "jotai";
import { aiResponse, chatMessages } from "@/jotai/chat";
import React, { useEffect } from "react";
import Message from "./Message";

export default function Messages({ chatRef }) {
  //const response = useAtomValue(aiResponse);

  const messages = useAtomValue(chatMessages);
  console.log("test");
  console.log(messages);

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
      {/* {response != "" && <Message response={response} />} */}
      <div className="mt-28" ref={chatRef} />
    </div>
  );
}
