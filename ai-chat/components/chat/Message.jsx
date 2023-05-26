"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/supabase-auth-provider";
import ChatAvatar from "./ChatAvatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function Message({ message }) {
  const [isAI, setIsAI] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (message?.role === "ai") {
      setIsAI(true);
    }
  }, [message]);

  return (
    <div
      className={
        !isAI
          ? "bg-neutral-950/60 text-white p-10 last:mb-28"
          : "bg-neutral-900 last:pb-28 last:sm:pb-28 text-white p-10"
      }
    >
      {message?.role === "ai" && message.content == "" ? (
        <div className="flex w-full max-w-3xl gap-4 px-4 py-10 mx-auto sm:px-8 align-top justify-center">
          <div className="flex items-center gap-2 px-3 py-1 text-lg rounded-md max-w-fit bg-neutral-950/50">
            <div className="w-2 h-2 bg-indigo-900 rounded-full animate-pulse" />
            <span>Typing...</span>
          </div>
        </div>
      ) : (
        <div className="flex w-full max-w-3xl gap-4 px-4 py-10 mx-auto sm:px-8 align-top">
          <div className="w-10 h-10">
            {message?.role === "ai" ? (
              <ChatAvatar avatar={"https://ui-avatars.com/api/?name=AI"} />
            ) : (
              <ChatAvatar avatar={user?.avatar_url} />
            )}
          </div>
          <ReactMarkdown
            className="break-words markdown w-4/5"
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
