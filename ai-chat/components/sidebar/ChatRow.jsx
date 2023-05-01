"use client";

import useChats from "@/utils/useChats";
import React from "react";
import { useSupabase } from "../providers/supabase-provider";
import Chat from "./Chat";

export default function ChatRow() {
  const { data, error } = useChats();
  console.log(data);
  return (
    <div>
      {data.map((chat) => {
        return <Chat key={chat.id} chat={chat} />;
      })}
    </div>
  );
}
