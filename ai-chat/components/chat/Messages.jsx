"use client";

import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages({ initialMessages }) {
  const messages = useSelector((state) => state.messages);

  return (
    <div className="h-full overflow-y-scroll">
      {messages.messages?.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </div>
  );
}
