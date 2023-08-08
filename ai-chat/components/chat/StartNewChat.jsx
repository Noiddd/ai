import React from "react";

export default function StartNewChat() {
  return (
    <div className="flex items-start justify-center flex-1 w-full h-full sm:items-center">
      <div className="w-full max-h-full px-8 py-10 mx-8 rounded shadow-sm md:max-w-xl bg-neutral-950/30">
        <h2 className="text-lg font-medium text-white">Start a New Chat</h2>
        <p className="mt-1 font-light text-neutral-400">
          Type your message below to start chating
        </p>
      </div>
    </div>
  );
}
