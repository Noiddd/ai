import SideBar from "@/components/sidebar/SideBar";
import React from "react";

const ChatLayout = ({ children }) => {
  return (
    <div className="relative flex w-full h-full overflow-hidden">
      <SideBar />
      {children}
    </div>
  );
};

export default ChatLayout;
