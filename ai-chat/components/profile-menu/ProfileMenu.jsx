"use client";

import React from "react";
import { useAuth } from "../providers/supabase-auth-provider";
import Avatar from "./Avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VscSignOut } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";

export default function ProfileMenu() {
  const { user, signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar avatar={user?.avatar_url} />
        <div>{user?.user}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-neutral-950 border-slate-500 rounded overflow-hidden mb-5">
        <DropdownMenuItem className="flex align-middle items-center gap-2 ">
          <BsPerson />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex align-middle items-center gap-2">
          <IoSettingsOutline />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-500" />
        <DropdownMenuItem
          onClick={signOut}
          className="flex align-middle items-center gap-2"
        >
          <VscSignOut />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
