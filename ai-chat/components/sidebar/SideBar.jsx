"use client";

import React from "react";
import ChatRow from "./ChatRow";
import ProfileMenu from "../profile-menu/ProfileMenu";
import NewChat from "./NewChat";
import { useAuth } from "../providers/supabase-auth-provider";

export default function SideBar() {
  const { user } = useAuth();

  return (
    <div className="fixed top-0 left-0 bottom-0 z-40 w-64 px-4 py-8 border-neutral-800 bg-neutral-950 text-neutral-50">
      <div className="flex flex-col flex-1 h-full max-w-full">
        <div>
          <ProfileMenu avatar={user?.avatar_url} />
          <NewChat />
        </div>
        <ChatRow />
      </div>
    </div>
  );
}
