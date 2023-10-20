"use client";

import useChats from "@/utils/useChats";
import useMessages from "@/utils/useMessages";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../providers/supabase-auth-provider";
import { useRouter } from "next/navigation";

import {
  addMessageJotai,
  addSupabaseResponse,
  chatStreaming,
  clearChatMessages,
  clearResponse,
  isChatNew,
} from "@/jotai/chat";
import { useSetAtom, useAtom } from "jotai";
import StopGenButton from "./StopGenButton";

export default function ChatInput({ chatId }) {
  const [inputValue, setInputValue] = useState("");
  const { addChatHandler } = useChats();
  const { addMessage } = useMessages();

  const router = useRouter();

  const { user } = useAuth();

  const setNewChat = useSetAtom(isChatNew);
  const clearChatAtom = useSetAtom(clearChatMessages);
  const addMessageAtom = useSetAtom(addMessageJotai);
  const clearResponseAtom = useSetAtom(clearResponse);
  const responseToSupabase = useSetAtom(addSupabaseResponse);
  const [isChatStreaming, setIsChatStreaming] = useAtom(chatStreaming);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if no input, return
    if (!inputValue) return;

    const prompt = inputValue;
    setInputValue("");

    // checking if its a new chat
    if (chatId == "") {
      console.log("chat has no id");
      console.log("chatInput, clearing chatMessages");
      clearChatAtom();

      console.log("chatInput, newChat to true");
      setNewChat(true);

      // start new chat since input in default chat screen
      const newChatData = await addChatHandler();

      // creating user message to push into jotai
      const firstUserMessage = [
        {
          profile: user?.id,
          chat: newChatData?.id,
          content: prompt,
          role: "user",
        },
        {
          profile: user?.id,
          chat: newChatData?.id,
          content: "",
          role: "ai",
        },
      ];

      console.log("chatinput, add input into jotai");
      addMessageAtom(firstUserMessage);

      console.log("chatInput, add userinput into supabase");
      addMessage(newChatData?.id, prompt, "user");
      chatId = newChatData.id;

      // clearing chatMessage atom
      clearResponseAtom();
    } else {
      console.log("Chat input chat got id");

      // Redirect to the new chat
      // router.push(`/chat/${chatId}`);

      //creating user message to push into jotai
      const userMessage = [
        {
          profile: user?.id,
          chat: chatId,
          content: prompt,
          role: "user",
        },
        {
          profile: user?.id,
          chat: chatId,
          content: "",
          role: "ai",
        },
      ];

      console.log("chatInput, chat got id, adding user input into jotai");
      addMessageAtom(userMessage);
      console.log(userMessage);

      // Adding user input into supabase
      addMessage(chatId, prompt, "user");
      clearResponseAtom();
    }

    // Stop generating button should appear
    setIsChatStreaming(true);
    await responseToSupabase(user, chatId, prompt);
  };

  return (
    <div className="flex flex-col	sticky bottom-0 left-0 right-0 px-4 py-10 sm:px-8 bg-gradient-to-b from-transparent via-neutral-950/60 to-neutral-950/90">
      <div className="w-full max-w-5xl mx-auto">
        {isChatStreaming && <StopGenButton />}
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-full py-2 rounded shadow-sm focus-within:ring-neutral-500 focus-within:ring-1 bg-neutral-900"
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
