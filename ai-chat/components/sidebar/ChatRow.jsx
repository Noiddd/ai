"use client";

import useChats from "@/utils/useChats";
import React from "react";
import Chat from "./Chat";

export default function ChatRow() {
  const { data, isLoading, deleteChatHandler } = useChats();

  console.log(data);
  return (
    <div className="flex flex-col h-full mt-4 overflow-hidden">
      <div>
        {data && data?.length > 0 && (
          <h3 className="mt-4 text-sm font-medium sm:mt-6 text-neutral-400">
            Chats <span className="text-xs">({data?.length})</span>
          </h3>
        )}
      </div>

      {data && !isLoading ? (
        <div className="flex flex-col h-full gap-4 mt-2 overflow-y-auto">
          {data?.map((chat) => {
            return (
              <Chat
                key={chat.id}
                chat={chat}
                deleteChatHandler={deleteChatHandler}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full py-10">
          spinner
        </div>
      )}
    </div>
  );
}
