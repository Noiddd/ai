import React from "react";

export default function ChatAvatar({ avatar }) {
  return (
    <img
      className="min-h-full min-w-full rounded-full mx-autp mb-2"
      //className="w-8 h-8 ring-2 ring-offset-2 dark:ring-neutral-700 ring-neutral-400"
      src={avatar}
    />
  );
}
