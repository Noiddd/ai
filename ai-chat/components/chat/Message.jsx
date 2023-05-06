"use client";

import React, { useEffect, useState } from "react";

export default function Message({ message }) {
  const [isAI, setIsAI] = useState(false);

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
          : "dark:bg-neutral-900 bg-neutral-200/40 last:pb-64 last:sm:pb-44 text-white p-10"
      }
    >
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <div>AVATAR</div>
        <div>{message.content}</div>
      </div>
    </div>
  );
}
