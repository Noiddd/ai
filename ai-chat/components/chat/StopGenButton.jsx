"use client";

import { cancelHandle } from "@/jotai/chat";
import { useSetAtom } from "jotai";
import React from "react";
import { BsStop } from "react-icons/bs";

function StopGenButton() {
  const cancelHandleAtom = useSetAtom(cancelHandle);

  return (
    <div className="flex items-center justify-center w-full max-w-5xl py-4">
      <button
        onClick={cancelHandleAtom}
        className="flex items-center rounded gap-2 bg-transparent hover:bg-neutral-800 text-slate-100 hover:text-slate-100 h-10 py-2 px-4 bg-opacity-90"
      >
        <span>Stop Generating</span> <BsStop />
      </button>
    </div>
  );
}

export default StopGenButton;
