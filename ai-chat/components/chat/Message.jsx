"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/supabase-auth-provider";
import ChatAvatar from "./ChatAvatar";

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
          ? "dark:bg-neutral-950/60 bg-neutral-100/50 text-white p-10"
          : "dark:bg-neutral-900 bg-neutral-200/40 last:pb-28 last:sm:pb-28 text-white p-10"
      }
    >
      <div className="flex w-full max-w-3xl gap-4 px-4 py-5 mx-auto sm:px-8">
        <div className="">
          <ChatAvatar avatar={user?.avatar_url} />
        </div>
        <div>{message.content}</div>
      </div>
    </div>
  );
}
