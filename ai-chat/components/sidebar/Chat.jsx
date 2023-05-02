import Link from "next/link";
import React from "react";
import { BsChatLeft } from "react-icons/bs";
import { DateTime } from "luxon";
import { BsTrash } from "react-icons/bs";

export default function Chat({ chat, deleteChatHandler }) {
  return (
    <Link href={`/chat/${chat.id}`}>
      <div className="flex items-center w-full px-3 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 group">
        <div className="flex items-center gap-2 w-11/12">
          <BsChatLeft className="w-6" />
          {chat?.messages == undefined ? (
            <div className="text-sm leading-loose line-clamp-1">
              {chat?.messages?.slice(-1)[0].content}
            </div>
          ) : (
            <div className="text-sm leading-loose line-clamp-1">
              New Conversation
            </div>
          )}
        </div>
        <BsTrash
          className="relative inset-y-0 right-0 hidden group-hover:block w-1/12"
          onClick={() => {
            deleteChatHandler(chat.id);
          }}
        />
      </div>

      <div className="flex items-center mt-1 dark:text-neutral-600 text-neutral-400">
        <div className="text-xs">
          {DateTime.fromISO(chat.created_at)
            .toRelativeCalendar()
            .toLowerCase()
            .split(" ")
            .map((word) => {
              return word.replace(word[0], word[0].toUpperCase());
            })
            .join(" ")}
        </div>
      </div>
    </Link>
  );
}
