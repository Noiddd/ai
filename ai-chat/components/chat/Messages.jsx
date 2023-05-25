"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages({ chatRef }) {
  const messages = useSelector((state) => state.messages);

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
      <div className="mt-28" ref={chatRef} />
    </div>
  );
}
