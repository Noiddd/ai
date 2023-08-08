import useChats from "@/utils/useChats";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function NewChat() {
  const { addChatHandler } = useChats();

  return (
    <button
      className="flex-shrink-0 flex justify-center items-center gap-2 w-full mt-8 sm:mt-16 h-10 py-2 px-4 rounded bg-neutral-900 hover:bg-neutral-800"
      onClick={() => {
        addChatHandler();
      }}
    >
      <AiOutlinePlus />
      New Chat
    </button>
  );
}
