"use client";

import useChats from "@/utils/useChats";
import useMessages from "@/utils/useMessages";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../providers/supabase-auth-provider";
import { useRouter } from "next/navigation";

export default function ChatInput({ chatId }) {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const { addChatHandler } = useChats();
  const { addMessage } = useMessages();

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if no input, return
    if (!inputValue) return;

    const prompt = inputValue;

    if (chatId == "") {
      // start new chat if input in default chat screen
      const newChatData = await addChatHandler();
      addMessage(newChatData.id, prompt, "user");
      chatId = newChatData.id;
      setInputValue("");
    } else {
      addMessage(chatId, prompt, "user");
      setInputValue("");
    }

    // POST call to OPENAI API
    await fetch("/api/askQuestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        chatId,
        user,
      }),
    }).then((res) => {
      console.log(res);
      // Refresh chat
      router.push(`/chat/${chatId}`);
      console.log("success");
    });
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 px-4 py-10 sm:px-8 bg-gradient-to-b from-transparent via-neutral-950/60 to-neutral-950/90">
      <div className="w-full max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-full py-2 rounded-md shadow-sm focus-within:ring-neutral-500 focus-within:ring-1 bg-neutral-900"
        >
          <input
            className="h-auto peer flex w-full resize-none rounded-md bg-transparent py-2 px-3 placeholder:text-sm placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-slate-50"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button type="submit">
            <FiSend className="mr-4 text-neutral-600 peer-focus:text-neutral-500" />
          </button>
        </form>
      </div>
    </div>
  );
}
