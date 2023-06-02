"use client";

import useChats from "@/utils/useChats";
import useMessages from "@/utils/useMessages";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../providers/supabase-auth-provider";
import { useDispatch } from "react-redux";
import {
  addMessageStore,
  chatIsNew,
  chatIsNotNew,
  clearMessageStore,
  updateEmptyAIMessage,
} from "@/redux/chatSlice";
import { useRouter } from "next/navigation";

export default function ChatInput({ chatId, chatRef }) {
  const [inputValue, setInputValue] = useState("");
  const { addChatHandler } = useChats();
  const { addMessage } = useMessages();
  const dispatch = useDispatch();

  const router = useRouter();

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if no input, return
    if (!inputValue) return;

    const prompt = inputValue;
    setInputValue("");

    // checking if its a new chat
    if (chatId == "") {
      console.log("chat has no id");
      // Clear redux store
      dispatch(clearMessageStore());

      // change redux state to indicate new chat
      dispatch(chatIsNew());

      // start new chat if input in default chat screen
      const newChatData = await addChatHandler();

      // Add first user input into supabase
      addMessage(newChatData?.id, prompt, "user");
      chatId = newChatData.id;
    } else {
      console.log("Chat input chat got id");
      // dispatch(chatIsNotNew());

      // Redirect to the new chat
      router.push(`/chat/${chatId}`);

      // creating user message to push into redux
      const firstUserMessage = [
        {
          profile: user?.id,
          chat: chatId,
          content: prompt,
          role: "user",
        },
      ];

      // adding user message into redux store
      dispatch(addMessageStore(firstUserMessage));

      // Adding user input into supabase
      addMessage(chatId, prompt, "user");

      // Creating empty ai message for UX loading state
      const emptyAiMessage = [
        {
          profile: user?.id,
          chat: chatId,
          content: "",
          role: "ai",
        },
      ];

      dispatch(addMessageStore(emptyAiMessage));
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
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const aiMessage = [
          {
            profile: user?.id,
            chat: chatId,
            content: res.data.content,
            role: "ai",
          },
        ];

        dispatch(updateEmptyAIMessage(aiMessage));
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
