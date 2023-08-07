"use client";

import React from "react";
import { VscSignOut } from "react-icons/vsc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfileMenuDropDown({ signOut }) {
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem>Profile</DropdownMenuItem>
    //     <DropdownMenuItem>Billing</DropdownMenuItem>
    //     <DropdownMenuItem>Team</DropdownMenuItem>
    //     <DropdownMenuItem>Subscription</DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>

    <div className="fixed z-50 min-w-[14rem] overflow-hidden rounded-md border pl-3 shadow-md border-slate-800  text-slate-400">
      <div className="flex align-middle items-center gap-2" onClick={signOut}>
        <VscSignOut /> Sign Out
      </div>
    </div>
  );
}
