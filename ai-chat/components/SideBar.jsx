"use client";

import React from "react";
import Chats from "./Chats";
import ProfileMenu from "./profile-menu/ProfileMenu";

export default function SideBar() {
  return (
    <div className="fixed top-0 left-0 bottom-0 z-40 w-64 px-4 py-8 border-neutral-800 bg-neutral-950 text-neutral-50">
      <div className="flex flex-col flex-1 h-full max-w-full">
        <div>
          <ProfileMenu />
          <button className="flex-shrink-0 w-full mt-8 sm:mt-16">
            New Chat
          </button>
        </div>
        <Chats />
      </div>
    </div>
  );
}
