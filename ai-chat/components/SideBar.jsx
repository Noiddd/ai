import React from "react";
import ProfileMenu from "./profile-menu/ProfileMenu";

export default function SideBar() {
  return (
    <div className="fixed top-0 left-0 bottom-0 z-40 w-64 px-4 py-8 transition-transform -translate-x-full shadow-md md:translate-x-0 dark:border-neutral-800 border-neutral-200 bg-white dark:bg-neutral-950 dark:text-neutral-50">
      <div className="flex flex-col flex-1 h-full max-w-full">
        <div>
          <div className="max-w-[70px]">Logo</div>
          <button className="flex-shrink-0 w-full mt-8 sm:mt-16">
            New Chat
          </button>
        </div>
        <div>
          <div>Chats</div>
        </div>
        <div className="flex-1 mt-10">
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}
