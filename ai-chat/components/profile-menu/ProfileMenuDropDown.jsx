"use client";

import React from "react";
import { VscSignOut } from "react-icons/vsc";

export default function ProfileMenuDropDown({ signOut }) {
  return (
    <div className="fixed z-50 min-w-[8rem] overflow-hidden rounded-md border pl-3 shadow-md border-slate-800  text-slate-400">
      <div className="flex align-middle items-center gap-2" onClick={signOut}>
        <VscSignOut /> Sign Out
      </div>
    </div>
  );
}
