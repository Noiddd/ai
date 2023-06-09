"use client";

import useChats from "@/utils/useChats";
import useMessages from "@/utils/useMessages";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../providers/supabase-auth-provider";
import { useRouter } from "next/navigation";

import {
  addAIResponse,
  addMessageJotai,
  aiResponse,
  chatMessages,
  clearChatMessages,
  clearResponse,
  isChatNew,
  updateResponse,
} from "@/jotai/chat";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export default function ChatInput({ chatId }) {
  const [inputValue, setInputValue] = useState("");
  const { addChatHandler } = useChats();
  const { addMessage } = useMessages();

  const router = useRouter();

  const { user } = useAuth();

  const responseAtom = useAtomValue(aiResponse);
  const setNewChat = useSetAtom(isChatNew);
  const clearChatAtom = useSetAtom(clearChatMessages);
  const addMessageAtom = useSetAtom(addMessageJotai);
  const addAIResponseAtom = useSetAtom(addAIResponse);
  const updateResponseAtom = useSetAtom(updateResponse);
  const clearResponseAtom = useSetAtom(clearResponse);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if no input, return
    if (!inputValue) return;

    const prompt = inputValue;
    setInputValue("");

    // checking if its a new chat
    if (chatId == "") {
      console.log("chat has no id");

      clearChatAtom();

      // Change jotai isChatNew atom to true
      setNewChat(true);

      // start new chat since input in default chat screen
      const newChatData = await addChatHandler();

      // Add first user input into supabase
      addMessage(newChatData?.id, prompt, "user");
      chatId = newChatData.id;
    } else {
      console.log("Chat input chat got id");

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

      //setMessages([...messages, ...firstUserMessage]);
      addMessageAtom(firstUserMessage);

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

      //setMessages([...messages, ...emptyAiMessage]);
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
        return res.body.getReader();

        //return res.json();
      })
      .then(async (res) => {
        while (true) {
          const { done, value } = await res.read();

          if (done) {
            // const aiMessage = [
            //   {
            //     profile: user?.id,
            //     chat: chatId,
            //     content: response,
            //     role: "ai",
            //   },
            // ];

            console.log("this is the last response");
            console.log(responseAtom);

            // adding response into supabase
            addMessage(chatId, responseAtom, "ai");

            addAIResponseAtom(user, chatId);

            //addMessageAtom(aiMessage);

            //setResponse("");
            clearResponseAtom();

            break;
          }

          const text = new TextDecoder().decode(value);
          updateResponseAtom(text);
          //setResponse((prev) => prev + text);
        }
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
