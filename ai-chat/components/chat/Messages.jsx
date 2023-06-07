"use client";

import { useAtomValue } from "jotai";
import { aiResponse } from "@/jotai/response";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages({ chatRef }) {
  const messages = useSelector((state) => state.messages);

  const response = useAtomValue(aiResponse);

  console.log(response);

  useEffect(() => {
    chatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages.messages]);

  return (
    <div className="h-full overflow-y-scroll">
      {messages.messages?.map((message, index) => (
        <Message message={message} key={index} />
      ))}
      {response != "" && <Message response={response} />}
      <div className="mt-28" ref={chatRef} />
    </div>
  );
}
